// Following guidelines build helpers. Loaded with $.evalFile() at the top of each build script.
// Page-local coordinates: origin at the artboard's top-left, y grows downward.

var FG = {};
FG.doc = app.activeDocument;
FG.ROOT = 'GUIDELINES';
FG.FONTS = {
  EB: 'PlusJakartaSans-ExtraBold',
  B: 'PlusJakartaSans-Bold',
  SB: 'PlusJakartaSans-SemiBold',
  M: 'PlusJakartaSans-Medium',
  R: 'PlusJakartaSans-Regular',
  L: 'PlusJakartaSans-Light',
  MI: 'PlusJakartaSansItalic-MediumItalic',
  LI: 'PlusJakartaSansItalic-LightItalic'
};
FG.W = 1920; FG.H = 1080; FG.M = 80; FG.COLS = 12; FG.GUT = 24;
FG.colW = (FG.W - 2 * FG.M - (FG.COLS - 1) * FG.GUT) / FG.COLS;

// x of the left edge of column n (1-based); span(n) is the width of n columns.
FG.cx = function (n) { return FG.M + (n - 1) * (FG.colW + FG.GUT); };
FG.span = function (n) { return n * FG.colW + (n - 1) * FG.GUT; };

FG.col = function (name) {
  var sc = new SpotColor();
  sc.spot = FG.doc.spots.getByName('Following / ' + name);
  sc.tint = 100;
  return sc;
};

// Illustrator refuses to create art on any layer while the active layer is locked or hidden,
// so make the target the active layer first.
FG.lay = function (name) {
  var l = FG.doc.layers.getByName(FG.ROOT).layers.getByName(name);
  FG.doc.activeLayer = l;
  return l;
};

FG.org = function (page) {
  var r = FG.doc.artboards.getByName(page).artboardRect;
  return [r[0], r[1]];
};

FG.tag = function (item, page, id) { item.name = page + ':' + (id || ''); return item; };

// Remove everything a previous build put on this page.
FG.clear = function (page) {
  var names = ['Notes', 'Type', 'Mark', 'Image', 'Ground'], n = 0;
  for (var i = 0; i < names.length; i++) {
    var items = FG.lay(names[i]).pageItems;
    for (var j = items.length - 1; j >= 0; j--) {
      if (items[j].name.indexOf(page + ':') === 0) { items[j].remove(); n++; }
    }
  }
  return n;
};

FG.paint = function (item, colName, strokeName, strokeW) {
  if (colName) { item.filled = true; item.fillColor = FG.col(colName); } else { item.filled = false; }
  if (strokeName) { item.stroked = true; item.strokeColor = FG.col(strokeName); item.strokeWidth = strokeW || 1; } else { item.stroked = false; }
  return item;
};

FG.rect = function (page, layer, x, y, w, h, colName, o) {
  o = o || {};
  var g = FG.org(page);
  var it = o.radius ? FG.lay(layer).pathItems.roundedRectangle(g[1] - y, g[0] + x, w, h, o.radius, o.radius)
                    : FG.lay(layer).pathItems.rectangle(g[1] - y, g[0] + x, w, h);
  FG.paint(it, colName, o.stroke, o.strokeW);
  if (o.rotate) it.rotate(o.rotate);
  return FG.tag(it, page, o.id);
};

FG.ellipse = function (page, layer, x, y, w, h, colName, o) {
  o = o || {};
  var g = FG.org(page);
  var it = FG.lay(layer).pathItems.ellipse(g[1] - y, g[0] + x, w, h);
  FG.paint(it, colName, o.stroke, o.strokeW);
  return FG.tag(it, page, o.id);
};

FG.line = function (page, layer, x1, y1, x2, y2, colName, w, o) {
  o = o || {};
  var g = FG.org(page);
  var it = FG.lay(layer).pathItems.add();
  it.setEntirePath([[g[0] + x1, g[1] - y1], [g[0] + x2, g[1] - y2]]);
  it.filled = false; it.stroked = true; it.strokeColor = FG.col(colName); it.strokeWidth = w || 1;
  if (o.dash) it.strokeDashes = o.dash;
  return FG.tag(it, page, o.id);
};

