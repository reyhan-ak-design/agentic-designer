// the lint lint v2 — deterministic, READ-ONLY. Returns violations only (never node trees).
// Set FRAME_IDS (preferred) and optional MANIFEST numbers. Run once per build with use_figma.
const FRAME_IDS = [];                       // e.g. ["51:3948"]
const SPACING_SCALE = [0, 2, 4, 8, 12, 16, 20, 24, 32, 36, 40, 48, 56, 64, 80, 96, 120, 160];
const RADIUS_SCALE = [0, 2, 4, 6, 8, 12, 16, 20, 24, 999, 1000];
const PLATFORM = 'mobile';                  // 'mobile' (min target 44) | 'android' (48) | 'web' (24)
const MAX_DISTINCT_GAPS = 6, MAX_FONT_SIZES = 4, MAX_WEIGHTS = 3;
const NAME_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*(?:\.[a-z0-9]+(?:-[a-z0-9]+)*){2,4}$/;   // flow.context.state[.variant][.device], ≤ 48 chars
const NOTE_NAME = /^(notes|design notes|annotations?|ds ?gaps?|review( notes)?|specs?|spec sheet|catatan desain|keterangan)$/i;
const LANE = 'standard';
const TOKENS = 'required';                  // 'waived' for tests without a DS: binding/style checks become advisory
const CURRENCY = 'IDR';                     // expected currency in the UI ('IDR' flags $/USD; null to skip)
const ADAPTIVE = false;                     // true: images/illustrations/cards/text blocks should carry maxWidth                    // 'explore' → only a11y + token binding + canvas notes can FAIL
const out = [];
const minTarget = PLATFORM === 'android' ? 48 : PLATFORM === 'web' ? 24 : 44;
const lum = c => { const f = v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)); return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
const ratio = (a, b) => { const L1 = lum(a), L2 = lum(b); return (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05); };
const solid = n => { const f = Array.isArray(n.fills) ? n.fills.find(p => p.type === 'SOLID' && p.visible !== false && (p.opacity ?? 1) > 0.5) : null; return f ? f.color : null; };
function bgOf(n) { let p = n.parent; while (p && p.type !== 'PAGE') { const c = 'fills' in p ? solid(p) : null; if (c) return c; p = p.parent; } return { r: 1, g: 1, b: 1 }; }
const bound = (n, k) => !!(n.boundVariables && n.boundVariables[k]);
const paintBound = n => Array.isArray(n.fills) && n.fills.every(p => p.type !== 'SOLID' || (p.boundVariables && p.boundVariables.color)) || (n.fillStyleId && n.fillStyleId !== '');
const isInsideInstance = n => { let p = n.parent; while (p && p.type !== 'PAGE') { if (p.type === 'SLOT') return false; if (p.type === 'INSTANCE') return true; p = p.parent; } return false; };   // content placed in a SLOT is the designer's own
for (const id of FRAME_IDS) {
  const frame = await figma.getNodeByIdAsync(id); if (!frame) { out.push({ frame: id, error: 'not found' }); continue; }
  // NOTE: do NOT call page.loadAsync() here — it can reset instance sublayers and truncate traversal.
  const v = { frame: frame.name, id, dsIssues: [], badName: [], tabBarOverlap: [], timeMismatch: [], chartLabelOverlap: [], currency: [], missingMaxWidth: [], unboundFill: [], textNoStyle: [], offScaleGap: [], offScaleRadius: [], clipped: [], contrast: [], smallTarget: [], noAutoLayout: [], fakeComponent: [], canvasNotes: [], glassMisuse: [] };
  const sizes = new Set(), weights = new Set(), gaps = new Set(), edges = new Set(); let frames2 = 0, framesAL = 0, primary = 0;
  let all = frame.findAll(() => true);
  if (all.length < 30) { let pg = frame; while (pg && pg.type !== 'PAGE') pg = pg.parent; if (pg && figma.currentPage !== pg) { await figma.setCurrentPageAsync(pg); all = frame.findAll(() => true); } }
  const shown = n => { let p = n; while (p && p !== frame) { if (p.visible === false) return false; p = p.parent; } return true; };
  const nodes = all.filter(shown);
  for (const n of nodes) {
    const own = !isInsideInstance(n) && n.type !== 'INSTANCE';        // instance internals belong to the DS
    if (n.type === 'TEXT') {
      const fs = n.fontSize, fn = n.fontName; if (own && typeof fs === 'number') sizes.add(fs); if (own && fn && fn !== figma.mixed) weights.add(fn.style);
      if (own && (!n.textStyleId || n.textStyleId === figma.mixed || n.textStyleId === '')) v.textNoStyle.push(`${n.id} "${n.characters.slice(0, 20)}"`);
      const fg = solid(n); if (fg && typeof fs === 'number') { const r = ratio(fg, bgOf(n)); const need = fs >= 18 || (fs >= 14 && fn && /Bold|Semi/i.test(fn.style)) ? 3 : 4.5; if (r < need) (own ? v.contrast : v.dsIssues).push(`${n.id} "${n.characters.slice(0, 16)}" ${r.toFixed(2)}<${need}${own ? '' : ' (inside DS component → report to Desi)'}`); }
      const tb = n.absoluteBoundingBox; let cp = n.parent; while (cp && cp !== frame && !cp.clipsContent) cp = cp.parent; const cb = cp && cp.absoluteBoundingBox;
      if (tb && cb && (tb.y + tb.height > cb.y + cb.height + 1 || tb.x + tb.width > cb.x + cb.width + 1)) v.clipped.push(`${n.id} "${n.characters.slice(0, 20)}" cut by ${cp.name}`);
      const pb = n.parent && n.parent.absoluteBoundingBox; if (tb && pb && n.parent !== cp && tb.y + tb.height > pb.y + pb.height + 1) v.clipped.push(`${n.id} "${n.characters.slice(0, 20)}" overflows ${n.parent.name}`);
    }
    if (own && ['RECTANGLE', 'FRAME', 'ELLIPSE', 'VECTOR'].includes(n.type) && Array.isArray(n.fills) && n.fills.some(p => p.type === 'SOLID' && p.visible !== false) && !paintBound(n)) v.unboundFill.push(`${n.id} ${n.name}`);
    if (own && n.type === 'TEXT' && Array.isArray(n.fills) && !paintBound(n)) v.unboundFill.push(`${n.id} text "${n.characters.slice(0, 14)}"`);
    if (own && n.type === 'FRAME' && n.layoutMode && n.layoutMode !== 'NONE') {
      for (const k of ['itemSpacing', 'paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight']) { const val = n[k]; if (typeof val === 'number' && val > 0) { gaps.add(val); if (!bound(n, k) && !SPACING_SCALE.includes(Math.round(val))) v.offScaleGap.push(`${n.id} ${n.name} ${k}=${val}`); } }
    }
    if (own && 'cornerRadius' in n && typeof n.cornerRadius === 'number' && n.cornerRadius > 0 && !bound(n, 'topLeftRadius') && !RADIUS_SCALE.includes(Math.round(n.cornerRadius))) v.offScaleRadius.push(`${n.id} ${n.name} r=${n.cornerRadius}`);
    if (own && n.type === 'FRAME' && n.children && n.children.length >= 2) { frames2++; if (n.layoutMode && n.layoutMode !== 'NONE') framesAL++; else v.noAutoLayout.push(`${n.id} ${n.name}`); }
    if (n.type === 'INSTANCE') { const b = n.absoluteBoundingBox; const nm = (n.name || '').toLowerCase();
      if (b && /button|btn|chip|tab|toggle|switch|checkbox|radio|icon ?button/.test(nm) && !/link/.test(nm)) { let hb = b; const par = n.parent;
        if (par && par.type !== 'PAGE' && par.children && par.children.length === 1 && par.absoluteBoundingBox) { const pb = par.absoluteBoundingBox; if (pb.height > hb.height || pb.width > hb.width) hb = pb; }
        if (Math.min(hb.width, hb.height) < minTarget - 0.5 && !(PLATFORM === 'web')) v.smallTarget.push(`${n.id} ${n.name} ${Math.round(hb.width)}×${Math.round(hb.height)}`); }
      if (/button/.test(nm)) { const props = n.componentProperties || {}; const vals = Object.entries(props).filter(([k, p]) => p.type === 'VARIANT').map(([k, p]) => `${k}=${p.value}`.toLowerCase());
        const isPrimary = vals.some(x => /(style|type|variant|hierarchy|kind|emphasis)[^=]*=primary\b/.test(x)) || (!vals.length && /primary/i.test(n.name));
        const isQuiet = vals.some(x => /ghost|outline|tertiary|link|text|secondary|subtle/.test(x.split('=')[1] || ''));
        if (isPrimary && !isQuiet) primary++; } }
    if (own && n.type === 'FRAME' && /^(button|input|card|chip|tab|list ?item|toggle)/i.test(n.name)) v.fakeComponent.push(`${n.id} ${n.name} (frame named like a component)`);
    if (n.type === 'TEXT' && CURRENCY === 'IDR' && /\$\s?\d|\bUSD\b/.test(n.characters)) v.currency.push(`${n.id} "${n.characters.slice(0, 20)}"`);
    if (ADAPTIVE && own && /^(img|image|illustration|hero|card|media|text ?block|body)/i.test(n.name || '') && !(n.maxWidth > 0)) v.missingMaxWidth.push(`${n.id} ${n.name}`);
    if ((!isInsideInstance(n) && NOTE_NAME.test((n.name || '').trim())) || (n.type === 'INSTANCE' && /annotation|sticky ?note/i.test(n.name || ''))) v.canvasNotes.push(`${n.id} ${n.name}`);
    if (PLATFORM !== 'web' && Array.isArray(n.effects) && n.effects.some(e => e.type === 'BACKGROUND_BLUR' && e.visible !== false) && !/nav|tab ?bar|toolbar|header|sheet|bar$/i.test(n.name || '')) v.glassMisuse.push(`${n.id} ${n.name} (glass on content layer)`);
    if (n.parent === frame || (n.parent && n.parent.parent === frame)) { const b = n.absoluteBoundingBox, fb = frame.absoluteBoundingBox; if (b && fb) edges.add(Math.round(b.x - fb.x)); }
  }
  const bb = x => x.absoluteBoundingBox; const hit = (a, b) => a && b && a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
  // floating tab bar / bottom nav: scrolling content must fade or be padded under it
  for (const tb of nodes.filter(n => /tab ?bar|bottom ?(nav|bar)|navigation ?bar|\bdock\b|\btabs\b/i.test(n.name || '') && n.absoluteBoundingBox)) {
    const b = bb(tb); const fills = Array.isArray(tb.fills) ? tb.fills : [];
    const hasFade = fills.some(f => f.visible !== false && /GRADIENT/.test(f.type)) || (tb.effects || []).some(e => e.type === 'BACKGROUND_BLUR' && e.visible !== false) || (tb.parent && tb.parent.children.some(c => /fade|scrim|gradient/i.test(c.name || '')));
    const opaque = fills.some(f => f.visible !== false && f.type === 'SOLID' && (f.opacity ?? 1) > 0.95) && !(tb.cornerRadius > 0 && b.width < bb(frame).width - 8);
    const under = nodes.filter(n => n !== tb && !isInsideInstance(n) && n.type === 'INSTANCE' && /list|row|item|card|cell/i.test(n.name || '') && hit(bb(n), b));
    if (under.length && !hasFade && !opaque) v.tabBarOverlap.push(`${under.length} list rows pass under ${tb.name} without fade/blur`); }
  // status bar time vs greeting / timestamps
  const clock = nodes.find(n => n.type === 'TEXT' && /^\s?\d{1,2}[:.]\d{2}\s?$/.test(n.characters) && bb(n) && bb(n).y - bb(frame).y < 60);
  if (clock) { const h = parseInt(clock.characters, 10); const greet = nodes.find(n => n.type === 'TEXT' && /(selamat|good)\s+(pagi|siang|sore|malam|morning|afternoon|evening|night)/i.test(n.characters));
    if (greet) { const g = greet.characters.toLowerCase(); const ok = /pagi|morning/.test(g) ? h >= 4 && h < 11 : /siang|afternoon/.test(g) ? h >= 11 && h < 15 : /sore/.test(g) ? h >= 15 && h < 18 : /(malam|evening|night)/.test(g) ? h >= 18 || h < 4 : true;
      if (!ok) v.timeMismatch.push(`status bar ${clock.characters.trim()} vs "${greet.characters.slice(0, 24)}"`); }
    const later = nodes.filter(n => n.type === 'TEXT' && /(hari ini|today)[^\d]*(\d{1,2})[:.](\d{2})/i.test(n.characters)).filter(n => { const m = n.characters.match(/(\d{1,2})[:.](\d{2})/); return m && (+m[1] > h || (+m[1] === h && +m[2] > parseInt(clock.characters.split(/[:.]/)[1], 10))); });
    if (later.length) v.timeMismatch.push(`${later.length} "today" timestamp(s) later than the status bar time`); }
  // chart labels must not sit on the plotted line
  for (const ch of nodes.filter(n => /chart|graph|grafik|sparkline|plot/i.test(n.name || '') && (n.type === 'FRAME' || n.type === 'GROUP' || n.type === 'INSTANCE'))) {
    const inside = ch.findAll ? ch.findAll(() => true) : []; const lines = inside.filter(x => (x.type === 'VECTOR' || x.type === 'LINE') && Array.isArray(x.strokes) && x.strokes.some(st => st.visible !== false) && !(Array.isArray(x.fills) && x.fills.some(f => f.visible !== false && (f.opacity ?? 1) > 0.3)));
    const labels = inside.filter(x => x.type === 'TEXT');   // lines above = stroked only, not filled areas
    for (const t of labels) for (const l of lines) { const a = bb(t), b = bb(l); if (hit(a, b) && b.height > 4 && b.width > 20) { v.chartLabelOverlap.push(`"${t.characters.slice(0, 12)}" on ${l.name}`); break; } } }
  const cap = a => a.length > 8 ? a.slice(0, 8).concat([`…+${a.length - 8} more`]) : a;
  if (!NAME_RE.test(frame.name) || frame.name.length > 48) v.badName.push(`"${frame.name}" → flow.context.state[.variant][.device] (/rename-screens)`);
  const res = { frame: v.frame, id };
  for (const k of Object.keys(v)) if (Array.isArray(v[k]) && v[k].length) res[k] = cap(v[k]);
  if (sizes.size > MAX_FONT_SIZES) res.fontSizes = [...sizes].sort((a, b) => a - b);
  if (weights.size > MAX_WEIGHTS) res.weights = [...weights];
  if (gaps.size > MAX_DISTINCT_GAPS) res.distinctGaps = [...gaps].sort((a, b) => a - b);
  if (edges.size > 6) res.distinctLeftEdges = edges.size;
  if (frames2 && framesAL / frames2 < 0.95) res.autoLayoutCoverage = `${Math.round(framesAL / frames2 * 100)}%`;
  if (primary > 1) res.primaryButtons = primary;
  const keys = Object.keys(res).filter(k => !['frame', 'id'].includes(k));
  const binding = TOKENS === 'waived' ? false : (res.unboundFill || res.textNoStyle);
  const newBlockers = res.tabBarOverlap || res.timeMismatch || res.chartLabelOverlap || res.currency;
  const fail = LANE === 'explore' ? (binding || res.contrast || res.canvasNotes || res.clipped || newBlockers) : (binding || res.clipped || res.contrast || res.fakeComponent || res.canvasNotes || newBlockers);
  res.verdict = keys.length === 0 ? 'PASS' : fail ? 'FAIL' : 'WARN';
  res.checked = { nodes: nodes.length, texts: nodes.filter(n => n.type === 'TEXT').length };
  const minT = nodes.filter(n => n.type === 'INSTANCE' && /button|chip|tab|toggle|switch|checkbox|radio/i.test(n.name || '') && bb(n)).map(n => Math.round(Math.min(bb(n).width, bb(n).height)));
  res.measured = { fontSizes: [...sizes].sort((a, b) => a - b), weights: [...weights], gaps: [...gaps].sort((a, b) => a - b),
    autoLayoutCoverage: frames2 ? Math.round(framesAL / frames2 * 100) + '%' : 'n/a', primaryButtons: primary, minTarget: minT.length ? Math.min(...minT) : null, tokens: TOKENS };
  if (TOKENS === 'waived') { for (const k of ['unboundFill', 'textNoStyle', 'offScaleGap', 'offScaleRadius']) if (res[k]) { res.advisory = (res.advisory || {}); res.advisory[k] = res[k]; delete res[k]; } }
  if (res.checked.nodes < 5) res.verdict = 'ERROR: frame not traversed (page not loaded)';
  // notes placed next to the design on the same page count too
  const sib = frame.parent && frame.parent.children ? frame.parent.children.filter(c => c !== frame && (NOTE_NAME.test((c.name || '').trim()) || c.type === 'STICKY' || (c.type === 'INSTANCE' && /annotation|sticky ?note/i.test(c.name || '')))) : [];
  if (sib.length) { res.canvasNotes = (res.canvasNotes || []).concat(sib.map(c => `${c.id} ${c.name} (next to frame)`)); res.verdict = 'FAIL'; }
  out.push(res);
}
return out;
