// Following Instagram: one system. Photo posts with stuck-on tags, white type pages, carousels, UGC frame.
var P = {};
P.M = 72;
// boards sit on rows by group. Row keys set the y; k is the column
P.board = function (name, row, k, w, h, ground) {
  if (row >= 5 && row <= 8) { k += 6; row -= 5; } else if (row === 9) row = 5;
  var d = IL.doc, i, found = -1, x = -7000 + k * 1200, y = 5200 - row * 1450;
  w = w || 1080; h = h || 1350;
  for (i = 0; i < d.artboards.length; i++) if (d.artboards[i].name === name) found = i;
  if (IL.cur) IL.show();
  IL.W = w; IL.H = h;
  var ab;
  if (found >= 0) { IL.clear(name); ab = d.artboards[found]; }
  else if (d.artboards[0].name === '_start') { ab = d.artboards[0]; ab.artboardRect = [x, y, x + w, y - h]; ab.name = name; }
  else { ab = d.artboards.add([x, y, x + w, y - h]); ab.name = name; }
  IL.cur = name; IL.org = [ab.artboardRect[0], ab.artboardRect[1]];
  IL.rect(0, 0, w, h, ground || 'White', { lay: 'Ground' });
};
// a tag stuck on at an angle
P.tag = function (cx, cy, str, fill, ink, size, rot) {
  size = size || 52;
  var t = IL.T(cx, cy + size * 0.35, str, size, ink, { w: 'EB', align: 'c', lay: 'Mark', track: -10 });
  var w = t.width + size * 1.5, h = size * 1.95;
  var r = IL.rect(cx - w / 2, cy - h / 2, w, h, fill, { r: h / 2 });
  var g = IL.lay('Mark').groupItems.add();
  t.note = ''; r.note = '';
  t.move(g, ElementPlacement.PLACEATBEGINNING); r.move(g, ElementPlacement.PLACEATEND);
  if (rot) g.rotate(rot);
  return IL.tag(g);
};
P.tags = function (a, size) { for (var i = 0; i < a.length; i++) P.tag(a[i][0], a[i][1], a[i][2], a[i][3] || 'Lime', a[i][4] || 'Ink', a[i][6] || size || 52, a[i][5]); };
// two-line headline: bold then italic. y is the first baseline
P.head = function (x, y, l1, l2, size, col) {
  var t = IL.T(x, y, l1.replace(/\n/g, '\r') + (l2 ? '\r' + l2 : ''), size, col || 'Ink', { w: 'EB', lead: size * 1.05, track: -36 });
  if (l2) { var ps = t.paragraphs, nI = l2.split('\r').length, pi; for (pi = ps.length - nI; pi < ps.length; pi++) { var q = ps[pi].characterAttributes; q.textFont = app.textFonts.getByName(IL.F.I); q.tracking = -28; } }
  // never wider than the safe width
  var maxW = IL.W - 2 * P.M - x + P.M;
  if (t.width > maxW) { var s = maxW / t.width * 100; t.resize(s, s, true, true, true, true, s, Transformation.TOPLEFT); }
  return t;
};
P.logo = function (x, y, w, v) { w = w === 160 ? 200 : w; IL.svg('logo_' + (v || 'ink'), x, y, w, w * 0.25); };
// photo post: photo fills the frame, big line at the foot, tags on top
P.photo = function (name, row, k, file, l1, l2, tags, o) {
  o = o || {};
  P.board(name, row, k);
  IL.img('photos/' + file + '.jpg', 0, 0, 1080, 1350);
  var y = l2 ? 1100 : 1190;
  P.head(P.M, y, l1, l2, o.size || 104, 'White');
  P.logo(P.M, 1250, 160, 'white');
  P.tags(tags, o.tag);
};
// white type page. y moves the headline so a row never repeats itself
P.type = function (name, row, k, l1, l2, tags, note, o) {
  o = o || {};
  P.board(name, row, k);
  P.head(P.M, o.y || 520, l1, l2, o.size || 150);
  if (note) IL.T(P.M, 1150, note, 38, 'Ink', { w: 'M', box: [720, 150], lead: 48, track: 0 });
  P.logo(1080 - P.M - 200, 1250, 160);
  P.tags(tags, o.tag);
  if (o.art) o.art();
};
// carousel inner slide: big numeral, one line, one sentence
P.slide = function (name, row, k, num, title, sub, body, tag) {
  P.board(name, row, k);
  IL.T(P.M, 320, num, 300, 'Ink', { w: 'EB', track: -40 });
  P.head(P.M, 600, title, sub, 122);
  IL.T(P.M, 900, body, 52, 'Ink', { w: 'M', box: [930, 280], lead: 66, track: 0 });
  P.logo(1080 - P.M - 200, 1250, 160);
  if (tag) P.tag(1080 - P.M - 150, 190, tag, 'Lime', 'Ink', 50, 6);
};
P.end = function (name, row, k, l1, l2, tag) {
  P.board(name, row, k, 1080, 1350, 'Lime');
  P.head(P.M, 560, l1, l2, 128);
  P.logo(P.M, 1230, 260);
  if (tag) P.tag(760, 880, tag, 'Ink', 'White', 54, -5);
};

