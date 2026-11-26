// Following guidelines v4: visual-first pages. Loads gl3.jsx (helpers). One idea per page, the visual leads, a sentence at most.
$.evalFile(new File('C:/Users/user/Desktop/DesignerFollowing/brands/following/explorations/gl3.jsx'));
GL.Z = GL.R + 'final/assets/illustration/zain_set/';
GL.PH = 'C:/Users/user/Desktop/Following/App Store Screenshots/mockup exps/';
GL.V = {};
GL.vslot = function (name, idx) {
  var d = FG.doc, ab, x = 4700 + (idx % 2) * 2000, y = -372 - Math.floor(idx / 2) * 1160;
  try { ab = d.artboards.getByName(name); } catch (e) { ab = d.artboards.add([x, y, x + FG.W, y - FG.H]); ab.name = name; }
  return ab;
};
GL.vstart = function (name, idx, ground, ink, section, folio) { GL.spots(); GL.vslot(name, idx); FG.page(name, ground, ink, section, folio); };
GL.big = function (p, x, y, str, size, col, font) { return GL.raw(p, x, y, str, font || 'Obviously-NarwBlck', size, col, { lead: size * 0.86 }); };
GL.cap = function (p, x, y, str, col) { return FG.text(p, 'Type', x, y, str, 'M', 18, col, { lead: 26 }); };

GL.V.S01_Chapter_Brand = function (p) {
  GL.vstart(p, 0, 'Ink', 'White', '', '');
  GL.img(p, GL.LINKS + 'Joyful Connection HR.png', 0, 0, FG.W, FG.H, 0.62, 0.35, 'photo');
  GL.big(p, 70, 1000, '01', 560, 'Lime');
  GL.big(p, 640, 1000, 'BRAND', 250, 'White');
  FG.label(p, 1840, 66, 'Following / Brand Guidelines', 'White', { align: 'r' });
  FG.text(p, 'Type', 1840, 860, 'The idea\rWho we are\rValues\rAudiences', 'M', 24, 'White', { lead: 34, align: 'r' });
};

GL.V.S02_What_We_Do = function (p) {
  GL.vstart(p, 1, 'Ink', 'Lime', '01 / Brand / What we do', '04');
  GL.title(p, 80, 190, 'One app.', 'Four ways to work.', 'White', 96);
  var S = [['PAID COLLABS', 'Lime', 'Ink', '5.png', 'Named talent for launches. Pay on approval.'], ['RECEIVE PRODUCTS', 'Forest', 'Lime', '3.png', 'Barter: send product, get content every month.'], ['CASHBACK', 'Violet', 'White', '6.png', 'Customers post and get money back in AED.'], ['PRODUCTION', 'Tomato', 'White', '7.png', 'Five formats, made by our own crew.']];
  var i;
  for (i = 0; i < 4; i++) {
    var x = 690 + i * 300;
    GL.fit(p, GL.PH + S[i][3], x, 330, 260, 530, 'phone');
    GL.pill(p, x + 130, 300, S[i][0], 20, S[i][1], S[i][2], i % 2 ? 4 : -4);
    GL.body(p, x, 900, 260, 120, S[i][4], 'White', 18);
  }
  GL.body(p, 80, 330, 520, 300, 'Brands find creators, brief them, approve the post and pay, all in the app. Creators apply in a tap and get paid in AED.', 'Lilac', 24);
};

GL.V.S03_Colour_In_Use = function (p) {
  GL.vstart(p, 2, 'Cream', 'Ink', '04 / Colour / Proportion', '14');
  GL.title(p, 80, 190, 'Mostly black.', 'Then a shout.', 'Ink', 96);
  var P = [['Ink', 0.46, 'White', '#050911'], ['Lime', 0.2, 'Ink', '#D3FF02'], ['Violet', 0.14, 'White', '#5100F3'], ['Cream', 0.1, 'Ink', '#F6F3EB'], ['Lilac', 0.05, 'Ink', '#C9A7F9'], ['Forest', 0.05, 'Lime', '#1E3F20']];
  var x = 80, i, W = 1760;
  for (i = 0; i < P.length; i++) {
    var w = W * P[i][1];
    FG.rect(p, 'Ground', x, 300, w, 300, P[i][0], { id: 'bar', stroke: P[i][0] === 'Cream' ? 'Ink' : null, strokeW: 1 });
    if (w > 90) { FG.text(p, 'Type', x + 24, 350, P[i][0], 'EB', 26, P[i][2], {}); FG.text(p, 'Type', x + 24, 576, Math.round(P[i][1] * 100) + '%', 'EB', 56, P[i][2], {}); FG.text(p, 'Type', x + 24, 380, P[i][3], 'M', 15, P[i][2], {}); }
    x += w;
  }
  GL.img(p, GL.PREV + 'K06_Card_Brands_A6_105x148.png', 80, 660, 560, 340, 0.5, 0.2, 'use');
  GL.img(p, GL.PH + '6.png', 680, 660, 560, 340, 0.5, 0.12, 'use');
  GL.img(p, GL.R + 'exports/booklet/spreads/p12-13.jpg', 1280, 660, 560, 340, 0.75, 0.5, 'use');
  GL.cap(p, 80, 1040, 'Intro card', 'Ink'); GL.cap(p, 680, 1040, 'App, wallet', 'Ink'); GL.cap(p, 1280, 1040, 'Booklet, PAID', 'Ink');
};

