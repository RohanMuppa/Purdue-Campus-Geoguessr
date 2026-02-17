import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect } from 'react'

const PURDUE_CENTER = [40.4274, -86.9140]
const BOUNDS = [
  [40.4150, -86.9300],
  [40.4400, -86.9000],
]

const goldIcon = L.divIcon({
  className: '',
  html: `<div style="width:24px;height:24px;background:#CFB991;border:3px solid #000;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

const greenIcon = L.divIcon({
  className: '',
  html: `<div style="width:24px;height:24px;background:#22c55e;border:3px solid #000;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

function MapClickHandler({ onClick, disabled }) {
  useMapEvents({
    click(e) {
      if (!disabled) onClick(e.latlng)
    },
  })
  return null
}

function ResetView() {
  const map = useMap()
  useEffect(() => {
    map.setView(PURDUE_CENTER, 16)
  }, [map])
  return null
}

export default function MapPanel({ guess, actualLocation, submitted, onGuessPlace, onSubmit, resetKey }) {
  return (
    <div className="h-full w-full relative">
      <MapContainer
        key={resetKey}
        center={PURDUE_CENTER}
        zoom={16}
        maxBounds={BOUNDS}
        maxBoundsViscosity={1.0}
        minZoom={15}
        maxZoom={19}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onClick={onGuessPlace} disabled={submitted} />
        <ResetView />

        {guess && <Marker position={[guess.lat, guess.lng]} icon={goldIcon} />}

        {submitted && actualLocation && (
          <>
            <Marker position={[actualLocation.lat, actualLocation.lng]} icon={greenIcon} />
            <Polyline
              positions={[
                [guess.lat, guess.lng],
                [actualLocation.lat, actualLocation.lng],
              ]}
              color="#CFB991"
              weight={3}
              dashArray="8 8"
            />
          </>
        )}
      </MapContainer>

      {!submitted && guess && (
        <button
          onClick={onSubmit}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-gold hover:bg-gold-dark text-black font-display text-xl font-bold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
        >
          SUBMIT GUESS
        </button>
      )}
    </div>
  )
}
