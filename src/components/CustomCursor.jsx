import React, { useEffect, useRef, useState } from 'react'

const INTERACTIVE = 'a, button, input, textarea, [role="button"]'

// Dot follows the pointer exactly; the ring trails behind and grows over interactive elements
export const CustomCursor = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Only on devices with a fine pointer (skip touch screens)
    if (!window.matchMedia('(pointer: fine)').matches) return
    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    const pos = { x: -100, y: -100 }
    const ring = { x: -100, y: -100 }
    let hovering = false
    let frameId = null

    const onMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
      hovering = !!e.target.closest?.(INTERACTIVE)
      if (frameId === null) frameId = requestAnimationFrame(loop)
    }

    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.18
      ring.y += (pos.y - ring.y) * 0.18
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        const scale = hovering ? 1.8 : 1
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`
        ringRef.current.style.backgroundColor = hovering ? 'rgba(59,130,246,0.12)' : 'transparent'
        ringRef.current.style.borderColor = hovering ? 'rgba(147,197,253,0.9)' : 'rgba(96,165,250,0.6)'
      }
      // Sleep once the ring has caught up; the next mousemove wakes it
      const settled = Math.abs(pos.x - ring.x) < 0.1 && Math.abs(pos.y - ring.y) < 0.1
      frameId = settled ? null : requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frameId)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-accent pointer-events-none z-[99999] shadow-[0_0_10px_2px_rgba(96,165,250,0.9)]"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[99998] transition-[background-color,border-color,scale] duration-300 shadow-[0_0_16px_-2px_rgba(59,130,246,0.6)]"
      />
    </>
  )
}
export default CustomCursor
