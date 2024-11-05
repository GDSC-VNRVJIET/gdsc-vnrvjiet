import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { handleDownloadCSV ,eventRegistrations} from '../../../Apis/events';

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
  const navigate=useNavigate();
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [showunsentMails,setShowunsentMails]=useState<boolean>(false);
  const eventName=window.location.pathname.split("/")[2];
  const [err,setErr]=useState<String>("");

  const fetchData = async () => {
    const res=await eventRegistrations(eventName);
    if(res.message==="Event registrations"){
      setRegistrations(res.payload);
    }else{
      setErr(res.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function goto(){
    navigate('/checkuser')
  }
  function unsentMails(){
    if(showunsentMails){
      fetchData();
    }
    else{
      let unsentmail=registrations.filter((registration)=>registration.mailSent===false);
      setRegistrations(unsentmail);
    }
    setShowunsentMails(!showunsentMails);
  }

  return err ? (
    <div className="text-center text-3xl font-bold">Error Fetching Data : ${err}</div>
  ):(
    <div className='container mx-auto p-5'>
      <h2 className="text-center text-3xl font-bold ">Check Registrations</h2>
      <div className="mb-4 flex justify-end mt-4 space-x-2">
      <button
        onClick={() => handleDownloadCSV(eventName)}
        className="bg-[#318C07] text-white rounded px-2 py-1 ml-2 hover:bg-green-700"
      >
        Download CSV
      </button>
        <button onClick={goto} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        Check
        </button>
        <button onClick={unsentMails} className="bg-blue-500 text-white rounded px-2 py-1 hover:bg-blue-500  font-semibold  border border-blue-500">
        {showunsentMails?"Show all":"Show unsent mails"}
        </button>
        </div>
        <div className="w-full min-h-screen max-w-6xl mx-auto overflow-x-auto text-sm sm:text-base">
      <table className='table-auto min-w-full text-left border-collapse bg-white shadow-md rounded-lg'>
        <thead>
          <tr>
            <th className="border px-4 py-2">S.No.</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Roll No</th>
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Branch</th>
            <th className="border px-4 py-2">Section</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">WhatsApp</th>
            <th className="border px-4 py-2">Entered</th>
            <th className="border px-4 py-2">mailSent</th>
            <th className="border px-4 py-2">paymentSuccess</th>
            <th className="border px-4 py-2">Interest</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration,index) => (
            <tr key={registration._id.$oid}>
              <td className="border px-4 py-2 text-center">{index+1}</td>
              <td className="border px-4 py-2">{registration.name}</td>
              <td className="border px-4 py-2">{registration.rollno}</td>
              <td className="border px-4 py-2">{registration.year}</td>
              <td className="border px-4 py-2">{registration.branch}</td>
              <td className="border px-4 py-2">{registration.section}</td>              
              <td className="border px-4 py-2">{registration.email}</td>
              <td className="border px-4 py-2">{registration.whatsapp}</td>
              <td className="border px-4 py-2">{registration.entered ? 'Yes' : 'No'}</td>
              <td className="border px-4 py-2">{registration.mailSent ? 'Yes' : 'No'}</td>
              <td className="border px-4 py-2">{registration.paymentSuccess ? 'Yes' : 'No'}</td>
              <td className="border px-4 py-2">{registration.interest}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default CheckRegistrations;
