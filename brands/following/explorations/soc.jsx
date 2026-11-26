// Following Instagram template system (2026-10-15). Builds its own document: 'Following Instagram Templates'.
// Reuses the guideline helpers (lib.jsx, gl3/gl4/gl5) by pointing FG at the new document and the SOCIAL layer.
$.evalFile(new File('C:/Users/user/Desktop/DesignerFollowing/brands/following/explorations/gl5.jsx'));
var SO = {};
SO.FILE = 'C:/Users/user/Desktop/DesignerFollowing/brands/following/final/Following_Instagram_Templates.ai';
SO.PH = GL.R + 'final/assets/links/';
SO.Z = GL.Z;
SO.APP = GL.R + 'final/assets/app_screens/';

// open or make the document, with layers, swatches and the wordmark source
SO.doc = function () {
  var d = null, i;
  for (i = 0; i < app.documents.length; i++) if (app.documents[i].name.indexOf('Following_Instagram_Templates') === 0) d = app.documents[i];
  if (!d) { var f = new File(SO.FILE); if (f.exists) d = app.open(f); }
  if (!d) {
    var src = null;
    for (i = 0; i < app.documents.length; i++) if (app.documents[i].name.indexOf('Following Guidelines') === 0) src = app.documents[i];
    d = app.documents.add(DocumentColorSpace.RGB, 1080, 1350);
    d.artboards[0].name = 'TMP';
    var root = d.layers[0]; root.name = 'SOCIAL';
    var subs = ['Ground', 'Image', 'Mark', 'Type', 'Notes'], k;
    for (k = 0; k < subs.length; k++) { var s = root.layers.add(); s.name = subs[k]; }
    var so = d.layers.add(); so.name = 'SOURCE'; so.move(d, ElementPlacement.PLACEATEND);
    var gr = d.layers.add(); gr.name = 'Safe zones (do not print)'; gr.printable = false;
    // swatches
    var C = [['Ink', 5, 9, 17], ['Lime', 211, 255, 2], ['Violet', 81, 0, 243], ['Lilac', 201, 167, 249], ['Forest', 30, 63, 32], ['Deep Purple', 19, 0, 66], ['Cream', 246, 243, 235], ['White', 255, 255, 255], ['Tangerine', 255, 106, 19], ['Pink', 255, 62, 165]];
    FG.doc = d;
    for (k = 0; k < C.length; k++) GL.spot(C[k][0], C[k][1], C[k][2], C[k][3]);
    GL.spots();
    // wordmark source from the guidelines file
    if (src) { var w = src.layers.getByName('SOURCE').groupItems.getByName('following-wordmark-source'); var c = w.duplicate(so, ElementPlacement.PLACEATBEGINNING); c.name = 'following-wordmark-source'; }
    so.visible = false; so.locked = true;
    d.saveAs(new File(SO.FILE));
  }
  app.activeDocument = d; FG.doc = d; FG.ROOT = 'SOCIAL';
  return d;
};
// wordmark lookup must find the hidden, locked SOURCE layer
FG.wm = function (page, layer, x, y, width, colName, o) {
  o = o || {};
  var g = FG.org(page), S = FG.doc.layers.getByName('SOURCE'), lk = S.locked, vis = S.visible;
  S.locked = false; S.visible = true;
  var src = S.groupItems.getByName('following-wordmark-source');
  var c = src.duplicate(FG.lay(layer), ElementPlacement.PLACEATBEGINNING);
  S.visible = vis; S.locked = lk;
  var col = FG.col(colName), i;
  for (i = 0; i < c.pageItems.length; i++) { var it = c.pageItems[i]; if (it.typename === 'PathItem') it.fillColor = col; else if (it.typename === 'CompoundPathItem') it.pathItems[0].fillColor = col; }
  c.hidden = false;
  var s = width / c.width * 100; c.resize(s, s);
  c.position = [g[0] + x, g[1] - y];
  return FG.tag(c, page, o.id);
};

// artboards: rows by series. [name, w, h, row, col]
SO.SLOTS = {};
SO.board = function (name, w, h, row, col) {
  // the canvas is 16383 pt square around the first artboard: 7 rows, series wrap into a second block of columns
  var d = FG.doc, ab, r = row % 6, x = -7400 + (col + Math.floor(row / 6) * 5) * 1240, y = 6000 - r * 2120;
  try { ab = d.artboards.getByName(name); } catch (e) { ab = d.artboards.add([x, y, x + w, y - h]); ab.name = name; }
  SO.SLOTS[name] = [w, h];
  return ab;
};
SO.page = function (name, w, h, row, col, ground) {
  SO.board(name, w, h, row, col);
  FG.clear(name);
  FG.rect(name, 'Ground', 0, 0, w, h, ground, { id: 'ground' });
  // safe-zone guides: the 3:4 grid crop on posts, top 250 / bottom 340 on stories
  var L = FG.doc.layers.getByName('Safe zones (do not print)'), g = FG.org(name), r;
  for (var i = L.pageItems.length - 1; i >= 0; i--) if (L.pageItems[i].name === name + ':safe') L.pageItems[i].remove();
  if (h === 1350) { r = L.pathItems.rectangle(g[1], g[0] + (w - 1012) / 2, 1012, 1350); }
  else if (h === 1920) { r = L.pathItems.rectangle(g[1] - 250, g[0] + 60, w - 120, 1920 - 250 - 340); }
  if (r) { r.filled = false; r.stroked = true; r.strokeColor = FG.rgb(255, 0, 140); r.strokeWidth = 2; r.strokeDashes = [12, 8]; r.name = name + ':safe'; }
};
SO.wmk = function (p, x, y, w, col) { return FG.wm(p, 'Mark', x, y, w, col); };
SO.foot = function (p, w, h, col) { SO.wmk(p, 72, h - 72 - 42, 180, col); FG.text(p, 'Type', w - 72, h - 82, '@followingsocials', 'M', 24, col, { align: 'r' }); };
SO.tag = function (p, cx, cy, str, size, fill, ink, rot) { return GL.pill(p, cx, cy, str, size, fill, ink, rot); };
SO.big = function (p, x, y, str, size, col) { return GL.raw(p, x, y, str, 'Obviously-NarwBlck', size, col, { lead: size * 0.86 }); };
SO.t = function (p, x, y, str, key, size, col, o) { return FG.text(p, 'Type', x, y, str, key, size, col, o || {}); };
SO.card = function (p, x, y, w, h, col, r) { return FG.rect(p, 'Mark', x, y, w, h, col, { id: 'card', radius: r === undefined ? 28 : r }); };

