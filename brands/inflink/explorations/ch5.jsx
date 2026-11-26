// Chapter 5: In use. Chapter 6: Resources
(function () {
  var S = '05 In use';
  var ST = function (x, y, w, h, tone, o) { o = o || {}; o.lay = o.lay || 'Mark'; return IL.stage(x, y, w, h, tone, o); };
  var IM = function (f, x, y, w, h, o) { o = o || {}; o.lay = 'Mark'; return IL.img(f, x, y, w, h, o); };

  IL.go('C05_In_Use', 'Canvas', 'Ink');
  IL.stage(24, 24, 1872, 1032, 'lilac', { r: 48 });
  IL.T(96, 150, '05', 44, 'Ink');
  IL.phone('store', 1160, 90, 680, 900);
  IL.T(96, 960, 'In use', 300, 'Ink');

  // U01 website
  IL.go('U01_Website', 'Canvas', 'Ink', S + ' / The site');
  IL.img('site_hero-desktop.jpg', 72, 100, 1160, 660, { r: 24, fy: 0 });
  IL.img('site_discover-desktop.jpg', 1256, 100, 592, 318, { r: 20, fy: 0 });
  IL.img('site_stage-with-digitals.jpg', 1256, 442, 592, 318, { r: 20, fy: 0 });
  IL.T(72, 860, 'www.inflink.ae', 72, 'Ink');
  IL.T(760, 830, 'Light canvas, Stage cards, one visual per section. Live code and tokens sit in the Inflink Design System folder.', 30, 'Mid', { box: [1080, 130], lead: 42 });

  // U02 app
  IL.go('U02_App', 'Sand', 'Ink', S + ' / The app');
  var sc = ['native_link_in_bio.png', 'native_orders.png', 'native_ai_brief.png', 'native_order_content_submitted.png', 'native_earnings.png', 'native_analytics.png'];
  for (var i = 0; i < 6; i++) {
    var x = 80 + i * 300, y = 110 + (i % 2) * 50;
    IL.rect(x - 10, y - 10, 280, 598, 'Ink', { r: 46 });
    IM(sc[i], x, y, 260, 578, { r: 38, fy: 0 });
  }
  IL.T(72, 850, 'Real screens, fictional data.', 64, 'Ink');
  IL.T(72, 910, 'Peach stays out of product chrome. Violet marks actions and active states.', 30, 'Soft');

  // U03 components
  IL.go('U03_Components', 'White', 'Ink', S + ' / Interface pieces');
  IL.T(72, 170, 'Buttons', 34, 'Soft');
  var bx = 72;
  bx += IL.chip(bx, 200, 'Get your link', 'Ink', 'White', 72) + 14;
  bx += IL.chip(bx, 200, 'See prices', 'Mist', 'V700', 72) + 14;
  bx += IL.chip(bx, 200, 'Book now', 'Violet', 'White', 72) + 14;
  bx += IL.chip(bx, 200, 'Disabled', 'Sand2', 'Soft', 72) + 14;
  IL.T(72, 370, 'Claim your link', 34, 'Soft');
  IL.address(72, 400, 800, 104, 'noor', 'light'); IL.rect(72, 400, 800, 104, null, { r: 52, stroke: 'Sand2', sw: 2 });
  IL.T(100, 545, 'Available', 28, 'Ok', { w: 'S' });
  IL.T(960, 170, 'Service card', 34, 'Soft');
  IM('creator_reel.png', 960, 200, 888, 330, { r: 22, fy: .3 });
  IL.chip(990, 230, 'Reel', 'White', 'Ink', 56);
  IL.chip(1610, 445, 'AED 1,200', 'Ink', 'White', 62);
  IL.T(72, 650, 'Bento', 34, 'Soft');
  IL.rect(72, 680, 560, 310, 'Deep', { r: 22 }); IL.T(108, 800, 'Unlimited\nlinks', 62, 'White', { lead: 70 });
  IL.rect(656, 680, 300, 310, 'Blush', { r: 22 }); IL.qr(700, 716, 140); IL.T(692, 950, 'QR code', 40, 'Ink');
  ST(980, 680, 400, 310, 'aurora', { r: 22 }); IL.T(1014, 950, 'Your page', 40, 'Ink');
  IL.rect(1404, 680, 444, 310, 'Mist', { r: 22 }); IL.svg('icon_analytics', 1440, 716, 110, 110); IL.T(1440, 950, 'Click counts', 40, 'Ink');

  // mini post: x, y, w; h at 4:5
  function post(kind, x, y, w) {
    var h = w * 1.25, u = w / 1080, m = 64 * u;
    if (kind === 'windows') { IL.rect(x, y, w, h, 'Canvas'); IL.windows(x + w * .42, y + h * .36, w * .3, 'creator_avatar.png', 'creator_reel.png', { fy: .3, lay: 'Mark' }, { fy: .4, lay: 'Mark' }); IL.T(x + m, y + h - m * 2.7, 'Sell your Reel\nfrom your link.', 104 * u, 'Ink', { lead: 118 * u }); }
    if (kind === 'type') { IM('aurora/aurora_s.jpg', x, y, w, h); IL.T(x + m, y + h * .42, 'Stop\nchasing\npayment.', 190 * u, 'Ink', { lead: 204 * u }); IL.mark(x + m, y + h - m * 2.2, 90 * u, 'ink'); }
    if (kind === 'photo') { IM('creator_venue.png', x, y, w, h); IL.chip(x + m, y + m, 'Venue visit', 'White', 'Ink', 74 * u); IL.chip(x + m, y + h - m - 90 * u, 'AED 1,200', 'Ink', 'White', 90 * u); }
    if (kind === 'glass') { IM('aurora/fluted_night.jpg', x, y, w, h); IL.T(x + m, y + h * .58, 'Held', 230 * u, 'White'); IL.T(x + m, y + h * .7, 'until you approve.', 66 * u, 'White'); }
    if (kind === 'address') { IL.rect(x, y, w, h, 'Violet'); IL.T(x + m, y + h * .36, 'Your link\nis waiting.', 150 * u, 'White', { lead: 164 * u }); IL.address(x + m, y + h - m - 130 * u, w - 2 * m, 130 * u, 'yourname', 'light'); }
    if (kind === 'hand') { IM('aurora/peach_s.jpg', x, y, w, h); IM('app_applinks.png', x + w * .1, y + h * .06, w * .9, h * .94, { fit: true, ay: 1 }); }
    if (kind === 'object') { IL.rect(x, y, w, h, 'Blush'); IL.svg('object_diary', x + w * .14, y + h * .08, w * .72, w * .72); IL.T(x + m, y + h - m * 1.2, 'Your diary books itself.', 76 * u, 'Ink'); }
    if (kind === 'fee') { IL.rect(x, y, w, h, 'Deep'); IL.T(x + m, y + h * .2, 'Pro', 76 * u, 'Lilac'); IL.T(x + m, y + h * .56, '4.5%', 300 * u, 'White'); IL.T(x + m, y + h * .7, 'plus AED 2, on what you earn.', 56 * u, 'Lilac'); }
    if (kind === 'ugc') { IL.rect(x, y, w, h, 'White'); IM('creator_ugc.png', x + m, y + m, w - 2 * m, h - m * 4, { r: 40 * u }); IL.dots(x + m + 34 * u, y + h - m * 1.65, 34 * u); IL.T(x + m + 120 * u, y + h - m * 1.25, 'Made with inflink.ae/noor', 46 * u, 'Ink'); }
  }
  // U04 feed
  IL.go('U04_Feed', 'Sand', 'Ink', S + ' / Instagram');
  var order = ['windows', 'type', 'photo', 'glass', 'ugc', 'address', 'hand', 'object', 'fee'], pw = 256;
  for (var f = 0; f < 9; f++) post(order[f], 72 + (f % 3) * (pw + 6), 90 + Math.floor(f / 3) * (pw * 1.25 + 6), pw);
  IL.T(960, 280, 'A feed you can\nspot from across\nthe room.', 84, 'Ink', { lead: 96 });
  IL.T(964, 560, 'A rhythm of type, photo and product, held together by the dots, the address and our colours.', 32, 'Mid', { box: [720, 170], lead: 42 });
  IL.T(964, 780, 'The full template set, calendar and series plan live in the separate Inflink social guide.', 28, 'Soft', { box: [720, 110], lead: 38 });

  // U05 posts close
  IL.go('U05_Posts', 'Canvas', 'Ink', S + ' / Post types');
  var pk = [['windows', 'Dot windows'], ['type', 'Big type'], ['glass', 'Money'], ['fee', 'Plain facts']];
  for (var q = 0; q < 4; q++) { post(pk[q][0], 72 + q * 450, 100, 426); IL.T(72 + q * 450, 680, pk[q][1], 34, 'Ink'); }
  var pc = [['Type is big', 'Readable at grid size, about 110px on a 1080 post.'], ['One idea', 'One post, one sentence.'], ['True numbers', 'Every number comes from facts.ts.'], ['Square-safe', 'Keep key content inside the 3:4 crop.']];
  for (var r = 0; r < 4; r++) IL.cap(72 + r * 450, 760, pc[r][0], pc[r][1], 410);

  // U06 stories
  IL.go('U06_Stories', 'Night', 'White', S + ' / Stories and Reels');
  var sw = 340, sh = 604, sy = 110, sg = 19, sx0 = 72, st0 = 1;
  IM('creator_reel.png', sx0, sy, sw, sh, { r: 24, fy: .3 }); IL.chip(sx0 + 22, sy + 24, 'Reel', 'White', 'Ink', 56);
  sx0 += sw + sg; ST(sx0, sy, sw, sh, 'aurora', { r: 24 }); IL.T(sx0 + 28, sy + 170, 'What\nshould I\ncharge', 70, 'Ink', { lead: 76 }); IL.address(sx0 + 22, sy + sh - 110, sw - 44, 70, 'noor', 'light');
  sx0 += sw + sg; IM('aurora/fluted_tall.jpg', sx0, sy, sw, sh, { r: 24 }); IL.T(sx0 + sw / 2, sy + 280, 'AED 1,200', 46, 'White', { align: 'c' }); IL.T(sx0 + sw / 2, sy + 324, 'Held', 30, 'White', { align: 'c' });
  sx0 += sw + sg; IL.rect(sx0, sy, sw, sh, 'Peach', { r: 24 }); IL.phone('order_content_submitted', sx0, sy + 90, sw, sh - 100); IL.T(sx0 + 26, sy + 66, 'Approved', 48, 'Ink');
  sx0 += sw + sg; IM('creator_story.png', sx0, sy, sw, sh, { r: 24 }); IL.chip(sx0 + 22, sy + 24, 'Venue visit', 'White', 'Ink', 56);
  var sr = [['Photos go full screen', 'Never in a box inside a Story.'], ['Safe area', 'Keep 250px clear top and bottom on 1920.'], ['End on the address', 'Last frame always points to a link.']];
  for (var t = 0; t < 3; t++) IL.cap(72 + t * 600, 800, sr[t][0], sr[t][1], 540, 'White');

  // U07 UGC frame
  IL.go('U07_UGC', 'Canvas', 'Ink', S + ' / Creator work');
  IL.rect(72, 100, 620, 880, 'White', { r: 24 });
  IM('creator_ugc.png', 102, 130, 560, 700, { r: 16 });
  IL.dots(136, 884, 34); IL.T(210, 882, 'Made with', 25, 'Soft'); IL.T(210, 920, 'inflink.ae/noor', 36, 'Ink');
  IL.T(760, 310, 'Their work.\nOur quiet frame.', 104, 'Ink', { lead: 116 });
  IL.T(764, 490, 'When we repost a creator, their picture does the talking. A white frame, the dots and their address. Nothing else.', 34, 'Mid', { box: [1000, 180], lead: 46 });
  IL.T(764, 720, 'Always ask first and credit by their real handle.', 34, 'Ink', { box: [1000, 60] });
  IL.T(72, 1040, 'Handle shown is an example from a fictional account.', 22, 'Soft');

  // U08 share card
  IL.go('U08_Share', 'Sand', 'Ink', S + ' / Share and QR');
  IL.rect(120, 120, 480, 840, 'White', { r: 48 });
  IL.windows(320, 340, 130, 'creator_avatar.png', 'creator_reel.png', { fy: .3, lay: 'Mark' }, { fy: .4, lay: 'Mark' });
  IL.T(360, 590, 'Book me on Inflink', 42, 'Ink', { align: 'c' });
  IL.address(160, 640, 400, 84, 'noor', 'dark');
  IL.qr(270, 750, 180);
  IL.rect(680, 120, 480, 840, 'Violet', { r: 48 });
  IL.T(720, 300, 'Scan to\nbook me.', 90, 'White', { lead: 100 });
  IL.rect(760, 450, 320, 320, 'White', { r: 24 }); IL.qr(790, 480, 260);
  IL.T(920, 830, 'inflink.ae/noor', 42, 'White', { align: 'c' });
  IL.T(1240, 300, 'Made to be\nshared.', 92, 'Ink', { lead: 102 });
  IL.T(1244, 460, 'Share cards for WhatsApp, Stories and table stands. The QR art here is a drawing: use a live code from the app.', 30, 'Mid', { box: [600, 200], lead: 40 });

  // U09 print
  IL.go('U09_Print', 'Canvas', 'Ink', S + ' / Print');
  ST(72, 100, 1776, 880, 'lilac');
  IL.rect(150, 190, 510, 300, 'White', { r: 18 }); IL.logo(190, 230, 60); IL.T(190, 400, 'Your name', 32, 'Ink'); IL.T(190, 442, 'inflink.ae', 26, 'Soft');
  IL.rect(150, 520, 510, 300, 'Violet', { r: 18 }); IL.dots(380, 650, 80, 'Peach', 'Lilac');
  IL.rect(720, 190, 430, 640, 'Deep', { r: 18 }); IL.T(760, 300, 'Welcome.\nYour link\nis live.', 72, 'White', { lead: 82 }); IL.address(760, 680, 350, 70, 'you', 'light');
  IL.rect(1210, 190, 300, 640, 'White', { r: 18 }); IL.T(1240, 280, 'Book me', 48, 'Ink'); IL.qr(1250, 340, 220); IL.mark(1240, 720, 70);
  IL.circ(1660, 290, 110, 'Peach'); IL.T(1660, 280, 'Book', 44, 'Ink', { align: 'c' }); IL.T(1660, 330, 'in my bio', 30, 'Ink', { align: 'c' });
  IL.circ(1660, 560, 110, 'Violet'); IL.T(1660, 575, 'Held', 58, 'White', { align: 'c' });
  IL.rect(1560, 700, 200, 120, 'Ink', { r: 60 }); IL.T(1660, 772, 'Pro', 50, 'White', { align: 'c' });
  IL.T(150, 900, 'Business card', 26, 'Ink'); IL.T(720, 900, 'Creator welcome card', 26, 'Ink'); IL.T(1210, 900, 'Table stand', 26, 'Ink'); IL.T(1560, 900, 'Stickers', 26, 'Ink');

  // U10 merch
  IL.go('U10_Merch', 'Sand', 'Ink', S + ' / Things to keep');
  // tote
  IL.rect(230, 130, 240, 320, null, { stroke: 'Violet', sw: 22, r: 110 });
  IL.rect(120, 290, 460, 600, 'Canvas'); IL.dots(310, 520, 130); IL.T(350, 830, 'inflink.ae/you', 42, 'Ink', { align: 'c' });
  // grip
  IL.rect(700, 170, 380, 720, 'Ink', { r: 60 }); IL.rect(716, 186, 348, 688, 'Deep', { r: 48 });
  IL.dots(860, 480, 96);
  IL.T(890, 950, 'Phone grip', 26, 'Mid', { align: 'c' });
  // tee
  IL.rect(1230, 240, 540, 650, 'Violet', { r: 20 }); IL.rect(1130, 230, 150, 270, 'Violet', { r: 30, rot: -24 }); IL.rect(1720, 230, 150, 270, 'Violet', { r: 30, rot: 24 });
  IL.circ(1500, 240, 70, 'Sand');
  IL.svg('logo_white', 1360, 430, 280, 70);
  IL.T(1500, 950, 'Tee, one colour print', 26, 'Mid', { align: 'c' }); IL.T(350, 950, 'Tote', 26, 'Mid', { align: 'c' });

  // U11 outdoor
  IL.go('U11_Outdoor', 'Canvas', 'Ink', S + ' / Outdoor');
  IM('creator_cover.png', 0, 0, IL.W, IL.H, { fy: .2 });
  IL.rect(240, 170, 1440, 720, 'Ink'); IL.rect(258, 188, 1404, 684, 'Canvas');
  ST(258, 188, 1404, 684, 'aurora', { r: 0 });
  IL.windows(1340, 440, 200, 'creator_avatar.png', 'creator_reel.png', { fy: .3, lay: 'Mark' }, { fy: .4, lay: 'Mark' });
  IL.T(310, 480, 'The link in bio\nthat gets you paid.', 104, 'Ink', { lead: 118 });
  IL.T(314, 780, 'inflink.ae', 76, 'Ink');
  IL.rect(920, 890, 80, 190, 'Ink');
  IL.T(72, 64, S + ' / Outdoor', 22, 'White', { lay: 'Notes' });

  // U12 deck
  IL.go('U12_Deck', 'Canvas', 'Ink', S + ' / Presentations');
  var dw = 576, dh = 324;
  ST(72, 110, dw, dh, 'aurora', { r: 18 }); IL.T(110, 340, 'Inflink for\nbrands', 66, 'Ink', { lead: 72 }); IL.svg('logo_ink', 110, 150, 150, 38);
  IL.rect(672, 110, dw, dh, 'Deep', { r: 18 }); IL.T(710, 220, 'How money moves', 44, 'White'); var di = ['held', 'approve', 'payout']; for (var dd = 0; dd < 3; dd++) { IL.circ(760 + dd * 150, 330, 60, 'White'); IL.svg('icon_' + di[dd], 722 + dd * 150, 292, 76, 76); }
  IL.rect(1272, 110, dw, dh, 'White', { r: 18 }); IL.phone('analytics', 1570, 130, 260, dh - 30); IL.T(1310, 250, 'Book in\none place', 54, 'Ink', { lead: 60 });
  IL.rect(72, 458, dw, dh, 'Peach', { r: 18 }); IL.T(110, 690, 'One big\nsentence.', 76, 'Ink', { lead: 84 });
  IM('creator_venue.png', 672, 458, dw, dh, { r: 18 }); IL.chip(700, 720, 'Full-bleed photo', 'White', 'Ink', 50);
  IL.rect(1272, 458, dw, dh, 'Night', { r: 18 }); IL.dots(1520, 590, 70); IL.T(1310, 750, 'inflink.ae', 44, 'White');
  IL.T(72, 870, 'One thought per slide. Big type. End on the address.', 44, 'Ink');

  // U13 email and documents
  IL.go('U13_Docs', 'Sand', 'Ink', S + ' / Email and documents');
  IL.rect(120, 110, 620, 860, 'White', { r: 24 });
  ST(120, 110, 620, 260, 'aurora', { r: 24 }); IL.svg('logo_ink', 170, 200, 240, 60);
  IL.T(170, 450, 'You have a new order', 50, 'Ink');
  IL.T(170, 510, 'A brand booked your Instagram Reel for AED 1,200. You have 72 hours to accept.', 28, 'Mid', { box: [530, 130], lead: 38 });
  IL.chip(170, 680, 'See the order', 'Ink', 'White', 76);
  IL.T(170, 880, 'Inflink is operated by Following FZC.', 22, 'Soft');
  IL.rect(820, 110, 620, 860, 'White', { r: 6 });
  IL.svg('logo_primary', 870, 160, 200, 50); IL.T(1390, 195, 'Invoice', 36, 'Ink', { align: 'r' });
  var ro = [['Instagram Reel', 'AED 1,200'], ['Service charge, 6.25%, rounded up', 'AED 75'], ['Total', 'AED 1,275']];
  for (var v = 0; v < 3; v++) { IL.line(870, 330 + v * 90, 1390, 330 + v * 90, 'Sand2', 2); IL.T(870, 390 + v * 90, ro[v][0], 28, v === 2 ? 'Ink' : 'Mid', { w: v === 2 ? 'B' : 'M' }); IL.T(1390, 390 + v * 90, ro[v][1], 28, 'Ink', { align: 'r', w: v === 2 ? 'B' : 'M' }); }
  IL.chip(870, 660, 'Protected by Inflink', 'Mist', 'V700', 64);
  IL.T(870, 880, 'Example figures. Real invoices come from the app.', 24, 'Soft');
  IL.T(1500, 300, 'Soft on\ntop, strict\nbelow.', 66, 'Ink', { lead: 76 });

  // ========== resources ==========
  var R = '06 Resources';
  IL.go('R01_Access', 'Canvas', 'Ink', R + ' / Accessibility');
  IL.T(72, 230, 'Built for everyone\nwho is holding a phone.', 104, 'Ink', { lead: 116 });
  var ac = [['Contrast', 'WCAG 2.2 AA. Use the tested pairs.', 'approve'], ['Touch', 'Targets are at least 44px.', 'ugc'], ['Motion', 'Everything respects reduced motion.', 'reel'], ['Colour', 'Status is never colour alone: always add a word.', 'analytics']];
  for (var a = 0; a < 4; a++) { var ax = 72 + a * 450; IL.rect(ax, 480, 426, 480, 'White', { r: 28 }); IL.svg('icon_' + ac[a][2], ax + 32, 520, 110, 110); IL.T(ax + 32, 720, ac[a][0], 46, 'Ink'); IL.T(ax + 32, 780, ac[a][1], 28, 'Soft', { box: [370, 150], lead: 36 }); }

  IL.go('R02_Language', 'Deep', 'White', R + ' / Arabic');
  IL.T(72, 280, 'Arabic comes next.', 112, 'White');
  IL.T(76, 400, 'Our site has a language switch ready, and it stays hidden until the copy is final.', 36, 'Lilac', { box: [1100, 120], lead: 48 });
  var la = [['Typeface', 'Readex Pro for headings and body. Closest geometry to our Latin.'], ['Direction', 'Layouts mirror. Arrows flip. inflink.ae stays left to right.'], ['Accent', 'Arabic has no italic. Change the size, never slant it.'], ['Review', 'A native Gulf Arabic reader signs off before anything ships.']];
  for (var l = 0; l < 4; l++) { IL.rect(72 + l * 450, 580, 426, 400, 'V900', { r: 28 }); IL.T(104 + l * 450, 660, la[l][0], 44, 'White'); IL.T(104 + l * 450, 720, la[l][1], 28, 'Lilac', { box: [365, 220], lead: 36 }); }

  IL.go('R03_Files', 'Canvas', 'Ink', R + ' / Files');
  IL.T(72, 200, 'What is in the box.', 96, 'Ink');
  var fi = [['Logo', 'SVG: primary, reversed, ink, white, mark', 'object_address'], ['Colour fields', 'Aurora in five tones, three shapes', 'object_held'], ['Glass', 'Fluted glass, light, night, wide, tall', 'object_held'], ['Icons', '16 SVGs', 'object_diary'], ['Objects', '8 SVGs', 'object_drink'], ['Pattern', '6 SVGs', 'object_digitals']];
  for (var n = 0; n < 6; n++) { var nx = 72 + (n % 3) * 600, ny = 300 + Math.floor(n / 3) * 320; IL.rect(nx, ny, 576, 296, 'White', { r: 28 }); IL.svg(fi[n][2], nx + 370, ny + 60, 176, 176); IL.T(nx + 32, ny + 110, fi[n][0], 46, 'Ink'); IL.T(nx + 32, ny + 160, fi[n][1], 26, 'Soft', { box: [320, 110], lead: 33 }); }

  IL.go('R04_Back', 'Canvas', 'Ink');
  IL.stage(24, 24, 1872, 1032, 'aurora', { r: 48 });
  IL.svg('logo_ink', 560, 380, 800, 200);
  IL.address(610, 640, 700, 110, 'yourname', 'light');
  IL.T(960, 960, 'Inflink is operated by Following FZC. Powered by Following.', 26, 'Ink', { align: 'c' });
})();
