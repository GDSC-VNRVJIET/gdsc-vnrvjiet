import React, { useState, useEffect, useRef } from "react";
import leadimg from "./images/lead.png";
import colead from "./images/colead.png";
import weblead from "./images/webdevlead.png";
import managelead from "./images/managementlead.png";
import designlead from "./images/creativelead.png";
import cplead from "./images/jayachandra_thelukuntla.webp";
import mllead from "./images/corolead.png";
import jayasreeimg from "./Domain Info/images/WEB DEV/Jayasree Gondipalle.jpg";
import jahnaviimg from "./Domain Info/images/WEB DEV/Sai Jahnavi Rallapalli.jpeg";
import hasnikaimg from "./Domain Info/images/WEB DEV/Sri Hasnika Venigalla .jpg";
import anitejimg from "./Domain Info/images/WEB DEV/Anitej Annabattuni.jpg";
import varunimg from "./Domain Info/images/WEB DEV/Varun.jpg";
import dedeepyaimg from "./Domain Info/images/WEB DEV/Vellanki Chenchu Dedeepya .jpg";
import bhanuprakash from "./Domain Info/images/CP/Bhanu Prakash Kanakamedala.jpg";
import pavankumar from "./Domain Info/images/CP/Pavan Kumar K.jpg";
import harshaimg from "./Domain Info/images/CP/Harsha.jpg";
import divyaimg from "./Domain Info/images/CP/Divya Sri.jpg";
import vighneshimg from "./Domain Info/images/CP/VighneshVangari.jpg";
import amruthaimg from "./Domain Info/images/CP/Amrutha_Tamada.jpg";
import sahithiimg from "./Domain Info/images/MANAGEMENT/Sahithi.jpg";
import vinayimg from "./Domain Info/images/TandC/GVK.jpg";
import jahnavireddyimg from "./Domain Info/images/MANAGEMENT/Jahnavi Reddy.png";
import rakshitaimg from "./Domain Info/images/MANAGEMENT/Sai Rakshita Narsingh.jpg";
import sadhikimg from "./Domain Info/images/MANAGEMENT/Sadhik.jpg";
import sathwikaimg from "./Domain Info/images/MANAGEMENT/Revoori Sathwika Reddy .jpg";
import spoorthyimg from "./Domain Info/images/MANAGEMENT/Spoorthy Boga.jpeg";
import nikhitaimg from "./Domain Info/images/ML/nikitha.jpg";
import suryaimg from "./Domain Info/images/ML/Chittiprolu Suryateja.jpg";
import sharanimg from "./Domain Info/images/ML/SRI SHARAN TEJ.jpg";
import keerthikaimg from "./Domain Info/images/ML/KeerthikaGoli.jpg";
import yasaswiniimg from "./Domain Info/images/WomenInTech/Yasaswini Devi.jpg";
import bharathimg from "./Domain Info/images/ML/BharathChandra.jpg";
import vishwaimg from "./Domain Info/images/ML/Viswa Prateek Tummala .jpg";
import poojaimg from "./Domain Info/images/design/Poojasiri.jpg.jpg";
import siddeshwariimg from "./Domain Info/images/design/Siddeshwari _Adepu.jpg";
import praneethaimg from "./Domain Info/images/design/Praneetha.jpg";
import chanirudhimg from "./Domain Info/images/design/Anirudh.jpg";
import abdulraheemimg from "./Domain Info/images/design/Abdul Raheem.png";
import abhishekimg from "./Domain Info/images/design/Abhishek Pothanagari.jpg";
import hindusriimg from "./Domain Info/profile_images/Design_SM/Hindu Sri Jupelli.jpg";
import zakiimg from "./Domain Info/images/design/Md Zaki.jpg";
import pavitraimg from "./Domain Info/images/design/Pavitra Jasti.jpg";
import bharathsirimg from "./images/facultyCord copy.jpg";
import ashraya from "./Domain Info/images/TandC/Ashraya Yelisetty.jpg";
import vardhan from "./Domain Info/images/TandC/M INDRANEELI VARDHAN .jpg";
import mahesh from "./Domain Info/images/TandC/Mahesh Patnala.jpg";
import akhilimg from "./Domain Info/images/AppDev/Akhil.png";
import shivaimg from "./Domain Info/images/AppDev/Shiva.jpg";
import venkatagauravimg from "./Domain Info/images/Hardware/Emani Venkata Gaurav.jpg";
import harshithaimg from "./Domain Info/images/Hardware/Sri Harshitha Yalla.jpg";
import hardwarelead from "./Domain Info/images/Hardware/Hardwarelead.jpg";
import tanmayeeimg from "./Domain Info/images/design/Tanmayee_kyram.jpg";
import aryaimg from "./Domain Info/images/design/Arya Joshi.jpg";
import rishithaimg from "./Domain Info/images/design/Rishitha.jpg";
import srikruthiimg from "./Domain Info/images/MANAGEMENT/SriKruthi.jpg";
import abhijeetimg from "./Domain Info/images/MANAGEMENT/Abhijeet.png";
import lakshitaimg from "./Domain Info/images/WEB DEV/Lakshita Goyal.jpg";
import manikantaimg from "./Domain Info/images/WEB DEV/Manikanta.jpg";
import karthikimg from "./Domain Info/images/WEB DEV/Karthik.jpg";
import sailokesh from "./Domain Info/images/CP/CP1.jpeg";
import vishnuvardhan from "./Domain Info/images/CP/CP2.jpg";
import udayyadav from "./Domain Info/images/CP/GUdhayYadav.jpg";
import harikaimg from "./Domain Info/images/MANAGEMENT/Harika.jpg";
import UdaySagar from "./Domain Info/images/AppDev/UdaySagar.jpeg";
import VinayKumar from "./Domain Info/images/AppDev/VinayKumarKajjapu.jpg";
import Harshitha from "./Domain Info/images/TandC/Harshithamandadi.jpg";
import Shahid from "./Domain Info/images/TandC/Shahid.jpg";
import Dhruva from "./Domain Info/images/Hardware/Dhruva.jpeg";
import nishmaimg from "./Domain Info/images/Hardware/HardwareC1.jpg";
import durgamadhavimg from "./Domain Info/images/Hardware/HardwareC2.jpg";
import roshiniimg from "./Domain Info/images/ML/KotagiriRoshini.jpg";
import siddharth from "./Domain Info/images/ML/Aimlead.jpg";
import udaysagar from "./Domain Info/profile_images/AppDev/Uday Sagar.jpg";
import roshini from "./Domain Info/images/WomenInTech/roshini.jpg";
import lakshitha from "./Domain Info/images/WEB DEV/lakshitha.jpg";
import durgamadhav from "./Domain Info/images/Hardware/Durgamadhav.jpg";
import vishnuvardhanimg from "./Domain Info/images/design/vishnuvardhan.png";
import sarvani from "./Domain Info/images/MANAGEMENT/Sarvani.jpg";
import RiteshImg from "./Domain Info/profile_images/WebDev/Sai Ritesh Domakuntla.jpg";
import ManikantaImg from "./Domain Info/images/WEB DEV/Manikanta.jpg";
import KruthiImg from "./Domain Info/profile_images/Sri Kruthi.jpg";
import TanmayeeImg from "./Domain Info/profile_images/Design_SM/Tanmayee Kyram.jpg";
import UdayImg from "./Domain Info/profile_images/CP/GUdhayYadav.jpg";
import ShahidImg from "./Domain Info/profile_images/CS/Shahid Ameed.jpg";
import NikhilImg from "./Domain Info/profile_images/Management/Nikhil Chanda.jpg";
import AbhijeetImg from "./Domain Info/profile_images/Outreach/Abhijeet Jetti.png";
import akashImg from "./Domain Info/profile_images/AIML/akash.jpg";
import Popover from "./Popover";
import GlassCard from "./GlassCard";

