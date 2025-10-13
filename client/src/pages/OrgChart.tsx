import React, { useState, useEffect } from "react";
import leadimg from "./images/lead.png";
import colead from "./images/colead.png";
import weblead from "./images/webdevlead.png";
import managelead from "./images/managementlead.png";
import designlead from "./images/creativelead.png";
import cplead from "./images/jayachandra_thelukuntla.webp"
import mllead from "./images/corolead.png"
import jayasreeimg from "./Domain Info/images/WEB DEV/Jayasree Gondipalle.jpg"
import jahnaviimg from "./Domain Info/images/WEB DEV/Sai Jahnavi Rallapalli.jpeg"
import hasnikaimg from "./Domain Info/images/WEB DEV/Sri Hasnika Venigalla .jpg"
import anitejimg from "./Domain Info/images/WEB DEV/Anitej Annabattuni.jpg"
import varunimg from "./Domain Info/images/WEB DEV/Varun.jpg"
import dedeepyaimg from "./Domain Info/images/WEB DEV/Vellanki Chenchu Dedeepya .jpg"
import vigneshvardhan from "./Domain Info/images/CP/VighneshVangari.jpg"
import bhanuprakash from './Domain Info/images/CP/Bhanu Prakash Kanakamedala.jpg'
import pavankumar from './Domain Info/images/CP/Pavan Kumar K.jpg'
import harshaimg from "./Domain Info/images/CP/Harsha.jpg"
import divyaimg from "./Domain Info/images/CP/Divya Sri.jpg"
import vighneshimg from "./Domain Info/images/CP/VighneshVangari.jpg"
import amruthaimg from "./Domain Info/images/CP/Amrutha_Tamada.jpg"
import sahithiimg from "./Domain Info/images/MANAGEMENT/Sahithi.jpg"
import vinayimg from "./Domain Info/images/TandC/GVK.jpg"
import jahnavireddyimg from "./Domain Info/images/MANAGEMENT/Jahnavi Reddy.png"
import rakshitaimg from "./Domain Info/images/MANAGEMENT/Sai Rakshita Narsingh.jpg"
import sadhikimg from "./Domain Info/images/MANAGEMENT/Sadhik.jpg"
import sathwikaimg from "./Domain Info/images/MANAGEMENT/Revoori Sathwika Reddy .jpg"
import spoorthyimg from "client/src/pages/Domain Info/images/MANAGEMENT/Spoorthy Boga.jpeg"
import nikhitaimg from "./Domain Info/images/ML/nikitha.jpg"
import suryaimg from "./Domain Info/images/ML/Chittiprolu Suryateja.jpg"
import sharanimg from "./Domain Info/images/ML/SRI SHARAN TEJ.jpg"
import keerthikaimg from "./Domain Info/images/ML/KeerthikaGoli.jpg"
import yasaswiniimg from "./Domain Info/images/WomenInTech/Yasaswini Devi.jpg"
import bharathimg from "./Domain Info/images/ML/BharathChandra.jpg"
import vishwaimg from "./Domain Info/images/ML/Viswa Prateek Tummala .jpg"
import poojaimg from "./Domain Info/images/design/Poojasiri.jpg.jpg"
import siddeshwariimg from "./Domain Info/images/design/Siddeshwari _Adepu.jpg"
import praneethaimg from "./Domain Info/images/design/Praneetha.jpg"
import chanirudhimg from "./Domain Info/images/design/Anirudh.jpg"
import abdulraheemimg from "./Domain Info/images/design/Abdul Raheem.png"
import abhishekimg from "./Domain Info/images/design/Abhishek Pothanagari.jpg"
import hindusriimg from "./Domain Info/images/design/Hindu Sri Jupelli.png"
import zakiimg from "./Domain Info/images/design/Md Zaki.jpg"
import pavitraimg from "./Domain Info/images/design/Pavitra Jasti.jpg"
import bharathsirimg from "./images/facultyCord copy.jpg"
import ashraya from "./Domain Info/images/TandC/Ashraya Yelisetty.jpg"
import harshitha from "./Domain Info/images/TandC/Harshitha.jpg"
import vardhan from "./Domain Info/images/TandC/M INDRANEELI VARDHAN .jpg"
import mahesh from "./Domain Info/images/TandC/Mahesh Patnala.jpg"
import akhilimg from "./Domain Info/images/AppDev/Akhil.png"
import shivaimg from "./Domain Info/images/AppDev/Shiva.jpg"
import venkatagauravimg from "./Domain Info/images/Hardware/Emani Venkata Gaurav.jpg"
import harshithaimg from "./Domain Info/images/Hardware/Sri Harshitha Yalla.jpg";
import hardwarelead from "./Domain Info/images/Hardware/Hardwarelead.jpg"
import { set } from "date-fns";

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
  type?: string;
}

