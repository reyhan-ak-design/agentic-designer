// Agentic Designer — helpers.js (prepend to every use_figma build script). Keep this file stable (cache-friendly).
// M = manifest subset injected by Bima: { comps:{name:{key, props}}, vars:{name:key}, text:{name:key}, effects:{name:key} }
const H = (() => {
  const varCache = {}, compCache = {}, textCache = {};
  async function v(name) { if (varCache[name]) return varCache[name]; const key = M.vars[name]; if (!key) throw new Error('token not in manifest: ' + name);
    return (varCache[name] = await figma.variables.importVariableByKeyAsync(key)); }
  async function preload(varNames = [], compNames = [], textNames = []) { // batch imports in parallel
    await Promise.all([...varNames.map(v), ...compNames.map(comp), ...textNames.map(ts)]); }
  async function comp(name) { if (compCache[name]) return compCache[name]; const c = M.comps[name]; if (!c) throw new Error('component not in manifest: ' + name);
    const n = c.set ? await figma.importComponentSetByKeyAsync(c.key) : await figma.importComponentByKeyAsync(c.key); return (compCache[name] = n); }
  async function ts(name) { if (textCache[name]) return textCache[name]; const key = M.text[name]; if (!key) throw new Error('text style not in manifest: ' + name);
    const s = await figma.importStyleByKeyAsync(key); await figma.loadFontAsync(s.fontName); return (textCache[name] = s); }
  // instance with variant + text/boolean props
  async function inst(name, variant = {}, props = {}) { const c = await comp(name); let n;
    if (c.type === 'COMPONENT_SET') { const match = c.children.find(k => Object.entries(variant).every(([p, val]) => k.variantProperties?.[p] === val)) || c.defaultVariant; n = match.createInstance(); }
    else n = c.createInstance();
    if (Object.keys(props).length) { const defs = n.componentProperties, set = {};
      for (const [k, val] of Object.entries(props)) { const full = Object.keys(defs).find(d => d === k || d.split('#')[0] === k); if (full) set[full] = val; } n.setProperties(set); }
    return n; }
  async function fill(node, token) { const p = figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', await v(token)); node.fills = [p]; }
  async function stroke(node, token, weightToken) { const p = figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', await v(token)); node.strokes = [p];
    if (weightToken) node.setBoundVariable('strokeWeight', await v(weightToken)); }
  async function space(node, { gap, px, py, pt, pb, pl, pr, radius } = {}) { const b = async (f, t) => t && node.setBoundVariable(f, await v(t));
    await b('itemSpacing', gap); await b('paddingLeft', pl || px); await b('paddingRight', pr || px); await b('paddingTop', pt || py); await b('paddingBottom', pb || py);
    if (radius) for (const f of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) node.setBoundVariable(f, await v(radius)); }
  function stack(dir, name, parent) { const f = figma.createAutoLayout ? figma.createAutoLayout(dir === 'h' ? 'HORIZONTAL' : 'VERTICAL') : figma.createFrame();
    if (!figma.createAutoLayout) f.layoutMode = dir === 'h' ? 'HORIZONTAL' : 'VERTICAL'; f.name = name; f.fills = []; if (parent) { parent.appendChild(f); f.layoutSizingHorizontal = 'FILL'; } return f; }
  async function txt(styleName, chars, colorToken, parent) { const s = await ts(styleName); const t = figma.createText(); await t.setTextStyleIdAsync(s.id); t.characters = chars;
    if (colorToken) await fill(t, colorToken); if (parent) { parent.appendChild(t); t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; } return t; }
  function add(parent, node, sizing = 'FILL') { parent.appendChild(node); if (parent.layoutMode && parent.layoutMode !== 'NONE') node.layoutSizingHorizontal = sizing; return node; }
  const created = []; const track = n => (created.push(n.id), n);
  function result(extra = {}) { return Object.assign({ created }, extra); }
  return { v, preload, comp, ts, inst, fill, stroke, space, stack, txt, add, track, result };
})();
