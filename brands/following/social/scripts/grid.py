# Profile grid as it appears on Instagram: newest first, 3 columns, 3:4 crop. Run from social/.
import glob, os
from PIL import Image
fs = sorted(glob.glob('exports/2026-11-12_posts/N*.png'))
fs = [f for f in fs if not any(f.endswith(f'_0{k}.png') for k in (2, 3, 4, 5, 6))][::-1]
tw, th, gap = 506, 675, 4
def build(lst, out):
    rows = (len(lst) + 2) // 3
    c = Image.new('RGB', (3 * tw + 2 * gap, rows * th + (rows - 1) * gap), 'white')
    for n, f in enumerate(lst):
        im = Image.open(f).convert('RGB')
        cw = int(im.height * .75); x = (im.width - cw) // 2
        c.paste(im.crop((x, 0, x + cw, im.height)).resize((tw, th), Image.LANCZOS), ((n % 3) * (tw + gap), (n // 3) * (th + gap)))
    c.save(out, quality=90)
build(fs, 'exports/Following_grid_Nov-Dec.jpg')
build(fs[:12], 'assets/photos/grid.jpg')
print(len(fs))
