# Priority guide format (write before any layout)

```
PRIORITY GUIDE — <Screen>
Job: <user> needs to <job> so that <outcome>. Risk if wrong: <risk>.
Primary action: <label — outcome>

RANK  ELEMENT                      REAL DATA                               TAG         ROLE
1     Amount input                 Rp3.000.000 (max Rp999.999.999)         [critical]  Hero (H1 32 / Display S 40)
2     Source of funds              Tabungan Utama ••8821 · Saldo Rp2.450.750 [critical] Primary (Body L 16 Semibold)
3     Recipient                    Siti Nurhaliza · BCA ••4417             [critical]  Primary
4     Fee / total                  Biaya Rp2.500 · Total Rp3.002.500       [critical]  Primary (in action bar)
5     Schedule                     Sekarang / Nanti / Berulang             —           Secondary
6     Note (optional)              "Bayar arisan September"                —           Secondary
7     Limits                       Min Rp10.000 · limit harian Rp50.000.000 —          Meta (shown on error or info tap)
8     Quick amounts                Rp50rb / Rp100rb / Rp250rb / Rp500rb    —           Meta-level decoration (must not outrank 2–4)

CUT / DISCLOSED: <what you removed or moved behind a tap, and why>
EMPHASIS: hero = 1 · primary action = <label> · secondaries = <≤3>
MODE: Focused-mobile · T1 12 · T2 24 · T3 32
```
Example values above are illustrative for a transfer screen; always derive your own from the brief.
