import type { VercelRequest, VercelResponse } from '@vercel/node'

type WeatherPayload = {
  name?: string
  main: { temp: number; humidity: number }
  weather?: Array<{ main?: string }>
  wind: { speed: number }
}

function weatherTip(condition = '') {
  const normalized = condition.toLowerCase()

  if (normalized.includes('rain')) {
    return 'Plan museums, cafes, and covered markets into the day.'
  }

  if (normalized.includes('clear')) {
    return 'A strong day for viewpoints, walking routes, and outdoor places.'
  }

  return 'Keep the plan flexible and leave space between outdoor stops.'
}

function normalizeWeather(data: WeatherPayload, fallbackCity: string, tip?: string) {
  const condition = data.weather?.[0]?.main || 'Current weather'

  return {
    city: data.name || fallbackCity,
    temp: Math.round(data.main.temp),
    condition,
    humidity: data.main.humidity,
    wind: Math.round(data.wind.speed),
    tip: tip || weatherTip(condition),
  }
}

export default async function handler(request: VercelRequest, response: VercelResponse) {
  const key = process.env.OPENWEATHER_API_KEY

  if (!key) {
    response.status(503).json({ error: 'OPENWEATHER_API_KEY is not configured' })
    return
  }

  const { city, lat, lon, fallbackCity = 'Selected location', mode } = request.query
  const hasCoords = typeof lat === 'string' && typeof lon === 'string'
  const hasCity = typeof city === 'string' && city.trim().length > 0

  if (!hasCoords && !hasCity) {
    response.status(400).json({ error: 'Provide city or lat/lon' })
    return
  }

  const endpoint = hasCity
    ? `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${key}`
    : `https://api.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(
        String(lat),
      )}&lon=${encodeURIComponent(String(lon))}&units=metric&appid=${key}`

  try {
    const upstream = await fetch(endpoint)

    if (!upstream.ok) {
      response.status(upstream.status).json({ error: 'Weather request failed' })
      return
    }

    const data = (await upstream.json()) as WeatherPayload
    response.status(200).json(
      normalizeWeather(
        data,
        String(fallbackCity),
        mode === 'current' ? 'Use this as your starting point while comparing destinations.' : undefined,
      ),
    )
  } catch {
    response.status(500).json({ error: 'Weather service unavailable' })
  }
}
