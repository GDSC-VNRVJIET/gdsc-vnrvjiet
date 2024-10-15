import axios from "axios";

const API_URL = process.env.REACT_APP_BACK_URL;

export const createEvent = async (eventDto: any) => {
  try {
    const response = await axios.post(`${API_URL}/Events/create`, eventDto);
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

export const getEventById = async (eventId: any) => {
  try {
    const response = await axios.get(
      `${API_URL}/Events/get-eventId/${eventId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching event data by ID:", error);
    throw error;
  }
};

export const getUpcomingEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/Events/get-upcoming-events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming events:", error);
    throw error;
  }
};

export const getPastEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/Events/get-past-events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching past events:", error);
    throw error;
  }
};

export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${API_URL}/Events/get-events`);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

export const deleteEventById = async (eventId: any) => {
  try {
    const response = await axios.delete(
      `${API_URL}/Events/delete-by-id/${eventId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting event by ID:", error);
    throw error;
  }
};

export const updateEvent = async (eventDto: any) => {
  try {
    const response = await axios.post(`${API_URL}/Events/update`, eventDto);
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

export const handleDownloadCSV = async (eventName: String) => {
  try {
    const response = await axios.get(`${API_URL}/registration/export-event-csv/${eventName}`, {
      responseType: "blob", 
    });
    
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${eventName}.csv`);
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Error downloading the CSV", error);
  }
};

export const eventRegistrations = async (eventName: String) => {
  try {
    const userObjGDSC = localStorage.getItem("userObjGDSC");
    if (userObjGDSC) {
      const userRole = JSON.parse(userObjGDSC);
      const response = await axios.get(`${API_URL}/registration/event-registrations/${eventName}`,{
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