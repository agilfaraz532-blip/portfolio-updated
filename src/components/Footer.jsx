import React from 'react'
import { Github, Linkedin, Mail, Phone, MapPin, MessageSquare, ArrowUp } from 'lucide-react'

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <footer className="relative pt-16 pb-12 bg-[#030611] border-t border-white/5 overflow-hidden text-left">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-primary/10 rounded-full filter blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Multi-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-white/5 items-start">
          {/* Column 1: Branding */}
          <div className="flex flex-col gap-3">
            <span className="font-heading text-2xl font-bold tracking-wider text-textPrimary">
              faraz<span className="text-accent">.sec</span>
            </span>
            <p className="text-xs text-textSecondary leading-relaxed max-w-xs font-sans">
              Cyber Security Engineer &amp; AI Security Researcher. Designing resilient systems and auditing threat vectors.
            </p>
          </div>

          {/* Column 2: Contact Info Details */}
          <div className="flex flex-col gap-3.5">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest">Contact Details</span>
            <div className="flex flex-col gap-2.5 text-xs text-textSecondary font-sans">
              <a href="mailto:agilfaraz532@gmail.com" className="flex items-center gap-2.5 hover:text-accent transition-colors">
                <Mail size={14} className="text-primary" /> agilfaraz532@gmail.com
              </a>
              <a href="tel:+917558043694" className="flex items-center gap-2.5 hover:text-accent transition-colors">
                <Phone size={14} className="text-accent" /> +91 7558043694
              </a>
              <span className="flex items-center gap-2.5">
                <MapPin size={14} className="text-secondaryAccent" /> Panamaram, Wayanad, Kerala
              </span>
              <a href="https://wa.me/917558043694" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 text-green-400 hover:underline">
                <MessageSquare size={14} /> Direct WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Column 3: Social & Action */}
          <div className="flex flex-col gap-4 items-start md:items-end">
            <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest md:text-right w-full">Connect</span>
            <div className="flex items-center gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 border border-white/5 rounded-full hover:text-accent hover:border-accent/40 transition-all" aria-label="GitHub">
                <Github size={16} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-white/5 border border-white/5 rounded-full hover:text-accent hover:border-accent/40 transition-all" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
            <button
              onClick={scrollToTop}
              className="mt-2 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-accent hover:-translate-y-0.5 transition-all text-accent flex items-center justify-center shadow-lg self-start md:self-end"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-xs text-textSecondary/40 font-sans">
            &copy; 2026 Agil Faraz. All rights reserved.
          </span>
          <span className="text-[10px] font-mono text-textSecondary/30">
            SECURE_PORTAL // VER_1.0
          </span>
        </div>
      </div>
    </footer>
  )
}
export default Footer
