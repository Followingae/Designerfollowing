// Following brand guidelines v3: the expanded set (2026-10-15). Run with the cloud document 'Following Guidelines' active.
// Loads lib.jsx. GL.renumber() renames the existing pages; GL.build(name) builds one new page; GL.order() puts artboards in book order.
$.evalFile(new File('C:/Users/user/Desktop/DesignerFollowing/brands/following/explorations/lib.jsx'));
FG.doc = app.activeDocument;
var GL = {};
GL.R = 'C:/Users/user/Desktop/DesignerFollowing/brands/following/';
GL.LINKS = GL.R + 'final/assets/links/';
GL.PREV = GL.R + 'explorations/_pdf_staging/previews/';

// Book order. [artboard, old artboard or null, section label]
GL.BOOK = [
  ['G01_Cover', 'G01_Cover', ''],
  ['G02_Contents', null, 'Contents'],
  ['G03_Idea', 'G02_Idea', '01 / Brand / The idea'],
  ['G04_Who_We_Are', null, '01 / Brand / Who we are'],
  ['G05_Values', null, '01 / Brand / Values and personality'],
  ['G06_Audiences', null, '01 / Brand / Audiences'],
  ['G07_Voice', null, '02 / Voice / Voice and tone'],
  ['G08_Writing', null, '02 / Voice / Writing style'],
  ['G09_Wordmark', 'G03_Wordmark', ''],
  ['G10_Wordmark_Space', 'G04_Wordmark_Space', ''],
  ['G11_Wordmark_Colour', 'G05_Wordmark_Colour', ''],
  ['G12_Wordmark_Misuse', 'G06_Wordmark_Misuse', ''],
  ['G13_Lockups', 'G07_Lockups', ''],
  ['G14_Colour', 'G08_Colour', ''],
  ['G15_Colour_Pairs', 'G09_Colour_Pairs', ''],
  ['G16_Extended_Palette', null, '04 / Colour / Extended palette'],
  ['G17_Colour_Contrast', null, '04 / Colour / Contrast'],
  ['G18_Type', 'G10_Type', ''],
  ['G19_Display_Type', null, '05 / Type / Display face'],
  ['G20_Type_In_Use', 'G11_Type_In_Use', ''],
  ['G21_Type_Scale', null, '05 / Type / Scale'],
  ['G22_Shapes', 'G12_Shapes', ''],
  ['G23_The_Line', null, '06 / Graphic elements / The line'],
  ['G24_Pattern', null, '06 / Graphic elements / Pattern'],
  ['G25_Illustration', 'G13_Illustration', ''],
  ['G26_Photography', null, '07 / Imagery / Photography'],
  ['G27_Layout_Grid', null, '08 / Layout and motion / Grid'],
  ['G28_Motion', null, '08 / Layout and motion / Motion'],
  ['G29_Instagram', null, '09 / Applications / Instagram'],
  ['G30_Packaging', null, '09 / Applications / Packaging'],
  ['G31_Print', null, '09 / Applications / Print'],
  ['G32_Digital', null, '09 / Applications / Digital'],
  ['G33_Accessibility', null, '10 / Resources / Accessibility'],
  ['G34_Files_Contacts', null, '10 / Resources / Files and contacts']
];
GL.SECTION_MAP = { '01': '01', '02': '03', '03': '04', '04': '05', '05': '06', '06': '07', '07': '09' };
GL.folio = function (name) { var i; for (i = 0; i < GL.BOOK.length; i++) if (GL.BOOK[i][0] === name) return (i < 9 ? '0' : '') + (i + 1); return ''; };
GL.section = function (name) { var i; for (i = 0; i < GL.BOOK.length; i++) if (GL.BOOK[i][0] === name) return GL.BOOK[i][2]; return ''; };

// ---------- rename the pages that already exist, and fix their folios and section numbers
GL.renumber = function () {
  var d = FG.doc, i, j, ab, out = [], items, it, t;
  for (i = 0; i < GL.BOOK.length; i++) {
    if (!GL.BOOK[i][1]) continue;
    try { ab = d.artboards.getByName(GL.BOOK[i][1]); } catch (e) { out.push('missing ' + GL.BOOK[i][1]); continue; }
    ab.name = 'TMP_' + GL.BOOK[i][1];
  }
  for (i = 0; i < GL.BOOK.length; i++) {
    var o = GL.BOOK[i][1], n = GL.BOOK[i][0];
    if (!o) continue;
    d.artboards.getByName('TMP_' + o).name = n;
    var L = ['Notes', 'Type', 'Mark', 'Image', 'Ground'];
    for (j = 0; j < L.length; j++) {
      items = FG.lay(L[j]).pageItems;
      for (var k = 0; k < items.length; k++) { it = items[k]; if (it.name.indexOf(o + ':') === 0) it.name = n + ':' + it.name.substr(o.length + 1); }
    }
    for (j = 0; j < d.textFrames.length; j++) {
      t = d.textFrames[j];
      if (t.name.indexOf(n + ':') !== 0) continue;
      if (/^FOLLOWING \/ BRAND GUIDELINES \/ \d\d$/.test(t.contents)) t.contents = 'FOLLOWING / BRAND GUIDELINES / ' + GL.folio(n);
      var m = /^(0\d) \/ (.*)$/.exec(t.contents);
      if (m && GL.SECTION_MAP[m[1]] && t.textRange.characterAttributes.size < 15) t.contents = GL.SECTION_MAP[m[1]] + ' / ' + m[2];
    }
    out.push(o + ' > ' + n);
  }
  return out.join(', ');
};

