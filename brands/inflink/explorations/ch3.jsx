// Chapter 3: Expression
(function () {
  var S = '03 Expression', k = 95.96 / 147.52, off = 119.34 / 147.52;
  var ST = function (x, y, w, h, tone, o) { o = o || {}; o.lay = o.lay || 'Mark'; return IL.stage(x, y, w, h, tone, o); };

  IL.go('C03_Expression', 'Canvas', 'Ink');
  IL.stage(24, 24, 1872, 1032, 'dusk', { r: 48 });
  IL.T(96, 150, '03', 44, 'White');
  IL.windows(1340, 420, 330, 'creator_reel.png', 'creator_ugc.png', { fy: .3 }, { fy: .4 });
  IL.T(96, 960, 'Expression', 250, 'White');

  // E01 rules of the dots
  IL.go('E01_Dots', 'Canvas', 'Ink', S + ' / Two dots');
  IL.T(72, 230, 'One device.\nThree rules.', 104, 'Ink', { lead: 116 });
  var ru = [['Always two', 'Never one, never three.'], ['Always touching', 'They overlap. Two apart is two strangers.'], ['Always this way', 'Big one up and left. Small one down and right.']];
  for (var i = 0; i < 3; i++) {
    var x = 72 + i * 600;
    IL.rect(x, 440, 576, 400, 'White', { r: 32 });
    IL.T(x, 890, ru[i][0], 38, 'Ink'); IL.T(x, 934, ru[i][1], 27, 'Soft');
  }
  function no(x0, y0) { IL.line(x0 - 14, y0 - 14, x0 + 14, y0 + 14, 'Coral', 5, { round: true }); IL.line(x0 + 14, y0 - 14, x0 - 14, y0 + 14, 'Coral', 5, { round: true }); }
  IL.dots(230, 610, 92); IL.dots(860, 610, 92); IL.dots(1430, 610, 92);
  IL.circ(470, 590, 44, 'Peach'); IL.circ(505, 625, 28, 'Violet'); IL.circ(530, 575, 20, 'Lilac'); no(560, 480);
  IL.circ(1040, 590, 44, 'Peach'); IL.circ(1120, 650, 28, 'Violet'); no(1160, 480);
  IL.circ(1690, 620, 44, 'Peach'); IL.circ(1656, 582, 28, 'Violet'); no(1760, 480);

  // E02 scale
  IL.go('E02_Dots_Scale', 'Canvas', 'Ink', S + ' / Two dots at any size');
  IL.rect(72, 100, 876, 880, 'Deep', { r: 40 });
  var c1 = IL.lay('Mark');
  IL.dots(370, 400, 250, 'Peach', 'Violet');
  IL.rect(972, 100, 426, 428, 'Peach', { r: 32 }); IL.dots(1150, 280, 110, 'Blush', 'Violet');
  IL.rect(1422, 100, 426, 428, 'Mist', { r: 32 }); IL.dots(1600, 280, 110, 'Lilac', 'Violet');
  IL.rect(972, 552, 426, 428, 'Violet', { r: 32 }); IL.dots(1150, 730, 110, 'Peach', 'Lilac');
  IL.rect(1422, 552, 426, 428, 'Ink', { r: 32 }); IL.dots(1600, 730, 110, 'Peach', 'Violet');
  IL.T(130, 930, 'Big enough to be a backdrop', 34, 'White');
  IL.T(1000, 500, 'Blush and violet', 25, 'Ink'); IL.T(1450, 500, 'Lilac and violet', 25, 'Ink');
  IL.T(1000, 952, 'Peach and lilac', 25, 'White'); IL.T(1450, 952, 'Peach and violet', 25, 'White');

  // E03 windows
  IL.go('E03_Windows', 'Canvas', 'Ink', S + ' / Dot windows');
  IL.windows(500, 450, 330, 'creator_reel.png', 'creator_story.png', { fy: .3 }, { fy: .5 });
  IL.T(1090, 340, 'Put two worlds\nin two dots.', 104, 'Ink', { lead: 116 });
  IL.T(1094, 570, 'The big dot holds the creator. The small dot holds what they are selling: the brand, the venue or the product.', 34, 'Mid', { box: [740, 220], lead: 46 });
  IL.T(1094, 840, 'This is the one thing nobody else in the category has. Use it whenever two sides of a deal share a frame.', 30, 'Soft', { box: [720, 170], lead: 40 });

  // E04 windows in use
  IL.go('E04_Windows_Use', 'Canvas', 'Ink', S + ' / Windows in use');
  ST(72, 100, 576, 880, 'peach'); ST(672, 100, 576, 880, 'lilac'); ST(1272, 100, 576, 880, 'aurora');
  IL.windows(320, 370, 180, 'creator_avatar.png', 'creator_reel.png', { fy: .3, lay: 'Mark' }, { fy: .4, lay: 'Mark' });
  IL.windows(920, 370, 180, 'digitals_front.png', 'digitals_hands.png', { fy: .1, lay: 'Mark' }, { fy: .5, lay: 'Mark' });
  IL.windows(1520, 370, 180, 'creator_ugc.png', 'creator_venue.png', { fy: .3, lay: 'Mark' }, { fy: .5, lay: 'Mark' });
  var w4 = [['Creator and collab', 'A creator and the Reel they sold'], ['Model and detail', 'Digitals, with dates'], ['Content and place', 'A venue visit, booked']];
  for (var q = 0; q < 3; q++) { IL.T(110 + q * 600, 760, w4[q][0], 50, 'Ink', { box: [510, 130], lead: 56 }); IL.T(110 + q * 600, 900, w4[q][1], 27, 'Ink', { box: [500, 50] }); }

  // E05 address
  IL.go('E05_Address', 'Deep', 'White', S + ' / The address');
  IL.T(72, 240, 'Every creator gets\nan address.', 112, 'White', { lead: 126 });
  IL.address(72, 470, 1776, 260, 'yourname', 'light');
  IL.T(72, 850, 'inflink.ae/ plus a name is our headline, our call to action and our signature. Every piece ends on it.', 36, 'Lilac', { box: [1776, 120], lead: 48 });

  // E06 address uses
  IL.go('E06_Address_Use', 'Canvas', 'Ink', S + ' / Using the address');
  ST(72, 100, 876, 420, 'aurora'); IL.address(144, 260, 730, 110, 'noor', 'light');
  IL.rect(972, 100, 876, 420, 'Night', { r: 32 }); IL.address(1044, 260, 730, 110, 'noor', 'dark');
  IL.rect(72, 544, 426, 440, 'Peach', { r: 32 }); IL.T(100, 750, 'inflink.ae/\nnoor', 70, 'Ink', { lead: 78 }); IL.T(100, 950, 'Stacked', 25, 'Ink');
  IL.rect(522, 544, 426, 440, 'Violet', { r: 32 }); IL.T(550, 760, 'inflink.ae/you', 56, 'White', { track: -18 }); IL.T(550, 950, 'Line, no pill', 25, 'White');
  IL.rect(972, 544, 876, 440, 'White', { r: 32 });
  IL.T(1010, 620, 'Rules', 40, 'Ink');
  var ad = ['The prefix is quieter than the name.', 'Lowercase, always left to right, in Arabic too.', 'Real checks only: a claim bar must check the name.', 'Show one address per piece.'];
  for (var a = 0; a < 4; a++) { IL.circ(1024, 680 + a * 70, 10, a % 2 ? 'Violet' : 'Peach'); IL.T(1054, 690 + a * 70, ad[a], 30, 'Mid'); }

  // E07 aurora
  IL.go('E07_Aurora', 'Canvas', 'Ink');
  IL.img('aurora/aurora_w.jpg', 0, 0, IL.W, IL.H);
  IL.T(72, 64, S + ' / Aurora', 22, 'Ink', { lay: 'Notes' });
  IL.T(96, 800, 'Soft colour.', 220, 'Ink');
  IL.T(100, 930, 'A slow field of peach, blush, lilac and violet. On the site it moves.', 38, 'Ink');

  // E08 tones + rules
  IL.go('E08_Tones', 'Canvas', 'Ink', S + ' / Five tones');
  var to = [['aurora', 'Aurora', 'Heroes, main moments', 'Ink'], ['peach', 'Peach', 'Warm, for creators', 'Ink'], ['lilac', 'Lilac', 'Calm, for models', 'Ink'], ['dusk', 'Dusk', 'Drama, section ends', 'White'], ['night', 'Night', 'Money, serious moments', 'White']];
  for (var t = 0; t < 5; t++) {
    var tx = 72 + t * 359; ST(tx, 100, 341, 660, to[t][0], { r: 28 });
    IL.T(tx + 24, 170, to[t][1], 44, to[t][3]); IL.T(tx + 24, 214, to[t][2], 23, to[t][3], { box: [295, 70], lead: 29 });
  }
  var ar = [['Keep it inside a card', 'Colour stays in rounded cards, never the whole page.'], ['Mind the violet core', 'Ink text only over pale parts. Use white on dusk and night.'], ['Keep it clean', 'Grain is fine. No extra blobs, no glow, no added colours.']];
  for (var r = 0; r < 3; r++) IL.cap(72 + r * 600, 830, ar[r][0], ar[r][1], 540);

  // E09 stage
  IL.go('E09_Stage', 'Canvas', 'Ink', S + ' / Stage');
  ST(72, 100, 1776, 660, 'lilac');
  IL.T(136, 370, 'Digitals\nwith dates.', 124, 'Ink', { lead: 136 });
  IL.T(140, 570, 'Clients see 5 simple photos of you, and when each one was taken.', 32, 'Ink', { box: [620, 100], lead: 42 });
  IL.phone('model_diary', 1120, 135, 680, 590);
  var sg = [['One headline', 'Big, on one side.'], ['One visual', 'Big, on the other.'], ['Flip it', 'Sides alternate down a page.'], ['Radius', '32px for large media, 22px for cards.']];
  for (var s = 0; s < 4; s++) IL.cap(72 + s * 450, 830, sg[s][0], sg[s][1], 410);

  // E10 fluted glass
  IL.go('E10_Fluted', 'Night', 'White', S + ' / Fluted glass');
  IL.img('aurora/fluted_night.jpg', 72, 100, 880, 880, { r: 40 });
  IL.T(1030, 340, 'Your money,\nbehind glass.', 112, 'White', { lead: 124 });
  IL.T(1034, 570, 'A glowing orb behind ribbed glass. You can see it is there, but nobody can touch it until the work is approved.', 36, 'Lilac', { box: [760, 220], lead: 48 });
  IL.T(1034, 830, 'Use it only for money: held payments, payouts, fees.', 32, 'White', { box: [760, 100], lead: 42 });

  // E11 fluted in use
  IL.go('E11_Fluted_Use', 'Canvas', 'Ink', S + ' / Glass in use');
  IL.img('aurora/fluted_light.jpg', 72, 100, 576, 880, { r: 32 });
  IL.img('aurora/fluted_wide.jpg', 672, 100, 1176, 428, { r: 32 });
  IL.T(716, 290, 'Held until\nyou approve.', 56, 'Ink', { lead: 66 });
  IL.img('aurora/fluted_night.jpg', 672, 552, 576, 428, { r: 32 });
  IL.T(710, 800, 'AED 1,200', 80, 'White'); IL.T(710, 850, 'Held by Inflink', 30, 'Lilac');
  IL.rect(1272, 552, 576, 428, 'White', { r: 32 });
  IL.T(1310, 640, 'How to use it', 38, 'Ink');
  IL.T(1310, 700, 'Keep labels over the solid core of the orb. Text at the blurred edge fails contrast.', 28, 'Soft', { box: [500, 240], lead: 38 });

  // E12 pattern
  IL.go('E12_Pattern', 'Canvas', 'Ink', S + ' / Pattern');
  var pa = [['pattern_pairs', 'Pairs'], ['pattern_pairs_dark', 'Pairs, dark'], ['pattern_chain', 'Chain'], ['pattern_ribs', 'Ribs'], ['pattern_ribs_peach', 'Ribs, peach'], ['pattern_ripple', 'Ripple']];
  for (var p = 0; p < 6; p++) {
    var px = 72 + (p % 3) * 600, py = 100 + Math.floor(p / 3) * 450;
    IL.svg(pa[p][0], px, py, 576, 380, { cover: true, clip: 32 });
    IL.T(px, py + 420, pa[p][1], 28, 'Mid');
  }

  // E13 icons
  IL.go('E13_Icons', 'White', 'Ink', S + ' / Icons');
  var ic = [['reel', 'Reel'], ['story', 'Story'], ['post', 'Post'], ['ugc', 'UGC'], ['venue', 'Venue visit'], ['consult', 'Consult'], ['merch', 'Merch'], ['held', 'Held'], ['payout', 'Payout'], ['brief', 'Brief'], ['link', 'Your link'], ['qr', 'QR code'], ['digitals', 'Digitals'], ['diary', 'Diary'], ['analytics', 'Analytics'], ['approve', 'Approve']];
  for (var n = 0; n < 16; n++) {
    var nx = 150 + (n % 8) * 222, ny = 250 + Math.floor(n / 8) * 330;
    IL.svg('icon_' + ic[n][0], nx - 78, ny - 78, 156, 156);
    IL.T(nx, ny + 124, ic[n][1], 27, 'Mid', { align: 'c' });
  }
  IL.T(72, 930, 'Drawn for Inflink on a 64 grid: 4 unit ink line, round ends, one dot of peach or violet.', 30, 'Soft');
  IL.T(72, 975, 'In the product UI, Lucide stays. These are for marketing and brand pieces.', 30, 'Soft');

  // E14 objects
  IL.go('E14_Objects', 'Canvas', 'Ink', S + ' / Objects');
  var ob = [['ringlight', 'Blush'], ['held', 'White'], ['address', 'Mist'], ['bottle', 'Sand'], ['diary', 'Mist'], ['digitals', 'Sand2'], ['drink', 'White'], ['approve', 'Blush']];
  for (var b = 0; b < 8; b++) {
    var bx = 72 + (b % 4) * 450, by = 100 + Math.floor(b / 4) * 450;
    IL.rect(bx, by, 426, 426, ob[b][1], { r: 28 });
    IL.svg('object_' + ob[b][0], bx + 53, by + 53, 320, 320);
  }
  IL.T(72, 1040, 'Still lifes built only from circles, pills and rounded boxes. Use them where a photo cannot explain the idea.', 27, 'Soft');

  // E15 chips
  IL.go('E15_Chips', 'Canvas', 'Ink', S + ' / Chips and tags');
  ST(72, 100, 1776, 640, 'aurora');
  var cr = [['Reel', 'White', 'Ink'], ['AED 1,200', 'Ink', 'White'], ['Held', 'Mist', 'V700'], ['Approved', 'E4F4EA', '1F7A4D'], ['Waiting for approval', 'FFF1D6', '8A5A00']], cx = 136;
  for (var e = 0; e < 5; e++) cx += IL.chip(cx, 240, cr[e][0], cr[e][1], cr[e][2], 110) + 22;
  var c2 = [['Protected by Inflink', 'Violet', 'White'], ['Powered by Following', 'White', 'Ink'], ['Pro', 'Peach', 'Ink']]; cx = 136;
  for (e = 0; e < 3; e++) cx += IL.chip(cx, 420, c2[e][0], c2[e][1], c2[e][2], 110) + 22;
  var ch = [['Fully rounded', 'Pills sit on photos and cards like stickers.'], ['Few at a time', 'Three per frame at most.'], ['True labels', 'A chip states a real status, price or type.']];
  for (var h = 0; h < 3; h++) IL.cap(72 + h * 600, 820, ch[h][0], ch[h][1], 520);

  // E16 data graphics
  IL.go('E16_Data', 'Canvas', 'Ink', S + ' / Showing numbers');
  IL.rect(72, 100, 876, 880, 'White', { r: 32 });
  IL.T(116, 180, 'Free or Pro: what you keep from AED 1,000', 34, 'Ink');
  var fe = [['Free', 12.5, 'Lilac'], ['Pro', 4.5, 'Violet']];
  for (var f = 0; f < 2; f++) {
    var y0 = 280 + f * 300, keep = 1000 - fe[f][1] * 10 - 2;
    IL.T(116, y0, fe[f][0], 44, 'Ink');
    IL.rect(116, y0 + 30, 790, 110, 'Sand', { r: 55 });
    IL.rect(116, y0 + 30, 790 * keep / 1000, 110, fe[f][2], { r: 55 });
    IL.T(150, y0 + 100, 'AED ' + keep, 44, f ? 'White' : 'Ink');
  }
  IL.T(116, 900, 'Before withdrawal and, on Pro, the $12.99 monthly fee.', 26, 'Soft');
  IL.rect(972, 100, 876, 880, 'Deep', { r: 32 });
  IL.T(1016, 180, 'If a client cancels a model booking', 34, 'White');
  var ca = [['7+ days', 0], ['3 to 7 days', 25], ['24 to 72 hours', 50], ['Under 24 hours', 100]];
  for (var z = 0; z < 4; z++) {
    var zx = 1016 + z * 200, hh = 120 + ca[z][1] * 4.2;
    IL.rect(zx, 880 - hh - 60, 180, hh, z === 3 ? 'Peach' : 'Lilac', { r: 24 });
    IL.T(zx + 16, 880 - hh - 60 + 70, ca[z][1] + '%', 54, 'Ink');
    IL.T(zx, 860, ca[z][0], 22, 'White', { box: [185, 60], lead: 27 });
  }
})();
