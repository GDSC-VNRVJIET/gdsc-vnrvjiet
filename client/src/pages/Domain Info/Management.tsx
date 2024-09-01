import React, { useState, useEffect } from "react";
import SahithiImage from "../Domain Info/images/MANAGEMENT/Sahithi.jpg";
import VarunImage from "../Domain Info/images/MANAGEMENT/GVK.jpg";
import JahnaviImage from "../Domain Info/images/MANAGEMENT/Jahnavi Reddy.png";
import RakshithaImage from "../Domain Info/images/MANAGEMENT/SaiRakshita.jpg";
import AbhijeetImage from "../Domain Info/images/MANAGEMENT/Abhijeet.png";
import SadhikImage from "../Domain Info/images/MANAGEMENT/Sadhik.jpg";
import SriKruthiImage from "../Domain Info/images/MANAGEMENT/SriKruthi.jpg";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function WebDev() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const gifUrl =
    "https://mir-s3-cdn-cf.behance.net/project_modules/hd/ea5d0476339699.5c6694d453222.gif";
  const members = [
    {
      name: "Sahithi",
      role: "Management Coordinator",
      image: SahithiImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Vinay Kalyan",
      role: "Management Coordinator",
      image: VarunImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Jahnavi Reddy",
      role: "Management Coordinator",
      image: JahnaviImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Sai Rakshitha",
      role: "Management Coordinator",
      image: RakshithaImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Sadhik",
      role: "Management Volunteer",
      image: SadhikImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Sri Kruthi",
      role: "Management Volunteer",
      image: SriKruthiImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Abhijeet",
      role: "Management Volunteer",
      image: AbhijeetImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
  ];

  return (
    <div className="bg-gray-50 p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto">
        <div className="p-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-center font-extrabold mb-6 sm:mb-8 md:mb-10 text-red-600">
            Management
          </h3>
          <div className="flex flex-col md:flex-row justify-center mb-20 items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <img
              src={gifUrl}
              alt="Management Animation"
              className="rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/4 mb-4 md:mb-0"
            />
            <p className="text-gray-700 text-lg leading-relaxed text-center md:text-left">
              The Management Domain at GDSC VNR VJIET plays a pivotal role in
              executing and conducting successful events for the club,
              overseeing every aspect from start to finish. This domain is
              dedicated to implementing the ideas proposed by other domains,
              turning concepts into reality through planning and coordination.
              In addition to event management, the team is responsible for
              documenting all events held by the club, ensuring a thorough
              record of activities. They also take care of the internal
              operations of the club, managing permissions, utilities and
              resources to maintain smooth and efficient functioning. Their
              commitment to excellence, organization, and attention to detail
              ensures that the club functions at the highest standards,
              reinforcing the club's reputation for professionalism.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {members.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative w-56 h-56 flex-shrink-0">
                  <div className="rounded-full overflow-hidden shadow-lg w-full h-full flex items-center justify-center bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-contain hover:scale-105 duration-300"
                    />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mt-4 text-center">
                  {member.name}
                </h4>
                <p className="text-gray-500 mb-4 text-center">{member.role}</p>
                {/* Lets add these after collecting the details */}
                {/* <div className="flex justify-center space-x-4 mt-4">
                  <a
                    href={member.linkedin}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <FaLinkedinIn size={20} />
                  </a>
                  <a
                    href={member.github}
                    className="text-gray-900 hover:text-gray-800"
                  >
                    <FaGithub size={20} />
                  </a>
                  <a
                    href={member.instagram}
                    className="text-pink-500 hover:text-pink-600"
                  >
                    <FiInstagram size={20} />
                  </a>
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebDev;
