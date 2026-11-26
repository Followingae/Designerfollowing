// Store screenshots. Loaded after store.jsx. One headline, one real app screen. Apple shows an iPhone, Play shows no hardware.
ST.F = [
  ['01-links', 'The link in bio\nbuilt for creators.', 'native_link_in_bio.png', 'aurora', 'Ink'],
  ['02-shop', 'Your shop sits right\nbelow your links.', 'native_store.png', 'peach', 'Ink'],
  ['03-brief', 'Know what to film\nbefore you start.', 'native_ai_brief.png', 'lilac', 'Ink'],
  ['04-paid', 'Brands pay first. You get\npaid when they approve.', 'native_order_detail_money_held.png', 'dusk', 'White'],
  ['05-analytics', 'See what’s working.\nAnalytics on Pro.', 'native_analytics.png', 'lilac', 'Ink'],
  ['06-models', 'Models get booked\nby the hour.', 'native_model_diary.png', 'peach', 'Ink'],
  ['07-earnings', 'See what you earned\nand withdraw it.', 'native_earnings.png', 'aurora', 'Ink'],
  ['08-orders', 'Every order,\nstep by step.', 'native_orders.png', 'night', 'White']
];
ST.has = function (f) { return new File(IL.A + 'links/' + f).exists; };
ST.frames = function () {
  for (var i = 0; i < 8; i++) {
    var a = ST.F[i]; if (!ST.has(a[2])) continue;
    // Apple 6.9, 1320 x 2868. The 6.3 set is exported from this same board
    var n = 'STORE_ios-6.9-' + a[0]; ST.board(n, 1160 + i * 700, 7400, 1320, 2868, null);
    IL.img('aurora/' + a[3] + '_p.jpg', 0, 0, 660, 1434, { lay: 'Image' });
    IL.T(60, 128, a[1].replace(/\n/g, '\r'), 54, a[4], { lay: 'Notes', lead: 62, track: -18 });
    IL.img(a[2].replace('native_', 'dev_ios_'), 40, 236, 580, 1198, { fit: true, ay: 0, lay: 'Mark' });
    ST.MAP[n] = ['apple/screenshots-6.9/ios-6.9-' + a[0] + '.png', 0];
    // Play, 1080 x 1920. Rounded screen only, no phone
    var p = 'STORE_play-phone-' + a[0]; ST.board(p, -7000 + i * 580, 7420, 1080, 1920, null);
    IL.img('aurora/' + a[3] + '_p.jpg', 0, 0, 540, 960, { lay: 'Image' });
    IL.T(44, 84, a[1].replace(/\n/g, '\r'), 42, a[4], { lay: 'Notes', lead: 48, track: -16 });
    IL.img(a[2].replace('native_', 'devb_android_'), 40, 150, 460, 810, { fit: true, ay: 0, lay: 'Mark' });
    ST.MAP[p] = ['google-play/screenshots/play-phone-' + a[0] + '.png', 0];
  }
};
