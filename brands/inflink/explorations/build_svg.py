# Inflink vector set: logo variants, icons, objects, patterns. Run: py build_svg.py
import os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'final', 'assets', 'svg')
os.makedirs(OUT, exist_ok=True)
SRC = r"C:\Users\user\Desktop\NEWINFLINK\docs\handoff-mobile-2026-10\inflink-mobile-app\project\uploads\inflink logo svg.svg"
INK, VI, PE, LI, MI, BL, DEEP, CAN, WH, CO, EL = '#16151C', '#6D5EF8', '#FF8F6B', '#C9C3FF', '#ECE9FF', '#FFD3E0', '#1C1840', '#FAFAF7', '#FFFFFF', '#FF6B6B', '#3B4BFF'

def save(name, body, w, h, vb=None):
    vb = vb or f'0 0 {w} {h}'
    open(f'{OUT}/{name}.svg', 'w', encoding='utf-8').write(f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="{vb}">{body}</svg>')

# ---------- logo: original paths, cropped tight ----------
paths = re.findall(r'<path class="cls-2" d="([^"]+)"', open(SRC, encoding='utf-8').read())
word = lambda c: ''.join(f'<path fill="{c}" d="{d}"/>' for d in paths)
def dots(a, b):
    return f'<circle fill="{a}" cx="287.27" cy="358.66" r="147.52"/><circle fill="{b}" cx="406.6" cy="478" r="95.96"/>'
LV = '139.75 211.14 1463 362.82'
import math
def mono(c, gap=16):
    x1, y1, r1, x2, y2, r2 = 287.27, 358.66, 147.52, 406.6, 478, 95.96 + gap
    dx, dy = x2 - x1, y2 - y1; D = math.hypot(dx, dy); a = (r1 * r1 - r2 * r2 + D * D) / (2 * D); h = math.sqrt(r1 * r1 - a * a)
    mx, my = x1 + a * dx / D, y1 + a * dy / D
    p1 = (mx + h * dy / D, my - h * dx / D); p2 = (mx - h * dy / D, my + h * dx / D)
    return f'<path fill="{c}" d="M{p1[0]:.2f},{p1[1]:.2f}A{r1},{r1} 0 1 0 {p2[0]:.2f},{p2[1]:.2f}A{r2},{r2} 0 0 1 {p1[0]:.2f},{p1[1]:.2f}Z"/><circle fill="{c}" cx="{x2}" cy="{y2}" r="95.96"/>'
for n, a, b, c in [('logo_primary', PE, VI, INK), ('logo_reversed', PE, VI, WH)]:
    save(n, dots(a, b) + word(c), 1463, 362.82, LV)
save('logo_ink', mono(INK) + word(INK), 1463, 362.82, LV)
save('logo_white', mono(WH) + word(WH), 1463, 362.82, LV)
MV = '139.75 211.14 362.81 362.82'
save('mark_primary', dots(PE, VI), 362.81, 362.82, MV)
save('mark_ink', mono(INK), 362.81, 362.82, MV)
save('mark_white', mono(WH), 362.81, 362.82, MV)
save('wordmark_ink', word(INK), 1040, 343, '546 222 1040 343')

# ---------- icons: 64 grid, 4 stroke, round; one peach and one violet shape carry the colour ----------
L = f'fill="none" stroke="{INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"'
def d(cx, cy, r, c):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{c}"/>'
ICONS = {
    'reel': d(32, 32, 13, PE) + f'<rect x="14" y="6" width="36" height="52" rx="9" {L}/><path d="M27 23v18l14-9z" {L}/>',
    'story': d(32, 32, 11, VI) + f'<path d="M32 8a24 24 0 0 1 24 24M56 32a24 24 0 0 1-24 24M32 56A24 24 0 0 1 8 32" {L}/><path d="M8 32A24 24 0 0 1 32 8" {L} stroke-dasharray="1 8"/>',
    'post': f'<rect x="8" y="8" width="48" height="48" rx="10" {L}/>' + d(24, 25, 7, PE) + f'<path d="M9 45l14-11 10 8 9-7 13 11" {L}/>',
    'ugc': d(32, 25, 8, PE) + f'<rect x="16" y="5" width="32" height="54" rx="8" {L}/><path d="M23 47a9 9 0 0 1 18 0" {L}/>',
    'venue': f'<path d="M32 58S12 39 12 25a20 20 0 0 1 40 0c0 14-20 33-20 33z" {L}/>' + d(32, 25, 8, VI),
    'consult': d(21, 30, 7, PE) + f'<rect x="6" y="14" width="36" height="36" rx="9" {L}/><path d="M42 28l16-9v26l-16-9" {L}/>',
    'merch': f'<path d="M12 22h40l3 36H9z" {L}/><path d="M23 22v-4a9 9 0 0 1 18 0v4" {L}/>' + d(32, 40, 8, VI),
    'held': f'<rect x="11" y="27" width="42" height="31" rx="9" {L}/><path d="M20 27v-8a12 12 0 0 1 24 0v8" {L}/>' + d(32, 42, 6, PE),
    'payout': d(32, 28, 19, MI) + f'<circle cx="32" cy="28" r="20" {L}/><path d="M32 18v20M24 31l8 8 8-8" {L}/><path d="M12 58h40" {L}/>',
    'brief': f'<path d="M14 6h24l12 12v40H14z" {L}/><path d="M38 6v12h12" {L}/>' + d(25, 30, 5, PE) + f'<path d="M34 30h8M22 42h20M22 50h13" {L}/>',
    'link': f'<circle cx="24" cy="26" r="17" fill="{PE}"/><circle cx="41" cy="42" r="12" fill="{VI}"/>',
    'qr': f'<rect x="8" y="8" width="18" height="18" rx="4" {L}/><rect x="38" y="8" width="18" height="18" rx="4" {L}/><rect x="8" y="38" width="18" height="18" rx="4" {L}/>' + d(42, 42, 5, PE) + d(52, 52, 4, VI),
    'digitals': f'<rect x="8" y="16" width="30" height="40" rx="5" {L} transform="rotate(-7 23 36)"/><rect x="26" y="10" width="30" height="40" rx="5" fill="{CAN}" stroke="{INK}" stroke-width="4"/>' + d(41, 25, 7, PE) + f'<path d="M33 41h16" {L}/>',
    'diary': f'<rect x="8" y="12" width="48" height="44" rx="9" {L}/><path d="M8 26h48M21 6v11M43 6v11" {L}/>' + d(40, 41, 7, VI) + f'<path d="M20 36h4M20 46h4" {L}/>',
    'analytics': f'<path d="M12 56V38M32 56V26M52 56V14" {L}/>' + d(12, 25, 5, PE) + d(32, 13, 5, VI) + f'<path d="M6 60h52" {L}/>',
    'approve': d(32, 32, 24, MI) + f'<circle cx="32" cy="32" r="25" {L}/><path d="M21 33l8 8 15-17" {L}/>',
}
for n, b in ICONS.items():
    save('icon_' + n, b, 64, 64)

# ---------- objects: 800 grid still lifes from circles, pills and rounded boxes ----------
OBJ = {
    # the kit: ring light and phone
    'ringlight': f'<circle cx="400" cy="340" r="290" fill="{PE}"/><circle cx="400" cy="340" r="190" fill="{CAN}"/><rect x="316" y="150" width="168" height="370" rx="34" fill="{INK}"/><rect x="330" y="166" width="140" height="338" rx="22" fill="{VI}"/><circle cx="400" cy="300" r="42" fill="{BL}"/><rect x="386" y="630" width="28" height="150" fill="{INK}"/><rect x="290" y="760" width="220" height="28" rx="14" fill="{INK}"/>',
    # money held: coin behind ribs
    'held': f'<rect x="60" y="60" width="680" height="680" rx="70" fill="{MI}"/><circle cx="400" cy="400" r="230" fill="{VI}"/><circle cx="400" cy="400" r="150" fill="{EL}"/>' + ''.join(f'<rect x="{60 + i * 113.3:.1f}" y="60" width="50" height="680" fill="{WH}" opacity=".28"/>' for i in range(6)) + f'<rect x="60" y="60" width="680" height="680" rx="70" fill="none" stroke="{INK}" stroke-width="0"/>',
    # the address
    'address': f'<circle cx="290" cy="290" r="220" fill="{PE}"/><circle cx="470" cy="470" r="145" fill="{VI}"/><rect x="60" y="590" width="680" height="140" rx="70" fill="{INK}"/><circle cx="660" cy="660" r="46" fill="{CAN}"/><path d="M640 660h38M662 642l18 18-18 18" fill="none" stroke="{INK}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/><rect x="120" y="648" width="330" height="24" rx="12" fill="{CAN}"/>',
    # the product: a bottle and a sun
    'bottle': f'<circle cx="540" cy="280" r="210" fill="{PE}"/><rect x="310" y="120" width="120" height="130" rx="18" fill="{INK}"/><rect x="220" y="240" width="300" height="490" rx="60" fill="{VI}"/><rect x="220" y="520" width="300" height="210" rx="0" fill="{DEEP}"/><rect x="220" y="670" width="300" height="60" rx="30" fill="{DEEP}"/><rect x="60" y="730" width="680" height="24" rx="12" fill="{INK}"/>',
    # the diary: one day taken
    'diary': f'<rect x="80" y="110" width="640" height="600" rx="70" fill="{WH}"/><rect x="80" y="110" width="640" height="150" rx="70" fill="{INK}"/><rect x="80" y="190" width="640" height="70" fill="{INK}"/><rect x="220" y="60" width="40" height="110" rx="20" fill="{VI}"/><rect x="540" y="60" width="40" height="110" rx="20" fill="{VI}"/>' + ''.join(f'<circle cx="{180 + c * 110}" cy="{340 + r * 110}" r="{38}" fill="{PE if (r, c) == (1, 2) else (VI if (r, c) == (2, 3) else MI)}"/>' for r in range(3) for c in range(5)),
    # digitals: frames
    'digitals': f'<rect x="130" y="110" width="360" height="470" rx="20" fill="{MI}" transform="rotate(-9 310 345)"/><rect x="320" y="150" width="360" height="470" rx="20" fill="{BL}" transform="rotate(7 500 385)"/><rect x="220" y="230" width="360" height="470" rx="20" fill="{WH}"/><rect x="246" y="256" width="308" height="340" rx="10" fill="{VI}"/><circle cx="400" cy="380" r="66" fill="{PE}"/><path d="M290 596a110 110 0 0 1 220 0z" fill="{INK}"/><rect x="246" y="630" width="130" height="22" rx="11" fill="{INK}"/>',
    # the drink: hospitality collab
    'drink': f'<circle cx="400" cy="300" r="250" fill="{LI}"/><path d="M230 240h340l-44 490a30 30 0 0 1-30 28H304a30 30 0 0 1-30-28z" fill="{VI}"/><path d="M252 480h296l-22 250a30 30 0 0 1-30 28H304a30 30 0 0 1-30-28z" fill="{PE}"/><rect x="200" y="210" width="400" height="44" rx="22" fill="{INK}"/><rect x="450" y="40" width="26" height="190" rx="13" fill="{INK}" transform="rotate(14 463 135)"/><circle cx="310" cy="190" r="70" fill="{PE}"/>',
    # approval
    'approve': f'<circle cx="340" cy="340" r="280" fill="{VI}"/><circle cx="560" cy="560" r="180" fill="{PE}"/><path d="M210 345l100 100 170-200" fill="none" stroke="{WH}" stroke-width="56" stroke-linecap="round" stroke-linejoin="round"/>',
}
for n, b in OBJ.items():
    save('object_' + n, b, 800, 800)

# ---------- patterns: each a square tile sheet, 1200 x 1200 ----------
def pat_pairs(bg, a, b, s=240):
    o = f'<rect width="1200" height="1200" fill="{bg}"/>'
    for r in range(5):
        for c in range(5):
            x, y = c * s + s * .38, r * s + s * .38
            o += f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{s * .27:.1f}" fill="{a}"/><circle cx="{x + s * .22:.1f}" cy="{y + s * .22:.1f}" r="{s * .175:.1f}" fill="{b}"/>'
    return o
def pat_chain(bg, a, b, s=200):
    o = f'<rect width="1200" height="1200" fill="{bg}"/>'
    for r in range(7):
        for c in range(7):
            col = a if (r + c) % 2 == 0 else b
            o += f'<circle cx="{c * s}" cy="{r * s}" r="{s * .62:.1f}" fill="none" stroke="{col}" stroke-width="{s * .09:.1f}"/>'
    return o
def pat_ribs(bg, a, n=15):
    w = 1200 / n; o = f'<rect width="1200" height="1200" fill="{bg}"/>'
    for i in range(n):
        o += f'<rect x="{i * w:.1f}" width="{w * .5:.1f}" height="1200" fill="{a}"/>'
    return o
def pat_ripple(bg, a, b):
    o = f'<rect width="1200" height="1200" fill="{bg}"/>'
    for i, r in enumerate(range(1000, 40, -80)):
        o += f'<circle cx="440" cy="440" r="{r}" fill="{a if i % 2 == 0 else bg}"/>'
    for i, r in enumerate(range(420, 20, -56)):
        o += f'<circle cx="840" cy="840" r="{r}" fill="{b if i % 2 == 0 else bg}"/>'
    return o
save('pattern_pairs', pat_pairs(CAN, PE, VI), 1200, 1200)
save('pattern_pairs_dark', pat_pairs(DEEP, PE, LI), 1200, 1200)
save('pattern_chain', pat_chain(VI, LI, LI), 1200, 1200)
save('pattern_ribs', pat_ribs(MI, VI), 1200, 1200)
save('pattern_ribs_peach', pat_ribs(BL, PE), 1200, 1200)
save('pattern_ripple', pat_ripple(CAN, PE, VI), 1200, 1200)

# contact sheet for checking in a browser
names = sorted(os.listdir(OUT))
open(OUT + '/_sheet.html', 'w').write('<body style="margin:0;background:#ddd;display:flex;flex-wrap:wrap;gap:12px;padding:12px">' + ''.join(f'<img src="{n}" style="height:{70 if n.startswith("icon") else 190}px;background:{"#16151C" if "white" in n or "reversed" in n else "#fff"}">' for n in names if n.endswith('.svg')) + '</body>')
print(len(names))
