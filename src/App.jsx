// App.jsx
import React, { useState, useEffect } from 'react'
import Hero from './components/Hero'
import WatchStrangerThings from './components/WatchStrangerThings'

function App() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // Laptop breakpoint: below 1024px is mobile/tablet, above is laptop/desktop
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="bg-black">
      <Hero />
      {!isMobile && <WatchStrangerThings />}
    </div>
  )
}

export default App