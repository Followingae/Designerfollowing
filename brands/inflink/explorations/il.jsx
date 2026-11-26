// Inflink guidelines helpers. Page-local coordinates: origin top-left of the artboard, y grows downward.
var IL = {};
IL.ROOT = 'C:/Users/user/Desktop/DesignerFollowing/brands/inflink/';
IL.A = IL.ROOT + 'final/assets/';
IL.FILE = IL.ROOT + 'final/Inflink_Brand_Guidelines.ai';
IL.W = 1920; IL.H = 1080; IL.M = 72;
IL.PAL = { Ink: '16151C', Night: '0E0D14', Canvas: 'FAFAF7', White: 'FFFFFF', Violet: '6D5EF8', Deep: '1C1840', Lilac: 'C9C3FF', Mist: 'ECE9FF', Peach: 'FF8F6B', Blush: 'FFD3E0', Coral: 'FF6B6B', Electric: '3B4BFF', Soft: '5F5D68', Mid: '3A3842', Sand: 'F2F1EC', Sand2: 'E6E4DD', V600: '5A49E8', V700: '4E3ED6', V900: '2A2272', Ok: '1F7A4D' };
IL.F = { M: 'UrbanistRoman-Medium', R: 'Urbanist-Regular', S: 'UrbanistRoman-SemiBold', B: 'UrbanistRoman-Bold', L: 'UrbanistRoman-Light' };
// section title by chapter, set per script
IL.sec = '';

IL.open = function () {
  var i;
  for (i = 0; i < app.documents.length; i++) if (app.documents[i].name === 'Inflink_Brand_Guidelines.ai') { IL.doc = app.documents[i]; IL.doc.activate(); IL.boot(); return; }
  var f = new File(IL.FILE);
  if (f.exists) { IL.doc = app.open(f); IL.boot(); return; }
  IL.doc = app.documents.add(DocumentColorSpace.RGB, IL.W, IL.H);
  IL.doc.artboards[0].name = '_start';
  IL.boot();
  IL.doc.saveAs(f);
};
IL.boot = function () {
  var d = IL.doc, k;
  for (k in IL.PAL) { var n = 'Inflink / ' + k; try { d.spots.getByName(n); } catch (e) { var s = d.spots.add(); s.name = n; s.colorType = ColorModel.PROCESS; s.color = IL.rgb(IL.PAL[k]); } }
  var names = ['Notes', 'Type', 'Mark', 'Image', 'Ground'];
  // layers: Notes on top, Ground at the back
  for (var i = names.length - 1; i >= 0; i--) { try { d.layers.getByName(names[i]); } catch (e2) { var l = d.layers.add(); l.name = names[i]; l.move(d, ElementPlacement.PLACEATBEGINNING); } }
};
IL.rgb = function (h) { var c = new RGBColor(); c.red = parseInt(h.substr(0, 2), 16); c.green = parseInt(h.substr(2, 2), 16); c.blue = parseInt(h.substr(4, 2), 16); return c; };
IL.col = function (n) { if (n.length === 6 && !IL.PAL[n]) return IL.rgb(n); var s = new SpotColor(); s.spot = IL.doc.spots.getByName('Inflink / ' + n); s.tint = 100; return s; };
IL.lay = function (n) { var l = IL.doc.layers.getByName(n); IL.doc.activeLayer = l; return l; };

