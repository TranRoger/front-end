import React, { useState } from 'react';
import Button from '../components/ui/button';

const MedicineForm = ({ Close, defaultValue, handleSubmit }) => {
    const [formState, setFormState] = useState(defaultValue || {
        medicineName: '',
        unitPrice: '',
    });

    const sampleData = [
        'Apple',
        'Banana',
        'Orange',
        'Grapes',
        'Mango',
        'Pineapple',
        'Strawberry',
        'Blueberry',
        'Watermelon',
        'Peach',
    ];

    const [error, setError] = useState('');

    const ValidateForm = () => {
        if (!formState.medicineName) {
            setError('Vui lòng chọn tên thuốc');
            return false;
        }
        if (!formState.unitPrice || formState.unitPrice <= 0) {
            setError('Số lượng phải lớn hơn 0');
            return false;
        }
        setError('');
        return true;
    };

    const HandleSubmit = (e) => {
        e.preventDefault();

        if (!ValidateForm()) return;
        handleSubmit(formState);
        Close();
    };

    const HandleChange = (e) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div
            className="modal"
            id="modal"
            onClick={(e) => {
                if (e.target.id === 'modal') Close();
            }}
        >
            <div className="relative bg-[#FFC3C3] w-fit m-auto h-fit rounded-lg shadow border border-black border-3">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                    <h3 className="text-lg font-semibold text-gray-900">Thông tin thuốc</h3>
                </div>
                <div className="p-5">
                    <div className="flex flex-col space-y-3">
                        <div className="fields space-y-2">
                            <label htmlFor="medicineName" className="block font-semibold">
                                Tên thuốc:
                            </label>
                            <select
                                id="medicineName"
                                name="medicineName"
                                value={formState.medicineName}
                                onChange={HandleChange}
                                className="py-2 px-4 rounded-md bg-slate-100 border border-gray-300"
                            >
                                <option value="" disabled>
                                    Chọn tên thuốc
                                </option>
                                {sampleData.map((item, index) => (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="fields space-y-2">
                            <label htmlFor="unitPrice" className="block font-semibold">
                                Số lượng:
                            </label>
                            <input
                                type="number"
                                id="unitPrice"
                                name="unitPrice"
                                value={formState.unitPrice}
                                onChange={HandleChange}
                                className="w-32 input"
                                min="1"
                            />
                        </div>
                        {error && (
                            <div className="bg-red-500 rounded-lg p-2 text-center text-white text-sm">
                                *{error}*
                            </div>
                        )}
                        <Button text="Lưu" handler={HandleSubmit} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicineForm;