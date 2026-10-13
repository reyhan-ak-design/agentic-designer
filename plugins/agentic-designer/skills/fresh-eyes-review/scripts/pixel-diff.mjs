#!/usr/bin/env node
// pixel-diff — compare two PNG screenshots locally (zero dependencies). Used by Fresh Eyes "diff mode" for DS edits and
// prototype regressions. Usage: node pixel-diff.mjs before.png after.png [--threshold 24] [--out diff.png]
// Prints JSON: size match, changed pixel %, and the bounding box of changes (so the reviewer looks only there).
import fs from 'node:fs'; import zlib from 'node:zlib';
function decode(file) { const b = fs.readFileSync(file); if (b.readUInt32BE(0) !== 0x89504e47) throw new Error(file + ': not a PNG');
  let o = 8, w = 0, h = 0, depth = 0, type = 0, inter = 0; const idat = [];
  while (o < b.length) { const len = b.readUInt32BE(o), t = b.toString('ascii', o + 4, o + 8), d = b.subarray(o + 8, o + 8 + len);
    if (t === 'IHDR') { w = d.readUInt32BE(0); h = d.readUInt32BE(4); depth = d[8]; type = d[9]; inter = d[12]; } else if (t === 'IDAT') idat.push(d); else if (t === 'IEND') break; o += 12 + len; }
  if (depth !== 8 || inter || ![2, 6, 0, 4].includes(type)) throw new Error(file + ': only 8-bit non-interlaced Gray/RGB/RGBA PNGs');
  const ch = { 0: 1, 2: 3, 4: 2, 6: 4 }[type], stride = w * ch, raw = zlib.inflateSync(Buffer.concat(idat)), px = Buffer.alloc(w * h * 4); let prev = Buffer.alloc(stride);
  for (let y = 0; y < h; y++) { const f = raw[y * (stride + 1)], line = Buffer.from(raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1)));
    for (let x = 0; x < stride; x++) { const a = x >= ch ? line[x - ch] : 0, up = prev[x], c = x >= ch ? prev[x - ch] : 0;
      line[x] = (line[x] + (f === 1 ? a : f === 2 ? up : f === 3 ? (a + up) >> 1 : f === 4 ? (() => { const p = a + up - c, pa = Math.abs(p - a), pb = Math.abs(p - up), pc = Math.abs(p - c); return pa <= pb && pa <= pc ? a : pb <= pc ? up : c; })() : 0)) & 255; }
    for (let x = 0; x < w; x++) { const i = (y * w + x) * 4, s = x * ch; if (ch >= 3) { px[i] = line[s]; px[i + 1] = line[s + 1]; px[i + 2] = line[s + 2]; px[i + 3] = ch === 4 ? line[s + 3] : 255; } else { px[i] = px[i + 1] = px[i + 2] = line[s]; px[i + 3] = ch === 2 ? line[s + 1] : 255; } }
    prev = line; }
  return { w, h, px }; }
function encode(w, h, px) { const raw = Buffer.alloc((w * 4 + 1) * h); for (let y = 0; y < h; y++) { raw[y * (w * 4 + 1)] = 0; px.copy(raw, y * (w * 4 + 1) + 1, y * w * 4, (y + 1) * w * 4); }
  const crcT = []; for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; crcT[n] = c >>> 0; }
  const crc = buf => { let c = 0xffffffff; for (const x of buf) c = crcT[(c ^ x) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const td = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc(td)); return Buffer.concat([l, td, c]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(w, 0); ihdr.writeUInt32BE(h, 4); ihdr[8] = 8; ihdr[9] = 6;
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw)), chunk('IEND', Buffer.alloc(0))]); }
const [, , A, B, ...rest] = process.argv; if (!A || !B) { console.error('usage: pixel-diff.mjs before.png after.png [--threshold 24] [--out diff.png]'); process.exit(2); }
const opt = k => { const i = rest.indexOf('--' + k); return i >= 0 ? rest[i + 1] : null; }; const thr = Number(opt('threshold') || 24);
const a = decode(A), b = decode(B); const out = { before: A, after: B, sameSize: a.w === b.w && a.h === b.h, size: [a.w, a.h, b.w, b.h] };
const w = Math.min(a.w, b.w), h = Math.min(a.h, b.h); let changed = 0, x0 = w, y0 = h, x1 = -1, y1 = -1; const vis = Buffer.alloc(w * h * 4);
for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const i = (y * a.w + x) * 4, j = (y * b.w + x) * 4, k = (y * w + x) * 4;
  const d = Math.max(Math.abs(a.px[i] - b.px[j]), Math.abs(a.px[i + 1] - b.px[j + 1]), Math.abs(a.px[i + 2] - b.px[j + 2]), Math.abs(a.px[i + 3] - b.px[j + 3]));
  if (d > thr) { changed++; if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; vis[k] = 255; vis[k + 1] = 0; vis[k + 2] = 80; vis[k + 3] = 255; }
  else { const g = (b.px[j] + b.px[j + 1] + b.px[j + 2]) / 3; vis[k] = vis[k + 1] = vis[k + 2] = 200 + g * 0.2; vis[k + 3] = 255; } }
out.changedPercent = +(changed / (w * h) * 100).toFixed(3); out.changedBox = x1 >= 0 ? { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 } : null;
out.verdict = changed === 0 && out.sameSize ? 'IDENTICAL' : 'CHANGED'; if (opt('out')) { fs.writeFileSync(opt('out'), encode(w, h, vis)); out.diffImage = opt('out'); }
console.log(JSON.stringify(out, null, 1));
