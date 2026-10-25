import React, { useRef } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { Cloud, GitBranch, Server, GraduationCap, School } from 'lucide-react'
import SectionHeader from './SectionHeader'

const journey = [
  {
    year: 'Now',
    type: 'Training',
    icon: Cloud,
    title: 'DevOps & Cloud Computing Trainee',
    org: 'Cloud-native foundations',
    text: 'Building practical deployment skills across AWS, Docker, Kubernetes, Linux, environment configuration and scalable application delivery.',
  },
  {
    year: 'Now',
    type: 'Practice',
    icon: GitBranch,
    title: 'Continuous Delivery Practice',
    org: 'Automation & reliability',
    text: 'GitHub branching workflows, pull requests, CI/CD pipelines, API testing and repeatable delivery for full-stack applications.',
  },
  {
    year: '2024',
    type: 'Experience',
    icon: Server,
    title: 'Full-Stack Developer',
    org: 'Python, Django & React',
    text: 'Creating end-to-end web applications with Django, DRF, React, MySQL, PostgreSQL, authentication and well-structured REST APIs.',
  },
  {
    year: '2022',
    type: 'Education',
    icon: GraduationCap,
    title: 'B.Tech in Computer Science & Cyber Security',
    org: 'University College of Engineering, Thodupuzha · 2022 – 2026',
    text: 'Software engineering, databases, computer networks and secure application development. Final project: chest pathology detection with deep learning.',
  },
  {
    year: 'School',
    type: 'Education',
    icon: School,
    title: 'Pre-University & SSLC',
    org: 'Jawahar Navodaya Vidyalaya, Wayanad',
    text: 'Completed pre-university and secondary education.',
  },
]

const ease = [0.22, 1, 0.36, 1]

export const Research = () => {
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 60%'] })
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="research" className="relative py-32 overflow-hidden">
      <div className="max-w-5xl mx-auto px-5 sm:px-6">
        <SectionHeader index="04" label="Experience & education" title="My Journey" />

        <div ref={listRef} className="relative">
          {/* Track + progress line that fills as you scroll */}
          <div className="absolute left-[7px] sm:left-[88px] md:left-[120px] top-2 bottom-2 w-px bg-white/10" />
          <motion.div
            style={{ scaleY: lineScale }}
            className="absolute left-[7px] sm:left-[88px] md:left-[120px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent via-primary to-primary/0 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
          />

          <div className="flex flex-col gap-10">
            {journey.map(({ year, type, icon: Icon, title, org, text }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, ease, delay: i * 0.05 }}
                className="relative sm:grid sm:grid-cols-[88px_1fr] md:grid-cols-[120px_1fr] items-start"
              >
                <div className="hidden sm:block pr-6 md:pr-10 pt-1 text-right font-heading text-sm md:text-base font-semibold text-textSecondary">
                  {year}
                </div>

                {/* Node */}
                <span className="absolute left-[7px] sm:left-[88px] md:left-[120px] top-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-accent bg-bgDark shadow-[0_0_12px_2px_rgba(59,130,246,0.6)]">
                  <span className="absolute inset-1 rounded-full bg-accent" />
                </span>

                <div className="pl-8 md:pl-12">
                  <div className="group rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 md:p-6 transition-[border-color,background-color] duration-300 hover:border-primary/40 hover:bg-primary/[0.04]">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon size={15} className="text-accent" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent">{type}</span>
                      <span className="sm:hidden ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-textSecondary">{year}</span>
                    </div>
                    <h3 className="font-heading text-lg md:text-xl font-semibold text-textPrimary mb-1">{title}</h3>
                    <div className="text-sm text-textSecondary/80 mb-3">{org}</div>
                    <p className="text-sm text-textSecondary leading-relaxed">{text}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
export default Research
