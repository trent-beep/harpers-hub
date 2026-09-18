# Slope Panic — Launch Sequence

A practical, objective plan to take Slope Panic from "a page on GitHub Pages"
to "an installable iOS app that makes money and gets found." Written to be
sequenced: do Phase 0, then decide, then Phase 1, and so on. Nothing here
locks you in — each phase is cheap to reverse until you spend money.

> Scope note: this covers **Slope Panic** (the game at `/slope-panic/`), which is
> the product the recent GitHub work has been about. The Drive Hub is untouched.

---

## TL;DR — the recommended path

1. **Ship as a PWA first (free, this week).** iOS lets people "Add to Home
   Screen" and it launches full-screen like an app. Foundations for this are
   done in this change (service worker + offline + install-ready). This is the
   fastest way to be "on iOS" with zero cost and zero App Store review.
2. **Monetise the PWA cheaply** to prove people will pay *before* you spend on
   the App Store: one "remove the ad / unlock all themes" purchase via Stripe,
   or a single banner ad. If nobody pays on the web, they won't pay on the App
   Store either — and you'll have learned that for ~$0.
3. **Only then go to the App Store** (real native wrapper via Capacitor). It
   costs money and time (Apple Developer Program, a build machine, review), so
   spend it once you have signal, not before.
4. **Marketing runs in parallel from day one** — it's mostly free and it's what
   actually decides whether a game like this lives or dies.

**Why this order:** the expensive, slow, irreversible steps (App Store account,
review, native build) come *last*, after the cheap steps have told you whether
it's worth it. That's the opposite of confirmation bias — you're trying to find
out if this *won't* work as early and cheaply as possible.

---

## Reality check before you monetise (read this)

