import React, {useState} from 'react'
import Button from '../components/ui/button'

const MedicineModal = ({ Close, defaultValue, handleSubmit }) => {
    const [formState, setFormState] = useState(defaultValue || {
        medicineName: "",
        unit: "Vỉ",
        unitPrice: "",
        usageMethod	: ""
    })

    const [error, setError] = useState("")

    const ValidateForm = () => {
        if (formState.unitPrice < 0.0) {
            setError("Đơn giá không hợp lệ")
            console.log("error")
            return false
        }
        
        if (formState.medicineName && formState.unit && formState.unitPrice && formState.usageMethod) {
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
        Close()
    }

    const HandleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className="modal" id='modal' onClick={(e) => { if (e.target.id === 'modal') Close() }}>
            {/* Modal content */}
            <div className="relative bg-[#FFC3C3] w-fit m-auto h-fit rounded-lg shadow border border-black border-3">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Thông tin thuốc
                    </h3>
                </div>
                {/* Modal body */}
                <div className="p-5">
                    <div className="flex flex-col space-y-3">
                        <div className="flex flex-col space-y-3">
                            <div className="fields">
                                <label htmlFor="name">Tên thuốc:</label>
                                <input type="text" id="medicineName" name="medicineName" value={formState.medicineName} onChange={HandleChange} className="input" />
                            </div>

                            <div className="fields">
                                <label htmlFor='unit'>Đơn vị tính:</label>
                                <select name="unit" id="unit" value={formState.unit} onChange={HandleChange} className='py-2 px-4 rounded-md bg-slate-100 border border-gray-300'>
                                    <option value="Vỉ">Vỉ</option>
                                    <option value="Viên">Viên</option>
                                    <option value="Gói">Gói</option>
                                    <option value="Ống">Ống</option>
                                    <option value="Chai">Chai</option>
                                    <option value="Hộp">Hộp</option>
                                    <option value="Tuýp">Tuýp</option>
                                    <option value="Liều">Liều</option>
                                </select>
                            </div>

                            <div className="fields">
                                <label htmlFor="uniPrice">Đơn giá:</label>
                                <input type="number" step="0.01" id="unitPrice" name="unitPrice" value={formState.unitPrice} onChange={HandleChange} className="w-32 input" />
                            </div>

                            <div className="fields">
                                <label htmlFor='usageMethod' className='w-44'>Cách dùng:</label>
                                <input type='text' id='usageMethod' name='usageMethod' value={formState.usageMethod} onChange={HandleChange} className='input' />
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

export default MedicineModal