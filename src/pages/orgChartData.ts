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
import srikruthiimg from "./Domain Info/images/MANAGEMENT/SriKruthi.jpg";
import abhijeetimg from "./Domain Info/images/MANAGEMENT/Abhijeet.png";
import nikhitaimg from "./Domain Info/images/ML/nikitha.jpg";
import suryaimg from "./Domain Info/images/ML/Chittiprolu Suryateja.jpg";
import sharanimg from "./Domain Info/images/ML/SRI SHARAN TEJ.jpg";
import keerthikaimg from "./Domain Info/images/ML/KeerthikaGoli.jpg";
import bharathimg from "./Domain Info/images/ML/BharathChandra.jpg";
import vishwaimg from "./Domain Info/images/ML/Viswa Prateek Tummala .jpg";
import poojaimg from "./Domain Info/images/design/Poojasiri.jpg.jpg";
import siddeshwariimg from "./Domain Info/images/design/Siddeshwari _Adepu.jpg";
import praneethaimg from "./Domain Info/images/design/Praneetha.jpg";
import chanirudhimg from "./Domain Info/images/design/Anirudh.jpg";
import abhishekimg from "./Domain Info/images/design/Abhishek Pothanagari.jpg";
import hindusriimg from "./Domain Info/images/design/Hindu Sri Jupelli.png";
import zakiimg from "./Domain Info/images/design/Md Zaki.jpg";
import pavitraimg from "./Domain Info/images/design/Pavitra Jasti.jpg";
import aryaimg from "./Domain Info/images/design/Arya Joshi.jpg";
import rishithaimg from "./Domain Info/images/design/Rishitha.jpg";
import bharathsirimg from "./images/facultyCord copy.jpg";

export interface TeamMember {
  role: string;
  name: string;
  img: string;
  coordinators?: TeamMember[];
  volunteers?: TeamMember[];
}

export interface OrgChartData {
  facultyAdvisor: TeamMember;
  lead: TeamMember;
  domainLeads: TeamMember[];
}

