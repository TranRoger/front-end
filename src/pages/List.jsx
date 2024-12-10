import React, { useState, useEffect } from 'react'
import Table from '../components/PatientTable'
import PatientModal from '../components/PatientModal'
import Button from '../components/ui/button'
import axios from 'axios'
import Spinner from '../components/ui/Spinner'
import './List.css'

import BE_SERVER from '../../config/system'

const List = () => {
  const [loading, setLoading] = useState(false)
  const [patients, setPatient] = useState([]);
  const maxPatients = 40;
  const [modalOpen, setModalOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null)

  useEffect(() => {
    setLoading(true)

    axios
      .get(`${BE_SERVER}exam-list`)
      .then((response) => {
        setPatient(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  }, [loading])


  const GetDate = () => {
    var date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    return `${year}-${month}-${day}`
  }

  const [date, setDate] = useState(GetDate)

  const HandleDateChange = (e) => {
    setDate(e.target.value)
  }

  const HandleEditPatient = (index) => {
    console.log(patients[index])
    console.log(patients[index].createdAt)
    console.log(date)
    console.log(toString(patients[index].createdAt).includes(date))
    setPatientToEdit(index)

    setModalOpen(true)
  }

  const HandleDeleteButton = (index) => {
    setLoading(true)

    axios
      .delete(`${BE_SERVER}exam-list/delete/${patients[index]._id}`)
      .then(() => {
        setLoading(false)
      })
      .catch(error => {
        console.log(error)
        setLoading(false)
      })
  }

  const HandleNewPatient = (newPatient) => {
    setLoading(true)
    console.log(newPatient)
    if (patientToEdit === null) {
      axios
        .post(`${BE_SERVER}exam-list/create`, newPatient)
        .then(() => {
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
    }
    else {
      axios
        .patch(`${BE_SERVER}exam-list/edit/${newPatient._id}`, newPatient)
        .then(() => {
          setLoading(false)
        })
        .catch((error) => {
          console.log(error)
          setLoading(false)
        })
    }
  }

  return (
    <div className="flex flex-1 flex-col w-full m-1 mr-3">
      {loading && <Spinner />}
      {/* Content header */}
      <div className='flex flex-col w-full h-28 items-center justify-between'>
        <div className="text-black font-bold text-3xl p-2">DANH SÁCH KHÁM BỆNH</div>
        <div className="grid grid-cols-3 w-full h-full items-center space-x-3 mr-auto">
          <div></div>
          <div className='flex flex-row space-x-3 items-center justify-center'>
            <div className="text-black text-lg">Ngày khám:</div>
            <input type="date" placeholder='dd-mm-yyyy' value={date} className="w-[200px] bg-transparent text-lg" onChange={HandleDateChange} />
          </div>
          <Button text={'Thêm bệnh nhân'} handler={() => setModalOpen(true)} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 w-full max-h-full overflow-auto relative flex flex-col items-center">
        <Table patients={patients.filter((items) => items.examDate === date)} maxPatients={maxPatients} HandlePatient={() => setModalOpen(true)} HandleDelete={HandleDeleteButton} HandleEdit={HandleEditPatient} />
      </div>
      {modalOpen && <PatientModal CloseModal={() => { setModalOpen(false); setPatientToEdit(null) }} handleSubmit={HandleNewPatient} defaultValue={patientToEdit !== null && patients[patientToEdit]} today={date} />}
    </div>
  )
}

export default List  