interface OrgChartData {
  facultyAdvisor: Person;
  lead: Person;
  domainLeads: DomainLead[];
}

const data2026: OrgChartData = {
  facultyAdvisor: { role: "Faculty Advisor", name: "Bharath Sir", img: bharathsirimg },
  lead: { role: "Lead", name: "Jayasree Gondipalle", img: jayasreeimg },
 
  domainLeads: [
    { 
      role: "Co Lead", 
      name: "Sahithi Kolla", 
      img: sahithiimg,
      coordinators: [],
      volunteers: [],
    },
    {
      role: "WebDev Lead",
      name: "Sai Jahnavi",
      img: jahnaviimg,
      coordinators: [
        { name: "Sri Hasnika Venigalla", img: hasnikaimg },
        { name: "Anitej Annabattuni", img: anitejimg }
      ],
      volunteers: [
        
      ],
      type:"technical",
    },
    {
      role: "CP Lead",
      name: "Harsha Vardhan",
      img: harshaimg,
      coordinators: [
        {name:"Kanakamedala Bhanu Prakash",img:bhanuprakash},
        {name:"K Pavan Kumar",img:pavankumar}
      ],
      volunteers: [
      ],
      type:"technical",
    },
    {
      role: "Management Lead",
      name: "Sai Rakshita Narsingh",
      img: rakshitaimg,
      coordinators: [
        { name: "Revoori Sathwika Reddy", img: sathwikaimg },
        { name: "Sai Rakshita Narsingh", img: rakshitaimg },
        { name: "Spoorthy Boga", img: spoorthyimg },
      ],
      volunteers: [
      ],
      type: "nonTechnical",
    },
    {
      role: "AIML Lead",
      name: "Surya Teja Chittiprolu",
      img: suryaimg ,
      coordinators: [
        { name: "Keerthika", img: keerthikaimg },
        // { name: "Roshini", img: roshiniimg },
        { name: "Bharath Chandra", img: bharathimg },
      ],
      volunteers: [
      ],
      type:"technical",
    },
    {
      role: "Design Lead",
      name: "Siddeshwari A",
      img: siddeshwariimg,
      coordinators: [
        { name: "Abdul Raheem", img: abdulraheemimg },
        { name: "Abhishek Pothanagari", img: abhishekimg },
        { name: "Hindu Sri Jupelli", img: hindusriimg },
        {name:"Md Zaki",img:zakiimg},
        {name:"Pavitra Jasti",img:pavitraimg}
      ],
      volunteers: [
      ],
      type: "nonTechnical",
    },
    {
      role: "Social Media Lead",
      name: "Pavanpraneetha Kunuku",
      img: praneethaimg,
      coordinators: [
        {name:"Ch.Anirudh",img:chanirudhimg},
        {name:"Tanmayee Kyram",img:tanmayeeimg},
        {name:"Arya Joshi",img:aryaimg},
        {name:"Rishitha",img:rishithaimg}
      ],
      volunteers: [],
      type: "nonTechnical",
    },
    {
      role: "Testing and Cybersecurity Lead",
      name: "Vinay Gajula",
      img: vinayimg,
      coordinators: [
        {name:"Harshitha",img:harshitha},
        {name:"Ashraya Yelisetty",img:ashraya},
        {name:"M INDRANEELI VARDHAN ",img:vardhan},
        {name:"Mahesh Patnala",img:mahesh}
      ],
      volunteers: [],
      type:"technical",
    },
    {
      role: "AppDev Lead",
      name: "Jahnavi Reddy",
      img: jahnavireddyimg,
      coordinators: [
        {name:"Akhil",img:akhilimg},
        {name:"Shiva",img:shivaimg}
      ],
      volunteers: [],
      type:"technical",
    },
    {
      role:"Hardware Lead",
      name:"Avaneesh",
      img:hardwarelead,
      coordinators:[
        {name:"Emani Venkata Gaurav",img:venkatagauravimg},
        {name:"Sri Harshitha Yalla",img:harshithaimg}
      ],
      volunteers:[],
      type:"non technical"
    },
    {
      role: "Women In Tech Lead",
      name: "Nikhita Kashyap D",
      img: nikhitaimg,
      coordinators: [
        {name:"Yasaswini Devi",img:yasaswiniimg}
      ],
      volunteers: [],
      type:"technical",
    },
    
  ],
};

