// Packaging pieces at real size, in the print master. Load after bk2bar.jsx. Y.kit() builds all.
// Each piece has its own artboard and a spread key s70 and up. Coordinates in mm from the piece's top-left.

Y.K = [
  // key, name, w, h, x (pt), y (pt)
  [70, 'K01_Box_Lid_400x300', 400, 300, 0, -5200],
  [71, 'K02_Box_Inside_Lid_400x300', 400, 300, 1240, -5200],
  [72, 'K03_Hello_Card_A5_210x148', 210, 148, 2480, -5200],
  [73, 'K04_Bag_Face_470x320', 470, 320, 0, -6160],
  [74, 'K05_Note_A6_148x105', 148, 105, 1180, -3720],
  [75, 'K06_Card_Brands_A6_105x148', 105, 148, 1700, -3720],
  [76, 'K07_Card_Creators_A6_105x148', 105, 148, 2100, -3720],
  [77, 'K08_Contact_Card_85x55', 85, 55, 2500, -3720],
  [82, 'K09_Booklet_Band_326x28', 326, 28, 0, -4640],
  [83, 'K10_Back_Card_Brands_105x148', 105, 148, 1950, -4240],
  [84, 'K11_Back_Card_Creators_105x148', 105, 148, 2330, -4240],
  [85, 'K12_Back_Note_148x105', 148, 105, 2710, -4240],
  [86, 'K13_Back_Contact_Card_85x55', 85, 55, 2710, -4580]
];
Y.KO = {};
(function () { var i; for (i = 0; i < Y.K.length; i++) Y.KO[Y.K[i][0]] = Y.K[i]; })();
if (!Y.bookOrigin) Y.bookOrigin = B.originOf;
B.originOf = function (s) { return Y.KO[s] ? [Y.KO[s][4], Y.KO[s][5]] : Y.bookOrigin(s); };

Y.board = function (k) {
  var d = FG.doc, r = [k[4], k[5], k[4] + k[2] * B.MM, k[5] - k[3] * B.MM], ab;
  try { ab = d.artboards.getByName(k[1]); } catch (e) { ab = d.artboards.add(r); ab.name = k[1]; }
  ab.artboardRect = r;
};
// Drop piece artboards that are no longer in the list.
Y.prune = function () {
  var d = FG.doc, i, j, keep, n = 0;
  for (i = d.artboards.length - 1; i >= 0; i--) {
    if (!/^K\d\d_/.test(d.artboards[i].name)) continue;
    keep = false; for (j = 0; j < Y.K.length; j++) if (Y.K[j][1] === d.artboards[i].name) keep = true;
    if (!keep) { d.artboards[i].remove(); n++; }
  }
  return n;
};
// Put the piece artboards back in list order (Illustrator can only append).
Y.reorder = function () {
  var d = FG.doc, i;
  for (i = d.artboards.length - 1; i >= 0; i--) if (/^K\d\d_/.test(d.artboards[i].name)) d.artboards[i].remove();
  for (i = 0; i < Y.K.length; i++) Y.board(Y.K[i]);
  return d.artboards.length;
};
Y.kground = function (s, col) { var k = Y.KO[s]; return B.r(s, -3, -3, k[2] + 6, k[3] + 6, col); };
Y.wmBL = function (s, x, bottom, w, col) {
  var it = B.wm(s, x, 0, w, col), g = FG.org(B.key(s)), b = it.geometricBounds;
  it.translate(g[0] + x * B.MM - b[0], (g[1] - bottom * B.MM) - b[3]);
  return it;
};
Y.kline = function (s, route, sw, o) {
  o = o || {};
  var c = Y.KO[s], key = B.key(s), b = 3;
  var p = Y.tube('Mark', Y.route(key, route), sw, o.from || 0, (o.to === undefined) ? 1 : o.to);
  return FG.clip(key, 'Mark', [p], -b * B.MM, -b * B.MM, (c[2] + 2 * b) * B.MM, (c[3] + 2 * b) * B.MM, { id: 'line' });
};

