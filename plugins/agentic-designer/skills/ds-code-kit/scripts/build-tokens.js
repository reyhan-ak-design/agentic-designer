#!/usr/bin/env node
// Build tokens.css from kit-extract.js JSON pages. Zero dependencies.
// Usage: node build-tokens.js --light light.json --dark dark.json --styles styles.json --map kit-map.json --out ../kit/tokens.css
// Each JSON may be one page or an array of pages ({vars:{...}}); later pages merge in.
const fs = require('fs'), path = require('path');
const arg = k => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : null; };
const load = f => { if (!f) return {}; const j = JSON.parse(fs.readFileSync(f, 'utf8')); const pages = Array.isArray(j) ? j : [j]; return pages.reduce((a, p) => Object.assign(a, p.vars || p), {}); };
const slug = s => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const PX = /(spacing|space|radius|size|gap|padding|margin|width|height|font-size|line-height|stroke|border|offset|inset)/i, MS = /(duration|delay)/i;
const val = (name, v) => typeof v === 'number' ? (MS.test(name) ? `${v}ms` : PX.test(name) ? `${v}px` : `${v}`) : typeof v === 'string' ? v : JSON.stringify(v);
const light = load(arg('light')), dark = load(arg('dark')), styles = arg('styles') ? JSON.parse(fs.readFileSync(arg('styles'), 'utf8')) : { text: {}, effects: {} };
const map = arg('map') ? JSON.parse(fs.readFileSync(arg('map'), 'utf8')) : {};
const W = { thin: 100, extralight: 200, 'extra light': 200, light: 300, regular: 400, book: 400, medium: 500, semibold: 600, 'semi bold': 600, bold: 700, extrabold: 800, 'extra bold': 800, black: 900 };
const weight = s => { const k = s.toLowerCase().replace(/italic/, '').trim(); return W[k] || W[k.replace(/\s/g, '')] || 400; };
let css = `/* tokens.css — generated from the Figma design system. Do not edit by hand; re-run build-tokens.js. */\n:root {\n`;
for (const [k, v] of Object.entries(light)) css += `  --${slug(k)}: ${val(k, v)};\n`;
for (const [k, v] of Object.entries(styles.effects || {})) if (v) css += `  --shadow-${slug(k)}: ${v};\n`;
const fam = Object.values(styles.text || {})[0]; if (fam) css += `  --font-family: "${fam.family}", system-ui, -apple-system, "Segoe UI", sans-serif;\n`;
css += `  /* roles used by kit.css (edit kit-map.json, not this block) */\n`;
const known = new Set(Object.keys(light).map(slug)), missing = [];
for (const [role, token] of Object.entries(map)) { if (role.startsWith('_')) continue; const literal = /^(#|\d|rgb|cubic|var\()/.test(String(token));
  if (!literal && !known.has(slug(token))) missing.push(`${role} → ${token}`);
  css += `  --ad-${role}: ${literal ? token : `var(--${slug(token)})`};\n`; }
css += `}\n`;
const diff = Object.entries(dark).filter(([k, v]) => light[k] !== v);
if (diff.length) { css += `[data-theme="dark"] {\n`; for (const [k, v] of diff) css += `  --${slug(k)}: ${val(k, v)};\n`; css += `}\n`; }
for (const [k, t] of Object.entries(styles.text || {})) css += `.t-${slug(k)} { font-family: var(--font-family); font-weight: ${weight(t.weight)}; font-size: ${t.size}px; line-height: ${t.lh}; letter-spacing: ${t.ls}; }\n`;
const out = arg('out') || 'tokens.css'; fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true }); fs.writeFileSync(out, css);
if (missing.length) console.log('WARNING — roles pointing to tokens not in the export (fix kit-map.json):\n  ' + missing.join('\n  '));
console.log(`tokens.css written: ${Object.keys(light).length} vars, ${diff.length} dark overrides, ${Object.keys(styles.text || {}).length} text styles, ${Object.keys(map).length} roles → ${out}`);
