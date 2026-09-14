const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Read the official rovil-logo.svg
const logoSvgPath = path.join(__dirname, '../public/images/rovil-logo.svg');
const logoSvg = fs.readFileSync(logoSvgPath, 'utf8');

// Extract all <path ... /> elements
const pathMatches = logoSvg.match(/<path[\s\S]*?\/>/g) || [];

// Create luxury dark brand icon SVG (512x512) with Rovil deep roast #23150c and gold/amber highlights
function createDarkIconSvg(size = 512, padding = 70, isMaskable = false) {
  // Logo viewBox is 0 0 354.10 441.68 (aspect ratio 0.8017)
  const targetH = size - (padding * 2);
  const targetW = targetH * (354.10 / 441.68);
  const scale = targetH / 441.68;
  const offsetX = (size - targetW) / 2;
  const offsetY = (size - targetH) / 2;
  const cornerRadius = isMaskable ? 0 : Math.round(size * 0.22);

  // Render on luxury deep roast dark background with soft radial glow
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#3c2112" />
      <stop offset="60%" stop-color="#23150c" />
      <stop offset="100%" stop-color="#140b06" />
    </radialGradient>
    <filter id="subtleShadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.45" />
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="${size}" height="${size}" rx="${cornerRadius}" fill="url(#bgGrad)" />

  ${!isMaskable ? `<!-- Subtle Inner Border -->
  <rect x="2" y="2" width="${size - 4}" height="${size - 4}" rx="${cornerRadius}" fill="none" stroke="#d49b6a" stroke-width="${Math.max(1, Math.round(size * 0.008))}" stroke-opacity="0.25" />` : ''}

  <!-- Centered Emblem -->
  <g transform="translate(${offsetX.toFixed(2)}, ${offsetY.toFixed(2)}) scale(${scale.toFixed(4)})" filter="url(#subtleShadow)">
    ${pathMatches.map(p => {
      // For dark background, replace dark brown fills (#601800, #611d04) with warm ivory/gold highlights
      let adjusted = p;
      if (adjusted.includes('#601800') || adjusted.includes('#611d04')) {
        adjusted = adjusted.replace(/fill="#(601800|611d04)"/g, 'fill="#fcf8f2"');
      }
      return adjusted;
    }).join('\n    ')}
  </g>
</svg>`;
}

// Transparent Favicon SVG (Emblem only, scaled nicely for 32x32 / 16x16 / tabs)
function createTransparentFaviconSvg(size = 512) {
  const padding = 20;
  const targetH = size - (padding * 2);
  const targetW = targetH * (354.10 / 441.68);
  const scale = targetH / 441.68;
  const offsetX = (size - targetW) / 2;
  const offsetY = (size - targetH) / 2;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <defs>
    <radialGradient id="favBg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#23150c" />
      <stop offset="100%" stop-color="#140b06" />
    </radialGradient>
  </defs>
  <!-- Rounded badge so it pops in both light and dark browser tabs -->
  <rect width="${size}" height="${size}" rx="${Math.round(size * 0.22)}" fill="url(#favBg)" />
  <g transform="translate(${offsetX.toFixed(2)}, ${offsetY.toFixed(2)}) scale(${scale.toFixed(4)})">
    ${pathMatches.map(p => {
      let adjusted = p;
      if (adjusted.includes('#601800') || adjusted.includes('#611d04')) {
        adjusted = adjusted.replace(/fill="#(601800|611d04)"/g, 'fill="#ffffff"');
      }
      return adjusted;
    }).join('\n    ')}
  </g>
</svg>`;
}

// Maskable Icon SVG (with full-bleed canvas and generous padding for safe zone)
function createMaskableIconSvg(size = 512) {
  // Safe zone for maskable is within 80% circle (radius size * 0.4)
  return createDarkIconSvg(size, 110, true);
}

// Convert buffers to standard Windows ICO format
function createIco(pngBuffers) {
  // pngBuffers: array of { width, height, buffer }
  const numImages = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type 1 = ICO
  header.writeUInt16LE(numImages, 4); // count

  const dirEntries = [];
  let currentOffset = 6 + (16 * numImages);

  for (const img of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0);
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1);
    entry.writeUInt8(0, 2); // palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(img.buffer.length, 8); // size
    entry.writeUInt32LE(currentOffset, 12); // offset

    dirEntries.push(entry);
    currentOffset += img.buffer.length;
  }

  return Buffer.concat([
    header,
    ...dirEntries,
    ...pngBuffers.map(img => img.buffer)
  ]);
}

async function main() {
  const iconsDir = path.join(__dirname, '../public/icons');
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  const darkSvg512 = Buffer.from(createDarkIconSvg(512, 70));
  const maskableSvg512 = Buffer.from(createMaskableIconSvg(512));
  const favSvg512 = Buffer.from(createTransparentFaviconSvg(512));

  console.log('Generating PWA icons and favicons with sharp...');

  // 1. PWA 512x512
  await sharp(darkSvg512)
    .resize(512, 512)
    .png()
    .toFile(path.join(iconsDir, 'icon-512x512.png'));

  // 2. PWA Maskable 512x512
  await sharp(maskableSvg512)
    .resize(512, 512)
    .png()
    .toFile(path.join(iconsDir, 'maskable-icon-512x512.png'));

  // 3. PWA 192x192
  await sharp(darkSvg512)
    .resize(192, 192)
    .png()
    .toFile(path.join(iconsDir, 'icon-192x192.png'));

  // 4. Apple Touch Icon 180x180
  await sharp(darkSvg512)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../public/apple-touch-icon.png'));

  // 5. Next.js app/apple-icon.png
  await sharp(darkSvg512)
    .resize(180, 180)
    .png()
    .toFile(path.join(__dirname, '../src/app/apple-icon.png'));

  // 6. Next.js app/icon.png
  await sharp(favSvg512)
    .resize(512, 512)
    .png()
    .toFile(path.join(__dirname, '../src/app/icon.png'));

  // 7. Favicon 32x32 & 16x16 PNGs
  const png16 = await sharp(favSvg512).resize(16, 16).png().toBuffer();
  const png32 = await sharp(favSvg512).resize(32, 32).png().toBuffer();
  const png48 = await sharp(favSvg512).resize(48, 48).png().toBuffer();

  fs.writeFileSync(path.join(__dirname, '../public/favicon-16x16.png'), png16);
  fs.writeFileSync(path.join(__dirname, '../public/favicon-32x32.png'), png32);

  // 8. Multi-resolution favicon.ico (16, 32, 48)
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 },
  ]);

  fs.writeFileSync(path.join(__dirname, '../public/favicon.ico'), icoBuffer);
  fs.writeFileSync(path.join(__dirname, '../src/app/favicon.ico'), icoBuffer);

  console.log('Successfully generated:');
  console.log(' - public/icons/icon-512x512.png');
  console.log(' - public/icons/maskable-icon-512x512.png');
  console.log(' - public/icons/icon-192x192.png');
  console.log(' - public/apple-touch-icon.png');
  console.log(' - src/app/apple-icon.png');
  console.log(' - src/app/icon.png');
  console.log(' - public/favicon-16x16.png');
  console.log(' - public/favicon-32x32.png');
  console.log(' - public/favicon.ico');
  console.log(' - src/app/favicon.ico');
}

main().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
