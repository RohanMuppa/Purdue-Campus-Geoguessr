import { useState, useEffect, useRef, useCallback } from 'react'
import PhotoPanel from './PhotoPanel'
import MapPanel from './MapPanel'
import ResultOverlay from './ResultOverlay'
import { calculateDistance, calculateScore } from '../utils/scoring'

const TOTAL_ROUNDS = 5
const ROUND_TIME = 30

// Purdue campus bounds for random guess generation
const BOUNDS_MIN_LAT = 40.4150
const BOUNDS_MAX_LAT = 40.4400
const BOUNDS_MIN_LNG = -86.9300
const BOUNDS_MAX_LNG = -86.9000

function generateRandomGuess() {
  return {
    lat: BOUNDS_MIN_LAT + Math.random() * (BOUNDS_MAX_LAT - BOUNDS_MIN_LAT),
    lng: BOUNDS_MIN_LNG + Math.random() * (BOUNDS_MAX_LNG - BOUNDS_MIN_LNG),
  }
}

export default function GameScreen({ locations, onGameEnd }) {
  const [roundIndex, setRoundIndex] = useState(0)
  const [guess, setGuess] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [results, setResults] = useState([])
  const [roundResult, setRoundResult] = useState(null)
  const [timeLeft, setTimeLeft] = useState(ROUND_TIME)

  const intervalRef = useRef(null)
  const guessRef = useRef(null)
  const submittedRef = useRef(false)
  const roundIndexRef = useRef(0)

  const currentLocation = locations[roundIndex]
  const totalScore = results.reduce((sum, r) => sum + r.points, 0)

  // Keep refs in sync with state via effects
  useEffect(() => { guessRef.current = guess }, [guess])
  useEffect(() => { submittedRef.current = submitted }, [submitted])
  useEffect(() => { roundIndexRef.current = roundIndex }, [roundIndex])

  const doAutoSubmit = useCallback(() => {
    if (submittedRef.current) return

    let finalGuess = guessRef.current
    if (!finalGuess) {
      finalGuess = generateRandomGuess()
    }

    const loc = locations[roundIndexRef.current]
    const distance = calculateDistance(finalGuess.lat, finalGuess.lng, loc.lat, loc.lng)
    const points = calculateScore(distance)
    const result = { location: loc, distance, points, guess: finalGuess }
    setGuess(finalGuess)
    setRoundResult(result)
    setSubmitted(true)
  }, [locations])

  // Timer: start interval on mount, restart when roundIndex changes
  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    intervalRef.current = setInterval(() => {
      if (submittedRef.current) return
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          // Auto-submit when time runs out
          setTimeout(doAutoSubmit, 0)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [roundIndex, doAutoSubmit])

  // Pause timer when submitted
  useEffect(() => {
    if (submitted && intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [submitted])

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
    setTimeLeft(ROUND_TIME)
  }

  const progress = timeLeft / ROUND_TIME
  const isWarning = timeLeft < 10
  const isCritical = timeLeft < 5

  return (
    <div className="h-full w-full flex flex-col md:flex-row relative">
      {/* Progress bar at the very top */}
      <div className="absolute top-0 left-0 right-0 h-1.5 z-[999] bg-black/20">
        <div
          className="h-full transition-all duration-1000 linear"
          style={{
            width: `${progress * 100}%`,
            background: isWarning
              ? `linear-gradient(90deg, #ef4444, #dc2626)`
              : `linear-gradient(90deg, #CFB991, #b8a274)`,
          }}
        />
      </div>

      {/* Floating timer overlay */}
      {!submitted && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[999] flex flex-col items-center">
          <div
            className={`
              font-display text-5xl font-bold px-6 py-2 rounded-xl shadow-2xl
              border-2 backdrop-blur-sm
              transition-colors duration-300
              ${isCritical
                ? 'bg-red-600/90 text-white border-red-400 animate-pulse'
                : isWarning
                  ? 'bg-red-600/90 text-white border-red-400'
                  : 'bg-black/80 text-gold border-gold/50'
              }
            `}
            style={{
              textShadow: isWarning ? '0 0 20px rgba(255,0,0,0.6)' : '0 0 20px rgba(207,185,145,0.4)',
              minWidth: '100px',
              textAlign: 'center',
            }}
          >
            {timeLeft}
          </div>
        </div>
      )}

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
