import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, ArrowDown, ArrowRight } from 'lucide-react'

export const Hero = () => {
  const titles = [
    'Cyber Security Engineer',
    'AI & LLM Security Researcher',
    'Full Stack Developer',
    'Python Developer',
  ]

  const [titleIndex, setTitleIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  const TYPING_SPEED = 100
  const DELETING_SPEED = 50
  const PAUSE_DURATION = 1500

  useEffect(() => {
    let timer
    const currentFullText = titles[titleIndex]

    if (isDeleting) {
      timer = setTimeout(() => {
        setDisplayText((prev) => prev.slice(0, -1))
      }, DELETING_SPEED)
    } else {
      timer = setTimeout(() => {
        setDisplayText((prev) => currentFullText.slice(0, prev.length + 1))
      }, TYPING_SPEED)
    }

    if (!isDeleting && displayText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), PAUSE_DURATION)
    } else if (isDeleting && displayText === '') {
      setIsDeleting(false)
      setTitleIndex((prev) => (prev + 1) % titles.length)
    }

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, titleIndex])

  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e
    const x = (clientX / window.innerWidth - 0.5) * 12
    const y = (clientY / window.innerHeight - 0.5) * 12
    setTilt({ x, y })
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background glows */}
      <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] bg-primary/20 rounded-full filter blur-[100px] animate-pulse-slow -z-10" />
      <div className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-accent/15 rounded-full filter blur-[100px] animate-pulse-slow -z-10" />
      <div className="absolute top-[40%] right-[30%] w-[250px] h-[250px] bg-secondaryAccent/10 rounded-full filter blur-[90px] -z-10" />

      {/* Cyber Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px] -z-10 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)]" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left z-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-semibold text-accent tracking-wider uppercase mb-6">
            <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
            Security Core: Operational
          </span>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-textPrimary leading-none font-heading">
            AGIL FARAZ
          </h1>

          <h2 className="text-xl md:text-3xl font-medium text-textSecondary h-10 md:h-12 mb-6">
            I am a <span className="text-accent font-semibold typing-cursor">{displayText}</span>
          </h2>

          <p className="text-base md:text-lg text-textSecondary/80 max-w-xl mb-8 leading-relaxed font-sans">
            Specializing in risk assessment, network forensics, AI &amp; LLM safety models, and secure full-stack software development. Designing resilient architectures to shield data from modern threat vectors.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 w-full sm:w-auto">
            <a
              href="resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-gradient-to-r from-primary to-accent text-white font-semibold flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.6)] hover:-translate-y-0.5 transition-all w-full sm:w-auto text-sm tracking-wide"
            >
              Download Resume
            </a>
            <a
              href="https://wa.me/917558043694"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full border border-white/10 bg-white/5 text-textPrimary font-semibold hover:bg-white/10 hover:border-accent hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5 w-full sm:w-auto text-sm tracking-wide"
            >
              Hire Me <ArrowRight size={16} className="text-accent" />
            </a>
          </div>

          {/* Social Grid */}
          <div className="flex items-center gap-5 text-textSecondary">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/5 bg-white/5 hover:text-accent hover:border-accent/40 transition-all">
              <Github size={18} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full border border-white/5 bg-white/5 hover:text-accent hover:border-accent/40 transition-all">
              <Linkedin size={18} />
            </a>
            <a href="mailto:agilfaraz532@gmail.com" className="p-2.5 rounded-full border border-white/5 bg-white/5 hover:text-accent hover:border-accent/40 transition-all">
              <Mail size={18} />
            </a>
            <a href="tel:+917558043694" className="p-2.5 rounded-full border border-white/5 bg-white/5 hover:text-accent hover:border-accent/40 transition-all">
              <Phone size={18} />
            </a>
          </div>
        </motion.div>

        {/* Right Visual Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.1 }}
          className="lg:col-span-5 flex justify-center items-center z-10"
        >
          <div
            className="relative flex justify-center items-center w-full max-w-[340px] md:max-w-[380px] transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1000px) rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg) translateZ(10px)`,
            }}
          >
            {/* Pulsing card backdrop shadow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary via-accent to-secondaryAccent rounded-[32px] filter blur-[20px] opacity-40 animate-pulse-slow" />

            {/* Profile Card Container */}
            <div className="relative w-full aspect-[4/5] rounded-[30px] overflow-hidden bg-gradient-to-b from-[#0e1630] to-[#080d21] border border-white/10 p-5 shadow-2xl backdrop-blur-xl flex flex-col justify-between">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-mono text-accent tracking-[0.2em] uppercase">SECURE.PORTAL: C2_NODE</span>
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse" />
              </div>

              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#050816] border border-white/5 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 z-10" />
                <div className="absolute inset-0 border-[3px] border-accent/20 rounded-2xl z-20 pointer-events-none" />

                <img
                  src="images/agil_faraz.jpg"
                  alt="Agil Faraz"
                  className="w-full h-full object-cover select-none scale-[1.05] filter brightness-[0.88] contrast-[1.05]"
                />

                <div className="absolute bottom-3 right-3 bg-[#050816]/90 border border-white/15 px-3 py-1 rounded-lg backdrop-blur-md z-20 text-[10px] font-mono font-bold text-accent">
                  FARAZ.SEC // C2
                </div>
              </div>

              <div className="mt-4 flex flex-col text-left">
                <h3 className="text-xl font-bold tracking-wide text-textPrimary leading-none mb-1 font-heading">
                  Agil Faraz
                </h3>
                <div className="text-xs font-mono text-textSecondary flex justify-between items-center">
                  <span>CS &amp; Cyber Security</span>
                  <span className="text-accent font-semibold">UCE Thodupuzha</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        onClick={() => scrollToSection('about')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-textSecondary hover:text-accent transition-colors flex flex-col items-center gap-1.5 text-xs font-mono tracking-widest cursor-pointer select-none z-10"
      >
        Scroll Down
        <ArrowDown size={14} />
      </motion.div>
    </section>
  )
}
export default Hero
