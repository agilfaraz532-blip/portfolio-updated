import React from 'react'
import {
  SiPython, SiDjango, SiReact, SiFastapi, SiDocker, SiKubernetes, SiLinux,
  SiPostgresql, SiMysql, SiGit, SiGithubactions, SiPrometheus, SiPytorch, SiTypescript,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

const stack = [
  { name: 'Python', icon: SiPython },
  { name: 'Django', icon: SiDjango },
  { name: 'React', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'FastAPI', icon: SiFastapi },
  { name: 'AWS', icon: FaAws },
  { name: 'Docker', icon: SiDocker },
  { name: 'Kubernetes', icon: SiKubernetes },
  { name: 'CI/CD', icon: SiGithubactions },
  { name: 'Prometheus', icon: SiPrometheus },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'MySQL', icon: SiMysql },
  { name: 'Linux', icon: SiLinux },
  { name: 'Git', icon: SiGit },
  { name: 'PyTorch', icon: SiPytorch },
]

export const TechMarquee = () => {
  // Duplicate the list so the -50% translate loops seamlessly
  const items = [...stack, ...stack]

  return (
    <div className="relative py-8 border-y border-white/[0.06] bg-bgDark/40 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {items.map(({ name, icon: Icon }, i) => (
          <span
            key={i}
            className="group flex items-center gap-3 px-8 text-sm font-medium text-textSecondary/70 hover:text-accent transition-colors whitespace-nowrap"
          >
            <Icon className="text-xl text-textSecondary/50 group-hover:text-accent transition-colors" />
            {name}
          </span>
        ))}
      </div>
    </div>
  )
}
export default TechMarquee
