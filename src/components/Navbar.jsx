import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'research', label: 'Journey' },
  { id: 'achievements', label: 'Leadership' },
  { id: 'contact', label: 'Contact' },
]

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    // Batch scroll work to at most once per frame
    let ticking = false
    const update = () => {
      ticking = false
      setScrolled(window.scrollY > 30)
      const scrollPos = window.scrollY + 200
      for (const link of navLinks) {
        const sec = document.getElementById(link.id)
        if (sec && scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
          setActiveSection(link.id)
          break
        }
      }
    }
    const handleScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 pt-4 md:pt-5 pointer-events-none">
      {/* Floating pill */}
      <div
        className={`pointer-events-auto max-w-5xl mx-auto flex justify-between items-center rounded-full border pl-6 pr-2.5 py-2 transition-all duration-500 ${
          scrolled || isOpen
            ? 'bg-[#120A0B]/90 lg:bg-[#120A0B]/70 lg:backdrop-blur-lg border-white/10 shadow-[0_10px_40px_-10px_rgba(229,25,36,0.45)]'
            : 'bg-white/[0.04] border-white/[0.08]'
        }`}
      >
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollToSection('home') }}
          className="font-heading text-sm font-extrabold uppercase tracking-[0.18em] text-textPrimary text-glow"
          aria-label="Agil Faraz home"
        >
          Agil<span className="text-primary">.</span>
        </a>

        <nav className="hidden lg:flex items-center">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.id) }}
              className={`relative px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                activeSection === link.id ? 'text-white' : 'text-textSecondary hover:text-white'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span
                  layoutId="navDot"
                  className="absolute left-3.5 right-3.5 bottom-0.5 h-[2px] rounded-full bg-primary shadow-[0_0_10px_2px_rgba(229,25,36,0.9)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}
          className="hidden lg:inline-flex btn-glow px-5 py-2 rounded-full bg-primary hover:bg-[#B3121C] text-[11px] font-bold uppercase tracking-[0.16em] text-white"
        >
          Let's Talk
        </a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-9 h-9 rounded-full border border-white/10 text-textPrimary flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto lg:hidden max-w-5xl mx-auto mt-2 rounded-3xl overflow-hidden bg-[#120A0B]/[0.97] border border-white/10"
          >
            <div className="px-6 py-4 flex flex-col">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.id) }}
                  className={`flex items-center justify-between py-3 border-b border-white/[0.05] last:border-0 font-heading text-base uppercase tracking-wider ${
                    activeSection === link.id ? 'text-accent' : 'text-textPrimary'
                  }`}
                >
                  {link.label}
                  <span className="font-mono text-[11px] text-textSecondary">0{i + 1}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
export default Navbar
