export default function StartScreen({ onStart }) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-purdue-black text-white">
      <div className="text-center animate-fade-in">
        <h1 className="font-display text-6xl md:text-8xl font-bold text-gold mb-2 tracking-tight">
          PURDUE
        </h1>
        <h2 className="font-display text-3xl md:text-5xl font-semibold text-white mb-8 tracking-wide">
          CAMPUS GEOGUESSR
        </h2>
        <p className="text-gray-400 text-lg mb-12 max-w-md mx-auto px-4">
          Can you identify locations on Purdue's campus? Click the map to guess where each photo was taken.
        </p>
        <button
          onClick={onStart}
          className="bg-gold hover:bg-gold-dark text-black font-display text-2xl font-bold px-12 py-4 rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
        >
          BOILER UP!
        </button>
        <p className="text-gray-500 text-sm mt-6">5 rounds &middot; Score by accuracy</p>
      </div>
    </div>
  )
}