Slope Panic started as a SkiFree-style ski game and has now been **reworked into
an original downhill mountain-bike game** — a forest setting, a biker, dirt
jumps, squashable rabbits/flowers, and a **bear** (not the "Abominable Snow
Monster") as the chaser. That reskin is deliberate: it makes the game legibly its
own IP, which substantially lowers the trademark risk of monetising. Two things
still worth knowing:

- **Trademark/IP.** The mechanic (endless downhill, a creature that chases you
  past a distance marker) is a genre convention, not something anyone owns — plenty
  of games use it. Now that the theme, art, and creature are original, the main
  residual risk is small. Keep it that way: don't reintroduce the SkiFree name or
  its exact assets, and (optional, cheap) add a one-line "original game" credit,
  which the menu already carries.
- **App Store review.** Apple rejects thin "just a website in a box" apps
  (Guideline 4.2). A Capacitor wrapper is fine *if* the app genuinely uses native
  features (offline play, home-screen presence, Game Center, haptics, IAP). Plan
  to add at least one or two of those, not ship a bare WebView.

This isn't legal advice — if real money gets involved, a 30-minute chat with an
IP lawyer is cheap insurance.

---

## Track A — Accessible on iOS as an app

Two routes. They're not either/or; A1 is a stepping stone to A2.

### A1 · PWA / "Add to Home Screen" — free, live now
**What the player does:** open the link in Safari → Share → *Add to Home Screen*.
It then launches full-screen with its own icon, no browser chrome, works offline.

**Status:** ✅ foundations shipped in this change.
- `manifest.webmanifest` + apple-touch-icon + `apple-mobile-web-app-*` tags — already present.
- `sw.js` service worker (new) — offline play + proper installability.
- Service-worker registration (new) in `index.html`.

**Still to do for a polished A1:**
- [ ] Confirm install works on a real iPhone (Safari → Add to Home Screen → open, then turn on Airplane Mode and check it still plays).
- [ ] Add a subtle first-visit hint on iOS ("Tap Share → Add to Home Screen to play full-screen") — iOS gives no automatic install prompt.
- [ ] Custom offline/splash polish (optional).

**Limits to be honest about:** a PWA is **not in the App Store** — no store
listing, no store search, no App Store reviews, and IAP must go through
Stripe/web, not Apple's in-app purchase. Discovery is entirely on your marketing.

### A2 · Real App Store app — costs money, slower, higher ceiling
Wrap the same HTML game in a native shell with **Capacitor** (open-source, keeps
one codebase). You get a store listing, store search, ratings, push, Game
Center, and Apple's IAP.

**What it takes:**
- Apple Developer Program — **US$99/year (~A$149)**, required to publish.
- A Mac with Xcode **or** a cloud Mac build service (e.g. Codemagic, Ionic
  Appflow, EAS-style CI) if you don't have a Mac.
- App Store review (typically 1–3 days; can reject — see reality check).
- Store assets: screenshots per device size, description, keywords, privacy
  policy URL, support URL.

**Rough steps:** `npm init` a Capacitor project → drop the game in as web assets
→ add native niceties (haptics, Game Center leaderboard) → build in Xcode/CI →
submit. I can scaffold this repo for Capacitor when you're ready to commit to it.

> Recommendation: **do A1 now, hold A2** until monetisation shows signal.

---

## Track B — Monetisation

Pick the model that matches how far along you are. You can layer these later.

| Model | How | Effort | Best when |
|---|---|---|---|
| **Cosmetic / unlock IAP** | One purchase unlocks all themes + removes ads (Stripe on web, Apple IAP in-app) | Low–Med | Recommended first test |
| **Remove-ads** | Free with one banner/interstitial; pay once to remove | Low | You have real traffic |
| **Banner/interstitial ads** | AdMob (native app) or a web ad network (PWA) | Low | High volume, low intent to pay |
| **Paid app** | Charge up-front on the App Store | Low | Rarely works for casual arcade games — avoid |
| **Tip jar** | "Buy me a coffee"/Stripe link | Tiny | Goodwill, not real revenue |

**Recommended sequence:**
1. Add a single **"Unlock everything — remove ads + all themes"** purchase.
   On the PWA, wire it with a **Stripe Payment Link** (no backend needed) and
   store the unlock flag in `localStorage`. This is a day of work and proves
   willingness to pay.
2. If/when you go native (A2), move that to **Apple IAP** (Apple takes 15–30%
   but handles billing and is required for digital goods in App Store apps).
3. Add ads only if volume is high and pay-through is low.

**Numbers to be realistic about:** casual free games typically monetise at
cents-per-user, not dollars. Revenue is `players × conversion × price`. The lever
that matters most is *players* — which is Track C.

---

## Track C — Marketing (runs from day one, mostly free)

A game like this lives or dies on distribution, not features. Cheapest wins first:

**Foundations (free, mostly done here):**
- [x] Shareable link with social cards — Open Graph + Twitter tags added in this change.
- [ ] Replace the share image with a proper **1200×630 hero** (a screenshot with the title), then switch `twitter:card` to `summary_large_image`.
- [ ] A one-line pitch you repeat everywhere: *"Slope Panic — ski, dodge, and outrun the yeti. Free in your browser."*

**Launch beats (free):**
- [ ] Post the playable link where retro/casual gamers gather: r/WebGames, r/incremental_games, r/SkiFree nostalgia threads, Hacker News "Show HN", Lobsters, itch.io.
- [ ] A 15–30s screen-recording (with a near-miss from the yeti) for TikTok / Reels / X — short clips of "so close" moments are the highest-ROI content for arcade games.
- [ ] Product Hunt launch (works for polished web toys).
- [ ] itch.io listing — free, has its own audience that likes tribute/retro games.

**If you reach the App Store (A2):**
- [ ] App Store Optimisation: title + subtitle + keywords ("ski", "retro", "arcade", "endless", "yeti"), strong first screenshot, a short preview video.
- [ ] Ask early players for ratings — App Store ranking is driven hard by rating count and velocity.

**Measure it:** add lightweight, privacy-friendly analytics (e.g. Plausible or
Cloudflare Web Analytics — both cookie-free) so you can see plays, install rate,
and where players come from. Don't fly blind.

---

## The sequence, on a timeline

- **Phase 0 — this week (done / near done):** PWA foundations, offline, share
  cards. *Delivered in this change.* → verify install on a real iPhone.
- **Phase 1 — cheap validation (1–2 weeks):** add the Stripe unlock, add
  cookie-free analytics, do one Reddit/Show-HN/itch.io push, watch the numbers.
- **Phase 2 — decide:** enough plays + any paid conversions? → go to Phase 3.
  Crickets? → iterate on the game or the marketing angle, *don't* spend on the App Store yet.
- **Phase 3 — App Store (only if Phase 2 is green):** Capacitor scaffold, Apple
  Developer account, native polish (Game Center, haptics), IAP, submit, ASO.

---

## Decisions I need from you to go further

1. **iOS path now:** polish the PWA (free) — or do you want me to scaffold the
   Capacitor App Store project too? *(Recommend: PWA now.)*
2. **Monetisation model to build first:** the Stripe "unlock everything"
   purchase, ads, or hold off entirely for now? *(Recommend: Stripe unlock.)*
3. **Legal comfort:** ✅ largely handled — the game is now an original downhill
   MTB game (bike/forest/bear, own art and copy). Anything further you want here
   before we charge for it?

Tell me which way on each and I'll build the next phase.

---

## What has been delivered so far

- `sw.js` — service worker: offline play + real installability.
- Service-worker registration + Open Graph / Twitter share tags in `index.html`.
- This `LAUNCH.md` — the plan above.
- **Own-IP reskin:** ski → downhill mountain bike, snow → forest, yeti → **bear**;
  new **rabbit** (squash for +30) and **flower** (squash for −20) mechanics with
  floating score popups; dirt **jumps** + mid-air **tumbles**; all 5 colour themes
  reworked as forest palettes; all player-facing copy updated.

Still ski-branded (follow-ups, if you want them): the app name "Slope Panic" and
the home-screen **icons** (`icon-*.png`) — a rename + new bike/forest icons would
finish the rebrand.

The Drive Hub (`/index.html` at the repo root) is untouched.