// ---------- pages ----------
IL.SLOT = function (i) { if (i >= 70) return [-7000 + (i - 70) * (IL.W + 120), 5200 + IL.H + 120]; /* canvas ends below row 10: resources sit in a row above the cover */ var c = i % 7, r = Math.floor(i / 7); return [-7000 + c * (IL.W + 120), 5200 - r * (IL.H + 120)]; };
IL.page = function (name, ground, ink) {
  var d = IL.doc, ab, i, idx = -1;
  for (i = 0; i < d.artboards.length; i++) if (d.artboards[i].name === name) idx = i;
  if (idx >= 0) { IL.clear(name); ab = d.artboards[idx]; }
  else {
    var n = d.artboards.length; var slotIdx = (d.artboards[0].name === '_start') ? 0 : n;
    var o = IL.SLOT(slotIdx), rect = [o[0], o[1], o[0] + IL.W, o[1] - IL.H];
    if (d.artboards[0].name === '_start') { ab = d.artboards[0]; ab.artboardRect = rect; ab.name = name; }
    else { ab = d.artboards.add(rect); ab.name = name; }
  }
  IL.cur = name; IL.org = [ab.artboardRect[0], ab.artboardRect[1]];
  IL.rect(0, 0, IL.W, IL.H, ground || 'Canvas', { lay: 'Ground' });
  IL.ink = ink || 'Ink';
  return ab;
};
IL.clear = function (name) {
  var d = IL.doc, i, j;
  for (i = 0; i < d.layers.length; i++) { var L = d.layers[i]; for (j = L.pageItems.length - 1; j >= 0; j--) if (L.pageItems[j].note === name) L.pageItems[j].remove(); }
  // embedded pictures lose their note, so loose rasters are matched by position on the page
  var r = d.artboards.getByName(name).artboardRect;
  for (i = d.rasterItems.length - 1; i >= 0; i--) {
    var ra = d.rasterItems[i]; if (ra.parent.typename !== 'Layer') continue;
    var b = ra.geometricBounds, cx = (b[0] + b[2]) / 2, top = b[1];
    if (cx > r[0] && cx < r[2] && top <= r[1] + 1300 && b[3] < r[1] && top > r[3]) ra.remove();
    else if (cx > r[0] && cx < r[2] && b[3] < r[1] && b[1] > r[3]) ra.remove();
  }
};
IL.tag = function (it) { it.note = IL.cur; return it; };
// running head: section left, folio right
IL.head = function (sec, folio) {
  var c = IL.ink === 'White' ? 'White' : 'Soft';
  IL.T(IL.M, 64, sec, 22, c, { w: 'M', lay: 'Notes' });
  IL.T(IL.W - IL.M, 64, folio, 22, c, { w: 'M', align: 'r', lay: 'Notes' });
};

// ---------- shapes ----------
IL.paint = function (it, fill, stroke, sw, op) {
  if (fill) { it.filled = true; it.fillColor = IL.col(fill); } else it.filled = false;
  if (stroke) { it.stroked = true; it.strokeColor = IL.col(stroke); it.strokeWidth = sw || 1; } else it.stroked = false;
  if (op !== undefined) it.opacity = op;
  return it;
};
IL.rect = function (x, y, w, h, fill, o) {
  o = o || {};
  var L = IL.lay(o.lay || 'Mark'), g = IL.org;
  var it = o.r ? L.pathItems.roundedRectangle(g[1] - y, g[0] + x, w, h, o.r, o.r) : L.pathItems.rectangle(g[1] - y, g[0] + x, w, h);
  IL.paint(it, fill, o.stroke, o.sw, o.op);
  if (o.rot) it.rotate(o.rot);
  return IL.tag(it);
};
IL.circ = function (cx, cy, r, fill, o) {
  o = o || {};
  var L = IL.lay(o.lay || 'Mark'), g = IL.org;
  var it = L.pathItems.ellipse(g[1] - cy + r, g[0] + cx - r, r * 2, r * 2);
  IL.paint(it, fill, o.stroke, o.sw, o.op);
  return IL.tag(it);
};
IL.line = function (x1, y1, x2, y2, col, sw, o) {
  o = o || {};
  var it = IL.lay(o.lay || 'Mark').pathItems.add(), g = IL.org;
  it.setEntirePath([[g[0] + x1, g[1] - y1], [g[0] + x2, g[1] - y2]]);
  it.filled = false; it.stroked = true; it.strokeColor = IL.col(col); it.strokeWidth = sw || 1;
  if (o.round) it.strokeCap = StrokeCap.ROUNDENDCAP;
  if (o.dash) it.strokeDashes = o.dash;
  return IL.tag(it);
};

