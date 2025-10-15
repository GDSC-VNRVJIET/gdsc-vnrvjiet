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

  return (
    <div className="flex min-h-screen items-center justify-evenly p-4">
      
      <div>
        {events.length ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                onClick={() => handleCardClick(event)}
                className="group sm:me-5 relative cursor-pointer items-center justify-center overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30"
              >
                <div className="h-96 w-96">
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
                    src={event.image}
                    alt=""
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
                <div className="absolute inset-0 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
                  <h5 className="font-dmserif mt-6 mb-2 font-bold text-white">
                    {event.name}
                  </h5>
                  <p className="mb-3 text-sm sm:text-md italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {" "}
                    {event.description}
                  </p>
                  <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">
                    {event.startDate} - {event.endDate}
                  </button>
                </div>
              </div>
            ))}
          </div>
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
  );
};

export default UserPortalPast;
