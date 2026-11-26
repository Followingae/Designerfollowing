// White, editorial version of the booklet. Load after lib.jsx, booklib.jsx and booktpl.jsx: it overrides parts of them.

B.LAST = 42;                                   // 84 pages: spread 0 = p1, spread 42 = p84
B.hasRight = function (s) { return s < B.LAST; };
B.IMG.dj = 'C:/Users/user/Downloads/DJ in Tropical Vibes.png';
B.IMG.celeb = 'C:/Users/user/Downloads/Celebrity Arrival Scene.png';
B.IMG.duo = 'C:/Users/user/Downloads/Sporty Duo Portrait.png';
B.IMG.youth = 'C:/Users/user/Downloads/Fashionable Youth.png';
B.IMG.dropper = 'C:/Users/user/Downloads/Luxury Dropper Bottle on Rocky Surface.png';

// Small caps label on a lime highlighter bar.
B.lab = function (s, x, y, str, col, o) {
  o = o || {};
  var t = FG.text(B.key(s), 'Type', x * B.MM, y * B.MM, str.toUpperCase(), 'SB', o.size || 4.8, col || 'Ink', { track: 120, align: o.align });
  if (o.bar !== false && (col === undefined || col === 'Ink')) {
    var w = t.width / B.MM + 2.4, bx = (o.align === 'r') ? x - w + 1.2 : x - 1.2;
    var r = FG.rect(B.key(s), 'Mark', bx * B.MM, (y - 2.6) * B.MM, w * B.MM, 3.6 * B.MM, 'Lime');
  }
  return t;
};

// A picture still to come: pale panel, ink note.
B.need = function (s, side, what) {
  var b = B.BLEED, x = (side === 'R') ? B.PW : -b, w = (side === 'LR') ? 2 * B.PW + 2 * b : B.PW + b;
  var it = B.r(s, x, -b, w, B.PH + 2 * b, FG.rgb(226, 224, 218), { layer: 'Image' });
  FG.poly(B.key(s), 'Image', [[x * B.MM, -b * B.MM], [(x + w) * B.MM, (B.PH + b) * B.MM]], null, { open: true, stroke: FG.rgb(180, 178, 170), strokeW: 0.3 });
  var lx = (side === 'R') ? B.PW + 6 : 6;
  B.lab(s, lx, 10, 'Photo needed');
  B.a(s, lx, 13, 60, 30, what, 'M', 6.2, 'Ink', { lead: 8 });
  return it;
};

// The line, with an ink keyline so it holds on white paper and on photographs alike.
B.line = function (s, route, sw, o) {
  o = o || {};
  var key = B.key(s), rt = [], i, e, b = B.BLEED, n = B.LAST + 1;
  for (i = 0; i < route.length; i++) {
    e = route[i];
    if (e instanceof Array) rt.push([e[0] * B.MM, e[1] * B.MM]);
    else rt.push({ to: [e.to[0] * B.MM, e.to[1] * B.MM], loops: e.loops, r: e.r * B.MM, side: e.side || 1, env: false });
  }
  var pts = FG.track(rt), w = sw || 3.2;
  var items = FG.gradLine(key, 'Mark', pts, w * 0.76, { tube: true, steps: o.steps || 34, from: (o.from === undefined) ? s / n : o.from, to: (o.to === undefined) ? (s + 1) / n : o.to });
  for (var c0 = 0; c0 < pts.length - 1; c0 += 800) items.push(FG.poly(key, 'Mark', pts.slice(c0, Math.min(pts.length - 1, c0 + 800) + 1), null, { open: true, stroke: 'Ink', strokeW: w, id: 'key' }));
  var x0 = B.hasLeft(s) ? -b : B.PW, x1 = B.hasRight(s) ? 2 * B.PW + b : B.PW;
  return FG.clip(key, 'Mark', items, x0 * B.MM, -b * B.MM, (x1 - x0) * B.MM, (B.PH + 2 * b) * B.MM, { id: 'line' });
};

B.png = function (s, path, dpi) {
  var g = FG.org(B.key(s)), o = new ImageCaptureOptions();
  o.resolution = dpi || 150; o.antiAliasing = true; o.transparency = false; o.matte = true; o.matteColor = FG.rgb(255, 255, 255);
  var x0 = B.hasLeft(s) ? 0 : B.PW, x1 = B.hasRight(s) ? 2 * B.PW : B.PW;
  FG.doc.imageCapture(new File(path), [g[0] + x0 * B.MM, g[1], g[0] + x1 * B.MM, g[1] - B.PH * B.MM], o);
};

