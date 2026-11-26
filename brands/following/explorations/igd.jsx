// Following on Instagram: three whole-feed directions (2026-10-15, round 3). Own document: Following_Instagram_Directions.ai
// A THE COVER      every post is a magazine cover; a cream editorial page runs down the diagonal. Plus Jakarta only.
// B ILLUSTRATED    photo and illustration tiles alternate like a chequerboard. The illustrations carry the lime.
// C IN THE APP     photos with real app moments floating on them; the type posts are app compositions on Lilac and Cream.
$.evalFile(new File('C:/Users/user/Desktop/DesignerFollowing/brands/following/explorations/gl5.jsx'));
var D = {};
D.FILE = 'C:/Users/user/Desktop/DesignerFollowing/brands/following/explorations/Following_Instagram_Directions.ai';
D.PH = GL.R + 'final/assets/links/';
D.Z = GL.R + 'final/assets/illustration/zain_set/';
D.APP = GL.R + 'final/assets/app_screens/';
D.M = 72;

D.doc = function () {
  var d = null, i, src = null;
  for (i = 0; i < app.documents.length; i++) { if (app.documents[i].name.indexOf('Following_Instagram_Directions') === 0) d = app.documents[i]; if (app.documents[i].name.indexOf('Following_Brand_Guidelines') === 0) src = app.documents[i]; }
  if (!d) { var f = new File(D.FILE); if (f.exists) d = app.open(f); }
  if (!d) {
    d = app.documents.add(DocumentColorSpace.RGB, 1080, 1350); d.artboards[0].name = 'TMP';
    var root = d.layers[0]; root.name = 'SOCIAL'; var subs = ['Ground', 'Image', 'Mark', 'Type', 'Notes'], k;
    for (k = 0; k < subs.length; k++) { var s = root.layers.add(); s.name = subs[k]; }
    var so = d.layers.add(); so.name = 'SOURCE'; so.move(d, ElementPlacement.PLACEATEND);
    FG.doc = d;
    var C = [['Ink', 5, 9, 17], ['Lime', 211, 255, 2], ['Violet', 81, 0, 243], ['Lilac', 201, 167, 249], ['Forest', 30, 63, 32], ['Deep Purple', 19, 0, 66], ['Cream', 246, 243, 235], ['White', 255, 255, 255], ['Grey', 112, 116, 128], ['Mist', 236, 233, 226]];
    for (k = 0; k < C.length; k++) GL.spot(C[k][0], C[k][1], C[k][2], C[k][3]);
    GL.spots();
    if (src) { app.activeDocument = src; var SL = src.layers.getByName('SOURCE'); SL.locked = false; src.selection = null; SL.groupItems.getByName('following-wordmark-source').selected = true; app.copy(); src.selection = null; SL.locked = true; app.activeDocument = d; d.activeLayer = so; app.paste(); d.selection[0].name = 'following-wordmark-source'; d.selection = null; }
    so.visible = false; so.locked = true;
    d.saveAs(new File(D.FILE));
  }
  app.activeDocument = d; FG.doc = d; FG.ROOT = 'SOCIAL';
  return d;
};
FG.wm = function (page, layer, x, y, width, colName) {
  var g = FG.org(page), S = FG.doc.layers.getByName('SOURCE'); S.locked = false; S.visible = true;
  var c = S.groupItems.getByName('following-wordmark-source').duplicate(FG.lay(layer), ElementPlacement.PLACEATBEGINNING);
  S.visible = false; S.locked = true;
  var col = FG.col(colName), i; for (i = 0; i < c.pageItems.length; i++) { var it = c.pageItems[i]; if (it.typename === 'PathItem') it.fillColor = col; else if (it.typename === 'CompoundPathItem') it.pathItems[0].fillColor = col; }
  var s = width / c.width * 100; c.resize(s, s); c.position = [g[0] + x, g[1] - y];
  return FG.tag(c, page, 'wm');
};
D.board = function (name, row, k, w, h) {
  var d = FG.doc, ab, x = -5400 + k * 1180, y = 6000 - row * 1500;
  try { ab = d.artboards.getByName(name); } catch (e) { ab = d.artboards.add([x, y, x + (w || 1080), y - (h || 1350)]); ab.name = name; }
  FG.clear(name);
  return ab;
};
D.post = function (name, row, k, ground) { D.board(name, row, k); FG.rect(name, 'Ground', 0, 0, 1080, 1350, ground, { id: 'ground' }); };
D.t = function (p, x, y, str, key, size, col, o) { o = o || {}; return FG.text(p, 'Type', x, y, str, key, size, col, { lead: o.lead || size * 1.08, track: o.track === undefined ? -10 : o.track, align: o.align, fonts: o.fonts }); };
D.fit = function (t, maxW) { if (t.width > maxW) { var s = maxW / t.width * 100; t.resize(s, s, true, true, true, true, s, Transformation.BOTTOMLEFT); } return t; };
D.photo = function (p, file, fx, fy, shade) { GL.img(p, D.PH + file, 0, 0, 1080, 1350, fx, fy, 'photo'); if (shade) { var r = FG.rect(p, 'Image', 0, 0, 1080, 1350, 'Ink', { id: 'shade' }); r.opacity = shade; } };
D.band = function (p, y, h, op) { var r = FG.rect(p, 'Image', 0, y, 1080, h, 'Ink', { id: 'band' }); r.opacity = op; return r; };
D.shadow = function (it) {
  try { it.applyEffect('<LiveEffect name="Adobe Drop Shadow"><Dict data="R horz 0 R vert 18 R blur 40 R opac 0.22 I mode 1 B pair 1 I usePSLBlur 1 R dark 100 I csrc 0 R cr 0 R cg 0 R cb 0 "/></LiveEffect>'); } catch (e) {}
  return it;
};
D.card = function (p, x, y, w, h, fill, r, shadow) { var c = FG.rect(p, 'Mark', x, y, w, h, fill || 'White', { id: 'card', radius: r === undefined ? 36 : r }); if (shadow !== false) D.shadow(c); return c; };
D.pill = function (p, x, y, str, fill, ink, size) {
  size = size || 24; var t = D.t(p, 0, 0, str, 'B', size, ink, { track: 0 }); var b = t.geometricBounds, tw = b[2] - b[0], h = size * 2.1, w = tw + size * 1.6, g = FG.org(p);
  var r = FG.rect(p, 'Mark', x, y, w, h, fill, { id: 'pill', radius: h / 2 });
  var tb = t.geometricBounds; t.translate((g[0] + x + size * 0.8) - tb[0], (g[1] - y - h / 2 + size * 0.36) - (tb[1] - (tb[1] - tb[3]) + (tb[1] - tb[3])) + 0);
  t.move(FG.lay('Mark'), ElementPlacement.PLACEATBEGINNING);
  // re-seat baseline: point text y is baseline; move to x + pad, baseline at centre + 0.36 size
  var g2 = FG.org(p); t.position = [g2[0] + x + size * 0.8, t.position[1]];
  var tb2 = t.geometricBounds, capH = size * 0.72; t.translate(0, (g2[1] - y - h / 2 + capH / 2) - tb2[1] + (tb2[1] - tb2[3] - capH) * 0);
  return w;
};

