// Following motion territories: three 5-second tests, one comp each, opened in the viewer as they are built.
var LOGNAME = "territories_log.txt";
#include "ae_lib.jsx"
DUR = 5;
function f(n) { return n / FPS; }
var OB = { comp: "Obviously-CompBlck", cond: "Obviously-CondBlck", narw: "Obviously-NarwBlck", reg: "Obviously-Blck", wide: "Obviously-WideBlck", extd: "Obviously-ExtdBlck" };
var WIDTHS = [OB.comp, OB.cond, OB.narw, OB.reg, OB.wide, OB.extd];
var LK = ROOT + "final/assets/links/";

// hard snap: almost no acceleration out, long brake in
function SNAP(p, keys) { K(p, keys, 5, 95); }
// dive: slow build, explosive arrival
function DIVE(p, keys) { K(p, keys, 85, 8); }
function HOLDKEYS(p) { for (var i = 1; i <= p.numKeys; i++) p.setInterpolationTypeAtKey(i, KeyframeInterpolationType.HOLD, KeyframeInterpolationType.HOLD); }

// centred text with centre paragraph (for width cycling)
function ctext(cp, name, str, font, size, col, x, y) {
  var l = cp.layers.addText(str); l.name = name;
  var sp = l.property("ADBE Text Properties").property("ADBE Text Document"), d = sp.value;
  d.resetCharStyle(); d.resetParagraphStyle(); d.font = font; d.fontSize = size; d.applyFill = true; d.fillColor = col; d.applyStroke = false;
  d.justification = ParagraphJustification.CENTER_JUSTIFY; sp.setValue(d);
  var b = l.sourceRectAtTime(0, false);
  tr(l).property("ADBE Anchor Point").setValue([0, b.top + b.height / 2]); pos(l).setValue([x, y]); l.motionBlur = true;
  return l;
}
// step through Obviously's widths, two frames each, landing on `last`
function widthCycle(l, t0, seq, step) {
  var sp = l.property("ADBE Text Properties").property("ADBE Text Document");
  for (var i = 0; i < seq.length; i++) { var d = sp.valueAtTime(t0, false); d.font = seq[i]; sp.setValueAtTime(t0 + i * (step || f(2)), d); }
}
function outline(l, w) {
  var sp = l.property("ADBE Text Properties").property("ADBE Text Document"), d = sp.value;
  d.applyFill = false; d.applyStroke = true; d.strokeColor = C.white; d.strokeWidth = w; sp.setValue(d);
}
function cover(cp, it, cx, cy, w, h) { var l = cp.layers.add(it); var s = Math.max(w / it.width, h / it.height) * 100; scl(l).setValue([s, s]); pos(l).setValue([cx, cy]); return l; }
var IMP = {};
function imp(file) { if (IMP[file]) return IMP[file]; var it = proj.importFile(new ImportOptions(new File(file))); it.parentFolder = fAssets; IMP[file] = it; return it; }
function newComp(name, col) {
  var c = proj.items.addComp(name, W, H, 1, DUR, FPS); c.bgColor = col || C.white; c.motionBlur = true; c.shutterAngle = 220; c.shutterPhase = -110;
  return c;
}
function grain(cp, amt) { var a = cp.layers.addSolid([1, 1, 1], "FINISH Grain", W, H, 1, DUR); a.adjustmentLayer = true; fx(a, "ADBE Noise"); a.property("ADBE Effect Parade").property(1).property(1).setValue(amt || 2.2); try { a.property("ADBE Effect Parade").property(1).property(2).setValue(0); } catch (e) { } return a; }
function frames(cp, tag, ts) {
  var fo = new Folder(ROOT + "film/frames_territories"); fo.create();
  for (var i = 0; i < ts.length; i++) cp.saveFrameToPng(ts[i], new File(fo.fsName + "/" + tag + "_" + ("00" + Math.round(ts[i] * 30)).slice(-3) + ".png"));
}
// brand line as a horizontal precomp (5 stops)
function lineComp(len, hgt) {
  var lc = proj.items.addComp("LINE_" + len, len, hgt, 1, DUR, FPS); lc.parentFolder = fPre;
  var st = [[0, C.lime], [0.30, C.orange], [0.52, C.pink], [0.80, C.violet], [1, C.lilac]];
  for (var i = 0; i < 4; i++) {
    var x0 = st[i][0] * len, x1 = st[i + 1][0] * len;
    var s = lc.layers.addSolid(C.white, "seg" + i, Math.ceil(x1 - x0) + 2, hgt, 1, DUR); pos(s).setValue([(x0 + x1) / 2, hgt / 2]);
    fx(s, "ADBE Ramp"); var r = s.property("ADBE Effect Parade").property(1);
    r.property(1).setValue([x0, hgt / 2]); r.property(2).setValue(st[i][1]); r.property(3).setValue([x1, hgt / 2]); r.property(4).setValue(st[i + 1][1]);
  }
  return lc;
}

