// Inflink Instagram directions, round 2: The DMs, Price it, The stack.
var LM = 'Mark';
IL.FILE = IL.ROOT + 'social/Inflink_Instagram.ai';
IL.openSocial = function () {
  var i, f = new File(IL.FILE);
  for (i = 0; i < app.documents.length; i++) if (app.documents[i].name === 'Inflink_Instagram.ai') { IL.doc = app.documents[i]; IL.doc.activate(); IL.boot(); return; }
  if (f.exists) { IL.doc = app.open(f); IL.boot(); return; }
  IL.doc = app.documents.add(DocumentColorSpace.RGB, 1080, 1350);
  IL.doc.artboards[0].name = '_start'; IL.boot(); IL.doc.saveAs(f);
};
var D = { M: 72 };
D.board = function (name, row, k, ground) {
  var d = IL.doc, i, found = -1, x = -7000 + k * 1200, y = 5200 - row * 1450, ab;
  for (i = 0; i < d.artboards.length; i++) if (d.artboards[i].name === name) found = i;
  if (IL.cur) IL.show();
  IL.W = 1080; IL.H = 1350;
  if (found >= 0) { IL.clear(name); ab = d.artboards[found]; }
  else if (d.artboards[0].name === '_start') { ab = d.artboards[0]; ab.artboardRect = [x, y, x + 1080, y - 1350]; ab.name = name; }
  else { ab = d.artboards.add([x, y, x + 1080, y - 1350]); ab.name = name; }
  IL.cur = name; IL.org = [ab.artboardRect[0], ab.artboardRect[1]];
  IL.rect(0, 0, 1080, 1350, ground || 'Canvas', { lay: 'Ground' });
};
D.h = function (y, str, size, col, x, o) { o = o || {}; return IL.T(x === undefined ? D.M : x, y, str.replace(/\n/g, '\r'), size, col || 'Ink', { lead: size * (o.lead || 1.08), track: -20, align: o.align, lay: 'Notes' }); };
D.logo = function (v, x, y) { IL.svg('logo_' + (v || 'primary'), x === undefined ? D.M : x, y === undefined ? 1230 : y, 190, 48, { lay: 'Notes' }); };
D.bg = function (f) { IL.img(f, 0, 0, 1080, 1350, { lay: LM }); };

// a chat bubble. side 'l' or 'r'; returns the y below it
D.bub = function (y, str, side, fill, ink, size, o) {
  o = o || {}; size = size || 54;
  var t = IL.T(0, 0, str.replace(/\n/g, '\r'), size, ink, { lead: size * 1.22, track: -8, lay: 'Notes' });
  var lines = str.split('\n').length, pad = size * .72, tw = t.width, th = lines * size * 1.22 + pad * 1.1, w = tw + pad * 2;
  var x = side === 'r' ? 1080 - (o.m || D.M) - w : (o.m || D.M);
  IL.rect(x, y, w, th, fill, { r: Math.min(size * 1.05, th / 2), lay: LM });
  // the tail: a small tucked corner
  var cs = size * .6; IL.rect(side === 'r' ? x + w - cs : x, y + th - cs, cs, cs, fill, { r: size * .14, lay: LM });
  t.left = IL.org[0] + x + pad; t.top = IL.org[1] - y - pad * .5;
  return y + th + (o.gap === undefined ? 22 : o.gap);
};
D.chatTop = function (name, ink, sub) { var a = IL.circ(D.M + 42, 110, 42, 'Sand2', { lay: LM }); IL.T(D.M + 104, 104, name, 38, ink, { w: 'S', lay: 'Notes' }); IL.T(D.M + 104, 146, sub || 'Active now', 28, ink, { lay: 'Notes' }); };

