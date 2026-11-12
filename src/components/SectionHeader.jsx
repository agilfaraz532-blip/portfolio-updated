import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// Section header: small red label, big glowing uppercase title that glitches in,
// ending in a red full stop
export const SectionHeader = ({ label, title, description, align = 'center' }) => {
  const centered = align === 'center'
  const titleRef = useRef(null)
  const inView = useInView(titleRef, { once: true, margin: '-12% 0px' })

  return (
    <div className={`relative mb-16 ${centered ? 'text-center' : ''}`}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className={`flex items-center gap-2 mb-3 font-mono text-[11px] tracking-[0.35em] uppercase text-accent ${centered ? 'justify-center' : ''}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(255,77,77,0.8)]" />
        {label}
      </motion.div>

      <h2
        ref={titleRef}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-textPrimary font-heading text-glow"
      >
        <span
          data-text={`${title}.`}
          className={`glitch ${inView ? 'glitch-run' : 'opacity-0'}`}
        >
          {title}
          <span className="text-primary">.</span>
        </span>
      </h2>

      <motion.span
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease, delay: 0.35 }}
        className={`block mt-5 h-[3px] w-16 rounded-full bg-primary shadow-[0_0_14px_2px_rgba(229,25,36,0.9)] ${centered ? 'mx-auto origin-center' : 'origin-left'}`}
      />

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.3 }}
          className={`mt-6 text-textSecondary max-w-xl leading-relaxed ${centered ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
export default SectionHeader
