import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    const duration = 1800 // 1.8 seconds loading time
    const interval = 20
    const step = 100 / (duration / interval)

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setShow(false)
            setTimeout(onComplete, 500) // Call completion after fade animation
          }, 400)
          return 100
        }
        return next
      })
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 w-full h-full bg-[#050816] z-[99999] flex flex-col items-center justify-center font-heading"
        >
          <div className="relative flex flex-col items-center max-w-sm w-full px-8">
            {/* Pulsing glow background blob */}
            <div className="absolute w-48 h-48 bg-primary rounded-full filter blur-[80px] opacity-25 -z-10" />

            {/* Logo Text Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold tracking-widest text-textPrimary flex items-center gap-1 mb-8"
            >
              FARAZ<span className="text-accent">.SEC</span>
            </motion.div>

            {/* Scanning details / Subtitles */}
            <div className="w-full text-center mb-2 font-sans text-xs uppercase tracking-[0.25em] text-textSecondary h-4">
              {progress < 30 && "Initializing Core..."}
              {progress >= 30 && progress < 60 && "Establishing Secure Synapses..."}
              {progress >= 60 && progress < 90 && "Scanning Ports & Vulnerabilities..."}
              {progress >= 90 && "Security Audit Complete."}
            </div>

            {/* Progress Percentage */}
            <div className="text-accent text-lg font-bold mb-4">
              {Math.floor(progress)}%
            </div>

            {/* Neon Progress Bar Container */}
            <div className="w-full h-[3px] bg-white/5 rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-secondaryAccent"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
export default LoadingScreen