// ---------- page furniture and type helpers (page-local px, y down)
GL.slot = function (name) {
  var d = FG.doc, i, idx = -1;
  for (i = 0; i < GL.BOOK.length; i++) if (GL.BOOK[i][0] === name) idx = i;
  var col = idx % 2, row = Math.floor(idx / 2), x = -1200 - col * 2000, y = 7748 - row * 1160;
  if (idx >= 28) { x = -5200; y = 7748 - (idx - 28) * 1160; } // the canvas ends below row 13
  var ab; try { ab = d.artboards.getByName(name); } catch (e) { ab = d.artboards.add([x, y, x + FG.W, y - FG.H]); ab.name = name; }
  return ab;
};
GL.start = function (name, ground, ink) { GL.spots(); GL.slot(name); FG.page(name, ground, ink, GL.section(name), GL.folio(name)); };
GL.title = function (p, x, y, l1, l2, col, size) {
  size = size || 120;
  return FG.text(p, 'Type', x, y, l1 + (l2 ? '\r' + l2 : ''), 'EB', size, col, { lead: size * 0.92, track: -20, fonts: l2 ? ['EB', 'MI'] : ['EB'] });
};
GL.body = function (p, x, y, w, h, str, col, size) { size = size || 22; return FG.area(p, 'Type', x, y, w, h, str, 'M', size, col, { lead: size * 1.45 }); };
GL.head = function (p, x, y, str, col, size) { return FG.text(p, 'Type', x, y, str, 'EB', size || 30, col, { lead: (size || 30) * 1.2 }); };
GL.block = function (p, x, y, w, head, body, col, h) { GL.head(p, x, y, head, col); return GL.body(p, x, y + 18, w, h || 160, body, col); };
GL.rule = function (p, x, y, w, col, sw) { return FG.line(p, 'Notes', x, y, x + w, y, col, sw || 1); };
GL.num = function (p, x, y, n, col) { return FG.text(p, 'Type', x, y, n, 'EB', 22, col, {}); };
GL.font = function (key, size) { return FG.text; };
// A run of type in any installed font (used for Obviously specimens).
GL.raw = function (p, x, y, str, fontName, size, col, o) {
  o = o || {};
  var t = FG.text(p, 'Type', x, y, str, 'M', size, col, { lead: o.lead || size, track: o.track || 0, align: o.align });
  t.textRange.characterAttributes.textFont = app.textFonts.getByName(fontName);
  if (o.lead) { t.textRange.characterAttributes.autoLeading = false; t.textRange.characterAttributes.leading = o.lead; }
  return t;
};
// Place a picture, embed it, crop it to a box. fx, fy pick the part that shows (0-1).
GL.img = function (p, file, x, y, w, h, fx, fy, id) {
  var g = FG.org(p), L = FG.lay('Image'), pi = L.placedItems.add();
  pi.file = new File(file);
  var sc = Math.max(w / pi.width, h / pi.height); pi.resize(sc * 100, sc * 100);
  fx = (fx === undefined) ? 0.5 : fx; fy = (fy === undefined) ? 0.5 : fy;
  pi.position = [g[0] + x - (pi.width - w) * fx, g[1] - y + (pi.height - h) * fy];
  pi.embed();
  var r = L.rasterItems[0];
  return FG.clip(p, 'Image', [r], x, y, w, h, { id: id || 'img' });
};
// Fit a picture inside a box without cropping, aligned top-left.
GL.fit = function (p, file, x, y, w, h, id) {
  var g = FG.org(p), L = FG.lay('Image'), pi = L.placedItems.add();
  pi.file = new File(file);
  var sc = Math.min(w / pi.width, h / pi.height); pi.resize(sc * 100, sc * 100);
  pi.position = [g[0] + x, g[1] - y];
  pi.embed();
  return FG.tag(L.rasterItems[0], p, id || 'fit');
};
GL.cmyk = function (rgb) {
  var c = app.convertSampleColor(ImageColorSpace.RGB, rgb, ImageColorSpace.CMYK, ColorConvertPurpose.defaultpurpose);
  return Math.round(c[0]) + ' ' + Math.round(c[1]) + ' ' + Math.round(c[2]) + ' ' + Math.round(c[3]);
};
GL.hex = function (rgb) { var s = '#', i, h; for (i = 0; i < 3; i++) { h = rgb[i].toString(16).toUpperCase(); s += (h.length < 2 ? '0' : '') + h; } return s; };
GL.spot = function (name, r, g, b) {
  var n = 'Following / ' + name, sp, c = new RGBColor();
  try { sp = FG.doc.spots.getByName(n); } catch (e) { sp = FG.doc.spots.add(); sp.name = n; sp.colorType = ColorModel.PROCESS; }
  c.red = r; c.green = g; c.blue = b; sp.color = c; return sp;
};
GL.EXT = [['Burgundy', [92, 12, 34]], ['Rose', [255, 172, 198]], ['Tomato', [236, 58, 30]], ['Sky', [196, 222, 255]], ['Cobalt', [26, 46, 208]], ['Peach', [255, 184, 144]], ['Mustard', [242, 184, 8]], ['Coal', [30, 34, 45]]];
GL.spots = function () { var i; for (i = 0; i < GL.EXT.length; i++) GL.spot(GL.EXT[i][0], GL.EXT[i][1][0], GL.EXT[i][1][1], GL.EXT[i][1][2]); };
GL.pill = function (p, cx, cy, str, size, fill, ink, rot) { return FG.pill(p, 'Mark', cx, cy, str, size, fill, ink, rot || 0); };
// Turns pattern drawn natively: quarter arcs in cells, random flips, two colours.
GL.turns = function (p, x, y, w, h, c, fg, bg, seed) {
  var g = FG.org(p), L = FG.lay('Mark'), items = [], i, j, a, t;
  function rnd() { seed = ((seed || 7) * 9301 + 49297) % 233280; return seed / 233280; }
  items.push(FG.rect(p, 'Mark', x, y, w, h, bg));
  var nx = Math.ceil(w / c) + 1, ny = Math.ceil(h / c) + 1;
  for (j = 0; j < ny; j++) for (i = 0; i < nx; i++) {
    var x0 = x + i * c, y0 = y + j * c, flip = rnd() < 0.5, R = c / 2, k;
    var arcs = flip ? [[x0, y0, 0], [x0 + c, y0 + c, 2]] : [[x0 + c, y0, 1], [x0, y0 + c, 3]];
    for (k = 0; k < 2; k++) {
      var cx = arcs[k][0], cy = arcs[k][1], q = arcs[k][2], pts = [], n;
      for (n = 0; n <= 12; n++) {
        t = -0.03 + (n / 12) * (Math.PI / 2 + 0.06);
        var dx = R * Math.cos(t), dy = R * Math.sin(t);
        if (q === 0) pts.push([cx + dx, cy + dy]); else if (q === 1) pts.push([cx - dx, cy + dy]); else if (q === 2) pts.push([cx - dx, cy - dy]); else pts.push([cx + dx, cy - dy]);
      }
      var pa = L.pathItems.add(), qq = [];
      for (n = 0; n < pts.length; n++) qq.push([g[0] + pts[n][0], g[1] - pts[n][1]]);
      pa.setEntirePath(qq); pa.filled = false; pa.stroked = true; pa.strokeWidth = c * 0.36; pa.strokeColor = FG.col(fg); pa.strokeCap = StrokeCap.BUTTENDCAP;
      items.push(pa);
    }
  }
  items.reverse();
  return FG.clip(p, 'Mark', items, x, y, w, h, { id: 'turns' });
};

