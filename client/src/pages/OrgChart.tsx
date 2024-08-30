import React, { useState, useEffect } from "react";
import leadimg from "./images/lead.png";
import colead from "./images/colead.png";
import weblead from "./images/webdevlead.png";
import managelead from "./images/managementlead.png";

// Define types for the data structure
interface Person {
  role: string;
  name: string;
  img: string;
}

interface Coordinator {
  name: string;
  img: string;
}

interface Volunteer {
  name: string;
  img: string;
}

interface DomainLead extends Person {
  coordinators: Coordinator[];
  volunteers: Volunteer[];
}

interface OrgChartData {
  lead: Person;
  domainLeads: DomainLead[];
}

const data2025: OrgChartData = {
  lead: { role: "Lead", name: "John Doe", img: leadimg },
  domainLeads: [
    {
      role: "WebDev Lead",
      name: "Alice Johnson",
      img: weblead,
      coordinators: [
        { name: "Tom Brown", img: colead },
        { name: "Emma Wilson", img: colead },
      ],
      volunteers: [
        { name: "Jake White", img: colead },
        { name: "Sophia Green", img: colead },
      ],
    },
    {
      role: "CP Lead",
      name: "Bob Brown",
      img: leadimg,
      coordinators: [
        { name: "Sara Lee", img: colead },
        { name: "Mike Johnson", img: colead },
      ],
      volunteers: [
        { name: "James Carter", img: colead },
        { name: "Olivia Davis", img: colead },
      ],
    },
    {
      role: "Management Lead",
      name: "Carol White",
      img: managelead,
      coordinators: [
        { name: "Nina Patel", img: colead },
        { name: "Paul Allen", img: colead },
      ],
      volunteers: [
        { name: "Liam Martin", img: colead },
        { name: "Ella Thomas", img: colead },
      ],
    },
    {
      role: "ML Lead",
      name: "David Black",
      img: leadimg,
      coordinators: [
        { name: "Sophia Lee", img: colead },
        { name: "Michael Brown", img: colead },
      ],
      volunteers: [
        { name: "Zara Khan", img: colead },
        { name: "Daniel White", img: colead },
      ],
    },
    {
      role: "Design Lead",
      name: "Eve Green",
      img: leadimg,
      coordinators: [
        { name: "Luna Scott", img: colead },
        { name: "Oscar Gray", img: colead },
      ],
      volunteers: [
        { name: "Ava Clark", img: colead },
        { name: "Ethan Harris", img: colead },
      ],
    },
  ],
};

const data2024: OrgChartData = {
  lead: { role: "Lead", name: "Dushyanth", img: leadimg },
  domainLeads: [
    {
      role: "Co Lead",
      name: "Rishab",
      img: colead,
      coordinators: [],
      volunteers: [],
    },
    {
      role: "WebDev Lead",
      name: "Manideep",
      img: weblead,
      coordinators: [
        { name: "Sam Patel", img: colead },
        { name: "Nina James", img: colead },
      ],
      volunteers: [
        { name: "Michael Davis", img: colead },
        { name: "Emma Brown", img: colead },
      ],
    },
    {
      role: "CP Lead",
      name: "John Smith",
      img: managelead,
      coordinators: [
        { name: "Jacob Scott", img: colead },
        { name: "Mia Lewis", img: colead },
      ],
      volunteers: [
        { name: "Aiden Johnson", img: colead },
        { name: "Olivia Wilson", img: colead },
      ],
    },
    {
      role: "Management Lead",
      name: "Shivesh",
      img: managelead,
      coordinators: [
        { name: "David Martinez", img: colead },
        { name: "Sophia Garcia", img: colead },
      ],
      volunteers: [
        { name: "James Anderson", img: colead },
        { name: "Charlotte Lee", img: colead },
      ],
    },
    {
      role: "ML Lead",
      name: "Ryan Howard",
      img: managelead,
      coordinators: [
        { name: "Isabella Harris", img: colead },
        { name: "Jackson Walker", img: colead },
      ],
      volunteers: [
        { name: "Liam Robinson", img: colead },
        { name: "Mia Martinez", img: colead },
      ],
    },
    {
      role: "Design Lead",
      name: "Angela Martin",
      img: managelead,
      coordinators: [
        { name: "Oliver Thompson", img: colead },
        { name: "Amelia Wilson", img: colead },
      ],
      volunteers: [
        { name: "Noah Harris", img: colead },
        { name: "Ava Allen", img: colead },
      ],
    },
  ],
};

const OrgChart: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [year, setYear] = useState<number>(2025);
  const [selectedDomain, setSelectedDomain] = useState<number | null>(null);

  const dataToDisplay = year === 2025 ? data2025 : data2024;

  const handleClick = (index: number) => {
    setSelectedDomain(selectedDomain === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 relative">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Organizational Chart
      </h1>

      <div className="flex space-x-4 mb-8">
        <button
          className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
            year === 2025
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setYear(2025)}
        >
          2025
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
            year === 2024
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setYear(2024)}
        >
          2024
        </button>
      </div>

      {year === 2025 ? (
        <div className="text-center text-2xl text-gray-700">
          To be announced soon
        </div>
      ) : (
        <>
          <div className="flex flex-col items-center space-y-4 mb-6">
            <div className="shrink-0 w-36 h-36 md:w-48 md:h-48 overflow-hidden">
              <img
                src={dataToDisplay.lead.img}
                alt={dataToDisplay.lead.role}
                className="shrink-0 rounded-full w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold">{dataToDisplay.lead.role}</h2>
            <p className="text-md text-gray-700">{dataToDisplay.lead.name}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-24 relative">
            {dataToDisplay.domainLeads.map((person, index) => (
              <div key={index} className="flex flex-col items-center relative">
                <div className="shrink-0 w-36 h-36 md:w-48 md:h-48 overflow-hidden">
                  <img
                    src={person.img}
                    alt={person.role}
                    className="shrink-0 rounded-full w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                  />
                </div>
                <h2 className="text-lg font-medium text-center">
                  {person.role}
                </h2>
                <p className="text-md text-gray-700 text-center">
                  {person.name}
                </p>
                {person.role !== "Co Lead" && (
                  <button
                    onClick={() => handleClick(index)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                  >
                    Click here to see team
                  </button>
                )}

                {selectedDomain === index && (
                  <div className="p-4 bg-white border rounded shadow-lg w-full mt-4 transition-opacity duration-300 opacity-100">
                    <h3 className="text-lg font-semibold">Coordinators</h3>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {person.coordinators.map((coordinator, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <img
                            src={coordinator.img}
                            alt={coordinator.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <p className="text-sm text-gray-700">
                            {coordinator.name}
                          </p>
                        </div>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold">Volunteers</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {person.volunteers.map((volunteer, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <img
                            src={volunteer.img}
                            alt={volunteer.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <p className="text-sm text-gray-700">
                            {volunteer.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OrgChart;