D.buildDMs = function () {
  // D1 the classic pitch, in a real looking thread
  D.board('D1', 0, 0, 'White'); D.chatTop('A brand you like', 'Ink');
  var y = 240; y = D.bub(y, 'hi babe, love your content', 'l', 'Sand', 'Ink'); y = D.bub(y, 'we would love to send you\na candle for 3 Reels', 'l', 'Sand', 'Ink'); y = D.bub(y, 'and a Story', 'l', 'Sand', 'Ink'); y = D.bub(y + 40, 'my prices are\nin my link', 'r', 'Violet', 'White', 70);
  IL.address(D.M, 1040, 936, 112, 'yourname', 'dark'); D.logo('primary');
  // D2 one enormous bubble
  D.board('D2', 0, 1, 'Peach'); D.bub(150, 'Is\nexposure\nokay?', 'l', 'White', 'Ink', 168); D.h(1070, 'Asked every day,\nin every inbox.', 50, 'Ink'); D.logo('ink');
  // D3 photo with a reply
  D.board('D3', 0, 2, 'Night'); D.bg('creator_reel.png'); var y3 = D.bub(880, 'what are your rates?', 'l', 'White', 'Ink', 56); y3 = D.bub(y3, 'in my link. you can\nbook me there too', 'r', 'Violet', 'White', 56);
  // D4 phrase book
  D.board('D4', 0, 3, 'Lilac'); D.h(190, 'Brand speak,\ntranslated.', 104); var a = [['\u201CQuick collab\u201D', '3 Reels. Free.'], ['\u201CGreat exposure\u201D', 'No budget.'], ['\u201CBudget is tight\u201D', 'Still no budget.'], ['\u201CWe pay net 60\u201D', 'See you in spring.']], yy = 430;
  for (var i = 0; i < 4; i++) { IL.T(D.M, yy, a[i][0], 54, 'Ink', { w: 'S', lay: 'Notes', track: -10 }); IL.T(D.M, yy + 66, a[i][1], 50, 'V700', { lay: 'Notes', track: -10 }); IL.line(D.M, yy + 100, 1008, yy + 100, 'Deep', 2, { lay: LM }); yy += 178; } D.logo('ink');
  // D5 chasing: your own messages, unanswered
  D.board('D5', 0, 4, 'Deep'); var y5 = 110; y5 = D.bub(y5, 'hi! just checking on\nthe payment', 'r', 'Violet', 'White', 52); y5 = D.bub(y5, 'any update?', 'r', 'Violet', 'White', 52); y5 = D.bub(y5, 'sorry to chase', 'r', 'Violet', 'White', 52); y5 = D.bub(y5, 'it has been 6 weeks', 'r', 'Violet', 'White', 52); IL.T(1008, y5 + 30, 'Seen', 34, 'Lilac', { align: 'r', lay: 'Notes' }); D.h(y5 + 240, 'Never type\nthis again.', 124, 'White'); D.logo('reversed');
  // D6 the fix: money behind glass
  D.board('D6', 0, 5, 'White'); D.bg('aurora/fluted_tall.jpg'); var y6 = D.bub(150, 'did the brand pay?', 'l', 'White', 'Ink', 62); y6 = D.bub(y6, 'before you started.', 'r', 'Ink', 'White', 62); D.h(1050, 'Money held\nuntil approved.', 100, 'Ink'); D.logo('ink');
  // D7 models get it too
  D.board('D7', 0, 6, 'Sand'); var y7 = D.bub(100, 'hey, any recent pics?', 'l', 'White', 'Ink', 56); y7 = D.bub(y7, 'how recent is recent?', 'l', 'White', 'Ink', 56);
  var fr = [['digitals_front.png', 72, 'Front'], ['digitals_side.png', 558, 'Side']]; for (var f = 0; f < 2; f++) { IL.rect(fr[f][1], 360, 450, 560, 'White', { r: 8, lay: LM }); IL.img(fr[f][0], fr[f][1] + 20, 380, 410, 470, { fy: .1, lay: LM }); IL.T(fr[f][1] + 24, 894, fr[f][2], 30, 'Ink', { lay: 'Notes' }); IL.T(fr[f][1] + 426, 894, '12 Oct', 30, 'Soft', { align: 'r', lay: 'Notes' }); }
  D.bub(1000, 'dated, see?', 'r', 'Violet', 'White', 64); D.logo('primary');
  // D8 share prompt
  D.board('D8', 0, 7, 'Violet'); D.h(540, 'Send this\nto the brand\nthat asked.', 150, 'White'); IL.circ(860, 980, 110, 'White', { lay: LM }); var p = IL.lay(LM).pathItems.add(), g = IL.org; p.setEntirePath([[g[0] + 815, g[1] - 1025], [g[0] + 915, g[1] - 980], [g[0] + 815, g[1] - 935]]); p.closed = true; p.filled = true; p.fillColor = IL.col('Violet'); p.stroked = false; IL.tag(p); D.logo('white');
  // D9 out
  D.board('D9', 0, 8, 'White'); D.bg('aurora/aurora_s.jpg'); var y9 = D.bub(180, 'where can i book you?', 'l', 'White', 'Ink', 66); D.bub(y9 + 10, 'one link.', 'r', 'Ink', 'White', 120); IL.address(D.M, 900, 936, 150, 'yourname', 'light'); D.logo('ink');
};

