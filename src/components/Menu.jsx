import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const location = useLocation();
  const [pressedState, setPressedState] = React.useState(location.pathname);

  const handleButtonClick = (path) => {
    setPressedState(path);
  };

  return (
    <div className="w-[350px] flex flex-col h-full justify-center bg-[#D9D9D9] bg-opacity-10">
      <Link to="/list" onClick={() => handleButtonClick('/list')} className='menu'>
        <button>Lập danh sách khám bệnh</button>
      </Link>
      <Link to="/create" onClick={() => handleButtonClick('/create')} className={pressedState === '/create' ? 'menu-pressed' : 'menu'}>
        <button>Lập phiếu khám bệnh</button>
      </Link>
      <Link to="/search" onClick={() => handleButtonClick('/search')} className={pressedState === '/create' ? 'menu-pressed' : 'menu'}>
        <button>Tra cứu bệnh nhân</button>
      </Link>
      <Link to="/invoice" onClick={() => handleButtonClick('/invoice')} className={pressedState === '/create' ? 'menu-pressed' : 'menu'}>
        <button>Lập hóa đơn thanh toán</button>
      </Link>
      <Link to="/report" onClick={() => handleButtonClick('/report')} className={pressedState === '/create' ? 'menu-pressed' : 'menu'}>
        <button>Lập báo cáo tháng</button>
      </Link>
      <Link to="/rules" onClick={() => handleButtonClick('/rules')} className={pressedState === '/create' ? 'menu-pressed' : 'menu'}>
        <button>Thay đổi quy định</button>
      </Link>
    </div>
  );
}

export default Menu;