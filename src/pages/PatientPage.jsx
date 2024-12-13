import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../index.css';
import BE_SERVER from '../../config/system'
const LookingPage = () => {
  const [loading, setLoading] = useState(false);
  const [patient, setData] = useState({});
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
          setData(response.data.data[0]);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching patient data:', error);
          setLoading(false);
        });
    }
  }, []);

  const handleLookingButtonClick = () => {
    navigate('/search'); // Navigate to the search page
  };

  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6">
      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center">
          <div className="loader"></div>
          <p>Loading patient information...</p>
        </div>
      ) : (
        /* User Information Display as Table */
        <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <h1 className="text-3xl font-semibold mb-4 text-center">Patient Information</h1>

          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2 border">Field</th>
                  <th className="px-4 py-2 border">Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border font-bold">Full Name</td>
                  <td className="px-4 py-2 border">{patient["patientName"] || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-bold">Year of Birth</td>
                  <td className="px-4 py-2 border">{patient["examDate"] || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-bold">Phone Number</td>
                  <td className="px-4 py-2 border">{patient["symptoms"] || 'N/A'}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border font-bold">Symptoms</td>
                  <td className="px-4 py-2 border">{patient["diagnosis"] || 'N/A'}</td>
                </tr>
              </tbody>
            </table>
          </div>

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
