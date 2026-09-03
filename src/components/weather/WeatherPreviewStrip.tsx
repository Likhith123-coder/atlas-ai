import { ArrowRight } from 'lucide-react'
import type { Destination } from '../../types/travel'

type WeatherPreviewStripProps = {
  destinations: Destination[]
  getImageUrl: (destination: Destination) => string
  onSelectDestination: (destination: Destination) => void
}

export function WeatherPreviewStrip({
  destinations,
  getImageUrl,
  onSelectDestination,
}: WeatherPreviewStripProps) {
  return (
    <section className="section weather-strip-section" aria-labelledby="weather-preview-heading">
      <div className="section-heading">
        <p className="eyebrow">A little context</p>
        <h2 id="weather-preview-heading">The forecast is part of the story.</h2>
      </div>
      <div className="weather-strip">
        {destinations.slice(0, 4).map((destination) => (
          <button
            className="weather-preview-card"
            key={destination.id}
            type="button"
            onClick={() => onSelectDestination(destination)}
          >
            <span
              className="weather-preview-image"
              style={{ backgroundImage: `url(${getImageUrl(destination)})` }}
            />
            <span className="weather-preview-copy">
              <strong>{destination.name}</strong>
              <small>{destination.bestTime}</small>
              <em>
                Open guide for live weather <ArrowRight size={14} />
              </em>
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