FG.style = function (range, font, size, colName, o) {
  o = o || {};
  var ca = range.characterAttributes;
  ca.textFont = app.textFonts.getByName(FG.FONTS[font] || font);
  ca.size = size;
  ca.tracking = (o.track === undefined) ? 0 : o.track;
  ca.autoLeading = false;
  ca.leading = o.lead || Math.round(size * 1.2);
  ca.fillColor = FG.col(colName);
  if (o.caps) ca.capitalization = FontCapsOption.ALLCAPS;
};

// Point text. y is the first baseline. o.fonts gives a font key per paragraph.
FG.text = function (page, layer, x, y, str, font, size, colName, o) {
  o = o || {};
  var g = FG.org(page);
  var t = FG.lay(layer).textFrames.pointText([g[0] + x, g[1] - y]);
  t.contents = str;
  FG.style(t.textRange, font, size, colName, o);
  if (o.fonts) {
    for (var i = 0; i < o.fonts.length && i < t.paragraphs.length; i++) {
      t.paragraphs[i].characterAttributes.textFont = app.textFonts.getByName(FG.FONTS[o.fonts[i]]);
    }
  }
  var j = o.align === 'r' ? Justification.RIGHT : (o.align === 'c' ? Justification.CENTER : Justification.LEFT);
  for (var p = 0; p < t.paragraphs.length; p++) t.paragraphs[p].paragraphAttributes.justification = j;
  if (o.rotate) t.rotate(o.rotate);
  return FG.tag(t, page, o.id);
};

// Area text in a box. y is the top of the box.
FG.area = function (page, layer, x, y, w, h, str, font, size, colName, o) {
  o = o || {};
  var g = FG.org(page);
  var box = FG.lay(layer).pathItems.rectangle(g[1] - y, g[0] + x, w, h);
  var t = FG.lay(layer).textFrames.areaText(box);
  t.contents = str;
  FG.style(t.textRange, font, size, colName, o);
  for (var p = 0; p < t.paragraphs.length; p++) t.paragraphs[p].paragraphAttributes.hyphenation = false;
  return FG.tag(t, page, o.id);
};

// Small tracked caps label.
FG.label = function (page, x, y, str, colName, o) {
  o = o || {};
  return FG.text(page, o.layer || 'Notes', x, y, str.toUpperCase(), 'M', o.size || 13, colName, { track: 120, lead: 18, align: o.align, id: o.id });
};

// Duplicate the outlined wordmark, recolour it, scale to a width, place by top-left.
FG.wm = function (page, layer, x, y, width, colName, o) {
  o = o || {};
  var g = FG.org(page);
  var src = FG.doc.layers.getByName('SOURCE').groupItems.getByName('following-wordmark-source');
  var c = src.duplicate(FG.lay(layer), ElementPlacement.PLACEATBEGINNING);
  var col = FG.col(colName);
  for (var i = 0; i < c.pageItems.length; i++) {
    var it = c.pageItems[i];
    if (it.typename === 'PathItem') { it.fillColor = col; }
    else if (it.typename === 'CompoundPathItem') { it.pathItems[0].fillColor = col; }
  }
  var s = width / c.width * 100;
  c.resize(s, s);
  if (o.rotate) c.rotate(o.rotate);
  c.position = [g[0] + x, g[1] - y];
  return FG.tag(c, page, o.id);
};

// Group items and clip them to a page-local rectangle (defaults to the whole page),
// so cropped art does not spill onto the neighbouring artboard.
FG.clip = function (page, layer, items, x, y, w, h, o) {
  o = o || {};
  var g = FG.org(page);
  if (x === undefined) { x = 0; y = 0; w = FG.W; h = FG.H; }
  var grp = FG.lay(layer).groupItems.add();
  for (var i = 0; i < items.length; i++) items[i].move(grp, ElementPlacement.PLACEATEND);
  var r = grp.pathItems.rectangle(g[1] - y, g[0] + x, w, h);
  r.filled = false; r.stroked = false;
  r.move(grp, ElementPlacement.PLACEATBEGINNING);
  r.clipping = true;
  grp.clipped = true;
  return FG.tag(grp, page, o.id || 'clip');
};

