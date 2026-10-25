import React from 'react'
import { motion } from 'framer-motion'
import {
  SiPython, SiJavascript, SiTypescript, SiOpenjdk, SiC,
  SiDjango, SiReact, SiFastapi, SiTailwindcss, SiHtml5,
  SiDocker, SiKubernetes, SiGithubactions, SiLinux, SiGnubash, SiPrometheus, SiGrafana, SiNginx,
  SiPostgresql, SiMysql, SiGit, SiPostman, SiPytorch, SiOpencv,
} from 'react-icons/si'
import { FaAws, FaShieldAlt } from 'react-icons/fa'
import SectionHeader from './SectionHeader'

const groups = [
  {
    title: 'Languages',
    items: [
      { name: 'Python', icon: SiPython },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Java', icon: SiOpenjdk },
      { name: 'C', icon: SiC },
    ],
  },
  {
    title: 'Web & Frameworks',
    items: [
      { name: 'Django', icon: SiDjango },
      { name: 'React', icon: SiReact },
      { name: 'FastAPI', icon: SiFastapi },
      { name: 'Tailwind', icon: SiTailwindcss },
      { name: 'HTML / CSS', icon: SiHtml5 },
    ],
  },
  {
    title: 'DevOps & Cloud',
    items: [
      { name: 'AWS', icon: FaAws },
      { name: 'Docker', icon: SiDocker },
      { name: 'Kubernetes', icon: SiKubernetes },
      { name: 'CI/CD', icon: SiGithubactions },
      { name: 'Linux', icon: SiLinux },
      { name: 'Bash', icon: SiGnubash },
      { name: 'Prometheus', icon: SiPrometheus },
      { name: 'Grafana', icon: SiGrafana },
      { name: 'Nginx', icon: SiNginx },
    ],
  },
  {
    title: 'Data, Tools & AI',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MySQL', icon: SiMysql },
      { name: 'Git', icon: SiGit },
      { name: 'Postman', icon: SiPostman },
      { name: 'PyTorch', icon: SiPytorch },
      { name: 'OpenCV', icon: SiOpencv },
      { name: 'Security', icon: FaShieldAlt },
    ],
  },
]

const ease = [0.22, 1, 0.36, 1]

export const Skills = () => {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      <div className="glow-orb top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <SectionHeader
          index="02"
          label="Expertise"
          title="My Skills"
          description="Technologies and tools I use to design, build, ship and monitor software."
        />

        <div className="flex flex-col gap-10">
          {groups.map((group, gi) => (
            <div key={group.title} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease }}
                className="lg:col-span-3 flex items-center gap-3 lg:pt-4"
              >
                <span className="font-mono text-xs text-accent">0{gi + 1}</span>
                <h3 className="font-heading text-lg font-semibold text-textPrimary">{group.title}</h3>
              </motion.div>

              <motion.div
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-60px' }}
                variants={{ show: { transition: { staggerChildren: 0.05 } } }}
                className="lg:col-span-9 grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-7 gap-3"
              >
                {group.items.map(({ name, icon: Icon }) => (
                  <motion.div
                    key={name}
                    variants={{
                      hidden: { opacity: 0, y: 20, scale: 0.95 },
                      show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease } },
                    }}
                    whileHover={{ y: -6 }}
                    className="group relative aspect-square rounded-xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.01] flex flex-col items-center justify-center gap-3 transition-[border-color,box-shadow] duration-300 hover:border-primary/60 hover:shadow-[0_0_30px_-6px_rgba(59,130,246,0.7)]"
                  >
                    <Icon className="text-2xl md:text-[1.75rem] text-textSecondary transition-all duration-300 group-hover:text-accent group-hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.9)]" />
                    <span className="text-[11px] md:text-xs text-textSecondary group-hover:text-textPrimary transition-colors text-center px-1">
                      {name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Skills
