// Round 4: white grounds, and only material that never runs out: creator photos and UGC, type, the line, tags, icons.
$.evalFile(new File('C:/Users/user/Desktop/DesignerFollowing/brands/following/explorations/igd.jsx'));

D.tagG = function (p, cx, cy, str, fill, ink, size, rot) {
  size = size || 30;
  var t = D.t(p, 0, 0, str, 'EB', size, ink, { track: -10 });
  var du = t.duplicate(), ol = du.createOutline(), ob = ol.geometricBounds; ol.remove();
  var tw = ob[2] - ob[0], th = ob[1] - ob[3], h = size * 1.9, w = tw + size * 1.4, g = FG.org(p);
  var r = FG.lay('Mark').pathItems.roundedRectangle(g[1] - (cy - h / 2), g[0] + (cx - w / 2), w, h, h / 2, h / 2); r.filled = true; r.fillColor = FG.col(fill); r.stroked = false;
  t.translate((g[0] + cx - tw / 2) - ob[0], (g[1] - (cy - th / 2)) - ob[1]);
  var grp = FG.lay('Mark').groupItems.add(); t.move(grp, ElementPlacement.PLACEATBEGINNING); r.move(grp, ElementPlacement.PLACEATEND);
  if (rot) grp.rotate(rot);
  return FG.tag(grp, p, 'tag');
};
D.label = function (p, x, y, str, col) { FG.rect(p, 'Mark', x, y - 16, 16, 16, 'Lime', { id: 'sq' }); return D.t(p, x + 30, y, str.toUpperCase(), 'SB', 22, col || 'Ink', { track: 160 }); };

// ---- E  THE FRAME
D.E = {};
D.E.photo = function (p, k, file, fx, fy, series, no, name, line) {
  D.post(p, 3, k, 'White');
  GL.img(p, D.PH + file, D.M, D.M, 936, 1000, fx, fy, 'photo');
  D.label(p, D.M, 1144, series); D.t(p, 1080 - D.M, 1144, no, 'M', 22, 'Grey', { align: 'r', track: 40 });
  var t = D.t(p, D.M, 1222, name, 'EB', 48, 'Ink', { track: -20 }); D.fit(t, 640);
  D.t(p, D.M, 1272, line, 'M', 26, 'Grey', { track: 0 });
  FG.wm(p, 'Mark', 1080 - D.M - 130, 1245, 130, 'Ink');
};
D.E.type = function (p, k, series, no, l1, l2, note) {
  D.post(p, 3, k, 'White');
  D.label(p, D.M, 120, series); D.t(p, 1080 - D.M, 120, no, 'M', 22, 'Grey', { align: 'r', track: 40 });
  var t = D.t(p, D.M, 560, l1 + '\r' + l2, 'EB', 124, 'Ink', { lead: 128, fonts: ['EB', 'MI'], track: -40 }); D.fit(t, 936);
  FG.line(p, 'Notes', D.M, 1150, 1080 - D.M, 1150, 'Ink', 1.5);
  D.t(p, D.M, 1222, note, 'M', 28, 'Ink', { track: 0 });
  FG.wm(p, 'Mark', 1080 - D.M - 130, 1245, 130, 'Ink');
};
D.E.build = function () {
  var E = D.E;
  E.photo('E1', 0, 'Joyful Connection HR.png', 0.62, 0.3, 'Creator spotlight', '014', 'Noor', '@noor.eats.dxb  /  Food, Dubai');
  E.type('E2', 1, 'The number', '027', 'AED 1.2M', 'paid to creators.', 'September, across 3,500 creators.');
  E.photo('E3', 2, 'Dessert in the Sky HR.png', 0.5, 0.15, 'Deal drop', '041', 'Free dessert', 'The Sweet Lab, JBR  /  for one reel');
  E.type('E4', 3, 'POV', '028', 'Your payout lands', 'before your latte.', 'Paid the day a post is verified.');
  E.photo('E5', 4, 'DJ in Tropical Vibes HR.png', 0.6, 0.3, 'On set', '019', 'One day, five formats', 'Shot in-house by Following Media');
  E.type('E6', 5, 'In their words', '033', '\u201CI paid my rent', 'with barter.\u201D', 'Lina, 41K followers, Dubai.');
  E.photo('E7', 6, 'Man with Smartphone Outdoors HR.png', 0.55, 0.25, 'What I earned', '006', 'AED 4,200', 'Karim  /  three paid collabs in September');
  E.type('E8', 7, 'Creator tips', '052', 'Three ways', 'to get picked.', 'Swipe for all three.');
  E.photo('E9', 8, 'Sporty Duo Portrait HR.png', 0.5, 0.35, 'Creator diaries', '003', 'Lina and Omar', 'A day on a shoot, Al Quoz');
};

