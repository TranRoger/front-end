import avt from '../assets/avatar.png';
import Modal from '../components/AccountModal'
import { useState } from 'react';
import authServices from '../services/auth.service';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const user = JSON.parse(window.localStorage.getItem("user")).user;
    const { dispatch } = useContext(AuthContext);

    const handleLogout = async () => {
        await authServices.logout();
        window.localStorage.removeItem("user");
        dispatch({ type: 'LOGOUT' });
    }

    return (
        <header className='flex bg-black bg-opacity-25 items-center p-3 justify-between'>
            {isOpen && <Modal CloseModal={() => setIsOpen(false)} handleLogout={() => handleLogout()} avt={avt} name={user.fullName} />}
            <div className='flex items-center space-x-[16px]'>
                <img className='w-[80px] h-[80px] mx-[22px]' src='logo110.png' />
                <div className='text-3xl font-bold text-black'>Phòng khám X</div>
            </div>
            <button className="flex flex-row items-center space-x-5 mr-6 hover:bg-black/30 px-5 py-2 rounded-lg" onClick={() => setIsOpen(true)}>
                <div className="font-lg text-black text-xl">{user.fullName}</div>
                <img className='w-[50px] h-[50px] rounded-full' src={avt} />
            </button>
        </header>
    )
}

export default Header;