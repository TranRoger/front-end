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
        <header className='flex flex-col lg:flex-row bg-black bg-opacity-25 items-center p-4 lg:p-6 justify-between'>
            {isOpen && user && <Modal CloseModal={() => setIsOpen(false)} handleLogout={handleLogout} avt={avt} name={user.fullName} />}
            
            <div className='flex items-center space-x-4 lg:space-x-6'>
                <img className='w-[60px] h-[60px] lg:w-[80px] lg:h-[80px]' src='logo110.png' alt="Logo" />
                <div className='text-2xl lg:text-3xl font-bold text-black'>Phòng khám X</div>
            </div>

            {user && (
                <button 
                    className="flex flex-row items-center space-x-3 lg:space-x-5 hover:bg-black/30 px-4 py-2 rounded-lg lg:mr-6 mt-4 lg:mt-0"
                    onClick={() => setIsOpen(true)}
                >
                    <div className="font-lg text-black text-base lg:text-xl">{user.fullName}</div>
                    <img className='w-[40px] h-[40px] lg:w-[50px] lg:h-[50px] rounded-full' src={user.avatar || avt} alt="Avatar" />
                </button>
            )}
        </header>
    )
}

export default Header;