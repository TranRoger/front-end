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
      <div className="flex flex-1 flex-col w-full m-1 mr-3 xs:mx-1">
        {/* Content header */}
        <div className="flex xs:flex-col flex-row w-full h-28 items-center justify-between p-4 xs:p-1">
          <div className="text-black font-bold text-2xl p-2 xs:text-sm">
            DANH SÁCH KHÁM BỆNH
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full items-center md:space-y-4 space-y-0">
            <div className="flex flex-row md:space-x-3 items-center justify-center xs:mb-2">
              <div></div>
              <div className="text-black text-sm lg:text-lg xs:text-[10px]">Ngày khám:</div>
              <input
                type="date"
                placeholder="dd-mm-yyyy"
                value={date}
                className="w-[150px] xs:text-[10px] bg-transparent lg:text-lg"
                onChange={HandleDateChange}
              />
            </div>
            {maxPatients >
              patients.filter((item) => filterPatient(item)).length && (
                <Button
                  text={"Thêm bệnh nhân"}
                  handler={() => setModalOpen(true)}
                  className="xs:text-[10px] w-[250px]"
                />
              )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 max-w-screen max-h-full overflow-auto relative flex flex-col items-center">
          <Table
            patients={patients.filter((item) => filterPatient(item))}
            maxPatients={maxPatients}
            HandlePatient={() => setModalOpen(true)}
            HandleDelete={HandleDeleteButton}
            HandleEdit={HandleEditPatient}
            Button={(index) =>(
              <div className="xs:flex xs:flex-col xs:items-center flex flex-row items-center justify-center gap-1">
                <div>
                <EditButton className="xs:w-4 xs:h-4" handler={() => HandleEditPatient(index)} />
                <TrashButton className="xs:w-4 xs:h-4" handler={() => HandleDeleteButton(index)} />
                </div>
                <Button className="xs:text-[8px] xs:text-nowrap xs:p-0" text="Hóa đơn" handler={() => HandleInvoice(index)} />
                <Button className="xs:text-[8px] xs:text-nowrap xs:p-0" text="Phiếu khám" handler={() => HandleForm(index)} />
              </div>
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
