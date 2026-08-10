import { useId } from 'react'

const SIDE = 72
const ROW = (SIDE * Math.sqrt(3)) / 2

type Point = [number, number]

/** Row parity, correct for negative indices too. */
const isEven = (n: number) => (((n % 2) + 2) % 2) === 0

const line = (a: Point, b: Point) =>
  `M${a[0].toFixed(2)},${a[1].toFixed(2)}L${b[0].toFixed(2)},${b[1].toFixed(2)}`

const centroid = (a: Point, b: Point, c: Point): Point => [
  (a[0] + b[0] + c[0]) / 3,
  (a[1] + b[1] + c[1]) / 3,
]

/** One asanoha unit: a triangle's three edges plus three spokes to its centre. */
function unit(a: Point, b: Point, c: Point): string {
  const m = centroid(a, b, c)
  return line(a, b) + line(b, c) + line(c, a) + line(m, a) + line(m, b) + line(m, c)
}

/**
 * Builds one tile of an asanoha (hemp-leaf) lattice: a triangular grid in which
 * every triangle is subdivided to its centre.
 *
 * The grid is drawn well past the tile bounds and clipped by <pattern>. That is
 * safe because the lattice is exactly periodic over (SIDE, 2 * ROW), so the
 * overdraw aligns with the neighbouring tiles and leaves no seam.
 */
function buildTile(): string {
  const parts: string[] = []

  for (let j = -2; j <= 3; j++) {
    // Alternate rows shift by half a side — this is what makes the grid triangular.
    const offsetTop = isEven(j) ? 0 : SIDE / 2
    const offsetBottom = isEven(j + 1) ? 0 : SIDE / 2

    for (let i = -2; i <= 2; i++) {
      const t1: Point = [i * SIDE + offsetTop, j * ROW]
      const t2: Point = [(i + 1) * SIDE + offsetTop, j * ROW]
      const b1: Point = [i * SIDE + offsetBottom, (j + 1) * ROW]
      const b2: Point = [(i + 1) * SIDE + offsetBottom, (j + 1) * ROW]

      // The apex of the downward triangle is whichever lower point sits between
      // t1 and t2, which flips with the row offset.
      if (offsetTop === 0) {
        parts.push(unit(t1, t2, b1), unit(b1, b2, t2))
      } else {
        parts.push(unit(t1, t2, b2), unit(b1, b2, t1))
      }
    }
  }

  return parts.join('')
}

/** The tile depends on nothing, so it is built once for the whole app. */
const TILE = buildTile()

/**
 * Barely-perceptible kumiko lattice. Used behind exactly one section — never
 * behind a render, never full-page, never in the accent colour.
 */
export default function LatticeBackdrop({ className = '' }: { className?: string }) {
  const reactId = useId()
  const patternId = `asanoha-${reactId.replace(/:/g, '')}`

  return (
    <svg
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      // Fades out toward the edges so the texture never collides with a divider.
      style={{
        maskImage: 'radial-gradient(115% 90% at 50% 50%, #000 20%, transparent 80%)',
        WebkitMaskImage: 'radial-gradient(115% 90% at 50% 50%, #000 20%, transparent 80%)',
      }}
    >
      <defs>
        <pattern id={patternId} width={SIDE} height={ROW * 2} patternUnits="userSpaceOnUse">
          <path d={TILE} fill="none" stroke="#ffffff" strokeWidth="1" />
        </pattern>
      </defs>
      {/* Opacity sits on the rect so overlapping strokes within a tile cannot
          compound into a darker line. */}
      <rect width="100%" height="100%" fill={`url(#${patternId})`} opacity="0.04" />
    </svg>
  )
}
