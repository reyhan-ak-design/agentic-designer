#!/usr/bin/env node
// Agentic Designer office launcher (Windows / macOS / Linux, Node 18+). Our own runtime — no third-party code.
//   node office.mjs start|stop|status|restart|autostart [--project <workspace>] [--port N] [--open]
import { spawn } from 'node:child_process';
import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os'; import net from 'node:net'; import { fileURLToPath } from 'node:url';
const here = path.dirname(fileURLToPath(import.meta.url)); const server = path.join(here, 'server.mjs');
const args = process.argv.slice(2); const cmd = args[0] || 'start'; const opt = k => { const i = args.indexOf('--' + k); return i >= 0 ? (args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true) : null; };
const project = path.resolve(opt('project') || process.cwd());
const cache = path.join(os.homedir(), '.cache', 'agentic-office'); fs.mkdirSync(cache, { recursive: true });
const key = Buffer.from(project).toString('base64url').slice(-24); const pidFile = path.join(cache, key + '.json');
const read = () => { try { return JSON.parse(fs.readFileSync(pidFile, 'utf8')); } catch { return null; } };
const alive = pid => { try { process.kill(pid, 0); return true; } catch { return false; } };
const free = p => new Promise(r => { const s = net.createServer().once('error', () => r(false)).once('listening', () => s.close(() => r(true))).listen(p, '127.0.0.1'); });
const openUrl = u => { const c = process.platform === 'win32' ? ['cmd', ['/c', 'start', '', u]] : process.platform === 'darwin' ? ['open', [u]] : ['xdg-open', [u]]; try { spawn(c[0], c[1], { detached: true, stdio: 'ignore' }).unref(); } catch {} };
async function start() {
  const cur = read(); if (cur && alive(cur.pid)) { console.log(`URL : http://127.0.0.1:${cur.port}\nStatus : already running`); if (opt('open')) openUrl(`http://127.0.0.1:${cur.port}`); return; }
  let port = Number(opt('port')) || 4317; while (!(await free(port)) && port < 4350) port++;
  const log = fs.openSync(path.join(cache, key + '.log'), 'a');
  const child = spawn(process.execPath, [server, '--project', project, '--port', String(port)], { detached: true, stdio: ['ignore', log, log], windowsHide: true }); child.unref();
  fs.writeFileSync(pidFile, JSON.stringify({ pid: child.pid, port, project }));
  const events = path.join(project, 'agentic-designer-work', '_telemetry', 'events.jsonl');
  console.log(`URL : http://127.0.0.1:${port}\nStop : /agentic-designer:office stop`); if (!fs.existsSync(events)) console.log('Catatan : belum ada aktivitas di folder ini — kantor terisi begitu Claude Code dipakai di sini.');
  if (opt('open')) setTimeout(() => openUrl(`http://127.0.0.1:${port}`), 600);
}
function stop() { const cur = read(); if (cur && alive(cur.pid)) { try { process.kill(cur.pid); } catch {} console.log('Status : stopped'); } else console.log('Status : not running'); try { fs.unlinkSync(pidFile); } catch {} }
function status() { const cur = read(); console.log(cur && alive(cur.pid) ? `Status : running\nURL : http://127.0.0.1:${cur.port}` : 'Status : not running'); }
function wantsAutostart() { if (fs.existsSync(path.join(os.homedir(), '.agentic-office-autostart'))) return true; try { return !!JSON.parse(fs.readFileSync(path.join(project, '.claude', 'agentic-office.json'), 'utf8')).autostart; } catch { return false; } }
if (cmd === 'start') await start(); else if (cmd === 'stop') stop(); else if (cmd === 'status') status(); else if (cmd === 'restart') { stop(); await start(); }
else if (cmd === 'autostart') { let input = ''; try { input = fs.readFileSync(0, 'utf8'); const j = JSON.parse(input || '{}'); if (j.cwd) process.chdir(j.cwd); } catch {} if (wantsAutostart()) await start(); }
else { console.log('usage: office.mjs start|stop|status|restart|autostart [--project dir] [--port N] [--open]'); process.exit(2); }