// Export one page to PNG at a percentage scale.
FG.png = function (page, path, scale) {
  var d = FG.doc, prev = app.userInteractionLevel, idx = -1;
  for (var i = 0; i < d.artboards.length; i++) if (d.artboards[i].name === page) idx = i;
  app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
  try {
    d.artboards.setActiveArtboardIndex(idx);
    var o = new ExportOptionsPNG24();
    o.artBoardClipping = true; o.antiAliasing = true; o.transparency = false;
    o.horizontalScale = scale || 100; o.verticalScale = scale || 100;
    d.exportFile(new File(path), ExportType.PNG24, o);
  } finally { app.userInteractionLevel = prev; }
  return path;
};

// Standard page furniture: ground, section label top-left, folio top-right.
FG.page = function (page, ground, ink, section, folio) {
  FG.clear(page);
  FG.rect(page, 'Ground', 0, 0, FG.W, FG.H, ground, { id: 'ground' });
  if (section) FG.label(page, FG.M, 66, section, ink);
  if (folio) FG.label(page, FG.W - FG.M, 66, 'Following / Brand Guidelines / ' + folio, ink, { align: 'r' });
};

// A tag: caps ExtraBold in a pill with fully round ends, tilted. Width follows the set type.
FG.pill = function (page, layer, cx, cy, str, size, fill, ink, rot, o) {
  o = o || {};
  var t = FG.text(page, layer, cx, cy + size * 0.36, str, 'EB', size, ink, { track: -40, align: 'c' });
  var w = t.width + size * 1.5, h = size * 1.8;
  var r = FG.rect(page, layer, cx - w / 2, cy - h / 2, w, h, fill, { radius: h / 2 });
  var g = FG.lay(layer).groupItems.add();
  t.move(g, ElementPlacement.PLACEATEND);
  r.move(g, ElementPlacement.PLACEATEND);
  if (rot) g.rotate(rot);
  return FG.tag(g, page, o.id || 'pill');
};

// Four corner brackets around a rectangle, like tape marks on a studio floor.
FG.brackets = function (page, layer, x, y, w, h, len, colName, sw) {
  var c = [[x, y, 1, 1], [x + w, y, -1, 1], [x, y + h, 1, -1], [x + w, y + h, -1, -1]], out = [];
  for (var i = 0; i < 4; i++) {
    out.push(FG.line(page, layer, c[i][0], c[i][1], c[i][0] + c[i][2] * len, c[i][1], colName, sw || 2));
    out.push(FG.line(page, layer, c[i][0], c[i][1], c[i][0], c[i][1] + c[i][3] * len, colName, sw || 2));
  }
  return out;
};

// One letter of the wordmark as a shape. key: f o l w dot i n g (o and l take the first of each).
FG.glyph = function (page, layer, key, x, y, height, colName, o) {
  o = o || {};
  var g = FG.org(page);
  var src = FG.doc.layers.getByName('SOURCE').groupItems.getByName('following-wordmark-source');
  var kids = [], i;
  for (i = 0; i < src.pageItems.length; i++) if (src.pageItems[i].parent == src) kids.push(src.pageItems[i]);
  kids.sort(function (a, b) { return a.geometricBounds[0] - b.geometricBounds[0]; });
  var map = { f: 0, o: 1, l: 2, w: 5, dot: 6, i: 7, n: 8, g: 9 };
  var c = kids[map[key]].duplicate(FG.lay(layer), ElementPlacement.PLACEATBEGINNING);
  var tgt = (c.typename === 'CompoundPathItem') ? c.pathItems[0] : c;
  tgt.fillColor = FG.col(colName);
  var s = height / c.height * 100;
  c.resize(s, s);
  if (o.rotate) c.rotate(o.rotate);
  c.position = [g[0] + x, g[1] - y];
  return FG.tag(c, page, o.id || 'glyph');
};

// Concentric bands around a centre, largest first, alternating colours. Returns the circles.
FG.rings = function (page, layer, cx, cy, rMax, step, cols) {
  var out = [], n = 0;
  for (var r = rMax; r > 0; r -= step) { out.push(FG.ellipse(page, layer, cx - r, cy - r, 2 * r, 2 * r, cols[n % cols.length])); n++; }
  return out;
};

// A paper bag seen face on: two rope handles and a body. Returns the body rectangle's box for clipping art.
FG.bag = function (page, x, y, w, h, groundCol, handleCol) {
  var hw = w * 0.4, hh = 120;
  var a = FG.ellipse(page, 'Ground', x + w / 2 - hw / 2, y - hh / 2, hw, hh, null, { stroke: handleCol, strokeW: 7 });
  FG.rect(page, 'Ground', x, y, w, h, groundCol);
  return [x, y, w, h];
};

