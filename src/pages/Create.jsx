import React, { useEffect, useState, useRef } from 'react';
import formService from '../services/form.service';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/button';
import DeleteButton from '../components/ui/dltButton';
import PrintButton from '../components/ui/printButton';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';

const Create = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const patientID = location.state?.patientID;
    const [patient, setPatient] = useState('');
    const [loading, setLoading] = useState(false);
    const [disease, setDisease] = useState([]);
    const [medicine, setMedicine] = useState([]);
    const [currentDisease, setCurrentDisease] = useState('');
    const [medOnBill, setMedOnBill] = useState([]);
    const [request, setRequest] = useState({});
    const [error, setError] = useState(null);
    const contentRef = useRef(null);
    const reactToPrint = useReactToPrint({ contentRef });

    const fetchData = async () => {
        // console.log(patientID);
        setLoading(true);
        const response = await formService.getDisease();
        setDisease(response);
        setCurrentDisease(response[0]);
        const response2 = await formService.getMedicine();
        setMedicine(response2);
        if (patientID) {
            const response3 = await formService.getPatient(patientID);
            // console.log(response3);
            setPatient(response3.patient);
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        setRequest({
            patientID: patient._id,
            position: 1,
            symptoms: currentDisease.symptoms,
            diagnosis: currentDisease.diseaseName,
            medicines: medOnBill.map((item) => {
                return {
                    medicineID: item._id,
                    quantity: item.quantity
                }
            })
        });
    }, [medOnBill, currentDisease]);

    const [date, setDate] = useState(moment().format("YYYY-MM-DD"));

    const HandleDateChange = (e) => {
        setDate(e.target.value);
    };

    const HandleAddMed = () => {
        setMedOnBill([...medOnBill, { _id: medicine[0]._id, medicineName: medicine[0].medicineName, unit: medicine[0].unit, quantity: 1, usageMethod: medicine[0].usageMethod }]);
    }

    const HandleChooseMed = (id, index) => {

        // console.log(id, index)
        const med = medicine.find((item) => item._id === id);
        // console.log(med)
        // console.log(medOnBill)
        setMedOnBill(medOnBill.map((item, idx) => {
            // console.log(item)
            if (idx === index) {
                item._id = med._id;
                item.medicineName = med.medicineName;
                item.unit = med.unit;
                item.usageMethod = med.usageMethod;
                // console.log("hree")
            }
            // console.log(item)
            return item;
        }));
        // console.log(medOnBill)
    }

    const HandleSubmit = async () => {
        setLoading(true);

        if (request.patientID === undefined) {
            setError("Chưa chọn bệnh nhân");
            setLoading(false);
            return;
        }

        try {
            // console.log(request);
            const response = await formService.createForm(request, patient._id);
            // console.log(response);
            setError(response.message);
        } catch (error) {
            // console.log(error`);
            setError(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    const HandleQuantityChange = (value, index) => {
        const updatedMedOnBill = medOnBill.map((item, idx) => {
            if (idx === index) {
                return { ...item, quantity: parseInt(value) };
            }
            return item;
        });
        setMedOnBill(updatedMedOnBill);
    };

    if (loading) {
        return <Spinner />;
    }
    else if (disease && medicine) return (
        <div className='flex flex-1 flex-col w-full'>
            <div ref={contentRef} className='flex flex-1 flex-col w-full h-[60%] mb-10'>
                {/* Content header */}
                <div className="flex flex-row h-fit">
                    <div className="text-black font-bold text-3xl p-2 w-full mx-5 items-center">
                        PHIẾU KHÁM BỆNH
                    </div>
                    <div className="flex flex-row space-x-3 items-center justify-center w-full mx-5">
                        <div className="text-black text-lg w-full text-end">Ngày khám:</div>
                        <input
                            type="date"
                            placeholder="dd-mm-yyyy"
                            value={date}
                            className=" bg-transparent text-lg h-fit"
                            onChange={HandleDateChange}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col w-full max-h-full items-center justify-start mx-1 space-y-3">
                    <div className="grid items-center space-y-3">
                        <div className="fields justify-between">
                            <div className="text-black text-lg">Tên bệnh nhân:</div>
                            <input
                                type="text"
                                placeholder="Nhập tên bệnh nhân"
                                className="input"
                                value={patient.fullName}
                                readOnly
                            />
                        </div>
                        <div className="fields">
                            <div className="text-black text-lg">Triệu chứng:</div>
                            <input
                                type="text"
                                placeholder="Nhập triệu chứng:"
                                className="input"
                                value={currentDisease.symptoms}
                                onChange={(e) => { currentDisease.symptoms = e.target.value }}
                            />
                        </div>
                        <div className="fields">
                            <div className="text-black text-lg">Dự đoán loại bệnh:</div>
                            <select className="input" onChange={(e) => { setCurrentDisease(disease.find((item, index) => item._id === e.target.value)) }}>
                                {disease.map((item, index) => {
                                    return (
                                        <option name={index} key={index} value={item._id}>{item.diseaseName}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    <div className='overflow-y-scroll flex-1 flex w-full'>
                        <table className='w-full'>
                            <thead className='p-4'>
                                <tr className='bg-[#D9D9D9]/100'>
                                    <th className='table-header text-center'>
                                        <p className="table-header-text">
                                            STT
                                        </p>
                                    </th>
                                    <th className='table-header'>
                                        <p className="table-header-text text-left">
                                            Thuốc
                                        </p>
                                    </th>
                                    <th className='table-header text-center'>
                                        <p className="table-header-text">
                                            Đơn Vị
                                        </p>
                                    </th>
                                    <th className='table-header text-center'>
                                        <p className="table-header-text">
                                            Số Lượng
                                        </p>
                                    </th>
                                    <th className='table-header'>
                                        <p className="table-header-text text-left">
                                            Cách Dùng
                                        </p>
                                    </th>
                                    <th className=''>
                                        <Button text={"Thêm thuốc"} handler={() => { HandleAddMed() }} />
                                    </th>
                                </tr>
                            </thead>

                            <tbody className='w-full'>
                                {
                                    medOnBill.map((item, index) => {
                                        return (
                                            <tr key={index} className='even:bg-[#D9D9D9]/100'>
                                                <td className='text-center'>{index + 1}</td>
                                                <td>
                                                    <select className='bg-transparent focus:outline-none text-lg' onChange={(e) => { HandleChooseMed(e.target.value, index); }}>
                                                        {medicine.map((med, idx) => {
                                                            return (
                                                                <option key={idx} value={med._id}>{med.medicineName}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </td>
                                                <td className='text-center'>{item.unit}</td>
                                                <td className='text-center'>
                                                    <input type='number' value={item.quantity} className='border-b-2 border-black bg-transparent focus:outline-none text-lg text-center' onChange={(e) => HandleQuantityChange(e.target.value, index)} />
                                                </td>
                                                <td>
                                                    {item.usageMethod}
                                                </td>
                                                <td className='text-center p-4'>
                                                    <DeleteButton handler={() => { setMedOnBill(medOnBill.filter((med, idx) => idx !== index)) }} />
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    {error && <div className="bg-red-500 rounded-lg p-2 flex flex-row items-center justify-center text-white text-lg">{error}</div>}
                </div >
            </div>
            <div className='flex flex-row space-x-3 items-center justify-end p-3 m-5'>
                <Button text={"Xuất hóa đơn"} handler={() => {
                    navigate('/invoice', { state: { patientID: request.patientID } });
                }} />
                <Button text={"Lưu"} handler={() => HandleSubmit()} />
                <PrintButton handler={() => reactToPrint()} />
            </div>
        </div>
    );
};

export default Create;