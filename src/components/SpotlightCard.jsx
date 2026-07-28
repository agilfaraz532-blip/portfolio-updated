import React, { useRef } from 'react'

export const SpotlightCard = ({ children, className = "" }) => {
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`spotlight-card glass-panel rounded-2xl p-6 ${className}`}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
export default SpotlightCard
