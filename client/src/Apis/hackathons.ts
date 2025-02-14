import axios from "axios";

const API_URL = process.env.REACT_APP_BACK_URL;

export const createHackathon = async (eventDto: any) => {
  try {
    const response = await axios.post(`${API_URL}/Hackathons/create`, eventDto);
    return response.data;
  } catch (error) {
    console.error("Error creating hackathon:", error);
    throw error;
  }
};

export const getHackathonById = async (hackathonId: any) => {
  try {
    const response = await axios.get(
      `${API_URL}/Hackathons/get-hackathonId/${hackathonId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching hackathon data by ID:", error);
    throw error;
  }
};

export const getUpcomingHackathons = async () => {
  try {
    const response = await axios.get(`${API_URL}/Hackathons/get-upcoming-hackathons`);
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming hackathons:", error);
    throw error;
  }
};

export const getPastHackathons = async () => {
  try {
    const response = await axios.get(`${API_URL}/Hackathons/get-past-hackathons`);
    return response.data;
  } catch (error) {
    console.error("Error fetching past hackathons:", error);
    throw error;
  }
};

export const getAllHackathons = async () => {
  try {
    const response = await axios.get(`${API_URL}/Hackathons/get-hackathons`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hackathons:", error);
    throw error;
  }
};

export const deleteHackathonById = async (eventId: any) => {
  try {
    const response = await axios.delete(
      `${API_URL}/Hackathons/delete-by-id/${eventId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting hackathon by ID:", error);
    throw error;
  }
};

export const updateHackathon = async (eventDto: any) => {
  try {
    const response = await axios.post(`${API_URL}/Hackathons/update`, eventDto);
    return response.data;
  } catch (error) {
    console.error("Error updating hackathon:", error);
    throw error;
  }
};

// export const handleDownloadHackathonCSV = async (eventName: String) => {
//   try {
//     const response = await axios.get(`${API_URL}/registration/export-event-csv/${eventName}`, {
//       responseType: "blob", 
//     });
    
//     const url = window.URL.createObjectURL(new Blob([response.data]));
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", `${eventName}.csv`);
//     document.body.appendChild(link);
//     link.click();
//   } catch (error) {
//     console.error("Error downloading the CSV", error);
//   }
// };

export const hackathonRegistrations = async (hackathonName: String) => {
  try {
    const userObjGDSC = localStorage.getItem("userObjGDSC");
    if (userObjGDSC) {
      const userRole = JSON.parse(userObjGDSC);
      const response = await axios.get(`${API_URL}/registration/event-registrations/${hackathonName}`,{
        headers: {
          'Authorization': `Bearer ${userRole.token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    }
    else{
      return {message:"User not logged in"};
    }
  } catch (error) {
    console.error("Error fetching registrations");
  }
};