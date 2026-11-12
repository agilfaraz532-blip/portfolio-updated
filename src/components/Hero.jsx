import React, { useEffect, useRef, useState } from 'react'
import {
  motion, useScroll, useTransform, useMotionValue, useSpring,
  useMotionValueEvent, useReducedMotion,
} from 'framer-motion'
import { Github, Linkedin, Mail, ArrowRight, ArrowDown } from 'lucide-react'
import MagneticButton from './MagneticButton'

const roles = ['Python Full Stack', 'DevOps & Cloud', 'Cyber Security']

const stats = [
  { value: 6, suffix: '', label: 'Projects' },
  { value: 15, suffix: '+', label: 'Tech stacks' },
  { value: 100, suffix: '+', label: 'Students mentored' },
]

const socials = [
  { href: 'https://github.com/agilfaraz532-blip', icon: Github, label: 'GitHub', external: true },
  { href: 'https://linkedin.com/in/agilfaraz', icon: Linkedin, label: 'LinkedIn', external: true },
  { href: 'mailto:agilfaraz532@gmail.com', icon: Mail, label: 'Email' },
]

const ease = [0.22, 1, 0.36, 1]

// The frame is cut into shards along its light streaks. Each shard tiles the same
// background, so they read as one panel until scrolling throws them apart.
// to: [x (vw), y (vh), rotateX, rotateY, rotateZ] at the end of the break-up.
const shards = [
  { clip: 'polygon(0% 0%, 36% 0%, 24% 56%, 0% 47%)', to: [-46, -58, 38, -52, -24] },
  { clip: 'polygon(36% 0%, 71% 0%, 58% 63%, 24% 56%)', to: [4, -84, 62, 18, 14] },
  { clip: 'polygon(71% 0%, 100% 0%, 100% 44%, 58% 63%)', to: [52, -50, 30, 58, 28] },
  { clip: 'polygon(0% 47%, 24% 56%, 58% 63%, 45% 100%, 0% 100%)', to: [-50, 56, -44, -38, 18] },
  { clip: 'polygon(58% 63%, 100% 44%, 100% 100%, 45% 100%)', to: [46, 62, -50, 44, -20] },
]

// Soft fade on every side so the photo melts into the halo and frame
const photoMask = [
  'linear-gradient(to bottom, transparent 0%, #000 26%, #000 72%, transparent 100%)',
  'linear-gradient(to right, transparent 0%, #000 38%, #000 88%, transparent 100%)',
].join(', ')

const Shard = ({ clip, to, progress }) => {
  const [tx, ty, rx, ry, rz] = to
  const range = [0.02, 0.5]
  const x = useTransform(progress, range, ['0vw', `${tx}vw`])
  const y = useTransform(progress, range, ['0vh', `${ty}vh`])
  const rotateX = useTransform(progress, range, [0, rx])
  const rotateY = useTransform(progress, range, [0, ry])
  const rotateZ = useTransform(progress, range, [0, rz])
  const opacity = useTransform(progress, [0.3, 0.52], [1, 0])
  return (
    <motion.div
      style={{ x, y, rotateX, rotateY, rotateZ, opacity, clipPath: clip }}
      className="hero-shard absolute inset-0 will-change-transform"
    />
  )
}

