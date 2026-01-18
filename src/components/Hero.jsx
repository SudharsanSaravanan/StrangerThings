import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const Hero = () => {
  const heroRef = useRef(null)
  const revealRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const hero = heroRef.current
    const reveal = revealRef.current
    if (!hero || !reveal) return
    let mouseX = 0
    let mouseY = 0
    let x = 0
    let y = 0
    let visible = false
    const animate = () => {
      x += (mouseX - x) * 0.05
      y += (mouseY - y) * 0.05
      reveal.style.setProperty('--x', `${x}px`)
      reveal.style.setProperty('--y', `${y}px`)
      requestAnimationFrame(animate)
    }
    animate()
    const move = (e) => {
      const rect = hero.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
      if (!visible) {
        visible = true
        reveal.style.opacity = '1'
      }
    }
    const leave = () => {
      visible = false
      reveal.style.opacity = '0'
    }
    hero.addEventListener('mousemove', move)
    hero.addEventListener('mouseleave', leave)
    return () => {
      hero.removeEventListener('mousemove', move)
      hero.removeEventListener('mouseleave', leave)
    }
  }, [])

  const getMaskImage = () => {
    if (isMobile) {
      // Smaller cursor/reveal circles for mobile (scaled down ~50%)
      return `
        radial-gradient(circle 100px at var(--x) var(--y),
        rgba(255,255,255,1) 0%,
        rgba(255,255,255,0.6) 40%,
        transparent 70%),
        radial-gradient(circle 125px at calc(var(--x) + 25px) calc(var(--y) - 20px),
        rgba(255,255,255,0.8) 0%,
        rgba(255,255,255,0.4) 40%,
        transparent 70%),
        radial-gradient(circle 50px at calc(var(--x) - 25px) calc(var(--y) + 15px),
        rgba(255,255,255,0.6) 0%,
        rgba(255,255,255,0.3) 40%,
        transparent 70%)
      `
    }
    // Original sizes for desktop
    return `
      radial-gradient(circle 200px at var(--x) var(--y),
      rgba(255,255,255,1) 0%,
      rgba(255,255,255,0.6) 40%,
      transparent 70%),
      radial-gradient(circle 250px at calc(var(--x) + 50px) calc(var(--y) - 40px),
      rgba(255,255,255,0.8) 0%,
      rgba(255,255,255,0.4) 40%,
      transparent 70%),
      radial-gradient(circle 100px at calc(var(--x) - 50px) calc(var(--y) + 30px),
      rgba(255,255,255,0.6) 0%,
      rgba(255,255,255,0.3) 40%,
      transparent 70%)
    `
  }

  const revealStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: "url('/images/v5.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    pointerEvents: 'none',
    opacity: 0,
    transition: 'opacity 0.55s ease',
    maskImage: getMaskImage(),
    WebkitMaskImage: getMaskImage(),
  }

  const scrollToWatch = () => {
    const watchSection = document.getElementById('watch-section')
    if (watchSection) {
      watchSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToEpisodes = () => {
    const episodesSection = document.querySelector('.episodes-header') // Target the header in EpisodesList
    if (episodesSection) {
      episodesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 },
    },
  }

  const item = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  }

  return (
    <div className="h-screen bg-cover bg-center bg-[url('/images/will1.png')] relative overflow-hidden" ref={heroRef}>
      <div ref={revealRef} style={revealStyle} />
      {/* Bottom blur overlay for Netflix-like effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-[url('/images/will1.png')] blur-2xl z-0" // Increased blur from blur-xl to blur-2xl
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, transparent 30%, black 100%)', // Increased spread by starting blur at 30% instead of 60%
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, transparent 30%, black 100%)'
        }}
      />
      {/* Netflix-style Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 z-5" />
      <motion.div
        className="absolute left-4 sm:left-6 md:left-8 lg:left-10 bottom-8 sm:bottom-10 md:bottom-16 lg:bottom-30 flex flex-col gap-1 text-left z-10 max-w-[90vw] sm:max-w-md md:max-w-lg" // Responsive positioning and max-width; reduced bottom for mobile
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* Logo - smaller on mobile */}
        <motion.div variants={item} className="mb-0">
          <img
            src="/images/stranger-things-logo.png"
            alt="Stranger Things"
            className="h-16 sm:h-20 md:h-24 lg:h-30 xl:h-40 w-auto drop-shadow-2xl [filter:drop-shadow(0_0_20px_rgba(255,0,0,0.5))]" // Responsive heights
          />
        </motion.div>
        {/* Genres - already responsive, but ensure smaller base */}
        <motion.div variants={item} className="mb-1">
          <div className="flex flex-wrap gap-1 sm:gap-2 text-xs sm:text-sm text-gray-300"> {/* Smaller gap on mobile */}
            <span>2016</span>
            <span>•</span>
            <span>★ 8.7</span>
            <span>•</span>
            <span className="text-red-400">Sci-Fi & Fantasy</span>
            <span>•</span>
            <span>Mystery</span>
            <span>•</span>
            <span>Action & Adventure</span>
          </div>
        </motion.div>
        {/* Description - smaller text on mobile */}
        <motion.p
          variants={item}
          className="text-xs sm:text-sm lg:text-base text-gray-200 leading-relaxed [text-shadow:0_0_10px_rgba(255,255,255,0.3)] max-w-[85vw] sm:max-w-none" // Responsive text size and wrap control
        >
          When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.
        </motion.p>
      </motion.div>
    </div>
  )
}

export default Hero