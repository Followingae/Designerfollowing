// Following, 2026-11-26: replacement for N19 (client list, pulled; never name clients). Dark photo post so the grid keeps alternating.
// Needs sl.jsx, posts.jsx, IL.open(), posts_dec.jsx (for the Q slot board). Uses the last free December slot.
var FX = {};
FX.build = function () {
  Q.n = 46;
  // the svg import sometimes lands at a stale size: force the logo to 200 wide at its anchor
  var logo0 = P.logo;
  P.logo = function (x, y, w, v) { var L = IL.lay('Mark'), before = L.groupItems.length; logo0(x, y, w, v);
    var it = L.groupItems[0]; if (L.groupItems.length > before && Math.abs(it.width - 200) > 2) { var s = 200 / it.width * 100; it.resize(s, s, true, true, true, true, s, Transformation.TOPLEFT); it.left = IL.org[0] + x; it.top = IL.org[1] - y; } };
  P.photo('N19b_Mon30_Right_person', 0, 0, 'l_fit', 'Put your product', 'on the right person.',
    [[830, 210, 'FOR BRANDS', 'Violet', 'White', 5], [250, 760, 'RIGHT FIT', 'Lime', 'Ink', -6]], { size: 96 });
  P.logo = logo0;
};
FX.export = function () {
  var fo = new Folder(IL.ROOT + 'exports/2026-11-12_posts'); fo.create();
  var d = IL.doc, o = new ExportOptionsPNG24(); o.artBoardClipping = true; o.horizontalScale = 100; o.verticalScale = 100; o.transparency = false;
  for (var i = 0; i < d.artboards.length; i++) { var n = d.artboards[i].name; if (n !== 'N19b_Mon30_Right_person') continue; d.artboards.setActiveArtboardIndex(i); d.exportFile(new File(fo.fsName + '/' + n + '.png'), ExportType.PNG24, o); return n; }
  return 'none';
};
