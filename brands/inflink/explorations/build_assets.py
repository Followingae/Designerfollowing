# Inflink brand assets: aurora fields, fluted glass, resized links. Run: py build_assets.py
import numpy as np, glob, os
from PIL import Image
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DS = r"C:\Users\user\Desktop\Inflink Design System\higgsfield-assets"
OUT = os.path.join(ROOT, 'final', 'assets')
os.makedirs(OUT + '/aurora', exist_ok=True); os.makedirs(OUT + '/links', exist_ok=True)

def hx(h):
    h = h.lstrip('#')
    return np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], float) / 255

PE, CO, BL, VI, LI, EL, IN, NI, BA, MI = map(hx, ['FF8F6B', 'FF6B6B', 'FFD3E0', '6D5EF8', 'C9C3FF', '3B4BFF', '1C1840', '0E0D14', 'FBF8FF', 'ECE9FF'])

def field(w, h, base, blobs, seed=3, warp=.16):
    rng = np.random.default_rng(seed)
    y, x = np.mgrid[0:h, 0:w].astype(float)
    x = x / w; y = y / h
    # slow domain warp so the colour flows rather than sits in circles
    a = rng.uniform(0, 6.28, 4)
    X = x + warp * np.sin(6.3 * y + a[0]) * .6 + warp * .4 * np.sin(5.3 * (x + y) + a[1])
    Y = y + warp * np.sin(5.1 * x + a[2]) * .6 + warp * .4 * np.sin(4.1 * (x - y) + a[3])
    img = np.ones((h, w, 3)) * base
    for (cx, cy, rx, ry, c, op) in blobs:
        d = np.sqrt(((X - cx) / rx) ** 2 + ((Y - cy) / ry) ** 2)
        m = np.clip(1 - d, 0, 1); m = m * m * (3 - 2 * m) * op
        img = img * (1 - m[..., None]) + c * m[..., None]
    return img

def grain(img, amt=.012, seed=1):
    n = np.random.default_rng(seed).normal(0, amt, img.shape[:2])[..., None]
    return np.clip(img + n, 0, 1)

TONES = {
    'aurora': (BA, [(.1, .08, .95, .95, PE, 1), (.9, .14, .8, .9, BL, 1), (.74, .9, .8, .9, VI, 1), (.2, .92, .7, .8, LI, 1), (.58, .46, .26, .62, VI, .75)]),
    'peach': (hx('FFF1EC'), [(.15, .2, .95, 1, PE, 1), (.9, .2, .7, .9, BL, 1), (.8, .95, .7, .7, CO, .55), (.2, .95, .7, .7, BL, .9)]),
    'lilac': (BA, [(.15, .15, .9, .9, LI, 1), (.85, .2, .7, .8, MI, 1), (.8, .9, .75, .85, VI, .8), (.15, .95, .6, .6, BL, .9)]),
    'dusk': (IN, [(.08, 1, .8, .9, CO, 1), (.92, 0, .9, .9, EL, 1), (.4, .3, .5, .5, VI, .45)]),
    'night': (NI, [(.8, .85, .8, .8, VI, .8), (.15, .1, .6, .6, IN, 1), (.85, .1, .4, .4, CO, .18)]),
}

def to8(a):
    return Image.fromarray((a * 255 + .5).astype('uint8'))

def aurora():
    for n, (b, bl) in TONES.items():
        for tag, (w, h) in {'w': (2400, 1350), 'p': (1350, 2400), 's': (1800, 1800)}.items():
            to8(grain(field(w, h, b, bl, seed=len(n)))).save(f'{OUT}/aurora/{n}_{tag}.jpg', quality=93)

def fluted(w, h, ribs, base, orb, name, shade=.22, hi=.35):
    y, x = np.mgrid[0:h, 0:w].astype(float)
    rw = w / ribs
    i = np.floor(x / rw)
    u = (x - (i + .5) * rw) / rw  # -0.5 to 0.5 across each rib
    SH = np.array([-5, 4, -3, 5, -4, 3, -2, 4]) / 100 * w
    X = (i + .5) * rw + u * rw * .8 + SH[(i % 8).astype(int)]  # refraction: compress and offset per rib
    cx, cy, r = orb
    d = np.sqrt((X - cx * w) ** 2 + (y - cy * h) ** 2) / (r * min(w, h))
    c = np.zeros((h, w, 3)); c[...] = EL
    stops = [(0, VI), (.52, hx('4A52FB')), (.72, EL)]
    for (a, ca), (b, cb) in reversed(list(zip(stops, stops[1:]))):
        t = np.clip((d - a) / (b - a), 0, 1)[..., None]
        c = np.where((d <= b)[..., None], ca * (1 - t) + cb * t, c)
    alpha = np.clip((1.15 - d) / .6, 0, 1); alpha = alpha * alpha * (3 - 2 * alpha)
    img = np.ones((h, w, 3)) * base
    img = img * (1 - alpha[..., None]) + c * alpha[..., None]
    img = img + (hi * np.clip(-u * 2 - .55, 0, 1) ** 1.5)[..., None] - (shade * np.clip(u * 2 - .45, 0, 1) ** 1.3)[..., None]
    to8(grain(np.clip(img, 0, 1), .008)).save(f'{OUT}/aurora/{name}.jpg', quality=93)

def links():
    keep = [('app-renders', ['analytics', 'applinks', 'approve', 'brand', 'brief', 'diary', 'hero', 'model', 'payout', 'pro', 'track']), ('people', None), ('digitals', None), ('creator-images', None)]
    for d, names in keep:
        for f in glob.glob(f'{DS}\\{d}\\*.png'):
            n = os.path.splitext(os.path.basename(f))[0]
            if names and n not in names:
                continue
            im = Image.open(f); im.thumbnail((1600, 1800))
            im.save(f'{OUT}/links/{d.split("-")[0]}_{n}.png')
    for f in glob.glob(f'{DS}\\source-screens\\*.png'):
        im = Image.open(f).convert('RGB'); im.thumbnail((1000, 2200))
        im.save(f'{OUT}/links/screen_{os.path.splitext(os.path.basename(f))[0]}.jpg', quality=92)
    for f in glob.glob(r'C:\Users\user\Desktop\Inflink Design System\screenshots\*.jpg'):
        Image.open(f).save(f'{OUT}/links/site_{os.path.basename(f)}', quality=92)

aurora()
fluted(1800, 1800, 6, BA, (.5, .5, .46), 'fluted_light')
fluted(1800, 1800, 6, hx('0E0D14'), (.5, .5, .46), 'fluted_night', shade=.5, hi=.14)
fluted(2400, 1350, 10, BA, (.62, .55, .5), 'fluted_wide')
fluted(1350, 2400, 6, BA, (.5, .45, .46), 'fluted_tall')
links()
print('ok')
