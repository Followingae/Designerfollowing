// Following guidelines v5: the full visual book. Loads gl4.jsx (which loads gl3 and lib).
$.evalFile(new File('C:/Users/user/Desktop/DesignerFollowing/brands/following/explorations/gl4.jsx'));

// Book order: [artboard, section label]. Pages that already exist keep their art; the rest are built here.
GL.BOOK = [
  ['G01_Cover', ''], ['G02_Contents', 'Contents'],
  ['S01_Chapter_Brand', ''], ['G03_Idea', '01 / Brand / The idea'], ['S02_What_We_Do', '01 / Brand / What we do'], ['V_Values', '01 / Brand / Values'], ['V_Audiences', '01 / Brand / Audiences'], ['V_Voice', '01 / Brand / Voice'],
  ['C02_Identity', ''], ['G09_Wordmark', '02 / Identity / Wordmark'], ['G10_Wordmark_Space', '02 / Identity / Space and size'], ['G11_Wordmark_Colour', '02 / Identity / Wordmark colour'], ['G12_Wordmark_Misuse', '02 / Identity / Misuse'], ['G13_Lockups', '02 / Identity / Lockups'],
  ['G14_Colour', '02 / Identity / Colour'], ['S03_Colour_In_Use', '02 / Identity / Proportion'], ['G15_Colour_Pairs', '02 / Identity / Colour pairs'], ['V_Extended_Palette', '02 / Identity / Extended palette'], ['G17_Colour_Contrast', '02 / Identity / Contrast'],
  ['G18_Type', '02 / Identity / Type'], ['G19_Display_Type', '02 / Identity / Display face'], ['G20_Type_In_Use', '02 / Identity / Type in use'], ['G21_Type_Scale', '02 / Identity / Type scale'],
  ['C03_Expression', ''], ['G22_Shapes', '03 / Expression / Shapes'], ['G23_The_Line', '03 / Expression / The line'], ['G24_Pattern', '03 / Expression / Pattern'], ['V_Icons', '03 / Expression / Icons'],
  ['C04_Imagery', ''], ['S04_Illustration', '04 / Imagery / Illustration'], ['S06_Photography', '04 / Imagery / Photography'], ['G27_Layout_Grid', '04 / Imagery / Layout and grid'], ['V_Motion', '04 / Imagery / Motion'],
  ['C05_Applications', ''], ['V_App', '05 / Applications / The app'], ['G29_Instagram', '05 / Applications / Instagram'], ['S05_Kit_In_The_Wild', '05 / Applications / Packaging'], ['V_Print', '05 / Applications / Print'], ['G32_Digital', '05 / Applications / Digital'],
  ['G33_Accessibility', '06 / Resources / Accessibility'], ['G34_Files_Contacts', '06 / Resources / Files and contacts']
];
GL.OLD = ['G04_Who_We_Are', 'G05_Values', 'G06_Audiences', 'G07_Voice', 'G08_Writing', 'G16_Extended_Palette', 'G26_Photography', 'G28_Motion', 'G30_Packaging', 'G31_Print'];

// Free canvas: 2 columns from y -3852 down at x 4700/6700, then x 1200/3200 from -372, then x -6800 from 7748.
GL.FREE = [];
(function () { var i; for (i = 0; i < 4; i++) { GL.FREE.push([4700, -3852 - i * 1160]); GL.FREE.push([6700, -3852 - i * 1160]); }
  for (i = 0; i < 6; i++) { GL.FREE.push([1200, -372 - i * 1160]); GL.FREE.push([3200, -372 - i * 1160]); }
  for (i = 0; i < 12; i++) GL.FREE.push([-6800, 7748 - i * 1160]); })();
GL.place = function (name) {
  var d = FG.doc, ab, i, j, r, ok;
  try { return d.artboards.getByName(name); } catch (e) {}
  for (i = 0; i < GL.FREE.length; i++) {
    ok = true;
    for (j = 0; j < d.artboards.length; j++) { r = d.artboards[j].artboardRect; if (Math.abs(r[0] - GL.FREE[i][0]) < 10 && Math.abs(r[1] - GL.FREE[i][1]) < 10) ok = false; }
    if (!ok) continue;
    try { ab = d.artboards.add([GL.FREE[i][0], GL.FREE[i][1], GL.FREE[i][0] + FG.W, GL.FREE[i][1] - FG.H]); ab.name = name; return ab; } catch (e2) {}
  }
  throw new Error('no room for ' + name);
};
GL.folio = function (name) { var i; for (i = 0; i < GL.BOOK.length; i++) if (GL.BOOK[i][0] === name) return (i < 9 ? '0' : '') + (i + 1); return ''; };
GL.section = function (name) { var i; for (i = 0; i < GL.BOOK.length; i++) if (GL.BOOK[i][0] === name) return GL.BOOK[i][1]; return ''; };
GL.go = function (name, ground, ink) { GL.spots(); GL.place(name); FG.page(name, ground, ink, GL.section(name), GL.folio(name)); };
// samples and older builders now take their slot and labels from the book
GL.vslot = function (name) { return GL.place(name); };
GL.vstart = function (name, idx, ground, ink) { GL.go(name, ground, ink); };
GL.slot = function (name) { return GL.place(name); };
GL.start = function (name, ground, ink) { GL.go(name, ground, ink); };

