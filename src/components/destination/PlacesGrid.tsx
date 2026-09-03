import type { SyntheticEvent } from 'react'
import type { Destination } from '../../types/travel'
import { PlaceCard } from './PlaceCard'

type PlacesGridProps = {
  destination: Destination
  getPlaceImageUrl: (destinationId: string, placeIndex: number, fallback: string) => string
  onAddToPlanner: (placeName: string) => void
  onImageError: (event: SyntheticEvent<HTMLImageElement>, fallbackImage: string) => void
}

export function PlacesGrid({
  destination,
  getPlaceImageUrl,
  onAddToPlanner,
  onImageError,
}: PlacesGridProps) {
  return (
    <div className="places-section">
      <div className="section-heading slim">
        <p className="eyebrow">Famous places</p>
        <h2>Not a list. A real reason to visit.</h2>
      </div>
      <div className="place-grid">
        {destination.places.map((place, placeIndex) => (
          <PlaceCard
            key={place.name}
            place={place}
            placeIndex={placeIndex}
            imageUrl={getPlaceImageUrl(destination.id, placeIndex, place.fallbackImage)}
            onAddToPlanner={onAddToPlanner}
            onImageError={onImageError}
          />
        ))}
      </div>
    </div>
  )
}
