// READ-ONLY. Run in ANY design-system file with use_figma. Exports resolved values per brand × theme in the stored-DS format
// (ds-resolved.json): { base, source, semantic_alias, brands: { <brand>: { light, dark, numbers, font, radius_button } } }.
// Page through brands with BRAND_INDEX (one brand per call keeps responses small). Truncated output = error.
const BRAND_COLLECTION = '02';          // name prefix of the brand collection (one mode per brand); '' if the DS has no brands
const SEMANTIC_COLLECTION = '03';       // name prefix of the semantic/theme collection (modes like Light/Dark)
const BRAND_INDEX = 0;                  // which brand mode to export in this call (0..n-1)
const cols = await figma.variables.getLocalVariableCollectionsAsync();
const brandCol = BRAND_COLLECTION ? cols.find(c => c.name.startsWith(BRAND_COLLECTION)) : null, semCol = cols.find(c => c.name.startsWith(SEMANTIC_COLLECTION));
if (!semCol) return { error: 'semantic collection not found', collections: cols.map(c => c.name) };
const brandMode = brandCol ? brandCol.modes[BRAND_INDEX] : null; if (brandCol && !brandMode) return { done: true, brands: brandCol.modes.map(m => m.name) };
const light = semCol.modes.find(m => /light/i.test(m.name)) || semCol.modes[0], dark = semCol.modes.find(m => /dark/i.test(m.name)) || null;
const colById = Object.fromEntries(cols.map(c => [c.id, c]));
const hex = c => '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('') + (c.a !== undefined && c.a < 1 ? Math.round(c.a * 255).toString(16).padStart(2, '0') : '');
async function resolve(v, themeId, depth = 0) { if (!v || depth > 12) return null; const col = colById[v.variableCollectionId];
  const mode = col === semCol ? themeId : col === brandCol ? brandMode.modeId : col.defaultModeId; const raw = v.valuesByMode[mode] ?? v.valuesByMode[col.defaultModeId];
  if (raw && raw.type === 'VARIABLE_ALIAS') return resolve(await figma.variables.getVariableByIdAsync(raw.id), themeId, depth + 1);
  if (raw && typeof raw === 'object' && 'r' in raw) return hex(raw);
  if (raw && typeof raw === 'object' && raw.color) { const c = raw.color.type === 'VARIABLE_ALIAS' ? await resolve(await figma.variables.getVariableByIdAsync(raw.color.id), themeId, depth + 1) : hex(raw.color);
    const o = raw.opacity && raw.opacity.type === 'VARIABLE_ALIAS' ? await resolve(await figma.variables.getVariableByIdAsync(raw.opacity.id), themeId, depth + 1) : raw.opacity;
    return typeof c === 'string' && typeof o === 'number' ? c.slice(0, 7) + Math.round((o > 1 ? o / 100 : o) * 255).toString(16).padStart(2, '0') : c; }
  return raw; }
const out = { brand: brandMode ? brandMode.name : 'Default', light: {}, dark: {}, numbers: {}, font: null };
let n = 0; for (const id of semCol.variableIds) { const v = await figma.variables.getVariableByIdAsync(id); if (!v || v.resolvedType !== 'COLOR') continue; const k = v.name.replace(/^color\//, '');
  out.light[k] = await resolve(v, light.modeId); if (dark) out.dark[k] = await resolve(v, dark.modeId); n++; }
if (brandCol) for (const id of brandCol.variableIds) { const v = await figma.variables.getVariableByIdAsync(id); if (!v) continue;
  if (v.resolvedType === 'FLOAT' && /^number\/(radius|height|padding|gap|border)/.test(v.name)) { const r = await resolve(v, light.modeId); out.numbers[v.name.replace(/^number\//, '')] = r >= 9999 ? 'Full' : r; }
  if (v.resolvedType === 'STRING' && /font-family\/body$/.test(v.name)) out.font = await resolve(v, light.modeId); }
out.radius_button = out.numbers['radius/button'] ?? null;
const colorVars = (await Promise.all(semCol.variableIds.map(id => figma.variables.getVariableByIdAsync(id)))).filter(v => v && v.resolvedType === 'COLOR').length;
if (n !== colorVars) return { error: 'TRUNCATED', got: n, expected: colorVars };
return { brandIndex: BRAND_INDEX, nextIndex: brandCol ? BRAND_INDEX + 1 : null, totalBrands: brandCol ? brandCol.modes.length : 1, semanticColors: n, data: out };
