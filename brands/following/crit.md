# Following: crit log

## 2026-10-12, Guidelines v1.0, round 1

Looked at: 14 pages at 50%, one page at a time as built.

- G03: wordmark at 1400 px left a dead third of the page. Fixed: runs the full measure.
- G05: two violet tiles and two cream tiles sat next to each other and merged into one block. Fixed: re-ordered so no neighbours share a ground.
- G07: partner diagram ran 48 px past the right margin. Lockup too small for its own page. Fixed both. Also removed a claim about the box height that I had not measured.
- G09: cream cards vanished on a cream page. Fixed: page ground is Lilac.
- G10: "Get Cashback" at 168 pt collided with the style table. Fixed: 140 pt.
- G11: ink arc on the lime card merged with the ink page. Fixed: cream page, third card changed to Ink.
- G12: tags overlapped so far that two of the three words were unreadable. Pill width was guessed from character count. Fixed: width measured from the set type, positions spread.
- All area text was hyphenating ("Wher-ever"). Fixed in the helper.
- Folio separator rendered as mojibake on two pages. Fixed: plain slashes throughout.

## 2026-10-12, Guidelines v1.0, round 2

Looked at: contact sheet of all 14, the same sheet in greyscale, and the minimum-size row at 1:1.

1. **Idea in one sentence?** The guidelines obey their own six rules: one colour per page, a cropped wordmark on the cover, bold-then-italic headlines. A stranger would get "loud, flat, lime". They would not get "the box is a set" from this document, because packaging is not in it yet.
2. **Squint.** Holds. Every page has one dominant element. Weakest: G04 and G14, which are honest reference pages and look like it.
3. **Greyscale.** Holds. Lime on Violet and Lime on Forest keep clear separation. Violet tag on Ink (G12) is the closest call and is still readable.
4. **16 px.** Wordmark survives at 16 px high (76 px wide). Counters stay open. Below that the i-dot starts to merge with the w.
5. **Could it be a competitor's?** The layout could be anyone's. The colour pair and the wide lowercase wordmark could not. The page architecture is the generic part.
6. **Remembered tomorrow?** The lime cover with the wordmark running off the edge.
7. **Remove one thing.** The CMYK caveat on G08 floats at the top of the Ink block, away from the values it qualifies. Left in because the warning matters more than the tidiness.
8. **Type a deliberate choice?** Yes, and not mine: Plus Jakarta Sans ExtraBold + Medium Italic is the existing habit, confirmed by Zain. Its weakness is that it is a free Google font used by many startups. The pairing habit is what makes it Following's, not the face.
9. **Next to a Pentagram case study?** As documentation, respectable. As an identity, it is still a wordmark, two colours and two shapes. It needs the packaging system and a motion or photography idea before it would stand next to one.

### Known gaps in v1.0

- No Pantone references. Lime and Violet are out of CMYK gamut and need spot inks.
- No Arabic wordmark and no Arabic companion typeface.
- Wordmark typeface not identified. Unbounded is installed and looks close, but set type does not match the artwork's proportions (5.6:1 against 4.7:1), so it is custom or heavily adjusted.
- Illustration suite exists only as 880 px rasters pulled from the August packaging PDF and recoloured by script. No vector source found on disk.
- No photography rules. The photos in the store screenshots look AI-generated; that needs a decision before it is written down as a rule.
- App icon not documented. None was in the file.
- The UI kit inside the screenshots uses a second lime (`#CDFF3A`) and a second black (`#181714`). Not reconciled with the brand palette.
- "Loud in the feed. Precise in the app." on G02 is my line, not an approved one.
- The Google Play story (A18) uses a gradient ground and rounded rectangles instead of pills, and both store badges read "App Store". Left untouched.

## 2026-10-12, Packaging territories, round 1

Brief from Zain: recipients are brand clients. Magnetic rigid box about the size of an Ounass box. Outside stays plain: logo printed on the lid, no emboss. Inside can go as far as it likes. English only. Piece list is mine.

Assumption not yet confirmed: lid 350 x 250 mm, depth about 120 mm.

Fixes made while building: bullet copy ran into its own rules (spacing widened); objects were drawn too small for the page (scale raised from 1.3 to 1.5 px per mm); on B the receipt lines were stacked behind the strip, the total line collided with itself at 20 pt, and the PAID stamp sat on top of copy.

### A, The Set: "Open the lid and the box becomes a backdrop."
- Idea in a sentence: yes, and it is the purest version of "the box is a set".
- Squint: best of the three. One lime field, one black word.
- Competitor test: fails. Any creator-economy brand could stand a lid up and call it a backdrop.
- Audience: wrong one. Brand marketing managers do not film unboxings. This is a box for creators.
- Remove one thing: the viewfinder card. It is a prop for a prop.

### B, The Receipt: "The whole box reads as one receipt."
- Idea in a sentence: yes. Following pays on receipts; the box itemises itself and charges AED 0.00.
- Squint: weakest. Cream and violet, lots of small type. Nothing in it is big.
- Competitor test: passes. Only a company built on scanning receipts can do this.
- Audience: right one. A client is buying proof, and every piece is a number.
- Remembered tomorrow: the till receipt with TOTAL DUE AED 0.00 and a PAID stamp.
- Breaks my own rule 1: lime does not lead. Lime is a stamp. To fix in refinement: test the receipts on lime stock with ink type.
- Remove one thing: the violet "Proof, not promises" card. The receipt already says it.

