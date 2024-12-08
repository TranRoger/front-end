import React, {useState} from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Menu from '../components/Menu'
import Button from '../components/ui/button'
import TrashButton from '../components/ui/dltButton'
import EditButton from '../components/ui/editButton'
import patientModal from '../components/patientModal'
import './List.css'

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
          <p className="table-header-text">
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
          <p className="table-header-text">
            Địa chỉ
          </p>
        </th>
        <th className='table-header'>
        </th>
      </tr>
    </thead>
  )
}

const Table = ({ patients, maxPatients }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const addPatient = () => {
    let index = patients.length;
    if (index < maxPatients) {
      return (
        <tr key={index} className='even:bg-[#D9D9D9]/100 p-4'>
          <td className='p-4 text-center'>
            <p className='table-row-text'>{index + 1}</p>
          </td>
          <td className='p-1'>
            <Button text='Thêm bệnh nhân' onClick={() => setModalOpen(true)}/>
            {patientModal()}
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
    <table className="w-full text-left table-auto-min-w-max">
      <TableHeader />

      <tbody> 
        {
          patients.map((patient, index) => {
            return (
              <tr key={index} className='even:bg-[#D9D9D9]/100 p-4'>
                <td className='p-4 text-center'>
                  <p className='table-row-text'>{index +1}</p>
                </td>
                <td className='p-4'>
                  <p className='table-row-text'>{patient.name}</p>
                </td>
                <td className='p-4 text-center'>
                  <p className='table-row-text'>{patient.sex}</p>
                </td>
                <td className='p-4 text-center'>
                  <p className='table-row-text'>{patient.yearOfBirth}</p>
                </td>
                <td className='p-4'>
                  <p className='table-row-text'>{patient.address}</p>
                </td>
                <td className='p-4'>
                  <span className='flex flex-row space-x-2'>
                    <EditButton />
                    <TrashButton />
                  </span> 
                </td>
              </tr>
            )
          })
        }
        {addPatient()}
      </tbody>
    </table>
  )
}

const List = () => {
  const patients = [
    { name: 'Nguyễn Văn A',
      sex: 'Nam',
      yearOfBirth: '1990',
      address: 'Hà Nội'
    },
    {
      name: 'Nguyễn Thị B',
      sex: 'Nữ',
      yearOfBirth: '1995',
      address: 'Hải Phòng'
    },
    {
      name: 'Trần Văn C',
      sex: 'Nam',
      yearOfBirth: '1992',
      address: 'Hải Dương'
    }
  ];

  const maxPatients = 4;

  return (
    <div className='bg-gradient-to-r from-[#FF9A9E] via-[#FAD0C4] to-[#FAD0C4] h-screen flex flex-col'>
        <Header />
        <div className="mb-auto flex h-full">
          <Menu />

          <div className="flex-1 h-full relative mx-1 my-1">
            {/* Content header */}
            <div className='flex flex-col w-full h-350 items-center justify-center p-4 space-y-3'>
              <div className="text-black font-bold text-3xl">DANH SÁCH KHÁM BỆNH</div>
              <div className="flex flex-row w-full h-full items-center justify-center space-x-3">
                <div className="text-black text-lg">Ngày khám:</div>
                <input type="date" className="w-[200px] bg-transparent text-lg"/>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 w-full relative flex flex-col overflow-scroll">
              <Table patients={patients} maxPatients={maxPatients} /> 
            </div>
          </div> 
        </div>
      <Footer />
    </div>
  )
}

export default List