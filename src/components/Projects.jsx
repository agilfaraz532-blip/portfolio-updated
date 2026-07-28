import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, ChevronDown, ChevronUp, Shield, Code, Brain, Globe, Database, Cpu } from 'lucide-react'
import SpotlightCard from './SpotlightCard'

export const Projects = () => {
  const [filter, setFilter] = useState('all')
  const [expandedId, setExpandedId] = useState(null)

  const projectsList = [
    {
      id: 'p1',
      title: 'Chest Pathology Detection using DL',
      category: 'ai',
      badge: 'Deep Learning & AI',
      image: 'images/chest_detection.jpg',
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
      github: 'https://github.com',
      demo: '#contact'
    },
    {
      id: 'p2',
      title: 'Secure Healthcare Management System',
      category: 'security',
      badge: 'Security & Web',
      image: 'images/healthcare_system.jpg',
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
      github: 'https://github.com',
      demo: '#contact'
    },
    {
      id: 'p3',
      title: 'LLM Shield: Prompt Injection Guard',
      category: 'ai',
      badge: 'AI & Security',
      tags: ['FastAPI', 'Redis', 'Transformers', 'Regex', 'SentenceTransformers'],
      shortDesc: 'Real-time middleware proxy detecting and blocking prompt injections, jailbreaks, and PII leaks on LLM integrations.',
      problem: 'Enterprise LLM deployments are vulnerable to prompt injections, indirect inputs, and leakage of credentials or customer PII.',
      solution: 'Built a low-latency proxy engine that intercepts queries, runs semantic cosine matching against vector anomaly logs, applies jailbreak regex models, and masks PII before forwarding payloads.',
      features: [
        'Sub-20ms preprocessing latency for LLM integrations.',
        'PII scrubbing (removes API keys, SSNs, and phone numbers).',
        'Semantic anomaly scoring using vector embeddings.',
        'Heuristic classification to identify jailbreaks.'
      ],
      techStack: 'Python, FastAPI, Hugging Face Transformers, Redis, SentenceTransformers, Docker',
      github: 'https://github.com',
      demo: '#contact'
    },
    {
      id: 'p4',
      title: 'PySniff Packet Inspector',
      category: 'security',
      badge: 'Security / Network',
      tags: ['Python', 'Raw Sockets', 'Scapy', 'Wireshark Integration'],
      shortDesc: 'Low-overhead network sniffer capturing raw sockets, parsing headers, and exporting CSV logs.',
      problem: 'Heavy graphical packet interceptors load down servers and cannot run headless over SSH terminals easily.',
      solution: 'Wrote a terminal-native raw socket sniffer that decodes TCP, UDP, and ICMP protocols. Outputs clean session headers and writes standard capture logs for Wireshark analysis.',
      features: [
        'Decodes IP, TCP, UDP, and ICMP headers in real-time.',
        'Minimal memory footprint suitable for embedded router nodes.',
        'Writes standard CSV packet streams.',
        'Live terminal dashboard with packet classification filters.'
      ],
      techStack: 'Python, Socket library, Struct packing, Scapy core, Command line interface',
      github: 'https://github.com',
      demo: '#contact'
    },
    {
      id: 'p5',
      title: 'VulnGuard Automatic Scanner',
      category: 'security',
      badge: 'Security / Scripting',
      tags: ['Python', 'Nmap API', 'VulnDB API', 'JSON'],
      shortDesc: 'Automation script triggering Nmap scans and comparing active service banners against global CVE databases.',
      problem: 'Conducting network recon, host discovery, and cross-referencing CVE vulnerabilities manually takes hours.',
      solution: 'Built an automation utility that drives network port scans, parses service headers, and calls VulnDB APIs to identify known exploits and vulnerabilities.',
      features: [
        'Asynchronous port scanner capable of audit sweeps.',
        'Resolves service banner specs to match known CVE databases.',
        'Generates rich JSON/HTML audit reports.',
        'Automatic severity classification (CVSS scoring).'
      ],
      techStack: 'Python, python-nmap wrapper, Requests API, CVE Search engines, JSON parser',
      github: 'https://github.com',
      demo: '#contact'
    },
    {
      id: 'p6',
      title: 'SecurePass Crypt Vault',
      category: 'programming',
      badge: 'Programming / Desktop',
      tags: ['Java', 'JCE Extension', 'AES-256', 'SQLite'],
      shortDesc: 'Desktop credential manager encrypting secrets locally with PBKDF2 master hashes and AES ciphers.',
      problem: 'Cloud-based password management sites are high-value targets for data theft and data breaches.',
      solution: 'Designed a Java database locker utilizing the Java Cryptography Extension (JCE). Derives master keys via PBKDF2 hashing, and encrypts credential rows locally with AES-256 before writing to database.',
      features: [
        '100% offline database locking with zero network queries.',
        'PBKDF2 key derivation from user master password.',
        'Automatic database locking on window focus loss.',
        'Integrated password strength calculator.'
      ],
      techStack: 'Java, JCE, SQLite, JavaFX, PBKDF2, AES-256',
      github: 'https://github.com',
      demo: '#contact'
    },
    {
      id: 'p7',
      title: 'ConSys File Audit Utility',
      category: 'programming',
      badge: 'Programming / Systems',
      tags: ['C Language', 'Windows API', 'Pthreads', 'I/O Buffering'],
      shortDesc: 'Headless C systems utility tracking real-time directory changes using multi-threaded event handlers.',
      problem: 'Filing changes on system folders can go unnoticed, creating potential vectors for directory compromise.',
      solution: 'Wrote a low-level diagnostic utility in C that leverages Windows API directory handles. Spawns asynchronous worker threads to print and write system change logs with sub-millisecond timestamps.',
      features: [
        'Spawns POSIX threads to manage file modification streams.',
        'Sub-millisecond timestamps mapping file writes.',
        'Low system resource usage (less than 5MB RAM overhead).',
        'Thread-safe logging buffers.'
      ],
      techStack: 'C Programming, Windows system handles, Pthreads, Buffer manipulation',
      github: 'https://github.com',
      demo: '#contact'
    },
    {
      id: 'p8',
      title: 'Vite Premium Portfolio',
      category: 'web',
      badge: 'Web & Animation',
      tags: ['React 19', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
      shortDesc: 'High-fps futuristic portfolio featuring 3D particle canvas, spotlight cards, and custom scroll animations.',
      problem: 'Standard static HTML portfolios lack modular structure and smooth interactive features that reflect design-centric coding.',
      solution: 'Rebuilt this portfolio using React 19 and Vite. Utilizes Tailwind for layout structures, Framer Motion for state changes, GSAP, and a custom Three.js particle canvas.',
      features: [
        'Custom Three.js particle mesh with mouse displacement.',
        'Framer Motion layout transitions and page reveals.',
        'Responsive layout scaling from mobile viewports to 4K displays.',
        'Clean structure with separate concerns.'
      ],
      techStack: 'React 19, Vite, Tailwind CSS, Framer Motion, GSAP, Three.js, Lucide Icons',
      github: 'https://github.com',
      demo: '#home'
    }
  ]

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'security', label: 'Cyber Security' },
    { id: 'ai', label: 'Artificial Intelligence' },
    { id: 'programming', label: 'Programming / Systems' },
    { id: 'web', label: 'Web Apps' }
  ]

  const filteredProjects = projectsList.filter(p => filter === 'all' || p.category === filter)

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Helper to render inline mockup graphics when actual image is missing
  const renderCardGraphic = (project) => {
    if (project.image) {
      return (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      )
    }

    // Custom CSS mockups for other projects
    return (
      <div className="w-full h-full bg-gradient-to-br from-[#0e1630] to-[#050816] flex flex-col items-center justify-center p-6 relative overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:20px_20px] opacity-25" />
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center mb-3">
          {project.category === 'security' && <Shield className="text-accent" size={32} />}
          {project.category === 'ai' && <Brain className="text-accent" size={32} />}
          {project.category === 'programming' && <Code className="text-primary" size={32} />}
          {project.category === 'web' && <Globe className="text-accent" size={32} />}
        </div>
        <div className="text-xs font-mono text-textSecondary uppercase tracking-widest">{project.badge}</div>
      </div>
    )
  }

  return (
    <section id="projects" className="relative py-24 overflow-hidden border-t border-white/5 bg-[#050816]">
      <div className="absolute top-[10%] left-[-10%] w-[350px] h-[350px] bg-primary/10 rounded-full filter blur-[130px] -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-xs font-semibold tracking-[0.25em] text-accent uppercase block mb-3 font-heading"
          >
            PORTFOLIO
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-5xl font-bold tracking-tight text-textPrimary font-heading"
          >
            Featured Engineering Work
          </motion.h2>
        </div>

        {/* Category Filter Bar */}
        <div className="flex justify-center flex-wrap gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setFilter(cat.id)
                setExpandedId(null)
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold font-heading tracking-wider uppercase border transition-all duration-300 ${
                filter === cat.id
                  ? 'bg-primary border-primary text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]'
                  : 'bg-white/5 border-white/10 text-textSecondary hover:border-accent hover:text-textPrimary'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <SpotlightCard className="h-full flex flex-col justify-between p-0 overflow-hidden">
                <div>
                  {/* Card Visual Header */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/40">
                    <div className="absolute top-4 left-4 bg-[#050816]/95 border border-white/10 px-3 py-1 rounded-full backdrop-blur-md z-20 text-[10px] font-semibold text-accent uppercase tracking-widest">
                      {project.badge}
                    </div>
                    {renderCardGraphic(project)}
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded text-[10px] font-semibold font-mono bg-white/5 border border-white/5 text-textSecondary">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold tracking-tight text-textPrimary font-heading mb-3">
                      {project.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-sm text-textSecondary leading-relaxed mb-6">
                      {project.shortDesc}
                    </p>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="border-t border-white/5 px-6 py-4 flex flex-col gap-4 bg-black/10">
                  {/* Core Action Links */}
                  <div className="flex justify-between items-center w-full">
                    <div className="flex gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-textSecondary hover:text-accent transition-colors flex items-center gap-1 text-xs font-semibold"
                      >
                        <Github size={15} /> GitHub
                      </a>
                      <a
                        href={project.demo}
                        className="text-textSecondary hover:text-accent transition-colors flex items-center gap-1 text-xs font-semibold"
                      >
                        <ExternalLink size={15} /> Live Demo
                      </a>
                    </div>

                    <button
                      onClick={() => toggleExpand(project.id)}
                      className="text-accent hover:text-primary transition-colors flex items-center gap-1 text-xs font-semibold font-heading"
                    >
                      {expandedId === project.id ? (
                        <>Collapse <ChevronUp size={15} /></>
                      ) : (
                        <>Read Details <ChevronDown size={15} /></>
                      )}
                    </button>
                  </div>

                  {/* Expandable Technical Details Panel */}
                  <AnimatePresence>
                    {expandedId === project.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: 'easeInOut' }}
                        className="overflow-hidden border-t border-white/5 pt-4 text-xs font-sans text-textSecondary flex flex-col gap-4 text-left"
                      >
                        <div>
                          <span className="font-bold text-textPrimary uppercase tracking-wide block mb-1">Problem</span>
                          <p className="leading-relaxed">{project.problem}</p>
                        </div>
                        <div>
                          <span className="font-bold text-textPrimary uppercase tracking-wide block mb-1">Solution</span>
                          <p className="leading-relaxed">{project.solution}</p>
                        </div>
                        <div>
                          <span className="font-bold text-textPrimary uppercase tracking-wide block mb-1">Key Features</span>
                          <ul className="list-disc pl-4 leading-relaxed flex flex-col gap-1 mt-1">
                            {project.features.map((feature, fIdx) => (
                              <li key={fIdx}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <span className="font-bold text-textPrimary uppercase tracking-wide block mb-1">Full Tech Stack</span>
                          <p className="leading-relaxed font-mono text-[10px] text-accent">{project.techStack}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default Projects
