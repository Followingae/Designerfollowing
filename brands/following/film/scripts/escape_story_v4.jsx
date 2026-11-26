// Following x horror escape room (client unnamed). Story 1 of 3, 1080 x 1920, 12 s.
// Idea: a Following hand presses the button and the lights go out. The Story starts as a normal loud Following
// Story, the press kills the colour, the candle room flickers on, and the next press floods the colour back.
// Built only from the static system: Plus Jakarta ExtraBold line + MediumItalic line, each line scaled to the full
// measure, grounds from the palette, pill tags, the hands. Runs in the open AE session.
// Link sticker zone 72,1420 600x150 stays clear of key type.
var LOGNAME = "escape_log.txt";
#include "ae_lib.jsx"
DUR = 12;
function f(n) { return n / FPS; }
var FX = "PlusJakartaSans-ExtraBold", FI = "PlusJakartaSansItalic-MediumItalic";
var fAssets, fPre, M = 72, MEAS = 936;
function SNAP(p, keys) { K(p, keys, 5, 95); }
function HOLDK(p) { for (var i = 1; i <= p.numKeys; i++) p.setInterpolationTypeAtKey(i, KeyframeInterpolationType.HOLD, KeyframeInterpolationType.HOLD); }
function holds(p, keys) { for (var i = 0; i < keys.length; i++) p.setValueAtTime(keys[i][0], keys[i][1]); HOLDK(p); }
function imp(file) { var it = proj.importFile(new ImportOptions(new File(file))); it.parentFolder = fAssets; return it; }
function hex(h) { return [parseInt(h.substr(0, 2), 16) / 255, parseInt(h.substr(2, 2), 16) / 255, parseInt(h.substr(4, 2), 16) / 255]; }
var COL = { ink: hex("050911"), white: [1, 1, 1], lime: hex("D3FF02"), orange: hex("FF6A13"), violet: hex("5100F3"), pink: hex("FF3EA5"), forest: hex("1E3F20") };

