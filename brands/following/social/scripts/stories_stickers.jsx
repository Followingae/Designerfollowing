// Following Story 2s, 9-29 Nov 2026: one interactive Story a day (poll, quiz, question box, slider), built for the
// sticker Zain adds in Instagram. Locked direction: white type page or full-bleed photo, ExtraBold + italic, tags.
// Sticker zone, kept clear: x 190-890. White page y 860-1260, photo y 640-1060. Needs sl, posts, stories_2m, escape_stories.
var SS = { DIR: IL.ROOT + 'exports/2026-11-12_stories' };
// [day, layout W/P, line1, line2 (italic), tag, tag fill, photo]
SS.D = [
  ['09', 'W', 'What do brands', 'check first?', 'QUIZ', 'Lime'],
  ['10', 'P', 'Money back on', 'your next treat?', 'CASHBACK', 'Lime', 'dessert'],
  ['11', 'W', 'Running a brand?', 'Ask us anything.', 'FOR BRANDS', 'Violet'],
  ['12', 'P', 'Where do you', 'eat out most?', 'POLL', 'Lime', 'friends'],
  ['13', 'W', 'What to charge?', 'Ask us.', 'MONEY TALK', 'Lime'],
  ['14', 'W', 'The whole brief,', 'or just the fee?', 'THE BRIEF', 'Lime'],
  ['15', 'P', 'Do you keep', 'your receipts?', 'CASHBACK', 'Lime', 'sun'],
  ['16', 'W', 'New here?', 'What is unclear?', 'FOR CREATORS', 'Lime'],
  ['17', 'W', 'Paid or barter?', 'Pick one.', 'MONEY TALK', 'Lime'],
  ['18', 'P', 'Would you', 'save this?', 'MADE ON FOLLOWING', 'Lime', 'neon'],
  ['19', 'W', 'Has a customer', 'posted about you?', 'FOR BRANDS', 'Violet'],
  ['20', 'P', 'What earns', 'you cashback?', 'QUIZ', 'Lime', 'joy'],
  ['21', 'W', 'Ever missed', 'a deadline?', 'THE BRIEF', 'Lime'],
  ['22', 'P', 'How fair was', 'your last barter?', 'MONEY TALK', 'Lime', 'dj'],
  ['23', 'W', 'White Friday.', 'Raising your rates?', 'MONEY TALK', 'Lime'],
  ['24', 'W', 'What do briefs', 'always miss?', 'FOR BRANDS', 'Violet'],
  ['25', 'W', 'Shortlisted', 'out of how many?', 'QUIZ', 'Lime'],
  ['26', 'P', 'Which brand', 'should we call next?', 'ASK US', 'Lime', 'red'],
  ['27', 'P', 'Cashback lands.', 'Spend it or save it?', 'CASHBACK', 'Lime', 'night'],
  ['28', 'W', 'Do you check', 'your saves?', 'POLL', 'Lime'],
  ['29', 'P', 'Your niche', 'in one line?', 'FOR CREATORS', 'Lime', 'man']
];
SS.ink = function (f) { return f === 'Violet' ? 'White' : 'Ink'; };
// the canvas is full below row 6: free slots are row 6 cols 2-10, then a column each side of the grid
SS.slot = function (i) {
  if (i < 9) return [-7000 + (i + 2) * 1200, 7000 - 6 * 2050];
  if (i < 16) return [-7000 + 11 * 1200, 7000 - (i - 9) * 2050];
  return [-7000 + (i - 16) * 1200, 9050];
};
SS.board = function (name, i) {
  var d = IL.doc, k, found = -1, p = SS.slot(i), ab;
  for (k = 0; k < d.artboards.length; k++) if (d.artboards[k].name === name) found = k;
  IL.W = 1080; IL.H = 1920;
  if (found >= 0) { ab = d.artboards[found]; IL.clear(name); ab.artboardRect = [p[0], p[1], p[0] + 1080, p[1] - 1920]; } else { ab = d.artboards.add([p[0], p[1], p[0] + 1080, p[1] - 1920]); ab.name = name; }
  IL.cur = name; IL.org = [ab.artboardRect[0], ab.artboardRect[1]];
  IL.rect(0, 0, 1080, 1920, 'White', { lay: 'Ground' });
};
SS.white = function (name, n, a) {
  SS.board(name, n);
  P.head(P.M, 520, a[2], a[3], 140);
  P.tags([[800, 290, a[4], a[5], SS.ink(a[5]), 6]], 52);
  IL.T(P.M, 1380, 'Tap the sticker. We read every answer.', 38, 'Ink', { w: 'M', track: 0 });
  P.logo(1080 - P.M - 200, 1500, 200);
};
SS.photo = function (name, n, a) {
  SS.board(name, n);
  IL.img('photos/v_' + a[6] + '.jpg', 0, 0, 1080, 1920);
  ESC.shade(900, 1920, 78);
  P.head(P.M, 1330, a[2], a[3], 104, 'White');
  P.logo(P.M, 1520, 200, 'white');
  P.tags([[300, 1170, a[4], a[5], SS.ink(a[5]), -5]], 52);
};
SS.build = function () {
  var i, out = [];
  for (i = 0; i < SS.D.length; i++) {
    var a = SS.D[i], name = 'ST_Nov' + a[0] + '_2';
    if (a[1] === 'W') SS.white(name, i, a); else SS.photo(name, i, a);
    out.push(name);
  }
  return out;
};
SS.export = function (names) {
  var d = IL.doc, i, o = new ExportOptionsPNG24(), want = {}, c = 0;
  for (i = 0; i < names.length; i++) want[names[i]] = 1;
  o.artBoardClipping = true; o.horizontalScale = 100; o.verticalScale = 100; o.transparency = false;
  var N = d.layers.getByName('Notes'); N.visible = false;
  for (i = 0; i < d.artboards.length; i++) { if (!want[d.artboards[i].name]) continue; d.artboards.setActiveArtboardIndex(i); d.exportFile(new File(SS.DIR + '/' + d.artboards[i].name + '.png'), ExportType.PNG24, o); c++; }
  N.visible = true; return c;
};