// ---------- pages
GL.P = {};

GL.P.G02_Contents = function (p) {
  GL.start(p, 'Ink', 'Lime');
  GL.title(p, 80, 250, 'Contents', null, 'Lime', 156);
  var S = [['01', 'Brand', 'The idea, who we are, values, audiences', '03'], ['02', 'Voice', 'Voice and tone, writing style', '07'], ['03', 'Wordmark', 'Artwork, space, colour, misuse, lockups', '09'],
    ['04', 'Colour', 'Primary, pairs, extended palette, contrast', '14'], ['05', 'Type', 'Plus Jakarta Sans, Obviously, scale', '18'], ['06', 'Graphic elements', 'Shapes, the line, the pattern', '22'],
    ['07', 'Imagery', 'Illustration, photography', '25'], ['08', 'Layout and motion', 'Grid, motion', '27'], ['09', 'Applications', 'Instagram, packaging, print, digital', '29'], ['10', 'Resources', 'Accessibility, files and contacts', '33']];
  var i, x, y;
  for (i = 0; i < S.length; i++) {
    x = (i < 5) ? 80 : 1000; y = 420 + (i % 5) * 112;
    GL.rule(p, x, y - 48, 840, 'Lime', 1);
    FG.text(p, 'Type', x, y, S[i][0], 'EB', 26, 'Lime', {});
    FG.text(p, 'Type', x + 70, y, S[i][1], 'EB', 40, 'White', {});
    FG.text(p, 'Type', x + 70, y + 36, S[i][2], 'M', 20, 'Lilac', {});
    FG.text(p, 'Type', x + 840, y, S[i][3], 'MI', 26, 'Lime', { align: 'r' });
  }
};

GL.P.G04_Who_We_Are = function (p) {
  GL.spots();
  GL.start(p, 'Cream', 'Ink');
  GL.title(p, 80, 250, 'Brands meet', 'creators here.', 'Ink', 130);
  GL.body(p, 80, 420, 760, 260, 'Following is the influencer everything app, built in Dubai. Brands run paid collabs, barter and cashback campaigns with UAE creators in one place. Creators apply in a tap, post, and get paid in AED. When a brand needs the content made, our production arm makes it.', 'Ink', 26);
  GL.block(p, 80, 760, 360, 'Mission', 'Make working with creators as simple to buy as media, and as fair to the creator as a salary.', 'Ink', 140);
  GL.block(p, 480, 760, 360, 'Vision', 'Every brand in the region plans, measures and pays for creator work the way it does for media.', 'Ink', 140);
  var S = [['Paid', 'Named talent for launches and big moments.', 'Burgundy', 'Rose'], ['Barter', 'Send product, get content, every month.', 'Tomato', 'Sky'], ['Cashback', 'Customers who post get money back. Pay only for posts.', 'Cobalt', 'Peach'], ['Production', 'Five formats, from a compact product video to a full commercial.', 'Forest', 'Lime']];
  var i;
  for (i = 0; i < 4; i++) {
    var x = 1000 + (i % 2) * 430, y = 300 + Math.floor(i / 2) * 330;
    FG.rect(p, 'Ground', x, y, 410, 310, S[i][2], { id: 'svc' });
    FG.text(p, 'Type', x + 30, y + 80, S[i][0].toUpperCase(), 'EB', 44, S[i][3], {});
    GL.body(p, x + 30, y + 190, 350, 100, S[i][1], S[i][3], 20);
  }
  FG.label(p, 1000, 990, 'Also by Following: Inflink. Book UAE creators in minutes, at fixed prices.', 'Ink');
};

GL.P.G05_Values = function (p) {
  GL.start(p, 'Violet', 'Lime');
  GL.title(p, 80, 250, 'Straight. Fast.', 'Fair. Local.', 'White', 130);
  var V = [['Straight', 'We say the price, the deadline and the result before anyone asks. No vague packages.'], ['Fast', 'One tap to apply, one tap to approve, payouts the day a post is verified.'],
    ['Fair', 'Creators are paid on time. Brands pay for posts that happened, not promises.'], ['Local', 'Born in Dubai, built around UAE creators, UAE brands and AED.']];
  var i;
  for (i = 0; i < 4; i++) { var x = 80 + i * 450; GL.rule(p, x, 470, 410, 'Lime', 2); FG.text(p, 'Type', x, 520, '0' + (i + 1), 'EB', 22, 'Lime', {}); GL.block(p, x, 580, 400, V[i][0], V[i][1], 'White', 150); }
  FG.label(p, 80, 820, 'Personality: we are, we are not', 'Lime');
  var W = [['Confident', 'arrogant'], ['Playful', 'silly'], ['Direct', 'cold'], ['Loud', 'shouting'], ['Local', 'small']];
  for (i = 0; i < 5; i++) {
    var x2 = 80 + i * 360;
    FG.text(p, 'Type', x2, 890, W[i][0], 'EB', 40, 'White', {});
    FG.text(p, 'Type', x2, 940, 'not ' + W[i][1], 'MI', 30, 'Lilac', {});
  }
};

