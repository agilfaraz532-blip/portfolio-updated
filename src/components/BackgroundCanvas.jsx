import React, { useRef, useEffect } from 'react'

// 2D-canvas ember field. At rest the sparks drift upward and flicker; while the page
// scrolls they rush outward from the centre as streaks, like flying through them.
// Ember count scales with screen area, and animation pauses when the tab is hidden.
const BG = '#0A0A0C'

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
    let embers = []
    let sprite = null
    let lastScroll = window.scrollY
    let lastTime = 0
    let velocity = 0 // smoothed scroll speed in px per frame; positive = scrolling down
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 }

    // Pre-rendered soft glow, stamped per ember (far cheaper than shadowBlur)
    const makeSprite = () => {
      const size = 64
      const c = document.createElement('canvas')
      c.width = c.height = size
      const g = c.getContext('2d')
      const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
      grad.addColorStop(0, 'rgba(255, 214, 190, 1)')
      grad.addColorStop(0.18, 'rgba(255, 90, 60, 0.9)')
      grad.addColorStop(0.5, 'rgba(229, 25, 36, 0.28)')
      grad.addColorStop(1, 'rgba(229, 25, 36, 0)')
      g.fillStyle = grad
      g.fillRect(0, 0, size, size)
      return c
    }

    const makeEmber = () => {
      const depth = Math.random()
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        // a few big, bright orbs; mostly small dust
        size: Math.random() < 0.07 ? 18 + Math.random() * 22 : 3 + depth * 9,
        depth,
        rise: 0.1 + depth * 0.35,
        sway: 0.15 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.3,
      }
    }

    const setup = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (!sprite) sprite = makeSprite()

      // ~1 ember per 10000px², capped so phones and 4K screens both stay cheap
      const count = Math.min(170, Math.round((width * height) / 10000))
      embers = Array.from({ length: count }, makeEmber)
    }

    const glow = (cx, cy, r, alpha) => {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      grad.addColorStop(0, `rgba(229, 25, 36, ${alpha})`)
      grad.addColorStop(0.45, `rgba(170, 14, 24, ${alpha * 0.45})`)
      grad.addColorStop(1, 'rgba(170, 14, 24, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(cx - r, cy - r, r * 2, r * 2)
    }

    const draw = (t) => {
      const dt = Math.min(3, lastTime ? (t - lastTime) / 16.67 : 1)
      lastTime = t

      const scroll = window.scrollY
      velocity += ((scroll - lastScroll) / dt - velocity) * 0.18
      lastScroll = scroll
      if (Math.abs(velocity) < 0.05) velocity = 0
      const warp = Math.max(-90, Math.min(90, velocity))
      const rush = Math.min(1, Math.abs(warp) / 45)

      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
      ctx.fillStyle = BG
      ctx.fillRect(0, 0, width, height)

      mouse.x += (mouse.tx - mouse.x) * 0.05
      mouse.y += (mouse.ty - mouse.y) * 0.05

      // Big red glow that wanders with time and scroll, and flares while rushing
      const big = Math.max(width, height)
      const gx = width * (0.35 + 0.22 * Math.sin(t * 0.00011 + scroll * 0.0011)) + mouse.x * 30
      const gy = height * (0.5 + 0.16 * Math.cos(t * 0.00009 + scroll * 0.0008)) + mouse.y * 20
      glow(gx, gy, big * (0.62 + rush * 0.1), 0.42 + rush * 0.16)
      glow(width - gx * 0.6, height * 0.9 - gy * 0.3, big * 0.38, 0.16)

      const cx = width / 2
      const cy = height / 2
      const margin = 60

      ctx.globalCompositeOperation = 'lighter'
      ctx.lineCap = 'round'
      for (const e of embers) {
        // Idle drift
        e.x += Math.sin(e.phase + t * 0.0006 * e.speed) * e.sway * dt
        e.y -= e.rise * dt

        // Warp: push away from (or pull toward) the centre in proportion to scroll speed
        const dx = e.x - cx
        const dy = e.y - cy
        const f = warp * 0.0011 * (0.35 + e.depth) * dt
        const mx = dx * f
        const my = dy * f
        e.x += mx
        e.y += my

        // Recycle embers that leave the screen or collapse into the centre
        const off = e.x < -margin || e.x > width + margin || e.y < -margin || e.y > height + margin
        if (off) {
          if (warp > 2) {
            const a = Math.random() * Math.PI * 2
            const r = (0.03 + Math.random() * 0.22) * Math.min(width, height)
            e.x = cx + Math.cos(a) * r
            e.y = cy + Math.sin(a) * r
          } else if (warp < -2) {
            e.x = Math.random() * width
            e.y = Math.random() < 0.5 ? -20 : height + 20
          } else {
            e.x = Math.random() * width
            e.y = height + margin * 0.5
          }
          continue
        }
        if (warp < -2 && Math.abs(dx) < 24 && Math.abs(dy) < 24) {
          const a = Math.random() * Math.PI * 2
          e.x = cx + Math.cos(a) * big * 0.6
          e.y = cy + Math.sin(a) * big * 0.6
          continue
        }

        const x = e.x + mouse.x * 18 * e.depth
        const y = e.y + mouse.y * 12 * e.depth
        const flicker = 0.5 + 0.5 * Math.sin(e.phase * 3 + t * 0.002 * e.speed)
        const alpha = (0.25 + 0.6 * flicker) * (0.45 + 0.55 * e.depth)

        // Streak trailing behind the direction of travel
        const streak = Math.hypot(mx, my)
        if (streak > 0.6) {
          const k = Math.min(9, 3 + streak * 0.25)
          ctx.globalAlpha = Math.min(1, alpha + rush * 0.4)
          ctx.strokeStyle = '#FF5A3C'
          ctx.lineWidth = Math.max(1, Math.min(4, e.size * 0.16))
          ctx.beginPath()
          ctx.moveTo(x, y)
          ctx.lineTo(x - mx * k, y - my * k)
          ctx.stroke()
        }

        // Embers swell as they fly out toward the viewer
        const grow = 1 + rush * Math.min(1.6, Math.hypot(dx, dy) / (big * 0.4))
        const s = e.size * grow
        ctx.globalAlpha = alpha
        ctx.drawImage(sprite, x - s / 2, y - s / 2, s, s)
      }
      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
    }

    let frameId = null
    const loop = (t) => {
      draw(t)
      frameId = requestAnimationFrame(loop)
    }
    const start = () => {
      lastTime = 0
      lastScroll = window.scrollY
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
        if (reduceMotion) draw(performance.now())
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
