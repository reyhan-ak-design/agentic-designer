---
name: domain-crypto
description: Domain Pack for crypto and digital-asset products — exchanges (spot trading, order book, market/limit/stop orders, charts), wallets and custody, on-chain deposit/withdrawal (networks, memo/tag, gas fees, address book), staking/earn, portfolio and PnL, price alerts, and rupiah on/off-ramp — Indonesian market by default with design-level regulatory implications. Use whenever a brief mentions crypto, aset kripto, digital asset, exchange, trading, wallet, token, coin, BTC, ETH, USDT, staking, blockchain, on-chain, or DeFi; load together with domain-finance.
---

# Domain Pack — Crypto & Digital Assets
Owner designer: **Jarvis**. Load with `domain-finance` (payments, KYC, security patterns).

## Users
- From first-time buyers (small rupiah amounts, fear of loss, jargon-averse) to active traders
  (speed, precision, dense data). Design for the product's primary segment and offer a path to the other
  (e.g. "Mode Lite / Pro").

## Principles
1. **Precision is trust.** Prices, quantities, and fees are exact, with the right decimals per asset; never rounded in a way that changes meaning.
2. **Always show the cost of an action before it happens:** price, quantity, fee, estimated total, slippage/price impact.
3. **Irreversibility is explicit.** On-chain withdrawals cannot be undone — network, address, memo/tag, and amount are verified before sending.
4. **Volatility is visible, not dramatized.** Last-updated time, 24h change with sign + arrow + color, no gamified pressure.
5. **Beginner safety without blocking pros:** defaults and warnings for novices, progressive disclosure for advanced controls.

## Core patterns
- **Market list:** asset icon, name + ticker, last price (IDR or USDT per market), 24h change %, optional sparkline; tabs (Favorit, IDR, USDT, Gainers/Losers, New); search; sort.
- **Asset detail:** price hero with change, chart (line default; candles in Pro), time ranges (1H/1D/1W/1M/1Y/All), stats (market cap, volume, high/low), about, your holdings, buy/sell sticky.
- **Buy/Sell (Lite):** amount in IDR or asset units (toggle), estimated quantity/proceeds, fee, total, price quote with refresh/expiry countdown, review → PIN/biometric → result.
- **Trade (Pro):** order types (market, limit, stop-limit), price + amount inputs with steppers and % of balance slider, order book (bids/asks with depth), recent trades, open orders, order history; clear order status (open, partial, filled, cancelled).
- **Deposit crypto:** choose asset → **choose network** (explicit, with warnings for wrong network) → address + QR + memo/tag (if required, visually prominent) → minimum deposit, confirmations required, arrival estimate.
- **Withdraw crypto:** asset → network → address (paste, scan, address book; whitelist/verification) → memo/tag → amount (available balance, min, network fee, receive amount) → review (all fields restated) → security (PIN + OTP/email) → status tracking (pending, processing, completed, failed) with tx hash link.
- **Rupiah on/off-ramp:** deposit IDR via VA/bank transfer; withdraw IDR to a verified bank account in the user's name.
- **Portfolio:** total value, PnL (today, total; realized vs unrealized), allocation, per-asset rows with average buy price; hide balance toggle.
- **Earn/Staking:** APY/APR with its basis explained, lock period, unstake/cooldown time, rewards history, risks.
- **Price alerts & watchlist.**

## Regulatory UI implications (Indonesia, design-level — not legal advice)
- Crypto trading in Indonesia is supervised by **OJK** (transferred from Bappebti in January 2025); exchanges must be licensed. Provide a disclosure slot for the license statement on onboarding, product, and receipts (`[copy: legal]`).
- KYC before trading/withdrawal; tiered limits; travel-rule data for transfers to other platforms where the client requires it (recipient platform/name).
- Risk disclosure before first purchase and for high-risk assets/features (new listings, leverage if offered).
- Taxes and fees shown as separate line items when the client applies them.
- Only assets permitted by the regulator's list — use the client's asset list; never invent tickers in real-product mockups beyond well-known ones.

## Data guide
- Pairs: BTC/IDR, ETH/IDR, USDT/IDR, SOL/IDR, BTC/USDT. Prices: BTC ≈ Rp1.6–1.9 miliar, ETH ≈ Rp55–70 juta, USDT ≈ Rp16.000 (use current-ish plausible values; mark as example data).
- Precision: IDR prices integer with dots (`Rp1.742.350.000`); crypto quantities up to 8 decimals for BTC (`0,00125430 BTC`), 4–6 for most alts; USDT 2 decimals. Indonesian decimal comma.
- Networks: Bitcoin, Ethereum (ERC-20), BNB Smart Chain (BEP-20), Tron (TRC-20), Solana, Polygon. Memo/tag for XRP, XLM, etc.
- Addresses shortened in the middle: `0x71C7…976F`; always copyable in full.
- Times: `28 Sep 2026, 21:14:05 WIB` for trades.

## Recommended Style Packs
`style-dark-premium` (trading/Pro), `style-modern-minimal` (Lite/beginner), `style-corporate-trustworthy` (bank-backed digital assets).

## Compliance & quality checks
- CRY-01 [J][Blocker] — Price, quantity, fee, and total (or receive amount) shown before any order or withdrawal is confirmed.
- CRY-02 [J][Blocker] — Withdrawal review restates asset, network, full address, memo/tag, and amount; network choice is explicit.
- CRY-03 [J][Blocker] — Memo/tag requirement is prominent on deposit screens for assets that need it.
- CRY-04 [M][Major] — Decimal precision correct per asset; Indonesian number formatting throughout.
- CRY-05 [J][Major] — Prices show last-updated time or live indicator; quotes show expiry.
- CRY-06 [J][Major] — Order and withdrawal statuses are distinct (open/partial/filled/cancelled; pending/processing/completed/failed) with next steps.
- CRY-07 [J][Major] — Risk disclosure before first buy; license disclosure slot present (`[copy: legal]`).
- CRY-08 [J][Major] — Changes use sign + arrow + color, never color alone.
- CRY-09 [J][Major] — Pro-level controls (order book, advanced order types) disclosed progressively in Lite experiences.

## Anti-patterns
Confetti or casino cues on trades · countdown pressure to buy · hiding network fees until the last step ·
defaulting to the wrong network · truncating addresses without a copy/full view · rounding balances so
"sell all" leaves dust · red/green only.

## Notes for Desi
Dark mode is often primary for trading — verify brand ramps and semantic up/down colors in both modes;
up/down colors must be distinct from error/success where possible (or paired with icons).
