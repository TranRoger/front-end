import React, { useState } from 'react';
import MedicineForm from '../components/MedicineForm';
import Spinner from '../components/ui/Spinner';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BE_SERVER from '../../config/system';

const Create = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [medicines, setMedicines] = useState([]);

  const navigate = useNavigate();

  const handleCreatePatient = () => {
    const data = {
        Id,
      fullName,
      phoneNumber,
      symptoms,
    };
    setLoading(true);
    axios
      .post(`${BE_SERVER}exam-form/create/${id}`, data)
      .then((response) => {
        setLoading(false);
        console.log(response);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert('Error');
        console.error(error);
      });
  };

  const handleMedicineFormSubmit = (medicineData) => {
    setMedicines([...medicines, medicineData]);
    setShowMedicineModal(false); // Close modal after submitting
  };

  return (
    <div className="flex h-screen justify-center items-center gap-6 pb-40 pl-20">
      {/* Left section for creating new patient */}
      <div className="w-1/2 p-6">
        <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-semibold mb-4 text-center">Create New Patient</h1>
          {loading ? <Spinner /> : ''}
          <div className="mb-4">
            <h2 className="font-bold text-lg">Full Name:</h2>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="border-2 border-black rounded-lg p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <h2 className="font-bold text-lg">Phone Number:</h2>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border-2 border-black rounded-lg p-2 w-full"
            />
          </div>

          <div className="mb-4">
            <h2 className="font-bold text-lg">Symptoms:</h2>
            <input
              type="text"
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="border-2 border-black rounded-lg p-2 w-full"
            />
          </div>

          <button
            onClick={handleCreatePatient}
            className="mt-4 w-full p-4 bg-[#D9D9D9] text-black font-semibold rounded-lg shadow-md hover:bg-[#FAD0C4] focus:outline-none transition-all"
          >
            Create Patient
          </button>

          
        </div>
      </div>

      {/* Right section for displaying added medicines */}
      <div className="w-1/2 p-6 bg-[#f5f5f5] ">
        <h2 className="text-xl font-semibold mb-4">Medicines Added:</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Medicine Name</th>
                <th className="px-4 py-2 border">Unit</th>
                <th className="px-4 py-2 border">Numbers</th>
                <th className="px-4 py-2 border">Usage</th>
              </tr>
            </thead>
            <tbody>
              {medicines.map((medicine, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 border">{medicine.medicineName}</td>
                  <td className="px-4 py-2 border">{medicine.unit}</td>
                  <td className="px-4 py-2 border">{medicine.unitPrice}</td>
                  <td className="px-4 py-2 border">{medicine.usageMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => setShowMedicineModal(true)}
            className="mt-4 w-full p-4 bg-[#D9D9D9] text-black font-semibold rounded-lg shadow-md hover:bg-[#FAD0C4] focus:outline-none transition-all"
          >
            Thêm thuốc
          </button>
        </div>
      </div>

      {/* Medicine Form Modal */}
      {showMedicineModal && (
        <MedicineForm
          Close={() => setShowMedicineModal(false)} // Close the modal when called
          handleSubmit={handleMedicineFormSubmit} // Handle the form submission
        />
      )}
    </div>
  );
};

export default Create;
