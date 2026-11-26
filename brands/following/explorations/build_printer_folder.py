# Builds brands/following/print/Following_MASTER (the folder sent to printers) from the raw PDFs in explorations/_pdf_staging.
# Needs pymupdf and pillow (py -m pip install pymupdf pillow). It never touches Following_Print_Order.xlsx: Zain edits that by hand.
# Raw PDFs come from Illustrator: explorations/export_pdf.jsx, EXPORT('1-56', ...), EXPORT('57', ...), EXPORT('58-70', ...).
# The bag PDF is exported from Zain's own 'Following Packaging.ai' with a rich black ground (see brief.md).
import sys, os, glob, shutil
for p in sys.argv[1:]: sys.path.insert(0, p)
import pymupdf
from PIL import Image

R = "C:/Users/user/Desktop/DesignerFollowing/brands/following"
ST = R + "/explorations/_pdf_staging"; RGB = ST + "/RGB_for_digital_press"; PV = ST + "/previews"; M = R + "/print/Following_MASTER"
INS = "Following_Booklet_Inside_56pp_A6_148x105mm"; COV = "Following_Booklet_Cover_A6_301x105mm_spine5mm"
PCS = "Following_Packaging_Pieces"; BAG = "Following_Bag_Face_470x320mm"

def mk(p):
    os.makedirs(p, exist_ok=True); return p
def part(src, pgs, dst):
    sd = pymupdf.open(src); d = pymupdf.open()
    for p in pgs: d.insert_pdf(sd, from_page=p, to_page=p)
    d.save(dst, garbage=3, deflate=True); d.close(); sd.close()

# folder, [(source pdf, pages or None for the whole file, output name)], preview prefixes, spec lines
ART = [
 ("01_Gift_Box", [(PCS, [0, 1], "Following_Box_Lid_and_Inside_Lid_400x300mm")], ["K01", "K02"],
  ["Gift box: 400 x 300 x 120 mm outside (W x D x H). Rigid box, hinged lid, magnetic flap. 2 mm board.",
   "Page 1 is the lid: black, white wordmark and tagline, centred.",
   "Page 2 is the inside-lid liner: black on charcoal pattern. Trim to the inner lid, about 394 x 294 mm.",
   "Artwork is the flat face only: place it on your dieline."]),
 ("02_Hello_Card", [(PCS, [2], "Following_Hello_Card_A5_210x148mm")], ["K03"],
  ["Hello card: A5 landscape, 210 x 148 mm, printed one side, matt lamination.",
   "The thin white rule is meant to print: a name is written on it by hand."]),
 ("03_Paper_Bag", [(BAG, None, BAG)], ["K04"],
  ["Paper bag: 470 x 140 x 320 mm (W x gusset x H), landscape. Same artwork on both faces.",
   "Black background is a rich black. Sides and base plain black. Lime ribbon handles.",
   "Artwork is the flat face only: place it on your dieline."]),
 ("04_Booklet", [(INS, None, INS), (COV, None, COV), (PCS, [8], "Following_Booklet_Band_326x28mm")], ["K09"],
  ["Booklet: A6 landscape, 148 x 105 mm, 56 pages plus cover, PUR bound on the short left edge.",
   "Cover: 301 x 105 mm flat (148 + 5 spine + 148). Confirm the spine width for your paper.",
   "Band: 326 x 28 mm, wrapped 67 mm below the top of the cover, glued at the 20 mm overlap."]),
 ("05_Note_and_Envelope", [(PCS, [4, 11], "Following_Note_A6_148x105mm_front_back")], ["K05", "K12"],
  ["Note: A6 landscape, 148 x 105 mm, both sides, uncoated, no lamination (the cream side is written on).",
   "Envelope: plain black C6, 162 x 114 mm, no artwork."]),
 ("06_Intro_Card_Brands", [(PCS, [5, 9], "Following_Card_Brands_A6_105x148mm_front_back")], ["K06", "K10"],
  ["Intro card, brands: A6 portrait, 105 x 148 mm, both sides. Test the printed QR on the proof."]),
 ("07_Intro_Card_Creators", [(PCS, [6, 10], "Following_Card_Creators_A6_105x148mm_front_back")], ["K07", "K11"],
  ["Intro card, creators: A6 portrait, 105 x 148 mm, both sides. Test the printed QR on the proof."]),
 ("08_Contact_Card", [(PCS, [7, 12], "Following_Contact_Card_85x55mm_front_back")], ["K08", "K13"],
  ["Contact card: 85 x 55 mm, both sides."]),
]

# start clean: everything in the folder except the order sheet is rebuilt
for name in os.listdir(M):
    p = M + "/" + name
    if os.path.isdir(p): shutil.rmtree(p)
    elif not name.lower().endswith(".xlsx") and not name.startswith("~$"): os.remove(p)

