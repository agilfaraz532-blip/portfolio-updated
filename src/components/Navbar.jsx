import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin, MessageSquare } from 'lucide-react'

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'research', label: 'Research' },
    { id: 'education', label: 'Education' },
    { id: 'achievements', label: 'Achievements' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)

      const sections = navLinks.map(link => document.getElementById(link.id))
      const scrollPos = window.scrollY + 200

      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i]
        if (sec) {
          const top = sec.offsetTop
          const height = sec.offsetHeight
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(navLinks[i].id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    setIsOpen(false)
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setActiveSection(id)
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050816]/75 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}
          className="font-heading text-xl font-bold tracking-wider text-textPrimary hover:opacity-80 transition-opacity"
        >
          faraz<span className="text-accent">.sec</span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault()
                scrollToSection(link.id)
              }}
              className={`relative px-4 py-2 text-sm font-medium tracking-wide transition-colors ${
                activeSection === link.id ? 'text-textPrimary' : 'text-textSecondary hover:text-textPrimary'
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeUnderline"
                  className="absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-primary to-accent"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* Quick Social Buttons */}
        <div className="hidden lg:flex items-center gap-4 text-textSecondary">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            <Github size={18} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            <Linkedin size={18} />
          </a>
          <a href="https://wa.me/917558043694" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
            <MessageSquare size={18} />
          </a>
        </div>

        {/* Hamburger Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-textPrimary hover:text-accent transition-colors p-1"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden w-full bg-[#050816]/95 border-b border-white/5 backdrop-blur-lg overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    scrollToSection(link.id)
                  }}
                  className={`text-lg font-medium py-1 transition-colors ${
                    activeSection === link.id ? 'text-accent' : 'text-textSecondary hover:text-textPrimary'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-6 mt-4 pt-6 border-t border-white/5 text-textSecondary">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2">
                  <Github size={20} /> GitHub
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-2">
                  <Linkedin size={20} /> LinkedIn
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
export default Navbar
