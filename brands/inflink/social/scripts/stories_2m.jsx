// Inflink Stories, Nov and Dec 2026. Built for 9:16: giant brand dots bleeding off the screen, full-height photos, real app screens running off the foot. No post-in-a-frame.
var ST = { DIR: IL.ROOT + 'social/exports/2026-11-12_stories', FILE: IL.ROOT + 'social/Inflink_Stories.ai' };
ST.Q = ['Your bio,\nbut it takes bookings.', 'Built here.\nHappy Flag Day.', 'Who pays first?\nThe brand.', 'Exposure or money?\nEasy one.', 'Still sending\nrates by DM?',
 'What do you charge?\nPut it in your link.', 'Let brands\nbook you.', 'Models: your digitals,\nin one link.', 'Chased a payment\nthis year?', 'One link.\nReal bookings.',
 'Paid on approval.\nSee how.', 'Stuck on a brief?\nAI writes it.', 'DMs or invoices:\nwhich is worse?', 'Reels. Stories.\nYour prices.', 'Your diary.\nYour rules.',
 '7 days with no reply?\nYou still get paid.', 'Your link\nhas a QR code.', 'White Friday:\nsell your content.', 'Ad rights\ncost extra.', 'Booked. Filmed.\nApproved. Paid.',
 'Keep more\non Pro.', 'Late cancellation?\nSet your terms.', 'Happy\nEid Al Etihad.', 'One tap\nto approve.', 'How many links?\nAs many as you like.',
 'One link.\nEverything you sell.', 'Sell venue visits\nfrom your bio.', 'Worked for candles?\nNever again.', 'Sell bundles\nfrom your link.', 'AED 100 earned?\nWithdraw it.',
 'One link\nfor every client.', 'UGC pays.\nNo posting needed.', 'Brief to approved,\nin one place.', 'Which link works?\nSee the clicks.', 'Brands pay\nat checkout.',
 'Usage. Ad rights.\nPrice them.', 'Send a\nbooking link.', 'Sell your\nconsults too.', 'Fix your link\nbefore January.', 'Out of office.\nLink open.',
 'New prices\nfor 2027?', 'New year,\nnew digitals.', 'Claim your name\nfor 2027.', 'See you\nin 2027.'];