### C, Tagged: "You've been tagged."
- Idea in a sentence: yes, and the line is the best of the three.
- Squint: holds. Loud, clearly Following, uses a shape the brand already owns.
- Competitor test: half. Pills are everywhere; the "tagged" idea is specific to influencer marketing.
- Audience: fine. It is a pitch in five words.
- Breaks the two-colours rule: three tag colours on ink. The existing tag stack already does this, so the guidelines need an explicit exception for tags.
- Cost: die-cut pill cards are the most expensive paper item in any territory.
- Risk: at sticker-sheet scale it tips toward a kids' brand.

### Recommendation
B, with two changes: make lime the receipt stock so lime leads, and keep C's tag as the PAID stamp and the seal. A is the best picture and the wrong box for this recipient; hold it for a creator box.

## 2026-10-12, Packaging territories, round 2 (brief changed)

Zain clarified: the box is a general client gift with no fixed contents and is not filmed. Bags are for any use.

- **The Set is retired.** Its whole idea was the camera. Removed from the file; PNG kept as `retired_Territory_The-Set.png`.
- **My concept line "the box is a set" does not apply to this box.** It still holds for anything sent to creators. The guidelines do not state it, so nothing there needs changing.
- **New A, Following Up**: "Every gift is a follow-up." The wordmark plus one italic word: following up, following through, following you home. Content-agnostic, one-colour print, works on a bag with no changes. Competitor test: passes outright, it depends on the name. Risk: it is a pun, and puns wear thin if every card makes one. Needs a short approved list of endings, not an open invitation.
- **B revised to a gift receipt**: the inner-lid table was a fixed contents list, which random gifts break. Now the lines are blank and filled in by hand; AED 0.00 stays printed. This is a better idea than the first version because a gift receipt is a real thing.
- **C unchanged**, bag added.
- Bug caught: my clean-up script deleted "150+" from the receipt because it matched a pattern meant for the row numbers. Restored.

### Recommendation, revised
A, Following Up, as the system. It is the only one that works identically on a box lid, a card and a bag, costs nothing extra to print, and cannot be copied. Put B's gift receipt inside it as the one special piece. C stays in the drawer.

## 2026-10-12, Packaging territories, round 3 (all of round 2 rejected)

Zain's verdict on round 2: Following Up is "bad, cheap, and desperate". The Receipt is "confusing, and vague". Tagged is "a lazy attempt at the designs I showed you, not tasteful at all or modern like the vibe digestions". New rule: the outside of the box is always black.

What I got wrong: the inspiration folder is twelve pictures of colour, pattern and cropped form. I answered with three ideas that only work if you read them. Two were jokes and one recycled a shape the brand already had. I also drew them as small diagrams with captions, so even the good parts looked like a spec sheet.

Round 3 has no copy on any object. Each territory is one visual mechanism applied to the lid interior, tray, tissue, three bags and three cards. Black lid with a small lime wordmark on all three.

### 1, Crop: the wordmark, too big to fit
- Each surface carries one letter of the wordmark scaled past its edges: g inside the lid, o in the tray, w / f / n on the bags.
- Closest to the folder: this is the blue-and-yellow bag and the rhode bag, done with Following's own letters.
- Competitor test: passes. The shapes are the wordmark, so nobody else can have them.
- Squint: strongest. Two colours per surface, one shape each.
- Risk: some crops stop reading as letters and become blobs (the w on the cream card). Needs a rule on how much letter must survive.
- Weakest piece: the tissue. Repeating the small wordmark is the one conventional move on the page.

### 2, Echo: rings that follow one another
- Concentric bands grown from the brand's arc. Open, the lid and tray make one target split by the hinge.
- Loudest of the three and the best "quiet outside, loud inside" reveal.
- Competitor test: weak. Concentric rings are a stock op-art device; it could be a retailer, a telecom or a festival.
- Risk: hypnotic at box scale. Under a pile of gifts the tray is noise.
- Best piece: the lilac-on-violet bag. Tone on tone, it becomes tasteful.

### 3, Block: the palette is the artwork
- Flat colour panels in palette proportion; tray divided into compartments by black walls.
- Calmest and the easiest to manufacture: no registration-critical artwork.
- Competitor test: fails on shape, passes on colour only.
- Breaks the two-colours-per-surface rule on the lid and tray.
- Checker tissue is borrowed directly from one reference and looks it.

### Recommendation
1, Crop. It is the only one where the artwork is the brand rather than a pattern applied to it.

## 2026-10-12, Packaging territories, round 4 (round 3 rejected)

Zain's verdict on round 3: "these are bad", Block liked "like 5% maybe but its bad", "you arent using the vibe digest". Corrections: bags are landscape and must fit the box. Then, mid-build: cards must stay in the system (extra ones get produced and inserted for a creator or a brand as needed), and he wants a small, beautiful, visual booklet showing everything Following does and how to get in touch.

What I got wrong in round 3: I took one abstract principle from the folder (crop, flat colour) and ignored what is literally in the pictures: landscape bags with ribbon handles and a contrast lining, tone-on-tone type, a hand-drawn line, an illustrated lid, a compartment tray. I also drew flat swatches. Every image in the folder is an object.

Round 4 changes: each territory is drawn as an open box and a landscape bag in a parallel projection, names the reference images it comes from, and includes two insert cards (creators, brands), an A6 booklet cover and tissue. Bag sized 380 x 140 x 290 mm to take the box on its long edge.

