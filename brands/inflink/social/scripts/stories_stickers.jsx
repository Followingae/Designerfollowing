// Inflink Story 2s, 9-29 Nov 2026: one interactive Story a day (poll, quiz, question box, slider) for the sticker Zain
// adds in Instagram. Same system as the daily Stories: brand grounds with dot windows, real app screens, full-bleed photos.
// Sticker zone kept clear: x 190-890, y 700-1120. Needs il.jsx, directions2, final_direction, stories_2m.
var SX = { DIR: IL.ROOT + 'social/exports/2026-11-12_stories' };
// [day, mode D/A/F, question, screen or photo]
SX.D = [
  ['09', 'A', 'Prices in\nyour bio yet?', 'listing_editor'],
  ['10', 'F', 'How do brands\nreach you now?', 'coat'],
  ['11', 'D', 'Models: what do\ncastings ask for?'],
  ['12', 'F', 'How long did your\nlast payment take?', 'maroon'],
  ['13', 'A', 'One link\nor many?', 'link_in_bio'],
  ['14', 'D', 'Usage fee:\nwho pays?'],
  ['15', 'F', 'Done free work\nthis year?', 'beauty'],
  ['16', 'A', 'When does\nInflink pay you?', 'order_completed'],
  ['17', 'F', 'Briefs:\nlove or hate?', 'desk'],
  ['18', 'D', 'Worst client DM\nyou ever got?'],
  ['19', 'A', 'Pricing a Reel:\nhow hard is it?', 'listing'],
  ['20', 'F', 'Your diary:\npaper or phone?', 'jacket'],
  ['21', 'D', 'What do brands\nhaggle on most?'],
  ['22', 'A', 'Is your link\nin your bio?', 'link_in_bio'],
  ['23', 'A', '7 days, no reply.\nWhat happens?', 'order_completed'],
  ['24', 'F', 'Ever shared a QR\nat a shoot?', 'party'],
  ['25', 'D', 'What would you sell\nthis White Friday?'],
  ['26', 'A', 'Ad rights cost\nwhat, exactly?', 'listing'],
  ['27', 'F', 'How good does\n"paid" feel?', 'story'],
  ['28', 'D', 'How many links\nin your bio?'],
  ['29', 'A', 'What terms\ndo you set?', 'cancellation_terms']
];
SX.POOL = ['coat', 'blue', 'maroon', 'beauty', 'jacket', 'party', 'desk', 'burger', 'stickers', 'chair', 'avatar', 'reel', 'story', 'venue', 'cover', 'flowers', 'ugc'];
// free canvas: row 5 cols 6-10, column 11 rows 0-5, a row above the grid
SX.slot = function (i) {
  if (i < 5) return [-7000 + (i + 6) * 1200, 7000 - 5 * 2350];
  if (i < 11) return [-7000 + 11 * 1200, 7000 - (i - 5) * 2350];
  return [-7000 + (i - 11) * 1200, 9050];
};
SX.board = function (name, i, ground) {
  var d = IL.doc, k, found = -1, p = SX.slot(i), ab;
  for (k = 0; k < d.artboards.length; k++) if (d.artboards[k].name === name) found = k;
  IL.W = 1080; IL.H = 1920;
  if (found >= 0) { ab = d.artboards[found]; IL.clear(name); ab.artboardRect = [p[0], p[1], p[0] + 1080, p[1] - 1920]; } else { ab = d.artboards.add([p[0], p[1], p[0] + 1080, p[1] - 1920]); ab.name = name; }
  IL.cur = name; IL.org = [ab.artboardRect[0], ab.artboardRect[1]];
  IL.rect(0, 0, 1080, 1920, ground, { lay: 'Ground' });
};
SX.logo = function (v) { IL.svg('logo_' + v, D.M, 262, 190, 48, { lay: 'Notes' }); };
SX.build = function () {
  var i, g = 0, dk = 0, out = [];
  for (i = 0; i < SX.D.length; i++) {
    var a = SX.D[i], name = 'ST_Nov' + a[0] + '_2', C = ST.G[(g + 3) % 6];
    if (a[1] === 'F') {
      SX.board(name, i, 'Night');
      IL.img('../../social/assets/hook2/v_' + a[3] + '.jpg', 0, 0, 1080, 1920, { lay: LM });
      SX.logo('white'); var s = ST.size(a[2]); ST.txt(1550 - s * 1.04 * 2, a[2], 'White');
    } else if (a[1] === 'A') {
      SX.board(name, i, C[0]);
      IL.circ(880, 1700, 330, C[2], { lay: LM });
      D.ph2(250, 1230, 560, 'native_' + a[3] + '.png');
      SX.logo(C[1] === 'White' ? 'white' : 'primary'); ST.txt(350, a[2], C[1]); g++;
    } else {
      SX.board(name, i, C[0]);
      IL.windows(470, 1560, 400, 'pool_' + SX.POOL[dk % 17] + '.jpg', 'pool_' + SX.POOL[(dk + 7) % 17] + '.jpg', { fy: .25, lay: LM }, { fy: .4, lay: LM });
      SX.logo(C[1] === 'White' ? 'white' : 'primary'); ST.txt(350, a[2], C[1]); g++; dk += 3;
    }
    out.push(name);
  }
  return out;
};
SX.export = function (names) {
  var d = IL.doc, i, o = new ExportOptionsPNG24(), want = {}, c = 0;
  for (i = 0; i < names.length; i++) want[names[i]] = 1;
  o.artBoardClipping = true; o.horizontalScale = 100; o.verticalScale = 100; o.transparency = false;
  for (i = 0; i < d.artboards.length; i++) { if (!want[d.artboards[i].name]) continue; d.artboards.setActiveArtboardIndex(i); d.exportFile(new File(SX.DIR + '/' + d.artboards[i].name + '.png'), ExportType.PNG24, o); c++; }
  return c;
};
