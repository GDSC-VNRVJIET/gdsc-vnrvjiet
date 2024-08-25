import React from 'react';

const OrgChart = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      {/* Title */}
      <h1 className="text-4xl font-bold mb-6 text-center">Organizational Chart</h1>

      {/* Leads Row */}
      <div className="flex justify-center space-x-12 mb-12">
        <div className="flex flex-col items-center">
          <img
            src=""
            alt="Lead"
            className="w-28 h-28 rounded-full border-4 border-yellow-500 mb-4"
          />
          <h2 className="text-xl font-semibold">Lead</h2>
        </div>
      </div>
      <div className="flex justify-center space-x-12 mb-12">
        <div className="flex flex-col items-center">
          <img
            src=""
            alt="Lead"
            className="w-28 h-28 rounded-full border-4 border-yellow-500 mb-4"
          />
          <h2 className="text-xl font-semibold">Co-Lead</h2>
        </div>
      </div>

      {/* Domain Leads Row */}
      <div className="grid grid-cols-5 gap-12">
        <div className="flex flex-col items-center">
          <img
            src=""
            alt="WebDev Lead"
            className="w-24 h-24 rounded-full border-4 border-green-500 mb-4"
          />
          <h2 className="text-lg font-medium">WebDev Lead</h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src=""
            alt="CP Lead"
            className="w-24 h-24 rounded-full border-4 border-green-500 mb-4"
          />
          <h2 className="text-lg font-medium">CP Lead</h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src=""
            alt="Management Lead"
            className="w-24 h-24 rounded-full border-4 border-green-500 mb-4"
          />
          <h2 className="text-lg font-medium">Management Lead</h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src=""
            alt="ML Lead"
            className="w-24 h-24 rounded-full border-4 border-green-500 mb-4"
          />
          <h2 className="text-lg font-medium">ML Lead</h2>
        </div>
        <div className="flex flex-col items-center">
          <img
            src=""
            alt="Design Lead"
            className="w-24 h-24 rounded-full border-4 border-green-500 mb-4"
          />
          <h2 className="text-lg font-medium">Design Lead</h2>
        </div>
      </div>
    </div>
  );
};

export default OrgChart;