// The inside of the rigid box seen from above: a black wall with a coloured floor. Returns the floor box.
FG.well = function (page, x, y, w, h, floorCol, wall) {
  wall = wall || 12;
  FG.rect(page, 'Ground', x, y, w, h, 'Ink');
  FG.rect(page, 'Ground', x + wall, y + wall, w - 2 * wall, h - 2 * wall, floorCol);
  return [x + wall, y + wall, w - 2 * wall, h - 2 * wall];
};

// Rows of small wordmarks, staggered, clipped to a box. For tissue and tape.
FG.repeat = function (page, x, y, w, h, wmW, colName, o) {
  o = o || {};
  var items = [], rowH = wmW * 0.2118 + (o.gapY || wmW * 0.32), colW = wmW + (o.gapX || wmW * 0.4), r = 0;
  for (var yy = y - rowH; yy < y + h + rowH; yy += rowH) {
    for (var xx = x - colW + (r % 2 ? colW / 2 : 0); xx < x + w + colW; xx += colW) items.push(FG.wm(page, 'Mark', xx, yy, wmW, colName));
    r++;
  }
  return FG.clip(page, 'Mark', items, x, y, w, h, { id: o.id || 'repeat' });
};

// ---------- object views: a simple parallel projection so boxes and bags read as objects ----------
// World axes in mm: x = width (runs right and down), y = depth (runs left and down), z = up.
FG.P = function (O, s, x, y, z) { return [O[0] + s * (x * 0.90 - y * 0.72), O[1] + s * (x * 0.28 + y * 0.36) - s * z]; };

FG.rgb = function (r, g, b) { var c = new RGBColor(); c.red = r; c.green = g; c.blue = b; return c; };

// Filled polygon from page-local points. col is a brand colour name or an RGBColor.
FG.poly = function (page, layer, pts, col, o) {
  o = o || {};
  var g = FG.org(page), a = [];
  for (var i = 0; i < pts.length; i++) a.push([g[0] + pts[i][0], g[1] - pts[i][1]]);
  var it = FG.lay(layer).pathItems.add();
  it.setEntirePath(a); it.closed = !o.open;
  if (o.open) { it.filled = false; } else { it.filled = true; it.fillColor = (typeof col === 'string') ? FG.col(col) : col; }
  if (o.stroke) { it.stroked = true; it.strokeColor = (typeof o.stroke === 'string') ? FG.col(o.stroke) : o.stroke; it.strokeWidth = o.strokeW || 1; it.strokeCap = StrokeCap.ROUNDENDCAP; it.strokeJoin = StrokeJoin.ROUNDENDJOIN; }
  else { it.stroked = false; }
  if (o.opacity) it.opacity = o.opacity;
  return FG.tag(it, page, o.id || 'poly');
};

// Take flat art drawn at page-local (0,0)-(fw,fh) and map it onto the parallelogram P0 (top-left), P1 (top-right), P3 (bottom-left).
FG.face = function (page, items, fw, fh, P0, P1, P3, id) {
  var g = FG.org(page), grp = FG.lay('Mark').groupItems.add();
  for (var i = 0; i < items.length; i++) items[i].move(grp, ElementPlacement.PLACEATEND);
  grp.translate(-g[0], -g[1]);
  var m = app.getIdentityMatrix();
  m.mValueA = (P1[0] - P0[0]) / fw; m.mValueB = -(P1[1] - P0[1]) / fw;
  m.mValueC = -(P3[0] - P0[0]) / fh; m.mValueD = (P3[1] - P0[1]) / fh;
  m.mValueTX = 0; m.mValueTY = 0;
  grp.transform(m, true, true, true, true, 1, Transformation.DOCUMENTORIGIN);
  grp.translate(g[0] + P0[0], g[1] - P0[1]);
  return FG.tag(grp, page, id || 'face');
};

// A flat background rectangle plus art, clipped to (0,0,fw,fh). Returns one item ready for FG.face.
FG.flat = function (page, fw, fh, groundCol, art) {
  var items = art || [];
  var bg = FG.rect(page, 'Mark', 0, 0, fw, fh, groundCol);
  items.push(bg);
  return FG.clip(page, 'Mark', items, 0, 0, fw, fh, { id: 'flat' });
};

