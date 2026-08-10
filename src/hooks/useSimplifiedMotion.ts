import { useSyncExternalStore } from 'react'
import { useReducedMotion } from 'framer-motion'

const NARROW = '(max-width: 767px)'

function subscribe(onChange: () => void) {
  const query = window.matchMedia(NARROW)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

const getSnapshot = () => window.matchMedia(NARROW).matches

/**
 * True when elaborate scroll-driven motion should be swapped for a static
 * presentation: either the user asked for reduced motion, or the viewport is
 * phone-sized, where a pinned sequence fights the browser's own scroll gestures
 * and costs bandwidth for frames nobody sees.
 */
export function useSimplifiedMotion(): boolean {
  const isNarrow = useSyncExternalStore(subscribe, getSnapshot)
  const reduced = useReducedMotion()

  return Boolean(reduced) || isNarrow
}