// ---------- Price it ----------
// a pin: tiny two dots, then a price label
D.pin = function (px, py, label, price, flip) {
  var r = 28; IL.circ(px, py, r, 'Peach', { lay: 'Notes' }); IL.circ(px + r * .81, py + r * .81, r * .65, 'Violet', { lay: 'Notes' });
  var size = 48, t = IL.T(0, 0, label + '  ' + price, size, 'Ink', { w: 'S', lay: 'Notes', track: -6 });
  var w = t.width + 64, h = 96, x = flip ? px - w - 40 : px + 54, y = py - h / 2;
  IL.rect(x, y, w, h, 'White', { r: 48, lay: 'Notes' }).move(t, ElementPlacement.PLACEAFTER);
  t.left = IL.org[0] + x + 32; t.top = IL.org[1] - y - 18;
};
// paper receipt with a torn foot
D.receipt = function (x, y, w, rows, total, stamp) {
  var i, h = 200 + rows.length * 88 + 330;
  IL.rect(x, y, w, h, 'White', { lay: LM });
  var n = Math.floor(w / 44), s = w / n; for (i = 0; i < n; i++) IL.circ(x + s * (i + .5), y + h, s / 2, 'White', { lay: LM });
  IL.svg('logo_primary', x + 50, y + 54, 200, 50, { lay: 'Notes' }); IL.T(x + w - 50, y + 94, 'Order', 34, 'Soft', { align: 'r', lay: 'Notes' });
  var yy = y + 230;
  for (i = 0; i < rows.length; i++) { IL.T(x + 50, yy, rows[i][0], 40, 'Mid', { lay: 'Notes', track: -6 }); IL.T(x + w - 50, yy, rows[i][1], 40, 'Ink', { align: 'r', lay: 'Notes', track: -6 }); yy += 88; }
  IL.line(x + 50, yy - 44, x + w - 50, yy - 44, 'Sand2', 3, { lay: 'Notes', dash: [2, 10], round: true });
  IL.T(x + 50, yy + 34, 'Total', 54, 'Ink', { w: 'S', lay: 'Notes' }); IL.T(x + w - 50, yy + 34, total, 54, 'Ink', { w: 'S', align: 'r', lay: 'Notes' });
  if (stamp) { var c = IL.circ(x + w - 150, yy + 160, 92, 'Violet', { lay: 'Notes' }); c.rotate(10); IL.T(x + w - 150, yy + 176, stamp, 44, 'White', { w: 'S', align: 'c', lay: 'Notes', rot: -10 }); }
};
D.buildPrice = function () {
  D.board('E1', 1, 0, 'Night'); D.bg('creator_reel.png'); D.pin(230, 300, 'Reel', 'AED 1,200'); D.pin(700, 640, 'Story', 'AED 450', true); D.pin(380, 900, 'UGC', 'AED 800'); D.bub(1120, 'every post has a price', 'l', 'White', 'Ink', 72);
  D.board('E2', 1, 1); D.bg('aurora/peach_s.jpg'); D.receipt(120, 72, 840, [['Instagram Reel', 'AED 1,200'], ['Service charge', 'AED 75']], 'AED 1,275', 'Held'); D.h(1140, 'Paid before you\npress record.', 84, 'Ink');
  D.board('E3', 1, 2, 'Night'); D.bg('creator_venue.png'); D.pin(280, 520, 'Venue visit', 'AED 900'); D.pin(760, 860, 'Story set', 'AED 650', true); D.bub(1110, 'dinner is not a fee', 'l', 'White', 'Ink', 80);
  D.board('E4', 1, 3, 'Canvas'); D.h(170, 'Rate card', 84); var rc = [['Reel', '1,200'], ['Story', '450'], ['UGC', '800'], ['Visit', '900']], yy = 240;
  for (var i = 0; i < 4; i++) { IL.line(D.M, yy, 1008, yy, 'Ink', 3, { lay: LM }); D.h(yy + 150, rc[i][0], 104, 'Soft'); IL.T(1008, yy + 165, rc[i][1], 170, 'Ink', { align: 'r', track: -30, lay: 'Notes' }); yy += 210; } IL.line(D.M, yy, 1008, yy, 'Ink', 3, { lay: LM }); D.h(yy + 60, 'AED. Example prices. Yours go here.', 36, 'Soft'); D.logo('primary');
  D.board('E5', 1, 4, 'Sand'); var dg = [['digitals_front.png', 90, 72, -3, 'Front'], ['digitals_three-quarter.png', 590, 96, 2, 'Three quarter'], ['digitals_hands.png', 96, 600, 2, 'Hands'], ['digitals_side.png', 590, 624, -2, 'Side']];
  for (var j = 0; j < 4; j++) { var gx = dg[j][1], gy = dg[j][2]; var a = IL.rect(gx, gy, 400, 510, 'White', { r: 6, lay: LM }); var b = IL.img(dg[j][0], gx + 18, gy + 18, 364, 410, { fy: .1, lay: LM }); var c = IL.T(gx + 22, gy + 480, dg[j][4], 30, 'Ink', { lay: 'Notes' }); var e = IL.T(gx + 378, gy + 480, '12 Oct', 30, 'Soft', { align: 'r', lay: 'Notes' }); var grp = IL.lay('Notes').groupItems.add(); a.move(grp, ElementPlacement.PLACEATEND); b.move(grp, ElementPlacement.PLACEATBEGINNING); c.move(grp, ElementPlacement.PLACEATBEGINNING); e.move(grp, ElementPlacement.PLACEATBEGINNING); a.note = ''; b.note = ''; c.note = ''; e.note = ''; grp.rotate(dg[j][3]); IL.tag(grp); }
  D.h(1262, 'Digitals with dates.', 64, 'Ink');
  D.board('E6', 1, 5, 'Deep'); IL.img('aurora/fluted_night.jpg', 0, 0, 1080, 800, { lay: LM }); IL.T(540, 470, 'AED 1,200', 150, 'White', { align: 'c', lay: 'Notes', track: -30 }); D.h(960, 'Held by us.\nReleased by you.', 96, 'White'); D.logo('reversed');
  D.board('E7', 1, 6, 'Night'); D.bg('creator_ugc.png'); D.pin(420, 500, 'UGC video', 'AED 800'); D.bub(1040, 'your hands.\nyour rate.', 'l', 'White', 'Ink', 72);
  D.board('E8', 1, 7); D.bg('aurora/lilac_s.jpg'); D.h(170, 'On AED 1,000,\nyou keep', 92); var fe = [['Free', 873, 'White', 'Ink'], ['Pro', 953, 'Violet', 'White']]; for (var k = 0; k < 2; k++) { var fy = 480 + k * 300; IL.rect(D.M, fy, 936 * fe[k][1] / 1000, 240, fe[k][2], { r: 120, lay: LM }); IL.T(D.M + 60, fy + 150, 'AED ' + fe[k][1], 104, fe[k][3], { lay: 'Notes', track: -20 }); IL.T(D.M + 936 * fe[k][1] / 1000 - 60, fy + 140, fe[k][0], 52, fe[k][3], { align: 'r', lay: 'Notes', w: 'S' }); } D.h(1120, 'Before withdrawal. Pro is $12.99 a month.', 36, 'Ink'); D.logo('ink');
  D.board('E9', 1, 8, 'Night'); D.bg('creator_story.png'); D.pin(500, 420, 'Reel', 'AED 1,200'); IL.address(D.M, 1130, 936, 132, 'yourname', 'light');
};

