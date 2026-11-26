// Following, December: 23 posts in the locked direction. Photo with tags, white type pages, carousels. Needs sl.jsx and posts.jsx.
var Q = {};
Q.slots = []; (function () { var k, r; for (k = 1; k < 12; k++) Q.slots.push([4, k]); for (r = 20; r < 23; r++) for (k = 0; k < 12; k++) Q.slots.push([r, k]); })();
Q.n = 0;
(function () { var base = P.board; P.board = function (name, row, k, w, h, ground) { var s = Q.slots[Q.n++]; var d = IL.doc, i, found = -1; for (i = 0; i < d.artboards.length; i++) if (d.artboards[i].name === name) found = i;
  w = w || 1080; h = h || 1350; var y = s[0] === 20 ? 6650 : (s[0] === 21 ? 8100 : (s[0] === 22 ? -5400 : 5200 - s[0] * 1450)), x = -7000 + s[1] * 1200;
  if (IL.cur) IL.show(); IL.W = w; IL.H = h; var ab; if (found >= 0) { IL.clear(name); ab = d.artboards[found]; } else { ab = d.artboards.add([x, y, x + w, y - h]); ab.name = name; }
  IL.cur = name; IL.org = [ab.artboardRect[0], ab.artboardRect[1]]; IL.rect(0, 0, w, h, ground || 'White', { lay: 'Ground' }); }; })();
