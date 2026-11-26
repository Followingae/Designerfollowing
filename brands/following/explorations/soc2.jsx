// Following on Instagram, v2 (2026-10-15). One system, not a pile of posters.
// The grid: three columns, three jobs, forever.
//   Left   THE CREATOR  full-bleed photo or reel cover, a name, nothing else
//   Centre THE WORD     a type tile, Lime or Ink, alternating row by row, one giant line
//   Right  THE DROP     a deal, a venue or a product, full-bleed photo with one sticker
// One family: Obviously (Narrow Black for headlines, Semibold for tags and small lines). Ink, Lime, White, photographs.
// Fixed furniture on every post: series tag top-left, episode top-right, headline bottom-left, all on a 72 px margin.
$.evalFile(new File('C:/Users/user/Desktop/DesignerFollowing/brands/following/explorations/soc.jsx'));
var IG = {};
IG.M = 72; IG.H = 'Obviously-NarwBlck'; IG.S = 'Obviously-Semi';
IG.P = SO.PH;

IG.reset = function () {
  var d = SO.doc(), i, R = d.layers.getByName('SOCIAL');
  for (i = 0; i < R.layers.length; i++) { var L = R.layers[i]; while (L.pageItems.length) L.pageItems[0].remove(); }
  var Z = d.layers.getByName('Safe zones (do not print)'); while (Z.pageItems.length) Z.pageItems[0].remove();
  var keep; try { keep = d.artboards.getByName('TMP'); } catch (e) { keep = d.artboards.add([-7400, 7000, -7300, 6900]); keep.name = 'TMP'; }
  for (i = d.artboards.length - 1; i >= 0; i--) if (d.artboards[i].name !== 'TMP') d.artboards[i].remove();
  return d;
};
// small caps line in Obviously Semibold
IG.small = function (p, x, y, str, size, col, o) { o = o || {}; var t = GL.raw(p, x, y, str.toUpperCase(), IG.S, size || 30, col, { lead: (size || 30) * 1.2, track: o.track === undefined ? 30 : o.track, align: o.align }); return t; };
// the series tag: a lime pill, Obviously Semibold caps, never tilted, always at the top-left margin
IG.tag = function (p, str, fill, ink, x, y) {
  x = x === undefined ? IG.M : x; y = y === undefined ? IG.M : y;
  var t = IG.small(p, 0, 0, str, 28, ink || 'Ink', { track: 40 });
  var b = t.geometricBounds, tw = b[2] - b[0], h = 58, w = tw + 48;
  var g = FG.org(p), r = FG.rect(p, 'Mark', x, y, w, h, fill || 'Lime', { id: 'tag', radius: h / 2 });
  var dup = t.duplicate(), ol = dup.createOutline(), ob = ol.geometricBounds; ol.remove();
  t.translate((g[0] + x + 24) - ob[0], (g[1] - y - (h - (ob[1] - ob[3])) / 2) - ob[1]);
  t.move(FG.lay('Mark'), ElementPlacement.PLACEATBEGINNING);
  return w;
};
IG.ep = function (p, w, str, col) { var t = IG.small(p, w - IG.M, IG.M + 40, str, 28, col, { align: 'r', track: 40 }); return t; };
IG.head = function (p, x, yBottom, lines, gap) { return SO.stackB(p, x, yBottom, lines, gap === undefined ? 14 : gap); };
IG.headT = function (p, x, yTop, lines, gap) { return SO.stackT(p, x, yTop, lines, gap === undefined ? 14 : gap); };
IG.wm = function (p, w, h, col) { SO.wmk(p, w - IG.M - 150, h - IG.M - 36, 150, col); };
// a round sticker: one number or word, Lime on Ink photos, slightly tilted
IG.sticker = function (p, cx, cy, d, line1, line2, fill, ink) {
  var g = FG.org(p), e = FG.lay('Mark').pathItems.ellipse(g[1] - (cy - d / 2), g[0] + (cx - d / 2), d, d); e.filled = true; e.fillColor = FG.col(fill || 'Lime'); e.stroked = false; FG.tag(e, p, 'sticker');
  var a = SO.word(p, line1, d * 0.72, ink || 'Ink'); SO.at(p, a, cx - d * 0.36, cy - a.h / 2 - (line2 ? d * 0.08 : 0));
  if (line2) { var b = IG.small(p, cx, cy + a.h / 2 + d * 0.02 + 30, line2, d * 0.09, ink || 'Ink', { align: 'c', track: 40 }); }
  var grp = FG.lay('Mark').groupItems.add(); a.t.move(grp, ElementPlacement.PLACEATEND); if (b) b.move(grp, ElementPlacement.PLACEATEND); e.move(grp, ElementPlacement.PLACEATEND); grp.rotate(-8); FG.tag(grp, p, 'sticker');
};
IG.photo = function (p, file, w, h, fx, fy, shadeTop) { GL.img(p, IG.P + file, 0, 0, w, h, fx, fy, 'photo'); if (shadeTop) { var r = FG.rect(p, 'Image', 0, h - shadeTop, w, shadeTop, 'Ink', { id: 'shade' }); r.opacity = 24; } };

IG.T = {};
IG.pos = {};
IG.post = function (name, row, col, ground) { SO.page(name, 1080, 1350, row, col, ground); };
IG.story = function (name, row, col, ground) { SO.page(name, 1080, 1920, row, col, ground); };

