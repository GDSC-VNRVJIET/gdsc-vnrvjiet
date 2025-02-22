import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const FinalTeamScoring: React.FC = () => {
  const { id: teamId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [isFinalist, setIsFinalist] = useState(false);
  const [previousScores, setPreviousScores] = useState<any>(null);
  const [oldScore, setOldScore] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    implementation: 5,
    presentation: 5,
    uiUx: 5,
    creativity: 5,
    feasibility: 5,
    feedback: '',
    totalScore: 5,
  });

  useEffect(() => {
    // Fetch team evaluation details
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACK_URL}/campus/team/${teamId}`);
        const teamData = response.data.data;

        // Check if the team is a finalist
        if (teamData.final) {
          setIsFinalist(true);
          // Calculate the old score average
            const averageScore = (
            parseFloat((teamData.scoreDetails.implementation * 30 / 100).toFixed(3)) +
            parseFloat((teamData.scoreDetails.presentation * 10 / 100).toFixed(3)) +
            parseFloat((teamData.scoreDetails.uiUx * 10 / 100).toFixed(3)) +
            parseFloat((teamData.scoreDetails.creativity * 20 / 100).toFixed(3)) +
            parseFloat((teamData.scoreDetails.feasibility * 30 / 100).toFixed(3))
            );
          setOldScore(parseFloat(averageScore.toFixed(1)));
        } else {
          // If the team is not a finalist, show invalid team message
          setIsFinalist(false);
        }

        // Check if the team has been evaluated
        if (teamData.evaluated === 1) {
          setIsEvaluated(true);
          setPreviousScores(teamData.scoreDetails);
        }
      } catch (error) {
        console.error('Error fetching team details:', error);
      }
    };

    fetchTeamDetails();
  }, [teamId]);

  useEffect(() => {
    // Calculate total score
    const total = (
    parseFloat((formData.implementation*30/100).toFixed(3)) +
    parseFloat((formData.presentation*10/100).toFixed(3)) +
    parseFloat((formData.uiUx*10/100).toFixed(3)) +
    parseFloat((formData.creativity*20/100).toFixed(3)) +
    parseFloat((formData.feasibility*30/100).toFixed(3))
    );

    setFormData((prev) => ({
      ...prev,
      totalScore: parseFloat(total.toFixed(1)),
    }));
  }, [
    formData.implementation,
    formData.presentation,
    formData.uiUx,
    formData.creativity,
    formData.feasibility,
  ]);

  const handleInputChange = (field: string, value: number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      feedback: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACK_URL}/campus/submit-final-score/${teamId}`, {
        totalScore: formData.totalScore,
        implementation: formData.implementation,
        presentation: formData.presentation,
        uiUx: formData.uiUx,
        creativity: formData.creativity,
        feasibility: formData.feasibility,
        feedback: formData.feedback,
      });

      if (response.status === 200) {
        alert('Evaluation submitted successfully!');
        navigate('/final-scoring');
      }
    } catch (error) {
      console.error('Error submitting evaluation:', error);
      alert('Failed to submit evaluation. Please try again.');
    }
  };

  // If the team is not a finalist, show invalid team message
  if (!isFinalist) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Invalid Team</h2>
        <p className="mb-4 text-gray-600 text-center">This team is not eligible for final round evaluation.</p>
      </div>
    );
  }

  // If the team is already evaluated, show previous scores
  if (isEvaluated) {
    return (
      <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Team Evaluation</h2>
        <p className="mb-4 text-gray-600 text-center">This team has already been evaluated.</p>
        
        <div className="mb-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Previous Scores:</h3>
          <ul className="grid grid-cols-2 gap-3 text-gray-800">
            <li className="flex justify-between"><span>Implementation:</span> <span className="font-medium">{previousScores.implementation}</span></li>
            <li className="flex justify-between"><span>Presentation:</span> <span className="font-medium">{previousScores.presentation}</span></li>
            <li className="flex justify-between"><span>UI/UX:</span> <span className="font-medium">{previousScores.uiUx}</span></li>
            <li className="flex justify-between"><span>Creativity:</span> <span className="font-medium">{previousScores.creativity}</span></li>
            <li className="flex justify-between"><span>Feasibility:</span> <span className="font-medium">{previousScores.feasibility}</span></li>
          </ul>
        </div>
  
        <div className="mb-4 bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold text-gray-700 mb-2">Feedback:</h3>
          <p className="text-gray-800 italic">{previousScores.feedback}</p>
        </div>
      </div>
    );
  }

  // Render the evaluation form for finalist teams
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Final Team Evaluation Form</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Implementation */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">1. Implementation (0-10)</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="10"
              value={formData.implementation}
              onChange={(e) => handleInputChange('implementation', parseInt(e.target.value))}
              className="w-full"
            />
            <input
              type="number"
              min="0"
              max="10"
              value={formData.implementation}
              onChange={(e) => handleInputChange('implementation', parseInt(e.target.value))}
              className="w-16 p-1 border rounded text-center"
            />
          </div>
        </div>
        
        {/* Presentation */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">2. Presentation (0-10)</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="10"
              value={formData.presentation}
              onChange={(e) => handleInputChange('presentation', parseInt(e.target.value))}
              className="w-full"
            />
            <input
              type="number"
              min="0"
              max="10"
              value={formData.presentation}
              onChange={(e) => handleInputChange('presentation', parseInt(e.target.value))}
              className="w-16 p-1 border rounded text-center"
            />
          </div>
        </div>
        
        {/* UI/UX */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">3. UI/UX (0-10)</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="10"
              value={formData.uiUx}
              onChange={(e) => handleInputChange('uiUx', parseInt(e.target.value))}
              className="w-full"
            />
            <input
              type="number"
              min="0"
              max="10"
              value={formData.uiUx}
              onChange={(e) => handleInputChange('uiUx', parseInt(e.target.value))}
              className="w-16 p-1 border rounded text-center"
            />
          </div>
        </div>
        
        {/* Creativity */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">4. Creativity (0-10)</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="10"
              value={formData.creativity}
              onChange={(e) => handleInputChange('creativity', parseInt(e.target.value))}
              className="w-full"
            />
            <input
              type="number"
              min="0"
              max="10"
              value={formData.creativity}
              onChange={(e) => handleInputChange('creativity', parseInt(e.target.value))}
              className="w-16 p-1 border rounded text-center"
            />
          </div>
        </div>
        
        {/* Feasibility */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">5. Feasibility (0-10)</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="10"
              value={formData.feasibility}
              onChange={(e) => handleInputChange('feasibility', parseInt(e.target.value))}
              className="w-full"
            />
            <input
              type="number"
              min="0"
              max="10"
              value={formData.feasibility}
              onChange={(e) => handleInputChange('feasibility', parseInt(e.target.value))}
              className="w-16 p-1 border rounded text-center"
            />
          </div>
        </div>
        
        {/* Total Score Display */}
        <div className="mb-4 p-3 bg-gray-50 rounded flex justify-between items-center">
          <span className="font-medium">Total Score:</span>
          <span className="text-xl font-bold">{formData.totalScore}</span>
        </div>
        
        {/* Feedback */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Feedback</label>
          <textarea
            value={formData.feedback}
            onChange={handleTextChange}
            className="w-full p-2 border rounded h-24"
            placeholder="Enter your feedback here..."
          />
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700"
        >
          Submit Evaluation
        </button>
      </form>
    </div>
  );
};

export default FinalTeamScoring;