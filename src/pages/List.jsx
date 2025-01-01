import React, { useState, useEffect } from "react";
import Table from "../components/PatientTable";
import PatientModal from "../components/PatientModal";
import Button from "../components/ui/button";
import axios from "axios";
import Spinner from "../components/ui/Spinner";
import moment from "moment";
import TrashButton from '../components/ui/dltButton'
import EditButton from '../components/ui/editButton'
import { useNavigate } from "react-router-dom";

import BE_SERVER from "../../config/system";

const List = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [patients, setPatient] = useState([]);
  const [maxPatients, setMaxPatients] = useState();
  const [modalOpen, setModalOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${BE_SERVER}regulation-update/general-regulation`)
      .then((response) => {
        setMaxPatients(response.data.maxPatientsPerDay);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);

    axios
      .get(`${BE_SERVER}exam-list`)
      .then((response) => {
        setPatient(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);


  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

  const HandleDateChange = (e) => {
    setDate(e.target.value);
  };

  const HandleEditPatient = (index) => {
    setPatientToEdit(index);

    setModalOpen(true);
  };

  const HandleDeleteButton = (index) => {
    setLoading(true);

    const delteted = patients.filter((item) => filterPatient(item))[index]._id;
    axios
      .delete(`${BE_SERVER}exam-list/delete/${delteted}`)

      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    setPatient(patients.filter((patient, idx) => patient._id !== delteted));
  };

  const HandleNewPatient = (newPatient) => {
    setLoading(true);
    if (patientToEdit === null) {
      axios
        .post(`${BE_SERVER}exam-list/create`, newPatient)
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });

      setPatient([...patients, newPatient]);
    } else {
      axios
        .patch(`${BE_SERVER}exam-list/edit/${newPatient._id}`, newPatient)
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });

      setPatient(
        patients.map((patient, idx) => {
          if (patient._id !== newPatient._id) return patient;

          return newPatient;
        })
      );
    }
  };

  const filterPatient = (patient) => {
    const d = moment(date);
    let day = d.date();
    let month = d.month();
    let year = d.year();

    const created = moment(patient.createdAt);
    if (
      created.date() === day &&
      created.month() === month &&
      created.year() === year
    )
      return true;

    return false;
  };

  const HandleInvoice = (index) => {
    navigate('/invoice', { state: { patientID: patients.filter((item) => filterPatient(item))[index]._id } });
  }

  const HandleForm = (index) => {
    navigate('/create', { state: { patientID: patients.filter((item) => filterPatient(item))[index]._id } });
  }

  if (loading) {
    return <Spinner />;
  } else if (maxPatients)
    return (
      <div className="flex flex-1 flex-col w-full m-1 mr-3">
        {/* Content header */}
        <div className="flex flex-col lg:flex-row w-full h-28 items-center justify-between p-4">
          <div className="text-black font-bold text-2xl lg:text-3xl p-2">
            DANH SÁCH KHÁM BỆNH
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full h-full items-center space-y-4 lg:space-y-0">
            <div></div>
            <div className="flex flex-row space-x-3 items-center justify-center">
              <div className="text-black text-sm lg:text-lg">Ngày khám:</div>
              <input
                type="date"
                placeholder="dd-mm-yyyy"
                value={date}
                className="w-[150px] bg-transparent text-sm lg:text-lg"
                onChange={HandleDateChange}
              />
            </div>
            {maxPatients >
              patients.filter((item) => filterPatient(item)).length && (
                <Button
                  text={"Thêm bệnh nhân"}
                  handler={() => setModalOpen(true)}
                  className="w-[200px] lg:w-[250px]"
                />
              )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 w-full max-h-full overflow-auto relative flex flex-col items-center">
          <Table
            patients={patients.filter((item) => filterPatient(item))}
            maxPatients={maxPatients}
            HandlePatient={() => setModalOpen(true)}
            HandleDelete={HandleDeleteButton}
            HandleEdit={HandleEditPatient}
            Button={(index) =>(
              <>
                <EditButton handler={() => HandleEditPatient(index)} />
                <TrashButton handler={() => HandleDeleteButton(index)} />
                <Button text="Hóa đơn" handler={() => HandleInvoice(index)} />
                <Button text="Phiếu khám" handler={() => HandleForm(index)} />
              </>
            )}
          />
        </div>
        {modalOpen && (
          <PatientModal
            CloseModal={() => {
              setModalOpen(false);
              setPatientToEdit(null);
            }}
            handleSubmit={HandleNewPatient}
            defaultValue={
              patientToEdit !== null &&
              patients.filter((item) => filterPatient(item))[patientToEdit]
            }
          />
        )}
      </div>
    );
};

export default List;
