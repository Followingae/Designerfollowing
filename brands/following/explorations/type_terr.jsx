// Booklet type territories. Four spreads set three ways. Load after type_boot.jsx.
// A = s50-53 (Neue Haas Grotesk), B = s55-58 (Obviously), C = s60-63 (Instrument Serif).

var Y = {};
Y.T = 'NHaasGroteskTXPro-55Rg'; Y.TM = 'NHaasGroteskTXPro-65Md';
Y.M = {};
// Ink metrics of a string at 100 pt: [width, ascent, left offset], in points.
Y.meas = function (str, font, track) {
  var k = font + '|' + (track || 0) + '|' + str;
  if (Y.M[k]) return Y.M[k];
  var t = FG.lay('Type').textFrames.pointText([0, 0]); t.contents = str;
  var ca = t.textRange.characterAttributes; ca.textFont = app.textFonts.getByName(font); ca.size = 100; ca.tracking = track || 0;
  var g = t.createOutline(), b = g.geometricBounds, r = [b[2] - b[0], b[1], b[0]]; g.remove();
  Y.M[k] = r; return r;
};
// Text whose ink starts exactly at x (mm), baseline y.
Y.set = function (s, x, y, str, font, size, col, track, o) {
  var m = Y.meas(str.split('\r')[0], font, track), q = { track: track || 0, lead: (o && o.lead) || size };
  if (o && o.align) { q.align = o.align; return B.t(s, x, y, str, font, size, col, q); }
  return B.t(s, x - m[2] * size / 100 / B.MM, y, str, font, size, col, q);
};
// Same, in two colours either side of splitX (mm).
Y.split = function (s, x, y, str, font, size, splitX, colA, colB, track) {
  var key = B.key(s), b = B.BLEED, H = (B.PH + 2 * b) * B.MM;
  FG.clip(key, 'Type', [Y.set(s, x, y, str, font, size, colA, track)], -b * B.MM, -b * B.MM, (splitX + b) * B.MM, H, { id: 'splitA' });
  FG.clip(key, 'Type', [Y.set(s, x, y, str, font, size, colB, track)], splitX * B.MM, -b * B.MM, (2 * B.PW + b - splitX) * B.MM, H, { id: 'splitB' });
};
// Size (pt) at which the ink of str is w mm wide, capped so its ascent is at most h mm.
Y.fit = function (str, font, track, w, h) {
  var m = Y.meas(str, font, track), size = 100 * w * B.MM / m[0];
  if (h && m[1] * size / 100 > h * B.MM) size = 100 * h * B.MM / m[1];
  return size;
};
// A word that fills a box: cap height = h, and the widest cut of the family that still fits w.
Y.box = function (s, x, top, w, h, str, fonts, col, track, splitX, colB) {
  var i, f = fonts[fonts.length - 1], m, size;
  for (i = 0; i < fonts.length; i++) { m = Y.meas(str, fonts[i], track); size = 100 * h * B.MM / m[1]; if (m[0] * size / 100 <= w * B.MM) { f = fonts[i]; break; } }
  m = Y.meas(str, f, track); size = 100 * h * B.MM / m[1];
  if (m[0] * size / 100 > w * B.MM) size = 100 * w * B.MM / m[0];
  if (splitX) Y.split(s, x, top + h, str, f, size, splitX, col, colB, track); else Y.set(s, x, top + h, str, f, size, col, track);
  return [f, size, m[0] * size / 100 / B.MM];
};
Y.lab = function (s, x, y, str, col, align) { return B.t(s, x, y, str.toUpperCase(), Y.TM, 4.6, col || 'Ink', { track: 90, align: align }); };
Y.txt = function (s, x, y, w, str, col, size) { return B.a(s, x, y, w, 30, str, Y.T, size || 6.6, col || 'Ink', { lead: (size || 6.6) * 1.32 }); };
Y.head = function (s, sec, sides) {
  if (sides.indexOf('L') >= 0) { Y.lab(s, 7, 7.6, String(2 * (s % 5) + 2)); Y.lab(s, 16, 7.6, sec); }
  if (sides.indexOf('R') >= 0) { Y.lab(s, 203, 7.6, String(2 * (s % 5) + 3), 'Ink', 'r'); Y.lab(s, 194, 7.6, 'Following', 'Ink', 'r'); }
};
Y.line = function (s) {
  var k = s % 5, lx = 30 + (k * 47) % 130, y = 71.2;
  return B.line(s, [[-4, y], [lx, y], { to: [lx + 16, y - 0.2], loops: 2, r: 2.6 }, [lx + 26, y], [214, y]], 1.9, { from: 0.22 + k * 0.18, to: 0.4 + k * 0.18, steps: 30 });
};
Y.rows = function (s, x, y, w, rows, o) {
  var i, yy;
  for (i = 0; i < rows.length; i++) {
    yy = y + i * o.step;
    B.rule(s, x, yy - o.step * 0.62, x + w, yy - o.step * 0.62, 'Ink', 0.3);
    B.t(s, x, yy, (o.caps ? rows[i][0].toUpperCase() : rows[i][0]), o.font, o.size, 'Ink', { track: o.track || 0 });
    B.t(s, x + o.dx, yy, rows[i][1], Y.T, 6.6, 'Ink', {});
    B.t(s, x + w, yy, '0' + (i + 1), o.nfont || Y.TM, o.nsize || 5, 'Violet', { align: 'r', track: o.nfont ? 0 : 60 });
  }
  yy = y + rows.length * o.step - o.step * 0.62; B.rule(s, x, yy, x + w, yy, 'Ink', 0.3);
};
Y.LOOP = [['Customer pays', 'Online or at your counter'], ['We detect', 'Profile, reach, brand fit'], ['You approve', 'One tap, or set a rule'], ['They post', 'Inside your deadline'], ['Cashback releases', 'Only once verified']];
Y.P1 = 'Paid, barter and cashback campaigns for brands in the UAE. An agency, a creator app and a production arm in one company.';
Y.P4 = 'An agency, an app for creators and a production arm. UAE creators, and the brands that want to reach them.';
Y.ST = 'Building the future of influencer marketing, from here.';

