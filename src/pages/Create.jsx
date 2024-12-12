import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Menu from '../components/Menu';

import '../index.css';

const Create = () => {
  return (
    
        <div className="flex-1 h-full relative">
            <div className="flex flex-col items-center justify-center flex-1 p-6">
                <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-semibold mb-4 text-center">Create New Patient</h1>
                <div className="mb-4">
                    <h2 className="font-bold text-lg">Full Name:</h2>
                    <input type="text" className="border-2 border-black rounded-lg p-2 w-full" />
                </div>
                <div className="mb-4">
                    <h2 className="font-bold text-lg">Year of Birth:</h2>
                    <input type="number" className="border-2 border-black rounded-lg p-2 w-full" />
                </div>
                <div className="mb-4">
                    <h2 className="font-bold text-lg">Phone Number:</h2>
                    <input type="text" className="border-2 border-black rounded-lg p-2 w-full" />
                </div>
                <div className="mb-4">
                    <h2 className="font-bold text-lg">Symptoms:</h2>
                    <input type="text" className="border-2 border-black rounded-lg p-2 w-full" />
                </div>
                <button className="mt-4 w-full p-4 bg-[#D9D9D9] text-black font-semibold rounded-lg shadow-md hover:bg-[#FAD0C4] focus:outline-none transition-all">
                    Create Patient
                </button>
                </div>
            </div>
        </div>
     
  );
};

export default Create;