// ---------- chapter openers
GL.chapter = function (p, num, word, list, art, mode) {
  GL.go(p, mode.ground, 'White');
  if (mode.photo) GL.img(p, art, 0, 0, FG.W, FG.H, mode.fx, mode.fy, 'photo');
  if (mode.ill) GL.fit(p, art, mode.ix, mode.iy, mode.iw, mode.ih, 'ill');
  if (mode.turns) GL.turns(p, 0, 0, FG.W, FG.H, 120, mode.turns[0], mode.turns[1], 11);
  GL.big(p, 70, 1000, num, 560, mode.numCol || 'Lime');
  GL.big(p, 70 + mode.wx, 1000, word, 250, mode.wordCol || 'White');
  FG.label(p, 1840, 66, 'Following / Brand Guidelines', mode.wordCol || 'White', { align: 'r' });
  FG.text(p, 'Type', 1840, 1000 - (list.length - 1) * 34, list.join('\r'), 'M', 24, mode.wordCol || 'White', { lead: 34, align: 'r' });
};
GL.V.S01_Chapter_Brand = function (p) { GL.chapter(p, '01', 'BRAND', ['The idea', 'What we do', 'Values', 'Audiences', 'Voice'], GL.LINKS + 'Joyful Connection HR.png', { ground: 'Ink', photo: 1, fx: 0.62, fy: 0.35, wx: 570 }); };
GL.V.C02_Identity = function (p) {
  GL.go(p, 'Lime', 'Ink');
  FG.wm(p, 'Mark', 80, 140, 1760, 'Ink');
  GL.big(p, 70, 1000, '02', 560, 'Ink'); GL.big(p, 640, 1000, 'IDENTITY', 250, 'Ink');
  FG.label(p, 1840, 66, 'Following / Brand Guidelines', 'Ink', { align: 'r' });
  FG.text(p, 'Type', 1840, 1000 - 3 * 34, 'Wordmark\rColour\rType\rLockups', 'M', 24, 'Ink', { lead: 34, align: 'r' });
};
GL.V.C03_Expression = function (p) { GL.chapter(p, '03', 'EXPRESSION', ['Shapes', 'The line', 'Pattern', 'Icons'], null, { ground: 'Ink', turns: ['Lime', 'Ink'], wx: 570, wordCol: 'White', numCol: 'White' }); };
GL.V.C04_Imagery = function (p) { GL.chapter(p, '04', 'IMAGERY', ['Illustration', 'Photography', 'Layout', 'Motion'], GL.LINKS + 'DJ in Tropical Vibes HR.png', { ground: 'Ink', photo: 1, fx: 0.62, fy: 0.3, wx: 570 }); };
GL.V.C05_Applications = function (p) { GL.chapter(p, '05', 'IN USE', ['The app', 'Instagram', 'Packaging', 'Print', 'Digital'], 'C:/Users/user/Downloads/WhatsApp Image 2026-10-13 at 5.36.25 PM.jpeg', { ground: 'Ink', photo: 1, fx: 0.5, fy: 0.45, wx: 570 }); };

// ---------- brand
GL.V.V_Values = function (p) {
  GL.go(p, 'Violet', 'Lime');
  GL.title(p, 80, 190, 'Four things', 'we never trade.', 'White', 96);
  var V = [['STRAIGHT', 'The price, the deadline and the result, before anyone asks.', 'spot_03'], ['FAST', 'One tap to apply, one to approve. Paid the day a post is verified.', 'spot_04'], ['FAIR', 'Creators paid on time. Brands pay for posts that happened.', 'spot_02'], ['LOCAL', 'Born in Dubai, built for UAE creators, priced in AED.', 'spot_06']];
  var i;
  for (i = 0; i < 4; i++) {
    var x = 80 + i * 450;
    FG.rect(p, 'Ground', x, 330, 420, 420, i % 2 ? 'Lilac' : 'Lime', { id: 'tile', radius: 210 });
    GL.fit(p, GL.Z + V[i][2] + '.png', x + 40, 370, 340, 340, 'spot');
    GL.big(p, x, 870, V[i][0], 84, 'White');
    GL.body(p, x, 900, 400, 120, V[i][1], 'White', 20);
  }
};
GL.V.V_Audiences = function (p) {
  GL.go(p, 'Ink', 'Lime');
  GL.img(p, GL.LINKS + 'Dessert in the Sky HR.png', 0, 0, 960, FG.H, 0.5, 0.3, 'brands');
  GL.img(p, GL.LINKS + 'Sporty Duo Portrait HR.png', 960, 0, 960, FG.H, 0.5, 0.4, 'creators');
  FG.label(p, FG.M, 66, GL.section(p), 'White'); FG.label(p, FG.W - FG.M, 66, 'Following / Brand Guidelines / ' + GL.folio(p), 'White', { align: 'r' });
  GL.pill(p, 260, 820, 'FOR BRANDS', 40, 'Lime', 'Ink', -4);
  GL.pill(p, 1240, 820, 'FOR CREATORS', 40, 'Violet', 'White', 4);
  GL.big(p, 80, 980, 'REACH THAT CONVERTS.', 72, 'White');
  GL.big(p, 1040, 980, 'GET PAID TO POST.', 72, 'White');
};
GL.V.V_Voice = function (p) {
  GL.go(p, 'Lime', 'Ink');
  GL.title(p, 80, 190, 'Say the thing.', 'Then stop.', 'Ink', 96);
  // four messages, styled as they would appear
  FG.rect(p, 'Ground', 80, 330, 560, 150, 'White', { id: 'm', radius: 36 }); FG.text(p, 'Type', 120, 390, 'Following', 'EB', 20, 'Ink', {}); FG.text(p, 'Type', 120, 430, 'Your payout of AED 1,500 is on its way.', 'M', 22, 'Ink', {}); FG.label(p, 80, 520, 'App notification', 'Ink');
  FG.rect(p, 'Ground', 680, 330, 560, 420, 'Ink', { id: 'm' }); GL.big(p, 720, 520, 'GET PAID', 120, 'Lime'); GL.big(p, 720, 640, 'TO POST.', 120, 'Lime'); FG.label(p, 680, 790, 'Instagram headline', 'Ink');
  FG.rect(p, 'Ground', 1280, 330, 560, 420, 'Cream', { id: 'm' }); FG.text(p, 'Type', 1320, 420, 'AED 299 a month.', 'EB', 40, 'Ink', {}); FG.text(p, 'Type', 1320, 470, '10% of cashback.', 'EB', 40, 'Ink', {}); FG.text(p, 'Type', 1320, 520, 'Live in 48 hours.', 'MI', 40, 'Ink', {}); FG.label(p, 1280, 790, 'Sales line', 'Ink');
  FG.rect(p, 'Ground', 80, 580, 560, 170, 'Violet', { id: 'm', radius: 36 }); FG.text(p, 'Type', 120, 650, 'Hi Sara, the brief is ready.', 'M', 24, 'White', {}); FG.text(p, 'Type', 120, 690, 'Post by Thursday, 7 pm.', 'M', 24, 'White', {}); FG.label(p, 80, 790, 'WhatsApp, to a creator', 'Ink');
  var R = [['Following', 'Capital F in a sentence. The wordmark stays lowercase.'], ['AED 2,500', 'AED first, figures always.'], ['Creators', 'Not influencers, except in the category name.'], ['Never', 'synergy, leverage, elevate, seamless, unlock, game-changer.']];
  var i;
  for (i = 0; i < 4; i++) { var x = 80 + i * 450; GL.rule(p, x, 870, 410, 'Ink', 1); GL.head(p, x, 920, R[i][0], 'Ink', 26); GL.body(p, x, 940, 410, 100, R[i][1], 'Ink', 19); }
};