// ===== LEFT COLUMN: THE CREATOR
IG.T.L1_Creator_Spotlight = function (p) {
  IG.post(p, 0, 0, 'Ink'); IG.photo(p, 'Joyful Connection HR.png', 1080, 1350, 0.7, 0.25, 420);
  IG.tag(p, 'Creator spotlight'); IG.ep(p, 1080, '#014', 'White');
  IG.head(p, IG.M, 1230, [['NOOR', 560, 'White']]); IG.small(p, IG.M, 1290, '@noor.eats.dxb  /  Food  /  Dubai', 30, 'White');
};
IG.T.L2_What_I_Earned_Reel = function (p) {
  IG.post(p, 0, 1, 'Ink'); IG.photo(p, 'Man with Smartphone Outdoors HR.png', 1080, 1350, 0.6, 0.2, 420);
  IG.tag(p, 'What I earned'); IG.ep(p, 1080, 'Ep. 06', 'White');
  IG.sticker(p, 820, 760, 380, 'AED 4,200', 'in September', 'Lime', 'Ink');
  IG.head(p, IG.M, 1230, [['KARIM', 520, 'White']]); IG.small(p, IG.M, 1290, '3 collabs, 1 barter, 12 cashback posts', 30, 'White');
};
IG.T.L3_Creator_Diaries_Reel = function (p) {
  IG.post(p, 0, 2, 'Ink'); IG.photo(p, 'Sporty Duo Portrait HR.png', 1080, 1350, 0.5, 0.35, 420);
  IG.tag(p, 'Creator diaries'); IG.ep(p, 1080, 'Ep. 03', 'White');
  IG.head(p, IG.M, 1230, [['A DAY ON A SHOOT', 936, 'White']]); IG.small(p, IG.M, 1290, 'With Lina and Omar, Al Quoz', 30, 'White');
};

// ===== CENTRE COLUMN: THE WORD (Lime and Ink alternate by row)
IG.word = function (p, row, col, ground, tag, ep, lines, foot) {
  var ink = ground === 'Lime' ? 'Ink' : 'Lime', alt = ground === 'Lime' ? 'Ink' : 'White';
  IG.post(p, row, col, ground);
  IG.tag(p, tag, ground === 'Lime' ? 'Ink' : 'Lime', ground === 'Lime' ? 'Lime' : 'Ink'); IG.ep(p, 1080, ep, alt);
  IG.head(p, IG.M, 1120, lines);
  if (foot) IG.small(p, IG.M, 1200, foot, 30, alt);
  IG.wm(p, 1080, 1350, alt);
};
IG.T.C1_The_Number = function (p) { IG.word(p, 1, 0, 'Lime', 'The number', 'Week 41', [['AED 1.2M', 936, 'Ink'], ['PAID OUT', 936, 'Ink'], ['TO CREATORS.', 936, 'Ink']], 'This month, across 3,500 creators'); };
IG.T.C2_POV = function (p) { IG.word(p, 1, 1, 'Ink', 'POV', '#027', [['YOUR PAYOUT', 936, 'Lime'], ['LANDS BEFORE', 936, 'White'], ['YOUR LATTE.', 936, 'White']], ''); };
IG.T.C3_Tips_Cover = function (p) { IG.word(p, 1, 2, 'Lime', 'Creator tips', '1 / 5', [['3 WAYS', 936, 'Ink'], ['TO GET', 936, 'Ink'], ['PICKED.', 936, 'Ink']], 'Swipe'); };
IG.T.C4_Brand_Win = function (p) { IG.word(p, 1, 3, 'Ink', 'Brand win', 'Urban Clothing', [['2.4M', 936, 'Lime'], ['PEOPLE', 936, 'White'], ['REACHED.', 936, 'White']], '32 creators, 9 days, one summer drop'); };
IG.T.C5_Tips_Slide = function (p) {
  IG.post(p, 1, 4, 'Lime'); IG.tag(p, 'Creator tips', 'Ink', 'Lime'); IG.ep(p, 1080, '2 / 5', 'Ink');
  var w = SO.word(p, '01', 520, 'Ink'); SO.at(p, w, IG.M, 200);
  IG.head(p, IG.M, 1120, [['FILL YOUR', 936, 'Ink'], ['PROFILE.', 936, 'Ink']]);
  IG.small(p, IG.M, 1200, 'Brands pick who they can picture', 30, 'Ink');
  IG.wm(p, 1080, 1350, 'Ink');
};
IG.T.C6_Milestone = function (p) { IG.word(p, 1, 5, 'Ink', 'Milestone', '2026', [['5,000', 936, 'Lime'], ['CREATORS.', 936, 'White'], ['THANK YOU.', 936, 'White']], 'Next stop: 10,000'); };
IG.T.C7_National_Day = function (p) {
  IG.word(p, 1, 6, 'Lime', 'UAE National Day', '2 Dec', [['BORN', 936, 'Ink'], ['IN DUBAI.', 936, 'Ink'], ['PROUD OF IT.', 936, 'Ink']], '');
  var x = IG.M, y = 210; FG.rect(p, 'Mark', x, y, 70, 150, 'Tomato', { id: 'flag' }); FG.rect(p, 'Mark', x + 70, y, 230, 50, 'Forest', { id: 'flag' }); FG.rect(p, 'Mark', x + 70, y + 50, 230, 50, 'White', { id: 'flag' }); FG.rect(p, 'Mark', x + 70, y + 100, 230, 50, 'Ink', { id: 'flag' });
};
IG.T.C8_As_Seen_On = function (p) { IG.word(p, 1, 7, 'Ink', 'As seen on', 'Press', [['SHARK TANK', 936, 'White'], ['DUBAI.', 936, 'Lime']], 'Watch the episode. Link in bio'); };

