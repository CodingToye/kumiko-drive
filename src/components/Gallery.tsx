import CropBox from './CropBox'
import Reveal from './Reveal'
import { RENDERS, type RenderKey } from '../data/renders'

const VIEWS: { name: RenderKey; caption: string; zoom: number }[] = [
  { name: 'drive_iso', caption: 'Three-quarter', zoom: 1.4 },
  { name: 'drive_side', caption: 'Profile', zoom: 1.5 },
  { name: 'drive_top', caption: 'Plan', zoom: 1.4 },
  { name: 'drive_back', caption: 'Rear', zoom: 1.7 },
]

/**
 * A horizontal scroll-snap rail rather than a masonry grid: these are wide
 * landscape plates, which tile badly in a masonry column but sit naturally
 * side by side.
 */
export default function Gallery() {
  return (
    <section aria-labelledby="gallery-heading" className="border-t border-hair py-16 sm:py-24">
      <Reveal className="px-5 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">Gallery</p>
          <h2
            id="gallery-heading"
            className="mt-3 text-[clamp(1.625rem,3.6vw,2.75rem)] leading-tight font-semibold tracking-tight text-fg"
          >
            Every angle.
          </h2>
        </div>
      </Reveal>

      <Reveal index={1} className="mt-10 sm:mt-12">
        {/* The scroll container itself carries the tab stop, so once focused the
            arrow keys drive the rail directly. The <ul> keeps list semantics. */}
        <div
          tabIndex={0}
          role="region"
          aria-label="Product views, scrollable horizontally"
          className="snap-x snap-mandatory overflow-x-auto [scrollbar-width:thin]"
        >
          <ul className="flex gap-4 px-5 pb-4 sm:gap-6 sm:px-8">
            {VIEWS.map(({ name, caption, zoom }) => (
              <li
                key={name}
                className="w-[78vw] shrink-0 snap-center sm:w-[58vw] lg:w-[42vw] xl:w-[36vw]"
              >
                <figure>
                  <CropBox
                    name={name}
                    zoom={zoom}
                    sizes="(min-width: 1280px) 36vw, (min-width: 1024px) 42vw, (min-width: 640px) 58vw, 78vw"
                    // drive_back is nearly black edge to edge, so the ring is
                    // what gives it an edge against the page.
                    className="aspect-4/3 w-full rounded-xl ring-1 ring-white/10 sm:aspect-3/2"
                    alt={RENDERS[name].alt}
                  />
                  <figcaption className="mt-3 text-sm text-fg-muted">{caption}</figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  )
}
