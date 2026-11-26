// Three directions for the type posts (centre column), on light grounds. Built side by side for a choice.
$.evalFile(new File('C:/Users/user/Desktop/DesignerFollowing/brands/following/explorations/soc2.jsx'));
var TD = {};
TD.board = function (name, k) { var d = FG.doc, ab, x = -7400 + k * 1240, y = -6000 + 0; try { ab = d.artboards.getByName(name); } catch (e) { ab = d.artboards.add([x, 6000 - 4 * 2120 - 0, x + 1080, 6000 - 4 * 2120 - 1350]); ab.name = name; } return ab; };
TD.page = function (name, k, ground) { var d = FG.doc, ab; try { ab = d.artboards.getByName(name); } catch (e) { var x = 2520 + (k % 3) * 1240, y = 2880 - Math.floor(k / 3) * 1500; ab = d.artboards.add([x, y, x + 1080, y - 1350]); ab.name = name; } FG.clear(name); FG.rect(name, 'Ground', 0, 0, 1080, 1350, ground, { id: 'ground' }); };
TD.jk = function (p, x, y, str, key, size, col, o) { o = o || {}; return FG.text(p, 'Type', x, y, str, key, size, col, { lead: o.lead || size * 1.05, track: o.track === undefined ? -20 : o.track, align: o.align, fonts: o.fonts }); };
TD.dot = function (p, cx, cy, d, col) { var g = FG.org(p), e = FG.lay('Mark').pathItems.ellipse(g[1] - (cy - d / 2), g[0] + cx - d / 2, d, d); e.filled = true; e.fillColor = FG.col(col); e.stroked = false; return FG.tag(e, p, 'dot'); };
TD.pill = function (p, x, y, str, fill, ink) { var t = TD.jk(p, 0, 0, str, 'B', 26, ink, { track: 0 }); var b = t.geometricBounds, w = b[2] - b[0] + 44, h = 54, g = FG.org(p); FG.rect(p, 'Mark', x, y, w, h, fill, { id: 'pill', radius: 27 }); t.translate(g[0] + x + 22 - b[0], g[1] - y - 37 - (b[1] - (b[1] - b[3]) * 0) + (b[1] - b[3])); return t; };

// A: Soft editorial. Cream ground, Plus Jakarta: an ExtraBold line, then an italic line (the brand rule), lots of air. Lime as one small dot.
TD.A = function (p, k, l1, l2, cap, label) {
  TD.page(p, k, 'Cream');
  TD.jk(p, 80, 120, label, 'B', 28, 'Ink', { track: 0 }); TD.dot(p, 66, 110, 16, 'Lime');
  TD.jk(p, 80, 760, l1 + '\r' + l2, 'EB', 118, 'Ink', { lead: 116, fonts: ['EB', 'MI'], track: -30 });
  TD.jk(p, 80, 1180, cap, 'M', 30, 'Ink', { track: 0 });
  SO.wmk(p, 860, 1250, 140, 'Ink');
};
// B: Pastel fields. Lilac, Sky and Peach rotate. Obviously Semibold caps at a calm size, Ink. One lime sticker.
TD.B = function (p, k, ground, lines, sticker, cap, label) {
  TD.page(p, k, ground);
  IG.small(p, 80, 120, label, 28, 'Ink', { track: 40 });
  var y = 380, i; for (i = 0; i < lines.length; i++) { var w = SO.word(p, lines[i], 920, 'Ink', 'Obviously-Semi'); SO.at(p, w, 80, y); y += w.h + 26; }
  if (sticker) IG.sticker(p, 830, 1010, 300, sticker[0], sticker[1], 'Lime', 'Ink');
  IG.small(p, 80, 1250, cap, 26, 'Ink', { track: 30 });
};
// C: Product close-up. A real piece of the app, oversized, on Lilac or Cream, with a short Plus Jakarta headline.
TD.C = function (p, k, ground, file, fx, fy, l1, l2, label) {
  TD.page(p, k, ground);
  TD.jk(p, 80, 120, label, 'B', 28, 'Ink', { track: 0 }); TD.dot(p, 66, 110, 16, 'Lime');
  TD.jk(p, 80, 270, l1 + '\r' + l2, 'EB', 84, 'Ink', { lead: 86, fonts: ['EB', 'MI'], track: -30 });
  var g = FG.org(p), L = FG.lay('Image'), pi = L.placedItems.add(); pi.file = new File(file);
  var w = 920, sc = w / (pi.width * 0.62); pi.resize(sc * 100, sc * 100);
  pi.position = [g[0] + 80 - pi.width * fx, g[1] - 420 + pi.height * fy]; pi.embed();
  var ras = L.rasterItems[0], grp = L.groupItems.add(); ras.move(grp, ElementPlacement.PLACEATEND);
  var cl = grp.pathItems.roundedRectangle(g[1] - 420, g[0] + 80, 920, 840, 48, 48); cl.filled = false; cl.stroked = false; cl.move(grp, ElementPlacement.PLACEATBEGINNING); cl.clipping = true; grp.clipped = true; FG.tag(grp, p, 'ui');
};
TD.build = function () {
  var A = GL.APP;
  TD.A('TA1', 0, 'AED 1.2 million', 'paid to creators.', 'September, across 3,500 creators.', 'The number');
  TD.A('TA2', 1, 'Your payout', 'lands before your latte.', 'Paid the day a post is verified.', 'POV');
  TD.A('TA3', 2, 'Three ways', 'to get picked.', 'Creator tips, 1 of 5. Swipe.', 'Creator tips');
  TD.B('TB1', 3, 'Lilac', ['AED 1.2M', 'PAID TO', 'CREATORS.'], null, 'September, across 3,500 creators', 'The number  /  Week 41');
  TD.B('TB2', 4, 'Sky', ['YOUR PAYOUT', 'LANDS BEFORE', 'YOUR LATTE.'], ['POV', 'Ep. 27'], 'Paid the day a post is verified', 'POV  /  #027');
  TD.B('TB3', 5, 'Peach', ['3 WAYS', 'TO GET', 'PICKED.'], ['1/5', 'Swipe'], 'Creator tips', 'Creator tips');
  TD.C('TC1', 6, 'Lilac', A + 'creator_07_wallet.png', 0.08, 0.05, 'AED 1.2 million', 'paid to creators.', 'The number');
  TD.C('TC2', 7, 'Cream', A + 'creator_05_cashback_offer.png', 0.08, 0.2, 'Scan the receipt.', 'Get 20% back.', 'Cashback');
  TD.C('TC3', 8, 'Lilac', A + 'creator_03_campaign_detail.png', 0.08, 0.3, 'AED 1,800', 'for one reel.', 'Paid collab');
};