// ===== RIGHT COLUMN: THE DROP
IG.drop = function (p, row, col, file, fx, fy, tag, ep, s1, s2, lines, foot) {
  IG.post(p, row, col, 'Ink'); IG.photo(p, file, 1080, 1350, fx, fy, 380);
  IG.tag(p, tag); IG.ep(p, 1080, ep, 'White');
  IG.sticker(p, 820, 300, 340, s1, s2, 'Lime', 'Ink');
  IG.head(p, IG.M, 1230, lines); IG.small(p, IG.M, 1290, foot, 30, 'White');
};
IG.T.R1_Deal_Drop = function (p) { IG.drop(p, 2, 0, 'Dessert in the Sky HR.png', 0.5, 0.0, 'Deal drop', '#041', 'FREE', 'For one reel', [['THE SWEET LAB', 936, 'White']], 'JBR  /  AED 180 value  /  20 spots'); };
IG.T.R2_Cashback_Friday = function (p) { IG.drop(p, 2, 1, 'Perfume and Roses Display.png', 0.5, 0.5, 'Cashback Friday', '#018', '15%', 'Back', [['OUDA PERFUMERY', 936, 'White']], 'Dubai Mall  /  Post your visit'); };
IG.T.R3_On_Set = function (p) { IG.drop(p, 2, 2, 'DJ in Tropical Vibes HR.png', 0.62, 0.3, 'On set', 'Following Media', '5', 'Formats', [['ONE DAY.', 936, 'White']], 'Shot in-house for Halo Skin Lab'); };
IG.T.R4_Deal_Drop_Product = function (p) { IG.drop(p, 2, 3, 'Luxury Dropper Bottle on Rocky Surface.png', 0.5, 0.5, 'Deal drop', '#042', 'FREE', 'For a story set', [['HALO SKIN LAB', 936, 'White']], 'Delivered  /  AED 320 value  /  40 spots'); };

// ===== LEFT COLUMN, second set
IG.T.L4_Creator_Spotlight_2 = function (p) {
  IG.post(p, 0, 3, 'Ink'); IG.photo(p, 'Fashionable Youth HR.png', 1080, 1350, 0.5, 0.4, 420);
  IG.tag(p, 'Creator spotlight'); IG.ep(p, 1080, '#015', 'White');
  IG.head(p, IG.M, 1230, [['THE CREW', 760, 'White']]); IG.small(p, IG.M, 1290, '@crewdxb  /  Fashion  /  Dubai', 30, 'White');
};

// ===== LAUNCH ROW: one picture across three posts (a takeover, used rarely)
IG.T.X1_Launch_Left = function (p) { IG.pano(p, 0); };
IG.T.X2_Launch_Centre = function (p) { IG.pano(p, 1); };
IG.T.X3_Launch_Right = function (p) { IG.pano(p, 2); };
IG.pano = function (p, k) {
  IG.post(p, 3, k, 'Ink');
  // one 3240 x 1350 picture; each post shows its third
  var g = FG.org(p), L = FG.lay('Image'), pi = L.placedItems.add(); pi.file = new File(IG.P + 'Celebrity Arrival Scene HR.png');
  var W = 3240, H = 1350, sc = Math.max(W / pi.width, H / pi.height); pi.resize(sc * 100, sc * 100);
  pi.position = [g[0] - k * 1080 - (pi.width - W) * 0.5, g[1] + (pi.height - H) * 0.3]; pi.embed();
  FG.clip(p, 'Image', [L.rasterItems[0]], 0, 0, 1080, 1350, { id: 'pano' });
  var r = FG.rect(p, 'Image', 0, 900, 1080, 450, 'Ink', { id: 'shade' }); r.opacity = 30;
  if (k === 0) { IG.tag(p, 'New'); IG.head(p, IG.M, 1230, [['PAID', 700, 'White']]); }
  if (k === 1) { IG.head(p, 0, 1230, [['COLLABS', 1010, 'Lime']]); }
  if (k === 2) { IG.head(p, 0, 1230, [['ARE LIVE.', 960, 'White']]); IG.small(p, 0, 1290, 'Book named talent in the app', 30, 'White'); IG.ep(p, 1080, 'Launch', 'White'); }
};

