// Booklet build helpers. Load after lib.jsx, with the booklet document active.
// Coordinates are millimetres within a spread: x 0-148 (left page 0-74, right page 74-148), y 0-105.

var B = {};
B.MM = 2.834645;
B.PW = 74; B.PH = 105; B.BLEED = 3; B.PAGES = 96; B.COLS = 6;
B.A = 'C:/Users/user/Desktop/NEWFOLLOWINGWEBSITE/ASSETS/';
B.IMG = {
  red: B.A + 'Dynamic Red Portrait.png',
  ensemble: B.A + 'Elegant Red Ensemble.png',
  braids: B.A + 'Silhouette with Braids.png',
  light: B.A + 'Influencer Marketing Visuals 169/Dramatic Light Portrait.png',
  burger: B.A + 'INSDUSTRY PAGES/Woman Enjoying Burger.png',
  neon: B.A + 'INSDUSTRY PAGES/Surprised Young Man with Neon Lights.png',
  crowd: B.A + 'Production Stills/Focused Woman in Crowd.png',
  face: B.A + 'UGC EXAMPLES 916/Dramatic Face Close-Up.png',
  perfume: B.A + 'Perfume and Roses Display.png',
  app: 'C:/Users/user/Desktop/Following/AppLaunchS2.png'
};

FG.ROOT = 'BOOK';

// Spread s holds pages 2s (left) and 2s+1 (right). Spread 0 has only page 1; spread 48 has only page 96.
B.key = function (s) { return 's' + (s < 10 ? '0' : '') + s; };
B.originOf = function (s) {
  var col = s % B.COLS, row = Math.floor(s / B.COLS);
  return [col * (2 * B.PW * B.MM + 90), -row * (B.PH * B.MM + 90)];
};
FG.org = function (key) { return B.originOf(parseInt(key.substr(1), 10)); };

B.hasLeft = function (s) { return s > 0; };
B.hasRight = function (s) { return s < 48; };

// ---- primitives in mm
B.r = function (s, x, y, w, h, col, o) {
  var it = FG.rect(B.key(s), (o && o.layer) || 'Ground', x * B.MM, y * B.MM, w * B.MM, h * B.MM, (typeof col === 'string') ? col : null, o);
  if (col && typeof col !== 'string') { it.filled = true; it.fillColor = col; }
  return it;
};
B.t = function (s, x, y, str, font, size, col, o) { return FG.text(B.key(s), 'Type', x * B.MM, y * B.MM, str, font, size, col, o); };
B.a = function (s, x, y, w, h, str, font, size, col, o) { return FG.area(B.key(s), 'Type', x * B.MM, y * B.MM, w * B.MM, h * B.MM, str, font, size, col, o); };
B.lab = function (s, x, y, str, col, o) { o = o || {}; return FG.text(B.key(s), 'Type', x * B.MM, y * B.MM, str.toUpperCase(), 'M', o.size || 4.6, col, { track: 140, align: o.align }); };
B.wm = function (s, x, y, w, col) { return FG.wm(B.key(s), 'Mark', x * B.MM, y * B.MM, w * B.MM, col); };
B.dot = function (s, cx, cy, d, col) { return FG.ellipse(B.key(s), 'Mark', (cx - d / 2) * B.MM, (cy - d / 2) * B.MM, d * B.MM, d * B.MM, col); };
B.rule = function (s, x1, y1, x2, y2, col, w) { return FG.line(B.key(s), 'Notes', x1 * B.MM, y1 * B.MM, x2 * B.MM, y2 * B.MM, col, w || 0.4); };

// Page ground with bleed on the outer edges. side: 'L', 'R' or 'LR'.
B.ground = function (s, side, col) {
  var b = B.BLEED, out = [];
  if (side.indexOf('L') >= 0 && B.hasLeft(s)) out.push(B.r(s, -b, -b, B.PW + b, B.PH + 2 * b, col));
  if (side.indexOf('R') >= 0 && B.hasRight(s)) out.push(B.r(s, B.PW, -b, B.PW + b, B.PH + 2 * b, col));
  return out;
};

