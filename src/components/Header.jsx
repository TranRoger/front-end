import React from 'react';

const Header = () => {
    return (
        <header className='flex bg-black bg-opacity-25 items-center p-3 space-x-[16px]'>
            <img className='w-[80px] h-[80px] mx-[22px]' src='logo110.png'/>
            <div className='text-3xl font-bold text-black'>Phòng khám X</div>
        </header>
    )
}

export default Header;