GL.V.S04_Illustration = function (p) {
  GL.vstart(p, 3, 'Ink', 'Lime', '07 / Imagery / Illustration', '25');
  GL.fit(p, GL.Z + 'hero_creator_with_tags.png', 60, 120, 900, 900, 'hero');
  GL.title(p, 1020, 220, 'Creators,', 'mid-shot.', 'White', 96);
  var i, N = ['Shoot', 'Unbox', 'Talk', 'Capture', 'Spot it', 'Close-up', 'Film', 'Podcast'];
  for (i = 0; i < 8; i++) {
    var x = 1020 + (i % 4) * 210, y = 380 + Math.floor(i / 4) * 300;
    FG.rect(p, 'Ground', x, y, 190, 190, i % 3 === 0 ? 'Lime' : (i % 3 === 1 ? 'Lilac' : 'Cream'), { id: 'tile', radius: 95 });
    GL.fit(p, GL.Z + 'spot_0' + (i + 1) + '.png', x + 15, y + 15, 160, 160, 'spot');
    GL.cap(p, x, y + 230, N[i], 'White');
  }
  GL.body(p, 1020, 940, 820, 100, 'Navy line, lime phone, one red spark. Hands and phones, never faces in profile.', 'Lilac', 20);
};

GL.V.S05_Kit_In_The_Wild = function (p) {
  GL.vstart(p, 4, 'Ink', 'Lime', '09 / Applications / Packaging', '30');
  GL.img(p, 'C:/Users/user/Downloads/WhatsApp Image 2026-10-13 at 5.36.25 PM.jpeg', 0, 0, 1040, FG.H, 0.5, 0.5, 'bag');
  GL.title(p, 1110, 220, 'Black outside.', 'Colour inside.', 'White', 84);
  GL.fit(p, GL.R + 'exports/guidelines_boards/kit_board.jpg', 1110, 380, 730, 560, 'kit');
  GL.cap(p, 1110, 1000, 'Box, bag, hello card, booklet band, note and cards. At the printer for samples, October 2026.', 'Lilac');
};

GL.V.S06_Photography = function (p) {
  GL.vstart(p, 5, 'Ink', 'Lime', '07 / Imagery / Photography', '26');
  GL.img(p, GL.LINKS + 'Man with Smartphone Outdoors HR.png', 0, 0, 760, FG.H, 0.55, 0.4, 'ph');
  GL.img(p, GL.LINKS + 'Dessert in the Sky HR.png', 780, 0, 560, 640, 0.5, 0.25, 'ph');
  GL.img(p, GL.LINKS + 'DJ in Tropical Vibes HR.png', 1360, 0, 560, 640, 0.6, 0.3, 'ph');
  GL.pill(p, 470, 560, 'PHONE IN HAND', 22, 'Lime', 'Ink', -5);
  GL.pill(p, 1060, 140, 'OPEN SKY', 22, 'Lime', 'Ink', 4);
  GL.pill(p, 1640, 520, 'COLOUR, LOUD', 22, 'Lime', 'Ink', -4);
  GL.title(p, 820, 790, 'Real people,', 'real daylight.', 'White', 84);
  GL.body(p, 820, 920, 1000, 120, 'One subject, cropped close, under a UAE sky. Never handshakes, laptops on desks or posed group smiles.', 'Lilac', 20);
};

GL.vbuild = function (name) { GL.V[name](name); return name + ' ok'; };
