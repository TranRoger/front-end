import React, { useState, useEffect } from "react";
import MedicineForm from "../components/MedicineForm";
import Spinner from "../components/ui/Spinner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BE_SERVER from "../../config/system";

const Create = () => {
  const [fullName, setFullName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [medicines, setMedicines] = useState([]);
  const [position, setPosition] = useState("");
  const [patients, setPatients] = useState([]);

  const navigate = useNavigate();

  // Fetch patient data on component mount
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BE_SERVER}exam-form`)
      .then((response) => {
        console.log("Patient data:", response.data.data);
        setPatients(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
        setLoading(false);
      });
  }, []);

  // Create a new exam form for the patient
  const handleCreatePatient = () => {
    const patientObj = patients.find((item) => item.fullName === fullName);
    if (!patientObj) {
      alert("Patient not found!");
      return;
    }

    const data = {
      position,
      diagnosis,
      symptoms,
      medicines,
    };

    setLoading(true);
    axios
      .post(`${BE_SERVER}exam-form/create/${patientObj.Id}`, data)
      .then((response) => {
        setLoading(false);
        console.log("Patient created successfully:", response);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error creating patient:", error);
        alert("Error occurred while creating the patient");
      });
  };

  // Add medicine to the list
  const handleMedicineFormSubmit = (medicineData) => {
    setMedicines([...medicines, medicineData]);
    setShowMedicineModal(false);
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center p-6">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-5xl">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h1 className="text-3xl font-semibold mb-6 text-center">
              Create New Patient
            </h1>

            <div className="grid grid-cols-2 gap-4">
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
                <h2 className="font-bold text-lg">Position:</h2>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
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

              <div className="mb-4">
                <h2 className="font-bold text-lg">Diagnosis:</h2>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="border-2 border-black rounded-lg p-2 w-full"
                />
              </div>
            </div>

           

            <h2 className="text-2xl font-semibold mt-6 mb-4">Medicines Added:</h2>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse border border-gray-400">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-8 py-4 border">Medicine Name</th>
                    <th className="px-8 py-4 border">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  {medicines.length > 0 ? (
                    medicines.map((medicine, index) => (
                      <tr key={index} className="text-center">
                        <td className="px-8 py-4 border">{medicine.medicineName}</td>
                        <td className="px-8 py-4 border">{medicine.unitPrice}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="2"
                        className="px-8 py-4 border text-center"
                      >
                        No medicines added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              <button
                onClick={() => setShowMedicineModal(true)}
                className="mt-4 w-1/2 p-4 bg-[#D9D9D9] text-black font-semibold rounded-lg shadow-md hover:bg-[#FAD0C4] focus:outline-none transition-all"
              >
                Add Medicine
              </button>

              <button
              onClick={handleCreatePatient}
              className="mt-4 w-full p-4 bg-[#D9D9D9] text-black font-semibold rounded-lg shadow-md hover:bg-[#FAD0C4] focus:outline-none transition-all"
            >
              Create Patient
            </button>
            </div>
          </>
        )}
      </div>

      {showMedicineModal && (
        <MedicineForm
          Close={() => setShowMedicineModal(false)}
          handleSubmit={handleMedicineFormSubmit}
        />
      )}
    </div>
  );
};

export default Create;