### 1, Tone (Charlemagne, amfAR, Zedcrest, rhode)
- Violet inside lid and violet bag carry the wordmark broken over two lines in a darker violet. Lime is held for the tray, the bag lining and the ribbon handles.
- Squint: holds. Two colours, one word.
- Honest weakness: Deep Purple on Violet is closer to black-on-blue than to a true tone-on-tone. On press this should be a gloss varnish or a much closer ink.
- Breaking the wordmark across two lines contradicts nothing in the guidelines but is a new move and needs a rule.

### 2, Loop (blue and yellow bag, FOMO, Les Bons Vivants)
- One cursive line of loops, scaled past the edges. Generated, so it is consistent at any size.
- Most joyful of the three. Closest to the folder's hand-drawn pieces.
- Competitor test: weak to medium. It is a squiggle until someone explains the double l. I am not going to explain it on the pack.
- The line is mathematically regular and looks it. A hand-drawn master would be better.

### 3, Block (Starface, Sunwhip, Bubble, rhode)
- Colour-block lid with the illustration suite on it, compartment tray, lime bag with the wordmark running up the left edge and a violet gusset.
- Most complete system: it is the only one that uses the illustration Zain asked to keep.
- Illustrations are 880 px rasters and will not survive print at lid size.
- Card type is cramped; roughs only.

### Recommendation
1, Tone, for the box and bag: it is the most grown-up thing for a client gift and the closest to the two bags in the folder. Take Block's compartment tray and illustrated cards inside it.

## 2026-10-12, Packaging, round 5 (round 4 rejected; one direction developed)

Zain's verdict on round 4: "Lazy terrible and mostly ugly no personality designing. You arent doing any work on your own color theories." New rules: bags are black too. No full floods of purple or lime. Never crop the logo. Then: "The loop is the ONLY one that is remotely something innovative, but still not enough."

What I got wrong: I kept flooding surfaces with the two brand colours and calling it a palette, and I cropped the wordmark in two territories and on the guidelines cover after being asked for a plain box with the logo on it.

Changes outside packaging:
- Guidelines cover now shows the wordmark whole. Rule 3 reads "Type is big. The wordmark is always whole." The clear-space page says "Never cropped". Version label is 1.1.
- Two print accents added as global swatches, Tangerine `#FF6A13` and Pink `#FF3EA5`, with the reasoning on a colour study page. This reverses the earlier "no orange" decision and needs Zain's yes.

Round 5 is one direction, The Line, developed from Loop:
- Black box, black bag, wordmark whole and uncropped, clear space kept.
- One continuous line with loops. Lime on the outside. Inside it changes colour in a fixed order (lime, tangerine, pink, violet, lilac at 8:3:2:5:2).
- The line goes over the box edge onto the front wall. On the bag the printed line meets the ribbon handles, so the handles are part of the drawing.
- Cards are black A6. One line crosses all of them, so any mix laid side by side joins up.
- Booklet: the line runs from a dot on the cover through every page; each loop holds one offer.

Self-crit:
1. Idea in a sentence: a line you follow, from lid to handle to last page. A stranger gets it without reading.
2. Squint: holds on the bag and the inside lid. Weak on the closed lid, where three small loops and a wordmark compete at similar weight.
3. Greyscale: lime line on black holds. Violet on black inside the lid drops to about 2.9:1 and nearly disappears in grey.
4. Competitor test: the bag handle trick is the ownable part. A looping line alone is not.
5. Remembered tomorrow: the handles that turn into the drawing.
6. Remove one thing: the second seal (black with a loop). The lime dot is enough.
7. Honest weakness: the line is generated from a formula and smoothed. It is clean but it does not have a hand in it. A drawn master by a lettering artist would lift it a lot.
8. Still rough: booklet type is too small to judge, tissue loops flatten into scallops, objects are simple parallel projections, not mockups.

Not done: full 12-page booklet, dielines, real box dimensions, a third page of line treatments (dropped, the artboard was removed).

## 2026-10-12, Packaging, round 6 (direction given by Zain)

Zain on round 5: make the line a modern gradient of those colours, 3D allowed. The lines on the box and bag are bad: keep the logo plus maybe one very subtle line of type such as "Building the future of influencer marketing". Booklet should be more photographic (he will supply photos), bold, more pages, thick and beautiful, coffee-table style but small, even A7. Inserts need more thought. No tissue.

Built:
- **Box and bag**: black, lime wordmark whole, tagline in small cream type at 70% opacity. No line outside. Bag is fully black including handles and lining.
- **The line**: lime to tangerine to pink to violet to lilac, drawn as a round tube. It appears inside the lid, on inserts and through the booklet only.
- **Inserts**: seven pieces in opening order: inside lid, top sheet (replaces tissue, carries a handwritten name), envelope and note, intro card (brand or creator, with QR), gift tags, booklet in a band, seal. Plus a contact card.
- **Booklet**: A7, 96 pages, section sewn. Cover, eight sample spreads and a 48-spread flatplan. Grey panels stand in for photographs.
- Guidelines rule 5 changed from "Flat ink. No gradients, shadows or 3D." to "Flat colour on surfaces. One gradient: the line."