// ---------- identity
GL.V.V_Extended_Palette = function (p) {
  GL.go(p, 'Cream', 'Ink');
  GL.title(p, 80, 190, 'Every service', 'has its colours.', 'Ink', 96);
  var P = [['PAID', 'Burgundy', 'Rose', 'p12-13.jpg', 0.75, [92, 12, 34], [255, 172, 198]], ['BARTER', 'Tomato', 'Sky', 'p16-17.jpg', 0.25, [236, 58, 30], [196, 222, 255]], ['CASHBACK', 'Cobalt', 'Peach', 'p22-23.jpg', 0.75, [26, 46, 208], [255, 184, 144]], ['PRODUCTION', 'Forest', 'Lime', 'p38-39.jpg', 0.25, [30, 63, 32], [211, 255, 2]], ['HOW WE WORK', 'Mustard', 'Ink', 'p40-41.jpg', 0.25, [242, 184, 8], [5, 9, 17]]];
  var i;
  for (i = 0; i < 5; i++) {
    var x = 80 + i * 356;
    GL.img(p, GL.R + 'exports/booklet/spreads/' + P[i][3], x, 300, 340, 440, P[i][4], 0.5, 'spread');
    FG.rect(p, 'Ground', x, 760, 340, 120, P[i][1], { id: 'sw' }); FG.rect(p, 'Ground', x, 880, 340, 70, P[i][2], { id: 'sw' });
    FG.text(p, 'Type', x + 20, 800, P[i][0], 'EB', 20, P[i][2], {}); FG.text(p, 'Type', x + 20, 834, P[i][1] + '  ' + GL.hex(P[i][5]) + '  CMYK ' + GL.cmyk(P[i][5]), 'M', 13, P[i][2], {});
    FG.text(p, 'Type', x + 20, 922, P[i][2] + '  ' + GL.hex(P[i][6]), 'M', 13, P[i][1], {});
  }
  FG.label(p, 80, 1010, 'One pair per piece, with Ink and Cream around it. Approve every pair on a printed proof.', 'Ink');
};

