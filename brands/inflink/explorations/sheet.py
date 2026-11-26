# Contact sheet of exported pages. py sheet.py <folder> <out.jpg> [prefix filter, comma separated] [cols]
import sys, glob, os
from PIL import Image, ImageDraw
d, out = sys.argv[1], sys.argv[2]
flt = sys.argv[3].split(',') if len(sys.argv) > 3 and sys.argv[3] else None
cols = int(sys.argv[4]) if len(sys.argv) > 4 else 4
fs = sorted(glob.glob(d + '/*.png'))
if flt:
    fs = [f for f in fs if any(os.path.basename(f).startswith(p) for p in flt)]
tw, th = 640, 360
rows = (len(fs) + cols - 1) // cols
c = Image.new('RGB', (cols * (tw + 8), rows * (th + 26)), '#777')
dr = ImageDraw.Draw(c)
for i, f in enumerate(fs):
    x, y = (i % cols) * (tw + 8), (i // cols) * (th + 26)
    im = Image.open(f).convert('RGB').resize((tw, th), Image.LANCZOS)
    c.paste(im, (x, y + 22)); dr.text((x + 4, y + 5), os.path.basename(f), fill='white')
c.save(out, quality=88)
print(len(fs))
