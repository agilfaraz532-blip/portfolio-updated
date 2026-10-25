import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, Plus, Minus, ArrowUpRight } from 'lucide-react'
import SectionHeader from './SectionHeader'

export const Projects = () => {
  const [filter, setFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)
  const githubProfile = 'https://github.com/agilfaraz532-blip'

  const projectsList = [
    {
      id: 'p1',
      title: 'K8sPulse: Kubernetes Monitoring Dashboard',
      category: 'devops',
      badge: 'DevOps & AI',
      image: 'images/k8pulse',
      tags: ['FastAPI', 'React + TS', 'Kubernetes', 'Prometheus', 'Grafana', 'Ollama'],
      shortDesc: 'Full-stack Kubernetes observability dashboard with a live alert engine and an AI SRE copilot that explains incidents.',
      problem: 'Cluster problems like CrashLoopBackOff pods, memory pressure or NotReady nodes are scattered across kubectl output, metrics and logs, which slows down diagnosis.',
      solution: 'Built a FastAPI backend that reads the cluster live through the Kubernetes API and metrics-server, stores history in Prometheus, evaluates alert rules, and streams AI analysis from a local Ollama model with Gemini as a fallback, all behind a React dashboard.',
      features: [
        'Live inventory of nodes, pods, deployments, services, namespaces and events.',
        'Alert engine for CPU, memory, failing pods, restarts and NotReady nodes, with hold times and auto-resolve.',
        'AI SRE copilot streaming cluster or per-pod analysis (Ollama first, Gemini fallback).',
        'Pod log viewer with search, auto-provisioned Grafana dashboards and JWT authentication.'
      ],
      techStack: 'Python, FastAPI, SQLAlchemy, PostgreSQL, Kubernetes client, Prometheus, Grafana, React, TypeScript, Recharts, Docker Compose, nginx',
      github: 'https://github.com/agilfaraz532-blip/k8pulse',
      demo: null
    },
    {
      id: 'p2',
      title: 'Chest Pathology Detection using DL',
      category: 'ai',
      badge: 'Deep Learning & AI',
      image: 'images/chest_detection',
      tags: ['Python', 'PyTorch', 'Grad-CAM', 'LIME', 'ResNet-50'],
      shortDesc: 'Ensemble deep learning model achieving 97% accuracy on 10K+ chest X-ray classifications with diagnostic transparency.',
      problem: 'Chest X-ray diagnostic analysis suffers from high clinical triage delays and human error rates under strain.',
      solution: 'Engineered a deep neural network ensemble (ResNet-50, DenseNet-121, EfficientNet-B0) to automate lung pathology classification, integrating Explainable AI (Grad-CAM and LIME) to highlight diagnostic regions visually.',
      features: [
        '97.2% classification accuracy on clinical chest image sets.',
        'Grad-CAM/LIME heatmaps overlaying lungs for neural interpretability.',
        'Robust data preprocessing (normalization, CLAHE contrast mapping).',
        'Asynchronous prediction pipeline for low-latency clinic triage.'
      ],
      techStack: 'Python, PyTorch, Torchvision, OpenCV, Grad-CAM, LIME, NumPy, Matplotlib',
      github: 'https://github.com/agilfaraz532-blip/chest-pathology-',
      demo: null
    },
    {
      id: 'p3',
      title: 'GENZ Mens Fashion Store',
      category: 'web',
      badge: 'Web & Animation',
      image: 'images/cloth_store',
      tags: ['React', 'TypeScript', 'GSAP', 'Lenis', 'Tailwind CSS', 'Express'],
      shortDesc: 'Live, animation-rich storefront for a Wayanad menswear brand with a 3D hero, lookbook and flash-sale campaigns.',
      problem: 'A local clothing store needed an online presence that feels like a fashion brand rather than a generic template, and that drives customers to WhatsApp and the physical store.',
      solution: 'Designed and built a single-page storefront in React and TypeScript with GSAP and Lenis smooth-scroll animations, a 3D fashion scene, and an Express server, deployed on Vercel.',
      features: [
        'Preloader, text reveals, marquee ticker and cursor spotlight animations.',
        '3D fashion scene, editorial card stack and lookbook sections.',
        'Flash-sale banner and floating WhatsApp / Instagram actions for conversions.',
        'Fully responsive and deployed to production on Vercel.'
      ],
      techStack: 'React, TypeScript, Vite, Tailwind CSS, GSAP, Motion, Lenis, Express, Google GenAI SDK, Vercel',
      github: 'https://github.com/agilfaraz532-blip/Cloth-Store-Website-official',
      demo: 'https://cloth-store-website-official.vercel.app'
    },
    {
      id: 'p4',
      title: 'Secure Healthcare Management System',
      category: 'web',
      badge: 'Security & Web',
      image: 'images/healthcare_system',
      tags: ['Python', 'Django', 'MySQL', 'Cryptography', 'RBAC'],
      shortDesc: 'HIPAA-compliant web portal featuring robust Role-Based Access Control, database encryption, and multi-factor login.',
      problem: 'Healthcare portals regularly leak patient records due to weak authentication and lack of encryption, violating compliance laws.',
      solution: 'Developed a robust medical portal using Django and MySQL. Implemented column-level AES-256 encryption for database values, Strict Role-Based Access Controls (RBAC), multi-factor login, and immutable transaction audit logs.',
      features: [
        'Strict compliance with HIPAA security and audit logging standards.',
        'Database column-level encryption for patient medical history.',
        'Multi-factor authentication (MFA) via TOTP tokens.',
        'Granular RBAC layers (Doctor, Patient, Auditor, Administrator).'
      ],
      techStack: 'Python, Django Framework, MySQL, PyCryptodome, TOTP, Bootstrap, HTML5, CSS3',
      github: null,
      demo: null
    },
    {
      id: 'p5',
      title: 'ResumeIQ: AI Resume Screening',
      category: 'ai',
      badge: 'AI & Web App',
      image: 'images/resumeiq',
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'Vite'],
      shortDesc: 'AI-powered ATS resume screening and recruitment platform that matches resumes against job requirements.',
      problem: 'Recruiters spend hours manually filtering resumes, and good candidates get missed when keyword filters are too rigid.',
      solution: 'Building an AI-assisted applicant tracking platform with a React and TypeScript frontend that screens resumes against job requirements and helps recruiters shortlist candidates.',
      features: [
        'React + TypeScript single-page app with client-side routing.',
        'Reusable Tailwind component system (CVA, clsx, tailwind-merge).',
        'Resume-to-job matching flow for AI screening and shortlisting.',
        'Built with Vite for fast development and builds.'
      ],
      techStack: 'React, TypeScript, Vite, Tailwind CSS, React Router, class-variance-authority, Lucide Icons',
      github: 'https://github.com/agilfaraz532-blip/resumeiq-ai',
      demo: null
    },
    {
      id: 'p6',
      title: 'Linux & Shell Scripting Labs',
      category: 'devops',
      badge: 'DevOps Foundations',
      image: 'images/linux_labs',
      tags: ['Linux', 'Bash', 'Shell Scripting', 'File System', 'Permissions'],
      shortDesc: 'Hands-on machine tests covering Linux file management, permissions and interactive Bash scripts.',
      problem: 'DevOps work depends on being fluent at the command line: navigating the file system, managing permissions and automating tasks with scripts.',
      solution: 'Completed and documented a series of timed Linux machine tests and shell-scripting exercises, capturing each session as evidence of the workflow.',
      features: [
        'File and directory management: create, copy, move, rename and remove.',
        'Executable permissions with chmod and running scripts safely.',
        'Interactive Bash scripts that read user input and print formatted output.',
        'System-info scripts using built-in commands like whoami.'
      ],
      techStack: 'Linux (Ubuntu / WSL), Bash, nano, coreutils, chmod, Git',
      github: 'https://github.com/agilfaraz532-blip/shell-scrpting',
      extraLink: { label: 'Linux Labs', href: 'https://github.com/agilfaraz532-blip/linux-commands-practice' },
      demo: null
    }
  ]

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'devops', label: 'DevOps & Cloud' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'web', label: 'Full Stack & Web' }
  ]

  const filteredProjects = projectsList.filter(p => filter === 'all' || p.category === filter)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  const ease = [0.22, 1, 0.36, 1]

  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <div className="glow-orb top-[15%] right-[-10%] w-[500px] h-[500px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-4">
          <SectionHeader
            index="03"
            label="Selected work"
            title="Featured Projects"
            description="From Kubernetes observability to deep-learning diagnostics and production web apps."
          />

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => { setFilter(cat.id); setExpandedId(null) }}
                className={`relative px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-colors ${
                  filter === cat.id ? 'text-white' : 'text-textSecondary hover:text-white border border-white/10'
                }`}
              >
                {filter === cat.id && (
                  <motion.span
                    layoutId="projectFilter"
                    className="absolute inset-0 rounded-lg bg-primary shadow-[0_0_20px_-4px_rgba(59,130,246,0.9)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => {
              const featured = filter === 'all' && i === 0
              const primaryLink = project.demo || project.github || githubProfile
              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, ease, delay: i * 0.05 }}
                  className={`group relative rounded-2xl overflow-hidden border border-white/[0.08] bg-surface/60 transition-[border-color,box-shadow] duration-500 hover:border-primary/50 hover:shadow-[0_30px_60px_-20px_rgba(59,130,246,0.45)] ${
                    featured ? 'md:col-span-2' : ''
                  }`}
                >
                  {/* Image with title overlay */}
                  <div className={`relative overflow-hidden ${featured ? 'aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]' : 'aspect-[4/3] sm:aspect-[16/10]'}`}>
                    <img
                      src={`${project.image}-1280.webp`}
                      srcSet={`${project.image}-640.webp 640w, ${project.image}-1280.webp 1280w`}
                      sizes={featured ? '(min-width: 1280px) 1216px, 100vw' : '(min-width: 768px) 50vw, 100vw'}
                      width="1280"
                      height="720"
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bgDark via-bgDark/60 to-transparent" />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/[0.06] transition-colors duration-500" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-bgDark/80 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-accent">
                        {project.badge}
                      </span>
                      {featured && (
                        <span className="px-2.5 py-1 rounded-md bg-primary text-[10px] font-mono uppercase tracking-widest text-white">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 md:p-8">
                      <h3 className={`font-heading font-semibold text-white tracking-tight mb-2 ${featured ? 'text-xl sm:text-2xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                        {project.title}
                      </h3>
                      <p className={`text-sm text-textSecondary leading-relaxed ${featured ? 'max-w-2xl' : 'line-clamp-2'}`}>
                        {project.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="px-6 md:px-8 pb-6">
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded text-[11px] font-mono text-textSecondary bg-white/[0.04] border border-white/[0.06]">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between gap-4 pt-5 border-t border-white/[0.06]">
                      <a
                        href={primaryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-white transition-colors"
                      >
                        View Project
                        <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>

                      <div className="flex items-center gap-4">
                        {project.github && (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`} className="text-textSecondary hover:text-white transition-colors">
                            <Github size={17} />
                          </a>
                        )}
                        {project.extraLink && (
                          <a href={project.extraLink.href} target="_blank" rel="noopener noreferrer" className="text-xs text-textSecondary hover:text-white transition-colors">
                            {project.extraLink.label}
                          </a>
                        )}
                        {project.demo && (
                          <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} live site`} className="text-textSecondary hover:text-white transition-colors">
                            <ExternalLink size={17} />
                          </a>
                        )}
                        <button
                          onClick={() => toggleExpand(project.id)}
                          aria-expanded={expandedId === project.id}
                          className="inline-flex items-center gap-1 text-xs font-medium text-textSecondary hover:text-white transition-colors"
                        >
                          {expandedId === project.id ? <Minus size={14} /> : <Plus size={14} />} Details
                        </button>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {expandedId === project.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease }}
                          className="overflow-hidden"
                        >
                          <div className={`pt-6 grid gap-6 text-sm text-textSecondary ${featured ? 'md:grid-cols-3' : ''}`}>
                            <div>
                              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-2">Problem</div>
                              <p className="leading-relaxed">{project.problem}</p>
                            </div>
                            <div>
                              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-2">Solution</div>
                              <p className="leading-relaxed">{project.solution}</p>
                            </div>
                            <div>
                              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent mb-2">Key features</div>
                              <ul className="flex flex-col gap-1.5">
                                {project.features.map((f) => (
                                  <li key={f} className="flex gap-2 leading-relaxed">
                                    <span className="mt-2 w-1 h-1 rounded-full bg-accent shrink-0" />
                                    {f}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <p className="mt-5 font-mono text-[11px] text-textSecondary/80">{project.techStack}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 text-center">
          <a
            href={githubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-glow inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold text-textPrimary"
          >
            <Github size={16} /> More on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
export default Projects
