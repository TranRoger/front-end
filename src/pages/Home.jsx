import React from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../index.css'

const Home = () => {
  return (
    <div className='bg-gradient-to-r from-[#FF9A9E] via-[#FAD0C4] to-[#FAD0C4] h-screen flex flex-col'>
      <Header />
      <div className="mb-auto flex h-full">
            {/* Left Sidebar */}
            <div className="w-[350px] flex flex-col h-full justify-center bg-[#D9D9D9] bg-opacity-10">
                <button className="menu">Lập danh sách khám bệnh</button>
                <button className="menu">Lập phiếu khám bệnh</button>
                <button className="menu">Tra cứu bệnh nhân</button>
                <button className="menu">Lập hóa đơn thanh toán</button>
                <button className="menu">Lập báo cáo tháng</button>
                <button className="menu">Thay đổi quy định</button>
            </div>

            <div className="flex-1 h-full relative">
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