// a sticker slot: dashed outline on the non-printing layer, so designers know where Instagram puts its sticker
SO.slot = function (p, x, y, w, h, label) {
  var g = FG.org(p), L = FG.doc.layers.getByName('Safe zones (do not print)');
  var r = L.pathItems.roundedRectangle(g[1] - y, g[0] + x, w, h, h / 2, h / 2); r.filled = false; r.stroked = true; r.strokeColor = FG.rgb(255, 255, 255); r.strokeWidth = 3; r.strokeDashes = [14, 10]; r.name = p + ':safe';
  var t = L.textFrames.pointText([g[0] + x + w / 2, g[1] - y - h / 2 - 10]); t.contents = label; t.textRange.characterAttributes.size = 28; t.textRange.characterAttributes.fillColor = FG.rgb(255, 255, 255); t.paragraphs[0].paragraphAttributes.justification = Justification.CENTER; t.name = p + ':safe';
};
// a phone: black body, rounded screen, the screenshot clipped inside
SO.phone = function (p, file, x, y, w) {
  var g = FG.org(p), h = w * 2.16, L = FG.lay('Image'), M = FG.lay('Mark');
  var body = M.pathItems.roundedRectangle(g[1] - y, g[0] + x, w, h, w * 0.16, w * 0.16); body.filled = true; body.fillColor = FG.col('Ink'); body.stroked = true; body.strokeColor = FG.rgb(60, 64, 76); body.strokeWidth = 3; FG.tag(body, p, 'phone');
  body.move(FG.lay('Ground'), ElementPlacement.PLACEATBEGINNING);
  var pad = w * 0.035, pi = L.placedItems.add(); pi.file = new File(file);
  var sw = w - 2 * pad, sh = h - 2 * pad, sc = Math.max(sw / pi.width, sh / pi.height); pi.resize(sc * 100, sc * 100);
  pi.position = [g[0] + x + pad - (pi.width - sw) / 2, g[1] - y - pad]; pi.embed();
  var ras = L.rasterItems[0], grp = L.groupItems.add(); ras.move(grp, ElementPlacement.PLACEATEND);
  var clip = grp.pathItems.roundedRectangle(g[1] - y - pad, g[0] + x + pad, sw, sh, w * 0.13, w * 0.13); clip.filled = false; clip.stroked = false; clip.move(grp, ElementPlacement.PLACEATBEGINNING); clip.clipping = true; grp.clipped = true;
  return FG.tag(grp, p, 'screen');
};
// ---------- REGULAR SERIES
SO.T = {};
// 1 Creator spotlight (weekly, Monday)
SO.T.R01_Creator_Spotlight_Post = function (p) {
  SO.page(p, 1080, 1350, 0, 0, 'Violet');
  GL.img(p, SO.PH + 'Joyful Connection HR.png', 0, 0, 1080, 900, 0.72, 0.3, 'photo');
  SO.tag(p, 300, 110, 'CREATOR SPOTLIGHT', 30, 'Lime', 'Ink', -4);
  SO.big(p, 72, 1060, 'NOOR', 200, 'White');
  SO.t(p, 72, 1120, '@noor.eats.dxb  /  Food and lifestyle  /  Dubai', 'M', 28, 'Lilac');
  SO.card(p, 72, 1160, 936, 110, 'White', 24);
  var S = [['48.2K', 'followers'], ['12', 'collabs'], ['AED 9,400', 'earned']], i;
  for (i = 0; i < 3; i++) { SO.t(p, 112 + i * 310, 1218, S[i][0], 'EB', 36, 'Ink'); SO.t(p, 112 + i * 310, 1250, S[i][1], 'M', 20, 'Ink'); }
};
SO.T.R01_Creator_Spotlight_Story = function (p) {
  SO.page(p, 1080, 1920, 0, 1, 'Violet');
  GL.img(p, SO.PH + 'Joyful Connection HR.png', 0, 0, 1080, 1920, 0.72, 0.3, 'photo');
  FG.rect(p, 'Mark', 0, 1180, 1080, 740, 'Violet', { id: 'band' });
  SO.tag(p, 330, 330, 'CREATOR SPOTLIGHT', 34, 'Lime', 'Ink', -4);
  SO.big(p, 72, 1400, 'NOOR', 240, 'White');
  SO.t(p, 72, 1470, 'From her first barter to 12 paid collabs this year.', 'M', 34, 'White');
  SO.card(p, 72, 1500, 600, 76, 'Lime', 38); SO.t(p, 372, 1550, 'Read her story', 'EB', 30, 'Ink', { align: 'c' });
};
// 2 Deal drop (weekly, Wednesday)
SO.T.R02_Deal_Drop_Post = function (p) {
  SO.page(p, 1080, 1350, 1, 0, 'Tomato');
  GL.img(p, SO.PH + 'Dessert in the Sky HR.png', 560, 0, 520, 1350, 0.5, 0.3, 'photo');
  SO.tag(p, 230, 140, 'DEAL DROP', 36, 'Sky', 'Ink', -5);
  SO.big(p, 72, 480, 'FREE', 165, 'Sky'); SO.big(p, 72, 630, 'DESSERT', 165, 'Sky'); SO.big(p, 72, 780, 'FOR A', 165, 'Sky'); SO.big(p, 72, 930, 'REEL.', 165, 'Sky');
  SO.card(p, 72, 1090, 330, 64, 'Sky', 32); SO.t(p, 237, 1133, 'AED 180 value', 'EB', 26, 'Ink', { align: 'c' });
  SO.t(p, 72, 1210, 'The Sweet Lab, JBR. 20 spots.', 'M', 26, 'White');
  SO.wmk(p, 72, 1250, 170, 'White');
};
SO.T.R02_Deal_Drop_Story = function (p) {
  SO.page(p, 1080, 1920, 1, 1, 'Tomato');
  GL.img(p, SO.PH + 'Dessert in the Sky HR.png', 0, 250, 1080, 1100, 0.5, 0.25, 'photo');
  SO.tag(p, 260, 330, 'DEAL DROP', 40, 'Sky', 'Ink', -5);
  SO.big(p, 72, 1500, 'FREE DESSERT', 150, 'Sky');
  SO.t(p, 72, 1560, 'Post one reel. 20 spots. Ends Sunday.', 'M', 34, 'White');
  SO.slot(p, 290, 1610, 500, 110, 'Link sticker');
};
// 3 Cashback Friday
SO.T.R03_Cashback_Friday_Post = function (p) {
  SO.page(p, 1080, 1350, 2, 0, 'Cobalt');
  SO.tag(p, 290, 130, 'CASHBACK FRIDAY', 34, 'Peach', 'Ink', -4);
  SO.big(p, 50, 780, '20%', 640, 'Peach');
  SO.t(p, 72, 900, 'BACK', 'EB', 90, 'White');
  SO.t(p, 72, 980, 'when you post your visit to The Burger Room.', 'M', 34, 'White');
  GL.icon(p, 860, 860, 150, 'cashback', 'Peach', 'Lime');
  SO.foot(p, 1080, 1350, 'White');
};
// 4 By the numbers
SO.T.R04_By_The_Numbers_Post = function (p) {
  SO.page(p, 1080, 1350, 3, 0, 'Ink');
  SO.t(p, 72, 150, 'THIS MONTH ON FOLLOWING', 'M', 24, 'Lime', { track: 120 });
  SO.big(p, 60, 640, 'AED', 260, 'White'); SO.big(p, 60, 900, '1.2M', 330, 'Lime');
  SO.t(p, 72, 1000, 'paid out to UAE creators.', 'MI', 52, 'White');
  var pts = FG.track([[-20, 1150], [300, 1140], { to: [780, 1120], loops: 1, r: 60, side: 1, env: false }, [1100, 1140]]);
  FG.clip(p, 'Mark', FG.gradLine(p, 'Mark', pts, 26, { steps: 80 }), 0, 0, 1080, 1350, { id: 'line' });
  SO.foot(p, 1080, 1350, 'White');
};
// 5 Creator tips carousel: cover, three tips, end card
SO.T.R05_Tips_Cover = function (p) {
  SO.page(p, 1080, 1350, 4, 0, 'Lime');
  SO.t(p, 72, 150, 'CREATOR TIPS  /  01 OF 05', 'M', 24, 'Ink', { track: 120 });
  SO.big(p, 60, 470, '3 WAYS', 260, 'Ink'); SO.big(p, 60, 700, 'TO GET', 260, 'Ink'); SO.big(p, 60, 930, 'PICKED.', 260, 'Ink');
  GL.fit(p, SO.Z + 'spot_04.png', 620, 940, 400, 400, 'spot');
  SO.t(p, 72, 1270, 'Swipe', 'MI', 36, 'Ink');
};
SO.tip = function (p, col, n, head, body, spot) {
  SO.page(p, 1080, 1350, 4, col, n % 2 ? 'Ink' : 'Violet');
  SO.big(p, 60, 420, '0' + n, 380, 'Lime');
  SO.t(p, 72, 560, head, 'EB', 64, 'White', { lead: 70 });
  FG.area(p, 'Type', 72, 700, 540, 400, body, 'M', 34, 'White', { lead: 48 });
  GL.fit(p, SO.Z + spot, 640, 760, 380, 380, 'spot');
  SO.t(p, 72, 1270, 'CREATOR TIPS  /  0' + (n + 1) + ' OF 05', 'M', 22, 'Lilac', { track: 120 });
};
SO.T.R05_Tips_Slide_1 = function (p) { SO.tip(p, 1, 1, 'Fill your\rprofile.', 'Brands pick creators they can picture. Add your niche, city and three best posts.', 'spot_01.png'); };
SO.T.R05_Tips_Slide_2 = function (p) { SO.tip(p, 2, 2, 'Answer\rthe brief.', 'Read the shot list twice. Hit every point in the first three seconds.', 'spot_05.png'); };
SO.T.R05_Tips_Slide_3 = function (p) { SO.tip(p, 3, 3, 'Post on\rtime.', 'Deadlines win repeat collabs. The app reminds you 24 hours before.', 'spot_07.png'); };
SO.T.R05_Tips_End = function (p) {
  SO.page(p, 1080, 1350, 4, 4, 'Lime');
  SO.big(p, 60, 560, 'NOW GO', 260, 'Ink'); SO.big(p, 60, 790, 'APPLY.', 260, 'Ink');
  SO.card(p, 72, 880, 620, 110, 'Ink', 55); SO.t(p, 382, 952, 'Download Following', 'EB', 40, 'Lime', { align: 'c' });
  SO.foot(p, 1080, 1350, 'Ink');
};
// 6 Behind the shoot (production)
SO.T.R06_Behind_The_Shoot_Post = function (p) {
  SO.page(p, 1080, 1350, 5, 0, 'Forest');
  SO.tag(p, 210, 120, 'ON SET', 40, 'Lime', 'Forest', -4);
  var F = ['DJ in Tropical Vibes HR.png', 'Sporty Duo Portrait HR.png', 'Celebrity Arrival Scene HR.png'], i;
  for (i = 0; i < 3; i++) { FG.rect(p, 'Ground', 72 + i * 316, 210, 304, 560, 'Ink', { id: 'film' }); GL.img(p, SO.PH + F[i], 84 + i * 316, 240, 280, 500, 0.55, 0.35, 'frame'); var k; for (k = 0; k < 6; k++) { FG.rect(p, 'Mark', 82 + i * 316 + k * 48, 218, 26, 14, 'Forest', { id: 'hole', radius: 4 }); FG.rect(p, 'Mark', 82 + i * 316 + k * 48, 748, 26, 14, 'Forest', { id: 'hole', radius: 4 }); } }
  SO.big(p, 72, 980, 'ONE DAY.', 170, 'Lime'); SO.big(p, 72, 1130, 'FIVE FORMATS.', 170, 'Lime');
  SO.t(p, 72, 1200, 'Following Media made the whole campaign in-house.', 'M', 30, 'White');
  SO.wmk(p, 72, 1240, 170, 'White');
};
// 7 Campaign recap (client win)
SO.T.R07_Campaign_Recap_Post = function (p) {
  SO.page(p, 1080, 1350, 6, 0, 'Ink');
  SO.tag(p, 260, 120, 'CAMPAIGN RECAP', 32, 'Violet', 'White', -4);
  SO.t(p, 72, 300, 'Summer drop', 'EB', 80, 'White'); SO.t(p, 72, 380, 'with Urban Clothing', 'MI', 80, 'Lime');
  var M = [['2.4M', 'reach'], ['1.8M', 'video plays'], ['4.6%', 'engagement'], ['32', 'creators']], i;
  for (i = 0; i < 4; i++) { var x = 72 + (i % 2) * 476, y = 470 + Math.floor(i / 2) * 330; SO.card(p, x, y, 460, 300, i === 0 ? 'Lime' : 'White', 32); SO.big(p, x + 36, y + 190, M[i][0], 150, 'Ink'); SO.t(p, x + 36, y + 250, M[i][1], 'M', 28, 'Ink'); }
  SO.foot(p, 1080, 1350, 'White');
};
// 8 Relatable (meme / POV)
SO.T.R08_Relatable_Post = function (p) {
  SO.page(p, 1080, 1350, 7, 0, 'Lilac');
  SO.t(p, 72, 200, 'POV:', 'EB', 110, 'Ink');
  SO.t(p, 72, 330, 'your payout lands', 'MI', 92, 'Ink'); SO.t(p, 72, 430, 'before your', 'MI', 92, 'Ink'); SO.t(p, 72, 530, 'iced latte does.', 'MI', 92, 'Ink');
  GL.fit(p, SO.Z + 'spot_07.png', 380, 620, 640, 640, 'spot');
  SO.foot(p, 1080, 1350, 'Ink');
};
// 9 This or that (story, interactive)
SO.T.R09_This_Or_That_Story = function (p) {
  SO.page(p, 1080, 1920, 7, 1, 'Ink');
  GL.img(p, SO.PH + 'Dessert in the Sky HR.png', 0, 0, 540, 1920, 0.5, 0.3, 'a');
  GL.img(p, SO.PH + 'Luxurious Red Leather HR.png', 540, 0, 540, 1920, 0.5, 0.5, 'b');
  SO.tag(p, 540, 330, 'THIS OR THAT', 44, 'Lime', 'Ink', -3);
  SO.big(p, 72, 1500, 'BARTER', 150, 'White'); SO.big(p, 612, 1500, 'PAID', 150, 'White');
  SO.slot(p, 190, 1600, 700, 120, 'Poll sticker');
};

