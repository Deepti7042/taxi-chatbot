import React from 'react'
import './Home.css'

const Home = () => {
  return (
    <div className='home'>
      <nav className="navbar">
          <div className="navbar-left">
        <a href="/" className="logo">
          Taxi Booking Platform
        </a>
      </div>
      </nav>
      <img src="/background.png" className='background' alt="Background"/>
    </div>
  )
}

export default Home
