# Template — rencana size class (kirim ke Manager sebelum build)

**Layar:** <nama layar> · **Platform:** Android / iPhone / keduanya

## 1. Target & size class
| Target | Ukuran (dp/pt, W × H) | Width class | Height class | Sumber ukuran |
|---|---|---|---|---|
| Galaxy Z Fold – cover | … × … | Compact | Medium | <link spec> |
| Galaxy Z Fold – dalam, portrait | … × … | Medium | … | |
| iPhone 16 Pro – portrait | 402 × 874 | Compact | Medium | |
| iPhone 16 Pro – landscape | 874 × 402 | Expanded | **Compact** | |

## 2. Jadi berapa layout?
<N> target → <M> layout unik: Compact · Compact-height landscape · Medium · Expanded …

## 3. Layout per class
| Class | Navigasi | Panel | Yang berubah dari Compact | Disembunyikan / ditambah |
|---|---|---|---|---|

## 4. Transisi yang harus mulus
Rotasi · lipat/buka · split screen → yang dipertahankan: <item terpilih, posisi scroll, isi form>

## 5. Beda Android vs iPhone (kalau dua-duanya)
- Navigasi: rail (Android) vs tab bar (iPhone) …
- Safe area / gesture / komponen sistem …

## 6. Frame yang akan dibuat
`<Layar> / <Platform> / <Class W×H> / <Contoh device>` — total <N> frame · perkiraan effort: <S/M/L>

## 7. Pertanyaan (maks 3)
1. …

> Saya tunggu "oke" atau koreksi sebelum mulai build.
