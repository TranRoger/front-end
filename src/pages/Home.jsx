import React from 'react'
import '../index.css'

const Home = () => {
  return (
    <div className="flex-1 h-full relative mx-1 my-1">
      <img
        src="dashboard.png"
        alt="dashboard"
        className="absolute w-full h-full object-contain"
      />
    </div>
  )
}

export default Home