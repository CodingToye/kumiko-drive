/**
 * Every render in public/renders, with its measured intrinsic size and alt text.
 *
 * Dimensions are read off the actual PNGs — they drive the reserved aspect boxes,
 * so nothing on the page shifts as images arrive.
 *
 * Variants are produced by `npm run images` (scripts/generate-images.mjs) into
 * public/renders/opt/. Keep `widths` in sync with WIDTHS in that script.
 */

export type RenderKey =
  | 'drive_sh'
  | 'drive_sh_wf'
  | 'drive_wf'
  | 'drive_wf2'
  | 'drive_iso'
  | 'drive_side'
  | 'drive_top'
  | 'drive_back'
  | 'logo'

export type RenderMeta = {
  width: number
  height: number
  widths: number[]
  alt: string
  /**
   * Where the drill actually sits inside the frame, as a percentage of the
   * image. Every render is a 2.5:1+ plate with the product small and slightly
   * off-centre, so cropping to the middle of the file would not crop to the
   * product. CropBox uses this to frame the subject instead of the file.
   */
  focus: { x: number; y: number }
  /**
   * True for the two line-art renders, which are black strokes on transparency
   * and therefore invisible on a dark page. Inverting turns them into white
   * technical drawings. Never apply this to the shaded renders.
   */
  invert?: boolean
}

const FULL_WIDTHS = [640, 1280, 1920, 2560]

export const RENDERS: Record<RenderKey, RenderMeta> = {
  drive_sh: {
    focus: { x: 46, y: 49 },
    width: 3040,
    height: 1052,
    widths: FULL_WIDTHS,
    alt: 'The Kumiko Drive cordless drill in three-quarter view, its black body banded with amber along the chuck collar and battery housing.',
  },
  drive_sh_wf: {
    focus: { x: 46, y: 49 },
    width: 3040,
    height: 1052,
    widths: FULL_WIDTHS,
    alt: 'The Kumiko Drive with its CAD wireframe overlaid on the finished surfaces, showing the internal geometry beneath the shell.',
  },
  drive_wf: {
    focus: { x: 46, y: 49 },
    width: 3040,
    height: 1052,
    widths: FULL_WIDTHS,
    invert: true,
    alt: 'Full wireframe of the Kumiko Drive, every internal edge visible through the transparent body.',
  },
  drive_wf2: {
    focus: { x: 46, y: 49 },
    width: 3040,
    height: 1052,
    widths: FULL_WIDTHS,
    invert: true,
    alt: 'Line drawing of the Kumiko Drive showing only its outer silhouette and panel breaks.',
  },
  drive_iso: {
    focus: { x: 48, y: 42 },
    width: 3040,
    height: 1202,
    widths: FULL_WIDTHS,
    alt: 'The Kumiko Drive lit from above on black, angled away from the camera, its twin displays glowing red.',
  },
  drive_side: {
    focus: { x: 47, y: 40 },
    width: 3040,
    height: 1202,
    widths: FULL_WIDTHS,
    alt: 'Side profile of the Kumiko Drive on black, mirrored in the surface beneath it, with the numbered clutch collar in view.',
  },
  drive_top: {
    focus: { x: 46, y: 52 },
    width: 3040,
    height: 1202,
    widths: FULL_WIDTHS,
    alt: 'The Kumiko Drive seen from directly above, showing the amber spine running between the two grip pads and the mode dial at its centre.',
  },
  drive_back: {
    focus: { x: 50, y: 48 },
    width: 3040,
    height: 1202,
    widths: FULL_WIDTHS,
    alt: 'The Kumiko Drive from behind, nearly silhouetted, with the amber kumiko lattice vents and the 組子 badge catching the light.',
  },
  logo: {
    focus: { x: 50, y: 50 },
    width: 1072,
    height: 517,
    widths: [128, 256],
    alt: 'Kumiko',
  },
}

const OPT = '/renders/opt'

/** `srcset` string for one format, e.g. "/renders/opt/drive_sh-640.avif 640w, …" */
export function srcSetFor(key: RenderKey, format: 'avif' | 'webp' | 'png'): string {
  return RENDERS[key].widths.map((w) => `${OPT}/${key}-${w}.${format} ${w}w`).join(', ')
}

/** Largest generated PNG — the `src` fallback for browsers without AVIF or WebP. */
export function fallbackSrc(key: RenderKey): string {
  const widths = RENDERS[key].widths
  return `${OPT}/${key}-${widths[widths.length - 1]}.png`
}
