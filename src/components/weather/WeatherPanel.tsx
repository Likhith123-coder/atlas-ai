import type { FormEvent } from 'react'
import { CloudSun, LocateFixed, Umbrella, Wind } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Destination, WeatherState } from '../../types/travel'

type WeatherPanelProps = {
  destination: Destination
  weather: WeatherState
  locationInput: string
  onLocationInputChange: (value: string) => void
  locationStatus: string
  onLoadDestinationWeather: () => void
  onUseMyLocation: () => void
  onSearchLocation: () => void
}

export function WeatherPanel({
  destination,
  weather,
  locationInput,
  onLocationInputChange,
  locationStatus,
  onLoadDestinationWeather,
  onUseMyLocation,
  onSearchLocation,
}: WeatherPanelProps) {
  const handleLocationSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSearchLocation()
  }

  const isLoading = weather.status === 'loading'

  return (
    <aside className="weather-panel" aria-live="polite">
      <div className="panel-title">
        <CloudSun size={20} />
        <h3>Live weather</h3>
      </div>

      <AnimatePresence mode="wait">
        {weather.status === 'idle' && (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>Check the current weather before you shape the day.</p>
            <button className="primary-btn" type="button" onClick={onLoadDestinationWeather}>
              Check {destination.name}
            </button>
          </motion.div>
        )}

        {weather.status === 'loading' && (
          <motion.div
            className="skeleton-stack"
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span />
            <span />
            <span />
          </motion.div>
        )}

        {weather.status === 'ready' && (
          <motion.div
            className="weather-ready"
            key="ready"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <strong>{weather.temp}&deg;C</strong>
              <span>
                {weather.condition} in {weather.city}
              </span>
            </div>
            <div className="weather-stats">
              <span>
                <Umbrella size={16} />
                {weather.humidity}% humidity
              </span>
              <span>
                <Wind size={16} />
                {weather.wind} m/s wind
              </span>
            </div>
            <p>{weather.tip}</p>
          </motion.div>
        )}

        {weather.status === 'error' && (
          <motion.div
            className="state-panel compact"
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>{weather.message}</p>
            <button type="button" onClick={onLoadDestinationWeather}>
              Retry
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="location-box">
        <h4>Start from your location</h4>
        <p className="location-status" id="location-status" aria-live="polite">
          {locationStatus}
        </p>
        <button type="button" onClick={onUseMyLocation} disabled={isLoading}>
          <LocateFixed size={16} />
          {isLoading ? 'Finding your location...' : 'Use my location'}
        </button>
        <form className="manual-location" onSubmit={handleLocationSubmit}>
          <input
            value={locationInput}
            onChange={(event) => onLocationInputChange(event.target.value)}
            placeholder="Search a starting city"
            aria-label="Search a city for weather"
            aria-describedby="location-status"
          />
          <button type="submit" disabled={isLoading}>
            Go
          </button>
        </form>
      </div>
    </aside>
  )
}
