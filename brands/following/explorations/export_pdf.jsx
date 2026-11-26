// Print PDFs from the print master. EXPORT(range, file, cmyk) saves one PDF, then closes it and reopens the .ai.
// Bleed only applies when the Press Quality preset is set first. 8.504 pt = 3 mm asked, 2.8 mm delivered.
var EXPORT_AI = 'C:/Users/user/Desktop/DesignerFollowing/brands/following/final/Following_Print_Master.ai';
var EXPORT_DIR = 'C:/Users/user/Desktop/DesignerFollowing/brands/following/explorations/_pdf_staging/';
function EXPORT(range, file, cmyk) {
  var d = null, i, o = new PDFSaveOptions();
  for (i = 0; i < app.documents.length; i++) if (app.documents[i].name.indexOf('Following_Print_Master') === 0) d = app.documents[i];
  if (!d) d = app.open(new File(EXPORT_AI));
  app.activeDocument = d;
  o.pDFPreset = '[Press Quality]';
  o.compatibility = PDFCompatibility.ACROBAT7;
  o.preserveEditability = false;
  o.artboardRange = range;
  o.trimMarks = true; o.offset = 9;
  o.bleedLink = false; o.bleedOffsetRect = [8.504, 8.504, 8.504, 8.504];
  if (cmyk) { o.colorConversionID = ColorConversion.COLORCONVERSIONREPURPOSE; o.colorDestinationID = ColorDestination.COLORDESTINATIONWORKINGCMYK; }
  else o.colorConversionID = ColorConversion.None;
  d.saveAs(new File(EXPORT_DIR + file), o);
  d.close(SaveOptions.DONOTSAVECHANGES);
  app.open(new File(EXPORT_AI));
  return file;
}