Self-crit:
1. Idea in a sentence: a black box that is silent outside and has one bright line inside that you follow through everything in it.
2. Squint: the inside lid and the line spec strip hold. The box and bag exteriors are, by request, almost nothing. That is correct for the brief and it means the inserts carry all the weight.
3. Greyscale: the tube keeps its form because of the light core. The violet stretch is the weakest on black.
4. 16 px: not applicable to the line. The tagline on the lid is about 2.2 mm cap height at full size, which is the lower limit for print legibility on black.
5. Competitor test: a gradient tube is a current look and others have it. What is Following's is the fixed colour order, the fact that it only ever appears inside, and that its colour marks progress through the booklet.
6. Remembered tomorrow: opening a plain black box and finding the line.
7. Remove one thing: the contact card duplicates the intro card's job. Fold it into the intro card.
8. Honest gaps:
   - The gradient is built from about 40 to 110 short flat-colour steps per line, each in four stacked strokes, because Illustrator will not script a gradient along a stroke. It is not Illustrator's 3D effect. For production it should be rebuilt by hand as one stroke with a real gradient or rendered with the 3D tools.
   - Those step colours are plain RGB values, not global swatches.
   - In the booklet samples several "loops" came out as shallow humps. The line needs redrawing per spread.
   - No photographs yet. The booklet cannot be judged as photographic until they arrive.
   - Tangerine and pink are still unapproved as brand colours; he asked for "a gradient of those colors", which I am reading as approval of the sequence.
   - Box dimensions still assumed. No dielines.

## 2026-10-13, Booklet, first full build

Brief from Zain: build the real thing in detail from four PDFs (Case Studies, Influencers Cashback, Following Presentation, Inflink for Brands), with an "also by Following: Inflink" section. No Huda Beauty anywhere. Ten supplied images to use. Tell him what other pictures are needed.

Built: `final/Following_Booklet_A7.ai`. 96 pages at 74 x 105 mm as single-page artboards laid out in spreads, plus a cover artboard (back, 11 mm spine, front). 3 mm bleed drawn on outer edges. Photos are linked, not embedded.

Structure: opening 1-9, Paid 10-25, Barter 26-37, Cashback 38-53, Production 54-63, How we work 64-73, Inflink 74-89, close 90-96.

Round 1 fixes: default line was drawing a hump, not a loop (now two loops, placed at a different point on each spread). Figures ran into the line at the foot of the page (lowest figure moved up). On the neon spread the line cut across the face (kept low). Production format rows lost their numbering on the right page. An accented e rendered as mojibake.

Round 2, looking at all 49 spreads together:
1. Idea: one line from a dot on page 1 to a dot on page 96, changing colour as it goes. Reads without explanation.
2. Squint: section openers with photographs are strong. Everything between them is white type on black with a line at the foot, and it is the same page 30 times.
3. Photographic? Not yet. 10 of 48 spreads carry a picture; 9 more are waiting. The Inflink section has none in 16 pages. This is the main gap against "coffee-table".
4. The line always sits at the same height with the same double loop. It is consistent to the point of being a footer rule. It should rise, cross and interrupt on at least a third of spreads.
5. Type: body at 6.6 to 7 pt on black is at the limit for comfortable reading at A7. Captions at 5.2 pt on page 41 are too small for reversed type.
6. Remove one thing: cashback pricing (page 53) and the Inflink fee (page 87) will date the book. They are in because the brief said "everything in detail".

Content calls I made:
- Huda Beauty removed from clients, selected work and case studies.
- Supplied images are used only for openers and mood pages, never beside a named case study, so nothing implies they are campaign pictures.
- Figures on page 4-5 (200+, 3.5K, 95%) are from the 2026 presentation and are still unconfirmed against the store screenshots.
- "20 to 25 in every 500" is shown as 25 dots; the range is stated in the small note.
- RFM Loyalty and Network International are named in the cashback deck as partners; left out pending a yes.
- Inflink contact (Ushna Arayn, ushna@inflink.ae) is printed as it appears in the Inflink deck.

Not done: print-ready PDF with crop marks, CMYK or spot decision, real pictures, Inflink logo, a real gradient stroke for the line.

## 2026-10-13, Booklet rebuilt (landscape, white) and packaging section finished

Zain's steer, in order: too dark, make it white; remove case studies; more editorial, larger artsy headers, full-stretch pictures; five more images; landscape, and about 50 pages not 96; show it is UAE based (flag), mention Shark Tank Dubai without deal specifics, and the Startup Qatar shortlist out of 50,000+; no stroke on the line; push the typography harder throughout. Also: finish the remaining packaging in the Guidelines file, polish, take it a step further.

Booklet now: A7 landscape, 105 x 74 mm, 56 pages plus cover, white. `final/Following_Booklet_A7.ai`.
- Case studies removed entirely (Barakat, R&B, Palazzo Versace, Rebel Foods remain only as client names).
- Headings run from 30 pt to 168 pt on a 210 pt-high page. Several cross the gutter or change colour where they leave a photograph.
- 15 supplied images, each used once except the red portrait.
- New pages: Born in Dubai with the UAE flag (6-7); Shark Tank Dubai and Startup Qatar (8-9).
- The line has no outline and stays at the foot of the page.

Fixes during the build: an ink keyline on the line (removed at his request); the line was cutting diagonally across faces and headings because each spread left at a different height (now constant); "Paid" sat on top of its own sub-line; the last page's line crossed the wordmark.

