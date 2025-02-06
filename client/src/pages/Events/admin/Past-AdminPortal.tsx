import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  createEvent,
  deleteEventById,
  getPastEvents,
  updateEvent,
} from "../../../Apis/events";

import {
  createHackathon,
  deleteHackathonById,
  getPastHackathons,
  updateHackathon,
} from "../../../Apis/hackathons";

interface Event {
  eventId: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
}

interface NewEvent {
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
}

interface Hackathon {
  hackathonId: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
}

interface NewHackathon {
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
}

interface PastProps {
  eventsprop: any[];
  hackathonsprop?: any[];
}

const AdminPortalPast: React.FC<PastProps> = ({ eventsprop, hackathonsprop }) => {
  /*** EVENTS SECTION ***/
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<NewEvent>({
    name: "",
    startDate: "",
    endDate: "",
    venue: "",
    description: "",
  });
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  async function fetchEvents() {
    try {
      const fetchedEvents = await getPastEvents();
      console.log("Fetched Events:", fetchedEvents.payload);
      const validEvents = fetchedEvents.payload.map((event: any) => ({
        ...event,
        startDate: isValidDate(event.startDate) ? event.startDate : null,
        endDate: isValidDate(event.endDate) ? event.endDate : null,
      }));
      setEvents(validEvents);
    } catch (error) {
      console.error("Error fetching past events:", error);
    }
  }

  function isValidDate(date: any): boolean {
    return date && !isNaN(new Date(date).getTime());
  }

  useEffect(() => {
    if (eventsprop && eventsprop.length > 0) {
      const validEvents = eventsprop.map((event) => ({
        ...event,
        startDate: isValidDate(event.startDate) ? event.startDate : null,
        endDate: isValidDate(event.endDate) ? event.endDate : null,
      }));
      setEvents(validEvents);
    } else {
      setEvents([]);
    }
  }, [eventsprop]);

  async function handleCreateEvent() {
    try {
      if (
        !newEvent.name ||
        !newEvent.description ||
        !newEvent.startDate ||
        !newEvent.endDate ||
        !newEvent.venue
      ) {
        document.querySelectorAll(".input-validation").forEach((input) => {
          if (!(input as HTMLInputElement).value) {
            input.classList.add("border-red-500");
          } else {
            input.classList.remove("border-red-500");
          }
        });
        return;
      }

      const createdEvent = await createEvent(newEvent);
      setEvents([...events, createdEvent]);
      setNewEvent({
        name: "",
        startDate: "",
        endDate: "",
        venue: "",
        description: "",
      });
      setIsCreatingEvent(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditEvent(editorId: number) {
    try {
      await updateEvent({ editorId, ...editEvent });
      fetchEvents();
      setEditEvent(null);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteEvent = async (eventId: number) => {
    try {
      await deleteEventById(eventId);
      setEvents(events.filter((event) => event.eventId !== eventId));
    } catch (error) {
      console.log(error);
    }
  };

  /*** HACKATHONS SECTION ***/
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);
  const [newHackathon, setNewHackathon] = useState<NewHackathon>({
    name: "",
    startDate: "",
    endDate: "",
    venue: "",
    description: "",
  });
  const [editHackathon, setEditHackathon] = useState<Hackathon | null>(null);
  const [isCreatingHackathon, setIsCreatingHackathon] = useState(false);

  async function fetchHackathons() {
    try {
      const fetchedHackathons = await getPastHackathons();
      console.log("Fetched Hackathons:", fetchedHackathons.payload);
      const validHackathons = fetchedHackathons.payload.map((hackathon: any) => ({
        ...hackathon,
        startDate: isValidDate(hackathon.startDate) ? hackathon.startDate : null,
        endDate: isValidDate(hackathon.endDate) ? hackathon.endDate : null,
      }));
      setHackathons(validHackathons);
    } catch (error) {
      console.error("Error fetching past hackathons:", error);
    }
  }

  useEffect(() => {
    if (hackathonsprop && hackathonsprop.length > 0) {
      const validHackathons = hackathonsprop.map((hackathon) => ({
        ...hackathon,
        startDate: isValidDate(hackathon.startDate) ? hackathon.startDate : null,
        endDate: isValidDate(hackathon.endDate) ? hackathon.endDate : null,
      }));
      setHackathons(validHackathons);
    } else {
      setHackathons([]);
    }
  }, [hackathonsprop]);

  async function handleCreateHackathon() {
    try {
      if (
        !newHackathon.name ||
        !newHackathon.description ||
        !newHackathon.startDate ||
        !newHackathon.endDate ||
        !newHackathon.venue
      ) {
        document.querySelectorAll(".input-validation").forEach((input) => {
          if (!(input as HTMLInputElement).value) {
            input.classList.add("border-red-500");
          } else {
            input.classList.remove("border-red-500");
          }
        });
        return;
      }
      const createdHackathon = await createHackathon(newHackathon);
      setHackathons([...hackathons, createdHackathon]);
      setNewHackathon({
        name: "",
        startDate: "",
        endDate: "",
        venue: "",
        description: "",
      });
      setIsCreatingHackathon(false);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleEditHackathon(hackathonId: number) {
    try {
      await updateHackathon({ hackathonId, ...editHackathon });
      fetchHackathons();
      setEditHackathon(null);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteHackathon = async (hackathonId: number) => {
    try {
      await deleteHackathonById(hackathonId);
      setHackathons(hackathons.filter((h) => h.hackathonId !== hackathonId));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Portal</h2>

      {/*** PAST EVENTS SECTION ***/}
      <div>
        <h3 className="text-xl font-semibold my-3">Past Events</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.eventId}
              className="shadow-lg max-w-sm hover:scale-105 duration-300 bg-white border border-slate-400 rounded-md p-4"
            >
              <h4 className="text-2xl font-semibold mb-3">{event.name}</h4>
              <p>
                <span className="font-semibold text-lg">What's Happening: </span>
                {event.description}
              </p>
              <p>
                <strong>When: </strong>
                {event.startDate
                  ? format(new Date(event.startDate), "yyyy-MM-dd")
                  : "Invalid Date"}{" "}
                to{" "}
                {event.endDate
                  ? format(new Date(event.endDate), "yyyy-MM-dd")
                  : "Invalid Date"}
              </p>
              <p>
                <span className="font-semibold text-lg">Where: </span>
                {event.venue}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => setEditEvent(event)}
                  className="bg-[#F2A20C] text-white rounded px-2 py-1 ml-2 hover:bg-[#1e4b48]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.eventId)}
                  className="bg-red-500 text-white rounded px-2 py-1 ml-2 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editEvent && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-slate-100 mx-20 p-4 rounded shadow-md">
            <span
              className="absolute top-2 right-2 text-gray-600 cursor-pointer"
              onClick={() => setEditEvent(null)}
            >
              &times;
            </span>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">Edit Event</h3>
            <input
              type="text"
              placeholder="Event Name"
              value={editEvent.name}
              onChange={(e) =>
                setEditEvent({ ...editEvent, name: e.target.value })
              }
              className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
            />
            <input
              type="text"
              placeholder="Event Description"
              value={editEvent.description}
              onChange={(e) =>
                setEditEvent({ ...editEvent, description: e.target.value })
              }
              className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
            />
            <button
              onClick={() => handleEditEvent(editEvent.eventId)}
              className="bg-[#318C07] text-white rounded px-3 py-1 hover:ring-2 ring-offset-2 ring-[#318C07]"
            >
              Save
            </button>
            <button
              onClick={() => setEditEvent(null)}
              className="bg-[#D92929] text-white rounded px-3 py-1 ml-2 hover:ring-2 ring-offset-2 ring-[#D92929]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/*** PAST HACKATHONS SECTION ***/}
      <div className="mt-10">
        <h3 className="text-xl font-semibold my-3">Past Hackathons</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon.hackathonId}
              className="shadow-lg max-w-sm hover:scale-105 duration-300 bg-white border border-slate-400 rounded-md p-4"
            >
              <h4 className="text-2xl font-semibold mb-3">{hackathon.name}</h4>
              <p>
                <span className="font-semibold text-lg">What's Happening: </span>
                {hackathon.description}
              </p>
              <p>
                <strong>When: </strong>
                {hackathon.startDate
                  ? format(new Date(hackathon.startDate), "yyyy-MM-dd")
                  : "Invalid Date"}{" "}
                to{" "}
                {hackathon.endDate
                  ? format(new Date(hackathon.endDate), "yyyy-MM-dd")
                  : "Invalid Date"}
              </p>
              <p>
                <span className="font-semibold text-lg">Where: </span>
                {hackathon.venue}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => setEditHackathon(hackathon)}
                  className="bg-[#F2A20C] text-white rounded px-2 py-1 ml-2 hover:bg-[#1e4b48]"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteHackathon(hackathon.hackathonId)}
                  className="bg-red-500 text-white rounded px-2 py-1 ml-2 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editHackathon && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-slate-100 mx-20 p-4 rounded shadow-md">
            <span
              className="absolute top-2 right-2 text-gray-600 cursor-pointer"
              onClick={() => setEditHackathon(null)}
            >
              &times;
            </span>
            <h3 className="text-xl font-semibold mb-2 text-slate-900">Edit Hackathon</h3>
            <input
              type="text"
              placeholder="Hackathon Name"
              value={editHackathon.name}
              onChange={(e) =>
                setEditHackathon({ ...editHackathon, name: e.target.value })
              }
              className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
            />
            <input
              type="text"
              placeholder="Hackathon Description"
              value={editHackathon.description}
              onChange={(e) =>
                setEditHackathon({ ...editHackathon, description: e.target.value })
              }
              className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
            />
            <button
              onClick={() => handleEditHackathon(editHackathon.hackathonId)}
              className="bg-[#318C07] text-white rounded px-3 py-1 hover:ring-2 ring-offset-2 ring-[#318C07]"
            >
              Save
            </button>
            <button
              onClick={() => setEditHackathon(null)}
              className="bg-[#D92929] text-white rounded px-3 py-1 ml-2 hover:ring-2 ring-offset-2 ring-[#D92929]"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortalPast;
