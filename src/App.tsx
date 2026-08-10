import { useEffect, useRef, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import BuildSequence from './components/BuildSequence'
import FeatureSection from './components/FeatureSection'
import SpecStrip from './components/SpecStrip'
import Gallery from './components/Gallery'
import ClosingCTA from './components/ClosingCTA'
import Footer from './components/Footer'
import { FEATURES } from './data/features'

export default function App() {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const [navVisible, setNavVisible] = useState(false)

  // The nav appears only once the hero has scrolled past. An observer on a
  // sentinel at the hero's base costs nothing per frame, unlike a scroll handler.
  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => setNavVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <a
        href="#overview"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
      >
        Skip to content
      </a>

      <Nav visible={navVisible} />

      <main>
        <Hero sentinelRef={sentinelRef} />
        <BuildSequence />

        <div id="overview">
          {FEATURES.map((feature, index) => (
            <FeatureSection key={feature.id} feature={feature} index={index} />
          ))}
        </div>

        <SpecStrip />
        <Gallery />
        <ClosingCTA />
      </main>

      <Footer />
    </>
  )
}
