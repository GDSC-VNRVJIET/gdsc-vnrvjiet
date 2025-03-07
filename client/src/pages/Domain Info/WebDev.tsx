import React, { useEffect } from "react";
import jayasreeImage from "../Domain Info/images/WEB DEV/Jayasree Gondipalle.jpg";
import JahnaviImage from "../Domain Info/images/WEB DEV/Sai Jahnavi Rallapalli.jpeg";
import ManikantaImage from "../Domain Info/images/WEB DEV/Manikanta.jpg";
import KarthikImage from "../Domain Info/images/WEB DEV/Karthik.jpg";
import VarunImage from "../Domain Info/images/WEB DEV/Varun.jpg";
import DedeepyaImage from "../Domain Info/images/WEB DEV/Vellanki Chenchu Dedeepya .jpg";
import lakshitaimg from "../Domain Info/images/WEB DEV/Lakshita Goyal.jpg";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function WebDev() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gifUrl =
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYW0xemNkdzFteWQ5eTF4cTh4bzJpMzZoaGRtYjNjODlxMmluem1kbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2ikwIgNrmPZICNmRyX/giphy.gif";

  const members = [
    {
      name: "Sai Jahnavi",
      role: "Web Development Lead",
      image: JahnaviImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Sri Manikanta",
      role: "Web Development Coordinator",
      image: ManikantaImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Karthik",
      role: "Web Development Coordinator",
      image: KarthikImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Lakshita",
      role: "Web Development Coordinator",
      image: lakshitaimg,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    // {
    //   name: "Varun",
    //   role: "Web Development Volunteer",
    //   image: VarunImage,
    //   linkedin: "#",
    //   github: "#",
    //   instagram: "#",
    // },
    // {
    //   name: "Dedeepya",
    //   role: "Web Development Volunteer",
    //   image: DedeepyaImage,
    //   linkedin: "#",
    //   github: "#",
    //   instagram: "#",
    // },
  ];

  return (
    <div className="bg-gray-50 p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-6xl mx-auto">
        <div className="p-6">
          <h3 className="text-2xl sm:text-3xl md:text-4xl text-center font-extrabold mb-6 sm:mb-8 md:mb-10 text-blue-500">
            Web Development
          </h3>

          <div className="flex flex-col md:flex-row justify-center mb-20 items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <img
              src={gifUrl}
              alt="Web Development Animation"
              className="rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/4 mb-4 md:mb-0"
            />
            <p className="text-gray-700 text-lg leading-relaxed text-center md:text-left">
              The Web Development Domain at GDSC VNR VJIET is committed to
              crafting dynamic, user-friendly websites and web applications that
              empower our club and its members. Our team builds and maintains
              the website used by the club for events, workshops, and student
              blogs, ensuring they are optimized for both functionality and user
              experience. Additionally, we provide support as mentors during
              hackathons, guiding participants through challenges and fostering
              innovative solutions.
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
