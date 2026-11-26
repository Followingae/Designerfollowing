# Contact sheets. py gridsheet.py <in_dir> <out.jpg> <prefix> [cols] [newest_first]
import sys, glob, os
from PIL import Image
d, out, pre = sys.argv[1], sys.argv[2], sys.argv[3]
cols = int(sys.argv[4]) if len(sys.argv) > 4 else 5
fs = sorted(f for f in glob.glob(d + '/*.png') if os.path.basename(f).startswith(tuple(pre.split(','))))
if len(sys.argv) > 5:
    fs = fs[::-1]
ims = [Image.open(f).convert('RGB') for f in fs]
tw = 360
th = max(int(i.height * tw / i.width) for i in ims)
rows = (len(ims) + cols - 1) // cols
c = Image.new('RGB', (cols * (tw + 6), rows * (th + 6)), '#fff' if len(sys.argv) > 5 else '#777')
for n, i in enumerate(ims):
    c.paste(i.resize((tw, int(i.height * tw / i.width)), Image.LANCZOS), ((n % cols) * (tw + 6), (n // cols) * (th + 6)))
c.save(out, quality=88)
print(len(ims))
