import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { format } from "date-fns";

interface Hackathon {
  hackathonId: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
  image: string;
}

interface Event {
  eventId: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
  image: string;
}

interface UpcomingProps {
  eventsprop?: any[];
  type: "Workshops" | "Hackathons";
}

const UserPortalUpcoming: React.FC<UpcomingProps> = ({ eventsprop, type }) => {
  const navigate = useNavigate();

  // For Hackathons, store hackathons in local state.
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [hackathonMessage, setHackathonMessage] = useState("No upcoming hackathons for now :(");

  // For Workshops, we use the eventsprop directly.
  const [message, setMessage] = useState("No upcoming events for now :(");

  useEffect(() => {
    if (type === "Hackathons") {
      if (eventsprop && eventsprop.length > 0) {
        setHackathons(eventsprop);
        setHackathonMessage("");
      } else {
        setHackathons([]);
        setHackathonMessage("No upcoming hackathons for now :(");
      }
    } else if (type === "Workshops") {
      if (eventsprop && eventsprop.length > 0) {
        setMessage("");
      } else {
        setMessage("No upcoming events for now :(");
      }
    }
  }, [eventsprop, type]);

  // Navigation function for hackathon registration:
  const gotoHackathonRegister = (hackathon: Hackathon) => {
    // Redirect to the Registration component, passing hackathon details in state.
    navigate("/registration", { state: hackathon });
  };

  if (type === "Hackathons") {
    return (
      <div className="min-h-full p-4">
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
                    to="/registration"
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
    );
  }

  // For Workshops, we assume eventsprop contains workshop event objects.
  return (
    <div className="min-h-full p-4">
      <h3 className="text-2xl font-bold mb-4">Upcoming Workshops</h3>
      {eventsprop && eventsprop.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventsprop.map((event: Event) => (
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
  );
};

export default UserPortalUpcoming;