// ---------- ONE-OFFS
SO.T.O01_Launch_Post = function (p) {
  SO.page(p, 1080, 1350, 8, 0, 'Ink');
  var pts = FG.track([[-20, 900], [200, 880], { to: [880, 860], loops: 1, r: 120, side: 1, env: false }, [1100, 880]]);
  FG.clip(p, 'Mark', FG.gradLine(p, 'Mark', pts, 40, { steps: 90 }), 0, 0, 1080, 1350, { id: 'line' });
  var ph = new File(SO.APP + 'creator_01_home.png');
  if (ph.exists) SO.phone(p, ph.fsName, 600, 170, 420); else GL.fit(p, GL.PH + '3.png', 600, 200, 420, 900, 'phone');
  SO.tag(p, 200, 150, 'NEW', 44, 'Lime', 'Ink', -6);
  SO.big(p, 72, 460, 'SCAN.', 190, 'White'); SO.big(p, 72, 620, 'POST.', 190, 'White'); SO.big(p, 72, 780, 'PAID.', 190, 'Lime');
  SO.t(p, 72, 1060, 'Receipt cashback is live', 'EB', 40, 'White'); SO.t(p, 72, 1110, 'in the Following app.', 'MI', 40, 'Lilac');
  SO.foot(p, 1080, 1350, 'White');
};
SO.T.O02_Milestone_Post = function (p) {
  SO.page(p, 1080, 1350, 9, 0, 'Ink');
  GL.FGX = function (x) { return FG.gradAt(Math.max(0, Math.min(1, x / 1080))); };
  GL.turns(p, 0, 0, 1080, 1350, 135, 'Lime', 'Ink', 21);
  GL.FGX = null;
  FG.rect(p, 'Mark', 72, 330, 936, 690, 'Ink', { id: 'plate', radius: 40 });
  SO.big(p, 110, 640, '5,000', 330, 'Lime'); SO.big(p, 110, 830, 'CREATORS', 200, 'White');
  SO.t(p, 110, 930, 'Thank you, UAE. Next stop: 10,000.', 'MI', 40, 'Lilac');
};
SO.T.O03_National_Day_Post = function (p) {
  SO.page(p, 1080, 1350, 10, 0, 'Forest');
  // UAE flag, drawn small: red hoist, green, white, black
  FG.rect(p, 'Mark', 72, 160, 90, 180, 'Tomato', { id: 'flag' });
  FG.rect(p, 'Mark', 162, 160, 300, 60, 'Forest', { id: 'flag', stroke: 'White', strokeW: 2 }); FG.rect(p, 'Mark', 162, 220, 300, 60, 'White', { id: 'flag' }); FG.rect(p, 'Mark', 162, 280, 300, 60, 'Ink', { id: 'flag' });
  SO.big(p, 60, 640, 'HAPPY', 220, 'Lime'); SO.big(p, 60, 830, 'NATIONAL', 220, 'Lime'); SO.big(p, 60, 1020, 'DAY, UAE.', 220, 'Lime');
  SO.t(p, 72, 1110, 'Born in Dubai. Proud of it. 2 December.', 'MI', 40, 'White');
  SO.foot(p, 1080, 1350, 'White');
};
SO.T.O04_Ramadan_Post = function (p) {
  SO.page(p, 1080, 1350, 11, 0, 'Deep Purple');
  var g = FG.org(p), L = FG.lay('Mark');
  var o1 = L.pathItems.ellipse(g[1] - 160, g[0] + 560, 420, 420); o1.filled = true; o1.fillColor = FG.col('Lime'); o1.stroked = false; FG.tag(o1, p, 'moon');
  var o2 = L.pathItems.ellipse(g[1] - 120, g[0] + 660, 400, 400); o2.filled = true; o2.fillColor = FG.col('Deep Purple'); o2.stroked = false; FG.tag(o2, p, 'moon');
  SO.big(p, 60, 840, 'RAMADAN', 220, 'White'); SO.big(p, 60, 1030, 'KAREEM.', 220, 'Lilac');
  SO.t(p, 72, 1120, 'From all of us at Following.', 'MI', 40, 'White');
  SO.foot(p, 1080, 1350, 'White');
};
SO.T.O05_As_Seen_On_Post = function (p) {
  SO.page(p, 1080, 1350, 12, 0, 'Cream');
  SO.tag(p, 230, 150, 'AS SEEN ON', 38, 'Ink', 'Lime', -4);
  SO.big(p, 60, 560, 'SHARK', 300, 'Ink'); SO.big(p, 60, 820, 'TANK', 300, 'Ink'); SO.big(p, 60, 1080, 'DUBAI.', 300, 'Violet');
  SO.t(p, 72, 1170, 'Watch the episode. Link in bio.', 'M', 34, 'Ink');
  SO.foot(p, 1080, 1350, 'Ink');
};