// ===== STORIES AND REELS: same furniture, photos full screen, safe zones respected
IG.T.S1_Story_Spotlight = function (p) {
  IG.story(p, 4, 0, 'Ink'); IG.photo(p, 'Joyful Connection HR.png', 1080, 1920, 0.72, 0.3, 700);
  IG.tag(p, 'Creator spotlight', 'Lime', 'Ink', IG.M, 260); IG.ep(p, 1080, '#014', 'White');
  IG.head(p, IG.M, 1480, [['NOOR', 560, 'White']]); IG.small(p, IG.M, 1545, '12 paid collabs this year', 32, 'White');
  SO.slot(p, 290, 1300 - 200, 500, 110, 'Link sticker');
};
IG.T.S2_Story_Deal = function (p) {
  IG.story(p, 4, 1, 'Ink'); IG.photo(p, 'Dessert in the Sky HR.png', 1080, 1920, 0.5, 0.0, 700);
  IG.tag(p, 'Deal drop', 'Lime', 'Ink', IG.M, 260);
  IG.sticker(p, 800, 560, 380, 'FREE', 'For one reel', 'Lime', 'Ink');
  IG.head(p, IG.M, 1480, [['THE SWEET LAB', 936, 'White']]); IG.small(p, IG.M, 1545, '20 spots. Ends Sunday', 32, 'White');
};
IG.T.S3_Story_Poll = function (p) {
  IG.story(p, 4, 2, 'Lime'); IG.tag(p, 'This or that', 'Ink', 'Lime', IG.M, 260);
  IG.headT(p, IG.M, 520, [['BARTER', 936, 'Ink'], ['OR', 300, 'Ink'], ['PAID?', 936, 'Ink']]);
  SO.slot(p, 190, 1420, 700, 120, 'Poll sticker');
  IG.wm(p, 1080, 1920 - 270, 'Ink');
};
IG.T.S4_Reel_Cover = function (p) {
  IG.story(p, 4, 3, 'Ink'); IG.photo(p, 'Man with Smartphone Outdoors HR.png', 1080, 1920, 0.6, 0.05, 760);
  IG.tag(p, 'What I earned', 'Lime', 'Ink', IG.M, 260); IG.ep(p, 1080, 'Ep. 06', 'White');
  IG.sticker(p, 790, 1080, 400, 'AED 4,200', 'in September', 'Lime', 'Ink');
  IG.head(p, IG.M, 1500, [['KARIM', 560, 'White']]);
};
IG.T.S5_Highlights = function (p) {
  SO.board(p, 2160, 1080, 4, 4); FG.clear(p); FG.rect(p, 'Ground', 0, 0, 2160, 1080, 'Cream', { id: 'ground' });
  var H = [['paid', 'Paid'], ['barter', 'Barter'], ['cashback', 'Cashback'], ['creator', 'Creators'], ['brand', 'Brands'], ['spark', 'New']], i, g = FG.org(p);
  for (i = 0; i < 6; i++) { var x = 80 + i * 340, y = 330, ink = i % 2 ? 'Lime' : 'Ink', fill = i % 2 ? 'Ink' : 'Lime'; var e = FG.lay('Ground').pathItems.ellipse(g[1] - y, g[0] + x, 300, 300); e.filled = true; e.fillColor = FG.col(fill); e.stroked = false; FG.tag(e, p, 'disc'); GL.icon(p, x + 70, y + 70, 160, H[i][0], ink, i % 2 ? 'White' : 'White'); IG.small(p, x + 150, y + 390, H[i][1], 32, 'Ink', { align: 'c' }); }
  IG.small(p, 80, 160, 'Highlight covers', 56, 'Ink'); IG.small(p, 80, 220, 'Lime and Ink only. Export each disc at 1080 x 1080', 26, 'Ink');
};

// ===== THE GRID: four rows of the system, as the profile shows it (3:4 crops)
IG.GRID = [['L1_Creator_Spotlight', 'C1_The_Number', 'R1_Deal_Drop'], ['L2_What_I_Earned_Reel', 'C2_POV', 'R2_Cashback_Friday'], ['L3_Creator_Diaries_Reel', 'C3_Tips_Cover', 'R3_On_Set'], ['L4_Creator_Spotlight_2', 'C4_Brand_Win', 'R4_Deal_Drop_Product']];

IG.ALL = []; (function () { for (var k in IG.T) IG.ALL.push(k); })();
IG.build = function (n) { IG.T[n](n); return n + ' ok'; };

// ---- fixes after review
IG.photo = function (p, file, w, h, fx, fy, shadeTop) { GL.img(p, IG.P + file, 0, 0, w, h, fx, fy, 'photo'); var r = FG.rect(p, 'Image', 0, 0, w, h, 'Ink', { id: 'shade' }); r.opacity = 14; };
IG.sticker = function (p, cx, cy, d, line1, line2, fill, ink) {
  var g = FG.org(p), e = FG.lay('Mark').pathItems.ellipse(g[1] - (cy - d / 2), g[0] + (cx - d / 2), d, d); e.filled = true; e.fillColor = FG.col(fill || 'Lime'); e.stroked = false; FG.tag(e, p, 'sticker');
  var a = SO.word(p, line1, d * 0.66, ink || 'Ink');
  if (a.h > d * 0.4) { a.t.remove(); a = SO.word(p, line1, d * 0.66 * (d * 0.4) / a.h, ink || 'Ink'); }
  var aw = (function () { var du = a.t.duplicate(), ol = du.createOutline(), b = ol.geometricBounds; ol.remove(); return b[2] - b[0]; })();
  SO.at(p, a, cx - aw / 2, cy - a.h / 2 - (line2 ? d * 0.07 : 0));
  var b2 = null; if (line2) b2 = IG.small(p, cx, cy + a.h / 2 + d * 0.02 + 26, line2, d * 0.085, ink || 'Ink', { align: 'c', track: 40 });
  var grp = FG.lay('Mark').groupItems.add(); a.t.move(grp, ElementPlacement.PLACEATEND); if (b2) b2.move(grp, ElementPlacement.PLACEATEND); e.move(grp, ElementPlacement.PLACEATEND); grp.rotate(-8); FG.tag(grp, p, 'sticker');
};
IG.T.C5_Tips_Slide = function (p) {
  IG.post(p, 1, 4, 'Lime'); IG.tag(p, 'Creator tips', 'Ink', 'Lime'); IG.ep(p, 1080, '2 / 5', 'Ink');
  var w = SO.word(p, '01', 360, 'Ink'); SO.at(p, w, IG.M, 180);
  IG.head(p, IG.M, 1120, [['FILL YOUR', 936, 'Ink'], ['PROFILE.', 700, 'Ink']]);
  IG.small(p, IG.M, 1200, 'Brands pick who they can picture', 30, 'Ink');
  IG.wm(p, 1080, 1350, 'Ink');
};

