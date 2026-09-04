import React from 'react'
import { motion } from 'framer-motion'
import { Cloud, GitBranch, Server } from 'lucide-react'
import SpotlightCard from './SpotlightCard'

export const Research = () => {
  const researchItems = [
    {
      id: 'r1',
      date: 'Present',
      title: 'DevOps & Cloud Computing Trainee',
      field: 'Cloud-Native Foundations',
      role: 'Trainee Engineer',
      icon: <Cloud className="text-accent" size={20} />,
      abstract: 'Developing practical deployment skills across AWS cloud fundamentals, Docker containers, Linux, environment configuration, and scalable application delivery.'
    },
    {
      id: 'r2',
      date: 'Present',
      title: 'Continuous Delivery Practice',
      field: 'Automation & Reliability',
      role: 'Developer Trainee',
      icon: <GitBranch className="text-primary" size={20} />,
      abstract: 'Building fluency in GitHub branching workflows, pull requests, CI/CD concepts, API testing, and repeatable delivery practices for full-stack applications.'
    },
    {
      id: 'r3',
      date: '2024 - Present',
      title: 'Full-Stack Development Journey',
      field: 'Python, Django & React',
      role: 'Software Developer',
      icon: <Server className="text-secondaryAccent" size={20} />,
      abstract: 'Creating end-to-end web applications with Django, Django REST Framework, React, MySQL, PostgreSQL, authentication, and well-structured REST APIs.'
    }
  ]

  return (
    <section id="research" className="relative py-24 overflow-hidden border-t border-white/5 bg-[#050816]">
      <div className="absolute top-[20%] right-[-10%] w-[350px] h-[350px] bg-[#7C3AED]/10 rounded-full filter blur-[140px] -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.25em] text-accent uppercase block mb-3 font-heading"
          >
            CAREER JOURNEY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-textPrimary font-heading"
          >
            Building for the Cloud
          </motion.h2>
        </div>

        {/* Vertical Timeline Layout */}
        <div className="relative max-w-4xl mx-auto pl-8 border-l border-white/10 flex flex-col gap-12 text-left">
          {/* Vertical Glowing Line overlay */}
          <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-accent to-transparent" />

          {researchItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative"
            >
              {/* Chronological Circle Indicator */}
              <div className="absolute left-[-41px] top-4 w-[24px] h-[24px] rounded-full bg-[#050816] border-[3px] border-primary flex items-center justify-center z-10">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
              </div>

              {/* Research Card */}
              <SpotlightCard className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                {/* Visual Icon Box */}
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-2">
                    <span className="text-xs font-mono font-bold text-accent tracking-widest uppercase">
                      {item.field}
                    </span>
                    <span className="text-xs font-semibold text-textSecondary bg-white/5 px-3 py-1 rounded-full border border-white/5">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-textPrimary font-heading mb-2">
                    {item.title}
                  </h3>

                  <div className="text-xs font-mono font-semibold text-textSecondary uppercase tracking-widest mb-4">
                    Role: <span className="text-accent">{item.role}</span>
                  </div>

                  <p className="text-sm text-textSecondary leading-relaxed border-l-2 border-white/10 pl-4 py-1 italic bg-white/[0.01]">
                    &ldquo;{item.abstract}&rdquo;
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Research
