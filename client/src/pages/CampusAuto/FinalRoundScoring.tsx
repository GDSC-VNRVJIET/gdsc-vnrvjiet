import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Define interfaces for the team data
interface Team {
  teamID: number;
  teamName: string;
  problemStatement: string;
  lab: string;
  lead: string;
  contact: number;
  panel: string;
  evaluated: number;
}
interface APIResponse {
  data: Team[];
}

const FinalRoundScoring: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  async function getTeams(): Promise<void> {
    try {
      setLoading(true);
    const response = await axios.get<APIResponse>(
      `${process.env.REACT_APP_BACK_URL}/campus/final-leaderboard`
    );
    const filteredTeams = response.data.data.filter(team => team.evaluated === 0);
    setTeams(filteredTeams);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getTeams();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6">
    <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 text-center text-gray-800">Finalist Teams Scoring Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {teams.map((team) => (
            <div key={team.teamID} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
                {/* Card Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                    <div className="flex justify-between items-start">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-800">{team.teamName}</h2>
                        <span className="px-2 py-1 text-xs sm:text-sm bg-blue-100 text-blue-800 font-semibold rounded-full">
                            ID: {team.teamID}
                        </span>
                    </div>
                </div>

                {/* Card Content */}
                <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
                    {/* Problem Statement */}
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-500">
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
                                </svg>
                            </span>
                            <p className="font-semibold text-gray-700 text-sm sm:text-base">Problem Statement</p>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 ml-6 sm:ml-7 line-clamp-3">{team.problemStatement}</p>
                    </div>

                    {/* Lab */}
                    <div className="flex items-center gap-2">
                        <span className="text-purple-500">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                            </svg>
                        </span>
                        <div className="">
                            <p className="font-semibold text-gray-700 text-sm sm:text-base">Lab</p>
                            <p className="text-xs sm:text-sm text-gray-600">{team.lab}</p>
                        </div>
                    </div>

                    {/* Team Lead */}
                    <div className="flex items-center gap-2">
                        <span className="text-blue-500">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                        </span>
                        <div>
                            <p className="font-semibold text-gray-700 text-sm sm:text-base">Team Lead</p>
                            <p className="text-xs sm:text-sm text-gray-600">{team.lead}</p>
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="flex items-center gap-2">
                        <span className="text-green-500">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                            </svg>
                        </span>
                        <div>
                            <p className="font-semibold text-gray-700 text-sm sm:text-base">Contact</p>
                            <p className="text-xs sm:text-sm text-gray-600">{team.contact}</p>
                        </div>
                    </div>

                    {/* Panel */}
                    <div className="flex items-center gap-2">
                        <span className="text-red-500">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"></path>
                            </svg>
                        </span>
                        <div>
                            <p className="font-semibold text-gray-700 text-sm sm:text-base">Panel</p>
                            <p className="text-xs sm:text-sm text-gray-600">{team.panel}</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200">
                    <button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 text-sm sm:text-base rounded-lg transition-colors duration-200"
                        onClick={()=>navigate(`/final-scoring/${team.teamID}`)}
                    >
                        Give Score
                    </button>
                </div>
            </div>
        ))}
    </div>
</div>
  );
};

export default FinalRoundScoring;
