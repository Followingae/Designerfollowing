// Boot for booklet type explorations. Activates the booklet file and loads the helpers, without rebuilding the book.
(function () {
  var i, d = null;
  for (i = 0; i < app.documents.length; i++) if (app.documents[i].name.indexOf('Following_Print_Master') === 0) d = app.documents[i];
  if (!d) d = app.open(new File('C:/Users/user/Desktop/DesignerFollowing/brands/following/final/Following_Print_Master.ai'));
  app.activeDocument = d;
})();
var XD = 'C:/Users/user/Desktop/DesignerFollowing/brands/following/explorations/';
$.evalFile(XD + 'lib.jsx'); $.evalFile(XD + 'booklib.jsx'); $.evalFile(XD + 'booktpl.jsx'); $.evalFile(XD + 'bookw.jsx'); $.evalFile(XD + 'bookl.jsx');
FG.doc = app.activeDocument;
// Spreads 50 and up are exploration space below the book.
B.hasRight = function (s) { return s < B.LAST || s >= 50; };
B.cap = function (s, path, dpi) {
  var g = FG.org(B.key(s)), o = new ImageCaptureOptions();
  o.resolution = dpi || 200; o.antiAliasing = true; o.transparency = false; o.matte = true; o.matteColor = FG.rgb(255, 255, 255);
  FG.doc.imageCapture(new File(path), [g[0], g[1], g[0] + 2 * B.PW * B.MM, g[1] - B.PH * B.MM], o);
};
