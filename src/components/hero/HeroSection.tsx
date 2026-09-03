import { useEffect, useState } from 'react'
import { ArrowRight, Search } from 'lucide-react'
import { motion } from 'framer-motion'
import { heroPoster } from '../../data/destinations'

type HeroSectionProps = {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function HeroSection({ searchQuery, onSearchChange }: HeroSectionProps) {
  const [heroVideoFailed, setHeroVideoFailed] = useState(false)

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (
        event.key === '/' &&
        event.target instanceof HTMLElement &&
        !['INPUT', 'TEXTAREA', 'SELECT'].includes(event.target.tagName)
      ) {
        event.preventDefault()
        document.getElementById('destination-search')?.focus()
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  return (
    <section className="hero-section" id="top" style={{ backgroundImage: `url(${heroPoster})` }}>
      {!heroVideoFailed && (
        <video
          className="hero-video"
          src="/media/atlas-hero.mp4"
          poster={heroPoster}
          autoPlay
          muted
          loop
          playsInline
          onError={() => setHeroVideoFailed(true)}
          aria-label="Looping travel landscape background"
        />
      )}
      <div className="hero-overlay" />
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <p className="eyebrow">Weather-aware trips, cinematic discovery, AI planning</p>
        <h1>Find the trip that makes you keep scrolling.</h1>
        <p className="hero-copy">
          Browse rich destination guides, see live weather, explore famous places, and turn a travel
          idea into a readable day-by-day itinerary.
        </p>
        <form className="hero-search" onSubmit={(event) => event.preventDefault()}>
          <Search size={20} />
          <label className="sr-only" htmlFor="destination-search">
            Search destinations
          </label>
          <input
            id="destination-search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search Kyoto, Bali, Iceland... (Press / to focus)"
          />
          <a href="#explore" className="search-action">
            Explore
            <ArrowRight size={18} />
          </a>
        </form>
      </motion.div>
      <div className="scroll-cue">
        <span />
        Start exploring
      </div>
    </section>
  )
}
