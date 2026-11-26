// Landscape A7, 52 pages. Load after lib.jsx, booklib.jsx, booktpl.jsx and bookw.jsx.
// Spread coordinates in mm: x 0-210 (left page 0-105, right page 105-210), y 0-74.

B.PW = 105; B.PH = 74; B.LAST = 26; B.COLS = 5;
B.originOf = function (s) {
  var col = s % B.COLS, row = Math.floor(s / B.COLS);
  return [col * (2 * B.PW * B.MM + 90), -row * (B.PH * B.MM + 90)];
};
FG.org = function (key) { return B.originOf(parseInt(key.substr(1), 10)); };

W.ly = function (s) { return (W.LY[s] === undefined) ? 68.4 : W.LY[s]; };
W.TW = 93;                                        // text width on a page

W.line = function (s, mid, sw) {
  var route = [];
  if (s > 0) route.push([-4, W.ly(s - 1)]);
  var lx = 22 + (s * 53) % 140, y = W.ly(s);
  route = route.concat(mid || [[lx, y + 0.3], { to: [lx + 20, y], loops: 2, r: 3.7 }, [lx + 32, y + 0.2]]);
  if (B.hasRight(s)) route.push([2 * B.PW + 4, W.ly(s)]);
  return B.line(s, route, sw || 3);
};

W.folio = function (s, side) {
  if (side.indexOf('L') >= 0 && B.hasLeft(s)) B.t(s, 6, 71.6, String(2 * s), 'SB', 4.6, 'Ink', {});
  if (side.indexOf('R') >= 0 && B.hasRight(s)) B.t(s, 2 * B.PW - 6, 71.6, String(2 * s + 1), 'SB', 4.6, 'Ink', { align: 'r' });
};

W.rows = function (s, side, y, rows, o) {
  o = o || {};
  var x = W.x(side), step = o.step || 12, i, col = o.col || 'Ink', gap = o.gap || 5, w = o.w || W.TW;
  for (i = 0; i < rows.length; i++) {
    var yy = y + i * step;
    B.rule(s, x, yy - gap, x + w, yy - gap, col, 0.45);
    if (o.numbered) B.t(s, x + w, yy, '0' + (i + 1 + (o.start || 0)), 'MI', 7, o.accent || 'Violet', { align: 'r' });
    B.t(s, x, yy, rows[i][0], 'EB', o.size || 11, col, { track: -35 });
    if (rows[i][1]) B.t(s, x + (o.dx || 0), yy + (o.dy === undefined ? 3.6 : o.dy), rows[i][1], 'M', o.dsize || 6.4, col, {});
  }
  if (o.close !== false) { var last = y + rows.length * step - gap; B.rule(s, x, last, x + w, last, col, 0.45); }
};

// A full-height picture strip. x and w in mm; bleeds top, bottom and at the page edge it touches.
W.strip = function (s, name, x, w, o) {
  var b = B.BLEED, x0 = (x <= 0) ? -b : x, x1 = (x + w >= 2 * B.PW) ? 2 * B.PW + b : x + w;
  return B.img(s, B.IMG[name], x0, -b, x1 - x0, B.PH + 2 * b, o);
};

// ---------- round 2 of the landscape version: no keyline on the line, bolder type tools ----------
B.LAST = 28;                                      // 56 pages

// The line: gradient tube only, no outline.
B.line = function (s, route, sw, o) {
  o = o || {};
  var key = B.key(s), rt = [], i, e, b = B.BLEED, n = B.LAST + 1;
  for (i = 0; i < route.length; i++) {
    e = route[i];
    if (e instanceof Array) rt.push([e[0] * B.MM, e[1] * B.MM]);
    else rt.push({ to: [e.to[0] * B.MM, e.to[1] * B.MM], loops: e.loops, r: e.r * B.MM, side: e.side || 1, env: false });
  }
  var items = FG.gradLine(key, 'Mark', FG.track(rt), sw || 3.4, { tube: true, steps: o.steps || 36, from: (o.from === undefined) ? s / n : o.from, to: (o.to === undefined) ? (s + 1) / n : o.to });
  var x0 = B.hasLeft(s) ? -b : B.PW, x1 = B.hasRight(s) ? 2 * B.PW + b : B.PW;
  return FG.clip(key, 'Mark', items, x0 * B.MM, -b * B.MM, (x1 - x0) * B.MM, (B.PH + 2 * b) * B.MM, { id: 'line' });
};

// A heading that changes colour where it crosses from one surface to another (for type running off a photo onto paper).
W.split = function (s, x, y, str, size, splitX, colA, colB, o) {
  o = o || {};
  var key = B.key(s), b = B.BLEED, H = (B.PH + 2 * b) * B.MM;
  var a = W.big(s, x, y, str, size, colA, o); FG.clip(key, 'Type', [a], -b * B.MM, -b * B.MM, (splitX + b) * B.MM, H, { id: 'splitA' });
  var c = W.big(s, x, y, str, size, colB, o); FG.clip(key, 'Type', [c], splitX * B.MM, -b * B.MM, (2 * B.PW + b - splitX) * B.MM, H, { id: 'splitB' });
};

// UAE flag, 2:1, with a hairline so the white band holds on white paper.
W.flag = function (s, x, y, w) {
  var h = w / 2, bw = w / 4, bh = h / 3;
  B.r(s, x + bw, y, w - bw, bh, FG.rgb(0, 115, 47), { layer: 'Mark' });
  B.r(s, x + bw, y + bh, w - bw, bh, FG.rgb(255, 255, 255), { layer: 'Mark' });
  B.r(s, x + bw, y + 2 * bh, w - bw, bh, FG.rgb(0, 0, 0), { layer: 'Mark' });
  B.r(s, x, y, bw, h, FG.rgb(255, 0, 0), { layer: 'Mark' });
  var k = FG.rect(B.key(s), 'Mark', x * B.MM, y * B.MM, w * B.MM, h * B.MM, null, { stroke: 'Ink', strokeW: 0.3 });
  return k;
};

// ---------- round 3: the line keeps to the foot of the page so it never cuts through a face or a heading ----------
W.ly = function (s) { return 69.6; };
W.line = function (s, mid, sw) {
  var route = [], i, high = false, y = 69.6;
  if (mid) for (i = 0; i < mid.length; i++) { var e = (mid[i] instanceof Array) ? mid[i] : mid[i].to; if (e[1] < 60) high = true; }
  if (s > 0) route.push([-4, y]);
  var lx = 22 + (s * 53) % 140;
  route = route.concat((mid && !high) ? mid : [[lx, y + 0.2], { to: [lx + 22, y], loops: 2, r: 3.5 }, [lx + 34, y + 0.2]]);
  if (B.hasRight(s)) route.push([2 * B.PW + 4, y]);
  return B.line(s, route, sw || 3.4);
};
