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

  // Ensure to always return a valid JSX element
  if (!user || user.role !== "admin") {
    return (
      <div className="container">
        <h2 className="text-red-600 text-center">Access Denied</h2>
        <p className="text-center">You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="heading">Team Details Dashboard</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name of the team"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Team Leader Name"
            value={teamLeader}
            onChange={(e) => setTeamLeader(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <input
            type="tel"
            pattern="[0-9]{10}"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="input"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Jury"
            value={jury}
            onChange={(e) => setJury(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <select
            value={timeslot}
            onChange={(e) => setTimeslot(e.target.value)}
            className="input"
          >
            <option value="">Select timeslot</option>
            <option value="slot1">10:00 AM - 11:00 AM</option>
            <option value="slot2">11:00 AM - 12:00 PM</option>
            <option value="slot3">12:00 PM - 1:00 PM</option>
            <option value="slot4">2:00 PM - 3:00 PM</option>
            <option value="slot5">3:00 PM - 4:00 PM</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Room Number"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <button type="submit" className="button">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;