P.november = function () {
  // week 1
  P.photo('N01_Mon02_Get_paid', 0, 0, 'n01', 'Get paid', 'to post.', [[280, 770, 'PAID COLLABS', 'Lime', 'Ink', -6], [770, 840, 'BARTER', 'White', 'Ink', 5], [330, 920, 'CASHBACK', 'Violet', 'White', 3]]);
  P.type('N02_Tue03_Flag_Day', 0, 1, 'Born\nin Dubai.', 'Building the future\rof influencer\rmarketing.', [[780, 230, 'FLAG DAY', 'Lime', 'Ink', 6]], '', { y: 560, size: 124, art: function () {
    IL.rect(P.M, 140, 70, 180, 'Red'); IL.rect(P.M + 70, 140, 190, 60, 'Green'); IL.rect(P.M + 70, 200, 190, 60, 'White', { stroke: 'Rule', sw: 1 }); IL.rect(P.M + 70, 260, 190, 60, 'Ink'); } });
  P.photo('N03_Wed04_Three_ways_01', 0, 2, 'n03', 'Three ways', 'to earn.', [[300, 790, 'HOW IT WORKS', 'Lime', 'Ink', -5], [880, 1270, 'SWIPE', 'White', 'Ink', 4, 40]]);
  P.type('N04_Thu05_Exposure', 0, 3, 'Exposure', 'doesn\'t pay rent.', [[720, 860, 'MONEY TALK', 'Lime', 'Ink', -6]], 'Get paid in AED. Or at least keep the product.', { y: 500, size: 136 });
  P.photo('N05_Fri06_On_set', 0, 4, 'n05', 'On set', 'with Following.', [[300, 830, 'ON SET', 'Lime', 'Ink', -6], [700, 910, 'PRODUCTIONS', 'White', 'Ink', 4]]);
  // week 2
  P.type('N06_Mon09_Get_picked_01', 1, 0, 'Three ways', 'to get picked.', [[760, 900, 'THE BRIEF', 'Lime', 'Ink', -5]], 'Swipe for all three.', { y: 560, size: 140 });
  P.photo('N07_Tue10_Treat', 1, 1, 'n07', 'Your next treat', 'could pay you back.', [[280, 830, 'CASHBACK', 'Lime', 'Ink', -6], [730, 910, 'HOW IT WORKS', 'White', 'Ink', 4]], { size: 88 });
  P.type('N08_Wed11_Committed', 1, 2, 'Committed.\nOwed.\nSettled.', 'Live, not in a deck.', [[770, 190, 'FOR BRANDS', 'Violet', 'White', 5]], 'Every campaign runs on the same screens you can see.', { y: 420, size: 136 });
  P.photo('N09_Thu12_Eat_out', 1, 3, 'n09', 'Eat out. Post it.', 'Get money back.', [[290, 800, 'CASHBACK', 'Lime', 'Ink', -6], [730, 880, 'SCAN THE RECEIPT', 'White', 'Ink', 4]], { size: 92 });
  P.type('N10_Fri13_Charge_01', 1, 4, 'What should', 'you charge?', [[740, 960, 'MONEY TALK', 'Lime', 'Ink', 6]], 'Four questions to ask first.', { y: 620, size: 150 });
  // week 3
  P.photo('N11_Mon16_Start_here', 2, 0, 'n11', 'Creators', 'start here.', [[340, 830, 'FOR CREATORS', 'Lime', 'Ink', -5], [760, 930, 'LINK IN BIO', 'White', 'Ink', 4]]);
  P.type('N12_Tue17_Barter', 2, 1, 'Barter is', 'a trade.', [[280, 800, 'THE BRIEF', 'Lime', 'Ink', -5]], '', { y: 250, size: 170, art: function () { IL.img('illustration/spot.png', 480, 440, 540, 540, { fit: true, ax: 1, ay: 1, lay: 'Mark' }); } });
  // UGC: a minimal white frame
  P.board('N13_Wed18_Made_on', 2, 2);
  IL.img('photos/ugc.jpg', 40, 40, 1000, 1000, { r: 0 });
  P.head(P.M, 1130, 'Made on Following.', 'Content built to be saved.', 58);
  P.logo(1080 - P.M - 200, 1250, 160);
  P.tag(190, 120, 'UGC', 'Lime', 'Ink', 54, -6);
  P.type('N14_Thu19_Customer', 2, 3, 'Your next\ncreator is', 'already your\rcustomer.', [[770, 190, 'FOR BRANDS', 'Violet', 'White', 5]], 'Cashback turns the people at your till into content.', { y: 440, size: 150 });
  P.photo('N15_Fri20_Receipt', 2, 4, 'n15', 'Your receipt', 'pays you back.', [[260, 850, 'CASHBACK', 'Lime', 'Ink', -6], [700, 930, 'SCAN IT', 'White', 'Ink', 4]]);
  // week 4
  P.type('N16_Mon23_White_Friday', 3, 0, 'White Friday', 'is this week.', [[640, 760, 'MONEY TALK', 'Lime', 'Ink', -5]], 'Get your rates ready.', { y: 340, size: 140 });
  P.photo('N17_Tue24_Brief_01', 3, 1, 'n17', 'Five things', 'every brief needs.', [[290, 820, 'FOR BRANDS', 'Violet', 'White', -5], [880, 1270, 'SWIPE', 'White', 'Ink', 4, 40]]);
  P.type('N18_Wed25_Shortlisted', 3, 2, 'Shortlisted', 'by the Qatar\rGovernment.', [[710, 240, 'STARTUPQATAR', 'Lime', 'Ink', 5]], 'Out of 50,000+ startups. Also seen on Shark Tank Dubai.', { y: 520, size: 150 });
  P.photo('N19_Thu26_Clients', 3, 3, 'n19', 'Who we', 'work with.', [[260, 170, 'DAMAS', 'White', 'Ink', -4], [700, 130, 'JOLLIBEE', 'Lime', 'Ink', 5], [840, 300, 'CAFU', 'White', 'Ink', -6], [280, 340, 'GMG', 'Lime', 'Ink', 6], [560, 450, 'PALAZZO VERSACE', 'White', 'Ink', -3], [240, 560, 'BARAKAT', 'Lime', 'Ink', 4], [790, 610, 'REBEL FOODS', 'Violet', 'White', -5], [300, 760, 'MINIMALIST', 'White', 'Ink', -4], [770, 800, 'R&B', 'Lime', 'Ink', 7], [530, 900, 'ASEEL', 'White', 'Ink', 3]], { tag: 42 });
  P.type('N20_Fri27_Earn_back', 3, 4, 'Spend it.', 'Earn it back.', [[720, 840, 'CASHBACK', 'Lime', 'Ink', -6]], 'Buy it. Post it. Get money back.', { y: 480, size: 160 });
  // week 5
  P.photo('N21_Mon30_Inflink', 4, 0, 'n21', 'Also by Following:', 'Inflink.', [[330, 790, 'LINK IN BIO', 'Lime', 'Ink', -5], [760, 880, 'FOR CREATORS', 'White', 'Ink', 4]], { size: 92 });
};

