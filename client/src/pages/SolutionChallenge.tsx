import React, { useEffect } from "react";
import sollutionChallengeImage from "../images/sollutionChallengeImage.png";

function SolutionChallenge() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="p-4 md:p-8 flex flex-col max-w-[1060px] text-[16px] text-[#202126] m-auto">
  <div className="shrink-0 h-[180px] sm:h-[222px] overflow-hidden">
    <img
      src={sollutionChallengeImage}
      alt="image"
      className="w-full h-full object-contain sm:object-cover rounded-2xl"
    />
  </div>
</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 mx-4 md:mx-10 px-4 md:px-10 items-center">
        <div>
          <p className="text-2xl md:text-3xl text-slate-800 font-bold my-3 md:my-5">
            2024 Solution Challenge
          </p>
          <p>
            The mission of the Solution Challenge is to solve for one or more of
            the United Nations' 17 Sustainable Development Goals using Google
            technology.
            <br />
            Since 2020, Google Developer Student Clubs (GDSC) members from
            around the world come together to create innovative solutions to
            tackle some of the world's most pressing challenges. Solution
            Challenge is open to GDSC members from universities all over. Join a
            GDSC to{" "}
            <a className="text-blue-600" href="https://gdsc.community.dev/">
              learn more
            </a>
            .<br />
            <b>Submissions for the 2024 Solution Challenge are closed.</b> The
            Global Top 100 teams have officially been announced.
          </p>
        </div>
        <div className="mt-4 lg:mt-0">
          <img
            alt=""
            src="https://developers.google.com/static/community/images/gdsc-solution-challenge/homepage-hero.webp"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 my-8 lg:my-10 text-center mx-4 md:mx-10">
        <div className="border border-gray-400 p-4 rounded-lg min-h-[250px] sm:min-h-[300px] relative">
          <img
            className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 bg-blue-200 p-2 rounded-full mx-auto"
            src="https://developers.google.com/static/community/images/gdsc-solution-challenge/groups_outlined_72.png"
            alt="Top 100"
          />
          <p className="text-xl md:text-2xl text-slate-800 font-bold mt-10">
            Top 100
          </p>
          <p className="text-sm md:text-base">
            Win a T-shirt, certificate, and mentorship from Google and other
            experts to improve and submit a solution for the top prize.
          </p>
        </div>
        <div className="border border-gray-400 p-4 rounded-lg min-h-[250px] sm:min-h-[300px] relative">
          <img
            className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 bg-blue-200 p-2 rounded-full mx-auto"
            src="https://developers.google.com/static/community/images/gdsc-solution-challenge/workspace_premium_72.png"
            alt="Final 10"
          />
          <p className="text-xl md:text-2xl text-slate-800 font-bold mt-10">
            Final 10
          </p>
          <p className="text-sm md:text-base">
            Win a <b>$1,000</b> cash prize per team member and a feature in the
            Google Developers Blog and global Demo Day livestream, plus
            mentorship with a Google expert, swag, and a certificate.
          </p>
        </div>
        <div className="border border-gray-400 p-4 rounded-lg min-h-[250px] sm:min-h-[300px] relative">
          <img
            className="absolute top-[-25px] left-1/2 transform -translate-x-1/2 bg-blue-200 p-2 rounded-full mx-auto"
            src="https://developers.google.com/static/community/images/gdsc-solution-challenge/emoji_events_72.png"
            alt="Winning 3"
          />
          <p className="text-xl md:text-2xl text-slate-800 font-bold mt-10">
            Winning 3
          </p>
          <p className="text-sm md:text-base">
            Win a <b>$3,000</b> cash prize per team member and a feature in the
            Google Developers Blog and global Demo Day livestream, plus
            mentorship with a Google expert, swag, and a certificate.
          </p>
        </div>
      </div>
      <p className="text-2xl md:text-3xl text-slate-800 font-bold my-5 text-center">
        Winner's prototype
      </p>
      <video
        className="w-full sm:w-[480px] md:w-[600px] block mx-auto my-5"
        controls
      >
        <source
          src={`${process.env.PUBLIC_URL}/SignLanguageConvertor.mp4`}
          type="video/mp4"
        />
      </video>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4 px-4">
        <img
          src="https://res.cloudinary.com/startup-grind/image/upload/c_limit,dpr_2,f_auto,g_center,h_1440,q_auto:good,w_2048/v1/gcs/platform-data-dsc/event_wrapup/Screenshot%25202024-02-23%2520230854.png"
          alt="Winner's prototype 1"
          className="w-full h-auto object-cover"
        />
        <img
          src="https://res.cloudinary.com/startup-grind/image/upload/c_limit,dpr_2,f_auto,g_center,h_1440,q_auto:good,w_2048/v1/gcs/platform-data-dsc/event_wrapup/Screenshot%25202024-02-23%2520233920.png"
          alt="Winner's prototype 2"
          className="w-full h-auto object-cover"
        />
        <img
          src="https://res.cloudinary.com/startup-grind/image/upload/c_limit,dpr_2,f_auto,g_center,h_1440,q_auto:good,w_2048/v1/gcs/platform-data-dsc/event_wrapup/Screenshot%25202024-02-23%2520232113.png"
          alt="Winner's prototype 3"
          className="w-full h-auto object-cover"
        />
        <img
          src="https://res.cloudinary.com/startup-grind/image/upload/c_limit,dpr_2,f_auto,g_center,h_1440,q_auto:good,w_2048/v1/gcs/platform-data-dsc/event_wrapup/WhatsApp%2520Image%25202024-02-27%2520at%252009.49.57.jpeg"
          alt="Winner's prototype 4"
          className="w-full h-auto object-cover"
        />
        <img
          src="https://res.cloudinary.com/startup-grind/image/upload/c_limit,dpr_2,f_auto,g_center,h_1440,q_auto:good,w_2048/v1/gcs/platform-data-dsc/event_wrapup/WhatsApp%2520Image%25202024-02-27%2520at%252009.50.49.jpeg"
          alt="Winner's prototype 5"
          className="w-full h-auto object-cover"
        />
        <img
          src="https://res.cloudinary.com/startup-grind/image/upload/c_limit,dpr_2,f_auto,g_center,h_1440,q_auto:good,w_2048/v1/gcs/platform-data-dsc/event_wrapup/Screenshot%25202024-02-24%2520164953.png"
          alt="Winner's prototype 6"
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}

export default SolutionChallenge;
