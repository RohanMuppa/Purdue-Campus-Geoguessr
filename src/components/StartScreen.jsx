import { useState, useEffect } from 'react'

export default function StartScreen({ onStart }) {
  const [particles, setParticles] = useState([])
  const [trainPos, setTrainPos] = useState(-200)

  // Generate floating gold particles on mount
  useEffect(() => {
    const generated = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.4 + 0.1,
    }))
    setParticles(generated)
  }, [])

  // Animate the train sliding across
  useEffect(() => {
    let animFrame
    let start = null
    const duration = 8000 // 8 seconds per pass

    const animate = (timestamp) => {
      if (!start) start = timestamp
      const elapsed = (timestamp - start) % duration
      const progress = elapsed / duration
      // Move from -200px to window width + 200px
      const pos = -200 + progress * (window.innerWidth + 400)
      setTrainPos(pos)
      animFrame = requestAnimationFrame(animate)
    }

    animFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animFrame)
  }, [])

  const glowKeyframes = `
    @keyframes pulseGlow {
      0%, 100% { text-shadow: 0 0 20px rgba(207,185,145,0.6), 0 0 40px rgba(207,185,145,0.3), 0 0 80px rgba(207,185,145,0.15); }
      50% { text-shadow: 0 0 40px rgba(207,185,145,0.9), 0 0 80px rgba(207,185,145,0.5), 0 0 120px rgba(207,185,145,0.3); }
    }
    @keyframes floatUp {
      0% { transform: translateY(100vh) scale(0); opacity: 0; }
      10% { opacity: var(--particle-opacity); }
      90% { opacity: var(--particle-opacity); }
      100% { transform: translateY(-10vh) scale(1); opacity: 0; }
    }
    @keyframes trainBounce {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-4px); }
    }
    @keyframes badgePulse {
      0%, 100% { box-shadow: 0 0 10px rgba(207,185,145,0.4); }
      50% { box-shadow: 0 0 25px rgba(207,185,145,0.8), 0 0 50px rgba(207,185,145,0.3); }
    }
    @keyframes buttonGlow {
      0%, 100% { box-shadow: 0 0 15px rgba(207,185,145,0.4); }
      50% { box-shadow: 0 0 30px rgba(207,185,145,0.8), 0 0 60px rgba(207,185,145,0.4); }
    }
    @keyframes smokeTrail {
      0% { opacity: 0.6; transform: scale(1) translateX(0); }
      100% { opacity: 0; transform: scale(2) translateX(-30px); }
    }
  `

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-purdue-black text-white"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <style>{glowKeyframes}</style>

      {/* Floating gold particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #CFB991, #a8944f)',
            '--particle-opacity': p.opacity,
            animation: `floatUp ${p.duration}s ${p.delay}s infinite ease-in-out`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      ))}

      {/* Sliding Boilermaker Special train */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          left: `${trainPos}px`,
          fontSize: '48px',
          animation: 'trainBounce 0.4s infinite ease-in-out',
          zIndex: 1,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 0 10px rgba(207,185,145,0.6))',
          lineHeight: 1,
        }}
      >
        <span role="img" aria-label="Boilermaker Special">🚂</span>
        <span style={{ fontSize: '14px', display: 'block', textAlign: 'center', color: '#CFB991', fontWeight: 'bold', marginTop: '-4px' }}>
          BOILERMAKER
        </span>
      </div>

      {/* Smoke trail behind train */}
      {[0, 1, 2].map((i) => (
        <div
          key={`smoke-${i}`}
          style={{
            position: 'absolute',
            top: `calc(15% + ${5 + i * 8}px)`,
            left: `${trainPos - 40 - i * 20}px`,
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: 'rgba(160,160,160,0.3)',
            animation: `smokeTrail ${0.6 + i * 0.2}s infinite ease-out`,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />
      ))}

      {/* Hackathon badge */}
      <div
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'linear-gradient(135deg, #CFB991, #a8944f)',
          color: '#000',
          padding: '8px 16px',
          borderRadius: '8px',
          fontWeight: 'bold',
          fontSize: '13px',
          fontFamily: 'Oswald, sans-serif',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          animation: 'badgePulse 2s infinite ease-in-out',
          zIndex: 10,
          border: '2px solid rgba(255,255,255,0.2)',
        }}
      >
        CLAUDE BUILDER CLUB
      </div>

      {/* Main content */}
      <div className="text-center animate-fade-in" style={{ position: 'relative', zIndex: 5 }}>
        <h1
          className="font-display text-6xl md:text-8xl font-bold text-gold mb-2 tracking-tight"
          style={{ animation: 'pulseGlow 3s infinite ease-in-out' }}
        >
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
          style={{ animation: 'buttonGlow 2s infinite ease-in-out' }}
        >
          BOILER UP!
        </button>
        <p className="text-gray-500 text-sm mt-6">5 rounds &middot; Score by accuracy</p>
      </div>
    </div>
  )
}
