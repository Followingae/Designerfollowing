"""Local MCP server that drives Adobe Illustrator on Windows through COM + ExtendScript."""

import json
import os

import pythoncom
import pywintypes
import win32com.client
from mcp.server.fastmcp import FastMCP

PROG_ID = "Illustrator.Application"

mcp = FastMCP("illustrator")

# ExtendScript is ES3 and has no JSON object; scripts get a minimal stringify.
JSON_POLYFILL = r"""
if (typeof JSON === 'undefined') { JSON = {}; }
if (typeof JSON.stringify !== 'function') {
  JSON.stringify = function (v) {
    var t = typeof v, i, out;
    if (v === null || v === undefined) return 'null';
    if (t === 'number') return isFinite(v) ? String(v) : 'null';
    if (t === 'boolean') return String(v);
    if (t === 'string') {
      return '"' + v.replace(/[\\"]/g, '\\$&').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t') + '"';
    }
    if (v instanceof Array) {
      out = [];
      for (i = 0; i < v.length; i++) out.push(JSON.stringify(v[i]));
      return '[' + out.join(',') + ']';
    }
    if (t === 'object') {
      out = [];
      for (i in v) if (v.hasOwnProperty(i) && typeof v[i] !== 'function') out.push(JSON.stringify(String(i)) + ':' + JSON.stringify(v[i]));
      return '{' + out.join(',') + '}';
    }
    return 'null';
  };
}
"""


def _run(script: str) -> str:
    pythoncom.CoInitialize()
    try:
        app = win32com.client.Dispatch(PROG_ID)
        result = app.DoJavaScript(JSON_POLYFILL + "\n" + script)
        return "" if result is None else str(result)
    except pywintypes.com_error as e:
        detail = e.excepinfo[2] if e.excepinfo and e.excepinfo[2] else e.strerror
        return f"ERROR: {detail}"
    finally:
        pythoncom.CoUninitialize()


@mcp.tool()
def illustrator_run(script: str) -> str:
    """Run ExtendScript (ES3 JavaScript) inside Adobe Illustrator and return the value of
    the last evaluated expression as a string. Launches Illustrator if it is not running.
    JSON.stringify is available. Top-level `return` is not allowed; end the script with the
    expression to return, or wrap the body in an immediately-invoked function. Errors come
    back as a string starting with "ERROR:"."""
    return _run(script)


@mcp.tool()
def illustrator_status() -> str:
    """Report the Illustrator version plus every open document with its artboards and layers."""
    return _run(
        r"""
(function () {
  var docs = [], i, j, d, abs, lays;
  for (i = 0; i < app.documents.length; i++) {
    d = app.documents[i];
    abs = [];
    for (j = 0; j < d.artboards.length; j++) abs.push({ index: j, name: d.artboards[j].name, rect: d.artboards[j].artboardRect });
    lays = [];
    for (j = 0; j < d.layers.length; j++) lays.push(d.layers[j].name);
    docs.push({
      name: d.name,
      path: d.fullName ? d.fullName.fsName : '',
      active: d === app.activeDocument,
      colorSpace: String(d.documentColorSpace),
      artboards: abs,
      layers: lays
    });
  }
  return JSON.stringify({ version: app.version, documents: docs });
})();
"""
    )


@mcp.tool()
def illustrator_export_png(path: str, artboard_index: int = 0, scale: float = 100.0, transparent: bool = False) -> str:
    """Export one artboard of the active document to a PNG file, clipped to the artboard.
    `path` is an absolute file path; `scale` is a percentage (200 = @2x). Returns the path
    written, which can then be opened to inspect the result."""
    path = os.path.abspath(path)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    return _run(
        r"""
(function () {
  if (app.documents.length === 0) return 'ERROR: no document open';
  var doc = app.activeDocument, idx = %d, prev = app.userInteractionLevel;
  if (idx < 0 || idx >= doc.artboards.length) return 'ERROR: artboard index out of range (0-' + (doc.artboards.length - 1) + ')';
  app.userInteractionLevel = UserInteractionLevel.DONTDISPLAYALERTS;
  try {
    doc.artboards.setActiveArtboardIndex(idx);
    var opts = new ExportOptionsPNG24();
    opts.artBoardClipping = true;
    opts.antiAliasing = true;
    opts.transparency = %s;
    opts.horizontalScale = %f;
    opts.verticalScale = %f;
    var f = new File(%s);
    doc.exportFile(f, ExportType.PNG24, opts);
    return f.fsName;
  } finally {
    app.userInteractionLevel = prev;
  }
})();
"""
        % (artboard_index, "true" if transparent else "false", scale, scale, json.dumps(path.replace("\\", "/")))
    )


if __name__ == "__main__":
    mcp.run()
