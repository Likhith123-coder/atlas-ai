import type { SyntheticEvent } from 'react'
import { Search } from 'lucide-react'
import type { Destination, SortOption } from '../../types/travel'
import { DestinationCard } from './DestinationCard'
import { FilterBar } from './FilterBar'

type DestinationExplorerProps = {
  destinations: Destination[]
  selectedDestinationId: string
  activeMood: string
  onMoodChange: (mood: string) => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  getImageUrl: (destination: Destination) => string
  onSelectDestination: (destination: Destination) => void
  onImageError: (event: SyntheticEvent<HTMLImageElement>, fallbackImage: string) => void
}

export function DestinationExplorer({
  destinations,
  selectedDestinationId,
  activeMood,
  onMoodChange,
  sortBy,
  onSortChange,
  getImageUrl,
  onSelectDestination,
  onImageError,
}: DestinationExplorerProps) {
  return (
    <section className="section explorer-section" id="explore">
      <div className="section-heading">
        <p className="eyebrow">Destination explorer</p>
        <h2>Choose a mood, then open the place properly.</h2>
        <p>
          Search and filter curated destinations. Each one opens into a richer guide with famous
          places, weather, location tools, and AI planning.
        </p>
      </div>

      <FilterBar
        activeMood={activeMood}
        onMoodChange={onMoodChange}
        sortBy={sortBy}
        onSortChange={onSortChange}
      />

      {destinations.length > 0 ? (
        <div className={`destination-grid destination-grid--${destinations.length}`}>
          {destinations.map((destination, index) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              isSelected={selectedDestinationId === destination.id}
              imageUrl={getImageUrl(destination)}
              index={index}
              onSelect={onSelectDestination}
              onImageError={onImageError}
            />
          ))}
        </div>
      ) : (
        <div className="state-panel">
          <Search size={28} />
          <h3>No matching escapes found.</h3>
          <p>Try a different city, country, or travel mood.</p>
        </div>
      )}
    </section>
  )
}
