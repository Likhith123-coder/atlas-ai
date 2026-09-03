import { Check, Copy, Moon, SunMedium, Sunrise } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Destination, ItineraryDay } from '../../types/travel'

type ItineraryTimelineProps = {
  destination: Destination
  days: number
  travelStyle: string
  itinerary: ItineraryDay[]
  itineraryNotice: string
  copyLabel: string
  isPlanning: boolean
  onCopyItinerary: () => void
}

export function ItineraryTimeline({
  destination,
  days,
  travelStyle,
  itinerary,
  itineraryNotice,
  copyLabel,
  isPlanning,
  onCopyItinerary,
}: ItineraryTimelineProps) {
  return (
    <div className="timeline" aria-live="polite">
      <div className="timeline-header">
        <div className="timeline-title-group">
          <span className="timeline-badge">{destination.name}</span>
          <span className="timeline-duration">
            {days} Days &bull; {travelStyle} Style
          </span>
        </div>
        <button
          className="copy-itinerary"
          type="button"
          onClick={onCopyItinerary}
          disabled={isPlanning}
        >
          {copyLabel === 'Copied' ? <Check size={14} /> : <Copy size={14} />}
          <span>{copyLabel}</span>
        </button>
      </div>

      {itineraryNotice && <p className="planner-notice">{itineraryNotice}</p>}

      <div className="timeline-days">
        {itinerary.map((day, index) => (
          <motion.article
            className="day-card"
            key={`${day.day}-${day.title}`}
            initial={{ opacity: 0, x: -18 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <div className="day-header">
              <span className="day-marker">Day {day.day}</span>
              <h3>{day.title}</h3>
            </div>
            <dl className="day-schedule">
              <div className="schedule-slot slot-morning">
                <dt>
                  <Sunrise size={15} />
                  <span>Morning</span>
                </dt>
                <dd>{day.morning}</dd>
              </div>
              <div className="schedule-slot slot-afternoon">
                <dt>
                  <SunMedium size={15} />
                  <span>Afternoon</span>
                </dt>
                <dd>{day.afternoon}</dd>
              </div>
              <div className="schedule-slot slot-evening">
                <dt>
                  <Moon size={15} />
                  <span>Evening</span>
                </dt>
                <dd>{day.evening}</dd>
              </div>
            </dl>
            <div className="day-tip">
              <span className="tip-badge">Tip</span>
              <p>{day.tip}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}