// ---- the profile grid mock
IG.T.Z1_Profile_Grid = function (p) {
  SO.board(p, 1500, 3000, 0, 8); FG.clear(p);
  FG.rect(p, 'Ground', 0, 0, 1500, 3000, 'Cream', { id: 'ground' });
  var PX = 105, PY = 100, W = 1290, H = 2796, g = FG.org(p), M = FG.lay('Mark');
  var body = FG.lay('Ground').pathItems.roundedRectangle(g[1] - PY, g[0] + PX, W, H, 190, 190); body.filled = true; body.fillColor = FG.col('Ink'); body.stroked = false; FG.tag(body, p, 'phone');
  var sx = PX + 40, sy = PY + 40, sw = W - 80, sh = H - 80;
  var scr = FG.lay('Ground').pathItems.roundedRectangle(g[1] - sy, g[0] + sx, sw, sh, 150, 150); scr.filled = true; scr.fillColor = FG.col('White'); scr.stroked = false; FG.tag(scr, p, 'screen');
  var y = sy + 150, i;
  SO.t(p, sx + 60, y, 'followingsocials', 'B', 46, 'Ink');
  y += 70;
  var av = M.pathItems.ellipse(g[1] - y, g[0] + sx + 60, 210, 210); av.filled = true; av.fillColor = FG.col('Lime'); av.stroked = false; FG.tag(av, p, 'avatar');
  SO.wmk(p, sx + 80, y + 88, 170, 'Ink');
  var S = [['312', 'posts'], ['48.2K', 'followers'], ['210', 'following']];
  for (i = 0; i < 3; i++) { SO.t(p, sx + 420 + i * 240, y + 95, S[i][0], 'B', 42, 'Ink', { align: 'c' }); SO.t(p, sx + 420 + i * 240, y + 140, S[i][1], 'M', 30, 'Ink', { align: 'c' }); }
  y += 270;
  SO.t(p, sx + 60, y, 'Following', 'B', 34, 'Ink');
  SO.t(p, sx + 60, y + 48, 'The influencer everything app.', 'M', 32, 'Ink');
  SO.t(p, sx + 60, y + 94, 'Paid collabs, barter and cashback. Born in Dubai.', 'M', 32, 'Ink');
  SO.t(p, sx + 60, y + 140, 'following.ae', 'B', 32, 'Ink');
  y += 200;
  var Hc = [['paid', 'Paid'], ['barter', 'Barter'], ['cashback', 'Cashback'], ['creator', 'Creators'], ['brand', 'Brands']];
  for (i = 0; i < 5; i++) {
    var cx = sx + 60 + i * 225, fill = i % 2 ? 'Ink' : 'Lime', ink = i % 2 ? 'Lime' : 'Ink';
    var d = M.pathItems.ellipse(g[1] - y, g[0] + cx, 150, 150); d.filled = true; d.fillColor = FG.col(fill); d.stroked = true; d.strokeColor = FG.rgb(220, 220, 220); d.strokeWidth = 4; FG.tag(d, p, 'hl');
    GL.icon(p, cx + 35, y + 35, 80, Hc[i][0], ink, 'White');
    SO.t(p, cx + 75, y + 200, Hc[i][1], 'M', 26, 'Ink', { align: 'c' });
  }
  y += 260;
  var gap = 4, cw = (sw - 2 * gap) / 3, ch = cw * 4 / 3, r, c, items = [];
  for (r = 0; r < IG.GRID.length; r++) for (c = 0; c < 3; c++) {
    var gy = y + r * (ch + gap); if (gy > sy + sh) continue;
    items.push(GL.img(p, GL.R + 'final/assets/social_png/v3_' + IG.GRID[r][c] + '.png', sx + c * (cw + gap), gy, cw, ch, 0.5, 0.5, 'cell'));
  }
  var grp = FG.lay('Image').groupItems.add(), q; for (q = 0; q < items.length; q++) items[q].move(grp, ElementPlacement.PLACEATEND);
  var cl = grp.pathItems.roundedRectangle(g[1] - sy, g[0] + sx, sw, sh, 150, 150); cl.filled = false; cl.stroked = false; cl.move(grp, ElementPlacement.PLACEATBEGINNING); cl.clipping = true; grp.clipped = true; FG.tag(grp, p, 'grid');
};
IG.ALL = []; (function () { for (var k in IG.T) IG.ALL.push(k); })();

