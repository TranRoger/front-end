import React, { useState, useEffect } from 'react';
import Button from '../components/ui/button';
import reportService from '../services/report.service';
import Spinner from "../components/ui/Spinner";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); 
    };
  }, [value, delay]);

  return debouncedValue;
};

const Report = () => {
  const [selectedMonth, setSelectedMonth] = useState(''); 
  const [reportData, setReportData] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 
  const [reportType, setReportType] = useState(null); 
  
  const debouncedMonth = useDebounce(selectedMonth, 500); 

  const fetchReport = async (month) => {
    if (!month) {
      setError('Vui lòng nhập tháng.');
      setReportData(null); 
      return;
    }
  
    setLoading(true);
    setReportData(null); 
    setError(null);
  
    try {
      let data;
      if (reportType === 'revenue') {
        data = await reportService.getRevenue(month); 
      } else if (reportType === 'medicine') {
        data = await reportService.getMedicineData(month); 
      }
  
      if ((!data.success && reportType === 'revenue') || ( !data?.medicines && reportType === 'medicine')) {
        setError(data.message); 
        setReportData(null);
      } else if (data?.medicines) {
        setReportData(data.medicines); 
      } else if (data?.success) {
        setReportData(data.report || []);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message); 
      } else {
        setError('Đã xảy ra lỗi khi tải báo cáo.'); 
      }
    } finally {
      setLoading(false);
    }
  };
  


  useEffect(() => {
    if (debouncedMonth && reportType) {
      fetchReport(debouncedMonth);
    }
  }, [debouncedMonth, reportType]); 

  if (loading) {
    return <Spinner />;
  }

  const renderTable = (data) => {
    if (!data || data.length === 0) {
      return <div>Không có báo cáo của tháng này</div>;
    }

    if (reportType === 'revenue') {
      const columns = ['STT', 'Ngày', 'Số bệnh nhân', 'Doanh thu'];
      return (
        <table className="table-auto border-collapse border border-gray-300 w-3/5 overflow-auto">
          <thead className="p-4">
            <tr className='bg-[#D9D9D9]/100 p-4'>
              {columns.map((col) => (
                <th key={col} className="table-header text-center p-4">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}  className='even:bg-[#D9D9D9]/100 p-4'>
                <td className="table-row-text p-4 text-center">{index + 1}</td>
                <td className="table-row-text p-4 text-center">{row.day}</td>
                <td className="table-row-text p-4 text-center">{row.patients}</td>
                <td className="table-row-text p-4 text-center">{row.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (reportType === 'medicine') {
      const columns = ['STT', 'Thuốc', 'Đơn vị tính', 'Mô tả', 'Số lượng', 'Số lần dùng']; 
      return (
        <table className="table-auto border-collapse border border-gray-300 w-3/5 overflow-auto">
          <thead className="p-4">
          <tr className='bg-[#D9D9D9]/100 p-4'>
              {columns.map((col) => (
                <th key={col} className="table-header text-center p-4">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}  className='even:bg-[#D9D9D9]/100 p-4'>
                <td className="table-row-text p-4 text-center">{index + 1}</td>
                <td className="table-row-text p-4 text-center">{row.name}</td>
                <td className="table-row-text p-4 text-center">{row.unit}</td>
                <td className="table-row-text p-4 text-center">{row.description}</td>
                <td className="table-row-text p-4 text-center">{row.totalQuantity}</td>
                <td className="table-row-text p-4 text-center">{row.usageCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-20">
      {!reportType ? (
        <>
          <h1 className="text-[30px]">Báo Cáo Hằng Tháng</h1>
            <Button 
              text={"Doanh thu"} 
              handler={() => setReportType('revenue')} 
            />
            <Button 
              text={"Thuốc"} 
              handler={() => setReportType('medicine')} 
            />
        </>
      ) : (
        <>
          <div>
            <h1 className="text-[30px] mb-5">{reportType === 'revenue' ? 'Báo Cáo Doanh Thu' : 'Báo Cáo Thuốc'}</h1>
            <label className="ml-0" htmlFor="month">Tháng: </label>
            <input 
              id="month"
              type="text"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              placeholder="Nhập tháng (từ 1-12)"
            />
          </div>

          <div>
            <Button text="Trở về" handler={() => {
              setReportType(null); 
              setSelectedMonth(''); 
            }} />
          </div>
           {debouncedMonth && error && <div className="text-red-500">{error}</div>}

            {debouncedMonth && reportData !== null && renderTable(reportData)}

            {debouncedMonth && reportData === null && !loading && !error && (
                <div>Không có báo cáo của tháng này</div>
            )}
        </>
      )}
    </div>
  );
};

export default Report;
