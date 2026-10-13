// DS Code Kit extractor — READ-ONLY, run in the DESIGN SYSTEM file with use_figma.
// Resolves REAL VALUES (aliases followed) for one brand mode + one theme mode. Paged to keep responses small.
const BRAND_MODE = 'Base';       // mode name in the brand collection
const THEME_MODE = 'Light';      // semantic/theme mode (matches 'Light', 'Light Mode', …)
const PLATFORM_MODE = 'Mobile';  // typography/layout mode (Mobile | Tablet | Desktop)
const SECTION = 'vars';          // 'vars' | 'styles'
const OFFSET = 0, LIMIT = 200;
const SKIP_COLLECTIONS = ['01 Primitive'];   // primitives are resolved through aliases, not exported directly
const hex = c => '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('') + (c.a !== undefined && c.a < 1 ? Math.round(c.a * 255).toString(16).padStart(2, '0') : '');
const cols = await figma.variables.getLocalVariableCollectionsAsync(); const colById = Object.fromEntries(cols.map(c => [c.id, c]));
function modeFor(col) { const want = [BRAND_MODE, THEME_MODE, PLATFORM_MODE].map(x => x.toLowerCase()); const m = col.modes.find(m => want.includes(m.name.toLowerCase())) || col.modes.find(m => want.some(w => m.name.toLowerCase().startsWith(w))) || col.modes.find(m => m.modeId === col.defaultModeId); return m.modeId; }
async function resolve(v, depth = 0) { if (depth > 12) return null; const col = colById[v.variableCollectionId]; const raw = v.valuesByMode[modeFor(col)];
  if (raw && typeof raw === 'object' && raw.type === 'VARIABLE_ALIAS') { const t = await figma.variables.getVariableByIdAsync(raw.id); return t ? resolve(t, depth + 1) : null; }
  if (raw && typeof raw === 'object' && 'r' in raw) return hex(raw);
  if (raw && typeof raw === 'object' && raw.color) { // composite (e.g. overlay = color alias + opacity alias)
    const get = async x => (x && x.type === 'VARIABLE_ALIAS') ? resolve(await figma.variables.getVariableByIdAsync(x.id), depth + 1) : x;
    const c = await get(raw.color), o = await get(raw.opacity); if (typeof c === 'string' && typeof o === 'number') { const a = o > 1 ? o / 100 : o; return c.slice(0, 7) + Math.round(a * 255).toString(16).padStart(2, '0'); } return c; }
  return raw; }
if (SECTION === 'vars') { const ids = []; for (const c of cols) if (!SKIP_COLLECTIONS.includes(c.name)) for (const id of c.variableIds) ids.push(id);
  const out = {}; for (const id of ids.slice(OFFSET, OFFSET + LIMIT)) { const v = await figma.variables.getVariableByIdAsync(id); if (!v) continue; const val = await resolve(v); if (val === null || val === undefined) continue; out[v.name] = val; }
  return { section: 'vars', brand: BRAND_MODE, theme: THEME_MODE, offset: OFFSET, next: OFFSET + LIMIT, total: ids.length, done: OFFSET + LIMIT >= ids.length, vars: out }; }
if (SECTION === 'styles') { const ts = await figma.getLocalTextStylesAsync(), es = await figma.getLocalEffectStylesAsync(); const text = {}, effects = {};
  for (const s of ts) text[s.name] = { family: s.fontName.family, weight: s.fontName.style, size: s.fontSize, lh: s.lineHeight.unit === 'PIXELS' ? s.lineHeight.value + 'px' : s.lineHeight.unit === 'PERCENT' ? (s.lineHeight.value / 100).toFixed(2) : 'normal', ls: s.letterSpacing.unit === 'PERCENT' ? (s.letterSpacing.value / 100).toFixed(3) + 'em' : s.letterSpacing.value + 'px' };
  for (const s of es) effects[s.name] = s.effects.filter(e => e.visible !== false && (e.type === 'DROP_SHADOW' || e.type === 'INNER_SHADOW')).map(e => `${e.type === 'INNER_SHADOW' ? 'inset ' : ''}${e.offset.x}px ${e.offset.y}px ${e.radius}px ${e.spread || 0}px ${hex(e.color)}`).join(', ');
  return { section: 'styles', text, effects, done: true }; }
