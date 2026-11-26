// Booklet cover v3.1. Key s40: back 0-105, spine 105-110, front 110-215 (mm). Black, lime wordmark, five-colour top bar.
Y.cover = function () {
  var s = 40, g = FG.org('s40'), i, t;
  B.clear(s);
  B.r(s, -3, -3, 221, 80, 'Ink');
  // front: the five worlds as one bar across the top
  var cols = ['Burgundy', 'Tomato', 'Cobalt', 'Forest', 'Mustard'], names = ['Paid', 'Barter', 'Cashback', 'Production', 'How we work'];
  for (i = 0; i < 5; i++) {
    B.r(s, 110 + i * 21, -3, (i === 4 ? 24 : 21), 7.8, cols[i], { layer: 'Mark' });
    B.t(s, 112 + i * 21, 3.05, names[i].toUpperCase(), Y.TM, 3.9, (i === 4 ? 'Ink' : 'White'), { track: 110 });
  }
  B.wm(s, 117, 24, 76, 'Lime');
  Y.sub(s, 117, 'Building the future of influencer marketing', 'White', 50, 9.5);
  Y.lab(s, 117, 67.6, 'What we do', 'White'); Y.lab(s, 208, 67.6, '2026', 'White', 'r');
  // back
  W.flag(s, 7, 62.4, 10);
  Y.lab(s, 20, 66.2, 'Born in Dubai', 'White'); Y.lab(s, 98, 66.2, 'following.ae', 'White', 'r');
  Y.lab(s, 7, 9.8, 'Also by Following: Inflink', 'White');
  // spine
  t = Y.lab(s, 107.5, 37, 'Following    What we do    2026', 'White', 'c'); t.rotate(-90);
  t.position = [g[0] + 107.5 * B.MM - t.width / 2, g[1] - 37 * B.MM + t.height / 2];
  var o = new ImageCaptureOptions(); o.resolution = 200; o.antiAliasing = true; o.matte = true; o.matteColor = FG.rgb(255, 255, 255);
  FG.doc.imageCapture(new File(XD + 'bk2/cover.png'), [g[0], g[1], g[0] + 215 * B.MM, g[1] - 74 * B.MM], o);
  return 'cover ok';
};