// ===== the social guide: six landscape pages in front of the templates
IG.gpage = function (name, k, ground, ink, label) {
  var d = FG.doc, ab, x = -7400 + k * 2000, y = -4600;
  try { ab = d.artboards.getByName(name); } catch (e) { ab = d.artboards.add([x, y, x + 1920, y - 1080]); ab.name = name; }
  FG.page(name, ground, ink, label, '');
  FG.label(name, 1840, 66, 'Following / Instagram system / 0' + (k + 1), ink, { align: 'r' });
};
IG.png = function (n) { return GL.R + 'final/assets/social_png/v3_' + n + '.png'; };
IG.T.A0_Cover = function (p) {
  IG.gpage(p, 0, 'Lime', 'Ink', 'Following / Instagram');
  var w = SO.word(p, 'ON INSTAGRAM.', 1760, 'Ink'); SO.at(p, w, 80, 640);
  FG.wm(p, 'Mark', 80, 300, 900, 'Ink');
  IG.small(p, 80, 1000, 'The system: three columns, eleven series, one family of type. October 2026', 26, 'Ink');
};
IG.T.A1_System = function (p) {
  IG.gpage(p, 1, 'Ink', 'Lime', 'The grid');
  var w = SO.word(p, 'THREE COLUMNS. THREE JOBS.', 1760, 'White'); SO.at(p, w, 80, 130);
  var C = [['THE CREATOR', 'Left. A full-bleed photo or reel cover of a creator. A name, nothing else.', 'L1_Creator_Spotlight'], ['THE WORD', 'Centre. One giant line on Lime or Ink. Lime and Ink swap every row.', 'C1_The_Number'], ['THE DROP', 'Right. A deal, a venue or a product, full-bleed, with one round sticker.', 'R1_Deal_Drop']], i;
  for (i = 0; i < 3; i++) {
    var x = 80 + i * 600; GL.img(p, IG.png(C[i][2]), x, 300, 390, 520, 0.5, 0.5, 'tile');
    var t = SO.word(p, C[i][0], 390, 'Lime'); SO.at(p, t, x, 850);
    FG.area(p, 'Type', x, 850 + t.h + 24, 520, 120, C[i][1], 'M', 20, 'White', { lead: 28 });
  }
};
IG.T.A2_Series = function (p) {
  IG.gpage(p, 2, 'Cream', 'Ink', 'The series');
  var w = SO.word(p, 'ELEVEN SERIES. ON REPEAT.', 1760, 'Ink'); SO.at(p, w, 80, 130);
  var R = [['Left', 'Creator spotlight', 'Weekly, Monday', 'Photo, name, handle, niche'], ['Left', 'What I earned', 'Weekly reel, Tuesday', 'A creator says what they made; the sticker shows it'], ['Left', 'Creator diaries', 'Fortnightly reel', 'A day with a creator, filmed raw'],
    ['Centre', 'The number', 'Weekly, Wednesday', 'One figure from the platform'], ['Centre', 'Creator tips', 'Weekly carousel, Thursday', 'Five slides, one tip each'], ['Centre', 'POV', 'Weekly', 'One relatable line'], ['Centre', 'Brand win', 'After every campaign', 'The result in one number'],
    ['Right', 'Deal drop', 'Twice a week', 'Barter offer: FREE sticker, value, spots'], ['Right', 'Cashback Friday', 'Weekly, Friday', 'Venue photo, percentage sticker'], ['Right', 'On set', 'After every shoot', 'Following Media at work'], ['Any', 'Takeover row', 'Launches only', 'One picture across three posts']];
  var i, X = [80, 300, 760, 1180];
  for (i = 0; i < R.length; i++) {
    var y = 330 + i * 62; GL.rule(p, 80, y - 40, 1760, 'Ink', 1);
    IG.small(p, X[0], y, R[i][0], 22, 'Ink'); FG.text(p, 'Type', X[1], y, R[i][1], 'EB', 26, 'Ink', {}); FG.text(p, 'Type', X[2], y, R[i][2], 'M', 20, 'Ink', {}); FG.text(p, 'Type', X[3], y, R[i][3], 'M', 20, 'Ink', {});
  }
  IG.small(p, 80, 1030, 'One-offs (national day, milestones, press) always take the centre column', 22, 'Ink');
};
IG.T.A3_Furniture = function (p) {
  IG.gpage(p, 3, 'Ink', 'Lime', 'The furniture');
  var w = SO.word(p, 'SAME PLACE, EVERY POST.', 1760, 'White'); SO.at(p, w, 80, 130);
  GL.img(p, IG.png('L2_What_I_Earned_Reel'), 80, 320, 560, 700, 0.5, 0.5, 'ex');
  GL.img(p, IG.png('C2_POV'), 680, 320, 560, 700, 0.5, 0.5, 'ex');
  var R = [['Series tag', 'Top-left, 72 px in. Lime pill, Obviously Semibold caps. On Lime posts it turns Ink.'], ['Episode', 'Top-right: #014, Ep. 06, 1 / 5, Week 41.'], ['Headline', 'Bottom-left, Obviously Narrow Black, set to the width. One to three lines.'], ['One small line', 'Under the headline, Obviously Semibold caps, 30 px.'], ['Wordmark', 'Bottom-right on centre-column posts only.'], ['Sticker', 'Right column and reels: one Lime disc, tilted 8 degrees.']], i;
  for (i = 0; i < R.length; i++) { var y = 360 + i * 110; GL.rule(p, 1300, y - 40, 540, 'Lime', 1); FG.text(p, 'Type', 1300, y, R[i][0], 'EB', 24, 'Lime', {}); FG.area(p, 'Type', 1300, y + 10, 540, 70, R[i][1], 'M', 17, 'White', { lead: 24 }); }
};
IG.T.A4_Grid = function (p) {
  IG.gpage(p, 4, 'Cream', 'Ink', 'The grid, as it will look');
  GL.panel(p, IG.png('Z1_Profile_Grid'), 1100, 90, 700, 960, null, 0, 'grid');
  var w = SO.word(p, 'THE FEED', 900, 'Ink'); SO.at(p, w, 80, 200);
  var w2 = SO.word(p, 'IS THE BRAND.', 900, 'Ink'); SO.at(p, w2, 80, 200 + w.h + 20);
  FG.area(p, 'Type', 80, 560, 820, 400, 'Publish a row at a time, left to right: creator, word, drop. Never two Lime tiles next to each other. Never a photo in the centre column. Instagram crops every post to 3:4 in the grid, so the headline and the tag stay inside the middle 1012 px.', 'M', 24, 'Ink', { lead: 36 });
};
IG.T.A5_Stories = function (p) {
  IG.gpage(p, 5, 'Ink', 'Lime', 'Stories, reels, highlights');
  var w = SO.word(p, 'FULL SCREEN, ALWAYS.', 1760, 'White'); SO.at(p, w, 80, 130);
  var S = ['S1_Story_Spotlight', 'S2_Story_Deal', 'S3_Story_Poll', 'S4_Reel_Cover'], i;
  for (i = 0; i < 4; i++) GL.panel(p, IG.png(S[i]), 80 + i * 300, 320, 280, 500, null, 0, 'st');
  GL.panel(p, IG.png('S5_Highlights'), 1300, 320, 540, 270, null, 0, 'hl');
  FG.area(p, 'Type', 80, 860, 1100, 160, 'The photo fills the screen. Keep type out of the top 250 px and the bottom 340 px, where the app covers it. Dashed boxes in the template file mark where link and poll stickers go; they do not export.', 'M', 22, 'White', { lead: 32 });
};
IG.ALL = []; (function () { for (var k in IG.T) IG.ALL.push(k); })();

