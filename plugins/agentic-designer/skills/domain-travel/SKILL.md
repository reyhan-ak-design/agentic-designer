---
name: domain-travel
description: Domain Pack for travel and hospitality — flights, trains, buses, hotels, villas, tours and activities, itineraries, bookings, check-in, and loyalty. Use whenever a brief mentions travel, perjalanan, flight, pesawat, kereta, hotel, booking, reservation, tiket, itinerary, tour, destination, check-in, or hospitality.
---

# Domain Pack — Travel & Hospitality
Deep patterns per sub-flow: `references/patterns.md` (load the section you need).
Owner designer: **Jarvis**.

## Users
- Planners comparing options (price, time, flexibility) and travelers on the move needing tickets fast.

## Principles
1. Search inputs are fast and forgiving (recent routes, date ranges, passenger counts).
2. Comparison is scannable: time, duration, stops, price, flexibility.
3. The ticket/booking is accessible offline and at a glance on the travel day.
4. Changes, refunds, and cancellation rules are visible before payment.

## Patterns
- Search form: origin/destination with swap, dates, passengers/rooms, class.
- Results list with sort and filters; price calendar.
- Detail: itinerary timeline, baggage, refund/reschedule rules, facilities.
- Passenger details with saved travelers; seat selection.
- E-ticket/voucher with booking code, QR, and key info; add to wallet.

## Regulatory UI implications
- Total price including taxes and fees before payment; refund policy visible.
- Passenger identity data consent; ID masking.

## Data guide
- Routes: CGK → DPS, 06.15–09.10 WITA, 1j 55m, langsung. Train: Gambir → Bandung.
- Booking code `TX7K2P`. Hotels: generic names in Bali, Yogyakarta, Labuan Bajo.

## Recommended styles
`style-modern-minimal`, `style-elegant`, `style-luxury` (premium stays).

## Checks
- TRV-01 [J][Blocker] — Total price with taxes/fees before payment.
- TRV-02 [J][Blocker] — Refund/reschedule rules visible before payment.
- TRV-03 [J][Major] — Times show timezone when crossing zones.
- TRV-04 [J][Major] — E-ticket readable at a glance: code, time, gate/seat, QR.
- TRV-05 [J][Major] — No-results and sold-out states offer alternatives.

## Anti-patterns
Price shown without taxes; hidden baggage costs; unreadable timelines.

## Notes for Desi
Photography-led; accent for search/CTA only.
