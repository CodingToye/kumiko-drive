import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Stagger position within a group; each step adds 80ms. */
  index?: number
  className?: string
  /** Render as something other than a div, e.g. "li" or "section". */
  as?: 'div' | 'li' | 'section' | 'header' | 'figure'
}

/**
 * Fade + 20px rise as the element scrolls into view. Fires once.
 *
 * With prefers-reduced-motion the rise is dropped entirely and the element
 * simply fades — no transform, no stagger delay.
 */
export default function Reveal({ children, index = 0, className, as = 'div' }: Props) {
  const reduced = useReducedMotion()
  const MotionTag = motion[as]

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{
        duration: reduced ? 0.2 : 0.6,
        delay: reduced ? 0 : index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  )
}
