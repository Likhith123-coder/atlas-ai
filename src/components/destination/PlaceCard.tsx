import type { SyntheticEvent } from 'react'
import { Plus, SunMedium } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Place } from '../../types/travel'

type PlaceCardProps = {
  place: Place
  placeIndex: number
  imageUrl: string
  onAddToPlanner: (placeName: string) => void
  onImageError: (event: SyntheticEvent<HTMLImageElement>, fallbackImage: string) => void
}

export function PlaceCard({
  place,
  placeIndex,
  imageUrl,
  onAddToPlanner,
  onImageError,
}: PlaceCardProps) {
  return (
    <motion.article
      className="place-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: placeIndex * 0.06 }}
    >
      <div className="place-image-wrap">
        <img
          src={imageUrl}
          alt={place.name}
          loading="lazy"
          onError={(event) => onImageError(event, place.fallbackImage)}
        />
        <span className="place-category-tag">{place.category}</span>
      </div>
      <div className="place-info">
        <div className="place-header">
          <h3>{place.name}</h3>
          <span className="place-timing">
            <SunMedium size={14} />
            {place.bestTime}
          </span>
        </div>
        <p>{place.description}</p>
        <button
          type="button"
          className="place-action-btn"
          onClick={() => onAddToPlanner(place.name)}
        >
          <Plus size={15} />
          <span>Add to itinerary idea</span>
        </button>
      </div>
    </motion.article>
  )
}
