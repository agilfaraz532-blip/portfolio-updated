import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Cloud, Code2, Database, Users, Terminal, Lightbulb, UsersRound, MapPin } from 'lucide-react'
import SectionHeader from './SectionHeader'
import SpotlightCard from './SpotlightCard'

const stats = [
  { value: 6, suffix: '', label: 'Projects' },
  { value: 15, suffix: '+', label: 'Tech stacks' },
  { value: 100, suffix: '+', label: 'Students mentored' },
]

const traits = [
  { icon: Terminal, label: 'Developer' },
  { icon: Lightbulb, label: 'Problem Solver' },
  { icon: UsersRound, label: 'Team Player' },
]

const pillars = [
  { icon: Code2, title: 'Full Stack Development', description: 'Python, Django, DRF, React.js, REST APIs and clean backend architecture.' },
  { icon: Cloud, title: 'DevOps & Cloud', description: 'AWS, Docker, Kubernetes, CI/CD, Linux and shell scripting.' },
  { icon: Database, title: 'Data & APIs', description: 'MySQL, PostgreSQL, authentication and well-documented APIs.' },
  { icon: Users, title: 'Mentorship', description: 'MuLearn Creative Lead and NRPF Senior Mentor.' },
]

const ease = [0.22, 1, 0.36, 1]

const CountUp = ({ to, suffix }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, to, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => setValue(Math.round(v)) })
    return () => controls.stop()
  }, [inView, to])

  return <span ref={ref}>{value}{suffix}</span>
}

export const About = () => {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader index="01" label="About me" title="Developer with a security mindset" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease }}
            className="lg:col-span-5"
          >
            <div className="relative group">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-primary/60 via-primary/10 to-transparent" />
              <div className="relative rounded-2xl overflow-hidden bg-surface aspect-[4/5]">
                <img
                  src="images/agil_cinematic-720.webp"
                  srcSet="images/agil_cinematic-420.webp 420w, images/agil_cinematic-720.webp 720w"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  width="720"
                  height="883"
                  alt="Agil Faraz"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bgDark via-bgDark/10 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                  <div>
                    <div className="font-heading text-xl font-semibold text-white">Agil Faraz</div>
                    <div className="text-xs text-textSecondary mt-1 flex items-center gap-1.5">
                      <MapPin size={12} className="text-accent" /> Wayanad, Kerala
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-md border border-primary/50 bg-primary/15 text-[10px] font-mono uppercase tracking-widest text-accent">
                    Open to work
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="text-xl md:text-2xl font-heading font-light text-textPrimary leading-relaxed mb-6">
                I'm Agil Faraz, a B.Tech <span className="text-accent font-normal">Computer Science &amp; Cyber Security</span> student who builds real-world web applications and the cloud infrastructure they run on.
              </p>
              <p className="text-textSecondary leading-relaxed mb-10 max-w-2xl">
                I work across the stack with Python, Django, React and relational databases, and I'm training in DevOps: containerising, deploying and monitoring services with AWS, Docker, Kubernetes and CI/CD. Outside code, I lead peer learning communities and mentor students.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              className="grid grid-cols-3 rounded-xl border border-white/10 bg-white/[0.02] divide-x divide-white/10 mb-6"
            >
              {stats.map((s) => (
                <div key={s.label} className="px-4 py-5 text-center">
                  <div className="font-heading text-3xl md:text-4xl font-semibold text-accent">
                    <CountUp to={s.value} suffix={s.suffix} />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-textSecondary mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Traits */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {traits.map(({ icon: Icon, label }) => (
                <motion.span
                  key={label}
                  variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.02] text-sm text-textPrimary"
                >
                  <Icon size={16} className="text-accent" /> {label}
                </motion.span>
              ))}
            </motion.div>

            {/* Focus areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pillars.map(({ icon: Icon, title, description }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                >
                  <SpotlightCard className="h-full p-5 flex gap-4 items-start">
                    <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-accent transition-shadow duration-500 group-hover:shadow-[0_0_20px_-2px_rgba(59,130,246,0.8)]">
                      <Icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-textPrimary font-heading mb-1">{title}</h3>
                      <p className="text-[13px] text-textSecondary leading-relaxed">{description}</p>
                    </div>
                  </SpotlightCard>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
export default About
