// Chapter 2: Identity (logo, colour, type)
(function () {
  var S = '02 Identity';
  function cmyk(h) { var r = parseInt(h.substr(0, 2), 16) / 255, g = parseInt(h.substr(2, 2), 16) / 255, b = parseInt(h.substr(4, 2), 16) / 255, k = 1 - Math.max(r, g, b); if (k >= 1) return '0 0 0 100'; return Math.round((1 - r - k) / (1 - k) * 100) + ' ' + Math.round((1 - g - k) / (1 - k) * 100) + ' ' + Math.round((1 - b - k) / (1 - k) * 100) + ' ' + Math.round(k * 100); }
  function rgbs(h) { return parseInt(h.substr(0, 2), 16) + ' ' + parseInt(h.substr(2, 2), 16) + ' ' + parseInt(h.substr(4, 2), 16); }

  IL.go('C02_Identity', 'Violet', 'White');
  IL.T(96, 150, '02', 44, 'White');
  IL.dots(1370, 400, 340, 'Peach', 'Lilac');
  IL.T(96, 960, 'Identity', 300, 'White');

  // logo
  IL.go('I01_Logo', 'Canvas', 'Ink', S + ' / Logo');
  IL.logo(290, 330, 330);
  IL.cap(72, 860, 'The logo', 'Two dots and the word, always in this order and at this size to each other.', 560);
  IL.cap(680, 860, 'Lowercase', 'Inflink in a sentence takes a capital. The logo never does.', 520);
  IL.cap(1270, 860, 'One file', 'Use the supplied files. Never retype or redraw it.', 520);

  // anatomy
  IL.go('I02_Anatomy', 'White', 'Ink', S + ' / How the mark is built');
  var R = 300, cx = 560, cy = 470, off = R * 119.34 / 147.52, r2 = R * 95.96 / 147.52;
  IL.dots(cx, cy, R);
  IL.circ(cx, cy, 5, 'Ink'); IL.circ(cx + off, cy + off, 5, 'Ink');
  IL.line(cx - R - 40, cy - R - 40, cx + off + r2 * .7 + 40, cy + off + r2 * .7 + 40, 'Ink', 2, { dash: [2, 9], round: true });
  IL.line(cx, cy - R - 30, cx, cy + R + 30, 'Ink', 2, { dash: [2, 9], round: true });
  IL.line(cx - R - 30, cy, cx + R + 30, cy, 'Ink', 2, { dash: [2, 9], round: true });
  IL.T(1150, 300, 'Two perfect circles.', 84, 'Ink');
  var an = [['1 to 0.65', 'The small dot is 65% of the big one.'], ['45 degrees', 'The small dot sits down and to the right.'], ['Overlap', 'Violet always sits on top of peach.']];
  for (var i = 0; i < 3; i++) { IL.T(1150, 450 + i * 170, an[i][0], 52, 'Ink'); IL.T(1150, 498 + i * 170, an[i][1], 30, 'Soft'); }

  // clear space and size
  IL.go('I03_Space', 'Canvas', 'Ink', S + ' / Space and size');
  IL.rect(72, 110, 1100, 560, 'Mist', { r: 32 });
  var lh = 170, lw = lh * 1463 / 362.82, lx = 72 + (1100 - lw) / 2, ly = 110 + (560 - lh) / 2, gp = lh * 0.53;
  IL.rect(lx - gp, ly - gp, lw + 2 * gp, lh + 2 * gp, null, { stroke: 'Violet', sw: 2 });
  IL.logo(lx, ly, lh);
  IL.circ(lx - gp / 2, ly - gp / 2, gp / 2, 'Violet', { op: 45 }); IL.circ(lx + lw + gp / 2, ly + lh + gp / 2, gp / 2, 'Violet', { op: 45 });
  IL.T(1220, 220, 'Keep clear', 60, 'Ink');
  IL.T(1220, 280, 'Leave one small dot of space on every side. Nothing enters it.', 32, 'Soft', { box: [620, 140], lead: 42 });
  var sz = [[140, ''], [70, ''], [32, 'Smallest logo: 32px high, 12 mm in print'], [16, 'Below that, use the mark alone: 16px']];
  IL.logo(72, 740, 140); IL.logo(740, 775, 70); IL.logo(1120, 795, 32); IL.mark(1420, 803, 16);
  IL.T(1120, 860, sz[2][1], 25, 'Soft'); IL.T(1120, 900, sz[3][1], 25, 'Soft');

  // colourways
  IL.go('I04_Colourways', 'Canvas', 'Ink', S + ' / Logo colour');
  var cw = [['Canvas', 'primary', 'Full colour on canvas or white'], ['Night', 'reversed', 'Reversed on night or ink'], ['Deep', 'reversed', 'Reversed on deep indigo'], ['Violet', 'white', 'All white on violet'], ['Peach', 'ink', 'All ink on peach'], ['aurora', 'ink', 'All ink on aurora, where peach dots would vanish']];
  for (var c = 0; c < 6; c++) {
    var x = 72 + (c % 3) * 600, y = 110 + Math.floor(c / 3) * 440;
    if (cw[c][0] === 'aurora') IL.stage(x, y, 576, 340, 'aurora', { r: 28 });
    else IL.rect(x, y, 576, 340, cw[c][0], { r: 28, stroke: cw[c][0] === 'Canvas' ? 'Sand2' : null, sw: 2 });
    IL.logo(x + 118, y + 130, 84, cw[c][1]);
    IL.T(x, y + 386, cw[c][2], 26, 'Soft');
  }

  // mark and icon
  IL.go('I05_Icon', 'Sand', 'Ink', S + ' / Mark and app icon');
  IL.rect(120, 190, 560, 560, 'White', { r: 126 });
  IL.mark(220, 290, 360);
  IL.T(120, 830, 'App icon', 40, 'Ink');
  IL.T(120, 880, 'Full colour mark on white.', 28, 'Soft');
  IL.circ(1030, 370, 180, 'Deep'); IL.mark(915, 255, 230);
  IL.T(850, 640, 'Avatar', 40, 'Ink'); IL.T(850, 690, 'On deep indigo for social.', 28, 'Soft');
  var ms = [128, 64, 32, 16], mx = 1330;
  for (var m = 0; m < 4; m++) { IL.mark(mx, 500 - ms[m], ms[m]); mx += ms[m] + 40; }
  IL.T(1330, 640, 'Small sizes', 40, 'Ink'); IL.T(1330, 690, 'Tested down to 16px.', 28, 'Soft');

  // misuse
  IL.go('I06_Misuse', 'Canvas', 'Ink', S + ' / Misuse');
  function tile(i, label) {
    var tx = 72 + (i % 4) * 450, ty = 110 + Math.floor(i / 2 / 2) * 460;
    IL.rect(tx, ty, 426, 340, 'White', { r: 24 });
    IL.T(tx, ty + 384, label, 26, 'Mid');
    var bx = tx + 390;
    IL.line(bx - 12, ty + 22, bx + 12, ty + 46, 'Coral', 5, { round: true }); IL.line(bx + 12, ty + 22, bx - 12, ty + 46, 'Coral', 5, { round: true });
    return [tx + 213, ty + 170];
  }
  var w = 60, wmH = 66, wmW = wmH * 1040 / 343;
  function word(cx0, cy0, sc) { IL.svg('wordmark_ink', cx0 - 40, cy0 - wmH * (sc || 1) / 2, wmW * (sc || 1), wmH * (sc || 1)); }
  var p = tile(0, 'Do not swap the dots'); IL.dots(p[0] - 112, p[1] - 8, 40, 'Violet', 'Peach'); word(p[0] - 26, p[1]);
  p = tile(1, 'Do not rotate or tilt'); var l1 = IL.svg('logo_primary', p[0] - 150, p[1] - 38, 300, 76); l1.rotate(16);
  p = tile(2, 'Do not stretch'); var l2 = IL.svg('logo_primary', p[0] - 150, p[1] - 38, 300, 76); l2.resize(115, 170);
  p = tile(3, 'Do not separate the dots'); IL.circ(p[0] - 150, p[1] - 8, 34, 'Peach'); IL.circ(p[0] - 90, p[1] + 26, 22, 'Violet'); word(p[0] - 10, p[1]);
  p = tile(4, 'Do not recolour'); IL.dots(p[0] - 112, p[1] - 8, 40, 'Ok', 'Coral'); word(p[0] - 26, p[1]);
  p = tile(5, 'Do not add three dots'); IL.circ(p[0] - 140, p[1] - 14, 32, 'Peach'); IL.circ(p[0] - 110, p[1] + 14, 22, 'Violet'); IL.circ(p[0] - 88, p[1] - 22, 16, 'Lilac'); word(p[0] - 20, p[1]);
  p = tile(6, 'Do not set on busy photos'); IL.img('creator_venue.png', p[0] - 213, p[1] - 170, 426, 340, { r: 24, lay: 'Mark' }); IL.svg('logo_primary', p[0] - 150, p[1] - 38, 300, 76);
  p = tile(7, 'Do not lock up with Following'); IL.svg('logo_primary', p[0] - 190, p[1] - 22, 170, 44); IL.line(p[0], p[1] - 26, p[0], p[1] + 26, 'Ink', 2); IL.svg('following_ink', p[0] + 20, p[1] - 15, 160, 30);

  // colour palette
  IL.go('K01_Palette', 'Canvas', 'Ink', S + ' / Colour');
  var pal = [['Canvas', 'FAFAF7', 'Ink', 2, 'The page'], ['Violet', '6D5EF8', 'White', 2, 'Our main colour'], ['Peach', 'FF8F6B', 'Ink', 2, 'Warmth and marketing'], ['Deep', '1C1840', 'White', 2, 'Dark cards'], ['Ink', '16151C', 'White', 1, 'Type'], ['Lilac', 'C9C3FF', 'Ink', 1, 'Soft surface'], ['Blush', 'FFD3E0', 'Ink', 1, 'Soft surface'], ['Mist', 'ECE9FF', 'Ink', 1, 'Tint']];
  var names = { Deep: 'Deep indigo' };
  var xx = 72, yy = 100;
  for (var q = 0; q < 4; q++) {
    var bw = 426;
    IL.rect(xx, yy, bw, 500, pal[q][0], { r: 28, stroke: pal[q][0] === 'Canvas' ? 'Sand2' : null, sw: 2 });
    IL.T(xx + 28, yy + 72, names[pal[q][0]] || pal[q][0], 48, pal[q][2]);
    IL.T(xx + 28, yy + 118, pal[q][4], 26, pal[q][2]);
    IL.T(xx + 28, yy + 390, '#' + pal[q][1] + '\nRGB ' + rgbs(pal[q][1]) + '\nCMYK ' + cmyk(pal[q][1]), 25, pal[q][2], { lead: 33 });
    xx += 450;
  }
  xx = 72;
  for (q = 4; q < 8; q++) {
    IL.rect(xx, 624, 426, 340, pal[q][0], { r: 28 });
    IL.T(xx + 28, 690, pal[q][0], 42, pal[q][2]);
    IL.T(xx + 28, 840, '#' + pal[q][1] + '\nRGB ' + rgbs(pal[q][1]) + '\nCMYK ' + cmyk(pal[q][1]), 25, pal[q][2], { lead: 33 });
    xx += 450;
  }
  IL.T(72, 1030, 'CMYK values are conversions. Proof with the printer before a print run.', 24, 'Soft');

  // proportion
  IL.go('K02_Proportion', 'Canvas', 'Ink', S + ' / How much of each');
  IL.T(72, 230, 'Mostly light.\nColour lives in cards.', 104, 'Ink', { lead: 118 });
  var bars = [['Canvas', 60, 'Ink'], ['White', 12, 'Ink'], ['Violet', 10, 'White'], ['Ink', 8, 'White'], ['Lilac', 5, 'Ink'], ['Peach', 5, 'Ink']], bx2 = 72, tot = 1776;
  for (var b = 0; b < 6; b++) {
    var bwid = tot * bars[b][1] / 100;
    IL.rect(bx2, 460, bwid, 300, bars[b][0], { stroke: 'Sand2', sw: 1 });
    IL.T(bx2 + 16, 730, bars[b][1] + '', 44, bars[b][2]);
    IL.T(bx2 + 2, 806, bars[b][0], 26, 'Mid');
    bx2 += bwid;
  }
  IL.T(72, 900, 'Peach never fills a page in the product. It belongs to marketing.', 34, 'Mid');

  // pairs
  IL.go('K03_Pairs', 'Canvas', 'Ink', S + ' / Colour pairs');
  var pr = [['Canvas', 'Ink', 'Ink on canvas'], ['Violet', 'White', 'White on violet'], ['Deep', 'Lilac', 'Lilac on deep'], ['Peach', 'Ink', 'Ink on peach'], ['Mist', 'V700', 'Violet 700 on mist'], ['Blush', 'Ink', 'Ink on blush'], ['Night', 'White', 'White on night'], ['Lilac', 'Deep', 'Deep on lilac']];
  for (var d = 0; d < 8; d++) {
    var dx = 72 + (d % 4) * 450, dy = 110 + Math.floor(d / 4) * 450;
    IL.rect(dx, dy, 426, 420, pr[d][0], { r: 28, stroke: pr[d][0] === 'Canvas' ? 'Sand2' : null, sw: 2 });
    IL.T(dx + 30, dy + 200, 'Get paid\non approval.', 58, pr[d][1], { lead: 68 });
    IL.T(dx + 30, dy + 370, pr[d][2], 26, pr[d][1]);
  }

  // tints
  IL.go('K04_Scale', 'Canvas', 'Ink', S + ' / Full range');
  var vs = ['F4F2FF', 'ECE9FF', 'DAD5FF', 'C9C3FF', '9D92FB', '6D5EF8', '5A49E8', '4E3ED6', '3E31AB', '2A2272', '1C1840'], vn = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
  IL.T(72, 170, 'Violet', 44);
  for (var v = 0; v < 11; v++) { IL.rect(72 + v * 161.5, 200, 161.5, 240, vs[v]); IL.T(84 + v * 161.5, 420, vn[v], 25, v > 4 ? 'White' : 'Ink'); IL.T(72 + v * 161.5 + 8, 474, '#' + vs[v], 18, 'Soft'); }
  IL.T(72, 570, 'Neutrals', 44);
  var ns = [['FAFAF7', 'Canvas'], ['FFFFFF', 'White'], ['F2F1EC', 'Sand 100'], ['E6E4DD', 'Sand 200'], ['D4D2CA', 'Sand 300'], ['5F5D68', 'Ink soft'], ['3A3842', 'Ink mid'], ['16151C', 'Ink'], ['0E0D14', 'Night']];
  for (var n = 0; n < 9; n++) { IL.rect(72 + n * 197.3, 600, 197.3, 150, ns[n][0], { stroke: 'Sand2', sw: 1 }); IL.T(72 + n * 197.3 + 4, 790, ns[n][1], 24, 'Mid'); }
  IL.T(72, 880, 'States', 44);
  var sc = [['E4F4EA', '1F7A4D', 'Approved'], ['FFF1D6', '8A5A00', 'Waiting'], ['FBE7E5', 'B3261E', 'Problem'], ['ECE9FF', '4E3ED6', 'Held']], sx = 72;
  for (var st = 0; st < 4; st++) { sx += IL.chip(sx, 920, sc[st][2], sc[st][0], sc[st][1], 72) + 24; }
  IL.T(sx + 20, 968, 'Used for status only. Never decoration.', 28, 'Soft');

  // contrast
  IL.go('K05_Contrast', 'Canvas', 'Ink', S + ' / Contrast');
  var ct = [['Canvas', 'Ink', '17.34', 'All sizes'], ['Violet', 'White', '4.56', 'All sizes, just'], ['Canvas', 'V600', '5.65', 'All sizes'], ['Deep', 'Lilac', '10.15', 'All sizes'], ['Canvas', 'Violet', '4.36', 'Large type only'], ['Violet', 'Ink', '3.98', 'Large type only'], ['Canvas', 'Peach', '2.14', 'Never as text'], ['Peach', 'Ink', '8.11', 'All sizes']];
  for (var g = 0; g < 8; g++) {
    var gx = 72 + (g % 4) * 450, gy = 110 + Math.floor(g / 4) * 440;
    IL.rect(gx, gy, 426, 300, ct[g][0], { r: 24, stroke: ct[g][0] === 'Canvas' ? 'Sand2' : null, sw: 2 });
    IL.T(gx + 28, gy + 180, 'Aa', 130, ct[g][1]);
    IL.T(gx + 28, gy + 270, ct[g][2] + ' to 1', 28, ct[g][1], { w: 'S' });
    IL.T(gx, gy + 346, ct[g][3], 28, g === 6 ? 'Coral' : 'Mid');
  }
  IL.T(72, 1040, 'WCAG 2.2 AA asks for 4.5 for body text and 3 for large text.', 24, 'Soft');

  // type
  IL.go('Y01_Urbanist', 'Canvas', 'Ink', S + ' / Type');
  IL.T(60, 620, 'Aa', 560, 'Ink', { track: -24 });
  IL.T(760, 260, 'Urbanist', 150, 'Ink');
  IL.T(764, 330, 'One typeface, set in Medium. A round geometric sans that matches the circles in our logo.', 34, 'Mid', { box: [1000, 120], lead: 46 });
  IL.T(764, 560, 'abcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKLMNOPQRSTUVWXYZ\n0123456789 AED / . , : %', 56, 'Ink', { lead: 74, track: 0 });
  IL.T(72, 940, 'Free under the SIL Open Font License, from Google Fonts. No serif accents, no second typeface.', 30, 'Soft');

  // hierarchy
  IL.go('Y02_Scale', 'Canvas', 'Ink', S + ' / Type scale');
  var ty = [['Display', 'Get paid on approval', 112, '64 to 112px, line height 1.08, tracking -18'], ['Heading', 'Your prices, your link', 64, '32 to 54px on the site, line height 1.14'], ['Subhead', 'Money held until you approve', 40, '22 to 28px, Medium'], ['Body', 'Brands pay at checkout, and we hold the money until the work is approved.', 26, '16 to 20px, line height 1.55']];
  var yy2 = 200;
  for (var h = 0; h < 4; h++) {
    IL.T(72, yy2, ty[h][0], 26, 'Soft', { w: 'S' });
    IL.T(330, yy2 + (h === 0 ? 40 : 10), ty[h][1], ty[h][2], 'Ink');
    IL.T(330, yy2 + (h === 0 ? 100 : (h === 1 ? 74 : (h === 2 ? 66 : 54))), ty[h][3], 25, 'Soft');
    yy2 += h === 0 ? 240 : 200;
  }

  // setting rules
  IL.go('Y03_Setting', 'White', 'Ink', S + ' / Setting type');
  IL.rect(72, 110, 876, 520, 'Mist', { r: 32 }); IL.rect(972, 110, 876, 520, 'Blush', { r: 32 });
  IL.T(116, 340, 'Bring your\nprice to light', 104, 'Ink', { lead: 112 });
  var bad = IL.T(1016, 340, 'Bring your\nprice to light', 104, 'Ink', { lead: 76, track: -70 });
  IL.T(116, 580, 'Open line height. Gentle tracking.', 28, 'V700'); IL.T(1016, 580, 'Too tight. Descenders collide.', 28, 'Mid');
  var se = [['Line height', 'Display 1.08, headings 1.14, body 1.55.'], ['Tracking', 'About -18 at display sizes. Never harder.'], ['Case', 'Sentence case. No all caps headlines.'], ['Amounts', 'AED 1,200. Space, comma, no decimals unless real.']];
  for (var u = 0; u < 4; u++) IL.cap(72 + u * 450, 720, se[u][0], se[u][1], 410);

  // type in use
  IL.go('Y04_InUse', 'Canvas', 'Ink', S + ' / Type in use');
  IL.stage(72, 100, 1150, 900, 'lilac');
  IL.T(130, 400, 'Your link.\nYour prices.\nYour money.', 136, 'Ink', { lead: 150 });
  IL.address(130, 800, 640, 110, 'yourname', 'light');
  IL.rect(1246, 100, 602, 438, 'Deep', { r: 40 });
  IL.T(1290, 280, 'AED 1,200', 104, 'White');
  IL.T(1290, 340, 'One Instagram Reel', 34, 'Lilac');
  IL.rect(1246, 562, 602, 438, 'Peach', { r: 40 });
  IL.T(1290, 730, 'Money held\nuntil you\napprove.', 76, 'Ink', { lead: 86 });
})();
