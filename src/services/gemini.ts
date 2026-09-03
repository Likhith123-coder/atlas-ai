import type { Destination, ItineraryDay, ItineraryRequest } from '../types/travel'
import { buildFallbackItinerary } from '../data/destinations'

function isItineraryDay(value: unknown): value is ItineraryDay {
  if (!value || typeof value !== 'object') return false
  const day = value as Record<string, unknown>
  return (
    typeof day.day === 'number' &&
    typeof day.title === 'string' &&
    typeof day.morning === 'string' &&
    typeof day.afternoon === 'string' &&
    typeof day.evening === 'string' &&
    typeof day.tip === 'string'
  )
}

async function callGemini(prompt: string): Promise<string> {
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })

  if (!response.ok) {
    throw new Error('Gemini request failed')
  }

  const data = (await response.json()) as { text?: string }
  return data.text || ''
}

function buildDemoAnswer(destination: Destination, question: string): string {
  const normalized = question.toLowerCase()
  const places = destination.places.map((place) => place.name).join(', ')

  if (normalized.includes('place') || normalized.includes('see') || normalized.includes('visit')) {
    return `Start with ${destination.places[0].name}, then make time for ${destination.places[1].name} and ${destination.places[2].name}. They give you a good mix of ${destination.places.map((place) => place.category.toLowerCase()).join(', ')}.`
  }

  if (normalized.includes('food') || normalized.includes('eat') || normalized.includes('restaurant')) {
    return `${destination.name} is best explored through its local neighborhoods and smaller places rather than one rushed restaurant list. Keep an evening free for a slow dinner, and ask locally for the day's specialty near ${destination.places[0].name}.`
  }

  if (normalized.includes('day') || normalized.includes('long') || normalized.includes('time')) {
    return `Plan ${destination.days.toLowerCase()} in ${destination.name}. That gives you time for ${places}, with enough space for weather changes and unplanned discoveries.`
  }

  if (normalized.includes('budget') || normalized.includes('cheap') || normalized.includes('cost')) {
    return `A ${destination.budget.toLowerCase()} approach suits ${destination.name}. Spend on the experiences that need reservations, then balance the trip with neighborhood walks, local cafes, and flexible afternoons. Verify current prices before booking.`
  }

  if (normalized.includes('when') || normalized.includes('best time') || normalized.includes('season')) {
    return `The best window for ${destination.name} is ${destination.bestTime}. Check the current forecast before locking outdoor-heavy days.`
  }

  return `For ${destination.name}, keep the plan centered on ${destination.places[0].name} and ${destination.places[1].name}, then leave one flexible block for local recommendations. Your question is worth checking against current local information before you travel.`
}

export async function askTravelAssistant(destination: Destination, question: string): Promise<string> {
  try {
    const answer = await callGemini(
      `You are a careful travel assistant for ${destination.name}, ${destination.country}. Answer the visitor's question clearly and concisely. You may answer broad travel questions, but do not invent current prices, opening hours, safety updates, weather, or transport details. Say when something should be verified. If the question is unrelated to travel, politely redirect it to planning this destination. Visitor question: ${question}`,
    )
    return answer || 'I could not complete that answer.'
  } catch {
    await new Promise((resolve) => setTimeout(resolve, 550))
    return `Demo travel guide: ${buildDemoAnswer(destination, question)}`
  }
}

export async function generateTripItinerary(
  destination: Destination,
  request: ItineraryRequest,
): Promise<{ days: ItineraryDay[]; usedFallback: boolean }> {
  try {
    const text = await callGemini(
      `Create a ${request.days}-day itinerary for ${destination.name}. Travel style: ${request.travelStyle}. Budget: ${request.budget}. Pace: ${request.pace}. Interests: ${request.interests || 'a balanced mix of local highlights and hidden gems'}. Return only JSON array. Each item must have day, title, morning, afternoon, evening, tip.`,
    )
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed: unknown = JSON.parse(clean)
    if (!Array.isArray(parsed) || parsed.length === 0 || !parsed.every(isItineraryDay)) {
      throw new Error('Gemini returned an invalid itinerary')
    }
    return { days: parsed, usedFallback: false }
  } catch {
   return { days: buildFallbackItinerary(destination, request.days, request.interests), usedFallback: true }
  }
}
