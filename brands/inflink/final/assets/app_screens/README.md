# Inflink native app captures

Captured 31 October 2026 from `apps/mobile` at commit `127b88f` (main), on the Android emulator `Medium_Phone_API_36.1`. All files are 1080x2400 PNG, native resolution, nothing retouched.

## How they were made
- The app's real components rendered in Expo Go (SDK 54) from a detached git worktree outside NEWINFLINK, in Metro production mode (`--no-dev --minify`), so no dev overlays.
- `EXPO_PUBLIC_API_URL` pointed at a local mock API (`_capture_harness/mock-api.cjs`). Only the data is staged. No production backend, account, payment, WhatsApp or email was involved. The direct booking "sent" state is a POST answered by the mock.
- Three native modules Expo Go lacks (`expo-iap`, `react-native-compressor`, `expo-notifications`) were stubbed in the worktree (`_capture_harness/noop.js`). None draws UI on these screens.
- Status bar is the real one, with battery forced to full and signal and Wi-Fi at full. The clock shows the real capture time, so it varies from 4:50 to 5:08.

## Fictional data
Creator: Noor Haddad, Pro plan, both content and modelling. Brands: Sunpeel Skincare, Tamra Coffee, Marsa Bay Club, Qamra Candles, Luma Oud, Halwa House, Saffa Dates, Nuwa Sandals. Bank: Gulf Example Bank. These brand names were invented and not checked against real companies, except Sunpeel, carried over from the earlier harness. All numbers are demo numbers, and the fee maths uses Pro at 4.5% + AED 2. Images are the existing AI-generated demo set.

## Files
| File | Shows |
|---|---|
| `native_home.png` | Home, Pro: withdrawable balance, money in escrow, two jobs waiting |
| `native_offers.png` | Offers inbox: two listing offers, two RFP invites |
| `native_orders.png` | Orders list across statuses |
| `native_order_detail_money_held.png` | New paid order: "Held in escrow", 72h respond window, accept/counter/decline |
| `native_order_detail_in_progress.png` | Order in progress, money stays in escrow until approval |
| `native_order_content_submitted.png` | Delivered, waiting for brand approval, auto-release in 3 days |
| `native_order_shoot_booked.png` | Model shoot order in progress |
| `native_order_completed.png` | Approved and released, AED 1,144 in balance |
| `native_order_what_you_earn.png` | Fee breakdown for one order |
| `native_earnings.png` | Money: balance, month, recent activity |
| `native_earnings_over_time.png` | Monthly earnings chart. "Avg order" and "Orders" read as a dash, which is what the app does today |
| `native_payouts.png` | Payout history and bank |
| `native_withdraw.png` | Cash out sheet with withdrawal fee |
| `native_ai_brief.png` | AI brief, creator's view: key message, product, points, avoid list |
| `native_ai_brief_shooting_guide.png` | Same brief scrolled to the shooting guide. Brief text is written for the demo, not a live AI run. Clock sits on the green card: crop the top when framing |
| `native_what_brands_see.png` | "What brands see" preview: audience data only, not a storefront |
| `native_listing.png` | Listing detail, creator's view |
| `native_listing_editor.png` | Edit listing |
| `native_model_digitals.png` | Digitals, five slots. **Tank-top images: founder review before use (brief rule 5)** |
| `native_model_diary.png` | Availability calendar, November, with booked and blocked days |
| `native_model_card_measurements.png` | Measurements, the closest native thing to a model card. **Same tank-top image** |
| `native_model_portfolio.png` | Portfolio by credit |
| `native_cancellation_terms.png` | Rates and cancellation ladder |
| `native_quote_requests.png` | Quote requests (Pro) |
| `native_direct_booking.png` | New direct booking, filled in (Pro) |
| `native_direct_booking_sent.png` | Pay link sent |
| `native_onboarding_welcome.png`, `native_onboarding_welcome_2.png` | Welcome carousel |
| `native_onboarding_talent_type.png` | Content or modelling picker |
| `native_onboarding_claim_link.png` | Claim your link, handle available |
| `native_you_are_live.png` | First go-live moment |
| `native_link_in_bio.png` | Link in bio grid (re-take) |
| `native_store.png`, `native_store_listings.png` | Store tab, top and scrolled to listings (re-take). The scrolled one has content under the clock: crop the top |
| `native_analytics.png` | Analytics, Pro (re-take) |
| `native_me.png` | Me tab |

## Not in the native app
- **Public page or listing as a buyer sees it:** "Preview" and "Preview on my Inflink" leave the app for the website. Not captured.
- **Public model card:** web only. Measurements is the nearest screen.
- **Order progress as a stepped tracker:** the native order screen shows one state at a time, with no step timeline.

## Image changes from the earlier captures
The earlier store capture's lead tile was a low-neckline crop. Here that image is cropped to head and shoulders for the Summer edit link and the Reel listing, and the lead link tile is the beach club image.

## Re-capturing
`_capture_harness/` holds the mock API, the stub and the adb helpers. The demo images and the worktree were temporary and are not kept; image sources are in `Inflink Design System/higgsfield-assets/`.
