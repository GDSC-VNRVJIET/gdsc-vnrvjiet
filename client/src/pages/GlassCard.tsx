import React from "react";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

function GlassCard({ profileImage, personRole, personName }: any) {
  return (
    <>
      {
        personRole === 'Faculty Advisor' ? (
          <div className="bg-white/50 backdrop-blur-lg rounded-xl p-5 border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full m-auto pt-6">
            <h2 className="text-lg text-[1.5rem] font-bold text-center mb-3" style={{ fontFamily: '"Google Sans", sans-serif' }}>
              Faculty Advisor
            </h2>

            <hr style={{ border: '0.25px solid rgb(195, 195, 195)', marginBottom: '20px' }} />

            <div className="text-black flex">
              <div className="profile-image aspect-1">
                <img
                  src={profileImage}
                  alt={personRole}
                  className="shrink-0 rounded-full aspect-square object-cover"
                />
              </div>

              <div className="desc mx-5">
                <div className="intro">
                  <p className="text-md mb-3" style={{ fontFamily: '"Google Sans", sans-serif', color: 'Grey-200 ' }}>
                    <b>{personName}</b>
                  </p>

                  <p>
                    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum, repudiandae sint. Molestias error reprehenderit tenetur et. Voluptatem eum fugiat ab numquam porro, cum sequi? Ut, similique dolores rerum optio sed, qui at provident quo fugiat obcaecati saepe libero nobis vero! Amet nostrum veniam facere quo ab fuga placeat, soluta perferendis sit officiis quis odit?"
                  </p>
                </div>

                <div className="socials text m-auto flex items-center">
                  <FaLinkedin size={30} className="inline mr-2 my-3" />
                  <a className="inline hover:underline" target="_blank" href="https://www.linkedin.com/in/dr-bharath-kumar-chowdary-p-40598433/"><b>Dr. Bharath Kumar Chowdary. P</b></a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white/[.4] backdrop-blur-lg rounded-xl px-0 py-[40px] border border-white/30 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 w-full">
            <div className="text-black text-center">
              <img
                src={profileImage}
                alt={personRole}
                className="shrink-0 rounded-full w-2/3 h-2/3 object-cover m-auto"
              />

              <h2 className="text-xl font-medium text-center mt-2" style={{ fontFamily: '"Google Sans", sans-serif' }}>
                {personName}
              </h2>
              <p className="text-md text-center" style={{ fontFamily: '"Google Sans", sans-serif', color: 'Grey-200 ' }}>
                {personRole}
              </p>
              
              <div className="socials grid mt-5 grid-cols-2 w-1/4 m-auto">
                <div className="socials  text-center m-auto h-[20px]">
                  <FaGithub size={20} />
                </div>

                <div className="socials  text-center m-auto h-[20px]">
                  <FaLinkedin size={20} />
                </div>
              </div>
            </div>
          </div>
        )
      }
    </>
  );
}

export default GlassCard;