try {
  try { app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES); } catch (e) { }
  proj = app.newProject();
  fAssets = proj.items.addFolder("01_Assets"); fPre = proj.items.addFolder("02_Precomps");
  var wmIt = imp(ROOT + "film/assets/following_wordmark.ai");

  // =====================================================================
  // T1 — LETTERS ARE WINDOWS: photos live inside the type; the camera dives through the I.
  // =====================================================================
  comp = newComp("T1_Letters_are_windows");
  comp.openInViewer();
  solid(comp, C.white, "BG");
  // photo A inside PAID (parallax: photo moves slower than the letters)
  var phA = proj.items.addComp("T1_Photo_A", W, H, 1, DUR, FPS); phA.parentFolder = fPre;
  var la = cover(phA, imp(LK + "Fashionable Youth HR.png"), W / 2, H / 2, W * 1.25, H * 1.25);
  K(pos(la), [[0, [W / 2 + 60, H / 2]], [f(50), [W / 2 - 40, H / 2]]], 20, 60);
  var sPaid = fitSize("PAID", OB.comp, 1000);
  var tP = text(comp, "PAID (matte)", "PAID", OB.comp, sPaid, C.ink, 40, 960, "L");
  var bP = tP.sourceRectAtTime(0, false);
  // centre of the I: halfway between the ink widths of "PA" and "PAI"
  var tmp1 = text(comp, "tmp", "PA", OB.comp, sPaid, C.ink, 0, 0, "L"), tmp2 = text(comp, "tmp", "PAI", OB.comp, sPaid, C.ink, 0, 0, "L");
  var iX = bP.left + (tw(tmp1) + tw(tmp2)) / 2 + 6; tmp1.remove(); tmp2.remove();
  var iY = bP.top + bP.height / 2;
  // anchor the word on the I so scale dives into the stem
  tr(tP).property("ADBE Anchor Point").setValue([iX, iY]);
  var kP = tP.baseK, iScreenX = 40 + (iX - bP.left) * kP;
  pos(tP).setValue([iScreenX, 960]);
  var pA = comp.layers.add(phA); pA.name = "Photo A (inside PAID)"; pA.setTrackMatte(tP, TrackMatteType.ALPHA);
  // letters slam in one by one, 2 frames apart, squashed then released
  var an = tP.property("ADBE Text Properties").property("ADBE Text Animators").addProperty("ADBE Text Animator");
  an = tP.property("ADBE Text Properties").property("ADBE Text Animators").property(1);
  an.property("ADBE Text Selectors").addProperty("ADBE Text Selector");
  an = tP.property("ADBE Text Properties").property("ADBE Text Animators").property(1);
  an.property("ADBE Text Animator Properties").addProperty("ADBE Text Position 3D");
  an = tP.property("ADBE Text Properties").property("ADBE Text Animators").property(1);
  an.property("ADBE Text Animator Properties").addProperty("ADBE Text Scale 3D");
  an = tP.property("ADBE Text Properties").property("ADBE Text Animators").property(1);
  an.property("ADBE Text Animator Properties").property("ADBE Text Position 3D").setValue([0, 1400, 0]);
  an.property("ADBE Text Animator Properties").property("ADBE Text Scale 3D").setValue([100, 160, 100]);
  var sel = an.property("ADBE Text Selectors").property(1);
  K(sel.property("ADBE Text Percent Offset"), [[0, 0], [f(14), 100]], 0.1, 0.1); // linear so letters arrive at an even 2-3 frame beat
  // micro drift during the hold, then the dive
  var dv0 = f(44), dv1 = f(62);
  K(scl(tP), [[f(14), [100 * kP, 100 * kP]], [dv0, [104 * kP, 104 * kP]]], 30, 50);
  DIVE(scl(tP), [[dv0, [104 * kP, 104 * kP]], [dv1, [4200 * kP, 4200 * kP]]]);
  DIVE(pos(tP), [[dv0, [iScreenX, 960]], [dv1, [540, 960]]]);
  // photo pushes far less than the letters: depth
  DIVE(scl(pA), [[dv0, [100, 100]], [dv1, [128, 128]]]);
  // impact: one frame of chromatic offset
  // full bleed + width-cycling amount
  var amt = ctext(comp, "AED 1,800 (width cycle)", "AED 1,800", OB.comp, fitSize("AED 1,800", OB.extd, 1000), C.white, 540, 1640);
  widthCycle(amt, f(64), [OB.comp, OB.cond, OB.narw, OB.reg, OB.wide, OB.extd], f(2));
  K(scl(amt), [[f(64), [100, 135]], [f(70), [100, 100]]], 5, 95);
  trim(amt, f(64), f(96));
  var amtL = text(comp, "label", "Paid collab", F.uiX, 52, C.white, 0, 1490, "C"); pos(amtL).setValue([540, 1490]);
  trim(amtL, f(70), f(96)); K(opa(amtL), [[f(70), 0], [f(74), 100]]);
  // whip pan out of A into B
  var wp0 = f(92), wp1 = f(100);
  KX(pos(pA), [[wp0, [540, 960]], [wp1, [540 - 1400, 960]]]);
  // BARTER: we arrive already inside the T and pull out
  var phB = proj.items.addComp("T1_Photo_B", W, H, 1, DUR, FPS); phB.parentFolder = fPre;
  cover(phB, imp(LK + "Perfume and Roses Display.png"), W / 2, H / 2, W * 1.2, H * 1.2);
  var sB = fitSize("BARTER", OB.comp, 1000);
  var tB = text(comp, "BARTER (matte)", "BARTER", OB.comp, sB, C.ink, 40, 960, "L");
  var bB = tB.sourceRectAtTime(0, false);
  var t3 = text(comp, "tmp", "BAR", OB.comp, sB, C.ink, 0, 0, "L"), t4 = text(comp, "tmp", "BART", OB.comp, sB, C.ink, 0, 0, "L");
  var tX = bB.left + (tw(t3) + tw(t4)) / 2 + 4, tY = bB.top + bB.height * 0.62; t3.remove(); t4.remove();
  tr(tB).property("ADBE Anchor Point").setValue([tX, tY]);
  var kB = tB.baseK, tSX = 40 + (tX - bB.left) * kB, tSY = 960 + (tY - (bB.top + bB.height / 2)) * kB;
  var pB = comp.layers.add(phB); pB.name = "Photo B (inside BARTER)"; pB.setTrackMatte(tB, TrackMatteType.ALPHA);
  K(pos(pB), [[wp0 + f(2), [540 + 1400, 960]], [wp1 + f(2), [540, 960]]], 10, 90);
  var po0 = f(104), po1 = f(124);
  K(scl(tB), [[po0, [4200 * kB, 4200 * kB]], [po1, [100 * kB, 100 * kB]]], 8, 92);
  K(pos(tB), [[po0, [540, 960]], [po1, [tSX, tSY]]], 8, 92);
  K(scl(pB), [[po0, [130, 130]], [po1, [100, 100]]], 8, 92);
  trim(tP, 0, wp1); trim(pA, 0, wp1); trim(tB, wp0, DUR); trim(pB, wp0, DUR);
  // directional blur on the whip
  var adjW = comp.layers.addSolid([1, 1, 1], "Whip blur", W, H, 1, DUR); adjW.adjustmentLayer = true;
  fx(adjW, "ADBE Motion Blur"); var db = adjW.property("ADBE Effect Parade").property(1);
  db.property(1).setValue(90); K(db.property(2), [[wp0 - f(2), 0], [wp0 + f(4), 160], [wp1 + f(4), 0]], 30, 30);
  grain(comp, 2.2);
  frames(comp, "T1", [f(4), f(8), f(16), f(40), f(52), f(58), f(62), f(66), f(72), f(88), f(96), f(100), f(108), f(116), f(140)]);
  log("T1 ok");

  // =====================================================================
  // T2 — THE CUT: the brand line slices the frame; halves shear apart to show the next scene.
  // =====================================================================
  comp = newComp("T2_The_cut");
  comp.openInViewer();
  function scene(name, photo, word, font, col, y, fit) {
    var c = proj.items.addComp(name, W, H, 1, DUR, FPS); c.parentFolder = fPre;
    if (photo) { var p = cover(c, imp(photo), W / 2, H / 2, W, H); K(scl(p), [[0, [scl(p).value[0] * 1.08, scl(p).value[1] * 1.08]], [DUR, scl(p).value]], 20, 60); }
    else solid(c, C.white, "BG");
    if (word) { var cmpSave = comp; comp = c; var t = ctext(c, word, word, font, fitSize(word, font, fit || 980), col, 540, y); comp = cmpSave; }
    return c;
  }
  var sA = scene("T2_Scene_A", LK + "DJ in Tropical Vibes HR.png", "PAID", OB.extd, C.white, 1560);
  var sBc = scene("T2_Scene_B", LK + "Perfume and Roses Display.png", "BARTER", OB.extd, C.lime, 380);
  var sC = scene("T2_Scene_C", LK + "Dessert in the Sky HR.png", "20% BACK", OB.comp, C.white, 420);
  var sD = proj.items.addComp("T2_Scene_D", W, H, 1, DUR, FPS); sD.parentFolder = fPre;
  solid(sD, C.white, "BG"); var wmD = sD.layers.add(wmIt); var wS = 760 / wmIt.width * 100; scl(wmD).setValue([wS, wS]); pos(wmD).setValue([540, 900]);
  var LLEN = 1500, LINE = lineComp(LLEN, 22);
  // one slice: scene `top` is cut along a line through (cx,cy) at angle a (deg); `under` is revealed
  function slice(topC, underC, t, cx, cy, a, keepLine) {
    var r = a * Math.PI / 180, dx = Math.cos(r), dy = Math.sin(r), nx = -dy, ny = dx;
    var under = comp.layers.add(underC); under.name = underC.name + " (revealed)";
    K(scl(under), [[t + f(8), [112, 112]], [t + f(26), [100, 100]]], 10, 90);
    var halves = [];
    for (var s = -1; s <= 1; s += 2) {
      var h = comp.layers.add(topC); h.name = topC.name + (s < 0 ? " half 1" : " half 2");
      var m = h.property("ADBE Mask Parade").addProperty("ADBE Mask Atom");
      var sh = new Shape(), L = 4000;
      sh.vertices = [[cx - dx * L, cy - dy * L], [cx + dx * L, cy + dy * L], [cx + dx * L + nx * L * s, cy + dy * L + ny * L * s], [cx - dx * L + nx * L * s, cy - dy * L + ny * L * s]];
      sh.closed = true; h.property("ADBE Mask Parade").property(1).property("ADBE Mask Shape").setValue(sh);
      // cut: a 3-frame shear along the line, a held beat of tension, then the halves leave
      var p0 = [540, 960], p1 = [540 + dx * 46 * s, 960 + dy * 46 * s], p2 = [540 + dx * 900 * s + nx * 1300 * s, 960 + dy * 900 * s + ny * 1300 * s];
      K(pos(h), [[t, p0, 5, 95], [t + f(3), p1, 70, 95], [t + f(8), p1, 90, 5], [t + f(20), p2, 90, 5]]);
      tr(h).property("ADBE Rotate Z").setValue(0);
      K(tr(h).property("ADBE Rotate Z"), [[t + f(8), 0], [t + f(20), 7 * s]], 90, 5);
      h.motionBlur = true; trim(h, t, t + f(21)); halves.push(h);
    }
    // the line: shoots across in 4 frames ahead of the cut
    var ln = comp.layers.add(LINE); ln.name = "Line " + topC.name; pos(ln).setValue([cx, cy]); tr(ln).property("ADBE Rotate Z").setValue(a);
    var st = comp.layers.addShape(); st.name = "Line stroke " + topC.name;
    var g = st.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    g = st.property("ADBE Root Vectors Group").property(1); g.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Group");
    var sp = new Shape(); sp.vertices = [[-LLEN / 2, 0], [LLEN / 2, 0]]; sp.closed = false;
    st.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property(1).property("ADBE Vector Shape").setValue(sp);
    st.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
    st.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property(2).property("ADBE Vector Stroke Width").setValue(18);
    st.property("ADBE Root Vectors Group").addProperty("ADBE Vector Filter - Trim");
    var tm = st.property("ADBE Root Vectors Group").property(2);
    st.parent = ln; tr(st).property("ADBE Anchor Point").setValue([0, 0]); pos(st).setValue([LLEN / 2, 11]); tr(st).property("ADBE Rotate Z").setValue(0);
    K(tm.property("ADBE Vector Trim End"), [[t - f(5), 0], [t - f(1), 100]], 10, 90);
    if (!keepLine) {
      K(tm.property("ADBE Vector Trim Start"), [[t + f(8), 0], [t + f(16), 100]], 60, 20);
    } else {
      // final: the line contracts into the logo's underline
      var ks = 760 / LLEN * 100;
      K(scl(ln), [[t + f(10), [100, 100]], [t + f(26), [ks, 100]]], 20, 90);
      K(pos(ln), [[t + f(10), [cx, cy]], [t + f(26), [540, 900 + 135]]], 20, 90);
    }
    ln.setTrackMatte(st, TrackMatteType.ALPHA);
    trim(ln, t - f(6), keepLine ? DUR : t + f(17)); trim(st, t - f(6), keepLine ? DUR : t + f(17));
    // a 1-frame flash of lime along the seam on impact
    return under;
  }
  var first = comp.layers.add(sA); first.name = "Scene A"; trim(first, 0, f(22));
  K(scl(first), [[0, [108, 108]], [f(22), [100, 100]]], 10, 90);
  var u1 = slice(sA, sBc, f(22), 540, 980, -18); trim(u1, f(22), f(60));
  var u2 = slice(sBc, sC, f(60), 540, 940, 24); trim(u2, f(60), f(100));
  var u3 = slice(sC, sD, f(100), 540, 1035, 0, true); trim(u3, f(100), DUR);
  // the top halves must sit above the revealed scenes: reorder so each slice's layers are above the last
  grain(comp, 2.0);
  frames(comp, "T2", [f(6), f(18), f(21), f(24), f(28), f(34), f(48), f(58), f(63), f(70), f(90), f(103), f(110), f(126), f(146)]);
  log("T2 ok");

  // =====================================================================
  // T3 — THE GRID: a profile grid scrolls with momentum; one post is chosen, the rest fly past camera.
  // =====================================================================
  comp = newComp("T3_The_grid");
  comp.openInViewer();
  solid(comp, C.white, "BG");
  var cam = comp.layers.addCamera("Camera", [540, 960]);
  var zoom = cam.property("ADBE Camera Options Group").property("ADBE Camera Zoom").value;
  cam.property("ADBE Camera Options Group").property("ADBE Camera Depth of Field").setValue(1);
  cam.property("ADBE Camera Options Group").property("ADBE Camera Focus Distance").setValue(zoom);
  cam.property("ADBE Camera Options Group").property("ADBE Camera Aperture").setValue(90);
  var photos = ["Joyful Connection HR.png", "Sporty Duo Portrait HR.png", "Celebrity Arrival Scene HR.png", "Man with Smartphone Outdoors HR.png", "DJ in Tropical Vibes HR.png", "Verdant Canopy Textures HR.png",
    "Fashionable Youth HR.png", "Dessert in the Sky HR.png", "Luxurious Red Leather HR.png", "Perfume and Roses Display.png", "Dramatic Light Portrait.png", "Focused Woman in Crowd.png"];
  var G = 6, TW = (W - 2 * G) / 3, TH = TW * 4 / 3;
  var gridN = comp.layers.addNull(DUR); gridN.name = "Grid rig"; gridN.threeDLayer = true; pos(gridN).setValue([0, 0, 0]);
  var tiles = [], ROWS = 7, CHOSEN = 3 * 3 + 1; // row 3, middle column
  for (var i = 0; i < ROWS * 3; i++) {
    var r = Math.floor(i / 3), c = i % 3;
    var tc = proj.items.addComp("Tile_" + i, Math.round(TW), Math.round(TH), 1, DUR, FPS); tc.parentFolder = fPre;
    cover(tc, imp(LK + (i == CHOSEN ? "Sporty Duo Portrait HR.png" : photos[i % photos.length])), TW / 2, TH / 2, TW, TH); if (i == CHOSEN) var chosenComp = tc;
    var tl = comp.layers.add(tc); tl.name = "Tile " + i; tl.threeDLayer = true; tl.parent = gridN; tl.motionBlur = true;
    pos(tl).setValue([c * (TW + G) + TW / 2, r * (TH + G) + TH / 2, 0]);
    tiles.push(tl);
  }
  // the chosen tile's centre must land at screen centre when the scroll stops
  var ch = tiles[CHOSEN], chP = ch.property("ADBE Transform Group").property("ADBE Position").value;
  var endY = 960 - chP[1], startY = endY + 2600;
  // flick: very fast, then a long friction brake with a small overshoot (scroll physics)
  K(pos(gridN), [[0, [0, startY, 0], 2, 70], [f(26), [0, endY - 40, 0], 40, 96], [f(34), [0, endY, 0], 50, 80]]);
  K(pos(cam), [[0, [540, 960, -zoom * 1.25]], [f(34), [540, 960, -zoom]]], 10, 90);
  // chosen: lime frame snaps on
  var fr = rect(comp, "Chosen frame", TW + 18, TH + 18, 0, C.lime, 540, 960, 9);
  K(opa(fr), [[f(36), 0], [f(37), 100], [f(46), 100], [f(48), 0]]);
  K(rSize(fr), [[f(36), [TW + 80, TH + 80]], [f(40), [TW + 18, TH + 18]]], 5, 95);
  // the rest of the grid flies past the camera, nearest first
  for (var i = 0; i < tiles.length; i++) {
    if (i == CHOSEN) continue;
    var p = tiles[i].property("ADBE Transform Group").property("ADBE Position"), pv = p.value;
    var d = Math.sqrt(Math.pow(pv[0] - chP[0], 2) + Math.pow(pv[1] - chP[1], 2));
    var t0 = f(44) + d / 3000;
    var away = [pv[0] + (pv[0] - chP[0]) * 0.8, pv[1] + (pv[1] - chP[1]) * 0.8, -zoom * 1.4];
    DIVE(p, [[t0, pv], [t0 + f(14), away]]);
    KX(opa(tiles[i]), [[t0 + f(9), 100], [t0 + f(14), 0]]);
    K(tr(tiles[i]).property("ADBE Rotate Y"), [[t0, 0], [t0 + f(14), (pv[0] < chP[0] ? -35 : 35)]], 85, 8);
  }
  // chosen tile takes the screen (scaled about its centre, in place)
  // takeover happens on a 2D copy so the camera's perspective never skews it
  var sc1 = Math.max(W / TW, H / TH) * 100 + 2;
  var big = comp.layers.add(chosenComp); big.name = "Chosen takeover (2D)"; pos(big).setValue([540, 960]); big.motionBlur = true;
  K(scl(big), [[f(50), [100, 100]], [f(64), [sc1, sc1]]], 70, 95);
  trim(big, f(50), DUR); trim(ch, 0, f(51));
  // kinetic stack: five rows of GET PAID, outlines drift opposite ways, the middle one is solid
  var sz = fitSize("GET PAID", OB.comp, 1000), rows = [];
  var hh = 0;
  for (var k = -2; k <= 2; k++) {
    var t = ctext(comp, "Stack " + k, "GET PAID", OB.comp, sz, C.white, 540, 960);
    if (hh == 0) hh = th(t) * 1.04;
    if (k != 0) outline(t, 4);
    pos(t).setValue([540, 960 + k * hh]);
    var dir = (k % 2 == 0) ? 1 : -1;
    K(pos(t), [[f(66), [540 - dir * 120, 960 + k * hh * 1.6]], [f(76), [540, 960 + k * hh]], [f(104), [540 + dir * 60, 960 + k * hh]], [f(112), [540, 960]]], 8, 92);
    if (k != 0) { K(opa(t), [[f(64), 0], [f(68), 100], [f(104), 100], [f(112), 0]]); trim(t, f(64), f(113)); }
    else { trim(t, f(64), DUR); widthCycle(t, f(112) - f(2), [OB.comp, OB.cond, OB.narw, OB.reg, OB.wide, OB.extd], f(2)); }
    rows.push(t);
  }
  // end: the solid line resizes to fit after the width cycle
  var mid = rows[2];
  var sExt = fitSize("GET PAID", OB.extd, 980) / sz * 100;
  K(scl(mid), [[f(112), [100, 100]], [f(122), [sExt, sExt]]], 5, 95);
  K(opa(mid), [[f(64), 0], [f(66), 100]]);
  grain(comp, 2.2);
  frames(comp, "T3", [f(4), f(12), f(24), f(34), f(38), f(46), f(50), f(54), f(60), f(70), f(84), f(108), f(114), f(124), f(146)]);
  log("T3 ok");

  proj.save(new File(ROOT + "film/Following_Motion_Territories_v01.aep"));
  log("saved");
} catch (e) { log("ERROR line " + e.line + ": " + e.toString()); }
flush();
