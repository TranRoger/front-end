import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import Table from '../components/PatientTable'
import PatientModal from '../components/PatientModal'
import Spinner from '../components/ui/Spinner'
import axios from 'axios'
import './List.css'
import * as fs from 'fs'

const List = () => {
  const [loading, setLoading] = useState(false)
  const [patients, setPatient] = useState([]);
  const maxPatients = 40;
  const [modalOpen, setModalOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null)

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
    setPatientToEdit(index)

    setModalOpen(true)
  }

  const HandlePatientButton = () => {
    setModalOpen(true)
  }

  const HandleDeleteButton = (index) => {
    setPatient(patients.filter((_, i) => i !== index))
  }

  const HandleNewPatient = (newPatient) => {
    setLoading(true)
    axios
      .post('http://localhost:3000/admin/exam-list/create', newPatient)
      .then(() => {
        patientToEdit === null ?
          setPatient([...patients, newPatient]) :
          setPatient(patients.map((currentPatient, idx) => {
            if (idx !== patientToEdit) return currentPatient

            return newPatient
          }))
        setPatientToEdit(null)
      })
      .catch((error) => {
        setLoading(false)
      })
  }
  useEffect(() => {
    setLoading(true)

    axios
      .get('http://localhost:3000/admin/exam-list')
      .then((response) => {
        setPatient(response.data.data)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      })
  })

  return (
    <div className='bg-gradient-to-r from-[#FF9A9E] via-[#FAD0C4] to-[#FAD0C4] h-[100vh] flex flex-col overflow-hidden'>
      <Header />
      <div className="flex flex-row h-[80%]">
        <Menu />

        <div className="flex flex-col w-full m-1">
          {/* Content header */}
          <div className='flex flex-col w-full h-350 items-center justify-center p-4 space-y-3'>
            <div className="text-black font-bold text-3xl">DANH SÁCH KHÁM BỆNH</div>
            <div className="flex flex-row w-full h-full items-center justify-center space-x-3">
              <div className="text-black text-lg">Ngày khám:</div>
              <input type="date" placeholder='dd-mm-yyyy' value={date} className="w-[200px] bg-transparent text-lg" onChange={HandleDateChange} />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 w-full max-h-full overflow-auto relative flex flex-col items-center">
            <Table patients={patients} maxPatients={maxPatients} HandlePatient={HandlePatientButton} HandleDelete={HandleDeleteButton} HandleEdit={HandleEditPatient} />
          </div>
        </div>
      </div>
      <Footer />
      {modalOpen && <PatientModal CloseModal={() => setModalOpen(false)} handleSubmit={HandleNewPatient} defaultValue={patientToEdit !== null && patients[patientToEdit]} />}
    </div>
  )
}

export default List  