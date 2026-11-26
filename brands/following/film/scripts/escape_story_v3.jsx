// Following x horror escape room (client unnamed). Story 1 of 3, 1080 x 1920, 12 s. Built on the T1-T3 language:
// type is the image (Obviously at full frame, the room lives inside the letters), width-stepping, step-repeat stacks,
// a dive through the T of OUT, a power cut, the lights coming back inside a giant 2.
// Runs inside the open After Effects session: no project close, no relaunch. Old ESC items are replaced.
// Link sticker zone 72,1420 600x150 stays free of key type.
var LOGNAME = "escape_log.txt";
#include "ae_lib.jsx"
DUR = 12;
function f(n) { return n / FPS; }
var OB = { comp: "Obviously-CompBlck", cond: "Obviously-CondBlck", narw: "Obviously-NarwBlck", reg: "Obviously-Blck", wide: "Obviously-WideBlck", extd: "Obviously-ExtdBlck" };
var WIDTHS = [OB.comp, OB.cond, OB.narw, OB.reg, OB.wide, OB.extd];
var FI = "PlusJakartaSansItalic-MediumItalic";
var fAssets, fPre;
function SNAP(p, keys) { K(p, keys, 5, 95); }
function DIVE(p, keys) { K(p, keys, 85, 8); }
function HOLDK(p) { for (var i = 1; i <= p.numKeys; i++) p.setInterpolationTypeAtKey(i, KeyframeInterpolationType.HOLD, KeyframeInterpolationType.HOLD); }
function holds(p, keys) { for (var i = 0; i < keys.length; i++) p.setValueAtTime(keys[i][0], keys[i][1]); HOLDK(p); }
function imp(file) { var it = proj.importFile(new ImportOptions(new File(file))); it.parentFolder = fAssets; return it; }

// centred display type; sizes over 1296 handled by scale
function ct(cp, name, str, font, size, col, x, y) {
  var k = 1; if (size > 1296) { k = size / 1296; size = 1296; }
  var l = cp.layers.addText(str); l.name = name;
  var sp = l.property("ADBE Text Properties").property("ADBE Text Document"), d = sp.value;
  d.resetCharStyle(); d.resetParagraphStyle(); d.font = font; d.fontSize = size; d.applyFill = true; d.fillColor = col; d.applyStroke = false; d.tracking = 0;
  d.justification = ParagraphJustification.CENTER_JUSTIFY; sp.setValue(d);
  if (sp.value.font != font) log("FONT MISS " + name + " " + sp.value.font);
  var b = l.sourceRectAtTime(0, false);
  tr(l).property("ADBE Anchor Point").setValue([0, b.top + b.height / 2]); pos(l).setValue([x, y]);
  if (k != 1) scl(l).setValue([100 * k, 100 * k]);
  l.baseK = k; l.motionBlur = true; return l;
}
function meas(str, font, size) { var l = ct(comp, "tmp", str, font, size, C.white, 0, 0), b = l.sourceRectAtTime(0, false), k = l.baseK; l.remove(); return { w: b.width * k, h: b.height * k }; }
// narrowest width of Obviously that fills maxW without passing maxH
function pick(str, maxW, maxH) {
  for (var i = 0; i < WIDTHS.length; i++) {
    var m = meas(str, WIDTHS[i], 200), s = 200 * maxW / m.w;
    if (m.h * s / 200 <= maxH) return { font: WIDTHS[i], size: s, idx: i };
  }
  var m2 = meas(str, OB.extd, 200); return { font: OB.extd, size: Math.min(200 * maxW / m2.w, 200 * maxH / m2.h), idx: 5 };
}
// step through the widths two frames each, landing on idx
function widthCycle(l, t0, idx) {
  var sp = l.property("ADBE Text Properties").property("ADBE Text Document");
  for (var i = 0; i <= idx; i++) { var d = sp.valueAtTime(t0, false); d.font = WIDTHS[i]; sp.setValueAtTime(t0 + i * f(2), d); }
  HOLDK(sp);
}
function outline(l, w, col) { var sp = l.property("ADBE Text Properties").property("ADBE Text Document"), d = sp.value; d.applyFill = false; d.applyStroke = true; d.strokeColor = col || C.white; d.strokeWidth = w; sp.setValue(d); }
// letters arrive one by one from below, stretched, on an even 2-frame beat
function letterSlam(l, t0, n) {
  var A = l.property("ADBE Text Properties").property("ADBE Text Animators");
  A.addProperty("ADBE Text Animator"); var an = A.property(A.numProperties);
  an.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
  an = A.property(A.numProperties); an.property("ADBE Text Animator Properties").addProperty("ADBE Text Position 3D");
  an = A.property(A.numProperties); an.property("ADBE Text Animator Properties").addProperty("ADBE Text Scale 3D");
  an = A.property(A.numProperties);
  an.property("ADBE Text Animator Properties").property("ADBE Text Position 3D").setValue([0, 1500, 0]);
  an.property("ADBE Text Animator Properties").property("ADBE Text Scale 3D").setValue([100, 170, 100]);
  K(an.property("ADBE Text Selectors").property(1).property("ADBE Text Percent Offset"), [[t0, 0], [t0 + f(2 * n + 4), 100]], 0.1, 0.1);
}
function cover(cp, it, w, h) { var l = cp.layers.add(it); var s = Math.max(w / it.width, h / it.height) * 100; scl(l).setValue([s, s]); pos(l).setValue([W / 2, H / 2]); return l; }
function label(cp, name, str, font, size, col, y) { return ct(cp, name, str, font, size, col, 540, y); }

