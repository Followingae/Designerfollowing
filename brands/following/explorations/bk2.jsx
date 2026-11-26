// Booklet v3: 56 pages, landscape A7, Obviously. Y.build(from, to) builds spreads from..to.
Y.S = {};
var LX = Y.LX, RX = Y.RX, CW = Y.CW, TOP = Y.TOP, ZH = Y.ZH;

// ---------- opening
// Pictures supplied by Zain on 2026-10-13 at full size, kept beside the print master.
(function () { var L = 'C:/Users/user/Desktop/DesignerFollowing/brands/following/final/assets/links/';
  B.IMG.joyful = L + 'Joyful Connection HR.png'; B.IMG.leather = L + 'Luxurious Red Leather HR.png'; B.IMG.manphone = L + 'Man with Smartphone Outdoors HR.png';
  B.IMG.dessert = L + 'Dessert in the Sky HR.png'; B.IMG.canopy = L + 'Verdant Canopy Textures HR.png'; B.IMG.youth = L + 'Fashionable Youth HR.png';
  B.IMG.dj = L + 'DJ in Tropical Vibes HR.png'; B.IMG.celeb = L + 'Celebrity Arrival Scene HR.png'; B.IMG.sporty = L + 'Sporty Duo Portrait HR.png'; })();
Y.S[0] = function (s) {
  B.wm(s, RX, 8.6, 24, 'Ink'); Y.lab(s, 203, Y.HANG + 1.6, '2026', 'Ink', 'r');
  Y.stack(s, RX, 22, CW, 41, ['WHAT', 'WE DO.'], 'Ink');
  B.dot(s, 116, 69.4, 3.2, 'Ink');
  B.line(s, [[116, 69.4], [182, 69.4], { to: [203, 69.2], loops: 2, r: 2.8 }, [209, 69.4], [214, 69.4]], 2.2, { from: 0.2, to: 1, steps: 60 });
};
Y.S[1] = function (s) {
  B.photo(s, 'L', 'joyful', { fx: 0.78, fy: 0.4 });
  Y.hl(s, 'R', 'Following');
  Y.stack(s, RX, TOP, CW, ZH, ['INFLUENCER', 'CAMPAIGNS', 'THAT PERFORM.'], 'Ink');
  Y.sub(s, RX, 'Paid, barter and cashback. For brands in the UAE.');
};
Y.S[2] = function (s) {
  B.photo(s, 'R', 'youth', { fx: 0.5, fy: 0.42 });
  Y.hl(s, 'L', 'Since 2023');
  var k = Y.stack(s, LX, TOP, CW, 34, ['3.5K'], 'Violet');
  Y.sub(s, LX, 'creators activated', 'Ink', k.bottom + 6.4, 13);
  Y.fig(s, LX, 64.4, '200+', 'campaigns'); Y.fig(s, LX + 34, 64.4, '95%', 'client retention');
};
Y.S[3] = function (s) {
  Y.hl(s, 'L', 'A UAE company'); Y.hl(s, 'R');
  Y.stack(s, LX, TOP, CW, ZH, ['BORN IN', 'DUBAI.'], 'Ink');
  W.flag(s, RX, 14, 15);
  Y.say(s, RX, 27, 86, 'Building the future of influencer marketing, from here.');
  Y.txt(s, RX, 54, 60, 'An agency, an app for creators and a production arm. UAE creators, and the brands that want to reach them.');
};
Y.S[4] = function (s) {
  Y.hl(s, 'L', 'As seen on'); Y.hl(s, 'R', 'Shortlisted');
  var k = Y.stack(s, LX, TOP, CW, 38, ['SHARK TANK', 'DUBAI.'], 'Ink');
  Y.txt(s, LX, 58, 60, 'Following appeared on Shark Tank Dubai in 2025.');
  Y.stack(s, RX, TOP, CW, 38, ['50,000+', 'APPLIED.'], 'Violet', { font: k.font, cap: k.cap });
  Y.txt(s, RX, 58, 60, 'We were shortlisted. Startup Qatar, an initiative by Invest Qatar.');
};
Y.S[5] = function (s) {
  Y.hl(s, 'L', 'Clients'); Y.hl(s, 'R', 'Contents');
  // ten clients, two columns of five
  var cl = ['Barakat', 'Rebel Foods', 'Palazzo Versace', 'R&B', 'CAFU', 'Aseel', 'Damas Jewellery', 'Minimalist Skincare', 'GMG Group', 'Jollibee'], r = [[], []], i, cw = (CW - 5) / 2;
  for (i = 0; i < cl.length; i++) r[i < 5 ? 0 : 1].push([cl[i], '']);
  Y.rows(s, LX, 21, cw, r[0], { step: 7.4, size: 12.5, num: false });
  Y.rows(s, LX + cw + 5, 21, cw, r[1], { step: 7.4, size: 12.5, num: false });
  Y.rows(s, RX, 21, CW, [['Paid', '', '12'], ['Barter', '', '16'], ['Cashback', '', '22'], ['Production', '', '36'], ['How we work', '', '40'], ['Also by Following: Inflink', '', '46'], ['Contact', '', '54']], { step: 7.4, size: 12.5, col: 'Violet' });
};

