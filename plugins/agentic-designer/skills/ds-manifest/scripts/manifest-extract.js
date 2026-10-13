// DS Manifest extractor — READ-ONLY. Run in the DESIGN SYSTEM file. Paged so each response stays small.
// SECTION: 'summary' | 'components' | 'variables' | 'styles'. Page with OFFSET/LIMIT until `done: true`.
const SECTION = 'summary', OFFSET = 0, LIMIT = 150, NAME_FILTER = null; // e.g. NAME_FILTER = 'Button'
const SKIP_COLLECTIONS = ['01 Primitive'];   // primitives are never used directly by screens
const keep = n => !NAME_FILTER || n.toLowerCase().includes(NAME_FILTER.toLowerCase());
if (SECTION === 'summary') {
  const cols = await figma.variables.getLocalVariableCollectionsAsync();
  const ts = await figma.getLocalTextStylesAsync(), es = await figma.getLocalEffectStylesAsync();
  return { collections: cols.map(c => ({ name: c.name, modes: c.modes.map(m => m.name), vars: c.variableIds.length })), textStyles: ts.length, effectStyles: es.length,
    pages: figma.root.children.map(p => p.name) };
}
if (SECTION === 'variables') {
  const cols = await figma.variables.getLocalVariableCollectionsAsync(); const all = [];
  for (const c of cols) if (!SKIP_COLLECTIONS.includes(c.name)) for (const id of c.variableIds) all.push([c.name, id]);
  const slice = all.slice(OFFSET, OFFSET + LIMIT); const out = {};
  for (const [col, id] of slice) { const v = await figma.variables.getVariableByIdAsync(id); if (!v || v.hiddenFromPublishing || !keep(v.name)) continue;
    out[`${col}/${v.name}`] = { k: v.key, t: v.resolvedType[0], s: v.scopes.includes('ALL_SCOPES') ? 'ALL' : v.scopes.map(x => x.replace(/_/g, '').slice(0, 6)).join(',') }; }
  return { section: 'variables', offset: OFFSET, next: OFFSET + LIMIT, total: all.length, done: OFFSET + LIMIT >= all.length, items: out };
}
if (SECTION === 'styles') {
  const ts = await figma.getLocalTextStylesAsync(), es = await figma.getLocalEffectStylesAsync(), out = { text: {}, effect: {} };
  for (const s of ts) if (keep(s.name)) out.text[s.name] = { k: s.key, f: `${s.fontName.family} ${s.fontName.style}`, sz: s.fontSize, lh: s.lineHeight && s.lineHeight.value ? Math.round(s.lineHeight.value) + (s.lineHeight.unit === 'PERCENT' ? '%' : '') : 'auto' };
  for (const s of es) if (keep(s.name)) out.effect[s.name] = s.key;
  return { section: 'styles', items: out, done: true };
}
if (SECTION === 'components') {
  const found = [];
  for (const page of figma.root.children) { await page.loadAsync(); for (const n of page.findAllWithCriteria({ types: ['COMPONENT_SET', 'COMPONENT'] })) {
    if (n.type === 'COMPONENT' && n.parent && n.parent.type === 'COMPONENT_SET') continue; if (n.name.startsWith('.') || n.name.startsWith('_') || !keep(n.name)) continue; found.push(n); } }
  const slice = found.slice(OFFSET, OFFSET + LIMIT), out = {};
  for (const n of slice) { const defs = n.componentPropertyDefinitions || {}; const variants = {}, props = {};
    for (const [k, d] of Object.entries(defs)) { if (d.type === 'VARIANT') variants[k] = d.variantOptions; else props[k] = d.type[0]; }
    out[n.name] = { k: n.key, set: n.type === 'COMPONENT_SET', v: variants, p: props }; }
  return { section: 'components', offset: OFFSET, next: OFFSET + LIMIT, total: found.length, done: OFFSET + LIMIT >= found.length, items: out };
}
