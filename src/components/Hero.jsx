import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { Github, Linkedin, Mail, ArrowRight, ArrowDown } from 'lucide-react'
import MagneticButton from './MagneticButton'

const roles = ['Python Full Stack Developer', 'DevOps & Cloud Trainee', 'Cyber Security Enthusiast']
const keywords = ['Ideas', 'Code', 'Cloud', 'Security']

const stats = [
  { value: '6', label: 'Projects' },
  { value: '15+', label: 'Tech stacks' },
  { value: '100+', label: 'Students mentored' },
  { value: '∞', label: 'Learning' },
]

const socials = [
  { href: 'https://github.com/agilfaraz532-blip', icon: Github, label: 'GitHub', external: true },
  { href: 'https://linkedin.com/in/agilfaraz', icon: Linkedin, label: 'LinkedIn', external: true },
  { href: 'mailto:agilfaraz532@gmail.com', icon: Mail, label: 'Email' },
]

const ease = [0.22, 1, 0.36, 1]

// Soft oval fade so the photo melts into the background on every side
const photoMask = [
  'linear-gradient(to bottom, transparent 0%, #000 25%, #000 65%, transparent 100%)',
  'linear-gradient(to right, transparent 0%, #000 40%, #000 85%, transparent 100%)',
].join(', ')

// Letters rise into place one after another
const RevealWord = ({ text, className, delay }) => (
  <span className={`block ${className}`} aria-hidden="true">
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        className="inline-block"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: delay + i * 0.05 }}
      >
        {char}
      </motion.span>
    ))}
  </span>
)

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' })
  }
}

export const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2800)
    return () => clearInterval(timer)
  }, [])

  // Scroll parallax: photo and planet move at different speeds
  const { scrollY } = useScroll()
  const photoY = useTransform(scrollY, [0, 800], [0, 120])
  const planetY = useTransform(scrollY, [0, 800], [0, -60])
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0])

  // Mouse parallax on the photo
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const photoX = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 60, damping: 20 })
  const photoTilt = useSpring(useTransform(my, [-1, 1], [-8, 8]), { stiffness: 60, damping: 20 })

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 2)
      my.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Planet horizon */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[84%] md:top-[83%] w-[260vw] md:w-[170vw] aspect-square pointer-events-none">
        <motion.div
          style={{ y: planetY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease }}
          className="absolute inset-0"
        >
          <div className="planet inset-0" />
        </motion.div>
      </div>

      {/* Photo */}
      <motion.div
        style={{ y: photoY, x: photoX, rotateY: photoTilt }}
        className="absolute right-0 bottom-0 w-full md:w-[55%] lg:w-[46%] h-[62%] md:h-[88%] pointer-events-none"
      >
        <img
          src="images/agil_cinematic-720.webp"
          srcSet="images/agil_cinematic-420.webp 420w, images/agil_cinematic-720.webp 720w"
          sizes="(min-width: 768px) 50vw, 100vw"
          width="720"
          height="883"
          alt="Agil Faraz"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover object-[50%_20%] opacity-40 md:opacity-90"
          style={{ maskImage: photoMask, WebkitMaskImage: photoMask, maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }}
        />
      </motion.div>

      {/* Keyword rail */}
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="hidden xl:flex flex-col gap-2 absolute right-10 top-36 border-l border-primary/40 pl-4 font-mono text-[11px] tracking-[0.3em] uppercase text-textSecondary z-10"
      >
        {keywords.map((k) => <li key={k}>{k}</li>)}
      </motion.ul>

      {/* Content */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-6 w-full pt-32 pb-10"
      >
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/40 bg-primary/10 text-[11px] font-mono tracking-[0.2em] uppercase text-accent mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_2px_rgba(96,165,250,0.8)]" />
            Welcome to my portfolio
          </motion.span>

          <h1
            className="font-heading font-extrabold tracking-tight leading-[0.92] text-[3.6rem] sm:text-7xl md:text-8xl xl:text-[8.5rem] mb-8"
            aria-label="Agil Faraz"
          >
            <RevealWord text="AGIL" className="text-textPrimary" delay={0.2} />
            <RevealWord text="FARAZ" className="text-accent-gradient" delay={0.45} />
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-3 text-base md:text-lg text-textPrimary mb-5 h-7 overflow-hidden"
          >
            <span className="w-8 h-px bg-primary" />
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.45, ease }}
                className="font-medium"
              >
                {roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7, ease }}
            className="text-base md:text-lg text-textSecondary max-w-lg mb-10 leading-relaxed"
          >
            I build secure, scalable web applications with Django, React and REST APIs, and deploy them with AWS, Docker and CI/CD.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7, ease }}
            className="flex flex-col sm:flex-row gap-4 mb-10"
          >
            <MagneticButton
              href="#projects"
              onClick={(e) => { e.preventDefault(); scrollToSection('projects') }}
              className="group btn-glow px-7 py-3.5 rounded-lg bg-primary hover:bg-[#2563EB] text-white font-semibold text-sm flex items-center justify-center gap-2"
            >
              View Projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton
              href="resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-glow px-7 py-3.5 rounded-lg bg-white/[0.03] text-textPrimary font-semibold text-sm flex items-center justify-center"
            >
              Download CV
            </MagneticButton>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 1.25 } } }}
            className="flex items-center gap-3"
          >
            {socials.map(({ href, icon: Icon, label, external }) => (
              <motion.a
                key={label}
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                href={href}
                aria-label={label}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="w-10 h-10 rounded-lg border border-white/10 bg-white/[0.03] flex items-center justify-center text-textSecondary hover:text-white hover:border-primary/70 hover:shadow-[0_0_18px_-2px_rgba(59,130,246,0.7)] transition-all"
              >
                <Icon size={17} />
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.8, ease }}
        className="relative z-10 max-w-7xl mx-auto w-full px-6 pb-8"
      >
        <div className="flex items-end justify-between gap-6 border-t border-white/10 pt-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 gap-y-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-heading text-2xl md:text-3xl font-semibold text-accent">{s.value}</div>
                <div className="text-[11px] font-mono uppercase tracking-[0.15em] text-textSecondary mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollToSection('about')}
            className="hidden sm:flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-textSecondary hover:text-accent transition-colors shrink-0"
          >
            <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
              <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                <ArrowDown size={15} />
              </motion.span>
            </span>
            Scroll to explore
          </button>
        </div>
      </motion.div>
    </section>
  )
}
export default Hero
