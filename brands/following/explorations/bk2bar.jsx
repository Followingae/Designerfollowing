// Booklet v3.1: top bar, Inflink assets, platform shots. Load after bk2lib.jsx.
Y.HANG = 9.8; Y.TOP = 14; Y.ZH = 47;
Y.spots2 = function () { Y.spot('Coral', 255, 143, 107); Y.spot('Iris', 109, 94, 248); };
B.IMG.infPhone = 'C:/Users/user/Desktop/Inflink/phone-mockup.png';
B.IMG.infPad = 'C:/Users/user/Desktop/Inflink/ipad-mockup.png';
B.IMG.appDeals = 'C:/Users/user/Desktop/DesignerFollowing/brands/following/research/app/app_deals.png';
B.IMG.appPaid = 'C:/Users/user/Desktop/DesignerFollowing/brands/following/research/app/app_paid.png';
Y.INFSVG = 'C:/Users/user/Desktop/NEWINFLINK/.design-handoff/mobile-v3/inflink-mobile-app/project/uploads/inflink logo svg.svg';

// Section of a spread: [nav index, bar colour, bar text colour]
Y.sec = function (s) {
  if (s <= 5) return [0, 'Ink', 'White'];
  if (s <= 7) return [1, 'Burgundy', 'White'];
  if (s <= 10) return [2, 'Tomato', 'White'];
  if (s <= 17) return [3, 'Cobalt', 'White'];
  if (s <= 19) return [4, 'Forest', 'White'];
  if (s <= 22) return [5, 'Mustard', 'Ink'];
  if (s <= 26) return [6, 'Ink', 'White'];
  return [7, 'Ink', 'White'];
};
Y.NAV = ['Following', 'Paid', 'Barter', 'Cashback', 'Production', 'How we work', 'Inflink', 'Contact'];
// Top bar across the spread: section colour, all eight parts listed, the current one marked.
Y.bar = function (s) {
  var q = Y.sec(s), b = B.BLEED, x0 = B.hasLeft(s) ? -b : B.PW, x1 = B.hasRight(s) ? 2 * B.PW + b : B.PW, i, x, t;
  B.r(s, x0, -b, x1 - x0, 4.8 + b, q[1], { layer: 'Mark' });
  for (i = 0; i < 8 && s > 0 && s < B.LAST; i++) {
    if (i < 4 && !B.hasLeft(s)) continue;
    if (i >= 4 && !B.hasRight(s)) continue;
    x = (i < 4 ? 7 : 112) + (i % 4) * 23.4;
    t = B.t(s, x + (i === q[0] ? 2.2 : 0), 3.05, Y.NAV[i].toUpperCase(), Y.TM, 3.9, q[2], { track: 110 });
    if (i === q[0]) FG.ellipse(B.key(s), 'Type', (x) * B.MM, (1.9) * B.MM, 1.2 * B.MM, 1.2 * B.MM, q[2]); else t.opacity = 48;
  }
};
// Inflink logo from its SVG. mode 'col' = ink word with coral and iris discs, 'white' = all white.
Y.inflink = function (s, x, y, w, mode) {
  var key = B.key(s), g0 = FG.org(key), L = FG.lay('Mark'), grp = L.groupItems.createFromFile(new File(Y.INFSVG));
  var items = [], i;
  function collect(it) { var j; if (it.typename === 'GroupItem') { for (j = 0; j < it.pageItems.length; j++) collect(it.pageItems[j]); } else if (!(it.typename === 'PathItem' && it.clipping)) items.push(it); }
  function paint(it, col) {
    var j;
    if (it.typename === 'CompoundPathItem') { for (j = 0; j < it.pathItems.length; j++) { it.pathItems[j].filled = true; it.pathItems[j].fillColor = col; it.pathItems[j].stroked = false; } }
    else { it.filled = true; it.fillColor = col; it.stroked = false; }
  }
  collect(grp);
  var word = [], discs = [];
  for (i = 0; i < items.length; i++) {
    var b = items[i].geometricBounds, ww = b[2] - b[0], hh = b[1] - b[3];
    if (items[i].typename === 'PathItem' && Math.abs(ww - hh) < 0.02 * ww && ww > 0.08 * grp.width) discs.push(items[i]); else word.push(items[i]);
  }
  discs.sort(function (a, c) { return c.width - a.width; });
  for (i = 0; i < word.length; i++) paint(word[i], FG.col(mode === 'white' ? 'White' : 'Ink'));
  if (discs.length > 0) paint(discs[0], FG.col(mode === 'white' ? 'White' : 'Coral'));
  if (discs.length > 1) paint(discs[1], FG.col(mode === 'white' ? 'White' : 'Iris'));
  var vb = grp.visibleBounds, sc = w * B.MM / (vb[2] - vb[0]) * 100; grp.resize(sc, sc);
  vb = grp.visibleBounds; grp.translate(g0[0] + x * B.MM - vb[0], g0[1] - y * B.MM - vb[1]);
  FG.tag(grp, key, 'inflink');
  return 'items ' + items.length + ' discs ' + discs.length;
};
// Transparent device shot scaled to width w, top at y, clipped at the foot of the page.
Y.device = function (s, name, x, y, w) { return B.img(s, B.IMG[name], x, y, w, B.PH + B.BLEED - y, { fy: 0 }); };

