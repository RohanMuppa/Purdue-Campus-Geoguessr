# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server with HMR
npm run build    # Build static site to dist/
npm run lint     # ESLint (flat config, .js/.jsx files)
npm run preview  # Preview production build locally
```

## Architecture

Purdue Campus GeoGuessr — a client-side React 19 + Vite 7 game where players guess locations on Purdue's campus from photos. No backend; all data is hardcoded.

**Game flow:** StartScreen → GameScreen (5 rounds) → EndScreen

- `App.jsx` — Root component. Manages `gamePhase` ('start' | 'playing' | 'gameover') and passes round results between screens.
- `GameScreen.jsx` — Per-round orchestration. Tracks `roundIndex`, `guess`, `submitted`, and `roundResult` state. Renders PhotoPanel (60% width) + MapPanel (40% width) side by side.
- `MapPanel.jsx` — React Leaflet map bounded to Purdue campus. Uses `useMapEvents` hook for click capture. Gold `L.divIcon` marker for guess, green for actual location, dashed polyline connecting them after submission.
- `PhotoPanel.jsx` — Displays location image and round counter.
- `ResultOverlay.jsx` — Post-guess overlay showing distance and points.
- `EndScreen.jsx` — Final score with per-round breakdown.
- `data/locations.js` — 10 hardcoded Purdue landmarks with name, lat/lng, and Wikimedia Commons image URLs. `getRandomLocations(count)` shuffles and picks `count` for each game.
- `utils/scoring.js` — Uses Leaflet's Haversine `distanceTo()` for distance. Tiered scoring: <25m=1000pts, <50m=800, <100m=600, <200m=400, <400m=200, else=50. Max 5000 total.

## Tech Stack

- **React 19** + **Vite 7** + **Tailwind CSS 4** (via `@tailwindcss/vite` plugin)
- **Leaflet 1.9** + **react-leaflet 5** for interactive maps (react-leaflet v5 requires React 19)
- **ESLint 9** flat config format
- OpenStreetMap tiles (no API key needed)

## Styling

Purdue branding defined as Tailwind theme vars in `index.css`: `--color-gold` (#CFB991), `--color-purdue-black` (#000000). Display font is Oswald (loaded via Google Fonts in `index.html`). Custom `score-pop` and `fade-in` keyframe animations in `index.css`.

## Key Gotchas

- Leaflet CSS must be imported (`leaflet/dist/leaflet.css` in `index.css`) or markers won't render.
- Map is hard-bounded to Purdue campus via `maxBounds` + `maxBoundsViscosity=1.0` in MapPanel.
- All images are external Wikimedia Commons URLs — no local image assets.
