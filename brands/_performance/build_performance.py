# Builds the Performance, Best times, Time tests and How to update sheets in Content_Calendar.xlsx
# from raw Business Suite pulls (pipe-separated: date|caption|format|platform|reach|views|follows|interactions|likes|comments|shares|saves|linkclicks).
# Usage: py -3 build_performance.py <raw_following_ig.txt> <raw_inflink_ig.txt> <pull date YYYY-MM-DD>
import sys, os, csv, shutil, datetime as dt, statistics as stx
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

ROOT = r'C:\Users\user\Desktop\DesignerFollowing'
XL = os.path.join(ROOT, 'Content_Calendar.xlsx')
OUT = os.path.join(ROOT, 'brands', '_performance')
raw_f, raw_i, pull = sys.argv[1], sys.argv[2], sys.argv[3]
PULL = dt.date.fromisoformat(pull)

def slot(t):
    h = t.hour + t.minute / 60
    return 'Morning (before 12)' if h < 12 else 'Midday (12-15)' if h < 15 else 'Afternoon (15-18)' if h < 18 else 'Evening (18-21)' if h < 21 else 'Late (21+)'

def num(x):
    x = (x or '').strip()
    try: return int(x)
    except ValueError: return None

def load(path, brand):
    rows = []
    for line in open(path, encoding='utf-8'):
        p = line.rstrip('\n').split('|')
        if len(p) < 12: continue
        d = dt.datetime.strptime(p[0].split(' ', 1)[1] + ' 2026', '%b %d, %I:%M%p %Y')
        r = dict(brand=brand, platform='Instagram', when=d, caption=p[1], fmt=p[2], reach=num(p[4]), views=num(p[5]), follows=num(p[6]),
                 likes=num(p[8]), comments=num(p[9]), shares=num(p[10]), saves=num(p[11]), clicks=num(p[12]) if len(p) > 12 else None)
        rows.append(r)
    return rows

rows = load(raw_f, 'Following') + load(raw_i, 'Inflink')

# raw CSVs kept with the workbook
for brand in ('following', 'inflink'):
    with open(os.path.join(OUT, f'raw_{pull}_{brand}.csv'), 'w', newline='', encoding='utf-8') as f:
        w = csv.writer(f); w.writerow(['brand', 'platform', 'published', 'format', 'caption', 'reach', 'views', 'follows', 'likes', 'comments', 'shares', 'saves', 'link_clicks'])
        for r in rows:
            if r['brand'].lower() == brand:
                w.writerow([r['brand'], r['platform'], r['when'].strftime('%Y-%m-%d %H:%M'), r['fmt'], r['caption'], r['reach'], r['views'], r['follows'], r['likes'], r['comments'], r['shares'], r['saves'], r['clicks']])

shutil.copy(XL, os.path.join(ROOT, f'Content_Calendar_backup_{pull}.xlsx'))
wb = openpyxl.load_workbook(XL)

# match post IDs from the brand sheets by caption start, then by date
ids = {}
for brand in ('Following', 'Inflink'):
    ws = wb[brand]
    for r in ws.iter_rows(min_row=5, values_only=True):
        if r[9] and r[7]: ids.setdefault(brand, []).append((str(r[7]).strip().lower(), str(r[0]), r[9]))
def match(r):
    cap = r['caption'].strip().lower()
    for c, d, pid in ids.get(r['brand'], []):
        if c[:30] and (c[:30] == cap[:30] or cap[:25] in c or c[:25] in cap): return pid
    return ''

for name in ('Performance', 'Best times', 'Time tests', 'How to update'):
    if name in wb.sheetnames: del wb[name]

H = Font(bold=True, color='FFFFFF'); HF = PatternFill('solid', fgColor='16151C'); B = Font(bold=True)
def header(ws, cols, row=1):
    for i, c in enumerate(cols, 1):
        cell = ws.cell(row=row, column=i, value=c); cell.font = H; cell.fill = HF; cell.alignment = Alignment(vertical='center', wrap_text=True)

