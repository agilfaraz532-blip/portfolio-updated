import React, { useRef, useEffect } from 'react'

// Lightweight 2D-canvas starfield: twinkle, slow drift, mouse and scroll parallax.
// Star count scales with screen area, and animation pauses when the tab is hidden.
export const BackgroundCanvas = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: false })
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(pointer: fine)').matches

    let width = 0
    let height = 0
    let stars = []
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // ~1 star per 5000px², capped so phones and 4K screens both stay cheap
      const count = Math.min(320, Math.round((width * height) / 5000))
      stars = Array.from({ length: count }, () => {
        const depth = Math.random()
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.3 + depth * 1.1,
          depth,
          phase: Math.random() * Math.PI * 2,
          speed: 0.6 + Math.random() * 1.4,
          blue: Math.random() < 0.35,
        }
      })
    }

    const draw = (t) => {
      ctx.fillStyle = '#05070D'
      ctx.fillRect(0, 0, width, height)

      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05
      const scroll = window.scrollY

      for (const s of stars) {
        // Parallax: nearer (bigger) stars move more
        const px = s.x + mouse.x * 12 * s.depth + t * 0.004 * s.depth
        const py = s.y - scroll * 0.03 * s.depth + mouse.y * 8 * s.depth
        const x = ((px % width) + width) % width
        const y = ((py % height) + height) % height
        const alpha = 0.35 + 0.45 * (0.5 + 0.5 * Math.sin(s.phase + t * 0.001 * s.speed))

        ctx.globalAlpha = alpha
        ctx.fillStyle = s.blue ? '#60A5FA' : '#DBEAFE'
        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }

    let frameId = null
    const loop = (t) => {
      draw(t)
      frameId = requestAnimationFrame(loop)
    }
    const start = () => {
      if (frameId === null && !reduceMotion) frameId = requestAnimationFrame(loop)
    }
    const stop = () => {
      if (frameId !== null) cancelAnimationFrame(frameId)
      frameId = null
    }

    const onMouseMove = (e) => {
      mouse.tx = (e.clientX / width - 0.5) * 2
      mouse.ty = (e.clientY / height - 0.5) * 2
    }
    let resizeTimer
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        setup()
        draw(performance.now())
      }, 150)
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    setup()
    draw(0)
    start()
    if (finePointer) window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      stop()
      clearTimeout(resizeTimer)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}
export default BackgroundCanvas
