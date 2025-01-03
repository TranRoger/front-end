import React, { useState, useEffect, useRef } from 'react';
import invoiceService from '../services/invoice.service';
import Spinner from '../components/ui/Spinner';
import Button from '../components/ui/button';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import PrintButton from '../components/ui/printButton';


const Invoice = () => {
    const location = useLocation();
    const patientID = location.state?.patientID;
    const [loading, setLoading] = useState(false);
    const [invoiceDetails, setInvoiceDetails] = useState([]);
    const contentRef = useRef(null);
    const reactToPrint = useReactToPrint({ contentRef });
    const [error, setError] = useState(null);

    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

    const HandleDateChange = (e) => {
        setDate(e.target.value);
    };

    const fetchData = async () => {
        if (patientID) {
            setLoading(true);
            try {
                const res = await invoiceService.getInvoiceDetails(patientID);
                // console.log(res.data);
                setInvoiceDetails(res.data);
            } catch (err) {
                console.log(err);
                if (err.response) {
                    setError(err.response.data.message);
                }
            }
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const HandleComplete = async () => {
        setLoading(true);
        console.log(patientID);
        if (patientID) {
            try {
                const res = await invoiceService.createInvoice(patientID);
                console.log(res);
                setError(res.data.message);
            } catch (err) {
                console.log(err);
                setError(err.response.data.message);
            } finally {
                setLoading(false);
            }
        }
    }

    if (loading) {
        return <Spinner />;
    } else return (
        <div className="flex flex-col w-full h-full items-center justify-center">
            <div ref={contentRef} className="flex flex-1 flex-col w-full m-1 mr-3 xs:m-0">
                {/* Content header */}
                <div className="flex flex-col w-full h-28 items-center justify-between">
                    <div className="text-black font-bold text-3xl p-2 xs:text-sm">
                        HÓA ĐƠN
                    </div>
                    <div className="grid grid-cols-3 w-full h-full items-center space-x-3 mr-auto">
                        <div></div>
                        <div className="flex flex-row space-x-3 items-center justify-center xs:text-[10px]">
                            <div className="text-black text-lg xs:text-[10px]">Ngày:</div>
                            <input
                                type="date"
                                placeholder="dd-mm-yyyy"
                                value={date}
                                className="w-[200px] bg-transparent text-lg xs:text-[10px]"
                                onChange={HandleDateChange}
                            />
                        </div>
                    </div>
                </div>


                {/* Content */}
                <div className="grid items-center justify-center space-y-3 mt-3">
                    <div className="fields ">
                        <div className="text-black text-lg xs:text-[10px]">Tên bệnh nhân:</div>
                        <input
                            type="text"
                            placeholder="Nhập tên bệnh nhân"
                            className="input border-none xs:text-[10px]"
                            disabled
                            value={invoiceDetails.patientName}
                        />
                    </div>
                    <div className="fields">
                        <div className="text-black text-lg xs:text-[10px]">Tiền khám:</div>
                        <input
                            type="text"
                            placeholder="Nhập tiền khám"
                            className="input border-none xs:text-[10px]"
                            disabled
                            value={invoiceDetails.examFee + ' Nghìn VND'}
                        />
                    </div>
                    <div className="fields">
                        <div className="text-black text-lg xs:text-[10px]">Tiền thuốc:</div>
                        <input
                            type="text"
                            placeholder="Tiền thuốc"
                            className="input xs:text-[10px]"
                            disabled
                            value={invoiceDetails.medicineFee + ' Nghìn VND'}
                        />
                    </div>
                    <div className="fields">
                        <div className="text-black text-lg xs:text-[10px]">Tổng tiền:</div>
                        <input
                            type="text"
                            placeholder="Tổng tiền"
                            className="input border-none xs:text-[10px]"
                            disabled
                            value={invoiceDetails.totalFee + ' Nghìn VND'}
                        />
                    </div>
                    {error && <div className="bg-red-500 rounded-lg p-2 flex flex-row items-center justify-center text-white text-lg xs:text-[10px]">{error}</div>}
                </div>
            </div>
            <div className="flex flex-row justify-center space-x-10 items-center mb-10 xs:mt-4">
                <PrintButton className='xs:w-3 xs:h-3' handler={() => reactToPrint()} />
                {patientID && <Button handler={() => HandleComplete()} text="Hoàn tất thanh toán" />}
            </div>
        </div>
    );
};

export default Invoice;