// Open magnetic box: lid standing at the back, tray in front. lidArt / trayArt are flat items sized (W*s, D*s) and (W*s, D*s).
FG.boxOpen = function (page, O, s, W, D, H, lidArt, trayArt) {
  var P = function (x, y, z) { return FG.P(O, s, x, y, z); }, t = 9;
  // lid: back board, then inner face
  FG.poly(page, 'Mark', [P(-3, -8, H), P(W + 3, -8, H), P(W + 3, -8, H + D + 4), P(-3, -8, H + D + 4)], FG.rgb(30, 34, 44));
  FG.poly(page, 'Mark', [P(W, -8, H), P(W, 0, H), P(W, 0, H + D), P(W, -8, H + D)], FG.rgb(48, 52, 62));
  FG.face(page, [lidArt], W, D, P(0, 0, H + D), P(W, 0, H + D), P(0, 0, H), 'lidface');
  // base: rim, tray, two outer walls
  FG.poly(page, 'Mark', [P(0, 0, H), P(W, 0, H), P(W, D, H), P(0, D, H)], FG.rgb(30, 34, 44));
  FG.face(page, [trayArt], W, D, P(t, t, H - 6), P(W - t, t, H - 6), P(t, D - t, H - 6), 'trayface');
  FG.poly(page, 'Mark', [P(0, D, H), P(W, D, H), P(W, D, 0), P(0, D, 0)], 'Ink');
  FG.poly(page, 'Mark', [P(W, D, H), P(W, 0, H), P(W, 0, 0), P(W, D, 0)], FG.rgb(20, 24, 33));
};

// Closed box seen from the same angle: black, with flat lid art (normally just the wordmark).
FG.boxClosed = function (page, O, s, W, D, H, lidArt) {
  var P = function (x, y, z) { return FG.P(O, s, x, y, z); };
  FG.face(page, [lidArt], W, D, P(0, 0, H), P(W, 0, H), P(0, D, H), 'lidtop');
  FG.poly(page, 'Mark', [P(0, D, H), P(W, D, H), P(W, D, 0), P(0, D, 0)], FG.rgb(14, 18, 27));
  FG.poly(page, 'Mark', [P(W, D, H), P(W, 0, H), P(W, 0, 0), P(W, D, 0)], FG.rgb(24, 28, 38));
};

// Landscape paper bag. frontArt is flat, sized (W*s, H*s). Ribbon handles, lining visible at the mouth.
FG.bag3d = function (page, O, s, W, D, H, frontArt, sideCol, liningCol, handleCol) {
  var P = function (x, y, z) { return FG.P(O, s, x, y, z); }, k, pts;
  function handle(y) { pts = []; for (k = 0; k <= 24; k++) { var a = Math.PI * k / 24; pts.push(P(W * 0.5 - W * 0.2 * Math.cos(a), y, H - 14 + 150 * Math.sin(a))); } return FG.poly(page, 'Mark', pts, null, { open: true, stroke: handleCol, strokeW: 11, id: 'handle' }); }
  handle(4);
  FG.poly(page, 'Mark', [P(0, 0, H), P(W, 0, H), P(W, D, H), P(0, D, H)], liningCol);
  FG.poly(page, 'Mark', [P(0, 0, H), P(W, 0, H), P(W, D, H), P(0, D, H)], FG.rgb(0, 0, 0), { opacity: 28 });
  FG.poly(page, 'Mark', [P(W, D, H), P(W, 0, H), P(W, 0, 0), P(W, D, 0)], sideCol);
  FG.poly(page, 'Mark', [P(W, D, H), P(W, 0, H), P(W, 0, 0), P(W, D, 0)], FG.rgb(0, 0, 0), { opacity: 22 });
  FG.poly(page, 'Mark', [P(W, D / 2, H), P(W, D / 2, 0)], null, { open: true, stroke: FG.rgb(0, 0, 0), strokeW: 1, opacity: 30 });
  FG.face(page, [frontArt], W, H, P(0, D, H), P(W, D, H), P(0, D, 0), 'bagfront');
  handle(D - 2);
};