// ===== v3 centre column: Ink and Cream alternate by row. Lime is an accent only: the tag, a highlighter bar behind one line.
// lines: [text, width, 'hi'?]. Highlighted line: Ink type on a lime bar. Other lines: White on Ink, Ink on Cream.
IG.lines = function (p, x, yBottom, lines, ground, gap) {
  gap = gap === undefined ? 18 : gap;
  var base = ground === 'Ink' ? 'White' : 'Ink', ws = [], i, tot = 0;
  for (i = 0; i < lines.length; i++) { ws.push(SO.word(p, lines[i][0], lines[i][1], lines[i][2] === 'hi' ? 'Ink' : base)); tot += ws[i].h; }
  tot += gap * (lines.length - 1);
  var y = yBottom - tot;
  for (i = 0; i < ws.length; i++) {
    SO.at(p, ws[i], x, y);
    if (lines[i][2] === 'hi') { var pad = ws[i].h * 0.16; FG.rect(p, 'Mark', x - pad, y - pad, lines[i][1] + 2 * pad, ws[i].h + 2 * pad, 'Lime', { id: 'hi' }).move(FG.lay('Ground'), ElementPlacement.PLACEATBEGINNING); }
    y += ws[i].h + gap;
  }
  return yBottom - tot;
};
IG.word = function (p, row, col, ground, tag, ep, lines, foot) {
  var alt = ground === 'Ink' ? 'White' : 'Ink';
  IG.post(p, row, col, ground);
  if (ground === 'Ink') IG.tag(p, tag, 'Lime', 'Ink'); else IG.tag(p, tag, 'Ink', 'Cream');
  IG.ep(p, 1080, ep, alt);
  IG.lines(p, IG.M + 20, 1110, lines, ground);
  if (foot) IG.small(p, IG.M, 1200, foot, 30, alt);
  IG.wm(p, 1080, 1350, alt);
};
IG.T.C1_The_Number = function (p) { IG.word(p, 1, 0, 'Ink', 'The number', 'Week 41', [['AED 1.2M', 900, 'hi'], ['PAID OUT TO', 900], ['CREATORS.', 900]], 'September, across 3,500 creators'); };
IG.T.C2_POV = function (p) { IG.word(p, 1, 1, 'Cream', 'POV', '#027', [['YOUR', 420], ['PAYOUT', 900, 'hi'], ['LANDS BEFORE', 900], ['YOUR LATTE.', 900]], ''); };
IG.T.C3_Tips_Cover = function (p) { IG.word(p, 1, 2, 'Ink', 'Creator tips', '1 / 5', [['3 WAYS', 600], ['TO GET', 600], ['PICKED.', 900, 'hi']], 'Swipe'); };
IG.T.C4_Brand_Win = function (p) { IG.word(p, 1, 3, 'Cream', 'Brand win', 'Urban Clothing', [['2.4M', 900, 'hi'], ['PEOPLE', 900], ['REACHED.', 900]], '32 creators, 9 days, one summer drop'); };
IG.T.C5_Tips_Slide = function (p) {
  IG.post(p, 1, 4, 'Ink'); IG.tag(p, 'Creator tips', 'Lime', 'Ink'); IG.ep(p, 1080, '2 / 5', 'White');
  var w = SO.word(p, '01', 300, 'Lime'); SO.at(p, w, IG.M, 200);
  IG.lines(p, IG.M + 20, 1110, [['FILL YOUR', 900], ['PROFILE.', 700, 'hi']], 'Ink');
  IG.small(p, IG.M, 1200, 'Brands pick who they can picture', 30, 'White');
  IG.wm(p, 1080, 1350, 'White');
};
IG.T.C6_Milestone = function (p) {
  IG.word(p, 1, 5, 'Ink', 'Milestone', '2026', [['5,000', 900], ['CREATORS.', 900], ['THANK YOU.', 900, 'hi']], 'Next stop: 10,000');
  var pts = FG.track([[-20, 300], [220, 290], { to: [760, 270], loops: 2, r: 70, side: 1, env: false }, [1100, 290]]);
  FG.clip(p, 'Mark', FG.gradLine(p, 'Mark', pts, 34, { steps: 100 }), 0, 0, 1080, 1350, { id: 'line' });
};
IG.T.C7_National_Day = function (p) {
  IG.word(p, 1, 6, 'Cream', 'UAE National Day', '2 Dec', [['BORN', 900], ['IN DUBAI.', 900], ['PROUD OF IT.', 900, 'hi']], '');
  var x = IG.M, y = 200; FG.rect(p, 'Mark', x, y, 60, 126, 'Tomato', { id: 'flag' }); FG.rect(p, 'Mark', x + 60, y, 190, 42, 'Forest', { id: 'flag' }); FG.rect(p, 'Mark', x + 60, y + 42, 190, 42, 'White', { id: 'flag', stroke: 'Ink', strokeW: 1 }); FG.rect(p, 'Mark', x + 60, y + 84, 190, 42, 'Ink', { id: 'flag' });
};
IG.T.C8_As_Seen_On = function (p) { IG.word(p, 1, 7, 'Ink', 'As seen on', 'Press', [['AS SEEN ON', 900], ['SHARK TANK', 900], ['DUBAI.', 900, 'hi']], 'Watch the episode. Link in bio'); };
// a creator's quote, set big: a new centre series
IG.T.C9_Creator_Quote = function (p) { IG.word(p, 1, 8, 'Cream', 'In their words', '@lina.styles', [['"I PAID MY', 900], ['RENT WITH', 900], ['BARTER.', 900, 'hi'], ['NO JOKE."', 900]], 'Lina, 41K followers, Dubai'); };

