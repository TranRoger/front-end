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
    const [error, setError] = useState(null)

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
        // console.log(regulation)

        if (regulation.maxPatientsPerDay === "" || regulation.examFee === "" ) {
            setError("Vui lòng nhập đầy đủ thông tin")
            setLoading(false)
            setModalOpen(false)
            return
        }

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
        if (e.target.value <= 0) {
            setError("Vui lòng nhập số lớn hơn 0")
        }
        else {
            setError('')
        }
        setRegulation({
            ...regulation,
            [e.target.name]: e.target.value
        })
    }

    if (loading) return (<Spinner />)
    else if (regulation) return (
        <div className="flex-1 grid grid-rows-3 w-full items-center justify-center space-y-20">
            <div className='fields space-x-10'>
                <label htmlFor="maxPatientsPerDay" className='w-full text-lg xs:text-[10px]'>Số bệnh nhân tối đa trong một ngày</label>
                <input type="number" name='maxPatientsPerDay' value={regulation.maxPatientsPerDay} className='input w-32 xs:text-[10px]' onChange={HandleChange} />
            </div>
            <div className='fields'>
                <label htmlFor="examFee" className='text-lg xs:text-[10px]'>Tiền khám</label>
                <input type="number" name='examFee' value={regulation.examFee} onChange={HandleChange} className='input w-52 xs:text-[10px]' />
            </div>
            {error && <p className='bg-red-500 rounded-lg p-2 flex flex-row items-center justify-center text-white text-lg'>{error}</p>}
            <div className='flex h-12 justify-end'>
                <Button className='xs:text-[10px]' text='Cập nhật' handler={Update} />
                {modalOpen && !error && <SuccessModal Close={() => setModalOpen(false)} />}

            </div>

        </div>
    )
}

export default General