// ---------- Patterns. Six, each from a brand shape: the arc, the tag, the line.
// kind: arcs, hills, tags, loops, turns, words. x, y, w, h in mm; c is the cell size in mm; fg and bg are colour names.
Y.pat = function (s, kind, x, y, w, h, c, fg, bg, seed) {
  var key = B.key(s), g = FG.org(key), L = FG.lay('Mark'), items = [], i, j, it, M = B.MM;
  function rnd() { seed = ((seed || 7) * 9301 + 49297) % 233280; return seed / 233280; }
  function X(v) { return g[0] + v * M; } function Yy(v) { return g[1] - v * M; }
  function disc(cx, cy, d, col) { var e = L.pathItems.ellipse(Yy(cy - d / 2), X(cx - d / 2), d * M, d * M); e.stroked = false; e.filled = true; e.fillColor = FG.col(col); items.push(e); return e; }
  function line(pts, sw, cap) { var p = L.pathItems.add(), q = [], k; for (k = 0; k < pts.length; k++) q.push([X(pts[k][0]), Yy(pts[k][1])]); p.setEntirePath(q); p.filled = false; p.stroked = true; p.strokeWidth = sw * M; p.strokeColor = FG.col(fg); if (Y.FGX) { var c3 = Y.FGX((pts[0][0] + pts[pts.length - 1][0]) / 2); p.strokeColor = FG.rgb(c3[0], c3[1], c3[2]); } p.strokeCap = cap || StrokeCap.BUTTENDCAP; p.strokeJoin = StrokeJoin.ROUNDENDJOIN; items.push(p); return p; }
  var nx = Math.ceil(w / c) + 2, ny = Math.ceil(h / c) + 2;
  function poly(pts, col) { var p = L.pathItems.add(), q = [], k; for (k = 0; k < pts.length; k++) q.push([X(pts[k][0]), Yy(pts[k][1])]); p.setEntirePath(q); p.closed = true; p.stroked = false; p.filled = true; p.fillColor = FG.col(col); items.push(p); return p; }
  if (kind === 'arcs') {
    // The arc as G12 draws it: a circle wider than its cell, rising from the bottom edge. Cells swap colours like a check.
    var ch = c * 4 / 3, R = c * 0.8, po = Y.PO || 0, N = 48, a, dx, odd, pts2;
    for (j = -1; j < Math.ceil(h / ch) + 1; j++) for (i = -1; i < nx; i++) {
      var ax = x + po + i * c, ay = y + po + j * ch; odd = ((i + j) % 2 !== 0);
      // shapes run 0.2 mm into the cell below, so no hairline opens between rows
      if (odd) poly([[ax, ay], [ax + c, ay], [ax + c, ay + ch + 0.2], [ax, ay + ch + 0.2]], fg);
      pts2 = [[ax, ay + ch + 0.2]];
      for (a = 0; a <= N; a++) { dx = -c / 2 + c * a / N; pts2.push([ax + c / 2 + dx, ay + ch * 0.5 + R - Math.sqrt(R * R - dx * dx)]); }
      pts2.push([ax + c, ay + ch + 0.2]);
      poly(pts2, odd ? bg : fg);
    }
  } else if (kind === 'hills') {
    // Rows of the same arc, shallow, each row rising over the one behind.
    var rp = c * 0.5, D = c * 1.5, row = 0;
    for (j = -4; j < Math.ceil(h / rp) + 2; j++) { row++;
      for (i = -1; i < nx + 1; i++) disc(x + (Y.PO || 0) + i * c + ((j % 2) ? c / 2 : 0), y + (Y.PO || 0) + j * rp + D / 2, D, (j % 2) ? fg : bg);
    }
  } else if (kind === 'tags') {
    for (j = -1; j < ny * 1.4; j++) for (i = -1; i < nx; i++) {
      var tx = x + i * c * 2.7 + ((j % 2) ? c * 1.35 : 0), ty = y + j * c * 1.3;
      it = L.pathItems.roundedRectangle(Yy(ty), X(tx), c * 1.9 * M, c * 0.62 * M, c * 0.31 * M, c * 0.31 * M); it.stroked = false; it.filled = true; it.fillColor = FG.col(fg); it.rotate(16); items.push(it);
    }
  } else if (kind === 'loops') {
    for (j = 0; j < ny + 1; j++) {
      var ly = (y + (j + 0.75) * c * 1.5) * M, n = Math.max(1, Math.round(w / (c * 1.15))), off = (j % 2) ? -c * 0.5 : 0;
      var pts = FG.track([[(x - c + off) * M, ly], [(x + off) * M, ly], { to: [(x + w + off + c * 0.4) * M, ly], loops: n, r: c * 0.42 * M, side: 1, env: false }, [(x + w + c + off) * M, ly]]), q = [], step = Math.max(1, Math.ceil(pts.length / 600)), k;
      for (k = 0; k < pts.length; k += step) q.push([pts[k][0] / M, pts[k][1] / M]);
      line(q, c * 0.2, StrokeCap.ROUNDENDCAP);
    }
  } else if (kind === 'turns') {
    for (j = 0; j < ny; j++) for (i = 0; i < nx; i++) {
      var x0 = x + i * c, y0 = y + j * c, flip = rnd() < 0.5, a, t, p1 = [], p2 = [], N = 10, R = c / 2;
      for (a = 0; a <= N; a++) { t = -0.03 + (a / N) * (Math.PI / 2 + 0.06);
        if (flip) { p1.push([x0 + R * Math.cos(t), y0 + R * Math.sin(t)]); p2.push([x0 + c - R * Math.cos(t), y0 + c - R * Math.sin(t)]); }
        else { p1.push([x0 + c - R * Math.cos(t), y0 + R * Math.sin(t)]); p2.push([x0 + R * Math.cos(t), y0 + c - R * Math.sin(t)]); } }
      line(p1, c * 0.36); line(p2, c * 0.36);
    }
  } else if (kind === 'words') {
    var W = ['PAID', 'BARTER', 'CASHBACK', 'PRODUCTION'], size = c * 0.74 * M / Y.capr('Obviously-NarwBlck') * 100 / 100, str;
    size = 100 * c * 0.74 * M / Y.capr('Obviously-NarwBlck');
    for (j = -1; j < ny + 1; j++) {
      str = ''; for (i = 0; i < 10; i++) str += W[(i + j + 4) % 4] + '   ';
      it = B.t(s, x - rnd() * c * 3, y + (Y.PO || 0) + (j + 0.87) * c, str, 'Obviously-NarwBlck', size, fg, {}); items.push(it);
    }
  }
  items.reverse();
  // Y.CLIP, when set, clips tighter than the drawn grid (which may start outside the piece)
  var cr = Y.CLIP || [x, y, w, h];
  return FG.clip(key, 'Mark', items, cr[0] * M, cr[1] * M, cr[2] * M, cr[3] * M, { id: 'pattern' });
};
Y.PAT = { arcs: ['Rose', 'Burgundy'], tags: ['Lilac', 'Forest'], loops: ['Peach', 'Cobalt'], turns: ['Sky', 'Tomato'], hills: ['Ink', 'Mustard'], words: ['Lime', 'Ink'] };
// A whole piece covered in one pattern, to the bleed.
Y.back = function (s, kind, c, seed) {
  var k = Y.KO[s], p = Y.PAT[kind];
  Y.kground(s, p[1]);
  Y.PO = 3; var r = Y.pat(s, kind, -3, -3, k[2] + 6, k[3] + 6, c, p[0], p[1], seed); Y.PO = 0;
  return r;
};

