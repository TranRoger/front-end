import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import '../index.css'

const Home = () => {
  return (
    <div className='bg-gradient-to-r from-[#FF9A9E] via-[#FAD0C4] to-[#FAD0C4] h-screen flex flex-col'>
      <Header />
      <div className="mb-auto flex h-full">
            <Menu />

            <div className="flex-1 h-full relative mx-1 my-1">
                <img
                    src="dashboard.png"
                    alt="dashboard"
                    className="absolute w-full h-full object-contain"
                />
            </div>
        </div>
      <Footer />
    </div>
  )
}

export default Home