// ---------- The stack ----------
// a full-width link button
D.btn = function (y, h, fill, ink, str, o) {
  o = o || {}; var x = o.x === undefined ? 72 : o.x, w = o.w || 936;
  IL.rect(x, y, w, h, fill, { r: h / 2, lay: LM });
  var tx = x + h * .42;
  if (o.img) { IL.img(o.img, x + h * .1, y + h * .1, h * .8, h * .8, { circle: true, fy: o.fy === undefined ? .3 : o.fy, lay: LM }); tx = x + h * 1.05; }
  if (o.icon) { IL.svg('icon_' + o.icon, x + h * .22, y + h * .2, h * .6, h * .6, { lay: 'Notes' }); tx = x + h * 1.05; }
  var size = o.size || h * .42; IL.T(tx, y + h / 2 + size * .34, str, size, ink, { track: -18, lay: 'Notes' });
  if (o.arrow !== false) { var r = h * .3, cx = x + w - h * .5, cy = y + h / 2; IL.circ(cx, cy, r, ink, { lay: LM }); IL.line(cx - r * .42, cy, cx + r * .42, cy, fill, h * .03, { round: true, lay: 'Notes' }); IL.line(cx + r * .02, cy - r * .4, cx + r * .42, cy, fill, h * .03, { round: true, lay: 'Notes' }); IL.line(cx + r * .02, cy + r * .4, cx + r * .42, cy, fill, h * .03, { round: true, lay: 'Notes' }); }
};
D.buildStack = function () {
  D.board('F1', 2, 0, 'Canvas'); IL.img('creator_avatar.png', 420, 72, 240, 240, { circle: true, fy: .25, lay: LM }); var r = [['Book me', 'Violet', 'White'], ['My rates', 'Peach', 'Ink'], ['Shop my picks', 'Lilac', 'Ink'], ['New Reel', 'Blush', 'Ink'], ['All in one link', 'Ink', 'White']]; for (var i = 0; i < 5; i++) D.btn(340 + i * 186, 166, r[i][1], r[i][2], r[i][0], { size: 68 });
  D.board('F2', 2, 1, 'Canvas'); D.btn(72, 388, 'Peach', 'Ink', 'Stop', { size: 180, arrow: false }); D.btn(481, 388, 'Violet', 'White', 'chasing', { size: 180, arrow: false }); D.btn(890, 388, 'Deep', 'White', 'payment', { size: 180, arrow: false });
  D.board('F3', 2, 2, 'Canvas'); IL.img('creator_venue.png', 72, 72, 936, 580, { r: 290, lay: LM }); IL.img('creator_story.png', 72, 672, 448, 606, { r: 224, fy: .4, lay: LM }); IL.rect(540, 672, 468, 606, 'Violet', { r: 234, lay: LM }); D.h(900, 'Book\nvisits\nhere.', 104, 'White', 620);
  D.board('F4', 2, 3, 'Canvas'); var s = ['DM for rates', 'Email me', 'Ask my manager', 'Voice note me']; for (var j = 0; j < 4; j++) { D.btn(72 + j * 210, 186, 'Sand', 'Soft', s[j], { size: 70, arrow: false }); IL.line(120, 165 + j * 210, 960, 165 + j * 210, 'Coral', 7, { lay: 'Notes', round: true }); } IL.address(72, 980, 936, 230, 'you', 'dark');
  D.board('F5', 2, 4, 'Blush'); var pl = ['creator_cover.png', 'creator_reel.png', 'creator_ugc.png']; for (var p = 0; p < 3; p++) IL.img(pl[p], 72, 72 + p * 370, 936, 350, { r: 175, fy: p === 1 ? .22 : .45, lay: LM }); D.btn(1190, 88, 'Ink', 'White', 'Your work, in your link', { size: 40, x: 240, w: 600, arrow: false });
  D.board('F6', 2, 5); D.bg('aurora/aurora_s.jpg'); D.btn(440, 340, 'White', 'Ink', 'One link', { size: 124 }); D.h(1100, 'That is the whole idea.', 72, 'Ink'); D.logo('ink');
  D.board('F7', 2, 6, 'Canvas'); var t = [['Reel', 'reel', 'Lilac'], ['Story', 'story', 'Blush'], ['UGC', 'ugc', 'Mist'], ['Visit', 'venue', 'Peach'], ['Consult', 'consult', 'Mist'], ['Merch', 'merch', 'Lilac']]; D.h(160, 'Sell it\nfrom your link.', 100); for (var u = 0; u < 6; u++) D.btn(390 + u * 146, 132, t[u][2], 'Ink', t[u][0], { size: 62, icon: t[u][1] });
  D.board('F8', 2, 7, 'Deep'); D.h(180, 'Which link\nearned most?', 112, 'White'); var w8 = [936, 720, 550, 380], c8 = ['Peach', 'Lilac', 'Violet', 'Mist'], n8 = ['Book me', 'Rates', 'Picks', 'Reel'], k8 = ['Ink', 'Ink', 'White', 'Ink']; for (var v = 0; v < 4; v++) D.btn(450 + v * 186, 166, c8[v], k8[v], n8[v], { size: 68, w: w8[v], arrow: false }); D.logo('reversed');
  D.board('F9', 2, 8, 'Violet'); D.h(380, 'Yours\nis free\nto claim.', 170, 'White'); IL.address(72, 1010, 936, 170, 'yourname', 'light'); D.logo('white');
};
D.save = function () {
  IL.save();
  var fo = new Folder(IL.ROOT + 'social/exports/directions'); fo.create();
  var d = IL.doc, o = new ExportOptionsPNG24(); o.artBoardClipping = true; o.horizontalScale = 50; o.verticalScale = 50;
  for (var i = 0; i < d.artboards.length; i++) { d.artboards.setActiveArtboardIndex(i); d.exportFile(new File(fo.fsName + '/' + d.artboards[i].name + '.png'), ExportType.PNG24, o); }
};