interface Person { role: string; name: string; img: string }
interface Coordinator { name: string; img: string }
interface Volunteer { name: string; img: string }
interface DomainLead extends Person { coordinators: Coordinator[]; volunteers: Volunteer[]; type?: string }
interface OrgChartData { facultyAdvisor: Person; lead: Person; domainLeads: DomainLead[] }

const data2026: OrgChartData = {
  facultyAdvisor: { role: "Faculty Advisor", name: "Bharath Sir", img: bharathsirimg },
  lead: { role: "Lead", name: "Sri Kruthi", img: KruthiImg },
 
  domainLeads: [
    { 
      role: "Co Lead", 
      name: "Sri Manikanta", 
      img: ManikantaImg,
      coordinators: [],
      volunteers: [],
    },
    { 
      role: "Outreach Lead", 
      name: "Abhijeet Jetti", 
      img: AbhijeetImg,
      coordinators: [],
      volunteers: [],
    },
    {
      role: "WebDev Lead",
      name: "Lakshita Goyal",
      img: lakshitha,
      coordinators: [
        { name: "Sri Hasnika Venigalla", img: hasnikaimg },
        { name: "Anitej Annabattuni", img: anitejimg },
        { name: "Sai Ritesh Domakuntla", img: RiteshImg }
      ],
      volunteers: [
        
      ],
      type:"technical",
    },
    {
      role: "CP Lead",
      name: "G Udhay Yadav",
      img: UdayImg,
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
      name: "Harika",
      img: harikaimg,
      coordinators: [
        { name: "Revoori Sathwika Reddy", img: sathwikaimg },
        { name: "Sarvani", img: sarvani },
        { name: "Spoorthy Boga", img: spoorthyimg },
        { name: "Nikhil Chanda", img: NikhilImg }
      ],
      volunteers: [
      ],
      type: "nonTechnical",
    },
    {
      role: "AIML Lead",
      name: "Siddharth",
      img: siddharth ,
      coordinators: [
        //{ name: "Keerthika", img: keerthikaimg },
        // { name: "Roshini", img: roshiniimg },
        //{ name: "Bharath Chandra", img: bharathimg },
        { name: "Akash", img: akashImg },
      ],
      volunteers: [
      ],
      type:"technical",
    },
    {
      role: "Design and Social Media Lead",
      name: "Vishnu Vardhan",
      img: vishnuvardhanimg,
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
      role: "Design and Social Media Lead",
      name: "Tanmayee Kyram",
      img: TanmayeeImg,
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
      role: "AppDev Lead",
      name: "Uday Sagar",
      img: udaysagar,
      coordinators: [
        {name:"Akhil",img:akhilimg},
        {name:"Shiva",img:shivaimg}
      ],
      volunteers: [],
      type:"technical",
    },


    {
      role: "Testing and Cybersecurity Lead",
      name: "Shahid Ameed",
      img: ShahidImg,
      coordinators: [
        {name:"Ashraya Yelisetty",img:ashraya},
        {name:"M INDRANEELI VARDHAN ",img:vardhan},
        {name:"Mahesh Patnala",img:mahesh}
      ],
      volunteers: [],
      type:"technical",
    },
    {
      role: "Testing and Cybersecurity Lead",
      name: "Harshitha Mandadi",
      img: Harshitha,
      coordinators: [
        {name:"Ashraya Yelisetty",img:ashraya},
        {name:"M INDRANEELI VARDHAN ",img:vardhan},
        {name:"Mahesh Patnala",img:mahesh}
      ],
      volunteers: [],
      type:"technical",
    },
  
    {
      role:"Hardware Lead",
      name:"Durga Madhav",
      img:durgamadhav,
      coordinators:[
        {name:"Emani Venkata Gaurav",img:venkatagauravimg},
        {name:"Sri Harshitha Yalla",img:harshithaimg}
      ],
      volunteers:[],
      type:"non technical"
    },
    {
      role: "Women In Tech Lead",
      name: "Roshini Kotagiri",
      img: roshini,
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
        { name: "Sri Manikanta", img: manikantaimg },
        { name: "Karthik", img: karthikimg },
        { name: "Lakshita", img: lakshitaimg },
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
        {name:"Sai Lokesh",img:sailokesh},
        {name:"N Vishnu Vardhan",img:vishnuvardhan},
        {name:"G Udhay Yadav",img:udayyadav}
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
        { name: "Sri Kruthi", img: srikruthiimg },
        { name: "Abhijeet", img: abhijeetimg },
        { name: "Harika", img: harikaimg },
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
        { name: "Ch. Anirudh", img: chanirudhimg },
        { name: "Arya Joshi", img: aryaimg },
        {name:"Rishitha",img:rishithaimg},
        {name:"Tanmayee Kyram",img:tanmayeeimg}
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
        {name:"Harshitha Mandadi",img:Harshitha},
        {name:"Shahid",img:Shahid},
      ],
      volunteers: [],
      type:"technical",
    },
    {
      role: "AppDev Lead",
      name: "Jahnavi Reddy",
      img: jahnavireddyimg,
      coordinators: [
        {name:"Uday Sagar",img:UdaySagar},
        {name:"Vinay Kumar",img:VinayKumar}
      ],
      volunteers: [],
      type:"technical",
    },
    {
      role:"Hardware Lead",
      name:"Avaneesh",
      img:hardwarelead,
      coordinators:[
        {name:"Nishma Reddy",img:nishmaimg},
        {name:"Durga Madhav",img:durgamadhavimg},
        {name:"Dhruva",img:Dhruva}
      ],
      volunteers:[],
      type:"non technical"
    },
    {
      role: "Women In Tech Lead",
      name: "Nikhita Kashyap D",
      img: nikhitaimg,
      coordinators: [
        {name:"Roshini Kotagiri",img:roshiniimg}
      ],
      volunteers: [],
      type:"technical",
    },
    
  ],
};
const data2024: OrgChartData = {
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
        { name: "Varun", img: varunimg },
        { name: "Dedeepya", img: dedeepyaimg },
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
        { name: "Sai Rakshitha", img: rakshitaimg },
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
        { name: "Rishitha", img: rishithaimg },
      ],
    },
   
  ],
};

