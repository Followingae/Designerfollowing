// Following: "Three ways to earn" — 9:16 brand film. Builds the whole project from scratch.
// Run: AfterFX.exe -r film.jsx   (writes a log next to this file)
var ROOT = "C:/Users/user/Desktop/DesignerFollowing/brands/following/";
var LOG = new File(ROOT + "film/scripts/build_log.txt");
var LOGS = [];
function log(s) { LOGS.push(s); }
function flush() { LOG.open("w"); LOG.write(LOGS.join("\n")); LOG.close(); }

var W = 1080, H = 1920, FPS = 30, DUR = 24;
var C = {
  ink: [5 / 255, 9 / 255, 17 / 255], white: [1, 1, 1], paper: [1, 1, 1],
  lime: [211 / 255, 1, 2 / 255], lilac: [201 / 255, 167 / 255, 249 / 255], violet: [81 / 255, 0, 243 / 255],
  orange: [1, 106 / 255, 19 / 255], pink: [1, 62 / 255, 165 / 255], grey: [0.86, 0.87, 0.89]
};
var F = { disp: "Obviously-CompBlck", ui: "PlusJakartaSans-Bold", uiX: "PlusJakartaSans-ExtraBold", uiM: "PlusJakartaSans-Medium" };

// ---------- easing ----------
function dims(p) {
  var t = p.propertyValueType;
  if (t == PropertyValueType.TwoD_SPATIAL || t == PropertyValueType.ThreeD_SPATIAL) return 1;
  if (t == PropertyValueType.TwoD) return 2;
  if (t == PropertyValueType.ThreeD) return 3;
  if (t == PropertyValueType.COLOR) return 1;
  return 1;
}
// keys: [[t, v, outInf, inInf], ...]; default curve = quick start, long settle (expo-out feel)
function K(p, keys, oi, ii) {
  if (!p) throw new Error("null prop: " + $.stack);
  if (!p.canVaryOverTime) throw new Error("static prop " + p.name + ": " + $.stack);
  oi = oi || 12; ii = ii || 88;
  for (var i = 0; i < keys.length; i++) p.setValueAtTime(keys[i][0], keys[i][1]);
  var n = dims(p);
  for (var i = 0; i < keys.length; i++) {
    var idx = p.nearestKeyIndex(keys[i][0]);
    var o = keys[i][2] != null ? keys[i][2] : oi, ii2 = keys[i][3] != null ? keys[i][3] : ii;
    var ein = [], eout = [];
    for (var d = 0; d < n; d++) { ein.push(new KeyframeEase(0, Math.max(0.1, ii2))); eout.push(new KeyframeEase(0, Math.max(0.1, o))); }
    p.setInterpolationTypeAtKey(idx, KeyframeInterpolationType.BEZIER, KeyframeInterpolationType.BEZIER);
    try { p.setTemporalEaseAtKey(idx, ein, eout); } catch (e) { log("ease fail " + p.name + " " + e); }
    if (p.isSpatial) { try { p.setSpatialTangentsAtKey(idx, [0, 0, 0].slice(0, p.value.length), [0, 0, 0].slice(0, p.value.length)); } catch (e) { } }
  }
}
// exit curve: slow start, fast out
function KX(p, keys) { K(p, keys, 70, 20); }

// ---------- builders ----------
var proj, comp;
function tr(l) { return l.property("ADBE Transform Group"); }
function pos(l) { return tr(l).property("ADBE Position"); }
function opa(l) { return tr(l).property("ADBE Opacity"); }
function scl(l) { return tr(l).property("ADBE Scale"); }

function solid(cp, col, name, w, h) { var l = cp.layers.addSolid(col, name, w || W, h || H, 1, DUR); return l; }

// rounded rect shape layer. Returns {layer, size, round, fill}
function rect(cp, name, w, h, r, col, x, y, stroke) {
  var l = cp.layers.addShape(); l.name = name;
  var g = l.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group"); g.name = "Box";
  g.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Rect");
  if (stroke) {
    l.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
  } else {
    l.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
  }
  var v = l.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group");
  var rc = v.property(1);
  rc.property("ADBE Vector Rect Size").setValue([w, h]);
  rc.property("ADBE Vector Rect Roundness").setValue(r);
  if (stroke) {
    v.property(2).property("ADBE Vector Stroke Color").setValue(col);
    v.property(2).property("ADBE Vector Stroke Width").setValue(stroke);
  } else v.property(2).property("ADBE Vector Fill Color").setValue(col);
  pos(l).setValue([x, y]);
  return l;
}
function rSize(l) { return l.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property(1).property("ADBE Vector Rect Size"); }
function rRound(l) { return l.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property(1).property("ADBE Vector Rect Roundness"); }
function rFill(l) { return l.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property(2).property("ADBE Vector Fill Color"); }

// text layer; anchor moved to the centre of its ink box (or left-middle when align == "L")
function text(cp, name, str, font, size, col, x, y, align, track) {
  var l = cp.layers.addText(str); l.name = name;
  var sp = l.property("ADBE Text Properties").property("ADBE Text Document");
  var d = sp.value;
  d.resetCharStyle(); d.resetParagraphStyle();
  d.font = font; d.fontSize = size; d.applyFill = true; d.fillColor = col; d.applyStroke = false;
  d.tracking = track || 0;
  d.justification = ParagraphJustification.LEFT_JUSTIFY;
  sp.setValue(d);
  if (sp.value.font != font) log("FONT MISS " + name + " got " + sp.value.font);
  var b = l.sourceRectAtTime(0, false);
  var ax = align == "L" ? b.left : b.left + b.width / 2;
  tr(l).property("ADBE Anchor Point").setValue([ax, b.top + b.height / 2]);
  pos(l).setValue([x, y]);
  l.motionBlur = true;
  return l;
}
function tw(l) { return l.sourceRectAtTime(0, false).width; }
function th(l) { return l.sourceRectAtTime(0, false).height; }

function fx(l, match) { return l.property("ADBE Effect Parade").addProperty(match); }
function blurFx(l) {
  var e = fx(l, "ADBE Gaussian Blur 2");
  try { e.property(3).setValue(1); } catch (x) { }
  return l.property("ADBE Effect Parade").property(l.property("ADBE Effect Parade").numProperties).property(1);
}
function shadow(l, op, dist, soft) {
  fx(l, "ADBE Drop Shadow");
  var e = l.property("ADBE Effect Parade").property(l.property("ADBE Effect Parade").numProperties);
  e.property(1).setValue(C.ink); e.property(2).setValue(op); e.property(3).setValue(180); e.property(4).setValue(dist); e.property(5).setValue(soft);
}

