#!/usr/bin/env node
/* make-lottie.js — tiny spec → Lottie (Bodymovin 5.x) JSON + preview. Zero dependencies.
Spec:
{ "name": "success", "w": 120, "h": 120, "fps": 60, "duration": 1.2, "loop": false,
  "layers": [ {
    "name": "ring",
    "shapes": [ { "type": "ellipse", "size": [96, 96], "position": [0, 0] } ],        // or rect {size, position, radius} or path {d}
    "fill": null, "stroke": { "color": "#16a34a", "width": 6, "cap": "round" },
    "trim": { "end": [ { "t": 0, "v": 0 }, { "t": 0.5, "v": 100, "ease": "out" } ] },
    "transform": { "position": [60, 60], "scale": [ { "t": 0, "v": [80, 80] }, { "t": 0.5, "v": [100, 100], "ease": "out" } ],
                   "rotation": 0, "opacity": 100, "anchor": [0, 0] }
  } ] }
Any transform/trim value may be a constant or a keyframe list. Times in seconds. */
const fs = require('fs'), path = require('path');
const file = process.argv[2]; if (!file) { console.error('usage: node make-lottie.js spec.json'); process.exit(2); }
const spec = JSON.parse(fs.readFileSync(file, 'utf8')); const fr = spec.fps || 60, op = Math.round((spec.duration || 1) * fr);
const EASE = { out: [0.23, 1, 0.32, 1], inOut: [0.77, 0, 0.175, 1], in: [0.55, 0, 1, 0.45], linear: [0, 0, 1, 1], sheet: [0.32, 0.72, 0, 1] };
const hex = h => { const m = h.replace('#', ''); const n = m.length === 3 ? m.split('').map(c => c + c).join('') : m; return [0, 2, 4].map(i => parseInt(n.slice(i, i + 2), 16) / 255).concat([1]); };
const arr = v => (Array.isArray(v) ? v : [v]);
function prop(v) { // constant or keyframes → Lottie animatable property
  if (Array.isArray(v) && v.length && typeof v[0] === 'object' && v[0] !== null && 't' in v[0]) {
    const k = v.map((kf, i) => { const e = Array.isArray(kf.ease) ? kf.ease : EASE[kf.ease || 'out']; const f = { t: Math.round(kf.t * fr), s: arr(kf.v) };
      if (i < v.length - 1) { f.o = { x: [e[0]], y: [e[1]] }; f.i = { x: [e[2]], y: [e[3]] }; } return f; });
    return { a: 1, k }; }
  return { a: 0, k: v };
}
function parsePath(d) { // SVG path (M L H V C Z, abs/rel) → Lottie shape {v,i,o,c}
  const toks = d.match(/[MLHVCZmlhvcz]|-?\d*\.?\d+(?:e-?\d+)?/g); if (!toks) throw new Error('empty path');
  const v = [], ii = [], oo = []; let x = 0, y = 0, cmd = null, closed = false, i = 0; const num = () => parseFloat(toks[i++]);
  while (i < toks.length) { if (/[A-Za-z]/.test(toks[i])) cmd = toks[i++]; const rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase();
    if (C === 'M' || C === 'L') { let nx = num(), ny = num(); if (rel) { nx += x; ny += y; } x = nx; y = ny; v.push([x, y]); ii.push([0, 0]); oo.push([0, 0]); if (C === 'M') cmd = rel ? 'l' : 'L'; }
    else if (C === 'H') { let nx = num(); if (rel) nx += x; x = nx; v.push([x, y]); ii.push([0, 0]); oo.push([0, 0]); }
    else if (C === 'V') { let ny = num(); if (rel) ny += y; y = ny; v.push([x, y]); ii.push([0, 0]); oo.push([0, 0]); }
    else if (C === 'C') { let x1 = num(), y1 = num(), x2 = num(), y2 = num(), nx = num(), ny = num(); if (rel) { x1 += x; y1 += y; x2 += x; y2 += y; nx += x; ny += y; }
      const p = v.length - 1; oo[p] = [x1 - v[p][0], y1 - v[p][1]]; v.push([nx, ny]); ii.push([x2 - nx, y2 - ny]); oo.push([0, 0]); x = nx; y = ny; }
    else if (C === 'Z') { closed = true; }
    else throw new Error(`unsupported path command ${cmd} (use M L H V C Z; convert arcs/quadratics in Figma first)`); }
  return { i: ii, o: oo, v, c: closed };
}
function shapeItem(s) {
  if (s.type === 'rect') return { ty: 'rc', nm: 'rect', d: 1, p: prop(s.position || [0, 0]), s: prop(s.size), r: prop(s.radius || 0) };
  if (s.type === 'ellipse') return { ty: 'el', nm: 'ellipse', d: 1, p: prop(s.position || [0, 0]), s: prop(s.size) };
  if (s.type === 'path') return { ty: 'sh', nm: 'path', d: 1, ks: { a: 0, k: parsePath(s.d) } };
  throw new Error('unknown shape type ' + s.type);
}
const layers = (spec.layers || []).map((L, idx) => {
  const t = L.transform || {}; const it = (L.shapes || []).map(shapeItem);
  if (L.fill) it.push({ ty: 'fl', nm: 'fill', c: { a: 0, k: hex(L.fill) }, o: prop(L.fillOpacity ?? 100), r: 1 });
  if (L.stroke) it.push({ ty: 'st', nm: 'stroke', c: { a: 0, k: hex(L.stroke.color) }, o: prop(L.stroke.opacity ?? 100), w: prop(L.stroke.width || 2), lc: L.stroke.cap === 'butt' ? 1 : 2, lj: 2, ml: 4 });
  if (L.trim) it.push({ ty: 'tm', nm: 'trim', s: prop(L.trim.start ?? 0), e: prop(L.trim.end ?? 100), o: prop(L.trim.offset ?? 0), m: 1 });
  it.push({ ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } });
  return { ddd: 0, ind: idx + 1, ty: 4, nm: L.name || `layer ${idx + 1}`, sr: 1, ao: 0, ip: 0, op, st: 0, bm: 0,
    ks: { o: prop(t.opacity ?? 100), r: prop(t.rotation ?? 0), p: prop(t.position ?? [spec.w / 2, spec.h / 2, 0]), a: prop(t.anchor ?? [0, 0, 0]), s: prop(t.scale ?? [100, 100, 100]) },
    shapes: [{ ty: 'gr', nm: 'group', it }] };
}); // Lottie draws layers[0] on top = first spec layer on top
const lottie = { v: '5.7.4', fr, ip: 0, op, w: spec.w, h: spec.h, nm: spec.name || 'animation', ddd: 0, assets: [], layers };
// validation
const errs = []; if (!spec.w || !spec.h) errs.push('w/h required'); if (!layers.length) errs.push('no layers');
for (const l of layers) { if (!l.shapes[0].it.some(x => ['rc', 'el', 'sh'].includes(x.ty))) errs.push(`${l.nm}: no geometry`); if (!l.shapes[0].it.some(x => ['fl', 'st'].includes(x.ty))) errs.push(`${l.nm}: no fill or stroke (invisible)`); }
if (errs.length) { console.error('INVALID:\n  ' + errs.join('\n  ')); process.exit(1); }
const base = file.replace(/\.spec\.json$|\.json$/, ''); const out = base + '.json', prev = base + '.preview.html';
fs.writeFileSync(out, JSON.stringify(lottie));
fs.writeFileSync(prev, `<!doctype html><meta charset="utf-8"><title>${lottie.nm}</title><style>body{margin:0;display:grid;place-items:center;height:100vh;background:#f5f5f4;font:13px system-ui}#a{width:${Math.min(spec.w * 3, 480)}px;height:${Math.min(spec.h * 3, 480) * spec.h / spec.w}px;background:#fff;border-radius:16px;box-shadow:0 8px 30px rgba(0,0,0,.08)}p{color:#666}</style><div id="a"></div><p>${lottie.nm} · ${spec.duration}s · ${fr}fps · add #speed=0.25 to slow down · click to replay</p><script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js"></script><script>const data=${JSON.stringify(lottie)};const anim=lottie.loadAnimation({container:document.getElementById('a'),renderer:'svg',loop:${!!spec.loop},autoplay:true,animationData:data});const m=location.hash.match(/speed=([\\d.]+)/);if(m)anim.setSpeed(+m[1]);document.body.onclick=()=>anim.goToAndPlay(0,true);</script>`);
console.log(`OK ${out} (${(fs.statSync(out).size / 1024).toFixed(1)} KB, ${layers.length} layers, ${op} frames) + ${prev}`);
