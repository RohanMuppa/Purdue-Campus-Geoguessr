import { useState } from 'react'
import PhotoPanel from './PhotoPanel'
import MapPanel from './MapPanel'
import ResultOverlay from './ResultOverlay'
import { calculateDistance, calculateScore } from '../utils/scoring'

const TOTAL_ROUNDS = 5

export default function GameScreen({ locations, onGameEnd }) {
  const [roundIndex, setRoundIndex] = useState(0)
  const [guess, setGuess] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState([])
  const [roundResult, setRoundResult] = useState(null)

  const currentLocation = locations[roundIndex]
  const totalScore = results.reduce((sum, r) => sum + r.points, 0)

  function handleGuessPlace(latlng) {
    setGuess(latlng)
  }

  function handleSubmit() {
    if (!guess) return
    const distance = calculateDistance(guess.lat, guess.lng, currentLocation.lat, currentLocation.lng)
    const points = calculateScore(distance)
    const result = { location: currentLocation, distance, points, guess }
    setRoundResult(result)
    setSubmitted(true)
  }

  function handleNext() {
    const newResults = [...results, roundResult]
    setResults(newResults)

    if (roundIndex + 1 >= TOTAL_ROUNDS) {
      onGameEnd(newResults)
      return
    }

    setRoundIndex(roundIndex + 1)
    setGuess(null)
    setSubmitted(false)
    setRoundResult(null)
  }

  return (
    <div className="h-full w-full flex flex-col md:flex-row relative">
      <div className="h-[45%] md:h-full md:w-[60%]">
        <PhotoPanel
          location={currentLocation}
          roundIndex={roundIndex}
          totalRounds={TOTAL_ROUNDS}
          score={totalScore}
        />
      </div>
      <div className="h-[55%] md:h-full md:w-[40%]">
        <MapPanel
          guess={guess}
          actualLocation={submitted ? currentLocation : null}
          submitted={submitted}
          onGuessPlace={handleGuessPlace}
          onSubmit={handleSubmit}
          resetKey={roundIndex}
        />
      </div>
      {submitted && roundResult && (
        <ResultOverlay
          location={currentLocation}
          distance={roundResult.distance}
          points={roundResult.points}
          onNext={handleNext}
          isLastRound={roundIndex + 1 >= TOTAL_ROUNDS}
        />
      )}
    </div>
  )
}