// ---------- 01 Paid: burgundy and rose
Y.S[6] = function (s) {
  B.photo(s, 'L', 'celeb', { fx: 0.5, fy: 0.3 }); B.ground(s, 'R', 'Burgundy');
  Y.hl(s, 'R', '01', 'Rose');
  Y.stack(s, RX, TOP, CW, ZH, ['PAID'], 'Rose');
  Y.sub(s, RX, 'Named talent for launches and big moments.', 'Rose');
};
Y.S[7] = function (s) {
  B.photo(s, 'R', 'leather', { fx: 0.5, fy: 0.5 });
  Y.hl(s, 'L', 'Paid / how it runs');
  Y.stack(s, LX, TOP, CW, ZH, ['MATCH.', 'BRIEF.', 'PRODUCE.', 'PROVE.'], 'Burgundy', { notes: ['A vetted shortlist.', 'Approved by you, upfront.', 'Reels, stories, posts.', 'A full report.'] });
  Y.sub(s, LX, 'For launches and hero moments.');
};

// ---------- 02 Barter: tomato and sky
Y.S[8] = function (s) {
  B.ground(s, 'L', 'Tomato'); B.photo(s, 'R', 'dessert', { fx: 0.5, fy: 0.3 });
  Y.hl(s, 'L', '02', 'Sky');
  Y.stack(s, LX, TOP, CW, ZH, ['BARTER'], 'Sky');
  Y.sub(s, LX, 'Send product. Get content. Every month.', 'Sky');
};
Y.S[9] = function (s) {
  W.strip(s, 'perfume', 105, 52.5, { fx: 0.5, fy: 0.62 }); W.strip(s, 'dropper', 157.5, 52.5, { fx: 0.5, fy: 0.5 });
  Y.hl(s, 'L', 'Barter / how it runs');
  Y.stack(s, LX, TOP, CW, ZH, ['CURATE.', 'SHIP.', 'TRACK.', 'REUSE.'], 'Tomato', { notes: ['A monthly creator list.', 'We pack and deliver.', 'Every post captured.', 'Content rights included.'] });
  Y.sub(s, LX, 'You send the product once.');
};
Y.S[10] = function (s) {
  B.photo(s, 'LR', 'dj', { fx: 0, fy: 0.22, zoom: 1.52, shade: 14 });
  Y.stack(s, LX, 22, CW, 41, ['ALWAYS', 'ON.'], 'White');
  Y.sub(s, LX, 'An always-on barter engine.', 'White');
};

