import Render from './Render'
import { RENDERS, type RenderKey } from '../data/renders'

type Props = {
  name: RenderKey
  sizes: string
  /**
   * How far to zoom past "cover". Every render is a wide plate with the drill
   * occupying roughly a quarter of the frame, so cover alone still leaves it
   * small — 1.4 to 1.8 is the useful range.
   */
  zoom?: number
  /** Classes on the reserved box, which must carry an aspect ratio. */
  className?: string
  alt?: string
}

/**
 * Crops to the drill rather than to the middle of the file.
 *
 * `object-position` slides the frame horizontally to the subject, then a
 * vertical shift compensates for the subject sitting off-centre once zoomed.
 * The box keeps a fixed aspect ratio, so none of this costs layout shift.
 */
export default function CropBox({ name, sizes, zoom = 1, className = '', alt }: Props) {
  const { focus } = RENDERS[name]
  const shiftY = zoom * (50 - focus.y)

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Render
        name={name}
        sizes={sizes}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{
          objectPosition: `${focus.x}% 50%`,
          transform: `translateY(${shiftY}%) scale(${zoom})`,
        }}
      />
    </div>
  )
}
