import React from 'react'
import './Home.css'
import bg from './background.png'

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
      <img src={bg} className='background'/>
    </div>
  )
}

export default Home