// ---------- 03 Cashback: cobalt and peach
Y.S[11] = function (s) {
  B.photo(s, 'L', 'manphone', { fx: 0.62, fy: 0.4 }); B.ground(s, 'R', 'Cobalt');
  Y.hl(s, 'R', '03', 'Peach');
  Y.stack(s, RX, TOP, CW, ZH, ['CASH', 'BACK'], 'Peach');
  Y.sub(s, RX, 'You pay only when they post.', 'Peach');
};
Y.S[12] = function (s) {
  Y.hl(s, 'L', 'The opportunity you cannot see'); Y.hl(s, 'R');
  var seed = 11, hit = {}, n = 0, k, i;
  function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
  while (n < 25) { k = Math.floor(rnd() * 500); if (!hit[k]) { hit[k] = 1; n++; } }
  for (i = 0; i < 500; i++) B.dot(s, LX + 0.8 + (i % 50) * 1.824, 15.2 + Math.floor(i / 50) * 1.824, hit[i] ? 1.5 : 0.75, hit[i] ? 'Cobalt' : 'Ink');
  Y.stack(s, LX, 37.4, CW, 21, ['25 IN 500'], 'Cobalt');
  Y.sub(s, LX, 'customers are influencers.', 'Ink', 66, 14);
  Y.say(s, RX, 13.6, 88, 'They pay full price, post nothing, and you never know they were there.');
  Y.txt(s, RX, 54, 66, 'Twenty to twenty-five, based on 3 to 5 percent of UAE urban consumers. An influencer here has 10K followers or more.');
};
Y.S[13] = function (s) {
  Y.hl(s, 'L', 'Cashback / the model'); Y.hl(s, 'R');
  Y.stack(s, LX, TOP, CW, ZH, ['ONE', 'LOOP.'], 'Cobalt');
  Y.rows(s, RX, 22, CW, [['Customer pays', 'Online or at your counter'], ['We detect', 'Profile, reach, brand fit'], ['You approve', 'One tap, or set a rule'], ['They post', 'Inside your deadline'], ['Cashback releases', 'Only once verified']], { col: 'Cobalt' });
};
Y.S[14] = function (s) {
  Y.hl(s, 'L', 'Two lanes, one platform'); Y.hl(s, 'R');
  var k = Y.stack(s, LX, TOP, CW, 24, ['ONLINE'], 'Cobalt');
  Y.stack(s, RX, TOP, CW, 24, ['INSTORE'], 'Cobalt', { font: k.font, cap: k.cap });
  var L = [['At checkout', 'One toggle: are you an influencer? It checks if the order earns cashback.'], ['On the e-invoice', 'One link. Details arrive prefilled. Only the Instagram handle is left.']];
  var R = [['On the receipt', 'Every transaction carries a QR. No staff involvement, no new hardware.'], ['At the counter', 'A standee. One line of copy does the asking for you.']], i, yy;
  for (i = 0; i < 2; i++) {
    yy = 48 + i * 11.6;
    B.rule(s, LX, yy - 5, LX + CW, yy - 5, 'Ink', 0.3); B.rule(s, RX, yy - 5, RX + CW, yy - 5, 'Ink', 0.3);
    B.t(s, LX, yy, L[i][0], Y.ROW, 11.5, 'Ink', {}); B.t(s, LX, yy + 3.4, L[i][1], Y.T, 5.6, 'Ink', {});
    B.t(s, RX, yy, R[i][0], Y.ROW, 11.5, 'Ink', {}); B.t(s, RX, yy + 3.4, R[i][1], Y.T, 5.6, 'Ink', {});
  }
  B.rule(s, LX, 66.2, LX + CW, 66.2, 'Ink', 0.3); B.rule(s, RX, 66.2, RX + CW, 66.2, 'Ink', 0.3);
};
Y.S[15] = function (s) {
  Y.hl(s, 'L', 'Fit and cost'); Y.hl(s, 'R', 'The wallet', 'White');
  Y.stack(s, LX, TOP, CW, 30, ['YOU SET', 'THE CRITERIA.'], 'Cobalt');
  Y.sub(s, LX, 'Gender, size, location, category.', 'Ink', 49.4, 11);
  B.rule(s, LX, 54, LX + CW, 54, 'Ink', 0.3);
  Y.fig(s, LX, 62, 'AED 5,000+', 'paid campaign', 'Ink', 13); Y.fig(s, LX + 40, 62, 'Product', 'barter', 'Ink', 13); Y.fig(s, LX + 66, 62, 'AED 35', 'cashback', 'Cobalt', 13);
  B.ground(s, 'R', 'Cobalt');
  Y.mock(s, 'following_cashback', 157.5, 37.4, 80, 52);
  B.a(s, RX, 64.2, 88, 10, 'AED 35 is held when the claim is approved, released when the post is verified, and returned to your pool if the deadline is missed.', Y.T, 5.8, 'White', { lead: 7.6 });
};
Y.S[16] = function (s) {
  Y.hl(s, 'L', 'Control'); Y.hl(s, 'R', 'Pricing and go live');
  Y.stack(s, LX, TOP, CW, ZH, ['YOU SET.', 'WE VERIFY.', 'YOU APPROVE.'], 'Cobalt');
  Y.fig(s, RX, 24, 'AED 299', 'a month, flat', 'Cobalt', 20); Y.fig(s, RX + 36, 24, '10%', 'of cashback', 'Ink', 20); Y.fig(s, RX + 58, 24, 'AED 5,000', 'minimum pool', 'Ink', 20);
  B.rule(s, RX, 33, RX + CW, 33, 'Ink', 0.3);
  Y.say(s, RX, 36, 88, 'Discovery tools hand you a name. We run the rest.', 'Ink', 15);
  Y.txt(s, RX, 58, 70, 'A 30 minute call. Fund the pool. Go live, online and instore.');
};
Y.S[17] = function (s) {
  B.photo(s, 'L', 'light', { fx: 0.4, fy: 0.34 });
  Y.hl(s, 'R', 'Only once verified');
  Y.stack(s, RX, TOP, CW, ZH, ['THEY POST.', 'CASHBACK', 'RELEASES.'], 'Cobalt');
};

