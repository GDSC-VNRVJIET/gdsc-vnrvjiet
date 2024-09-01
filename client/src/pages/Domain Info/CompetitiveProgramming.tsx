import React, { useEffect } from "react";
import HarshaImage from "../Domain Info/images/CP/Harsha Vardhan.jpg";
import VighneshImage from "../Domain Info/images/CP/VighneshVangari.jpg";
import DivyaImage from "../Domain Info/images/CP/Divya Sri.jpg";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function CompetitiveProgramming() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gifUrl =
    "https://cdn.dribbble.com/users/330915/screenshots/3587000/10_coding_dribbble.gif";
  const members = [
    {
      name: "Harsha Vardhan",
      role: "Competitive Programming Coordinator",
      image: HarshaImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Divya Sri",
      role: "Competitive Programming Volunteer",
      image: DivyaImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Vighnesh",
      role: "Competitive Programming Volunteer",
      image: VighneshImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
  ];

  return (
    <div className="bg-gray-50 p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto">
        <div className="p-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-center font-extrabold mb-6 sm:mb-8 md:mb-10 text-green-500">
            Competitive Programming
          </h3>
          <div className="flex flex-col md:flex-row justify-center mb-20 items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <img
              src={gifUrl}
              alt="Competitive Programming Animation"
              className="rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/4 mb-4 md:mb-0"
            />
            <p className="text-gray-700 text-lg leading-relaxed text-center md:text-left">
              The Competitive Programming Domain at GDSC VNR VJIET is committed
              to creating a community where members can improve their
              problem-solving skills and perform well in coding competitions. It
              focuses on enhancing members' problem-solving abilities through
              regular practice on platforms like Codeforces and LeetCode. The
              domain fosters collaboration, where experienced members mentor
              newcomers and everyone works together to improve.
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

export default CompetitiveProgramming;