// Linked photograph, scaled to cover a box and clipped to it. fx, fy choose which part shows (0-1).
B.img = function (s, file, x, y, w, h, o) {
  o = o || {};
  var key = B.key(s), g = FG.org(key), L = FG.lay('Image');
  var pi = L.placedItems.add(); pi.file = new File(file);
  var W = w * B.MM, H = h * B.MM, sc = Math.max(W / pi.width, H / pi.height) * (o.zoom || 1);
  pi.resize(sc * 100, sc * 100);
  var fx = (o.fx === undefined) ? 0.5 : o.fx, fy = (o.fy === undefined) ? 0.5 : o.fy;
  pi.position = [g[0] + x * B.MM - (pi.width - W) * fx, g[1] - y * B.MM + (pi.height - H) * fy];
  var grp = L.groupItems.add(); pi.move(grp, ElementPlacement.PLACEATEND);
  var r = grp.pathItems.rectangle(g[1] - y * B.MM, g[0] + x * B.MM, W, H); r.filled = false; r.stroked = false;
  r.move(grp, ElementPlacement.PLACEATBEGINNING); r.clipping = true; grp.clipped = true;
  FG.tag(grp, key, 'img');
  if (o.shade) { var sh = FG.rect(key, 'Image', x * B.MM, y * B.MM, W, H, null); sh.filled = true; sh.fillColor = FG.rgb(0, 0, 0); sh.opacity = o.shade; }
  return grp;
};
// Photo on a whole page or spread, with bleed.
B.photo = function (s, side, name, o) {
  var b = B.BLEED;
  if (side === 'L') return B.img(s, B.IMG[name], -b, -b, B.PW + b, B.PH + 2 * b, o);
  if (side === 'R') return B.img(s, B.IMG[name], B.PW, -b, B.PW + b, B.PH + 2 * b, o);
  return B.img(s, B.IMG[name], -b, -b, 2 * B.PW + 2 * b, B.PH + 2 * b, o);
};
// A picture that still has to be supplied. Drawn as a labelled grey panel.
B.need = function (s, side, what) {
  var b = B.BLEED, x = (side === 'R') ? B.PW : -b, w = (side === 'LR') ? 2 * B.PW + 2 * b : B.PW + b;
  var it = B.r(s, x, -b, w, B.PH + 2 * b, FG.rgb(46, 50, 62), { layer: 'Image' });
  FG.poly(B.key(s), 'Image', [[x * B.MM, -b * B.MM], [(x + w) * B.MM, (B.PH + b) * B.MM]], null, { open: true, stroke: FG.rgb(84, 88, 102), strokeW: 0.3 });
  var lx = (side === 'R') ? B.PW + 6 : 6;
  B.lab(s, lx, 9, 'Photo needed', 'Lime');
  B.a(s, lx, 11, 60, 30, what, 'M', 6, 'Cream', { lead: 8 });
  return it;
};

// The gradient line across a spread. route is in mm; its colour covers the part of the sequence this spread owns.
B.line = function (s, route, sw, o) {
  o = o || {};
  var key = B.key(s), rt = [], i, e, b = B.BLEED;
  for (i = 0; i < route.length; i++) {
    e = route[i];
    if (e instanceof Array) rt.push([e[0] * B.MM, e[1] * B.MM]);
    else rt.push({ to: [e.to[0] * B.MM, e.to[1] * B.MM], loops: e.loops, r: e.r * B.MM, side: e.side || 1, env: false });
  }
  var from = (o.from === undefined) ? s / 49 : o.from, to = (o.to === undefined) ? (s + 1) / 49 : o.to;
  var items = FG.gradLine(key, 'Mark', FG.track(rt), sw || 2.6, { tube: true, steps: o.steps || 30, from: from, to: to });
  var x0 = B.hasLeft(s) ? -b : B.PW, x1 = B.hasRight(s) ? 2 * B.PW + b : B.PW;
  return FG.clip(key, 'Mark', items, x0 * B.MM, -b * B.MM, (x1 - x0) * B.MM, (B.PH + 2 * b) * B.MM, { id: 'line' });
};

// Folios on text pages.
B.folio = function (s, side, col) {
  if (side.indexOf('L') >= 0 && B.hasLeft(s)) B.t(s, 6, 100.2, String(2 * s), 'M', 4.6, col, {});
  if (side.indexOf('R') >= 0 && B.hasRight(s)) B.t(s, 2 * B.PW - 6, 100.2, String(2 * s + 1), 'M', 4.6, col, { align: 'r' });
};

B.clear = function (s) { return FG.clear(B.key(s)); };

// Preview of one spread to PNG.
B.png = function (s, path, dpi) {
  var g = FG.org(B.key(s)), o = new ImageCaptureOptions();
  o.resolution = dpi || 150; o.antiAliasing = true; o.transparency = false; o.matte = true; o.matteColor = FG.rgb(120, 120, 120);
  var x0 = B.hasLeft(s) ? 0 : B.PW, x1 = B.hasRight(s) ? 2 * B.PW : B.PW;
  FG.doc.imageCapture(new File(path), [g[0] + x0 * B.MM, g[1], g[0] + x1 * B.MM, g[1] - B.PH * B.MM], o);
};