// ---------- expression: a custom icon set, drawn on a 48 grid with the line's round ends
GL.icon = function (p, x, y, s, kind, col, acc) {
  var g = FG.org(p), L = FG.lay('Mark'), out = [], k = s / 48, w = 3.4 * k;
  function P(pts, closed) { var pa = L.pathItems.add(), q = [], n; for (n = 0; n < pts.length; n++) q.push([g[0] + x + pts[n][0] * k, g[1] - (y + pts[n][1] * k)]); pa.setEntirePath(q); pa.closed = !!closed; pa.filled = false; pa.stroked = true; pa.strokeWidth = w; pa.strokeColor = FG.col(col); pa.strokeCap = StrokeCap.ROUNDENDCAP; pa.strokeJoin = StrokeJoin.ROUNDENDJOIN; out.push(pa); return pa; }
  function O(cx, cy, r, fill) { var e = L.pathItems.ellipse(g[1] - (y + (cy - r) * k), g[0] + x + (cx - r) * k, 2 * r * k, 2 * r * k); if (fill) { e.filled = true; e.fillColor = FG.col(fill); e.stroked = false; } else { e.filled = false; e.stroked = true; e.strokeWidth = w; e.strokeColor = FG.col(col); } out.push(e); return e; }
  function R(x0, y0, x1, y1, r) { var e = L.pathItems.roundedRectangle(g[1] - (y + y0 * k), g[0] + x + x0 * k, (x1 - x0) * k, (y1 - y0) * k, r * k, r * k); e.filled = false; e.stroked = true; e.strokeWidth = w; e.strokeColor = FG.col(col); out.push(e); return e; }
  function arc(cx, cy, r, a0, a1) { var pts = [], n; for (n = 0; n <= 24; n++) { var a = a0 + (a1 - a0) * n / 24; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); } return P(pts); }
  if (kind === 'paid') { O(24, 24, 15); P([[19, 18], [19, 31]]); P([[19, 18], [26, 18], [29, 21], [26, 24], [19, 24]]); P([[19, 24], [27, 24], [30, 27.5], [27, 31], [19, 31]]); O(38, 9, 3.2, acc); }
  else if (kind === 'barter') { R(9, 20, 39, 40, 3); P([[7, 14], [41, 14], [41, 20], [7, 20], [7, 14]], true); P([[24, 14], [24, 40]]); arc(19, 11, 4.5, 0, Math.PI * 1.9); arc(29, 11, 4.5, Math.PI * 1.1, Math.PI * 3); O(40, 8, 3.2, acc); }
  else if (kind === 'cashback') { P([[12, 6], [36, 6], [36, 42], [32, 39], [28, 42], [24, 39], [20, 42], [16, 39], [12, 42], [12, 6]], true); P([[18, 15], [30, 15]]); P([[18, 22], [26, 22]]); arc(24, 30, 5, Math.PI * 1.1, Math.PI * 2.6); O(41, 30, 3.2, acc); }
  else if (kind === 'production') { R(6, 14, 34, 36, 4); P([[34, 21], [42, 16], [42, 34], [34, 29]]); O(15, 21, 2.6, acc); }
  else if (kind === 'creator') { O(24, 16, 7); P([[10, 41], [12, 33], [18, 28], [30, 28], [36, 33], [38, 41]]); O(38, 10, 3.2, acc); }
  else if (kind === 'brand') { P([[8, 18], [12, 8], [36, 8], [40, 18]]); arc(14, 18, 6, 0, Math.PI); arc(26, 18, 6, 0, Math.PI); P([[8, 18], [40, 18]]); P([[11, 22], [11, 40], [37, 40], [37, 22]]); R(20, 30, 28, 40, 1.5); O(42, 6, 3.2, acc); }
  else if (kind === 'wallet') { R(6, 13, 42, 39, 5); P([[42, 21], [32, 21], [29, 26], [32, 31], [42, 31]]); O(34, 26, 2, acc); P([[10, 13], [30, 6], [34, 13]]); }
  else if (kind === 'qr') { R(7, 7, 20, 20, 2); R(28, 7, 41, 20, 2); R(7, 28, 20, 41, 2); P([[28, 28], [28, 34]]); P([[34, 28], [41, 28]]); P([[34, 35], [34, 41], [41, 41]]); O(13.5, 13.5, 2.4, acc); }
  else if (kind === 'chat') { P([[8, 10], [40, 10], [40, 32], [22, 32], [13, 40], [14, 32], [8, 32], [8, 10]], true); O(17, 21, 1.8, acc); O(24, 21, 1.8, acc); O(31, 21, 1.8, acc); }
  else if (kind === 'calendar') { R(7, 10, 41, 41, 4); P([[7, 19], [41, 19]]); P([[16, 6], [16, 13]]); P([[32, 6], [32, 13]]); O(24, 30, 3.4, acc); }
  else if (kind === 'pin') { P([[24, 43], [13, 29], [10, 21], [12, 13], [18, 7], [24, 6], [30, 7], [36, 13], [38, 21], [35, 29], [24, 43]], true); O(24, 20, 5, acc); }
  else if (kind === 'spark') { P([[24, 5], [27, 18], [40, 21], [27, 25], [24, 41], [21, 25], [8, 21], [21, 18], [24, 5]], true); O(39, 37, 3.2, acc); }
  return out;
};
GL.V.V_Icons = function (p) {
  GL.go(p, 'Cream', 'Ink');
  GL.title(p, 80, 190, 'Drawn with', 'the line.', 'Ink', 96);
  var K = [['paid', 'Paid'], ['barter', 'Barter'], ['cashback', 'Cashback'], ['production', 'Production'], ['creator', 'Creator'], ['brand', 'Brand'], ['wallet', 'Wallet'], ['qr', 'Scan'], ['chat', 'Chat'], ['calendar', 'Schedule'], ['pin', 'Venue'], ['spark', 'New']];
  var i;
  for (i = 0; i < 12; i++) {
    var x = 80 + (i % 6) * 300, y = 330 + Math.floor(i / 6) * 330;
    FG.rect(p, 'Ground', x, y, 270, 270, i < 6 ? 'Ink' : 'White', { id: 'tile', radius: 40 });
    GL.icon(p, x + 63, y + 63, 144, K[i][0], i < 6 ? 'White' : 'Ink', 'Lime');
    GL.cap(p, x, y + 300, K[i][1], 'Ink');
  }
  GL.body(p, 80, 990, 1700, 60, 'A 48 px grid, a 3.4 px stroke with round ends and joins, one lime dot per icon. On screen at 24, 32 or 48 px. Never filled, never two accents.', 'Ink', 20);
};

// ---------- imagery: motion as a storyboard
GL.V.V_Motion = function (p) {
  GL.go(p, 'Violet', 'Lime');
  GL.title(p, 80, 190, 'Snap in.', 'Settle.', 'White', 96);
  var F = ['0 ms', '150 ms', '350 ms', '600 ms'], i;
  for (i = 0; i < 4; i++) {
    var x = 80 + i * 450, y = 300;
    FG.rect(p, 'Ground', x, y, 420, 525, 'Ink', { id: 'frame' });
    if (i >= 1) GL.big(p, x + 30, y + 150, 'GET PAID', 92, 'Lime');
    if (i >= 1) GL.big(p, x + 30, y + 240, 'TO POST.', 92, 'Lime');
    if (i >= 2) GL.pill(p, x + 300, y + 330 - (i === 2 ? 30 : 0), 'CASHBACK', 22, 'Violet', 'White', i === 2 ? 12 : 6);
    if (i === 3) { var pts = FG.track([[x - 10, y + 460], [x + 120, y + 455], { to: [x + 330, y + 445], loops: 1, r: 40, side: 1, env: false }, [x + 440, y + 455]]); var it = FG.gradLine(p, 'Mark', pts, 14, { steps: 60 }); FG.clip(p, 'Mark', it, x, y, 420, 525, { id: 'ln' }); }
    if (i === 0) FG.wm(p, 'Mark', x + 110, y + 240, 200, 'White');
    FG.text(p, 'Type', x, y + 575, F[i], 'EB', 26, 'Lime', {});
  }
  var T = ['The wordmark cuts in. It never moves.', 'Type cuts in on the beat. No fades.', 'Tags drop, overshoot by 4 degrees, settle.', 'The line draws on, left to right, then holds.'];
  for (i = 0; i < 4; i++) GL.body(p, 80 + i * 450, 900, 400, 100, T[i], 'White', 20);
};