// ---------- 04 Production: forest and lilac
Y.S[18] = function (s) {
  B.photo(s, 'LR', 'crowd', { fx: 0.5, fy: 0.36, shade: 20 });
  Y.lab(s, 203, Y.HANG, '04', 'White', 'r');
  Y.stack(s, RX, 30, CW, 33, ['PRODUCTION'], 'White', { bottom: true, align: 'r' });
  B.t(s, RX + CW, Y.SUBY, 'We also produce.', Y.SUB, 11, 'White', { align: 'r' });
};
Y.S[19] = function (s) {
  B.photo(s, 'R', 'canopy', { fx: 0.5, fy: 0.5 });
  Y.hl(s, 'L', 'Following Media');
  var k = Y.stack(s, LX, TOP, CW, 13, ['FIVE FORMATS.'], 'Forest');
  Y.rows(s, LX, 34.6, CW, [['Compact product video', 'Small crew, natural light.'], ['Bespoke product video', 'Studio tabletop, macro.'], ['Studio commercial', 'Actor-led, clean set.'], ['Hero product commercial', 'Talent, art direction.'], ['Full production commercial', 'Full crew, national.']], { col: 'Forest', step: 8, size: 10.5, dx: 50, dsize: 5.8 });
};

// ---------- How we work: mustard and violet
Y.S[20] = function (s) {
  B.ground(s, 'L', 'Mustard'); B.photo(s, 'R', 'sporty', { fx: 0.5, fy: 0.36 });
  Y.hl(s, 'L', 'How we work', 'Ink');
  Y.stack(s, LX, TOP, CW, 54, ['LISTEN.', 'MATCH.', 'BRIEF.', 'PRODUCE.', 'REPORT.'], 'Ink', { gap: 2.4, notes: ['01', '02', '03', '04', '05'], nw: 10 });
};
Y.S[21] = function (s) {
  B.ground(s, 'R', 'Lilac');
  Y.mock(s, 'following_app', 157.5, 42.6, 80, 61);
  Y.hl(s, 'L', 'How creators join'); Y.hl(s, 'R', 'The Following app');
  Y.stack(s, LX, TOP, CW, 42, ['THEY APPLY.', 'WE INVITE.', 'THEY GET PAID.'], 'Violet');
  Y.txt(s, LX, 60, 80, 'They browse deals in the Following app and apply in one tap. Our team finds and onboards creators to your brief. Earnings land in the app.');
};
Y.S[22] = function (s) {
  B.ground(s, 'R', 'Mustard');
  Y.mock(s, 'following_report', 158.5, 42.6, 98, 60);
  Y.hl(s, 'L', 'Why Following'); Y.hl(s, 'R', 'The brand dashboard');
  Y.stack(s, LX, TOP, CW, 36, ['WHY', 'FOLLOWING.'], 'Violet');
  Y.rows(s, LX, 59.4, CW, [['Agency discipline', ''], ['In-house tech and a production arm', '']], { step: 6.6, size: 10, num: false });
};