// ================= A  THE COVER
D.A = {};
D.A.cover = function (p, k, file, fx, fy, series, issue, l1, l2) {
  D.post(p, 0, k, 'Ink'); D.photo(p, file, fx, fy, 16);
  FG.wm(p, 'Mark', D.M, D.M, 190, 'White');
  D.t(p, 1080 - D.M, D.M + 34, issue, 'M', 26, 'White', { align: 'r', track: 20 });
  D.t(p, D.M, 1030, series.toUpperCase(), 'SB', 26, 'Lime', { track: 180 });
  var t = D.t(p, D.M, 1130, l1 + '\r' + l2, 'EB', 88, 'White', { lead: 94, fonts: ['EB', 'MI'], track: -20 }); D.fit(t, 936);
};
D.A.page = function (p, k, series, issue, build, note) {
  D.post(p, 0, k, 'Cream');
  FG.wm(p, 'Mark', D.M, D.M, 190, 'Ink');
  D.t(p, 1080 - D.M, D.M + 34, issue, 'M', 26, 'Ink', { align: 'r', track: 20 });
  D.t(p, D.M, 260, series.toUpperCase(), 'SB', 22, 'Violet', { track: 180 });
  build(p);
  FG.line(p, 'Notes', D.M, 1150, 1080 - D.M, 1150, 'Ink', 1.5);
  D.t(p, D.M, 1210, note, 'M', 28, 'Ink', { track: 0 });
};
D.A.build = function () {
  var A = D.A;
  A.cover('A1', 0, 'Joyful Connection HR.png', 0.62, 0.3, 'Creator spotlight', 'No. 014', 'Noor eats Dubai.', 'Twelve paid collabs this year.');
  A.cover('A2', 1, 'Dessert in the Sky HR.png', 0.5, 0.15, 'Deal drop', 'No. 041', 'Free dessert.', 'For one reel at The Sweet Lab.');
  A.page('A3', 2, 'The number', 'No. 027', function (p) {
    D.t(p, D.M, 380, 'AED', 'EB', 80, 'Ink', { track: -10 });
    var n = D.t(p, D.M - 6, 640, '1.2M', 'EB', 300, 'Ink', { track: -40 }); D.fit(n, 936);
    var s = D.t(p, D.M, 760, 'paid to creators', 'MI', 76, 'Ink', { track: -20 }); D.t(p, D.M, 842, 'in September.', 'MI', 76, 'Ink', { track: -20 });
  }, 'Across 3,500 creators on Following.');
  A.cover('A4', 3, 'DJ in Tropical Vibes HR.png', 0.6, 0.3, 'On set', 'No. 019', 'One day, five formats.', 'Shot in-house by Following Media.');
  A.page('A5', 4, 'In their words', 'No. 033', function (p) {
    D.t(p, D.M - 10, 560, '\u201C', 'EB', 300, 'Lilac', { track: 0 });
    var q = D.t(p, D.M, 640, 'I paid my rent\rwith barter.\u201D', 'EB', 104, 'Ink', { lead: 112, fonts: ['EB', 'MI'], track: -30 }); D.fit(q, 936);
    GL.img(p, D.PH + 'Fashionable Youth HR.png', D.M, 900, 150, 150, 0.35, 0.3, 'face');
    D.t(p, D.M + 180, 960, 'Lina Haddad', 'B', 32, 'Ink', {}); D.t(p, D.M + 180, 1004, '41K followers, Dubai', 'M', 28, 'Ink', {});
  }, 'Creators, in their own words. Every Sunday.');
  A.cover('A6', 5, 'Man with Smartphone Outdoors HR.png', 0.55, 0.25, 'What I earned', 'No. 006', 'AED 4,200 in September.', 'Karim, on three paid collabs.');
  A.page('A7', 6, 'Creator tips  /  1 of 5', 'No. 052', function (p) {
    var q = D.t(p, D.M, 520, 'Three ways\rto get picked.', 'EB', 118, 'Ink', { lead: 124, fonts: ['EB', 'MI'], track: -30 }); D.fit(q, 936);
    var L = ['Fill your profile.', 'Answer the brief.', 'Post on time.'], i;
    for (i = 0; i < 3; i++) { D.t(p, D.M, 820 + i * 92, '0' + (i + 1), 'EB', 30, 'Violet', {}); D.t(p, D.M + 80, 820 + i * 92, L[i], 'M', 40, 'Ink', {}); }
  }, 'Swipe for all three.');
  A.cover('A8', 7, 'Perfume and Roses Display.png', 0.5, 0.5, 'Cashback Friday', 'No. 018', '15% back.', 'At Ouda Perfumery, when you post.');
  A.cover('A9', 8, 'Sporty Duo Portrait HR.png', 0.5, 0.35, 'Creator diaries', 'No. 003', 'A day on a shoot.', 'With Lina and Omar, Al Quoz.');
};

