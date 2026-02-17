import { formatDistance } from '../utils/scoring'

export default function EndScreen({ results, totalScore, onPlayAgain }) {
  const maxScore = results.length * 1000

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-purdue-black text-white overflow-y-auto py-8">
      <div className="text-center animate-fade-in max-w-lg mx-auto px-4">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-gold mb-2">GAME OVER</h1>
        <div className="animate-score-pop my-6">
          <span className="font-display text-6xl md:text-8xl font-bold text-gold">{totalScore}</span>
          <p className="text-gray-400 text-lg">out of {maxScore} points</p>
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

        <button
          onClick={onPlayAgain}
          className="bg-gold hover:bg-gold-dark text-black font-display text-2xl font-bold px-12 py-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  )
}