P.carousels = function () {
  // Three ways to earn
  P.slide('N03_Wed04_Three_ways_02', 5, 0, '1', 'Paid collabs.', 'Brands pay in AED.', 'Apply, post, get approved. Your payout lands in your wallet.', 'PAID');
  P.slide('N03_Wed04_Three_ways_03', 5, 1, '2', 'Barter.', 'Post it, keep it.', 'Products and experiences, in exchange for content.', 'BARTER');
  P.slide('N03_Wed04_Three_ways_04', 5, 2, '3', 'Cashback.', 'Spend. Post. Earn.', 'Scan the code at the till, add your receipt, post your Stories. Cashback lands in your wallet.', 'CASHBACK');
  P.end('N03_Wed04_Three_ways_05', 5, 3, 'All three.', 'One app.', 'LINK IN BIO');
  // Get picked
  P.slide('N06_Mon09_Get_picked_02', 6, 0, '1', 'Show your niche.', 'In your first line.', 'Brands search by what you make. Say it where they will read it.', 'TIP');
  P.slide('N06_Mon09_Get_picked_03', 6, 1, '2', 'Post your best.', 'Then post again.', 'Your last nine posts are your portfolio. Treat them that way.', 'TIP');
  P.slide('N06_Mon09_Get_picked_04', 6, 2, '3', 'Deliver on time.', 'Every time.', 'Brands remember who hit the date. So do we.', 'TIP');
  P.end('N06_Mon09_Get_picked_05', 6, 3, 'Now go', 'get picked.', 'LINK IN BIO');
  // Charge
  P.slide('N10_Fri13_Charge_02', 7, 0, '1', 'Who sees it?', 'Not how many.', 'A smaller audience in the right city can be worth more.', 'ASK');
  P.slide('N10_Fri13_Charge_03', 7, 1, '2', 'How long', 'will it take?', 'Count the shoot, the edit and the changes. Your time is the cost.', 'ASK');
  P.slide('N10_Fri13_Charge_04', 7, 2, '3', 'Can they', 'reuse it?', 'Ads and long usage are worth extra. Price them separately.', 'ASK');
  P.slide('N10_Fri13_Charge_05', 7, 3, '4', 'Is it', 'exclusive?', 'If you must turn other brands down, that has a price too.', 'ASK');
  // Brief
  P.slide('N17_Tue24_Brief_02', 8, 0, '1', 'One goal.', 'Only one.', 'Sales, sign-ups or awareness. Pick the one that matters.', 'BRIEF');
  P.slide('N17_Tue24_Brief_03', 8, 1, '2', 'The must-says.', 'Keep it short.', 'Name, offer, link. Everything else is the creator\'s.', 'BRIEF');
  P.slide('N17_Tue24_Brief_04', 8, 2, '3', 'The must-nots.', 'Be clear.', 'Claims, competitors and places to avoid.', 'BRIEF');
  P.slide('N17_Tue24_Brief_05', 8, 3, '4', 'The dates.', 'All of them.', 'Draft, approval and live date, agreed up front.', 'BRIEF');
  P.slide('N17_Tue24_Brief_06', 8, 4, '5', 'Room to', 'be themselves.', 'People follow the creator, not your script.', 'BRIEF');
};

