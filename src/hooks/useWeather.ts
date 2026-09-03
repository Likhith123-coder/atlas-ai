import { useState } from 'react'
import { getDestinationWeather, getWeatherByCity, getWeatherByCoords } from '../services/weather'
import type { Destination, WeatherState } from '../types/travel'

export function useWeather() {
  const [weather, setWeather] = useState<WeatherState>({ status: 'idle' })
  const [locationInput, setLocationInput] = useState('')
  const [locationStatus, setLocationStatus] = useState(
    'Choose your starting point for more useful weather context.',
  )

  const loadWeather = async (destination: Destination) => {
    setWeather({ status: 'loading' })
    setLocationStatus(`Checking weather near ${destination.name}.`)

    try {
      const result = await getDestinationWeather(destination)
      setWeather({ status: 'ready', ...result })
      setLocationStatus(`Showing destination weather for ${destination.name}.`)
    } catch {
      setWeather({
        status: 'error',
        message: 'Weather is taking a detour. Try again in a moment.',
      })
      setLocationStatus('Weather could not be loaded. You can still choose a starting city below.')
    }
  }

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setWeather({ status: 'error', message: 'Location is not available in this browser.' })
      setLocationStatus('Your browser does not support location. Search for a starting city instead.')
      return
    }

    setWeather({ status: 'loading' })
    setLocationStatus('Requesting your location. Allow access when your browser asks.')
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const result = await getWeatherByCoords(position.coords.latitude, position.coords.longitude)
          setWeather({ status: 'ready', ...result })
          setLocationStatus(`Using your location: ${result.city}.`)
        } catch {
          setWeather({ status: 'error', message: 'Could not read live weather for your location.' })
          setLocationStatus('We could not load weather for your location. Search for a starting city instead.')
        }
      },
      (error) => {
        const message =
          error.code === error.PERMISSION_DENIED
            ? 'Location permission was not granted.'
            : error.code === error.TIMEOUT
              ? 'Location took too long to respond.'
              : 'Your location could not be detected.'
        setWeather({
          status: 'error',
          message: `${message} Search your starting city instead.`,
        })
        setLocationStatus('No problem. You can search for a starting city without sharing your location.')
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 },
    )
  }

  const searchLocation = async () => {
    const city = locationInput.trim()
    if (!city) {
      setWeather({ status: 'error', message: 'Type a city to search weather.' })
      setLocationStatus('Enter a city name, such as Kyoto or New York.')
      return
    }

    setWeather({ status: 'loading' })
    setLocationStatus(`Searching weather for ${city}.`)

    try {
      const result = await getWeatherByCity(city)
      setWeather({ status: 'ready', ...result })
      setLocationStatus(`Using your chosen starting city: ${result.city}.`)
    } catch {
      setWeather({ status: 'error', message: 'No weather found for that city. Check the spelling.' })
      setLocationStatus('That city could not be found. Check the spelling and try again.')
    }
  }

  const resetWeather = () => {
    setWeather({ status: 'idle' })
  }

  return {
    weather,
    locationInput,
    setLocationInput,
    locationStatus,
    loadWeather,
    useMyLocation,
    searchLocation,
    resetWeather,
  }
}
