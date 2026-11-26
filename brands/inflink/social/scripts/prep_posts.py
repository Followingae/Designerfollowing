# Crops the chosen images for both brands' two-month posts. py prep_posts.py <pool.json>
import json, os, sys
import numpy as np
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
pool = json.load(open(sys.argv[1]))
BR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
HG = r'C:\Users\user\Desktop\Inflink Design System\higgsfield-assets\creator-images\\'
def crop(src, out, fx=.5, fy=.3, w=1350, h=1688, foot=.82, bottom=.58):
    im = Image.open(src).convert('RGB'); s = max(w / im.width, h / im.height)
    im = im.resize((int(im.width * s + .5), int(im.height * s + .5)), Image.LANCZOS)
    x, y = int((im.width - w) * fx), int((im.height - h) * fy)
    a = np.asarray(im.crop((x, y, x + w, y + h))).astype(float) / 255
    if foot:
        t = np.linspace(0, 1, h)[:, None, None]; a = a * (1 - np.clip((t - (1 - bottom)) / bottom, 0, 1) ** 1.25 * foot)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    Image.fromarray((a * 255).astype('uint8')).save(out, quality=88)
def small(src, out, m=1100):
    im = Image.open(src).convert('RGB'); im.thumbnail((m, m), Image.LANCZOS); im.save(out, quality=88)
# Following, December
F = BR + r'\following\social\assets\photos\\'
for name, idx, fy in [('d_sil', 20, .3), ('d_neon', 29, .3), ('d_night', 5, .4), ('d_red', 30, .4), ('d_sun', 41, .25), ('d_grey', 239, .4), ('d_kit', 216, .5), ('d_purple', 215, .5), ('d_dj', 236, .3), ('d_leather', 246, .5), ('d_roses', 248, .4), ('d_dessert', 235, .15), ('d_friends', 238, .35), ('d_man', 247, .25), ('d_joy', 245, .3)]:
    crop(pool[idx], F + name + '.jpg', fy=fy)
# Inflink: windows and full-bleed versions of each image
L = BR + r'\inflink\final\assets\links\\'; H = BR + r'\inflink\social\assets\hook2\\'
M = {'coat': pool[4], 'party': pool[7], 'desk': pool[9], 'stickers': pool[10], 'beauty': pool[18], 'blue': pool[21], 'jacket': pool[26], 'burger': pool[27], 'chair': pool[28], 'maroon': pool[8], 'burj': pool[17], 'bottle': pool[6], 'flowers': pool[2],
     'reel': HG + 'reel.png', 'story': HG + 'story.png', 'ugc': HG + 'ugc.png', 'venue': HG + 'venue.png', 'avatar': HG + 'avatar.png', 'cover': HG + 'cover.png'}
for k, p in M.items():
    small(p, f'{L}pool_{k}.jpg'); crop(p, f'{H}x_{k}.jpg', fy=.28)
print('ok', len(M))
