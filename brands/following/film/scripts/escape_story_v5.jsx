// Following x horror escape room (client unnamed). Story 1 of 3, 1080 x 1920, 12 s. Approved idea 2026-11-02:
// a calm Following white page loses power; the candle room flickers on full bleed; tags jolt loose on the scare and
// slap back on with the offer; the lights snap back to the white page with the ask. Locked Instagram language only:
// Plus Jakarta ExtraBold + MediumItalic, stuck-on pill tags, caption line, wordmark. Runs in the open AE session;
// adds new items only (nothing is deleted).
var LOGNAME = "escape_log.txt";
#include "ae_lib.jsx"
DUR = 12;
function f(n) { return n / FPS; }
var FX = "PlusJakartaSans-ExtraBold", FI = "PlusJakartaSansItalic-MediumItalic", FM = "PlusJakartaSans-Medium";
var M = 72, MEAS = 936, fAssets, fPre, TAG = 52;
function hex(h) { return [parseInt(h.substr(0, 2), 16) / 255, parseInt(h.substr(2, 2), 16) / 255, parseInt(h.substr(4, 2), 16) / 255]; }
var COL = { ink: hex("050911"), white: [1, 1, 1], lime: hex("D3FF02"), violet: hex("5100F3") };
function HOLDK(p) { for (var i = 1; i <= p.numKeys; i++) p.setInterpolationTypeAtKey(i, KeyframeInterpolationType.HOLD, KeyframeInterpolationType.HOLD); }
function holds(p, keys) { for (var i = 0; i < keys.length; i++) p.setValueAtTime(keys[i][0], keys[i][1]); HOLDK(p); }
function imp(file) { var it = proj.importFile(new ImportOptions(new File(file))); it.parentFolder = fAssets; return it; }

