// Following x horror escape room (client unnamed on purpose). Story 1 of 3, 1080 x 1920, 12 s.
// Idea: the room only shows through the type. "Get out." is a window; the camera dives through the full stop
// into the room, the power cuts, and the offer is lit in the dark. Link sticker zone (72,1420 600x150) stays clear.
// Run: AfterFX.exe -r escape_story.jsx
var LOGNAME = "escape_log.txt";
#include "ae_lib.jsx"
DUR = 12;
var FI = "PlusJakartaSansItalic-MediumItalic";
var fAssets, fPre;
function f(n) { return n / FPS; }
function HOLD(p) { for (var i = 1; i <= p.numKeys; i++) p.setInterpolationTypeAtKey(i, KeyframeInterpolationType.HOLD, KeyframeInterpolationType.HOLD); }
function setK(l, k) { scl(l).setValue([100 * k, 100 * k]); }
// slam: lands from 118% in 4 frames, hard snap
function slam(l, t, from) {
  var k = l.baseK || 1, a = (from || 118) * k;
  trim(l, t, null);
  K(scl(l), [[t, [a, a]], [t + f(4), [100 * k, 100 * k]]], 8, 92);
}
// slice: the line rises out of a hidden slot
function slice(cp, l, t, h) {
  var p = pos(l).value, hh = h || th(l) * (l.baseK || 1) + 30;
  var m = rect(cp, l.name + " slot", W + 200, hh, 0, C.white, 540, p[1]);
  m.moveBefore(l);
  K(pos(l), [[t, [p[0], p[1] + hh]], [t + f(6), p]], 6, 94);
  l.setTrackMatte(m, TrackMatteType.ALPHA);
  trim(l, t, null); trim(m, t, null);
  return m;
}
function cut(arr, t) { for (var i = 0; i < arr.length; i++) arr[i].outPoint = t; }
function imp(file) { var it = proj.importFile(new ImportOptions(new File(file))); it.parentFolder = fAssets; return it; }

