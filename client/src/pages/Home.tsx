import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import "../styles/home.css";
import webdeveloper from "../home-assets/webdeveloper.png";
import programming from "../home-assets/programing.png";
import aiml from "../home-assets/aiml.png";
import cyber from "../home-assets/cyber.png";
import design from "../home-assets/designSm.png";
import hardware from "../home-assets/hardware.png";
import management from "../home-assets/management.png";
import wit from "../home-assets/wit.png";
import appdev from "../home-assets/appDev.png";
import { motion, useInView, useAnimation } from "framer-motion";

const cards = [
  {
    image: webdeveloper,
    title: "Web Development",
    description:
      "Focuses on empowering students to build responsive, user-friendly websites and web applications using modern web technologies and frameworks.",
    path: "/web-development",
  },
  {
    image: programming,
    title: "Competitive Programming",
    description:
      "Cultivates competitive programming skills, encouraging students to hone their algorithmic problem-solving abilities, participate in coding competitions, and develop efficient solutions to real-world challenges.",
    path: "/competitive-programming",
  },
  {
    image: aiml,
    title: "Artificial Intelligence and Machine learning",
    description:
      "Immerses students in the intricacies of Machine Learning, motivating them to delve into and apply sophisticated algorithms, conduct data analysis, and create predictive models to address intricate problems.",
    path: "/machine-learning",
  },
  {
    image: management,
    title: "Management",
    description:
      "Provides students with leadership and organizational skills, fostering a community that not only excels in technical expertise but also effectively manages projects, events, and teams.",
    path: "/management",
  },
  {
    image: design,
    title: "Social Media and Design",
    description:
      "Engages students in learning and applying best practices to secure digital systems, prevent cyber threats, and promote online safety.",
    path: "/design",
  },
  {
    image: appdev,
    title: "App Development",
    description:
      "Students explore the art of creating mobile apps, transforming their ideas into engaging, user-friendly experiences. They focus on intuitive design, feature integration, and performance optimization, equipping themselves with the skills to launch standout applications in the digital marketplace.",
    path: "/app-development",
  },
  {
    image: hardware,
    title: "Hardware",
    description:
      "The world of hardware development invites individuals to craft physical devices through hands-on projects in circuit design, microcontroller programming, and component integration. This practical approach enhances functionality and troubleshooting skills, enabling the creation of innovative hardware solutions. The immersive experience fosters creativity and problem-solving, empowering participants to drive technological innovation and meet real-world demands.",
    path: "/hardware",
  },
  {
    image: wit,
    title: "Women in tech",
    description:
      "Empowers women in technology through mentorship, resources, and a supportive community, inspiring growth and innovation for future leaders in STEM.",
    path: "/women-in-tech",
  },
  {
    image: cyber,
    title: "Testing and Cybersecurity",
    description:
      "Explore the critical fields of Cybersecurity and Testing, where we work to secure digital assets and ensure software reliability. From vulnerability assessments to penetration testing and quality assurance, our focus is on developing skills to identify, mitigate, and prevent cyber threats. Join us to build a safer digital world and deliver secure, high-quality tech solutions.",
    path: "/testing-cybersecutiry",
  },
];

const getTitleColor = (index: number) => {
  const colors = ["#0F71F2", "#318C07", "#F2A20C", "#D92929"];
  return colors[index % colors.length];
};

const getBorderColor = (index: number) => {
  const colors = ["#4285F4", "#34A853", "#F9AB00", "#EA4335"];
  return colors[index % colors.length];
};

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const Reveal = ({ children }: any) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const mainControls = useAnimation();

    useEffect(() => {
      if (isInView) {
        mainControls.start("visible");
      }
    }, [isInView]);

    return (
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <div style={{ backgroundColor: "#F0F0F0" }}>
      <Hero />
      <div className="p-5 text-slate-800">
        <Reveal>
          <div className="text-center m-4">
            <p className="text-2xl md:text-4xl text-slate-800 font-bold">
              What we do, at GDGC VNRVJIET :
            </p>
          </div>
        </Reveal>

        <div className="m-4 md:m-20">
          <Reveal>
            {cards.map((card, index) => (
              <Link to={card.path} key={index}>
                <div
                  className={`flex w-full border m-2 mt-10 p-4 rounded-2xl flex-col md:flex-row ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  style={{
                    border: "2px solid",
                    borderColor: getBorderColor(index),
                    backgroundColor: "#FFFFFF",
                    minHeight: "260px",
                  }}
                >
                  <div className="flex-shrink-0 w-[270px] h-[200px] overflow-hidden hidden md:flex items-center justify-center pt-3 pb-3">
                    <img
                      src={card.image}
                      alt="image"
                      className="rounded-lg max-w-full max-h-full object-contain"
                    />
                  </div>

                  <div className="flex-grow p-4 md:p-6 text-center md:text-left">
                    <h3
                      className="text-xl md:text-3xl font-extrabold m-2 md:m-4"
                      style={{ color: getTitleColor(index) }}
                    >
                      {card.title}
                    </h3>
                    <p className="mb-4 text-sm md:text-base desc-text">
                      {card.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
      </div>
    </div>
  );
}

export default Home;
