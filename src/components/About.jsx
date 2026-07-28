import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, BrainCircuit, Users, BookOpen } from 'lucide-react'
import SpotlightCard from './SpotlightCard'

export const About = () => {
  const stats = [
    { value: '7+', label: 'Active Projects' },
    { value: '15+', label: 'Technologies Mastered' },
    { value: '2', label: 'Leadership Roles' },
    { value: '2', label: 'Core Research Fields' },
  ]

  const pillars = [
    {
      icon: <ShieldCheck className="text-accent" size={24} />,
      title: 'Risk & Threat Assessment',
      description: 'Audit network infrastructure, map vulnerabilities using Burp Suite and Wireshark, and build threat models.'
    },
    {
      icon: <BrainCircuit className="text-primary" size={24} />,
      title: 'AI & Deep Learning Systems',
      description: 'Design transparent medical classifiers and research model safety against prompt injections and data poisoning.'
    },
    {
      icon: <Users className="text-secondaryAccent" size={24} />,
      title: 'Mentorship & Community',
      description: 'Lead peer coding groups and scale regional developer clusters to grow collaborative learning spaces.'
    },
    {
      icon: <BookOpen className="text-accent" size={24} />,
      title: 'Secure Web Engineering',
      description: 'Implement backend databases, role-based access rules (RBAC), and encrypt APIs in Django and React.'
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
            Bridging Security, Software &amp; AI
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
              Designing Secure Solutions for the Next Generation of Threat Intelligence
            </h3>
            
            <p className="text-textSecondary leading-relaxed">
              I am a Cyber Security Specialist and Programmer with a passionate commitment to engineering secure web applications and studying the intersections of deep learning model safety. My academic training in Computer Science and Cyber Security at UCE Thodupuzha provides a rigorous basis for solving network vulnerabilities, packet forensic audits, and cryptographic integrations.
            </p>
            
            <p className="text-textSecondary leading-relaxed">
              Beyond individual coding, I focus heavily on leadership and community building, directing peer-to-peer developer training and coaching students as a regional Senior Mentor. My philosophy is that security should be designed from the foundation up rather than patched on afterwards.
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
