import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompleteRoundOne: React.FC = () => {
  const [unevaluatedTeams, setUnevaluatedTeams] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch unevaluated teams
  useEffect(() => {
    const fetchUnevaluatedTeams = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/campus/teams`);
        const allTeams = response.data.data;
        const unevaluated = allTeams.filter((team: any) => team.evaluated !== 1);
        setUnevaluatedTeams(unevaluated);
      } catch (error) {
        console.error('Error fetching unevaluated teams:', error);
        setError('Failed to fetch unevaluated teams.');
      } finally {
        setLoading(false);
      }
    };

    fetchUnevaluatedTeams();
  }, []);

  // Handle completing round 1
  const handleCompleteRoundOne = async () => {
    // Confirmation popup
    const isConfirmed = window.confirm(
      'Are you sure you want to complete Round 1? This action cannot be undone.'
    );

    if (!isConfirmed) return;

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/campus/complete-round-one`);
      if (response.status === 200) {
        alert('Round 1 completed successfully!');
        // Refresh the list of unevaluated teams
        const updatedResponse = await axios.get(`${process.env.REACT_APP_BACK_URL}/campus/teams`);
        const allTeams = updatedResponse.data.data;
        const unevaluated = allTeams.filter((team: any) => team.evaluated !== 1);
        setUnevaluatedTeams(unevaluated);
      }
    } catch (error) {
      console.error('Error completing Round 1:', error);
      alert('Failed to complete Round 1. Please try again.');
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Complete Round 1</h2>

      {/* List of Unevaluated Teams */}
      <div className="mb-6">
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

      {/* Complete Round 1 Button */}
      <button
        onClick={handleCompleteRoundOne}
        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition-colors"
      >
        Complete Round 1
      </button>
    </div>
  );
};

export default CompleteRoundOne;