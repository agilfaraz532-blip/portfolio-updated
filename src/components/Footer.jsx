import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, MapPin, MessageSquare, ArrowRight, ArrowUp } from 'lucide-react'
import MagneticButton from './MagneticButton'

const contacts = [
  { icon: Mail, label: 'agilfaraz532@gmail.com', href: 'mailto:agilfaraz532@gmail.com' },
  { icon: Phone, label: '+91 75580 43694', href: 'tel:+917558043694' },
  { icon: MapPin, label: 'Panamaram, Wayanad, Kerala' },
  { icon: Linkedin, label: 'linkedin.com/in/agilfaraz', href: 'https://linkedin.com/in/agilfaraz', external: true },
  { icon: Github, label: 'github.com/agilfaraz532-blip', href: 'https://github.com/agilfaraz532-blip', external: true },
]

const ease = [0.22, 1, 0.36, 1]

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer id="contact" className="relative pt-32 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease }}
          className="relative rounded-3xl border border-white/[0.08] bg-gradient-to-br from-surface via-bgDark to-bgDark overflow-hidden"
        >
          {/* Planet in the corner */}
          <div className="absolute -right-56 -bottom-72 md:-right-80 md:-bottom-80 w-[460px] md:w-[620px] aspect-square pointer-events-none opacity-70 md:opacity-100">
            <div className="planet inset-0 rotate-[-35deg]" />
          </div>
          <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_top_left,black_20%,transparent_70%)] pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-14">
            <div>
              <div className="flex items-center gap-3 mb-5 font-mono text-[11px] tracking-[0.3em] uppercase text-accent">
                <span className="w-6 h-px bg-accent" /> Contact
              </div>
              <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-tight text-textPrimary leading-[1.05] mb-6">
                Let's Build <br />
                <span className="text-accent-gradient">Something Great</span>
              </h2>
              <p className="text-textSecondary leading-relaxed max-w-md mb-10">
                I'm always open to discussing new projects, internships, full-time roles or just a good tech conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <MagneticButton
                  href="mailto:agilfaraz532@gmail.com"
                  className="group btn-glow px-7 py-3.5 rounded-lg bg-primary hover:bg-[#2563EB] text-white font-semibold text-sm inline-flex items-center justify-center gap-2"
                >
                  Send a Message
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </MagneticButton>
                <MagneticButton
                  href="https://wa.me/917558043694"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-glow px-7 py-3.5 rounded-lg bg-white/[0.03] text-textPrimary font-semibold text-sm inline-flex items-center justify-center gap-2"
                >
                  <MessageSquare size={16} /> WhatsApp
                </MagneticButton>
              </div>
            </div>

            <motion.ul
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
              className="flex flex-col gap-3 lg:pt-16"
            >
              {contacts.map(({ icon: Icon, label, href, external }) => {
                const inner = (
                  <>
                    <span className="w-10 h-10 rounded-lg border border-white/10 bg-bgDark/60 flex items-center justify-center text-accent shrink-0 transition-shadow group-hover:shadow-[0_0_18px_-2px_rgba(59,130,246,0.8)]">
                      <Icon size={17} />
                    </span>
                    <span className="text-sm text-textPrimary/90 group-hover:text-white transition-colors break-all">{label}</span>
                  </>
                )
                return (
                  <motion.li key={label} variants={{ hidden: { opacity: 0, x: 20 }, show: { opacity: 1, x: 0 } }}>
                    {href ? (
                      <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex items-center gap-4">
                        {inner}
                      </a>
                    ) : (
                      <div className="group flex items-center gap-4">{inner}</div>
                    )}
                  </motion.li>
                )
              })}
            </motion.ul>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-textSecondary/60">
          <span className="font-heading font-extrabold text-base text-accent-gradient">AF</span>
          <span>&copy; 2026 Agil Faraz. All rights reserved.</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 hover:text-accent transition-colors"
            aria-label="Back to top"
          >
            Back to top <ArrowUp size={14} />
          </button>
        </div>
      </div>
    </footer>
  )
}
export default Footer