// ---------- type ----------
// y is the first baseline. o.w font weight key, o.box = [width, height] for area text, o.lead, o.track, o.align
IL.T = function (x, y, str, size, col, o) {
  o = o || {};
  var L = IL.lay(o.lay || 'Type'), g = IL.org, t;
  if (o.box) {
    var p = L.pathItems.rectangle(g[1] - y + size * 0.86, g[0] + x, o.box[0], o.box[1]);
    t = L.textFrames.areaText(p);
  } else t = L.textFrames.pointText([g[0] + x, g[1] - y]);
  t.contents = str;
  var ca = t.textRange.characterAttributes;
  ca.textFont = app.textFonts.getByName(IL.F[o.w || 'M']);
  ca.size = size; ca.autoLeading = false;
  ca.leading = o.lead || Math.round(size * (size > 60 ? 1.1 : 1.32));
  ca.tracking = o.track !== undefined ? o.track : (size > 60 ? -18 : 0);
  ca.fillColor = IL.col(col || IL.ink);
  ca.kerningMethod = AutoKernType.OPTICAL;
  var j = o.align === 'r' ? Justification.RIGHT : (o.align === 'c' ? Justification.CENTER : Justification.LEFT);
  for (var i = 0; i < t.paragraphs.length; i++) { t.paragraphs[i].paragraphAttributes.justification = j; t.paragraphs[i].paragraphAttributes.hyphenation = false; }
  if (o.rot) t.rotate(o.rot);
  return IL.tag(t);
};
// short caption pair: small title then one line
IL.cap = function (x, y, title, body, w, col) {
  IL.T(x, y, title, 28, col || IL.ink, { w: 'S' });
  if (body) IL.T(x, y + 40, body, 25, col === 'White' ? 'White' : (col || 'Soft'), { w: 'M', box: [w || 300, 170], lead: 33 });
};

// ---------- images ----------
// mode 'cover' clips to the box (o.r radius, o.circle), 'fit' keeps the whole picture. fx, fy: focal point 0 to 1
IL.img = function (file, x, y, w, h, o) {
  o = o || {};
  var L = IL.lay(o.lay || 'Image'), g = IL.org;
  var pi = L.placedItems.add();
  var src = new File(IL.A + (file.indexOf('/') < 0 && file !== 'following_logo.png' ? 'links/' : '') + file);
  if (!src.exists) { pi.remove(); throw new Error('missing asset ' + file); }
  pi.file = src;
  var pw = pi.width, ph = pi.height, s;
  if (o.fit) {
    s = Math.min(w / pw, h / ph);
    pi.width = pw * s; pi.height = ph * s;
    var ax = o.ax === undefined ? 0.5 : o.ax, ay = o.ay === undefined ? 0.5 : o.ay;
    pi.left = g[0] + x + (w - pi.width) * ax; pi.top = g[1] - y - (h - pi.height) * ay;
    return IL.tag(pi);
  }
  s = Math.max(w / pw, h / ph) * (o.zoom || 1);
  pi.width = pw * s; pi.height = ph * s;
  var fx = o.fx === undefined ? 0.5 : o.fx, fy = o.fy === undefined ? 0.5 : o.fy;
  pi.left = g[0] + x - (pi.width - w) * fx; pi.top = g[1] - y + (pi.height - h) * fy;
  var clip = o.circle ? L.pathItems.ellipse(g[1] - y, g[0] + x, w, h) : (o.r ? L.pathItems.roundedRectangle(g[1] - y, g[0] + x, w, h, o.r, o.r) : L.pathItems.rectangle(g[1] - y, g[0] + x, w, h));
  var grp = L.groupItems.add();
  pi.move(grp, ElementPlacement.PLACEATEND);
  clip.move(grp, ElementPlacement.PLACEATBEGINNING);
  clip.clipping = true; grp.clipped = true;
  return IL.tag(grp);
};
// vector art from assets/svg, fitted into a box
IL.svg = function (name, x, y, w, h, o) {
  o = o || {};
  var L = IL.lay(o.lay || 'Mark'), g = IL.org;
  var it = L.groupItems.createFromFile(new File(IL.A + 'svg/' + name + '.svg'));
  var s = Math.min(w / it.width, h / it.height);
  if (o.cover) s = Math.max(w / it.width, h / it.height);
  it.resize(s * 100, s * 100, true, true, true, true, 100, Transformation.TOPLEFT);
  // some imports report a stale size on the first resize: correct until it matches
  var want = Math.min(w, o.cover ? 1e9 : w), tw = it.width * 0 + (o.cover ? it.width : Math.min(w, h * it.width / it.height));
  for (var tries = 0; tries < 3 && !o.cover; tries++) { var goal = Math.min(w / it.width, h / it.height); if (Math.abs(goal - 1) < 0.01) break; it.resize(goal * 100, goal * 100, true, true, true, true, 100, Transformation.TOPLEFT); }
  it.left = g[0] + x + (w - it.width) * (o.ax === undefined ? 0 : o.ax);
  it.top = g[1] - y - (h - it.height) * (o.ay === undefined ? 0 : o.ay);
  if (o.op !== undefined) it.opacity = o.op;
  if (o.clip) {
    var c = o.circle ? L.pathItems.ellipse(g[1] - y, g[0] + x, w, h) : L.pathItems.roundedRectangle(g[1] - y, g[0] + x, w, h, o.clip, o.clip);
    var grp = L.groupItems.add(); it.move(grp, ElementPlacement.PLACEATEND); c.move(grp, ElementPlacement.PLACEATBEGINNING); c.clipping = true; grp.clipped = true; return IL.tag(grp);
  }
  return IL.tag(it);
};

