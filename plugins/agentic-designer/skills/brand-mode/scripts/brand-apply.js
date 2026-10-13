// Run in the DS file with use_figma. Writes ONLY to "02 Brand Settings", ONLY to one mode.
// MODE 'create'  → add mode NAME (copy of Base) then apply OVERRIDES (from brand-plan.json "overrides").
// MODE 'update'  → apply OVERRIDES to existing mode NAME (only for /optimize-brand after the Manager's yes; never Base unless asked).
// MODE 'rollback'→ delete mode NAME (only a mode this run created).   DRY_RUN = true → report only, change nothing.
const NAME = 'Acme Pay', MODE = 'create', DRY_RUN = true, BASE = 'Base';
const OVERRIDES = { /* paste brand-plan.json "overrides" here, e.g. "color/primary/500": "#1f6feb", "number/radius/button": "@number/12" */ };
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const col = cols.find(c => c.name.startsWith('02 Brand')); if (!col) return { error: 'Brand Settings collection not found' };
const base = col.modes.find(m => m.name === BASE); if (!base) return { error: 'base mode not found: ' + BASE };
let target = col.modes.find(m => m.name === NAME);
if (MODE === 'rollback') { if (!target) return { error: 'mode not found' }; if (NAME === BASE) return { error: 'refusing to delete the base mode' }; if (!DRY_RUN) col.removeMode(target.modeId); return { removed: NAME, dryRun: DRY_RUN }; }
if (MODE === 'create' && target) return { error: `mode "${NAME}" already exists — use MODE 'update' or another name` };
if (MODE === 'update' && !target) return { error: `mode "${NAME}" not found` };
const all = []; for (const c of cols) for (const id of c.variableIds) all.push(id);
const byName = {}; for (const id of all) { const v = await figma.variables.getVariableByIdAsync(id); if (v) byName[v.name] = v; }
const vars = []; for (const id of col.variableIds) vars.push(await figma.variables.getVariableByIdAsync(id));
const hexToRgb = h => { h = h.replace('#', ''); const n = h.length === 8 ? 8 : 6; const r = parseInt(h.slice(0, 2), 16) / 255, g = parseInt(h.slice(2, 4), 16) / 255, b = parseInt(h.slice(4, 6), 16) / 255; return n === 8 ? { r, g, b, a: parseInt(h.slice(6, 8), 16) / 255 } : { r, g, b, a: 1 }; };
const unknown = Object.keys(OVERRIDES).filter(k => !vars.some(v => v.name === k));
if (unknown.length) return { error: 'override names not in Brand Settings', unknown };
const toValue = (v, raw) => { if (typeof raw === 'string' && raw.startsWith('@')) { const t = byName[raw.slice(1)]; if (!t) throw new Error('alias target missing: ' + raw); return figma.variables.createVariableAlias(t); }
  if (v.resolvedType === 'COLOR') return hexToRgb(raw); if (v.resolvedType === 'FLOAT') return Number(raw); return String(raw); };
let modeId = target ? target.modeId : null;
if (!DRY_RUN && MODE === 'create') { try { modeId = col.addMode(NAME); } catch (e) { return { error: 'cannot add mode (plan mode limit?)', detail: String(e) }; } }
let copied = 0, changed = 0; const preview = [];
for (const v of vars) {
  const has = Object.prototype.hasOwnProperty.call(OVERRIDES, v.name);
  if (MODE === 'create') { const val = has ? toValue(v, OVERRIDES[v.name]) : v.valuesByMode[base.modeId]; if (!DRY_RUN) v.setValueForMode(modeId, val); has ? changed++ : copied++; }
  else if (has) { if (!DRY_RUN) v.setValueForMode(modeId, toValue(v, OVERRIDES[v.name])); changed++; }
  if (has && preview.length < 8) preview.push(`${v.name} → ${OVERRIDES[v.name]}`);
}
// verify: every variable has a value in the target mode; other modes untouched (count check)
let missing = 0; if (!DRY_RUN) for (const v of vars) if (v.valuesByMode[modeId] === undefined) missing++;
return { collection: col.name, mode: NAME, action: MODE, dryRun: DRY_RUN, variables: vars.length, copiedFromBase: copied, overridden: changed, missing, modesNow: col.modes.map(m => m.name), sample: preview };