// ===== UGC: the creator's own post, in a minimal Cream frame with their handle. Never cropped, never retouched.
IG.ugc = function (p, row, col, file, handle, note, story) {
  var H = story ? 1920 : 1350, top = story ? 250 : 150, bot = story ? 360 : 190, side = 96;
  SO.page(p, 1080, H, row, col, 'Cream');
  IG.tag(p, 'From the feed', 'Ink', 'Cream', IG.M, story ? 160 : IG.M);
  IG.ep(p, 1080, 'UGC', 'Ink');
  GL.img(p, IG.P + file, side, top, 1080 - 2 * side, H - top - bot, 0.5, 0.35, 'ugc');
  IG.small(p, side, H - bot + 62, handle, 34, 'Ink', { track: 20 });
  IG.small(p, side, H - bot + 106, note, 24, 'Ink');
  SO.wmk(p, 1080 - side - 150, H - bot + 34, 150, 'Ink');
};
IG.T.L5_From_The_Feed = function (p) { IG.ugc(p, 0, 4, 'Dramatic Light Portrait.png', '@lina.styles', 'Posted for Halo Skin Lab, via Following', false); };
IG.T.S6_Story_From_The_Feed = function (p) { IG.ugc(p, 4, 5, 'Focused Woman in Crowd.png', '@omar.films', 'Reel for Smash Society, via Following', true); };

IG.GRID = [['L1_Creator_Spotlight', 'C1_The_Number', 'R1_Deal_Drop'], ['L5_From_The_Feed', 'C2_POV', 'R2_Cashback_Friday'], ['L3_Creator_Diaries_Reel', 'C3_Tips_Cover', 'R3_On_Set'], ['L2_What_I_Earned_Reel', 'C9_Creator_Quote', 'R4_Deal_Drop_Product']];
IG.ALL = []; (function () { for (var k in IG.T) IG.ALL.push(k); })();
IG.lines = function (p, x, yBottom, lines, ground, gap) {
  gap = gap === undefined ? 18 : gap;
  var base = ground === 'Ink' ? 'White' : 'Ink', ws = [], i, tot = 0;
  for (i = 0; i < lines.length; i++) { var hi = lines[i][2] === 'hi'; ws.push(SO.word(p, lines[i][0], lines[i][1], hi && ground === 'Ink' ? 'Lime' : base)); tot += ws[i].h; }
  tot += gap * (lines.length - 1);
  var y = yBottom - tot;
  for (i = 0; i < ws.length; i++) {
    SO.at(p, ws[i], x, y);
    if (lines[i][2] === 'hi' && ground !== 'Ink') { var bh = ws[i].h * 0.42; FG.rect(p, 'Ground', x - 14, y + ws[i].h - bh + ws[i].h * 0.06, lines[i][1] + 28, bh, 'Lime', { id: 'hi' }); }
    y += ws[i].h + gap;
  }
  return yBottom - tot;
};
IG.T.C9_Creator_Quote = function (p) { IG.word(p, 3, 3, 'Cream', 'In their words', '@lina.styles', [['"I PAID MY', 900], ['RENT WITH', 900], ['BARTER.', 900, 'hi'], ['NO JOKE."', 900]], 'Lina, 41K followers, Dubai'); };
IG.T.S6_Story_From_The_Feed = function (p) { IG.ugc(p, 4, 7, 'Focused Woman in Crowd.png', '@omar.films', 'Reel for Smash Society, via Following', true); };
IG.ALL = []; (function () { for (var k in IG.T) IG.ALL.push(k); })();
