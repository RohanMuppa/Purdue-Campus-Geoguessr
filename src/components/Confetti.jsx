import { useEffect, useState } from 'react'

function createPieces(count) {
  const colors = ['#CFB991', '#FFFFFF']
  const pieces = []
  for (let i = 0; i < count; i++) {
    pieces.push({
      id: i,
      left: Math.random() * 100,
      color: colors[i % 2],
      delay: Math.random() * 1.5,
      duration: 2 + Math.random() * 2,
      size: 6 + Math.random() * 6,
      drift: -30 + Math.random() * 60,
      rotation: Math.random() * 720 - 360,
    })
  }
  return pieces
}

export default function Confetti({ active }) {
  const [visible, setVisible] = useState(false)
  const [pieces] = useState(() => createPieces(50))

  useEffect(() => {
    if (active) {
      setVisible(true)
      const timer = setTimeout(() => setVisible(false), 4000)
      return () => clearTimeout(timer)
    }
  }, [active])

  if (!visible) return null

  const keyframes = `
    @keyframes confetti-fall {
      0% {
        transform: translateY(-10px) translateX(0px) rotate(0deg);
        opacity: 1;
      }
      25% {
        opacity: 1;
      }
      100% {
        transform: translateY(100vh) translateX(var(--drift)) rotate(var(--rotation));
        opacity: 0;
      }
    }
  `

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      <style>{keyframes}</style>
      {pieces.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            top: -20,
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.5,
            backgroundColor: p.color,
            borderRadius: 2,
            opacity: 0,
            '--drift': `${p.drift}px`,
            '--rotation': `${p.rotation}deg`,
            animation: `confetti-fall ${p.duration}s ease-in ${p.delay}s forwards`,
            boxShadow: p.color === '#CFB991'
              ? '0 0 4px rgba(207, 185, 145, 0.6)'
              : '0 0 4px rgba(255, 255, 255, 0.4)',
          }}
        />
      ))}
    </div>
  )
}
