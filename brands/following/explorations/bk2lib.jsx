// Booklet v3 system: Obviously only. Load after type_boot.jsx and type_terr.jsx.
// One display cut per spread, one colour per spread plus ink. Folio and label on one hang line.

Y.T = 'Obviously-Regu'; Y.TM = 'Obviously-Semi'; Y.SUB = 'Obviously-NarwMedi'; Y.ROW = 'Obviously-NarwSemi';
Y.F = ['Obviously-Blck', 'Obviously-NarwBlck', 'Obviously-CondBlck', 'Obviously-CompBlck'];
Y.LX = 7; Y.RX = 112; Y.CW = 91; Y.TOP = 12; Y.ZH = 49; Y.SUBY = 69; Y.HANG = 7.4;
B.hasRight = function (s) { return s < B.LAST; };

Y.spot = function (name, r, g, b) {
  var n = 'Following / ' + name, sp, c = new RGBColor();
  try { sp = FG.doc.spots.getByName(n); } catch (e) { sp = FG.doc.spots.add(); sp.name = n; sp.colorType = ColorModel.PROCESS; }
  c.red = r; c.green = g; c.blue = b; sp.color = c; return sp;
};
Y.spots = function () {
  Y.spot('Burgundy', 92, 12, 34); Y.spot('Rose', 255, 172, 198);
  Y.spot('Tomato', 236, 58, 30); Y.spot('Sky', 196, 222, 255);
  Y.spot('Cobalt', 26, 46, 208); Y.spot('Peach', 255, 184, 144);
  Y.spot('Mustard', 242, 184, 8);
};

Y.capr = function (font) { return Y.meas('H', font, 0)[1]; };
// Stack of caps lines: same cut, same cap height. Picks the widest cut in which every line fits w.
Y.stack = function (s, x, top, w, h, lines, col, o) {
  o = o || {};
  var n = lines.length, g = (o.gap === undefined) ? 3 : o.gap, cap = (h - (n - 1) * g) / n, i, j, f = null, mx, fw = w - (o.notes ? (o.nw || 36) : 0);
  if (o.cap && o.cap < cap) cap = o.cap;
  var list = o.font ? [o.font] : Y.F;
  function widest(font) { var r = 0, k; for (k = 0; k < n; k++) r = Math.max(r, Y.meas(lines[k], font, 0)[0] / Y.capr(font)); return r; }
  for (i = 0; i < list.length && !f; i++) if (widest(list[i]) * cap <= fw) f = list[i];
  if (!f) { f = list[list.length - 1]; cap = fw / widest(f); }
  var tot = n * cap + (n - 1) * g, y0 = o.bottom ? top + h - tot : top, size = 100 * cap * B.MM / Y.capr(f), by;
  for (j = 0; j < n; j++) {
    by = y0 + j * (cap + g) + cap;
    if (o.align === 'r') Y.set(s, x + w - Y.meas(lines[j], f, 0)[0] * size / 100 / B.MM, by, lines[j], f, size, (o.cols ? o.cols[j] : col), 0);
    else Y.set(s, x, by, lines[j], f, size, (o.cols ? o.cols[j] : col), 0);
    if (o.notes && o.notes[j]) B.t(s, x + w, by, o.notes[j], Y.T, 6.4, o.ncol || 'Ink', { align: 'r' });
  }
  return { font: f, cap: cap, bottom: y0 + tot, top: y0, size: size };
};
Y.lab = function (s, x, y, str, col, align) { return B.t(s, x, y, str.toUpperCase(), Y.TM, 4.4, col || 'Ink', { track: 110, align: align }); };
Y.txt = function (s, x, y, w, str, col, size) { return B.a(s, x, y, w, 30, str, Y.T, size || 6.4, col || 'Ink', { lead: (size || 6.4) * 1.36 }); };
Y.sub = function (s, x, str, col, y, size) { return Y.set(s, x, y || Y.SUBY, str, Y.SUB, size || 11, col || 'Ink', 0); };
Y.say = function (s, x, y, w, str, col, size) { size = size || 17; return B.a(s, x, y, w, 50, str, Y.SUB, size, col || 'Ink', { lead: size * 1.1 }); };
// Hang line: folio at the outer corner, label beside it.
Y.hl = function (s, side, label, col) {
  if (side === 'L') { Y.lab(s, 7, Y.HANG, String(2 * s), col); if (label) Y.lab(s, 16, Y.HANG, label, col); }
  else { Y.lab(s, 203, Y.HANG, String(2 * s + 1), col, 'r'); if (label) Y.lab(s, 112, Y.HANG, label, col); }
};
Y.rows = function (s, x, y, w, rows, o) {
  o = o || {};
  var i, yy, step = o.step || 9.4, up = step * 0.62, col = o.col || 'Ink';
  for (i = 0; i < rows.length; i++) {
    yy = y + i * step;
    B.rule(s, x, yy - up, x + w, yy - up, 'Ink', 0.3);
    B.t(s, x, yy, rows[i][0], Y.ROW, o.size || 11.5, 'Ink', {});
    if (rows[i][1]) B.t(s, x + (o.dx || 44), yy, rows[i][1], Y.T, o.dsize || 6.2, 'Ink', {});
    if (o.num !== false) B.t(s, x + w, yy, rows[i][2] || ('0' + (i + 1)), Y.TM, 5, col, { align: 'r', track: 60 });
  }
  yy = y + rows.length * step - up; B.rule(s, x, yy, x + w, yy, 'Ink', 0.3);
};
// Small figure with a caption under it.
Y.fig = function (s, x, y, fig, cap, col, size) {
  Y.set(s, x, y, fig, 'Obviously-NarwBlck', size || 17, col || 'Ink', 0);
  B.t(s, x, y + 3.6, cap, Y.T, 6, 'Ink', {});
};
Y.shots = function (list, dpi) {
  var dir = XD + 'bk2/', f = new Folder(dir), i; if (!f.exists) f.create();
  for (i = 0; i < list.length; i++) B.png(list[i], dir + B.key(list[i]) + '.png', dpi || 120);
};
