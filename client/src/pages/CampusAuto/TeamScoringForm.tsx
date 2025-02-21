import React, { useState, useEffect } from 'react';

const TeamScoringForm: React.FC = () => {
  const [formData, setFormData] = useState({
    implementation: 5,
    presentation: 5,
    uiUx: 5,
    creativity: 5,
    feasibility: 5,
    feedback: '',
    totalScore: 5
  });

  useEffect(() => {
    // Calculate total score
    const total = (
      formData.implementation +
      formData.presentation +
      formData.uiUx +
      formData.creativity +
      formData.feasibility
    ) / 5;
    
    setFormData(prev => ({
      ...prev,
      totalScore: parseFloat(total.toFixed(1))
    }));
  }, [
    formData.implementation,
    formData.presentation,
    formData.uiUx,
    formData.creativity,
    formData.feasibility
  ]);

  const handleInputChange = (field: string, value: number) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      feedback: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Team Evaluation Form</h2>
      
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

export default TeamScoringForm;