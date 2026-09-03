import type { Destination, WeatherResult } from '../types/travel'

export async function getDestinationWeather(destination: Destination): Promise<WeatherResult> {
  try {
    const endpoint = `/api/weather?lat=${destination.coordinates.lat}&lon=${destination.coordinates.lon}&fallbackCity=${encodeURIComponent(destination.name)}`
    const response = await fetch(endpoint)

    if (!response.ok) {
      throw new Error('Weather request failed')
    }

    return await response.json()
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 650))
    return {
      city: destination.name,
      temp: 24,
      condition: 'Clear',
      humidity: 58,
      wind: 9,
      tip: 'Demo weather shown. Add OpenWeather on Vercel to make this live.',
    }
  }
}

export async function getWeatherByCoords(lat: number, lon: number): Promise<WeatherResult> {
  try {
    const response = await fetch(`/api/weather?lat=${lat}&lon=${lon}&fallbackCity=Your%20area&mode=current`)

    if (!response.ok) {
      throw new Error('Location weather failed')
    }

    return await response.json()
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      city: 'Your area',
      temp: 26,
      condition: 'Personalized demo',
      humidity: 61,
      wind: 7,
      tip: 'Location access worked. Add OpenWeather on Vercel to show live local weather.',
    }
  }
}

export async function getWeatherByCity(city: string): Promise<WeatherResult> {
  try {
    const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)

    if (!response.ok) {
      throw new Error('City not found')
    }

    return await response.json()
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return {
      city,
      temp: 23,
      condition: 'Demo result',
      humidity: 55,
      wind: 8,
      tip: 'Manual location search is ready. Add OpenWeather on Vercel for live city weather.',
    }
  }
}
