// Inflink: all 44 posts for November and December, in the approved direction. W white with dots, F full-bleed, R Reel cover. Carousels list their slides.
// Needs directions2, directions3, final_direction helpers.
var S = {};
S.slots = []; (function () { var r, k;
  for (k = 5; k < 12; k++) S.slots.push([1, k]); for (k = 4; k < 12; k++) S.slots.push([2, k]); for (k = 5; k < 12; k++) S.slots.push([3, k]);
  for (r = 4; r < 8; r++) for (k = 0; k < 12; k++) S.slots.push([r, k]); for (r = -1; r > -3; r--) for (k = 0; k < 12; k++) S.slots.push([r, k]); })();
S.n = 0;
S.go = function (name, ground) { var s = S.slots[S.n++]; D.board(name, s[0], s[1], ground); };
S.size = function (hook) { var a = hook.split('\n'), m = 0, i; for (i = 0; i < a.length; i++) m = Math.max(m, a[i].length); return Math.min(116, Math.floor(936 / (m * .47))); };
S.white = function (name, a, b, hook, v) {
  S.go(name, 'White');
  var side = v % 2 ? 'r' : 'l', top = v % 3 === 1, R = 275, cx = side === 'r' ? 1008 - R * 1.46 : D.M + R, cy = top ? 455 + R : 90 + R, sz = S.size(hook);
  IL.windows(cx, cy, R, 'pool_' + a + '.jpg', 'pool_' + b + '.jpg', { fy: .25, lay: LM }, { fy: .4, lay: LM });
  D.t(top ? 180 : 925, hook, sz, 'Ink'); D.logoAt('primary');
};
S.full = function (name, img, hook, arrow, reel) {
  S.go(name, 'Night'); IL.img('../../social/assets/hook2/x_' + img.replace('_foot', '') + '_foot.jpg', 0, 0, 1080, 1350, { lay: LM });
  D.t(1030, hook, S.size(hook), 'White'); D.logoAt('white');
  if (arrow) D.next(950, 1220, 'White', 'Ink');
  if (reel) IL.chip(D.M, D.M, 'Reel', 'White', 'Ink', 74);
};
S.noFace = { blue: 'story', jacket: 'venue', burger: 'ugc', desk: 'cover', party: 'story', coat: 'ugc', beauty: 'venue', chair: 'cover' };
S.ca = function (name, img, words, screen) { img = S.noFace[img] || img; S.go(name, 'Night'); IL.img('../../social/assets/hook2/x_' + img + '_foot.jpg', 0, 0, 1080, 1350, { lay: LM }); D.ph2(330, 86, 420, 'native_' + screen + '.png'); D.t(1130, words, Math.min(92, S.size(words)), 'White'); };
S.cb = function (name, words, screen) { var two = words.indexOf('\n') > 0; S.go(name, 'White'); D.t(150, words, Math.min(84, S.size(words)), 'Ink'); IL.dots(470, two ? 720 : 640, two ? 300 : 340); D.ph2(two ? 350 : 330, two ? 320 : 250, two ? 400 : 420, 'native_' + screen + '.png'); };
// [date, kind, hook, imageA, imageB, slides, style]
S.P = [
 ['Nov02', 'W', 'Your link in bio\ntakes bookings.', 'reel', 'story'],
 ['Nov03', 'F', 'Built for\nUAE creators.', 'burj', ''],
 ['Nov04', 'C', 'Brands pay you\nbefore you film.', 'ugc', '', [['A brand books.\nThe money is held.', 'order_detail_money_held'], ['You deliver.\nThey approve.', 'order_content_submitted'], ['Approved.\nReleased to you.', 'order_completed'], ['It lands\nin your balance.', 'earnings']], 'b'],
 ['Nov05', 'C', 'Get paid,\nnot exposure.', 'party', '', [['Set a price\nfor every format.', 'listing_editor'], ['Brands see it\nand book.', 'store_listings'], ['You get paid\non approval.', 'order_completed']], 'a'],
 ['Nov06', 'W', 'Send one link,\nnot your rates.', 'desk', 'story'],
 ['Nov09', 'C', 'Put your prices\nin your link.', 'coat', '', [['Add what you sell.', 'store_listings'], ['Set your price.', 'listing_editor'], ['Share one link.', 'link_in_bio']], 'a'],
 ['Nov10', 'W', 'Brands book\nyou here.', 'cover', 'bottle2'],
 ['Nov11', 'C', 'Your digitals,\nin one link.', 'blue', '', [['Five simple photos.\nAll dated.', 'model_portfolio'], ['Your sizes,\nready to send.', 'model_card_measurements'], ['Your diary,\nin one place.', 'model_diary']], 'a'],
 ['Nov12', 'W', 'No more\nchasing payment.', 'stickers', 'avatar'],
 ['Nov13', 'C', 'Turn your bio\ninto bookings.', 'beauty', '', [['Add your links.', 'link_in_bio'], ['List what you sell.', 'store'], ['Copy it to your bio.', 'you_are_live']], 'a'],
 ['Nov16', 'C', 'Paid on approval,\nnot in 60 days.', 'lmew23', '', [['Money is held\nat checkout.', 'order_detail_money_held'], ['See it in your\nbalance.', 'earnings'], ['Withdraw\nto your bank.', 'withdraw']], 'b', 'lpho21'],
 ['Nov17', 'F', 'AI writes\nyour brief.', 'lpho3'],
 ['Nov18', 'W', 'No more DMs\nand invoices.', 'lmew10', 'lpro36'],
 ['Nov19', 'F', 'Price Reels and\nStories your way.', 'lpho17', ''],
 ['Nov20', 'W', 'Your diary,\nyour rules.', 'lmew5', 'ldub23'],
 ['Nov23', 'C', 'Brand goes quiet?\nYou still get paid.', 'lfoo1', '', [['Your work\nis delivered.', 'order_content_submitted'], ['The brand has\n7 days to reply.', 'order_content_submitted'], ['Silent? Your\nmoney releases.', 'order_completed']], 'a'],
 ['Nov24', 'W', 'Your link has\na QR code.', 'ldub9', 'lfoo20'],
 ['Nov25', 'F', 'Sell your content\nthis White Friday.', 'lpro7', ''],
 ['Nov26', 'C', 'Charge extra\nfor ad rights.', 'lman9', '', [['Set your price.', 'listing_editor'], ['Add your extras.', 'listing'], ['Brands see\nthe full offer.', 'store_listings']], 'b', 'lpro33'],
 ['Nov27', 'F', 'Booked. Filmed.\nApproved. Paid.', 'lmew26', ''],
 ['Nov30', 'W', 'Keep more\non Pro.', 'ldub13', 'lmew19'],
 ['Dec01', 'C', 'Late cancellation?\nYou still get paid.', 'lrin8', '', [['Set your terms.', 'cancellation_terms'], ['Set your diary.', 'model_diary']], 'a'],
 ['Dec02', 'W', 'Happy\nEid Al Etihad.', 'ldub10', 'lmew15'],
 ['Dec03', 'C', 'Brands approve\nin one tap.', 'lpho26', '', [['You submit\nyour content.', 'order_content_submitted'], ['They approve.\nYou are paid.', 'order_completed']], 'a'],
 ['Dec04', 'W', 'Unlimited\nlinks.', 'lpho0', 'ldub35'],
 ['Dec07', 'F', 'One link.\nEverything you sell.', 'lrin7', ''],
 ['Dec08', 'C', 'Sell venue visits\nfrom your bio.', 'ldub25', '', [['Add a visit\nto your store.', 'store_listings'], ['A brand books it.', 'order_detail_money_held'], ['You go. You post.\nYou get paid.', 'order_completed']], 'b', 'lfoo7'],
 ['Dec09', 'C', 'Sell for money,\nnot candles.', 'lmew9', '', [['List your price.', 'listing'], ['Brands book it.', 'orders'], ['You earn.', 'earnings']], 'a'],
 ['Dec10', 'W', 'Sell bundles\nfrom your link.', 'lpho13', 'lpro37'],
 ['Dec11', 'F', 'Withdraw to your\nbank from AED 100.', 'lpho27', ''],
 ['Dec14', 'W', 'Send one link\nto every client.', 'lmew20', 'lpho6'],
 ['Dec15', 'C', 'Sell UGC without\nposting it.', 'lpro13', '', [['You film it.', 'ai_brief'], ['The brand posts it.', 'order_content_submitted'], ['You get paid.', 'earnings']], 'a'],
 ['Dec16', 'W', 'Brief to approved,\nin one place.', 'lmew13', 'lpro4'],
 ['Dec17', 'F', 'See clicks on\nevery link.', 'lpho25', ''],
 ['Dec18', 'C', 'Brands pay\nat checkout.', 'lmew33', '', [['The money is held.', 'order_detail_money_held'], ['You do the work.', 'ai_brief'], ['It is released\non approval.', 'order_completed']], 'b', 'lpro26'],
 ['Dec21', 'C', 'Sell add-ons with\nyour content.', 'lmew1', '', [['Tagging. Collab post.\nUsage. Ad rights.', 'listing']], 'a'],
 ['Dec22', 'W', 'Send a\nbooking link.', 'lmew16', 'ldub17'],
 ['Dec23', 'F', 'Sell consults\nfrom your link.', 'stickers', ''],
 ['Dec24', 'W', 'Fix your link\nbefore January.', 'jacket', 'flowers'],
 ['Dec25', 'F', 'Out of office.\nLink open.', 'cover'],
 ['Dec28', 'C', 'Update your\nprices for 2027.', 'burger', '', [['Open your listing.', 'listing'], ['Change your price.', 'listing_editor']], 'b'],
 ['Dec29', 'F', 'New year,\nnew digitals.', 'coat', ''],
 ['Dec30', 'W', 'Claim your name\nfor 2027.', 'avatar', 'cover'],
 ['Dec31', 'F', 'See you\nin 2027.', 'party']
];
S.build = function (from, to) {
  for (var i = from; i < to && i < S.P.length; i++) {
    var p = S.P[i], id = 'I' + (i < 9 ? '0' : '') + (i + 1) + '_' + p[0], s, j;
    // keep the slot sequence stable when building in batches
    if (p[1] === 'W') S.white(id, p[3], p[4], p[2], i);
    else if (p[1] === 'F') S.full(id, p[3], p[2]);
    else if (p[1] === 'R') S.full(id, p[3], p[2], false, true);
    else {
      if (p[6] === 'a') S.full(id + '_01', p[3], p[2], true);
      else { S.go(id + '_01', 'White'); D.t(180, p[2], S.size(p[2]), 'Ink'); IL.windows(D.M + 440, 730, 275, 'pool_' + p[3] + '.jpg', 'pool_' + (p[7] || ['venue', 'story', 'cover', 'bottle2'][i % 4]) + '.jpg', { fy: .25, lay: LM }, { fy: .4, lay: LM }); D.logoAt('primary'); D.next(950, 1220, 'Ink', 'White'); }
      for (j = 0; j < p[5].length; j++) { s = id + '_0' + (j + 2); if (p[6] === 'a') S.ca(s, p[3], p[5][j][0], p[5][j][1]); else S.cb(s, p[5][j][0], p[5][j][1]); }
    }
  }
};
// counts how many slots earlier posts used, so a batch can start in the right place
S.count = function (to) { var c = 0, i; for (i = 0; i < to; i++) c += S.P[i][1] === 'C' ? 1 + S.P[i][5].length : 1; return c; };
S.exportAll = function (from, to) {
  var fo = new Folder(IL.ROOT + 'social/exports/2026-11-12_posts'); fo.create();
  var d = IL.doc, o = new ExportOptionsPNG24(); o.artBoardClipping = true; o.horizontalScale = 100; o.verticalScale = 100; o.transparency = false;
  for (var i = 0; i < d.artboards.length; i++) { var n = d.artboards[i].name; if (!/^I\d\d_/.test(n)) continue; var v = parseInt(n.substr(1, 2), 10); if (v < from + 1 || v > to) continue; d.artboards.setActiveArtboardIndex(i); d.exportFile(new File(fo.fsName + '/' + n + '.png'), ExportType.PNG24, o); }
};