function bt(cp, name, str, font, size, col, x, y, track) {
  var l = cp.layers.addText(str); l.name = name;
  var sp = l.property("ADBE Text Properties").property("ADBE Text Document"), d = sp.value;
  d.resetCharStyle(); d.resetParagraphStyle(); d.font = font; d.fontSize = size; d.applyFill = true; d.fillColor = col; d.applyStroke = false;
  d.tracking = track || 0; d.justification = ParagraphJustification.LEFT_JUSTIFY; sp.setValue(d);
  if (sp.value.font != font) log("FONT MISS " + name + " " + sp.value.font);
  tr(l).property("ADBE Anchor Point").setValue([0, 0]); pos(l).setValue([x, y]); l.motionBlur = true; return l;
}
function inkW(cp, str, font, size, track) { var l = bt(cp, "tmp", str, font, size, COL.white, 0, 0, track), w = l.sourceRectAtTime(0, false).width; l.remove(); return w; }
// headline: ExtraBold line, MediumItalic line (P.head), shrunk together to the measure. Each line rises out of its slot.
function head(cp, l1, l2, size, col, base, t, nm, gap) {
  var w = Math.max(inkW(cp, l1, FX, size, -36), l2 ? inkW(cp, l2, FI, size, -28) : 0);
  if (w > MEAS) size = size * MEAS / w;
  var L = [[l1, FX, -36, base]]; if (l2) L.push([l2, FI, -28, base + size * 1.05]);
  var out = { lines: [], slots: [], size: size };
  for (var i = 0; i < L.length; i++) {
    var l = bt(cp, nm + " " + L[i][0], L[i][0], L[i][1], size, col, M, L[i][3], L[i][2]);
    var s = rect(cp, l.name + " slot", W + 200, size * 1.12, 0, COL.white, 540, L[i][3] - size * 0.32);
    s.moveBefore(l); l.setTrackMatte(s, TrackMatteType.ALPHA);
    var tt = t + i * (gap || f(9));
    K(pos(l), [[tt, [M, L[i][3] + size * 1.15]], [tt + f(8), [M, L[i][3]]]], 4, 96);
    trim(l, tt, null); trim(s, tt, null);
    out.lines.push(l); out.slots.push(s);
  }
  return out;
}
function lineOut(o, i, t) { var l = o.lines[i], p = pos(l).valueAtTime(t + f(1), false); KX(pos(l), [[t, p], [t + f(6), [p[0], p[1] + o.size * 1.15]]]); l.outPoint = t + f(7); o.slots[i].outPoint = t + f(7); }
function headOut(o, t) { for (var i = o.lines.length - 1; i >= 0; i--) lineOut(o, i, t + (o.lines.length - 1 - i) * f(2)); }
function setOut(o, t) { for (var i = 0; i < o.lines.length; i++) { o.lines[i].outPoint = t; o.slots[i].outPoint = t; } }
// stuck-on pill tag (P.tag). Slaps on from above, overshoots, settles at its angle
function tag(cp, str, fill, ink, cx, cy, rot, t) {
  var tw = inkW(cp, str, FX, TAG, -10);
  var n = cp.layers.addNull(DUR); n.name = "TAG " + str + " " + t; pos(n).setValue([cx, cy]);
  var r = rect(cp, "pill " + str, tw + TAG * 1.5, TAG * 1.95, TAG * 0.975, fill, 0, 0);
  var x = bt(cp, "tag " + str, str, FX, TAG, ink, 0, 0, -10);
  r.parent = n; x.parent = n; pos(r).setValue([0, 0]); pos(x).setValue([-tw / 2, TAG * 0.35]);
  r.motionBlur = true; x.motionBlur = true;
  K(pos(n), [[t, [cx - 30, cy - 90]], [t + f(4), [cx, cy]]], 5, 95);
  K(scl(n), [[t, [168, 168]], [t + f(4), [91, 91]], [t + f(8), [102, 102]], [t + f(11), [100, 100]]], 8, 80);
  K(tr(n).property("ADBE Rotate Z"), [[t, rot - 14], [t + f(5), rot + 2], [t + f(9), rot]], 8, 85);
  trim(r, t, DUR); trim(x, t, DUR);
  return { n: n, parts: [r, x], cx: cx, cy: cy, rot: rot };
}
function tagOut(tg, t) { for (var i = 0; i < tg.parts.length; i++) tg.parts[i].outPoint = t; }
// the scare: a 2-frame jolt, then the tag falls off with gravity and a spin
function tagFall(tg, t, dir) {
  var p = pos(tg.n), rz = tr(tg.n).property("ADBE Rotate Z");
  p.setValueAtTime(t, [tg.cx, tg.cy]); p.setValueAtTime(t + f(2), [tg.cx + 26 * dir, tg.cy - 34]);
  KX(p, [[t + f(3), [tg.cx + 26 * dir, tg.cy - 34]], [t + f(16), [tg.cx + 220 * dir, tg.cy + 1500]]]);
  rz.setValueAtTime(t, tg.rot); rz.setValueAtTime(t + f(2), tg.rot + 9 * dir);
  KX(rz, [[t + f(3), tg.rot + 9 * dir], [t + f(16), tg.rot + 70 * dir]]);
  tagOut(tg, t + f(17));
}
function logo(cp, it, col, x, y, t0, t1) {
  var l = cp.layers.add(it); l.name = "LOGO " + t0;
  fx(l, "ADBE Fill"); try { l.property("ADBE Effect Parade").property(1).property(3).setValue(col); } catch (e) { log("fill " + e); }
  tr(l).property("ADBE Anchor Point").setValue([0, 0]); var k = 200 / it.width * 100; scl(l).setValue([k, k]); pos(l).setValue([x, y]);
  trim(l, t0, t1); return l;
}
function caption(cp, str, y, t, t1) {
  var l = bt(cp, "caption " + t, str, FM, 38, COL.ink, M, y, 0);
  K(opa(l), [[t, 0], [t + f(6), 100]], 20, 80); K(pos(l), [[t, [M, y + 24]], [t + f(8), [M, y]]], 5, 95); trim(l, t, t1); return l;
}

