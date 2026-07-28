import React, { useEffect, useState } from 'react'

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setHidden(false)
    }

    const handleMouseLeave = () => {
      setHidden(true)
    }

    const handleMouseEnter = () => {
      setHidden(false)
    }

    // Bind event listeners for interactive element hovers
    const addHoverListeners = () => {
      const links = document.querySelectorAll('a, button, .clickable, input, textarea, [role="button"]')
      links.forEach((link) => {
        link.addEventListener('mouseenter', () => setHovered(true))
        link.addEventListener('mouseleave', () => setHovered(false))
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)
    
    // We run a timeout to attach to dynamically rendered links
    addHoverListeners()
    const timer = setTimeout(addHoverListeners, 1500)

    // Apply cursor-none class to body to hide the default browser cursor
    document.body.classList.add('custom-cursor-active')

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      clearTimeout(timer)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  if (hidden) return null

  return (
    <>
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      {/* Outer Ring */}
      <div
        className={`fixed top-0 left-0 border-2 border-primary rounded-full pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 transition-[width,height,background-color,border-color] duration-300 ease-out`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: hovered ? '56px' : '28px',
          height: hovered ? '56px' : '28px',
          backgroundColor: hovered ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
          borderColor: hovered ? '#06B6D4' : '#2563EB',
        }}
      />
    </>
  )
}
export default CustomCursor