// One pattern for the whole kit: Turns, in an array of brand colours (Zain, 2026-10-13: one pattern, "an array of colors").
Y.TURNS = { lime: ['Lime', 'Ink'], black: ['Coal', 'Ink'], violet: ['Lilac', 'Violet'], forest: ['Lime', 'Forest'], tomato: ['Ink', 'Tomato'] };
// A whole piece in Turns. The grid starts on the trim edge so edges meet when pieces sit side by side or wrap.
Y.turns = function (s, way, c, seed) {
  var k = Y.KO[s], p = Y.TURNS[way];
  Y.spot('Coal', 30, 34, 45);
  Y.kground(s, p[1]);
  Y.CLIP = [-3, -3, k[2] + 6, k[3] + 6]; var r = Y.pat(s, 'turns', -c, -c, k[2] + 2 * c, k[3] + 2 * c, c, p[0], p[1], seed); Y.CLIP = null;
  return r;
};

Y.tagline = function (s, x, y, col, cap, align) {
  var t = B.t(s, x, y, 'BUILDING THE FUTURE OF INFLUENCER MARKETING', Y.TM, cap * B.MM / 0.72, col, { track: 120, align: align });
  t.opacity = 82; return t;
};
// Outside face: wordmark the full width between margins, tagline small at top left. Nothing else.
Y.outside = function (s) {
  // Centred lockup: white wordmark, the tagline centred under it. Box black, bag forest.
  var k = Y.KO[s], W = k[2], H = k[3], bag = /Bag/.test(k[1]), ww = W * 0.5, cap = W * 0.0066, g = FG.org(B.key(s)), it, b, wh, t;
  Y.kground(s, bag ? 'Forest' : 'Ink');
  it = B.wm(s, 0, 0, ww, 'White'); b = it.geometricBounds; wh = (b[1] - b[3]) / B.MM;
  // wordmark and tagline centred as one block, a touch above the middle
  var gap = wh * 0.42, top = (H - (wh + gap + cap)) / 2 - H * 0.015;
  it.translate(g[0] + (W - ww) / 2 * B.MM - b[0], (g[1] - top * B.MM) - b[1]);
  t = B.t(s, W / 2, top + wh + gap + cap, 'BUILDING THE FUTURE OF INFLUENCER MARKETING', Y.TM, cap * B.MM / 0.72, 'White', { track: 260, align: 'c' });
  t.opacity = 85;
};
Y.QR = '1111111001101010101111111|1000001011100000101000001|1011101000001100001011101|1011101011101100101011101|1011101010110010101011101|1000001001100000101000001|1111111010101010101111111|0000000011000101100000000|0101111011100010111011010|0100110110100011000111110|1110111010111001100001001|0100000111000010100101111|1010101101100110101100001|1111000011100111100010010|1110101000010001010011111|1000100011110011001101101|1010011101110101111110110|0000000011010011100010110|1111111000010100101010001|1000001010111101100010001|1011101011101001111110011|1011101011110011011000011|1011101001010010110011111|1000001010001000000110111|1111111000111010111001001';
Y.qr = function (s, x, y, size) {
  var rows = Y.QR.split('|'), n = rows.length, q = size / (n + 4), i, j, a, key = B.key(s), g = FG.org(key), L = FG.lay('Mark');
  B.r(s, x, y, size, size, 'White', { layer: 'Mark' });
  var cp = L.compoundPathItems.add();
  for (i = 0; i < n; i++) {
    j = 0;
    while (j < n) {
      if (rows[i].charAt(j) === '1') { a = j; while (j < n && rows[i].charAt(j) === '1') j++;
        var r = cp.pathItems.rectangle(g[1] - (y + (i + 2) * q) * B.MM, g[0] + (x + (a + 2) * q) * B.MM, (j - a) * q * B.MM, q * B.MM); r.stroked = false; r.filled = true; r.fillColor = FG.col('Ink');
      } else j++;
    }
  }
  FG.tag(cp, key, 'qr');
};
Y.card = function (s, label, lines, list, ground, ink) {
  var k = Y.KO[s], W = k[2], H = k[3], i;
  Y.kground(s, ground);
  Y.lab(s, 9, 12.4, label, ink);
  var st = Y.stack(s, 9, 20, W - 18, 50, lines, ink, { gap: 3 });
  for (i = 0; i < list.length; i++) Y.set(s, 9, st.bottom + 12 + i * 7.4, list[i], Y.SUB, 15, ink, 0);
  Y.wmBL(s, 9, H - 9, 34, 'White');
  Y.qr(s, W - 9 - 24, H - 9 - 24, 24);
};
Y.tag = function (s, words) {
  Y.kground(s, 'Ink');
  Y.stack(s, 6, 20, 33, 62, words, 'White', { gap: 2.6, bottom: true });
};
// The seal: a round 40 mm sticker. Lime, ink wordmark. Magenta hairline is the cut line, in a spot colour named CutContour.
Y.seal = function (s) {
  var key = B.key(s), g = FG.org(key), d = FG.doc, sp, c, sc, r;
  B.dot(s, 20, 20, 46, 'Lime');
  var wm = B.wm(s, 0, 0, 27, 'Ink'), b = wm.geometricBounds;
  wm.translate(g[0] + 20 * B.MM - (b[0] + b[2]) / 2, g[1] - 20.6 * B.MM - (b[1] + b[3]) / 2);
  try { sp = d.spots.getByName('CutContour'); } catch (e) { sp = d.spots.add(); sp.name = 'CutContour'; sp.colorType = ColorModel.SPOT; c = new RGBColor(); c.red = 236; c.green = 0; c.blue = 140; sp.color = c; }
  sc = new SpotColor(); sc.spot = sp; sc.tint = 100;
  r = FG.lay('Notes').pathItems.ellipse(g[1], g[0], 40 * B.MM, 40 * B.MM); r.filled = false; r.stroked = true; r.strokeWidth = 0.25; r.strokeColor = sc;
  FG.tag(r, key, 'cut');
};

