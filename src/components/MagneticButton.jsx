import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

// Anchor that drifts toward the cursor while hovered
export const MagneticButton = ({ children, className = '', strength = 0.35, ...props }) => {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 220, damping: 15, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 220, damping: 15, mass: 0.4 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...props}
    >
      {children}
    </motion.a>
  )
}
export default MagneticButton
