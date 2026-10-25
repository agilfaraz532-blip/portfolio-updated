import React from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

// Section header with a large faded index number behind the title
export const SectionHeader = ({ index, label, title, description, align = 'left' }) => {
  const centered = align === 'center'

  return (
    <div className={`relative mb-16 ${centered ? 'text-center' : ''}`}>
      <motion.span
        aria-hidden="true"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease }}
        className={`absolute -top-14 md:-top-20 ${centered ? 'left-1/2 -translate-x-1/2' : '-left-2'} font-heading font-extrabold text-[7rem] md:text-[10rem] leading-none text-transparent [-webkit-text-stroke:1px_rgba(96,165,250,0.18)] select-none pointer-events-none`}
      >
        {index}
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease }}
        className={`relative flex items-center gap-3 mb-4 font-mono text-[11px] tracking-[0.3em] uppercase text-accent ${centered ? 'justify-center' : ''}`}
      >
        <span className="w-6 h-px bg-accent" />
        {label}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
        className="relative text-3xl md:text-5xl font-bold tracking-tight text-textPrimary font-heading"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.2 }}
          className={`relative mt-4 text-textSecondary max-w-xl leading-relaxed ${centered ? 'mx-auto' : ''}`}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
export default SectionHeader
