---
name: domain-media
description: Domain Pack for media and entertainment — news, video and music streaming, podcasts, content platforms, creator tools, subscriptions, and ticketing for events. Use whenever a brief mentions media, news, berita, streaming, video, music, podcast, content, creator, subscription, langganan, event, concert, or ticketing.
---

# Domain Pack — Media & Entertainment
Deep patterns per sub-flow: `references/patterns.md` (load the section you need).
Owner designer: **Jarvis**.

## Users
- Consumers in lean-back or quick-check mode; creators managing content.

## Principles
1. Content is the interface: artwork, headlines, and players lead.
2. Continue where I left off — always.
3. Subscriptions and paywalls are honest about price, trial, and cancellation.
4. Personalization is explainable ("Karena kamu menonton…").

## Patterns
- Home rails (continue watching, recommended, categories), hero only if content-driven.
- Player: controls, progress, quality, subtitles, cast, mini-player.
- Article: headline, byline, time, readable body (line length), related.
- Paywall: plans, trial terms, restore purchase.
- Event ticketing: seat map/categories, quota, e-ticket QR.

## Regulatory UI implications
- Age ratings visible; parental controls where needed.
- Subscription auto-renew and cancellation clearly explained.

## Data guide
- Titles, artists, and events fictional but realistic; durations `1j 42m`; views `1,2 jt tayangan`.

## Recommended styles
`style-dark-premium`, `style-bold-editorial`, `style-playful`.

## Checks
- MED-01 [J][Major] — Continue/resume available on home and detail.
- MED-02 [J][Blocker] — Paywall shows price, period, trial end, and cancellation info.
- MED-03 [J][Major] — Player controls meet target size and contrast over video.
- MED-04 [J][Major] — Article body line length and size readable.
- MED-05 [J][Major] — Offline/download and error states for playback.

## Anti-patterns
Autoplay with sound; dark patterns in cancellation; text over busy artwork without scrim.

## Notes for Desi
Dark mode first-class; accent sparingly over rich imagery.
