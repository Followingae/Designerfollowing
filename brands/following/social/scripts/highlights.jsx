// Following highlight title frames (1080 x 1920). The 2026-10-31 covers scaled to a Story: one colour, one word, centred so the circle crop is the cover.
// Needs sl.jsx, posts.jsx, stories_2m.jsx.
var HF = { DIR: IL.ROOT + 'exports/highlights', FILE: IL.ROOT + 'Following_Highlights.ai' };
HF.SETS = [['DEALS', 'Lime', 'Ink', 'How you earn on Following.'], ['PAID', 'Ink', 'Lime', 'Know your rate. Ask for it.'], ['BARTER', 'Violet', 'White', 'A trade, not a favour.'],
 ['CASHBACK', 'Lilac', 'Ink', 'Spend. Post. Earn it back.'], ['TIPS', 'White', 'Ink', 'Post less. Post better.'], ['BRANDS', 'Forest', 'Lime', 'Running a brand? Start here.']];
HF.open = function () {
  var i; for (i = 0; i < app.documents.length; i++) if (app.documents[i].name === 'Following_Highlights.ai') { IL.doc = app.documents[i]; IL.doc.activate(); IL.boot(); return; }
  var f = new File(HF.FILE); if (f.exists) { IL.doc = app.open(f); IL.boot(); return; }
  IL.doc = app.documents.add(DocumentColorSpace.RGB, 1080, 1920); IL.doc.artboards[0].name = '_start'; IL.boot(); IL.doc.saveAs(f);
};
HF.build = function () {
  var names = [], i;
  for (i = 0; i < HF.SETS.length; i++) {
    var s = HF.SETS[i], name = 'HF_0' + (i + 1) + '_' + s[0];
    ST.board(name, i * 2, s[1]);
    // same proportion as the 500px cover (84pt, 62pt for long words), scaled to the 1080 circle crop
    IL.T(540, 960 + 40, s[0], (s[0].length > 6 ? 62 : 84) * 2.16, s[2], { w: 'EB', align: 'c', track: -20, lay: 'Type' });
    P.logo(P.M, 262, 280, s[2] === 'Ink' ? 'ink' : (s[1] === 'Lime' ? 'ink' : 'white'));
    ST.line(P.M, 1720, s[3], 58, s[2], true);
    names.push(name);
  }
  return names;
};
HF.export = function (names) {
  var d = IL.doc, i, j, o = new ExportOptionsPNG24(), fo = new Folder(HF.DIR), c = 0; fo.create();
  o.artBoardClipping = true; o.horizontalScale = 100; o.verticalScale = 100; o.transparency = false;
  var L = d.layers.getByName('Mark');
  for (j = 0; j < L.groupItems.length; j++) { var g = L.groupItems[j]; if (g.width > 90 || g.height > 25 || !/^HF_/.test(g.note)) continue; for (i = 0; i < d.artboards.length; i++) if (d.artboards[i].name === g.note) break; var r = d.artboards[i].artboardRect, s = 280 / g.width * 100; g.resize(s, s, true, true, true, true, s, Transformation.TOPLEFT); g.left = r[0] + 72; g.top = r[1] - 262; }
  for (i = 0; i < d.artboards.length; i++) { var n = d.artboards[i].name; for (j = 0; j < names.length; j++) if (names[j] === n) { d.artboards.setActiveArtboardIndex(i); d.exportFile(new File(fo.fsName + '/' + n + '.png'), ExportType.PNG24, o); c++; } }
  return c;
};
