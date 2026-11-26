// Following Stories, Nov and Dec 2026. Built for 9:16: poster type that fills the screen, full-height photos, split screens and giant hands. No post-in-a-frame.
var ST = { DIR: IL.ROOT + 'exports/2026-11-12_stories', FILE: IL.ROOT + 'Following_Stories.ai' };
ST.Q = [['Paid, barter or cashback?', 'Pick one.'], ['Born in Dubai.', 'Happy Flag Day.'], ['Three ways', 'to earn.'], ['Worked for exposure?', 'Tell us.'], ['On set.', 'All day.'],
 ['Brands choose fast.', 'Get picked.'], ['Your next treat', 'could pay you back.'], ['Running a brand?', 'This one is for you.'], ['Eat out. Post it.', 'Get money back.'], ['What do you charge?', 'Ask first.'],
 ['New here?', 'Start here.'], ['Barter is a trade.', 'Know your worth.'], ['Made on', 'Following.'], ['Your customers', 'can post for you.'], ['Keep the receipt.', 'It pays you back.'],
 ['White Friday', 'Rates ready?'], ['Writing a brief?', 'Five things.'], ['Shortlisted.', 'Out of 50,000+.'], ['Who we', 'work with.'], ['Spend it.', 'Earn it back.'],
 ['Need a link in bio?', 'Meet Inflink.'], ['First collab?', 'Start here.'], ['Happy', 'Eid Al Etihad.'], ['Brands. Deals.', 'One app.'], ['A day', 'on set.'],
 ['Paid or barter?', 'Pick one.'], ['Where it lands:', 'your wallet.'], ['One team.', 'Three services.'], ['First collab soon?', 'Save this.'], ['Made by creators.', 'Not by committee.'],
 ['Shop. Post.', 'Earn back.'], ['Is your rate right?', 'Tell us.'], ['Views or followers?', 'How we read it.'], ['Know a creator?', 'Send them this.'], ['Behind', 'the camera.'],
 ['Holiday content?', 'Three ideas.'], ['Going out?', 'Keep the receipt.'], ['Shark Tank Dubai?', 'Yes, that was us.'], ['Your best post?', 'Tag us in it.'], ['From', 'all of us.'],
 ['What', 'a year.'], ['New year.', 'New rate card?'], ['Planning Ramadan?', 'Start now.'], ['See you', 'in 2027.']];
ST.W = [['Post less.', 'Post better.'], ['Your last nine posts', 'are your portfolio.'], ['Know your rate', 'before they ask.'], ['Read the brief.', 'Twice.'], ['Keep your receipts.', 'Really.'], ['Hit the date.', 'Every time.'],
 ['Barter is a trade.', 'Not a favour.'], ['Saved posts', 'tell brands a lot.'], ['Say your niche', 'in your first line.'], ['Usage costs extra.', 'Always ask.'], ['Get it in writing.', 'All of it.'], ['Show a draft.', 'Early.'],
 ['Good weekend?', 'Post it Monday.'], ['Ask for the fee.', 'Then stop talking.'], ['Who sees it', 'beats how many.'], ['Rest counts too.', 'See you Monday.'], ['Last weekend', 'of the year.']];
