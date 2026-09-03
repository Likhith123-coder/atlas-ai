import type { Destination } from '../../types/travel'

type DestinationInsightsProps = {
  destination: Destination
}

export function DestinationInsights({ destination }: DestinationInsightsProps) {
  return (
    <>
      <div className="detail-insights">
        <article>
          <span>Best window</span>
          <strong>{destination.bestTime}</strong>
        </article>
        <article>
          <span>Travel mood</span>
          <div className="mood-badges">
            {destination.mood.map((mood) => (
              <em key={mood}>{mood}</em>
            ))}
          </div>
        </article>
        <article>
          <span>Weather-aware tip</span>
          <strong>Check conditions before locking outdoor-heavy days.</strong>
        </article>
      </div>

      <div className="travel-note">
        <div>
          <p className="eyebrow">Before you go</p>
          <h3>Leave room for the unplanned.</h3>
        </div>
        <p>
          {destination.name} rewards a little breathing space. Use the guide for your anchors,
          then let the weather and local rhythm decide what happens next.
        </p>
      </div>
    </>
  )
}
