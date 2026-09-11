const fs = require('fs');
const zlib = require('zlib');

// Read docs/Rovil Logo.pdf
const buf = fs.readFileSync('docs/Rovil Logo.pdf');
const str = buf.toString('latin1');
const streamRegex = /stream\r?\n([\s\S]*?)\r?\nendstream/g;
let match;
let i = 0;
let rawStream2 = '';
while ((match = streamRegex.exec(str)) !== null) {
  i++;
  if (i === 2) {
    const unzipped = zlib.inflateSync(Buffer.from(match[1], 'latin1'));
    rawStream2 = unzipped.toString('utf8');
    break;
  }
}

function cmykToHex(c, m, y, k) {
  const r = Math.round(255 * (1 - c) * (1 - k));
  const g = Math.round(255 * (1 - m) * (1 - k));
  const b = Math.round(255 * (1 - y) * (1 - k));
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');
}

const lines = rawStream2.split('\n').map(l => l.trim()).filter(Boolean);
let currentCmyk = null;
let currentTx = 0;
let currentTy = 0;
let inBlock = false;
let pathTokens = [];
const paths = [];

let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

function updateBounds(x, y) {
  if (x < minX) minX = x;
  if (x > maxX) maxX = x;
  if (y < minY) minY = y;
  if (y > maxY) maxY = y;
}

let idx = 0;
while (idx < lines.length) {
  const line = lines[idx];
  const cmykMatch = line.match(/^([\d\.]+)\s+([\d\.]+)\s+([\d\.]+)\s+([\d\.]+)\s+k$/);
  if (cmykMatch) {
    currentCmyk = [parseFloat(cmykMatch[1]), parseFloat(cmykMatch[2]), parseFloat(cmykMatch[3]), parseFloat(cmykMatch[4])];
    idx++;
    continue;
  }
  const cmMatch = line.match(/^q\s+1\s+0\s+0\s+1\s+([\d\.\-]+)\s+([\d\.\-]+)\s+cm$/);
  if (cmMatch) {
    currentTx = parseFloat(cmMatch[1]);
    currentTy = parseFloat(cmMatch[2]);
    inBlock = true;
    pathTokens = [];
    idx++;
    continue;
  }
  if (line === 'f' || line === 'Q') {
    if (pathTokens.length > 0 && currentCmyk) {
      paths.push({
        color: cmykToHex(...currentCmyk),
        tokens: [...pathTokens]
      });
      pathTokens = [];
    }
    if (line === 'Q') inBlock = false;
    idx++;
    continue;
  }
  if (inBlock) {
    const tokens = line.split(/\s+/);
    const cmd = tokens[tokens.length - 1];
    const nums = tokens.slice(0, -1).map(Number);
    if (cmd === 'm') {
      const gx = currentTx + nums[0];
      const gy = currentTy + nums[1];
      updateBounds(gx, gy);
      pathTokens.push({ type: 'M', x: gx, y: gy });
    } else if (cmd === 'l') {
      const gx = currentTx + nums[0];
      const gy = currentTy + nums[1];
      updateBounds(gx, gy);
      pathTokens.push({ type: 'L', x: gx, y: gy });
    } else if (cmd === 'c') {
      const g1x = currentTx + nums[0], g1y = currentTy + nums[1];
      const g2x = currentTx + nums[2], g2y = currentTy + nums[3];
      const g3x = currentTx + nums[4], g3y = currentTy + nums[5];
      updateBounds(g1x, g1y);
      updateBounds(g2x, g2y);
      updateBounds(g3x, g3y);
      pathTokens.push({ type: 'C', x1: g1x, y1: g1y, x2: g2x, y2: g2y, x: g3x, y: g3y });
    } else if (cmd === 'h') {
      pathTokens.push({ type: 'Z' });
    }
  }
  idx++;
}

console.log('Bounds:', { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY });
console.log('Paths count:', paths.length);

const padding = 10;
const viewBoxMinX = minX - padding;
const viewBoxWidth = (maxX - minX) + (padding * 2);
const viewBoxHeight = (maxY - minY) + (padding * 2);

// Convert to SVG path 'd' strings. Note: In PDF, Y goes up; in SVG Y goes down.
// Y_svg = maxY - (Y_pdf - minY) + padding
function transformY(y) {
  return (maxY - y) + padding;
}
function transformX(x) {
  return (x - minX) + padding;
}

let svgPaths = [];
for (const p of paths) {
  let d = '';
  for (const t of p.tokens) {
    if (t.type === 'M') {
      d += `M ${transformX(t.x).toFixed(2)} ${transformY(t.y).toFixed(2)} `;
    } else if (t.type === 'L') {
      d += `L ${transformX(t.x).toFixed(2)} ${transformY(t.y).toFixed(2)} `;
    } else if (t.type === 'C') {
      d += `C ${transformX(t.x1).toFixed(2)} ${transformY(t.y1).toFixed(2)}, ${transformX(t.x2).toFixed(2)} ${transformY(t.y2).toFixed(2)}, ${transformX(t.x).toFixed(2)} ${transformY(t.y).toFixed(2)} `;
    } else if (t.type === 'Z') {
      d += `Z `;
    }
  }
  svgPaths.push({ color: p.color, d: d.trim() });
}

// 1. Generate full-color SVG
const fullColorSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxWidth.toFixed(2)} ${viewBoxHeight.toFixed(2)}" fill="none" class="rovil-logo-svg">
  ${svgPaths.map(p => `<path d="${p.d}" fill="${p.color}" />`).join('\n  ')}
</svg>`;

// 2. Generate White/Light monochrome SVG (for dark footers & dark hero overlays)
const whiteMonochromeSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewBoxWidth.toFixed(2)} ${viewBoxHeight.toFixed(2)}" fill="none" class="rovil-logo-svg">
  ${svgPaths.map(p => `<path d="${p.d}" fill="currentColor" />`).join('\n  ')}
</svg>`;

fs.writeFileSync('public/images/rovil-logo.svg', fullColorSvg);
fs.writeFileSync('public/images/rovil-logo-white.svg', whiteMonochromeSvg);
console.log('Saved public/images/rovil-logo.svg and public/images/rovil-logo-white.svg');
