import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, animate } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// Intro that sits over the already-rendered page: a 0–100 counter, then it lifts away
export const LoadingScreen = ({ onComplete }) => {
  const [show, setShow] = useState(true)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.3,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setShow(false),
    })
    return () => controls.stop()
  }, [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.08 }}
          transition={{ duration: 0.6, ease }}
          className="fixed inset-0 bg-bgDark z-[99999] flex items-center justify-center"
          aria-hidden="true"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="px-6 text-center font-heading font-bold uppercase tracking-[0.25em] text-[11px] sm:text-sm leading-relaxed text-textPrimary text-glow"
          >
            The developer and the cloud
            <br />
            engineer you need
          </motion.p>

          <div className="absolute left-6 bottom-6 sm:left-10 sm:bottom-8 font-heading font-extrabold text-6xl sm:text-8xl leading-none tabular-nums text-textPrimary text-glow">
            {count}
          </div>

          <div className="absolute bottom-0 inset-x-0 h-[3px] bg-white/5">
            <div
              className="h-full origin-left bg-gradient-to-r from-[#B3121C] via-primary to-accent shadow-[0_0_16px_2px_rgba(229,25,36,0.9)]"
              style={{ transform: `scaleX(${count / 100})` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default LoadingScreen