Self-crit:
1. Squint: holds on every spread. One huge word or one picture leads each time.
2. Greyscale: violet and ink separate clearly. Lime highlighter bars drop to pale grey but the labels on them stay readable.
3. The lime start of the line is nearly invisible on white for the first six spreads. That is the cost of no outline on white paper. Starting the sequence at tangerine would fix it.
4. Small type: row descriptions are 5.8 to 6.6 pt. Readable in ink on white, but small.
5. Low resolution: five of the new images are 1200 px on the long side; two of them are used at full page.
6. Shark Tank Dubai is dated 2025 from the investor one-pager. Startup Qatar wording follows the banner already in the Guidelines file ("shortlisted from 50,000+ applicants"). Neither page carries a logo.
7. Type crossing the gutter ("Paid", "Inflink", "Production", "Always on.") will lose a millimetre or two in the binding. Acceptable at this size with sewn binding; worse with PUR.
8. Coffee-table? Closer. It still has ten type-only spreads in a row through Cashback.

Packaging section in the Guidelines file is now six pages, P00 to P05:
- P03 rebuilt to show the white landscape booklet.
- P04 new: one placement rule (margin = a tenth of the short side, wordmark = a third of the long side), S/M/L sizes for box and bag, materials.
- P05 new: six checks, one right and five wrong.
- P01: tagline enlarged and lightened so it can be read.

Not done: P02 still shows the old booklet thumbnail in the insert list; no dielines; box and bag sizes other than M are derived from the rule, not from a supplier.

## 2026-10-13, Booklet type exploration (Zain: "unpolished and immature, a sad take on editorial")

He is right. Why the 56-page version reads as a pitch deck:
- One face (Plus Jakarta Sans ExtraBold) at every size. A geometric app face has no editorial register.
- The same trick on every spread: black line, then violet italic line.
- Lime label tags on every page. Sticker, not typography.
- Sizes and baselines chosen per page, no shared hang line. Small text 5.6 to 6.6 pt under hairlines.

Tested 20 installed faces on one headline, then set four spreads (headline on photo, Paid opener, One loop with a table, Born in Dubai) three ways. Files: `exports/booklet/type/`.

**A. Neue Haas Grotesk, Bold against Light.** Idea: one family, two weights, nothing else.
- Squint: holds. Greyscale: holds, it has no colour in the type at all.
- "Paid" at 190 pt is the strongest single page of the twelve.
- Could belong to a competitor: yes, any agency with taste. Safe.
- "campaigns" is cut mid-letter by the fold. Would need re-breaking.

**B. Obviously, each word cut to the width that fills its box.** Idea: every word fills its page.
- Loudest. "ONE / LOOP." in two widths is the one memorable move.
- Reads festival poster, not coffee table. Compressed caps on the photo are crude.
- Table titles in caps are harder to read at 9.6 pt.
- Would tire over 56 pages.

**C. Instrument Serif, roman against italic, Neue Haas for small text.** Idea: a fashion title, not a deck.
- The only one that reads as a book. Headline breaks cleanly at the fold between two words.
- Violet italic is the old trick again, but in this face it reads as voice, not decoration. Use it on fewer than half the spreads.
- Risk: one weight only, hairlines thin when reversed out of a busy photo. Keep reversed type above 60 pt.
- Risk: Instrument Serif is common on startup sites in 2025-26. At 100 pt plus in print it is less familiar.

Round 2 fixes: type cleared from the top trim in A and C, "Dubai." lifted off the line, B headline re-broken so no letter crosses the fold, "01" label no longer under the P.

Shared changes in all three: lime tags gone, labels are 4.6 pt tracked caps on one hang line, folio moved to the top, table set as title / note / number on one baseline, line thinned to 1.9 pt and started at tangerine.

Recommend C. Not rolled through the book yet; waiting on Zain's pick.

## 2026-10-13, Booklet v3: Obviously, rolled through all 56 pages

Zain picked B and asked for more polish, fewer colours and fewer font differences per page, and colour beyond the brand palette.

Rules now:
- One family, Obviously. Per page: one display cut in caps, Narrow Medium for the sentence line, Regular for small text.
- Lines in a stack share one cut and one cap height. No more ONE in Extended over LOOP in Narrow.
- One colour per spread plus ink. Each section owns a pair: Paid burgundy and rose, Barter tomato and sky, Cashback cobalt and peach, Production forest, How we work mustard. Opening and close stay ink and violet. Inflink is ink only, so it does not borrow Following's colour.
- Section openers are one flat colour page facing a full-bleed photo. No type on photos except two full-spread pictures.
- Gradient line only on cover, page 1 and page 56.

Crit:
1. Idea: every word fills its page, one colour at a time. A stranger gets it.
2. Squint: holds on every spread; display word reads first everywhere.
3. Greyscale: rose on burgundy and peach on cobalt keep contrast. Sky on tomato is the weakest, still legible.
5. Competitor test: the colour pairs plus Obviously are not what UAE agencies print. Passes.
6. Remembered tomorrow: PAID in rose on burgundy; INFLINK edge to edge.
9. Weak points, honest:
- The cut changes page to page (Compressed, Condensed, Narrow, Regular) because the widest that fits is chosen. Consistent within a page, not across the book. "YOU SET THE CRITERIA." in Compressed looks thin next to "ONE LOOP." in Regular.
- Pages 24 to 33 are still five type-only spreads in a row, all cobalt.
- Small text is 5.6 to 6.4 pt. Fine for a pocket book, at the limit.
- Mustard page with black type is the one place there is no second colour; it reads more like a warning sign than the others.
- Cobalt and violet will print duller in CMYK than on screen. Needs a proof, or a spot ink.
- Page 45 still waits for the dashboard screenshot.
- P03 in the Guidelines file and P02 Inserts still show the old booklet.

