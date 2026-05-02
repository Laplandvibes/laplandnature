// Process the 16 Drive PNGs into WebP variants for the site.
// - thumbs/{NN}.webp  → 480 wide, q60 (for human/agent preview)
// - large/{NN}.webp   → 1920 wide, q70 (full-bleed hero)
// - mid/{NN}.webp     → 1280 wide, q72 (featured-card / section)
import sharp from 'sharp';
import { readdirSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SRC = 'C:/Users/pesol/projects/laplandvibes/laplandnature/scripts/_src';
const OUT_THUMB = 'C:/Users/pesol/projects/laplandvibes/laplandnature/scripts/_thumbs';
const OUT_LARGE = 'C:/Users/pesol/projects/laplandvibes/laplandnature/scripts/_large';
const OUT_MID = 'C:/Users/pesol/projects/laplandvibes/laplandnature/scripts/_mid';
[OUT_THUMB, OUT_LARGE, OUT_MID].forEach(d => mkdirSync(d, { recursive: true }));

const files = readdirSync(SRC).filter(f => f.endsWith('.png')).sort();
console.log(`Processing ${files.length} files`);

for (const f of files) {
  const inPath = join(SRC, f);
  const base = f.replace(/\.png$/, '');
  const inSize = statSync(inPath).size;
  const meta = await sharp(inPath).metadata();

  const tasks = [
    sharp(inPath).resize(480, null, { withoutEnlargement: true }).webp({ quality: 60, effort: 4 }).toFile(join(OUT_THUMB, `${base}.webp`)),
    sharp(inPath).resize(1920, null, { withoutEnlargement: true }).webp({ quality: 72, effort: 6 }).toFile(join(OUT_LARGE, `${base}.webp`)),
    sharp(inPath).resize(1280, null, { withoutEnlargement: true }).webp({ quality: 75, effort: 6 }).toFile(join(OUT_MID, `${base}.webp`)),
  ];
  await Promise.all(tasks);

  const t = statSync(join(OUT_THUMB, `${base}.webp`)).size;
  const l = statSync(join(OUT_LARGE, `${base}.webp`)).size;
  const m = statSync(join(OUT_MID, `${base}.webp`)).size;
  console.log(`${base}.png  ${meta.width}×${meta.height}  in:${(inSize/1024/1024).toFixed(1)}MB  thumb:${(t/1024).toFixed(0)}KB  mid:${(m/1024).toFixed(0)}KB  large:${(l/1024).toFixed(0)}KB`);
}
console.log('done');
