import { type CSSProperties, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { buildFallbackItinerary, destinations } from './data/destinations'
import { useDestinationImages } from './hooks/useDestinationImages'
import { useScrollPosition } from './hooks/useScrollPosition'
import { useWeather } from './hooks/useWeather'
import { askTravelAssistant, generateTripItinerary } from './services/gemini'
import type {
  BudgetOption,
  Destination,
  ItineraryDay,
  ItineraryRequest,
  PaceOption,
  SortOption,
  TravelStyleOption,
} from './types/travel'

import { DestinationHero } from './components/destination/DestinationHero'
import { DestinationInsights } from './components/destination/DestinationInsights'
import { PlacesGrid } from './components/destination/PlacesGrid'
import { DestinationExplorer } from './components/explorer/DestinationExplorer'
import { HeroSection } from './components/hero/HeroSection'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { AssistantChat } from './components/planner/AssistantChat'
import { ItineraryPlanner } from './components/planner/ItineraryPlanner'
import { ItineraryTimeline } from './components/planner/ItineraryTimeline'
import { WeatherPanel } from './components/weather/WeatherPanel'
import { WeatherPreviewStrip } from './components/weather/WeatherPreviewStrip'

import './App.css'

type AppProps = {
  destinationOnly?: boolean
}

function App({ destinationOnly = false }: AppProps) {
  const navigate = useNavigate()
  const { destinationId } = useParams()
  const routeDestination = destinations.find((d) => d.id === destinationId)

  const isNavScrolled = useScrollPosition(24)
  const { getDestinationImage, getPlaceImage, handleImageError } = useDestinationImages(destinations)

  // Explorer State
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMood, setActiveMood] = useState('All')
  const [sortBy, setSortBy] = useState<SortOption>('Popular')
  const [selectedId, setSelectedId] = useState(routeDestination?.id ?? destinations[0].id)

  const selectedDestination =
    destinations.find((d) => d.id === (destinationOnly ? routeDestination?.id : selectedId)) ??
    destinations[0]

  // Weather Hook
  const {
    weather,
    locationInput,
    setLocationInput,
    locationStatus,
    loadWeather,
    useMyLocation,
    searchLocation,
    resetWeather,
  } = useWeather()

  // AI Assistant State
  const [chatText, setChatText] = useState('')
  const [chatAnswer, setChatAnswer] = useState('')

  // Itinerary Planner State
  const [days, setDays] = useState(4)
  const [travelStyle, setTravelStyle] = useState<TravelStyleOption>('Balanced')
  const [budget, setBudget] = useState<BudgetOption>('Balanced')
  const [pace, setPace] = useState<PaceOption>('Comfortable')
  const [interests, setInterests] = useState('')
  const [itinerary, setItinerary] = useState<ItineraryDay[]>(
    buildFallbackItinerary(destinations[0], 4),
  )
  const [isPlanning, setIsPlanning] = useState(false)
  const [itineraryNotice, setItineraryNotice] = useState('')
  const [copyLabel, setCopyLabel] = useState('Copy itinerary')

  // Filtered & Sorted Destinations
  const filteredDestinations = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase()

    const matches = destinations.filter((destination) => {
      const matchesMood = activeMood === 'All' || destination.mood.includes(activeMood)
      const matchesSearch =
        !normalizedQuery ||
        [
          destination.name,
          destination.country,
          destination.region,
          destination.summary,
          destination.categories.join(' '),
        ]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery)

      return matchesMood && matchesSearch
    })

    return [...matches].sort((a, b) => {
      if (sortBy === 'Warmest') return Math.abs(a.coordinates.lat) - Math.abs(b.coordinates.lat)
      if (sortBy === 'Best for Weekend') return Number.parseInt(a.days) - Number.parseInt(b.days)
      return destinations.indexOf(a) - destinations.indexOf(b)
    })
  }, [activeMood, searchQuery, sortBy])

  // Destination Selection
  const handleSelectDestination = (destination: Destination) => {
    setSelectedId(destination.id)
    setItinerary(buildFallbackItinerary(destination, days, interests))
    setItineraryNotice('')
    resetWeather()
    setChatAnswer('')
    navigate(`/destination/${destination.id}`)
  }

  // AI Assistant Query
  const handleAskAssistant = async (promptOverride?: string) => {
    const text = (promptOverride ?? chatText).trim()
    if (!text) {
      setChatAnswer('Ask a travel question first, such as “How many days should I spend here?”')
      return
    }

    if (promptOverride) {
      setChatText(promptOverride)
    }

    setChatAnswer('Thinking through the trip...')

    try {
      setChatAnswer(await askTravelAssistant(selectedDestination, text))
    } catch {
      setChatAnswer('The assistant could not complete this route. Try asking again.')
    }
  }

  // Itinerary Generation
  const handleGenerateItinerary = async () => {
    setIsPlanning(true)
    setItineraryNotice('')

    try {
      const request: ItineraryRequest = { days, travelStyle, budget, pace, interests }
      const result = await generateTripItinerary(selectedDestination, request)
      setItinerary(result.days)
      if (result.usedFallback) {
        setItineraryNotice('The planner is using a thoughtful demo route while Gemini takes a detour.')
      }
    } finally {
      setIsPlanning(false)
    }
  }

  // Copy Itinerary to Clipboard
  const handleCopyItinerary = async () => {
    const text = itinerary
      .map(
        (day) =>
          `Day ${day.day}: ${day.title}\nMorning: ${day.morning}\nAfternoon: ${day.afternoon}\nEvening: ${day.evening}\nTip: ${day.tip}`,
      )
      .join('\n\n')

    await navigator.clipboard.writeText(text)
    setCopyLabel('Copied')
    window.setTimeout(() => setCopyLabel('Copy itinerary'), 1600)
  }

  // Add Place to Planner Action
  const handleAddPlaceToPlanner = (placeName: string) => {
    setChatText(`Add ${placeName} to a ${days}-day ${selectedDestination.name} plan`)
    document.getElementById('planner')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <main className="app-shell">
      <Navbar
        isScrolled={isNavScrolled}
        destinationOnly={destinationOnly}
        selectedDestinationId={selectedDestination.id}
      />

      {!destinationOnly && (
        <HeroSection searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      )}

      {!destinationOnly && (
        <DestinationExplorer
          destinations={filteredDestinations}
          selectedDestinationId={selectedDestination.id}
          activeMood={activeMood}
          onMoodChange={setActiveMood}
          sortBy={sortBy}
          onSortChange={setSortBy}
          getImageUrl={getDestinationImage}
          onSelectDestination={handleSelectDestination}
          onImageError={handleImageError}
        />
      )}

      {!destinationOnly && (
        <WeatherPreviewStrip
          destinations={destinations}
          getImageUrl={getDestinationImage}
          onSelectDestination={handleSelectDestination}
        />
      )}

      <section
        className={`destination-detail ${destinationOnly ? 'destination-detail--standalone' : ''}`}
        id="destination"
        style={{ '--accent': selectedDestination.accent } as CSSProperties}
      >
        {destinationOnly && (
          <Link className="detail-back-link" to="/explore">
            <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} />
            Back to explorer
          </Link>
        )}

        <DestinationHero
          destination={selectedDestination}
          imageUrl={getDestinationImage(selectedDestination)}
          onImageError={handleImageError}
        />

        <DestinationInsights destination={selectedDestination} />

        <div className="detail-layout">
          <WeatherPanel
            destination={selectedDestination}
            weather={weather}
            locationInput={locationInput}
            onLocationInputChange={setLocationInput}
            locationStatus={locationStatus}
            onLoadDestinationWeather={() => void loadWeather(selectedDestination)}
            onUseMyLocation={useMyLocation}
            onSearchLocation={() => void searchLocation()}
          />

          <PlacesGrid
            destination={selectedDestination}
            getPlaceImageUrl={getPlaceImage}
            onAddToPlanner={handleAddPlaceToPlanner}
            onImageError={handleImageError}
          />
        </div>
      </section>

      <section className="planner-section" id="planner">
        <AssistantChat
          destination={selectedDestination}
          chatText={chatText}
          onChatTextChange={setChatText}
          chatAnswer={chatAnswer}
          onAskQuestion={handleAskAssistant}
        />

        <div className="itinerary-panel">
          <ItineraryPlanner
            days={days}
            onDaysChange={setDays}
            travelStyle={travelStyle}
            onTravelStyleChange={setTravelStyle}
            budget={budget}
            onBudgetChange={setBudget}
            pace={pace}
            onPaceChange={setPace}
            interests={interests}
            onInterestsChange={setInterests}
            isPlanning={isPlanning}
            onGenerate={() => void handleGenerateItinerary()}
          />

          <ItineraryTimeline
            destination={selectedDestination}
            days={days}
            travelStyle={travelStyle}
            itinerary={itinerary}
            itineraryNotice={itineraryNotice}
            copyLabel={copyLabel}
            isPlanning={isPlanning}
            onCopyItinerary={() => void handleCopyItinerary()}
          />
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default App