## 2026-10-13, Booklet v4: top bar, Inflink world, platform shots, black cover

Zain: "BEAUTIFUL". Asked for the Inflink logo, a better cover, each product in its own world or a top bar, and tasteful platform shots.

Done:
- Top bar on every spread in the section colour, listing all eight parts with the current one marked. Hang line and display zone moved down 2 mm to make room.
- Inflink: real logo from its SVG (ink word, coral and iris discs), coral page with the phone storefront, iris page with the tablet dashboard. Display type stays ink.
- Following app: two App Store screens (deal list, withdraw AED 7,500) on pages 42-43. Sporty duo photo moved to page 45, so no empty panel is left.
- Cover: black, lime wordmark whole, tagline, the five section colours as a bar across the top of the front. Matches the black box and bag.
- Build: `type_boot, type_terr, bk2lib, bk2bar, bk2, bk2cover`; `Y.build(0, 28)` then `Y.cover()`.

Crit:
- Bar labels are 3.9 pt. Readable as a marker, not as text. Do not go smaller.
- The withdraw phone on page 43 is cropped hard; reads as a detail, which is the intent, but the left edge of the phone body is heavy black.
- App Store screens are the creator side. There is still no brand-side dashboard shot from app.following.ae.
- Inflink tablet shot is small on the page (83 mm wide); numbers in it are not legible. It shows the look, not a feature.
- Cover top bar leaves out Following, Inflink and Contact on purpose (five colours only). Could read as "five services".
- Bar colour equals page colour on the flat colour pages, so the bar vanishes there. Acceptable.

## 2026-10-13, Booklet v5: interface mock-ups built from the repos

Zain: make the platform shots from the repos, marketing level, "not detailed crammy AI slop".

Built five HTML mock-ups, rendered at 2x with headless Chrome to transparent PNG (`explorations/mocks/`, `render.sh`). Each is one or two enlarged cards, not a whole screen.
- Inflink creator card (p47) and AI brief (p51): fonts, colours, radii and every string copied from `NEWINFLINK/.design-handoff/screens/buyer` (004, 013).
- Following brand dashboard (p45): Inter, lilac primary, card style and all labels from `analyticsfollowingfrontend` campaign analytics page.
- Following creator app deal card and wallet (p43), cashback deal and activity (p31): Archivo and Hanken Grotesk, lime #CDFF3A, tags and pills from `creator-app-native` tokens and deal-card.

Crit:
- Reads as product marketing, one feature per page. Passes the squint test: card first, label second.
- Figures are sample data (2.4M, 1.8M, 4.6%, AED 7,500, AED 1,500). Brand names "Urban Clothing" and "The Burger Room" are invented; creator names come from the Inflink design files.
- "In hold" and "Post verified" row labels in the cashback card are mine; the app's real labels are only the status pills.
- Photos inside the cards are the same AI images used elsewhere in the book. Lina's portrait is from the Inflink design assets.
- Five colour pages now carry mock-ups (cobalt, lilac, mustard, coral, iris). Lilac p43 next to mustard bar is the loosest pairing.
- The sporty duo photo and both App Store screens are no longer used as full pictures.

## 2026-10-13, Hand-over: print master, print PDFs, clean-up

- One print file: booklet pages, cover and 13 packaging pieces at real size in `final/Following_Print_Master.ai`. Guidelines stay in the cloud document; they are screen pages in pixels and do not belong in a print file.
- Inserts redrawn in Obviously to match the booklet. Intro cards carry a working QR to following.ae.
- Guidelines P02 and P03 now show the real pieces and the real book.
- Print PDFs: CMYK and RGB sets, bleed 2.8 mm (Illustrator rounded the 3 mm I set), crop marks.
- Deleted: every earlier booklet preview, rejected packaging rounds, old build scripts, old booklet file.

Still open:
- CMYK conversion visibly dulls cobalt, violet and lime. Needs a proof or spot inks.
- Box and bag are faces, not dielines.
- Inside lid line overlaps itself at the first loop; fine at size, check on the proof.
- DJ and Fashionable Youth pictures are 1200 px and print soft at full page.
- Sample figures and invented brand names in the mock-ups are unconfirmed.
- Shark Tank 2025, 200+ / 3.5K / 95%, hello@following.ae: unconfirmed.

## 2026-10-13, Placeholders out, the line in real 3D

Zain: why is "NAME, BY HAND" in the print; no placeholders; use Illustrator's actual 3D for the line.

