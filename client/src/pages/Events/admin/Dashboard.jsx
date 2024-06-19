import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [team, setTeam] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [teamLeader, setTeamLeader] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jury, setJury] = useState("");
  const [timeslot, setTimeslot] = useState("");
  const [roomNumber, setRoomNumber] = useState("");

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null")
  );

  useEffect(() => {
    axios
      .get("/api/team")
      .then((res) => setTeam(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/post", {
        teamName,
        teamLeader,
        email,
        phone,
        jury,
        timeslot,
        roomNumber,
      })
      .then((res) => {
        setTeam([...team, res.data]);
        setTeamName("");
        setTeamLeader("");
        setEmail("");
        setPhone("");
        setJury("");
        setTimeslot("");
        setRoomNumber("");
        alert("Team added successfully!");
      })
      .catch((err) => console.log(err));
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-red-600 text-3xl font-bold">Access Denied</h2>
          <p className="text-gray-700 mt-4">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Team Details Dashboard</h1>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name of the team"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Team Leader Name"
            value={teamLeader}
            onChange={(e) => setTeamLeader(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="tel"
            pattern="[0-9]{10}"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Jury"
            value={jury}
            onChange={(e) => setJury(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <select
            value={timeslot}
            onChange={(e) => setTimeslot(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="">Select timeslot</option>
            <option value="slot1">10:00 AM - 11:00 AM</option>
            <option value="slot2">11:00 AM - 12:00 PM</option>
            <option value="slot3">12:00 PM - 1:00 PM</option>
            <option value="slot4">2:00 PM - 3:00 PM</option>
            <option value="slot5">3:00 PM - 4:00 PM</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Room Number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
