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
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-bgDark/90 lg:bg-bgDark/70 lg:backdrop-blur-lg border-b border-white/[0.06] py-3' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollToSection('home') }}
          className="font-heading text-2xl font-extrabold tracking-tight text-accent-gradient"
          aria-label="Agil Faraz home"
        >
          AF
        </a>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); scrollToSection(link.id) }}
              className={`relative px-4 py-2 text-[13px] font-medium transition-colors ${
                activeSection === link.id ? 'text-white' : 'text-textSecondary hover:text-white'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.span
                  layoutId="navDot"
                  className="absolute left-1/2 -translate-x-1/2 -bottom-0.5 w-1 h-1 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(96,165,250,0.9)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}
          className="hidden lg:inline-flex btn-outline-glow px-5 py-2 rounded-lg border-primary/60 text-sm font-semibold text-white"
        >
          Let's Talk
        </a>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden w-10 h-10 rounded-lg border border-white/10 text-textPrimary flex items-center justify-center"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden bg-bgDark/[0.97] border-b border-white/[0.06]"
          >
            <div className="px-6 py-6 flex flex-col">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  href={`#${link.id}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.id) }}
                  className={`flex items-center justify-between py-3 border-b border-white/[0.05] font-heading text-lg ${
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