// ---------- Inflink: ink only
Y.S[23] = function (s) {
  B.ground(s, 'R', 'Coral');
  Y.hl(s, 'L', 'Also by Following');
  Y.inflink(s, LX, 19, 84, 'col');
  Y.sub(s, LX, 'Book UAE creators in minutes.', 'Ink', 58, 15);
  Y.txt(s, LX, 61.4, 80, 'Fixed prices. Briefs written for you. Pay only when you approve.');
  Y.mock(s, 'inflink_creator', 157.5, 42.8, 80, 62);
  Y.hl(s, 'R', 'Every creator has a price');
};
Y.S[24] = function (s) {
  Y.hl(s, 'L', 'Dealing in DMs gets messy'); Y.hl(s, 'R', 'With Inflink');
  var k = Y.stack(s, LX, TOP, 30, ZH, ['8'], 'Ink', { font: 'Obviously-NarwBlck' }), i;
  var eight = ['Find', 'DM', 'Wait', 'Negotiate', 'Write brief', 'Pay upfront', 'Chase', 'Get invoice'], r = [];
  for (i = 0; i < 4; i++) { B.t(s, 44, 22 + i * 8.4, eight[i], Y.ROW, 10.5, 'Ink', {}); B.t(s, 68, 22 + i * 8.4, eight[i + 4], Y.ROW, 10.5, 'Ink', {}); }
  B.t(s, 44, 60, 'steps, in DMs and spreadsheets', Y.T, 6.4, 'Ink', {});
  Y.stack(s, RX, TOP, 30, ZH, ['3'], 'Ink', { font: 'Obviously-NarwBlck' });
  var three = ['Pick.', 'Pay.', 'Approve.'];
  for (i = 0; i < 3; i++) Y.set(s, RX + 40, 26 + i * 10, three[i], Y.SUB, 22, 'Ink', 0);
  B.t(s, RX + 40, 60, 'steps, on one page', Y.T, 6.4, 'Ink', {});
};
Y.S[25] = function (s) {
  B.ground(s, 'R', 'Iris');
  Y.hl(s, 'L', 'Meet Inflink'); Y.lab(s, 112, Y.HANG, 'The brief, written for you', 'White'); Y.lab(s, 203, Y.HANG, String(2 * s + 1), 'White', 'r');
  Y.stack(s, LX, TOP, CW, 40, ['FIXED PRICES.', 'INSTANT BRIEF.', 'PAY ON APPROVAL.'], 'Ink');
  Y.txt(s, LX, 58, 84, 'No negotiating. The brief is written for you. Your money is held until you approve. Built for restaurants, e-commerce, beauty, fashion, hotels, events, real estate and fitness.');
  Y.mock(s, 'inflink_brief', 158.5, 43, 80, 61);
};
Y.S[26] = function (s) {
  Y.hl(s, 'L', 'How to order'); Y.hl(s, 'R', 'One simple fee');
  Y.rows(s, LX, 22, CW, [['Find a creator', '14 niches. Fixed prices shown.'], ['Book and pay', 'Inflink holds the money.'], ['Get your brief', 'Ready in 20 seconds.'], ['Approve on WhatsApp', 'One tap. No app to download.']], { step: 10.4, dx: 46 });
  var k = Y.stack(s, RX, TOP, CW, 30, ['6.25%'], 'Ink');
  Y.sub(s, RX, "on top of the creator's price", 'Ink', k.bottom + 6, 13);
  B.rule(s, RX, 54, RX + CW, 54, 'Ink', 0.3);
  Y.txt(s, RX, 56.4, 84, "Creator's price AED 900. You pay AED 960. Can't deliver? Full refund. No subscription, no minimum, no retainer.");
};

// ---------- close
Y.S[27] = function (s) {
  Y.hl(s, 'L'); Y.hl(s, 'R', 'Contact');
  Y.stack(s, LX, TOP, CW, ZH, ["LET'S BUILD", 'SOMETHING', 'TOGETHER.'], 'Ink');
  Y.set(s, RX, 24, 'hello@following.ae', Y.SUB, 26, 'Violet', 0);
  Y.rows(s, RX, 36, CW, [['@followingsocials', 'Instagram'], ['following.ae', 'Website'], ['app.following.ae', 'Dashboard'], ['app.inflink.ae/request', 'Inflink, post a brief']], { step: 7.6, size: 10.5, dx: 50, num: false });
  W.flag(s, RX, 63.4, 9); B.t(s, RX + 12, 66.6, 'Dubai, United Arab Emirates', Y.T, 6.4, 'Ink', {});
};
Y.S[28] = function (s) {
  B.wm(s, LX, 8.6, 24, 'Ink');
  B.line(s, [[-4, 69.4], [30, 69.4], { to: [54, 69.2], loops: 2, r: 2.8 }, [66, 69.4], [89, 69.4]], 2.2, { from: 0.2, to: 1, steps: 60 });
  B.dot(s, 89, 69.4, 3.2, 'Ink');
};

Y.build = function (a, b) {
  var s, out = [];
  Y.spots(); Y.spots2();
  for (s = a; s <= b; s++) { try { B.clear(s); Y.S[s](s); Y.bar(s); } catch (e) { out.push('s' + s + ': ' + e + ' @' + e.line); } }
  return out.length ? out.join(' | ') : 'ok ' + a + '-' + b;
};
