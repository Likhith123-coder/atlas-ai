# Atlas AI — Editorial Travel Discovery & AI Planner

> *Travel planning that feels alive.*

Atlas AI is a cinematic travel discovery and itinerary curation web application built for the **Designesthetics** Front-End Developer Assessment. It combines rich editorial typography, ambient motion, real-time atmospheric intelligence, and generative AI planning to transform travel ideas into structured day-by-day journeys.

---

## Live Screenshots

### 1. Cinematic Hero & Exploration
![Atlas AI Hero Landing](docs/screenshots/hero.png)
*Looping travel landscape video, search bar with `/` keyboard shortcut, and ambient discovery cues.*

---

### 2. Destination Explorer & Mood Filters
![Destination Explorer](docs/screenshots/destination_explorer.png)
*Filter escapes by mood (`Beach`, `Culture`, `Adventure`, `Food`, `Calm`, `City`), sort by season/duration, and explore curated destination cards.*

---

### 3. Destination Guide & Live Weather Intelligence
![Destination Guide & Weather](docs/screenshots/destination_guide.png)
*In-depth travel guides featuring quick facts, seasonal insights, live weather conditions via OpenWeather, geolocation detection, and famous places.*

---

### 4. AI Travel Assistant & Day-by-Day Planner
![AI Assistant & Itinerary Planner](docs/screenshots/ai_planner.png)
*Conversational assistant powered by Google Gemini, configurable planner controls (pace, style, budget), structured daily timeline cards, and 1-click clipboard export.*

---

## Features You Built

### 1. Exploration & Editorial Interface
- **Cinematic Landing**: High-definition looping video background with graceful image fallbacks, fluid typography, and instant keyboard shortcut (`/` to focus destination search).
- **Mood-Driven Filtering**: Filter destinations seamlessly across moods (`All`, `Beach`, `Culture`, `Adventure`, `Food`, `Calm`, `City`).
- **Dynamic Sorting**: Re-order destinations by `Popularity`, `Warmest` (equatorial latitude proximity), or `Best for Weekend` trip length.
- **Instant Search**: Real-time keyword filtering across destination names, countries, regions, summaries, and categories with graceful empty states.

### 2. Atmospheric Live Weather Engine
- **Destination Forecasts**: Live temperature, weather condition, humidity, and wind metrics mapped to destination coordinates.
- **Device Geolocation**: 1-click "Use my location" using the HTML5 Geolocation API with robust permission handling and timeout fallbacks.
- **Manual City Search**: Instant weather lookup for any starting point city in the world.
- **Weather-Aware Tips**: Dynamic travel advice based on current atmospheric conditions (rain, sun, or fog).

### 3. Landmark & Spot Guides
- **Curated Spot Cards**: Handpicked famous places per destination with best-time recommendations, categories, and high-fidelity photography.
- **Planner Quick-Add**: "Add to itinerary idea" button on every spot card that smooth-scrolls to the AI assistant and prepopulates the itinerary prompt.

### 4. Conversational AI Assistant & Itinerary Generator
- **AI Travel Guide**: Powered by Google Gemini to answer questions on duration, hidden gems, and neighborhood food scenes with verified safety guardrails.
- **Suggested Prompt Chips**: 1-click prompt chips for quick travel inquiries (`Top hidden gems`, `Ideal duration`, `Food & cafe guide`).
- **Structured Multi-Day Generator**: Generates custom day-by-day schedules (Days 1–10) based on travel style, budget, pace, and specific interests.
- **Day Timeline Cards**: Organized morning, afternoon, and evening schedule blocks with local tips and a 1-click "Copy itinerary" clipboard feature.

### 5. Architectural Quality & Resilience
- **Modular Component Architecture**: 14 domain-driven components organized cleanly under `src/components/` (`layout/`, `hero/`, `explorer/`, `weather/`, `destination/`, `planner/`).
- **Custom React Hooks**: Encapsulated state and effects via `useWeather`, `useDestinationImages`, and `useScrollPosition`.
- **Zero Secrets in Version Control**: Strict `.gitignore` enforcement and serverless proxy patterns ensuring API keys are never exposed to the client.
- **Cross-Browser Favicon Suite**: Vector SVG favicon, multi-size `.ico`, and high-res `.png` icons with custom Atlas terracotta compass branding.

---

## APIs & Services Used

| Service | Endpoint | Purpose |
| :--- | :--- | :--- |
| **Google Gemini API** | `/api/gemini` | Generative AI assistant queries and structured JSON itinerary creation using `gemini-1.5-flash-latest`. |
| **OpenWeather API** | `/api/weather` | Real-time weather data (temperature, humidity, wind, conditions) by latitude/longitude or city query. |
| **Pexels Photography CDN** | Direct CDN / `/api/image` | High-resolution editorial photography for all destinations and famous landmarks. |
| **Vercel Serverless Functions** | Serverless Edge | Secure API middleware ensuring API keys stay strictly server-side away from client bundles. |

> **Note on Fallbacks**: The application includes thoughtful, built-in fallback data for all services. If API keys are not supplied during local review, all features (weather, itinerary planner, search, and photography) continue to function smoothly in demo mode.

---

## How to Run It Locally

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18.0 or higher recommended)
- `npm` (comes bundled with Node.js)

### 1. Clone the Repository
```bash
git clone https://github.com/Likhith123-coder/atlas-ai.git
cd atlas-ai
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables (Optional)
Create a `.env` file from `.env.example`:
```bash
cp .env.example .env
```
Add your API keys to `.env` (these are serverless variables, so do not add the `VITE_` prefix):
```env
OPENWEATHER_API_KEY=your_openweather_key_here
GEMINI_API_KEY=your_gemini_key_here
UNSPLASH_ACCESS_KEY=your_unsplash_key_here
```
*(If left blank, Atlas AI automatically uses its built-in demo fallbacks.)*

### 4. Start the Local Development Server
```bash
npm run dev
```
Open your browser and navigate to:
**[http://localhost:5173/](http://localhost:5173/)**

### 5. Local Testing of Serverless Functions (Optional)
To test the serverless API routes locally with live keys, use Vercel CLI:
```bash
npx vercel dev
```

---

## Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | Runs TypeScript type checking (`tsc -b`) and produces an optimized production bundle. |
| `npm run lint` | Runs `oxlint` for high-speed code quality and lint analysis. |
| `npm run preview` | Locally serves the production bundle for preview. |

---

## Design Principles

Crafted following the **Designesthetics** core principles:
- **Typography**: Editorial contrast combining *Cormorant Garamond* (serif display) with *Plus Jakarta Sans* (geometric sans).
- **Colour Palette**: Natural warm canvas (`#faf8f5`), rich charcoal ink (`#111816`), and warm terracotta accents (`#c45f38`).
- **Restrained Motion**: Spring transitions and staggered entrances using Framer Motion without visual fatigue.
- **Designed Failure States**: Polished loading skeletons, denied-location fallbacks, and offline-resilient itinerary generators.
