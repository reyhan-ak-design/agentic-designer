#!/usr/bin/env node
// Agentic Designer test suite (zero dependencies). node tools/test.mjs [pluginDir]
import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os'; import zlib from 'node:zlib'; import { execFileSync } from 'node:child_process'; import { fileURLToPath } from 'node:url';
const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..'); const P = path.resolve(process.argv[2] || path.join(repo, 'plugins', 'agentic-designer'));
let pass = 0, fail = 0; const t = (name, fn) => { try { fn(); pass++; } catch (e) { fail++; console.log(`✗ ${name}\n   ${String(e.message || e).split('\n')[0]}`); } };
const ok = (c, m) => { if (!c) throw new Error(m || 'assertion failed'); }; const run = (f, a) => execFileSync(process.execPath, [f, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const files = []; (function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { if (e.name === 'node_modules') continue; const f = path.join(d, e.name); e.isDirectory() ? walk(f) : files.push(f); } })(P);
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ad-test-'));
// 1. syntax: node scripts directly; Figma scripts (top-level await/return) wrapped in an async function
for (const f of files.filter(f => /\.(m?js)$/.test(f))) t('syntax ' + path.relative(P, f), () => { const src = fs.readFileSync(f, 'utf8');
  const figma = /figma\.|^const [A-Z_]+ = /m.test(src) && !/require\(|^import /m.test(src); if (figma) { const w = path.join(tmp, 'w.js'); fs.writeFileSync(w, '(async()=>{\n' + src.replace(/^#!.*\n/, '') + '\n})'); run('--check', [w]); } else run('--check', [f]); });
// 2. manifests and frontmatter
t('plugin.json', () => { const j = JSON.parse(fs.readFileSync(path.join(P, '.claude-plugin/plugin.json'), 'utf8')); ok(/^\d+\.\d+\.\d+$/.test(j.version), 'version'); });
t('hooks.json', () => JSON.parse(fs.readFileSync(path.join(P, 'hooks/hooks.json'), 'utf8')));
const skills = new Set(fs.readdirSync(path.join(P, 'skills')).filter(d => fs.existsSync(path.join(P, 'skills', d, 'SKILL.md'))));
for (const f of files.filter(f => /[\\/]agents[\\/].*\.md$/.test(f))) t('agent ' + path.basename(f), () => { const fm = fs.readFileSync(f, 'utf8').split('---')[1]; const list = (fm.match(/skills:\n((?:\s+- .*\n)+)/) || [, ''])[1].match(/- (.*)/g) || []; for (const s of list) ok(skills.has(s.slice(2).trim()), 'missing skill ' + s); });
for (const f of files.filter(f => /SKILL\.md$|[\\/]commands[\\/].*\.md$/.test(f))) t('frontmatter ' + path.relative(P, f), () => { const s = fs.readFileSync(f, 'utf8'); ok(s.startsWith('---\n') && /\ndescription: .{20,}/.test(s.split('\n---')[0]), 'description'); });
// 3. brand tools on the stored DS
const ds = ['ds-knowledge/data/ds-resolved.json', 'ds-knowledge/data/ds-resolved.json'].map(x => path.join(P, 'skills', x)).find(fs.existsSync);
const BT = path.join(P, 'skills/brand-mode/scripts/brand-tools.js');
t('stored DS present', () => ok(ds, 'no ds-resolved data'));
t('ramp keeps the brand color at 500', () => { const r = JSON.parse(run(BT, ['ramp', '#1f6feb', '--ds', ds])); ok(r.ramp['500'] === '#1f6feb' && Object.keys(r.ramp).length === 11); });
t('plan + preview', () => { const a = path.join(tmp, 'a.json'); fs.writeFileSync(a, JSON.stringify({ name: 'Test', primary: '#1f6feb', secondary: null, radiusButton: 'Full', neutral500: '#64748a', font: 'Inter' }));
  run(BT, ['plan', a, '--out', tmp, '--ds', ds]); const pl = JSON.parse(fs.readFileSync(path.join(tmp, 'brand-plan.json'), 'utf8')); ok(pl.overrides['number/radius/button'] === '@number/Full' && pl.overrides['color/neutral/500'] && fs.existsSync(path.join(tmp, 'brand-preview.html'))); });
const brands = Object.keys(JSON.parse(fs.readFileSync(ds, 'utf8')).brands);
for (const b of brands) t('audit + tokens ' + b, () => { run(BT, ['audit', b, '--ds', ds]); run(path.join(P, 'skills/ds-code-kit/scripts/proto-tokens.js'), ['--brand', b, '--ds', ds, '--out', path.join(tmp, 't.css')]); ok(fs.readFileSync(path.join(tmp, 't.css'), 'utf8').includes('--ad-primary')); });
// 4. prototype shell passes proto-lint
t('prototype shell lint', () => ok(run(path.join(P, 'skills/ds-code-kit/scripts/proto-lint.js'), [path.join(P, 'skills/ds-code-kit/templates/prototype-shell.html')]).includes('"PASS"')));
// 5. pixel-diff on generated PNGs
const png = (w, h, rgb) => { const raw = Buffer.alloc((w * 3 + 1) * h); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const [r, g, b] = rgb(x, y); raw.set([r, g, b], y * (w * 3 + 1) + 1 + x * 3); }
  const crcT = [...Array(256)].map((_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; }); const crc = b => { let c = 0xffffffff; for (const x of b) c = crcT[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const ch = (ty, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(ty), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
  const ih = Buffer.alloc(13); ih.writeUInt32BE(w, 0); ih.writeUInt32BE(h, 4); ih[8] = 8; ih[9] = 2; return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), ch('IHDR', ih), ch('IDAT', zlib.deflateSync(raw)), ch('IEND', Buffer.alloc(0))]); };
t('pixel-diff', () => { const a = path.join(tmp, 'a.png'), b = path.join(tmp, 'b.png'); fs.writeFileSync(a, png(40, 30, () => [255, 255, 255])); fs.writeFileSync(b, png(40, 30, (x, y) => (x > 10 && x < 20 && y > 5 && y < 15 ? [0, 0, 255] : [255, 255, 255])));
  const r = JSON.parse(run(path.join(P, 'skills/fresh-eyes-review/scripts/pixel-diff.mjs'), [a, b])); ok(r.verdict === 'CHANGED' && r.changedBox.x === 11 && r.changedBox.w === 9, JSON.stringify(r.changedBox));
  ok(JSON.parse(run(path.join(P, 'skills/fresh-eyes-review/scripts/pixel-diff.mjs'), [a, a])).verdict === 'IDENTICAL'); });
// 6. screen naming grammar (same regex as kiki-lint)
const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*){2,4}$/;
t('naming grammar', () => { for (const g of ['home.wallet.default', 'connect.osl.rejected.alt', 'home.wallet.default.alt.fold-inner', 'ekyc.ktp.in-review']) ok(NAME_RE.test(g), g);
  for (const b of ['Home', 'home.wallet', 'home_wallet_default', '.template.home.x', 'home.wallet.default.alt.fold.extra', 'Home.Wallet.Default']) ok(!NAME_RE.test(b), b); });
t('preflight.sh syntax + output', () => { const pf = path.join(P, 'hooks/preflight.sh'); execFileSync('sh', ['-n', pf]); const ws = path.join(tmp, 'ws'); fs.mkdirSync(ws);
  const o = execFileSync('sh', [pf], { encoding: 'utf8', env: { ...process.env, CLAUDE_PLUGIN_ROOT: P, CLAUDE_PROJECT_DIR: ws } }); const j = JSON.parse(o);
  ok(/aktif/.test(j.systemMessage) && fs.existsSync(path.join(ws, 'agentic-designer-work/_team/lessons.md')) && fs.existsSync(path.join(ws, 'agentic-designer-work/_ds/gaps.md'))); });
t('hooks run preflight first', () => ok(JSON.parse(fs.readFileSync(path.join(P, 'hooks/hooks.json'), 'utf8')).hooks.SessionStart[0].hooks[0].command.includes('preflight.sh')));
t('one lane enum (no Premium/Fast lanes)', () => { for (const f of files.filter(f => /SKILL\.md$|references[\\/].*\.md$/.test(f) && !/style-|domain-insurance/.test(f))) ok(!/\b(Premium|Fast)\/|\/(Premium|Fast)\b|Premium lane|Fast lane/.test(fs.readFileSync(f, 'utf8')), path.relative(P, f)); });
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`\n${pass} passed, ${fail} failed`); process.exit(fail ? 1 : 0);
