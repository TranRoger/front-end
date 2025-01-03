import React, { useState } from 'react'

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

const PatientTable = ({ patients, Button, className }) => {
    return (
        <table className={className}>
            <TableHeader />

            <tbody className='flex-1 w-full overflow-scroll'>
                {
                    patients.map((patient, index) => {
                        return (
                            <tr key={index} className='even:bg-[#D9D9D9]/100'>
                                <td className='md:p-4 px-0 text-center'>
                                    <p className='table-row-text'>{index + 1}</p>
                                </td>
                                <td className='md:p-4 p-0'>
                                    <p className='table-row-text'>{patient.fullName}</p>
                                </td>
                                <td className='md:p-4 p-0 text-center'>
                                    <p className='table-row-text'>{patient.sex}</p>
                                </td>
                                <td className='md:p-4 p-0 text-center'>
                                    <p className='table-row-text'>{patient.yearOfBirth}</p>
                                </td>
                                <td className='md:p-4 p-0'>
                                    <p className='table-row-text'>{patient.address}</p>
                                </td>
                                <td className='md:p-4 p-0 md:justify-items-end md:w-96 w-10'>
                                    <div className='flex md:flex-row flex-col md:space-x-2 md:w-fit justify-end'>
                                        {Button(index)}
                                    </div>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default PatientTable