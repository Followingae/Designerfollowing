// Following: "Three ways to earn" — 9:16 brand film. Builds the whole project from scratch.
// Run: AfterFX.exe -r film.jsx   (writes a log next to this file)
var ROOT = "C:/Users/user/Desktop/DesignerFollowing/brands/following/";
var LOG = new File(ROOT + "film/scripts/" + (typeof LOGNAME != "undefined" ? LOGNAME : "build_log.txt"));
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
  var k = 1; if (size > 1296) { k = size / 1296; size = 1296; }
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
  if (k != 1) scl(l).setValue([100 * k, 100 * k]);
  l.baseK = k;
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