// per-character blur rise: characters arrive left to right between t0 and t1
function charIn(l, t0, t1, rise, blur) {
  var anims = l.property("ADBE Text Properties").property("ADBE Text Animators");
  var a = anims.addProperty("ADBE Text Animator"); a.name = "In";
  a = anims.property(anims.numProperties);
  a.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
  a = anims.property(anims.numProperties);
  a.property("ADBE Text Animator Properties").addProperty("ADBE Text Opacity");
  a = anims.property(anims.numProperties);
  a.property("ADBE Text Animator Properties").addProperty("ADBE Text Blur");
  a = anims.property(anims.numProperties);
  a.property("ADBE Text Animator Properties").addProperty("ADBE Text Position 3D");
  a = anims.property(anims.numProperties);
  var ap = a.property("ADBE Text Animator Properties");
  ap.property("ADBE Text Opacity").setValue(0);
  ap.property("ADBE Text Blur").setValue([0, blur || 30]);
  ap.property("ADBE Text Position 3D").setValue([0, rise || 90, 0]);
  var sel = a.property("ADBE Text Selectors").property(1);
  // smooth ramp across characters
  var adv = sel.property("ADBE Text Range Advanced");
  try { adv.property("ADBE Text Range Shape").setValue(2); } catch (e) { log("shape " + e); }
  try { adv.property("ADBE Text Levels Max Ease").setValue(60); adv.property("ADBE Text Levels Min Ease").setValue(60); } catch (e) { }
  K(sel.property("ADBE Text Percent Offset"), [[t0, -12], [t1, 100]], 30, 75);
  sel.property("ADBE Text Percent Start").setValue(0);
  // ramp shape needs a reversed range: affected (hidden) is to the right of the sweep

}
// whole-layer exit: blur up and fade
function outUp(l, t, d, dy) {
  d = d || 0.45; dy = dy == null ? -120 : dy;
  var p = pos(l).value;
  KX(pos(l), [[t, p], [t + d, [p[0], p[1] + dy]]]);
  KX(opa(l), [[t, 100], [t + d, 0]]);
  var b = blurFx(l); KX(b, [[t, 0], [t + d, 40]]);
}
function fadeIn(l, t, d, dy) {
  d = d || 0.5; dy = dy == null ? 50 : dy;
  var p = pos(l).value;
  K(pos(l), [[t, [p[0], p[1] + dy]], [t + d, p]]);
  K(opa(l), [[t, 0], [t + d * 0.6, 100]]);
}
function trim(l, a, b) { l.inPoint = a; if (b != null) l.outPoint = b; }

// photo precomp: image scaled to cover W x H, slow push, optional bottom scrim
function photoComp(name, file, push0, push1, t0, t1, scrim, offY) {
  var it = proj.importFile(new ImportOptions(new File(file)));
  it.parentFolder = fAssets;
  var pc = proj.items.addComp(name, W, H, 1, DUR, FPS); pc.parentFolder = fPre;
  var l = pc.layers.add(it);
  var s = Math.max(W / it.width, H / it.height) * 100;
  pos(l).setValue([W / 2, H / 2 + (offY || 0)]);
  K(scl(l), [[t0, [s * push0, s * push0]], [t1, [s * push1, s * push1]]], 30, 60);
  l.motionBlur = true;
  // scrims: [[top, bottom, opacity], ...] soft-edged ink bands for type legibility
  if (scrim) for (var i = 0; i < scrim.length; i++) scrimBand(pc, scrim[i][0], scrim[i][1], scrim[i][2]);
  return pc;
}
function scrimBand(pc, y0, y1, op) {
  var g = pc.layers.addSolid(C.ink, "Scrim " + y0 + "-" + y1, W, H, 1, DUR);
  var m = g.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
  var s = new Shape(); s.vertices = [[-200, y0], [W + 200, y0], [W + 200, y1], [-200, y1]]; s.closed = true;
  g.property("ADBE Mask Parade").property(1).property("ADBE Mask Shape").setValue(s);
  g.property("ADBE Mask Parade").property(1).property("ADBE Mask Feather").setValue([0, 420]);
  opa(g).setValue(op);
}
// text fitted to a width: same call as text(), size chosen so the ink box is `target` wide
function textFit(cp, name, str, font, target, col, x, y, align, maxSize) {
  var l = text(cp, name, str, font, 100, col, x, y, align);
  var s = 100 * target / tw(l); if (maxSize) s = Math.min(s, maxSize);
  l.remove();
  return text(cp, name, str, font, s, col, x, y, align);
}
function fitSize(str, font, target) {
  var l = text(comp, "tmp", str, font, 100, C.ink, 0, 0, "L"); var s = 100 * target / tw(l); l.remove(); return s;
}