const data2025: OrgChartData = {
  facultyAdvisor: { role: "Faculty Advisor", name: "Bharath Sir", img: bharathsirimg },
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
      name: "Jayachandra",
      img: cplead,
      coordinators: [
        { name: "Harsha Vardhan", img: harshaimg },
      ],
      volunteers: [
        { name: "Vighnesh", img: vighneshimg },
        { name: "Divya Sri", img: divyaimg },
        { name: "Amrutha", img: amruthaimg },
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
      name: "Akhil",
      img: mllead ,
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

  const [year, setYear] = useState<number>(2026);
  const [selectedDomain, setSelectedDomain] = useState<number | null>(null);
  const [fadein, setFadein] = useState<boolean>(false);
  const domainTypes = ["technical", "nonTechnical"];

  const dataToDisplay = year === 2026 ? data2026 : data2025;

  useEffect(() => {
    setTimeout(() => {
      setFadein(selectedDomain !== null);
    }, 10) }, [selectedDomain])

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 relative overflow-x-hidden">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Organizational Chart
      </h1>

      <div className="flex space-x-4 mb-8">
        <button
          className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
            year === 2026
              ? "bg-yellow-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setYear(2026)}
        >
          2026
        </button>
        <button
          className={`px-6 py-2 rounded-full font-semibold transition duration-300 ${
            year === 2025
              ? "bg-red-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setYear(2025)}
        >
          2025
        </button>
      </div>

        <>
          <div className="flex flex-col items-center space-y-4 mb-6">
            <div className="shrink-0 w-36 h-36 md:w-48 md:h-48 overflow-hidden">
              <img
                src={dataToDisplay.facultyAdvisor.img}
                alt={dataToDisplay.facultyAdvisor.role}
                className="shrink-0 rounded-full w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold">{dataToDisplay.facultyAdvisor.role}</h2>
            
            
<p className="text-md" style={{ fontFamily: 'Roboto, sans-serif', color: 'grey-200' }}>
  {dataToDisplay.facultyAdvisor.name}
</p>
</div>
          <div className="flex flex-col items-center space-y-4 mb-6">
            <div className="shrink-0 w-36 h-36 md:w-48 md:h-48 overflow-hidden">
              <img
                src={dataToDisplay.lead.img}
                alt={dataToDisplay.lead.role}
                className="shrink-0 rounded-full w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold">{dataToDisplay.lead.role}</h2>
            
            <p className="text-md" style={{ fontFamily: 'Roboto, sans-serif',color:'grey-200' }}>
  {dataToDisplay.lead.name}
</p>

          </div>
          <div className={`w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ${year===2025?"xl:grid-cols-5":"xl:grid-cols-6"} justify-around gap-y-10 relative`}>
            {dataToDisplay.domainLeads
            .map((person, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
                onMouseLeave={() => setSelectedDomain(null)}
              >
                <div className="shrink-0 w-36 h-36 md:w-48 md:h-48"
                onMouseEnter={() => person.role !== "Co Lead" && (person.coordinators.length+person.volunteers.length>0) && setSelectedDomain(index)}
                onMouseLeave={() => window.innerWidth<=1024 && setSelectedDomain(null)}
                
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
                
                
<p className="text-md text-center" style={{ fontFamily: 'Roboto, sans-serif', color: 'Grey-200 ' }}>
  {person.name}
</p>
                <div className={`lg:absolute ${(year===2024 || index<5)?"lg:top-[15.5rem]":"lg:top-[33rem]"} relative left-0 w-screen bg-white p-4 rounded shadow-lg z-10 transition-opacity duration-500 ease-in-out ${(selectedDomain===index ) ? '':'hidden'} ${fadein?'opacity-100':'opacity-0'}`}>
                 
{person.coordinators.length > 0 && (
  <div className="bg-blue-50 rounded-md mb-3 p-3">
    <h3 className="text-md font-semibold text-center mb-2 text-blue-700">Coordinators</h3>
    <div className="flex justify-center flex-wrap mb-4">
      {person.coordinators.map((coordinator, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center mb-9 mx-2 w-36 h-36 md:w-48 md:h-48"
        >
        
          <img
            src={coordinator.img}
            alt={coordinator.name}
            className="shrink-0 rounded-full w-full h-full object-cover mb-2"
          />
        
<p className="text-md text-center" style={{ fontFamily: 'Roboto, sans-serif', color: 'grey-200' }}>
  {coordinator.name}
</p>

          
        </div>
      ))}
    </div>
  </div>
)}

   
   
                    {person.volunteers.length > 0 && 
                    <h3 className="text-md font-semibold text-center mb-2">
                      Volunteers
                    </h3>}
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
                         
                          <p className="text-sm" style={{ fontFamily: 'Roboto, sans-serif', color: 'grey-200' }}>
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
    </div>
  );
};

export default OrgChart;


