# Agentic Designer — 3D office
A live view of the studio: Jarvis plus 7 specialists in a glass building (library, meeting room, pantry, studio, nap pods,
lounge). The server (`bin/server.mjs`) streams `agentic-designer-work/_telemetry/events.jsonl` (written by `emit.js`) to the
page; opening it mid-session replays the current session so the view is correct. 100% our own code; three.js via CDN.

Start: `/agentic-designer:office` · Windows `start-office.bat` · macOS `start-office.command` · or
`node office/bin/office.mjs start --project <workspace> --open`. Stop: `/agentic-designer:office stop`.
Token report: `node office/telemetry-summary.js <workspace>`.
