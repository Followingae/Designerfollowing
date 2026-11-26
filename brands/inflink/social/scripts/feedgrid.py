# Profile view and carousel strips. Run from social/.
from PIL import Image
tw, th, gap = 400, 533, 4
c = Image.new('RGB', (3 * tw + 2 * gap, 4 * th + 3 * gap), 'white')
for n in range(12):
    im = Image.open(f'exports/directions/P{n + 1:02d}.png').convert('RGB')
    cw = int(im.height * .75); x = (im.width - cw) // 2
    c.paste(im.crop((x, 0, x + cw, im.height)).resize((tw, th), Image.LANCZOS), ((n % 3) * (tw + gap), (n // 3) * (th + gap)))
c.save('exports/Inflink_grid_Nov-Dec.jpg', quality=90)
w, h = 300, 375
s = Image.new('RGB', (5 * w + 4 * 6, 2 * h + 20), '#777')
for r, (l, n) in enumerate((('CA', 5), ('CB', 4))):
    for k in range(n):
        s.paste(Image.open(f'exports/directions/{l}{k + 1}.png').convert('RGB').resize((w, h), Image.LANCZOS), (k * (w + 6), r * (h + 20)))
s.save('exports/Inflink_carousels.jpg', quality=90)
print(c.size, s.size)
