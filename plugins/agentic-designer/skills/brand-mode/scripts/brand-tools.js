#!/usr/bin/env node
// brand-tools — DS brand helper (zero dependencies).
//   node brand-tools.js ramp <hex> [--neutral]            → 25…900 ramp (JSON)
//   node brand-tools.js plan <answers.json> --out <dir>   → plan.json + preview.html for /new-brand
//   node brand-tools.js audit "<Brand>" [--out file.md]   → /optimize-brand findings vs the base brand   (all: [--ds <ds-resolved.json>])
// answers.json: { "name": "Acme", "primary": "#1f6feb", "secondary": "#f59e0b" | null, "radiusButton": 8 | "Full",
//                 "neutral500": "#64748a" | null, "font": "Plus Jakarta Sans" }
const fs = require('fs'), path = require('path');
const dsArg = (() => { const i = process.argv.indexOf('--ds'); return i > 0 ? process.argv[i + 1] : null; })();
const DS = JSON.parse(fs.readFileSync(dsArg || path.join(__dirname, '../../ds-knowledge/data/ds-resolved.json'), 'utf8'));   // --ds <file> for any stored DS
const BASE = DS.base || Object.keys(DS.brands)[0];
const STEPS = ['25', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];

// ---------- color math (sRGB ↔ OKLCH) ----------
const hex2rgb = h => { h = h.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255); };
const rgb2hex = c => '#' + c.map(v => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, '0')).join('');
const lin = v => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)), delin = v => (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055);
function toOklch(hex) { const [r, g, b] = hex2rgb(hex).map(lin);
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b), m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b), s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, A = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, B = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return [L, Math.hypot(A, B), (Math.atan2(B, A) * 180 / Math.PI + 360) % 360]; }
function fromOklch(L, C, H) { const a = C * Math.cos(H * Math.PI / 180), b = C * Math.sin(H * Math.PI / 180);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3, m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3, s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s].map(delin); }
function inGamut(L, C, H) { return fromOklch(L, C, H).every(v => v >= -0.0005 && v <= 1.0005); }
function oklchHex(L, C, H) { let c = C; while (c > 0 && !inGamut(L, c, H)) c -= 0.002; return rgb2hex(fromOklch(L, Math.max(0, c), H)); }
const relLum = hex => { const [r, g, b] = hex2rgb(hex).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
const contrast = (a, b) => { const x = relLum(a), y = relLum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };

// ---------- ramp: the given color lands on the step whose standard lightness is closest (auto anchor) ----------
const STD_L = { 25: 0.985, 50: 0.97, 100: 0.935, 200: 0.87, 300: 0.79, 400: 0.70, 500: 0.60, 600: 0.52, 700: 0.44, 800: 0.36, 900: 0.28 };
const CHROMA_K = { 25: 0.06, 50: 0.12, 100: 0.22, 200: 0.38, 300: 0.58, 400: 0.8, 500: 1, 600: 0.95, 700: 0.85, 800: 0.72, 900: 0.58 };
function ramp(hex, { neutral = false, anchor = null } = {}) {
  const [L0, C0, H0] = toOklch(hex);
  const auto = STEPS.filter(s => s !== '25').reduce((best, s) => (Math.abs(STD_L[s] - L0) < Math.abs(STD_L[best] - L0) ? s : best), '500');
  const at = anchor === 'auto' ? auto : (anchor || '500');
  const out = {}; const shift = L0 - STD_L[at];
  for (const s of STEPS) {
    if (s === at) { out[s] = hex.toLowerCase(); continue; }
    // keep the standard curve but bend it toward the anchor so neighbours stay close to the brand color
    const dist = Math.abs(STEPS.indexOf(s) - STEPS.indexOf(at)); const L = Math.min(0.99, Math.max(0.12, STD_L[s] + shift * Math.max(0, 1 - dist / 4)));
    const C = (neutral ? Math.min(C0, 0.04) : C0) * CHROMA_K[s] / CHROMA_K[at];
    out[s] = oklchHex(L, C, H0);
  }
  return { anchor: at, suggestedAnchor: auto, ramp: out };
}

// ---------- radius from the button baseline (patterns of the base brand: button 8) ----------
const PRIMS = [0, 1, 2, 3, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 40];
const snap = v => (v === 'Full' ? 'Full' : PRIMS.reduce((a, b) => (Math.abs(b - v) < Math.abs(a - v) ? b : a)));
function radii(B) {
  const pill = B === 'Full', b = pill ? 12 : Number(B), sharp = !pill && b <= 4;
  const same = pill ? 12 : b, r = {};
  for (const k of ['text-field', 'text-field-area', 'tag', 'calendar', 'calendar-box', 'dropdown-menu', 'tooltips', 'alert', 'list-dropdown', 'table']) r[k] = snap(Math.min(16, Math.max(2, same)));
  r.button = pill ? 'Full' : snap(b);
  r.checkbox = snap(Math.min(8, Math.max(2, Math.round(same / 2))));
  r.modal = snap(Math.min(24, same + 4)); r.card = snap(Math.min(24, same + 4));
  r['bottom-sheet'] = snap(Math.max(16, Math.min(28, same + 8))); r.drawer = r['bottom-sheet'];
  r['fab-small'] = pill ? 'Full' : snap(b + 4); r.fab = pill ? 'Full' : snap(b + 8); r['fab-large'] = pill ? 'Full' : snap(b + 16);
  for (const k of ['chip', 'scroll-bar', 'upload-field-icon', 'alert-icon']) r[k] = sharp ? snap(b) : 'Full';
  return r;
}

// ---------- plan for /new-brand ----------
function plan(a) {
  const ov = {}, checks = [], warnings = [];
  const P = ramp(a.primary, { anchor: a.primaryAnchor || '500' }); STEPS.forEach(s => (ov[`color/primary/${s}`] = P.ramp[s]));
  let S = null; if (a.secondary) { S = ramp(a.secondary, { anchor: a.secondaryAnchor || '500' }); STEPS.forEach(s => (ov[`color/secondary/${s}`] = S.ramp[s])); }
  else STEPS.forEach(s => (ov[`color/secondary/${s}`] = P.ramp[s])); // no secondary → mirror primary so every token still resolves
  if (a.neutral500) { const N = ramp(a.neutral500, { neutral: true, anchor: '500' }); ['100', '200', '300', '400', '500', '600', '700', '800', '900'].forEach(s => (ov[`color/neutral/${s}`] = N.ramp[s])); }
  if (a.font) for (const k of ['display', 'heading', 'body', 'caption', 'button']) ov[`string/font-family/${k}`] = a.font;
  const R = radii(a.radiusButton); for (const [k, v] of Object.entries(R)) ov[`number/radius/${k}`] = v === 'Full' ? '@number/Full' : `@number/${v}`;
  // contrast checks (white text on the primary button, brand text on white, dark-mode equivalents)
  const white = '#ffffff', p5 = P.ramp['500'], p4 = P.ramp['400'], p3 = P.ramp['300'], bg0 = '#0a0a0a';
  const c1 = contrast(white, p5), c2 = contrast(p5, white), c3 = contrast(white, p4), c4 = contrast(p3, bg0);
  checks.push(`button text white on primary/500 ${c1.toFixed(2)}:1 ${c1 >= 4.5 ? 'PASS' : 'FAIL'}`, `brand text primary/500 on white ${c2.toFixed(2)}:1 ${c2 >= 4.5 ? 'PASS' : 'FAIL'}`,
    `dark button white on primary/400 ${c3.toFixed(2)}:1 ${c3 >= 4.5 ? 'PASS' : c3 >= 3 ? 'LARGE-ONLY' : 'FAIL'}`, `dark brand text primary/300 on neutral/1000 ${c4.toFixed(2)}:1 ${c4 >= 4.5 ? 'PASS' : 'FAIL'}`);
  if (P.suggestedAnchor !== P.anchor) warnings.push(`Your primary looks like a typical ${P.suggestedAnchor}, not a 500 — re-run with "primaryAnchor": "${P.suggestedAnchor}" if buttons should be ${P.suggestedAnchor === '600' || P.suggestedAnchor > '500' ? 'lighter' : 'darker'} than your color.`);
  if (c3 < 4.5) warnings.push('Dark mode: white text on primary/400 is below AA — check dark-mode buttons in the preview.');
  if (c1 < 4.5) warnings.push('White text on the primary button fails AA — pick a darker primary, or place your color at 400 so 500 is darker.');
  const hueDist = (h1, h2) => Math.min(Math.abs(h1 - h2), 360 - Math.abs(h1 - h2));
  const [, pc, ph] = toOklch(p5);
  if (pc > 0.08 && hueDist(ph, toOklch('#e0314b')[2]) < 20) warnings.push('Primary is close to the error red — errors and primary actions may look alike.');
  if (pc > 0.08 && hueDist(ph, toOklch('#22a447')[2]) < 20) warnings.push('Primary is close to the success green.');
  if (S) { const [, , sh] = toOklch(S.ramp['500']); if (hueDist(ph, sh) < 25) warnings.push('Secondary is very close to primary — consider a clearer contrast or "no secondary".'); }
  return { mode: a.name, base: BASE, primaryAnchor: P.anchor, secondaryAnchor: S ? S.anchor : null, overrides: ov, radii: R, checks, warnings };
}

// ---------- preview HTML (palette + sample components, light & dark) ----------
function preview(pl, a) {
  const base = DS.brands[BASE].ramps; const ramps = Object.assign({}, base);
  for (const [k, v] of Object.entries(pl.overrides)) if (k.startsWith('color/')) ramps[k.slice(6)] = v;
  const sem = t => Object.fromEntries(Object.entries(DS.semantic_alias).map(([k, v]) => [k, ramps[v[t === 'light' ? 0 : 1]] || '#ff00ff']));
  const L = sem('light'), D = sem('dark'); const r = n => (pl.radii[n] === 'Full' ? '999px' : pl.radii[n] + 'px');
  const vars = s => `--bg:${s['background/secondary']};--surface:${s['surface/primary']};--text:${s['text/primary']};--text2:${s['text/secondary']};--border:${s['border/primary']};--brand:${s['surface/brand/primary']};--brand-subtle:${s['surface/brand/primary-subtle']};--brand-text:${s['text/brand/primary']};--sec:${s['surface/brand/secondary']};--on:${s['text/on-color']};--err:${s['text/semantic/error']}`;
  const sw = fam => STEPS.map(st => `<div class="sw" style="background:${ramps[fam + '/' + st]}"><span>${st}</span></div>`).join('');
  const ui = `<div class="card"><div class="t">Saldo</div><div class="amt">Rp12.450.000</div><div class="row"><button class="btn">Kirim</button><button class="btn sec">Top up</button><span class="chip">Promo</span><span class="tag">Baru</span></div>
  <label class="lab">Nominal</label><div class="field">Rp 0</div><div class="row"><span class="cb"></span><span class="t2">Simpan sebagai favorit</span></div><a class="link">Lihat riwayat</a></div>`;
  return `<!doctype html><html><head><meta charset="utf-8"><title>${a.name} — brand preview</title><link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(a.font || 'Plus Jakarta Sans')}:wght@400;600;700&display=swap" rel="stylesheet"><style>
body{margin:0;font-family:'${a.font || 'Plus Jakarta Sans'}',system-ui,sans-serif;background:#f4f4f5;color:#111;padding:24px}h1{font-size:22px;margin:0 0 4px}h2{font-size:14px;margin:20px 0 8px;color:#555}
.pal{display:flex;gap:4px}.sw{width:56px;height:56px;border-radius:8px;display:flex;align-items:flex-end;padding:4px;font-size:10px;color:#0008}.sw:nth-child(n+7) span{color:#fffc}
.duo{display:flex;gap:16px;flex-wrap:wrap}.scr{width:360px;padding:16px;background:var(--bg);border-radius:20px}.card{background:var(--surface);border:1px solid var(--border);border-radius:${r('card')};padding:16px;color:var(--text)}
.t{color:var(--text2);font-size:13px}.t2{color:var(--text2);font-size:14px}.amt{font-size:28px;font-weight:700;margin:4px 0 12px}.row{display:flex;gap:8px;align-items:center;margin:8px 0;flex-wrap:wrap}
.btn{height:44px;padding:0 16px;border:0;border-radius:${r('button')};background:var(--brand);color:var(--on);font:600 14px inherit;font-family:inherit}.btn.sec{background:var(--sec)}
.chip{height:32px;padding:0 12px;border:1px solid var(--border);border-radius:${r('chip')};display:inline-flex;align-items:center;font-size:13px}.tag{padding:4px 8px;border-radius:${r('tag')};background:var(--brand-subtle);color:var(--brand-text);font-size:12px;font-weight:600}
.lab{display:block;font-size:13px;font-weight:600;margin-top:12px}.field{height:44px;border:1px solid var(--border);border-radius:${r('text-field')};display:flex;align-items:center;padding:0 12px;margin-top:4px;color:var(--text2)}
.cb{width:18px;height:18px;border-radius:${r('checkbox')};background:var(--brand)}.link{color:var(--brand-text);font-weight:600;font-size:14px}ul{font-size:13px;line-height:1.6}</style></head><body>
<h1>${a.name}</h1><div style="font-size:13px;color:#555">Base: ${BASE} · font ${a.font || 'Plus Jakarta Sans'} · radius button ${pl.radii.button}</div>
<h2>Primary (your color at ${pl.primaryAnchor})</h2><div class="pal">${sw('primary')}</div><h2>Secondary${a.secondary ? '' : ' (none → mirrors primary)'}</h2><div class="pal">${sw('secondary')}</div><h2>Neutral${a.neutral500 ? '' : ' (unchanged)'}</h2><div class="pal">${sw('neutral')}</div>
<h2>Light · Dark</h2><div class="duo"><div class="scr" style="${vars(L)}">${ui}</div><div class="scr" style="${vars(D)}">${ui}</div></div>
<h2>Checks</h2><ul>${pl.checks.map(c => `<li>${c}</li>`).join('')}${pl.warnings.map(w => `<li><b>⚠ ${w}</b></li>`).join('')}</ul></body></html>`;
}

// ---------- audit for /optimize-brand ----------
function audit(brand) {
  const b = DS.brands[brand], d = DS.brands[BASE]; if (!b) throw new Error('unknown brand: ' + brand + ' (have: ' + Object.keys(DS.brands).join(', ') + ')');
  const rows = [];
  for (const fam of ['primary', 'secondary', 'neutral', 'success']) {
    const Ls = STEPS.map(s => (b.ramps[`${fam}/${s}`] ? toOklch(b.ramps[`${fam}/${s}`])[0] : null));
    for (let i = 1; i < STEPS.length; i++) if (Ls[i] !== null && Ls[i - 1] !== null && Ls[i] >= Ls[i - 1] - 0.005) rows.push([`${fam}/${STEPS[i]}`, b.ramps[`${fam}/${STEPS[i]}`], 'Not darker than the previous step (duplicate or reversed)', 'Regenerate the ramp from 500 (`brand-tools.js ramp`)']);
  }
  const L = b.light, Dk = b.dark;
  const pairs = [['text/on-color', 'surface/brand/primary', 'Button text on primary', L], ['text/brand/primary', 'surface/primary', 'Brand text / link on white', L], ['text/semantic/warning', 'surface/primary', 'Warning text on white', L],
    ['text/on-color', 'surface/brand/primary', 'Button text on primary (dark)', Dk], ['text/brand/primary', 'surface/primary', 'Brand text (dark)', Dk], ['text/on-color', 'surface/brand/secondary', 'Text on secondary', L]];
  for (const [fg, bg, label, set] of pairs) { if (!set[fg] || !set[bg]) { rows.push([`${fg} / ${bg}`, '—', 'Token missing in the stored DS data', 'Run /refresh-ds <slug> semantic']); continue; } const c = contrast(set[fg], set[bg]); if (c < 4.5) rows.push([`${fg} on ${bg}`, `${set[fg]} / ${set[bg]}`, `${label}: ${c.toFixed(2)}:1 (< 4.5)`, c < 3 ? 'Use a darker step for this brand ramp (e.g. place the brand color at 400 so 500 is darker)' : 'OK for large/bold text only — prefer ≥ 4.5']); }
  for (const [k, v] of Object.entries(b.numbers || {})) { const dv = (d.numbers || {})[k]; if (!dv || v === dv || v === 'Full' || dv === 'Full') continue; const r = Number(v) / Number(dv);
    if (r < 0.5 || r > 2) rows.push([`number/${k}`, `${v} (${BASE} ${dv})`, `${r < 0.5 ? 'Far below' : 'Far above'} the ${BASE} baseline — likely unintended`, `Use ${dv} (${BASE}) unless this brand needs it`]); }
  const fam = ['radius/text-field', 'radius/tag', 'radius/alert', 'radius/dropdown-menu', 'radius/tooltips', 'radius/table'].map(k => (b.numbers || {})[k]).filter(Boolean);
  if (new Set(fam).size > 2) rows.push(['radius family', fam.join(', '), 'Container radii are inconsistent', 'Align them to one value derived from the button radius']);
  return rows;
}

// ---------- CLI ----------
const [, , cmd, arg, ...rest] = process.argv; const opt = k => { const i = rest.indexOf('--' + k); return i >= 0 ? rest[i + 1] || true : null; };
if (cmd === 'ramp') console.log(JSON.stringify(ramp(arg, { neutral: !!opt('neutral'), anchor: opt('anchor') }), null, 1));
else if (cmd === 'plan') { const a = JSON.parse(fs.readFileSync(arg, 'utf8')); const pl = plan(a); const out = opt('out') || '.'; fs.mkdirSync(out, { recursive: true });
  fs.writeFileSync(path.join(out, 'brand-plan.json'), JSON.stringify(pl, null, 1)); fs.writeFileSync(path.join(out, 'brand-preview.html'), preview(pl, a));
  console.log(JSON.stringify({ mode: pl.mode, primaryAnchor: pl.primaryAnchor, radii: pl.radii, checks: pl.checks, warnings: pl.warnings, files: ['brand-plan.json', 'brand-preview.html'] }, null, 1)); }
else if (cmd === 'audit') { const rows = audit(arg); const md = `# /optimize-brand — ${arg} (vs ${BASE})\n\n| Token | Now | Finding | Suggestion |\n|---|---|---|---|\n` + rows.map(r => `| ${r.join(' | ')} |`).join('\n') + `\n\n${rows.length} finding(s). Nothing is changed until the Manager approves.\n`;
  if (opt('out')) fs.writeFileSync(opt('out'), md); console.log(md); }
else { console.error('usage: brand-tools.js ramp <hex> | plan <answers.json> --out <dir> | audit "<Brand>"'); process.exit(2); }
module.exports = { ramp, radii, plan, audit, contrast, toOklch };
