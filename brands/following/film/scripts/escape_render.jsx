// Render one comp from the open project to film/exports. Set RCOMP / ROUT before running, or edit below.
var ROOT = "C:/Users/user/Desktop/DesignerFollowing/brands/following/";
var RCOMP = "ESC5_01_Story", ROUT = "film/exports/ESC_01_Story.mp4";
var LOG = new File(ROOT + "film/scripts/escape_render_log.txt"), msg = [];
try {
  var c = null;
  for (var i = app.project.numItems; i >= 1; i--) { var it = app.project.item(i); if (it instanceof CompItem && it.name == RCOMP) { c = it; break; } }
  if (!c) throw new Error("comp not found " + RCOMP);
  for (var r = 1; r <= app.project.renderQueue.numItems; r++) { var q = app.project.renderQueue.item(r); if (q.status == RQItemStatus.QUEUED) q.render = false; }
  var rq = app.project.renderQueue.items.add(c), om = rq.outputModule(1);
  for (var i = 0; i < om.templates.length; i++) if (om.templates[i].indexOf("15 Mbps") >= 0) om.applyTemplate(om.templates[i]);
  om.file = new File(ROOT + ROUT);
  app.project.renderQueue.render();
  app.project.save();
  msg.push("render done");
} catch (e) { msg.push("ERROR " + e.toString()); }
LOG.open("w"); LOG.write(msg.join("\n")); LOG.close();
