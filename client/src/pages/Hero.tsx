import React from "react";
import { useNavigate } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import banner_1440X500px from "../home-assets/banner_1440X500px.png";

function Hero() {
  const heroStyle = {
    backgroundImage: `url(${banner_1440X500px})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "500px",
  };

  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("/Login");
  };

  return (
    <div
      className="HeroSection flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat "
      style={heroStyle}
    >
      {/*<div className="mx-auto text-center mb-5">
        < img
          className="gdsc_logo mx-auto p-3"
      src="https://cdn-images-1.medium.com/max/578/1*vZVM7utCuRiZ6-HDsNeYUA@2x.png"
      width="250"
        />
      <h1 className="text-gray-700 xl:text-5xl md:text-xl">
        Google Developer Groups on Campus
      </h1>
      <h1
        className="text-gray-500 xl:text-lg lg:text-md mx-10 hover:underline cursor-pointer"
        onClick={() => window.open("https://vnrvjiet.ac.in/")}
      >
        Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering
        &Technology.
      </h1>
        
      <div className="mt-6 flex justify-center">
        <div className="mt-6">
          <SocialIcon
            url="https://www.linkedin.com/company/gdsc-vnrvjiet/"
            style={{ height: 30, width: 30, marginRight: "8px", zIndex: "0" }}
          />
          <SocialIcon
            url="https://www.instagram.com/gdgc.vnrvjiet/ "
            style={{ height: 30, width: 30 }}
          />
        </div>
      </div>
    </div> */}
      {/* <button className="transition ease-in-out delay-70 hover:-translate-y-1 hover:scale-110 duration-300 bg-[#0F71F2] p-2 px-5 m-3 rounded ring-offset-2 ring-4 ring-[#F2A20C]" onClick={navigateLogin}>Join us.</button> */}
    </div>
  );
}

export default Hero;
