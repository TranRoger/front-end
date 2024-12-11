import React from 'react'

const SuccessModal = ({Close}) => {
  return (
    <div className='modal' id='modal' onClick={(e) => { if (e.target.id === 'modal') Close() }}>
        <div className="flex items-center justify-center w-[500px] h-[150px] bg-red-500 rounded-2xl font-semibold text-white text-[26px]">Cập nhật thành công!</div>
    </div>
  )
}

export default SuccessModal