// ---------- applications
GL.V.V_App = function (p) {
  GL.go(p, 'Ink', 'Lime');
  var pts = FG.track([[-20, 820], [300, 800], { to: [1500, 760], loops: 2, r: 160, side: 1, env: false }, [1950, 800]]);
  var it = FG.gradLine(p, 'Mark', pts, 40, { steps: 120 }); FG.clip(p, 'Mark', it, 0, 0, FG.W, FG.H, { id: 'line' });
  var S = ['1.png', '3.png', '6.png', '9.png'], i;
  for (i = 0; i < 4; i++) GL.fit(p, GL.PH + S[i], 760 + i * 280, 140 + (i % 2) * 70, 260, 840, 'phone');
  GL.title(p, 80, 190, 'The app is', 'the brand.', 'White', 96);
  GL.body(p, 80, 330, 560, 300, 'Ink surfaces, white cards, one lime action per screen. Tags mark status. The line appears once, on the welcome screen.', 'Lilac', 22);
};
GL.V.V_Print = function (p) {
  GL.go(p, 'Cream', 'Ink');
  GL.title(p, 80, 190, 'The small book.', 'A6, 56 pages.', 'Ink', 96);
  GL.panel(p, GL.R + 'exports/booklet/spreads/p12-13.jpg', 80, 300, 860, 305, null, 0, 'sp');
  GL.panel(p, GL.R + 'exports/booklet/spreads/p20-21.jpg', 980, 300, 860, 305, null, 0, 'sp');
  GL.panel(p, GL.R + 'exports/booklet/spreads/p16-17.jpg', 80, 630, 860, 305, null, 0, 'sp');
  GL.panel(p, GL.R + 'exports/booklet/spreads/p40-41.jpg', 980, 630, 860, 305, null, 0, 'sp');
  GL.cap(p, 80, 980, 'Obviously caps, one cut and one colour per page. Each service in its own pair. Full-bleed pictures.', 'Ink');
};

GL.build5 = function (name) { if (GL.V[name]) { GL.V[name](name); return name + ' ok'; } if (GL.P[name]) { GL.P[name](name); return name + ' ok'; } return name + ' (kept)'; };

// relabel kept pages: folio and section label from the book
GL.relabel = function (name) {
  var d = FG.doc, j, t, n = 0;
  for (j = 0; j < d.textFrames.length; j++) {
    t = d.textFrames[j];
    if (t.name.indexOf(name + ':') !== 0 || t.textRange.characterAttributes.size > 15) continue;
    if (/^FOLLOWING \/ BRAND GUIDELINES \/ \d\d$/.test(t.contents)) { t.contents = 'FOLLOWING / BRAND GUIDELINES / ' + GL.folio(name); n++; }
    else if (/^0\d \/ /.test(t.contents) && GL.section(name)) { t.contents = GL.section(name).toUpperCase(); n++; }
  }
  return n;
};
GL.drop = function () {
  var d = FG.doc, i, out = [];
  for (i = 0; i < GL.OLD.length; i++) { FG.clear(GL.OLD[i]); var k; for (k = d.artboards.length - 1; k >= 0; k--) if (d.artboards[k].name === GL.OLD[i]) { d.artboards[k].remove(); out.push(GL.OLD[i]); } }
  return out.join(' ');
};