comb = mk(M + "/00_All_Print_Files_Combined"); crgb = mk(comb + "/RGB_for_digital_press")
for nm in (INS, COV):
    shutil.copy(ST + "/" + nm + ".pdf", comb); shutil.copy(RGB + "/" + nm + "_RGB.pdf", crgb)
def combo(pcs, bag, dst):   # packaging pieces with the bag page taken from Zain's file
    a = pymupdf.open(pcs); b = pymupdf.open(bag); d = pymupdf.open()
    d.insert_pdf(a, from_page=0, to_page=2); d.insert_pdf(b); d.insert_pdf(a, from_page=4, to_page=12); d.save(dst, garbage=3, deflate=True)
combo(ST + "/" + PCS + ".pdf", ST + "/" + BAG + ".pdf", comb + "/" + PCS + ".pdf")
combo(RGB + "/" + PCS + "_RGB.pdf", RGB + "/" + BAG + "_RGB.pdf", crgb + "/" + PCS + "_RGB.pdf")

for folder, parts, prev, spec in ART:
    a = mk(M + "/" + folder); c = mk(a + "/Print_CMYK"); r = mk(a + "/Print_RGB_digital_press"); v = mk(a + "/Preview")
    for src, pgs, nm in parts:
        if pgs is None:
            shutil.copy(ST + "/" + src + ".pdf", c + "/" + nm + ".pdf"); shutil.copy(RGB + "/" + src + "_RGB.pdf", r + "/" + nm + "_RGB.pdf")
        else:
            part(ST + "/" + src + ".pdf", pgs, c + "/" + nm + ".pdf"); part(RGB + "/" + src + "_RGB.pdf", pgs, r + "/" + nm + "_RGB.pdf")
    for k in prev:
        for f in glob.glob(PV + "/" + k + "_*.png"): shutil.copy(f, v)
    with open(a + "/SPEC.txt", "w", encoding="utf-8") as fh:
        fh.write("\r\n".join(spec) + "\r\n\r\nPrint PDFs: 2.8 mm bleed, crop marks, fonts embedded. Material, finish and quantity are in Following_Print_Order.xlsx.\r\n")

bk = R + "/exports/booklet"
shutil.copy(bk + "/Following_Booklet_preview_spreads.pdf", M + "/04_Booklet/Preview"); shutil.copy(bk + "/overview.jpg", M + "/04_Booklet/Preview/Booklet_overview.jpg")

with open(M + "/README.md", "w", encoding="utf-8") as fh:
    fh.write("""# Following: files for the printer

- `Following_Print_Order.xlsx`: every item with size, print, material and finish, and quantity.
- `01` to `08`: one folder per item. Each holds `Print_CMYK`, `Print_RGB_digital_press`, `Preview` and a short `SPEC.txt`.
- `00_All_Print_Files_Combined`: the same artwork as three PDFs (booklet inside, booklet cover, 13 packaging pieces).
- `All_pieces_overview.jpg`: every packaging piece on one sheet, for reference only.

All print PDFs have 2.8 mm bleed, crop marks and embedded fonts.

The box lid and bag face are flat faces. Send your dieline and the face will be placed on it.
A printed proof is needed before the run.
""")

# one overview sheet of the packaging pieces
ims = [Image.open(f).convert("RGB") for f in sorted(glob.glob(PV + "/K*.png"))]; H = 300; W = 2400; rows = []; row = []; w = 0
for im in ims:
    t = im.resize((max(1, int(im.width * H / im.height)), H), Image.LANCZOS)
    if t.width > W - 24: t = t.resize((W - 24, int(t.height * (W - 24) / t.width)), Image.LANCZOS)
    if w + t.width > W - 12 and row: rows.append(row); row = []; w = 0
    row.append(t); w += t.width + 12
rows.append(row)
sh = Image.new("RGB", (W, sum(max(t.height for t in r) + 12 for r in rows) + 12), (235, 235, 235)); y = 12
for r in rows:
    x = 12
    for t in r: sh.paste(t, (x, y)); x += t.width + 12
    y += max(t.height for t in r) + 12
sh.save(M + "/All_pieces_overview.jpg", quality=90)

# report
bad = 0
for f in sorted(glob.glob(M + "/*/Print_*/*.pdf") + glob.glob(comb + "/**/*.pdf", recursive=True)):
    d = pymupdf.open(f); sizes = set()
    for p in d:
        sizes.add("%.0fx%.0f" % (p.trimbox.width / 2.83465, p.trimbox.height / 2.83465))
        if abs((p.bleedbox.width - p.trimbox.width) / 2 / 2.83465 - 2.8) > 0.1: bad += 1
    print(os.path.relpath(f, M).replace("\\", "/"), len(d), "pp", sorted(sizes))
print("bleed problems:", bad)