// split screens: post number -> [top word, bottom word]
ST.S = { 1: ['Paid', 'Barter'], 4: ['Exposure', 'Money'], 12: ['Barter', 'Paid'], 26: ['Paid', 'Barter'], 33: ['Views', 'Followers'] };
ST.PH = ['joy', 'dj', 'friends', 'night', 'dessert', 'man', 'sun', 'red', 'sil', 'grey', 'neon', 'roses', 'leather'];
ST.FORCE = { 2: 'T', 5: 'dj', 7: 'dessert', 9: 'friends', 11: 'dj', 13: 'roses', 15: 'dessert', 19: 'night', 23: 'man', 25: 'dj', 27: 'joy', 31: 'red', 35: 'night', 37: 'sun', 41: 'neon', 43: 'leather' };
ST.G = [['Violet', 'White', 'h_green_button', 'Lime', 'Ink'], ['Orange', 'Ink', 'h_pink_rock', 'White', 'Ink'], ['White', 'Ink', 'h_blue_peace', 'Lime', 'Ink'], ['Pink', 'Ink', 'h_green_thumb', 'White', 'Ink'], ['Forest', 'Lime', 'h_green_peace', 'White', 'Ink'], ['Lime', 'Ink', 'h_pink_button', 'Ink', 'White']];
ST.open = function () {
  var i; for (i = 0; i < app.documents.length; i++) if (app.documents[i].name === 'Following_Stories.ai') { IL.doc = app.documents[i]; IL.doc.activate(); IL.boot(); return; }
  var f = new File(ST.FILE); if (f.exists) { IL.doc = app.open(f); IL.boot(); return; }
  IL.doc = app.documents.add(DocumentColorSpace.RGB, 1080, 1920); IL.doc.artboards[0].name = '_start'; IL.boot(); IL.doc.saveAs(f);
};
ST.board = function (name, n, ground) {
  var d = IL.doc, i, found = -1, x = -7000 + (n % 11) * 1200, y = 7000 - Math.floor(n / 11) * 2050, ab;
  for (i = 0; i < d.artboards.length; i++) if (d.artboards[i].name === name) found = i;
  IL.W = 1080; IL.H = 1920;
  if (found >= 0) { IL.clear(name); ab = d.artboards[found]; }
  else if (d.artboards[0].name === '_start') { ab = d.artboards[0]; ab.artboardRect = [x, y, x + 1080, y - 1920]; ab.name = name; }
  else { ab = d.artboards.add([x, y, x + 1080, y - 1920]); ab.name = name; }
  IL.cur = name; IL.org = [ab.artboardRect[0], ab.artboardRect[1]];
  IL.rect(0, 0, 1080, 1920, ground, { lay: 'Ground' });
};
ST.wrap = function (s, max) { var w = s.split(' '), out = [], c = '', i; for (i = 0; i < w.length; i++) { if (c && (c + ' ' + w[i]).length > max) { out.push(c); c = w[i]; } else c = c ? c + ' ' + w[i] : w[i]; } if (c) out.push(c); return out; };
ST.line = function (x, y, s, size, col, it) { var t = IL.T(x, y, s, size, col, { w: 'EB', track: it ? -28 : -36 }); if (it) t.textRange.characterAttributes.textFont = app.textFonts.getByName(IL.F.I); return t; };
// poster stack: every line scaled to the full width. Returns bottom y. If bottom is set the stack sits on that line.
ST.big = function (l1, l2, col, top, maxH, bottom, cap) {
  var L = [], i, a = ST.wrap(l1, 11), b = l2 ? ST.wrap(l2, 18) : []; for (i = 0; i < a.length; i++) L.push([a[i], false]); for (i = 0; i < b.length; i++) L.push([b[i], true]);
  var sz = [], total = 0, t; for (i = 0; i < L.length; i++) { t = ST.line(0, 0, L[i][0], 100, col, L[i][1]); var w = t.width; t.remove(); sz[i] = Math.min(cap || 300, 100 * 936 / w); total += sz[i] * .96; }
  var k = total > maxH ? maxH / total : 1, y = bottom ? bottom - total * k : top;
  for (i = 0; i < L.length; i++) { var s = sz[i] * k; ST.line(P.M, y + s * .76, L[i][0], s, col, L[i][1]); y += s * .96; }
  return y;
};
ST.T = function (name, n, q, g, tag) {
  ST.board(name, n, g[0]);
  IL.img('illustration/' + g[2] + '.png', 330, 1080, 860, 860, { fit: true, ax: 1, ay: 1, lay: 'Mark' });
  P.logo(P.M, 262, 280, g[1] === 'Ink' ? 'ink' : 'white');
  ST.big(q[0], q[1], g[1], 340, 760);
  P.tag(250, 1260, tag, g[3], g[4], 58, -6);
};
ST.P = function (name, n, q, ph, tag) {
  ST.board(name, n, 'Ink'); IL.img('photos/v_' + ph + '.jpg', 0, 0, 1080, 1920);
  P.logo(P.M, 262, 280, 'white');
  var top = 1560; ST.big(q[0], q[1], 'White', 0, 560, 1560, 200);
  P.tag(250, 930, tag, 'Lime', 'Ink', 58, -6);
};
ST.X = function (name, n, s, a, b, tag) {
  ST.board(name, n, a[0]); IL.rect(0, 960, 1080, 960, b[0], { lay: 'Ground' });
  P.logo(P.M, 262, 280, a[1] === 'Ink' ? 'ink' : 'white');
  ST.big(s[0], '', a[1], 0, 400, 880, 300); ST.big(s[1], '', b[1], 1040, 400, 0, 300);
  P.tag(540, 960, 'OR', 'White', 'Ink', 96, -8);
  P.tag(760, 1540, tag, a[3], a[4], 54, 5);
};
ST.build = function (from, to) {
  var M = ['Nov', 'Dec'], day, post = 0, wk = 0, n = 0, dt = new Date(2026, 10, 1), g = 0, ph = 0;
  for (day = 0; day < 61; day++, dt.setDate(dt.getDate() + 1)) {
    var dow = dt.getDay(), dd = dt.getDate(), name = 'ST_' + M[dt.getMonth() - 10] + (dd < 10 ? '0' : '') + dd, weekend = dow === 0 || dow === 6, q, tag, f;
    if (weekend) { q = ST.W[wk]; wk++; tag = 'TIP'; f = wk % 2 ? ST.PH[ph % 13] : 'T'; if (f !== 'T') ph++; }
    else { post++; q = ST.Q[post - 1]; tag = 'NEW POST'; f = ST.FORCE[post] || (post % 2 ? ST.PH[ph % 13] : 'T'); if (!ST.FORCE[post] && f !== 'T') ph++; }
    var C = ST.G[g % 6];
    if (day >= from && day < to) {
      if (!weekend && ST.S[post]) ST.X(name, n, ST.S[post], C, ST.G[(g + 2) % 6], tag);
      else if (f === 'T') ST.T(name, n, q, C, tag);
      else ST.P(name, n, q, f, tag);
    }
    if (f === 'T' || (!weekend && ST.S[post])) g++;
    n++;
  }
};
ST.finish = function () {
  var d = IL.doc, L = d.layers.getByName('Mark'), j, i, c = 0, o = new ExportOptionsPNG24(); o.artBoardClipping = true; o.horizontalScale = 100; o.verticalScale = 100; o.transparency = false;
  for (j = 0; j < L.groupItems.length; j++) { var g = L.groupItems[j]; if (g.width > 90 || g.height > 25 || !/^ST_/.test(g.note)) continue; for (i = 0; i < d.artboards.length; i++) if (d.artboards[i].name === g.note) break; var r = d.artboards[i].artboardRect, s = 280 / g.width * 100; g.resize(s, s, true, true, true, true, s, Transformation.TOPLEFT); g.left = r[0] + 72; g.top = r[1] - 262; c++; }
  var fo = new Folder(ST.DIR); fo.create();
  for (i = 0; i < d.artboards.length; i++) { d.artboards.setActiveArtboardIndex(i); d.exportFile(new File(fo.fsName + '/' + d.artboards[i].name + '.png'), ExportType.PNG24, o); }
  return c;
};
