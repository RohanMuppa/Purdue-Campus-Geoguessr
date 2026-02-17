# Purdue Campus GeoGuesser

## What This Is

A GeoGuessr-style web game for Purdue University's campus. Players are shown a photo of a campus location and must guess where it is by clicking on an interactive Leaflet map. Scored by distance accuracy across 5 rounds. Built as a static single-page app for a 45-minute hackathon (Fun track).

## Core Value

The game loop must work: show a campus photo → player clicks map to guess → calculate distance → show score. Everything else is polish.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Game loop: photo display → map click → distance scoring → result reveal
- [ ] 10 Purdue campus locations with coordinates and swappable images
- [ ] Interactive Leaflet map bounded to Purdue campus
- [ ] Distance-based scoring system (1000 pts perfect → 50 pts pity)
- [ ] 5-round game structure with round counter and running score
- [ ] Start screen with Purdue branding and Play button
- [ ] End screen with total score, per-round breakdown, Play Again
- [ ] Result overlay: actual pin, guess pin, connecting line, distance, points
- [ ] Purdue-branded UI: Old Gold (#CFB991), Black (#000000), white accents
- [ ] Bold display typography (Oswald/Bebas Neue)
- [ ] Split-screen layout: photo (60%) + map (40%) on desktop
- [ ] Responsive stacked layout on mobile
- [ ] Smooth animations: line draw, score pop, round transitions
- [ ] Custom gold marker pins on map

### Out of Scope

- Backend / API / database — fully client-side static app
- User authentication — no login needed
- Multiplayer — single player only
- Leaderboard persistence — no storage
- Real-time photo fetching — images are hardcoded/local

## Context

- 45-minute hackathon, Fun track — polish matters for judges
- Vite + React scaffold already initialized
- Will use Leaflet.js + OpenStreetMap (free, no API key)
- Tailwind CSS for rapid styling
- Placeholder images initially, real photos swapped later
- 10 locations: Bell Tower, Engineering Fountain, Memorial Union, Armstrong Hall, Ross-Ade Stadium, Hovde Hall, Gateway Arch, WALC, Purdue Pete, Cary Quad

## Constraints

- **Timeline**: 45 minutes total build time — speed over perfection
- **Tech stack**: React (Vite) + Tailwind CSS + Leaflet.js, no backend
- **Deployment**: Must be a static site, deploy-ready
- **Images**: Placeholder cards initially, trivial to swap URLs in locations.js
- **APIs**: No external API keys — OpenStreetMap tiles only

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Leaflet + OSM over Google Maps | Free, no API key, fast setup | — Pending |
| Placeholder images | Real photos can be swapped later, unblocks development | — Pending |
| No backend | Hackathon constraint, everything client-side | — Pending |
| Tailwind CSS | Rapid styling, Purdue brand colors easy to configure | — Pending |

---
*Last updated: 2026-02-17 after initialization*
