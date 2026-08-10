import type { CSSProperties } from 'react'
import { RENDERS, fallbackSrc, srcSetFor, type RenderKey } from '../data/renders'

type Props = {
  name: RenderKey
  /** Layout hint for the browser's srcset picker, e.g. "100vw" or "(min-width: 768px) 50vw, 100vw". */
  sizes: string
  /** Eager-load + high fetch priority. Only the LCP image should set this. */
  priority?: boolean
  /** Classes applied to the <img> itself. */
  className?: string
  /** Overrides the alt text from renders.ts — use for decorative repeats (alt=""). */
  alt?: string
  /** Inline styles on the <img>, for values that vary per instance (crop framing). */
  style?: CSSProperties
}

/**
 * Every render on the page goes through here, so responsive sources, lazy-loading
 * and intrinsic sizing are impossible to forget.
 *
 * The intrinsic width/height attributes are always emitted: combined with a
 * width-constrained class they let the browser reserve the right box before the
 * image lands, which is what keeps CLS at zero.
 */
export default function Render({
  name,
  sizes,
  priority = false,
  className = '',
  alt,
  style,
}: Props) {
  const meta = RENDERS[name]

  return (
    <picture>
      <source type="image/avif" srcSet={srcSetFor(name, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSetFor(name, 'webp')} sizes={sizes} />
      <img
        src={fallbackSrc(name)}
        srcSet={srcSetFor(name, 'png')}
        sizes={sizes}
        width={meta.width}
        height={meta.height}
        alt={alt ?? meta.alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        className={`${meta.invert ? 'invert' : ''} ${className}`.trim()}
        style={style}
      />
    </picture>
  )
}