// Letters rise into place one after another
const RevealWord = ({ text, delay }) => (
  <span className="block" aria-hidden="true">
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        className="inline-block"
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
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
  const sectionRef = useRef(null)
  const reduceMotion = useReducedMotion()

  // The section is taller than the screen and its stage is pinned, so scrolling
  // plays the sequence: frame shatters -> stats fly in and count up -> stats fly off.
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.4 })

  // Name block tips away and is flung up and to the left
  const contentX = useTransform(p, [0, 0.4], ['0vw', '-14vw'])
  const contentY = useTransform(p, [0, 0.4], ['0vh', '-46vh'])
  const contentRotY = useTransform(p, [0, 0.4], [0, 34])
  const contentRotZ = useTransform(p, [0, 0.4], [0, 9])
  const contentScale = useTransform(p, [0, 0.4], [1, 1.25])
  const contentOpacity = useTransform(p, [0.14, 0.4], [1, 0])
  const contentPointer = useTransform(p, (v) => (v > 0.12 ? 'none' : 'auto'))

  // Portrait and halo swell toward the viewer and burn out
  const portraitScale = useTransform(p, [0, 0.36], [1, 1.5])
  const portraitOpacity = useTransform(p, [0.04, 0.34], [1, 0])
  const frameOpacity = useTransform(p, [0, 0.14], [1, 0])

  // Stat cards: rush in from the distance, hold, then tip over the top
  const statsOpacity = useTransform(p, [0.36, 0.5, 0.86, 0.98], [0, 1, 1, 0])
  const statsScale = useTransform(p, [0.36, 0.54], [0.35, 1])
  const statsY = useTransform(p, [0.36, 0.54, 0.84, 1], ['26vh', '0vh', '0vh', '-44vh'])
  const statsRotX = useTransform(p, [0.36, 0.54, 0.84, 1], [-50, 0, 0, 58])
  const statsBlur = useTransform(p, [0.36, 0.52], [14, 0])
  const statsFilter = useTransform(statsBlur, (v) => `blur(${v}px)`)

  // Numbers are scrubbed by scroll rather than timed
  const [counted, setCounted] = useState(0)
  useMotionValueEvent(p, 'change', (v) => {
    const next = Math.round(Math.max(0, Math.min(1, (v - 0.42) / 0.3)) * 100)
    setCounted((prev) => (prev === next ? prev : next))
  })

  // Mouse parallax on the photo and halo
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const photoX = useSpring(useTransform(mx, [-1, 1], [-14, 14]), { stiffness: 60, damping: 20 })
  const haloX = useSpring(useTransform(mx, [-1, 1], [18, -18]), { stiffness: 50, damping: 20 })
  const haloY = useSpring(useTransform(my, [-1, 1], [12, -12]), { stiffness: 50, damping: 20 })

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
    <section id="home" ref={sectionRef} className={`relative ${reduceMotion ? 'h-screen' : 'h-[240vh]'}`}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="absolute inset-2.5 md:inset-4 rounded-[26px] md:rounded-[34px] overflow-hidden [perspective:1300px]">
          {/* Frame, in pieces */}
          {shards.map((s) => (
            <Shard key={s.clip} clip={s.clip} to={s.to} progress={p} />
          ))}

          <motion.div style={{ opacity: frameOpacity }} className="absolute inset-0 pointer-events-none">
            <div className="hero-frame-border absolute inset-0 rounded-[26px] md:rounded-[34px]" />
            {/* Light streaks along the shard seams */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
              <g stroke="rgba(255,255,255,0.22)" strokeWidth="1" vectorEffect="non-scaling-stroke" fill="none">
                <line x1="36" y1="0" x2="24" y2="56" vectorEffect="non-scaling-stroke" />
                <line x1="71" y1="0" x2="58" y2="63" vectorEffect="non-scaling-stroke" />
                <line x1="0" y1="47" x2="24" y2="56" vectorEffect="non-scaling-stroke" />
                <line x1="24" y1="56" x2="58" y2="63" vectorEffect="non-scaling-stroke" />
                <line x1="58" y1="63" x2="100" y2="44" vectorEffect="non-scaling-stroke" />
                <line x1="58" y1="63" x2="45" y2="100" vectorEffect="non-scaling-stroke" />
              </g>
            </svg>
          </motion.div>

          {/* Halo + portrait */}
          <motion.div
            style={{ scale: portraitScale, opacity: portraitOpacity }}
            className="absolute inset-0 pointer-events-none origin-[70%_45%]"
          >
            <motion.div
              style={{ x: haloX, y: haloY }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease }}
              className="absolute right-[-18%] md:right-[6%] top-[16%] md:top-[9%] w-[105vw] md:w-[46vw] max-w-[720px] aspect-square"
            >
              <div className="hero-halo absolute inset-0" />
            </motion.div>

            <motion.div
              style={{ x: photoX }}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, ease, delay: 0.2 }}
              className="absolute right-0 bottom-0 w-full md:w-[52%] lg:w-[44%] h-[58%] md:h-[86%]"
            >
              <img
                src="images/agil_red-720.webp"
                srcSet="images/agil_red-420.webp 420w, images/agil_red-720.webp 720w"
                sizes="(min-width: 768px) 50vw, 100vw"
                width="720"
                height="883"
                alt="Agil Faraz"
                fetchPriority="high"
                decoding="async"
                className="w-full h-full object-cover object-[50%_18%] opacity-45 md:opacity-100"
                style={{ maskImage: photoMask, WebkitMaskImage: photoMask, maskComposite: 'intersect', WebkitMaskComposite: 'source-in' }}
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            style={{
              x: contentX, y: contentY, rotateY: contentRotY, rotateZ: contentRotZ,
              scale: contentScale, opacity: contentOpacity, pointerEvents: contentPointer,
            }}
            className="absolute inset-0 z-10 flex items-center origin-left will-change-transform"
          >
            <div className="max-w-7xl mx-auto px-6 md:px-10 w-full pt-16">
              <div className="max-w-2xl">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, ease, delay: 0.1 }}
                  className="block origin-left w-24 h-[3px] rounded-full bg-primary shadow-[0_0_16px_3px_rgba(229,25,36,0.9)] mb-6"
                />

                <h1
                  className="font-heading font-extrabold uppercase tracking-tight leading-[0.9] text-[3.6rem] sm:text-7xl md:text-8xl xl:text-[7.5rem] text-textPrimary text-glow mb-7"
                  aria-label="Agil Faraz"
                >
                  <RevealWord text="AGIL" delay={0.2} />
                  <RevealWord text="FARAZ" delay={0.45} />
                </h1>

                <motion.ul
                  initial="hidden"
                  animate="show"
                  variants={{ show: { transition: { staggerChildren: 0.08, delayChildren: 0.9 } } }}
                  className="flex flex-wrap gap-x-5 gap-y-2 mb-5"
                >
                  {roles.map((role) => (
                    <motion.li
                      key={role}
                      variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                      className="flex items-center gap-2 font-heading text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] text-textPrimary"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_2px_rgba(229,25,36,0.9)]" />
                      {role}
                    </motion.li>
                  ))}
                </motion.ul>

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.7, ease }}
                  className="text-base md:text-lg text-textSecondary max-w-lg mb-9 leading-relaxed"
                >
                  I build secure, scalable web applications with Django, React and REST APIs, and deploy them with AWS, Docker and CI/CD.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.7, ease }}
                  className="flex flex-col sm:flex-row gap-4 mb-9"
                >
                  <MagneticButton
                    href="#projects"
                    onClick={(e) => { e.preventDefault(); scrollToSection('projects') }}
                    className="group btn-glow px-7 py-3.5 rounded-full bg-primary hover:bg-[#B3121C] text-white font-bold text-xs uppercase tracking-[0.16em] flex items-center justify-center gap-2"
                  >
                    View Projects
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </MagneticButton>
                  <MagneticButton
                    href="resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline-glow px-7 py-3.5 rounded-full bg-white/[0.04] text-textPrimary font-bold text-xs uppercase tracking-[0.16em] flex items-center justify-center"
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
                      className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.04] flex items-center justify-center text-textSecondary hover:text-white hover:border-primary/70 hover:shadow-[0_0_18px_-2px_rgba(229,25,36,0.8)] transition-all"
                    >
                      <Icon size={17} />
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              onClick={() => scrollToSection('about')}
              className="hidden sm:flex absolute right-8 bottom-7 flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.25em] text-textSecondary hover:text-accent transition-colors"
            >
              <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
                <motion.span animate={{ y: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
                  <ArrowDown size={15} />
                </motion.span>
              </span>
              Scroll to explore
            </motion.button>
          </motion.div>

          {/* Stat cards, revealed once the frame has broken away */}
          {!reduceMotion && (
            <motion.div
              style={{ opacity: statsOpacity, scale: statsScale, y: statsY, rotateX: statsRotX, filter: statsFilter }}
              className="absolute inset-0 z-10 flex items-center justify-center px-4 pointer-events-none will-change-transform"
            >
              <div className="red-glass grid grid-cols-3 divide-x divide-white/15 rounded-2xl md:rounded-3xl w-full max-w-3xl">
                {stats.map((s) => (
                  <div key={s.label} className="px-2 py-6 md:py-10 text-center">
                    <div className="font-heading text-4xl sm:text-5xl md:text-7xl font-extrabold tabular-nums text-white text-glow">
                      {Math.round((s.value * counted) / 100)}
                      <span className="text-[0.5em] align-top">{s.suffix}</span>
                    </div>
                    <div className="text-[9px] sm:text-[11px] font-mono uppercase tracking-[0.18em] text-white/75 mt-2">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
export default Hero
