// Chapter 4: Imagery, layout, motion
(function () {
  var S = '04 Imagery';
  var ST = function (x, y, w, h, tone, o) { o = o || {}; o.lay = o.lay || 'Mark'; return IL.stage(x, y, w, h, tone, o); };

  IL.go('C04_Imagery', 'Canvas', 'Ink');
  IL.img('creator_reel.png', 0, 0, IL.W, IL.H, { fy: .28 });
  IL.T(96, 150, '04', 44, 'White');
  IL.T(96, 960, 'Imagery', 300, 'White');

  // M01 photography
  IL.go('M01_Photo', 'Canvas', 'Ink', S + ' / Photography');
  IL.img('creator_story.png', 72, 100, 576, 880, { r: 32, fy: .5 });
  IL.img('creator_venue.png', 672, 100, 576, 428, { r: 32 });
  IL.img('creator_cover.png', 672, 552, 576, 428, { r: 32, fy: .4 });
  IL.T(1300, 300, 'Hard sun.\nReal colour.', 84, 'Ink', { lead: 96 });
  IL.T(1304, 470, 'Photographs carry the loud colour, so the fields around them can stay soft.', 32, 'Mid', { box: [540, 200], lead: 42 });
  var ph = ['Deep blue skies', 'Bright, direct light', 'One clear subject', 'Peach, violet and sky blue in the frame'];
  for (var i = 0; i < 4; i++) { IL.circ(1312, 736 + i * 58, 10, i % 2 ? 'Violet' : 'Peach'); IL.T(1340, 746 + i * 58, ph[i], 28, 'Mid'); }

  // M02 do and don't
  IL.go('M02_Photo_Rules', 'Canvas', 'Ink', S + ' / Photography rules');
  var dn = [['creator_ugc.png', 'Yes: the product in a hand'], ['creator_avatar.png', 'Yes: looking at you, in sun'], ['creator_venue.png', 'Yes: a place worth visiting']];
  for (var a = 0; a < 3; a++) { IL.img(dn[a][0], 72 + a * 600, 100, 576, 560, { r: 32, fy: .35 }); IL.T(72 + a * 600, 708, dn[a][1], 30, 'Mid'); }
  var nr = [['No stock poses', 'Handshakes, laptops, meeting rooms.'], ['No grey days', 'Flat light kills the colour.'], ['No fake proof', 'Generated people are never presented as real creators.']];
  for (var b = 0; b < 3; b++) IL.cap(72 + b * 600, 800, nr[b][0], nr[b][1], 540);

  // M03 people
  IL.go('M03_People', 'Canvas', 'Ink', S + ' / People');
  ST(72, 100, 1776, 880, 'aurora');
  IL.img('people_model.png', 90, 170, 560, 810, { fit: true, ay: 1, lay: 'Mark' });
  IL.img('people_creator.png', 680, 170, 560, 810, { fit: true, ay: 1, lay: 'Mark' });
  IL.img('people_brand.png', 1270, 170, 560, 810, { fit: true, ay: 1, lay: 'Mark' });
  IL.T(120, 200, 'Cut out, holding the product, in our colours.', 44, 'Ink');
  IL.T(72, 1040, 'These three people are fictional and AI-generated. Clothes stay in peach and violet. Use real, cleared creators wherever you can.', 25, 'Soft');

  // M04 phones
  IL.go('M04_Phones', 'Canvas', 'Ink', S + ' / Phones');
  var ap = [['analytics', 'lilac'], ['order_detail_money_held', 'peach'], ['ai_brief', 'aurora'], ['earnings', 'dusk']];
  for (var c = 0; c < 4; c++) { var x = 72 + c * 450; ST(x, 100, 426, 660, ap[c][1], { r: 32 }); IL.phone(ap[c][0], x, 140, 426, 590); }
  var pr = [['Real screens', 'Capture the real app. Never redraw or mock up the UI.'], ['Native app only', 'Never the old web dashboard screens.'], ['Fictional data', 'Demo names and figures, checked before use.']];
  for (var d = 0; d < 3; d++) IL.cap(72 + d * 600, 820, pr[d][0], pr[d][1], 540);

  // M05 digitals
  IL.go('M05_Digitals', 'Sand', 'Ink', S + ' / Digitals');
  var dg = [['digitals_front.png', 'Front', -5], ['digitals_side.png', 'Side', 3], ['digitals_three-quarter.png', 'Three quarter', -2], ['digitals_full-length.png', 'Full length', 4], ['digitals_hands.png', 'Hands', -3]];
  for (var e = 0; e < 5; e++) {
    var ex = 96 + e * 350, ey = 180 + (e % 2) * 40;
    var fr = IL.rect(ex, ey, 330, 500, 'White', { r: 10 });
    var im = IL.img(dg[e][0], ex + 16, ey + 16, 298, 410, { lay: 'Mark', fy: .1 });
    var cap = IL.T(ex + 20, ey + 470, dg[e][1], 25, 'Ink');
    IL.T(ex + 310, ey + 470, '12 Oct', 25, 'Soft', { align: 'r' });
  }
  IL.T(72, 830, 'Five simple photos. Always dated.', 72, 'Ink');
  IL.T(72, 900, 'Plain wall, natural light, no retouching. White frames, each slightly off straight.', 30, 'Soft');

  // M06 grid
  IL.go('M06_Grid', 'Canvas', 'Ink', S + ' / Layout');
  IL.rect(72, 100, 1000, 563, 'White', { r: 20 });
  for (var f = 0; f < 12; f++) IL.rect(72 + 20 + f * (960 / 12), 100, 960 / 12 - 8, 563, 'Mist');
  ST(112, 140, 920, 483, 'aurora', { r: 24 });
  IL.T(160, 330, 'One headline.', 62, 'Ink');
  IL.T(160, 400, 'One visual.', 62, 'Ink');
  IL.T(72, 720, '12 columns, 1320px wide, 16 to 32px gutters', 28, 'Mid');
  var sp = [['Radius', '32 media, 22 cards, 14 small, pills fully round.'], ['Space', 'Sections sit 80 to 176px apart.'], ['Grids, not lists', 'A plain list of rows was rejected. Use bento grids.'], ['Touch', 'Targets are at least 44px.']];
  for (var g = 0; g < 4; g++) IL.cap(1130, 170 + g * 180, sp[g][0], sp[g][1], 700);

  // M07 formats
  IL.go('M07_Formats', 'Canvas', 'Ink', S + ' / Formats');
  var fm = [[1, 1.25, 'Instagram post, 4:5', 'peach'], [1, 1.78, 'Story and Reel, 9:16', 'aurora'], [1.78, 1, 'Site and YouTube, 16:9', 'lilac'], [1, 1, 'Square, 1:1', 'dusk']];
  var fx = 72, h0 = 660;
  IL.T(72, 170, 'Same dots in every shape.', 64);
  var ws = [404, 306, 690, 300], hs = [505, 545, 388, 300];
  for (var j = 0; j < 4; j++) {
    var fy = 780 - hs[j];
    ST(fx, fy, ws[j], hs[j], fm[j][3], { r: 24 });
    IL.dots(fx + ws[j] * .42, fy + hs[j] * .38, Math.min(ws[j], hs[j]) * .22, j === 3 ? 'Peach' : 'Deep', j === 3 ? 'Violet' : 'Peach');
    IL.T(fx, 830, fm[j][2], 26, 'Mid');
    fx += ws[j] + 24;
  }
  IL.T(72, 930, 'Keep type inside the safe area: Instagram crops grids to 3:4 and covers the top and bottom of Stories.', 28, 'Soft');

  // M08 motion principles
  IL.go('M08_Motion', 'Night', 'White', S + ' / Motion');
  IL.T(72, 200, 'Everything arrives,\nthen settles.', 104, 'White', { lead: 116 });
  IL.rect(72, 430, 700, 540, 'V900', { r: 32 });
  var pth = IL.lay('Mark').pathItems.add(), o0 = IL.org;
  // the brand curve: cubic-bezier(0.16, 1, 0.3, 1)
  var ax = 130, ay = 900, cw = 580, chh = 400;
  pth.setEntirePath([[o0[0] + ax, o0[1] - ay], [o0[0] + ax + cw, o0[1] - (ay - chh)]]);
  pth.pathPoints[0].rightDirection = [o0[0] + ax + cw * .16, o0[1] - (ay - chh)];
  pth.pathPoints[1].leftDirection = [o0[0] + ax + cw * .3, o0[1] - (ay - chh)];
  pth.filled = false; pth.stroked = true; pth.strokeColor = IL.col('Peach'); pth.strokeWidth = 8; pth.strokeCap = StrokeCap.ROUNDENDCAP; IL.tag(pth);
  IL.line(ax, ay, ax + cw, ay, 'Lilac', 2); IL.line(ax, ay, ax, ay - chh, 'Lilac', 2);
  IL.circ(ax + cw, ay - chh, 12, 'Violet');
  IL.T(130, 945, 'cubic-bezier(0.16, 1, 0.3, 1)', 26, 'Lilac');
  var mo = [['220ms', 'Buttons and small feedback'], ['700ms', 'Things coming into view'], ['No bounce', 'Money should feel steady'], ['Parallax', 'Type and visuals move at different speeds'], ['One moment', 'One cinematic move per page'], ['Reduced motion', 'Everything works with motion off']];
  for (var m = 0; m < 6; m++) { var mx = 830 + (m % 2) * 520, my = 500 + Math.floor(m / 2) * 170; IL.T(mx, my, mo[m][0], 50, 'White'); IL.T(mx, my + 44, mo[m][1], 26, 'Lilac', { box: [480, 80], lead: 32 }); }

  // M09 logo sting
  IL.go('M09_Sting', 'Canvas', 'Ink', S + ' / Logo in motion');
  IL.T(72, 200, 'The dots meet, then the word arrives.', 72);
  var k = 95.96 / 147.52, of = 119.34 / 147.52;
  var fr2 = [[-1, .3], [-.5, .6], [0, 1], [0, 1], [0, 1], [0, 1]];
  for (var s = 0; s < 6; s++) {
    var sx = 72 + (s % 3) * 600, sy = 270 + Math.floor(s / 3) * 340;
    IL.rect(sx, sy, 576, 300, 'White', { r: 24 });
    var R = 62, cx0 = sx + 150, cy0 = sy + 130;
    if (s === 0) { IL.circ(sx + 60, cy0, R, 'Peach'); IL.circ(sx + 500, cy0 + 50, R * k, 'Violet'); }
    else if (s === 1) { IL.circ(sx + 130, cy0, R, 'Peach'); IL.circ(sx + 340, cy0 + 50, R * k, 'Violet'); }
    else if (s === 2) { IL.circ(sx + 230, cy0 + 8, R * 1.1, 'Peach'); IL.circ(sx + 230 + R * of, cy0 + 8 + R * of, R * k * .92, 'Violet'); }
    else if (s === 3) { IL.dots(sx + 240, cy0 + 8, R); }
    else if (s === 4) { IL.dots(sx + 120, cy0 + 8, R * .9); IL.svg('wordmark_ink', sx + 230, cy0 - 20, 150, 56); }
    else { IL.logo(sx + 88, sy + 96, 100); }
    IL.T(sx + 20, sy + 280, ['0.0s', '0.3s', '0.5s, they overlap', '0.7s, settle', '0.9s, word rises', '1.3s, hold'][s], 22, 'Soft');
  }
  

  // M10 film grammar
  IL.go('M10_Film', 'Deep', 'White', S + ' / Film and Reels');
  IL.T(72, 200, 'How our films move.', 96, 'White');
  var gr = [['object_address', 'Through the letters', 'Photos play inside big type and the camera flies through.'], ['object_held', 'Behind the glass', 'Money appears behind ribs that slide open on approval.'], ['object_approve', 'The dots meet', 'Every transition is two shapes joining. Every film ends on the address.'], ['object_ringlight', 'Beat first', 'Cut on the beat. Fast, fast, then one held moment.']];
  for (var n = 0; n < 4; n++) {
    var nx = 72 + n * 450;
    IL.rect(nx, 290, 426, 690, 'V900', { r: 32 });
    IL.svg(gr[n][0], nx + 73, 330, 280, 280);
    IL.T(nx + 30, 690, gr[n][1], 44, 'White', { box: [370, 120], lead: 50 });
    IL.T(nx + 30, 810, gr[n][2], 26, 'Lilac', { box: [370, 160], lead: 33 });
  }
})();
