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
import AuthProvider from './context/AuthContext'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => {
  return (
    <AuthProvider>
      <div className='flex flex-col bg-gradient-to-r from-[#FF9A9E] via-[#FAD0C4] to-[#FAD0C4] h-screen'>
        <Routes>
          {/* Public routes */}
          <Route element={
            <>
              <NameAndLogo />
              <div className="flex-1">
                <Outlet />
              </div>
              <Footer />
            </>
          }>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>

          {/* Protected routes */}
          <Route element={
            <ProtectedRoute>
              <>
                <Header />
                <div className="flex-1 flex h-[70%]">
                  <Menu />
                  <Outlet />
                </div>
                <Footer />
              </>
            </ProtectedRoute>
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
    </AuthProvider>
  );
};

export default App