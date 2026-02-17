export default function PhotoPanel({ location, roundIndex, totalRounds, score }) {
  return (
    <div className="h-full w-full flex flex-col bg-purdue-black">
      <div className="flex items-center justify-between px-4 py-3 bg-black/80 border-b border-gold/30">
        <span className="font-display text-gold text-lg font-bold">
          ROUND {roundIndex + 1} / {totalRounds}
        </span>
        <span className="font-display text-white text-lg">
          Score: <span className="text-gold font-bold">{score}</span>
        </span>
      </div>
      <div className="flex-1 relative overflow-hidden">
        <img
          src={location.image}
          alt="Where is this on campus?"
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white/80 text-sm font-display">WHERE IS THIS ON CAMPUS?</p>
        </div>
      </div>
    </div>
  )
}
