import React, { useMemo } from 'react'

export const GoldDust = ({ count = 28 }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        left: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 4,
        duration: 14 + Math.random() * 18,
        delay: -Math.random() * 30,
        drift: `${(Math.random() - 0.5) * 160}px`,
      })),
    [count]
  )

  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="gold-dust"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            '--dust-x': p.drift,
          }}
        />
      ))}
    </div>
  )
}
export default GoldDust
