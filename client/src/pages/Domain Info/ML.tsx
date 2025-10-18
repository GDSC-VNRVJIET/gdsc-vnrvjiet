import React, { useEffect } from "react";
import NikhitaImage from "../Domain Info/images/ML/D_Nikhita_Kashyap.jpeg";
import SuryaImage from "../Domain Info/images/ML/Chittiprolu Suryateja.jpg";
import SharanImage from "../Domain Info/images/ML/SRI SHARAN TEJ.jpg";
import KeerthikaImage from "../Domain Info/images/ML/KeerthikaGoli.jpg";
import RoshiniImage from "../Domain Info/images/ML/KotagiriRoshini.jpg";
import BharathImage from "../Domain Info/images/ML/BharathChandra.jpg";
import VishwaImage from "../Domain Info/images/ML/Viswa Prateek Tummala .jpg";
import SiddharthImg from "../Domain Info/profile_images/AIML/Aimlead.jpg";
import KeerthikaImg from "../Domain Info/profile_images/AIML/KeerthikaGoli.jpg";
import BharathImg from "../Domain Info/profile_images/AIML/BharathChandra.jpg";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function ML() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gifUrl =
    "https://connect.ignatiuz.com/hs-fs/hubfs/AI%20and%20Deep%20Learning.gif?width=1000&name=AI%20and%20Deep%20Learning.gif";
  const members = [
    {
      name: "Siddharth",
      role: "AIML Lead",
      image: SiddharthImg,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    // {
    //   name: "Roshini",
    //   role: "Machine Learning Coordinator",
    //   image: RoshiniImage,
    //   linkedin: "#",
    //   github: "#",
    //   instagram: "#",
    // },
    {
      name: "Keerthika",
      role: "AIML Coordinator",
      image: KeerthikaImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    
    {
      name: "Bharath Chandra",
      role: "AIML Coordinator",
      image: BharathImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    // {
    //   name: "Sri Sharan Tej",
    //   role: "Machine Learning Volunteer",
    //   image: SharanImage,
    //   linkedin: "#",
    //   github: "#",
    //   instagram: "#",
    // },
    
    // {
    //   name: "Vishwa Prateek",
    //   role: "Machine Learning Volunteer",
    //   image: VishwaImage,
    //   linkedin: "#",
    //   github: "#",
    //   instagram: "#",
    // },
  ];

  return (
    <div className="bg-gray-50 p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto">
        <div className="p-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-center font-extrabold mb-6 sm:mb-8 md:mb-10 text-yellow-600">
            Artificial Intelligence and Machine Learning
          </h3>
          <div className="flex flex-col md:flex-row justify-center mb-20 items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <img
              src={gifUrl}
              alt="Machine Learning Animation"
              className="rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/4 mb-4 md:mb-0"
            />
            <p className="text-gray-700 text-lg leading-relaxed text-center md:text-left">
              The Artificial Intelligence and Machine learning Domain at GDSC VNRVJIET is where innovation
              meets application. Our team is focused on exploring the full
              potential of machine learning, from data analysis to building
              adaptive systems. We conduct events and workshops to simplify
              machine learning concepts, making them accessible and showcasing
              their real-world applications. As mentors, we guide students in
              hackathons, helping them turn their ideas into successful projects
              with AI.
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

export default ML;