GL.P.G06_Audiences = function (p) {
  GL.start(p, 'Cream', 'Ink');
  GL.title(p, 80, 250, 'Two audiences.', 'One voice.', 'Ink', 130);
  var A = [
    ['Brands', 'Ink', 'Lime', 'Marketing and growth teams at UAE brands: restaurants, beauty, fashion, retail, hospitality.', 'Reach that converts, content they can reuse, and proof it worked.', 'Fixed prices, a brief written for you, pay on approval.', '"Your campaign, live in 48 hours."'],
    ['Creators', 'Violet', 'Lime', 'UAE-based creators, from first collab to full-time. Instagram and TikTok first.', 'Paid work, products they actually want, and quick payouts.', 'Apply in a tap, post, get paid in AED.', '"Post content. Get cashback."']
  ];
  var i, x, k, L = ['Who', 'What they want', 'What we promise', 'Say it like this'];
  for (i = 0; i < 2; i++) {
    x = 80 + i * 900;
    FG.rect(p, 'Ground', x, 400, 860, 600, A[i][1], { id: 'aud' });
    FG.text(p, 'Type', x + 40, 480, A[i][0], 'EB', 56, A[i][2], {});
    for (k = 0; k < 4; k++) {
      FG.label(p, x + 40, 560 + k * 105, L[k], A[i][2]);
      GL.body(p, x + 40, 572 + k * 105, 780, 90, A[i][3 + k], 'White', 22);
    }
  }
};

GL.P.G07_Voice = function (p) {
  GL.start(p, 'Lime', 'Ink');
  GL.title(p, 80, 250, 'One voice,', 'four tones.', 'Ink', 130);
  GL.body(p, 80, 420, 640, 200, 'The voice never changes: short, specific, warm. The tone moves with the channel. Say the thing, then stop.', 'Ink', 26);
  var T = [['App', 'Clear and instructional', 'Scan your receipt. Cashback lands in AED.'], ['Instagram', 'Loud and playful', 'GET PAID TO POST.'], ['Sales', 'Precise, with numbers', 'AED 299 a month. 10% of cashback. Live in 48 hours.'], ['Support', 'Calm and specific', 'Your payout is on its way. It reaches your bank by Thursday.']];
  var i;
  for (i = 0; i < 4; i++) {
    var y = 420 + i * 150;
    GL.rule(p, 800, y - 40, 1040, 'Ink', 1);
    FG.text(p, 'Type', 800, y + 10, T[i][0], 'EB', 34, 'Ink', {});
    FG.text(p, 'Type', 800, y + 50, T[i][1], 'MI', 22, 'Ink', {});
    GL.body(p, 1150, y - 20, 690, 110, T[i][2], 'Ink', 30);
  }
};

GL.P.G08_Writing = function (p) {
  GL.start(p, 'Cream', 'Ink');
  GL.title(p, 80, 250, 'Write it', 'like a person.', 'Ink', 130);
  var R = [['Following, capital F', 'In a sentence the name takes a capital. The wordmark stays lowercase.'], ['AED before the number', 'AED 2,500. Never 2500 AED or Dhs.'], ['Figures, not words', '3 creators, 48 hours, 10%. Spell out only at the start of a sentence.'],
    ['Sentence case', 'Headlines in Plus Jakarta use sentence case. Obviously headlines are caps.'], ['Dates', '15 October 2026. Times: 7 pm.'], ['Creators, not influencers', 'In product and captions we say creators. "Influencer marketing" is the category name.']];
  var i;
  for (i = 0; i < 6; i++) { var x = 80 + (i % 3) * 460, y = 440 + Math.floor(i / 3) * 230; GL.rule(p, x, y - 40, 420, 'Ink', 1); GL.block(p, x, y, 420, R[i][0], R[i][1], 'Ink', 140); }
  FG.rect(p, 'Ground', 1480, 300, 360, 700, 'Ink', { id: 'avoid' });
  FG.label(p, 1510, 350, 'Words we do not use', 'Lime');
  FG.area(p, 'Type', 1510, 380, 310, 600, 'synergy\rleverage\rgame-changer\relevate\rseamless\rinnovative\rdisrupt\runlock\rjourney\rworld-class', 'MI', 34, 'White', { lead: 52 });
};

GL.P.G16_Extended_Palette = function (p) {
  GL.start(p, 'Cream', 'Ink');
  GL.spots();
  GL.title(p, 80, 250, 'Five pairs', 'for campaigns.', 'Ink', 120);
  GL.body(p, 80, 420, 560, 200, 'The extended palette gives each service its own world in the booklet, on social and on inserts. A pair is a ground and its ink. Use one pair per piece, with the primary palette around it.', 'Ink', 22);
  var P = [['Paid', 'Burgundy', 'Rose'], ['Barter', 'Tomato', 'Sky'], ['Cashback', 'Cobalt', 'Peach'], ['Production', 'Forest', 'Lime'], ['How we work', 'Mustard', 'Ink']];
  var V = { Burgundy: [92, 12, 34], Rose: [255, 172, 198], Tomato: [236, 58, 30], Sky: [196, 222, 255], Cobalt: [26, 46, 208], Peach: [255, 184, 144], Mustard: [242, 184, 8], Forest: [30, 63, 32], Lime: [211, 255, 2], Ink: [5, 9, 17] };
  var i;
  for (i = 0; i < 5; i++) {
    var x = 700 + i * 228, g = P[i][1], k = P[i][2];
    FG.rect(p, 'Ground', x, 420, 212, 360, g, { id: 'sw' });
    FG.rect(p, 'Ground', x, 780, 212, 120, k, { id: 'sw' });
    FG.text(p, 'Type', x + 20, 470, P[i][0], 'EB', 26, k, {});
    FG.text(p, 'Type', x + 20, 700, g, 'EB', 22, k, {});
    FG.area(p, 'Type', x + 20, 712, 180, 60, GL.hex(V[g]) + '\rCMYK ' + GL.cmyk(V[g]), 'M', 13, k, { lead: 18 });
    FG.text(p, 'Type', x + 20, 820, k, 'EB', 20, g, {});
    FG.area(p, 'Type', x + 20, 832, 180, 60, GL.hex(V[k]) + '\rCMYK ' + GL.cmyk(V[k]), 'M', 13, g, { lead: 18 });
  }
  FG.rect(p, 'Ground', 80, 680, 300, 210, 'Coal', { id: 'sw' });
  FG.text(p, 'Type', 100, 740, 'Coal', 'EB', 22, 'Lilac', {});
  FG.area(p, 'Type', 100, 752, 260, 120, '#1E222D\rCMYK ' + GL.cmyk([30, 34, 45]) + '\rOnly on Ink, for tone-on-tone pattern.', 'M', 13, 'Lilac', { lead: 18 });
  FG.label(p, 80, 960, 'CMYK values are converted from the working profile. Approve every pair on a printed proof.', 'Ink');
};

