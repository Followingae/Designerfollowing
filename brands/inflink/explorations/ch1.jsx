// Cover, contents, chapter 1: Brand
(function () {
  var S = '01 Brand';
  // 01 cover
  IL.go('G01_Cover', 'Canvas', 'Ink');
  IL.stage(24, 24, 1872, 1032, 'aurora', { r: 48 });
  IL.windows(1270, 470, 330, 'creator_cover.png', 'creator_reel.png', { fx: .5, fy: .4 }, { fx: .5, fy: .3 });
  IL.T(96, 800, 'Brand\nguidelines', 148, 'Ink', { lead: 158 });
  IL.logo(96, 90, 104, 'ink');
  IL.T(1824, 1000, 'Version 1, 2026', 28, 'Ink', { align: 'r' });

  // 02 contents
  IL.go('G02_Contents', 'Canvas', 'Ink', 'Contents', '02');
  IL.T(72, 230, 'Six parts,\none link.', 112);
  var ch = [['01', 'Brand', 'The idea, who it is for, how it talks'], ['02', 'Identity', 'Logo, colour, type'], ['03', 'Expression', 'Two dots, windows, the address, aurora, glass, pattern, icons, objects'], ['04', 'Imagery', 'Photography, people, phones, layout, motion'], ['05', 'In use', 'Site, app, Instagram, print, merch, outdoor, deck'], ['06', 'Resources', 'Accessibility, language, files']];
  var col = ['Peach', 'Violet', 'Lilac', 'Blush', 'Deep', 'Ink'], tc = ['Ink', 'White', 'Ink', 'Ink', 'White', 'White'];
  for (var i = 0; i < 6; i++) {
    var x = 72 + (i % 3) * 600, y = 400 + Math.floor(i / 3) * 320;
    IL.rect(x, y, 576, 296, col[i], { r: 32 });
    IL.T(x + 36, y + 76, ch[i][0], 26, tc[i], { w: 'M' });
    IL.T(x + 36, y + 180, ch[i][1], 64, tc[i]);
    IL.T(x + 36, y + 226, ch[i][2], 24, tc[i], { box: [510, 66], lead: 30 });
  }

  // 03 chapter
  IL.go('C01_Brand', 'Canvas', 'Ink');
  IL.stage(24, 24, 1872, 1032, 'peach', { r: 48 });
  IL.T(96, 150, '01', 44, 'Ink');
  IL.T(96, 960, 'Brand', 300, 'Ink');
  IL.img('people_creator.png', 1040, 110, 860, 970, { fit: true, ay: 1, ax: .7 });

  // 04 the idea
  IL.go('B01_Idea', 'Canvas', 'Ink', S + ' / The idea', '04');
  IL.dots(560, 480, 300);
  IL.T(1010, 400, 'Two dots,\none link.', 132, 'Ink', { lead: 146 });
  IL.T(1014, 640, 'A creator. A brand. The place they meet, agree a price and get paid. Our logo draws that moment, and everything else in the identity grows from it.', 32, 'Mid', { box: [760, 240], lead: 44 });
  IL.T(170, 960, 'Creator', 26, 'Ink', { w: 'S' }); IL.line(290, 951, 370, 800, 'Ink', 2);
  IL.T(1010, 960, 'Brand', 26, 'Ink', { w: 'S' }); IL.line(1000, 951, 930, 860, 'Ink', 2);

  // 05 positioning
  IL.go('B02_Position', 'Canvas', 'Ink', S + ' / What it is', '05');
  IL.stage(72, 100, 1776, 620, 'aurora');
  IL.T(136, 330, 'The link in bio\nthat gets you paid.', 132, 'Ink', { lead: 146 });
  IL.address(136, 530, 720, 110, 'noor', 'light');
  IL.phone('link_in_bio', 1200, 130, 600, 560);
  var a = [['For your audience', 'Every link you share, in one place.'], ['For brands', 'Your prices, and a way to book you and pay.'], ['For you', 'Money held safely, and paid when work is approved.']];
  for (var i2 = 0; i2 < 3; i2++) IL.cap(72 + i2 * 600, 800, a[i2][0], a[i2][1], 500);

  // 06 how it works
  IL.go('B03_How', 'Night', 'White', S + ' / How it works', '06');
  IL.T(72, 200, 'Six steps. Every order.', 96, 'White');
  var st = [['reel', 'Listed', 'You set the price'], ['brief', 'Briefed', 'AI writes the brief'], ['payout', 'Paid in', 'Brand pays at checkout'], ['held', 'Held', 'We hold the money'], ['approve', 'Approved', 'Brand approves the work'], ['link', 'Paid out', 'Money reaches your balance']];
  var cx0 = 196, gap = 306;
  IL.line(cx0, 500, cx0 + gap * 5, 500, 'Lilac', 3, { dash: [2, 10], round: true });
  for (var j = 0; j < 6; j++) {
    var cx = cx0 + j * gap;
    IL.circ(cx, 500, 104, j === 3 ? 'Violet' : 'White');
    IL.svg('icon_' + st[j][0], cx - 44, 456, 88, 88);
    IL.T(cx, 680, st[j][1], 34, 'White', { align: 'c' });
    IL.T(cx - 135, 726, st[j][2], 26, 'Lilac', { box: [270, 90], lead: 33, align: 'c' });
  }
  IL.T(72, 960, 'You have 72 hours to accept an order. If a brand stays silent after delivery, money releases after 7 days.', 30, 'White', { box: [1700, 50] });

  // 07 audiences
  IL.go('B04_Audiences', 'Canvas', 'Ink', S + ' / Who it is for', '07');
  var au = [['For creators', 'Sell your content from your link.', 'people_creator.png', 'peach'], ['For models', 'Digitals with dates. A diary that books.', 'people_model.png', 'lilac'], ['For brands', 'Find creators. Pay safely. Approve the work.', 'people_brand.png', 'aurora']];
  for (var k = 0; k < 3; k++) {
    var x3 = 72 + k * 600;
    IL.stage(x3, 100, 576, 900, au[k][3]);
    IL.img(au[k][2], x3, 300, 576, 700, { fit: true, ay: 1 });
    IL.T(x3 + 36, 180, au[k][0], 50, 'Ink');
    IL.T(x3 + 36, 226, au[k][1], 27, 'Ink', { box: [510, 76], lead: 34 });
  }
  IL.T(72, 1050, 'People in Inflink renders are fictional and AI-generated. Never present them as real creators.', 22, 'Soft');

  // 08 principles
  IL.go('B05_Principles', 'Canvas', 'Ink', S + ' / Principles', '08');
  var pr = [['Soft colour, real money', 'Warm to look at. Strict about payment.', 'object_held'], ['One big thing', 'One headline and one visual per moment.', 'object_address'], ['Show the real product', 'Phones show real screens. Never a made-up UI.', 'object_digitals'], ['Say what is true', 'No invented numbers, logos or creators.', 'object_approve']];
  for (var m = 0; m < 4; m++) {
    var x4 = 72 + m * 450;
    IL.rect(x4, 100, 426, 900, m % 2 ? 'Mist' : 'White', { r: 32 });
    IL.svg(pr[m][2], x4 + 43, 150, 340, 340);
    IL.T(x4 + 36, 620, pr[m][0], 48, 'Ink', { box: [370, 180], lead: 54 });
    IL.T(x4 + 36, 760, pr[m][1], 28, 'Soft', { box: [360, 190], lead: 36 });
  }

  // 09 voice
  IL.go('B06_Voice', 'Violet', 'White', S + ' / Voice', '09');
  IL.T(72, 300, 'We talk like a friend\nwho knows contracts.', 140, 'White', { lead: 156 });
  var vo = [['Plain', 'One short sentence a stranger understands.'], ['Warm', 'Creator first. Never corporate.'], ['Sure', 'We state facts about money and time.'], ['Brief', 'Fewer words every time.']];
  for (var n = 0; n < 4; n++) {
    IL.T(72 + n * 450, 700, vo[n][0], 84, 'White');
    IL.T(72 + n * 450, 780, vo[n][1], 32, 'White', { box: [400, 170], lead: 40 });
  }

  // 10 writing
  IL.go('B07_Writing', 'Canvas', 'Ink', S + ' / Writing', '10');
  IL.rect(72, 100, 876, 640, 'Mist', { r: 32 }); IL.rect(972, 100, 876, 640, 'Blush', { r: 32 });
  IL.T(116, 180, 'Say this', 30, 'V700', { w: 'S' }); IL.T(1016, 180, 'Not this', 30, 'Mid', { w: 'S' });
  var yes = ['The link in bio that gets you paid.', 'We hold the money until you approve the work.', 'AED 1,200'], no = ['Unlock your creator potential', '72 hours. In one booking.', 'Dhs1200!'];
  for (var q = 0; q < 3; q++) { IL.T(116, 280 + q * 150, yes[q], 44, 'Ink', { box: [790, 120], lead: 52 }); IL.T(1016, 280 + q * 150, no[q], 44, 'Mid', { box: [790, 120], lead: 52 }); }
  var ru = [['Style', 'British spelling, sentence case, numerals.'], ['Never', 'Em dashes, exclamation marks, emojis.'], ['Banned', 'Unlock, elevate, seamless, empower, supercharge, game-changer, revolutionise, next-level.'], ['Facts', 'Fees and limits come from facts.ts only.']];
  for (var r2 = 0; r2 < 4; r2++) IL.cap(72 + r2 * 450, 810, ru[r2][0], ru[r2][1], 410);

  // 11 vocabulary
  IL.go('B08_Words', 'Deep', 'White', S + ' / Our words', '11');
  IL.T(72, 200, 'Words we own.', 96, 'White');
  var wo = [['Your link', 'What a creator shares. inflink.ae/name'], ['Content', 'Reel, Story, Post, UGC. What you sell.'], ['Bundle', 'Your own content, sold as a set.'], ['Add-on', 'Tagging, collab post, usage rights, ad rights.'], ['Order', 'What a brand places.'], ['Held', 'Money safe until the work is approved.'], ['Brief', 'What to film, written from the brand\'s site.'], ['Digitals', 'Five simple photos of a model, with dates.']];
  for (var w = 0; w < 8; w++) {
    var wx = 72 + (w % 4) * 450, wy = 300 + Math.floor(w / 4) * 340;
    IL.rect(wx, wy, 426, 316, 'V900', { r: 28 });
    IL.T(wx + 32, wy + 90, wo[w][0], 48, 'White');
    IL.T(wx + 32, wy + 150, wo[w][1], 28, 'Lilac', { box: [365, 150], lead: 36 });
  }

  // 12 family
  IL.go('B09_Family', 'Canvas', 'Ink', S + ' / The family', '12');
  IL.T(72, 280, 'Powered\nby Following.', 112, 'Ink', { lead: 124 });
  IL.T(72, 540, 'Inflink is operated by Following FZC. It has its own look and voice. The two brands share one line of credit, never a style.', 30, 'Mid', { box: [720, 220], lead: 42 });
  IL.stage(900, 100, 948, 560, 'aurora');
  IL.logo(1094, 300, 110, 'ink');
  IL.rect(1180, 570, 390, 60, 'White', { r: 30, op: 90 });
  IL.T(1208, 609, 'Powered by', 24, 'Ink');
  IL.svg('following_ink', 1344, 586, 190, 30);
  IL.cap(900, 720, 'Where the badge goes', 'Hero of a page, footer, end of a film. Small pill, once per piece.', 440);
  IL.cap(1380, 720, 'Where it does not', 'Never as a lockup beside our logo, and never on creator pages.', 440);
})();