const OrgChart = () => {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [year, setYear] = useState<number>(2026)
  const [selectedPerson, setSelectedPerson] = useState<DomainLead | null>(null)
  const dataToDisplay = year === 2026 ? data2026 : year === 2025 ? data2025 : data2024

  const hideTimer = useRef<number | null>(null)
  const clearHideTimer = () => {
    if (hideTimer.current) {
      window.clearTimeout(hideTimer.current)
      hideTimer.current = null
    }
  }

  useEffect(() => () => clearHideTimer(), [])

  const showSelected = (person: DomainLead) => {
    if (person.role === "Co Lead" || person.role === "Outreach Lead") return
    setSelectedPerson(person)
  }

  const hideSelected = () => setSelectedPerson(null)

  const hideSelectedDelayed = (delay = 2) => {
    clearHideTimer()
    hideTimer.current = window.setTimeout(() => hideSelected(), delay)
  }

  const handleLeadClickEvent = (expectation: string, person: DomainLead) => {
    if (expectation === "open") showSelected(person)
    else {
      setSelectedPerson(null)
      hideSelectedDelayed()
      hideSelected()
    }
  }

  return (
    <div className="orgchart">
      <div className="min-h-screen bg-white z-40 px-6 py-16 md:px-20 flex flex-col items-center relative overflow-x-hidden">
        <h1 className="text-4xl font-bold mb-6 text-center">Organizational Chart</h1>

        <div className="flex space-x-4 mb-8">
          <button className={`px-6 py-2 rounded-full font-semibold ${year === 2026 ? "bg-blue-500 text-white" : "bg-gray-200"}`} onClick={() => setYear(2026)}>2026</button>
          <button className={`px-6 py-2 rounded-full font-semibold ${year === 2025 ? "bg-yellow-500 text-white" : "bg-gray-200"}`} onClick={() => setYear(2025)}>2025</button>
          <button className={`px-6 py-2 rounded-full font-semibold ${year === 2024 ? "bg-red-500 text-white" : "bg-gray-200"}`} onClick={() => setYear(2024)}>2024</button>
        </div>

        <div className="mx-1 flex flex-col items-center w-2/3 mb-5">
          <GlassCard profileImage={dataToDisplay.facultyAdvisor.img} personRole={dataToDisplay.facultyAdvisor.role} personName={dataToDisplay.facultyAdvisor.name} />
        </div>

        <h2 className="text-2xl font-bold mb-6">Chapter's Lead</h2>

        <div className="mx-1 flex flex-col items-center w-1/3 mb-5">
          <GlassCard profileImage={dataToDisplay.lead.img} personRole={dataToDisplay.lead.role} personName={dataToDisplay.lead.name} />
        </div>

        <div className="border-b-4 border-red-500 text-center my-5">
          <p>Meet our specialized units</p>
          <h1 className="text-5xl font-bold">Domain Leads</h1>
        </div>

        <div className="mt-5 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-3 gap-y-10">
          {dataToDisplay.domainLeads.map((person, index) => (
            <div key={index} className="flex flex-col items-center" onClick={() => handleLeadClickEvent("open", person)}>
              {selectedPerson && selectedPerson.coordinators.length && selectedPerson === person && (
                <div className="fixed inset-0 z-50 bg-black/60" onClick={() => setSelectedPerson(null)}>
                  <Popover
                    domainLeads={dataToDisplay.domainLeads}
                    selectedPerson={selectedPerson}
                    handleLeadClickEvent={handleLeadClickEvent}
                    setSelectedPerson={setSelectedPerson}
                  />
                </div>
              )}
              <GlassCard profileImage={person.img} personRole={person.role} personName={person.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrgChart