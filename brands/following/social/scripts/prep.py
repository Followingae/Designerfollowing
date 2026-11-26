# Following social: crops with soft scrims, logo SVGs, the helper library. Run: py prep.py
import os, re, shutil
import numpy as np
from PIL import Image
SOC = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BR = os.path.dirname(SOC)
L = os.path.join(BR, 'final', 'assets', 'links')
OUT = os.path.join(SOC, 'assets', 'photos')
os.makedirs(OUT, exist_ok=True)
os.makedirs(SOC + '/assets/svg', exist_ok=True)

def crop(name, src, fx, fy, w=1620, h=2025, zoom=1.0, top=.0, bottom=.5):
    im = Image.open(os.path.join(L, src)).convert('RGB')
    s = max(w / im.width, h / im.height) * zoom
    im = im.resize((int(im.width * s + .5), int(im.height * s + .5)), Image.LANCZOS)
    x = int((im.width - w) * fx); y = int((im.height - h) * fy)
    a = np.asarray(im.crop((x, y, x + w, y + h))).astype(float) / 255
    t = np.linspace(0, 1, h)[:, None, None]
    # soft dark foot so white type holds, and an optional soft head
    foot = np.clip((t - (1 - bottom)) / bottom, 0, 1) ** 1.6 * .72
    head = np.clip((top - t) / max(top, .001), 0, 1) ** 1.6 * .4 if top else 0
    a = a * (1 - foot) * (1 - head)
    Image.fromarray((a * 255).astype('uint8')).save(f'{OUT}/{name}.jpg', quality=91)

P = [
    ('n01', 'Joyful Connection HR.png', .62, .3), ('n03', 'Man with Smartphone Outdoors HR.png', .55, .25),
    ('n05', 'Sporty Duo Portrait HR.png', .5, .35), ('n07', 'Dessert in the Sky HR.png', .5, .15),
    ('n09', 'Fashionable Youth HR.png', .5, .3), ('n11', 'DJ in Tropical Vibes HR.png', .6, .3),
    ('n13', 'Focused Woman in Crowd.png', .5, .3), ('n15', 'Dessert in the Sky HR.png', .5, .75),
    ('n17', 'Perfume and Roses Display.png', .5, .5), ('n19', 'Celebrity Arrival Scene HR.png', .5, .3),
    ('n21', 'Verdant Canopy Textures HR.png', .5, .5),
]
for n, s, x, y in P:
    crop(n, s, x, y)
crop('s_a', 'Joyful Connection HR.png', .62, .3, 1080, 1920)
crop('s_b', 'Dessert in the Sky HR.png', .5, .15, 1080, 1920)
crop('s_c', 'Sporty Duo Portrait HR.png', .5, .35, 1080, 1920)
crop('ugc', 'Luxury Dropper Bottle on Rocky Surface.png', .5, .5, 1200, 1200, bottom=.001)

# logo, from the guidelines source
src = open(os.path.join(BR, '..', 'inflink', 'final', 'assets', 'svg', 'following_ink.svg'), encoding='utf-8').read()
shutil.copy(os.path.join(BR, '..', 'inflink', 'final', 'assets', 'svg', 'following_ink.svg'), SOC + '/assets/svg/logo_ink.svg')
print(re.findall(r'fill[=:]"?#?[0-9A-Fa-f]{3,6}', src)[:4], re.findall(r'\.st\d+\s*\{[^}]*\}', src)[:3])
white = re.sub(r'#050911', '#FFFFFF', src, flags=re.I)
open(SOC + '/assets/svg/logo_white.svg', 'w', encoding='utf-8').write(white)

# helper library: same engine as the Inflink guidelines, Following palette and type
s = open(os.path.join(BR, '..', 'inflink', 'explorations', 'il.jsx'), encoding='utf-8', newline='').read()
s = s.replace('Inflink guidelines helpers', 'Following social helpers')
s = s.replace("IL.ROOT = 'C:/Users/user/Desktop/DesignerFollowing/brands/inflink/';", "IL.ROOT = 'C:/Users/user/Desktop/DesignerFollowing/brands/following/social/';")
s = s.replace("IL.A = IL.ROOT + 'final/assets/';", "IL.A = IL.ROOT + 'assets/';")
s = s.replace("IL.FILE = IL.ROOT + 'final/Inflink_Brand_Guidelines.ai';", "IL.FILE = IL.ROOT + 'Following_Instagram.ai';")
s = s.replace('Inflink_Brand_Guidelines.ai', 'Following_Instagram.ai')
s = s.replace("'Inflink / '", "'Following / '")
s = re.sub(r"IL\.PAL = \{.*?\};", "IL.PAL = { Ink: '050911', White: 'FFFFFF', Lime: 'D3FF02', Violet: '5100F3', Lilac: 'C9A7F9', Forest: '1E3F20', Deep: '130042', Cream: 'F6F3EB', Grey: '6B6F76', Orange: 'FF6A13', Pink: 'FF3EA5', Rule: 'E4E4E2', Red: 'C8102E', Green: '00732F' };", s, count=1, flags=re.S)
s = re.sub(r"IL\.F = \{.*?\};", "IL.F = { EB: 'PlusJakartaSans-ExtraBold', B: 'PlusJakartaSans-Bold', M: 'PlusJakartaSans-Medium', I: 'PlusJakartaSansItalic-MediumItalic' };", s, count=1, flags=re.S)
open(SOC + '/scripts/sl.jsx', 'w', encoding='utf-8', newline='').write(s)
print('ok')
