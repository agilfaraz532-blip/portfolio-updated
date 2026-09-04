import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Code, Brain, Globe, Database, Network } from 'lucide-react'
import SpotlightCard from './SpotlightCard'

export const Skills = () => {
  const skillCategories = [
    {
      title: 'Programming',
      icon: <Code className="text-primary" size={20} />,
      skills: [
        { name: 'Python', level: 90 },
        { name: 'Java & OOP', level: 78 },
        { name: 'C & Data Structures', level: 72 },
      ]
    },
    {
      title: 'Web Development',
      icon: <Globe className="text-accent" size={20} />,
      skills: [
        { name: 'Django & DRF', level: 85 },
        { name: 'React.js', level: 78 },
        { name: 'RESTful APIs', level: 84 },
      ]
    },
    {
      title: 'DevOps & Cloud',
      icon: <Network className="text-secondaryAccent" size={20} />,
      skills: [
        { name: 'AWS Cloud Fundamentals', level: 70 },
        { name: 'Docker & Containers', level: 72 },
        { name: 'CI/CD Pipelines', level: 70 },
      ]
    },
    {
      title: 'Databases & Security',
      icon: <Database className="text-primary" size={20} />,
      skills: [
        { name: 'MySQL & PostgreSQL', level: 80 },
        { name: 'Authentication & RBAC', level: 78 },
        { name: 'Postman & API Testing', level: 82 },
      ]
    },
    {
      title: 'OS & Scripting',
      icon: <Shield className="text-accent" size={20} />,
      skills: [
        { name: 'Linux Fundamentals', level: 76 },
        { name: 'Shell Scripting', level: 70 },
        { name: 'Git & GitHub Workflows', level: 85 },
      ]
    },
    {
      title: 'Artificial Intelligence',
      icon: <Brain className="text-secondaryAccent" size={20} />,
      skills: [
        { name: 'Deep Learning & CNNs', level: 78 },
        { name: 'Explainable AI (Grad-CAM)', level: 75 },
        { name: 'Data Preprocessing', level: 80 },
      ]
    }
  ]

  return (
    <section id="skills" className="relative py-24 overflow-hidden border-t border-white/5 bg-[#050816]">
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] bg-secondaryAccent/10 rounded-full filter blur-[120px] -z-10" />
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] bg-primary/10 rounded-full filter blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.25em] text-accent uppercase block mb-3 font-heading"
          >
            EXPERTISE
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-textPrimary font-heading"
          >
            My Technical Stack
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <SpotlightCard className="h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                      {cat.icon}
                    </div>
                    <h3 className="text-lg font-bold text-textPrimary font-heading">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-5">
                    {cat.skills.map((skill, index) => (
                      <div key={index} className="flex flex-col gap-2">
                        <div className="flex justify-between items-center text-xs font-semibold text-textSecondary">
                          <span className="font-sans">{skill.name}</span>
                          <span className="text-accent font-mono">{skill.level}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Skills
