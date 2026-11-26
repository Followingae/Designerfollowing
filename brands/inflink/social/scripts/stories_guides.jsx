// Inflink highlight guides: What is Inflink, Set up, How bookings work. Same Story system as stories_2m (ground, brand dot, real app screen off the foot).
// The first frame of each set is the highlight cover: one dot, one word, centred so the circle crop reads.
var HG = { DIR: IL.ROOT + 'social/exports/highlights', FILE: IL.ROOT + 'social/Inflink_Highlights.ai' };
HG.open = function () {
  var i; for (i = 0; i < app.documents.length; i++) if (app.documents[i].name === 'Inflink_Highlights.ai') { IL.doc = app.documents[i]; IL.doc.activate(); IL.boot(); return; }
  var f = new File(HG.FILE); if (f.exists) { IL.doc = app.open(f); IL.boot(); return; }
  IL.doc = app.documents.add(DocumentColorSpace.RGB, 1080, 1920); IL.doc.artboards[0].name = '_start'; IL.boot(); IL.doc.saveAs(f);
};
HG.SETS = [
 { k: 'W', g: ['Violet', 'White', 'Peach'], title: 'What is\rInflink?', foot: 'One link that sells your work.', steps: [
   ['One link\nin your bio.', 'link_in_bio'],
   ['It shows\nwhat you sell.', 'store_listings'],
   ['Brands see your\nprices and book.', 'what_brands_see'],
   ['They pay up front.\nThe money is held.', 'order_detail_money_held'],
   ['You are paid\non approval.', 'order_what_you_earn']] },
 { k: 'S', g: ['Deep', 'White', 'Coral'], title: 'Set up', foot: 'Five steps. About five minutes.', steps: [
   ['Sign up.\nPick what you do.', 'onboarding_talent_type'],
   ['Claim\nyour link.', 'onboarding_claim_link'],
   ['Add\nyour links.', 'app-links'],
   ['Add a service.\nSet your price.', 'listing_editor'],
   ['You are live.\nPaste it in your bio.', 'you_are_live']] },
 { k: 'U', g: ['Lilac', 'Ink', 'Electric'], tc: 'White', title: 'How it\rworks', foot: 'From booking to your bank.', steps: [
   ['A brand books.\nThe money is held.', 'order_shoot_booked'],
   ['Get the brief.\nAI helps you plan.', 'ai_brief_shooting_guide'],
   ['Deliver.\nSubmit in the app.', 'order_content_submitted'],
   ['They approve,\nor 7 days pass.', 'order_completed'],
   ['It lands in\nyour balance.', 'earnings'],
   ['Withdraw to your\nbank from AED 100.', 'withdraw']] }
];
HG.title = function (name, n, s) {
  ST.board(name, n, s.g[0]);
  IL.circ(540, 960, 440, s.g[2], { lay: LM });
  var t = IL.T(540, 0, s.title, 150, s.tc || 'Ink', { lay: 'Notes', align: 'c', lead: 150, track: -24 });
  var lines = s.title.split('\r').length; t.top = IL.org[1] - (960 - (lines * 150 * 1.0) / 2) + 18;
  ST.logo(s.g[1] === 'White' ? 'white' : 'primary');
  IL.T(D.M, 1680, s.foot, 54, s.g[1], { lay: 'Notes', track: -10 });
};
HG.step = function (name, n, s, i, q, scr) {
  ST.board(name, n, s.g[0]);
  IL.circ(900, 1250, 340, s.g[2], { lay: LM });
  D.ph2(230, 820, 620, 'native_' + scr + '.png');
  ST.logo(s.g[1] === 'White' ? 'white' : 'primary');
  IL.T(D.M, 420, (i + 1) + ' of ' + s.steps.length, 46, s.g[1], { lay: 'Notes', track: 0 });
  var sz = Math.min(112, ST.size(q));
  IL.T(D.M, 470 + sz * .76, q.replace(/\n/g, '\r'), sz, s.g[1], { lay: 'Notes', lead: sz * 1.04, track: -22 });
};
HG.build = function () {
  var n = 0, names = [], j, i, s;
  for (j = 0; j < HG.SETS.length; j++) {
    s = HG.SETS[j];
    HG.title('HL_' + s.k + '00', n, s); n += 2; names.push('HL_' + s.k + '00');
    for (i = 0; i < s.steps.length; i++) { var nm = 'HL_' + s.k + '0' + (i + 1); HG.step(nm, n, s, i, s.steps[i][0], s.steps[i][1]); n += 2; names.push(nm); }
  }
  return names;
};
HG.export = function (names) {
  var d = IL.doc, i, c = 0, fo = new Folder(HG.DIR), o = new ExportOptionsPNG24(); fo.create();
  o.artBoardClipping = true; o.horizontalScale = 100; o.verticalScale = 100; o.transparency = false;
  var L = d.layers.getByName('Notes'), j;
  for (j = 0; j < L.groupItems.length; j++) { var g = L.groupItems[j]; if (g.width > 90 || g.height > 25 || !/^HL_/.test(g.note)) continue; for (i = 0; i < d.artboards.length; i++) if (d.artboards[i].name === g.note) break; var r = d.artboards[i].artboardRect, sc = 190 / g.width * 100; g.resize(sc, sc, true, true, true, true, sc, Transformation.TOPLEFT); g.left = r[0] + 72; g.top = r[1] - 262; }
  for (i = 0; i < d.artboards.length; i++) { var nm = d.artboards[i].name; for (j = 0; j < names.length; j++) if (names[j] === nm) { d.artboards.setActiveArtboardIndex(i); d.exportFile(new File(fo.fsName + '/' + nm + '.png'), ExportType.PNG24, o); c++; } }
  return c;
};
