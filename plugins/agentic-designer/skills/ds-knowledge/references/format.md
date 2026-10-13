# Stored DS format (`ds-resolved.json`)
```json
{ "base": "<base brand>", "source": "<file + date>",
  "semantic_alias": { "<token>": ["<light ramp ref>", "<dark ramp ref>"] },
  "brands": { "<brand>": { "light": {"surface/brand/primary": "#…"}, "dark": {…}, "numbers": {"radius/button": "8"}, "font": "Inter", "radius_button": 8 } } }
```
Produced by `ds-manifest/scripts/export-resolved.js` (one brand per call, read-only). Used by `brand-tools.js`
(`--ds <file>`), `proto-tokens.js` (`--ds <file>`), lint, and Fresh Eyes.
