import L from 'leaflet'

export function calculateDistance(guessLat, guessLng, actualLat, actualLng) {
  const guessPoint = L.latLng(guessLat, guessLng)
  const actualPoint = L.latLng(actualLat, actualLng)
  return guessPoint.distanceTo(actualPoint)
}

export function calculateScore(distanceMeters) {
  if (distanceMeters < 25) return 1000
  if (distanceMeters < 50) return 800
  if (distanceMeters < 100) return 600
  if (distanceMeters < 200) return 400
  if (distanceMeters < 400) return 200
  return 50
}

export function formatDistance(meters) {
  if (meters < 1000) return `${Math.round(meters)}m`
  return `${(meters / 1000).toFixed(1)}km`
}