export const orgChartData: Record<number, OrgChartData> = {
  2024: {
    facultyAdvisor: {
      role: "Faculty Advisor",
      name: "Bharath Sir",
      img: bharathsirimg,
    },
    lead: { role: "Lead", name: "Dushyanth", img: leadimg },
    domainLeads: [
      { role: "Co Lead", name: "Rishab", img: colead },
      {
        role: "WebDev Lead",
        name: "Manideep",
        img: weblead,
        coordinators: [
          { role: "Coordinator", name: "Jayasree", img: jayasreeimg },
          { role: "Coordinator", name: "Sai Jahnavi", img: jahnaviimg },
        ],
        volunteers: [
          { role: "Volunteer", name: "Varun", img: varunimg },
          { role: "Volunteer", name: "Dedeepya", img: dedeepyaimg },
        ],
      },
      {
        role: "CP Lead",
        name: "Jayachandra",
        img: cplead,
        coordinators: [
          { role: "Coordinator", name: "Harsha Vardhan", img: harshaimg },
        ],
        volunteers: [
          { role: "Volunteer", name: "Vighnesh", img: vighneshimg },
          { role: "Volunteer", name: "Divya Sri", img: divyaimg },
          { role: "Volunteer", name: "Amrutha", img: amruthaimg },
        ],
      },
      {
        role: "Management Lead",
        name: "Shivesh",
        img: managelead,
        coordinators: [
          { role: "Coordinator", name: "Sahithi", img: sahithiimg },
          { role: "Coordinator", name: "Vinay Kalyan", img: vinayimg },
          { role: "Coordinator", name: "Jahnavi Reddy", img: jahnavireddyimg },
          { role: "Coordinator", name: "Sai Rakshitha", img: rakshitaimg },
        ],
        volunteers: [
          { role: "Volunteer", name: "Sadhik", img: sadhikimg },
          { role: "Volunteer", name: "Sri Kruthi", img: srikruthiimg },
          { role: "Volunteer", name: "Abhijeet", img: abhijeetimg },
        ],
      },
      {
        role: "ML Lead",
        name: "Akhil",
        img: mllead,
        coordinators: [
          { role: "Coordinator", name: "Nikhita Kashyap", img: nikhitaimg },
          { role: "Coordinator", name: "Surya Teja", img: suryaimg },
        ],
        volunteers: [
          { role: "Volunteer", name: "Sri Sharan Tej", img: sharanimg },
          { role: "Volunteer", name: "Keerthika", img: keerthikaimg },
          { role: "Volunteer", name: "Bharath Chandra", img: bharathimg },
          { role: "Volunteer", name: "Vishwa Prateek", img: vishwaimg },
        ],
      },
      {
        role: "Design Lead",
        name: "Vinay",
        img: designlead,
        coordinators: [
          { role: "Coordinator", name: "Pooja Siri", img: poojaimg },
          { role: "Coordinator", name: "Siddeshwari", img: siddeshwariimg },
          { role: "Coordinator", name: "Pavan Praneetha", img: praneethaimg },
        ],
        volunteers: [
          { role: "Volunteer", name: "Ch. Anirudh", img: chanirudhimg },
          { role: "Volunteer", name: "Arya Joshi", img: aryaimg },
          { role: "Volunteer", name: "Rishitha", img: rishithaimg },
        ],
      },
    ],
  },
  2025: {
    facultyAdvisor: {
      role: "Faculty Advisor",
      name: "Bharath Sir",
      img: bharathsirimg,
    },
    lead: {
      role: "Lead",
      name: "Jayasree Gondipalle",
      img: jayasreeimg,
    },
    domainLeads: [
      { role: "Co Lead", name: "Sahithi Kolla", img: sahithiimg },
      {
        role: "WebDev Lead",
        name: "Sai Jahnavi",
        img: jahnaviimg,
        coordinators: [
          { role: "Coordinator", name: "Sri Manikanta", img: "path_to_image" },
          { role: "Coordinator", name: "Karthik", img: "path_to_image" },
          { role: "Coordinator", name: "Lakshita", img: "path_to_image" },
        ],
      },
      {
        role: "CP Lead",
        name: "Harsha Vardhan",
        img: harshaimg,
        coordinators: [
          { role: "Coordinator", name: "Sai Lokesh", img: "path_to_image" },
          { role: "Coordinator", name: "N Vishnu Vardhan", img: "path_to_image" },
          { role: "Coordinator", name: "G Udhay Yadav", img: "path_to_image" },
        ],
      },
      {
        role: "Management Lead",
        name: "Sai Rakshita Narsingh",
        img: rakshitaimg,
        coordinators: [
          { role: "Coordinator", name: "Sri Kruthi", img: srikruthiimg },
          { role: "Coordinator", name: "Abhijeet", img: abhijeetimg },
          { role: "Coordinator", name: "Harika", img: "path_to_image" },
        ],
      },
      {
        role: "AIML Lead",
        name: "Surya Teja Chittiprolu",
        img: suryaimg,
        coordinators: [
          { role: "Coordinator", name: "Keerthika", img: keerthikaimg },
          { role: "Coordinator", name: "Bharath Chandra", img: bharathimg },
        ],
      },
      {
        role: "Design Lead",
        name: "Siddeshwari A",
        img: siddeshwariimg,
        coordinators: [
          { role: "Coordinator", name: "Ch. Anirudh", img: chanirudhimg },
          { role: "Coordinator", name: "Arya Joshi", img: aryaimg },
          { role: "Coordinator", name: "Rishitha", img: rishithaimg },
          { role: "Coordinator", name: "Tanmayee Kyram", img: "path_to_image" },
        ],
      },
    ],
  },
  2026: {
    facultyAdvisor: {
      role: "Faculty Advisor",
      name: "Bharath Sir",
      img: bharathsirimg,
    },
    lead: {
      role: "Lead",
      name: "Jayasree Gondipalle",
      img: jayasreeimg,
    },
    domainLeads: [
      { role: "Co Lead", name: "Sahithi Kolla", img: sahithiimg },
      {
        role: "WebDev Lead",
        name: "Lakshita Goyal",
        img: "path_to_image",
        coordinators: [
          { role: "Coordinator", name: "Sri Hasnika Venigalla", img: hasnikaimg },
          { role: "Coordinator", name: "Anitej Annabattuni", img: anitejimg },
        ],
      },
      {
        role: "CP Lead",
        name: "Harsha Vardhan",
        img: harshaimg,
        coordinators: [
          {
            role: "Coordinator",
            name: "Kanakamedala Bhanu Prakash",
            img: "path_to_image",
          },
          { role: "Coordinator", name: "K Pavan Kumar", img: "path_to_image" },
        ],
      },
      {
        role: "Management Lead",
        name: "Sai Rakshita Narsingh",
        img: rakshitaimg,
        coordinators: [
          {
            role: "Coordinator",
            name: "Revoori Sathwika Reddy",
            img: sathwikaimg,
          },
          { role: "Coordinator", name: "Sarvani", img: "path_to_image" },
          { role: "Coordinator", name: "Spoorthy Boga", img: spoorthyimg },
        ],
      },
      {
        role: "AIML Lead",
        name: "Siddharth",
        img: "path_to_image",
        coordinators: [
          { role: "Coordinator", name: "Keerthika", img: keerthikaimg },
          { role: "Coordinator", name: "Bharath Chandra", img: bharathimg },
        ],
      },
      {
        role: "Design Lead",
        name: "Vishnu Vardhan",
        img: "path_to_image",
        coordinators: [
          { role: "Coordinator", name: "Abdul Raheem", img: "path_to_image" },
          {
            role: "Coordinator",
            name: "Abhishek Pothanagari",
            img: abhishekimg,
          },
          { role: "Coordinator", name: "Hindu Sri Jupelli", img: hindusriimg },
          { role: "Coordinator", name: "Md Zaki", img: zakiimg },
          { role: "Coordinator", name: "Pavitra Jasti", img: pavitraimg },
        ],
      },
    ],
  },
};
