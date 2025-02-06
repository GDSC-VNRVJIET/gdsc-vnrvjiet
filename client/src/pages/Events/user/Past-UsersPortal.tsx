import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getPastEvents } from "../../../Apis/events";
import { getPastHackathons } from "../../../Apis/hackathons";
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

interface Hackathon {
  hackathonId: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
  image: string;
}

interface PastProps {
  eventsprop: any[];
  hackathonsprop?: any[];
}

const UserPortalPast: React.FC<PastProps> = ({ eventsprop, hackathonsprop }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [message, setMessage] = useState("No past events for now :(");
  const [hackathonMessage, setHackathonMessage] = useState("No past hackathons for now :(");
  const navigate = useNavigate();

  // Update events state from prop
  useEffect(() => {
    if (eventsprop && eventsprop.length > 0) {
      setEvents(eventsprop);
      setMessage("");
    } else {
      setEvents([]);
      setMessage("No past events for now :(");
    }
  }, [eventsprop]);

  // Update hackathons state from prop, if provided
  useEffect(() => {
    if (hackathonsprop && hackathonsprop.length > 0) {
      setHackathons(hackathonsprop);
      setHackathonMessage("");
    } else {
      setHackathons([]);
      setHackathonMessage("No past hackathons for now :(");
    }
  }, [hackathonsprop]);

  // Optional: If you prefer to fetch data instead of using props, you can uncomment these functions.
  /*
  useEffect(() => {
    const fetchPastData = async () => {
      try {
        const pastEvents = await getPastEvents();
        setEvents(pastEvents.payload.reverse());
      } catch (error) {
        console.error("Error fetching past events:", error);
      }
    };
    fetchPastData();
  }, []);

  useEffect(() => {
    const fetchPastHackathons = async () => {
      try {
        const pastHackathons = await getPastHackathons();
        setHackathons(pastHackathons.payload.reverse());
      } catch (error) {
        console.error("Error fetching past hackathons:", error);
      }
    };
    fetchPastHackathons();
  }, []);
  */

  // Handler for event card click – for example, navigate to a dedicated page
  const handleCardClick = (event: Event) => {
    if (event.name === "GDSC Solution Challenge") {
      navigate("/solution-challenge");
    }
  };

  // Handler for hackathon card click – navigate to a hackathon detail page
  const handleHackathonCardClick = (hackathon: Hackathon) => {
    navigate(`/past-hackathons/${hackathon.name}`, { state: hackathon });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-evenly p-4 space-y-12">
      {/* Past Events Section */}
      <div>
        {events.length ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.eventId}
                onClick={() => handleCardClick(event)}
                className="group relative cursor-pointer overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30"
              >
                <div className="h-96 w-96">
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                    src={event.image}
                    alt={event.name}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                  <h5 className="mt-6 mb-2 font-bold text-white">{event.name}</h5>
                  <p className="mb-3 text-sm italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {event.description}
                  </p>
                  <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-medium text-sm capitalize text-white shadow shadow-black/60">
                    {event.startDate} - {event.endDate}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p>{message}</p>
            <img
              src="https://hadibuttt.github.io/GDSC-Portfolio-Site/img/main.png"
              alt="No events"
              className="w-[75vw] md:w-[40vw]"
            />
          </div>
        )}
      </div>

      {/* Past Hackathons Section */}
      <div>
        {hackathons.length ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {hackathons.map((hackathon) => (
              <div
                key={hackathon.hackathonId}
                onClick={() => handleHackathonCardClick(hackathon)}
                className="group relative cursor-pointer overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30"
              >
                <div className="h-96 w-96">
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                    src={hackathon.image}
                    alt={hackathon.name}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                  <h5 className="mt-6 mb-2 font-bold text-white">{hackathon.name}</h5>
                  <p className="mb-3 text-sm italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {hackathon.description}
                  </p>
                  <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-medium text-sm capitalize text-white shadow shadow-black/60">
                    {hackathon.startDate} - {hackathon.endDate}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p>{hackathonMessage}</p>
            <img
              src="https://hadibuttt.github.io/GDSC-Portfolio-Site/img/main.png"
              alt="No hackathons"
              className="w-[75vw] md:w-[40vw]"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPortalPast;
