import React from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Landmark } from 'lucide-react'
import SpotlightCard from './SpotlightCard'

export const Education = () => {
  const educationList = [
    {
      id: 'e1',
      date: '2022 - 2026',
      degree: 'Bachelor of Technology (B.Tech)',
      major: 'Computer Science and Cyber Security',
      school: 'University College of Engineering',
      location: 'Thodupuzha, Kerala',
      icon: <GraduationCap className="text-accent" size={20} />,
      details: [
        'Rigorous academic coursework covering Cryptography, Threat Modeling, Network Forensics, Operating Systems, Database Management Systems, and Software Engineering.',
        'Hands-on lab training in penetration testing, network configuration, and secure application development.',
        'Key project: Chest Pathology Detection using deep learning ensemble models (ResNet, DenseNet, EfficientNet).'
      ]
    },
    {
      id: 'e2',
      date: '2020 - 2022',
      degree: 'Pre-University Education (Higher Secondary)',
      major: 'Physics, Chemistry, Mathematics, Computer Science',
      school: 'Jawahar Navodaya Vidyalaya',
      location: 'Wayanad, Kerala',
      icon: <Landmark className="text-primary" size={20} />,
      details: [
        'Selected for Navodaya residential scholarship program, focusing on academic rigor and scientific foundations.',
        'Extensive practical programming in C++ and basic algorithm design.',
        'Active representation in inter-school science exhibitions and sports tournaments.'
      ]
    },
    {
      id: 'e3',
      date: '2015 - 2020',
      degree: 'Secondary School Leaving Certificate (SSLC)',
      major: 'General Academics',
      school: 'Jawahar Navodaya Vidyalaya',
      location: 'Wayanad, Kerala',
      icon: <Landmark className="text-secondaryAccent" size={20} />,
      details: [
        'Graduated with distinction and strong foundation in math, sciences, and analytical studies.'
      ]
    }
  ]

  return (
    <section id="education" className="relative py-24 overflow-hidden border-t border-white/5 bg-[#050816]">
      <div className="absolute bottom-[10%] left-[-15%] w-[350px] h-[350px] bg-primary/10 rounded-full filter blur-[130px] -z-10 animate-pulse-slow" />

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
            ACADEMICS
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-textPrimary font-heading"
          >
            Education Timeline
          </motion.h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto pl-8 border-l border-white/10 flex flex-col gap-12 text-left">
          {/* Timeline track overlay */}
          <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-accent to-transparent" />

          {educationList.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative"
            >
              {/* Dot */}
              <div className="absolute left-[-41px] top-4 w-[24px] h-[24px] rounded-full bg-[#050816] border-[3px] border-primary flex items-center justify-center z-10">
                <span className="w-2 h-2 rounded-full bg-accent" />
              </div>

              {/* Education Card */}
              <SpotlightCard className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 gap-2">
                    <span className="text-xs font-semibold text-accent font-mono">
                      {item.school}
                    </span>
                    <span className="text-xs font-semibold text-textSecondary bg-white/5 px-3 py-1 rounded-full border border-white/5">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-textPrimary font-heading mb-1">
                    {item.degree}
                  </h3>
                  <div className="text-sm font-semibold text-textSecondary mb-4">
                    {item.major} &mdash; <span className="text-textSecondary/60 font-medium">{item.location}</span>
                  </div>

                  <ul className="list-disc pl-4 text-sm text-textSecondary leading-relaxed flex flex-col gap-2 mt-2">
                    {item.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Education
