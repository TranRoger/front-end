import React from 'react';
import './Menu.css';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const location = useLocation();
  const [pressedState, setPressedState] = React.useState(location.pathname);

  const handleButtonClick = (path) => {
    setPressedState(path);
  };

  return (
    <div className="w-1/6 flex flex-col h-full justify-center bg-[#D9D9D9] bg-opacity-10">
      <Link to="/list" onClick={() => handleButtonClick('/list')} className='menu'>
        Lập danh sách khám bệnh
      </Link>
      <Link to="/create" onClick={() => handleButtonClick('/create')} className='menu'>
        Lập phiếu khám bệnh
      </Link>
      <Link to="/search" onClick={() => handleButtonClick('/search')} className='menu'>
        Tra cứu bệnh nhân
      </Link>
      <Link to="/invoice" onClick={() => handleButtonClick('/invoice')} className='menu'>
        Lập hóa đơn thanh toán
      </Link>
      <Link to="/report" onClick={() => handleButtonClick('/report')} className='menu'>
        Lập báo cáo tháng
      </Link>
      <Link to="/regulation" onClick={() => handleButtonClick('/regulation')} className='menu'>
        Thay đổi quy định
      </Link>
    </div>
  );
}

export default Menu;