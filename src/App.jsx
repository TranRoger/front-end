import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'

import LookingPage from './pages/PatientPage'
import Create from './pages/Create'



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/create" element={<Create />} />
      <Route path="/looking" element={<LookingPage />} />
    </Routes>
  )
}

export default App