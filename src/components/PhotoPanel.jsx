import { useState } from 'react'

const shimmerKeyframes = `
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes bounce-banner {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}
@keyframes pulse-dot {
  0%, 100% { box-shadow: 0 0 0 0 rgba(207,185,145,0.7); }
  50% { box-shadow: 0 0 0 6px rgba(207,185,145,0); }
}
`

export default function PhotoPanel({ location, roundIndex, totalRounds, score }) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className="h-full w-full flex flex-col bg-purdue-black">
      <style>{shimmerKeyframes}</style>

      {/* Header with round info and progress dots */}
      <div className="flex items-center justify-between px-4 py-3 bg-black/80 border-b border-gold/30">
        <div className="flex flex-col gap-2">
          <span className="font-display text-gold text-lg font-bold">
            ROUND {roundIndex + 1} / {totalRounds}
          </span>
          {/* Progress dots */}
          <div className="flex gap-2">
            {Array.from({ length: totalRounds }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  border: '2px solid #CFB991',
                  backgroundColor: i < roundIndex ? '#CFB991' : 'transparent',
                  ...(i === roundIndex
                    ? {
                        backgroundColor: '#CFB991',
                        animation: 'pulse-dot 1.5s ease-in-out infinite',
                      }
                    : {}),
                }}
              />
            ))}
          </div>
        </div>
        <span className="font-display text-white text-lg">
          Score: <span className="text-gold font-bold">{score}</span>
        </span>
      </div>

      {/* Image area */}
      <div className="flex-1 relative overflow-hidden">
        {/* Shimmer placeholder */}
        {!loaded && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 10,
              background:
                'linear-gradient(90deg, #1a1a1a 25%, #CFB991 50%, #1a1a1a 75%)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 1.5s ease-in-out infinite',
            }}
          />
        )}

        <img
          src={location.image}
          alt="Where is this on campus?"
          className="w-full h-full object-cover"
          onLoad={() => setLoaded(true)}
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.5s ease-in' }}
        />

        {/* Gold vignette border overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            boxShadow: 'inset 0 0 60px rgba(207,185,145,0.3), inset 0 0 120px rgba(0,0,0,0.5)',
            zIndex: 5,
          }}
        />

        {/* Bouncing banner */}
        <div
          style={{
            position: 'absolute',
            top: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 20,
            animation: 'bounce-banner 1.2s ease-in-out infinite',
          }}
        >
          <div
            className="font-display"
            style={{
              background: 'linear-gradient(135deg, #CFB991, #e8d5a3)',
              color: '#000',
              padding: '8px 20px',
              borderRadius: 24,
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: 1,
              boxShadow: '0 4px 15px rgba(207,185,145,0.4)',
            }}
          >
            Guess the Location!
          </div>
        </div>

        {/* Bottom gradient with prompt */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4" style={{ zIndex: 6 }}>
          <p className="text-white/80 text-sm font-display">WHERE IS THIS ON CAMPUS?</p>
        </div>
      </div>
    </div>
  )
}
