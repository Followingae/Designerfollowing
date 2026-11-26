# Device mockups around the real captures. iPhone for Apple, a generic unbranded Android phone for Play. py store_devices.py
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont
L = r'C:\Users\user\Desktop\DesignerFollowing\brands\inflink\final\assets\links\\'
N = ['link_in_bio', 'store', 'ai_brief', 'order_detail_money_held', 'analytics', 'model_diary', 'earnings', 'orders']
SS = 2  # supersample

def rr(size, box, r, fill=255):
    m = Image.new('L', size, 0); ImageDraw.Draw(m).rounded_rectangle(box, r, fill=fill); return m

def metal(w, h, stops):
    # brushed vertical-edge gradient across the width, with a soft top and foot highlight
    xs = np.linspace(0, 1, w); ps, cs = zip(*stops); a = np.stack([np.interp(xs, ps, [c[i] for c in cs]) for i in range(3)], 1)
    a = np.repeat(a[None, :, :], h, 0)
    ys = np.linspace(0, 1, h)[:, None, None]; a = a * (1 + .10 * np.exp(-((ys - .015) / .02) ** 2) - .06 * np.exp(-((ys - .99) / .02) ** 2))
    return Image.fromarray(np.clip(a, 0, 255).astype('uint8'))

def device(screen, kind):
    sw, sh = screen.size
    if kind == 'ios':
        rim, bez, rad, srad = 16, 30, 176, 150
        stops = [(0, (92, 92, 96)), (.006, (196, 196, 200)), (.016, (120, 120, 124)), (.5, (70, 70, 74)), (.984, (120, 120, 124)), (.994, (196, 196, 200)), (1, (92, 92, 96))]
        btns = [('l', .155, .028, 8), ('l', .215, .058, 8), ('l', .288, .058, 8), ('r', .24, .092, 8)]
    else:
        rim, bez, rad, srad = 14, 26, 112, 92
        stops = [(0, (46, 48, 52)), (.006, (120, 124, 130)), (.016, (64, 66, 70)), (.5, (40, 42, 46)), (.984, (64, 66, 70)), (.994, (120, 124, 130)), (1, (46, 48, 52))]
        btns = [('r', .19, .075, 8), ('r', .30, .13, 8)]
    pad, side = 70, 12
    bw, bh = sw + 2 * (rim + bez), sh + 2 * (rim + bez)
    W, H = (bw + 2 * (pad + side)) * SS, (bh + 2 * pad) * SS
    x0, y0 = (pad + side) * SS, pad * SS; s = SS
    canvas = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    # soft contact shadow
    shadow = Image.new('L', (W, H), 0); ImageDraw.Draw(shadow).rounded_rectangle((x0 + 10 * s, y0 + 30 * s, x0 + (bw - 10) * s, y0 + (bh + 10) * s), rad * s, fill=95)
    shadow = shadow.filter(ImageFilter.GaussianBlur(26 * s)); canvas.paste((14, 12, 32, 255), (0, 0), shadow)
    # side buttons sit behind the body
    d = ImageDraw.Draw(canvas)
    for side_, top, ln, wd in btns:
        y1 = y0 + int(bh * top) * s; y2 = y1 + int(bh * ln) * s
        if side_ == 'l': box = (x0 - wd * s, y1, x0 + 8 * s, y2)
        else: box = (x0 + (bw - 8) * s, y1, x0 + (bw + wd) * s, y2)
        d.rounded_rectangle(box, 4 * s, fill=(150, 150, 154, 255) if kind == 'ios' else (84, 86, 90, 255))
    # body: metal rim, then black glass, then the screen
    bm = rr((W, H), (x0, y0, x0 + bw * s, y0 + bh * s), rad * s)
    canvas.paste(metal(W, H, [(p * (bw * s) / W + x0 / W, c) for p, c in stops]).convert('RGBA'), (0, 0), bm)
    ix = x0 + rim * s; iy = y0 + rim * s
    gl = rr((W, H), (ix, iy, ix + (sw + 2 * bez) * s, iy + (sh + 2 * bez) * s), (rad - rim) * s)
    canvas.paste((6, 6, 8, 255), (0, 0), gl)
    sx, sy = ix + bez * s, iy + bez * s
    sm = rr((W, H), (sx, sy, sx + sw * s, sy + sh * s), srad * s)
    canvas.paste(screen.resize((sw * s, sh * s), Image.LANCZOS).convert('RGBA'), (sx, sy), sm.crop((sx, sy, sx + sw * s, sy + sh * s)))
    if kind == 'android':  # punch-hole camera, centred
        d = ImageDraw.Draw(canvas); cx, cy, r = sx + sw * s // 2, sy + 46 * s, 19 * s
        d.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(4, 4, 6, 255)); d.ellipse((cx - r // 3, cy - r // 3, cx + r // 3, cy + r // 3), fill=(24, 26, 40, 255))
    return canvas.resize((W // SS, H // SS), Image.LANCZOS)

def ios_screen(n):
    im = Image.open(f'{L}native_{n}.png').convert('RGB'); S = 3; B = 96; k = (16, 21, 28)
    # iPhone 16 Pro Max proportions: 1320 x 2868. Trim the foot of the 20:9 capture to fit
    im = im.crop((0, 0, 1080, 2346))
    bg = im.getpixel((540, B + 6)); bar = Image.new('RGB', (1080 * S, B * S), bg); d = ImageDraw.Draw(bar)
    d.text((118 * S, 30 * S), '9:41', fill=k, font=ImageFont.truetype(r'C:\Windows\Fonts\segoeuib.ttf', 42 * S))
    x = 804
    for i in range(4):
        h = 12 + i * 8; d.rounded_rectangle(((x + i * 15) * S, (70 - h) * S, (x + i * 15 + 10) * S, 70 * S), 2 * S, fill=k)
    cx, cy = 898, 72
    for r in (34, 22): d.arc(((cx - r) * S, (cy - r) * S, (cx + r) * S, (cy + r) * S), 225, 315, fill=k, width=7 * S)
    d.ellipse(((cx - 6) * S, (cy - 12) * S, (cx + 6) * S, cy * S), fill=k)
    d.rounded_rectangle((946 * S, 44 * S, 1006 * S, 74 * S), 9 * S, outline=k, width=3 * S); d.rounded_rectangle((951 * S, 49 * S, 1001 * S, 69 * S), 5 * S, fill=k); d.rectangle((1009 * S, 53 * S, 1014 * S, 65 * S), fill=k)
    d.rounded_rectangle((372 * S, 18 * S, 708 * S, 90 * S), 36 * S, fill=(0, 0, 0))  # Dynamic Island
    d.ellipse((664 * S, 40 * S, 692 * S, 68 * S), fill=(18, 20, 34))
    im.paste(bar.resize((1080, B), Image.LANCZOS), (0, 0))
    # iOS home indicator
    d2 = ImageDraw.Draw(im); d2.rounded_rectangle((380, 2346 - 26, 700, 2346 - 16), 5, fill=k)
    return im

def android_screen(n):
    # clean status bar with full signal, Wi-Fi and battery, as Play asks
    im = Image.open(f'{L}native_{n}.png').convert('RGB'); S = 3; B = 92; k = (16, 21, 28)
    bar = Image.new('RGB', (1080 * S, B * S), im.getpixel((540, B + 6))); d = ImageDraw.Draw(bar)
    d.text((86 * S, 24 * S), '9:00', fill=k, font=ImageFont.truetype(r'C:\Windows\Fonts\segoeuib.ttf', 36 * S))
    cx, cy = 838, 66
    for r in (30, 20): d.arc(((cx - r) * S, (cy - r) * S, (cx + r) * S, (cy + r) * S), 225, 315, fill=k, width=6 * S)
    d.ellipse(((cx - 5) * S, (cy - 10) * S, (cx + 5) * S, cy * S), fill=k)
    d.polygon([(880 * S, 66 * S), (922 * S, 66 * S), (922 * S, 26 * S)], fill=k)
    d.rounded_rectangle((940 * S, 34 * S, 992 * S, 62 * S), 7 * S, fill=k); d.rectangle((994 * S, 42 * S, 999 * S, 54 * S), fill=k)
    im.paste(bar.resize((1080, B), Image.LANCZOS), (0, 0))
    return im

for n in N:
    device(ios_screen(n), 'ios').save(f'{L}dev_ios_{n}.png')
    device(android_screen(n), 'android').save(f'{L}devb_android_{n}.png')
print('ok')
