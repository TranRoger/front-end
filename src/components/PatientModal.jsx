import React, { useState } from 'react'
import Button from './ui/button'

const patientModal = ({ CloseModal, handleSubmit, defaultValue }) => {
    const [formState, setFormState] = useState(defaultValue || {
        fullName: "",
        yearOfBirth: 1990,
        sex: "Nam",
        phone: "",
        address: ""
    })

    const [error, setError] = useState("")

    const ValidateForm = () => {
        var currentDate = new Date()
        if (formState.yearOfBirth < 1900 || formState.yearOfBirth > currentDate.getFullYear()) {
            setError("Năm sinh không hợp lệ")
            return false
        }

        if (formState.fullName && formState.sex && formState.yearOfBirth && formState.address) {
            setError("")
            return true
        }

        for (const [key, value] of Object.entries(formState)) {
            if (!value) {
                setError("Vui lòng điền đầy đủ các mục")
            }
        }
        return false
    }

    const HandleSubmit = (e) => {
        e.preventDefault();

        if (!ValidateForm()) return
        handleSubmit(formState)
        CloseModal()
    }

    const HandleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='modal' onClick={(e) => {
            if (e.target.className === 'modal') CloseModal()
        }}>
            {/* Modal content */}
            <div className="relative bg-[#FFC3C3] w-fit m-auto h-fit rounded-lg shadow border border-black border-3">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Thông tin bệnh nhân
                    </h3>
                </div>
                {/* Modal body */}
                <div className="p-5">
                    <div className="flex flex-col space-y-3">
                        <div className="flex flex-col space-y-3">
                            <div className="fields">
                                <label htmlFor="name">Họ và tên:</label>
                                <input type="text" id="fullName" name="fullName" value={formState.fullName} onChange={HandleChange} className="input" />
                            </div>

                            <div className="fields">
                                <label htmlFor="yearOfBirth">Năm sinh:</label>
                                <input type="text" id="yearOfBirth" name="yearOfBirth" value={formState.yearOfBirth} onChange={HandleChange} className="w-32 input" />
                            </div>

                            <div className="fields">
                                <label htmlFor='sex'>Giới tính:</label>
                                <select name="sex" id="sex" value={formState.sex} onChange={HandleChange} className='py-2 px-4 rounded-md bg-slate-100 border border-gray-300'>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>

                            <div className="fields">
                                <label htmlFor='phone' className='w-44'>Số điện thoại:</label>
                                <input type='text' id='phone' name='phone' value={formState.phone} onChange={HandleChange} className='input' />
                            </div>

                            <div className="fields">
                                <label htmlFor="address">Địa chỉ</label>
                                <input type="text" id="address" name="address" value={formState.address} onChange={HandleChange} className="input" />
                            </div>
                            {error && <div className='bg-red-500 rounded-lg p-2 flex flex-row items-center justify-center text-white text-lg'>*{error}*</div>}
                            <Button text='Lưu' handler={HandleSubmit} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default patientModal