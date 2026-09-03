import type { Destination, ItineraryDay } from '../types/travel'

export const moods = [
  'All',
  'Beach',
  'Culture',
  'Adventure',
  'Food',
  'Calm',
  'City',
  'Romantic',
  'Nature',
]

export const heroPoster =
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=82'

export const destinations: Destination[] = [
  {
    id: 'kyoto',
    name: 'Kyoto',
    country: 'Japan',
    region: 'Asia',
    mood: ['Culture', 'Calm', 'Food'],
    categories: ['Temples', 'Heritage', 'Slow travel'],
    summary:
      'Lantern-lit lanes, temple gardens, matcha houses, and a rhythm that rewards travelers who move slowly.',
    bestTime: 'March to May or October to November',
    budget: 'Balanced',
    days: '4-6 days',
    coordinates: { lat: 35.0116, lon: 135.7681 },
    heroQuery: 'Kyoto Japan temple garden travel',
    fallbackImage:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1600&q=82',
    accent: '#b85c38',
    places: [
      {
        name: 'Fushimi Inari Taisha',
        category: 'Shrine walk',
        description: 'A cinematic trail of vermilion gates climbing into forested hills above the city.',
        bestTime: 'Early morning',
        imageQuery: 'Fushimi Inari Taisha torii gates Kyoto',
        fallbackImage:
          'https://images.pexels.com/photos/20751494/pexels-photo-20751494.jpeg',
      },
      {
        name: 'Arashiyama Bamboo Grove',
        category: 'Nature',
        description: 'Tall bamboo corridors, riverside paths, and quiet temples made for unhurried wandering.',
        bestTime: 'Sunrise',
        imageQuery: 'Arashiyama Bamboo Grove Kyoto Japan',
        fallbackImage:
          'https://images.pexels.com/photos/18008216/pexels-photo-18008216.jpeg',
      },
      {
        name: 'Gion District',
        category: 'Historic quarter',
        description: 'Traditional tea houses, preserved streets, and evening lights that make Kyoto feel timeless.',
        bestTime: 'Golden hour',
        imageQuery: 'Gion Kyoto historic street lanterns',
        fallbackImage:
          'https://images.pexels.com/photos/25998459/pexels-photo-25998459.jpeg',
      },
    ],
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    region: 'Asia',
    mood: ['Beach', 'Wellness', 'Adventure'],
    categories: ['Islands', 'Surf', 'Nature'],
    summary: 'Volcanic ridges, rice terraces, surf beaches, and a warm island pace that makes planning feel easy.',
    bestTime: 'April to October',
    budget: 'Thoughtful',
    days: '5-8 days',
    coordinates: { lat: -8.3405, lon: 115.092 },
    heroQuery: 'Bali Indonesia tropical landscape travel',
    fallbackImage:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=82',
    accent: '#2f7d68',
    places: [
      {
        name: 'Tegallalang Rice Terraces',
        category: 'Landscape',
        description: 'Layered green terraces with morning mist, local cafes, and scenic walking paths.',
        bestTime: 'Morning',
        imageQuery: 'Tegallalang Rice Terraces Ubud Bali',
        fallbackImage:
          'https://images.pexels.com/photos/36856727/pexels-photo-36856727.jpeg',
      },
      {
        name: 'Uluwatu Temple',
        category: 'Cliff temple',
        description: 'A dramatic ocean-edge temple known for sunsets and traditional kecak performances.',
        bestTime: 'Sunset',
        imageQuery: 'Uluwatu Temple ocean cliff Bali',
        fallbackImage:
          'https://images.pexels.com/photos/36452343/pexels-photo-36452343.jpeg',
      },
      {
        name: 'Nusa Penida',
        category: 'Island escape',
        description: 'Sharp cliffs, turquoise water, and beaches that feel made for a postcard.',
        bestTime: 'Full day',
        imageQuery: 'Kelingking beach Nusa Penida Bali',
        fallbackImage:
          'https://images.pexels.com/photos/33630890/pexels-photo-33630890.jpeg',
      },
    ],
  },
  {
    id: 'iceland',
    name: 'Iceland',
    country: 'Iceland',
    region: 'Europe',
    mood: ['Adventure', 'Wild', 'Nature'],
    categories: ['Road trip', 'Glaciers', 'Northern lights'],
    summary: 'A land of black beaches, geothermal pools, waterfalls, and weather that turns every route into a story.',
    bestTime: 'June to September or February to March',
    budget: 'Luxury',
    days: '6-10 days',
    coordinates: { lat: 64.9631, lon: -19.0208 },
    heroQuery: 'Iceland landscape dramatic waterfall travel',
    fallbackImage:
      'https://images.unsplash.com/photo-1504829857797-ddff29c27927?auto=format&fit=crop&w=1600&q=82',
    accent: '#376d8a',
    places: [
      {
        name: 'Seljalandsfoss',
        category: 'Waterfall',
        description: 'A tall waterfall with a trail that lets you walk behind the falling water.',
        bestTime: 'Late afternoon',
        imageQuery: 'Seljalandsfoss waterfall Iceland',
        fallbackImage:
          'https://images.pexels.com/photos/30423523/pexels-photo-30423523.jpeg',
      },
      {
        name: 'Reynisfjara Beach',
        category: 'Black sand beach',
        description: 'Basalt columns, volcanic sand, and roaring Atlantic waves on the southern coast.',
        bestTime: 'Midday',
        imageQuery: 'Reynisfjara black sand beach basalt Iceland',
        fallbackImage:
          'https://images.pexels.com/photos/31851520/pexels-photo-31851520.jpeg',
      },
      {
        name: 'Blue Lagoon',
        category: 'Geothermal spa',
        description: 'Milky blue geothermal water set in a lava field, perfect after a long road day.',
        bestTime: 'Evening',
        imageQuery: 'Blue Lagoon geothermal spa Iceland',
        fallbackImage:
          'https://images.pexels.com/photos/38648760/pexels-photo-38648760.jpeg',
      },
    ],
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    region: 'Europe',
    mood: ['Romantic', 'Beach', 'Slow'],
    categories: ['Islands', 'Views', 'Food'],
    summary: 'Whitewashed villages, volcanic cliffs, blue domes, and Aegean evenings that do the heavy lifting.',
    bestTime: 'April to June or September to October',
    budget: 'Luxury',
    days: '3-5 days',
    coordinates: { lat: 36.3932, lon: 25.4615 },
    heroQuery: 'Santorini Greece Oia caldera travel',
    fallbackImage:
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=82',
    accent: '#d49b43',
    places: [
      {
        name: 'Oia',
        category: 'Village',
        description: 'Cliffside lanes, cave houses, blue domes, and the island most iconic sunsets.',
        bestTime: 'Morning or sunset',
        imageQuery: 'Oia Santorini Greece blue dome sunset',
        fallbackImage:
          'https://images.pexels.com/photos/38464216/pexels-photo-38464216.jpeg',
      },
      {
        name: 'Akrotiri',
        category: 'Archaeology',
        description: 'A preserved Bronze Age settlement that adds depth beyond the island views.',
        bestTime: 'Late morning',
        imageQuery: 'Akrotiri ancient archaeological site Greece',
        fallbackImage:
          'https://images.pexels.com/photos/35220738/pexels-photo-35220738.jpeg',
      },
      {
        name: 'Red Beach',
        category: 'Coastline',
        description: 'A striking volcanic beach backed by red cliffs and deep blue water.',
        bestTime: 'Afternoon',
        imageQuery: 'Red Beach Santorini volcanic cliffs',
        fallbackImage:
          'https://images.pexels.com/photos/3936144/pexels-photo-3936144.jpeg',
      },
    ],
  },
  {
    id: 'cape-town',
    name: 'Cape Town',
    country: 'South Africa',
    region: 'Africa',
    mood: ['Adventure', 'Food', 'City'],
    categories: ['Coast', 'Mountains', 'Culture'],
    summary:
      'A rare city where mountain trails, design-forward neighborhoods, vineyards, and beaches sit minutes apart.',
    bestTime: 'November to March',
    budget: 'Balanced',
    days: '5-7 days',
    coordinates: { lat: -33.9249, lon: 18.4241 },
    heroQuery: 'Cape Town South Africa Table Mountain travel',
    fallbackImage:
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1600&q=82',
    accent: '#647f3f',
    places: [
      {
        name: 'Table Mountain',
        category: 'Viewpoint',
        description: 'A flat-topped landmark with sweeping views over the city, coast, and mountains.',
        bestTime: 'Clear morning',
        imageQuery: 'Table Mountain Cape Town viewpoint',
        fallbackImage:
          'https://images.pexels.com/photos/2327285/pexels-photo-2327285.jpeg',
      },
      {
        name: 'Bo-Kaap',
        category: 'Neighborhood',
        description: 'Colorful streets, Cape Malay culture, and one of the city most photographed quarters.',
        bestTime: 'Morning',
        imageQuery: 'Bo-Kaap colorful houses Cape Town',
        fallbackImage:
          'https://images.pexels.com/photos/27438904/pexels-photo-27438904.jpeg',
      },
      {
        name: 'Cape Point',
        category: 'Coastal drive',
        description: 'A dramatic peninsula route with cliffs, beaches, and wildlife-rich landscapes.',
        bestTime: 'Full day',
        imageQuery: 'Cape Point Cape of Good Hope South Africa',
        fallbackImage:
          'https://images.pexels.com/photos/31508381/pexels-photo-31508381.jpeg',
      },
    ],
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'United States',
    region: 'North America',
    mood: ['City', 'Culture', 'Food'],
    categories: ['Museums', 'Nightlife', 'Architecture'],
    summary: 'Neighborhood energy, skyline drama, world-class museums, late dinners, and a different trip every block.',
    bestTime: 'April to June or September to November',
    budget: 'Luxury',
    days: '4-6 days',
    coordinates: { lat: 40.7128, lon: -74.006 },
    heroQuery: 'New York City Manhattan skyline travel',
    fallbackImage:
      'https://images.pexels.com/photos/27807670/pexels-photo-27807670.jpeg',
    accent: '#8c5a96',
    places: [
      {
        name: 'Central Park',
        category: 'Urban nature',
        description: 'A massive green pause inside the city with lakes, paths, lawns, and landmark views.',
        bestTime: 'Morning',
        imageQuery: 'Central Park Bow Bridge Manhattan New York',
        fallbackImage:
          'https://images.pexels.com/photos/28078747/pexels-photo-28078747.jpeg',
      },
      {
        name: 'The Met',
        category: 'Museum',
        description: 'One of the world great museums, spanning ancient artifacts to modern masters.',
        bestTime: 'Afternoon',
        imageQuery: 'The Metropolitan Museum of Art NYC facade',
        fallbackImage:
          'https://images.pexels.com/photos/31097109/pexels-photo-31097109.jpeg',
      },
      {
        name: 'DUMBO',
        category: 'Waterfront',
        description: 'Brooklyn streets, bridge views, cobblestones, and a perfect skyline walk.',
        bestTime: 'Golden hour',
        imageQuery: 'DUMBO Washington Street Manhattan Bridge Brooklyn',
        fallbackImage:
          'https://images.pexels.com/photos/11783525/pexels-photo-11783525.jpeg',
      },
    ],
  },
]