// a real app screen in a plain phone, fitted to a box and sitting on its foot
IL.phone = function (file, x, y, w, h, o) {
  var ph = Math.min(h, w * 2400 / 1080), pw = ph * 1080 / 2400, px = x + (w - pw) / 2, py = y + h - ph, b = pw * .035;
  IL.rect(px - b, py - b, pw + 2 * b, ph + 2 * b, 'Ink', { r: pw * .15, lay: 'Mark' });
  IL.img('native_' + file + '.png', px, py, pw, ph, { r: pw * .115, lay: 'Mark', fy: 0 });
};
// ---------- brand devices ----------
// logo by height of the mark; returns width
IL.logo = function (x, y, h, v) { IL.svg('logo_' + (v || 'primary'), x, y, h * 1463 / 362.82, h); return h * 1463 / 362.82; };
IL.mark = function (x, y, size, v) { IL.svg('mark_' + (v || 'primary'), x, y, size, size); };
// the two dots drawn live. cx, cy is the centre of the big dot, R its radius. proportions from the logo
IL.dots = function (cx, cy, R, a, b) {
  var k = 95.96 / 147.52, off = 119.34 / 147.52;
  IL.circ(cx, cy, R, a || 'Peach'); IL.circ(cx + R * off, cy + R * off, R * k, b || 'Violet');
};
// dot windows: pictures inside the two dots
IL.windows = function (cx, cy, R, fileA, fileB, oa, ob) {
  var k = 95.96 / 147.52, off = 119.34 / 147.52, r2 = R * k;
  oa = oa || {}; ob = ob || {}; oa.circle = true; ob.circle = true;
  IL.img(fileA, cx - R, cy - R, R * 2, R * 2, oa);
  IL.img(fileB, cx + R * off - r2, cy + R * off - r2, r2 * 2, r2 * 2, ob);
};
// the address: inflink.ae/name pill. h is pill height. style dark or light
IL.address = function (x, y, w, h, name, style) {
  var dark = style === 'dark', size = h * 0.42, r = h / 2;
  IL.rect(x, y, w, h, dark ? 'Ink' : 'White', { r: r });
  var tx = x + h * 0.52, by = y + h * 0.645;
  var t = IL.T(tx, by, 'inflink.ae/' + name, size, dark ? 'White' : 'Ink', { w: 'M', track: -6 });
  var pre = t.textRange.characters, i;
  for (i = 0; i < 11; i++) pre[i].characterAttributes.fillColor = IL.col(dark ? 'Lilac' : 'Soft');
  var d = h * 0.74, bx = x + w - h * 0.13 - d;
  IL.circ(bx + d / 2, y + h / 2, d / 2, dark ? 'White' : 'Ink');
  var ac = dark ? 'Ink' : 'White', a = d * 0.18, cx = bx + d / 2, cy = y + h / 2;
  IL.line(cx - a, cy, cx + a, cy, ac, h * 0.045, { round: true });
  IL.line(cx + a * 0.1, cy - a * 0.85, cx + a, cy, ac, h * 0.045, { round: true });
  IL.line(cx + a * 0.1, cy + a * 0.85, cx + a, cy, ac, h * 0.045, { round: true });
};
// small state chip
IL.chip = function (x, y, str, fill, col, h) {
  h = h || 44;
  var t = IL.T(x + h * 0.5, y + h * 0.66, str, h * 0.42, col || 'Ink', { w: 'S' });
  var w = t.width + h;
  var r = IL.rect(x, y, w, h, fill, { r: h / 2 }); r.move(t, ElementPlacement.PLACEAFTER);
  return w;
};
// Stage card: rounded aurora with its tone
IL.stage = function (x, y, w, h, tone, o) { o = o || {}; var tag = (w / h > 1.3) ? 'w' : ((h / w > 1.3) ? 'p' : 's'); return IL.img('aurora/' + tone + '_' + tag + '.jpg', x, y, w, h, { r: o.r === undefined ? 40 : o.r, fx: o.fx, fy: o.fy, lay: o.lay }); };
// no links in the delivered file: drop empty placeholders, embed the rest, so it opens anywhere without a missing-link alert
// export every page at half size for checking
IL.previews = function () { var fo = new Folder(IL.ROOT + 'exports/pages'); fo.create(); var d = IL.doc, o = new ExportOptionsPNG24(); o.artBoardClipping = true; o.horizontalScale = 50; o.verticalScale = 50; for (var i = 0; i < d.artboards.length; i++) { if (IL.only && !IL.only.test(d.artboards[i].name)) continue; d.artboards.setActiveArtboardIndex(i); d.exportFile(new File(fo.fsName + '/' + d.artboards[i].name + '.png'), ExportType.PNG24, o); } };
// a drawn QR-style block for layouts. Fixed pattern, not scannable: real codes come from the app
IL.qr = function (x, y, size, col) {
  col = col || 'Ink';
  var n = 21, m = size / n, r, c, seed = 7;
  function finder(cx, cy) { IL.rect(x + cx * m, y + cy * m, 7 * m, 7 * m, col, { r: m * 1.6 }); IL.rect(x + (cx + 1) * m, y + (cy + 1) * m, 5 * m, 5 * m, 'White', { r: m }); IL.rect(x + (cx + 2) * m, y + (cy + 2) * m, 3 * m, 3 * m, col, { r: m * .6 }); }
  finder(0, 0); finder(14, 0); finder(0, 14);
  for (r = 0; r < n; r++) for (c = 0; c < n; c++) {
    if ((r < 8 && c < 8) || (r < 8 && c > 12) || (r > 12 && c < 8) || (r > 7 && r < 13 && c > 7 && c < 13)) continue;
    seed = (seed * 137 + 53) % 256;
    if (seed % 5 < 2) IL.circ(x + (c + .5) * m, y + (r + .5) * m, m * .42, col);
  }
  IL.dots(x + size * .47, y + size * .47, m * 1.7);
};
IL.save = function () {
  var d = IL.doc, i;
  for (i = d.placedItems.length - 1; i >= 0; i--) {
    var p = d.placedItems[i], has = false;
    try { has = p.file && p.file.exists; } catch (e) { has = false; }
    if (has) p.embed(); else p.remove();
  }
  d.save();
};
// builds page by page and shows each finished page on screen
IL.go = function (name, ground, ink, sec, folio) {
  if (IL.cur) IL.show();
  IL.page(name, ground, ink);
  if (sec) { var n = IL.doc.artboards.getByName(name), i, idx = 0; for (i = 0; i < IL.doc.artboards.length; i++) if (IL.doc.artboards[i].name === name) idx = i; IL.head(sec, folio || ((idx + 1 < 10 ? '0' : '') + (idx + 1))); }
};
IL.show = function () { try { var v = IL.doc.views[0]; v.centerPoint = [IL.org[0] + IL.W / 2, IL.org[1] - IL.H / 2]; v.zoom = 0.42; app.redraw(); } catch (e) { } };