P.stories = function () {
  var W = 1080, H = 1920;
  P.board('S1_Photo', 9, 0, W, H); IL.img('photos/s_a.jpg', 0, 0, W, H); P.tag(320, 1180, 'CREATOR SPOTLIGHT', 'Lime', 'Ink', 60, -5);
  P.board('S2_Type', 9, 1, W, H); P.head(P.M, 760, 'Got paid', 'this week?', 150); P.tag(760, 1060, 'TELL US', 'Lime', 'Ink', 60, -5);
  P.board('S3_Poll', 9, 2, W, H); P.head(P.M, 620, 'Paid or barter?', 'Be honest.', 120); IL.rect(P.M, 860, 936, 300, 'White', { stroke: 'Ink', sw: 4, r: 40 }); IL.T(540, 1020, 'Add the poll sticker here', 36, 'Grey', { align: 'c', lay: 'Notes' });
  P.board('S4_Deal', 9, 3, W, H); IL.img('photos/s_b.jpg', 0, 0, W, H); P.tag(320, 1180, 'DEAL DROP', 'Lime', 'Ink', 54, -6); P.head(P.M, 1420, 'New in', 'the app.', 110, 'White');
  P.board('S5_Reshare', 9, 4, W, H); IL.img('photos/ugc.jpg', 90, 400, 900, 900); P.logo(P.M, 1500, 200); P.tag(420, 330, 'MADE ON FOLLOWING', 'Lime', 'Ink', 56, -4);
  P.board('S6_Set', 9, 5, W, H); IL.img('photos/s_c.jpg', 0, 0, W, H); P.tag(280, 1200, 'ON SET', 'Lime', 'Ink', 54, -6);
  // highlight covers
  var hl = [['DEALS', 'Lime', 'Ink'], ['PAID', 'Ink', 'Lime'], ['BARTER', 'Violet', 'White'], ['CASHBACK', 'Lilac', 'Ink'], ['TIPS', 'White', 'Ink'], ['BRANDS', 'Forest', 'Lime']];
  for (var i = 0; i < 6; i++) { P.board('H' + (i + 1) + '_' + hl[i][0], 9, 6 + i, 500, 500, hl[i][1]); IL.T(250, 275, hl[i][0], hl[i][0].length > 6 ? 62 : 84, hl[i][2], { w: 'EB', align: 'c', track: -20 }); }
};

