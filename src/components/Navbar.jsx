import React from 'react'

const Navbar = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@700&display=swap');
        
        .navbar {
          font-family: 'Libre Baskerville', serif;
        }
      `}</style>
      <nav className="navbar fixed top-0 w-full h-[70px] lg:h-[82px] px-4 lg:px-[60px] z-[1000] flex items-center justify-between pointer-events-none bg-transparent">
        <div className="nav-logo pointer-events-auto">
          <img
            src="/images/stranger-things-logo.png"
            alt="Stranger Things Logo"
            className="h-[50px] lg:h-[65px] w-auto"
          />
        </div>
      </nav>
    </>
  )
}

export default Navbar