// A cursive chain of loops (a prolate trochoid), fitted to a box. The line that follows itself.
FG.loop = function (page, layer, x, y, w, h, colName, sw, loops, o) {
  o = o || {};
  var pts = [], t, a = 1, b = o.b || 2.1, T = loops * 2 * Math.PI, raw = [], minx = 1e9, maxx = -1e9, miny = 1e9, maxy = -1e9, i;
  for (t = -1.2; t <= T + 1.2; t += 0.08) { var px = a * t - b * Math.sin(t), py = b * 1.5 * Math.cos(t); px += -py * (o.slant === undefined ? 0.28 : o.slant); raw.push([px, py]); if (px < minx) minx = px; if (px > maxx) maxx = px; if (py < miny) miny = py; if (py > maxy) maxy = py; }
  for (i = 0; i < raw.length; i++) pts.push([x + (raw[i][0] - minx) / (maxx - minx) * w, y + (raw[i][1] - miny) / (maxy - miny) * h]);
  return FG.poly(page, layer, pts, null, { open: true, stroke: colName, strokeW: sw, id: o.id || 'loop' });
};

// The wordmark broken over two lines, "follo" above "wing", fitted to a width. Returns the two clipped pieces.
FG.stack = function (page, x, y, w, colName) {
  var Wm = w / 0.534, hh = Wm * 0.2118, out = [];
  var a = FG.wm(page, 'Mark', x, y, Wm, colName); out.push(FG.clip(page, 'Mark', [a], x - 4, y - 4, Wm * 0.480 + 4, hh + 8, { id: 'stackA' }));
  var b = FG.wm(page, 'Mark', x - Wm * 0.4661, y + hh * 0.86, Wm, colName); out.push(FG.clip(page, 'Mark', [b], x - 2, y + hh * 0.86 - 4, w + 8, hh + 8, { id: 'stackB' }));
  return out;
};

// (replaces the earlier FG.stack) "follo" above "wing", built by removing letters so no slivers are left by clipping.
FG.stack = function (page, x, y, w, colName) {
  var Wm = w / 0.534, hh = Wm * 0.2118, g = FG.org(page), out = [];
  function part(keepFirst) {
    var c = FG.wm(page, 'Mark', 0, 0, Wm, colName), kids = [], i;
    for (i = 0; i < c.pageItems.length; i++) if (c.pageItems[i].parent == c) kids.push(c.pageItems[i]);
    kids.sort(function (a, b) { return a.geometricBounds[0] - b.geometricBounds[0]; });
    for (i = kids.length - 1; i >= 0; i--) if ((keepFirst && i >= 5) || (!keepFirst && i < 5)) kids[i].remove();
    return c;
  }
  var a = part(true); a.position = [g[0] + x, g[1] - (y + hh * 0.067)]; out.push(a);
  var b = part(false); b.position = [g[0] + x, g[1] - (y + hh * 0.86)]; out.push(b);
  return out;
};

// ---------- the line ----------
// Build one continuous line from a route. Route items are either a point [x,y] (sweep there)
// or {to:[x,y], loops:n, amp:px, side:1|-1, k:2.3, env:true} (travel there in a chain of loops).
FG.track = function (route) {
  var pts = [route[0]], cur = route[0], i, j;
  for (i = 1; i < route.length; i++) {
    var r = route[i];
    if (r instanceof Array) { pts.push(r); cur = r; continue; }
    var p1 = r.to, dx = p1[0] - cur[0], dy = p1[1] - cur[1], L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L;
    var side = r.side || 1, nx = uy * side, ny = -ux * side, T = 2 * Math.PI * r.loops, a = L / T, B = a * (r.k || 2.3), n = Math.round(r.loops * 56);
    for (j = 1; j <= n; j++) {
      var t = T * j / n, al = j / n, e = (r.env === false) ? 1 : Math.pow(Math.sin(Math.PI * al), (r.pow || 0.4));
      var along = a * t - B * e * Math.sin(t), up = r.amp * e * (1 - Math.cos(t));
      pts.push([cur[0] + ux * along + nx * up, cur[1] + uy * along + ny * up]);
    }
    cur = p1;
  }
  for (var it = 0; it < 4; it++) {           // Chaikin smoothing rounds the sweeps into curves
    var o = [pts[0]];
    for (i = 0; i < pts.length - 1; i++) { var a0 = pts[i], b0 = pts[i + 1]; o.push([a0[0] * 0.75 + b0[0] * 0.25, a0[1] * 0.75 + b0[1] * 0.25]); o.push([a0[0] * 0.25 + b0[0] * 0.75, a0[1] * 0.25 + b0[1] * 0.75]); }
    o.push(pts[pts.length - 1]); pts = o;
  }
  var thin = [];                              // setEntirePath refuses very long point lists
  for (i = 0; i < pts.length; i += 6) thin.push(pts[i]);
  thin.push(pts[pts.length - 1]);
  return thin;
};

