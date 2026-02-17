import { MapContainer, TileLayer, Marker, Polyline, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import { useEffect, useState } from 'react'

const PURDUE_CENTER = [40.4274, -86.9140]
const BOUNDS = [
  [40.4150, -86.9300],
  [40.4400, -86.9000],
]

function isWithinBounds(lat, lng) {
  return lat >= BOUNDS[0][0] && lat <= BOUNDS[1][0] && lng >= BOUNDS[0][1] && lng <= BOUNDS[1][1]
}

const goldIcon = L.divIcon({
  className: '',
  html: `<div style="
    width:24px;height:24px;background:#CFB991;border:3px solid #000;border-radius:50%;
    box-shadow:0 2px 6px rgba(0,0,0,0.4);
    animation: gold-pulse 1.5s ease-in-out infinite;
  "></div>
  <style>
    @keyframes gold-pulse {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(207,185,145,0.6); }
      50% { transform: scale(1.15); box-shadow: 0 0 12px 4px rgba(207,185,145,0.4); }
    }
  </style>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

const greenIcon = L.divIcon({
  className: '',
  html: `<div style="width:24px;height:24px;background:#22c55e;border:3px solid #000;border-radius:50%;box-shadow:0 2px 6px rgba(0,0,0,0.4);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
})

const blueUserIcon = L.divIcon({
  className: '',
  html: `<div style="position:relative;width:20px;height:20px;">
    <div style="
      position:absolute;inset:0;
      background:#3b82f6;border:2px solid #fff;border-radius:50%;
      box-shadow:0 0 6px rgba(59,130,246,0.6);
      z-index:2;
    "></div>
    <div style="
      position:absolute;inset:-6px;
      border-radius:50%;
      background:rgba(59,130,246,0.25);
      animation: blue-ring-pulse 2s ease-in-out infinite;
      z-index:1;
    "></div>
  </div>
  <div style="
    position:absolute;top:24px;left:50%;transform:translateX(-50%);
    white-space:nowrap;font-size:11px;font-weight:700;
    color:#3b82f6;text-shadow:0 0 3px #fff, 0 0 3px #fff;
    pointer-events:none;
  ">You are here</div>
  <style>
    @keyframes blue-ring-pulse {
      0%, 100% { transform: scale(1); opacity: 0.7; }
      50% { transform: scale(1.6); opacity: 0; }
    }
  </style>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
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
  const [userLocation, setUserLocation] = useState(null)
  const [showHint, setShowHint] = useState(true)

  useEffect(() => {
    if (!navigator.geolocation) return
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        if (isWithinBounds(latitude, longitude)) {
          setUserLocation({ lat: latitude, lng: longitude })
        } else {
          setUserLocation(null)
        }
      },
      () => {},
      { enableHighAccuracy: true, maximumAge: 10000 }
    )
    return () => navigator.geolocation.clearWatch(watchId)
  }, [])

  function handleGuessPlace(latlng) {
    setShowHint(false)
    onGuessPlace(latlng)
  }

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
        <MapClickHandler onClick={handleGuessPlace} disabled={submitted} />
        <ResetView />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={blueUserIcon} interactive={false} />
        )}

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

      {!submitted && showHint && !guess && (
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none"
          style={{ animation: 'hint-fade 3s ease-in-out forwards' }}
        >
          <div className="bg-black/75 text-white text-lg font-display px-6 py-3 rounded-full shadow-lg backdrop-blur-sm">
            Click to place your guess!
          </div>
          <style>{`
            @keyframes hint-fade {
              0% { opacity: 0; transform: translateX(-50%) translateY(-8px); }
              15% { opacity: 1; transform: translateX(-50%) translateY(0); }
              80% { opacity: 1; }
              100% { opacity: 0; }
            }
          `}</style>
        </div>
      )}

      {!submitted && guess && (
        <button
          onClick={onSubmit}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] bg-gold hover:bg-gold-dark text-black font-display text-xl font-bold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
          style={{ animation: 'submit-glow 1.5s ease-in-out infinite' }}
        >
          SUBMIT GUESS
          <style>{`
            @keyframes submit-glow {
              0%, 100% { box-shadow: 0 0 8px rgba(207,185,145,0.4), 0 4px 12px rgba(0,0,0,0.2); }
              50% { box-shadow: 0 0 20px rgba(207,185,145,0.8), 0 0 40px rgba(207,185,145,0.3), 0 4px 12px rgba(0,0,0,0.2); }
            }
          `}</style>
        </button>
      )}
    </div>
  )
}