- My mistake: "NAME, BY HAND" was a guideline caption that I carried onto the print piece. Removed. The rule stays as the write-on line.
- Contact card had two blank rules under "Your contact". Now a printed card: hello@following.ae, following.ae, @followingsocials.
- Gift tags had a white dot for the hole, which would have printed. Removed; hole is a drill instruction in the README.
- Scanned all six print PDFs for leftover caption text: none.
- The line: one path, one gradient stroke, Effect > 3D and Materials > Inflate, applied by menu command (`Live Adobe Geometry3D Inflate`) because the effect has no scripting parameters. Default light and depth. `Y.tube` in `bk2bar.jsx`. Replaces the stacked-stroke fake everywhere: booklet p1 and p56, inside lid, note, three tags, guidelines P01 and P02.
- Crit of the 3D line: reads as a real object now; soft matte light, darker underside. Where a loop crosses itself the two passes merge into one surface, so there is no over-and-under. Colour runs left to right across the piece, not along the path, which is invisible on these routes. Inflate settings are Illustrator's defaults; I cannot tune depth or light by script.
- Guidelines P01: lid and top sheet are now pictures of the real pieces, sheared onto the box drawing.

## 2026-10-13, Exterior options and a pattern for the inserts

Zain: bags and boxes not nice (still logo and subtitle only); cards and other material plain black is dull, add a little pattern somewhere.

Exterior, three settings of the same two elements (`exports/packaging/Exterior_options_A_B_C.jpg`):
- A. Wordmark the full width between margins, tagline small at top left. The logo does the work; reads from across a room. Recommended, and set in the print file.
- B. Centred, a third wide, tagline under. Correct and anonymous; any luxury retailer.
- C. Half width bottom left, tagline turned up the right edge. Most "designed"; turned type on a gift box is fussy.
- Tagline is now Obviously caps, tracked, in all three, so the outside speaks the same type as the inside.
- The old rule (a third wide, tagline on the same baseline) was timid: two small things in a big black field.

Inserts:
- Pattern, "the crowd": a dot grid, one dot in twenty lime and larger. Same picture as booklet page 24 (25 in 500 customers are influencers). On the top sheet's right third, the backs of the cards, note and contact card, and as a repeat tile for lining paper. Never outside.
- Colour from the booklet's pairs: brands card burgundy and rose, creators card cobalt and peach, contact card mustard and ink, tags tomato, cobalt, burgundy.
- Lid, note and top sheet stay black so the 3D line and the pattern have a dark ground.
- Tags lost their small line; at 45 mm it was a squiggle.

Crit:
- Squint: the set now reads as black plus five colours plus lime sparks. Before it was eleven black rectangles.
- Risk: three coloured tags, two coloured cards, a mustard card, the gradient band and the lime seal in one box is a lot of colour at once. The black box and top sheet hold it.
- Graphite dots are faint by design; on uncoated black stock they may disappear. Proof it; lighten if lost.
- Guidelines P01 and P04 still show the old exterior placement. Waiting on A, B or C.
- Build note: after a 3D line is made, the next piece failed once with "Target layer cannot be modified". Added a redraw after the 3D command.

## 2026-10-13, Six patterns, a real seal, exterior settled

Zain: what is the seal, it is just a green square; fix what is still weak; the dots are overdone; the vibe digestion had beautiful patterns, we need a variety of patterns as part of the identity.

- Seal: I had drawn the bleed square of a round sticker and nothing else. Now a round 40 mm lime sticker with the ink wordmark and a CutContour line.
- Dots: gone from every piece. One idea stretched over five surfaces was a texture, not a pattern system.
- Went back to the references: FOMO's two-colour liquid, the tape family, the cropped loop bag, Bubble's check. The lesson I had logged and then ignored: a family of patterns, each its own colourway, read as one.
- Six patterns, each from something the brand already owns (G12: the arc, the tag; and the line): Arcs, Tags, Loops, Turns, Check, Words. Two colours each, pairs taken from the booklet.
- Use: backs of the two cards, the note and the contact card; Words on the right third of the top sheet; six repeat tiles for lining, tissue, tape. Never outside.
- Colour load reduced: gift tags back to black and white. Colour now lives on card fronts and all backs.
- Exterior: option A adopted (wordmark full width, tagline small top left). On the bag the tagline drops one margin so it clears the handles; I caught that on the rule page, not before.
- Guidelines: P01, P02, P04, P05 redrawn to match; new P06 Patterns with origins, pairs, uses and six rules.

Crit:
1. Idea: patterns are the brand's three shapes, repeated. A stranger gets "family"; the origin needs the caption.
5. Competitor test: Turns and Arcs are generic forms; the colour pairs and the set of six are what make them Following's. Honest weak point.
6. Remembered: Turns in sky on tomato. It is the closest to the FOMO reference, maybe too close in spirit.
7. Remove one: Check is the least ours. Kept as the quiet one; first to go if six is too many.
- Arcs reads rose-dominant, so "rose on burgundy" in the caption is the wrong way round to the eye.
- Words on the top sheet is loud next to HELLO; lime text field takes a third of the sheet.
- Tags pattern is not used on any piece yet, only as a tile.
- Sample data, invented brand names and the unconfirmed facts are unchanged.

## 2026-10-13, Fixing what the last crit left open

Zain: fix all that is still broken. Audited every export before changing anything.

Patterns:
- Arcs redrawn. The fish-scale could have been anyone's. Now it is G12's arc exactly, a circle wider than its cell rising from the bottom edge, with cells swapping rose and burgundy like a check. The caption no longer reads the wrong way round.
- Check dropped. It had no origin in the brand. Replaced by Hills: the same arc in shallow rows, ink and mustard. Contact card back.
- Tags is now on a piece: the right third of the top sheet, lilac on forest. Words sat there before and fought HELLO, type against type.
- Words moved to the back of the gift tags (new piece K18, one artwork for three tags), rows at 10 mm so the rule on P06 holds.
- Turns kept as it is. A truchet is a common form and I said so; it is also the tile closest to the FOMO reference he asked for and the best of the six. Not changing it for the sake of a tidy list.
- All six tiles now start on the trim edge and repeat edge to edge. Hills and Words were 3 mm off.

