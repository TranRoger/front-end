import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import List from './pages/List'
import Header from './components/Header'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Regulation from './pages/Regulation'
import Search from './pages/Search'
import LookingPage from './pages/PatientPage'
import Create from './pages/Create'

const App = () => {
  return (
    <div className='flex flex-col bg-gradient-to-r from-[#FF9A9E] via-[#FAD0C4] to-[#FAD0C4] h-screen'>
      <Header />

      <div className="mb-auto flex flex-1 h-[70%]">
        <Menu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path='/regulation' element={<Regulation />} />
          <Route path="/search" element={<Search />} />
          <Route path="/create" element={<Create />} />
          <Route path="/looking" element={<LookingPage />} />
        </Routes>
      </div>

      <Footer />
    </div>

  )
}

export default App