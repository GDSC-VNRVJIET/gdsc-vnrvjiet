import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CompleteRoundOne: React.FC = () => {
  const [unevaluatedTeams, setUnevaluatedTeams] = useState<any[]>([]);
  const [panel1Teams, setPanel1Teams] = useState<any[]>([]);
  const [panel2Teams, setPanel2Teams] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate=useNavigate();

  // Fetch all teams and organize them by panel
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/campus/teams`);
        const allTeams = response.data.data;

        // Filter unevaluated teams
        const unevaluated = allTeams.filter((team: any) => team.evaluated !== 1);
        setUnevaluatedTeams(unevaluated);

        // Sort and filter teams for Panel 1
        const panel1 = allTeams
          .filter((team: any) => team.panel === 'panel-1')
          .sort((a: any, b: any) => b.score - a.score);
        setPanel1Teams(panel1);

        // Sort and filter teams for Panel 2
        const panel2 = allTeams
          .filter((team: any) => team.panel === 'panel-2')
          .sort((a: any, b: any) => b.score - a.score);
        setPanel2Teams(panel2);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError('Failed to fetch teams.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Handle completing round 1
  const handleCompleteRoundOne = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/campus/complete-round-one`);
      if (response.status === 200) {
        alert('Round 1 completed successfully!');
        navigate("/final-scoring")
        // Refresh the list of teams
        const updatedResponse = await axios.get(`${process.env.REACT_APP_BACK_URL}/campus/teams`);
        const allTeams = updatedResponse.data.data;

        const unevaluated = allTeams.filter((team: any) => team.evaluated !== 1);
        setUnevaluatedTeams(unevaluated);

        const panel1 = allTeams
          .filter((team: any) => team.panel === 'panel-1')
          .sort((a: any, b: any) => b.score - a.score);
        setPanel1Teams(panel1);

        const panel2 = allTeams
          .filter((team: any) => team.panel === 'panel-2')
          .sort((a: any, b: any) => b.score - a.score);
        setPanel2Teams(panel2);
      }
    } catch (error) {
      console.error('Error completing Round 1:', error);
      alert('Failed to complete Round 1. Please try again.');
    } finally {
      setShowModal(false); // Close the modal
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Error</h2>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Complete Round 1</h2>

      {/* List of Unevaluated Teams */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Unevaluated Teams</h3>
        {unevaluatedTeams.length > 0 ? (
          <ul className="space-y-4">
            {unevaluatedTeams.map((team) => (
              <li key={team.teamID} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{team.teamName}</p>
                    <p className="text-sm text-gray-600">Team ID: {team.teamID}</p>
                    <p className="text-sm text-gray-600">Panel: {team.panel}</p>
                  </div>
                  <span className="text-red-600 font-semibold">Not Evaluated</span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">All teams have been evaluated.</p>
        )}
      </div>

      {/* Panel 1 Teams Table */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Panel 1 Teams (Sorted by Score)</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Team Name</th>
              <th className="p-3 text-left">Team ID</th>
              <th className="p-3 text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {panel1Teams.map((team) => (
              <tr key={team.teamID} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3">{team.teamName}</td>
                <td className="p-3">{team.teamID}</td>
                <td className="p-3">{team.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Panel 2 Teams Table */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">Panel 2 Teams (Sorted by Score)</h3>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Team Name</th>
              <th className="p-3 text-left">Team ID</th>
              <th className="p-3 text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            {panel2Teams.map((team) => (
              <tr key={team.teamID} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-3">{team.teamName}</td>
                <td className="p-3">{team.teamID}</td>
                <td className="p-3">{team.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Complete Round 1 Button */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
      >
        Complete Round 1
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Action</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to complete Round 1? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="py-2 px-4 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteRoundOne}
                className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteRoundOne;