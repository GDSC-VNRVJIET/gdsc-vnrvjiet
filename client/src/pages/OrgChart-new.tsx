import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import leadimg from "./images/dushyanth.png";
import colead from "./images/rishab.png";
import weblead from "./images/rishabh.png";
import managelead from "./images/shivesh.png";
import designlead from "./images/vinay.png";
import cplead from "./images/jayachandra.png";
import mllead from "./images/akhil.png";
import jayasreeimg from "./Domain Info/images/WEB DEV/Jayasree Gondipalle.png";
import jahnaviimg from "./Domain Info/images/WEB DEV/sai jahnavi.png";
import hasnikaimg from "./Domain Info/images/WEB DEV/hasnika.png";
import anitejimg from "./Domain Info/images/WEB DEV/Anitej.png";
import varunimg from "./Domain Info/images/WEB DEV/Varun.jpg";
import dedeepyaimg from "./Domain Info/images/WEB DEV/Vellanki Chenchu Dedeepya .jpg";
import bhanuprakash from "./Domain Info/images/CP/bhanuparakash.png";
import pavankumar from "./Domain Info/images/CP/pavankumar.png";
import harshaimg from "./Domain Info/images/CP/harsha.png";
import divyaimg from "./Domain Info/images/CP/Divya Sri.jpg";
import vighneshimg from "./Domain Info/images/CP/VighneshVangari.jpg";
import amruthaimg from "./Domain Info/images/CP/Amrutha_Tamada.jpg";
import sahithiimg from "./Domain Info/images/MANAGEMENT/sahithi.png";
import vinayimg from "./Domain Info/images/TandC/vinayg.png";
import jahnavireddyimg from "./Domain Info/images/AppDev/jahnavi.png";
import rakshitaimg from "./Domain Info/images/MANAGEMENT/sairakshita.png";
import sadhikimg from "./Domain Info/images/MANAGEMENT/Sadhik.jpg";
import harikaG from "./Domain Info/images/MANAGEMENT/harika-g.png";
import sathwikaimg from "./Domain Info/images/MANAGEMENT/sathwika.png";
import spoorthyimg from "./Domain Info/images/MANAGEMENT/spoorthy.png";
import nikhitaimg from "./Domain Info/images/WomenInTech/nikhita.png";
import suryaimg from "./Domain Info/images/ML/suryateja.png";
import sharanimg from "./Domain Info/images/ML/SRI SHARAN TEJ.jpg";
import keerthikaimg from "./Domain Info/images/ML/keerthika.png";
import nikhithaR from "./Domain Info/images/ML/nikhitha-r.png";
import yasaswiniimg from "./Domain Info/images/WomenInTech/yasaswini devi.png";
import bharathimg from "./Domain Info/images/ML/bharathchandra.png";
import vishwaimg from "./Domain Info/images/ML/Viswa Prateek Tummala .jpg";
import poojaimg from "./Domain Info/images/design/pooja.png";
import rishithaY from "./Domain Info/images/design/rishitha-y.png";
import anirudhY from "./Domain Info/images/design/anirudh-y.png";
import aryaY from "./Domain Info/images/design/arya-y.png";
import tanmayeeY from "./Domain Info/images/design/tanmayee-y.png";
import siddeshwariimg from "./Domain Info/images/design/siddeshwari.png";
import praneethaimg from "./Domain Info/images/design/praneetha.png";
import praneethaY from "./Domain Info/images/design/praneetha-y.png";
import chanirudhimg from "./Domain Info/images/design/anirudh.png";
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
import hardwarelead from "./Domain Info/images/Hardware/avaneesh.png";
import tanmayeeimg from "./Domain Info/images/design/tanmayee_lead.png";
import aryaimg from "./Domain Info/images/design/aryajoshi.png";
import rishithaimg from "./Domain Info/images/design/rishitha.png";
import srikruthiimg from "./Domain Info/images/MANAGEMENT/srikruthi.png";
import abhijeetimg from "./Domain Info/images/MANAGEMENT/Abhijeet.png";
import lakshitaimg from "./Domain Info/images/WEB DEV/lakshita.png";
import manikantaimg from "./Domain Info/images/WEB DEV/manikanta.png";
import karthikimg from "./Domain Info/images/WEB DEV/karthik.png";
import sailokesh from "./Domain Info/images/CP/lokesh.png";
import udhayB from "./Domain Info/images/CP/udhay-b.png";
import vishnuvardhan from "./Domain Info/images/CP/vishnuvardhan.png";
import udayyadav from "./Domain Info/images/CP/cp_lead.png";
import harikaimg from "./Domain Info/images/MANAGEMENT/Management_lead.png";
import jahnaviG from "./Domain Info/images/MANAGEMENT/jahnavi-g.png";
import sahithiG from "./Domain Info/images/MANAGEMENT/sahithi-g.png";
import UdaySagar from "./Domain Info/images/AppDev/uday_appLead.png";
import VinayKumar from "./Domain Info/images/AppDev/vinaykumar.png";
import Harshitha from "./Domain Info/images/TandC/harshitha_lead.png";
import Shahid from "./Domain Info/images/TandC/shahidHameed-lead.png";
import harshithaG from "./Domain Info/images/TandC/harshitha-g.png";
import shahidG from "./Domain Info/images/TandC/shahid-g.png";
import Dhruva from "./Domain Info/images/Hardware/dhruva.png";
import nishmaimg from "./Domain Info/images/Hardware/nishma.png";
import durgamadhavimg from "./Domain Info/images/Hardware/durga.png";
import roshiniimg from "./Domain Info/images/WomenInTech/roshini_lead.png";
import siddharth from "./Domain Info/images/ML/siddharth.png";
import udaysagar from "./Domain Info/profile_images/AppDev/uday_appLead.png";
import udayB from "./Domain Info/images/AppDev/uday-b.png";
import roshini from "./Domain Info/images/WomenInTech/roshini_lead.png";
import roshiniY from "./Domain Info/images/WomenInTech/roshini-y.png";
import lakshitha from "./Domain Info/images/WEB DEV/lakshita.png";
import jayasreeG from "./Domain Info/images/WEB DEV/jayasree-g.png";
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
import manikantaG from "./Domain Info/images/WEB DEV/manikanta-g.png";
import lakshitaG from "./Domain Info/images/WEB DEV/lakshita-g.png";
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
  lead: { role: "", name: "Sri Kruthi", img: KruthiImg },

  domainLeads: [
    {
      role: "Co ",
      name: "Sri Manikanta",
      img: ManikantaImg,
      coordinators: [],
      volunteers: [],
    },
    {
      role: "Outreach",
      name: "Abhijeet Jetti",
      img: AbhijeetImg,
      coordinators: [],
      volunteers: [],
    },
    {
      role: "WebDev",
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
      role: "CP",
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
      role: "Management",
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
      role: "AIML",
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
      role: "Design and Social Media",
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
      role: "AppDev",
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
      role: "Design and Social Media",
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
      role: "Testing and Cybersecurity",
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
      role: "Hardware",
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
      role: "Testing and Cybersecurity",
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
      role: "Women In Tech",
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
  facultyAdvisor: {
    role: "Faculty Advisor",
    name: "Bharath Sir",
    img: bharathsirimg,
    description: "Dr. Bharath Kumar Chowdary is the faculty advisor of the Google Developer Groups chapter at VNRVJIET. He mentors students in building technical communities and encourages innovation through collaborative projects.",
    linkedin: "https://www.linkedin.com/in/bharath-kumar-chowdary"
  },
  lead: { role: "", name: "Jayasree Gondipalle", img: jayasreeimg },

  domainLeads: [
    {
      role: "Co",
      name: "Sahithi Kolla",
      img: sahithiimg,
      coordinators: [],
      volunteers: [],
    },
    {
      role: "WebDev",
      name: "Sai Jahnavi",
      img: jahnaviimg,
      coordinators: [
        { name: "Sri Manikanta", img: manikantaG },
        { name: "Karthik", img: karthikimg },
        { name: "Lakshita", img: lakshitaG },
      ],
      volunteers: [

      ],
      type: "technical",
    },
    {
      role: "CP",
      name: "Harsha Vardhan",
      img: harshaimg,
      coordinators: [
        { name: "Sai Lokesh", img: sailokesh },
        { name: "N Vishnu Vardhan", img: vishnuvardhan },
        { name: "G Udhay Yadav", img: udhayB }
      ],
      volunteers: [
      ],
      type: "technical",
    },
    {
      role: "Management",
      name: "Sai Rakshita Narsingh",
      img: rakshitaimg,
      coordinators: [
        { name: "Sri Kruthi", img: srikruthiimg },
        { name: "Abhijeet", img: abhijeetimg },
        { name: "Harika", img: harikaG },
      ],
      volunteers: [
      ],
      type: "nonTechnical",
    },
    {
      role: "AIML",
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
      role: "Design",
      name: "Siddeshwari A",
      img: siddeshwariimg,
      coordinators: [
        { name: "Ch. Anirudh", img: anirudhY },
        { name: "Arya Joshi", img: aryaY },
        { name: "Rishitha", img: rishithaY },
        { name: "Tanmayee Kyram", img: tanmayeeY }
      ],
      volunteers: [
      ],
      type: "nonTechnical",
    },
    {
      role: "Social Media",
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
      role: "Testing and Cybersecurity",
      name: "Vinay Gajula",
      img: vinayimg,
      coordinators: [
        { name: "Harshitha Mandadi", img: harshithaG },
        { name: "Shahid", img: shahidG },
      ],
      volunteers: [],
      type: "technical",
    },
    {
      role: "AppDev",
      name: "Jahnavi Reddy",
      img: jahnavireddyimg,
      coordinators: [
        { name: "Uday Sagar", img: udayB },
        { name: "Vinay Kumar", img: VinayKumar }
      ],
      volunteers: [],
      type: "technical",
    },
    {
      role: "Hardware",
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
      role: "Women In Tech",
      name: "Nikhita Kashyap D",
      img: nikhitaimg,
      coordinators: [
        { name: "Roshini Kotagiri", img: roshiniY }
      ],
      volunteers: [],
      type: "technical",
    },

  ],
};
const data2024: OrgChartData = {
  facultyAdvisor: {
    role: "Faculty Advisor",
    name: "Bharath Sir",
    img: bharathsirimg,
    description: "Dr. Bharath Kumar Chowdary is the faculty advisor of the Google Developer Groups chapter at VNRVJIET. He mentors students in building technical communities and encourages innovation through collaborative projects.",
    linkedin: "https://www.linkedin.com/in/bharath-kumar-chowdary"
  },
  lead: { role: "", name: "Dushyanth", img: leadimg },
  domainLeads: [
    {
      role: "Co",
      name: "Rishab",
      img: colead,
      coordinators: [],
      volunteers: [],
    },
    {
      role: "WebDev",
      name: "Manideep",
      img: weblead,
      coordinators: [
        { name: "Jayasree", img: jayasreeG },
        { name: "Sai Jahnavi", img: jahnaviimg },
      ],
      volunteers: [
        { name: "Varun", img: varunimg },
        { name: "Dedeepya", img: dedeepyaimg },
      ],
    },
    {
      role: "CP",
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
      role: "Management",
      name: "Shivesh",
      img: managelead,
      coordinators: [
        { name: "Sahithi", img: sahithiG },
        { name: "Vinay Kalyan", img: vinayimg },
        { name: "Jahnavi Reddy", img: jahnaviG },
        { name: "Sai Rakshitha", img: rakshitaimg },
      ],
      volunteers: [
        { name: "Sadhik", img: sadhikimg },
        { name: "Sri Kruthi", img: srikruthiimg },
        { name: "Abhijeet", img: abhijeetimg },
      ],
    },
    {
      role: "ML",
      name: "Akhil",
      img: mllead,
      coordinators: [
        { name: "Nikhita Kashyap", img: nikhithaR },
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
      role: "Design",
      name: "Vinay",
      img: designlead,
      coordinators: [
        { name: "Pooja Siri", img: poojaimg },
        { name: "Siddeshwari", img: siddeshwariimg },
        { name: "Pavan Praneetha", img: praneethaY },
      ],
      volunteers: [
        { name: "Ch. Anirudh", img: chanirudhimg },
        { name: "Arya Joshi", img: aryaimg },
        { name: "Rishitha", img: rishithaimg },
      ],
    },

  ],
};

const headerColors = ["#F9AB00", "#34A853", "#4285F4", "#34A853", "#FF73B0", "#F9AB00", "#4285F4", "#34A853", "#4285F4", "#4285F4", "#F9AB00", "#4285F4", "#FF73B0"];

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
  const colorIndex = openIndex !== null ? openIndex % headerColors.length : 0;

  const hideSelectedDelayed = (delay = 2) => {
    clearHideTimer()
    hideTimer.current = window.setTimeout(() => hideSelected(), delay)
  }

  const AP = AnimatePresence as React.FC<any>;
  const handleLeadClickEvent = (expectation: string, person: DomainLead) => {
    if (expectation === "open") showSelected(person)
    else {
      setSelectedPerson(null)
      hideSelectedDelayed()
      hideSelected()
    }
  }

  const columns = 3

  const panelRef = useRef<HTMLDivElement | null>(null);

  const rows = []
  for (let i = 0; i < dataToDisplay.domainLeads.length; i += columns) {
    rows.push(dataToDisplay.domainLeads.slice(i, i + columns))
  }

  useEffect(() => {
    if (openIndex !== null && panelRef.current) {
      setTimeout(() => {
        panelRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 200);
    }
  }, [openIndex]);

  return (
    <div className="orgchart">
      <div className="min-h-screen z-40 py-20 md:py-20 flex flex-col items-center relative overflow-x-hidden" style={{ background: "#FFFFFF" }}>
        <h1 className="text-4xl md:text-5xl font-normal mb-4 text-center tracking-wide flex items-center justify-center gap-4">

          <span className="hidden [@media(min-width:480px)]:inline animate-spin [animation-duration:6s]">
            <img src={star} alt="star" className="w-9 h-9" />
          </span>

          Organizational Chart

          <span className="hidden [@media(min-width:480px)]:inline animate-[spin_6s_linear_infinite_reverse]">
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
          <div className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-10 lg:gap-16 px-4">


            <div className="flex-shrink-0 w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden">
              <img
                src={dataToDisplay.facultyAdvisor.img}
                alt={dataToDisplay.facultyAdvisor.name}
                className="w-full h-full object-cover"
              />
            </div>


            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">

              <div className="text-center md:text-left max-w-xl">
                <p className="text-sm text-gray-500 tracking-wide mb-2 desc">
                  Faculty Advisor
                </p>

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
                  {dataToDisplay.facultyAdvisor.name}
                </h2>

                <p className="text-sm sm:text-base lg:text-[18px] leading-6 sm:leading-7 lg:leading-[32px]">
                  {dataToDisplay.facultyAdvisor.description}
                </p>

                <a
                  href={dataToDisplay.facultyAdvisor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium hover:underline mt-4"
                >
                  <BsLinkedin className="w-5 h-5 sm:w-4 sm:h-4 hover:scale-110 transition" />
                  LinkedIn
                </a>
              </div>
              <img
                src={slants}
                className="hidden [@media(min-width:1036px)]:block mt-10 w-32 md:w-36 lg:w-40 h-auto object-contain"
              />

            </div>
          </div>
        </div>


        <div
          className="w-full pt-5 pb-16 flex flex-col items-center px-2 relative"
          style={{ background: "#FFE8A5" }}
        >
          <img
            src={arrow}
            alt="arrow"
            className="hidden [@media(min-width:1300px)]:block absolute left-[25%] top-[64px] h-20 w-auto"
          />
          <div className="flex items-center gap-2 sm:gap-3 mt-8 sm:mt-10 mb-6 sm:mb-8 flex-wrap justify-center">

            <img src={brackets} alt="bracket" className="h-10 sm:h-12 md:h-16 w-auto" />

            <h2
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal tracking-tight 
              bg-yellow-400 border-2 border-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-xl md:rounded-2xl text-center"
            >
              Chapter's Organizer
            </h2>

            <img src={brackets} alt="bracket" className="h-10 sm:h-12 md:h-16 w-auto scale-x-[-1]" />

          </div>

          <div className="w-full max-w-[260px] sm:max-w-[300px] flex justify-center">
            <div
              className="border-2 relative border-gray-400
              transition-all duration-300 hover:-translate-y-1 hover:shadow-sm
              w-full flex flex-col items-center
              py-5 sm:py-6 md:py-8 px-4 sm:px-5 md:px-6"
              style={{ background: "#FFE8A5" }}
            >
              <div className="text-black text-center">
                <img
                  src={dataToDisplay.lead.img}
                  alt={dataToDisplay.lead.role}
                  className="w-[110px] h-[110px] sm:w-[140px] sm:h-[140px] md:w-[170px] md:h-[170px] object-cover rounded-full"
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
                  {dataToDisplay.lead.role} Lead
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

          <img
            src={arc}
            alt="arrow"
            className="hidden [@media(min-width:1300px)]:block absolute right-[25%] bottom-[38px] h-40 w-auto"
          />
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
          className="w-full animate-floatbg xl:bg-none 2xl:bg-[length:750px]"
          style={{
            backgroundImage:
              typeof window !== "undefined" && window.innerWidth >= 1300
                ? `url(${doodles})`
                : "none",
            backgroundRepeat: "repeat",
            backgroundSize: "750px",
          }}
        >
          <div className="max-w-[1000px] mx-auto bg-white px-6 md:px-8 [@media(min-width:1300px)]:px-0">

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
                    <div className="mb-10 sm:mb-12 md:mb-16">
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">

                        {row.map((person, i) => {

                          const index = startIndex + i

                          return (
                            <motion.div
                              key={index}
                              onClick={() => {
                                if (person.coordinators.length === 0) return;

                                if (openIndex === index) {
                                  setOpenIndex(null);
                                } else {
                                  setOpenIndex(index);
                                  setSelectedPerson(person);
                                }
                              }}
                              className="cursor-pointer"
                              initial={{ opacity: 0, y: 40 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: i * 0.1 }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.97 }}
                              viewport={{ once: true }}
                            >
                              <GlassCard
                                profileImage={person.img}
                                personRole={person.role}
                                personName={person.name}
                              />
                            </motion.div>
                          )
                        })}

                      </div>

                      <AP mode="wait">
                        {isOpenInRow && person ? (
                          <motion.div
                            key={person.name}
                            ref={panelRef}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="border border-black mt-10 overflow-hidden shadow-sm"
                          >
                            <div
                              className="relative flex items-center px-6 py-4 border-b border-black"
                              style={{ backgroundColor: headerColors[colorIndex] }}
                            >
                              <h2 className="text-base sm:text-lg font-semibold text-center w-full">
                                {person.role} Coordinators
                              </h2>

                              <motion.button
                                onClick={() => setOpenIndex(null)}
                                className="absolute right-4 sm:right-6 text-lg"
                                whileHover={{ scale: 1.2, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                ✕
                              </motion.button>
                            </div>

                            <div
                              className={`grid ${person.coordinators.length === 2
                                  ? "grid-cols-1 sm:grid-cols-2"
                                  : person.coordinators.length === 3
                                    ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
                                    : person.coordinators.length >= 4
                                      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4"
                                      : "grid-cols-1"
                                } gap-6 sm:gap-8 px-4 sm:px-6 md:px-8 py-6 justify-items-center`}
                            >
                              {person.coordinators.map((coord, i) => (
                                <motion.div
                                  key={coord.name} 
                                  className="flex flex-col items-center text-center"
                                  initial={{ opacity: 0, scale: 0.85 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: i * 0.08 }}
                                  whileHover={{ scale: 1.05 }}
                                >
                                  <img
                                    src={coord.img}
                                    alt={coord.name}
                                    className={`${person.coordinators.length <= 2
                                        ? "w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44"
                                        : person.coordinators.length === 3
                                          ? "w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40"
                                          : "w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32"
                                      } object-cover mb-3`}
                                  />

                                  <h3 className="font-semibold text-sm">{coord.name}</h3>
                                  <p className="text-xs text-gray-500">Coordinator</p>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AP>
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