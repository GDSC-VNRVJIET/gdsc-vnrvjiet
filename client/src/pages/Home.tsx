import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Hero from "./Hero";
import "../styles/home.css";
import webdeveloper from "../home-assets/webdeveloper.png";
import programming from "../home-assets/programing.png";
import aiml from "../home-assets/aiml.png";
import cyber from "../home-assets/cyber.png";
import design from "../home-assets/designSm.png";
import hardware from "../home-assets/hardware.png";
import management from "../home-assets/management.png"
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

/*const cards = [
  {
    image:
      "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYW0xemNkdzFteWQ5eTF4cTh4bzJpMzZoaGRtYjNjODlxMmluem1kbSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2ikwIgNrmPZICNmRyX/giphy.gif",
    title: "Web Development",
    description:
      "Focuses on empowering students to build responsive, user-friendly websites and web applications using modern web technologies and frameworks.",
    path: "/web-development",
  },
  {
    image:
      "https://cdn.dribbble.com/users/330915/screenshots/3587000/10_coding_dribbble.gif",
    title: "Competitive Programming",
    description:
      "Cultivates competitive programming skills, encouraging students to hone their algorithmic problem-solving abilities, participate in coding competitions, and develop efficient solutions to real-world challenges.",
    path: "/competitive-programming",
  },
  {
    image:
      "https://connect.ignatiuz.com/hs-fs/hubfs/AI%20and%20Deep%20Learning.gif?width=1000&name=AI%20and%20Deep%20Learning.gif",
    title: "Artificial Intelligence and Machine learning",
    description:
      "Immerses students in the intricacies of Machine Learning, motivating them to delve into and apply sophisticated algorithms, conduct data analysis, and create predictive models to address intricate problems.",
    path: "/machine-learning",
  },
  {
    image:
      "https://mir-s3-cdn-cf.behance.net/project_modules/hd/ea5d0476339699.5c6694d453222.gif",
    title: "Management",
    description:
      "Provides students with leadership and organizational skills, fostering a community that not only excels in technical expertise but also effectively manages projects, events, and teams.",
    path: "/management",
  },
  {
    image:
      "https://cdn.dribbble.com/users/3943049/screenshots/14032596/media/9e39cf22d33b4d2b77e9f270f2f06f6e.gif",
    title: "Social Media and Design",
    description:
      "Engages students in learning and applying best practices to secure digital systems, prevent cyber threats, and promote online safety.",
    path: "/design",
  },
  {
    image:
      "https://appsolution.co.za/wp-content/uploads/2021/11/image-mbl-development.gif",
    title: "App Development",
    description:
      "Students explore the art of creating mobile apps, transforming their ideas into engaging, user-friendly experiences. They focus on intuitive design, feature integration, and performance optimization, equipping themselves with the skills to launch standout applications in the digital marketplace.",
    path: "/app-development",
  },
  {
    image: "https://i.pinimg.com/originals/f0/15/d0/f015d055fa134e08ab33ce00733e233f.gif",
    title: "Hardware",
    description:
      "The world of hardware development invites individuals to craft physical devices through hands-on projects in circuit design, microcontroller programming, and component integration. This practical approach enhances functionality and troubleshooting skills, enabling the creation of innovative hardware solutions. The immersive experience fosters creativity and problem-solving, empowering participants to drive technological innovation and meet real-world demands.",
    path: "/hardware",
  },
  {
    image:
      "https://cdn.dribbble.com/users/1187278/screenshots/15719501/media/02b128a761010ed25d595a82daff17d4.gif",
    title: "Women in tech",
    description:
      "Empowers women in technology through mentorship, resources, and a supportive community, inspiring growth and innovation for future leaders in STEM.",
    path: "/women-in-tech",
  },
  {
    image:
      "https://www.jtsecurity.net/wp-content/uploads/2021/03/mdr.gif",
    title: "Testing and Cybersecurity",
    description:
      "Explore the critical fields of Cybersecurity and Testing, where we work to secure digital assets and ensure software reliability. From vulnerability assessments to penetration testing and quality assurance, our focus is on developing skills to identify, mitigate, and prevent cyber threats. Join us to build a safer digital world and deliver secure, high-quality tech solutions.",
    path: "/testing-cybersecutiry",
  },
];*/