# ---- Performance
ws = wb.create_sheet('Performance')
cols = ['Brand', 'Platform', 'Date', 'Day', 'Time', 'Time slot', 'Post ID', 'Format', 'Hook / caption', 'Reach', 'Views', 'Likes', 'Comments', 'Shares', 'Saves', 'Follows', 'Link clicks', 'Engagement rate', 'Note']
header(ws, cols)
rows.sort(key=lambda r: (r['brand'], r['when']))
for i, r in enumerate(rows, 2):
    age = (PULL - r['when'].date()).days
    note = 'Catch-up post, under 1 day old: excluded from best times' if age < 2 else ('Boosted (reach includes ads): excluded' if 'boosted' in r['caption'].lower() else '')
    r['use'] = not note
    vals = [r['brand'], r['platform'], r['when'].date(), r['when'].strftime('%a'), r['when'].time(), slot(r['when']), match(r), r['fmt'], r['caption'],
            r['reach'], r['views'], r['likes'], r['comments'], r['shares'], r['saves'], r['follows'], r['clicks'], None, note]
    for j, v in enumerate(vals, 1): ws.cell(row=i, column=j, value=v)
    ws.cell(row=i, column=18, value=f'=IF(N(J{i})=0,"",(N(L{i})+N(M{i})+N(N{i})+N(O{i}))/J{i})')
    ws.cell(row=i, column=3).number_format = 'DD MMM YYYY'; ws.cell(row=i, column=5).number_format = 'HH:MM'; ws.cell(row=i, column=18).number_format = '0.0%'
for j, wdt in enumerate([10, 10, 13, 6, 7, 18, 8, 10, 48, 8, 8, 7, 9, 7, 7, 8, 10, 11, 44], 1): ws.column_dimensions[get_column_letter(j)].width = wdt
ws.freeze_panes = 'A2'; ws.auto_filter.ref = f'A1:S{len(rows) + 1}'

# ---- Best times (computed values; source rows only those marked usable)
def er(r):
    if not r['reach']: return None
    return ((r['likes'] or 0) + (r['comments'] or 0) + (r['shares'] or 0) + (r['saves'] or 0)) / r['reach']
bt = wb.create_sheet('Best times')
bt['A1'] = 'Best times to post'; bt['A1'].font = Font(bold=True, size=14)
bt['A2'] = f'From Business Suite, last 90 days, pulled {pull}. Posts under 2 days old and boosted posts are left out. Small samples: treat as direction, not proof. The Time tests sheet fills the gaps.'
ACTIVE = {'Following': 'Instagram suggests 4 PM, 6 PM, 9 PM (Business Suite Active times, 24-26 Nov). Facebook page suggests 11 PM.',
          'Inflink': 'Business Suite shows no active-time data yet (audience too small).'}
REC = {}
row = 4
for brand in ('Following', 'Inflink'):
    use = [r for r in rows if r['brand'] == brand and r['use'] and r['reach']]
    bt.cell(row=row, column=1, value=brand).font = Font(bold=True, size=12); row += 1
    bt.cell(row=row, column=1, value=f'Posts used: {len(use)}'); row += 1
    bt.cell(row=row, column=1, value='Audience online: ' + ACTIVE[brand]); row += 2
    for label, key in (('By time slot', lambda r: slot(r['when'])), ('By weekday', lambda r: r['when'].strftime('%a'))):
        header(bt, [label, 'Posts', 'Avg reach', 'Median reach', 'Avg engagement rate'], row); row += 1
        groups = {}
        for r in use: groups.setdefault(key(r), []).append(r)
        order = sorted(groups.items(), key=lambda kv: -stx.mean([x['reach'] for x in kv[1]]))
        for k, g in order:
            e = [er(x) for x in g if er(x) is not None]
            for j, v in enumerate([k, len(g), round(stx.mean([x['reach'] for x in g]), 1), stx.median([x['reach'] for x in g]), stx.mean(e) if e else None], 1):
                c = bt.cell(row=row, column=j, value=v)
                if j == 5: c.number_format = '0.0%'
            row += 1
        if label == 'By time slot': REC.setdefault(brand, {})['slots'] = [(k, len(g), stx.mean([x['reach'] for x in g])) for k, g in order]
        row += 1
    top = REC[brand]['slots'][:3]
    header(bt, ['Top 3 slots by avg reach', 'Posts', 'Avg reach'], row); row += 1
    for k, n, a in top:
        bt.cell(row=row, column=1, value=k); bt.cell(row=row, column=2, value=n); bt.cell(row=row, column=3, value=round(a, 1)); row += 1
    row += 1
    rec = {'Following': 'Evening leads (avg reach 212) but on 2 posts, one of them a Reel. Photo and carousel posts reach about the same at midday (140) and morning (137). Instagram says the audience is most active at 4, 6 and 9 PM. Keep 19:00 as the default, test 17:00 and 21:00, and stop using early-morning slots.',
           'Inflink': 'Too little data to call (10 usable posts, reach 13 to 171). Strongest so far: early morning (6-7am, 87-171) and the one 21:00 carousel (125). Business Suite has no active-time data yet. Keep 19:00 as the default and run the 4-week time test before changing.'}[brand]
    c = bt.cell(row=row, column=1, value='Current recommendation: ' + rec); c.font = B; c.alignment = Alignment(wrap_text=True)
    bt.merge_cells(start_row=row, start_column=1, end_row=row, end_column=6); bt.row_dimensions[row].height = 48
    REC[brand]['rec'] = rec
    row += 3
