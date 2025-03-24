import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { eventRegistrations } from "../../../Apis/events";
import { json2csv } from "json-2-csv";
// import { saveAs } from "file-saver";

interface RegistrationData {
  _id: {
    $oid: string;
  };
  rollno: string;
  email: string;
  entered: boolean;
  whatsapp: string;
  branch: string;
  name: string;
  section: string;
  mailSent: boolean;
  paymentSuccess: boolean;
  year: string;
  interest: string;
}

const CheckRegistrations: React.FC = () => {
  const navigate = useNavigate();
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [showunsentMails, setShowunsentMails] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const eventName = window.location.pathname.split("/")[2];
  const [err, setErr] = useState<String>("");
  console.log(selectedFilter);

  const fetchData = async () => {
    const res = await eventRegistrations(eventName);
    console.log(res.payload);
    if (res.message === "Event registrations") {
      setRegistrations(res.payload);
    } else {
      setErr(res.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function goto() {
    navigate("/checkuser");
  }
  function unsentMails() {
    if (showunsentMails) {
      fetchData();
    } else {
      let unsentmail = registrations.filter(
        (registration) => registration.mailSent === false
      );
      setRegistrations(unsentmail);
    }
    setShowunsentMails(!showunsentMails);
  }
  const downloadCSV = () => {
    try {
      let filteredData = registrations.map(
        ({
          name,
          rollno,
          year,
          branch,
          section,
          whatsapp,
          email,
          entered,
          mailSent,
          paymentSuccess,
        }) => ({
          Name: name,
          RollNo: rollno,
          Year: year,
          Branch: branch,
          Section: section,
          WhatsApp: whatsapp,
          Email: email,
          Entered: entered,
          MailSent: mailSent,
          PaymentSuccess: paymentSuccess,
        })
      );
      console.log(selectedFilter);
      if (selectedFilter === "") {
        filteredData = filteredData;
      } else if (selectedFilter === "entered") {
        filteredData = filteredData.filter(
          (registration) => registration.Entered === true
        );
      } else if (selectedFilter === "notEntered") {
        filteredData = filteredData.filter(
          (registration) => registration.Entered === false
        );
      } else {
        filteredData = filteredData;
      }
      const csv = json2csv(filteredData);
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${eventName}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Cleanup
    } catch (error) {
      console.error("Error converting JSON to CSV:", error);
    }
  };

  return err ? (
    <div className="text-center text-3xl font-bold">
      Error Fetching Data : ${err}
    </div>
  ) : (
    <div className="container mx-auto p-5">
      <h2 className="text-center text-3xl font-bold mb-5 mt-3">
        {eventName.replaceAll("%20", " ")} Registrations
      </h2>
      <div className="mb-7 flex flex-col md:flex-row md:items-center justify-end mt-4 space-y-2 md:space-y-0 md:space-x-2">
        <label
          htmlFor="filters"
          className="text-sm font-medium text-gray-900 dark:text-white"
        >
          Select an option
        </label>

        <select
          id="filters"
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 
        focus:border-blue-500 p-2.5 w-full md:w-auto"
        >
          <option value="" disabled>
            Set filter to Download
          </option>
          <option value="entered">Entered</option>
          <option value="notEntered">Not Entered</option>
          <option value="wholedata">Whole Data</option>
        </select>

        <button
          onClick={downloadCSV}
          className="bg-green-600 text-white rounded px-3 py-2 text-sm hover:bg-green-700 w-full md:w-auto"
        >
          Download CSV
        </button>

        <button
          onClick={goto}
          className="flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-2 px-4 rounded-lg 
      shadow-md transition-all duration-300 hover:bg-red-700 hover:shadow-lg focus:outline-none 
      focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 active:scale-95"
        >
          <FiCheckCircle className="text-lg" />
          <span>Verify Participant</span>
        </button>

        <button
          onClick={unsentMails}
          className="bg-blue-500 text-white rounded px-3 py-2 text-sm hover:bg-blue-600 font-semibold border border-blue-500 w-full md:w-auto"
        >
          {showunsentMails ? "Show all" : "Show unsent mails"}
        </button>
      </div>
      <div className="w-full min-h-screen max-w-6xl mx-auto px-4">
        <div className="overflow-x-auto overflow-y-auto max-h-[800px] bg-white shadow-md rounded-lg">
          <table className="min-w-full border-collapse">
            {/* Table Head */}
            <thead className="bg-gray-600 text-white text-sm sm:text-base uppercase sticky top-0">
              <tr>
                {[
                  "S.No.",
                  "Name",
                  "Roll No",
                  "Year",
                  "Branch",
                  "Section",
                  "Email",
                  "WhatsApp",
                  "Entered",
                  "Mail Sent",
                  "Payment Success",
                  "Interest",
                ].map((header) => (
                  <th key={header} className="px-4 py-3 text-center border">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="text-gray-900">
              {registrations.map((registration, index) => (
                <tr
                  key={registration._id.$oid}
                  className="odd:bg-gray-100 even:bg-gray-50 hover:bg-gray-200 transition"
                >
                  <td className="border px-4 py-3 text-center font-medium">
                    {index + 1}
                  </td>
                  <td className="border px-4 text-center py-3">{registration.name}</td>
                  <td className="border px-4 text-center py-3">{registration.rollno}</td>
                  <td className="border px-4 text-center py-3">{registration.year}</td>
                  <td className="border px-4 text-center py-3">{registration.branch}</td>
                  <td className="border px-4 text-center py-3">{registration.section}</td>
                  <td className="border px-4 text-center py-3">{registration.email}</td>
                  <td className="border px-4 text-center py-3">{registration.whatsapp}</td>
                  <td className="border px-4 py-3 text-center">
                    {registration.entered ? (
                      <FaCheckCircle className="text-green-500 text-lg mx-auto" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-lg mx-auto" />
                    )}
                  </td>
                  <td className="border px-4 py-3 text-center">
                    {registration.mailSent ? (
                      <FaCheckCircle className="text-green-500 text-lg mx-auto" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-lg mx-auto" />
                    )}
                  </td>
                  <td className="border px-4 py-3 text-center">
                    {registration.paymentSuccess ? (
                      <FaCheckCircle className="text-green-500 text-lg mx-auto" />
                    ) : (
                      <FaTimesCircle className="text-red-500 text-lg mx-auto" />
                    )}
                  </td>
                  <td className="border px-4 py-3">{registration.interest}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CheckRegistrations;