// Stroke a point list in consecutive coloured lengths. segs = [[colourName, weight], ...]. Returns the paths.
FG.strokeLine = function (page, layer, pts, segs, sw, o) {
  o = o || {};
  var len = [0], i, total, out = [], wsum = 0, acc = 0, start = 0;
  for (i = 1; i < pts.length; i++) { var dx = pts[i][0] - pts[i - 1][0], dy = pts[i][1] - pts[i - 1][1]; len.push(len[i - 1] + Math.sqrt(dx * dx + dy * dy)); }
  total = len[len.length - 1];
  for (i = 0; i < segs.length; i++) wsum += segs[i][1];
  for (i = 0; i < segs.length; i++) {
    acc += segs[i][1]; var endLen = total * acc / wsum, end = start;
    while (end < pts.length - 1 && len[end] < endLen) end++;
    for (var c0 = start; c0 < end; c0 += 800) out.push(FG.poly(page, layer, pts.slice(c0, Math.min(end, c0 + 800) + 1), null, { open: true, stroke: segs[i][0], strokeW: sw, id: o.id || 'line' }));
    start = end;
  }
  return out;
};

FG.WALK = [['Lime', 8], ['Tangerine', 3], ['Pink', 2], ['Violet', 5], ['Lilac', 2]];

// Closed box with art on the lid and on the long front wall.
FG.boxClosed2 = function (page, O, s, W, D, H, lidArt, frontArt) {
  var P = function (x, y, z) { return FG.P(O, s, x, y, z); };
  FG.face(page, [lidArt], W, D, P(0, 0, H), P(W, 0, H), P(0, D, H), 'lidtop');
  FG.face(page, [frontArt], W, H, P(0, D, H), P(W, D, H), P(0, D, 0), 'front');
  FG.poly(page, 'Mark', [P(0, D, H), P(W, D, H), P(W, D, 0), P(0, D, 0)], FG.rgb(0, 0, 0), { opacity: 16 });
  FG.poly(page, 'Mark', [P(W, D, H), P(W, 0, H), P(W, 0, 0), P(W, D, 0)], FG.rgb(24, 28, 38));
  FG.poly(page, 'Mark', [P(0, D, H), P(W, D, H)], null, { open: true, stroke: FG.rgb(60, 64, 76), strokeW: 0.75 });
  FG.poly(page, 'Mark', [P(0, D, H - 38), P(W, D, H - 38), P(W, 0, H - 38)], null, { open: true, stroke: FG.rgb(60, 64, 76), strokeW: 0.5 });
};

// (replaces the earlier FG.track) Sparse control points, then four rounds of corner cutting, so the whole
// line is one smooth spline. Loop runs take a radius: {to:[x,y], loops:n, r:px, side:1|-1, env:true, pow:0.4}.
FG.track = function (route) {
  var pts = [route[0]], cur = route[0], i, j;
  for (i = 1; i < route.length; i++) {
    var q = route[i];
    if (q instanceof Array) { pts.push(q); cur = q; continue; }
    var p1 = q.to, dx = p1[0] - cur[0], dy = p1[1] - cur[1], L = Math.sqrt(dx * dx + dy * dy), ux = dx / L, uy = dy / L;
    var side = q.side || 1, nx = uy * side, ny = -ux * side, T = 2 * Math.PI * q.loops, a = L / T, B = q.r * 1.12, n = Math.round(q.loops * 10);
    for (j = 1; j <= n; j++) {
      var t = T * j / n, al = j / n, e = (q.env === false) ? 1 : Math.pow(Math.sin(Math.PI * al), (q.pow || 0.4));
      pts.push([cur[0] + ux * (a * t - B * e * Math.sin(t)) + nx * B * e * (1 - Math.cos(t)), cur[1] + uy * (a * t - B * e * Math.sin(t)) + ny * B * e * (1 - Math.cos(t))]);
    }
    cur = p1;
  }
  for (var it = 0; it < 4; it++) {
    var o = [pts[0]];
    for (i = 0; i < pts.length - 1; i++) { var a0 = pts[i], b0 = pts[i + 1]; o.push([a0[0] * 0.75 + b0[0] * 0.25, a0[1] * 0.75 + b0[1] * 0.25]); o.push([a0[0] * 0.25 + b0[0] * 0.75, a0[1] * 0.25 + b0[1] * 0.75]); }
    o.push(pts[pts.length - 1]); pts = o;
  }
  return pts;
};

