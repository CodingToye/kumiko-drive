import LatticeBackdrop from './LatticeBackdrop'
import Reveal from './Reveal'
import { SPECS } from '../data/specs'

export default function SpecStrip() {
  return (
    <section
      id="specs"
      aria-labelledby="specs-heading"
      className="relative isolate overflow-hidden border-t border-hair"
    >
      {/* The only place the kumiko motif appears. */}
      <LatticeBackdrop className="-z-10" />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <Reveal>
          <h2
            id="specs-heading"
            className="text-center text-xs font-medium tracking-[0.2em] text-accent uppercase"
          >
            The numbers
          </h2>
        </Reveal>

        <dl className="mt-10 grid grid-cols-1 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4">
          {SPECS.map((spec, index) => (
            <Reveal
              key={spec.label}
              index={index}
              as="div"
              className={[
                'flex flex-col justify-center border-t border-hair px-4 py-8 text-center sm:py-10',
                index % 2 === 1 ? 'sm:border-l' : '',
                index > 0 ? 'lg:border-l' : '',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {/* Figure before label visually; <dt> stays first in the DOM so the
                  pairing still reads correctly to assistive tech. */}
              <dt className="order-2 mt-3 block text-sm text-fg-muted">{spec.label}</dt>
              <dd className="order-1 block text-[clamp(2.75rem,6vw,4.5rem)] leading-none font-semibold tracking-tight text-fg tabular-nums">
                {spec.figure}
                {spec.unit && (
                  <span className="ml-1.5 align-baseline text-[0.4em] font-medium tracking-normal text-fg-muted">
                    {spec.unit}
                  </span>
                )}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
