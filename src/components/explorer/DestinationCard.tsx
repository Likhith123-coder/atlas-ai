import type { SyntheticEvent } from 'react'
import { MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Destination } from '../../types/travel'

type DestinationCardProps = {
  destination: Destination
  isSelected: boolean
  imageUrl: string
  index: number
  onSelect: (destination: Destination) => void
  onImageError: (event: SyntheticEvent<HTMLImageElement>, fallbackImage: string) => void
}

export function DestinationCard({
  destination,
  isSelected,
  imageUrl,
  index,
  onSelect,
  onImageError,
}: DestinationCardProps) {
  return (
    <motion.button
      className={`destination-card ${isSelected ? 'selected' : ''}`}
      type="button"
      onClick={() => onSelect(destination)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay: index * 0.05, duration: 0.45 }}
      aria-label={`View ${destination.name}, ${destination.country}`}
    >
      <img
        src={imageUrl}
        alt={`${destination.name}, ${destination.country}`}
        loading="lazy"
        onError={(event) => onImageError(event, destination.fallbackImage)}
      />
      <span className="card-gradient" />
      <span className="card-content">
        <span className="card-meta">
          <MapPin size={15} />
          {destination.country}
        </span>
        <strong>{destination.name}</strong>
        <span>{destination.summary}</span>
      </span>
    </motion.button>
  )
}
