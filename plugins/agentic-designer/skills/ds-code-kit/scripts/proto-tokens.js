#!/usr/bin/env node
// proto-tokens — write tokens.css for an HTML prototype straight from the stored DS data (no Figma calls).
// node proto-tokens.js --brand "<brand>" [--ds <ds-resolved.json>] [--out tokens.css]
// Emits Light (:root) and Dark ([data-theme="dark"]) semantic colors as --c-<token>, the kit roles (--ad-*), radius/sizes
// from the brand numbers, and the brand font. Default DS file = ds-knowledge/data/ds-resolved.json.
const fs = require('fs'), path = require('path');
const arg = k => { const i = process.argv.indexOf('--' + k); return i > 0 ? process.argv[i + 1] : null; };
const dsFile = arg('ds') || path.join(__dirname, '../../ds-knowledge/data/ds-resolved.json');
const ds = JSON.parse(fs.readFileSync(dsFile, 'utf8')); const brand = arg('brand') || Object.keys(ds.brands)[0]; const b = ds.brands[brand];
if (!b) { console.error('unknown brand. available: ' + Object.keys(ds.brands).join(', ')); process.exit(2); }
const slug = s => s.replace(/[^a-z0-9]+/gi, '-').toLowerCase();
const px = v => (v === 'Full' ? '999px' : `${v}px`); const n = b.numbers || {};
const roles = t => ({ bg: t['background/secondary'], surface: t['surface/primary'], 'surface-2': t['surface/secondary'], 'surface-disabled': t['surface/disabled'],
  overlay: t['surface/overlay'] || 'rgba(0,0,0,.52)', text: t['text/primary'], 'text-2': t['text/secondary'], 'text-3': t['text/tertiary'], 'text-on-color': t['text/on-color'],
  border: t['border/primary'], 'border-strong': t['border/secondary'], primary: t['surface/brand/primary'], 'primary-hover': t['surface/action/hover/brand-primary'] || t['surface/brand/primary-hover'],
  'primary-subtle': t['surface/brand/primary-subtle'], 'primary-text': t['text/brand/primary'], success: t['text/semantic/success'], 'success-subtle': t['surface/semantic/success-subtle'],
  warning: t['text/semantic/warning'], 'warning-subtle': t['surface/semantic/warning-subtle'], error: t['text/semantic/error'], 'error-subtle': t['surface/semantic/error-subtle'],
  info: t['text/semantic/info'], 'info-subtle': t['surface/semantic/info-subtle'] });
const block = (sel, t) => `${sel} {\n` + Object.entries(t).filter(([, v]) => v).map(([k, v]) => `  --c-${slug(k)}: ${v};`).join('\n') + '\n' + Object.entries(roles(t)).filter(([, v]) => v).map(([k, v]) => `  --ad-${k}: ${v};`).join('\n') + '\n}\n';
let css = `/* tokens.css — ${brand} · generated from ${path.basename(dsFile)} (${ds.source || ''}). Do not edit; regenerate. */\n`;
css += block(':root', b.light) + block('[data-theme="dark"]', b.dark);
css += `:root {\n  --font-family: "${b.font || 'Inter'}", system-ui, -apple-system, "Segoe UI", sans-serif;\n` +
  [1, 2, 3, 4, 5, 6, 8, 10].map(i => `  --ad-space-${i}: ${i * 4}px;`).join('\n') +
  `\n  --ad-radius-sm: 4px; --ad-radius-md: ${px(n['radius/text-field'] || 8)}; --ad-radius-lg: ${px(n['radius/button'] || 8)}; --ad-radius-xl: 12px; --ad-radius-full: 999px;\n` +
  `  --ad-btn-h: ${px(n['height/button-large'] || 48)}; --ad-field-h: ${px(n['height/text-field'] || 44)}; --ad-radius-button: ${px(n['radius/button'] || 8)}; --ad-radius-field: ${px(n['radius/text-field'] || 8)};\n` +
  `  --ad-radius-chip: ${px(n['radius/chip'] || 'Full')}; --ad-radius-modal: ${px(n['radius/modal'] || 12)}; --ad-shadow-1: 0 1px 2px rgba(15,23,42,.08); --ad-shadow-2: 0 4px 12px rgba(15,23,42,.10);\n` +
  `  --ad-duration-fast: 150ms; --ad-duration-base: 200ms; --ad-duration-slow: 350ms; --ad-ease-out: cubic-bezier(0.23, 1, 0.32, 1); --ad-ease-sheet: cubic-bezier(0.32, 0.72, 0, 1);\n}\n` +
  `@media (prefers-reduced-motion: reduce) { :root { --ad-duration-fast: 0ms; --ad-duration-base: 0ms; --ad-duration-slow: 0ms; } }\n`;
const out = arg('out') || 'tokens.css'; fs.writeFileSync(out, css); console.log(`tokens.css for ${brand}: ${Object.keys(b.light).length} light + dark tokens → ${out}`);
