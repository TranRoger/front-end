import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../../components/ui/Spinner'
import Button from '../../components/ui/button'
import BE_SERVER from '../../../config/system'
import SuccessModal from '../../components/SuccessModal'

const General = () => {
    const [regulation, setRegulation] = useState(null)
    const [loading, setLoading] = useState(false)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        setLoading(true)
        axios
            .get(`${BE_SERVER}regulation-update/general-regulation`)
            .then((response) => {
                setRegulation(response.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
            })
    }, [])

    const Update = async () => {
        setLoading(true)

        axios
            .post(`${BE_SERVER}regulation-update/general-regulation`, regulation)
            .then(() => {
                setLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
            })
        setModalOpen(true)
    }

    const HandleChange = (e) => {
        setRegulation({
            ...regulation,
            [e.target.name]: e.target.value
        })
    }

    if (loading) return (<Spinner />)
    else if (regulation) return (
        <div className="flex-1 grid grid-rows-3 w-full items-center justify-center">
            <div className='fields space-x-10'>
                <label htmlFor="maxPatientsPerDay" className='w-full text-lg'>Số bệnh nhân tối đa trong một ngày</label>
                <input type="number" name='maxPatientsPerDay' value={regulation.maxPatientsPerDay} className='input w-32' onChange={HandleChange}/>
            </div>
            <div className='fields'>
                <label htmlFor="examFee" className='text-lg'>Tiền khám</label>
                <input type="number" name='examFee' value={regulation.examFee} onChange={HandleChange} className='input w-52' />
            </div>
            <div className='flex h-12 justify-end'>
                <Button text='Cập nhật' handler={Update} />
                {modalOpen && <SuccessModal Close={() => setModalOpen(false)} />}
            </div>

        </div>
    )
}

export default General