# Checks exact size and alpha for every store asset, and writes a contact sheet. py store_check.py <out.jpg>
import os, sys
from PIL import Image
R = r'C:\Users\user\Desktop\App Stores Submission Assets'
SPEC = {'ios-icon-1024': (1024, 1024, False), 'ios-icon-1024-ALT-violet': (1024, 1024, False), 'play-icon-512': (512, 512, False), 'android-icon-foreground': (1024, 1024, True), 'android-icon-background': (1024, 1024, False), 'android-icon-monochrome': (1024, 1024, True), 'notification-icon': (96, 96, True), 'splash-icon': (1024, 1024, True), 'play-feature-1024x500': (1024, 500, False)}
for k in range(1, 9):
    pass
fs = []; bad = 0
for d, _, n in os.walk(R):
    for f in sorted(n):
        if not f.endswith('.png'): continue
        p = os.path.join(d, f); im = Image.open(p); b = f[:-4]
        if b.startswith('ios-6.9'): s = (1320, 2868, False)
        elif b.startswith('ios-6.3'): s = (1206, 2622, False)
        elif b.startswith('play-phone'): s = (1080, 1920, False)
        else: s = SPEC.get(b)
        alpha = 'A' in im.getbands()
        if alpha and im.getchannel('A').getextrema()[0] == 255: alpha = False
        ok = s and im.size == s[:2] and (alpha == s[2] or (s[2] and not alpha))
        if not ok: bad += 1
        print(('OK ' if ok else 'BAD'), f, im.size, im.mode, 'alpha' if alpha else 'opaque', os.path.getsize(p) // 1024, 'KB')
        fs.append(p)
print('bad', bad, 'total', len(fs))
if len(sys.argv) > 1:
    c = Image.new('RGB', (1600, 40 + 300 * (len(fs) // 8 + 1)), '#888');
    for n, p in enumerate(fs):
        im = Image.open(p).convert('RGBA'); im.thumbnail((190, 290)); c.paste(im, ((n % 8) * 200, (n // 8) * 300), im)
    c.save(sys.argv[1], quality=85)