GL.P.G17_Colour_Contrast = function (p) {
  GL.start(p, 'Ink', 'Lime');
  GL.title(p, 80, 250, 'Readable', 'first.', 'White', 130);
  GL.body(p, 80, 410, 560, 300, 'Every pair is checked against WCAG 2.1. Body text needs 4.5:1. Headlines over 24 px bold, or 32 px regular, need 3:1. Below 3:1 a pair is decoration only.', 'White', 22);
  var R = [['Lime', 'Ink', '17.2'], ['White', 'Ink', '19.9'], ['Ink', 'Cream', '18.0'], ['Lime', 'Deep Purple', '16.3'], ['White', 'Forest', '11.8'], ['Ink', 'Mustard', '11.0'], ['Lime', 'Forest', '10.1'], ['Lilac', 'Ink', '9.9'],
    ['White', 'Cobalt', '9.0'], ['White', 'Violet', '7.9'], ['Rose', 'Burgundy', '7.8'], ['Violet', 'Cream', '7.2'], ['Lime', 'Violet', '6.8'], ['Peach', 'Cobalt', '5.3'], ['White', 'Tomato', '4.0'], ['Sky', 'Tomato', '2.9'], ['Violet', 'Ink', '2.5'], ['Lilac', 'White', '2.0'], ['Lime', 'White', '1.2'], ['Lime', 'Cream', '1.0']];
  GL.spots();
  var i;
  for (i = 0; i < R.length; i++) {
    var c = i % 4, rr = Math.floor(i / 4), x = 700 + c * 290, y = 300 + rr * 145, v = parseFloat(R[i][2]);
    FG.rect(p, 'Ground', x, y, 270, 125, R[i][1], { id: 'pair' });
    FG.text(p, 'Type', x + 20, y + 60, 'Aa', 'EB', 44, R[i][0], {});
    FG.text(p, 'Type', x + 250, y + 50, R[i][2] + ':1', 'EB', 22, R[i][0], { align: 'r' });
    FG.text(p, 'Type', x + 20, y + 102, R[i][0] + ' on ' + R[i][1], 'M', 14, R[i][0], {});
    FG.text(p, 'Type', x + 250, y + 102, v >= 4.5 ? 'TEXT' : (v >= 3 ? 'LARGE' : 'NO TEXT'), 'B', 12, R[i][0], { align: 'r', track: 100 });
  }
  GL.body(p, 80, 760, 540, 220, 'Sky on Tomato (the Barter headline) is 2.9:1: keep it to display sizes above 120 px and never use it for a sentence. Lime and Lilac never sit on White or Cream.', 'Lilac', 20);
};

GL.P.G19_Display_Type = function (p) {
  GL.start(p, 'Tomato', 'Sky');
  GL.spots();
  GL.raw(p, 80, 330, 'OBVIOUSLY', 'Obviously-NarwBlck', 230, 'Sky', { lead: 210 });
  GL.raw(p, 80, 560, 'LOUD WHEN IT', 'Obviously-NarwBlck', 150, 'Sky', { lead: 140 });
  GL.raw(p, 80, 700, 'HAS TO BE.', 'Obviously-NarwBlck', 150, 'Sky', { lead: 140 });
  GL.body(p, 1180, 400, 660, 230, 'Obviously, by OH no Type, is the display face. It sets campaign headlines: the booklet, Instagram, packaging inserts. Caps only, one cut per piece, set tight. It never sets a sentence, a button or a price list. Licensed from ohnotype.co.', 'White', 22);
  var C = [['Narrow Black', 'Obviously-NarwBlck'], ['Narrow Semibold', 'Obviously-NarwSemi'], ['Narrow Medium', 'Obviously-NarwMedi'], ['Semibold', 'Obviously-Semi']];
  var i;
  for (i = 0; i < 4; i++) { var y = 680 + i * 90; GL.rule(p, 1180, y - 60, 660, 'Sky', 1); GL.raw(p, 1180, y, 'GET PAID TO POST', C[i][1], 54, 'White', {}); FG.text(p, 'Type', 1840, y, C[i][0], 'M', 15, 'Sky', { align: 'r' }); }
  FG.label(p, 80, 990, 'Plus Jakarta Sans stays the brand face for everything else. Obviously never sits next to the wordmark at the same size.', 'Sky');
};

