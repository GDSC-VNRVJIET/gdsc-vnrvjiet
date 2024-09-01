import React, { useState, useEffect } from "react";
import leadimg from "./images/lead.png";
import colead from "./images/colead.png";
import weblead from "./images/webdevlead.png";
import managelead from "./images/managementlead.png";
import designlead from "./images/creativelead.png";
import jayasreeimg from "./Domain Info/images/WEB DEV/Jayasree Gondipalle.jpg"
import jahnaviimg from "./Domain Info/images/WEB DEV/Sai Jahnavi Rallapalli.jpeg"
import manikantaimg from "./Domain Info/images/WEB DEV/Manikanta.jpg"
import karthikimg from "./Domain Info/images/WEB DEV/Karthik.jpg"
import varunimg from "./Domain Info/images/WEB DEV/Varun.jpg"
import dedeepyaimg from "./Domain Info/images/WEB DEV/Vellanki Chenchu Dedeepya .jpg"
import lakshitaimg from "./Domain Info/images/WEB DEV/Lakshita Goyal.jpg"
import harshaimg from "./Domain Info/images/CP/Harsha Vardhan.jpg"
import divyaimg from "./Domain Info/images/CP/Divya Sri.jpg"
import vighneshimg from "./Domain Info/images/CP/VighneshVangari.jpg"
import sahithiimg from "./Domain Info/images/MANAGEMENT/Sahithi.jpg"
import vinayimg from "./Domain Info/images/MANAGEMENT/GVK.jpg"
import jahnavireddyimg from "./Domain Info/images/MANAGEMENT/Jahnavi Reddy.png"
import rakshithaimg from "./Domain Info/images/MANAGEMENT/SaiRakshita.jpg"
import sadhikimg from "./Domain Info/images/MANAGEMENT/Sadhik.jpg"
import srikruthiimg from "./Domain Info/images/MANAGEMENT/SriKruthi.jpg"
import abhijeetimg from "./Domain Info/images/MANAGEMENT/Abhijeet.png"
import nikhitaimg from "./Domain Info/images/ML/D_Nikhita_Kashyap.jpeg"
import suryaimg from "./Domain Info/images/ML/Chittiprolu Suryateja.jpg"
import sharanimg from "./Domain Info/images/ML/SRI SHARAN TEJ.jpg"
import keerthikaimg from "./Domain Info/images/ML/KeerthikaGoli.jpg"
import roshiniimg from "./Domain Info/images/ML/KotagiriRoshini.jpg"
import bharathimg from "./Domain Info/images/ML/BharathChandra.jpg"
import vishwaimg from "./Domain Info/images/ML/Viswa Prateek Tummala .jpg"
import poojaimg from "./Domain Info/images/design/Poojasiri.jpg"
import siddeshwariimg from "./Domain Info/images/design/Siddeshwari _Adepu.jpg"
import praneethaimg from "./Domain Info/images/design/Praneetha.jpg"
import chanirudhimg from "./Domain Info/images/design/Anirudh.jpg"
import panirudhimg from "./Domain Info/images/design/Anirudh P.jpg"
import aryaimg from "./Domain Info/images/design/Arya Joshi.jpg"
import rishithaimg from "./Domain Info/images/design/Rishitha.jpg"

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
        { name: "Jayasree", img: jayasreeimg },
        { name: "Sai Jahnavi", img: jahnaviimg },
      ],
      volunteers: [
        { name: "Sri Manikanta", img: manikantaimg },
        { name: "Karthik", img: karthikimg },
        { name: "Varun", img: varunimg },
        { name: "Dedeepya", img: dedeepyaimg },
        { name: "Lakshita", img: lakshitaimg },
      ],
    },
    {
      role: "CP Lead",
      name: "John Smith",
      img: managelead,
      coordinators: [
        { name: "Harsha Vardhan", img: harshaimg },
      ],
      volunteers: [
        { name: "Vighnesh", img: vighneshimg },
        { name: "Divya Sri", img: divyaimg },
      ],
    },
    {
      role: "Management Lead",
      name: "Shivesh",
      img: managelead,
      coordinators: [
        { name: "Sahithi", img: sahithiimg },
        { name: "Vinay Kalyan", img: vinayimg },
        { name: "Jahnavi Reddy", img: jahnavireddyimg },
        { name: "Sai Rakshitha", img: rakshithaimg },
      ],
      volunteers: [
        { name: "Sadhik", img: sadhikimg },
        { name: "Sri Kruthi", img: srikruthiimg },
        { name: "Abhijeet", img: abhijeetimg },
      ],
    },
    {
      role: "ML Lead",
      name: "Ryan Howard",
      img: managelead,
      coordinators: [
        { name: "Nikhita Kashyap", img: nikhitaimg },
        { name: "Surya Teja", img: suryaimg },
      ],
      volunteers: [
        { name: "Sri Sharan Tej", img: sharanimg },
        { name: "Keerthika", img: keerthikaimg },
        { name: "Roshini", img: roshiniimg },
        { name: "Bharath Chandra", img: bharathimg },
        { name: "Vishwa Prateek", img: vishwaimg },
      ],
    },
    {
      role: "Design Lead",
      name: "Vinay",
      img: designlead,
      coordinators: [
        { name: "Pooja Siri", img: poojaimg },
        { name: "Siddeshwari", img: siddeshwariimg },
        { name: "Pavan Praneetha", img: praneethaimg },
      ],
      volunteers: [
        { name: "Ch. Anirudh", img: chanirudhimg },
        { name: "Arya Joshi", img: aryaimg },
        { name: "P. Anirudh", img: panirudhimg },
        { name: "Rishitha", img: rishithaimg },
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
  const [fadein, setFadein] = useState<boolean>(false);

  const dataToDisplay = year === 2025 ? data2025 : data2024;

  useEffect(() => {
    setTimeout(() => {
      setFadein(selectedDomain !== null);
    }, 10) }, [selectedDomain])

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

          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 justify-around gap-y-10 relative">
            {dataToDisplay.domainLeads.map((person, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
                onMouseLeave={() => setSelectedDomain(null)}
              >
                <div className="shrink-0 w-36 h-36 md:w-48 md:h-48"
                onMouseEnter={() => person.role !== "Co Lead" && setSelectedDomain(index)}
                
                >
                  <img
                    src={person.img}
                    alt={person.role}
                    className="shrink-0 rounded-full w-full h-full object-cover transition-transform duration-500 transform hover:scale-105"
                  />
                </div>
                <h2 className="text-lg font-medium text-center">
                  {person.role}
                </h2>
                <p className="text-md text-gray-700 text-center">
                  {person.name}
                </p>
                <div className={`lg:absolute lg:top-[15.5rem] relative left-0 w-screen bg-white p-4 rounded shadow-lg z-10 transition-opacity duration-500 ease-in-out ${(fadein && selectedDomain===index ) ? 'opacity-100 pointer-events-auto scale-y-100':'opacity-0 pointer-events-none scale-y-95 h-0'} `}>
                    <h3 className="text-md font-semibold text-center mb-2">
                      Coordinators
                    </h3>
                    <div className="flex justify-center flex-wrap mb-4">
                      {person.coordinators.map((coordinator, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center mb-2 w-36 h-36 md:w-48 md:h-48 overflow-hidden"
                        >
                          <img
                            src={coordinator.img}
                            alt={coordinator.name}
                            className="shrink-0 rounded-full w-full h-full object-cover"
                          />
                          <p className="text-sm text-gray-700 text-center mt-2">
                            {coordinator.name}
                          </p>
                        </div>
                      ))}
                    </div>
                    <h3 className="text-md font-semibold text-center mb-2">
                      Volunteers
                    </h3>
                    <div className="flex justify-center flex-wrap">
                      {person.volunteers.map((volunteer, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col items-center mb-2 w-36 h-36 md:w-48 md:h-48 overflow-hidden"
                        >
                          <img
                            src={volunteer.img}
                            alt={volunteer.name}
                            className="shrink-0 rounded-full w-full h-full object-cover"
                          />
                          <p className="text-sm text-gray-700 text-center mt-2">
                            {volunteer.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default OrgChart;