// ---------- pieces are shown whole: centred inside a panel, never cropped (only photographs are cropped)
GL.panel = function (p, file, x, y, w, h, bg, pad, id) {
  if (bg) FG.rect(p, 'Ground', x, y, w, h, bg, { id: 'panel' });
  pad = pad === undefined ? 30 : pad;
  var g = FG.org(p), L = FG.lay('Image'), pi = L.placedItems.add();
  pi.file = new File(file);
  var sc = Math.min((w - 2 * pad) / pi.width, (h - 2 * pad) / pi.height); pi.resize(sc * 100, sc * 100);
  pi.position = [g[0] + x + (w - pi.width) / 2, g[1] - y - (h - pi.height) / 2];
  pi.embed();
  return FG.tag(L.rasterItems[0], p, id || 'piece');
};
GL.V.S03_Colour_In_Use = function (p) {
  GL.go(p, 'Cream', 'Ink');
  GL.title(p, 80, 190, 'Mostly black.', 'Then a shout.', 'Ink', 84);
  var P = [['Ink', 0.46, 'White', '#050911'], ['Lime', 0.2, 'Ink', '#D3FF02'], ['Violet', 0.14, 'White', '#5100F3'], ['Cream', 0.1, 'Ink', '#F6F3EB'], ['Lilac', 0.05, 'Ink', '#C9A7F9'], ['Forest', 0.05, 'Lime', '#1E3F20']];
  var x = 80, i, W = 1760;
  for (i = 0; i < P.length; i++) {
    var w = W * P[i][1];
    FG.rect(p, 'Ground', x, 280, w, 260, P[i][0], { id: 'bar', stroke: P[i][0] === 'Cream' ? 'Ink' : null, strokeW: 1 });
    if (w > 150) { FG.text(p, 'Type', x + 24, 330, P[i][0], 'EB', 26, P[i][2], {}); FG.text(p, 'Type', x + 24, 358, P[i][3], 'M', 15, P[i][2], {}); FG.text(p, 'Type', x + 24, 516, Math.round(P[i][1] * 100) + '%', 'EB', 56, P[i][2], {}); }
    else { FG.text(p, 'Type', x + 12, 516, Math.round(P[i][1] * 100) + '%', 'EB', 26, P[i][2], {}); FG.text(p, 'Type', x, 572, P[i][0], 'M', 15, 'Ink', {}); }
    x += w;
  }
  GL.panel(p, GL.PREV + 'K06_Card_Brands_A6_105x148.png', 80, 610, 560, 380, 'White', 36, 'use');
  GL.panel(p, GL.PREV + 'K01_Box_Lid_400x300.png', 680, 610, 560, 380, 'White', 36, 'use');
  GL.panel(p, GL.R + 'exports/booklet/spreads/p12-13.jpg', 1280, 610, 560, 380, 'White', 36, 'use');
  GL.cap(p, 80, 1030, 'Intro card for brands', 'Ink'); GL.cap(p, 680, 1030, 'Box lid', 'Ink'); GL.cap(p, 1280, 1030, 'Booklet, pages 12 and 13', 'Ink');
};
GL.V.V_Extended_Palette = function (p) {
  GL.go(p, 'Cream', 'Ink');
  GL.title(p, 80, 190, 'Every service', 'has its colours.', 'Ink', 84);
  GL.body(p, 80, 330, 500, 300, 'One pair per piece: a ground and its ink, with Ink and Cream around it. These pairs run the booklet, social and the inserts.', 'Ink', 22);
  FG.label(p, 80, 1010, 'CMYK from the working profile. Approve every pair on a printed proof.', 'Ink');
  var P = [['PAID', 'Burgundy', 'Rose', 'p12-13.jpg', [92, 12, 34], [255, 172, 198]], ['BARTER', 'Tomato', 'Sky', 'p16-17.jpg', [236, 58, 30], [196, 222, 255]], ['CASHBACK', 'Cobalt', 'Peach', 'p22-23.jpg', [26, 46, 208], [255, 184, 144]], ['PRODUCTION', 'Forest', 'Lime', 'p38-39.jpg', [30, 63, 32], [211, 255, 2]], ['HOW WE WORK', 'Mustard', 'Ink', 'p40-41.jpg', [242, 184, 8], [5, 9, 17]]];
  var i;
  for (i = 0; i < 5; i++) {
    var y = 90 + i * 186, h = 170;
    FG.rect(p, 'Ground', 640, y, 700, h, P[i][1], { id: 'sw' });
    FG.rect(p, 'Ground', 1240, y, 100, h, P[i][2], { id: 'sw' });
    GL.big(p, 670, y + 78, P[i][0], 56, P[i][2]);
    FG.text(p, 'Type', 670, y + 120, P[i][1] + '   ' + GL.hex(P[i][4]) + '   CMYK ' + GL.cmyk(P[i][4]), 'M', 15, P[i][2], {});
    FG.text(p, 'Type', 670, y + 146, P[i][2] + '   ' + GL.hex(P[i][5]) + '   CMYK ' + GL.cmyk(P[i][5]), 'M', 15, P[i][2], {});
    GL.panel(p, GL.R + 'exports/booklet/spreads/' + P[i][3], 1360, y, 480, h, null, 0, 'spread');
  }
};

// ---------- fixes after review
GL.go = function (name, ground, ink) { GL.spots(); GL.place(name); var chap = /^(C0\d|S01)_/.test(name); FG.page(name, ground, ink, chap ? '' : GL.section(name), chap ? '' : GL.folio(name)); };
GL.V.C02_Identity = function (p) {
  GL.go(p, 'Lime', 'Ink');
  FG.wm(p, 'Mark', 80, 140, 1760, 'Ink');
  GL.big(p, 70, 1000, '02', 560, 'Ink'); GL.big(p, 640, 1000, 'IDENTITY', 250, 'Ink');
  FG.label(p, 1840, 66, 'Following / Brand Guidelines', 'Ink', { align: 'r' });
  FG.text(p, 'Type', 1840, 1000 - 3 * 34, 'Wordmark\rColour\rType\rLockups', 'M', 24, 'Ink', { lead: 34, align: 'r' });
};
GL.V.C03_Expression = function (p) {
  GL.go(p, 'Ink', 'White');
  GL.turns(p, 0, 0, FG.W, 600, 120, 'Lime', 'Ink', 11);
  GL.big(p, 70, 1000, '03', 400, 'Lime'); GL.big(p, 500, 1000, 'EXPRESSION', 200, 'White');
  FG.label(p, 1840, 66, 'Following / Brand Guidelines', 'White', { align: 'r' });
  FG.text(p, 'Type', 1840, 1000 - 3 * 34, 'Shapes\rThe line\rPattern\rIcons', 'M', 24, 'White', { lead: 34, align: 'r' });
};
(function () {
  var s3 = GL.V.S03_Colour_In_Use;
  GL.V.S03_Colour_In_Use = function (p) { GL.TSZ = 80; s3(p); GL.TSZ = 0; };
  var ep = GL.V.V_Extended_Palette;
  GL.V.V_Extended_Palette = function (p) { GL.TSZ = 70; ep(p); GL.TSZ = 0; };
  var t0 = GL.title;
  GL.title = function (p, x, y, l1, l2, col, size) { return t0(p, x, y, l1, l2, col, GL.TSZ || size); };
})();
// the Paid icon is a banknote, not a letter
(function () {
  var i0 = GL.icon;
  GL.icon = function (p, x, y, s, kind, col, acc) {
    if (kind !== 'paid') return i0(p, x, y, s, kind, col, acc);
    var g = FG.org(p), L = FG.lay('Mark'), k = s / 48, w = 3.4 * k, out = [];
    var r = L.pathItems.roundedRectangle(g[1] - (y + 12 * k), g[0] + x + 5 * k, 38 * k, 24 * k, 4 * k, 4 * k); r.filled = false; r.stroked = true; r.strokeWidth = w; r.strokeColor = FG.col(col); out.push(r);
    var e = L.pathItems.ellipse(g[1] - (y + 18 * k), g[0] + x + 18 * k, 12 * k, 12 * k); e.filled = false; e.stroked = true; e.strokeWidth = w; e.strokeColor = FG.col(col); out.push(e);
    var d1 = L.pathItems.ellipse(g[1] - (y + 22.4 * k), g[0] + x + 9.4 * k, 3.2 * k, 3.2 * k); d1.filled = true; d1.fillColor = FG.col(acc); d1.stroked = false; out.push(d1);
    var l = L.pathItems.add(); l.setEntirePath([[g[0] + x + 10 * k, g[1] - (y + 42 * k)], [g[0] + x + 38 * k, g[1] - (y + 42 * k)]]); l.stroked = true; l.filled = false; l.strokeWidth = w; l.strokeColor = FG.col(col); l.strokeCap = StrokeCap.ROUNDENDCAP; out.push(l);
    return out;
  };
})();

