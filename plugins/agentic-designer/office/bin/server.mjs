#!/usr/bin/env node
// Agentic Designer office server (our own). Serves the 3D studio and streams the plugin's activity log
// (<workspace>/agentic-designer-work/_telemetry/events.jsonl, written by office/emit.js) over Server-Sent Events.
// Read-only toward the workspace. Binds to 127.0.0.1 unless OFFICE_BIND is set by the Manager.
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url)); const args = process.argv.slice(2); const opt = k => { const i = args.indexOf('--' + k); return i >= 0 ? args[i + 1] : null; };
const project = path.resolve(opt('project') || process.cwd()); const port = Number(opt('port')) || 4317; const bind = process.env.OFFICE_BIND || '127.0.0.1';
const file = path.join(project, 'agentic-designer-work', '_telemetry', 'events.jsonl'); const page = path.join(here, '..', 'public', 'index.html');
const clients = new Set(); let offset = 0, buf = '';
// history = events since the latest SessionStart within the last 3 hours, so a page opened mid-way shows the right state
function history() { try { const lines = fs.readFileSync(file, 'utf8').trim().split('\n').slice(-2000).map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
  const since = Date.now() - 3 * 3600e3; let i = lines.length - 1; while (i > 0 && !(lines[i].event === 'SessionStart' && lines[i].t > since)) i--; return lines.slice(Math.max(0, i)).filter(e => e.t > since).slice(-200); } catch { return []; } }
function poll() { fs.stat(file, (err, st) => { if (err) return; if (st.size < offset) offset = 0; if (st.size === offset) return;
  const s = fs.createReadStream(file, { start: offset, end: st.size - 1, encoding: 'utf8' }); offset = st.size;
  s.on('data', d => (buf += d)); s.on('end', () => { const parts = buf.split('\n'); buf = parts.pop(); for (const l of parts) { if (!l.trim()) continue; for (const c of clients) c.write(`data: ${l}\n\n`); } }); }); }
try { offset = fs.statSync(file).size; } catch {} setInterval(poll, 500);
http.createServer((req, res) => {
  if (req.url.startsWith('/stream')) { res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write(`event: history\ndata: ${JSON.stringify(history())}\n\n`); clients.add(res); const ka = setInterval(() => res.write(': ka\n\n'), 15000); req.on('close', () => { clearInterval(ka); clients.delete(res); }); return; }
  if (req.url === '/' || req.url.startsWith('/index') || req.url.startsWith('/kerja')) { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); return fs.createReadStream(page).pipe(res); }
  res.writeHead(404); res.end();
}).listen(port, bind, () => console.log(`office on http://${bind}:${port} · project ${project}`));
