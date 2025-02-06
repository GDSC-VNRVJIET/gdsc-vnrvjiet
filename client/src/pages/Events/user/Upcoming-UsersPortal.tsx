import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";

// Import events APIs
import {
  createEvent,
  getAllEvents,
  getEventById,
  getUpcomingEvents,
} from "../../../Apis/events";

// Import hackathons APIs
import { getUpcomingHackathons } from "../../../Apis/hackathons";

import ConfettiExplosion from "react-confetti-explosion";
import Loader from "../../Loader";

interface Event {
  eventId: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: any;
  // image?: string;
}

interface Hackathon {
  hackathonId: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
}

interface UpcomingProps {
  eventsprop: any[];
}

const UserPortalUpcoming: React.FC<UpcomingProps> = ({ eventsprop }) => {
  const navigate = useNavigate();

  // State for events
  const [events, setEvents] = useState<Event[]>([]);
  // Message for events section if no events are available
  const [message, setMessage] = useState("No upcoming events for now :(");

  // State for hackathons
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  // Message for hackathons section if no hackathons are available
  const [hackathonMessage, setHackathonMessage] = useState("No upcoming hackathons for now :(");

  // When eventsprop changes, update events state accordingly
  useEffect(() => {
    if (eventsprop && eventsprop.length > 0) {
      setEvents(eventsprop);
      setMessage(""); // Clear message if events exist
    } else {
      setEvents([]);
      setMessage("No upcoming events for now :(");
    }
  }, [eventsprop]);

  // Fetch upcoming hackathons from API on component mount
  useEffect(() => {
    const fetchHackathons = async () => {
      try {
        const fetchedHackathons = await getUpcomingHackathons();
        if (fetchedHackathons.payload && fetchedHackathons.payload.length > 0) {
          // Reverse the order if needed, similar to events
          setHackathons(fetchedHackathons.payload.reverse());
          setHackathonMessage("");
        } else {
          setHackathons([]);
          setHackathonMessage("No upcoming hackathons for now :(");
        }
      } catch (error) {
        console.error("Error fetching upcoming hackathons:", error);
        setHackathons([]);
        setHackathonMessage("No upcoming hackathons for now :(");
      }
    };
    fetchHackathons();
  }, []);

  // Navigation function for event registration
  function gotoRegister(event: Event) {
    navigate(`${event.name}`, { state: event });
  }

  // Navigation function for hackathon registration
  function gotoHackathonRegister(hackathon: Hackathon) {
    // Navigate to a route specific for hackathons (adjust the route as needed)
    navigate(`/upcoming-hackathons/${hackathon.name}`, { state: hackathon });
  }

  // Styling for a hero/banner (currently commented out)
  const heroStyle = {
    backgroundImage: `url('https://res.cloudinary.com/startup-grind/image/fetch/c_scale,w_2560/c_crop,h_650,w_2560,y_0.0_mul_h_sub_0.0_mul_650/c_crop,h_650,w_2560/c_fill,dpr_2.0,f_auto,g_center,q_auto:good/https://res.cloudinary.com/startup-grind/image/upload/c_fill%2Cdpr_2.0%2Cf_auto%2Cg_center%2Cq_auto:good/v1/gcs/platform-data-goog/chapter_banners/IOE22-Bevy-ChapterBanner-2560x650_x6zWRuV.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100px",
  };

  return (
    <div className="min-h-full p-4">
      {/* Optional Hero Section */}
      {/*
      <div
        className="HeroSection flex flex-col bg-cover bg-center bg-no-repeat m-4"
        style={heroStyle}
      >
        <h2 className="text-2xl font-bold mb-4 my-auto">Welcome</h2>
      </div>
      */}

      {/* Upcoming Events Section */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Upcoming Events</h3>
        {events.length ? (
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
                  {event.startDate && !isNaN(new Date(event.startDate).getTime())
                    ? format(new Date(event.startDate), "MMM d, yyyy")
                    : "Undeclared Date"}{" "}
                  -{" "}
                  {event.endDate && !isNaN(new Date(event.endDate).getTime())
                    ? format(new Date(event.endDate), "MMM d, yyyy")
                    : "Undeclared Date"}
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

      {/* Upcoming Hackathons Section */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-4">Upcoming Hackathons</h3>
        {hackathons.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hackathons.map((hackathon) => (
              <div
                key={hackathon.hackathonId}
                className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <h4 className="text-xl font-semibold mb-4">{hackathon.name}</h4>
                <p className="mb-2">
                  <strong>What's Happening:</strong>
                </p>
                <div
                  className="text-gray-600 text-md prose max-w-none line-clamp-6 mb-4"
                  dangerouslySetInnerHTML={{ __html: hackathon.description }}
                />
                <p className="text-gray-800 mb-2">
                  <strong>When:</strong>{" "}
                  {hackathon.startDate && !isNaN(new Date(hackathon.startDate).getTime())
                    ? format(new Date(hackathon.startDate), "MMM d, yyyy")
                    : "Undeclared Date"}{" "}
                  -{" "}
                  {hackathon.endDate && !isNaN(new Date(hackathon.endDate).getTime())
                    ? format(new Date(hackathon.endDate), "MMM d, yyyy")
                    : "Undeclared Date"}
                </p>
                <p className="text-gray-800 mb-4">
                  <strong>Where:</strong> {hackathon.venue}
                </p>
                <div className="mt-4">
                  <Link
                    to={`/upcoming-hackathons/${hackathon.name}`}
                    className="inline-block text-white bg-green-600 border border-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 font-medium rounded-lg text-sm px-5 py-2.5 transition"
                    onClick={() => gotoHackathonRegister(hackathon)}
                  >
                    Register
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center mt-8">
            <p className="text-lg text-gray-700 mb-4">{hackathonMessage}</p>
            <img
              src="https://hadibuttt.github.io/GDSC-Portfolio-Site/img/main.png"
              alt="No hackathons"
              className="w-3/4 md:w-1/2"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPortalUpcoming;
