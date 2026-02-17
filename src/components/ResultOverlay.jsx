import { formatDistance } from '../utils/scoring'
import Confetti from './Confetti'

function getReaction(points) {
  if (points >= 1000) return '🔥 PERFECT!'
  if (points >= 800) return '🎯 Amazing!'
  if (points >= 600) return '👏 Nice!'
  if (points >= 400) return '😊 Good try'
  if (points >= 200) return '🤔 Getting there'
  return '😬 Yikes!'
}

function getFunMessage(distance) {
  if (distance < 25) return 'You practically live here!'
  if (distance < 50) return 'Can you see it from there?'
  if (distance < 100) return 'Close enough for government work!'
  if (distance < 200) return 'Were you even looking at the map?'
  if (distance < 400) return 'Wrong building, right campus'
  return 'Are you sure you go here?'
}

const bounceKeyframes = `
@keyframes reactionBounce {
  0% { transform: scale(0) rotate(-10deg); opacity: 0; }
  50% { transform: scale(1.3) rotate(5deg); opacity: 1; }
  70% { transform: scale(0.9) rotate(-3deg); }
  100% { transform: scale(1) rotate(0deg); opacity: 1; }
}
@keyframes pulseGold {
  0%, 100% { border-color: #CFB991; box-shadow: 0 0 10px rgba(207, 185, 145, 0.3); }
  50% { border-color: #FFD54F; box-shadow: 0 0 25px rgba(207, 185, 145, 0.7), 0 0 50px rgba(207, 185, 145, 0.3); }
}
@keyframes funMessageSlide {
  0% { transform: translateY(10px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
`

export default function ResultOverlay({ location, distance, points, onNext, isLastRound }) {
  const reaction = getReaction(points)
  const funMessage = getFunMessage(distance)
  const showConfetti = points >= 800

  return (
    <div className="absolute inset-0 z-[1001] bg-black/70 flex items-center justify-center">
      <style>{bounceKeyframes}</style>
      {showConfetti && <Confetti />}
      <div
        className="bg-purdue-black border-2 border-gold rounded-xl p-8 text-center max-w-sm mx-4 animate-fade-in"
        style={{
          animation: 'fade-in 0.3s ease-out, pulseGold 2s ease-in-out infinite',
        }}
      >
        <div
          style={{
            animation: 'reactionBounce 0.6s ease-out forwards',
            fontSize: '2.5rem',
            marginBottom: '0.5rem',
          }}
        >
          {reaction}
        </div>
        <h3 className="font-display text-gold text-2xl font-bold mb-2">{location.name}</h3>
        <p className="text-gray-400 text-sm mb-1">You were {formatDistance(distance)} away</p>
        <p
          className="text-gold text-sm font-semibold mb-4"
          style={{
            animation: 'funMessageSlide 0.5s ease-out 0.3s both',
            fontStyle: 'italic',
          }}
        >
          {funMessage}
        </p>
        <div className="animate-score-pop">
          <span className="font-display text-5xl font-bold text-gold">+{points}</span>
          <p className="text-gray-500 text-xs mt-1">points</p>
        </div>
        {location.funFact && (
          <p
            className="text-gray-300 text-xs mt-4 px-2 leading-relaxed border-t border-gold/20 pt-3"
            style={{ animation: 'funMessageSlide 0.5s ease-out 0.5s both' }}
          >
            {location.funFact}
          </p>
        )}
        <button
          onClick={onNext}
          className="mt-6 bg-gold hover:bg-gold-dark text-black font-display text-lg font-bold px-8 py-3 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          {isLastRound ? 'SEE RESULTS' : 'NEXT ROUND'}
        </button>
      </div>
    </div>
  )
}
