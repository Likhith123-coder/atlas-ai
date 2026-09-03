import type { SyntheticEvent } from 'react'
import { CalendarDays, Star, SunMedium } from 'lucide-react'
import type { Destination } from '../../types/travel'

type DestinationHeroProps = {
  destination: Destination
  imageUrl: string
  onImageError: (event: SyntheticEvent<HTMLImageElement>, fallbackImage: string) => void
}

export function DestinationHero({
  destination,
  imageUrl,
  onImageError,
}: DestinationHeroProps) {
  return (
    <div className="detail-hero">
      <img
        src={imageUrl}
        alt={`${destination.name}, ${destination.country}`}
        onError={(event) => onImageError(event, destination.fallbackImage)}
      />
      <div className="detail-copy">
        <p className="eyebrow">{destination.country}</p>
        <h2>{destination.name}</h2>
        <p>{destination.summary}</p>
        <div className="quick-facts">
          <span>
            <CalendarDays size={17} />
            {destination.days}
          </span>
          <span>
            <Star size={17} />
            {destination.budget}
          </span>
          <span>
            <SunMedium size={17} />
            {destination.bestTime}
          </span>
        </div>
      </div>
    </div>
  )
}
