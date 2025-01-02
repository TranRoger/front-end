import React, { useState, useEffect } from 'react'
import Button from '../../components/ui/button'
import EditButton from '../../components/ui/editButton'
import TrashButton from '../../components/ui/dltButton'
import Spinner from '../../components/ui/Spinner'
import DiseaseModal from '../../components/DiseaseModal'
import axios from 'axios'
import BE_SERVER from '../../../config/system'

const Disease = () => {
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
                            Tên bệnh
                        </p>
                    </th>
                    <th className='table-header text-left'>
                        <p className="table-header-text">
                            Triệu chứng
                        </p>
                    </th>
                    <th className='table-header text-left'>
                        <p className="table-header-text">
                            Thuốc
                        </p>
                    </th>
                    <th className='table-header'>
                        <Button className="xs:text-[8px] xs:px-0 xs:text-nowrap" text='Thêm bệnh' handler={() => setModalOpen(true)} />
                    </th>
                </tr>
            </thead>
        )
    }

    const [diseases, setDiseases] = useState([])
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)
    const [diseaseToEdit, setDiseaseToEdit] = useState(null)

    useEffect(() => {
        setLoading(true)

        axios
            .get(`${BE_SERVER}regulation-update/disease`)
            .then((response) => {
                setDiseases(response.data.diseases)
            })
            .catch((error) => {
                console.error(error)
            })

        setLoading(false)
    }, [])

    const HandleNewDisease = (newDisease) => {
        setLoading(true)
        if (diseaseToEdit === null) {
            axios
                .post(`${BE_SERVER}regulation-update/disease/create`, newDisease)
                .then(() => {
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                })

            setDiseases([...diseases, newDisease])
        }
        else {
            axios
                .patch(`${BE_SERVER}${newDisease._id}`, newDisease)
                .then(() => {
                    setLoading(false)
                })
                .catch((error) => {
                    console.log(error)
                    setLoading(false)
                })

            setDiseases(diseases.map((disease, idx) => {
                if (idx !== diseaseToEdit) return disease

                return newDisease
            }))
        }
    }

    const HandleEdit = (index) => {
        setDiseaseToEdit(index)
        setModalOpen(true)
    }

    const HandleDelete = (index) => {
        setLoading(true)

        axios
            .delete(`${BE_SERVER}regulation-update/disease/delete/${diseases[index]._id}`)
            .then(() => {
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })

        setDiseases(diseases.filter((_, idx) => idx !== index))
    }

    if (loading) return (<Spinner />)
    else if (diseases) return (
        <div className='w-full m-1 xs:m-0'>
            {modalOpen && <DiseaseModal Close={() => {setModalOpen(false); setDiseaseToEdit(null)}} defaultValue={diseaseToEdit !== null ? diseases[diseaseToEdit] : null} handleSubmit={HandleNewDisease} />}
            <table className='w-full table-auto'>
                <TableHeader />
                <tbody className='flex-1 w-full overflow-scroll'>
                    {
                        diseases.map((disease, index) => {
                            return (
                                <tr key={index} className='even:bg-[#D9D9D9]/100 p-4'>
                                    <td className='p-4 text-center'>
                                        <p className='table-row-text'>{index + 1}</p>
                                    </td>
                                    <td className='p-4'>
                                        <p className='table-row-text'>{disease.diseaseName}</p>
                                    </td>
                                    <td className='p-4'>
                                        <p className='table-row-text'>{disease.symptoms}</p>
                                    </td>
                                    <td className='p-4'>
                                        <p className='table-row-text'>{disease.medication}</p>
                                    </td>
                                    <td className='p-4'>
                                        <span className='flex flex-row space-x-2 justify-center'>
                                            <EditButton handler={() => HandleEdit(index)} />
                                            <TrashButton handler={() => HandleDelete(index)} />
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

export default Disease