// ---------- guide pages ----------
P.gpage = function (name, i, ground) {
  var d = IL.doc, x = -7000 + i * 2040, y = -4200, j, found = -1;
  for (j = 0; j < d.artboards.length; j++) if (d.artboards[j].name === name) found = j;
  if (IL.cur) IL.show();
  IL.W = 1920; IL.H = 1080;
  var ab;
  if (found >= 0) { IL.clear(name); ab = d.artboards[found]; } else ab = d.artboards.add([x, y, x + 1920, y - 1080]);
  ab.name = name; IL.cur = name; IL.org = [ab.artboardRect[0], ab.artboardRect[1]];
  IL.rect(0, 0, 1920, 1080, ground || 'White', { lay: 'Ground' });
};
P.guide = function () {
  P.gpage('G1_Cover', 0, 'Lime');
  P.head(72, 620, 'Instagram', 'guide.', 220);
  P.logo(72, 950, 300);
  P.tag(1480, 170, '@FOLLOWINGSOCIALS', 'Ink', 'White', 54, -5);
  P.tag(1560, 340, 'NOVEMBER 2026', 'White', 'Ink', 54, 4);
  IL.img('photos/n01.jpg', 1240, 560, 300, 375); IL.img('photos/n07.jpg', 1560, 560, 300, 375);

  P.gpage('G2_System', 1);
  IL.img('photos/grid.jpg', 72, 72, 640, 936, { fit: true, ax: 0, ay: 0 });
  P.head(780, 240, 'Photo. Type.', 'Photo.', 120);
  IL.T(784, 430, 'Full-bleed creators and white type pages swap places on every post, so the grid reads as a chequerboard from any starting point.', 38, 'Ink', { box: [1060, 200], lead: 52, track: 0 });
  var r = [['Photos', 'Fill the frame, always.'], ['Tags', 'Stuck on at an angle. Our signature.'], ['Type', 'Bold line, italic line, white page.'], ['Lime', 'Tags and details. Rarely a full page.']];
  for (var i = 0; i < 4; i++) { var cx = 784 + (i % 2) * 540, cy = 690 + Math.floor(i / 2) * 170; IL.T(cx, cy, r[i][0], 44, 'Ink', { w: 'EB', track: -20 }); IL.T(cx, cy + 50, r[i][1], 30, 'Ink', { track: 0 }); }

  P.gpage('G3_Series', 2);
  P.head(72, 170, 'Series people', 'come back for.', 96);
  var se = [['MONEY TALK', 'Lime', 'Ink', 'Rates, fees, knowing your worth'], ['THE BRIEF', 'Lime', 'Ink', 'Tips to get picked and deliver well'], ['HOW IT WORKS', 'Lime', 'Ink', 'Paid collabs, barter, cashback, explained'], ['DEAL DROP', 'Lime', 'Ink', 'Real deals live in the app right now'], ['CREATOR SPOTLIGHT', 'Lime', 'Ink', 'A real creator, with their permission'], ['MADE ON FOLLOWING', 'Lime', 'Ink', 'Creator work in a white frame'], ['ON SET', 'Forest', 'Lime', 'Reels from our productions'], ['FOR BRANDS', 'Violet', 'White', 'How campaigns run, what briefs need']];
  for (i = 0; i < 8; i++) { var sx = 72 + (i % 4) * 450, sy = 340 + Math.floor(i / 4) * 340; IL.rect(sx, sy, 426, 316, 'Cream', { r: 24 }); P.tag(sx + 213, sy + 90, se[i][0], se[i][1], se[i][2], se[i].length && se[i][0].length > 13 ? 28 : 36, -3); IL.T(sx + 28, sy + 190, se[i][3], 32, 'Ink', { box: [370, 110], lead: 42, track: 0 }); }

  P.gpage('G4_Rhythm', 3);
  P.head(72, 170, 'Five posts a week.', 'Stories every day.', 96);
  var dy = [['Mon', 'Lead post', 'Photo or type'], ['Tue', 'Useful', 'The Brief, Deal Drop'], ['Wed', 'Carousel or brand', 'For Brands, How it works'], ['Thu', 'Sharp opinion', 'Money Talk, Cashback'], ['Fri', 'Reel', 'On Set, POV']];
  for (i = 0; i < 5; i++) { var dx = 72 + i * 359; IL.rect(dx, 340, 341, 420, i === 4 ? 'Lime' : 'Cream', { r: 24 }); IL.T(dx + 26, 430, dy[i][0], 72, 'Ink', { w: 'EB', track: -30 }); IL.T(dx + 26, 540, dy[i][1], 34, 'Ink', { w: 'B', box: [295, 100], lead: 42, track: -5 }); IL.T(dx + 26, 660, dy[i][2], 28, 'Ink', { box: [295, 90], lead: 36, track: 0 }); }
  IL.T(72, 860, 'Why: published guidance for 2026 points to about 2 Reels and 3 to 5 feed posts a week, with sends and watch time as the signals that travel. These are blog sources, not Instagram figures, so we check our own numbers after 4 weeks.', 32, 'Ink', { box: [1776, 130], lead: 44, track: 0 });

  P.gpage('G5_Rules', 4);
  P.head(72, 170, 'Keep it', 'true.', 96);
  var yes = ['Real creators, with permission', 'Real deals that are live in the app', 'Numbers Following can prove', 'Mark paid partnerships clearly'], no = ['Invented names, handles or quotes', 'Earnings claims or payout figures we cannot show', 'Black or lilac backgrounds', 'A second typeface'];
  IL.rect(72, 340, 876, 660, 'Cream', { r: 24 }); IL.rect(972, 340, 876, 660, 'White', { stroke: 'Rule', sw: 2, r: 24 });
  P.tag(240, 420, 'ALWAYS', 'Lime', 'Ink', 44, -3); P.tag(1120, 420, 'NEVER', 'Ink', 'White', 44, -3);
  for (i = 0; i < 4; i++) { IL.T(116, 560 + i * 105, yes[i], 40, 'Ink', { track: -5, w: 'B' }); IL.T(1016, 560 + i * 105, no[i], i === 1 ? 34 : 40, 'Ink', { track: -5, w: 'B' }); }

  P.gpage('G6_Sizes', 5);
  P.head(72, 170, 'Sizes and', 'safe areas.', 96);
  IL.rect(72, 340, 432, 540, 'Cream'); IL.rect(72 + 27, 340, 378, 540, null, { stroke: 'Violet', sw: 3 }); IL.T(72, 930, 'Post 1080 x 1350', 34, 'Ink', { w: 'B', track: -5 }); IL.T(72, 974, 'Grid crops the sides to 3:4', 28, 'Ink', { track: 0 });
  IL.rect(600, 340, 304, 540, 'Cream'); IL.rect(600, 340 + 70, 304, 400, null, { stroke: 'Violet', sw: 3 }); IL.T(600, 930, 'Story, Reel 1080 x 1920', 34, 'Ink', { w: 'B', track: -5 }); IL.T(600, 974, 'Keep 250 top, 340 foot clear', 28, 'Ink', { track: 0 });
  IL.circ(1270, 610, 200, 'Lime'); IL.T(1270, 630, 'DEALS', 72, 'Ink', { w: 'EB', align: 'c', track: -20 }); IL.T(1070, 930, 'Highlight 500 x 500', 34, 'Ink', { w: 'B', track: -5 });
  IL.T(1520, 400, 'Files', 44, 'Ink', { w: 'EB', track: -20 }); IL.T(1520, 460, 'One Illustrator master. Ready-to-post PNGs by month. Calendar in Google Sheets. Scheduling in Buffer.', 30, 'Ink', { box: [330, 360], lead: 42, track: 0 });
};
