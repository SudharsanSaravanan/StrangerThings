import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Navbar from './Navbar'

const Hero = () => {
  const heroRef = useRef(null)
  const revealRef = useRef(null)

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

  const navbarVariant = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 14 } },
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
    maskImage: `
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
    `,
    WebkitMaskImage: `
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
    `,
  }

  return (
    <div className="h-screen bg-cover bg-center bg-[url('/images/will1.webp')] relative overflow-hidden" ref={heroRef}>
      <motion.div variants={navbarVariant} initial="hidden" animate="visible">
        <Navbar />
      </motion.div>

      <div ref={revealRef} style={revealStyle} />
    </div>
  )
}

export default Hero