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

export function getScoreEmoji(points) {
  if (points >= 1000) return '🔥 PERFECT!'
  if (points >= 800) return '🎯 Amazing!'
  if (points >= 600) return '👏 Nice!'
  if (points >= 400) return '😊 Good try'
  if (points >= 200) return '🤔 Getting there'
  return '😬 Yikes!'
}

export function getDistanceMessage(distance) {
  if (distance < 25) return 'You practically live here!'
  if (distance < 50) return 'Can you see it from there?'
  if (distance < 100) return 'Close enough for government work!'
  if (distance < 200) return 'Were you even looking at the map?'
  if (distance < 400) return 'Wrong building, right campus'
  return 'Are you sure you go here? 😂'
}

export function getGameGrade(totalScore) {
  if (totalScore > 4000) return { emoji: '🏆', title: 'Purdue Expert', description: 'You know every corner of campus!' }
  if (totalScore > 3000) return { emoji: '🎓', title: 'Campus Pro', description: 'Impressive campus knowledge!' }
  if (totalScore > 2000) return { emoji: '🚂', title: 'Boilermaker', description: "You're getting there!" }
  if (totalScore > 1000) return { emoji: '🔰', title: 'Freshman', description: 'Still learning your way around' }
  return { emoji: '😅', title: 'Lost Tourist', description: 'Have you visited campus before?' }
}

export function getShareText(totalScore, maxScore) {
  return `I scored ${totalScore}/${maxScore} on Purdue Campus GeoGuessr! 🚂⚡ Can you beat me?`
}
