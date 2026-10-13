#!/usr/bin/env node
// Summarize tokens and time per session and per agent from agentic-designer-work/_telemetry/events.jsonl
// Usage: node telemetry-summary.js [workspace-folder]
const fs = require('fs'), path = require('path');
const ws = process.argv[2] || process.cwd();
const f = path.join(ws, 'agentic-designer-work', '_telemetry', 'events.jsonl');
if (!fs.existsSync(f)) { console.log('No telemetry yet at', f); process.exit(0); }
const sessions = {};
for (const l of fs.readFileSync(f, 'utf8').split('\n').filter(Boolean)) {
  let e; try { e = JSON.parse(l); } catch { continue; }
  const s = (sessions[e.session] ||= { start: e.t, end: e.t, agents: {}, tools: 0 });
  s.start = Math.min(s.start, e.t); s.end = Math.max(s.end, e.t); if (e.event === 'PreToolUse') s.tools++;
  if (e.usage) { const a = (s.agents[e.agent] ||= { input: 0, output: 0, cache_read: 0, cache_write: 0, runs: 0 });
    if (e.usageScope === 'session') { Object.assign(a, e.usage); a.runs = 1; }   // main transcript is cumulative: keep latest
    else { a.runs++; for (const k of ['input', 'output', 'cache_read', 'cache_write']) a[k] += e.usage[k]; } }
}
for (const [id, s] of Object.entries(sessions)) {
  console.log(`\nSession ${String(id).slice(0, 8)} · ${new Date(s.start).toLocaleString()} · ${((s.end - s.start) / 60000).toFixed(1)} min · ${s.tools} tool calls`);
  let tot = 0;
  for (const [a, u] of Object.entries(s.agents)) { const sum = u.input + u.output + u.cache_read + u.cache_write; tot += sum;
    console.log(`  ${a.padEnd(8)} runs ${u.runs}  in ${u.input}  out ${u.output}  cache r/w ${u.cache_read}/${u.cache_write}  total ${sum}`); }
  console.log(`  TOTAL tokens ${tot}`);
}
