import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'

import { useNavigate } from 'react-router-dom';
import '../index.css'
const LookingPage = () => {
    const navigate = useNavigate(); // Hook for navigation
    const userInfo = {
        name: 'John Doe',
        birthYear: 1990,
        phoneNumber: '123-456-7890',
        symptoms: 'Cough, Fever, Fatigue',
      };
      const handleLookingButtonClick = () => {
        navigate('/search'); // Navigate to the home page or any other page
      };
      return (
        
          
          <div className="flex flex-col items-center justify-center flex-1 p-6">
           
            {/* User Information Display */}
            <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
              <h1 className="text-3xl font-semibold mb-4 text-center">Patient Information</h1>
    
              <div className="mb-4">
                <h2 className="font-bold text-lg">Full Name:</h2>
                <p>{userInfo.name}</p>
              </div>
    
              <div className="mb-4">
                <h2 className="font-bold text-lg">Year of Birth:</h2>
                <p>{userInfo.birthYear}</p>
              </div>
    
              <div className="mb-4">
                <h2 className="font-bold text-lg">Phone Number:</h2>
                <p>{userInfo.phoneNumber}</p>
              </div>
    
              <div className="mb-4">
                <h2 className="font-bold text-lg">Symptoms:</h2>
                <p>{userInfo.symptoms}</p>
              </div>
              <button
            onClick={handleLookingButtonClick}
            className="mt-4 w-full p-4 bg-[#D9D9D9] text-black font-semibold rounded-lg shadow-md hover:bg-[#FAD0C4] focus:outline-none transition-all"
          >
            Quay về
          </button>
            </div>
          </div>
          
         
        
      );
};

export default LookingPage;
