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
import hasnikaimg from "./Domain Info/images/WEB DEV/hasnika.png";
import anitejimg from "./Domain Info/images/WEB DEV/Anitej.png";
import varunimg from "./Domain Info/images/WEB DEV/Varun.jpg";
import dedeepyaimg from "./Domain Info/images/WEB DEV/Vellanki Chenchu Dedeepya .jpg";
import bhanuprakash from "./Domain Info/images/CP/bhanuparakash.png";
import pavankumar from "./Domain Info/images/CP/pavankumar.png";
import harshaimg from "./Domain Info/images/CP/Harsha.jpg";
import divyaimg from "./Domain Info/images/CP/Divya Sri.jpg";
import vighneshimg from "./Domain Info/images/CP/VighneshVangari.jpg";
import amruthaimg from "./Domain Info/images/CP/Amrutha_Tamada.jpg";
import sahithiimg from "./Domain Info/images/MANAGEMENT/Sahithi.jpg";
import vinayimg from "./Domain Info/images/TandC/GVK.jpg";
import jahnavireddyimg from "./Domain Info/images/MANAGEMENT/Jahnavi Reddy.png";
import rakshitaimg from "./Domain Info/images/MANAGEMENT/Sai Rakshita Narsingh.jpg";
import sadhikimg from "./Domain Info/images/MANAGEMENT/Sadhik.jpg";
import sathwikaimg from "./Domain Info/images/MANAGEMENT/sathwika.png";
import spoorthyimg from "./Domain Info/images/MANAGEMENT/spoorthy.png";
import nikhitaimg from "./Domain Info/images/ML/nikitha.jpg";
import suryaimg from "./Domain Info/images/ML/Chittiprolu Suryateja.jpg";
import sharanimg from "./Domain Info/images/ML/SRI SHARAN TEJ.jpg";
import keerthikaimg from "./Domain Info/images/ML/KeerthikaGoli.jpg";
import yasaswiniimg from "./Domain Info/images/WomenInTech/yasaswini devi.png";
import bharathimg from "./Domain Info/images/ML/BharathChandra.jpg";
import vishwaimg from "./Domain Info/images/ML/Viswa Prateek Tummala .jpg";
import poojaimg from "./Domain Info/images/design/Poojasiri.jpg.jpg";
import siddeshwariimg from "./Domain Info/images/design/Siddeshwari _Adepu.jpg";
import praneethaimg from "./Domain Info/images/design/Praneetha.jpg";
import chanirudhimg from "./Domain Info/images/design/Anirudh.jpg";
import abdulraheemimg from "./Domain Info/images/design/Abdul Raheem.png";
import abhishekimg from "./Domain Info/images/design/abhishek.png";
import hindusriimg from "./Domain Info/profile_images/Design_SM/hindu sri.png";
import zakiimg from "./Domain Info/images/design/mdZaki.png";
import pavitraimg from "./Domain Info/images/design/pavitra.png";
import bharathsirimg from "./images/facultyCord copy.jpg";
import ashraya from "./Domain Info/images/TandC/ashraya.png";
import vardhan from "./Domain Info/images/TandC/M INDRANEELI VARDHAN.png";
import mahesh from "./Domain Info/images/TandC/Mahesh Patnala.png";
import akhilimg from "./Domain Info/images/AppDev/Akhil.png";
import shivaimg from "./Domain Info/images/AppDev/appdev2.png";
import venkatagauravimg from "./Domain Info/images/Hardware/emani venkata gaurav.png";
import harshithaimg from "./Domain Info/images/Hardware/sri harshitha yalla.png";
import hardwarelead from "./Domain Info/images/Hardware/Hardwarelead.jpg";
import tanmayeeimg from "./Domain Info/images/design/tanmayee_lead.png";
import aryaimg from "./Domain Info/images/design/Arya Joshi.jpg";
import rishithaimg from "./Domain Info/images/design/Rishitha.jpg";
import srikruthiimg from "./Domain Info/images/MANAGEMENT/SriKruthi.jpg";
import abhijeetimg from "./Domain Info/images/MANAGEMENT/Abhijeet.png";
import lakshitaimg from "./Domain Info/images/WEB DEV/lakshita.png";
import manikantaimg from "./Domain Info/images/WEB DEV/manikanta.png";
import karthikimg from "./Domain Info/images/WEB DEV/Karthik.jpg";
import sailokesh from "./Domain Info/images/CP/CP1.jpeg";
import vishnuvardhan from "./Domain Info/images/CP/CP2.jpg";
import udayyadav from "./Domain Info/images/CP/cp_lead.png";
import harikaimg from "./Domain Info/images/MANAGEMENT/Management_lead.png";
import UdaySagar from "./Domain Info/images/AppDev/uday_appLead.png";
import VinayKumar from "./Domain Info/images/AppDev/VinayKumarKajjapu.jpg";
import Harshitha from "./Domain Info/images/TandC/harshitha_lead.png";
import Shahid from "./Domain Info/images/TandC/shahidHameed-lead.png";
import Dhruva from "./Domain Info/images/Hardware/Dhruva.jpeg";
import nishmaimg from "./Domain Info/images/Hardware/HardwareC1.jpg";
import durgamadhavimg from "./Domain Info/images/Hardware/hardware_lead.png";
import roshiniimg from "./Domain Info/images/WomenInTech/roshini_lead.png";
import siddharth from "./Domain Info/images/ML/siddharth.png";
import udaysagar from "./Domain Info/profile_images/AppDev/uday_appLead.png";
import roshini from "./Domain Info/images/WomenInTech/roshini_lead.png";
import lakshitha from "./Domain Info/images/WEB DEV/lakshita.png";
import durgamadhav from "./Domain Info/images/Hardware/hardware_lead.png";
import vishnuvardhanimg from "./Domain Info/images/design/vishnuvardhan.png";
import sarvani from "./Domain Info/images/MANAGEMENT/sarvani.png";
import RiteshImg from "./Domain Info/profile_images/WebDev/ritesh.png";
import ManikantaImg from "./Domain Info/images/WEB DEV/manikanta.png";
import KruthiImg from "./Domain Info/profile_images/Sri Kruthi.png";
import TanmayeeImg from "./Domain Info/profile_images/Design_SM/tanmayee_lead.png";
import UdayImg from "./Domain Info/images/CP/cp_lead.png";
import ShahidImg from "./Domain Info/profile_images/CS/shahidHameed-lead.png";
import NikhilImg from "./Domain Info/profile_images/Management/nikhil.png";
import AbhijeetImg from "./Domain Info/profile_images/Outreach/Abhijeet Jetti.png";
import akashImg from "./Domain Info/profile_images/AIML/akash.png";
import Popover from "./Popover";
import GlassCard from "./GlassCard";
import star from "../orgchart/star.png"
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import "../styles/org.css";
import slants from "../orgchart/slants.png";
import brackets from "../orgchart/brackets.png"
import arrow from "../orgchart/arrow.png"
import doodles from "../orgchart/doodles.png"
import arc from "../orgchart/arc.png"

