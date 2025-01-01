import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import BE_SERVER from '../../config/system';

const LookingPage = () => {
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState([]); // Update state to store multiple patients
  const location = useLocation();
  const navigate = useNavigate();

  // Get query parameter from URL
  const params = new URLSearchParams(location.search);
  const query = params.get('param');

  useEffect(() => {
    if (query) {
      setLoading(true);
      axios
        .get(`${BE_SERVER}patient-search?name=${query}`)
        .then((response) => {
          console.log('Patient data:', response.data.data);
          setPatients(response.data.data || []); // Store all patients in state
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching patient data:', error);
          setLoading(false);
        });
    }
  }, [query]);

  const handleLookingButtonClick = () => {
    navigate('/search'); // Navigate to the search page
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6">
      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center">
          <div className="loader"></div>
          <p>Đang tìm kiếm thông tin bệnh nhân...</p>
        </div>
      ) : (
        <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-4xl">
          <h1 className="text-3xl font-semibold mb-4 text-center">Thông tin bệnh nhân</h1>

          {patients.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 border">Họ tên</th>
                    <th className="px-4 py-2 border">Ngày khám</th>
                    <th className="px-4 py-2 border">Triệu chứng</th>
                    <th className="px-4 py-2 border">Chuẩn đoán</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">{patient.patientName || 'N/A'}</td>
                      <td className="px-4 py-2 border">{patient.examDate || 'N/A'}</td>
                      <td className="px-4 py-2 border">{patient.symptoms || 'N/A'}</td>
                      <td className="px-4 py-2 border">{patient.diagnosis || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-red-500">Không tìm thấy bệnh nhân</p>
          )}

          <button
            onClick={handleLookingButtonClick}
            className="mt-4 w-full p-4 bg-[#D9D9D9] text-black font-semibold rounded-lg shadow-md hover:bg-[#FAD0C4] focus:outline-none transition-all"
          >
            Quay về
          </button>
        </div>
      )}
    </div>
  );
};

export default LookingPage;