// ---------- REELS, HIGHLIGHTS
SO.T.X01_Reel_Cover = function (p) {
  SO.page(p, 1080, 1920, 8, 1, 'Ink');
  GL.img(p, SO.PH + 'Man with Smartphone Outdoors HR.png', 0, 0, 1080, 1180, 0.6, 0.3, 'photo');
  FG.rect(p, 'Ground', 0, 1180, 1080, 740, 'Ink', { id: 'band' });
  SO.tag(p, 300, 330, 'CREATOR DIARIES', 36, 'Lime', 'Ink', -4);
  SO.big(p, 72, 1360, 'MY FIRST', 200, 'White'); SO.big(p, 72, 1530, 'PAYOUT.', 200, 'Lime');
  SO.t(p, 72, 1240, 'EPISODE 01', 'M', 26, 'Lilac', { track: 120 });
};
SO.T.X02_Highlight_Covers = function (p) {
  SO.board(p, 1080 * 2, 1080, 7, 2); FG.clear(p);
  var H = [['paid', 'Burgundy', 'Rose', 'Paid'], ['barter', 'Tomato', 'Sky', 'Barter'], ['cashback', 'Cobalt', 'Peach', 'Cashback'], ['creator', 'Violet', 'Lime', 'Creators'], ['brand', 'Ink', 'Lime', 'Brands'], ['spark', 'Lime', 'Ink', 'New']], i;
  FG.rect(p, 'Ground', 0, 0, 2160, 1080, 'Cream', { id: 'ground' });
  for (i = 0; i < 6; i++) {
    var x = 80 + i * 340, y = 300;
    var g = FG.org(p), e = FG.lay('Ground').pathItems.ellipse(g[1] - y, g[0] + x, 300, 300); e.filled = true; e.fillColor = FG.col(H[i][1]); e.stroked = false; FG.tag(e, p, 'disc');
    GL.icon(p, x + 70, y + 70, 160, H[i][0], H[i][2], H[i][1] === 'Lime' ? 'Violet' : 'Lime');
    SO.t(p, x + 150, y + 380, H[i][3], 'EB', 34, 'Ink', { align: 'c' });
  }
  SO.t(p, 80, 160, 'Highlight covers', 'EB', 60, 'Ink'); SO.t(p, 80, 220, 'Export each disc at 1080 x 1080. The app crops a circle.', 'M', 28, 'Ink');
};