const getTitleColor = (index: number) => {
  const colors = ["#0F71F2", "#318C07", "#F2A20C", "#D92929"];
  return colors[index % colors.length];
};

/*const getBgColor = (index: number) => {
  const colors = ["#57CAFF", "#C3ECF6", "#5CDB6D", "#CCF6C5", "#FFD427", "#FFE7A5", "#FF7DAF", "#F8D8D8", "#F0F0F0"];
  return colors[index];
}*/

const getBorderColor = (index: number) => {
  const colors = ["#4285F4", "#34A853", "#F9AB00", "#EA4335"];
  return colors[index % colors.length];
}

interface props {
  darkMode: boolean;
}

function Home() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  {/*const [showPopup, setShowPopup] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  const handleClosePopup = () => {
    setShowPopup(false);
  };*/}

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
      <div>
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
      </div>
    );
  };

  {/* return (
    <div className="home-page">
      <Hero />
      <div className="p-5 text-slate-800 bg-gray-50">
        <Reveal>
          <div className="text-center m-4">
            <p className="text-4xl text-slate-800 font-bold">
              What we do, at GDGC VNRVJIET :
            </p>
          </div>
        </Reveal>

        <div className="">
          <Reveal>
            {cards.map((card, index) => (
              <Link to={card.path} key={index}>
                <div
                  className={`flex w-full bg-gray-100 border m-2 mt-10 p-4 border-slate-200 rounded-sm ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <Reveal>
                    <div className="flex-shrink-0 w-[350px] h-[222px] overflow-hidden hidden md:block pt-4 pb-4">
                      <img
                        src={card.image}
                        alt="image"
                        className="rounded-lg w-full h-full object-cover"
                      />
                    </div>
                  </Reveal>
                  <Reveal>
                    <div className="flex-grow p-6">
                      <h3
                        className="text-3xl font-extrabold m-4"
                        style={{ color: getTitleColor(index) }}
                      >
                        {card.title}
                      </h3>
                      <p className="mb-4">{card.description}</p>
                    </div>
                  </Reveal>
                </div>
              </Link>
            ))}
          </Reveal>
        </div>
        <Reveal>
          <div className="mt-10 text-white flex flex-col gap-4 items-center p-6">
            <p className="text-xl text-gray-600 font-semibold">
              Join us, at GDGC.
            </p>
            <p className="text-gray-500 text-lg text-center">
              Discover amazing events and connect with like-minded people.
            </p>
          </div>
        </Reveal>
      </div>
    </div>
  );*/}

  return (
    <div  style={{backgroundColor:"#F0F0F0"}}>
      <Hero />
      <div className="p-5 text-slate-800 ">
        <Reveal>
          <div className="text-center m-4">
            <p className="text-4xl text-slate-800 font-bold">
              What we do, at GDGC VNRVJIET :
            </p>
          </div>
        </Reveal>

        <div className="m-20">
          <Reveal>
            {cards.map((card, index) => (
              <Link to={card.path} key={index}>
                <div
                  className={`flex w-full border m-2 mt-10 p-4 rounded-2xl ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                    }`}
                  style={{ border: "2px solid ", borderColor: getBorderColor(index), backgroundColor: "#FFFFFF", minHeight:"260px" }}
                >
                  <Reveal>
                    <div className="flex-shrink-0 w-[270px] h-[200px] overflow-hidden hidden md:flex items-center justify-center pt-3 pb-3">
                      <img
                        src={card.image}
                        alt="image"
                        className="rounded-lg max-w-full max-h-full object-contain"
                      />
                    </div>

                  </Reveal>
                  <Reveal>
                    <div className="flex-grow p-6">
                      <h3
                        className="text-3xl font-extrabold m-4"
                        style={{ color: getTitleColor(index) }}
                      >
                        {card.title}
                      </h3>
                      <p className="mb-4 desc-text">{card.description}</p>
                    </div>
                  </Reveal>
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