GL.P.G21_Type_Scale = function (p) {
  GL.start(p, 'Cream', 'Ink');
  GL.title(p, 80, 250, 'Type scale', null, 'Ink', 130);
  var H = ['Style', 'Face', 'Instagram 1080', 'Deck 1920', 'Print A6', 'Use'];
  var X = [80, 420, 900, 1100, 1300, 1480];
  var R = [['Display', 'Obviously Narrow Black, caps', '160-260 px', '220 px', '60-90 pt', 'One per piece'], ['Headline', 'Plus Jakarta ExtraBold', '96 px', '130 px', '28 pt', 'Then an italic line'],
    ['Headline italic', 'Plus Jakarta Medium Italic', '96 px', '130 px', '28 pt', 'Second line only'], ['Subhead', 'Plus Jakarta ExtraBold', '44 px', '30 px', '12 pt', 'Section starts'],
    ['Body', 'Plus Jakarta Medium', '32 px', '22 px', '8.5 pt', '1.45 line height'], ['Label', 'Plus Jakarta Medium, caps, +120', '22 px', '13 px', '6 pt', 'Folios, captions'],
    ['Numbers', 'Obviously Narrow Black', '180 px', '220 px', '48 pt', 'Stats and prices']];
  var i, j;
  for (j = 0; j < H.length; j++) FG.label(p, X[j], 400, H[j], 'Ink');
  for (i = 0; i < R.length; i++) {
    var y = 470 + i * 78;
    GL.rule(p, 80, y - 45, 1760, 'Ink', 1);
    var t = i === 0 || i === 6 ? GL.raw(p, X[0], y, R[i][0].toUpperCase(), 'Obviously-NarwBlck', 40, 'Ink', {}) : FG.text(p, 'Type', X[0], y, R[i][0], i === 2 ? 'MI' : (i >= 4 ? 'M' : 'EB'), i === 5 ? 18 : 32, 'Ink', {});
    for (j = 1; j < 6; j++) FG.text(p, 'Type', X[j], y, R[i][j], 'M', 18, 'Ink', {});
  }
  GL.rule(p, 80, 470 + 7 * 78 - 45, 1760, 'Ink', 1);
};

GL.P.G23_The_Line = function (p) {
  GL.start(p, 'Ink', 'Lime');
  GL.title(p, 80, 250, 'The line.', 'One per piece.', 'White', 130);
  var pts = FG.track([[60, 760], [380, 750], { to: [1180, 720], loops: 3, r: 120, side: 1, env: false }, [1500, 760], [1900, 740]]);
  var items = FG.gradLine(p, 'Mark', pts, 46, { steps: 120 });
  FG.clip(p, 'Mark', items, 0, 0, FG.W, FG.H, { id: 'line' });
  var S = [['Lime', 'D3FF02'], ['Tangerine', 'FF6A13'], ['Pink', 'FF3EA5'], ['Violet', '5100F3'], ['Lilac', 'C9A7F9']];
  var i;
  for (i = 0; i < 5; i++) { FG.rect(p, 'Mark', 1180 + i * 130, 290, 110, 110, S[i][0], { id: 'stop' }); FG.text(p, 'Type', 1180 + i * 130, 430, S[i][0], 'EB', 16, 'White', {}); FG.text(p, 'Type', 1180 + i * 130, 452, '#' + S[i][1], 'M', 13, 'Lilac', {}); }
  var R = ['One stroke, one gradient, five stops, always in this order.', 'It travels and loops. It never crosses or touches the wordmark.', 'Flat on screen. In print and hero images it can be made round with 3D Inflate.', 'Never on the outside of the box. Never as a frame or underline.'];
  for (i = 0; i < 4; i++) { var x = 80 + i * 450; GL.rule(p, x, 920, 410, 'Lime', 1); GL.body(p, x, 940, 410, 110, R[i], 'White', 20); }
};

GL.P.G24_Pattern = function (p) {
  GL.start(p, 'Cream', 'Ink');
  GL.spots();
  GL.title(p, 80, 250, 'One pattern.', 'Turns.', 'Ink', 130);
  GL.body(p, 80, 410, 560, 260, 'Turns is the line wandering: quarter arcs that meet at the middle of each edge, so any arrangement joins up. It is the only pattern on packaging and print. It comes in a handful of brand pairs.', 'Ink', 22);
  var W = [['Lime', 'Ink', 'Lime on Ink'], ['Lilac', 'Violet', 'Lilac on Violet'], ['Lime', 'Forest', 'Lime on Forest'], ['Ink', 'Tomato', 'Ink on Tomato'], ['Coal', 'Ink', 'Coal on Ink']];
  var i;
  for (i = 0; i < 5; i++) { var x = 720 + i * 228; GL.turns(p, x, 300, 212, 420, 53, W[i][0], W[i][1], 3 + i); FG.text(p, 'Type', x, 750, W[i][2], 'EB', 18, 'Ink', {}); }
  var R = ['Two colours, never three.', 'Cells never smaller than 10 mm in print or 60 px on screen.', 'Start the grid on the trim edge, so pieces line up and bands meet at the overlap.', 'Never behind the wordmark. Never on the outside of the box.'];
  for (i = 0; i < 4; i++) { var x2 = 80 + i * 450; GL.rule(p, x2, 860, 410, 'Ink', 1); GL.body(p, x2, 880, 410, 120, R[i], 'Ink', 20); }
};

GL.P.G26_Photography = function (p) {
  GL.start(p, 'Ink', 'Lime');
  GL.title(p, 80, 250, 'Real people,', 'phones in hand.', 'White', 84);
  var L = GL.LINKS, P = [['Joyful Connection HR.png', 0.7, 0.3], ['Man with Smartphone Outdoors HR.png', 0.6, 0.4], ['Dessert in the Sky HR.png', 0.5, 0.3], ['DJ in Tropical Vibes HR.png', 0.6, 0.3], ['Sporty Duo Portrait HR.png', 0.5, 0.4], ['Celebrity Arrival Scene HR.png', 0.5, 0.3]];
  var i;
  for (i = 0; i < 6; i++) { var x = 780 + (i % 3) * 360, y = 140 + Math.floor(i / 3) * 420; GL.img(p, L + P[i][0], x, y, 340, 400, P[i][1], P[i][2]); }
  var R = [['Light', 'Daylight, open sky, saturated colour. Shadows are fine.'], ['Subject', 'One person or one product, cropped close. The phone is in the shot when it can be.'], ['Place', 'Feels like the UAE: sun, palms, city, sand. Never a generic office.'], ['Never', 'Handshakes, laptops on desks, posed group smiles, watermarks.']];
  for (i = 0; i < 4; i++) { var y2 = 420 + i * 150; GL.rule(p, 80, y2 - 40, 620, 'Lime', 1); GL.block(p, 80, y2, 620, R[i][0], R[i][1], 'White', 100); }
};

