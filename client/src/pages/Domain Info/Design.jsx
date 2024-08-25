import React from 'react';
import { FiInstagram } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import PoojaImage from '../Domain Info/images/Design/Poojasiri.jpg';
import SiddeshwariImage from '../Domain Info/images/Design/Siddeshwari _Adepu.jpg';
import PraneethaImage from '../Domain Info/images/Design/Praneetha.jpg';
import ChAnirudhImage from '../Domain Info/images/Design/Anirudh.jpg';
import AnirudhPImage from '../Domain Info/images/Design/Anirudh P.jpg';


function ML() {
  const members = [
    {
      name: 'Pooja Siri',
      role: 'Design Coordinator',
      image: PoojaImage,
      linkedin: '#',
      github: '#',
      instagram: '#',
    },
    {
      name: 'Siddeshwari',
      role: 'Design Coordinator',
      image: SiddeshwariImage,
      linkedin: '#',
      github: '#',
      instagram: '#',
    },
    {
      name: 'Pavan Praneetha',
      role: 'Design Coordinator',
      image: PraneethaImage,
      linkedin: '#',
      github: '#',
      instagram: '#',
    },
    {
      name: 'Ch.Anirudh',
      role: 'Design Volunteer',
      image: ChAnirudhImage,
      linkedin: '#',
      github: '#',
      instagram: '#',
    },
    {
      name: 'P. Anirudh',
      role: 'Design Volunteer',
      image: AnirudhPImage,
      linkedin: '#',
      github: '#',
      instagram: '#',
    },
  ];

  return (
    <div className="bg-gray-50 p-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
        <div className="p-6">
          <h3 className="text-4xl text-center font-extrabold mb-4 text-yellow-500">
            Design
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">
The Design Domain at GDSC VNR VJIET specializes in creating visually captivating posters, banners, and promotional materials to enhance our club's presence. Our team of skilled designers collaborates on producing impactful graphics for events, workshops, and social media. By leveraging the latest design trends and techniques, we aim to communicate our mission and engage our community effectively, ensuring every project reflects our commitment to innovation and creativity.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {members.map((member, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative w-40 h-40 flex-shrink-0">
                  <div className="rounded-full overflow-hidden shadow-lg w-full h-full flex items-center justify-center bg-gray-100">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="object-contain"
                    />
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mt-4 text-center">
                  {member.name}
                </h4>
                <p className="text-gray-500 mb-4 text-center">{member.role}</p>
                <div className="flex justify-center space-x-4 mt-4">
                  <a href={member.linkedin} className="text-blue-500 hover:text-blue-600">
                  <FaLinkedinIn size={20}/>
                  </a>
                  <a href={member.github} className="text-gray-900 hover:text-gray-800">
                  <FaGithub size={20}/>
                  </a>
                  <a href={member.instagram} className="text-pink-500 hover:text-pink-600">
                  <FiInstagram size={20}/>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ML;