interface Person {
  role: string
  name: string
  img: string
  description?: string
  linkedin?: string
}
interface Coordinator { name: string; img: string }
interface Volunteer { name: string; img: string }
interface DomainLead extends Person { coordinators: Coordinator[]; volunteers: Volunteer[]; type?: string }
interface OrgChartData { facultyAdvisor: Person; lead: Person; domainLeads: DomainLead[] }

const data2026: OrgChartData = {
  facultyAdvisor: {
    role: "Faculty Advisor",
    name: "Bharath Sir",
    img: bharathsirimg,
    description: "Dr. Bharath Kumar Chowdary is the faculty advisor of the Google Developer Groups chapter at VNRVJIET. He mentors students in building technical communities and encourages innovation through collaborative projects.",
    linkedin: "https://www.linkedin.com/in/bharath-kumar-chowdary"
  },
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
      type: "technical",
    },
    {
      role: "CP Lead",
      name: "G Udhay Yadav",
      img: UdayImg,
      coordinators: [
        { name: "Kanakamedala Bhanu Prakash", img: bhanuprakash },
        { name: "K Pavan Kumar", img: pavankumar }
      ],
      volunteers: [
      ],
      type: "technical",
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
      img: siddharth,
      coordinators: [
        //{ name: "Keerthika", img: keerthikaimg },
        // { name: "Roshini", img: roshiniimg },
        //{ name: "Bharath Chandra", img: bharathimg },
        { name: "Akash", img: akashImg },
      ],
      volunteers: [
      ],
      type: "technical",
    },
    {
      role: "Design and Social Media Lead",
      name: "Vishnu Vardhan",
      img: vishnuvardhanimg,
      coordinators: [
        { name: "Abdul Raheem", img: abdulraheemimg },
        { name: "Abhishek Pothanagari", img: abhishekimg },
        { name: "Hindu Sri Jupelli", img: hindusriimg },
        { name: "Md Zaki", img: zakiimg },
        { name: "Pavitra Jasti", img: pavitraimg }
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
        { name: "Akhil", img: akhilimg },
        { name: "Shiva", img: shivaimg }
      ],
      volunteers: [],
      type: "technical",
    },
    {
      role: "Design and Social Media Lead",
      name: "Tanmayee Kyram",
      img: TanmayeeImg,
      coordinators: [
        { name: "Abdul Raheem", img: abdulraheemimg },
        { name: "Abhishek Pothanagari", img: abhishekimg },
        { name: "Hindu Sri Jupelli", img: hindusriimg },
        { name: "Md Zaki", img: zakiimg },
        { name: "Pavitra Jasti", img: pavitraimg }
      ],
      volunteers: [
      ],
      type: "nonTechnical",
    },
    {
      role: "Testing and Cybersecurity Lead",
      name: "Shahid Ameed",
      img: ShahidImg,
      coordinators: [
        { name: "Ashraya Yelisetty", img: ashraya },
        { name: "M INDRANEELI VARDHAN ", img: vardhan },
        { name: "Mahesh Patnala", img: mahesh }
      ],
      volunteers: [],
      type: "technical",
    },


    {
      role: "Hardware Lead",
      name: "Durga Madhav",
      img: durgamadhav,
      coordinators: [
        { name: "Emani Venkata Gaurav", img: venkatagauravimg },
        { name: "Sri Harshitha Yalla", img: harshithaimg }
      ],
      volunteers: [],
      type: "non technical"
    },
    {
      role: "Testing and Cybersecurity Lead",
      name: "Harshitha Mandadi",
      img: Harshitha,
      coordinators: [
        { name: "Ashraya Yelisetty", img: ashraya },
        { name: "M INDRANEELI VARDHAN ", img: vardhan },
        { name: "Mahesh Patnala", img: mahesh }
      ],
      volunteers: [],
      type: "technical",
    },
    {
      role: "Women In Tech Lead",
      name: "Roshini Kotagiri",
      img: roshini,
      coordinators: [
        { name: "Yasaswini Devi", img: yasaswiniimg }
      ],
      volunteers: [],
      type: "technical",
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
      type: "technical",
    },
    {
      role: "CP Lead",
      name: "Harsha Vardhan",
      img: harshaimg,
      coordinators: [
        { name: "Sai Lokesh", img: sailokesh },
        { name: "N Vishnu Vardhan", img: vishnuvardhan },
        { name: "G Udhay Yadav", img: udayyadav }
      ],
      volunteers: [
      ],
      type: "technical",
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
      img: suryaimg,
      coordinators: [
        { name: "Keerthika", img: keerthikaimg },
        // { name: "Roshini", img: roshiniimg },
        { name: "Bharath Chandra", img: bharathimg },
      ],
      volunteers: [
      ],
      type: "technical",
    },
    {
      role: "Design Lead",
      name: "Siddeshwari A",
      img: siddeshwariimg,
      coordinators: [
        { name: "Ch. Anirudh", img: chanirudhimg },
        { name: "Arya Joshi", img: aryaimg },
        { name: "Rishitha", img: rishithaimg },
        { name: "Tanmayee Kyram", img: tanmayeeimg }
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
        { name: "Ch.Anirudh", img: chanirudhimg },
        { name: "Tanmayee Kyram", img: tanmayeeimg },
        { name: "Arya Joshi", img: aryaimg },
        { name: "Rishitha", img: rishithaimg }
      ],
      volunteers: [],
      type: "nonTechnical",
    },
    {
      role: "Testing and Cybersecurity Lead",
      name: "Vinay Gajula",
      img: vinayimg,
      coordinators: [
        { name: "Harshitha Mandadi", img: Harshitha },
        { name: "Shahid", img: Shahid },
      ],
      volunteers: [],
      type: "technical",
    },
    {
      role: "AppDev Lead",
      name: "Jahnavi Reddy",
      img: jahnavireddyimg,
      coordinators: [
        { name: "Uday Sagar", img: UdaySagar },
        { name: "Vinay Kumar", img: VinayKumar }
      ],
      volunteers: [],
      type: "technical",
    },
    {
      role: "Hardware Lead",
      name: "Avaneesh",
      img: hardwarelead,
      coordinators: [
        { name: "Nishma Reddy", img: nishmaimg },
        { name: "Durga Madhav", img: durgamadhavimg },
        { name: "Dhruva", img: Dhruva }
      ],
      volunteers: [],
      type: "non technical"
    },
    {
      role: "Women In Tech Lead",
      name: "Nikhita Kashyap D",
      img: nikhitaimg,
      coordinators: [
        { name: "Roshini Kotagiri", img: roshiniimg }
      ],
      volunteers: [],
      type: "technical",
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
      img: mllead,
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

const headerColors = ["#FED201", "#01DE5D", "#E8F0FE", "#FFD6E0"];
const bodyColors = ["#FFE69C", "#C1F8BF", "#F5F9FF", "#FFF0F5"];

const OrgChart = () => {
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const [year, setYear] = useState<number>(2026)
  const [selectedPerson, setSelectedPerson] = useState<DomainLead | null>(null)
  const [currentCoordinator, setCurrentCoordinator] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null)
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

  const cardColors = [
    "#FFE8A5",
    "#CCF6C6",
    "#E8F0FE",
    "#f8d8d8"
  ];

  const columns = 3

  const rows = []
  for (let i = 0; i < dataToDisplay.domainLeads.length; i += columns) {
    rows.push(dataToDisplay.domainLeads.slice(i, i + columns))
  }

  return (
    <div className="orgchart">
      <div className="min-h-screen z-40 py-20 md:py-20 flex flex-col items-center relative overflow-x-hidden" style={{ background: "#FFFFFF" }}>
        <h1 className="text-4xl md:text-5xl font-normal mb-4 text-center tracking-wide flex items-center justify-center gap-4">

          <span className="animate-spin [animation-duration:6s]">
            <img src={star} alt="star" className="w-9 h-9" />
          </span>

          Organizational Chart
          <span className="animate-[spin_6s_linear_infinite_reverse]">
            <img src={star} alt="star" className="w-9 h-9" />
          </span>

        </h1>


        <div className="flex gap-2 mb-12 mt-7 p-1 rounded-full w-fit" style={{ background: "#E8F0FE" }}>
          {[2026, 2025, 2024].map((y) => (
            <button
              key={y}
              onClick={() => setYear(y)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
      ${year === y
                  ? " shadow-md"
                  : "hover:bg-white"
                }`}
              style={year === y ? { backgroundColor: "#8AB4F8" } : {}}
            >
              {y}
            </button>
          ))}
        </div>
        <div className="w-full py-20 flex justify-center px-2" style={{ background: "#E8F0FE" }}>
          <div className="max-w-7xl w-full flex flex-col md:flex-row items-center gap-16">


            <div className="flex-shrink-0 w-56 h-56 rounded-full overflow-hidden">
              <img
                src={dataToDisplay.facultyAdvisor.img}
                alt={dataToDisplay.facultyAdvisor.name}
                className="w-full h-full object-cover"
              />
            </div>


            <div className="text-center md:text-left">

              <p className="text-sm text-gray-500 tracking-wide mb-2 desc ">
                Faculty Advisor
              </p>

              <h2 className="text-3xl font-bold mb-4">
                {dataToDisplay.facultyAdvisor.name}
              </h2>

              <p className="text-[18px] font-normal leading-[32px] text-[#202124] mb-6 max-w-2xl">
                {dataToDisplay.facultyAdvisor.description}
              </p>

              <a
                href={dataToDisplay.facultyAdvisor.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-medium hover:underline"
              >
                <BsLinkedin className="w-5 h-5 sm:w-4 sm:h-4 hover:scale-110 transition" />
                LinkedIn
              </a>

            </div>
            <img
              src={slants}
              className="w-40 h-40 object-cover"
            />
          </div>
        </div>


        <div
          className="w-full pt-5 pb-16 flex flex-col items-center px-2 relative"
          style={{ background: "#FFE8A5" }}
        >
          <img
            src={arrow}
            alt="arrow"
            className="absolute left-[25%] top-[64px] h-20 w-auto"
          />

          <div className="flex items-center gap-3 mt-10 mb-8">
            <img src={brackets} alt="bracket" className="h-16 w-auto" />

            <h2
              className="text-3xl md:text-4xl font-normal tracking-tight 
      bg-yellow-400 border-2 border-black px-8 py-4 rounded-2xl"
            >
               Chapter's Organizer
            </h2>

            <img src={brackets} alt="bracket" className="h-16 w-auto scale-x-[-1]" />
            <img
              src={arc}
              alt="arc"
              className="absolute right-[25%] bottom-[38px] h-48 w-auto"
            />
          </div>

          <div className="w-full max-w-[320px] flex justify-center">
            <div
              className="border-2 relative border-gray-400
      transition-all duration-300 hover:-translate-y-1 hover:shadow-sm
      w-full max-w-[300px]
      flex flex-col items-center
      py-8 px-6"
              style={{ background: "#FFE8A5" }}
            >
              <div className="text-black text-center">
                <img
                  src={dataToDisplay.lead.img}
                  alt={dataToDisplay.lead.role}
                  className="w-[170px] h-[170px] object-cover"
                />

                <h2
                  className="text-lg font-semibold mt-4"
                  style={{ fontFamily: '"Google Sans", sans-serif' }}
                >
                  {dataToDisplay.lead.name}
                </h2>

                <p
                  className="text-sm text-gray-500"
                  style={{ fontFamily: '"Google Sans", sans-serif' }}
                >
                  {dataToDisplay.lead.role}
                </p>
              </div>


              <svg className="absolute h-6 w-6 -top-3 -left-3 text-black" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>

              <svg className="absolute h-6 w-6 -bottom-3 -left-3 text-black" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>

              <svg className="absolute h-6 w-6 -top-3 -right-3 text-black" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>

              <svg className="absolute h-6 w-6 -bottom-3 -right-3 text-black" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>

            </div>
          </div>
        </div>

        <div className="text-center mt-20 mb-20">
          <p className="text-gray-500 text-md desc">
            meet our specialized units
          </p>

          <h2 className="text-3xl md:text-3xl font-normal mt-2 ">
            Domain Leads
          </h2>

        </div>
        <div
          className="w-full animate-floatbg"
          style={{
            backgroundImage: `url(${doodles})`,
            backgroundRepeat: "repeat",
            backgroundSize: "750px",
          }}
        >
          <div className="max-w-[1000px] mx-auto bg-white py-10">

            <div className="w-full">
              {rows.map((row, rowIndex) => {

                const startIndex = rowIndex * columns
                const endIndex = startIndex + row.length - 1

                const isOpenInRow =
                  openIndex !== null &&
                  openIndex >= startIndex &&
                  openIndex <= endIndex

                const person =
                  isOpenInRow ? dataToDisplay.domainLeads[openIndex!] : null

                return (
                  <React.Fragment key={rowIndex}>
                    <div className="mb-16">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">

                        {row.map((person, i) => {

                          const index = startIndex + i

                          return (
                            <div
                              key={index}
                              onClick={() => {
                                if (person.coordinators.length === 0) return

                                if (openIndex === index) {
                                  setOpenIndex(null)
                                } else {
                                  setOpenIndex(index)
                                  setSelectedPerson(person)
                                }
                              }}
                              className="cursor-pointer"
                            >
                              <GlassCard
                                profileImage={person.img}
                                personRole={person.role}
                                personName={person.name}
                              />
                            </div>
                          )
                        })}

                      </div>

                      {isOpenInRow && person && (() => {

                        const count = person.coordinators.length

                        let gridCols = "grid-cols-2"
                        if (count === 1) gridCols = "grid-cols-1"
                        else if (count === 2) gridCols = "grid-cols-2"
                        else if (count === 3) gridCols = "grid-cols-3"
                        else gridCols = "grid-cols-4"

                        const imageSize =
                          count <= 2
                            ? "w-44 h-44"
                            : count === 3
                              ? "w-40 h-40"
                              : "w-32 h-32"

                        return (
                          <div className="border border-black bg-white mt-10 transition-all duration-300">

                            <div className="flex justify-between items-center px-6 py-4 border-b border-black">

                              <h2 className="text-lg font-semibold">
                                Coordinators
                              </h2>

                              <button
                                onClick={() => setOpenIndex(null)}
                                className="text-lg"
                              >
                                ✕
                              </button>

                            </div>

                            <div className={`grid ${gridCols} gap-8 p-8 justify-items-center`}>

                              {person.coordinators.map((coord, i) => (
                                <div
                                  key={i}
                                  className="flex flex-col items-center text-center hover:-translate-y-1 transition"
                                >

                                  <img
                                    src={coord.img}
                                    className={`${imageSize} object-cover mb-3`}
                                  />

                                  <h3 className="font-semibold text-sm">
                                    {coord.name}
                                  </h3>

                                  <p className="text-xs text-gray-500">
                                    Coordinator
                                  </p>

                                </div>
                              ))}

                            </div>

                          </div>
                        )

                      })()}

                    </div>
                  </React.Fragment>
                )
              })}
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}

export default OrgChart