GL.P.G27_Layout_Grid = function (p) {
  GL.start(p, 'Cream', 'Ink');
  GL.title(p, 80, 250, 'Built on', 'a grid.', 'Ink', 130);
  GL.body(p, 80, 410, 520, 400, 'Pages and slides use 12 columns with an 80 px margin and 24 px gutters. Instagram posts use 6 columns with a 72 px margin. Type hangs from the top margin; the wordmark sits on the bottom margin. Leave one column empty before anything feels finished.', 'Ink', 22);
  // slide grid
  var x0 = 700, y0 = 300, w = 720, h = 405, i, cw = (w - 2 * 30 - 11 * 9) / 12;
  FG.rect(p, 'Ground', x0, y0, w, h, 'White', { id: 'g' });
  for (i = 0; i < 12; i++) FG.rect(p, 'Mark', x0 + 30 + i * (cw + 9), y0 + 30, cw, h - 60, 'Lilac', { id: 'gc' });
  FG.label(p, x0, y0 + h + 40, 'Slide 1920 x 1080 / 12 columns / margin 80 / gutter 24', 'Ink');
  // instagram grid
  var x1 = 1500, y1 = 300, w1 = 324, h1 = 405, cw1 = (w1 - 2 * 22 - 5 * 8) / 6;
  FG.rect(p, 'Ground', x1, y1, w1, h1, 'White', { id: 'g' });
  for (i = 0; i < 6; i++) FG.rect(p, 'Mark', x1 + 22 + i * (cw1 + 8), y1 + 22, cw1, h1 - 44, 'Lilac', { id: 'gc' });
  FG.rect(p, 'Notes', x1 + (w1 - w1 * 0.937) / 2, y1, w1 * 0.937, h1, null, { stroke: 'Violet', strokeW: 2, id: 'safe' });
  FG.label(p, x1, y1 + h1 + 40, 'Post 1080 x 1350 / 6 columns / margin 72', 'Ink');
  FG.label(p, x1, y1 + h1 + 64, 'Violet box: 3:4 profile-grid crop', 'Violet');
  GL.block(p, 700, 860, 520, 'Stories and reels', 'Keep type out of the top 250 px and the bottom 340 px: the app covers them.', 'Ink', 100);
  GL.block(p, 1300, 860, 540, 'The profile grid', 'The grid shows a 3:4 crop of each 4:5 post. Keep the headline and the wordmark inside the middle 1012 px.', 'Ink', 100);
};

GL.P.G28_Motion = function (p) {
  GL.start(p, 'Violet', 'Lime');
  GL.title(p, 80, 250, 'Snap in.', 'Settle.', 'White', 130);
  var R = [['Cut, do not fade', 'Type and colour fields cut on the beat. Fades only for photography.', '0 ms'], ['Ease out', 'Things arrive fast and slow down: 250 ms, ease-out. Never bounce.', '250 ms'], ['The line draws on', 'Left to right in 600 ms, then holds. It is the only thing that moves slowly.', '600 ms'], ['Tags drop', 'Service tags fall in, overshoot their tilt by 4 degrees and settle.', '350 ms'], ['The wordmark holds', 'It never moves, spins, stretches or types itself on. It appears, or it cuts in.', 'still']];
  var i;
  for (i = 0; i < 5; i++) { var y = 420 + i * 118; GL.rule(p, 80, y - 45, 1000, 'Lime', 1); FG.text(p, 'Type', 80, y + 4, R[i][0], 'EB', 30, 'White', {}); GL.body(p, 460, y - 26, 500, 80, R[i][1], 'White', 20); FG.text(p, 'Type', 1080, y + 4, R[i][2], 'MI', 26, 'Lime', { align: 'r' }); }
  // ease-out curve
  var g = FG.org(p), L = FG.lay('Mark'), c = L.pathItems.add(), q = [], n;
  for (n = 0; n <= 40; n++) { var t = n / 40, e = 1 - Math.pow(1 - t, 3); q.push([g[0] + 1260 + t * 560, g[1] - (900 - e * 520)]); }
  c.setEntirePath(q); c.filled = false; c.stroked = true; c.strokeWidth = 10; c.strokeColor = FG.col('Lime'); c.strokeCap = StrokeCap.ROUNDENDCAP; FG.tag(c, p, 'curve');
  FG.line(p, 'Notes', 1260, 900, 1840, 900, 'Lilac', 2); FG.line(p, 'Notes', 1260, 900, 1260, 360, 'Lilac', 2);
  FG.label(p, 1260, 940, 'Ease-out, cubic: fast in, slow to rest', 'Lime');
};

GL.P.G30_Packaging = function (p) {
  GL.start(p, 'Ink', 'Lime');
  GL.title(p, 80, 250, 'The gift kit.', 'Locked.', 'White', 110);
  GL.body(p, 80, 400, 520, 360, 'A black box, opened to colour. The outside carries the wordmark and the tagline, centred, nothing else. Inside: the Turns pattern in the lid, a hello card, the booklet in its band, a note, an intro card and a contact card, carried in the black bag.', 'White', 22);
  GL.body(p, 80, 760, 520, 260, 'Files went to the printer for sampling on 15 October 2026. Do not change a piece without reopening the print file: brands/following/Following_MASTER.', 'Lilac', 18);
  GL.fit(p, GL.R + 'Following_MASTER/All_pieces_overview.jpg', 680, 160, 1160, 860, 'kit');
};

GL.P.G31_Print = function (p) {
  GL.start(p, 'Cream', 'Ink');
  GL.title(p, 80, 250, 'The small book.', 'A6, 56 pages.', 'Ink', 110);
  GL.body(p, 80, 400, 520, 400, 'The booklet tells everything Following does in one sitting. Obviously caps, one cut and one colour per page; each service has its own pair from the extended palette. Full-bleed photography, a section bar on every spread, the line on the first and last page.', 'Ink', 22);
  GL.fit(p, GL.R + 'exports/booklet/overview.jpg', 680, 160, 1160, 860, 'book');
};