// ---- F  THE LINE
D.F = {};
D.F.ROW = [[-40, 1190], [900, 1180], { to: [1700, 1170], loops: 1, r: 90, side: 1, env: false }, [2600, 1180], [3300, 1190]];
D.F.line = function (p, k) {
  var route = D.F.ROW, i, rt = [];
  for (i = 0; i < route.length; i++) { var e = route[i]; if (e instanceof Array) rt.push([e[0] - k * 1080, e[1]]); else rt.push({ to: [e.to[0] - k * 1080, e.to[1]], loops: e.loops, r: e.r, side: 1, env: false }); }
  var it = FG.gradLine(p, 'Mark', FG.track(rt), 30, { steps: 160 }); FG.clip(p, 'Mark', it, 0, 0, 1080, 1350, { id: 'line' });
};
D.F.photo = function (p, k, c, file, fx, fy, tag, name) {
  D.post(p, 4, k, 'White');
  var g = FG.org(p), L = FG.lay('Image'), pi = L.placedItems.add(); pi.file = new File(D.PH + file);
  var W = 936, H = 1000, sc = Math.max(W / pi.width, H / pi.height); pi.resize(sc * 100, sc * 100);
  pi.position = [g[0] + D.M - (pi.width - W) * fx, g[1] - D.M + (pi.height - H) * fy]; pi.embed();
  var ras = L.rasterItems[0], grp = L.groupItems.add(); ras.move(grp, ElementPlacement.PLACEATEND);
  var cl = grp.pathItems.roundedRectangle(g[1] - D.M, g[0] + D.M, W, H, 56, 56); cl.filled = false; cl.stroked = false; cl.move(grp, ElementPlacement.PLACEATBEGINNING); cl.clipping = true; grp.clipped = true; FG.tag(grp, p, 'photo');
  var tg = D.tagG(p, 0, 0, tag, 'White', 'Ink', 24, 0), tb = tg.geometricBounds; tg.translate((g[0] + D.M + 32) - tb[0], (g[1] - D.M - 32) - tb[1]);
  D.t(p, D.M, 1290, name, 'B', 30, 'Ink', { track: -10 });
  D.F.line(p, c);
};
D.F.type = function (p, k, c, series, l1, l2) {
  D.post(p, 4, k, 'White');
  D.t(p, D.M, 120, series.toUpperCase(), 'SB', 22, 'Ink', { track: 160 });
  var t = D.t(p, D.M, 420, l1 + '\r' + l2, 'EB', 124, 'Ink', { lead: 128, fonts: ['EB', 'MI'], track: -40 }); D.fit(t, 936);
  FG.wm(p, 'Mark', D.M, 1262, 130, 'Ink');
  D.F.line(p, c);
};
D.F.build = function () {
  var F = D.F;
  F.photo('F1', 0, 0, 'Joyful Connection HR.png', 0.62, 0.3, 'Creator spotlight', 'Noor, @noor.eats.dxb');
  F.type('F2', 1, 1, 'The number', 'AED 1.2M', 'paid to creators.');
  F.photo('F3', 2, 2, 'Dessert in the Sky HR.png', 0.5, 0.15, 'Deal drop', 'Free dessert at The Sweet Lab');
  F.photo('F4', 3, 0, 'DJ in Tropical Vibes HR.png', 0.6, 0.3, 'On set', 'One day, five formats');
  F.type('F5', 4, 1, 'POV', 'Your payout lands', 'before your latte.');
  F.photo('F6', 5, 2, 'Man with Smartphone Outdoors HR.png', 0.55, 0.25, 'What I earned', 'Karim, AED 4,200 in September');
  F.photo('F7', 6, 0, 'Perfume and Roses Display.png', 0.5, 0.5, 'Cashback Friday', '15% back at Ouda Perfumery');
  F.type('F8', 7, 1, 'In their words', '\u201CI paid my rent', 'with barter.\u201D');
  F.photo('F9', 8, 2, 'Sporty Duo Portrait HR.png', 0.5, 0.35, 'Creator diaries', 'Lina and Omar, Al Quoz');
};

