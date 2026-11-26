# Full-frame crops with a soft dark foot for white hooks. Run from social/.
import os
import numpy as np
from PIL import Image
L = '../final/assets/links/'; O = 'assets/hook2'; os.makedirs(O, exist_ok=True)
P = {'h1': ('creator_reel.png', .3), 'h2': ('creator_ugc.png', .3), 'h3': ('creator_avatar.png', .25), 'h4': ('digitals_front.png', .1), 'h5': ('creator_cover.png', .4), 'h6': ('creator_reel.png', .55), 'h7': ('creator_venue.png', .5), 'h8': ('creator_story.png', .5), 'h9': ('creator_avatar.png', .35)}
w, h = 1620, 2025
for k, (f, fy) in P.items():
    im = Image.open(L + f).convert('RGB'); s = max(w / im.width, h / im.height)
    im = im.resize((int(im.width * s + .5), int(im.height * s + .5)), Image.LANCZOS)
    x, y = (im.width - w) // 2, int((im.height - h) * fy)
    a = np.asarray(im.crop((x, y, x + w, y + h))).astype(float) / 255
    t = np.linspace(0, 1, h)[:, None, None]
    a = a * (1 - np.clip((t - .42) / .58, 0, 1) ** 1.25 * .88)
    Image.fromarray((a * 255).astype('uint8')).save(f'{O}/{k}.jpg', quality=90)
print('ok')
