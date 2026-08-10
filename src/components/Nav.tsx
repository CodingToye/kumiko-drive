import { motion, useReducedMotion } from 'framer-motion'
import Render from './Render'

const LINKS = [
  { href: '#overview', label: 'Overview' },
  { href: '#specs', label: 'Specs' },
  { href: '#buy', label: 'Buy' },
]

/**
 * Thin translucent bar that appears only once the hero has scrolled past.
 * `visible` is driven by an IntersectionObserver on the hero in App, not by a
 * scroll listener.
 */
export default function Nav({ visible }: { visible: boolean }) {
  const reduced = useReducedMotion()

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-hair bg-ink/60 backdrop-blur-md"
      initial={false}
      animate={{
        opacity: visible ? 1 : 0,
        y: visible || reduced ? 0 : -8,
      }}
      transition={{ duration: reduced ? 0.15 : 0.35, ease: [0.16, 1, 0.3, 1] }}
      // Hidden from pointer and keyboard while invisible, so it can never
      // catch a tab stop the user cannot see.
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      aria-hidden={!visible}
      inert={!visible}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <a href="#top" className="flex items-center gap-2.5" aria-label="Kumiko, back to top">
          <Render name="logo" sizes="48px" className="h-5 w-auto sm:h-6" alt="" />
          <span className="text-sm font-medium tracking-tight text-fg">Kumiko</span>
        </a>

        <ul className="flex items-center gap-6 sm:gap-8">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a
                href={href}
                className="text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  )
}