// ============ A: Neue Haas Grotesk, two weights ============
Y.A = function () {
  var Bd = 'NHaasGroteskDSPro-75Bd', Lt = 'NHaasGroteskDSPro-45Lt', Md = 'NHaasGroteskDSPro-65Md', s, z;
  s = 50; B.clear(s); B.photo(s, 'L', 'braids', { fx: 0.62, fy: 0.4 });
  Y.split(s, 7, 23, 'Influencer', Bd, 70, 105, 'White', 'Ink', -28);
  Y.split(s, 7, 44.5, 'campaigns', Bd, 70, 105, 'White', 'Ink', -28);
  Y.split(s, 7, 66, 'that perform.', Lt, 70, 105, 'White', 'Ink', -28);
  Y.txt(s, 153, 6, 50, Y.P1); Y.line(s);

  s = 51; B.clear(s); W.strip(s, 'celeb', 0, 54, { fx: 0.5, fy: 0.3 });
  z = Y.fit('Paid', Bd, -30, 141, 49);
  Y.set(s, 61, 60, 'Paid', Bd, z, 'Ink', -30);
  Y.lab(s, 61, 7.6, '01'); Y.lab(s, 203, 7.6, 'Following', 'Ink', 'r');
  Y.set(s, 61, 66.6, 'Named talent for launches and big moments.', Lt, 12, 'Ink', -5); Y.line(s);

  s = 52; B.clear(s);
  z = Y.fit('loop.', Bd, -30, 78);
  Y.set(s, 7, 34, 'One', Bd, z, 'Ink', -30); Y.set(s, 7, 62, 'loop.', Lt, z, 'Ink', -30);
  Y.head(s, 'Cashback', 'R'); Y.lab(s, 112, 7.6, 'The model');
  Y.rows(s, 112, 23, 91, Y.LOOP, { step: 9.4, font: Md, size: 11.5, track: -5, dx: 46 }); Y.line(s);

  s = 53; B.clear(s);
  W.flag(s, 7, 6.4, 13);
  z = Y.fit('Born in', Bd, -30, 86);
  Y.set(s, 7, 40, 'Born in', Bd, z, 'Ink', -30); Y.set(s, 7, 64, 'Dubai.', Lt, z, 'Ink', -30);
  Y.head(s, '', 'R'); Y.lab(s, 112, 7.6, 'A UAE company');
  B.a(s, 112, 14, 86, 40, Y.ST, Lt, 20, 'Ink', { lead: 22, track: -10 });
  Y.txt(s, 112, 52, 56, Y.P4); Y.line(s);
};