// baseline-anchored left text, the Illustrator way
function bt(cp, name, str, font, size, col, x, y, track) {
  var l = cp.layers.addText(str); l.name = name;
  var sp = l.property("ADBE Text Properties").property("ADBE Text Document"), d = sp.value;
  d.resetCharStyle(); d.resetParagraphStyle(); d.font = font; d.fontSize = size; d.applyFill = true; d.fillColor = col; d.applyStroke = false;
  d.tracking = track || 0; d.justification = ParagraphJustification.LEFT_JUSTIFY; sp.setValue(d);
  if (sp.value.font != font) log("FONT MISS " + name + " " + sp.value.font);
  tr(l).property("ADBE Anchor Point").setValue([0, 0]); pos(l).setValue([x, y]); l.motionBlur = true; return l;
}
function inkW(cp, str, font, size, track) { var l = bt(cp, "tmp", str, font, size, COL.white, 0, 0, track), w = l.sourceRectAtTime(0, false).width; l.remove(); return w; }
function wrap(s, max) { var w = s.split(" "), out = [], c = "", i; for (i = 0; i < w.length; i++) { if (c && (c + " " + w[i]).length > max) { out.push(c); c = w[i]; } else c = c ? c + " " + w[i] : w[i]; } if (c) out.push(c); return out; }
// the poster stack (ST.big): every line scaled to the full measure; ExtraBold first, MediumItalic second
// t: reveal time; each line rises out of its own slot, 3 frames apart. Returns {layers, slots, bottom, top}
function stack(cp, l1, l2, col, top, maxH, bottom, cap, t, nm) {
  var L = [], i, a = wrap(l1, 11), b = l2 ? wrap(l2, 18) : [];
  for (i = 0; i < a.length; i++) L.push([a[i], false]); for (i = 0; i < b.length; i++) L.push([b[i], true]);
  var sz = [], total = 0;
  for (i = 0; i < L.length; i++) { var w = inkW(cp, L[i][0], L[i][1] ? FI : FX, 100, L[i][1] ? -28 : -36); sz[i] = Math.min(cap || 300, 100 * MEAS / w); total += sz[i] * 0.96; }
  var k = total > maxH ? maxH / total : 1, y = bottom ? bottom - total * k : top, out = { layers: [], slots: [], top: y };
  for (i = 0; i < L.length; i++) {
    var s = sz[i] * k, base = y + s * 0.76;
    var l = bt(cp, (nm || "line") + " " + L[i][0], L[i][0], L[i][1] ? FI : FX, s, col, M, base, L[i][1] ? -28 : -36);
    var slot = rect(cp, l.name + " slot", W + 200, s * 1.02, 0, COL.white, 540, base - s * 0.34);
    slot.moveBefore(l); l.setTrackMatte(slot, TrackMatteType.ALPHA);
    var tt = t + i * f(3);
    K(pos(l), [[tt, [M, base + s * 1.05]], [tt + f(7), [M, base]]], 4, 96);
    trim(l, tt, null); trim(slot, tt, null);
    out.layers.push(l); out.slots.push(slot); y += s * 0.96;
  }
  out.bottom = y; return out;
}
function setOut(st, t) { for (var i = 0; i < st.layers.length; i++) { st.layers[i].outPoint = t; st.slots[i].outPoint = t; } }
// lines leave downward through their slots, last line first
function stackExit(st, t) { var n = st.layers.length; for (var i = 0; i < n; i++) { var l = st.layers[n - 1 - i], p = pos(l).valueAtTime(t, false), h = l.sourceRectAtTime(0, false).height; KX(pos(l), [[t + i * f(2), p], [t + i * f(2) + f(6), [p[0], p[1] + h * 1.1]]]); } setOut(st, t + n * f(2) + f(7)); }
// pill tag (P.tag): ExtraBold -10, pill = text + 1.5 x size wide, 1.95 x size tall
function tag(cp, str, fill, ink, size, rot, cx, cy, t, t1) {
  var tw = inkW(cp, str, FX, size, -10);
  var n = cp.layers.addNull(DUR); n.name = "TAG " + str; pos(n).setValue([cx, cy]);
  var r = rect(cp, "pill " + str, tw + size * 1.5, size * 1.95, size * 0.975, fill, 0, 0);
  var x = bt(cp, "tag " + str, str, FX, size, ink, -tw / 2, size * 0.35, -10);
  r.parent = n; x.parent = n; pos(r).setValue([0, 0]); pos(x).setValue([-tw / 2, size * 0.35]);
  K(scl(n), [[t, [175, 175]], [t + f(5), [92, 92]], [t + f(9), [100, 100]]], 10, 80);
  K(tr(n).property("ADBE Rotate Z"), [[t, rot - 16], [t + f(6), rot]], 10, 85);
  trim(r, t, t1); trim(x, t, t1); return n;
}
function ground(cp, col, name, t0, t1) { var s = solid(cp, col, name); trim(s, t0, t1); return s; }
function logo(cp, it, col, t0, t1) {
  var l = cp.layers.add(it); l.name = "LOGO " + t0;
  fx(l, "ADBE Fill"); try { l.property("ADBE Effect Parade").property(1).property(3).setValue(col); } catch (e) { log("fill " + e); }
  tr(l).property("ADBE Anchor Point").setValue([0, 0]); var k = 280 / it.width * 100; scl(l).setValue([k, k]); pos(l).setValue([M, 262]);
  trim(l, t0, t1); return l;
}
// hand: anchored at the bottom centre, 420 wide, sits on the bottom edge like the stills
function handL(cp, it, name, x) {
  var l = cp.layers.add(it); l.name = name; l.motionBlur = true;
  var k = 420 / it.width * 100; scl(l).setValue([k, k]); l.hk = k;
  tr(l).property("ADBE Anchor Point").setValue([it.width / 2, it.height]); pos(l).setValue([x, H]);
  return l;
}
// a press: lift (anticipation), drive down, squash, release
function pressKeys(l, ts) {
  var k = l.hk, x = pos(l).value[0], sk = [], pk = [];
  for (var i = 0; i < ts.length; i++) {
    var t = ts[i];
    pk.push([t - f(6), [x, H]]); pk.push([t - f(2), [x, H - 34]]); pk.push([t, [x, H + 26]]); pk.push([t + f(7), [x, H]]);
    sk.push([t - f(2), [k * 0.97, k * 1.04]]); sk.push([t, [k * 1.05, k * 0.88]]); sk.push([t + f(7), [k, k]]);
  }
  return { p: pk, s: sk };
}