app.beginUndoGroup("escape story");
try {
  try { app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES); } catch (e) { }
  proj = app.newProject();
  fAssets = proj.items.addFolder("ESC Assets"); fPre = proj.items.addFolder("ESC Precomps");
  var vid = imp(ROOT + "film/assets/esc_room_loop.mp4");
  var logoIt = imp(ROOT + "film/assets/following_wordmark.ai");
  var handIt = imp(ROOT + "social/assets/illustration/h_pink_button.png");

  // ---------- ROOM: 5 s clip ping-pong looped to 12 s, slow drift ----------
  var room = proj.items.addComp("ESC ROOM loop", W, H, 1, DUR, FPS); room.parentFolder = fPre;
  var rv = room.layers.add(vid);
  rv.timeRemapEnabled = true;
  rv.property("ADBE Time Remapping").expression = 'loopOut("pingpong")';
  rv.outPoint = DUR;
  var s0 = Math.max(W / vid.width, H / vid.height) * 104;
  scl(rv).setValue([s0, s0]);
  scl(rv).expression = 'var k = 1 + time * 0.010; [value[0] * k, value[1] * k]';
  pos(rv).setValue([W / 2, H / 2 - 40]);

  // ---------- main ----------
  comp = proj.items.addComp("ESC_01_Story", W, H, 1, DUR, FPS);
  comp.bgColor = C.ink; comp.motionBlur = true; comp.shutterAngle = 200; comp.shutterPhase = -100;
  var bg = solid(comp, C.ink, "BG ink");
  comp.openInViewer();

  // ===== A  0.0-2.4  "Get out." is a window, dive through the full stop =====
  var go = proj.items.addComp("ESC TYPE get out", W, H, 1, DUR, FPS); go.parentFolder = fPre;
  var tGet = textFit(go, "Get", "Get", F.uiX, 700, C.white, 66, 640, "L", 640);
  var tOut = textFit(go, "out", "out", F.uiX, 760, C.white, 66, 1110, "L", 560);
  var sz = tOut.property("ADBE Text Properties").property("ADBE Text Document").value.fontSize * (tOut.baseK || 1);
  var ob = tOut.sourceRectAtTime(0, false);
  var tDot = text(go, "dot", ".", F.uiX, sz, C.white, 0, 0, "L");
  var db = tDot.sourceRectAtTime(0, false);
  // sit the full stop on the baseline of "out", one stem-gap to the right
  var outRight = 66 + ob.width, outBottom = 1110 + ob.height / 2;
  var dotC = [outRight + sz * 0.05 + db.width / 2, outBottom - db.height / 2];
  tr(tDot).property("ADBE Anchor Point").setValue([db.left + db.width / 2, db.top + db.height / 2]);
  pos(tDot).setValue(dotC);
  slam(tGet, f(3)); slam(tOut, f(10)); slam(tDot, f(15), 160);

  var goL = comp.layers.add(go); goL.name = "MATTE get out"; goL.motionBlur = true;
  tr(goL).property("ADBE Anchor Point").setValue(dotC); pos(goL).setValue(dotC);
  K(scl(goL), [[f(3), [100, 100]], [1.45, [104, 104]]], 30, 30);
  scl(goL).setValueAtTime(2.40, [3200, 3200]);
  var kI = scl(goL).nearestKeyIndex(1.45), kE = scl(goL).nearestKeyIndex(2.40);
  function E3(a) { return [new KeyframeEase(0, a), new KeyframeEase(0, a), new KeyframeEase(0, a)]; }
  scl(goL).setTemporalEaseAtKey(kI, E3(30), E3(85));
  scl(goL).setTemporalEaseAtKey(kE, E3(8), E3(8));
  var roomA = comp.layers.add(room); roomA.name = "ROOM inside type";
  roomA.setTrackMatte(goL, TrackMatteType.ALPHA);
  cut([goL, roomA], 2.40);
  // a thin white keyline echo of the letters so they read on frame 1 before the room fills them
  var echo = comp.layers.add(go); echo.name = "ECHO get out"; echo.moveToBeginning();
  tr(echo).property("ADBE Anchor Point").setValue(dotC); pos(echo).setValue(dotC);
  K(opa(echo), [[f(3), 85], [f(12), 0]], 10, 90); cut([echo], f(13));

  var ifc = text(comp, "if you can", "if you can.", FI, 66, C.white, 72, 1360, "L", -10);
  slice(comp, ifc, 0.80, 100);
  cut([ifc, comp.layer("if you can slot")], 1.42);

  // ===== B  2.4-4.43  inside the room. Then the power cuts =====
  var roomB = comp.layers.add(room); roomB.name = "ROOM full B"; roomB.motionBlur = true;
  roomB.moveBefore(bg); trim(roomB, 2.28, 4.43);
  K(opa(roomB), [[2.28, 0], [2.40, 100]], 10, 90);
  K(scl(roomB), [[2.28, [118, 118]], [2.9, [100, 100]]], 5, 95);
  var dimB = solid(comp, C.ink, "DIM B"); dimB.moveBefore(roomB); trim(dimB, 2.40, 4.43); opa(dimB).setValue(22);
  var hz = textFit(comp, "Horror", "Horror", F.uiX, 940, C.white, 66, 600, "L", 420);
  var es = textFit(comp, "escape room.", "escape room.", F.uiX, 940, C.white, 66, 870, "L", 260);
  var ad = text(comp, "Abu Dhabi", "Abu Dhabi.", FI, 110, C.lime, 72, 1080, "L", -20);
  var m1 = slice(comp, hz, 2.52), m2 = slice(comp, es, 2.62), m3 = slice(comp, ad, 2.95);
  var Bset = [hz, es, ad];
  // flicker: hold keys, the room and the words die together
  var fl = [[4.10, 100], [4.17, 25], [4.20, 100], [4.27, 10], [4.30, 70], [4.37, 0]];
  var flk = [roomB, hz, es, ad];
  for (var i = 0; i < flk.length; i++) { var p = opa(flk[i]); if (flk[i] == roomB) { } for (var j = 0; j < fl.length; j++) p.setValueAtTime(fl[j][0], fl[j][1]); HOLD(p); }
  cut([hz, es, ad, m1, m2, m3], 4.43);
  // one frame of overexposed flash before the dark
  var flash = solid(comp, [1, 0.86, 0.62], "FLASH"); flash.blendingMode = BlendingMode.ADD;
  trim(flash, 4.30, 4.30 + f(1)); opa(flash).setValue(55);

  // ===== C  4.95-6.8  in the dark: Room for 2 =====
  var r1 = textFit(comp, "Room", "Room", F.uiX, 700, C.lime, 66, 560, "L", 420);
  var r2 = textFit(comp, "for 2", "for 2.", F.uiX, 940, C.lime, 66, 905, "L", 400);
  var r3 = text(comp, "gameplay", "Your gameplay,", FI, 84, C.white, 72, 1130, "L", -20);
  var r4 = text(comp, "edited", "fully edited.", FI, 84, C.white, 72, 1230, "L", -20);
  slam(r1, 4.95); slam(r2, 5.18);
  var m4 = slice(comp, r3, 5.70), m5 = slice(comp, r4, 5.82);
  cut([r1, r2, r3, r4, m4, m5], 6.80);

  // ===== D  6.8-8.7  Worth AED 660, the room back inside the numbers =====
  var w1 = text(comp, "Worth", "Worth", FI, 110, C.white, 72, 470, "L", -20);
  var w2 = textFit(comp, "AED", "AED", F.uiX, 600, C.lime, 66, 720, "L", 330);
  var w3 = textFit(comp, "660", "660", F.uiX, 948, C.white, 60, 1100, "L", 560);
  slice(comp, w1, 6.80, 140); slam(w2, 6.92); slam(w3, 7.08, 130);
  var room660 = comp.layers.add(room); room660.name = "ROOM inside 660";
  room660.moveBefore(w3); room660.setTrackMatte(w3, TrackMatteType.ALPHA);
  trim(room660, 7.08, 8.70);
  var dstack = [w1, w2, w3, room660, comp.layer("Worth slot")];
  var push = comp.layers.addNull(DUR); push.name = "PUSH D"; pos(push).setValue([540, 960]);
  K(scl(push), [[6.8, [100, 100]], [8.7, [105, 105]]], 20, 20);
  for (var i = 0; i < dstack.length; i++) if (dstack[i] != room660) dstack[i].parent = push;
  // tag sticks on
  var tagT = text(comp, "tag text", "BARTER COLLAB", F.uiX, 50, C.ink, 0, 0, "C", -10);
  var tagB = rect(comp, "tag pill", tw(tagT) + 76, 100, 50, C.white, 0, 0);
  tagT.moveBefore(tagB);
  var tagN = comp.layers.addNull(DUR); tagN.name = "TAG"; pos(tagN).setValue([700, 1310]);
  tagB.parent = tagN; tagT.parent = tagN; pos(tagB).setValue([0, 0]); pos(tagT).setValue([0, 0]);
  K(scl(tagN), [[7.55, [170, 170]], [7.55 + f(5), [94, 94]], [7.55 + f(9), [100, 100]]], 10, 80);
  K(tr(tagN).property("ADBE Rotate Z"), [[7.55, -18], [7.55 + f(6), -6]], 10, 85);
  trim(tagB, 7.55, 8.70); trim(tagT, 7.55, 8.70);
  cut([w1, w2, w3, comp.layer("Worth slot")], 8.70);

  // ===== E  8.7-12  Brave enough? Apply below. =====
  var roomE = comp.layers.add(room); roomE.name = "ROOM full E"; roomE.moveBefore(bg);
  trim(roomE, 8.70, DUR); K(scl(roomE), [[8.70, [112, 112]], [9.3, [100, 100]]], 5, 95);
  var dim = solid(comp, C.ink, "DIM E"); dim.moveBefore(roomE); trim(dim, 8.70, DUR); opa(dim).setValue(42);
  var e1 = textFit(comp, "Brave", "Brave", F.uiX, 760, C.white, 66, 560, "L", 400);
  var e2 = textFit(comp, "enough", "enough?", F.uiX, 940, C.white, 66, 840, "L", 330);
  var e3 = text(comp, "Apply below", "Apply below.", FI, 110, C.lime, 72, 1080, "L", -20);
  slam(e1, 8.76); slam(e2, 8.96); slice(comp, e3, 9.30, 150);
  var hand = comp.layers.add(handIt); hand.name = "HAND press"; hand.motionBlur = true;
  var hk = 420 / handIt.width * 100, hh2 = handIt.height * hk / 100;
  tr(hand).property("ADBE Anchor Point").setValue([handIt.width / 2, handIt.height]);
  var hy = H + 40;
  K(pos(hand), [[9.05, [870, hy + 760]], [9.45, [870, hy]]], 6, 92);
  scl(hand).setValue([hk, hk]);
  var pr = [9.9, 10.55, 11.2], sk = [];
  for (var i = 0; i < pr.length; i++) { sk.push([pr[i], [hk, hk]]); sk.push([pr[i] + f(3), [hk * 1.03, hk * 0.9]]); sk.push([pr[i] + f(9), [hk, hk]]); }
  K(scl(hand), sk, 20, 80);
  trim(hand, 9.05, DUR);

  // ===== logo, over everything except the dark =====
  var logo = comp.layers.add(logoIt); logo.name = "LOGO following";
  var fill = fx(logo, "ADBE Fill"); try { fill.property(3).setValue(C.white); } catch (e) { log("fill " + e); }
  tr(logo).property("ADBE Anchor Point").setValue([0, 0]);
  var lk = 280 / logoIt.width * 100; scl(logo).setValue([lk, lk]); pos(logo).setValue([72, 262]);
  var lo = opa(logo); lo.setValueAtTime(0, 100); lo.setValueAtTime(4.37, 0); lo.setValueAtTime(4.95, 100); HOLD(lo);

  // ===== impact punch: whole frame kicks 4% on every slam =====
  var adjP = solid(comp, [1, 1, 1], "IMPACT punch"); adjP.adjustmentLayer = true;
  var tf = fx(adjP, "ADBE Geometry2");
  var sc = adjP.property("ADBE Effect Parade").property(1).property(4);
  log("transform prop 4 = " + sc.name);
  var hits = [f(3), f(10), 4.95, 5.18, 6.92, 7.08, 7.55, 8.76, 8.96], hk2 = [];
  for (var i = 0; i < hits.length; i++) { hk2.push([hits[i] - f(1), 100]); hk2.push([hits[i], 104]); hk2.push([hits[i] + f(4), 100]); }
  K(sc, hk2, 5, 90);
  adjP.property("ADBE Effect Parade").property(1).property(10).setValue(0);
  adjP.property("ADBE Effect Parade").property(1).property(11).setValue(220);

  // ===== finish: grain, slight warm halation on highlights =====
  var adj = solid(comp, [1, 1, 1], "FINISH grain + glow"); adj.adjustmentLayer = true;
  fx(adj, "ADBE Noise"); var nz = adj.property("ADBE Effect Parade").property(1);
  for (var q = 1; q <= nz.numProperties; q++) { var nm = nz.property(q).name; log("noise " + q + " " + nm); if (nm.indexOf("Amount") >= 0) nz.property(q).setValue(3); if (nm.indexOf("Color") >= 0) { try { nz.property(q).setValue(0); } catch (e) { } } }
  try { adj.property("ADBE Effect Parade").property(1).property(2).setValue(0); } catch (e) { }
  adj.moveToBeginning(); adjP.moveToBeginning();

  // ---------- save + render ----------
  proj.save(new File(ROOT + "film/Following_Escape_Story_v02.aep"));
  log("OK saved");
  var fo = new Folder(ROOT + "film/frames_escape"); fo.create();
  var ts = [0.15, 0.4, 0.9, 1.6, 2.0, 2.3, 2.6, 3.2, 4.2, 4.3, 4.6, 5.0, 5.3, 6.0, 6.9, 7.2, 7.7, 8.4, 8.8, 9.3, 9.6, 10.0, 11.0, 11.9];
  for (var i = 0; i < ts.length; i++) comp.saveFrameToPng(ts[i], new File(fo.fsName + "/e_" + ("00" + Math.round(ts[i] * 30)).slice(-3) + ".png"));
  log("frames done");
  var rq = proj.renderQueue.items.add(comp), om = rq.outputModule(1), tpl = null;
  for (var i = 0; i < om.templates.length; i++) if (om.templates[i].indexOf("H.264") >= 0 && om.templates[i].indexOf("15 Mbps") >= 0) tpl = om.templates[i];
  log("templates: " + om.templates.join(" | "));
  if (tpl) { om.applyTemplate(tpl); log("using " + tpl); }
  om.file = new File(ROOT + "film/exports/ESC_01_Story.mp4");
  proj.renderQueue.render();
  log("render done");
  proj.save();
} catch (e) {
  log("ERROR line " + e.line + ": " + e.toString());
}
app.endUndoGroup();
flush();