Broken things found in the audit:
- Booklet page 1: the line's loops touched the foot of WE DO. Loops moved to the right of the full stop.
- P01: the open box still showed the old top sheet with a lime dot. Replaced with the real piece.
- P02: "07 SEAL / 40 MM" ran into "THE LINE"; the two seals were plain lime dots; the booklet was shown without its band; the title said seven pieces and listed eight. All corrected.
- P04: rule 05 ran past the column. Shortened.
- Print master: an invisible empty rectangle on the contact card back exported as a 72 ppi RGB image in the CMYK PDF. Removed. It was also what kept throwing "Target layer cannot be modified".
- The band, if worn at mid height, covers the wordmark on the cover. Position is now stated: 47 mm from the top, under the tagline.
- Illustrator caches a placed picture by file name for the session; a re-exported PNG with the same name places the old pixels. Rename before re-placing.

Still open, and not mine to close:
- Page 12 photograph is 791 x 1200 px, 186 ppi at size. Needs a larger original.
- Colour needs a printer's proof. Box and bag need supplier dielines.
- Facts and sample figures unconfirmed, as listed above.

## 2026-10-13: Cohesion check before the printer order

- Box in bag: fits. M box on its long edge in the M bag leaves 30 / 20 / 40 mm. S and L follow the same margins.
- Seal on the booklet band: wrong. A 40 mm sticker on a 20 mm band would stick to the cover. Band is now glued; the seal closes the envelope only.
- Note: nowhere to write. Front is black, back was a full pattern. Back is now two thirds plain Sky with Turns on the right third, the same split as the top sheet. Uncoated stock, no lamination.
- Booklet to A6 at Zain's request. Enlarged 105/74 from the A7 build, pages cut to 148 from the spine, cover panels closed in so the spine stays 5 mm. Band redrawn at 326 x 28.
- Cost of A6: pictures drop to 131-222 ppi. Pages 12-15 are the weak ones. Not fixable without larger originals.
- Still honest weak point: the band gradient is the only gradient that is not the 3D line. It reads as the line's colours, so it stays.

## 2026-10-13: End of day, what the client taught me

- I offered my own bags four times while he had a finished bag in his own file. Should have asked for existing artwork before drawing anything.
- I generalised "black and lime" (said about the bag) to the whole kit and stripped the colour. Wrong. One instruction, one piece.
- What survived: one pattern (Turns) in several brand colourways; black box with a centred white lockup; his bag, on true black.
- Still weak: the note front is the only piece with the 3D gradient line; the contact card's orange-red is the least "Following" colour in the set; packaging guideline pages are gone until redrawn.

## 2026-10-24 — Motion territories (AE), round 1
v1 film "Three ways to earn" rejected by Zain as beginner. Its moves were pill-to-card expands, blur-in type, counters and a sweep: textbook template.
- **T1, letters are windows.** Photos live inside giant Obviously Compressed type, and the camera dives through the stem of the I into the photo. A whip pan arrives inside the T of BARTER, then pulls out. The best idea of the three: the type is the camera path. Weak spots: "AED 1,800" is still small on the full bleed, and the frame right before the dive shows a white sliver.
- **T2, the cut.** The brand line shoots across, the frame shears along it, and the halves fly apart onto the next scene. At the end the line compresses into the wordmark underline. Ownable because the device is our line. Weak spot: the halves part a little mechanically; it needs a 1-frame seam flash and a sound hit.
- **T3, the grid.** A profile grid flicks with scroll physics, one post is chosen, the rest fly past the camera in Z, and a GET PAID stack ends in a width cycle. Speaks Instagram natively. Weak spot: it is the most "seen before"; flying tiles are a common move.
Recommendation: T1 as the spine, with T2's line cut as the transition between chapters.

## Instagram Nov-Dec, 44 posts (2026-10-31)
- Margin audit on white boards: clean. All 76 PNGs at 1080 x 1350.
- Still weak: ice cream shot on N07, N15 and N24. Group shot on N29 and N37. N17 and N30 share the roses bottle.
- UGC frames (N13, N30, N39) use our own images. Swap in real tagged posts, with permission, when they exist.
- Reels are covers only until video exists.

## Nov-Dec rebuild, no Reels (2026-11-01)
- December had broken the photo/type chequerboard. Now strict alternation on all 44 posts.
- Removed live-offer and Spotlight claims. Cashback explained with no merchants. Client names on N19 are real.
- Logo shrink bug fixed on N01, N43, N44. Added 61 Stories.
- Weak: Stories are a template by design, the feed stays the hero. Guide PDF still describes Reels and Buffer.

## 2026-11-24 Highlights + tag-free Stories
- Title frames are the 2026-10-31 covers scaled to 9:16 (same colour, word, proportion), so the circle crop is the cover. Plain by design; the Stories inside carry the content.
- Re-exported all 61 Stories without the NEW POST pill (exports/2026-11-24_stories_evergreen) so they can rerun on any day. Tagged versions only go out on the day of their post.
- Date-bound frames (Flag Day, White Friday, Eid, Holiday, New Year) excluded from reruns.
