# Following: brief

Current as of 2026-10-13 (evening). Earlier directions were removed from this file so it only says what is true now.

## What it is

The influencer everything app. Creators get paid collabs, cashback on receipts and barter products from brands, with payouts in AED. Company: Following FZC, Dubai, UAE.

Brand sentence: "Born in Dubai. Building the future of influencer marketing."

## Brand basics (Zain, 2026-10-12)

- Palette master is the Guidelines file: Ink `#050911`, Lime `#D3FF02`, Violet `#5100F3`, Lilac `#C9A7F9`, Forest `#1E3F20`, Deep Purple `#130042`, Cream `#F6F3EB`.
- Typeface: Plus Jakarta Sans for the brand. The booklet and inserts are set in Obviously (OH no Type), picked by Zain.
- The logo is never cropped. English only.
- The V3 illustration suite is a brand asset.

## Where things live

- `print/Following_MASTER/`: **the folder sent to printers.** Order sheet, one folder per item, combined PDFs. Nothing else.
- `final/Following_Print_Master.ai`: the working file. 70 artboards: booklet pages `p001` to `p056`, the cover, and pieces `K01` to `K13`. Pictures are linked from `final/assets/links/`.
- `exports/`: brand guidelines PDF (14 pages) and booklet previews. Not for the printer.
- `explorations/`: build scripts only. `kit.jsx` draws the pieces, `bk2*.jsx` the booklet, `to_a6.jsx` enlarges the booklet, `export_pdf.jsx` exports PDFs to `_pdf_staging/`, `build_printer_folder.py` assembles `print/Following_MASTER/`.
- Illustrator cloud document `Following Guidelines`: brand guideline pages and the store and social artboards. Its packaging pages (P01 to P06) show an earlier kit and need redrawing.
- `C:\Users\user\Desktop\Following Packaging.ai`: Zain's own file with the bag artwork (also a tape and an 80 mm sticker, not in the kit).

## The gift kit (decided by Zain on 2026-10-13)

Recipient: brand clients. A general client gift; contents vary.

| Piece | Size (mm) | Design |
|-------|-----------|--------|
| Box | 400 x 300 x 120, rigid, magnetic | Black. White wordmark centred, tagline centred under it. No emboss. |
| Inside lid | 400 x 300 | Turns pattern, black on charcoal |
| Hello card | A5 landscape, 210 x 148 | Black, "HELLO," and a rule for a handwritten name; Turns in lime on the right third. (Was a 380 x 280 top sheet; Zain: too big.) |
| Bag | 470 x 140 x 320 | Zain's own artwork from `Following Packaging.ai`, unchanged except the background, which is true black. Lime ribbon handles. |
| Booklet | A6 landscape, 148 x 105, 56 pages | Obviously caps, one colour per section. Cover black. |
| Booklet band | 326 x 28 | Turns on black in the line's five colours; glued at the overlap |
| Note | A6 landscape | Front "WITH THANKS" with the 3D line; back cream to write on, Turns strip lilac on violet |
| Intro card, brands | A6 portrait | Violet, lilac type; back Turns lilac on violet |
| Intro card, creators | A6 portrait | Forest, lime type; back Turns lime on forest |
| Contact card | 85 x 55 | Orange-red; back Turns black on orange-red |
| Envelope | C6, plain black | No artwork |

Rules he set:
- **One pattern for the whole kit: Turns.** In an array of brand colours, not one colour and not many.
- Gift tags, seal and tag cord are **not** in the kit.
- Do not stray from the brand colours on packaging. Do not turn everything one colour either.
- The printer folder holds printer files only. The order sheet stays simple (item, size, print, material and finish, quantity). **He edits quantities himself: edit that file in place, never regenerate it.**

## Booklet content rules

White inside, no case studies. Must show: UAE flag, "appeared on Shark Tank Dubai" (no deal details), "Shortlisted by Qatar Government for StartupQatar out of 50,000+ startups", an "also by Following: Inflink" section. No outline on the line. No placeholders in print. Clients page: Barakat, Rebel Foods, Palazzo Versace, R&B, CAFU, Aseel, Damas Jewellery, Minimalist Skincare, GMG Group, Jollibee. Coca-Cola Arena was removed at his request.

## Open

- Booklet pictures: nine were replaced with full-size files from Zain on 2026-10-13 (pages 2, 5, 12, 15, 17, 20-21, 22, 39, 41; kept as `... HR.png` in `final/assets/links/`). Only pages 36-37 remain under 200 ppi: see `exports/booklet/PICTURES_NEEDED.md`.
- The box has only 20 mm of spare height in the 320 mm bag.
- In the bag artwork both store badges read "App Store"; the second should read "Google Play".
- Facts not confirmed: Shark Tank year 2025; the 200+ / 3.5K / 95% figures; hello@following.ae; the QR target https://following.ae; sample figures and names in the interface mock-ups.
- Dielines from the box and bag makers; a printed proof (lime and violet print duller in CMYK).
- Packaging pages of the guidelines need redrawing.

## Build notes

- Booklet is built at A7 by `bk2.jsx`, then enlarged by `to_a6.jsx` (`A6.pages(a, b)`). To rebuild one spread: build it at its A7 origin, then `A6.pages(s, s)`.
- In Illustrator, build **one kit piece per fresh open** of the print master; several in one session throws "Target layer cannot be modified".
- The bag PDF is exported from Zain's file with the background and matching inner shapes set to rich black 60/40/40/100.
- Illustrator caches placed pictures by file name within a session: rename a re-exported PNG before placing it again.
