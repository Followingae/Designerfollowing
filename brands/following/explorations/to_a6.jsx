// Booklet from A7 to A6 landscape. The book is built at 105 x 74 by bk2.jsx, then enlarged here: run once after Y.build and Y.cover.
// Everything scales by 105/74 about the document origin, so spreads keep their gaps. Pages are then cut to 148 wide from the spine.
// The cover scales about the middle of its spine; the two panels close in so the spine stays 5 mm.
var A6 = { K: 105 / 74, MM: 2.834645, LAYERS: ['Notes', 'Type', 'Mark', 'Image', 'Ground'] };
A6.items = function (test) {
  var out = [], i, j, its, n;
  for (i = 0; i < A6.LAYERS.length; i++) {
    its = FG.lay(A6.LAYERS[i]).pageItems;
    for (j = 0; j < its.length; j++) {
      if (its[j].parent.typename !== 'Layer') continue;
      n = /^s(\d+):/.exec(its[j].name);
      if (n && test(parseInt(n[1], 10))) out.push(its[j]);
    }
  }
  return out;
};
A6.grow = function (it, ox, oy) {
  var k = A6.K, p = it.position;
  it.resize(k * 100, k * 100, true, true, true, true, k * 100, Transformation.TOPLEFT);
  it.position = [ox + (p[0] - ox) * k, oy + (p[1] - oy) * k];
};
// Spreads a to b (0 to 28).
A6.pages = function (a, b) {
  var its = A6.items(function (n) { return n >= a && n <= b; }), i, d = FG.doc, s, g, spine, top, ab, w = 148 * A6.MM, h = 105 * A6.MM;
  for (i = 0; i < its.length; i++) A6.grow(its[i], 0, 0);
  for (s = a; s <= b; s++) {
    g = Y.bookOrigin(s); spine = (g[0] + 105 * A6.MM) * A6.K; top = g[1] * A6.K;
    if (s > 0) { ab = d.artboards.getByName('p' + ('00' + (2 * s)).slice(-3)); ab.artboardRect = [spine - w, top, spine, top - h]; }
    if (s < 28) { ab = d.artboards.getByName('p' + ('00' + (2 * s + 1)).slice(-3)); ab.artboardRect = [spine, top, spine + w, top - h]; }
  }
  return its.length;
};
// Cover: key s40. New board 301 x 105 with its top at y (pt).
A6.cover = function (y) {
  var its = A6.items(function (n) { return n === 40; }), i, g = Y.bookOrigin(40), cx = g[0] + 107.5 * A6.MM, b, mid, dx = (2.5 * A6.K - 2.5) * A6.MM, dy = y - g[1];
  for (i = 0; i < its.length; i++) {
    A6.grow(its[i], cx, g[1]);
    b = its[i].geometricBounds; mid = (b[0] + b[2]) / 2;
    if (b[2] - b[0] > 200 * A6.MM) its[i].translate(0, dy);               // the ground
    else if (b[0] > cx + 2) its[i].translate(-dx, dy);                      // front panel
    else if (b[2] < cx - 2) its[i].translate(dx, dy);                       // back panel
    else its[i].translate(0, dy);                                           // spine
  }
  FG.doc.artboards.getByName('cover_back_spine_front').artboardRect = [cx - 150.5 * A6.MM, y, cx + 150.5 * A6.MM, y - 105 * A6.MM];
  return its.length;
};
// Preview of spread s (or 'cover') to PNG.
A6.png = function (s, path, dpi) {
  var d = FG.doc, r, r2, o = new ImageCaptureOptions();
  o.resolution = dpi || 150; o.antiAliasing = true; o.matte = true; o.matteColor = FG.rgb(255, 255, 255);
  if (s === 'cover') r = d.artboards.getByName('cover_back_spine_front').artboardRect;
  else {
    r = d.artboards.getByName('p' + ('00' + (s > 0 ? 2 * s : 1)).slice(-3)).artboardRect;
    if (s > 0 && s < 28) { r2 = d.artboards.getByName('p' + ('00' + (2 * s + 1)).slice(-3)).artboardRect; r = [r[0], r[1], r2[2], r[3]]; }
  }
  d.imageCapture(new File(path), r, o);
};
