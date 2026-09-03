# Atlas AI

> Travel planning that feels alive.

Atlas AI is a cinematic travel discovery app built for the Designesthetics front-end assessment. It helps visitors explore destinations, check weather, discover famous places, use location-aware search, chat with an AI travel assistant, and generate a readable day-by-day itinerary.

## Submission

- **Live URL:** Add the deployed Vercel URL here before submitting.
- **Repository:** This repository should be public for assessment review.
- **Primary experience:** An editorial travel journey with destination exploration, live context, and AI-assisted planning.

## Features

- Looping video landing experience with search and mood chips
- Destination explorer with search, filters, animated cards, and empty states
- Rich destination guide with quick facts, famous places, and responsive editorial layout
- Location awareness through browser geolocation and manual city weather search
- Real-time weather integration through OpenWeather when an API key is provided
- AI assistant and itinerary planning through Gemini when an API key is provided
- Structured itinerary renderer with day cards instead of raw chat text
- Designed loading, empty, denied-location, and failed-request states
- Responsive layout for phone, tablet, desktop, and large screens

## Tech Stack

- React
- TypeScript
- Vite
- Framer Motion
- Lucide React
- Vercel serverless functions

## Environment Variables

Create a `.env` file from `.env.example`. These are server-side variables used by the Vercel API routes, so they should not use the `VITE_` prefix.

```env
OPENWEATHER_API_KEY=
GEMINI_API_KEY=
UNSPLASH_ACCESS_KEY=
```

The app includes polished demo fallbacks when keys are missing or local Vite is running without Vercel functions, so the interface can be reviewed while APIs are being configured.

The API keys stay server-side: the browser calls `/api/weather`, `/api/image`, and `/api/gemini`; the Vercel functions call the upstream providers.

## Run Locally

```bash
npm install
npm run dev
```

For local testing of the serverless API routes, use Vercel's local runner:

```bash
npx vercel dev
```

## Build

```bash
npm run build
```

## Deploy to Vercel

1. Import the public repository into Vercel.
2. Keep the framework preset as **Vite** and use `npm run build`.
3. Add `OPENWEATHER_API_KEY`, `UNSPLASH_ACCESS_KEY`, and `GEMINI_API_KEY` in Vercel project settings.
4. Deploy and test the live URL in a private window.
5. Verify image requests, weather, location permission, and Gemini planner behavior.

Do not add API keys to the repository or use a `VITE_` prefix for these server-side variables.

## Review checklist

- Test at 360px, 768px, 1024px, 1440px, and 1920px.
- Confirm no horizontal overflow on mobile.
- Deny location permission and verify the manual city fallback.
- Search for an unknown destination and verify the designed empty state.
- Temporarily disable API keys and verify fallback states.
- Navigate with the keyboard and confirm visible focus states.

## Design Notes

The project prioritizes visual design, motion, responsiveness, accessibility, and designed failure states because those are called out directly in the assessment brief. The UI uses image-led destination cards, editorial typography, smooth interactions, and structured itinerary rendering to avoid feeling like a generic API demo.
