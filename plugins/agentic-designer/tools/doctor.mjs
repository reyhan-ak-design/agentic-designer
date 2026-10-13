#!/usr/bin/env node
// doctor — local health check for Agentic Designer (no network, read-only). node doctor.mjs [workspace]
import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os'; import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url)); const root = path.resolve(here, '..'); const ws = path.resolve(process.argv[2] || process.cwd());
const rows = []; const ok = (name, pass, note = '') => rows.push({ check: name, status: pass === null ? 'INFO' : pass ? 'OK' : 'FIX', note });
const read = f => { try { return fs.readFileSync(f, 'utf8'); } catch { return null; } };
const pj = JSON.parse(read(path.join(root, '.claude-plugin', 'plugin.json')) || '{}');
ok('plugin version', !!pj.version, pj.version || 'plugin.json missing');
const major = Number(process.versions.node.split('.')[0]); ok('Node.js ≥ 18', major >= 18, process.versions.node);
ok('workspace', fs.existsSync(ws), ws);
const work = path.join(ws, 'agentic-designer-work'); ok('scaffold (agentic-designer-work/)', fs.existsSync(work), fs.existsSync(work) ? '' : 'run /init');
for (const f of ['_team/lessons.md', '_taste/TASTE.md']) ok(f, fs.existsSync(path.join(work, f)), fs.existsSync(path.join(work, f)) ? '' : 'run /init');
const settings = read(path.join(ws, '.claude', 'settings.json')) || ''; ok('Unsplash allowed (images.unsplash.com)', settings.includes('images.unsplash.com'), settings ? '' : 'copy workspace-template/.claude/settings.json');
const gds = path.join(root, 'skills', 'ds-knowledge', 'data', 'ds-resolved.json');
if (fs.existsSync(gds)) { const d = JSON.parse(read(gds)); ok('stored DS knowledge', true, `${Object.keys(d.brands).join(', ')} · ${d.source || ''}`); }
else { const own = fs.existsSync(path.join(work, '_ds')); ok('design system data', own || null, own ? '_ds/ present' : 'no DS stored yet — use /add-ds (or a demo DS)'); }
const override = path.join(work, '_ds', 'gds'); if (fs.existsSync(override)) ok('workspace DS override', true, '_ds/gds/ (refreshed copy is used first)');
const ev = path.join(work, '_telemetry', 'events.jsonl'); if (fs.existsSync(ev)) { const lines = read(ev).trim().split('\n'); const errs = lines.filter(l => l.includes('"error"')).length; ok('telemetry', true, `${lines.length} events, ${errs} tool errors logged`); } else ok('telemetry', null, 'no events yet');
const state = path.join(work, '_team', 'state.md'); if (fs.existsSync(state)) ok('resume point', null, '_team/state.md exists — /resume continues it');
ok('Figma MCP', null, 'check in Claude: /mcp → figma connected · Full seat needed for edits');
const w = Math.max(...rows.map(r => r.check.length)); console.log(rows.map(r => `${r.status.padEnd(4)} ${r.check.padEnd(w)}  ${r.note}`).join('\n'));
process.exit(rows.some(r => r.status === 'FIX') ? 1 : 0);
