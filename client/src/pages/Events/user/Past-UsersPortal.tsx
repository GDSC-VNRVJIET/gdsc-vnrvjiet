import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";

// Define interfaces for event and hackathon data
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

// Props for Past component; note: type must be "Workshops" or "Hackathons"
interface PastProps {
  eventsprop?: any[];
  type: "Workshops" | "Hackathons";
}

const UserPortalPast: React.FC<PastProps> = ({ eventsprop, type }) => {
  const navigate = useNavigate();

  // State for past events (Workshops)
  const [events, setEvents] = useState<Event[]>([]);
  const [message, setMessage] = useState("No past events for now :(");

  // State for past hackathons
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [hackathonMessage, setHackathonMessage] = useState("No past hackathons for now :(");

  // Update state based on provided data and type
  useEffect(() => {
    if (type === "Workshops") {
      if (eventsprop && eventsprop.length > 0) {
        setEvents(eventsprop);
        setMessage("");
      } else {
        setEvents([]);
        setMessage("No past events for now :(");
      }
    } else if (type === "Hackathons") {
      if (eventsprop && eventsprop.length > 0) {
        // For hackathons, the same prop is used (or you could pass a separate prop)
        setHackathons(eventsprop);
        setHackathonMessage("");
      } else {
        setHackathons([]);
        setHackathonMessage("No past hackathons for now :(");
      }
    }
  }, [eventsprop, type]);

  // Handler for past event card click – navigate to a past event detail page
  const handleCardClick = (event: Event) => {
    navigate(`/past-events/${event.name}`, { state: event });
  };

  // Handler for past hackathon card click – navigate to a past hackathon detail page
  const handleHackathonCardClick = (hackathon: Hackathon) => {
    navigate(`/past-hackathons/${hackathon.name}`, { state: hackathon });
  };

  if (type === "Workshops") {
    return (
      <div className="min-h-full p-4">
        <h3 className="text-2xl font-bold mb-4">Past Events</h3>
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
            <p className="text-lg text-gray-700 mb-4">{message}</p>
            <img
              src="https://hadibuttt.github.io/GDSC-Portfolio-Site/img/main.png"
              alt="No events"
              className="w-[75vw] md:w-[40vw]"
            />
          </div>
        )}
      </div>
    );
  } else if (type === "Hackathons") {
    return (
      <div className="min-h-full p-4">
        <h3 className="text-2xl font-bold mb-4">Past Hackathons</h3>
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
            <p className="text-lg text-gray-700 mb-4">{hackathonMessage}</p>
            <img
              src="https://hadibuttt.github.io/GDSC-Portfolio-Site/img/main.png"
              alt="No hackathons"
              className="w-[75vw] md:w-[40vw]"
            />
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default UserPortalPast;
