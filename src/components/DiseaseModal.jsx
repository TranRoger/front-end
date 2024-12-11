import React, {useState} from 'react'
import Button from '../components/ui/button'

const DiseaseModal = ({Close, defaultValue, handleSubmit}) => {
    const [formState, setFormState] = useState(defaultValue || {
        diseaseName: "",
        symptoms: "",
        medication: ""
    })

    const [error, setError] = useState("")

    const ValidateForm = () => {
        if (formState.diseaseName && formState.symptoms && formState.medication) {
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
                        Thông tin bệnh
                    </h3>
                </div>
                {/* Modal body */}
                <div className="p-5">
                    <div className="flex flex-col space-y-3">
                        <div className="flex flex-col space-y-3">
                            <div className="fields">
                                <label htmlFor="name">Tên bệnh:</label>
                                <input type="text" id="diseaseName" name="diseaseName" value={formState.diseaseName} onChange={HandleChange} className="input" />
                            </div>

                            <div className="fields">
                                <label htmlFor="symptoms">Triệu chứng:</label>
                                <input type="text" id="symptoms" name="symptoms" value={formState.symptoms} onChange={HandleChange} className="input" />
                            </div>

                            <div className="fields">
                                <label htmlFor='medication' className='w-44'>Thuốc:</label>
                                <input type='text' id='medication' name='medication' value={formState.medication} onChange={HandleChange} className='input' />
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

export default DiseaseModal