app.beginUndoGroup("escape v4");
try {
  proj = app.project;
  for (var r = proj.renderQueue.numItems; r >= 1; r--) proj.renderQueue.item(r).remove();
  for (var i = proj.numItems; i >= 1; i--) { var it = proj.item(i); if (it.name.indexOf("ESC") == 0 && !(it instanceof FolderItem)) it.remove(); }
  for (var i = proj.numItems; i >= 1; i--) { var it = proj.item(i); if (it.name.indexOf("ESC") == 0) it.remove(); }
  fAssets = proj.items.addFolder("ESC Assets"); fPre = proj.items.addFolder("ESC Precomps");
  var vid = imp(ROOT + "film/assets/esc_room_loop.mp4");
  var logoIt = imp(ROOT + "film/assets/following_wordmark.ai");
  var pinkIt = imp(ROOT + "social/assets/illustration/h_pink_button.png");
  var peaceIt = imp(ROOT + "social/assets/illustration/h_blue_peace.png");

  var room = proj.items.addComp("ESC ROOM loop", W, H, 1, DUR, FPS); room.parentFolder = fPre;
  var rv = room.layers.add(vid); rv.timeRemapEnabled = true;
  rv.property("ADBE Time Remapping").expression = 'loopOut("pingpong")'; rv.outPoint = DUR;
  var s0 = Math.max(W / vid.width, H / vid.height) * 104; scl(rv).setValue([s0, s0]);
  scl(rv).expression = 'var k = 1 + time * 0.010; [value[0] * k, value[1] * k]'; pos(rv).setValue([W / 2, H / 2 - 40]);

  comp = proj.items.addComp("ESC_01_Story", W, H, 1, DUR, FPS);
  comp.bgColor = COL.ink; comp.motionBlur = true; comp.shutterAngle = 200; comp.shutterPhase = -100;
  comp.openInViewer();
  var bg = ground(comp, COL.ink, "BG ink", 0, DUR);

  // ================= A 0-2.2  a normal Following Story. The hand presses the button =================
  var TA = 2.20;
  var gA = ground(comp, COL.lime, "GROUND lime A", 0, 2.40);
  var stA = stack(comp, "Scared", "of the dark?", COL.ink, 400, 700, 0, 280, f(4), "A");
  var lgA = logo(comp, logoIt, COL.ink, 0, 2.40);
  var hA = handL(comp, pinkIt, "HAND pink A", 870);
  var pa = pressKeys(hA, [TA]);
  K(pos(hA), [[0.55, [870, H + 760]], [0.95, [870, H]]].concat(pa.p), 6, 92);
  K(scl(hA), pa.s, 20, 80); trim(hA, 0.55, 2.40);
  // the lights go out: everything flickers on the same hold keys, then dark
  var fl = [[TA, 100], [TA + f(1), 0], [TA + f(3), 100], [TA + f(5), 0], [TA + f(6), 55], [TA + f(7), 0]];
  var dieA = [gA, lgA, hA].concat(stA.layers);
  for (var i = 0; i < dieA.length; i++) holds(opa(dieA[i]), fl);
  setOut(stA, 2.40);

  // ================= B 2.75-5.0  the candle room flickers on. Horror escape room. Abu Dhabi. =================
  var TB = 2.75;
  var rB = comp.layers.add(room); rB.name = "ROOM B"; rB.moveBefore(bg); trim(rB, TB, 5.30);
  holds(opa(rB), [[TB, 45], [TB + f(1), 0], [TB + f(3), 80], [TB + f(4), 10], [TB + f(6), 100]]);
  K(scl(rB), [[TB, [116, 116]], [5.3, [100, 100]]], 15, 70);
  var stB = stack(comp, "Horror escape room.", "In Abu Dhabi.", COL.white, 0, 640, 1300, 260, TB + f(10), "B");
  var tgB = tag(comp, "BARTER COLLAB", COL.lime, COL.ink, 50, -6, 300, stB.top - 70, 3.70, 5.0);
  var lgB = logo(comp, logoIt, COL.white, TB + f(6), DUR);

  // ================= C 5.0-8.1  split: You play. / We film it. =================
  var TC = 5.0;
  stackExit(stB, TC - f(4));
  var pan = solid(comp, COL.lime, "PANEL lime C", W, 960); trim(pan, TC, 8.40);
  SNAP(pos(pan), [[TC, [540, H + 480]], [TC + f(9), [540, 1440]]]);
  var dimC = solid(comp, COL.ink, "DIM room C", W, 960); trim(dimC, TC, 8.40); opa(dimC).setValue(18); pos(dimC).setValue([540, 480]);
  dimC.moveBefore(rB); pan.moveBefore(dimC);
  var rC = comp.layers.add(room); rC.name = "ROOM C"; rC.moveBefore(bg); trim(rC, 5.30, 8.40);
  var stC1 = stack(comp, "You play.", "", COL.white, 0, 320, 900, 250, TC + f(6), "C1");
  var stC2 = stack(comp, "We film it.", "", COL.ink, 1060, 320, 0, 250, TC + f(12), "C2");
  var sub = bt(comp, "sub 1", "Horror escape room for two,", FI, 42, COL.ink, M, stC2.bottom + 52, -10);
  var sub2 = bt(comp, "sub 2", "plus your gameplay, fully edited.", FI, 42, COL.ink, M, stC2.bottom + 106, -10);
  K(opa(sub), [[5.9, 0], [5.9 + f(4), 100]]); K(opa(sub2), [[5.95, 0], [5.95 + f(4), 100]]);
  trim(sub, 5.9, 8.40); trim(sub2, 5.95, 8.40);
  var tgC = tag(comp, "WORTH AED 660", COL.ink, COL.lime, 50, -5, 700, 980, 6.30, 8.40);
  var hP = handL(comp, peaceIt, "HAND peace C", 890);
  K(pos(hP), [[6.75, [890, H + 760]], [7.05, [890, H + 20]]], 6, 92);
  K(tr(hP).property("ADBE Rotate Z"), [[7.05, 0], [7.15, 9], [7.27, -7], [7.39, 4], [7.5, 0]], 30, 70);
  KX(pos(hP), [[7.70, [890, H + 20]], [7.86, [890, H + 760]]]);
  trim(hP, 6.75, 7.9);
  setOut(stC1, 8.40); setOut(stC2, 8.40);

  // ================= D 8.0-12  the next press floods the colour back. Brave enough? Apply below. =================
  var TD = 8.10;
  var hD = handL(comp, pinkIt, "HAND pink D", 870);
  var pd = pressKeys(hD, [TD, 9.95, 10.75, 11.55]);
  K(pos(hD), [[7.75, [870, H + 760]], [7.98, [870, H]]].concat(pd.p), 6, 92);
  K(scl(hD), pd.s, 20, 80); trim(hD, 7.75, DUR);
  // orange floods out from the button
  var btn = [870 - 21, H - 79];
  var fl2 = comp.layers.addShape(); fl2.name = "FLOOD orange";
  var gg = fl2.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
  gg.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
  fl2.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property(1).property("ADBE Vector Ellipse Size").setValue([100, 100]);
  fl2.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Fill");
  fl2.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property(2).property("ADBE Vector Fill Color").setValue(COL.orange);
  pos(fl2).setValue(btn); K(scl(fl2), [[TD, [0, 0]], [TD + f(9), [5200, 5200]]], 5, 95); trim(fl2, TD, DUR);
  fl2.moveBefore(pan); fl2.motionBlur = true;
  var stD = stack(comp, "Brave enough?", "Apply below.", COL.ink, 400, 760, 0, 280, TD + f(8), "D");
  var lgD = logo(comp, logoIt, COL.ink, TD + f(5), DUR); lgB.outPoint = TD + f(5);
  hD.moveToBeginning();
  // ripple: two thin ink rings off the button on each press after the flood
  var rings = [9.95, 10.75, 11.55];
  for (var i = 0; i < rings.length; i++) {
    var rg = comp.layers.addShape(); rg.name = "RING " + i;
    var g2 = rg.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
    g2.property("ADBE Vectors Group").addProperty("ADBE Vector Shape - Ellipse");
    rg.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property(1).property("ADBE Vector Ellipse Size").setValue([100, 100]);
    rg.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").addProperty("ADBE Vector Graphic - Stroke");
    var stp = rg.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property(2);
    stp.property("ADBE Vector Stroke Color").setValue(COL.ink); stp.property("ADBE Vector Stroke Width").setValue(3);
    pos(rg).setValue(btn); K(scl(rg), [[rings[i], [60, 60]], [rings[i] + f(14), [900, 900]]], 5, 90);
    K(opa(rg), [[rings[i], 90], [rings[i] + f(14), 0]], 30, 30); trim(rg, rings[i], rings[i] + f(15)); rg.moveAfter(hD);
  }

  var gr = solid(comp, [1, 1, 1], "FINISH grain"); gr.adjustmentLayer = true; fx(gr, "ADBE Noise");
  var nz = gr.property("ADBE Effect Parade").property(1);
  for (var q = 1; q <= nz.numProperties; q++) { var nm = nz.property(q).name; if (nm.indexOf("Amount") >= 0) nz.property(q).setValue(1.6); if (nm.indexOf("Color") >= 0) { try { nz.property(q).setValue(0); } catch (e) { } } }
  gr.moveToBeginning();

  proj.save(new File(ROOT + "film/Following_Escape_Story_v04.aep"));
  log("OK saved");
  var fo = new Folder(ROOT + "film/frames_escape"); fo.create();
  var ts = [0.2, 0.5, 1.0, 2.05, 2.2, 2.25, 2.5, 2.8, 3.1, 3.6, 4.2, 4.9, 5.2, 5.6, 6.1, 6.5, 7.2, 7.95, 8.15, 8.3, 8.7, 9.5, 10.0, 11.8];
  for (var i = 0; i < ts.length; i++) comp.saveFrameToPng(ts[i], new File(fo.fsName + "/v4_" + ("00" + Math.round(ts[i] * 30)).slice(-3) + ".png"));
  log("frames done");
  app.endUndoGroup();
  var rq = proj.renderQueue.items.add(comp), om = rq.outputModule(1);
  for (var i = 0; i < om.templates.length; i++) if (om.templates[i].indexOf("15 Mbps") >= 0) om.applyTemplate(om.templates[i]);
  om.file = new File(ROOT + "film/exports/ESC_01_Story_v4.mp4");
  proj.renderQueue.render();
  log("render done");
  proj.save();
} catch (e) {
  log("ERROR line " + e.line + ": " + e.toString());
  try { app.endUndoGroup(); } catch (x) { }
}
flush();