// ---------- re-lay every page on a clean grid in book order: 7 across, 2000 apart, 1160 down
GL.SLOT = function (i) { return [-6800 + (i % 7) * 2000, 7748 - Math.floor(i / 7) * 1160]; };
GL.relayout = function () {
  var d = FG.doc, R = d.layers.getByName(FG.ROOT), i, j, k, ab = {}, names = [], moves = [];
  for (i = 0; i < d.artboards.length; i++) { ab[d.artboards[i].name] = d.artboards[i].artboardRect; names.push(d.artboards[i].name); }
  function owner(it) {
    var n = it.name, c = n.indexOf(':');
    if (c > 0 && ab[n.substr(0, c)]) return n.substr(0, c);
    var b = it.geometricBounds, cx = (b[0] + b[2]) / 2, cy = (b[1] + b[3]) / 2, best = null, bd = 1e12, r, dd;
    for (k = 0; k < names.length; k++) { r = ab[names[k]]; if (cx >= r[0] && cx <= r[2] && cy <= r[1] && cy >= r[3]) { dd = Math.abs(cx - (r[0] + r[2]) / 2) + Math.abs(cy - (r[1] + r[3]) / 2); if (dd < bd) { bd = dd; best = names[k]; } } }
    return best;
  }
  // targets
  var target = {};
  for (i = 0; i < GL.BOOK.length; i++) target[GL.BOOK[i][0]] = GL.SLOT(i);
  // collect first, then move
  for (i = 0; i < R.layers.length; i++) {
    var L = R.layers[i];
    if (L.name === 'Grid' || L.name === 'Guides') continue;
    L.locked = false;
    for (j = 0; j < L.pageItems.length; j++) { var it = L.pageItems[j]; if (it.parent !== L) continue; var o = owner(it); if (o && target[o]) moves.push([it, o]); }
  }
  for (i = 0; i < moves.length; i++) { var src = ab[moves[i][1]], t = target[moves[i][1]]; moves[i][0].translate(t[0] - src[0], t[1] - src[1]); }
  for (i = 0; i < names.length; i++) if (target[names[i]]) { var t2 = target[names[i]]; d.artboards.getByName(names[i]).artboardRect = [t2[0], t2[1], t2[0] + FG.W, t2[1] - FG.H]; }
  // fresh grid and guides
  var G = R.layers.getByName('Grid'), U = R.layers.getByName('Guides');
  G.locked = false; G.visible = true; U.locked = false;
  while (G.pageItems.length) G.pageItems[0].remove();
  while (U.pageItems.length) U.pageItems[0].remove();
  d.activeLayer = G;
  for (i = 0; i < names.length; i++) {
    var r2 = d.artboards.getByName(names[i]).artboardRect;
    for (k = 0; k < FG.COLS; k++) { var c = G.pathItems.rectangle(r2[1] - FG.M, r2[0] + FG.cx(k + 1), FG.colW, FG.H - 2 * FG.M); c.filled = true; c.fillColor = FG.rgb(255, 0, 120); c.opacity = 8; c.stroked = false; c.name = names[i] + ':grid'; }
  }
  G.printable = false; G.visible = false; G.locked = true; U.printable = false;
  return moves.length + ' items moved, ' + names.length + ' pages';
};
// icons are tagged so they move and clear with their page
(function () { var i1 = GL.icon; GL.icon = function (p, x, y, s, kind, col, acc) { var out = i1(p, x, y, s, kind, col, acc), n; for (n = 0; n < out.length; n++) FG.tag(out[n], p, 'icon'); return out; }; })();

GL.V.G02_Contents = function (p) {
  GL.go(p, 'Ink', 'Lime');
  GL.title(p, 80, 250, 'Contents', null, 'Lime', 120);
  GL.fit(p, GL.Z + 'sticker_handover.png', 80, 420, 520, 520, 'spot');
  var C = [['01', 'Brand', 'The idea, what we do, values, audiences, voice', 'S01_Chapter_Brand'], ['02', 'Identity', 'Wordmark, colour, type', 'C02_Identity'], ['03', 'Expression', 'Shapes, the line, pattern, icons', 'C03_Expression'],
    ['04', 'Imagery', 'Illustration, photography, layout, motion', 'C04_Imagery'], ['05', 'In use', 'The app, Instagram, packaging, print, digital', 'C05_Applications'], ['06', 'Resources', 'Accessibility, files and contacts', 'G33_Accessibility']];
  var i;
  for (i = 0; i < C.length; i++) {
    var y = 160 + i * 145;
    GL.rule(p, 760, y - 20, 1080, 'Lime', 1);
    GL.big(p, 760, y + 100, C[i][0], 110, 'Lime');
    FG.text(p, 'Type', 920, y + 50, C[i][1], 'EB', 44, 'White', {});
    FG.text(p, 'Type', 920, y + 88, C[i][2], 'M', 19, 'Lilac', {});
    FG.text(p, 'Type', 1840, y + 50, GL.folio(C[i][3]), 'MI', 30, 'Lime', { align: 'r' });
  }
};