for j, wdt in enumerate([26, 8, 11, 13, 20, 12], 1): bt.column_dimensions[get_column_letter(j)].width = wdt

# ---- Time tests: 4 weeks from 9 Dec, weekdays, rotate 4 slots so each slot runs at least twice per brand
tt = wb.create_sheet('Time tests')
tt['A1'] = 'Time tests: 4 weeks from 9 Dec 2026'; tt['A1'].font = Font(bold=True, size=14)
tt['A2'] = 'Each weekday post goes out at the planned slot. Fill the results 7 days after posting from Business Suite > Content > Published. Dated posts (Christmas, New Year) keep their fixed time and are marked.'
header(tt, ['Date', 'Day', 'Brand', 'Planned slot', 'Post ID', 'Reach (7 days)', 'Views', 'Likes', 'Comments', 'Shares', 'Saves', 'Follows', 'Engagement rate', 'Note'], 4)
SLOTS = ['12:30', '17:00', '19:00', '21:00']
FIXED = {dt.date(2026, 12, 25): 'Christmas: fixed', dt.date(2026, 12, 31): 'New Year post: fixed'}
r = 5; d = dt.date(2026, 12, 9); k = 0
while d < dt.date(2027, 1, 6):
    if d.weekday() < 5:
        for bi, brand in enumerate(('Following', 'Inflink')):
            s = SLOTS[(k + bi * 2) % 4]  # brands offset so both are not testing the same slot on the same day
            vals = [d, d.strftime('%a'), brand, s, None, None, None, None, None, None, None, None, None, FIXED.get(d, '')]
            for j, v in enumerate(vals, 1): tt.cell(row=r, column=j, value=v)
            tt.cell(row=r, column=1).number_format = 'DD MMM YYYY'
            tt.cell(row=r, column=13, value=f'=IF(N(F{r})=0,"",(N(H{r})+N(I{r})+N(J{r})+N(K{r}))/F{r})').number_format = '0.0%'
            r += 1
        k += 1
    d += dt.timedelta(days=1)
for j, wdt in enumerate([13, 6, 10, 12, 8, 13, 8, 7, 9, 7, 7, 8, 14, 24], 1): tt.column_dimensions[get_column_letter(j)].width = wdt
tt.freeze_panes = 'A5'; tt.auto_filter.ref = f'A4:N{r - 1}'

# ---- How to update
hu = wb.create_sheet('How to update')
hu['A1'] = 'Refresh every 2 weeks (at the scheduling session)'; hu['A1'].font = Font(bold=True, size=14)
steps = ['1. Business Suite > Content > Published (each brand). Filter > Placement > Instagram Feed. Last 90 days.',
         '2. Copy every row (date, caption, format, reach, views, follows, interactions, likes, comments, shares, saves, link clicks) into brands/_performance/raw_<date>_<brand>.txt, one pipe-separated line per post.',
         '3. Run: py -3 brands/_performance/build_performance.py <following raw> <inflink raw> <YYYY-MM-DD>. It backs up this workbook first and rebuilds the Performance and Best times sheets.',
         '4. Fill the Time tests rows whose post is at least 7 days old, then read Best times and move each brand\'s default slot only if a slot wins on reach twice in a row.',
         '5. Check Active times in the composer schedule dialog (Instagram and Facebook) and note any change on the Best times sheet.']
for i, s in enumerate(steps, 3): hu.cell(row=i, column=1, value=s).alignment = Alignment(wrap_text=True)
hu.column_dimensions['A'].width = 120

wb.save(XL)
wb2 = openpyxl.load_workbook(XL)
for w in wb2.worksheets: print(w.title, w.max_row)
for b in REC: print(b, 'TOP', [(k, n, round(a, 1)) for k, n, a in REC[b]['slots'][:3]])
