// Page templates for the A7 booklet. Load after lib.jsx and booklib.jsx.

var T = {};
T.LY = {};                          // height (mm) at which the line leaves each spread
T.ly = function (s) { return (T.LY[s] === undefined) ? 95 : T.LY[s]; };

// The line through a spread: comes in where the last spread left, does `mid`, goes out.
T.line = function (s, mid, sw) {
  var yin = (s === 0) ? null : T.ly(s - 1), route = [];
  if (yin !== null) route.push([-4, yin]);
  var lx = 24 + (s * 37) % 84, y = T.ly(s);        // the loop lands somewhere different on every spread
  route = route.concat(mid || [[lx, y + 0.8], { to: [lx + 20, y], loops: 2, r: 3.9 }, [lx + 32, y + 0.6]]);
  if (B.hasRight(s)) route.push([152, T.ly(s)]);
  return B.line(s, route, sw);
};

T.x0 = function (side) { return (side === 'R') ? B.PW + 6 : 6; };

// Section opener: a photograph on one page, number, title and one sentence on the other.
T.opener = function (s, photoSide, img, num, title, sub, o) {
  o = o || {};
  var textSide = (photoSide === 'L') ? 'R' : 'L', x = T.x0(textSide);
  B.clear(s);
  B.ground(s, textSide, 'Ink');
  B.photo(s, photoSide, img, o);
  B.lab(s, x, 12, num, 'Lime');
  B.t(s, x, o.ty || 44, title, 'EB', o.size || 30, 'White', { track: -40, lead: (o.size || 30) * 0.9 });
  B.a(s, x, (o.ty || 44) + 5 + (o.extra || 0), 60, 34, sub, 'MI', 9.5, 'Cream', { lead: 11.5, track: -10 });
  B.folio(s, textSide, 'Cream');
  T.line(s, o.mid);
};

// Rows of "Name / one line" on one page.
T.rows = function (s, side, y, rows, o) {
  o = o || {};
  var x = T.x0(side), step = o.step || 14, i;
  for (i = 0; i < rows.length; i++) {
    var yy = y + i * step, r = B.rule(s, x, yy - 5.2, x + 62, yy - 5.2, o.ink || 'Cream', 0.3); r.opacity = 45;
    if (o.numbered) B.t(s, x, yy, '0' + (i + 1 + (o.start || 0)), 'M', 5, o.accent || 'Lime', {});
    B.t(s, x + (o.numbered ? 8 : 0), yy, rows[i][0], 'EB', o.size || 11.5, o.ink || 'White', { track: -25 });
    if (rows[i][1]) B.a(s, x + (o.numbered ? 8 : 0), yy + 1.4, 54, 10, rows[i][1], 'M', 6.2, o.ink || 'Cream', { lead: 7.8 });
  }
};

// Title page plus rows: title and intro on the left, rows on the right.
T.steps = function (s, label, title, intro, rows, o) {
  o = o || {};
  B.clear(s);
  B.ground(s, 'LR', o.ground || 'Ink');
  var ink = o.ink || 'White', soft = o.soft || 'Cream';
  B.lab(s, 6, 12, label, o.accent || 'Lime');
  B.t(s, 6, o.ty || 30, title, 'EB', o.size || 17, ink, { track: -40, lead: (o.size || 17) * 0.94, fonts: o.fonts });
  if (intro) B.a(s, 6, o.iy || 56, 60, 36, intro, 'M', 6.6, soft, { lead: 9 });
  T.rows(s, 'R', o.ry || 22, rows, { numbered: o.numbered !== false, step: o.step, ink: ink, accent: o.accent, size: o.rsize });
  B.folio(s, 'LR', soft);
  T.line(s, o.mid);
};

// Big figures. items = [[figure, caption], ...] for each page.
T.figs = function (s, side, items, o) {
  o = o || {};
  var x = T.x0(side), n = items.length, size = o.size || (n <= 2 ? 27 : (n === 3 ? 21 : 17)), top = o.top || 30, step = (o.bottom || 78) - top, i;
  step = n > 1 ? step / (n - 1) : 0;
  for (i = 0; i < n; i++) {
    var yy = top + i * step;
    B.t(s, x, yy, items[i][0], 'EB', size, o.ink || 'White', { track: -40 });
    B.t(s, x + 0.4, yy + 5.2, items[i][1], 'MI', 7, o.soft || 'Cream', { track: -5 });
  }
};
T.numbers = function (s, label, sub, left, right, o) {
  o = o || {};
  B.clear(s);
  B.ground(s, 'LR', 'Ink');
  B.lab(s, 6, 12, label, 'Lime');
  if (sub) B.lab(s, B.PW + 6, 12, sub, 'Cream');
  T.figs(s, 'L', left, o.l); T.figs(s, 'R', right, o.r);
  B.folio(s, 'LR', 'Cream');
  T.line(s, o.mid);
};

// Case study opener: client name and the set-up on one page, a picture (still to come) on the other.
T.caseOpen = function (s, textSide, goal, name, facts, need, o) {
  o = o || {};
  var x = T.x0(textSide), other = (textSide === 'L') ? 'R' : 'L', i;
  B.clear(s);
  B.ground(s, textSide, 'Ink');
  B.need(s, other, need);
  B.lab(s, x, 12, 'Case / ' + goal, 'Lime');
  B.t(s, x, 32, name, 'EB', o.size || 19, 'White', { track: -40, lead: (o.size || 19) * 0.92 });
  for (i = 0; i < facts.length; i++) {
    var yy = 58 + i * 8.6, r = B.rule(s, x, yy - 4.6, x + 62, yy - 4.6, 'Cream', 0.3); r.opacity = 45;
    B.t(s, x, yy, facts[i], 'M', 7.2, 'Cream', { track: -5 });
  }
  B.folio(s, textSide, 'Cream');
  T.line(s, o.mid);
};

// One page of words: label, headline, paragraph.
T.words = function (s, side, label, head, body, o) {
  o = o || {};
  var x = T.x0(side), ink = o.ink || 'White', soft = o.soft || 'Cream';
  if (label) B.lab(s, x, 12, label, o.accent || 'Lime');
  B.t(s, x, o.ty || 32, head, 'EB', o.size || 17, ink, { track: -40, lead: (o.size || 17) * 0.94, fonts: o.fonts });
  if (body) B.a(s, x, o.by || 62, 60, 36, body, o.bfont || 'M', o.bsize || 6.8, soft, { lead: o.blead || 9.2 });
};

T.preview = function (list) {
  var dir = 'C:/Users/user/Desktop/DesignerFollowing/brands/following/explorations/book/', f = new Folder(dir);
  if (!f.exists) f.create();
  for (var i = 0; i < list.length; i++) B.png(list[i], dir + B.key(list[i]) + '.png', 110);
};
