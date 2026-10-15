import React, { useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import BackgroundCanvas from './components/BackgroundCanvas'
import CustomCursor from './components/CustomCursor'
import GoldDust from './components/GoldDust'
import TechMarquee from './components/TechMarquee'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Research from './components/Research'
import Education from './components/Education'
import Achievements from './components/Achievements'
import Footer from './components/Footer'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      <LoadingScreen onComplete={() => setIsLoading(false)} />

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative min-h-screen"
        >
          <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-secondaryAccent via-primary to-accent shadow-[0_0_12px_rgba(234,179,8,0.7)] z-[9999] origin-left"
            style={{ scaleX }}
          />

          <BackgroundCanvas />

          <GoldDust />

          <CustomCursor />

          <Navbar />

          <main>
            <Hero />
            <TechMarquee />
            <About />
            <Skills />
            <Projects />
            <Research />
            <Education />
            <Achievements />
          </main>

          <Footer />
        </motion.div>
      )}
    </>
  )
}

export default App