// ---------- templates
var W = {};
W.LY = {};
W.ly = function (s) { return (W.LY[s] === undefined) ? 96 : W.LY[s]; };
W.x = function (side) { return (side === 'R') ? B.PW + 6 : 6; };

// Line through a spread. Default: runs low and throws two loops somewhere new each time.
W.line = function (s, mid, sw) {
  var route = [];
  if (s > 0) route.push([-4, W.ly(s - 1)]);
  var lx = 20 + (s * 41) % 88, y = W.ly(s);
  route = route.concat(mid || [[lx, y + 0.6], { to: [lx + 22, y], loops: 2, r: 4.6 }, [lx + 34, y + 0.4]]);
  if (B.hasRight(s)) route.push([152, W.ly(s)]);
  return B.line(s, route, sw);
};

// Very large heading. Tight, heavy, allowed to run to the edge of the page.
W.big = function (s, x, y, str, size, col, o) {
  o = o || {};
  return B.t(s, x, y, str, o.font || 'EB', size, col || 'Ink', { track: (o.track === undefined) ? -55 : o.track, lead: size * (o.lead || 0.86), fonts: o.fonts, align: o.align });
};

W.folio = function (s, side) {
  if (side.indexOf('L') >= 0 && B.hasLeft(s)) B.t(s, 6, 101.4, String(2 * s), 'SB', 4.6, 'Ink', {});
  if (side.indexOf('R') >= 0 && B.hasRight(s)) B.t(s, 2 * B.PW - 6, 101.4, String(2 * s + 1), 'SB', 4.6, 'Ink', { align: 'r' });
};

// Rows: a heavy name, a line of explanation, an ink hairline above.
W.rows = function (s, side, y, rows, o) {
  o = o || {};
  var x = W.x(side), step = o.step || 15, i, col = o.col || 'Ink';
  for (i = 0; i < rows.length; i++) {
    var yy = y + i * step;
    B.rule(s, x, yy - (o.gap || 5.6), x + 62, yy - (o.gap || 5.6), col, 0.45);
    if (o.numbered) B.t(s, x + 62, yy, '0' + (i + 1 + (o.start || 0)), 'MI', 7, o.accent || 'Violet', { align: 'r' });
    B.t(s, x, yy, rows[i][0], 'EB', o.size || 12, col, { track: -35 });
    if (rows[i][1]) B.a(s, x, yy + 1.6, o.dw || 50, 11, rows[i][1], 'M', o.dsize || 6.6, col, { lead: 8.2 });
  }
  var last = y + rows.length * step - (o.gap || 5.6);
  if (o.close !== false) B.rule(s, x, last, x + 62, last, col, 0.45);
};

// Section opener: a full-page photograph and the section name as big as the page allows.
W.opener = function (s, photoSide, img, num, title, size, sub, o) {
  o = o || {};
  var ts = (photoSide === 'L') ? 'R' : 'L', x = W.x(ts);
  B.clear(s);
  B.photo(s, photoSide, img, o);
  B.lab(s, x, 10, num);
  W.big(s, x - 0.8, o.ty || 62, title, size, o.col || 'Violet', { lead: o.lead });
  B.a(s, x, (o.sy || 70), 60, 26, sub, 'MI', 10.5, 'Ink', { lead: 12.4, track: -10 });
  W.folio(s, ts);
  W.line(s, o.mid);
};

// Full-bleed photograph across the spread with a heading set on it.
W.spread = function (s, img, title, size, o) {
  o = o || {};
  B.clear(s);
  B.photo(s, 'LR', img, { fx: o.fx, fy: o.fy, shade: o.shade, zoom: o.zoom });
  if (o.label) B.lab(s, 6, 10, o.label);
  W.big(s, o.x === undefined ? 5.2 : o.x, o.y || 84, title, size, o.col || 'White', { fonts: o.fonts, lead: o.lead });
  if (o.sub) B.t(s, o.sx === undefined ? 6 : o.sx, o.suby || 93, o.sub, 'MI', 10, o.col || 'White', { track: -10 });
  W.line(s, o.mid);
};

// Large figure with a caption.
W.fig = function (s, x, y, fig, cap, size, col) {
  W.big(s, x - 0.6, y, fig, size, col || 'Ink');
  B.t(s, x, y + 5.6, cap, 'MI', 8.4, 'Ink', { track: -8 });
};

W.preview = function (list, dpi) {
  var dir = 'C:/Users/user/Desktop/DesignerFollowing/brands/following/explorations/book/', f = new Folder(dir);
  if (!f.exists) f.create();
  for (var i = 0; i < list.length; i++) B.png(list[i], dir + B.key(list[i]) + '.png', dpi || 110);
};
