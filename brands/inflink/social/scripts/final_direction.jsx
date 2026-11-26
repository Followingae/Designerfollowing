// Inflink Instagram, the one direction. White pages with two dot windows, full-bleed posts on a diagonal, MC and OC2 carousels.
// Needs directions2 and directions3 helpers. Real app screens only: native_*.png, from the app store brief.
var H = 116;
D.t = function (y, str, size, col) { return IL.T(D.M, y, str.replace(/\n/g, '\r'), size || H, col, { lay: 'Notes', lead: (size || H) * 1.08, track: -22 }); };
D.next = function (x, y, fill, ink) { IL.circ(x, y, 58, fill, { lay: 'Notes' }); D.arrow(x, y, 26, ink, 7); };
D.logoAt = function (v) { IL.svg('logo_' + v, D.M, 1230, 190, 48, { lay: 'Notes' }); };
// white post. side l or r sets where the dots sit, top puts the words above them
D.white = function (name, k, a, b, hook, side, top, oa, ob) {
  D.board(name, 0, k, 'White');
  var R = 275, cx = side === 'r' ? 1008 - R * 1.46 : D.M + R, cy = top ? 455 + R : 90 + R;
  oa = oa || {}; ob = ob || {}; oa.lay = LM; ob.lay = LM;
  IL.windows(cx, cy, R, a, b, oa, ob);
  D.t(top ? 180 : 925, hook, H, 'Ink');
  D.logoAt('primary');
};
// full-bleed post
D.full = function (name, row, k, crop, hook, arrow) {
  D.board(name, row, k, 'Night');
  IL.img('../../social/assets/hook2/' + crop + '.jpg', 0, 0, 1080, 1350, { lay: LM });
  D.t(1030, hook, H, 'White'); D.logoAt('white');
  if (arrow) D.next(950, 1220, 'White', 'Ink');
};
// phone holding a real app screen
D.ph2 = function (x, y, w, file) { var h = w * 2400 / 1080; IL.rect(x - 14, y - 14, w + 28, h + 28, 'Ink', { r: w * .15, lay: LM }); IL.img(file, x, y, w, h, { r: w * .12, lay: LM }); };

D.buildPosts = function () {
  D.white('P01', 0, 'creator_reel.png', 'creator_story.png', 'Your link in bio\ntakes bookings.', 'l', false, { fy: .28 }, { fy: .45 });
  D.white('P02', 1, 'creator_avatar.png', 'creator_cover.png', 'Put your prices\nin your link.', 'r', true, { fy: .2 }, { fy: .4 });
  D.full('P03', 0, 2, 'h2', 'Brands pay you\nbefore you film.');
  D.white('P04', 3, 'digitals_front.png', 'digitals_hands.png', 'Your digitals,\nin one link.', 'r', false, { fy: 0, zoom: 1.5 }, { fy: .5 });
  D.full('P05', 0, 4, 'h5', 'No more\nchasing payment.');
  D.white('P06', 5, 'creator_reel.png', 'creator_ugc.png', 'AI writes\nyour brief.', 'l', true, { fy: .28 }, { fy: .4 });
  D.full('P07', 0, 6, 'h7', 'Sell venue visits\nfrom your bio.');
  D.white('P08', 7, 'creator_story.png', 'creator_venue.png', 'Reels, Stories, UGC.\nOne link.', 'r', false, { fy: .45 }, { fy: .5 });
  D.white('P09', 8, 'creator_cover.png', 'creator_avatar.png', 'Free to start.\nClaim your link.', 'l', true, { fy: .4 }, { fy: .2 });
  // 10: tap counts, on the real screen
  D.board('P10', 0, 9, 'White'); D.t(180, 'See taps on\nevery link.', H, 'Ink'); IL.dots(480, 730, 275); D.ph2(350, 455, 310, 'native_link_in_bio.png'); D.logoAt('primary');
  D.full('P11', 0, 10, 'h8', 'Your store,\nin your bio.');
  D.white('P12', 11, 'creator_venue.png', 'creator_ugc.png', 'Unlimited\nlinks.', 'r', false, { fy: .5 }, { fy: .4 });
};
D.buildCarA = function () { // MC style: same photo world, real screen on top, words at the foot
  D.full('CA1', 1, 0, 'h2', 'One link.\nEverything you do.', true);
  var s = [['Every link,\nin one place.', 'native_link_in_bio.png'], ['See what\ngets tapped.', 'native_links-mid.png'], ['Your store,\nin the same link.', 'native_store.png'], ['See who books.\nOn Pro.', 'native_analytics.png']];
  for (var i = 0; i < 4; i++) { D.board('CA' + (i + 2), 1, i + 1, 'Night'); IL.img('../../social/assets/hook2/h2.jpg', 0, 0, 1080, 1350, { lay: LM }); D.ph2(330, 86, 420, s[i][1]); D.t(1130, s[i][0], 92, 'White'); }
};
D.buildCarB = function () { // OC2 style: white page, phone sitting on the two dots
  D.board('CB1', 2, 0, 'White'); D.t(180, 'Your link,\nin 3 steps.', H, 'Ink'); IL.windows(D.M + 440, 730, 275, 'creator_reel.png', 'creator_ugc.png', { fy: .28, lay: LM }, { fy: .4, lay: LM }); D.logoAt('primary'); D.next(950, 1220, 'Ink', 'White');
  var s = [['1. Add your links.', 'native_link_in_bio.png'], ['2. List what you sell.', 'native_store.png'], ['3. Copy it to your bio.', 'native_links-mid.png']];
  for (var i = 0; i < 3; i++) { D.board('CB' + (i + 2), 2, i + 1, 'White'); D.t(170, s[i][0], 84, 'Ink'); IL.dots(470, 640, 340); D.ph2(330, 250, 420, s[i][1]); }
};

D.buildCarC = function () { // how you get paid, in the CA style. Cover is the approved P03 hook
  D.full('CC1', 3, 0, 'h2', 'Brands pay you\nbefore you film.', true);
  var c = [['A brand books.\nThe money is held.', 'native_order_detail_money_held.png'], ['You deliver.\nThey approve.', 'native_order_content_submitted.png'], ['Approved.\nReleased to you.', 'native_order_completed.png'], ['It lands\nin your balance.', 'native_earnings.png']];
  for (var i = 0; i < 4; i++) { D.board('CC' + (i + 2), 3, i + 1, 'Night'); IL.img('../../social/assets/hook2/h2.jpg', 0, 0, 1080, 1350, { lay: LM }); D.ph2(330, 86, 420, c[i][1]); D.t(1130, c[i][0], 92, 'White'); }
};
