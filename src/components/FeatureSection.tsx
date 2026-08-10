import CropBox from './CropBox'
import Reveal from './Reveal'
import type { Feature } from '../data/features'

/**
 * Alternating render / text pairs. The render leads on even rows and follows on
 * odd ones; on mobile the pair always stacks with the render on top.
 */
export default function FeatureSection({ feature, index }: { feature: Feature; index: number }) {
  const renderFirst = index % 2 === 0

  return (
    <section
      aria-labelledby={`${feature.id}-heading`}
      className="border-t border-hair px-5 py-16 sm:px-8 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-8 md:grid-cols-2 md:gap-14 lg:gap-20">
        <Reveal className={renderFirst ? 'md:order-1' : 'md:order-2'}>
          <CropBox
            name={feature.render}
            zoom={feature.zoom}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-4/3 w-full rounded-xl sm:aspect-3/2"
          />
        </Reveal>

        <Reveal index={1} className={renderFirst ? 'md:order-2' : 'md:order-1'}>
          <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
            {feature.eyebrow}
          </p>
          <h2
            id={`${feature.id}-heading`}
            className="mt-3 text-[clamp(1.625rem,3.6vw,2.75rem)] leading-[1.1] font-semibold tracking-tight text-balance text-fg"
          >
            {feature.headline}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-fg-muted sm:text-lg">
            {feature.body}
          </p>
        </Reveal>
      </div>
    </section>
  )
}