// ---- G  THE TAGS
D.G = {};
D.G.photo = function (p, k, file, fx, fy, tags, name) {
  D.post(p, 5, k, 'White'); D.photo(p, file, fx, fy, 8);
  var i; for (i = 0; i < tags.length; i++) D.tagG(p, tags[i][0], tags[i][1], tags[i][2], tags[i][3], tags[i][4], 34, tags[i][5]);
  D.t(p, D.M, 1290, name, 'B', 30, 'White', { track: -10 });
};
D.G.type = function (p, k, l1, l2, tags, icon, note) {
  D.post(p, 5, k, 'White');
  var t = D.t(p, D.M, 560, l1 + '\r' + l2, 'EB', 124, 'Ink', { lead: 128, fonts: ['EB', 'MI'], track: -40 }); D.fit(t, 936);
  var i; for (i = 0; i < tags.length; i++) D.tagG(p, tags[i][0], tags[i][1], tags[i][2], tags[i][3], tags[i][4], 34, tags[i][5]);
  GL.icon(p, D.M, D.M, 96, icon, 'Ink', 'Lime');
  D.t(p, D.M, 1222, note, 'M', 28, 'Ink', { track: 0 });
  FG.wm(p, 'Mark', 1080 - D.M - 130, 1245, 130, 'Ink');
};
D.G.build = function () {
  var G = D.G;
  G.photo('G1', 0, 'Joyful Connection HR.png', 0.62, 0.3, [[300, 1080, 'CREATOR SPOTLIGHT', 'Lime', 'Ink', -6], [690, 1170, '12 PAID COLLABS', 'White', 'Ink', 4]], 'Noor, @noor.eats.dxb');
  G.type('G2', 1, 'AED 1.2M', 'paid to creators.', [[760, 820, 'SEPTEMBER', 'Violet', 'White', 6]], 'wallet', 'Across 3,500 creators on Following.');
  G.photo('G3', 2, 'Dessert in the Sky HR.png', 0.5, 0.15, [[260, 1080, 'BARTER', 'Lime', 'Ink', -6], [560, 1170, 'FREE FOR ONE REEL', 'White', 'Ink', 3]], 'The Sweet Lab, JBR');
  G.type('G4', 3, 'Your payout lands', 'before your latte.', [[780, 820, 'PAID TODAY', 'Lime', 'Ink', -5]], 'paid', 'Paid the day a post is verified.');
  G.photo('G5', 4, 'DJ in Tropical Vibes HR.png', 0.6, 0.3, [[300, 1080, 'FOLLOWING MEDIA', 'Forest', 'Lime', -5], [640, 1170, '5 FORMATS', 'White', 'Ink', 4]], 'One day on set, Halo Skin Lab');
  G.type('G6', 5, '\u201CI paid my rent', 'with barter.\u201D', [[770, 830, '@LINA.STYLES', 'Violet', 'White', 5]], 'creator', 'Lina, 41K followers, Dubai.');
  G.photo('G7', 6, 'Man with Smartphone Outdoors HR.png', 0.55, 0.25, [[260, 1080, 'PAID COLLABS', 'Lime', 'Ink', -6], [600, 1170, 'AED 4,200', 'White', 'Ink', 4]], 'Karim, September');
  G.type('G8', 7, 'Three ways', 'to get picked.', [[780, 820, 'CREATOR TIPS', 'Lime', 'Ink', -5]], 'spark', 'Swipe for all three.');
  G.photo('G9', 8, 'Sporty Duo Portrait HR.png', 0.5, 0.35, [[290, 1080, 'CREATOR DIARIES', 'Lime', 'Ink', -6], [620, 1170, 'AL QUOZ', 'White', 'Ink', 4]], 'A day on a shoot with Lina and Omar');
};