export function buildFallbackItinerary(destination: Destination, days: number, interests = ''): ItineraryDay[] {
  const safeDays = Math.min(10, Math.max(1, Math.round(days) || 1))
  const focus = interests.trim()
  const focusText = focus ? ` Prioritize ${focus} throughout the day.` : ''

  return Array.from({ length: safeDays }, (_, index) => {
    const place = destination.places[index % destination.places.length]
    const second = destination.places[(index + 1) % destination.places.length]

    return {
      day: index + 1,
      title: `${destination.name} ${index === 0 ? 'arrival rhythm' : 'deeper discovery'}`,
      morning: `Start with ${place.name}, timed for ${place.bestTime.toLowerCase()} light and lighter crowds.${focusText}`,
      afternoon: `Move toward ${second.name} and make time for ${focus || 'local highlights'}, cafes, markets, and slow detours.`,
      evening: focus
        ? `End with a ${focus}-focused experience, then choose a neighborhood dinner and a gentle walk.`
        : 'Choose a neighborhood dinner and a gentle walk instead of packing the night too tightly.',
      tip: `${focus ? `Your focus is ${focus}. ` : ''}Keep this day ${index % 2 === 0 ? 'balanced' : 'flexible'}; ${destination.name} rewards room between plans.`,
    }
  })
}
