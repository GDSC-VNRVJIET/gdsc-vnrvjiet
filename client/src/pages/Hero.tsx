import React from "react";
import { useNavigate } from "react-router-dom";
import banner_1440X500px from "../home-assets/banner_1440X500px.png";
import Banner_930X400px from "../home-assets/Banner_930X400px.png";
import Banner_850X300px from "../home-assets/Banner_850X300px.jpg";
import Banner_400X300px from "../home-assets/Banner_400X300px.png";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";

function Hero() {
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/Login");
  };

  return (
    <div className="HeroSection relative h-[60vh] min-h-[300px] max-h-[600px] overflow-hidden">
      <picture>
        <source srcSet={banner_1440X500px} media="(min-width: 1156px)" />
        <source srcSet={Banner_930X400px} media="(min-width: 850px)" />
        <source srcSet={Banner_850X300px} media="(min-width: 650px)" />
        <img
          src={Banner_400X300px}
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
      </picture>

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
