import React, { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion'

// Where the card starts, relative to its own slot: [x, rotateY, rotateZ]
const ORIGINS = {
  left: ['55%', 62, -7],
  right: ['-55%', -62, 7],
  center: ['0%', 0, 0],
}

// Scroll-driven entrance: the card starts tiny and far away, rushes toward the
// viewer slightly past full size, then settles into its slot.
export const FlyIn = ({ children, from = 'left', className = '', outerClassName = '' }) => {
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()
  const [startX, startRotY, startRotZ] = ORIGINS[from] || ORIGINS.left

  // Progress is measured on the untransformed wrapper so the animation can't feed back into it
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 108%', 'start 42%'] })
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 20, mass: 0.5 })

  const scale = useTransform(p, [0, 0.72, 1], [0.1, 1.09, 1])
  const x = useTransform(p, [0, 0.72, 1], [startX, '0%', '0%'])
  const y = useTransform(p, [0, 0.72, 1], ['-22%', '3%', '0%'])
  const rotateY = useTransform(p, [0, 0.72, 1], [startRotY, startRotY * -0.18, 0])
  const rotateZ = useTransform(p, [0, 0.72, 1], [startRotZ, startRotZ * -0.2, 0])
  const rotateX = useTransform(p, [0, 0.72, 1], [from === 'center' ? 55 : 18, -4, 0])
  const opacity = useTransform(p, [0, 0.22], [0, 1])

  if (reduceMotion) {
    return (
      <div className={outerClassName}>
        <div className={className}>{children}</div>
      </div>
    )
  }

  return (
    <div ref={ref} className={`h-full [perspective:1400px] ${outerClassName}`}>
      <motion.div
        style={{ scale, x, y, rotateX, rotateY, rotateZ, opacity }}
        className={`will-change-transform ${className}`}
      >
        {children}
      </motion.div>
    </div>
  )
}
export default FlyIn