// lists anything that sits closer than `m` to a board edge. Full-bleed pictures and grounds are skipped
D.audit = function (m) {
  var d = IL.doc, out = [], L, i, j, it, a;
  var names = ['Notes', 'Mark'];
  for (a = 0; a < d.artboards.length; a++) {
    var r = d.artboards[a].artboardRect, nm = d.artboards[a].name;
    for (L = 0; L < 2; L++) { var lay = d.layers.getByName(names[L]);
      for (j = 0; j < lay.pageItems.length; j++) { it = lay.pageItems[j];
        if (it.note !== nm && it.parent.typename === 'GroupItem') continue;
        var b = it.visibleBounds; if (b[2] < r[0] || b[0] > r[2] || b[1] < r[3] || b[3] > r[1]) continue;
        var w = b[2] - b[0], h = b[1] - b[3]; if (w >= 1030 || h >= 1300) continue;
        var l = b[0] - r[0], t = r[1] - b[1], rr = r[2] - b[2], bo = b[3] - r[3];
        if (it.typename === 'TextFrame' || w > 60) if (l < m || t < m || rr < m || bo < m) out.push(nm + ' ' + it.typename + ' L' + Math.round(l) + ' T' + Math.round(t) + ' R' + Math.round(rr) + ' B' + Math.round(bo) + (it.typename === 'TextFrame' ? ' "' + it.contents.substr(0, 18) + '"' : ''));
      } }
  }
  return out;
};