// ---------- the gradient line ----------
FG.STOPS = [[0, [211, 255, 2]], [0.30, [255, 106, 19]], [0.52, [255, 62, 165]], [0.80, [81, 0, 243]], [1, [201, 167, 249]]];
FG.gradAt = function (f) {
  var s = FG.STOPS, i;
  for (i = 1; i < s.length; i++) if (f <= s[i][0]) { var a = s[i - 1], b = s[i], k = (f - a[0]) / (b[0] - a[0]); return [a[1][0] + (b[1][0] - a[1][0]) * k, a[1][1] + (b[1][1] - a[1][1]) * k, a[1][2] + (b[1][2] - a[1][2]) * k]; }
  return s[s.length - 1][1];
};
FG.mix = function (c, t, k) { return FG.rgb(c[0] + (t[0] - c[0]) * k, c[1] + (t[1] - c[1]) * k, c[2] + (t[2] - c[2]) * k); };

// Stroke a point list with the colour sequence running along its length. Illustrator cannot script a
// gradient along a stroke, so the line is cut into short lengths, each a step of the blend.
// o.tube adds a darker edge and two lighter cores so the line reads as a round tube.
// o.from / o.to pick a part of the sequence (0 to 1). Returns the paths.
FG.gradLine = function (page, layer, pts, sw, o) {
  o = o || {};
  var n = o.steps || 64, len = [0], i, out = [], from = (o.from === undefined) ? 0 : o.from, to = (o.to === undefined) ? 1 : o.to;
  for (i = 1; i < pts.length; i++) { var dx = pts[i][0] - pts[i - 1][0], dy = pts[i][1] - pts[i - 1][1]; len.push(len[i - 1] + Math.sqrt(dx * dx + dy * dy)); }
  var total = len[len.length - 1], cuts = [0], c = 0;
  for (i = 1; i <= n; i++) { var L = total * i / n; while (c < pts.length - 1 && len[c] < L) c++; cuts.push(c); }
  var layers = o.tube ? [[1, 0, 0.22], [0.84, 0, 0], [0.5, 1, 0.22], [0.15, 1, 0.6]] : [[1, 0, 0]];   // [width, toward white?, amount]
  for (var l = 0; l < layers.length; l++) {
    for (i = 0; i < n; i++) {
      if (cuts[i + 1] <= cuts[i]) continue;
      var col = FG.gradAt(from + (to - from) * (i + 0.5) / n), w = layers[l];
      var rgb = FG.mix(col, w[1] ? [255, 255, 255] : [0, 0, 0], w[2]);
      out.push(FG.poly(page, layer, pts.slice(cuts[i], cuts[i + 1] + 1), null, { open: true, stroke: rgb, strokeW: sw * w[0], id: o.id || 'grad' }));
    }
  }
  out.reverse();   // FG.clip and FG.face stack the first item on top, so hand back the highlights first
  return out;
};

// A photograph that has not been supplied yet.
FG.photo = function (page, layer, x, y, w, h, label) {
  var out = [FG.rect(page, layer, x, y, w, h, null)];
  out[0].filled = true; out[0].fillColor = FG.rgb(52, 56, 68);
  var d1 = FG.poly(page, layer, [[x, y], [x + w, y + h]], null, { open: true, stroke: FG.rgb(92, 96, 110), strokeW: 0.5 });
  var d2 = FG.poly(page, layer, [[x + w, y], [x, y + h]], null, { open: true, stroke: FG.rgb(92, 96, 110), strokeW: 0.5 });
  out.push(d1); out.push(d2);
  if (label) { var t = FG.text(page, layer, x + 8, y + 14, ('PHOTO / ' + label).toUpperCase(), 'M', 6.5, 'Cream', { track: 100 }); out.push(t); }
  return out;
};
