#!/usr/bin/env node
// Agentic Designer — telemetry hook (benchmark). Reads the hook JSON from stdin and appends a compact event to
// <workspace>/agentic-designer-work/_telemetry/events.jsonl — used by the benchmark AND streamed live by the 3D office
// (office/bin/server.mjs). Logs agent, tool, skill/subagent target, file, errors, and token usage. Never blocks, never fails.
const fs = require('fs'), path = require('path'), os = require('os');
if (fs.existsSync(path.join(os.homedir(), '.agentic-office-off'))) process.exit(0);
let raw = '';
process.stdin.on('data', d => (raw += d));
process.stdin.on('end', () => {
  let e; try { e = JSON.parse(raw || '{}'); } catch { process.exit(0); }
  const cwd = e.cwd || process.cwd();
  const teleDir = path.join(cwd, 'agentic-designer-work', '_telemetry');
  const mapFile = path.join(teleDir, 'agents-map.json');
  let map = {}; try { map = JSON.parse(fs.readFileSync(mapFile, 'utf8')); } catch {}
  const strip = s => (s || '').replace(/^agentic-designer:/, '');
  let agent = 'jarvis';
  if (e.agent_id) agent = strip(e.agent_type) || map[e.agent_id] || 'subagent';
  if (e.hook_event_name === 'SubagentStart' && e.agent_id) { map[e.agent_id] = strip(e.agent_type) || map[e.agent_id] || 'subagent'; agent = map[e.agent_id]; }
  const ti = e.tool_input || {};
  const out = {
    t: Date.now(), session: e.session_id, event: e.hook_event_name, agent,
    tool: e.tool_name || null,
    target: strip(ti.subagent_type) || ti.skill || ti.name || null,
    file: ti.file_path || ti.path || null,
  };
  const tr = e.tool_response; if (tr && typeof tr === 'object' && (tr.is_error || tr.error)) out.error = String(tr.error || 'tool error').slice(0, 160);
  if (e.hook_event_name === 'Notification' && e.message) out.note = String(e.message).slice(0, 120);
  // Token usage from transcripts on Stop / SubagentStop (local parse, zero model cost)
  const tpath = e.hook_event_name === 'SubagentStop' ? (e.agent_transcript_path || e.transcript_path) : (e.hook_event_name === 'Stop' ? e.transcript_path : null);
  if (tpath && fs.existsSync(tpath)) {
    const seen = new Set(); const u = { input: 0, output: 0, cache_read: 0, cache_write: 0 };
    for (const line of fs.readFileSync(tpath, 'utf8').split('\n')) {
      if (!line.includes('"usage"')) continue;
      try {
        const j = JSON.parse(line); const m = j.message || {}; const id = m.id || j.uuid;
        if (!m.usage || seen.has(id)) continue; seen.add(id);
        u.input += m.usage.input_tokens || 0; u.output += m.usage.output_tokens || 0;
        u.cache_read += m.usage.cache_read_input_tokens || 0; u.cache_write += m.usage.cache_creation_input_tokens || 0;
      } catch {}
    }
    out.usage = u; out.usageScope = e.hook_event_name === 'Stop' ? 'session' : 'subagent';
  }
  try {
    fs.mkdirSync(teleDir, { recursive: true });
    fs.appendFileSync(path.join(teleDir, 'events.jsonl'), JSON.stringify(out) + '\n');
    if (e.hook_event_name === 'SubagentStart') fs.writeFileSync(mapFile, JSON.stringify(map));
  } catch {}
  process.exit(0);
});
