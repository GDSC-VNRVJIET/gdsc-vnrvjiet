import React, { useState, useEffect } from "react";
import { getPastEvents } from "../../../Apis/events";
import Loader from "../../Loader";
import { FaYoutube } from "react-icons/fa";

interface Event {
  eventId: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
  image: string;
}

function UserPortalPast() {
  const [registeredEvents, setRegisteredEvents] = useState<Event[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const userId = localStorage.getItem("userIdGDSC");
  const [userData, setUserData] = useState<{ id: number; name: string }>();
  const [explodingEvent, setExplodingEvent] = React.useState<number | null>(
    null
  );
  const [message, setMessage] = useState("No past events for now :(");
  const [displayLoader, setDisplayLoader] = useState(true);

  async function fetchData() {
    try {
      const fetchedEvents = await getPastEvents();
      if (fetchedEvents.payload != null) {
        setEvents(fetchedEvents.payload.reverse());
      } else {
        setMessage("No past events for now :(");
      }
      setDisplayLoader(false);
    } catch (error) {
      setDisplayLoader(false);
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return displayLoader ? (
    <Loader />
  ) : (
    <div className="min-h-full p-4">
      <div className="HeroSection flex flex-col bg-cover bg-center bg-no-repeat m-4">
        <div className="relative flex justify-center">
          <video
            className="lg:w-4/5 sm:w-full animate-fadeIn"
            autoPlay
            loop
            muted
          >
            <source
              src={`${process.env.PUBLIC_URL}/banner.mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <a
            href="https://www.instagram.com/reel/C7s9-0Otwu8/?igsh=bnRzaHk4Nnl0cGlk"
            className="absolute top-0 right-40 m-4 text-red-500 hover:text-red-600"
            target="_blank"
            title="Watch full video"
          >
            <FaYoutube size={40} />
          </a>
        </div>
      </div>

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
