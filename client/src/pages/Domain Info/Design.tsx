import React,{useEffect} from "react";
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import PoojaImage from "../Domain Info/images/design/Poojasiri.jpg.jpg";
import SiddeshwariImage from "../Domain Info/images/design/Siddeshwari _Adepu.jpg";
import PraneethaImage from "../Domain Info/images/design/Praneetha.jpg";
import ChAnirudhImage from "../Domain Info/images/design/Anirudh.jpg";
import AnirudhPImage from "../Domain Info/images/design/Anirudh P.jpg";
import AryaImage from "../Domain Info/images/design/Arya Joshi.jpg";
import RishithaImage from "../Domain Info/images/design/Rishitha.jpg";

function ML() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const gifUrl =
    "https://cdn.dribbble.com/users/3943049/screenshots/14032596/media/9e39cf22d33b4d2b77e9f270f2f06f6e.gif";
  const members = [
    {
      name: "Pooja Siri",
      role: "Design Coordinator",
      image: PoojaImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Siddeshwari",
      role: "Design Coordinator",
      image: SiddeshwariImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Pavan Praneetha",
      role: "Design Coordinator",
      image: PraneethaImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Ch.Anirudh",
      role: "Design Volunteer",
      image: ChAnirudhImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "P. Anirudh",
      role: "Design Volunteer",
      image: AnirudhPImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Arya Joshi",
      role: "Design Volunteer",
      image: AryaImage,
      linkedin: "#",
      github: "#",
      instagram: "#",
    },
    {
      name: "Rishitha",
      role: "Design Volunteer",
      image: RishithaImage,
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
            Design
          </h3>
          <div className="flex flex-col md:flex-row justify-center mb-20 items-center md:items-start space-y-4 md:space-y-0 md:space-x-4">
            <img
              src={gifUrl}
              alt="Design Animation"
              className="rounded-lg shadow-lg w-full sm:w-2/3 md:w-1/4 mb-4 md:mb-0"
            />
            <p className="text-gray-700 text-lg leading-relaxed text-center md:text-left">
              The Design Domain at GDSC VNR VJIET specializes in creating
              visually captivating posters, banners, and promotional materials
              to enhance our club's presence. Our team of skilled designers
              collaborates on producing impactful graphics for events,
              workshops, and social media. By leveraging the latest design
              trends and techniques, we aim to communicate our mission and
              engage our community effectively, ensuring every project reflects
              our commitment to innovation and creativity.
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
