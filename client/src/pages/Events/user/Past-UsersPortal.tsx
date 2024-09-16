import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPastEvents } from "../../../Apis/events";
import Loader from "../../Loader";

interface Event {
  eventId: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
  image: string;
}

interface PastProps {
  eventsprop: any[];
}

const UserPortalPast: React.FC<PastProps> = ({ eventsprop }) => {
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const userId = localStorage.getItem("userIdGDSC");
  const [userData, setUserData] = useState<{ id: number; name: string }>();
  const [explodingEvent, setExplodingEvent] = React.useState<number | null>(
    null
  );
  const [message, setMessage] = useState("No past events for now :(");
  // const [displayLoader, setDisplayLoader] = useState(true);
  const navigate = useNavigate();

  // async function fetchData() {
  //   try {
  //     const fetchedEvents = await getPastEvents();
  //     if (fetchedEvents.payload != null) {
  //       setEvents(fetchedEvents.payload.reverse());
  //     } else {
  //       setMessage("No past events for now :(");
  //     }
  //     setDisplayLoader(false);
  //   } catch (error) {
  //     setDisplayLoader(false);
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {

    if (eventsprop && eventsprop.length > 0) {
      setEvents(eventsprop);
      setMessage(""); // Clear message if events are available
    } else {
      setEvents([]);
      setMessage("No upcoming events for now :(");
    }
  }, [eventsprop]);

  const handleCardClick = (event: Event) => {
        if (event.name === "GDSC Solution Challenge") {
          navigate("/solution-challenge"); // Navigate to the Solution Challenge page
        }
      };

  return(
    <div className="min-h-full p-4">
      {/* <div className="HeroSection flex flex-col bg-cover bg-center bg-no-repeat m-4">
        <div className="relative flex justify-center">
          <video
            className="lg:w-4/5 sm:w-full animate-fadeIn"
            autoPlay
            loop
            muted
          >
            <source
              src={`${process.env.PUBLIC_URL}/banner2.mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <a
    href="https://www.instagram.com/reel/C7s9-0Otwu8/?igsh=bnRzaHk4Nnl0cGlk"
    className="absolute top-2 right-2 sm:top-1 sm:right-1 lg:top-4 lg:right-40 text-red-500 hover:text-red-600"
    target="_blank"
    title="Watch full video"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="40"
      height="40"
      viewBox="0 0 48 48"
      className="w-10 h-10 lg:w-12 lg:h-12"
    >
              <radialGradient
                id="yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1"
                cx="19.38"
                cy="42.035"
                r="44.899"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#fd5"></stop>
                <stop offset=".328" stop-color="#ff543f"></stop>
                <stop offset=".348" stop-color="#fc5245"></stop>
                <stop offset=".504" stop-color="#e64771"></stop>
                <stop offset=".643" stop-color="#d53e91"></stop>
                <stop offset=".761" stop-color="#cc39a4"></stop>
                <stop offset=".841" stop-color="#c837ab"></stop>
              </radialGradient>
              <path
                fill="url(#yOrnnhliCrdS2gy~4tD8ma_Xy10Jcu1L2Su_gr1)"
                d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
              ></path>
              <radialGradient
                id="yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2"
                cx="11.786"
                cy="5.54"
                r="29.813"
                gradientTransform="matrix(1 0 0 .6663 0 1.849)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0" stop-color="#4168c9"></stop>
                <stop
                  offset=".999"
                  stop-color="#4168c9"
                  stop-opacity="0"
                ></stop>
              </radialGradient>
              <path
                fill="url(#yOrnnhliCrdS2gy~4tD8mb_Xy10Jcu1L2Su_gr2)"
                d="M34.017,41.99l-20,0.019c-4.4,0.004-8.003-3.592-8.008-7.992l-0.019-20	c-0.004-4.4,3.592-8.003,7.992-8.008l20-0.019c4.4-0.004,8.003,3.592,8.008,7.992l0.019,20	C42.014,38.383,38.417,41.986,34.017,41.99z"
              ></path>
              <path
                fill="#fff"
                d="M24,31c-3.859,0-7-3.14-7-7s3.141-7,7-7s7,3.14,7,7S27.859,31,24,31z M24,19c-2.757,0-5,2.243-5,5	s2.243,5,5,5s5-2.243,5-5S26.757,19,24,19z"
              ></path>
              <circle cx="31.5" cy="16.5" r="1.5" fill="#fff"></circle>
              <path
                fill="#fff"
                d="M30,37H18c-3.859,0-7-3.14-7-7V18c0-3.86,3.141-7,7-7h12c3.859,0,7,3.14,7,7v12	C37,33.86,33.859,37,30,37z M18,13c-2.757,0-5,2.243-5,5v12c0,2.757,2.243,5,5,5h12c2.757,0,5-2.243,5-5V18c0-2.757-2.243-5-5-5H18z"
              ></path>
            </svg>
          </a>
        </div>
      </div> */}

      <div className="flex justify-evenly">
        <div>
          {events.length ? (
            <>
              <h3 className="text-2xl font-semibold mb-7 mt-5 text-center">
                Past Events
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 p-4">
                {events.map((event, index) => (
                  <div
                    key={event.eventId}
                    onClick={() => handleCardClick(event)}
                    className="bg-white rounded-xl shadow-2xl max-w-2xl hover:scale-105 duration-200 border border-slate-400 p-8 relative overflow-hidden group"
                  >
                    <img
                      src={event.image}
                      alt={`Event ${event.name}`}
                      className="w-full h-80 object-contain transition duration-300 ease-in-out group-hover:opacity-0"
                    />

                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-center text-center transition duration-300 ease-in-out opacity-0 group-hover:opacity-100">
                      <h4 className="text-xl font-semibold mb-4">
                        {event.name}
                      </h4>
                      <p>
                        <strong>What's Happening: </strong>
                        {event.description}
                      </p>
                      <p className="py-3">
                        <strong>When: </strong>
                        {event.startDate} - {event.endDate}
                      </p>
                      <p>
                        <strong>Where: </strong>
                        {event.venue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center">
              <p>{message}</p>
              <img
                src="https://hadibuttt.github.io/GDSC-Portfolio-Site/img/main.png"
                alt="image"
                className="w-[75vw] md:w-[40vw]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserPortalPast;