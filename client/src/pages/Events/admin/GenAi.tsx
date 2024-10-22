import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

interface UserData {
  "User Name": string;
  "Google Cloud Skills Boost Profile URL": string;
  "# of Skill Badges Completed": number;
  "# of Arcade Games Completed": number;
  " Mentor": string;
}

interface TeamData {
  team: string;
  skillBadgesCompleted: number;
  arcadeGamesCompleted: number;
  members: UserData[];
}

function GenAi() {
  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
  const [typeError, setTypeError] = useState<string>("");
  const [triggerUpdate, setTriggerUpdate] = useState(false);
  const [excelData, setExcelData] = useState<TeamData[] | null>(null);
  const [participantData, setParticipantData] = useState<UserData[] | null>(null);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
      role: string;
    } | null
  );
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACK_URL}/genAi/get-data`);
        const groupedData = groupByTeam(res.data.data);
        const sortedTeamData = Object.values(groupedData).sort((a: any, b: any) => {
          return (
            b.skillBadgesCompleted +
            b.arcadeGamesCompleted -
            (a.skillBadgesCompleted + a.arcadeGamesCompleted)
          );
        });
        setExcelData(sortedTeamData);
        const sortedParticipants = res.data.data.sort((a: UserData, b: UserData) => {
          return (
            b["# of Skill Badges Completed"] +
            b["# of Arcade Games Completed"] -
            (a["# of Skill Badges Completed"] + a["# of Arcade Games Completed"])
          );
        });

        setParticipantData(sortedParticipants);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [triggerUpdate]);

  const groupByTeam = (data: UserData[]) => {
    return data.reduce((acc: Record<string, TeamData>, curr) => {
  
      const team = curr[" Mentor"]; // Ensure this matches your data field
      
      if (!acc[team]) {
        acc[team] = {
          team,
          skillBadgesCompleted: 0,
          arcadeGamesCompleted: 0,
          members: [],
        };
      }
      
      acc[team].skillBadgesCompleted += curr["# of Skill Badges Completed"];
      acc[team].arcadeGamesCompleted += curr["# of Arcade Games Completed"];
      acc[team].members.push(curr); // Add user to the respective team
      return acc;
    }, {});
  };
  

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileTypes = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
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
        setTypeError("Please select only Excel file types");
        setExcelFile(null);
      }
    } else {
      console.log("Please select your file");
    }
  };

  const handleUpdateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);

      const sortedData = data.sort((a: any, b: any) => {
        return (
          b["# of Skill Badges Completed"] +
          b["# of Arcade Games Completed"] -
          (a["# of Skill Badges Completed"] + a["# of Arcade Games Completed"])
        );
      });

      try {
        const res = await axios.put(
          `${process.env.REACT_APP_BACK_URL}/genAi/update-data`,
          {
            data: sortedData,
          }
        );
        console.log("Bulk update result:", res.data);
        setTriggerUpdate((prev) => !prev);
      } catch (error) {
        console.error("Error updating data in bulk:", error);
      }
    }
  };

  const handleTeamClick = (teamName: string) => {
    setExpandedTeam((prev) => (prev === teamName ? null : teamName));
  };

  return (
    <div className="wrapper p-8 bg-gray-100 min-h-screen">
      {user && user.role === process.env.REACT_APP_ADMIN_ROLE && (
        <div>
          <h3 className="text-2xl font-bold text-gray-700 mb-6 text-center">
            Upload & View Excel Sheets
          </h3>

          {/* form */}
          <form
            className="form-group custom-form mb-6 flex flex-col items-center"
            onSubmit={handleUpdateSubmit}
          >
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
              <div className="alert alert-danger text-red-600 mt-4">
                {typeError}
              </div>
            )}
          </form>
        </div>
      )}
      {/* Teams Leaderboard */}
      <div className="viewer">
        <h1 className="text-4xl text-center mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-400 to-blue-400">
          GEN AI STUDY JAMS LEADERBOARD
        </h1>

        {excelData ? (
          <div className="w-full max-w-6xl mx-auto overflow-x-auto">
            <table className="table-auto min-w-full text-left border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                  <th className="py-3 px-6 text-sm font-semibold uppercase">
                    Rank
                  </th>
                  <th className="py-3 px-6 text-sm font-semibold uppercase">
                    Team Name
                  </th>
                  {/* <th className="py-3 px-6 text-sm font-semibold uppercase">
                    Google Cloud Skills Boost Profile URL
                  </th> */}
                  <th className="py-3 px-6 text-sm font-semibold uppercase">
                    Skill Badges Completed
                  </th>
                  <th className="py-3 px-6 text-sm font-semibold uppercase">
                    Arcade Games Completed
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
  {excelData.map((teamData, index) => (
    <>
      <tr
        key={index}
        className={`cursor-pointer hover:bg-blue-200 ${index % 2 === 0 ? "bg-blue-100" : "bg-blue-200"}`}
        onClick={() => handleTeamClick(teamData.team)}
      >
        <td className="py-3 px-6 border-b">{index + 1}</td>
        <td className="py-3 px-6 border-b">
          <strong>Team {teamData.team}</strong>
        </td>
        <td className="py-3 px-6 border-b">
          {teamData.skillBadgesCompleted}
        </td>
        <td className="py-3 px-6 border-b">
          {teamData.arcadeGamesCompleted}
        </td>
      </tr>
      {expandedTeam === teamData.team && (
        <tr className="bg-gray-50">
          <td colSpan={4}>
            <table className="min-w-full text-left">
              <tbody>
                {teamData.members.map((individualData, subIndex) => (
                  <tr key={subIndex} className={`${subIndex % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200`}>
                    <td className="py-3 px-6 border-b">{index + 1}.{subIndex + 1}</td>
                    <td className="py-3 px-6 border-b">{individualData["User Name"]}</td>
                    <td className="py-3 px-6 border-b">
                      {individualData["Google Cloud Skills Boost Profile URL"] && (
                        <a
                          href={individualData["Google Cloud Skills Boost Profile URL"]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {individualData["Google Cloud Skills Boost Profile URL"]}
                        </a>
                      )}
                    </td>
                    <td className="py-3 px-6 border-b">{individualData["# of Skill Badges Completed"]}</td>
                    <td className="py-3 px-6 border-b">{individualData["# of Arcade Games Completed"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  ))}
</tbody>



            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500">Loading...</div>
        )}

        {/* Participant Leaderboard */}
      <div className="viewer mb-8">
        <h1 className="text-4xl text-center mb-4 font-bold m-6">
          PARTICIPANT LEADERBOARD
        </h1>

        {participantData ? (
          <div className="w-full max-w-6xl mx-auto overflow-x-auto">
            <table className="table-auto min-w-full text-left border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
                  <th className="py-3 px-6 text-sm font-semibold uppercase">
                    Rank
                  </th>
                  <th className="py-3 px-6 text-sm font-semibold uppercase">
                    User Name
                  </th>
                  <th className="py-3 px-6 text-sm font-semibold uppercase">
                    Google Cloud Skills Boost Profile URL
                  </th>
                  <th className="py-3 px-6 text-sm font-semibold uppercase">
                    Skill Badges Completed
                  </th>
                  <th className="py-3 px-6 text-sm font-semibold uppercase">
                    Arcade Games Completed
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {participantData.map((individualData, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-purple-100" : "bg-purple-200"} hover:bg-purple-300`}
                  >
                    <td className="py-3 px-6 border-b">{index + 1}</td>
                    <td className="py-3 px-6 border-b">{individualData["User Name"]}</td>
                    <td className="py-3 px-6 border-b">
                      {individualData["Google Cloud Skills Boost Profile URL"] && (
                        <a
                          href={individualData["Google Cloud Skills Boost Profile URL"]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline"
                        >
                          {individualData["Google Cloud Skills Boost Profile URL"]}
                        </a>
                      )}
                    </td>
                    <td className="py-3 px-6 border-b">{individualData["# of Skill Badges Completed"]}</td>
                    <td className="py-3 px-6 border-b">{individualData["# of Arcade Games Completed"]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500">Loading...</div>
        )}
      </div>
        
      </div>
    </div>
  );
}

export default GenAi;
