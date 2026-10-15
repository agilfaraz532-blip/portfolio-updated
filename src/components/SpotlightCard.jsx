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

    // Subtle 3D tilt toward the cursor
    const rotateY = ((x / rect.width) - 0.5) * 10
    const rotateX = ((y / rect.height) - 0.5) * -10
    cardRef.current.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = ''
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group spotlight-card glass-panel rounded-2xl p-6 ${className}`}
    >
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
export default SpotlightCard
