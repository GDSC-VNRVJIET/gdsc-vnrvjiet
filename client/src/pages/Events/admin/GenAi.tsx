import { useState, useEffect } from "react";
import * as XLSX from 'xlsx';
import axios from "axios";

function GenAi() {

  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
  const [typeError, setTypeError] = useState<string>("");
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [excelData, setExcelData] = useState<any[] | null>(null);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACK_URL}/genAi/get-data`);
        const sortedData = res.data.data.sort((a: any, b: any) => {
          return b['# of Skill Badges Completed'] - a['# of Skill Badges Completed'];
        });
        setExcelData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [triggerUpdate]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileTypes = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    ];
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError("");
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (event: ProgressEvent<FileReader>) => {
          if (event.target && event.target.result) {
            setExcelFile(event.target.result as ArrayBuffer);
          }
        };
      } else {
        setTypeError('Please select only Excel file types');
        setExcelFile(null);
      }
    } else {
      console.log('Please select your file');
    }
  }

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: 'buffer' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const sortedData = data.sort((a: any, b: any) => {
        return b['# of Skill Badges Completed'] - a['# of Skill Badges Completed'];
      });

      try {
        const res = await axios.put(`${process.env.REACT_APP_BACK_URL}/genAi/update-data`, {
          data: sortedData,
        });
        console.log("Bulk update result:", res.data);

        setTriggerUpdate(prev => !prev);
      } catch (error) {
        console.error("Error updating data in bulk:", error);
      }
    }
  }

  return (
    <div className="wrapper p-8 bg-gray-100 min-h-screen">
      <h3 className="text-2xl font-bold text-gray-700 mb-6 text-center">Upload & View Excel Sheets</h3>

      {/* form */}
      <form className="form-group custom-form mb-6 flex flex-col items-center" onSubmit={handleUpdateSubmit}>
        <input 
          type="file" 
          className="form-control p-3 border rounded-md w-full max-w-md mb-4 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          required 
          onChange={handleFile} 
        />
        <button 
          type="submit" 
          className="btn btn-success bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-md"
        >
          UPDATE
        </button>
        {typeError && (
          <div className="alert alert-danger text-red-600 mt-4">{typeError}</div>
        )}
      </form>

      {/* view data */}
      <div className="viewer">
        {excelData ? (
          <div className="w-full max-w-6xl mx-auto overflow-auto">
            <table className="table-auto min-w-full text-left border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-blue-500 text-white">
                  {Object.keys(excelData[0])
                    .filter((key) => key !== 'Google Cloud Skills Boost Profile URL') // Remove specific column
                    .map((key) => (
                      <th key={key} className="py-3 px-6 text-sm font-semibold uppercase">{key}</th>
                    ))}
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {excelData.map((individualExcelData, index) => (
                  <tr 
                    key={index} 
                    className={`${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200`}
                  >
                    {Object.keys(individualExcelData)
                      .filter((key) => key !== 'Google Cloud Skills Boost Profile URL') // Filter out the column
                      .map((key) => (
                        <td 
                          key={key} 
                          className="py-3 px-6 border-b"
                          title={
                            key === 'username' && individualExcelData['Google Cloud Skills Boost Profile URL']
                              ? individualExcelData['Google Cloud Skills Boost Profile URL'] // Show URL on hover for username
                              : ''
                          }
                        >
                          {individualExcelData[key]}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500">No File is uploaded yet!</div>
        )}
      </div>
    </div>
  );
}

export default GenAi;
