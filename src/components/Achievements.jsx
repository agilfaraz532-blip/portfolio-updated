import React from 'react'
import { motion } from 'framer-motion'
import { Award, TrendingUp, Trophy } from 'lucide-react'
import SpotlightCard from './SpotlightCard'

export const Achievements = () => {
  const achievements = [
    {
      id: 'a1',
      title: 'MuLearn Creative Lead',
      subtitle: 'University College of Engineering, Thodupuzha',
      icon: <Award className="text-accent" size={24} />,
      role: 'Creative Design & Operations Lead',
      description: 'Directed creative campaigns, technical workshops, and designed UI/UX design paths to foster peer-to-peer engineering learning and increase active participation across departments.',
      impact: 'Scaled developer engagements and organized inter-department coding sprints.'
    },
    {
      id: 'a2',
      title: 'NRPF Cluster Head to Senior Mentor',
      subtitle: 'ALP-IDK-KTM Region',
      icon: <TrendingUp className="text-primary" size={24} />,
      role: 'Regional Operations & Mentor Coordinator',
      description: 'Supervised student developer clusters and mentored teams on cyber security fundamentals, software safety, and database principles. Earned a double promotion within 12 months.',
      impact: 'Coached 100+ students and streamlined regional project operations.'
    },
    {
      id: 'a3',
      title: 'University Football Player',
      subtitle: 'Athletics Department',
      icon: <Trophy className="text-secondaryAccent" size={24} />,
      role: 'First-Team Varsity Player',
      description: 'Competed at varsity levels representing the college. Fostered high levels of strategic planning, fast decision making, endurance, and collaborative coordination under match-play pressure.',
      impact: 'Strengthened leadership, endurance, and split-second tactical reflexes.'
    }
  ]

  return (
    <section id="achievements" className="relative py-24 overflow-hidden border-t border-white/5 bg-[#050816]">
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-accent/10 rounded-full filter blur-[130px] -z-10 animate-pulse-slow" />

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
            HONOURS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-textPrimary font-heading"
          >
            Achievements &amp; Leadership
          </motion.h2>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <SpotlightCard className="h-full flex flex-col justify-between p-6 bg-white/[0.02]">
                <div className="flex flex-col gap-5 text-left">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {item.icon}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-textPrimary font-heading mb-1 leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-xs font-mono font-bold text-accent uppercase tracking-wider block mb-1">
                      {item.role}
                    </span>
                    <span className="text-[11px] font-sans font-medium text-textSecondary/60 block">
                      {item.subtitle}
                    </span>
                  </div>

                  <p className="text-sm text-textSecondary leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5 text-xs text-textSecondary flex items-start gap-2 bg-black/5 p-3 rounded-lg border border-white/5 text-left">
                  <span className="font-bold text-accent font-heading flex-shrink-0">IMPACT:</span>
                  <span className="font-sans leading-relaxed">{item.impact}</span>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Achievements
