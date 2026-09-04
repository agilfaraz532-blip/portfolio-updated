import React from 'react'
import { motion } from 'framer-motion'
import { Cloud, Code2, Database, Users } from 'lucide-react'
import SpotlightCard from './SpotlightCard'

export const About = () => {
  const stats = [
    { value: '2', label: 'Featured Projects' },
    { value: '15+', label: 'Tools & Technologies' },
    { value: '2', label: 'Leadership Roles' },
    { value: '1', label: 'Cloud Career Path' },
  ]

  const pillars = [
    {
      icon: <Code2 className="text-accent" size={24} />,
      title: 'Full Stack Development',
      description: 'Build robust web applications with Python, Django, DRF, React.js, REST APIs, and clean backend architecture.'
    },
    {
      icon: <Cloud className="text-primary" size={24} />,
      title: 'DevOps & Cloud Infrastructure',
      description: 'Learn to containerize, deploy, and monitor applications using AWS, Docker, CI/CD, Linux, and shell scripting.'
    },
    {
      icon: <Database className="text-secondaryAccent" size={24} />,
      title: 'Data & APIs',
      description: 'Design reliable data flows with MySQL, PostgreSQL, authentication, and well-documented RESTful APIs.'
    },
    {
      icon: <Users className="text-accent" size={24} />,
      title: 'Mentorship & Community',
      description: 'Lead peer coding groups and mentor students as MuLearn Creative Lead and NRPF Cluster Head.'
    }
  ]

  return (
    <section id="about" className="relative py-24 overflow-hidden border-t border-white/5 bg-[#050816]">
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
            BIOGRAPHY
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-textPrimary font-heading"
          >
            Bridging Development, Cloud &amp; AI
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Bio & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 flex flex-col gap-8"
          >
            <h3 className="text-2xl font-bold font-heading text-textPrimary leading-snug">
              Building Scalable Applications and Resilient Cloud Infrastructure
            </h3>
            
            <p className="text-textSecondary leading-relaxed">
              I am a B.Tech Computer Science student and Python full-stack developer with hands-on experience in Django, React, Java, REST APIs, and relational databases. I enjoy turning practical product needs into clean, dependable software.
            </p>
            
            <p className="text-textSecondary leading-relaxed">
              I am also developing as a DevOps and cloud computing trainee, with a focus on AWS, Docker, CI/CD, GitHub workflows, Linux, and deployment automation. Alongside engineering, I have led peer learning communities as a MuLearn Creative Lead and NRPF Senior Mentor.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/5 rounded-2xl p-5 text-center flex flex-col justify-center items-center animate-float"
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <span className="text-3xl font-extrabold text-accent font-heading mb-1 block">
                    {stat.value}
                  </span>
                  <span className="text-[11px] font-sans font-medium text-textSecondary uppercase tracking-wide leading-tight">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Pillars of Focus */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {pillars.map((pillar, i) => (
              <SpotlightCard key={i} className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-2">
                  {pillar.icon}
                </div>
                <h4 className="text-lg font-bold text-textPrimary font-heading">
                  {pillar.title}
                </h4>
                <p className="text-sm text-textSecondary leading-relaxed">
                  {pillar.description}
                </p>
              </SpotlightCard>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
export default About
