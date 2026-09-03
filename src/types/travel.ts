export type Place = {
  name: string
  category: string
  description: string
  bestTime: string
  imageQuery: string
  fallbackImage: string
}

export type BudgetOption = 'Thoughtful' | 'Balanced' | 'Luxury'

export type Destination = {
  id: string
  name: string
  country: string
  region: string
  mood: string[]
  categories: string[]
  summary: string
  bestTime: string
  budget: BudgetOption
  days: string
  coordinates: { lat: number; lon: number }
  heroQuery: string
  fallbackImage: string
  accent: string
  places: Place[]
}

export type WeatherResult = {
  city: string
  temp: number
  condition: string
  humidity: number
  wind: number
  tip: string
}

export type WeatherState =
  | { status: 'idle' }
  | { status: 'loading' }
  | ({ status: 'ready' } & WeatherResult)
  | { status: 'error'; message: string }

export type ItineraryDay = {
  day: number
  title: string
  morning: string
  afternoon: string
  evening: string
  tip: string
}

export type TravelStyleOption = 'Balanced' | 'Relaxed' | 'Food focused' | 'Adventure'
export type PaceOption = 'Slow and spacious' | 'Comfortable' | 'Full days'
export type SortOption = 'Popular' | 'Warmest' | 'Best for Weekend'

export type ItineraryRequest = {
  days: number
  travelStyle: string
  budget: string
  pace: string
  interests: string
}
