import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import Render from './Render'
import Reveal from './Reveal'
import { useSimplifiedMotion } from '../hooks/useSimplifiedMotion'
import type { RenderKey } from '../data/renders'

/**
 * Four renders of the same camera at the same framing, so they cross-dissolve in
 * perfect registration: the drill draws itself from line art into the finished
 * product as the section is scrolled.
 */
const FRAMES: { name: RenderKey; label: string }[] = [
  { name: 'drive_wf2', label: 'Outline' },
  { name: 'drive_wf', label: 'Structure' },
  { name: 'drive_sh_wf', label: 'Surface' },
  { name: 'drive_sh', label: 'Finish' },
]

const STEP = 1 / (FRAMES.length - 1)

/**
 * Peaks at this frame's position and falls away toward its neighbours.
 *
 * The range is trimmed to [0, 1] rather than allowed to run past either end:
 * Framer hands scroll-driven transforms to native WAAPI, which rejects keyframe
 * offsets outside that window. The first and last frames simply hold instead of
 * fading in from nothing.
 */
function useFrameOpacity(progress: MotionValue<number>, index: number) {
  const centre = index * STEP
  const range: number[] = []
  const output: number[] = []

  if (centre - STEP >= 0) {
    range.push(centre - STEP)
    output.push(0)
  }
  range.push(centre)
  output.push(1)
  if (centre + STEP <= 1) {
    range.push(centre + STEP)
    output.push(0)
  }

  return useTransform(progress, range, output)
}

function Frame({
  progress,
  index,
  frame,
}: {
  progress: MotionValue<number>
  index: number
  frame: (typeof FRAMES)[number]
}) {
  const opacity = useFrameOpacity(progress, index)

  return (
    <motion.div style={{ opacity }} className="absolute inset-0" aria-hidden={index > 0}>
      <Render
        name={frame.name}
        priority
        sizes="(min-width: 1024px) 100vw, (min-width: 640px) 120vw, 200vw"
        className="absolute inset-0 h-full w-full translate-x-[2%] scale-[1.8] object-contain sm:translate-x-[3%] sm:scale-[1.2] lg:translate-x-[4%] lg:scale-100"
        // Only the first frame carries the description; the rest are the same
        // object mid-transition and would just repeat it to a screen reader.
        alt={index === 0 ? undefined : ''}
      />
    </motion.div>
  )
}

function StageLabel({
  progress,
  index,
  label,
}: {
  progress: MotionValue<number>
  index: number
  label: string
}) {
  const opacity = useFrameOpacity(progress, index)
  // #8a8a8a is 6.0:1 on black — the dimmest an inactive label can go and still
  // clear AA at this size. Anything darker fails contrast.
  const colour = useTransform(opacity, [0, 1], ['#8a8a8a', '#e8ad23'])

  return (
    <li className="flex-1 text-center">
      <motion.span
        style={{ color: colour }}
        className="text-[0.6875rem] font-medium tracking-[0.18em] uppercase sm:text-xs"
      >
        {label}
      </motion.span>
    </li>
  )
}

export default function BuildSequence() {
  const trackRef = useRef<HTMLDivElement>(null)
  const simplified = useSimplifiedMotion()

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  })

  const heading = (
    <>
      <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">How it was made</p>
      <h2 className="mt-3 text-[clamp(1.75rem,4.5vw,3rem)] leading-tight font-semibold tracking-tight text-fg">
        Drawn, then built.
      </h2>
      <p className="mt-4 max-w-md text-base leading-relaxed text-fg-muted sm:text-lg">
        Every surface on the Drive started as a line. Nothing was added that the drawing did not
        already ask for.
      </p>
    </>
  )

  // Phones and reduced-motion users get the finished frame outright: a pinned
  // sequence fights the browser's own scroll gestures on touch, and preloading
  // four full-bleed frames for it would be bandwidth spent on nothing.
  if (simplified) {
    return (
      <section id="build" className="border-t border-hair px-5 py-20 sm:px-8 sm:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">{heading}</Reveal>
        <Reveal index={1} className="mx-auto mt-12 w-full max-w-5xl overflow-hidden">
          <div className="relative aspect-3/2 w-full sm:aspect-[2.5/1]">
            <Render
              name="drive_sh_wf"
              sizes="(min-width: 640px) 90vw, 200vw"
              className="absolute inset-0 h-full w-full translate-x-[2%] scale-[1.8] object-contain sm:translate-x-[3%] sm:scale-[1.15]"
            />
          </div>
        </Reveal>
      </section>
    )
  }

  return (
    <section
      id="build"
      ref={trackRef}
      className="relative border-t border-hair"
      // Four frames, each given roughly a viewport of scroll to resolve in.
      style={{ height: '400svh' }}
      aria-labelledby="build-heading"
    >
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <div className="px-5 pt-24 text-center sm:px-8 sm:pt-28">
          <div className="mx-auto max-w-3xl [&>p:last-child]:mx-auto">
            <p className="text-xs font-medium tracking-[0.2em] text-accent uppercase">
              How it was made
            </p>
            <h2
              id="build-heading"
              className="mt-3 text-[clamp(1.75rem,4.5vw,3rem)] leading-tight font-semibold tracking-tight text-fg"
            >
              Drawn, then built.
            </h2>
          </div>
        </div>

        <div className="relative min-h-0 flex-1">
          {FRAMES.map((frame, index) => (
            <Frame key={frame.name} progress={scrollYProgress} index={index} frame={frame} />
          ))}
        </div>

        <div className="px-5 pb-10 sm:px-8 sm:pb-14">
          <ol className="mx-auto flex max-w-xl items-center">
            {FRAMES.map((frame, index) => (
              <StageLabel
                key={frame.name}
                progress={scrollYProgress}
                index={index}
                label={frame.label}
              />
            ))}
          </ol>
          <div className="mx-auto mt-4 h-px w-full max-w-xl bg-hair">
            <motion.div
              className="h-px origin-left bg-accent"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
