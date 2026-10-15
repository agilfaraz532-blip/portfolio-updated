import React from 'react'

const stack = [
  'Python', 'Django', 'React', 'REST APIs', 'AWS', 'Docker', 'CI/CD',
  'PostgreSQL', 'MySQL', 'Linux', 'Git', 'Java', 'Deep Learning', 'Grad-CAM',
]

export const TechMarquee = () => {
  // Duplicate the list so the -50% translate loops seamlessly
  const items = [...stack, ...stack]

  return (
    <div className="relative py-6 border-y border-white/5 bg-bgDark overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 text-sm md:text-base font-heading font-semibold tracking-[0.2em] uppercase text-textSecondary hover:text-accent transition-colors whitespace-nowrap"
          >
            {item}
            <span className="text-primary text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
export default TechMarquee