// ---------- phones with the current app (screens captured 2026-10-15 from creator-app-native 06ba4b8, staged data)
GL.APP = GL.R + 'final/assets/app_screens/';
GL.phone = function (p, file, x, y, w) {
  var g = FG.org(p), h = w * 2.164, L = FG.lay('Image'), M = FG.lay('Mark');
  var body = M.pathItems.roundedRectangle(g[1] - y, g[0] + x, w, h, w * 0.16, w * 0.16); body.filled = true; body.fillColor = FG.col('Ink'); body.stroked = true; body.strokeColor = FG.rgb(70, 74, 86); body.strokeWidth = 3; FG.tag(body, p, 'phone');
  var pad = w * 0.035, pi = L.placedItems.add(); pi.file = new File(file);
  var sw = w - 2 * pad, sh = h - 2 * pad, sc = Math.max(sw / pi.width, sh / pi.height); pi.resize(sc * 100, sc * 100);
  pi.position = [g[0] + x + pad - (pi.width - sw) / 2, g[1] - y - pad]; pi.embed();
  var ras = L.rasterItems[0], grp = M.groupItems.add(); ras.move(grp, ElementPlacement.PLACEATEND);
  var clip = grp.pathItems.roundedRectangle(g[1] - y - pad, g[0] + x + pad, sw, sh, w * 0.13, w * 0.13); clip.filled = false; clip.stroked = false; clip.move(grp, ElementPlacement.PLACEATBEGINNING); clip.clipping = true; grp.clipped = true;
  return FG.tag(grp, p, 'screen');
};
GL.V.S02_What_We_Do = function (p) {
  GL.go(p, 'Ink', 'Lime');
  GL.title(p, 80, 190, 'One app.', 'Four ways to work.', 'White', 84);
  var S = [['PAID COLLABS', 'Lime', 'Ink', 'creator_03_campaign_detail.png', 'Named talent for launches. Pay on approval.'], ['RECEIVE PRODUCTS', 'Forest', 'Lime', 'creator_02_deals.png', 'Barter: send product, get content every month.'], ['CASHBACK', 'Violet', 'White', 'creator_05_cashback_offer.png', 'Customers post and get money back in AED.'], ['PAYOUTS', 'Tomato', 'White', 'creator_07_wallet.png', 'Creators see every dirham, paid the day a post is verified.']];
  var i;
  for (i = 0; i < 4; i++) {
    var x = 660 + i * 300;
    GL.phone(p, GL.APP + S[i][3], x, 300, 270);
    GL.pill(p, x + 135, 290, S[i][0], 20, S[i][1], S[i][2], i % 2 ? 4 : -4);
    GL.body(p, x, 910, 270, 120, S[i][4], 'White', 18);
  }
  GL.body(p, 80, 330, 520, 300, 'Brands find creators, brief them, approve the post and pay, all in one place. Creators apply in a tap and get paid in AED.', 'Lilac', 24);
};
GL.V.V_App = function (p) {
  GL.go(p, 'Ink', 'Lime');
  var pts = FG.track([[-20, 840], [300, 820], { to: [1500, 780], loops: 2, r: 160, side: 1, env: false }, [1950, 820]]);
  var it = FG.gradLine(p, 'Mark', pts, 40, { steps: 120 }); FG.clip(p, 'Mark', it, 0, 0, FG.W, FG.H, { id: 'line' });
  var S = ['creator_01_home.png', 'creator_04_cashback.png', 'creator_07_wallet.png', 'creator_08_profile.png'], i;
  for (i = 0; i < 4; i++) GL.phone(p, GL.APP + S[i], 700 + i * 290, 160 + (i % 2) * 60, 260);
  GL.title(p, 80, 190, 'The app is', 'the brand.', 'White', 84);
  GL.body(p, 80, 330, 520, 300, 'White cards on a pale ground, Ink for structure, one lime action per screen. Tags mark status. The line appears once, on the welcome screen.', 'Lilac', 22);
  FG.label(p, 80, 1010, 'Creator app, October 2026. Sample data.', 'Lilac');
};
GL.V.V_Dashboard = function (p) {
  GL.go(p, 'Cream', 'Ink');
  GL.title(p, 80, 190, 'For brands,', 'the dashboard.', 'Ink', 84);
  GL.panel(p, GL.APP + 'dashboard_03_campaigns.png', 560, 120, 1300, 840, null, 0, 'dash');
  GL.body(p, 80, 330, 440, 300, 'Same palette, quieter: white surfaces, Ink type, Lilac for selection, Lime only for the main action and live states.', 'Ink', 22);
  FG.label(p, 80, 1010, 'Brand dashboard, October 2026. Sample data.', 'Ink');
};
GL.BOOK.splice(35, 0, ['V_Dashboard', '05 / Applications / Dashboard']);
GL.BOOK.push(['Z_Source_Artwork', '']); // kept last; left out of the PDF

GL.V.G29_Instagram = function (p) {
  GL.go(p, 'Lime', 'Ink');
  GL.panel(p, GL.R + 'final/assets/social_png/v3_Z1_Profile_Grid.png', 1180, 90, 660, 960, null, 0, 'grid');
  GL.title(p, 80, 190, 'Three columns.', 'Three jobs.', 'Ink', 84);
  var C = [['THE CREATOR', 'Left: a creator, full-bleed, a name.'], ['THE WORD', 'Centre: one giant line, Lime or Ink.'], ['THE DROP', 'Right: a deal or venue, one sticker.']], i;
  for (i = 0; i < 3; i++) { var y = 400 + i * 170; GL.rule(p, 80, y - 50, 1000, 'Ink', 2); GL.big(p, 80, y + 40, C[i][0], 84, 'Ink'); GL.body(p, 80, y + 60, 900, 60, C[i][1], 'Ink', 22); }
  GL.body(p, 80, 900, 1000, 120, 'Eleven series, one family of type (Obviously), Ink, Lime and photographs. The full system and every template: Following Instagram Templates.ai.', 'Ink', 20);
};