ST.W = ['Your link is\nyour shop window.', 'Price it\nbefore they ask.', 'Put it\nin your bio.', 'Know your\nusage fee.', 'Say no\nto free work.', 'Your prices.\nNot theirs.', 'Copy your link.\nPaste it in your bio.', 'One link\nfor everything.', 'Get the terms\nup front.', 'Keep your\ndiary current.', 'Update your listing\nthis weekend.', 'Add one\nnew service.', 'Check your\nbio link works.', 'Ad rights?\nCharge for them.', 'Your work\nhas a price.', 'Rest. Your link\nstays open.', 'Start 2027\nwith a price list.'];
ST.SCR = ['link_in_bio', 'you_are_live', 'order_detail_money_held', 'earnings', 'link_in_bio', 'listing_editor', 'store_listings', 'model_portfolio', 'earnings', 'you_are_live', 'order_completed', 'ai_brief', 'orders', 'listing_editor', 'model_diary', 'order_completed', 'link_in_bio', 'store_listings', 'listing', 'order_completed', 'earnings', 'cancellation_terms', 'store', 'order_completed', 'link_in_bio', 'store', 'store_listings', 'earnings', 'listing', 'withdraw', 'link_in_bio', 'ai_brief', 'ai_brief', 'link_in_bio', 'order_detail_money_held', 'listing', 'store', 'listing', 'link_in_bio', 'link_in_bio', 'listing_editor', 'model_portfolio', 'you_are_live', 'store'];
ST.PH = ['coat', 'blue', 'maroon', 'beauty', 'jacket', 'party', 'desk', 'burger', 'stickers', 'chair', 'avatar', 'reel', 'story', 'venue', 'cover', 'flowers', 'ugc'];
ST.FORCE = { 2: 'burj', 23: 'burj', 40: 'cover', 44: 'party', 27: 'venue', 28: 'flowers', 42: 'coat' };
ST.G = [['Violet', 'White', 'Peach'], ['Peach', 'Ink', 'Violet'], ['Deep', 'White', 'Coral'], ['Blush', 'Ink', 'Electric'], ['Electric', 'White', 'Blush'], ['Lilac', 'Ink', 'Peach']];
ST.open = function () {
  var i; for (i = 0; i < app.documents.length; i++) if (app.documents[i].name === 'Inflink_Stories.ai') { IL.doc = app.documents[i]; IL.doc.activate(); IL.boot(); return; }
  var f = new File(ST.FILE); if (f.exists) { IL.doc = app.open(f); IL.boot(); return; }
  IL.doc = app.documents.add(DocumentColorSpace.RGB, 1080, 1920); IL.doc.artboards[0].name = '_start'; IL.boot(); IL.doc.saveAs(f);
};
ST.board = function (name, n, ground) {
  var d = IL.doc, i, found = -1, x = -7000 + (n % 11) * 1200, y = 7000 - Math.floor(n / 11) * 2350, ab;
  for (i = 0; i < d.artboards.length; i++) if (d.artboards[i].name === name) found = i;
  IL.W = 1080; IL.H = 1920;
  if (found >= 0) { IL.clear(name); ab = d.artboards[found]; }
  else if (d.artboards[0].name === '_start') { ab = d.artboards[0]; ab.artboardRect = [x, y, x + 1080, y - 1920]; ab.name = name; }
  else { ab = d.artboards.add([x, y, x + 1080, y - 1920]); ab.name = name; }
  IL.cur = name; IL.org = [ab.artboardRect[0], ab.artboardRect[1]];
  IL.rect(0, 0, 1080, 1920, ground, { lay: 'Ground' });
};
ST.size = function (q) { var a = q.split('\n'), m = 0, i; for (i = 0; i < a.length; i++) m = Math.max(m, a[i].length); return Math.min(176, Math.floor(936 / (m * .47))); };
ST.txt = function (y, q, col) { var s = ST.size(q); return IL.T(D.M, y + s * .76, q.replace(/\n/g, '\r'), s, col, { lay: 'Notes', lead: s * 1.04, track: -22 }); };
ST.logo = function (v) { IL.svg('logo_' + v, D.M, 262, 190, 48, { lay: 'Notes' }); };
ST.Dots = function (name, n, q, g, a, b) { ST.board(name, n, g[0]); IL.windows(430, 1200, 500, 'pool_' + a + '.jpg', 'pool_' + b + '.jpg', { fy: .25, lay: LM }, { fy: .4, lay: LM }); ST.logo(g[1] === 'White' ? 'white' : 'primary'); ST.txt(350, q, g[1]); };
ST.App = function (name, n, q, g, scr) { ST.board(name, n, g[0]); IL.circ(900, 1250, 340, g[2], { lay: LM }); D.ph2(230, 800, 620, 'native_' + scr + '.png'); ST.logo(g[1] === 'White' ? 'white' : 'primary'); ST.txt(350, q, g[1]); };
ST.Full = function (name, n, q, ph) { ST.board(name, n, 'Night'); IL.img('../../social/assets/hook2/v_' + ph + '.jpg', 0, 0, 1080, 1920, { lay: LM }); ST.logo('white'); var s = ST.size(q); ST.txt(1550 - s * 1.04 * 2, q, 'White'); };
ST.build = function (from, to) {
  var M = ['Nov', 'Dec'], day, post = 0, wk = 0, n = 0, dt = new Date(2026, 10, 1), g = 0, ph = 0, dk = 0;
  for (day = 0; day < 61; day++, dt.setDate(dt.getDate() + 1)) {
    var dow = dt.getDay(), dd = dt.getDate(), name = 'ST_' + M[dt.getMonth() - 10] + (dd < 10 ? '0' : '') + dd, weekend = dow === 0 || dow === 6, q, mode, p = null, scr = '';
    if (weekend) { q = ST.W[wk]; mode = wk % 2 ? 'D' : 'F'; wk++; }
    else { post++; q = ST.Q[post - 1]; scr = ST.SCR[post - 1]; if (ST.FORCE[post]) { mode = 'F'; p = ST.FORCE[post]; } else mode = ['D', 'A', 'F'][post % 3]; }
    if (mode === 'F' && !p) { p = ST.PH[ph % 17]; ph++; }
    var C = ST.G[g % 6], a = ST.PH[dk % 17], b = ST.PH[(dk + 5) % 17];
    if (day >= from && day < to) {
      if (mode === 'F') ST.Full(name, n, q, p);
      else if (mode === 'A') ST.App(name, n, q, C, scr);
      else ST.Dots(name, n, q, C, a, b);
    }
    if (mode !== 'F') g++;
    if (mode === 'D') dk += 2;
    n++;
  }
};
ST.finish = function () {
  var d = IL.doc, L = d.layers.getByName('Notes'), j, i, c = 0, o = new ExportOptionsPNG24(); o.artBoardClipping = true; o.horizontalScale = 100; o.verticalScale = 100; o.transparency = false;
  for (j = 0; j < L.groupItems.length; j++) { var g = L.groupItems[j]; if (g.width > 90 || g.height > 25 || !/^ST_/.test(g.note)) continue; for (i = 0; i < d.artboards.length; i++) if (d.artboards[i].name === g.note) break; var r = d.artboards[i].artboardRect, s = 190 / g.width * 100; g.resize(s, s, true, true, true, true, s, Transformation.TOPLEFT); g.left = r[0] + 72; g.top = r[1] - 262; c++; }
  var fo = new Folder(ST.DIR); fo.create();
  for (i = 0; i < d.artboards.length; i++) { d.artboards.setActiveArtboardIndex(i); d.exportFile(new File(fo.fsName + '/' + d.artboards[i].name + '.png'), ExportType.PNG24, o); }
  return c;
};
