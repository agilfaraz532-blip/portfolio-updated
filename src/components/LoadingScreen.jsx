import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Short brand intro that sits over the already-rendered page and fades away
export const LoadingScreen = ({ onComplete }) => {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 650)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 bg-bgDark z-[99999] flex flex-col items-center justify-center"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-6xl font-extrabold tracking-tight text-accent-gradient mb-8"
          >
            AF
          </motion.div>
          <div className="w-40 h-px bg-white/10 overflow-hidden">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className="h-full origin-left bg-gradient-to-r from-primary to-accent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default LoadingScreen