// ================= B  ILLUSTRATED: chequerboard of photos and illustrations
D.B = {};
D.B.photo = function (p, k, file, fx, fy, label, name, line) {
  D.post(p, 1, k, 'Ink'); D.photo(p, file, fx, fy, 14);
  D.pill(p, D.M, D.M, label, 'Cream', 'Ink', 30);
  var t = D.t(p, D.M, 1190, name, 'EB', 96, 'White', { track: -30 }); D.fit(t, 936);
  D.t(p, D.M, 1262, line, 'M', 32, 'White', { track: 0 });
};
D.B.ill = function (p, k, ground, l1, l2, spot, note) {
  D.post(p, 1, k, ground);
  var t = D.t(p, D.M, 220, l1 + '\r' + l2, 'EB', 104, 'Ink', { lead: 108, fonts: ['EB', 'MI'], track: -30 }); D.fit(t, 936);
  GL.fit(p, D.Z + spot, 330, 470, 700, 700, 'ill');
  FG.wm(p, 'Mark', D.M, 1230, 170, 'Ink');
  D.t(p, D.M, 1190, note, 'M', 28, 'Ink', { track: 0 });
};
D.B.build = function () {
  var B = D.B;
  B.photo('B1', 0, 'Joyful Connection HR.png', 0.62, 0.3, 'Creator spotlight', 'Noor', '@noor.eats.dxb  /  12 paid collabs');
  B.ill('B2', 1, 'Lilac', 'Get paid', 'to post.', 'spot_04.png', 'Paid collabs');
  B.photo('B3', 2, 'Dessert in the Sky HR.png', 0.5, 0.15, 'Deal drop', 'Free dessert', 'The Sweet Lab, JBR  /  for one reel');
  B.ill('B4', 3, 'Cream', 'Unbox it.', 'Post it. Keep it.', 'spot_02.png', 'Barter');
  B.photo('B5', 4, 'DJ in Tropical Vibes HR.png', 0.6, 0.3, 'On set', 'One day', 'Five formats, shot in-house');
  B.ill('B6', 5, 'Lilac', 'Money back,', 'every visit.', 'spot_06.png', 'Cashback');
  B.photo('B7', 6, 'Man with Smartphone Outdoors HR.png', 0.55, 0.25, 'What I earned', 'AED 4,200', 'Karim  /  September');
  B.ill('B8', 7, 'Cream', 'Three ways', 'to get picked.', 'spot_07.png', 'Creator tips');
  B.photo('B9', 8, 'Sporty Duo Portrait HR.png', 0.5, 0.35, 'Creator diaries', 'Lina & Omar', 'A day on a shoot, Al Quoz');
};

