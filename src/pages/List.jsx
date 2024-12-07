import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import '../index.css'

const List = () => {
  return (
    <div className='bg-gradient-to-r from-[#FF9A9E] via-[#FAD0C4] to-[#FAD0C4] h-screen flex flex-col'>
      <Header />
      <div className="mb-auto flex h-full">
            <Menu />

            <div className="flex-1 h-full relative">
                alo
            </div>
        </div>
      <Footer />
    </div>
  )
}

export default List