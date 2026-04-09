# map-app

A small React application for placing pins on an interactive map: click the map to add a location, drag markers to move them, and manage pins from a sidebar list. Addresses are resolved with OpenStreetMap’s Nominatim API, and pins are persisted in the browser with `localStorage`.

## Features

- **Map** — [Leaflet](https://leafletjs.com/) via [react-leaflet](https://react-leaflet.js.org/), OpenStreetMap raster tiles
- **Pins** — add on click, delete from the list, drag to reposition
- **Geocoding** — reverse geocode via [Nominatim](https://nominatim.org/) (display names for coordinates)
- **Persistence** — pins stored under the key `pindrop_pins` in `localStorage`
- **UI** — [Tailwind CSS](https://tailwindcss.com/) v4, [shadcn/ui](https://ui.shadcn.com/) (Nova / Radix), [Framer Motion](https://www.framer.com/motion/) where used

## Stack

| Layer | Technology |
| --- | --- |
| Runtime | React 19, TypeScript |
| Build | Vite 8 |
| Map | leaflet, react-leaflet |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite`), Geist (variable font) |

## Getting started

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Typecheck (`tsc -b`) and production build |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

## Map services

- **Tiles** — © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
- **Geocoding** — [Nominatim usage policy](https://operations.osmfoundation.org/policies/nominatim/) applies; the app sends a descriptive `User-Agent` header. For heavy or production use, host your own Nominatim instance or use a commercial geocoder.

## Project layout (high level)

- `src/App.tsx` — pin state, persistence, geocoding handlers
- `src/components/map/` — `MapView`, markers, click handler, pin list UI
- `src/lib/leaflet-icon-defaults.ts` — default marker assets for bundlers (Vite)