GL.P.G32_Digital = function (p) {
  GL.start(p, 'Lime', 'Ink');
  GL.title(p, 80, 250, 'On screen.', null, 'Ink', 130);
  // email signature
  FG.rect(p, 'Ground', 80, 380, 820, 300, 'White', { id: 'sig' });
  FG.text(p, 'Type', 120, 450, 'Sara Al Amiri', 'EB', 26, 'Ink', {});
  FG.text(p, 'Type', 120, 482, 'Partnerships, Following', 'M', 18, 'Ink', {});
  FG.text(p, 'Type', 120, 530, '+971 50 000 0000  /  hello@following.ae  /  following.ae', 'M', 16, 'Ink', {});
  FG.wm(p, 'Mark', 120, 580, 150, 'Ink');
  FG.text(p, 'Type', 300, 612, 'Born in Dubai. Building the future of influencer marketing.', 'MI', 14, 'Ink', {});
  FG.label(p, 80, 720, 'Email signature: plain text plus the wordmark. No banners, no quotes. Sample name.', 'Ink');
  // deck slide
  FG.rect(p, 'Ground', 980, 300, 860, 484, 'Ink', { id: 'deck' });
  FG.wm(p, 'Mark', 1020, 340, 140, 'Lime');
  FG.text(p, 'Type', 1020, 560, 'Campaigns', 'EB', 64, 'White', { lead: 60, fonts: ['EB'] });
  FG.text(p, 'Type', 1020, 624, 'that perform.', 'MI', 64, 'Lime', {});
  FG.label(p, 1020, 740, 'Following / Brand deck / 2026', 'Lilac');
  FG.label(p, 980, 820, 'Presentations: 16:9, Ink or Cream ground, one idea per slide', 'Ink');
  GL.block(p, 80, 800, 820, 'Web and app', 'Ink or Cream surfaces, Lime for the single primary action on a screen, Violet for links. Buttons are fully rounded, like the tags. The line appears once, on the hero.', 'Ink', 140);
};

GL.P.G33_Accessibility = function (p) {
  GL.start(p, 'Ink', 'Lime');
  GL.title(p, 80, 250, 'Made for', 'everyone.', 'White', 130);
  var R = [['Contrast', 'Meet WCAG 2.1 AA: 4.5:1 for text, 3:1 for large type. See page 17.'], ['Size', 'Nothing under 28 px on a 1080 px post, 16 px on web, 6 pt in print.'], ['Colour is not the message', 'Never use colour alone to mean something: add a word or an icon.'],
    ['Alt text', 'Every post and image gets alt text that says what is in it, in one sentence.'], ['Captions', 'Every video with speech has burned-in or closed captions.'], ['People', 'Show the UAE as it is: many nationalities, ages and styles.']];
  var i;
  for (i = 0; i < 6; i++) { var x = 80 + (i % 3) * 600, y = 470 + Math.floor(i / 3) * 280; GL.rule(p, x, y - 40, 560, 'Lime', 1); GL.block(p, x, y, 560, R[i][0], R[i][1], 'White', 160); }
};

GL.P.G34_Files_Contacts = function (p) {
  GL.start(p, 'Cream', 'Ink');
  GL.title(p, 80, 250, 'Files and', 'who to ask.', 'Ink', 130);
  var F = [['Following Guidelines', 'Illustrator cloud document', 'This book. Brand pages, source wordmark.'], ['Following_Print_Master.ai', 'brands/following/final', 'Booklet, cover and the gift kit pieces.'], ['Following_MASTER', 'brands/following', 'Files at the printer. Locked.'],
    ['Following Instagram Templates.ai', 'brands/following/final', 'Every Instagram template and the grid.'], ['Following App Store Screenshots.ai', 'Desktop/Following', 'Store screenshots, stories, banners, logo tile.'], ['Following Packaging.ai', 'Desktop', 'Bag artwork, tape and sticker.'],
    ['Plus Jakarta Sans', 'Google Fonts, SIL Open Font Licence', 'Free to install anywhere.'], ['Obviously', 'OH no Type, licensed', 'Desktop and web licences are separate.']];
  var i;
  for (i = 0; i < F.length; i++) { var y = 420 + i * 70; GL.rule(p, 80, y - 42, 1100, 'Ink', 1); FG.text(p, 'Type', 80, y, F[i][0], 'EB', 24, 'Ink', {}); FG.text(p, 'Type', 520, y, F[i][1], 'M', 18, 'Ink', {}); FG.text(p, 'Type', 860, y, F[i][2], 'M', 18, 'Ink', {}); }
  GL.rule(p, 80, 420 + 8 * 70 - 42, 1100, 'Ink', 1);
  FG.rect(p, 'Ground', 1280, 300, 560, 700, 'Violet', { id: 'ask' });
  FG.label(p, 1320, 360, 'Brand questions and approvals', 'Lime');
  FG.text(p, 'Type', 1320, 450, 'hello@following.ae', 'EB', 36, 'White', {});
  GL.body(p, 1320, 490, 480, 300, 'Send anything new that carries the wordmark before it goes out: a draft, where it will run, and the date. When in doubt, use less: one colour, one line of type, the wordmark whole.', 'White', 20);
  FG.label(p, 1320, 960, 'Following FZC / Dubai, United Arab Emirates', 'Lime');
};
GL.P.G29_Instagram = null; // built after the template file exists

GL.build = function (name) { if (!GL.P[name]) return name + ' has no builder'; GL.P[name](name); return name + ' ok'; };

// Put the artboards in book order (Illustrator can only append, so re-add each one).
GL.order = function () {
  var d = FG.doc, i, rects = [], ab;
  for (i = 0; i < GL.BOOK.length; i++) { try { ab = d.artboards.getByName(GL.BOOK[i][0]); rects.push([GL.BOOK[i][0], ab.artboardRect]); } catch (e) {} }
  for (i = 0; i < rects.length; i++) { d.artboards.getByName(rects[i][0]).name = 'OLD_' + rects[i][0]; var n = d.artboards.add(rects[i][1]); n.name = rects[i][0]; }
  for (i = d.artboards.length - 1; i >= 0; i--) if (d.artboards[i].name.indexOf('OLD_') === 0) d.artboards[i].remove();
  var out = []; for (i = 0; i < d.artboards.length; i++) out.push(d.artboards[i].name); return out.join(' ');
};
