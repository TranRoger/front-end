import React from 'react'

const AccountModal = ({ CloseModal, handleLogout, avt, name }) => {
    return (
        <div
            id='modal'
            className='absolute w-full h-fit mx-5 top-5 right-2 flex justify-end items-start'
            onClick={(e) => {
                if (e.target.id === 'modal') CloseModal()
            }}
        >
            <div className="bg-[#FFC3C3] w-fit py-2 rounded-lg shadow-lg border border-black">
                <div className="flex flex-col">
                    <div className="flex flex-row items-center space-x-5 mx-6">
                        <div className="font-lg text-black text-xl">{name}</div>
                        <img className='w-[50px] h-[50px] rounded-full' src={avt} />
                    </div>
                    <button className="hover:bg-[#FFB1B1] px-4 py-2 text-right">
                        Thông tin tài khoản
                    </button>
                    <button className="hover:bg-[#FFB1B1] px-4 py-2 text-right">
                        Đổi mật khẩu
                    </button>
                    <button className="hover:bg-[#FFB1B1] px-4 py-2 text-right text-red-600" onClick={() => handleLogout()}>
                        Đăng xuất
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AccountModal