// The store badges are black; on a black bag they need a hairline edge.
Y.badgeEdge = function (grp) {
  var i, p, b, gb;
  for (i = 0; i < grp.pathItems.length; i++) { p = grp.pathItems[i]; b = p.geometricBounds; gb = p.parent.geometricBounds; if (Math.abs((b[2] - b[0]) - (gb[2] - gb[0])) < 1) { p.stroked = true; p.strokeWidth = 0.5; p.strokeColor = FG.rgb(150, 154, 165); } }
};

Y.PIECES = {
  70: function (s) { Y.outside(s); },
  // inside the lid: Turns, black on black (Zain's pick, 2026-10-13). Coal is a charcoal just above Ink.
  71: function (s) { Y.turns(s, 'black', 33.333, 4); },
  72: function (s) {
    Y.kground(s, 'Ink');
    Y.CLIP = [137, -3, 76, 154]; Y.pat(s, 'turns', 137, -12.667, 89, 180, 12.667, 'Lime', 'Ink', 3); Y.CLIP = null;
    Y.stack(s, 16, 16, 96, 28, ['HELLO,'], 'White');
    B.rule(s, 16, 79, 108, 79, 'White', 0.5);
    Y.set(s, 16, 128, 'A few things we thought', Y.SUB, 14, 'White', 0); Y.set(s, 16, 133.8, 'you would like.', Y.SUB, 14, 'White', 0);
  },
  // Bag face: Zain's own artwork, copied unchanged from 'Following Packaging.ai' (Desktop), artboard 'Bag Front', 470 x 320 mm.
  // That file must be open. The print PDF for the bag is exported from his file directly, in its own CMYK.
  73: function (s) {
    var key = B.key(s), g = FG.org(key), src = null, i, L, it, b, d2, picks = [], bl = 3 * B.MM;
    for (i = 0; i < app.documents.length; i++) if (app.documents[i].name.indexOf('Following Packaging') === 0) src = app.documents[i];
    if (!src) throw new Error('open Following Packaging.ai first');
    L = src.layers[0];
    for (i = L.pageItems.length - 1; i >= 0; i--) { it = L.pageItems[i]; if (it.parent !== L) continue; b = it.geometricBounds; if (b[0] >= -2 && b[2] <= 1339 && b[1] <= 2 && b[3] >= -914) picks.push(it); }
    for (i = 0; i < picks.length; i++) {
      b = picks[i].geometricBounds; d2 = picks[i].duplicate(FG.lay('Mark'), ElementPlacement.PLACEATBEGINNING);
      d2.position = [g[0] + b[0], g[1] + b[1]];
      if (picks[i].typename === 'PathItem' && b[2] - b[0] > 1300) { d2.top = d2.top + bl; d2.left = d2.left - bl; d2.width = d2.width + 2 * bl; d2.height = d2.height + 2 * bl; }
      FG.tag(d2, key, 'bag');
    }
  },
  74: function (s) { Y.kground(s, 'Ink'); Y.stack(s, 12, 14, 124, 30, ['WITH THANKS'], 'White'); Y.kline(s, [[-6, 78], [30, 77], { to: [92, 74], loops: 2, r: 13 }, [120, 78], [156, 77]], 11); },
  75: function (s) { Y.card(s, 'For brands', ['CAMPAIGNS', 'THAT', 'PERFORM.'], ['Paid', 'Barter', 'Cashback', 'Production'], 'Violet', 'Lilac'); },
  76: function (s) { Y.card(s, 'For creators', ['GET PAID', 'TO POST.'], ['Paid collabs', 'Barter deals', 'Cashback'], 'Forest', 'Lime'); },
  77: function (s) {
    Y.kground(s, 'Tomato');
    Y.lab(s, 7, 10, 'Talk to us', 'Ink');
    Y.set(s, 7, 24, 'hello@following.ae', Y.SUB, 17, 'Ink', 0);
    B.t(s, 7, 31.4, 'following.ae', Y.T, 7.4, 'Ink', {}); B.t(s, 7, 36.4, '@followingsocials', Y.T, 7.4, 'Ink', {});
    Y.wmBL(s, 7, 49, 20, 'Ink'); B.t(s, 78, 48.4, 'Dubai, United Arab Emirates', Y.T, 5.6, 'Ink', { align: 'r' });
  },
  // band for the A6 booklet: 148 + 5 + 148 + 5 round the book, 20 overlap
  // the band: Turns on black, the line's five colours running along it and back again so the ends match where they overlap
  82: function (s) { Y.FGX = function (x) { var f = ((x % 306) + 306) % 306 / 306; return FG.gradAt(1 - Math.abs(2 * f - 1)); }; var r = Y.turns(s, 'lime', 306 / 22, 6); Y.FGX = null; return r; },
  83: function (s) { Y.turns(s, 'violet', 17.5, 1); },
  84: function (s) { Y.turns(s, 'forest', 17.5, 2); },
  // the note is written by hand: two thirds plain Cream for the pen, Turns on the right third, like the top sheet
  85: function (s) { Y.kground(s, 'Cream'); B.r(s, 96, -3, 55, 111, 'Violet'); Y.CLIP = [96, -3, 55, 111]; Y.pat(s, 'turns', 96, -17.5, 70, 140, 17.5, 'Lilac', 'Violet', 9); Y.CLIP = null; },
  86: function (s) { Y.turns(s, 'tomato', 17, 5); }
};
// Build pieces one at a time. list is an array of keys; default all.
Y.kit = function (list) {
  var i, s, out = [];
  Y.spots(); Y.spots2();
  if (!list) { list = []; for (i = 0; i < Y.K.length; i++) list.push(Y.K[i][0]); out.push('pruned ' + Y.prune()); }
  for (i = 0; i < list.length; i++) {
    s = list[i]; Y.board(Y.KO[s]);
    try { B.clear(s); Y.PIECES[s](s); app.redraw(); } catch (e) { out.push('s' + s + ' ' + e + ' @' + e.line); }
  }
  return out.join(' | ') || 'kit ok';
};
Y.kshots = function (list) {
  var dir = XD + 'bk2/', i, k, o, f = new Folder(dir); if (!f.exists) f.create();
  list = list || Y.K;
  for (i = 0; i < list.length; i++) {
    k = list[i]; o = new ImageCaptureOptions(); o.resolution = (k[2] > 200 ? 72 : 150); o.antiAliasing = true; o.matte = true; o.matteColor = FG.rgb(255, 255, 255);
    FG.doc.imageCapture(new File(dir + k[1] + '.png'), [k[4], k[5], k[4] + k[2] * B.MM, k[5] - k[3] * B.MM], o);
  }
};
