import type { ChangeEvent } from 'react'
import { moods } from '../../data/destinations'
import type { SortOption } from '../../types/travel'

type FilterBarProps = {
  activeMood: string
  onMoodChange: (mood: string) => void
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
}

export function FilterBar({
  activeMood,
  onMoodChange,
  sortBy,
  onSortChange,
}: FilterBarProps) {
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as SortOption)
  }

  return (
    <div className="filter-bar" aria-label="Destination filters">
      {moods.map((mood) => (
        <button
          className={activeMood === mood ? 'active' : ''}
          key={mood}
          type="button"
          aria-pressed={activeMood === mood}
          onClick={() => onMoodChange(mood)}
        >
          {mood}
        </button>
      ))}
      <label className="sort-control">
        <span>Sort</span>
        <select
          value={sortBy}
          onChange={handleSortChange}
          aria-label="Sort destinations"
        >
          <option value="Popular">Popular</option>
          <option value="Warmest">Warmest</option>
          <option value="Best for Weekend">Best for Weekend</option>
        </select>
      </label>
    </div>
  )
}
