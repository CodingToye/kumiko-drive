// Generates responsive AVIF/WebP/PNG variants for every render in public/renders.
// Run via `npm run prebuild` (or `npm run images`). Output is gitignored.
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const SRC_DIR = path.resolve('public/renders')
const OUT_DIR = path.join(SRC_DIR, 'opt')
const WIDTHS = [640, 1280, 1920, 2560]
const LOGO_WIDTHS = [128, 256]

const bytes = (n) => `${(n / 1024).toFixed(0)}KB`

async function build() {
  await mkdir(OUT_DIR, { recursive: true })

  const files = (await readdir(SRC_DIR)).filter((f) => f.endsWith('.png'))
  let srcTotal = 0
  let outTotal = 0
  const manifest = {}

  for (const file of files) {
    const srcPath = path.join(SRC_DIR, file)
    const name = path.basename(file, '.png')
    srcTotal += (await stat(srcPath)).size

    const image = sharp(srcPath)
    const { width, height } = await image.metadata()

    // The logo only ever paints at ~20-24px tall, so it needs far smaller variants
    // than the full-bleed renders. Never upscale; always keep at least one width.
    const wanted = name === 'logo' ? LOGO_WIDTHS : WIDTHS
    const widths = wanted.filter((w) => w <= width)
    if (widths.length === 0) widths.push(width)

    for (const w of widths) {
      const resized = () => sharp(srcPath).resize({ width: w, withoutEnlargement: true })

      const targets = [
        [`${name}-${w}.avif`, resized().avif({ quality: 55, effort: 6 })],
        [`${name}-${w}.webp`, resized().webp({ quality: 78 })],
        [`${name}-${w}.png`, resized().png({ compressionLevel: 9, palette: true })],
      ]

      for (const [outName, pipeline] of targets) {
        const outPath = path.join(OUT_DIR, outName)
        const buf = await pipeline.toBuffer()
        await writeFile(outPath, buf)
        outTotal += buf.length
      }
    }

    manifest[name] = { width, height, widths }
    console.log(`  ${name.padEnd(14)} ${width}x${height}  ->  ${widths.join(', ')}`)
  }

  await writeFile(path.join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 2))

  console.log(
    `\n${files.length} renders  ${bytes(srcTotal)} source  ->  ${bytes(outTotal)} across all variants`,
  )
}

if (!existsSync(SRC_DIR)) {
  console.error(`No renders directory at ${SRC_DIR}`)
  process.exit(1)
}

build().catch((err) => {
  console.error(err)
  process.exit(1)
})
