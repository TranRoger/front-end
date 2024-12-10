import React, { useState } from 'react'
import './PatientTable.css'
import Button from '../components/ui/button'
import TrashButton from '../components/ui/dltButton'
import EditButton from '../components/ui/editButton'

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
                        Họ tên
                    </p>
                </th>
                <th className='table-header text-center'>
                    <p className="table-header-text">
                        Giới tính
                    </p>
                </th>
                <th className='table-header text-center'>
                    <p className="table-header-text">
                        Năm sinh
                    </p>
                </th>
                <th className='table-header'>
                    <p className="table-header-text text-left">
                        Địa chỉ
                    </p>
                </th>
                <th className='table-header'>
                </th>
            </tr>
        </thead>
    )
}

const PatientTable = ({ patients, maxPatients, HandlePatient, HandleDelete, HandleEdit }) => {
    const AddPatient = () => {
        let index = patients.length;
        if (index < maxPatients) {
            return (
                <tr key={index} className='even:bg-[#D9D9D9]/100 p-4'>
                    <td className='p-4 text-center'>
                        <p className='table-row-text'>{index + 1}</p>
                    </td>
                    <td className='p-1'>
                        <Button text='Thêm bệnh nhân' handler={HandlePatient} />
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        }
    }

    return (
        <table className='flex-1 w-full table-auto'>
            <TableHeader />

            <tbody className='flex-1 w-full overflow-scroll'>
                {
                    patients.map((patient, index) => {
                        return (
                            <tr key={index} className='even:bg-[#D9D9D9]/100 p-4'>
                                <td className='p-4 text-center'>
                                    <p className='table-row-text'>{index + 1}</p>
                                </td>
                                <td className='p-4'>
                                    <p className='table-row-text'>{patient.fullName}</p>
                                </td>
                                <td className='p-4 text-center'>
                                    <p className='table-row-text'>{patient.sex}</p>
                                </td>
                                <td className='p-4 text-center'>
                                    <p className='table-row-text'>{patient.age}</p>
                                </td>
                                <td className='p-4'>
                                    <p className='table-row-text'>{patient.address}</p>
                                </td>
                                <td className='p-4'>
                                    <span className='flex flex-row space-x-2'>
                                        <EditButton handler={() => HandleEdit(index)}/>
                                        <TrashButton handler={() => HandleDelete(index)}/>
                                    </span>
                                </td>
                            </tr>
                        )
                    })
                }
                <AddPatient />
            </tbody>
        </table>
    )
}

export default PatientTable