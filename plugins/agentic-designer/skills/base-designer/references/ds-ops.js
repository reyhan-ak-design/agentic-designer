// Agentic Designer — ds-ops.js: tested helpers for EDITING components/sets (DS Maintenance lane).
// Prepend to a use_figma script that edits a component set. Every write helper has a dry-run path; every edit ends with D.audit().
// Turns the recurring lessons into code: cloned variants losing property refs, slots turning into frames, grid repacks into gutters,
// duplicate variants after a dropped connection, over-scoped bulk swaps, name-based lookups.
const D = (() => {
  const pathOf = (node, root) => { const p = []; let n = node; while (n && n !== root) { const par = n.parent; p.unshift(par.children.indexOf(n)); n = par; } return p; };
  const at = (root, p) => p.reduce((n, i) => (n && n.children ? n.children[i] : null), root);
  const walk = (root, fn) => { fn(root); if (root.children) for (const c of root.children) walk(c, fn); };
  // --- clone a variant WITH its property references (refs are relinked by layer path, not by name) ---
  function cloneVariant(src, newName) {
    const set = src.parent; const existing = set.children.find(c => c.name === newName); if (existing) return { node: existing, reused: true }; // idempotent
    const c = src.clone(); set.appendChild(c); c.name = newName; let relinked = 0, slotsLost = [];
    walk(src, s => { const refs = s.componentPropertyReferences; const t = at(c, pathOf(s, src)); if (!t) return;
      if (refs && Object.keys(refs).length) { try { t.componentPropertyReferences = Object.assign({}, refs); relinked++; } catch (e) {} }
      if (s.type === 'SLOT' && t.type !== 'SLOT') slotsLost.push(t.name); });
    return { node: c, relinked, slotsLost };   // slotsLost non-empty → rebuild those slots (see slot-method.md) before continuing
  }
  // --- find targets for a bulk change, WITHOUT changing anything; compare count to what the Manager asked for ---
  function dryRun(root, predicate, label = 'targets') { const hits = []; walk(root, n => { if (n !== root && predicate(n)) hits.push(n); });
    const sample = hits.slice(0, 12).map(n => `${n.parent ? n.parent.name + ' › ' : ''}${n.name}`); return { label, count: hits.length, sample, nodes: hits }; }
  // bulk apply only after the scope is confirmed (expectedCount from the dry run the Manager saw)
  function apply(dry, expectedCount, fn) { if (dry.count !== expectedCount) throw new Error(`scope changed: ${dry.count} targets, expected ${expectedCount} — re-run the dry run`);
    let n = 0; for (const node of dry.nodes) { if (insideOtherComponent(node)) continue; fn(node); n++; } return n; }
  const insideOtherComponent = n => { let p = n.parent, hops = 0; while (p && p.type !== 'PAGE') { if (p.type === 'INSTANCE' && hops > 0) return true; if (p.type === 'COMPONENT' || p.type === 'COMPONENT_SET') return false; p = p.parent; hops++; } return false; };
  // --- bind a paint to a variable (base color = the variable's resolved value so the canvas shows the right color) ---
  async function bindPaint(node, variable, kind = 'fills', modeOwner = node) {
    let base = { r: 0, g: 0, b: 0 }; try { const r = variable.resolveForConsumer(modeOwner); if (r && r.value && 'r' in r.value) base = { r: r.value.r, g: r.value.g, b: r.value.b }; } catch (e) {}
    const paint = figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: base }, 'color', variable); node[kind] = [paint]; }
  // --- lookups by property reference, never by layer name (avoids "findOne('Icon')" hitting the wrong layer) ---
  function byRef(root, propKeyPrefix) { const out = []; walk(root, n => { const r = n.componentPropertyReferences; if (r && Object.values(r).some(k => String(k).startsWith(propKeyPrefix))) out.push(n); }); return out; }
  // --- place variants by their property values (rows × columns) — never left-pack, never into gutter tracks ---
  function gridPlace(set, rowProp, colProp, gap = 24, gutterEvery = 0, gutter = 48) {
    if (set.layoutMode === 'GRID') return { skipped: 'set uses auto-layout GRID — set row/column via the Figma grid API or keep order; do not left-pack' };
    const val = (c, p) => (c.variantProperties || {})[p]; const rows = [...new Set(set.children.map(c => val(c, rowProp)))], cols = [...new Set(set.children.map(c => val(c, colProp)))];
    const w = Math.max(...set.children.map(c => c.width)), h = Math.max(...set.children.map(c => c.height)); const stacks = {};
    for (const c of set.children) { const r = rows.indexOf(val(c, rowProp)), k = cols.indexOf(val(c, colProp)); const key = r + ':' + k; const z = (stacks[key] = (stacks[key] || 0) + 1) - 1;
      const gx = gutterEvery ? Math.floor(k / gutterEvery) * gutter : 0; c.x = gap + k * (w + gap) + gx; c.y = gap + (r * (stacks.__max || 1) + z) * (h + gap); }
    return { rows: rows.length, cols: cols.length }; }
  // --- audit a set after every edit: duplicates, ref drift vs the default variant, lost slots, unbound layout numbers, overlaps ---
  function audit(set) {
    const res = { set: set.name, variants: set.children.length, duplicates: [], refDrift: [], slotDrift: [], unbound: [], overlaps: [] };
    const names = {}; for (const c of set.children) (names[c.name] = (names[c.name] || 0) + 1); res.duplicates = Object.entries(names).filter(([, n]) => n > 1).map(([k, n]) => `${k} ×${n}`);
    const count = (root, f) => { let n = 0; walk(root, x => { if (f(x)) n++; }); return n; };
    const def = set.defaultVariant || set.children[0]; const refs0 = count(def, x => x.componentPropertyReferences && Object.keys(x.componentPropertyReferences).length), slots0 = count(def, x => x.type === 'SLOT');
    for (const c of set.children) { const r = count(c, x => x.componentPropertyReferences && Object.keys(x.componentPropertyReferences).length), s = count(c, x => x.type === 'SLOT');
      if (r < refs0) res.refDrift.push(`${c.name}: ${r}/${refs0} refs`); if (s < slots0) res.slotDrift.push(`${c.name}: ${s}/${slots0} slots`);
      walk(c, x => { if (x.type === 'FRAME' && x.layoutMode && x.layoutMode !== 'NONE') for (const k of ['itemSpacing', 'paddingLeft', 'paddingTop']) if (x[k] > 0 && !(x.boundVariables && x.boundVariables[k])) { if (res.unbound.length < 10) res.unbound.push(`${c.name} › ${x.name}.${k}=${x[k]}`); } }); }
    if (set.layoutMode !== 'GRID') { const kids = set.children; for (let i = 0; i < kids.length; i++) for (let j = i + 1; j < kids.length; j++) { const a = kids[i], b = kids[j]; if (a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y) { res.overlaps.push(`${a.name} ↔ ${b.name}`); if (res.overlaps.length > 8) break; } } }
    res.ok = !res.duplicates.length && !res.refDrift.length && !res.slotDrift.length && !res.overlaps.length; return res; }
  // --- checkpoint: write progress into the set's plugin-independent sharedPluginData so a dropped run can resume ---
  function checkpoint(node, step) { try { node.setSharedPluginData('agentic', 'step', String(step)); } catch (e) {} }
  function lastStep(node) { try { return node.getSharedPluginData('agentic', 'step') || ''; } catch (e) { return ''; } }
  return { cloneVariant, dryRun, apply, bindPaint, byRef, gridPlace, audit, checkpoint, lastStep };
})();