app.beginUndoGroup("escape v3");
try {
  proj = app.project;
  // clear earlier ESC builds in this project (comps, folders, render queue)
  for (var r = proj.renderQueue.numItems; r >= 1; r--) proj.renderQueue.item(r).remove();
  for (var i = proj.numItems; i >= 1; i--) { var it = proj.item(i); if (it.name.indexOf("ESC") == 0 && !(it instanceof FolderItem)) it.remove(); }
  for (var i = proj.numItems; i >= 1; i--) { var it = proj.item(i); if (it.name.indexOf("ESC") == 0) it.remove(); }
  fAssets = proj.items.addFolder("ESC Assets"); fPre = proj.items.addFolder("ESC Precomps");
  var vid = imp(ROOT + "film/assets/esc_room_loop.mp4");
  var logoIt = imp(ROOT + "film/assets/following_wordmark.ai");
  var handIt = imp(ROOT + "social/assets/illustration/h_pink_button.png");

  // ROOM: the 5 s clip ping-ponged to 12 s, slow drift
  var room = proj.items.addComp("ESC ROOM loop", W, H, 1, DUR, FPS); room.parentFolder = fPre;
  var rv = room.layers.add(vid); rv.timeRemapEnabled = true;
  rv.property("ADBE Time Remapping").expression = 'loopOut("pingpong")'; rv.outPoint = DUR;
  var s0 = Math.max(W / vid.width, H / vid.height) * 104; scl(rv).setValue([s0, s0]);
  scl(rv).expression = 'var k = 1 + time * 0.010; [value[0] * k, value[1] * k]'; pos(rv).setValue([W / 2, H / 2 - 40]);

  comp = proj.items.addComp("ESC_01_Story", W, H, 1, DUR, FPS);
  comp.bgColor = C.ink; comp.motionBlur = true; comp.shutterAngle = 220; comp.shutterPhase = -110;
  comp.openInViewer();
  var bg = solid(comp, C.ink, "BG ink");

  // ================= S1 0-1.8  GET / OUT, the room inside the letters; dive through the T =================
  var go = proj.items.addComp("ESC GET OUT type", W, H, 1, DUR, FPS); go.parentFolder = fPre;
  var pG = pick("GET", 1000, 495), pO = pick("OUT", 1000, 495);
  var yG = 630, yO = 1150;
  var cs = comp; comp = go;
  var tG = ct(go, "GET", "GET", pG.font, pG.size, C.white, 540, yG);
  var tO = ct(go, "OUT", "OUT", pO.font, pO.size, C.white, 540, yO);
  comp = cs;
  // land the width cycle on the fitting width; letters slam from the comp width up
  widthCycle(tG, f(2), pG.idx); widthCycle(tO, f(8), pO.idx);
  letterSlam(tG, f(2), 3); letterSlam(tO, f(8), 3);
  // T stem position: halfway across the T, a little under its crossbar
  var mOU = meas("OU", pO.font, pO.size), mOUT = meas("OUT", pO.font, pO.size);
  var tX = 540 - mOUT.w / 2 + mOU.w + (mOUT.w - mOU.w) / 2, tY = yO + mOUT.h * 0.18;
  log("S1 " + pG.font + " " + Math.round(pG.size) + " / " + pO.font + " " + Math.round(pO.size) + " T at " + Math.round(tX) + "," + Math.round(tY));
  var goL = comp.layers.add(go); goL.name = "MATTE get out"; goL.motionBlur = true;
  tr(goL).property("ADBE Anchor Point").setValue([tX, tY]); pos(goL).setValue([tX, tY]);
  var dv0 = 1.22, dv1 = 1.80;
  K(scl(goL), [[f(20), [100, 100]], [dv0, [105, 105]]], 30, 50);
  DIVE(scl(goL), [[dv0, [105, 105]], [dv1, [4200, 4200]]]);
  DIVE(pos(goL), [[dv0, [tX, tY]], [dv1, [540, 960]]]);
  var rA = comp.layers.add(room); rA.name = "ROOM inside GET OUT"; rA.setTrackMatte(goL, TrackMatteType.ALPHA);
  K(pos(rA), [[0, [600, 960]], [dv0, [520, 960]]], 20, 60);
  DIVE(scl(rA), [[dv0, [100, 100]], [dv1, [130, 130]]]);
  trim(goL, 0, dv1); trim(rA, 0, dv1);
  // step-repeat outline echoes on the two landing frames
  var ech = [];
  for (var k = -1; k <= 2; k++) {
    if (k == 0 || k == 1) continue;
    var src = k < 0 ? ["GET", pG, yG] : ["OUT", pO, yO];
    var e = ct(comp, "ECHO " + src[0] + " " + k, src[0], src[1].font, src[1].size, C.white, 540, src[2] + (k < 0 ? -1 : 1) * 520);
    outline(e, 4); ech.push(e);
    holds(opa(e), [[0, 0], [f(16), 100], [f(18), 0], [f(26), 70], [f(27), 0]]);
    trim(e, 0, f(30));
  }

  // ================= S2 1.8-3.6  inside the room: ABU DHABI =================
  var rB = comp.layers.add(room); rB.name = "ROOM full B"; rB.moveBefore(bg); rB.motionBlur = true;
  trim(rB, dv1 - f(1), 3.62);
  K(scl(rB), [[dv1, [126, 126]], [dv1 + f(14), [100, 100]]], 5, 95);
  var pA = pick("ABU DHABI", 980, 380);
  var cs2 = comp;
  var tAD = ct(comp, "ABU DHABI", "ABU DHABI", pA.font, pA.size, C.lime, 540, 560);
  widthCycle(tAD, 2.0, pA.idx); letterSlam(tAD, 2.0, 9);
  K(scl(tAD), [[2.4, [100 * tAD.baseK, 100 * tAD.baseK]], [3.4, [104 * tAD.baseK, 104 * tAD.baseK]]], 20, 20);
  var lbB = label(comp, "label horror", "Horror escape room", F.uiX, 58, C.white, 560 + meas("ABU DHABI", pA.font, pA.size).h / 2 + 80);
  trim(tAD, 2.0, 3.62); trim(lbB, 2.5, 3.62); K(opa(lbB), [[2.5, 0], [2.5 + f(3), 100]]);
  // power cut: flicker, a projector roll, then dark
  var flick = [[3.30, 100], [3.33, 15], [3.37, 100], [3.43, 0], [3.47, 85], [3.50, 0]];
  holds(opa(rB), [[dv1 - f(1), 100]].concat(flick));
  holds(opa(tAD), flick); holds(opa(lbB), [[2.5 + f(3), 100]].concat(flick));
  holds(pos(rB), [[3.30, [540, 960]], [3.33, [540, 1110]], [3.37, [540, 900]], [3.43, [540, 960]]]);
  var flash = solid(comp, [1, 0.9, 0.7], "FLASH"); flash.blendingMode = BlendingMode.ADD; opa(flash).setValue(45); trim(flash, 3.47, 3.47 + f(1));

  // ================= S3 4.2-6.3  the lights come back inside a giant 2 =================
  var two = proj.items.addComp("ESC TWO type", W, H, 1, DUR, FPS); two.parentFolder = fPre;
  comp = two; var p2 = pick("2", 1000, 1080); var t2 = ct(two, "2", "2", p2.font, p2.size, C.white, 540, 820); comp = cs2;
  var twoL = comp.layers.add(two); twoL.name = "MATTE 2"; twoL.motionBlur = true;
  var rC = comp.layers.add(room); rC.name = "ROOM inside 2"; rC.setTrackMatte(twoL, TrackMatteType.ALPHA);
  holds(opa(rC), [[4.20, 0], [4.24, 70], [4.27, 0], [4.34, 100]]);
  K(scl(twoL), [[4.20, [100, 100]], [6.3, [106, 106]]], 20, 20);
  K(scl(rC), [[4.20, [112, 112]], [6.3, [100, 100]]], 20, 20);
  var t2e = ct(comp, "2 keyline", "2", p2.font, p2.size, C.white, 540, 820); outline(t2e, 3);
  t2e.parent = twoL; pos(t2e).setValue([540, 820]); holds(opa(t2e), [[4.20, 0], [4.24, 100], [4.27, 0], [4.34, 60], [4.6, 0]]);
  var pF = pick("FOR", 620, 300);
  var tF = ct(comp, "FOR", "FOR", pF.font, pF.size, C.lime, 400, 470);
  tr(tF).property("ADBE Rotate Z").setValue(-7);
  widthCycle(tF, 4.55, pF.idx); SNAP(scl(tF), [[4.55, [150 * tF.baseK, 150 * tF.baseK]], [4.55 + f(5), [100 * tF.baseK, 100 * tF.baseK]]]);
  var lbC = label(comp, "label edited", "Plus your gameplay, fully edited.", FI, 50, C.white, 1360);
  trim(lbC, 5.0, 6.3); K(opa(lbC), [[5.0, 0], [5.0 + f(4), 100]]); K(pos(lbC), [[5.0, [540, 1400]], [5.0 + f(8), [540, 1360]]], 5, 95);
  trim(twoL, 4.20, 6.30); trim(rC, 4.20, 6.30); trim(t2e, 4.20, 4.6); trim(tF, 4.55, 6.30);
  // whip out to the left
  var wp0 = 6.12, wp1 = 6.30;
  var sh = comp.layers.addNull(DUR); sh.name = "WHIP S3"; pos(sh).setValue([540, 960]);
  twoL.parent = sh; tF.parent = sh; lbC.parent = sh;
  KX(pos(sh), [[wp0, [540, 960]], [wp1, [540 - 1500, 960]]]);

  // ================= S4 6.3-8.6  AED 660, step-repeat stack over the room =================
  var rD = comp.layers.add(room); rD.name = "ROOM full D"; rD.moveBefore(bg); trim(rD, wp0 + f(2), 8.62);
  K(pos(rD), [[wp0 + f(2), [540 + 1500, 960]], [wp1 + f(4), [540, 960]]], 10, 90);
  var dimD = solid(comp, C.ink, "DIM D"); dimD.moveBefore(rD); opa(dimD).setValue(48); trim(dimD, wp0 + f(2), 8.62);
  K(pos(dimD), [[wp0 + f(2), [540 + 1500, 960]], [wp1 + f(4), [540, 960]]], 10, 90);
  var szA = fitSize("AED 660", OB.comp, 1000), rows = [], hh = 0;
  for (var k = -2; k <= 2; k++) {
    var t = ct(comp, "Stack " + k, "AED 660", OB.comp, szA, k == 0 ? C.lime : C.white, 540, 900);
    if (hh == 0) hh = meas("AED 660", OB.comp, szA).h * 1.06;
    if (k != 0) outline(t, 4);
    var dir = (k % 2 == 0) ? 1 : -1, y = 900 + k * hh;
    K(pos(t), [[6.36, [540 - dir * 140, 900 + k * hh * 1.7]], [6.70, [540, y]], [7.85, [540 + dir * 70, y]], [8.05, [540, 900]]], 8, 92);
    if (k != 0) { holds(opa(t), [[6.30, 0], [6.36, 100], [8.0, 0]]); trim(t, 6.30, 8.05); }
    else { trim(t, 6.30, 8.62); widthCycle(t, 8.0, 5); }
    rows.push(t);
  }
  var mid = rows[2], kExt = fitSize("AED 660", OB.extd, 980) / szA * 100;
  SNAP(scl(mid), [[8.0, [100, 100]], [8.12, [kExt, kExt]]]);
  var lbD = ct(comp, "label worth", "Worth", FI, 80, C.white, 540, 900 - meas("AED 660", OB.extd, fitSize("AED 660", OB.extd, 980)).h / 2 - 70);
  trim(lbD, 8.12, 8.62); K(opa(lbD), [[8.12, 0], [8.12 + f(3), 100]]);
  var tagT = ct(comp, "tag text", "BARTER COLLAB", F.uiX, 50, C.ink, 0, 0);
  var tagB = rect(comp, "tag pill", meas("BARTER COLLAB", F.uiX, 50).w + 80, 100, 50, C.white, 0, 0); tagT.moveBefore(tagB);
  var tagN = comp.layers.addNull(DUR); tagN.name = "TAG"; pos(tagN).setValue([690, 1130]);
  tagB.parent = tagN; tagT.parent = tagN; pos(tagB).setValue([0, 0]); pos(tagT).setValue([0, 0]);
  K(scl(tagN), [[8.2, [180, 180]], [8.2 + f(5), [93, 93]], [8.2 + f(9), [100, 100]]], 10, 80);
  K(tr(tagN).property("ADBE Rotate Z"), [[8.2, -20], [8.2 + f(6), -6]], 10, 85);
  trim(tagB, 8.2, 8.62); trim(tagT, 8.2, 8.62);

  // ================= S5 8.6-12  BRAVE / ENOUGH?  Apply below. =================
  var rE = comp.layers.add(room); rE.name = "ROOM full E"; rE.moveBefore(bg); trim(rE, 8.62, DUR);
  SNAP(scl(rE), [[8.62, [118, 118]], [9.1, [100, 100]]]);
  var dimE = solid(comp, C.ink, "DIM E"); dimE.moveBefore(rE); opa(dimE).setValue(38); trim(dimE, 8.62, DUR);
  var pB = pick("BRAVE", 1000, 420), pE = pick("ENOUGH?", 1000, 420);
  var tB = ct(comp, "BRAVE", "BRAVE", pB.font, pB.size, C.white, 540, 560);
  var tE = ct(comp, "ENOUGH?", "ENOUGH?", pE.font, pE.size, C.white, 540, 1000);
  widthCycle(tB, 8.62, pB.idx); letterSlam(tB, 8.62, 5); widthCycle(tE, 8.80, pE.idx); letterSlam(tE, 8.80, 7);
  K(scl(tB), [[9.2, [100 * tB.baseK, 100 * tB.baseK]], [DUR, [103 * tB.baseK, 103 * tB.baseK]]], 20, 20);
  K(scl(tE), [[9.3, [100 * tE.baseK, 100 * tE.baseK]], [DUR, [103 * tE.baseK, 103 * tE.baseK]]], 20, 20);
  trim(tB, 8.62, DUR); trim(tE, 8.80, DUR);
  var ap = text(comp, "Apply below", "Apply below.", FI, 92, C.lime, 72, 1300, "L", -20);
  trim(ap, 9.35, DUR); K(pos(ap), [[9.35, [72, 1350]], [9.35 + f(7), [72, 1300]]], 5, 95); K(opa(ap), [[9.35, 0], [9.35 + f(3), 100]]);
  var hand = comp.layers.add(handIt); hand.name = "HAND press"; hand.motionBlur = true;
  var hk = 420 / handIt.width * 100; scl(hand).setValue([hk, hk]);
  tr(hand).property("ADBE Anchor Point").setValue([handIt.width / 2, handIt.height]);
  K(pos(hand), [[9.5, [870, H + 800]], [9.85, [870, H + 40]]], 6, 92);
  var pr = [10.2, 10.85, 11.5], sk = [];
  for (var i = 0; i < pr.length; i++) { sk.push([pr[i], [hk, hk]]); sk.push([pr[i] + f(3), [hk * 1.03, hk * 0.9]]); sk.push([pr[i] + f(9), [hk, hk]]); }
  K(scl(hand), sk, 20, 80); trim(hand, 9.5, DUR);

  // ================= logo, grain, whip blur =================
  var logo = comp.layers.add(logoIt); logo.name = "LOGO following";
  fx(logo, "ADBE Fill"); try { logo.property("ADBE Effect Parade").property(1).property(3).setValue(C.white); } catch (e) { log("fill " + e); }
  tr(logo).property("ADBE Anchor Point").setValue([0, 0]); var lk = 280 / logoIt.width * 100; scl(logo).setValue([lk, lk]); pos(logo).setValue([72, 262]);
  holds(opa(logo), [[0, 100], [3.43, 0], [4.34, 100]]);
  var adjW = solid(comp, [1, 1, 1], "WHIP blur"); adjW.adjustmentLayer = true;
  fx(adjW, "ADBE Motion Blur"); var db = adjW.property("ADBE Effect Parade").property(1);
  db.property(1).setValue(90); K(db.property(2), [[wp0 - f(2), 0], [wp0 + f(4), 170], [wp1 + f(4), 0]], 30, 30);
  var gr = solid(comp, [1, 1, 1], "FINISH grain"); gr.adjustmentLayer = true; fx(gr, "ADBE Noise");
  var nz = gr.property("ADBE Effect Parade").property(1);
  for (var q = 1; q <= nz.numProperties; q++) { var nm = nz.property(q).name; if (nm.indexOf("Amount") >= 0) nz.property(q).setValue(2.4); if (nm.indexOf("Color") >= 0) { try { nz.property(q).setValue(0); } catch (e) { } } }
  adjW.moveToBeginning(); gr.moveToBeginning();

  proj.save(new File(ROOT + "film/Following_Escape_Story_v03.aep"));
  log("OK saved");
  var fo = new Folder(ROOT + "film/frames_escape"); fo.create();
  var ts = [0.1, 0.25, 0.45, 0.8, 1.35, 1.6, 1.75, 1.95, 2.15, 2.6, 3.35, 3.47, 3.8, 4.3, 4.7, 5.4, 6.2, 6.5, 7.2, 8.05, 8.4, 8.8, 9.6, 11.6];
  for (var i = 0; i < ts.length; i++) comp.saveFrameToPng(ts[i], new File(fo.fsName + "/v3_" + ("00" + Math.round(ts[i] * 30)).slice(-3) + ".png"));
  log("frames done");
  app.endUndoGroup();
  var rq = proj.renderQueue.items.add(comp), om = rq.outputModule(1);
  for (var i = 0; i < om.templates.length; i++) if (om.templates[i].indexOf("15 Mbps") >= 0) om.applyTemplate(om.templates[i]);
  om.file = new File(ROOT + "film/exports/ESC_01_Story_v3.mp4");
  proj.renderQueue.render();
  log("render done");
  proj.save();
} catch (e) {
  log("ERROR line " + e.line + ": " + e.toString());
  try { app.endUndoGroup(); } catch (x) { }
}
flush();
