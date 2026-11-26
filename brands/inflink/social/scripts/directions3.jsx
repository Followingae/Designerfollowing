// Round 3: three directions led by different things. G shape on white, H full colour poster, I photo and quiet white.
// Needs directions2.jsx loaded first for D.board, D.h, D.logo, D.pin, D.audit, D.save.
D.fitT = function (y, str, target, col, o) {
  o = o || {};
  var t = IL.T(0, 0, str, 200, col, { lay: o.lay || 'Notes', track: -24 });
  var size = 200 * target / t.width; t.remove();
  if (o.max && size > o.max) size = o.max;
  return IL.T(o.x === undefined ? D.M : o.x, y, str, size, col, { lay: o.lay || 'Notes', track: -24, align: o.align });
};
D.small = function (x, y, str, col, size, box) { return IL.T(x, y, str.replace(/\n/g, '\r'), size || 40, col || 'Ink', { lay: 'Notes', track: -6, lead: (size || 40) * 1.25 }); };
D.pill = function (x, y, w, h, fill) { return IL.rect(x, y, w, h, fill, { r: h / 2, lay: LM }); };
D.arrow = function (cx, cy, r, ink, sw) { IL.line(cx - r, cy, cx + r, cy, ink, sw, { round: true, lay: 'Notes' }); IL.line(cx + r * .1, cy - r * .85, cx + r, cy, ink, sw, { round: true, lay: 'Notes' }); IL.line(cx + r * .1, cy + r * .85, cx + r, cy, ink, sw, { round: true, lay: 'Notes' }); };
D.markS = function (v) { IL.svg('logo_' + (v || 'primary'), D.M, 1230, 190, 48, { lay: 'Notes' }); };

// ---------- G: one shape on white. A lot of nothing, then one confident thing ----------
D.buildG = function () {
  D.board('G1', 0, 0, 'White'); D.small(D.M, 120, 'The link in bio\nthat pays.', 'Ink', 48); D.pill(D.M, 780, 936, 300, 'Violet'); D.fitT(990, 'Get paid', 640, 'White', { x: 150 }); D.markS();
  D.board('G2', 0, 1, 'White'); IL.dots(470, 560, 300); D.small(D.M, 1140, 'A creator. A brand.\nOne link.', 'Ink', 44);
  D.board('G3', 0, 2, 'White'); IL.img('creator_cover.png', D.M, 72, 936, 460, { r: 230, fy: .35, lay: LM }); D.fitT(1090, 'Sell a visit.', 800, 'Ink', {}); D.markS();
  D.board('G4', 0, 3, 'White'); IL.address(200, 590, 680, 136, 'you', 'dark'); D.markS();
  D.board('G5', 0, 4, 'White'); D.fitT(420, 'Stop', 480, 'Ink', {}); D.pill(D.M, 490, 800, 270, 'Peach'); D.fitT(690, 'chasing', 620, 'Ink', { x: 150 }); D.fitT(1010, 'payment', 730, 'Ink', {}); D.markS();
  D.board('G6', 0, 5, 'White'); IL.circ(540, 560, 400, 'Deep', { lay: LM }); IL.T(540, 630, '4.5%', 220, 'White', { align: 'c', lay: 'Notes', track: -30 }); D.small(D.M, 1120, 'On Pro, plus AED 2, on what you earn.', 'Ink', 38); D.markS();
  D.board('G7', 0, 6, 'White'); D.pill(D.M, 72, 760, 180, 'Lilac'); D.pill(D.M, 272, 560, 180, 'Violet'); D.pill(D.M, 472, 340, 180, 'Peach'); D.fitT(1090, 'See what earns.', 820, 'Ink', {}); D.markS();
  D.board('G8', 0, 7, 'White'); IL.img('creator_reel.png', 568, 72, 440, 1206, { r: 220, fy: .3, lay: LM }); D.small(D.M, 620, 'Reels.\nYour\nprice.', 'Ink', 104); D.markS();
  D.board('G9', 0, 8, 'White'); IL.circ(540, 520, 300, 'Violet', { lay: LM }); D.arrow(540, 520, 130, 'White', 26); D.fitT(1090, 'Claim your name.', 840, 'Ink', {}); D.markS();
};