app.beginUndoGroup("escape v5");
try {
  proj = app.project;
  fAssets = proj.items.addFolder("ESC5 Assets"); fPre = proj.items.addFolder("ESC5 Precomps");
  var vid = imp(ROOT + "film/assets/esc_room_loop.mp4");
  var logoIt = imp(ROOT + "film/assets/following_wordmark.ai");

  var room = proj.items.addComp("ESC5 ROOM loop", W, H, 1, DUR, FPS); room.parentFolder = fPre;
  var rv = room.layers.add(vid); rv.timeRemapEnabled = true;
  rv.property("ADBE Time Remapping").expression = 'loopOut("pingpong")'; rv.outPoint = DUR;
  var s0 = Math.max(W / vid.width, H / vid.height) * 102; scl(rv).setValue([s0, s0]); pos(rv).setValue([W / 2, H / 2]);

  comp = proj.items.addComp("ESC5_01_Story", W, H, 1, DUR, FPS);
  comp.bgColor = COL.ink; comp.motionBlur = true; comp.shutterAngle = 200; comp.shutterPhase = -100;
  comp.openInViewer();
  var bg = solid(comp, COL.ink, "BG ink");

  // ============ 1. 0-2.7  the white page ============
  var CUT = 2.50;
  var wA = solid(comp, COL.white, "PAGE white A"); trim(wA, 0, 2.75);
  var hA = head(comp, "Escape room", "for two.", 150, COL.ink, 560, f(3), "A", f(10));
  var tA1 = tag(comp, "BARTER COLLAB", COL.lime, COL.ink, 800, 300, 6, 0.85);
  var tA2 = tag(comp, "HORROR", COL.white, COL.ink, 330, 1060, -5, 1.05);
  // the white tag needs a keyline on white, the way the grid's white tags sit on photos
  var capA = caption(comp, "Somewhere in Abu Dhabi. Lights stay on. Mostly.", 1200, 1.35, 2.75);
  var lgA = logo(comp, logoIt, COL.ink, 1080 - M - 200, 1500, 0, 2.75);
  // ============ 2. the power cut: the bulb fails, tags jolt, dark ============
  var dark = solid(comp, COL.ink, "POWER CUT"); trim(dark, CUT, 3.25);
  holds(opa(dark), [[CUT, 0], [CUT + f(1), 88], [CUT + f(2), 0], [CUT + f(4), 100], [CUT + f(5), 20], [CUT + f(6), 100]]);
  var jolt = [tA1, tA2];
  for (var i = 0; i < jolt.length; i++) {
    var j = jolt[i], p = pos(j.n);
    p.setValueAtTime(CUT + f(1), [j.cx, j.cy]); p.setValueAtTime(CUT + f(2), [j.cx + (i ? -18 : 18), j.cy - 22]); p.setValueAtTime(CUT + f(4), [j.cx, j.cy]);
  }
  setOut(hA, 2.75); tagOut(tA1, 2.75); tagOut(tA2, 2.75);
  var pushA = comp.layers.addNull(DUR); pushA.name = "PUSH page A"; pos(pushA).setValue([540, 960]);
  K(scl(pushA), [[0, [100, 100]], [CUT, [102.5, 102.5]]], 20, 20);
  var ownA = hA.lines.concat(hA.slots).concat([tA1.n, tA2.n, capA, lgA]);
  for (var i = 0; i < ownA.length; i++) ownA[i].parent = pushA;

  // ============ 3. 3.1-8.6  the candle room flickers on ============
  var ON = 3.10;
  var rB = comp.layers.add(room); rB.name = "ROOM"; rB.moveBefore(bg); trim(rB, ON, 8.75);
  holds(opa(rB), [[ON, 55], [ON + f(1), 0], [ON + f(3), 90], [ON + f(4), 15], [ON + f(6), 100]]);
  K(scl(rB), [[ON, [112, 112]], [8.6, [100, 100]]], 25, 60);
  // shade so white type reads on the candles (matches the still)
  var sh = solid(comp, COL.ink, "SHADE"); sh.moveBefore(rB); trim(sh, ON, 8.75); opa(sh).setValue(82);
  var mk = sh.property("ADBE Mask Parade").addProperty("ADBE Mask Atom"), ms = new Shape();
  ms.vertices = [[-300, 1020], [W + 300, 1020], [W + 300, H + 600], [-300, H + 600]]; ms.closed = true;
  sh.property("ADBE Mask Parade").property(1).property("ADBE Mask Shape").setValue(ms);
  sh.property("ADBE Mask Parade").property(1).property("ADBE Mask Feather").setValue([0, 520]);
  holds(opa(sh), [[ON, 0], [ON + f(6), 82]]);
  var BASE = 1340;
  var hB = head(comp, "Escape room for two.", "We film your run.", 104, COL.white, BASE, 3.55, "B", f(10));
  var lgB = logo(comp, logoIt, COL.white, M, 1522, ON + f(6), 8.75);
  K(opa(lgB), [[ON + f(6), 0], [ON + f(10), 100]]);
  var tB1 = tag(comp, "BARTER COLLAB", COL.lime, COL.ink, 310, 1040, -6, 4.40);
  var tB2 = tag(comp, "HORROR", COL.white, COL.ink, 780, 1110, 5, 4.58);
  // ---- the scare 6.3: the room jolts, a flash, the tags fall off, the italic line changes ----
  var SC = 6.30;
  var rp = pos(rB); holds(rp, [[SC, [540, 960]], [SC + f(1), [578, 932]], [SC + f(2), [514, 984]], [SC + f(3), [552, 952]], [SC + f(4), [540, 960]]]);
  var fl = solid(comp, [1, 0.88, 0.7], "SCARE flash"); fl.blendingMode = BlendingMode.ADD; opa(fl).setValue(60); trim(fl, SC + f(1), SC + f(2));
  holds(opa(rB), [[ON, 55], [ON + f(1), 0], [ON + f(3), 90], [ON + f(4), 15], [ON + f(6), 100], [SC + f(2), 35], [SC + f(3), 100]]);
  tagFall(tB1, SC, -1); tagFall(tB2, SC + f(2), 1);
  lineOut(hB, 1, SC + f(4));
  var hB2 = head(comp, "Screams included.", "", hB.size, COL.white, BASE + hB.size * 1.05, SC + f(12), "B2");
  hB2.lines[0].property("ADBE Text Properties").property("ADBE Text Document").value; // keep
  var d2 = hB2.lines[0].property("ADBE Text Properties").property("ADBE Text Document"), dv = d2.value; dv.font = FI; dv.tracking = -28; d2.setValue(dv);
  // the offer slaps back on
  var tC1 = tag(comp, "BARTER COLLAB", COL.lime, COL.ink, 310, 1000, -6, 7.00);
  var tC2 = tag(comp, "WORTH AED 660", COL.white, COL.ink, 780, 1080, 4, 7.16);
  var tC3 = tag(comp, "ABU DHABI", COL.violet, COL.white, 300, 1160, 3, 7.32);
  var END = 8.60;
  holds(opa(rB), [[ON, 55], [ON + f(1), 0], [ON + f(3), 90], [ON + f(4), 15], [ON + f(6), 100], [SC + f(2), 35], [SC + f(3), 100], [END, 60], [END + f(1), 100], [END + f(3), 0]]);
  setOut(hB, END + f(4)); setOut(hB2, END + f(4)); tagOut(tC1, END + f(4)); tagOut(tC2, END + f(4)); tagOut(tC3, END + f(4));

  // ============ 4. 8.6-12  the lights snap back: the ask ============
  var wD = solid(comp, COL.white, "PAGE white D"); trim(wD, END, DUR);
  holds(opa(wD), [[END, 0], [END + f(1), 70], [END + f(2), 0], [END + f(4), 100]]);
  var hD = head(comp, "Brave enough?", "Apply below.", 150, COL.ink, 560, END + f(6), "D", f(9));
  var tD1 = tag(comp, "FOR CREATORS", COL.lime, COL.ink, 800, 300, 6, 9.25);
  var capD = caption(comp, "Loud, brave and on camera? Worth AED 660.", 1120, 9.55, DUR);
  var lgD = logo(comp, logoIt, COL.ink, 1080 - M - 200, 1500, END + f(4), DUR);
  var pushD = comp.layers.addNull(DUR); pushD.name = "PUSH page D"; pos(pushD).setValue([540, 960]);
  K(scl(pushD), [[END, [100, 100]], [DUR, [102.5, 102.5]]], 20, 20);
  var ownD = hD.lines.concat(hD.slots).concat([tD1.n, capD, lgD]);
  for (var i = 0; i < ownD.length; i++) ownD[i].parent = pushD;
  wD.moveAfter(sh); dark.moveToBeginning();

  var gr = solid(comp, [1, 1, 1], "FINISH grain"); gr.adjustmentLayer = true; fx(gr, "ADBE Noise");
  var nz = gr.property("ADBE Effect Parade").property(1);
  for (var q = 1; q <= nz.numProperties; q++) { var nm = nz.property(q).name; if (nm.indexOf("Amount") >= 0) nz.property(q).setValue(1.4); if (nm.indexOf("Color") >= 0) { try { nz.property(q).setValue(0); } catch (e) { } } }
  gr.moveToBeginning();

  proj.save(new File(ROOT + "film/Following_Escape_Story_v05.aep"));
  log("OK saved");
  var fo = new Folder(ROOT + "film/frames_escape"); fo.create();
  var ts = [0.15, 0.5, 0.95, 1.2, 1.7, 2.52, 2.6, 3.0, 3.25, 3.7, 4.0, 4.7, 5.6, 6.32, 6.4, 6.6, 6.85, 7.25, 7.8, 8.62, 8.9, 9.4, 10.2, 11.8];
  for (var i = 0; i < ts.length; i++) comp.saveFrameToPng(ts[i], new File(fo.fsName + "/v5_" + ("00" + Math.round(ts[i] * 30)).slice(-3) + ".png"));
  log("frames done");
} catch (e) {
  log("ERROR line " + e.line + ": " + e.toString());
}
app.endUndoGroup();
flush();
