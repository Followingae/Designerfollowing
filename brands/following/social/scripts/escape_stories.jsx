// Barter campaign Stories for a horror escape room in Abu Dhabi (client unnamed on purpose).
// Built in the locked Instagram direction (row B + G tags): full-bleed photo with white type at the foot and
// stuck-on tags; white type page with bold + italic headline, tag, caption line, wordmark. No grounds, no hands.
// Each keeps a clear zone for the link sticker (shown only in _preview).
// Run after sl.jsx, posts.jsx, stories_2m.jsx.
var ESC = { DIR: IL.ROOT + 'exports/2026-11_escape_room' };
ESC.zone = function (x, y) {
  var r = IL.rect(x, y, 600, 150, null, { stroke: 'Grey', sw: 3, lay: 'Notes', r: 40 }); r.strokeDashes = [14, 10]; return r;
};
// ink shade from transparent at y0 to op% at y1, so white type reads on a bright photo
ESC.shade = function (y0, y1, op) {
  var d = IL.doc, g = d.gradients.add(); g.type = GradientType.LINEAR;
  var ink = IL.rgb(IL.PAL.Ink);
  g.gradientStops[0].color = ink; g.gradientStops[0].rampPoint = 0; g.gradientStops[0].opacity = 0;
  g.gradientStops[1].color = ink; g.gradientStops[1].rampPoint = 100; g.gradientStops[1].opacity = op;
  var r = IL.rect(0, y0, 1080, y1 - y0, null, { lay: 'Image' });
  var gc = new GradientColor(); gc.gradient = g; r.filled = true; r.fillColor = gc;
  r.rotate(0, false, false, true, false, Transformation.CENTER);
  // linear gradients run left to right by default: turn the fill 90 degrees so it runs top to bottom
  r.rotate(-90, false, false, true, false, Transformation.CENTER);
  return r;
};
ESC.board = function (name, n) { ST.board(name, n, 'White'); IL.W = 1080; IL.H = 1920; };
// 02: the room, full bleed. The offer at the foot, tags stuck on above it
ESC.photo = function () {
  ESC.board('ESC_02_Deal', 66);
  IL.img('photos/esc_room.jpg', 0, 0, 1080, 1920, { fx: 0.5 });
  ESC.shade(820, 1920, 78);
  P.head(P.M, 1310, 'Escape room for two.', 'We film your run.', 104, 'White');
  P.logo(P.M, 1490, 200, 'white');
  P.tags([[310, 960, 'BARTER COLLAB', 'Lime', 'Ink', -6], [790, 1040, 'WORTH AED 660', 'White', 'Ink', 4], [300, 1110, 'ABU DHABI', 'Violet', 'White', 3]], 52);
  ESC.zone(240, 560);
};
// 03: white type page, the ask
ESC.type = function () {
  ESC.board('ESC_03_Apply', 67);
  P.head(P.M, 560, 'Brave enough?', 'Apply below.', 150);
  P.tags([[800, 300, 'FOR CREATORS', 'Lime', 'Ink', 6]], 52);
  IL.T(P.M, 1120, 'Loud, brave and on camera? A horror escape room for two in Abu Dhabi, plus your gameplay filmed and fully edited. Worth AED 660.', 38, 'Ink', { w: 'M', box: [760, 260], lead: 50, track: 0 });
  P.logo(1080 - P.M - 200, 1500, 200);
  ESC.zone(P.M, 840);
};
ESC.export = function () {
  var d = IL.doc, fo = new Folder(ESC.DIR), i, o = new ExportOptionsPNG24(), N = d.layers.getByName('Notes');
  fo.create(); new Folder(fo.fsName + '/_preview').create();
  o.artBoardClipping = true; o.horizontalScale = 100; o.verticalScale = 100; o.transparency = false;
  var names = { 'ESC_02_Deal': 1, 'ESC_03_Apply': 1 };
  for (var pass = 0; pass < 2; pass++) {
    N.visible = pass === 1;
    for (i = 0; i < d.artboards.length; i++) {
      var n = d.artboards[i].name; if (!names[n]) continue;
      d.artboards.setActiveArtboardIndex(i);
      d.exportFile(new File(fo.fsName + '/' + (pass ? '_preview/' + n + '_sticker_zone' : n) + '.png'), ExportType.PNG24, o);
    }
  }
  N.visible = true;
};
