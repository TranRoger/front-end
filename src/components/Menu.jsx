import React from 'react'

const Menu = () => {
  return (
    <div className="w-[350px] flex flex-col h-full justify-center bg-[#D9D9D9] bg-opacity-10">
        <button className="menu">Lập danh sách khám bệnh</button>
        <button className="menu">Lập phiếu khám bệnh</button>
        <button className="menu">Tra cứu bệnh nhân</button>
        <button className="menu">Lập hóa đơn thanh toán</button>
        <button className="menu">Lập báo cáo tháng</button>
        <button className="menu">Thay đổi quy định</button>
    </div>
  )
}

export default Menu