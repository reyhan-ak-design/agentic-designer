#!/usr/bin/env node
// proto-lint — deterministic checks for a prototype HTML file. Zero dependencies, zero tokens.
// Usage: node proto-lint.js path/to/index.html [--max-sizes 5]
const fs = require('fs'); const file = process.argv[2]; if (!file) { console.error('usage: node proto-lint.js index.html'); process.exit(2); }
const html = fs.readFileSync(file, 'utf8'); const v = {}; const add = (k, m) => (v[k] ||= []).push(m);
const styleBlocks = [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map(m => m[1]).join('\n');
const inline = [...html.matchAll(/<([a-z0-9-]+)([^>]*?)\sstyle="([^"]*)"/gi)].map(m => ({ tag: m[1], attrs: m[2], css: m[3] }));
const SPACE = new Set([0, 1, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 80, 96]);
// 1) raw colors anywhere outside the kit
for (const m of (styleBlocks + '\n' + inline.map(i => i.css).join(';')).matchAll(/#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi)) add('rawColor', m[0]);
for (const m of html.matchAll(/\s(?:fill|stroke|color)="(#[0-9a-f]{3,8})"/gi)) add('rawColor', m[1]);
// 2) raw sizes in inline styles (skeleton placeholders may set height/width)
for (const i of inline) { if (/skeleton/.test(i.attrs)) continue; for (const m of i.css.matchAll(/(margin|padding|gap|font-size|border-radius|top|left|right|bottom)[^:]*:\s*([^;]+)/gi)) { const vals = [...m[2].matchAll(/(-?\d+(?:\.\d+)?)px/g)].map(x => +x[1]); if (vals.some(n => !SPACE.has(Math.abs(n)))) add('offScaleSize', `${i.tag} ${m[1]}: ${m[2].trim()}`); else if (vals.length && !/var\(/.test(m[2])) add('rawSize', `${i.tag} ${m[1]}: ${m[2].trim()} (use gap-/p- utilities or --ad-space-*)`); } }
for (const m of styleBlocks.matchAll(/font-size\s*:\s*(\d+)px/gi)) add('rawFontSize', m[0]);
// 3) screens and states
const screens = [...html.matchAll(/<template id="screen-([^"]+)"([^>]*)>([\s\S]*?)<\/template>/gi)].map(m => ({ id: m[1], attrs: m[2], body: m[3] }));
if (!screens.length) add('structure', 'no <template id="screen-…"> screens found');
for (const s of screens) {
  const api = /data-api="/.test(s.attrs); const states = new Set([...s.body.matchAll(/data-state="([^"]+)"/g)].map(m => m[1]));
  if (api) for (const need of ['loading', 'error']) if (!states.has(need)) add('missingState', `${s.id}: ${need}`);
  if (api && /list|table|history|riwayat|transaksi/i.test(s.body) && !states.has('empty')) add('missingState', `${s.id}: empty`);
  const parts = s.body.split(/(?=<[^>]*data-state=")/); const defPart = parts.find(p => /^<[^>]*data-state="default"/.test(p));
  const def = defPart || (states.size ? parts.filter(p => !/^<[^>]*data-state="/.test(p)).join('') : s.body);
  const primaries = (def.match(/class="[^"]*\bbtn-primary\b/g) || []).length; if (primaries > 1) add('emphasis', `${s.id}: ${primaries} primary buttons`);
  const sizes = new Set([...s.body.matchAll(/class="[^"]*\bt-([a-z0-9-]+)/g)].map(m => m[1])); if (sizes.size > 5) add('typeScale', `${s.id}: ${sizes.size} text styles (${[...sizes].join(', ')})`);
  if (!/data-back|data-go|tab-bar|side-link/.test(s.body) && screens.length > 1) add('deadEnd', `${s.id}: no navigation out`);
}
// 4) accessibility basics
for (const m of html.matchAll(/<img\b(?![^>]*\balt=)[^>]*>/gi)) add('a11y', 'img without alt');
for (const m of html.matchAll(/<button\b([^>]*)>([\s\S]*?)<\/button>/gi)) { const text = m[2].replace(/<[^>]+>/g, '').replace(/\$\{[^}]*\}/g, 'x').trim(); if (!text && !/aria-label=/.test(m[1])) add('a11y', 'icon-only button without aria-label'); }
for (const m of html.matchAll(/<input\b([^>]*)>/gi)) if (!/aria-label=|id="/.test(m[1])) add('a11y', 'input without label/id');
// 5) AI-slop tells
if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(html.replace(/<script[\s\S]*?<\/script>/gi, ''))) add('slop', 'emoji used in UI (use the DS icon set)');
if (/linear-gradient|radial-gradient/i.test(styleBlocks + inline.map(i => i.css).join(';'))) add('slop', 'decorative gradient outside the kit');
if (/lorem ipsum|john doe|jane doe|example\.com|123-456/i.test(html)) add('slop', 'placeholder data (use realistic Indonesian data)');
const out = { file, screens: screens.map(s => s.id) }; for (const [k, a] of Object.entries(v)) out[k] = [...new Set(a)].slice(0, 12);
const blockers = ['rawColor', 'missingState', 'structure', 'slop', 'a11y'].filter(k => v[k]); out.verdict = Object.keys(v).length === 0 ? 'PASS' : blockers.length ? 'FAIL' : 'WARN';
console.log(JSON.stringify(out, null, 2)); process.exit(out.verdict === 'FAIL' ? 1 : 0);
