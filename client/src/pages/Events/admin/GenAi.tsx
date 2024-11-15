import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import Timer from "./Timer";
import genai from "./GenAi.json";

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
  const [participantData, setParticipantData] = useState<UserData[] | null>(
    null
  );
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userObjGDSC") || "null") as {
      role: string;
    } | null
  );
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null);
  const [topThreeTeams, setTopThreeTeams] = useState<TeamData[] | null>(null);
  const [topThreeParticipants, setTopThreeParticipants] = useState<
    UserData[] | null
  >(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/genAi/get-data`
        );
        const groupedData = groupByTeam(res.data.data);
        const sortedTeamData = Object.values(groupedData).sort(
          (a: any, b: any) => {
            return (
              b.skillBadgesCompleted +
              b.arcadeGamesCompleted -
              (a.skillBadgesCompleted + a.arcadeGamesCompleted)
            );
          }
        );
        setExcelData(sortedTeamData);
        setTopThreeTeams(sortedTeamData.slice(0, 3));
        const sortedParticipants = res.data.data.sort(
          (a: UserData, b: UserData) => {
            return (
              b["# of Skill Badges Completed"] +
              b["# of Arcade Games Completed"] -
              (a["# of Skill Badges Completed"] +
                a["# of Arcade Games Completed"])
            );
          }
        );

        setParticipantData(sortedParticipants);
        setTopThreeParticipants(sortedParticipants.slice(0, 3));
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
  const [isChecked, setIsChecked] = useState(true);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div className="wrapper p-8 bg-gray-100 min-h-screen">
      <Timer/>
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
        <div className="flex justify-center mb-5">
          <label className="themeSwitcherTwo relative inline-flex cursor-pointer select-none items-center">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              className="sr-only"
            />
            <span className="label flex items-center text-md font-medium text-black">
              Teams Leaderboard
            </span>
            <span
              className={`slider mx-4 flex sm:h-8 sm:w-[60px] h-6 w-[55px] items-center rounded-full p-1 duration-200 ${
                isChecked ? "bg-green-500" : "bg-[#CCCCCE]"
              }`}
            >
              <span
                className={`dot sm:h-6 sm:w-6 h-4 w-4 rounded-full bg-white duration-200 transform ${
                  isChecked ? "sm:translate-x-[28px] translate-x-[13px]" : ""
                }`}
              ></span>
            </span>

            <span className="label flex items-center text-md font-medium text-black">
              Participants Leaderboard
            </span>
          </label>
        </div>
        {!isChecked && (
          <h1 className="sm:text-4xl text-xl text-center mb-4 font-bold m-6">
            TEAMS LEADERBOARD
          </h1>
        )}

        {excelData && !isChecked ? (
          <>
            {topThreeTeams && (
              <div className="flex justify-center mb-6 w-5/6 lg-w-1/3 mx-auto items-end space-x-1 ">
                <div className="flex flex-col w-40 h-80 ">
                  <div className="mb-4 sm:text-xl text-md font-bold text-center">
                    Team {topThreeTeams[1].team}
                  </div>
                  <div className="flex flex-col justify-end items-center bg-gray-200 rounded-t-3xl w-4/5 sm:w-full h-full p-3 sm:p-5">
                    <div className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">2nd</div>
                    <div className="font-bold bg-slate-100 px-3 sm:px-5 text-center rounded-xl text-sm sm:text-base">
                      {topThreeTeams[1].skillBadgesCompleted +
                        topThreeTeams[1].arcadeGamesCompleted}{" "}
                      Badges
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-40 h-96 ">
                  <div className="mb-4 sm:text-xl text-md font-bold text-center">
                    Team {topThreeTeams[0].team}
                  </div>
                  <div className="flex flex-col justify-end items-center bg-amber-200 rounded-t-3xl w-4/5 sm:w-full h-full p-3 sm:p-5">
                    <div className="text-lg sm:text-sm font-semibold mb-2 sm:mb-3">1st</div>
                    <div className="font-bold bg-slate-100 px-3 sm:px-5 text-center rounded-xl text-sm sm:text-base">
                      {topThreeTeams[0].skillBadgesCompleted +
                        topThreeTeams[0].arcadeGamesCompleted}{" "}
                      Badges
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-40 h-64">
                  <div className="mb-4 sm:text-xl text-md font-bold text-center">
                    Team {topThreeTeams[2].team}
                  </div>
                  <div className="flex flex-col justify-end items-center bg-orange-200 rounded-t-3xl w-4/5 sm:w-full h-full p-3 sm:p-5">
                    <div className="text-lg sm:text-sm font-semibold mb-2 sm:mb-3">3rd</div>
                    <div className="font-bold bg-slate-100 px-3 sm:px-5 text-center rounded-xl text-sm sm:text-base">
                      {topThreeTeams[2].skillBadgesCompleted +
                        topThreeTeams[2].arcadeGamesCompleted}{" "}
                      Badges
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="w-full max-w-6xl mx-auto overflow-x-auto">
              <table className="table-auto min-w-full text-left border-collapse bg-white shadow-md rounded-lg">
                <thead>
                  <tr className="bg-red-500 text-white">
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
                        className={`cursor-pointer hover:bg-gray-100 ${
                          index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                        }`}
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
                                {teamData.members
                                  .sort(
                                    (a, b) =>
                                      b["# of Skill Badges Completed"] +
                                      b["# of Arcade Games Completed"] -
                                      (a["# of Skill Badges Completed"] +
                                        a["# of Arcade Games Completed"])
                                  )
                                  .map((individualData, subIndex) => (
                                    <tr
                                      key={subIndex}
                                      className={`${
                                        subIndex % 2 === 0
                                          ? "bg-gray-100"
                                          : "bg-white"
                                      } hover:bg-gray-200`}
                                    >
                                      <td className="py-3 px-6 border-b">
                                        {index + 1}.{subIndex + 1}
                                      </td>
                                      <td>
                            {genai.map((user) => {
                              if (
                                user["Name"] ===
                                individualData["User Name"]
                              ) {
                                return user["Roll No"];
                              }
                            })}
                          </td>
                                      <td className="py-3 px-6 border-b">
                                        {individualData["User Name"]}
                                      </td>
                                      <td className="py-3 px-6 border-b">
                                        {individualData[
                                          "Google Cloud Skills Boost Profile URL"
                                        ] && (
                                          <a
                                            href={
                                              individualData[
                                                "Google Cloud Skills Boost Profile URL"
                                              ]
                                            }
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                          >
                                            {
                                              individualData[
                                                "Google Cloud Skills Boost Profile URL"
                                              ]
                                            }
                                          </a>
                                        )}
                                      </td>
                                      <td className="py-3 px-6 border-b">
                                        {
                                          individualData[
                                            "# of Skill Badges Completed"
                                          ]
                                        }
                                      </td>
                                      <td className="py-3 px-6 border-b">
                                        {
                                          individualData[
                                            "# of Arcade Games Completed"
                                          ]
                                        }
                                      </td>
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
          </>
        ) : (
          <div className=""></div>
        )}

        {/* Participant Leaderboard */}
        {isChecked && (
          <div className="viewer mb-8">
            <h1 className="sm:text-4xl text-xl text-center mb-4 font-bold m-6">
              GEN AI STUDY JAMS LEADERBOARD
            </h1>

            {participantData ? (
              <>
                {/* {topThreeParticipants && (
                  <div className="flex justify-center mb-6 w-5/6 lg-w-1/3 mx-auto items-end space-x-1 ">
                    <div className="flex flex-col w-40 h-80 ">
                      <div className="mb-4 sm:text-xl text-md font-bold text-center">
                        {topThreeParticipants[1]["User Name"]}
                      </div>
                      <div className="flex flex-col justify-end items-center bg-gray-200 rounded-t-3xl w-4/5 sm:w-full h-full p-3 sm:p-5">
                        <div className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">2nd</div>
                        <div className="font-bold bg-slate-100 px-3 sm:px-5 text-center rounded-xl text-sm sm:text-base">
                          {topThreeParticipants[1][
                            "# of Skill Badges Completed"
                          ] +
                            topThreeParticipants[1][
                              "# of Arcade Games Completed"
                            ]}{" "}
                          Badges
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-40 h-96 ">
                      <div className="mb-4 sm:text-xl text-md font-bold text-center">
                        {topThreeParticipants[0]["User Name"]}
                      </div>
                      <div className="flex flex-col justify-end items-center bg-amber-200 rounded-t-3xl w-4/5 sm:w-full h-full p-3 sm:p-5">
                        <div className="text-lg sm:text-sm font-semibold mb-2 sm:mb-3">
                          1st
                        </div>
                        <div className="font-bold bg-slate-100 px-3 sm:px-5 text-center rounded-xl text-sm sm:text-base">
                          {topThreeParticipants[0][
                            "# of Skill Badges Completed"
                          ] +
                            topThreeParticipants[0][
                              "# of Arcade Games Completed"
                            ]}{" "}
                          Badges
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-40 h-60">
                      <div className="mb-4 sm:text-xl text-md font-bold text-center">
                        {topThreeParticipants[2]["User Name"]}
                      </div>
                      <div className="flex flex-col justify-end items-center bg-orange-200 rounded-t-3xl w-4/5 sm:w-full h-full p-3 sm:p-5">
                        <div className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">3rd</div>
                        <div className="font-bold bg-slate-100 px-3 sm:px-5 text-center rounded-xl text-sm sm:text-base">
                          {topThreeParticipants[2][
                            "# of Skill Badges Completed"
                          ] +
                            topThreeParticipants[2][
                              "# of Arcade Games Completed"
                            ]}{" "}
                          Badges
                        </div>
                      </div>
                    </div>
                  </div>
                )} */}

                <div className="w-full min-h-screen max-w-6xl mx-auto overflow-x-auto text-sm sm:text-base">
                  <table className="table-auto min-w-full text-left border-collapse bg-white shadow-md rounded-lg">
                    <thead>
                      <tr className="text-white bg-blue-500">
                        <th className="py-3 px-6 text-sm font-semibold uppercase">
                          Rank
                        </th>
                        <th className="py-3 px-6 text-sm font-semibold uppercase">
                          Roll Number
                        </th>
                        <th className="py-3 px-6 text-sm font-semibold uppercase">
                          Name
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
                          className={`${
                            index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
                          } hover:bg-gray-100`}
                        >
                          <td className="py-3 px-6 border-b">{index + 1}</td>
                          <td>
                            {genai.map((user) => {
                              if (
                                user["Name"] ===
                                individualData["User Name"]
                              ) {
                                return user["Roll No"];
                              }
                            })}
                          </td>
                          <td className="py-3 px-6 border-b">
                            {individualData["User Name"]}
                          </td>
                          <td className="py-3 px-6 border-b">
                            {individualData[
                              "Google Cloud Skills Boost Profile URL"
                            ] && (
                              <a
                                href={
                                  individualData[
                                    "Google Cloud Skills Boost Profile URL"
                                  ]
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {
                                  individualData[
                                    "Google Cloud Skills Boost Profile URL"
                                  ]
                                }
                              </a>
                            )}
                          </td>
                          <td className="py-3 px-6 border-b">
                            {individualData["# of Skill Badges Completed"]}
                          </td>
                          <td className="py-3 px-6 border-b">
                            {individualData["# of Arcade Games Completed"]}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500">Loading...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default GenAi;