var L1 = 'Lime', I1 = 'Ink', Wt = 'White';
Q.build = function () {
  P.type('N22_Tue01_First_collab', 0, 0, 'Your first collab', 'starts here.', [[760, 860, 'FOR CREATORS', L1, I1, -6]], 'Paid collabs, barter and cashback, in one app.', { y: 480, size: 118 });
  P.photo('N23_Wed02_Eid_Al_Etihad', 0, 0, 'l_eid', 'Happy', 'Eid Al Etihad.', [[300, 850, 'FROM ALL OF US', L1, I1, -5]]);
  P.type('N24_Thu03_One_app', 0, 0, 'Brands. Deals.', 'One app.', [[740, 860, 'HOW IT WORKS', L1, I1, -6]], 'Find the work. Do the work. Get paid.', { y: 500, size: 150 });
  P.photo('N25_Fri04_On_set', 0, 0, 'l_creator', 'A day', 'with a creator.', [[220, 840, 'ON SET', L1, I1, -6], [620, 920, 'PRODUCTIONS', Wt, I1, 4]]);
  P.type('N26_Mon07_Paid_or_barter_01', 0, 0, 'Paid', 'or barter?', [[760, 860, 'MONEY TALK', L1, I1, -6]], 'Swipe before you say yes.', { y: 480, size: 170 });
  P.slide('N26_Mon07_Paid_or_barter_02', 0, 0, '1', 'Take paid', 'when it costs you time.', 'If the shoot takes real work, the fee should pay for it.', 'PAID');
  P.slide('N26_Mon07_Paid_or_barter_03', 0, 0, '2', 'Take barter', 'when you want it anyway.', 'If you would buy it yourself, the product is the fee.', 'BARTER');
  P.end('N26_Mon07_Paid_or_barter_04', 0, 0, 'Both are', 'in the app.', 'LINK IN BIO');
  P.photo('N27_Tue08_Wallet', 0, 0, 'l_wallet', 'Your wallet,', 'in AED.', [[300, 840, 'HOW IT WORKS', L1, I1, -5], [720, 930, 'WITHDRAW TO BANK', Wt, I1, 4, 42]]);
  P.type('N28_Wed09_Three_services', 0, 0, 'Influencers.\nUGC.\nProductions.', 'One team.', [[780, 190, 'FOR BRANDS', 'Violet', Wt, 5]], 'Everything we do, in one post.', { y: 420, size: 136 });
  P.photo('N29_Thu10_First_collab_01', 0, 0, 'l_collab', 'Nail your', 'first collab.', [[300, 830, 'THE BRIEF', L1, I1, -5], [880, 1270, 'SWIPE', Wt, I1, 4, 40]]);
  P.slide('N29_Thu10_First_collab_02', 0, 0, '1', 'Read the brief.', 'Twice.', 'Know the must-says, the dates and what to avoid.', 'TIP');
  P.slide('N29_Thu10_First_collab_03', 0, 0, '2', 'Show your draft.', 'Early.', 'One early look saves three rounds of changes.', 'TIP');
  P.slide('N29_Thu10_First_collab_04', 0, 0, '3', 'Post on the day.', 'Then tell them.', 'Send the link. It is how the next deal starts.', 'TIP');
  P.type('N30_Fri11_Made_by', 0, 0, 'Made by creators.', 'Not by committee.', [[740, 860, 'UGC', L1, I1, -6]], 'Give creators the brief, then the room.', { y: 480, size: 114 });
  P.photo('N31_Mon14_Earn_back', 0, 0, 'l_shop', 'Shop.', 'Post. Earn back.', [[300, 840, 'CASHBACK', L1, I1, -6], [740, 920, 'HOW IT WORKS', Wt, I1, 4]]);
  P.type('N32_Tue15_Rate', 0, 0, 'Your rate is not', 'your follower count.', [[740, 880, 'MONEY TALK', L1, I1, -6]], 'Who sees it matters more.', { y: 460, size: 120 });
  P.photo('N33_Wed16_Views_01', 0, 0, 'l_read', 'How we read', 'engagement.', [[300, 830, 'FOR BRANDS', 'Violet', Wt, -5], [880, 1270, 'SWIPE', Wt, I1, 4, 40]]);
  P.slide('N33_Wed16_Views_02', 0, 0, '1', 'Reach beats', 'followers?', 'Then we measure against views.', 'METHOD');
  P.slide('N33_Wed16_Views_03', 0, 0, '2', 'If not,', 'against followers.', 'And against creators of a similar size.', 'METHOD');
  P.slide('N33_Wed16_Views_04', 0, 0, '3', 'No guesswork.', 'No filler.', 'If a check fails, we leave it out instead of making up a score.', 'METHOD');
  P.type('N34_Thu17_Tag_a_creator', 0, 0, 'Know a creator', 'who should join?', [[760, 860, 'TAG THEM', L1, I1, -6]], 'Send them this post.', { y: 480, size: 118 });
  P.photo('N35_Fri18_Behind', 0, 0, 'l_set', 'Behind', 'the camera.', [[220, 840, 'ON SET', L1, I1, -6], [620, 920, 'PRODUCTIONS', Wt, I1, 4]]);
  P.type('N36_Mon21_Holiday_01', 0, 0, 'Holiday content', 'that works.', [[740, 860, 'THE BRIEF', L1, I1, -6]], 'Swipe for three ideas.', { y: 500, size: 122 });
  P.slide('N36_Mon21_Holiday_02', 0, 0, '1', 'Gift guides.', 'Real ones.', 'Only things you would give yourself.', 'IDEA');
  P.slide('N36_Mon21_Holiday_03', 0, 0, '2', 'Your year', 'in 9 posts.', 'Easy to make, easy to share.', 'IDEA');
  P.slide('N36_Mon21_Holiday_04', 0, 0, '3', 'Going-out looks.', 'Save for later.', 'Saves tell brands your content is useful.', 'IDEA');
  P.photo('N37_Tue22_Going_out', 0, 0, 'l_out', 'Going out?', 'Get paid back.', [[300, 840, 'CASHBACK', L1, I1, -6], [720, 920, 'SCAN THE RECEIPT', Wt, I1, 4]]);
  P.type('N38_Wed23_Shark_Tank', 0, 0, 'Seen on', 'Shark Tank Dubai.', [[760, 860, 'PROOF', L1, I1, -6]], 'Yes, that was us.', { y: 480, size: 130 });
  P.board('N39_Thu24_Your_best', 0, 0); IL.img('photos/d_purple.jpg', 40, 40, 1000, 1000, { r: 0 }); P.head(P.M, 1130, 'Your best work this year.', 'Tag us in it.', 58); P.logo(1080 - P.M - 200, 1250, 160); P.tag(190, 120, 'UGC', L1, I1, 54, -6);
  P.type('N40_Fri25_Holidays', 0, 0, 'From', 'all of us.', [[740, 860, 'HAPPY HOLIDAYS', L1, I1, -6]], 'To everyone celebrating.', { y: 480, size: 190 });
  P.photo('N41_Mon28_Our_year_01', 0, 0, 'd_neon', 'Our', 'year.', [[300, 840, 'PROOF', L1, I1, -6], [880, 1270, 'SWIPE', Wt, I1, 4, 40]]);
  P.slide('N41_Mon28_Our_year_02', 0, 0, '1', 'Seen on', 'Shark Tank Dubai.', 'Yes, that was us.', 'PROOF');
  P.slide('N41_Mon28_Our_year_03', 0, 0, '2', 'Shortlisted', 'for StartupQatar.', 'By the Qatar Government, out of 50,000+ startups.', 'PROOF');
  P.slide('N41_Mon28_Our_year_04', 0, 0, '3', 'Built in', 'Dubai.', 'Paid collabs, barter and cashback, in one app.', 'PROOF'); // 2026-11-26: client names removed. Never list clients.
  P.type('N42_Tue29_Raise_rates', 0, 0, 'Raise your', 'rates in January.', [[740, 860, 'MONEY TALK', L1, I1, -6]], 'New year, new rate card.', { y: 480, size: 140 });
  P.photo('N43_Wed30_Ramadan', 0, 0, 'd_leather', 'Planning Ramadan?', 'Start now.', [[300, 830, 'FOR BRANDS', 'Violet', Wt, -5]], { size: 92 });
  P.type('N44_Thu31_New_year', 0, 0, 'See you', 'in 2027.', [[740, 860, 'THANK YOU', L1, I1, -6]], 'From all of us at Following.', { y: 480, size: 190 });
};
Q.exportAll = function () {
  var fo = new Folder(IL.ROOT + 'exports/2026-11-12_posts'); fo.create();
  var d = IL.doc, o = new ExportOptionsPNG24(); o.artBoardClipping = true; o.horizontalScale = 100; o.verticalScale = 100; o.transparency = false;
  for (var i = 0; i < d.artboards.length; i++) { var n = d.artboards[i].name; if (!/^N(2[2-9]|3\d|4\d)_/.test(n)) continue; d.artboards.setActiveArtboardIndex(i); d.exportFile(new File(fo.fsName + '/' + n + '.png'), ExportType.PNG24, o); }
};
