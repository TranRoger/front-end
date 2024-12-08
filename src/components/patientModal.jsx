import React from 'react'
import './patientModal.css'
import Button from './ui/button'

const patientModal = () => {
  return (
    <div className='overflow-y-auto overflow-x-hidden fixed justify-center items-center w-auto h-auto max-h-full md-auto mb-auto'>
        {/* Modal content */}
        <div className="relative bg-[#FFC3C3] rounded-lg shadow border border-black border-3">
            {/* Modal header */}
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-lg font-semibold text-gray-900">
                    Thông tin bệnh nhân
                </h3>
                <button type='button' className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'>
                    <svg className='w-3 h-3' aria-hidden='true' focusable='false' data-prefix='fas' data-icon='times' role='img' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 352 512'>
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className='sr-only'>Close modal</span>
                </button>
            </div>
            {/* Modal body */}
            <div className="p-5">
                <div className="flex flex-col space-y-3">
                    <div className="flex flex-col space-x-3">
                        <div className="flex flex-row space-y-1">
                            <label htmlFor="name">Họ và tên:</label>
                            <input type="text" id="name" name="name" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="flex flex-col space-y-1">
                            <label htmlFor='sex'>Giới tính:</label>
                            <select name="sex" id="sex">
                                <option value="male">Nam</option>
                                <option value="female">Nữ</option>
                                <option value="other">Khác</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-x-3">
                            <label htmlFor="yearOfBirth">Năm sinh:</label>
                            <input type="number" id="yearOfBirth" name="yearOfBirth" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                        <div className="flex flex-col-space-x-3">
                            <label htmlFor="address">Dia chi</label>
                            <input type="text" id="address" name="address" className="w-full p-2 border border-gray-300 rounded-md" />
                        </div>
                    </div>
                </div>
                <Button text='Lưu' />
            </div>
        </div>
    </div>
  )
}

export default patientModal