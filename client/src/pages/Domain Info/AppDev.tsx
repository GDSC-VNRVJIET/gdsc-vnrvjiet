import React,{useEffect} from "react";
// import { FiInstagram } from "react-icons/fi";
// import { FaLinkedinIn } from "react-icons/fa";
// import { FaGithub } from "react-icons/fa";
import JahnaviReddyImage from "./images/AppDev/JahnaviReddy.png";
import UdaySagarImage from "./images/AppDev/UdaySagar.jpeg";
import VinayKumarImage from './images/AppDev/VinayKumarKajjapu.jpg';

function Hardware() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gifUrl =
    "https://appsolution.co.za/wp-content/uploads/2021/11/image-mbl-development.gif";
  const members = [
    {
      name: "Jahnavi Reddy",
      role: "App Development Lead",
      image: JahnaviReddyImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Uday Sagar",
      role: "App Development Coordinator",
      image: UdaySagarImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Vinay Kumar",
      role: "App Development Coordinator",
      image: VinayKumarImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
  ];

  return (
    <div className="bg-gray-50 p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto">
        <div className="p-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-center font-extrabold mb-6 sm:mb-8 md:mb-10 text-yellow-500">
          App Development
          </h3>
          <div className="flex flex-col md:flex-row justify-center mb-20 items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <img
              src={gifUrl}
              alt="AppDev Animation"
              className="rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/4 mb-4 md:mb-0"
            />
            <p className="text-gray-700 text-lg leading-relaxed text-center md:text-left">
            Students explore the art of creating mobile apps, transforming their ideas into engaging, user-friendly experiences. They focus on intuitive design, feature integration, and performance optimization, equipping themselves with the skills to launch standout applications in the digital marketplace.
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

export default Hardware;
