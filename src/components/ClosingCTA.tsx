import Reveal from './Reveal'

export default function ClosingCTA() {
  return (
    <section
      id="buy"
      aria-labelledby="buy-heading"
      className="border-t border-hair px-5 py-24 text-center sm:px-8 sm:py-32"
    >
      <Reveal className="mx-auto max-w-2xl">
        <h2
          id="buy-heading"
          className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.05] font-semibold tracking-tight text-balance text-fg"
        >
          Kumiko Drive
        </h2>
        <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-fg-muted sm:text-lg">
          120 Nm, twelve clutch settings and 1.4 kg. Built to be picked up more than it is put down.
        </p>
      </Reveal>

      <Reveal index={1} className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <a
          href="#buy"
          className="rounded-full bg-accent px-8 py-3.5 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:bg-[#f2ba3c]"
        >
          Buy
        </a>
        <a
          href="#specs"
          className="rounded-full border border-white/20 px-8 py-3.5 text-[0.9375rem] font-medium text-fg transition-colors duration-200 hover:border-white/40 hover:bg-white/5"
        >
          See the specs
        </a>
      </Reveal>
    </section>
  )
}
