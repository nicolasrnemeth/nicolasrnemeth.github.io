/**
 * Generates the raster assets that cannot be expressed as CSS:
 * the Open Graph card and the legacy favicon.
 *
 * Run with `npm run assets` after changing the mark or the accent colour.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = resolve(root, 'public');

const BG = '#0a0c0f';
const SURFACE = '#14181d';
const ACCENT = '#38bdf8';
const TEXT = '#e9edf3';
const MUTED = '#838f9f';

/** The orbit mark as standalone SVG markup, positioned at (cx, cy). */
const mark = (cx, cy, scale = 1) => `
  <g transform="translate(${cx} ${cy}) scale(${scale}) rotate(-24)">
    <ellipse cx="0" cy="0" rx="62" ry="24.8" fill="none" stroke="${ACCENT}" stroke-opacity="0.5" stroke-width="2.6"/>
    <circle cx="62" cy="0" r="8" fill="${ACCENT}"/>
  </g>
  <g transform="translate(${cx} ${cy}) scale(${scale})">
    <circle cx="0" cy="0" r="21" fill="${TEXT}"/>
    <circle cx="0" cy="0" r="21" fill="none" stroke="${ACCENT}" stroke-opacity="0.4" stroke-width="2"/>
  </g>`;

const ogSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="82%" cy="14%" r="62%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${SURFACE}"/>
      <stop offset="100%" stop-color="${BG}"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#base)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <g stroke="${TEXT}" stroke-opacity="0.035">
    ${Array.from({ length: 17 }, (_, i) => `<line x1="${i * 72}" y1="0" x2="${i * 72}" y2="630"/>`).join('')}
    ${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${i * 72}" x2="1200" y2="${i * 72}"/>`).join('')}
  </g>

  ${Array.from({ length: 46 }, () => {
    const x = Math.round(Math.random() * 1200);
    const y = Math.round(Math.random() * 630);
    const r = (Math.random() * 1.6 + 0.5).toFixed(2);
    const o = (Math.random() * 0.45 + 0.12).toFixed(2);
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffffff" fill-opacity="${o}"/>`;
  }).join('')}

  ${mark(1010, 150, 0.92)}

  <text x="86" y="300" font-family="Inter, Helvetica, Arial, sans-serif" font-size="82" font-weight="650" letter-spacing="-3" fill="${TEXT}">Nicolas R. Nemeth</text>
  <text x="86" y="368" font-family="Inter, Helvetica, Arial, sans-serif" font-size="38" font-weight="500" letter-spacing="-0.6" fill="${ACCENT}">Senior Software Engineer, AI &amp; Cloud</text>
  <text x="86" y="440" font-family="Inter, Helvetica, Arial, sans-serif" font-size="27" font-weight="400" fill="${MUTED}">AI, cloud and full-stack systems, from concept to production.</text>

  <line x1="86" y1="506" x2="1114" y2="506" stroke="${TEXT}" stroke-opacity="0.1"/>
  <text x="86" y="552" font-family="Inter, Helvetica, Arial, sans-serif" font-size="24" font-weight="500" fill="${MUTED}">Vienna, Austria</text>
  <text x="1114" y="552" text-anchor="end" font-family="Inter, Helvetica, Arial, sans-serif" font-size="24" font-weight="500" fill="${MUTED}">nicolasrnemeth.github.io</text>
</svg>`;

const iconSvg = (size) => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="${BG}"/>
  ${mark(256, 256, 1.9)}
</svg>`;

await mkdir(resolve(publicDir, 'og'), { recursive: true });

await sharp(Buffer.from(ogSvg)).png({ compressionLevel: 9 }).toFile(resolve(publicDir, 'og/og-default.png'));

// A real favicon.ico for the legacy request browsers make regardless of the
// declared SVG icon. ICO can wrap a PNG payload directly.
const icoPng = await sharp(Buffer.from(iconSvg(32))).png().toBuffer();
const icoHeader = Buffer.alloc(22);
icoHeader.writeUInt16LE(0, 0); // reserved
icoHeader.writeUInt16LE(1, 2); // type: icon
icoHeader.writeUInt16LE(1, 4); // one image
icoHeader.writeUInt8(32, 6); // width
icoHeader.writeUInt8(32, 7); // height
icoHeader.writeUInt8(0, 8); // palette size
icoHeader.writeUInt8(0, 9); // reserved
icoHeader.writeUInt16LE(1, 10); // colour planes
icoHeader.writeUInt16LE(32, 12); // bits per pixel
icoHeader.writeUInt32LE(icoPng.length, 14);
icoHeader.writeUInt32LE(22, 18); // offset of the image data
await writeFile(resolve(publicDir, 'favicon.ico'), Buffer.concat([icoHeader, icoPng]));

console.log('Generated: og/og-default.png, favicon.ico');