SO.build = function (name) { SO.T[name](name); return name + ' ok'; };
SO.ALL = []; (function () { for (var k in SO.T) SO.ALL.push(k); })();

// ================= v2: bolder. Full-bleed photos, one giant line set to the full width, one readable line, no cards.
// Set a line of Obviously caps to an exact width. y is the baseline.
SO.fitw = function (p, x, y, str, w, col, font) {
  var t = GL.raw(p, x, y, str, font || 'Obviously-NarwBlck', 100, col, { lead: 100 });
  var sc = w / t.width * 100; t.resize(sc, sc);
  var g = FG.org(p), b = t.geometricBounds; t.translate(g[0] + x - b[0], 0);
  // re-seat the baseline: Obviously caps sit on the baseline, so align the bottom of the caps to y
  b = t.geometricBounds; t.translate(0, (g[1] - y) - b[3]);
  return t;
};
SO.shade = function (p, x, y, w, h, op) { var r = FG.rect(p, 'Image', x, y, w, h, 'Ink', { id: 'shade' }); r.opacity = op; return r; };
SO.line1 = function (p, x, y, str, col) { return SO.t(p, x, y, str, 'B', 40, col, {}); };

SO.T.R01_Creator_Spotlight_Post = function (p) {
  SO.page(p, 1080, 1350, 0, 0, 'Ink');
  GL.img(p, SO.PH + 'Joyful Connection HR.png', 0, 0, 1080, 1350, 0.7, 0.25, 'photo');
  SO.shade(p, 0, 980, 1080, 370, 22);
  SO.tag(p, 290, 120, 'CREATOR SPOTLIGHT', 38, 'Lime', 'Ink', -5);
  SO.fitw(p, 50, 1230, 'NOOR', 980, 'White');
  SO.line1(p, 60, 1300, '@noor.eats.dxb', 'White');
  SO.wmk(p, 860, 1262, 160, 'White');
};
SO.T.R01_Creator_Spotlight_Story = function (p) {
  SO.page(p, 1080, 1920, 0, 1, 'Ink');
  GL.img(p, SO.PH + 'Joyful Connection HR.png', 0, 0, 1080, 1920, 0.72, 0.3, 'photo');
  SO.shade(p, 0, 1250, 1080, 670, 22);
  SO.tag(p, 330, 330, 'CREATOR SPOTLIGHT', 40, 'Lime', 'Ink', -5);
  SO.fitw(p, 50, 1520, 'NOOR', 980, 'White');
  SO.line1(p, 60, 1580, '12 paid collabs this year.', 'White');
  SO.slot(p, 290, 1330, 500, 110, 'Link sticker');
};
SO.T.R02_Deal_Drop_Post = function (p) {
  SO.page(p, 1080, 1350, 1, 0, 'Sky');
  GL.img(p, SO.PH + 'Dessert in the Sky HR.png', 0, 0, 1080, 1350, 0.5, 0.62, 'photo');
  SO.fitw(p, 50, 300, 'FREE', 980, 'White');
  SO.fitw(p, 50, 470, 'DESSERT.', 980, 'White');
  SO.tag(p, 820, 560, 'DEAL DROP', 40, 'Tomato', 'White', 6);
  SO.tag(p, 230, 1230, 'AED 180 VALUE', 34, 'White', 'Ink', -4);
  SO.wmk(p, 860, 1262, 160, 'White');
};
SO.T.R02_Deal_Drop_Story = function (p) {
  SO.page(p, 1080, 1920, 1, 1, 'Sky');
  GL.img(p, SO.PH + 'Dessert in the Sky HR.png', 0, 0, 1080, 1920, 0.5, 0.6, 'photo');
  SO.fitw(p, 50, 520, 'FREE', 980, 'White');
  SO.fitw(p, 50, 700, 'DESSERT.', 980, 'White');
  SO.tag(p, 800, 790, 'DEAL DROP', 44, 'Tomato', 'White', 6);
  SO.line1(p, 60, 1560, 'Post one reel. 20 spots.', 'White');
  SO.slot(p, 290, 1360, 500, 110, 'Link sticker');
};
SO.T.R03_Cashback_Friday_Post = function (p) {
  SO.page(p, 1080, 1350, 2, 0, 'Cobalt');
  SO.tag(p, 300, 130, 'CASHBACK FRIDAY', 38, 'Peach', 'Ink', -5);
  SO.fitw(p, 30, 900, '20%', 1020, 'Peach');
  SO.fitw(p, 40, 1120, 'BACK.', 640, 'White');
  SO.line1(p, 60, 1210, 'At The Burger Room, when you post.', 'White');
  SO.wmk(p, 860, 1262, 160, 'White');
};
SO.T.R04_By_The_Numbers_Post = function (p) {
  SO.page(p, 1080, 1350, 3, 0, 'Ink');
  SO.tag(p, 260, 130, 'THIS MONTH', 38, 'Lime', 'Ink', -5);
  SO.fitw(p, 40, 470, 'AED', 520, 'White');
  SO.fitw(p, 30, 900, '1.2M', 1020, 'Lime');
  SO.line1(p, 60, 990, 'paid to UAE creators.', 'White');
  var pts = FG.track([[-20, 1160], [300, 1150], { to: [780, 1130], loops: 1, r: 60, side: 1, env: false }, [1100, 1150]]);
  FG.clip(p, 'Mark', FG.gradLine(p, 'Mark', pts, 30, { steps: 80 }), 0, 0, 1080, 1350, { id: 'line' });
  SO.wmk(p, 860, 1262, 160, 'White');
};
SO.T.R06_Behind_The_Shoot_Post = function (p) {
  SO.page(p, 1080, 1350, 5, 0, 'Ink');
  GL.img(p, SO.PH + 'DJ in Tropical Vibes HR.png', 0, 0, 1080, 1350, 0.62, 0.3, 'photo');
  SO.shade(p, 0, 940, 1080, 410, 25);
  SO.tag(p, 200, 130, 'ON SET', 44, 'Lime', 'Ink', -5);
  SO.fitw(p, 50, 1090, 'ONE DAY.', 760, 'White');
  SO.fitw(p, 50, 1230, 'FIVE FORMATS.', 980, 'Lime');
  SO.line1(p, 60, 1300, 'Shot by Following Media.', 'White');
};
SO.T.R07_Campaign_Recap_Post = function (p) {
  SO.page(p, 1080, 1350, 6, 0, 'Lime');
  SO.tag(p, 280, 130, 'CAMPAIGN RECAP', 38, 'Ink', 'Lime', -5);
  SO.fitw(p, 30, 760, '2.4M', 1020, 'Ink');
  SO.fitw(p, 40, 980, 'PEOPLE REACHED.', 1000, 'Ink');
  SO.line1(p, 60, 1080, 'Summer drop with Urban Clothing. 32 creators, 9 days.', 'Ink');
  SO.wmk(p, 860, 1262, 160, 'Ink');
};
SO.T.X01_Reel_Cover = function (p) {
  SO.page(p, 1080, 1920, 8, 1, 'Ink');
  GL.img(p, SO.PH + 'Man with Smartphone Outdoors HR.png', 0, 0, 1080, 1920, 0.6, 0.3, 'photo');
  SO.shade(p, 0, 1180, 1080, 740, 22);
  SO.tag(p, 300, 330, 'CREATOR DIARIES', 40, 'Lime', 'Ink', -5);
  SO.fitw(p, 50, 1380, 'MY FIRST', 980, 'White');
  SO.fitw(p, 50, 1560, 'PAYOUT.', 980, 'Lime');
};