try {
  app.beginUndoGroup("Following film");
  try { app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES); } catch (e) { }
  proj = app.newProject();
  if (!proj) proj = app.project;
  fAssets = proj.items.addFolder("01_Assets");
  fPre = proj.items.addFolder("02_Precomps");
  comp = proj.items.addComp("FOLLOWING_Three_Ways_9x16", W, H, 1, DUR, FPS);
  comp.motionBlur = true; comp.shutterAngle = 180; comp.shutterPhase = -90;
  comp.bgColor = C.white;

  // markers
  var mk = [[0, "S1 Hook: Post / Get paid"], [2.4, "S2 Three ways to earn"], [4.4, "S3 Paid collab"], [8.0, "S4 Barter"], [11.2, "S5 Cashback"], [14.8, "S6 Wallet"], [17.8, "S7 The app"], [19.8, "S8 Wordmark"]];
  for (var i = 0; i < mk.length; i++) comp.markerProperty.setValueAtTime(mk[i][0], new MarkerValue(mk[i][1]));

  // ---------- photos (precomps) ----------
  var L = ROOT + "final/assets/links/", A = ROOT + "final/assets/app_screens/";
  var pcPaid = photoComp("PH_Paid_DJ", L + "DJ in Tropical Vibes HR.png", 1.14, 1.02, 4.4, 8.0, [[1150, 2300, 72], [-400, 330, 35]]);
  var pcBart = photoComp("PH_Barter_Perfume", L + "Perfume and Roses Display.png", 1.12, 1.02, 8.0, 11.2, [[1150, 2300, 72], [-400, 330, 35]]);
  var pcCash = photoComp("PH_Cashback_Dessert", L + "Dessert in the Sky HR.png", 1.12, 1.03, 11.2, 14.8, [[-400, 1000, 62]]);
  var pcApp = photoComp("PH_App_Wallet", A + "creator_07_wallet.png", 1.0, 1.0, 17.8, 19.8, 0);

  // ---------- background ----------
  var bg = solid(comp, C.paper, "BG Paper");

  // ================= S1: POST / GET / PAID =================
  var X0 = 64;
  var S1F = "Obviously-ExtdBlck";
  var s1 = Math.min(fitSize("POST", S1F, W - 2 * X0), fitSize("PAID", S1F, W - 2 * X0 - 68));
  var tPost = text(comp, "S1 POST", "POST", S1F, s1, C.ink, X0, 0, "L");
  var tGet = text(comp, "S1 GET", "GET", S1F, s1, C.ink, X0, 0, "L");
  var tPaid = text(comp, "S1 PAID", "PAID", S1F, s1, C.ink, X0 + 34, 0, "L");
  var hT = th(tPost), gap = 42;
  var y1 = 960 - (hT * 1.5 + gap), y2 = 960, y3 = 960 + hT + gap + 14;
  pos(tPost).setValue([X0, y1 - 20]); pos(tGet).setValue([X0, y2 - 20]); pos(tPaid).setValue([X0 + 34, y3]);
  // lime highlight behind PAID — this same shape becomes the "Paid collabs" pill and then the first card
  var pw = tw(tPaid) + 68, ph = hT + 64;
  var P1 = rect(comp, "P1 Lime (highlight > pill > card)", 0, ph, 18, C.lime, X0, y3);
  P1.moveAfter(tPaid);

  charIn(tPost, 0.10, 0.75, 110, 40);
  charIn(tGet, 0.55, 1.10, 110, 40);
  // highlight wipes left to right, PAID lands on it
  K(rSize(P1), [[1.00, [0, ph]], [1.45, [pw, ph]]], 10, 85);
  K(pos(P1), [[1.00, [X0, y3]], [1.45, [X0 + pw / 2, y3]]], 10, 85);
  charIn(tPaid, 1.10, 1.55, 60, 20);
  K(scl(tPaid), [[1.45, [96, 96]], [1.75, [100, 100]]], 10, 80);
  // gentle drift of the type block during the hold
  outUp(tPost, 2.22, 0.36, -140); outUp(tGet, 2.28, 0.36, -140); outUp(tPaid, 2.30, 0.28, -40);

  // ================= S2: three pills =================
  var hs = fitSize("THREE WAYS", F.disp, W - 2 * X0);
  var hl1 = text(comp, "S2 Head THREE WAYS", "THREE WAYS", F.disp, hs, C.ink, X0, 0, "L");
  var hH = th(hl1), hy1 = 150 + hH / 2, hy2 = hy1 + hH + 34;
  pos(hl1).setValue([X0, hy1]);
  var hl2 = text(comp, "S2 Head TO EARN", "TO EARN", F.disp, hs, C.ink, X0, hy2, "L");
  charIn(hl1, 2.82, 3.3, 80, 30); charIn(hl2, 2.95, 3.43, 80, 30);
  var PH = 132, PX = X0, p0 = hy2 + hH / 2 + 110 + PH / 2, py = [p0, p0 + PH + 34, p0 + 2 * (PH + 34)];
  function pill(name, label, col, tcol, y) {
    var t = text(comp, name + " label", label, F.ui, 54, tcol, 0, y, "C");
    var w = tw(t) + 104;
    pos(t).setValue([PX + w / 2, y]);
    return { t: t, w: w };
  }

  var l1 = pill("P1", "Paid collabs", C.lime, C.ink, py[0]);
  var l2 = pill("P2", "Barter", C.lilac, C.ink, py[1]);
  var l3 = pill("P3", "Cashback", C.ink, C.white, py[2]);
  var P2 = rect(comp, "P2 Lilac (pill > card)", l2.w, PH, 66, C.lilac, PX + l2.w / 2, py[1]);
  var P3 = rect(comp, "P3 Ink (pill > full bleed)", l3.w, PH, 66, C.ink, PX + l3.w / 2, py[2]);
  P2.moveBefore(bg); P3.moveBefore(bg); P1.moveBefore(P2);
  // P1 highlight morphs into the first pill
  K(rSize(P1), [[2.40, [pw, ph]], [3.00, [l1.w, PH]]], 25, 85);
  K(pos(P1), [[2.40, [X0 + pw / 2, y3]], [3.00, [PX + l1.w / 2, py[0]]]], 25, 85);
  K(rRound(P1), [[2.40, 18], [3.00, 66]], 25, 85);
  fadeIn(l1.t, 2.85, 0.4, 24);
  // the other two pills drop in with a small settle
  function popIn(sh, t, tt) {
    var p = pos(sh).value;
    K(scl(sh), [[t, [0, 0]], [t + 0.32, [104, 104]], [t + 0.55, [100, 100]]], 15, 70);
    var pt = pos(tt).value; tr(tt).property("ADBE Anchor Point"); // label rides on top
    K(opa(tt), [[t + 0.15, 0], [t + 0.40, 100]]);
    K(scl(tt), [[t + 0.15, [80, 80]], [t + 0.45, [100, 100]]]);
    tr(sh).property("ADBE Anchor Point").setValue([0, 0]);
  }
  // scale from the pill's left edge so they grow out of the margin
  function leftAnchor(sh, w) { var p = pos(sh).value; tr(sh).property("ADBE Anchor Point").setValue([-w / 2, 0]); pos(sh).setValue([p[0] - w / 2, p[1]]); }
  leftAnchor(P2, l2.w); leftAnchor(P3, l3.w);
  K(scl(P2), [[3.00, [0, 0]], [3.32, [104, 104]], [3.55, [100, 100]]], 15, 70);
  K(scl(P3), [[3.12, [0, 0]], [3.44, [104, 104]], [3.67, [100, 100]]], 15, 70);
  fadeIn(l2.t, 3.15, 0.4, 20); fadeIn(l3.t, 3.27, 0.4, 20);

  // ================= card expand / collapse grammar =================
  // after each collapse the pill reports what was earned
  function earned(name, str, tcol, y) { var t = text(comp, name, str, F.ui, 54, tcol, 0, y, "C"); return t; }
  var e1 = earned("P1 earned", "Paid collab  +AED 1,800", C.ink, py[0]);
  var e2 = earned("P2 earned", "Barter  AED 950 product", C.ink, py[1]);
  var e3 = earned("P3 earned", "Cashback  +AED 63.75", C.white, py[2]);
  var ew1 = tw(e1) + 104, ew2 = tw(e2) + 104, ew3 = tw(e3) + 104;
  pos(e1).setValue([PX + ew1 / 2, py[0]]); pos(e2).setValue([PX + ew2 / 2, py[1]]); pos(e3).setValue([PX + ew3 / 2, py[2]]);
  opa(e1).setValue(0); opa(e2).setValue(0); opa(e3).setValue(0);

  // the rest of the list steps back while a card is open
  var listLayers = [hl1, hl2, P1, P2, P3, l1.t, l2.t, l3.t];
  function dim(except, t0, t1) {
    for (var i = 0; i < listLayers.length; i++) {
      var l = listLayers[i]; if (except.join("|").indexOf(l.name) >= 0) continue;
      var o = opa(l), v0 = o.valueAtTime(t0 - 0.01, false);
      if (v0 < 1) continue;
      K(o, [[t0, v0], [t0 + 0.25, 0], [t1, 0], [t1 + 0.35, v0]]);
    }
  }

  // ---- S3 paid collab: P1 expands into a card ----
  var CW = 984, CH = 1668, CY = 960;
  var a0 = 4.4, a1 = 5.0, a2 = 7.45, a3 = 8.0;
  K(rSize(P1), [[a0, [l1.w, PH]], [a1, [CW, CH]], [a2, [CW, CH]], [a3, [ew1, PH]]], 30, 85);
  K(pos(P1), [[a0, [PX + l1.w / 2, py[0]]], [a1, [W / 2, CY]], [a2, [W / 2, CY]], [a3, [PX + ew1 / 2, py[0]]]], 30, 85);
  K(rRound(P1), [[a0, 66], [a1, 56], [a2, 56], [a3, 66]], 30, 85);
  KX(opa(l1.t), [[a0, 100], [a0 + 0.15, 0]]);
  K(opa(e1), [[a3 - 0.1, 0], [a3 + 0.25, 100]]);
  dim([P1.name, l1.t.name], a0, a3 - 0.2);
  shadow(P1, 0, 30, 90); var sh1 = P1.property("ADBE Effect Parade").property(1).property(2);
  K(sh1, [[a0, 0], [a1, 60], [a2, 60], [a3, 0]]);

  var ph1 = comp.layers.add(pcPaid); ph1.name = "S3 Photo (matte P1)"; ph1.motionBlur = true;
  ph1.setTrackMatte(P1, TrackMatteType.ALPHA); P1.enabled = true;
  K(opa(ph1), [[a0 + 0.05, 0], [a0 + 0.30, 100], [a2 + 0.25, 100], [a3 - 0.05, 0]]);
  // card content
  var c1tag = rect(comp, "S3 Tag chip", 0, 78, 40, C.lime, 0, 0);
  var c1tagT = text(comp, "S3 Tag", "Paid collab", F.ui, 38, C.ink, 0, 0, "C");
  var tgw = tw(c1tagT) + 60; rSize(c1tag).setValue([tgw, 78]);
  pos(c1tag).setValue([96 + tgw / 2, 210]); pos(c1tagT).setValue([96 + tgw / 2, 210]);
  var c1t = text(comp, "S3 Title", "Reel + 2 stories", F.uiX, 80, C.white, 96, 1470, "L", -10);
  var c1s = text(comp, "S3 Sub", "Beach club, Dubai", F.uiM, 42, C.white, 96, 1380, "L");
  var c1aBox = rect(comp, "S3 Amount box", 520, 176, 30, C.lime, 96 + 260, 1650);
  var c1a = text(comp, "S3 Amount (counter)", "AED 1,800", F.disp, 150, C.ink, 128, 1652, "L");
  var sl = fx(c1a, "ADBE Slider Control"); sl.name = "Count";
  var slp = c1a.property("ADBE Effect Parade").property("Count").property(1);
  K(slp, [[5.35, 0], [6.35, 1800]], 20, 90);
  c1a.property("ADBE Text Properties").property("ADBE Text Document").expression =
    'var v=effect("Count")(1).value;"AED "+Math.round(v).toFixed(0).replace(/\\B(?=(\\d{3})+(?!\\d))/g,",");';
  rSize(c1aBox).setValue([tw(c1a) + 64, 176]); pos(c1aBox).setValue([96 + (tw(c1a) + 64) / 2, 1650]);
  pos(c1a).setValue([96 + 32, 1652]);
  fadeIn(c1tag, 5.0, 0.4, 20); fadeIn(c1tagT, 5.0, 0.4, 20);
  fadeIn(c1s, 5.05, 0.5, 30); fadeIn(c1t, 5.15, 0.5, 40);
  var b1 = pos(c1aBox).value;
  tr(c1aBox).property("ADBE Anchor Point").setValue([-(tw(c1a) + 64) / 2, 0]); pos(c1aBox).setValue([96, b1[1]]);
  K(scl(c1aBox), [[5.25, [0, 100]], [5.6, [100, 100]]], 10, 85);
  K(opa(c1a), [[5.35, 0], [5.5, 100]]);
  K(scl(c1a), [[6.30, [100, 100]], [6.42, [107, 107]], [6.65, [100, 100]]], 20, 70);
  var s3c = [c1tag, c1tagT, c1t, c1s, c1aBox, c1a];
  for (var i = 0; i < s3c.length; i++) { KX(opa(s3c[i]), [[a2 - 0.2, 100], [a2 + 0.05, 0]]); s3c[i].motionBlur = true; }

  // ---- S4 barter: P2 expands ----
  var b0 = 8.0, bA = 8.6, bB = 10.65, bC = 11.2;
  var p2x = PX + l2.w / 2;
  tr(P2).property("ADBE Anchor Point").setValue([0, 0]); pos(P2).setValue([p2x, py[1]]);
  K(rSize(P2), [[b0, [l2.w, PH]], [bA, [CW, CH]], [bB, [CW, CH]], [bC, [ew2, PH]]], 30, 85);
  K(pos(P2), [[b0, [p2x, py[1]]], [bA, [W / 2, CY]], [bB, [W / 2, CY]], [bC, [PX + ew2 / 2, py[1]]]], 30, 85);
  K(rRound(P2), [[b0, 66], [bA, 56], [bB, 56], [bC, 66]], 30, 85);
  P2.moveBefore(P1); // card sits over the list
  // re-key P2 scale: popped in at 3.0, keep 100 later (already keyed)
  KX(opa(l2.t), [[b0, 100], [b0 + 0.15, 0]]);
  K(opa(e2), [[bC - 0.1, 0], [bC + 0.25, 100]]);
  dim([P2.name, l2.t.name, P1.name], b0, bC - 0.2);
  K(opa(e1), [[b0, 100], [b0 + 0.25, 0], [bC - 0.2, 0], [bC + 0.15, 100]]);
  shadow(P2, 0, 30, 90); K(P2.property("ADBE Effect Parade").property(1).property(2), [[b0, 0], [bA, 60], [bB, 60], [bC, 0]]);
  var ph2 = comp.layers.add(pcBart); ph2.name = "S4 Photo (matte P2)"; ph2.motionBlur = true;
  ph2.setTrackMatte(P2, TrackMatteType.ALPHA);
  K(opa(ph2), [[b0 + 0.05, 0], [b0 + 0.3, 100], [bB + 0.25, 100], [bC - 0.05, 0]]);
  // light sweep across the product (Add mode, matted to the card)
  var sw = rect(comp, "S4 Light sweep", 260, 2600, 0, [1, 0.96, 0.9], -300, 960);
  tr(sw).property("ADBE Rotate Z").setValue(24); sw.blendingMode = BlendingMode.ADD;
  var swb = blurFx(sw); swb.setValue(90);
  K(pos(sw), [[8.9, [-400, 960]], [9.9, [1500, 960]]], 40, 60);
  opa(sw).setValue(38);
  sw.setTrackMatte(P2, TrackMatteType.ALPHA);
  var c2tag = rect(comp, "S4 Tag chip", 0, 78, 40, C.lilac, 0, 0);
  var c2tagT = text(comp, "S4 Tag", "Barter", F.ui, 38, C.ink, 0, 0, "C");
  var tg2 = tw(c2tagT) + 60; rSize(c2tag).setValue([tg2, 78]); pos(c2tag).setValue([96 + tg2 / 2, 210]); pos(c2tagT).setValue([96 + tg2 / 2, 210]);
  var c2s = text(comp, "S4 Sub", "Post it, keep it", F.uiM, 42, C.white, 96, 1380, "L");
  var c2t = text(comp, "S4 Title", "Unbox the collection", F.uiX, 80, C.white, 96, 1470, "L", -10);
  var c2a = text(comp, "S4 Value", "AED 950 value", F.disp, 150, C.ink, 128, 1652, "L");
  var c2aBox = rect(comp, "S4 Value box", tw(c2a) + 64, 176, 30, C.lilac, 96, 1650);
  tr(c2aBox).property("ADBE Anchor Point").setValue([-(tw(c2a) + 64) / 2, 0]);
  c2aBox.moveAfter(c2a);
  fadeIn(c2tag, bA, 0.4, 20); fadeIn(c2tagT, bA, 0.4, 20); fadeIn(c2s, bA + 0.05, 0.5, 30); fadeIn(c2t, bA + 0.15, 0.5, 40);
  K(scl(c2aBox), [[bA + 0.25, [0, 100]], [bA + 0.6, [100, 100]]], 10, 85);
  fadeIn(c2a, bA + 0.4, 0.4, 0);
  var s4c = [c2tag, c2tagT, c2s, c2t, c2a, c2aBox];
  for (var i = 0; i < s4c.length; i++) { KX(opa(s4c[i]), [[bB - 0.2, 100], [bB + 0.05, 0]]); s4c[i].motionBlur = true; }

  // ---- S5 cashback: P3 opens full bleed ----
  var k0 = 11.2, kA = 11.8, kB = 14.25, kC = 14.8;
  var p3x = PX + l3.w / 2;
  tr(P3).property("ADBE Anchor Point").setValue([0, 0]); pos(P3).setValue([p3x, py[2]]);
  K(rSize(P3), [[k0, [l3.w, PH]], [kA, [W + 4, H + 4]], [kB, [W + 4, H + 4]], [kC, [ew3, PH]]], 30, 85);
  K(pos(P3), [[k0, [p3x, py[2]]], [kA, [W / 2, H / 2]], [kB, [W / 2, H / 2]], [kC, [PX + ew3 / 2, py[2]]]], 30, 85);
  K(rRound(P3), [[k0, 66], [kA, 0], [kB, 0], [kC, 66]], 30, 85);
  P3.moveBefore(sw); l3.t.moveBefore(P3); e3.moveBefore(P3);
  KX(opa(l3.t), [[k0, 100], [k0 + 0.15, 0]]);
  K(opa(e3), [[kC - 0.1, 0], [kC + 0.25, 100]]);
  dim([P3.name, l3.t.name, P1.name, P2.name], k0, kC - 0.2);
  K(opa(e2), [[k0, 100], [k0 + 0.25, 0], [kC - 0.2, 0], [kC + 0.15, 100]]);
  var ph3 = comp.layers.add(pcCash); ph3.name = "S5 Photo (matte P3)"; ph3.motionBlur = true;
  ph3.setTrackMatte(P3, TrackMatteType.ALPHA);
  K(opa(ph3), [[k0 + 0.05, 0], [k0 + 0.3, 100], [kB + 0.25, 100], [kC - 0.05, 0]]);
  var big = text(comp, "S5 20%", "20%", F.disp, 560, C.white, X0, 520, "L");
  var bigS = text(comp, "S5 Sub", "back on every receipt", F.uiX, 64, C.white, X0 + 12, 860, "L", -10);
  charIn(big, kA - 0.1, kA + 0.35, 120, 40); fadeIn(bigS, kA + 0.25, 0.5, 30);
  // native receipt
  var RX = 540, RY = 1400;
  var rc = rect(comp, "S5 Receipt", 720, 600, 40, C.white, RX, RY);
  shadow(rc, 70, 24, 80);
  var rH = text(comp, "S5 Receipt head", "Receipt", F.uiX, 44, C.ink, RX - 300, RY - 210, "L");
  var rL = [];
  var rows = [["Dinner for two", "AED 286.00"], ["Dessert", "AED 32.75"]];
  for (var i = 0; i < rows.length; i++) {
    rL.push(text(comp, "S5 Row " + (i + 1), rows[i][0], F.uiM, 40, [0.35, 0.37, 0.42], RX - 300, RY - 110 + i * 76, "L"));
    var v = text(comp, "S5 Row " + (i + 1) + " amt", rows[i][1], F.uiM, 40, [0.35, 0.37, 0.42], 0, RY - 110 + i * 76, "L");
    pos(v).setValue([RX + 300 - tw(v), RY - 110 + i * 76]); rL.push(v);
  }
  var rule = rect(comp, "S5 Receipt rule", 600, 3, 0, C.grey, RX, RY + 50);
  var rT = text(comp, "S5 Total", "Total", F.uiX, 44, C.ink, RX - 300, RY + 140, "L");
  var rTv = text(comp, "S5 Total amt", "AED 318.75", F.uiX, 44, C.ink, 0, RY + 140, "L");
  pos(rTv).setValue([RX + 300 - tw(rTv), RY + 140]);
  var rcGroup = [rc, rH, rule, rT, rTv].concat(rL);
  var rNull = comp.layers.addNull(DUR); rNull.name = "S5 Receipt rig"; pos(rNull).setValue([RX, RY]);
  for (var i = 0; i < rcGroup.length; i++) { rcGroup[i].parent = rNull; rcGroup[i].motionBlur = true; }
  K(pos(rNull), [[12.0, [RX, RY + 900]], [12.55, [RX, RY]]], 12, 88);
  tr(rNull).property("ADBE Rotate Z").setValue(0);
  K(tr(rNull).property("ADBE Rotate Z"), [[12.0, 6], [12.55, -1.5], [12.9, 0]], 15, 70);
  // the scan: a lime bar with stacked glow travels down the receipt
  var scan = rect(comp, "S5 Scan bar", 760, 10, 5, C.lime, RX, RY - 300);
  var scanG = rect(comp, "S5 Scan glow", 760, 70, 35, C.lime, RX, RY - 300);
  var gb = blurFx(scanG); gb.setValue(40); scanG.blendingMode = BlendingMode.SCREEN; opa(scanG).setValue(80);
  scan.parent = rNull; scanG.parent = rNull;
  K(pos(scan), [[12.85, [0, -300]], [13.55, [0, 300]]], 40, 60); K(pos(scanG), [[12.85, [0, -300]], [13.55, [0, 300]]], 40, 60);
  K(opa(scan), [[12.8, 0], [12.9, 100], [13.45, 100], [13.6, 0]]);
  K(opa(scanG), [[12.8, 0], [12.9, 80], [13.45, 80], [13.6, 0]]);
  // cashback lands
  var cbBox = rect(comp, "S5 Cashback chip", 10, 120, 60, C.lime, 0, 0);
  var cbT = text(comp, "S5 Cashback amt", "+AED 63.75", F.uiX, 56, C.ink, 0, 0, "C");
  var cbw = tw(cbT) + 84; rSize(cbBox).setValue([cbw, 120]);
  pos(cbBox).setValue([RX + 360 - cbw / 2 + 20, RY - 300]); pos(cbT).setValue(pos(cbBox).value);
  tr(cbBox).property("ADBE Rotate Z").setValue(-5); tr(cbT).property("ADBE Rotate Z").setValue(-5);
  K(scl(cbBox), [[13.55, [0, 0]], [13.8, [112, 112]], [14.0, [100, 100]]], 20, 70);
  K(scl(cbT), [[13.6, [0, 0]], [13.85, [112, 112]], [14.05, [100, 100]]], 20, 70);
  shadow(cbBox, 60, 14, 40);
  var s5c = [big, bigS, rNull, cbBox, cbT].concat(rcGroup);
  for (var i = 0; i < s5c.length; i++) { if (s5c[i] == rNull) continue; KX(opa(s5c[i]), [[kB - 0.2, opa(s5c[i]).valueAtTime(kB - 0.21, false)], [kB + 0.05, 0]]); }
  KX(opa(scan), [[kB - 0.2, 0], [kB, 0]]);
  // after the full bleed, the list and its headline come back for one beat
  // ================= S6: everything flows into the wallet =================
  var w0 = 14.85;
  outUp(hl1, w0 + 0.1, 0.4, -120); outUp(hl2, w0 + 0.15, 0.4, -120);
  var WX = 540, WY = hy1 + hH / 2 + 150 + 280, WW = 952, WH = 560;
  var wal = rect(comp, "S6 Wallet block (> phone screen)", 0, 0, 48, C.ink, WX, WY);
  var hw1 = text(comp, "S6 Head ONE", "ONE WALLET", F.disp, hs, C.ink, X0, hy1, "L");
  charIn(hw1, w0 + 0.62, w0 + 1.1, 80, 30);
  // pills fly into the block, staggered
  var flyP = [[P1, e1, PX + ew1 / 2, py[0]], [P2, e2, PX + ew2 / 2, py[1]], [P3, e3, PX + ew3 / 2, py[2]]];
  for (var i = 0; i < 3; i++) {
    var t = w0 + 0.35 + i * 0.09, sh = flyP[i][0], lb = flyP[i][1];
    var from = [flyP[i][2], flyP[i][3]];
    KX(pos(sh), [[t, from], [t + 0.5, [WX, WY]]]);
    KX(pos(lb), [[t, pos(lb).value], [t + 0.5, [WX, WY]]]);
    KX(opa(lb), [[t, 100], [t + 0.3, 0]]);
    var sp = scl(sh); KX(sp, [[t, [100, 100]], [t + 0.5, [30, 30]]]);
    KX(opa(sh), [[t + 0.3, 100], [t + 0.5, 0]]);
  }
  // block opens on impact
  K(rSize(wal), [[w0 + 0.75, [200, 120]], [w0 + 1.15, [WW + 24, WH + 16]], [w0 + 1.4, [WW, WH]]], 15, 75);
  K(opa(wal), [[w0 + 0.72, 0], [w0 + 0.8, 100]]);
  var wLab = text(comp, "S6 Total label", "Total balance", F.uiM, 44, [1, 1, 1], WX - WW / 2 + 64, WY - 170, "L");
  opa(wLab).setValue(70);
  var wNum = text(comp, "S6 Balance (counter)", "AED 1,863.75", F.disp, 230, C.lime, WX - WW / 2 + 60, WY - 10, "L");
  var sl2 = fx(wNum, "ADBE Slider Control"); sl2.name = "Count";
  K(wNum.property("ADBE Effect Parade").property("Count").property(1), [[w0 + 1.15, 0], [w0 + 2.2, 1863.75]], 15, 92);
  wNum.property("ADBE Text Properties").property("ADBE Text Document").expression =
    'var v=effect("Count")(1).value;var s=v.toFixed(2);"AED "+s.replace(/\\B(?=(\\d{3})+(?!\\d))/g,",");';
  var wBtn = rect(comp, "S6 Withdraw button", 360, 112, 56, C.lime, WX + WW / 2 - 64 - 180, WY + 180);
  var wBtnT = text(comp, "S6 Withdraw", "Withdraw", F.ui, 44, C.ink, WX + WW / 2 - 64 - 180, WY + 180, "C");
  var wSub = text(comp, "S6 Sub", "Paid out in AED", F.uiM, 40, [1, 1, 1], WX - WW / 2 + 64, WY + 180, "L"); opa(wSub).setValue(70);
  fadeIn(wLab, w0 + 1.15, 0.45, 20);
  K(opa(wNum), [[w0 + 1.15, 0], [w0 + 1.3, 100]]);
  K(scl(wNum), [[w0 + 2.15, [100, 100]], [w0 + 2.27, [104, 104]], [w0 + 2.5, [100, 100]]], 20, 70);
  K(scl(wBtn), [[w0 + 2.3, [0, 0]], [w0 + 2.6, [100, 100]], [w0 + 2.85, [94, 94]], [w0 + 3.0, [100, 100]]], 20, 75);
  K(opa(wBtnT), [[w0 + 2.4, 0], [w0 + 2.6, 100]]);
  K(scl(wBtnT), [[w0 + 2.85, [94, 94]], [w0 + 3.0, [100, 100]]]);
  fadeIn(wSub, w0 + 2.35, 0.45, 20);
  // final opacities for wallet pieces handled in S7

  // ================= S7: the block becomes the app =================
  var s0 = 17.8, s1 = 18.4;
  var SW = 500, SH = 1082, SY = hy1 + hH / 2 + 90 + SH / 2;
  K(rSize(wal), [[s0, [WW, WH]], [s1, [SW, SH]]], 30, 85);
  K(pos(wal), [[s0, [WX, WY]], [s1, [540, SY]]], 30, 85);
  K(rRound(wal), [[s0, 48], [s1, 78]], 30, 85);
  var wPieces = [wLab, wNum, wBtn, wBtnT, wSub];
  for (var i = 0; i < wPieces.length; i++) KX(opa(wPieces[i]), [[s0 - 0.05, opa(wPieces[i]).valueAtTime(s0 - 0.06, false)], [s0 + 0.18, 0]]);
  var scr = comp.layers.add(pcApp); scr.name = "S7 App screen (matte wallet)";
  // screen precomp is W x H covering; scale so the 1170 x 2532 shot fits the phone screen
  var sc = SW / W * 100 * (W / (1170 * Math.max(W / 1170, H / 2532)));
  scr.setTrackMatte(wal, TrackMatteType.ALPHA);
  var bez = rect(comp, "S7 Phone bezel", SW + 36, SH + 36, 96, C.ink, 540, SY, 18);
  K(opa(bez), [[s0 + 0.35, 0], [s1 + 0.1, 100]]);
  // fit the screen precomp into the screen box
  var it7 = pcApp.layer(1).source; var fit = Math.max(SW / it7.width, SH / it7.height) * 100;
  var cover = Math.max(W / it7.width, H / it7.height) * 100;
  scr.threeDLayer = false;
  var k = fit / cover * 100;
  scl(scr).setValue([k, k]); pos(scr).setValue([540, SY]);
  K(opa(scr), [[s0 + 0.25, 0], [s1 + 0.05, 100]]);
  outUp(hw1, s0, 0.35, -100);
  var hApp = text(comp, "S7 Head ONE APP", "ONE APP", F.disp, hs, C.ink, X0, hy1, "L");
  charIn(hApp, s0 + 0.2, s0 + 0.7, 80, 30);
  // phone rig: slow push
  var pr = comp.layers.addNull(DUR); pr.name = "S7 Phone rig"; pos(pr).setValue([540, SY]);
  wal.parent = pr; scr.parent = pr; bez.parent = pr;
  K(scl(pr), [[s1, [100, 100]], [19.6, [103, 103]]], 30, 60);

  // ================= S8: the phone shrinks into the dot of the i =================
  var e0 = 19.8;
  var wmIt = proj.importFile(new ImportOptions(new File(ROOT + "film/assets/following_wordmark.ai"))); wmIt.parentFolder = fAssets;
  var WMW = 780, s8 = WMW / wmIt.width * 100;
  var WMY = 900;
  var wm = comp.layers.add(wmIt); wm.name = "S8 Wordmark"; scl(wm).setValue([s8, s8]); pos(wm).setValue([540, WMY]);
  wm.motionBlur = true;
  // dot of the i (artwork: 953 x 202, dot centre 662.5, 19, diameter 38)
  var dotX = 540 + (662.5 - wmIt.width / 2) * s8 / 100, dotY = WMY + (19 - wmIt.height / 2) * s8 / 100, dotD = 38 * s8 / 100;
  KX(rSize(wal), [[e0, [SW, SH]], [e0 + 0.55, [dotD, dotD]]]);
  KX(rRound(wal), [[e0, 78], [e0 + 0.45, dotD / 2]]);
  KX(opa(scr), [[e0, 100], [e0 + 0.3, 0]]);
  KX(opa(bez), [[e0, 100], [e0 + 0.2, 0]]);
  // rig moves so the shrinking screen lands on the dot
  KX(pos(pr), [[e0, [540, SY]], [e0 + 0.55, [dotX, dotY]]]);
  KX(scl(pr), [[e0, [103, 103]], [e0 + 0.55, [100, 100]]]);
  outUp(hApp, e0, 0.35, -100);
  // dot turns from ink to lime on landing, then back to ink as the word arrives
  K(rFill(wal), [[e0 + 0.45, C.ink], [e0 + 0.6, C.lime], [e0 + 1.05, C.lime], [e0 + 1.4, C.ink]]);
  K(scl(pr), [[e0 + 0.55, [100, 100]], [e0 + 0.7, [135, 135]], [e0 + 0.9, [100, 100]]], 20, 70);
  // wordmark rises through a mask (the dot is drawn by the morph, so the rise sits under it)
  var wmM = rect(comp, "S8 Wordmark mask", WMW + 40, 260, 0, C.white, 540, WMY);
  wmM.enabled = true; wm.setTrackMatte(wmM, TrackMatteType.ALPHA); wmM.enabled = false;
  K(pos(wm), [[e0 + 0.7, [540, WMY + 200]], [e0 + 1.25, [540, WMY]]], 15, 88);
  var wb = blurFx(wm); K(wb, [[e0 + 0.7, 30], [e0 + 1.2, 0]]);
  K(opa(wal), [[e0 + 1.35, 100], [e0 + 1.45, 0]]);
  // the brand line draws under the wordmark (5 stops, built as a precomp and matted to a trimmed stroke)
  var lc = proj.items.addComp("LINE_Gradient", W, 60, 1, DUR, FPS); lc.parentFolder = fPre;
  var stops = [[0, C.lime], [0.30, C.orange], [0.52, C.pink], [0.80, C.violet], [1, C.lilac]];
  var LX0 = 540 - WMW / 2, LW = WMW;
  for (var i = 0; i < 4; i++) {
    var sx0 = LX0 + stops[i][0] * LW, sx1 = LX0 + stops[i + 1][0] * LW;
    var seg = lc.layers.addSolid(C.white, "seg" + i, Math.ceil(sx1 - sx0) + 2, 60, 1, DUR);
    pos(seg).setValue([(sx0 + sx1) / 2, 30]);
    var rp = fx(seg, "ADBE Ramp"); rp = seg.property("ADBE Effect Parade").property(1);
    rp.property(1).setValue([(sx0 + sx1) / 2 - (sx1 - sx0) / 2, 30]); rp.property(2).setValue(stops[i][1]);
    rp.property(3).setValue([(sx0 + sx1) / 2 + (sx1 - sx0) / 2, 30]); rp.property(4).setValue(stops[i + 1][1]);
  }
  var line = comp.layers.add(lc); line.name = "S8 Brand line"; pos(line).setValue([540, WMY + 168]);
  var lm = comp.layers.addShape(); lm.name = "S8 Line stroke (matte)";
  var lg = lm.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
  lg = lm.property("ADBE Root Vectors Group").property(1);
  lg.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Group");
  var shp = new Shape(); shp.vertices = [[LX0, 0], [LX0 + LW, 0]]; shp.closed = false;
  lm.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property(1).property("ADBE Vector Shape").setValue(shp);
  lm.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
  var st = lm.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property(2);
  st.property("ADBE Vector Stroke Width").setValue(16); st.property("ADBE Vector Stroke Line Cap").setValue(2);
  lm.property("ADBE Root Vectors Group").addProperty("ADBE Vector Filter - Trim");
  var trm = lm.property("ADBE Root Vectors Group").property(2);
  tr(lm).property("ADBE Anchor Point").setValue([0, 0]); pos(lm).setValue([0, WMY + 168]);
  K(trm.property("ADBE Vector Trim End"), [[e0 + 1.1, 0], [e0 + 1.85, 100]], 20, 85);
  line.setTrackMatte(lm, TrackMatteType.ALPHA); lm.enabled = false;
  var tag = text(comp, "S8 Tagline", "The influencer everything app", F.uiX, 52, C.ink, 540, WMY + 290, "C", -10);
  fadeIn(tag, e0 + 1.5, 0.6, 30);
  // sheen across the wordmark
  var shn = rect(comp, "S8 Sheen", 140, 600, 0, C.white, 0, WMY);
  tr(shn).property("ADBE Rotate Z").setValue(20); shn.blendingMode = BlendingMode.SCREEN;
  var shb = blurFx(shn); shb.setValue(40); opa(shn).setValue(55);
  K(pos(shn), [[e0 + 2.0, [-100, WMY]], [e0 + 2.9, [1200, WMY]]], 40, 60);
  var wmCopy = comp.layers.add(wmIt); wmCopy.name = "S8 Wordmark (sheen matte)"; scl(wmCopy).setValue([s8, s8]); pos(wmCopy).setValue([540, WMY]);
  shn.setTrackMatte(wmCopy, TrackMatteType.ALPHA); wmCopy.enabled = false;
  // trim layer life so they never flash outside their scene
  trim(tPost, 0, 2.9); trim(tGet, 0, 2.9); trim(tPaid, 0, 2.8);
  trim(wm, e0 + 0.6, DUR); trim(wmM, e0 + 0.6, DUR); trim(wmCopy, e0 + 1.9, DUR); trim(shn, e0 + 1.9, DUR);
  trim(line, e0 + 1.0, DUR); trim(lm, e0 + 1.0, DUR); trim(tag, e0 + 1.4, DUR);
  trim(wal, w0 + 0.7, DUR); trim(hw1, w0 + 0.4, s0 + 0.5); trim(hApp, s0 + 0.1, e0 + 0.5);
  trim(scr, s0, e0 + 0.4); trim(bez, s0, e0 + 0.3);
  for (var i = 0; i < s3c.length; i++) trim(s3c[i], 4.9, 7.6);
  for (var i = 0; i < s4c.length; i++) trim(s4c[i], 8.5, 10.8);
  trim(sw, 8.6, 10.6);
  trim(big, 11.6, 14.4); trim(bigS, 11.6, 14.4);
  for (var i = 0; i < rcGroup.length; i++) trim(rcGroup[i], 11.9, 14.4);
  trim(scan, 12.7, 13.7); trim(scanG, 12.7, 13.7); trim(cbBox, 13.5, 14.4); trim(cbT, 13.5, 14.4);
  trim(ph1, 4.4, 8.0); trim(ph2, 8.0, 11.2); trim(ph3, 11.2, 14.8);
  trim(hl1, 2.5, w0 + 0.6); trim(hl2, 2.6, w0 + 0.7);
  var pl = [P1, P2, P3, l1.t, l2.t, l3.t, e1, e2, e3];
  for (var i = 0; i < pl.length; i++) trim(pl[i], pl[i] == P1 ? 0.95 : 2.8, w0 + 1.0);

  P1.enabled = true; P2.enabled = true; P3.enabled = true; wal.enabled = true;
  // ================= finish =================
  var adj = solid(comp, [1, 1, 1], "FINISH Grain + curves");
  adj.adjustmentLayer = true;
  fx(adj, "ADBE Noise"); adj.property("ADBE Effect Parade").property(1).property(1).setValue(1.6);
  try { adj.property("ADBE Effect Parade").property(1).property(2).setValue(0); } catch (e) { }
  adj.moveToBeginning();

  // ---------- save ----------
  var fold = new Folder(ROOT + "film"); fold.create();
  proj.save(new File(ROOT + "film/Following_Three_Ways_v03.aep"));
  log("OK saved");
  comp.openInViewer();
  // stills
  var sf = new Folder(ROOT + "film/frames"); sf.create();
  var ts = [0.5, 1.3, 2.0, 2.7, 3.6, 4.7, 6.0, 7.7, 8.3, 9.4, 11.5, 12.4, 13.3, 13.9, 15.3, 16.0, 17.2, 18.1, 19.0, 20.3, 20.7, 21.4, 22.6, 23.5];
  for (var i = 0; i < ts.length; i++) {
    var nm = ("0" + Math.round(ts[i] * 10)).slice(-3);
    try { comp.saveFrameToPng(ts[i], new File(ROOT + "film/frames/f_" + nm + ".png")); } catch (e) { log("frame " + ts[i] + " " + e); }
  }
  log("frames done");
  app.endUndoGroup();
} catch (e) {
  log("ERROR line " + e.line + ": " + e.toString());
}
flush();
