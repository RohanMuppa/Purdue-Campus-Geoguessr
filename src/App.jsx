import { useState, useCallback } from 'react'
import StartScreen from './components/StartScreen'
import GameScreen from './components/GameScreen'
import EndScreen from './components/EndScreen'
import { getRandomLocations } from './data/locations'

export default function App() {
  const [phase, setPhase] = useState('start')
  const [locations, setLocations] = useState([])
  const [results, setResults] = useState([])

  const handleStart = useCallback(() => {
    setLocations(getRandomLocations(5))
    setResults([])
    setPhase('playing')
  }, [])

  const handleGameEnd = useCallback((gameResults) => {
    setResults(gameResults)
    setPhase('gameover')
  }, [])

  const totalScore = results.reduce((sum, r) => sum + r.points, 0)

  return (
    <div className="h-screen w-screen overflow-hidden bg-purdue-black">
      {phase === 'start' && <StartScreen onStart={handleStart} />}
      {phase === 'playing' && (
        <GameScreen locations={locations} onGameEnd={handleGameEnd} />
      )}
      {phase === 'gameover' && (
        <EndScreen results={results} totalScore={totalScore} onPlayAgain={handleStart} />
      )}
    </div>
  )
}
