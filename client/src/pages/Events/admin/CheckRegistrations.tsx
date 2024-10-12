import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
  event: string;
  section: string;
}

const CheckRegistrations: React.FC = () => {
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch registrations from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RegistrationData[]>('/api/registrations');
        setRegistrations(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching registrations');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Check Registrations</h2>
      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Email</th>
            <th>Entered</th>
            <th>WhatsApp</th>
            <th>Branch</th>
            <th>Name</th>
            <th>Event</th>
            <th>Section</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration._id.$oid}>
              <td>{registration.rollno}</td>
              <td>{registration.email}</td>
              <td>{registration.entered ? 'Yes' : 'No'}</td>
              <td>{registration.whatsapp}</td>
              <td>{registration.branch}</td>
              <td>{registration.name}</td>
              <td>{registration.event}</td>
              <td>{registration.section}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CheckRegistrations;