// ---------- exact type placement: measure the outlined caps, keep the live text, place the caps' box exactly
SO.word = function (p, str, w, col, font) {
  var t = GL.raw(p, 0, 500, str, font || 'Obviously-NarwBlck', 100, col, { lead: 100 });
  var dup = t.duplicate(), ol = dup.createOutline(), ob = ol.geometricBounds, tb = t.geometricBounds;
  var sc = w / (ob[2] - ob[0]) * 100; ol.remove();
  t.resize(sc, sc, true, true, true, true, sc, Transformation.TOPLEFT);
  dup = t.duplicate(); ol = dup.createOutline(); ob = ol.geometricBounds; tb = t.geometricBounds; ol.remove();
  return { t: t, h: ob[1] - ob[3], dx: ob[0] - tb[0], dy: tb[1] - ob[1] };
};
SO.at = function (p, wd, x, y) { var g = FG.org(p), tb = wd.t.geometricBounds; wd.t.translate((g[0] + x - wd.dx) - tb[0], (g[1] - y + wd.dy) - tb[1]); };
// lines stacked downward from yTop (each fitted to its own width), gap between caps
SO.stackT = function (p, x, yTop, lines, gap) { var y = yTop, i, wd; for (i = 0; i < lines.length; i++) { wd = SO.word(p, lines[i][0], lines[i][1], lines[i][2]); SO.at(p, wd, x, y); y += wd.h + gap; } return y - gap; };
// stacked upward so the last line's caps sit on yBottom
SO.stackB = function (p, x, yBottom, lines, gap) { var ws = [], i, tot = 0; for (i = 0; i < lines.length; i++) { ws.push(SO.word(p, lines[i][0], lines[i][1], lines[i][2])); tot += ws[i].h; } tot += gap * (lines.length - 1); var y = yBottom - tot; for (i = 0; i < ws.length; i++) { SO.at(p, ws[i], x, y); y += ws[i].h + gap; } return yBottom - tot; };

