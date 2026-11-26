// App store assets, inside the guidelines file. Boards are half size and export at 200% so they hit the exact pixel sizes.
var ST = { OUT: 'C:/Users/user/Desktop/App Stores Submission Assets/' };
ST.board = function (name, x, y, wpx, hpx, ground) {
  var d = IL.doc, i, found = -1, w = wpx / 2, h = hpx / 2, ab;
  for (i = 0; i < d.artboards.length; i++) if (d.artboards[i].name === name) found = i;
  if (found >= 0) { IL.clear(name); ab = d.artboards[found]; } else { ab = d.artboards.add([x, y, x + w, y - h]); ab.name = name; }
  IL.W = w; IL.H = h; IL.cur = name; IL.org = [ab.artboardRect[0], ab.artboardRect[1]];
  if (ground) IL.rect(0, 0, w, h, ground, { lay: 'Ground' });
  return ab;
};
ST.markC = function (w, v, S) { // mark centred at width w (px at full size)
  var s = w / 2, b = IL.W; IL.svg('mark_' + v, (IL.W - s) / 2, (IL.H - s) / 2, s, s);
};
ST.icons = function () {
  var X = -7000, Y = 8000, gap = 40, x = X;
  function nx(wpx) { var r = x; x += wpx / 2 + gap; return r; }
  ST.board('STORE_ios-icon-1024', nx(1024), Y, 1024, 1024, 'FAFBF6'); ST.markC(620, 'primary');
  ST.board('STORE_ios-icon-alt-violet', nx(1024), Y, 1024, 1024, 'Violet'); IL.dots(IL.W * .44, IL.H * .43, 78, 'Peach', 'Lilac');
  ST.board('STORE_play-icon-512', nx(512), Y, 512, 512, 'FAFBF6'); ST.markC(310, 'primary');
  ST.board('STORE_android-icon-foreground', nx(1024), Y, 1024, 1024, null); ST.markC(600, 'primary');
  ST.board('STORE_android-icon-background', nx(1024), Y, 1024, 1024, 'FAFBF6');
  ST.board('STORE_android-icon-monochrome', nx(1024), Y, 1024, 1024, null); ST.markC(580, 'ink');
  ST.board('STORE_notification-icon', nx(96), Y, 96, 96, null); ST.markC(80, 'white');
  ST.board('STORE_splash-icon', nx(1024), Y, 1024, 1024, null); ST.markC(620, 'primary');
  ST.board('STORE_play-feature-1024x500', nx(1024), Y, 1024, 500, null);
  IL.img('aurora/aurora_w.jpg', 0, 0, 512, 250, { lay: 'Image' });
  IL.svg('logo_ink', 121, 52, 270, 68, { lay: 'Notes' });
  IL.T(256, 186, 'The link in bio built for creators', 28, 'Ink', { align: 'c', lay: 'Notes', track: -6 });
};
// map board name to path, with alpha only where the brief wants it
ST.MAP = {
  'STORE_ios-icon-1024': ['apple/icon/ios-icon-1024.png', 0], 'STORE_ios-icon-alt-violet': ['apple/icon/ios-icon-1024-ALT-violet-for-review.png', 0], 'STORE_play-icon-512': ['google-play/icon/play-icon-512.png', 0],
  'STORE_android-icon-foreground': ['app-build/android-icon-foreground.png', 1], 'STORE_android-icon-background': ['app-build/android-icon-background.png', 0], 'STORE_android-icon-monochrome': ['app-build/android-icon-monochrome.png', 1],
  'STORE_notification-icon': ['app-build/notification-icon.png', 1], 'STORE_splash-icon': ['app-build/splash-icon.png', 1], 'STORE_play-feature-1024x500': ['google-play/feature/play-feature-1024x500.png', 0]
};
ST.export = function (re) {
  var d = IL.doc, i, n;
  for (i = 0; i < d.artboards.length; i++) {
    n = d.artboards[i].name; var m = ST.MAP[n]; if (!m || (re && !re.test(n))) continue;
    var f = new File(ST.OUT + m[0]); new Folder(f.parent.fsName).create();
    var o = new ExportOptionsPNG24(); o.artBoardClipping = true; o.horizontalScale = 200; o.verticalScale = 200; o.transparency = !!m[1]; o.antiAliasing = true;
    d.artboards.setActiveArtboardIndex(i); d.exportFile(f, ExportType.PNG24, o);
  }
};
