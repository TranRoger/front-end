import React from 'react'
import { Routes, Route, Outlet } from 'react-router-dom'
import Home from './pages/Home'
import List from './pages/List'
import Header from './components/Header'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Regulation from './pages/Regulation'
import Search from './pages/Search'
import LookingPage from './pages/PatientPage'
import Create from './pages/Create'
import ErrorPage from './pages/ErrorPage'
import NameAndLogo from './components/NameAndLogo'

const App = () => {
  return (
    <div className='flex flex-col bg-gradient-to-r from-[#FF9A9E] via-[#FAD0C4] to-[#FAD0C4] h-screen'>
      <Routes>
        {/* Error page */}
        <Route path="*" element={
          <div className='flex flex-col h-full'>
            <NameAndLogo />
            <ErrorPage />
            <Footer />
          </div>
        } />

        {/* Main layout routes with Header and Menu */}
        <Route element={
          <>
            <Header />
            <div className="mb-auto flex flex-1 h-[70%]">
              <Menu />
              <div className="flex-1">
                <Outlet />
              </div>
            </div>
            <Footer />
          </>
        }>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path='/regulation' element={<Regulation />} />
          <Route path="/search" element={<Search />} />
          <Route path="/create" element={<Create />} />
          <Route path="/looking" element={<LookingPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App