SO.T.R01_Creator_Spotlight_Post = function (p) {
  SO.page(p, 1080, 1350, 0, 0, 'Ink');
  GL.img(p, SO.PH + 'Joyful Connection HR.png', 0, 0, 1080, 1350, 0.7, 0.25, 'photo');
  SO.shade(p, 0, 960, 1080, 390, 22);
  SO.tag(p, 290, 120, 'CREATOR SPOTLIGHT', 38, 'Lime', 'Ink', -5);
  SO.stackB(p, 54, 1220, [['NOOR', 972, 'White']], 0);
  SO.line1(p, 60, 1295, '@noor.eats.dxb', 'White');
  SO.wmk(p, 860, 1262, 160, 'White');
};
SO.T.R01_Creator_Spotlight_Story = function (p) {
  SO.page(p, 1080, 1920, 0, 1, 'Ink');
  GL.img(p, SO.PH + 'Joyful Connection HR.png', 0, 0, 1080, 1920, 0.72, 0.3, 'photo');
  SO.shade(p, 0, 1200, 1080, 720, 22);
  SO.tag(p, 330, 330, 'CREATOR SPOTLIGHT', 40, 'Lime', 'Ink', -5);
  SO.stackB(p, 54, 1500, [['NOOR', 972, 'White']], 0);
  SO.line1(p, 60, 1570, '12 paid collabs this year.', 'White');
  SO.slot(p, 290, 1290, 500, 110, 'Link sticker');
};
SO.T.R02_Deal_Drop_Post = function (p) {
  SO.page(p, 1080, 1350, 1, 0, 'Sky');
  GL.img(p, SO.PH + 'Dessert in the Sky HR.png', 0, 0, 1080, 1350, 0.5, 0.75, 'photo');
  SO.stackT(p, 54, 80, [['FREE', 600, 'White'], ['DESSERT.', 972, 'White']], 18);
  SO.tag(p, 860, 520, 'DEAL DROP', 40, 'Tomato', 'White', 6);
  SO.tag(p, 230, 1230, 'AED 180 VALUE', 34, 'White', 'Ink', -4);
  SO.wmk(p, 860, 1262, 160, 'White');
};
SO.T.R02_Deal_Drop_Story = function (p) {
  SO.page(p, 1080, 1920, 1, 1, 'Sky');
  GL.img(p, SO.PH + 'Dessert in the Sky HR.png', 0, 0, 1080, 1920, 0.5, 0.75, 'photo');
  SO.stackT(p, 54, 270, [['FREE', 600, 'White'], ['DESSERT.', 972, 'White']], 18);
  SO.tag(p, 840, 700, 'DEAL DROP', 44, 'Tomato', 'White', 6);
  SO.line1(p, 60, 1570, 'Post one reel. 20 spots.', 'White');
  SO.slot(p, 290, 1390, 500, 110, 'Link sticker');
};
SO.T.R03_Cashback_Friday_Post = function (p) {
  SO.page(p, 1080, 1350, 2, 0, 'Cobalt');
  SO.tag(p, 300, 130, 'CASHBACK FRIDAY', 38, 'Peach', 'Ink', -5);
  SO.stackT(p, 40, 240, [['20%', 1000, 'Peach'], ['BACK.', 600, 'White']], 30);
  SO.line1(p, 60, 1200, 'At The Burger Room, when you post.', 'White');
  SO.wmk(p, 860, 1262, 160, 'White');
};
SO.T.R04_By_The_Numbers_Post = function (p) {
  SO.page(p, 1080, 1350, 3, 0, 'Ink');
  SO.tag(p, 250, 130, 'THIS MONTH', 38, 'Lime', 'Ink', -5);
  var b = SO.stackT(p, 40, 250, [['AED', 360, 'White'], ['1.2M', 1000, 'Lime']], 24);
  SO.line1(p, 60, b + 80, 'paid to UAE creators.', 'White');
  var pts = FG.track([[-20, 1170], [300, 1160], { to: [780, 1140], loops: 1, r: 60, side: 1, env: false }, [1100, 1160]]);
  FG.clip(p, 'Mark', FG.gradLine(p, 'Mark', pts, 30, { steps: 80 }), 0, 0, 1080, 1350, { id: 'line' });
  SO.wmk(p, 860, 1262, 160, 'White');
};
SO.T.R06_Behind_The_Shoot_Post = function (p) {
  SO.page(p, 1080, 1350, 5, 0, 'Ink');
  GL.img(p, SO.PH + 'DJ in Tropical Vibes HR.png', 0, 0, 1080, 1350, 0.62, 0.3, 'photo');
  SO.shade(p, 0, 900, 1080, 450, 25);
  SO.tag(p, 200, 130, 'ON SET', 44, 'Lime', 'Ink', -5);
  SO.stackB(p, 54, 1220, [['ONE DAY.', 700, 'White'], ['FIVE FORMATS.', 972, 'Lime']], 16);
  SO.line1(p, 60, 1295, 'Shot by Following Media.', 'White');
};
SO.T.R07_Campaign_Recap_Post = function (p) {
  SO.page(p, 1080, 1350, 6, 0, 'Lime');
  SO.tag(p, 280, 130, 'CAMPAIGN RECAP', 38, 'Ink', 'Lime', -5);
  var b = SO.stackT(p, 40, 250, [['2.4M', 1000, 'Ink'], ['PEOPLE REACHED.', 1000, 'Ink']], 30);
  SO.line1(p, 60, b + 90, 'Urban Clothing summer drop. 32 creators.', 'Ink');
  SO.wmk(p, 860, 1262, 160, 'Ink');
};
SO.T.X01_Reel_Cover = function (p) {
  SO.page(p, 1080, 1920, 8, 1, 'Ink');
  GL.img(p, SO.PH + 'Man with Smartphone Outdoors HR.png', 0, 0, 1080, 1920, 0.6, 0.3, 'photo');
  SO.shade(p, 0, 1150, 1080, 770, 22);
  SO.tag(p, 300, 330, 'CREATOR DIARIES', 40, 'Lime', 'Ink', -5);
  SO.stackB(p, 54, 1560, [['MY FIRST', 972, 'White'], ['PAYOUT.', 972, 'Lime']], 16);
};
SO.T.R02_Deal_Drop_Post = function (p) {
  SO.page(p, 1080, 1350, 1, 0, 'Sky');
  GL.img(p, SO.PH + 'Dessert in the Sky HR.png', 0, 0, 1080, 1350, 0.5, 0.0, 'photo');
  SO.tag(p, 220, 120, 'DEAL DROP', 40, 'Tomato', 'White', -6);
  SO.stackB(p, 54, 1200, [['FREE', 560, 'Tomato'], ['DESSERT.', 972, 'Tomato']], 16);
  SO.tag(p, 200, 1270, 'AED 180 VALUE', 30, 'White', 'Ink', -3);
  SO.wmk(p, 860, 1262, 160, 'Tomato');
};
SO.T.R02_Deal_Drop_Story = function (p) {
  SO.page(p, 1080, 1920, 1, 1, 'Sky');
  GL.img(p, SO.PH + 'Dessert in the Sky HR.png', 0, 0, 1080, 1920, 0.5, 0.0, 'photo');
  SO.tag(p, 250, 330, 'DEAL DROP', 44, 'Tomato', 'White', -6);
  SO.stackB(p, 54, 1430, [['FREE', 560, 'Tomato'], ['DESSERT.', 972, 'Tomato']], 16);
  SO.line1(p, 60, 1500, 'Post one reel. 20 spots.', 'Ink');
};
SO.T.X01_Reel_Cover = function (p) {
  SO.page(p, 1080, 1920, 8, 1, 'Ink');
  GL.img(p, SO.PH + 'Man with Smartphone Outdoors HR.png', 0, 0, 1080, 1920, 0.6, 0.05, 'photo');
  SO.shade(p, 0, 1250, 1080, 670, 30);
  SO.tag(p, 300, 330, 'CREATOR DIARIES', 40, 'Lime', 'Ink', -5);
  SO.stackB(p, 54, 1580, [['MY FIRST', 820, 'White'], ['PAYOUT.', 820, 'Lime']], 14);
};
SO.T.R04_By_The_Numbers_Post = function (p) {
  SO.page(p, 1080, 1350, 3, 0, 'Ink');
  SO.tag(p, 250, 130, 'THIS MONTH', 38, 'Lime', 'Ink', -5);
  var b = SO.stackT(p, 40, 230, [['AED', 360, 'White'], ['1.2M', 1000, 'Lime']], 24);
  SO.line1(p, 60, b + 80, 'paid to UAE creators.', 'White');
  var pts = FG.track([[-20, 1200], [300, 1190], { to: [700, 1175], loops: 1, r: 45, side: 1, env: false }, [1100, 1190]]);
  FG.clip(p, 'Mark', FG.gradLine(p, 'Mark', pts, 26, { steps: 80 }), 0, 0, 1080, 1350, { id: 'line' });
  SO.wmk(p, 860, 1262, 160, 'White');
};

