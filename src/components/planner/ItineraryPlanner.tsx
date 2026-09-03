import { Sparkles } from 'lucide-react'
import type { BudgetOption, PaceOption, TravelStyleOption } from '../../types/travel'

type ItineraryPlannerProps = {
  days: number
  onDaysChange: (days: number) => void
  travelStyle: TravelStyleOption
  onTravelStyleChange: (style: TravelStyleOption) => void
  budget: BudgetOption
  onBudgetChange: (budget: BudgetOption) => void
  pace: PaceOption
  onPaceChange: (pace: PaceOption) => void
  interests: string
  onInterestsChange: (interests: string) => void
  isPlanning: boolean
  onGenerate: () => void
}

export function ItineraryPlanner({
  days,
  onDaysChange,
  travelStyle,
  onTravelStyleChange,
  budget,
  onBudgetChange,
  pace,
  onPaceChange,
  interests,
  onInterestsChange,
  isPlanning,
  onGenerate,
}: ItineraryPlannerProps) {
  return (
    <div className="planner-controls">
      <div>
        <p className="eyebrow">Itinerary planning</p>
        <h2>Generate a day-by-day plan.</h2>
      </div>
      <div className="control-row">
        <label>
          Days
          <input
            type="number"
            min="1"
            max="10"
            value={days}
            onChange={(event) => onDaysChange(Number(event.target.value))}
          />
        </label>
        <label>
          Style
          <select
            value={travelStyle}
            onChange={(event) => onTravelStyleChange(event.target.value as TravelStyleOption)}
          >
            <option value="Balanced">Balanced</option>
            <option value="Relaxed">Relaxed</option>
            <option value="Food focused">Food focused</option>
            <option value="Adventure">Adventure</option>
          </select>
        </label>
        <label>
          Budget
          <select
            value={budget}
            onChange={(event) => onBudgetChange(event.target.value as BudgetOption)}
          >
            <option value="Thoughtful">Thoughtful</option>
            <option value="Balanced">Balanced</option>
            <option value="Luxury">Luxury</option>
          </select>
        </label>
        <label>
          Pace
          <select
            value={pace}
            onChange={(event) => onPaceChange(event.target.value as PaceOption)}
          >
            <option value="Slow and spacious">Slow and spacious</option>
            <option value="Comfortable">Comfortable</option>
            <option value="Full days">Full days</option>
          </select>
        </label>
        <label className="interests-control">
          Interests
          <input
            value={interests}
            onChange={(event) => onInterestsChange(event.target.value)}
            placeholder="Food, temples, design..."
          />
        </label>
        <button
          className="primary-btn"
          type="button"
          onClick={onGenerate}
          disabled={isPlanning}
        >
          <Sparkles size={17} />
          {isPlanning ? 'Planning...' : 'Generate'}
        </button>
      </div>
    </div>
  )
}
