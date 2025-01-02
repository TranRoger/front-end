import React, { useState, useEffect } from 'react'
import Button from '../../components/ui/button'
import EditButton from '../../components/ui/editButton'
import TrashButton from '../../components/ui/dltButton'
import Spinner from '../../components/ui/Spinner'
import MedicineModal from '../../components/MedicineModal'
import axios from 'axios'
import BE_SERVER from '../../../config/system'


const Medicine = () => {
    const TableHeader = () => {
        return (
            <thead className='p-4'>
                <tr className='bg-[#D9D9D9]/100'>
                    <th className='table-header text-center'>
                        <p className="table-header-text">
                            STT
                        </p>
                    </th>
                    <th className='table-header'>
                        <p className="table-header-text text-left">
                            Tên thuốc
                        </p>
                    </th>
                    <th className='table-header text-center'>
                        <p className="table-header-text">
                            Đơn vị tính
                        </p>
                    </th>
                    <th className='table-header text-center'>
                        <p className="table-header-text">
                            Đơn giá
                        </p>
                    </th>
                    <th className='table-header'>
                        <p className="table-header-text text-left">
                            Cách dùng
                        </p>
                    </th>
                    <th className='table-header'>
                        <Button className="xs:text-[8px] xs:px-0 xs:text-nowrap" text='Thêm thuốc' handler={() => setModalOpen(true)} />
                    </th>
                </tr>
            </thead>
        )
    }

    const [medicines, setMedicines] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [medicineToEdit, setMedicineToEdit] = useState(null)

    useEffect(() => {
        setLoading(true)

        axios
            .get(`${BE_SERVER}regulation-update/medicine`)
            .then((response) => {
                setMedicines(response.data.medicines)
            })
            .catch((error) => {
                console.error(error)
            })

        setLoading(false)
    }, [])

    const HandleNewMedicine = (newMedicine) => {
        setLoading(true)
        if (medicineToEdit === null) {
            axios
                .post(`${BE_SERVER}regulation-update/medicine/create`, newMedicine)
                .then(() => {
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                })

            setMedicines([...medicines, newMedicine])
        }
        else {
            axios
                .patch(`${BE_SERVER}${newMedicine._id}`, newMedicine)
                .then(() => {
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                })

            setMedicines(medicines.map((medicine, idx) => {
                if (idx !== medicineToEdit) return medicine

                return newMedicine
            }))
        }
    }

    const HandleEdit = (index) => {
        setMedicineToEdit(index)
        setModalOpen(true)
    }

    const HandleDelete = (index) => {
        setLoading(true)

        axios
            .delete(`${BE_SERVER}regulation-update/medicine/delete/${medicines[index]._id}`)
            .then(() => {
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })

        setMedicines(medicines.filter((_, idx) => idx !== index))
    }

    if (loading) return (<Spinner />)
    else if (medicines) return (
        <div className='w-full m-1'>
            {modalOpen && <MedicineModal Close={() => {setModalOpen(false); setMedicineToEdit(null)}} defaultValue={medicineToEdit !== null ? medicines[medicineToEdit] : null} handleSubmit={HandleNewMedicine} />}
            <table className='w-full table-auto'>
                <TableHeader />
                <tbody className='flex-1 w-full overflow-scroll'>
                    {
                        medicines.map((medicine, index) => {
                            return (
                                <tr key={index} className='even:bg-[#D9D9D9]/100 p-4 xs:p-0'>
                                    <td className='p-4 text-center xs:p-0'>
                                        <p className='table-row-text'>{index + 1}</p>
                                    </td>
                                    <td className='p-4 xs:p-0'>
                                        <p className='table-row-text'>{medicine.medicineName}</p>
                                    </td>
                                    <td className='p-4 text-center xs:p-0'>
                                        <p className='table-row-text'>{medicine.unit}</p>
                                    </td>
                                    <td className='p-4 text-center xs:p-0'>
                                        <p className='table-row-text'>{medicine.unitPrice}</p>
                                    </td>
                                    <td className='p-4 xs:p-0'>
                                        <p className='table-row-text'>{medicine.usageMethod}</p>
                                    </td>
                                    <td className='p-4 xs:p-0'>
                                        <span className='flex flex-row space-x-2 justify-center'>
                                            <EditButton className="xs:w-3 xs:h-3" handler={() => HandleEdit(index)} />
                                            <TrashButton className="xs:w-3 xs:h-3" handler={() => HandleDelete(index)} />
                                        </span>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Medicine