// ============ B: Obviously, every word cut to fill its box ============
Y.B = function () {
  var F = ['Obviously-ExtdBlck', 'Obviously-WideBlck', 'Obviously-Blck', 'Obviously-NarwBlck', 'Obviously-CondBlck', 'Obviously-CompBlck'];
  var St = 'Obviously-NarwMedi', Rw = 'Obviously-NarwBold', s;
  s = 55; B.clear(s); B.photo(s, 'L', 'braids', { fx: 0.62, fy: 0.4 });
  Y.box(s, 7, 7, 91, 27, 'INFLUENCER', F, 'White', 0);
  Y.box(s, 7, 38, 91, 27, 'CAMPAIGNS', F, 'White', 0);
  Y.box(s, 112, 7, 91, 27, 'THAT', F, 'Ink', 0);
  Y.box(s, 112, 38, 91, 27, 'PERFORM.', F, 'Violet', 0); Y.line(s);

  s = 56; B.clear(s); B.photo(s, 'L', 'celeb', { fx: 0.5, fy: 0.3 });
  Y.box(s, 112, 7, 91, 50, 'PAID', F, 'Ink', 0);
  Y.set(s, 112, 64.6, 'Named talent for launches and big moments.', St, 11, 'Ink', 0); Y.line(s);

  s = 57; B.clear(s);
  Y.box(s, 7, 7, 91, 27, 'ONE', F, 'Ink', 0); Y.box(s, 7, 38, 91, 27, 'LOOP.', F, 'Violet', 0);
  Y.head(s, 'Cashback', 'R'); Y.lab(s, 112, 7.6, 'The model');
  Y.rows(s, 112, 23, 91, Y.LOOP, { step: 9.4, font: Rw, size: 9.6, track: 15, dx: 46, caps: true }); Y.line(s);

  s = 58; B.clear(s);
  Y.box(s, 7, 7, 91, 27, 'BORN IN', F, 'Ink', 0); Y.box(s, 7, 38, 91, 27, 'DUBAI.', F, 'Violet', 0);
  W.flag(s, 112, 6.4, 13); Y.head(s, '', 'R');
  B.a(s, 112, 22, 88, 40, Y.ST, St, 18, 'Ink', { lead: 20, track: 0 });
  Y.txt(s, 112, 52, 56, Y.P4); Y.line(s);
};

// ============ C: Instrument Serif, roman and italic ============
Y.C = function () {
  var Rg = 'InstrumentSerif-Regular', It = 'InstrumentSerif-Italic', s, z;
  s = 60; B.clear(s); B.photo(s, 'L', 'braids', { fx: 0.62, fy: 0.4 });
  z = Y.fit('Influencer campaigns', Rg, -15, 196);
  Y.split(s, 7, 30, 'Influencer campaigns', Rg, z, 105, 'White', 'Ink', -15);
  Y.split(s, 7, 30 + z * 0.86 / B.MM, 'that perform.', It, z, 105, 'White', 'Ink', -15);
  Y.txt(s, 153, 44, 50, Y.P1); Y.line(s);

  s = 61; B.clear(s); W.strip(s, 'celeb', 0, 54, { fx: 0.5, fy: 0.3 });
  z = Y.fit('Paid', Rg, -20, 138, 47);
  Y.set(s, 62, 60, 'Paid', Rg, z, 'Ink', -20);
  Y.lab(s, 62, 7.6, '01'); Y.lab(s, 203, 7.6, 'Following', 'Ink', 'r');
  Y.set(s, 62, 67, 'Named talent for launches and big moments.', It, 14, 'Ink', 0); Y.line(s);

  s = 62; B.clear(s);
  Y.set(s, 7, 34, 'One', Rg, 108, 'Ink', -20); Y.set(s, 7, 62, 'loop.', It, 108, 'Violet', -20);
  Y.head(s, 'Cashback', 'R'); Y.lab(s, 112, 7.6, 'The model');
  Y.rows(s, 112, 23, 91, Y.LOOP, { step: 9.4, font: Rg, size: 15, track: -5, dx: 46, nfont: It, nsize: 9 }); Y.line(s);

  s = 63; B.clear(s);
  Y.set(s, 7, 34, 'Born in', Rg, 100, 'Ink', -20); Y.set(s, 7, 63, 'Dubai.', It, 100, 'Violet', -20);
  W.flag(s, 112, 6.4, 13); Y.head(s, '', 'R');
  B.a(s, 112, 20, 88, 40, Y.ST, Rg, 23, 'Ink', { lead: 24, track: -10 });
  Y.txt(s, 112, 52, 56, Y.P4); Y.line(s);
};

Y.shoot = function (list, dpi) {
  var dir = XD + 'type/', f = new Folder(dir), i; if (!f.exists) f.create();
  for (i = 0; i < list.length; i++) B.cap(list[i], dir + 't' + list[i] + '.png', dpi || 170);
};