// ---------- H: full colour posters. One giant word, a cut-out in front of it ----------
D.poster = function (name, k, ground, word, col, cut, sub, o) {
  o = o || {};
  D.board(name, 1, k, ground);
  D.fitT(o.y || 340, word, 936, col, { lay: 'Mark', max: o.max });
  if (cut) IL.img(cut, o.x === undefined ? 40 : o.x, o.top || 230, o.w || 1000, 1350 - (o.top || 230), { fit: true, ay: 1, ax: o.ax === undefined ? .5 : o.ax, lay: 'Notes' });
  if (sub) IL.T(D.M, 1262, sub, 40, col, { lay: 'Type', track: -6 });
};
D.buildH = function () {
  D.poster('H1', 0, 'Peach', 'Paid.', 'Ink', 'people_creator.png', '', { y: 480, top: 420 });
  D.board('H2', 1, 1, 'Violet'); D.fitT(350, 'Stop', 560, 'White', {}); D.fitT(730, 'chasing', 936, 'White', {}); D.fitT(1090, 'payment.', 936, 'Lilac', {}); D.markS('white');
  D.poster('H3', 2, 'Electric', 'Your link.', 'White', 'app_hero.png', '', { y: 300, top: 350 });
  D.board('H4', 1, 3, 'Coral'); D.fitT(760, '4.5%', 936, 'Ink', {}); D.small(D.M, 880, 'On Pro, plus AED 2,\non what you earn.', 'Ink', 56); D.markS('ink');
  D.poster('H5', 4, 'Lilac', 'Digitals.', 'Deep', 'people_model.png', '', { y: 330, top: 300 });
  D.board('H6', 1, 5, 'Deep'); D.fitT(560, 'Held.', 936, 'Peach', {}); D.small(D.M, 700, 'Until you approve\nthe work.', 'White', 64); D.markS('reversed');
  D.poster('H7', 6, 'Blush', 'No limit.', 'Violet', 'app_applinks.png', '', { y: 325, top: 370 });
  D.poster('H8', 7, 'Peach', 'Booked.', 'Deep', 'people_brand.png', '', { y: 320, top: 300 });
  D.board('H9', 1, 8, 'Violet'); D.fitT(560, 'inflink.ae/', 936, 'Lilac', {}); D.fitT(900, 'you', 620, 'White', {}); D.markS('white');
};

// ---------- I: gallery. Vivid photos with a single price, then very quiet white pages ----------
D.gPhoto = function (name, k, img, fy, px, py, label, price, flip) { D.board(name, 2, k, 'Night'); IL.img(img, 0, 0, 1080, 1350, { fy: fy, lay: LM }); D.pin(px, py, label, price, flip); };
D.gWhite = function (name, k, y, big, size, col, line) { D.board(name, 2, k, 'White'); D.h(y, big, size, col); if (line) D.small(D.M, 1120, line, 'Soft', 40); D.markS(); };
D.buildI = function () {
  D.gPhoto('I1', 0, 'creator_cover.png', .4, 130, 300, 'Venue visit', 'AED 900');
  D.gWhite('I2', 1, 400, 'AED 1,200', 190, 'Ink', 'One Reel. Your price.');
  D.gPhoto('I3', 2, 'creator_story.png', .5, 880, 900, 'Reel', 'AED 1,200', true);
  D.gWhite('I4', 3, 240, 'Brands pay first.\nYou film second.', 84, 'Ink');
  D.gPhoto('I5', 4, 'creator_reel.png', .3, 130, 180, 'Story', 'AED 450');
  D.board('I6', 2, 5, 'White'); IL.rect(340, 240, 400, 520, 'White', { stroke: 'Sand2', sw: 2, r: 6, lay: LM }); IL.img('digitals_front.png', 358, 258, 364, 430, { fy: .1, lay: LM }); IL.T(362, 730, 'Front', 28, 'Ink', { lay: 'Notes' }); IL.T(718, 730, '12 Oct', 28, 'Soft', { align: 'r', lay: 'Notes' }); D.small(D.M, 1120, 'Digitals, always dated.', 'Ink', 44); D.markS();
  D.gPhoto('I7', 6, 'creator_venue.png', .5, 900, 300, 'Story set', 'AED 650', true);
  D.gWhite('I8', 7, 700, 'Held.', 260, 'Violet', 'Until you approve the work.');
  D.board('I9', 2, 8, 'Night'); IL.img('creator_ugc.png', 0, 0, 1080, 1350, { fy: .3, lay: LM }); IL.address(D.M, 1140, 936, 130, 'yourname', 'light');
};