// ================= C  IN THE APP: real app moments on photos
D.C = {};
D.icon = function (p, x, y, s) { D.card(p, x, y, s, s, 'Lime', s * 0.24, false); FG.wm(p, 'Mark', x + s * 0.1, y + s * 0.4, s * 0.8, 'Ink'); };
D.notif = function (p, x, y, w, title, body, when) {
  var h = 168; D.card(p, x, y, w, h, 'White', 44);
  D.icon(p, x + 32, y + 36, 96);
  D.t(p, x + 156, y + 66, 'FOLLOWING', 'SB', 20, 'Grey', { track: 120 }); D.t(p, x + w - 32, y + 66, when, 'M', 22, 'Grey', { align: 'r', track: 0 });
  D.t(p, x + 156, y + 104, title, 'B', 30, 'Ink', { track: -10 });
  var b = D.t(p, x + 156, y + 140, body, 'M', 26, 'Ink', { track: 0 }); D.fit(b, w - 190);
};
D.button = function (p, x, y, w, str) { D.card(p, x, y, w, 84, 'Lime', 42, false); D.t(p, x + w / 2, y + 54, str, 'B', 30, 'Ink', { align: 'c', track: 0 }); };
D.C.photo = function (p, k, file, fx, fy) { D.post(p, 2, k, 'Ink'); D.photo(p, file, fx, fy, 8); };
D.C.head = function (p, l1, l2, col) { var t = D.t(p, D.M, 200, l1 + '\r' + l2, 'EB', 96, col || 'Ink', { lead: 100, fonts: ['EB', 'MI'], track: -30 }); D.fit(t, 936); };
D.C.build = function () {
  var C = D.C, p;
  p = 'C1'; C.photo(p, 0, 'Joyful Connection HR.png', 0.62, 0.3); D.notif(p, 56, 96, 968, 'Payout sent', 'Noor, AED 1,800 is on its way to your bank.', 'now');
  p = 'C2'; D.post(p, 2, 1, 'Cream'); C.head(p, 'Every post,', 'paid.');
  D.notif(p, 56, 440, 968, 'Post verified', 'Your reel for Smash Society is live.', '2m'); D.notif(p, 56, 640, 968, 'Payout sent', 'AED 1,800 is on its way to your bank.', 'now'); D.notif(p, 56, 840, 968, 'New deal', 'Free dessert at The Sweet Lab, for one reel.', '1h');
  FG.wm(p, 'Mark', D.M, 1230, 170, 'Ink');
  p = 'C3'; C.photo(p, 2, 'Dessert in the Sky HR.png', 0.5, 0.15);
  D.card(p, 56, 900, 968, 390, 'White', 44);
  D.pill(p, 96, 940, 'Barter', 'Lilac', 'Ink', 22); D.t(p, 984, 980, '20 spots', 'M', 26, 'Grey', { align: 'r' });
  D.t(p, 96, 1080, 'Free dessert for one reel', 'EB', 46, 'Ink', { track: -20 }); D.t(p, 96, 1128, 'The Sweet Lab, JBR  /  AED 180 value', 'M', 28, 'Grey', {});
  D.button(p, 96, 1170, 888, 'Apply');
  p = 'C4'; D.post(p, 2, 3, 'Lilac'); C.head(p, 'Your money,', 'in AED.');
  D.card(p, 56, 460, 968, 560, 'White', 44);
  D.t(p, 104, 560, 'Total balance', 'M', 30, 'Grey', {}); D.t(p, 96, 720, 'AED 5,153.25', 'EB', 120, 'Ink', { track: -40 });
  var R = [['Available', 'AED 3,240.50'], ['Pending', 'AED 412.75']], i; for (i = 0; i < 2; i++) { D.t(p, 104, 810 + i * 56, R[i][0], 'M', 30, 'Ink', {}); D.t(p, 976, 810 + i * 56, R[i][1], 'B', 30, 'Ink', { align: 'r' }); }
  D.button(p, 96, 900, 888, 'Withdraw');
  FG.wm(p, 'Mark', D.M, 1230, 170, 'Ink');
  p = 'C5'; C.photo(p, 4, 'DJ in Tropical Vibes HR.png', 0.6, 0.3);
  D.card(p, 56, 1030, 620, 260, 'White', 44); D.pill(p, 96, 1070, 'Following Media', 'Lime', 'Ink', 22); D.t(p, 96, 1200, 'One day, five formats.', 'EB', 40, 'Ink', { track: -20 }); D.t(p, 96, 1246, 'Shot in-house for Halo Skin Lab', 'M', 26, 'Grey', {});
  p = 'C6'; C.photo(p, 5, 'Man with Smartphone Outdoors HR.png', 0.55, 0.25);
  D.card(p, 56, 96, 968, 300, 'White', 44); D.t(p, 104, 180, 'Earned in September', 'M', 30, 'Grey', {}); D.t(p, 96, 310, 'AED 4,200', 'EB', 110, 'Ink', { track: -40 }); D.pill(p, 704, 132, '3 collabs', 'Lime', 'Ink', 24);
  p = 'C7'; C.photo(p, 6, 'Perfume and Roses Display.png', 0.5, 0.5);
  D.card(p, 56, 900, 968, 390, 'White', 44); D.pill(p, 96, 940, 'Cashback', 'Lilac', 'Ink', 22);
  D.t(p, 96, 1080, '15% back at Ouda Perfumery', 'EB', 46, 'Ink', { track: -20 }); D.t(p, 96, 1128, 'Dubai Mall  /  post your visit', 'M', 28, 'Grey', {});
  D.button(p, 96, 1170, 888, 'Scan a receipt');
  p = 'C8'; D.post(p, 2, 7, 'Cream'); C.head(p, 'New deals,', 'every week.');
  GL.phone(p, D.APP + 'creator_02_deals.png', 300, 420, 480);
  FG.wm(p, 'Mark', D.M, 1230, 170, 'Ink');
  p = 'C9'; C.photo(p, 8, 'Sporty Duo Portrait HR.png', 0.5, 0.35);
  D.card(p, 56, 1030, 968, 260, 'White', 44);
  GL.img(p, D.PH + 'Fashionable Youth HR.png', 96, 1070, 112, 112, 0.35, 0.3, 'av');
  D.t(p, 236, 1116, '@lina.styles', 'B', 34, 'Ink', {}); D.t(p, 236, 1160, '41K followers  /  Fashion  /  Dubai', 'M', 26, 'Grey', {}); D.pill(p, 96, 1204, 'Booked for 3 campaigns', 'Lime', 'Ink', 22);
};