// ---------- the profile grid, as the app shows it: 3 across, each post cropped to 3:4 from the middle
SO.GRID = ['O01_Launch_Post', 'R01_Creator_Spotlight_Post', 'R08_Relatable_Post', 'R03_Cashback_Friday_Post', 'R06_Behind_The_Shoot_Post', 'R05_Tips_Cover', 'R02_Deal_Drop_Post', 'R04_By_The_Numbers_Post', 'O02_Milestone_Post', 'O05_As_Seen_On_Post', 'O04_Ramadan_Post', 'R07_Campaign_Recap_Post'];
SO.T.Z01_Profile_Grid = function (p) {
  SO.board(p, 1500, 3000, 2, 3); FG.clear(p);
  FG.rect(p, 'Ground', 0, 0, 1500, 3000, 'Cream', { id: 'ground' });
  var PX = 105, PY = 100, W = 1290, H = 2796, g = FG.org(p), M = FG.lay('Mark');
  var body = FG.lay('Ground').pathItems.roundedRectangle(g[1] - PY, g[0] + PX, W, H, 190, 190); body.filled = true; body.fillColor = FG.col('Ink'); body.stroked = false; FG.tag(body, p, 'phone');
  var sx = PX + 40, sy = PY + 40, sw = W - 80, sh = H - 80;
  var scr = FG.lay('Ground').pathItems.roundedRectangle(g[1] - sy, g[0] + sx, sw, sh, 150, 150); scr.filled = true; scr.fillColor = FG.col('White'); scr.stroked = false; FG.tag(scr, p, 'screen');
  var y = sy + 150;
  SO.t(p, sx + 60, y, 'followingsocials', 'B', 46, 'Ink');
  y += 70;
  var av = M.pathItems.ellipse(g[1] - y, g[0] + sx + 60, 210, 210); av.filled = true; av.fillColor = FG.col('Ink'); av.stroked = false; FG.tag(av, p, 'avatar');
  SO.wmk(p, sx + 80, y + 88, 170, 'Lime');
  var S = [['312', 'posts'], ['48.2K', 'followers'], ['210', 'following']], i;
  for (i = 0; i < 3; i++) { SO.t(p, sx + 420 + i * 240, y + 95, S[i][0], 'B', 42, 'Ink', { align: 'c' }); SO.t(p, sx + 420 + i * 240, y + 140, S[i][1], 'M', 30, 'Ink', { align: 'c' }); }
  y += 270;
  SO.t(p, sx + 60, y, 'Following', 'B', 34, 'Ink');
  SO.t(p, sx + 60, y + 48, 'The influencer everything app.', 'M', 32, 'Ink');
  SO.t(p, sx + 60, y + 94, 'Paid collabs, barter and cashback. Born in Dubai.', 'M', 32, 'Ink');
  SO.t(p, sx + 60, y + 140, 'following.ae', 'B', 32, 'Violet');
  y += 200;
  var Hc = [['Burgundy', 'paid', 'Rose', 'Paid'], ['Tomato', 'barter', 'Sky', 'Barter'], ['Cobalt', 'cashback', 'Peach', 'Cashback'], ['Violet', 'creator', 'Lime', 'Creators'], ['Ink', 'brand', 'Lime', 'Brands']];
  for (i = 0; i < 5; i++) {
    var cx = sx + 60 + i * 225;
    var d = M.pathItems.ellipse(g[1] - y, g[0] + cx, 150, 150); d.filled = true; d.fillColor = FG.col(Hc[i][0]); d.stroked = true; d.strokeColor = FG.rgb(220, 220, 220); d.strokeWidth = 4; FG.tag(d, p, 'hl');
    GL.icon(p, cx + 35, y + 35, 80, Hc[i][1], Hc[i][2], 'Lime');
    SO.t(p, cx + 75, y + 200, Hc[i][3], 'M', 26, 'Ink', { align: 'c' });
  }
  y += 260;
  var gap = 4, cw = (sw - 2 * gap) / 3, ch = cw * 4 / 3, k;
  var gridItems = [];
  for (k = 0; k < SO.GRID.length; k++) {
    var c = k % 3, r = Math.floor(k / 3), gx = sx + c * (cw + gap), gy = y + r * (ch + gap);
    if (gy > sy + sh) break;
    gridItems.push(GL.img(p, GL.R + 'final/assets/social_png/' + SO.GRID[k] + '.png', gx, gy, cw, ch, 0.5, 0.5, 'cell'));
  }
  // clip the grid to the screen so the last row runs under the bottom edge, as it does when you scroll
  var grp = FG.lay('Image').groupItems.add(), q; for (q = 0; q < gridItems.length; q++) gridItems[q].move(grp, ElementPlacement.PLACEATEND);
  var cl = grp.pathItems.roundedRectangle(g[1] - sy, g[0] + sx, sw, sh, 150, 150); cl.filled = false; cl.stroked = false; cl.move(grp, ElementPlacement.PLACEATBEGINNING); cl.clipping = true; grp.clipped = true; FG.tag(grp, p, 'grid');
};
