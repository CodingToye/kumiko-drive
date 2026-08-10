import { motion, useReducedMotion } from 'framer-motion'
import type { RefObject } from 'react'
import Render from './Render'

const EASE = [0.16, 1, 0.3, 1] as const

export default function Hero({ sentinelRef }: { sentinelRef: RefObject<HTMLDivElement | null> }) {
  const reduced = useReducedMotion()

  const rise = (index: number) => ({
    initial: { opacity: 0, y: reduced ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0.2 : 0.6, delay: reduced ? 0 : index * 0.08, ease: EASE },
  })

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pb-10 sm:pb-16"
      aria-labelledby="hero-heading"
    >
      {/* Ground: a soft lift out of pure black, so the cut-out render sits in
          space rather than floating on a flat field. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_50%_35%,#141414_0%,#000_70%)]"
      />
      {/* Amber cast behind the product, picked up from its own livery. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-[8%] -z-10 mx-auto h-[45vh] w-[85%] max-w-5xl rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(232,173,35,0.10)_0%,transparent_70%)] blur-2xl"
      />

      <div className="flex flex-col items-center justify-center px-5 pt-28 pb-6 text-center sm:px-8">
        <motion.h1
          id="hero-heading"
          {...rise(0)}
          className="text-[clamp(2.75rem,9vw,7rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-fg"
        >
          Kumiko Drive
        </motion.h1>

        <motion.p
          {...rise(1)}
          className="mt-5 max-w-xl text-balance text-[clamp(1rem,2.2vw,1.375rem)] leading-snug text-fg-muted"
        >
          A cordless drill built like a piece of joinery.
        </motion.p>

        <motion.div {...rise(2)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#buy"
            className="rounded-full bg-accent px-7 py-3 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:bg-[#f2ba3c]"
          >
            Buy
          </a>
          <a
            href="#build"
            className="rounded-full border border-white/20 px-7 py-3 text-[0.9375rem] font-medium text-fg transition-colors duration-200 hover:border-white/40 hover:bg-white/5"
          >
            See it built
          </a>
        </motion.div>
      </div>

      {/* The render is 2.89:1 with wide empty margins, so at full width on a phone
          the drill shrinks to a sliver. A taller reserved box plus a zoom lets
          narrow screens crop into the product instead of scaling it down. The box
          keeps its own aspect ratio, so the zoom costs nothing in layout shift. */}
      <motion.div {...rise(3)} className="w-full overflow-hidden">
        <div className="relative mx-auto aspect-3/2 w-full max-w-[1600px] sm:aspect-[2.5/1] lg:aspect-[2.89/1]">
          <Render
            name="drive_sh"
            priority
            sizes="(min-width: 1024px) 100vw, (min-width: 640px) 120vw, 200vw"
            // The drill sits ~4% left of the frame's centre, which the zoom
            // amplifies; the nudge re-centres it optically at each step.
            className="absolute inset-0 h-full w-full translate-x-[2%] scale-[1.8] object-contain sm:translate-x-[3%] sm:scale-[1.2] lg:translate-x-[4%] lg:scale-100"
          />
        </div>
      </motion.div>

      {/* Watched by App's IntersectionObserver: once this leaves the top of the
          viewport, the nav fades in. */}
      <div ref={sentinelRef} aria-hidden="true" className="absolute bottom-0 h-px w-full" />
    </section>
  )
}
