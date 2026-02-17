import { formatDistance } from '../utils/scoring'

export default function ResultOverlay({ location, distance, points, onNext, isLastRound }) {
  return (
    <div className="absolute inset-0 z-[1001] bg-black/70 flex items-center justify-center">
      <div className="bg-purdue-black border-2 border-gold rounded-xl p-8 text-center max-w-sm mx-4 animate-fade-in">
        <h3 className="font-display text-gold text-2xl font-bold mb-2">{location.name}</h3>
        <p className="text-gray-400 text-sm mb-4">You were {formatDistance(distance)} away</p>
        <div className="animate-score-pop">
          <span className="font-display text-5xl font-bold text-gold">+{points}</span>
          <p className="text-gray-500 text-xs mt-1">points</p>
        </div>
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
