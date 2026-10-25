import React, { Suspense, lazy, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import BackgroundCanvas from './components/BackgroundCanvas'
import CustomCursor from './components/CustomCursor'
import TechMarquee from './components/TechMarquee'
import Hero from './components/Hero'

// Below-the-fold sections load as separate chunks so the first screen paints sooner
const About = lazy(() => import('./components/About'))
const Skills = lazy(() => import('./components/Skills'))
const Projects = lazy(() => import('./components/Projects'))
const Research = lazy(() => import('./components/Research'))
const Achievements = lazy(() => import('./components/Achievements'))
const Footer = lazy(() => import('./components/Footer'))

const SectionFallback = () => <div className="min-h-[60vh]" aria-hidden="true" />

function App() {
  const [showIntro, setShowIntro] = useState(true)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {showIntro && <LoadingScreen onComplete={() => setShowIntro(false)} />}

      <div className="relative min-h-screen">
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#2563EB] via-primary to-accent z-[9999] origin-left"
          style={{ scaleX }}
        />

        <BackgroundCanvas />

        <CustomCursor />

        <Navbar />

        <main>
          <Hero />
          <TechMarquee />
          <Suspense fallback={<SectionFallback />}>
            <About />
            <Skills />
            <Projects />
            <Research />
            <Achievements />
          </Suspense>
        </main>

        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  )
}

export default App
