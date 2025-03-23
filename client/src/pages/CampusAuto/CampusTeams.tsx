// frontend/components/CampusTeams.tsx

import React, { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

const CampusTeams: React.FC = () => {
  const [jsonData, setJsonData] = useState<object[] | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      alert("Please select a file!");
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = (e) => {
      if (!e.target) return;

      const binaryData = e.target.result;
      const workbook = XLSX.read(binaryData, { type: "binary" });

      // Read first sheet
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      // Convert to JSON
      const data: object[] = XLSX.utils.sheet_to_json(sheet);
      setJsonData(data);
      console.log("Converted JSON:", data);
    };

    reader.onerror = (error) => {
      console.error("Error reading file:", error);
    };
  };

  // Handle upload to MongoDB
  const handleUpload = async () => {
    if (!jsonData) {
      alert("No data to upload!");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/sendmail/normal-mail`, { data: jsonData });
      alert(response.data.message);
      console.log(jsonData)
    } catch (error) {
      console.error("Error uploading data:", error);
      alert("Upload failed!");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} className="mb-2" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Upload Data
      </button>
    </div>
  );
};

export default CampusTeams;