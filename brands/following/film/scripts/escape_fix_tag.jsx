// v5 fix: the HORROR tag on the white page becomes an ink pill with white type, so it shows on white.
var LOG = new File("C:/Users/user/Desktop/DesignerFollowing/brands/following/film/scripts/escape_fix_log.txt"), msg = [];
try {
  var c = null, i;
  for (i = app.project.numItems; i >= 1; i--) { var it = app.project.item(i); if (it instanceof CompItem && it.name == "ESC5_01_Story") { c = it; break; } }
  var ink = [5 / 255, 9 / 255, 17 / 255];
  for (i = 1; i <= c.numLayers; i++) {
    var l = c.layer(i);
    if (l.inPoint > 2) continue;
    if (l.name == "pill HORROR") { l.property("ADBE Root Vectors Group").property(1).property("ADBE Vectors Group").property(2).property("ADBE Vector Fill Color").setValue(ink); msg.push("pill fixed"); }
    if (l.name == "tag HORROR") { var sp = l.property("ADBE Text Properties").property("ADBE Text Document"), d = sp.value; d.fillColor = [1, 1, 1]; sp.setValue(d); msg.push("text fixed"); }
  }
  app.project.save();
  msg.push("saved");
} catch (e) { msg.push("ERROR " + e.toString()); }
LOG.open("w"); LOG.write(msg.join("\n")); LOG.close();
