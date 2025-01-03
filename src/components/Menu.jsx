import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const location = useLocation();
  const [pressedState, setPressedState] = React.useState(location.pathname);

  const handleButtonClick = (path) => {
    setPressedState(path);
  };

  return (
    <div className="w-1/6 flex flex-col h-full justify-center bg-[#D9D9D9] bg-opacity-10 xs:w-[80px]">
      <Link to="/list" onClick={() => handleButtonClick('/list')} className='menu xs:text-[10px]'>
        Lập danh sách khám bệnh
      </Link>
      <Link to="/create" onClick={() => handleButtonClick('/create')} className='menu xs:text-[10px]'>
        Lập phiếu khám bệnh
      </Link>
      <Link to="/search" onClick={() => handleButtonClick('/search')} className='menu xs:text-[10px]'>
        Tra cứu bệnh nhân
      </Link>
      <Link to="/invoice" onClick={() => handleButtonClick('/invoice')} className='menu xs:text-[10px]'>
        Lập hóa đơn thanh toán
      </Link>
      <Link to="/report" onClick={() => handleButtonClick('/report')} className='menu xs:text-[10px]'>
        Lập báo cáo tháng
      </Link>
      <Link to="/regulation" onClick={() => handleButtonClick('/regulation')} className='menu xs:text-[10px]'>
        Thay đổi quy định
      </Link>
    </div>
  );
}

export default Menu;