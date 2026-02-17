import { useState } from 'react'
import { formatDistance } from '../utils/scoring'
import Confetti from './Confetti'

function getGrade(score) {
  if (score > 4000) return { emoji: '\u{1F3C6}', label: 'Purdue Expert' }
  if (score > 3000) return { emoji: '\u{1F393}', label: 'Campus Pro' }
  if (score > 2000) return { emoji: '\u{1F682}', label: 'Boilermaker' }
  if (score > 1000) return { emoji: '\u{1F530}', label: 'Freshman' }
  return { emoji: '\u{1F605}', label: 'Lost Tourist' }
}

export default function EndScreen({ results, totalScore, onPlayAgain }) {
  const maxScore = results.length * 1000
  const grade = getGrade(totalScore)
  const percentage = Math.round((totalScore / maxScore) * 100)
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const text = `I scored ${totalScore}/5000 on Purdue Campus GeoGuessr! \u{1F682}\u26A1`
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-purdue-black text-white overflow-y-auto py-8">
      <Confetti active={true} />
      <div className="text-center animate-fade-in max-w-lg mx-auto px-4">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-gold mb-2">GAME OVER</h1>

        <div className="my-4">
          <span className="text-5xl md:text-7xl">{grade.emoji}</span>
          <p className="font-display text-2xl md:text-4xl font-bold text-gold mt-2">{grade.label}</p>
        </div>

        <div className="animate-score-pop my-6">
          <span className="font-display text-6xl md:text-8xl font-bold text-gold">{totalScore}</span>
          <p className="text-gray-400 text-lg">out of {maxScore} points</p>
        </div>

        <div className="w-full mb-6 px-2">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Score</span>
            <span>{percentage}%</span>
          </div>
          <div className="w-full h-4 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gold rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="w-full space-y-2 mb-8">
          {results.map((r, i) => (
            <div key={i} className="flex items-center justify-between bg-white/5 rounded-lg px-4 py-3">
              <div className="text-left">
                <span className="text-gold font-display font-bold text-sm">R{i + 1}</span>
                <span className="text-white ml-3 text-sm">{r.location.name}</span>
              </div>
              <div className="text-right">
                <span className="text-gray-400 text-xs mr-3">{formatDistance(r.distance)}</span>
                <span className="text-gold font-display font-bold">+{r.points}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onPlayAgain}
            className="bg-gold hover:bg-gold-dark text-black font-display text-2xl font-bold px-12 py-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            PLAY AGAIN
          </button>
          <button
            onClick={handleShare}
            className="bg-white/10 hover:bg-white/20 text-gold font-display text-xl font-bold px-8 py-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer border border-gold/30"
          >
            {copied ? 'COPIED!' : 'SHARE SCORE'}
          </button>
        </div>
      </div>
    </div>
  )
}
