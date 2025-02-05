import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  createEvent,
  getAllEvents,
  getEventById,
  getUpcomingEvents,
} from "../../../Apis/events";
import {
  getAllRegistrationsByUserId,
  updateRegistration,
} from "../../../Apis/registrations";
import ConfettiExplosion from "react-confetti-explosion";
import { getUserById } from "../../../Apis/users";
import { format } from "date-fns";
import Loader from "../../Loader";

interface Event {
  eventId: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: any;
  // image: string;
}

interface UpcomingProps {
  eventsprop: any[];
}

const UserPortalUpcoming: React.FC<UpcomingProps> = ({ eventsprop }) => {
  const navigate = useNavigate();
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const userId = localStorage.getItem("userIdGDSC");
  const [userData, setUserData] = useState<{ id: number; name: string }>();
  const [explodingEvent, setExplodingEvent] = React.useState<number | null>(null);
  const [message, setMessage] = useState("No upcoming events for now :(");
  // const [displayLoader, setDisplayLoader] = useState(true);

  // async function fetchData() {
  //   try {
  //     const fetchedEvents = await getUpcomingEvents();
  //     // const user = await getUserById(userId);
  //     // setUserData(user);
  //     if (fetchedEvents.payload != null) {
  //       setEvents(fetchedEvents.payload.reverse());
  //     } else {
  //       setMessage("No upcoming events for now :(");
  //     }
  //     setDisplayLoader(false);
  //     // const registeredEvents = await getAllRegistrationsByUserId(userId);
  //     // setRegisteredEvents(registeredEvents);
  //   } catch (error) {
  //     setDisplayLoader(false);
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    if (eventsprop && eventsprop.length > 0) {
      setEvents(eventsprop);
      setMessage(""); // Clear message if events are available
    } else {
      setEvents([]);
      setMessage("No upcoming events for now :(");
    }
  }, [eventsprop]);

  function gotoRegister(event: Event) {
    navigate(`${event.name}`, { state: event });
  }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const handleRegisterForEvent = async (eventId: number) => {
  //   try {
  //     if (userId) {
  //       const register = isEventRegistered(eventId);
  //       await updateRegistration(userId, eventId);

  //       if (!register && explodingEvent !== eventId) {
  //         setExplodingEvent(eventId);

  //         setTimeout(() => {
  //           setExplodingEvent(null);
  //         }, 5000);
  //       }

  //       fetchData();
  //     } else {
  //       window.alert("Please login to register");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const isEventRegistered = (eventId: number) => {
  //   return registeredEvents.some((event) => event.eventId === eventId);
  // };

  const heroStyle = {
    backgroundImage: `url('https://res.cloudinary.com/startup-grind/image/fetch/c_scale,w_2560/c_crop,h_650,w_2560,y_0.0_mul_h_sub_0.0_mul_650/c_crop,h_650,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/https://res.cloudinary.com/startup-grind/image/upload/c_fill%2Cdpr_2.0%2Cf_auto%2Cg_center%2Cq_auto:good/v1/gcs/platform-data-goog/chapter_banners/IOE22-Bevy-ChapterBanner-2560x650_x6zWRuV.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100px",
  };

  return (
    <div className="min-h-full p-4">
      {/* <div
        className="HeroSection flex flex-col bg-cover bg-center bg-no-repeat m-4"
        style={heroStyle}
      >
        <img src="" />
        <h2 className="text-2xl font-bold mb-4 my-auto">
          Welcome
          {/* back, {userData?.name}. }
        </h2>
      </div> */}

      <div>
        {events.length ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div
                  key={event.eventId}
                  className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  <h4 className="text-xl font-semibold mb-4">{event.name}</h4>
                  <p className="mb-2">
                    <strong>What's Happening:</strong>
                  </p>
                  <div
                    className="text-gray-600 text-md prose max-w-none line-clamp-6 mb-4"
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />
                  <p className="text-gray-800 mb-2">
                    <strong>When:</strong>{" "}
                    {event.startDate && !isNaN(new Date(event.startDate).getTime()) ? 
                      format(new Date(event.startDate), "MMM d, yyyy") : "Undeclared Date"}{" "}
                    -{" "}
                    {event.endDate && !isNaN(new Date(event.endDate).getTime()) ? 
                      format(new Date(event.endDate), "MMM d, yyyy") : "Undeclared Date"}
                </p>
                  <p className="text-gray-800 mb-4">
                    <strong>Where:</strong> {event.venue}
                  </p>
                  <div className="mt-4">
                    <Link
                      to={`/upcoming-events/${event.name}`}
                      className="inline-block text-white bg-blue-600 border border-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium rounded-lg text-sm px-5 py-2.5 transition"
                    >
                      Register
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center mt-8">
            <p className="text-lg text-gray-700 mb-4">{message}</p>
            <img
              src="https://hadibuttt.github.io/GDSC-Portfolio-Site/img/main.png"
              alt="No events"
              className="w-3/4 md:w-1/2"
            />
          </div>
        )}
      </div>
      {/* <div>
        <h3 className="text-xl font-semibold">Registered Events</h3>
        <ul>
          {registeredEvents.map((event) => (
            <div
              key={event.eventId}
              className="shadow-lg w-[80vw] hover:scale-105 duration-300 bg-[#1e1e1e] border border-[#323434] p-4"
            >
              <h4 className="text-lg font-semibold mb-3">{event.name}</h4>
              <p>What's Happening: {event.description}</p>
              <p>When: {event.time}</p>
              <p>Where: {event.venue}</p>
              <button
                onClick={() => handleRegisterForEvent(event.eventId)}
                className="bg-[#186d67] text-white rounded px-3 py-1 mt-2 hover:bg-[#183937] cursor-not-allowed"
                disabled
              >
                Registered
              </button>
            </div>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default UserPortalUpcoming;
