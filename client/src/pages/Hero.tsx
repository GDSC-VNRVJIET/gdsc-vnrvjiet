import React from "react";
import { useNavigate } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import banner_1440X500px from "../home-assets/banner_1440X500px.png";
//import banner_1440X500px from "../home-assets/Banner_1440X500px_white.png"
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";

function Hero() {
  const heroStyle = {
    backgroundImage: `url(${banner_1440X500px})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/Login");
  };

  return (
    <div
      className="HeroSection relative flex flex-col bg-cover bg-center bg-no-repeat h-[60vh] min-h-[300px] max-h-[600px]"
      style={heroStyle}
    >
      <div
        className="
          absolute bottom-[25%]
          left-1/2 -translate-x-1/2
          flex
        "
      >
        <div className="flex flex-row gap-8">
          <a
            href="https://www.instagram.com/gdgc.vnrvjiet/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsInstagram className="w-7 h-7 md:w-8 md:h-8 hover:scale-110 transition" />
          </a>

          <a
            href="https://www.linkedin.com/company/gdsc-vnrvjiet/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsLinkedin className="w-7 h-7 md:w-8 md:h-8 hover:scale-110 transition" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Hero;