// Interface mock-up (transparent PNG from explorations/mocks), fitted inside a box and centred on cx, cy. Not clipped.
Y.MOCKS = 'C:/Users/user/Desktop/DesignerFollowing/brands/following/explorations/mocks/';
Y.mock = function (s, name, cx, cy, maxW, maxH) {
  var key = B.key(s), g = FG.org(key), L = FG.lay('Image'), pi = L.placedItems.add();
  pi.file = new File(Y.MOCKS + name + '.png');
  var sc = Math.min(maxW * B.MM / pi.width, maxH * B.MM / pi.height); pi.resize(sc * 100, sc * 100);
  pi.position = [g[0] + cx * B.MM - pi.width / 2, g[1] - cy * B.MM + pi.height / 2];
  return FG.tag(pi, key, 'mock');
};

// ---------- The line in real 3D: one gradient stroke with Illustrator's 3D and Materials > Inflate.
// pts are absolute document points. from, to pick the part of the lime-to-lilac gradient.
Y.grad = function (from, to) {
  var d = FG.doc, S = FG.STOPS, st = [[0, FG.gradAt(from)]], i, g = d.gradients.add();
  for (i = 0; i < S.length; i++) if (S[i][0] > from + 0.001 && S[i][0] < to - 0.001) st.push([(S[i][0] - from) / (to - from), S[i][1]]);
  st.push([1, FG.gradAt(to)]);
  g.type = GradientType.LINEAR;
  while (g.gradientStops.length < st.length) g.gradientStops.add();
  for (i = 0; i < st.length; i++) { var q = g.gradientStops[i]; q.rampPoint = st[i][0] * 100; q.midPoint = 50; q.color = FG.rgb(st[i][1][0], st[i][1][1], st[i][1][2]); }
  var gc = new GradientColor(); gc.gradient = g; return gc;
};
Y.tube = function (layerName, pts, sw, from, to) {
  var d = FG.doc, L = FG.lay(layerName), step = Math.max(1, Math.ceil(pts.length / 700)), q = [], i;
  for (i = 0; i < pts.length; i += step) q.push(pts[i]);
  q.push(pts[pts.length - 1]);
  var p = L.pathItems.add(); p.setEntirePath(q);
  p.filled = false; p.stroked = true; p.strokeWidth = sw; p.strokeCap = StrokeCap.ROUNDENDCAP; p.strokeJoin = StrokeJoin.ROUNDENDJOIN;
  p.strokeColor = Y.grad(from, to);
  d.selection = null; p.selected = true;
  app.executeMenuCommand('Live Adobe Geometry3D Inflate'); app.redraw();
  d.selection = null;
  return p;
};
Y.route = function (key, route) {
  var rt = [], i, e, g = FG.org(key), out = [];
  for (i = 0; i < route.length; i++) {
    e = route[i];
    if (e instanceof Array) rt.push([e[0] * B.MM, e[1] * B.MM]);
    else rt.push({ to: [e.to[0] * B.MM, e.to[1] * B.MM], loops: e.loops, r: e.r * B.MM, side: e.side || 1, env: false });
  }
  var pts = FG.track(rt);
  for (i = 0; i < pts.length; i++) out.push([g[0] + pts[i][0], g[1] - pts[i][1]]);
  return out;
};
// Booklet line, now 3D.
B.line = function (s, route, sw, o) {
  o = o || {};
  var key = B.key(s), b = B.BLEED, n = B.LAST + 1;
  var p = Y.tube('Mark', Y.route(key, route), (sw || 3.4) * 1.25, (o.from === undefined) ? s / n : o.from, (o.to === undefined) ? (s + 1) / n : o.to);
  var x0 = B.hasLeft(s) ? -b : B.PW, x1 = B.hasRight(s) ? 2 * B.PW + b : B.PW;
  return FG.clip(key, 'Mark', [p], x0 * B.MM, -b * B.MM, (x1 - x0) * B.MM, (B.PH + 2 * b) * B.MM, { id: 'line' });
};
