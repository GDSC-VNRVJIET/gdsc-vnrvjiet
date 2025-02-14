import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import axios from "axios";
import {
  createEvent,
  deleteEventById,
  getAllEvents,
  getUpcomingEvents,
  updateEvent,
  handleDownloadCSV,
} from "../../../Apis/events";

import {
  createHackathon,
  deleteHackathonById,
  getAllHackathons,
  getUpcomingHackathons,
  updateHackathon,
  // handleDownloadHackathonCSV,
} from "../../../Apis/hackathons";

import { format, isValid } from "date-fns";
import Loader from "../../Loader";
// import Files from "../files";

interface Event {
  eventId: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
  //image: string;
}

interface NewEvent {
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
  //image: string;
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

const AdminPortalUpcoming: React.FC<PastProps> = ({
  eventsprop,
  hackathonsprop,
}) => {
  // ReactQuill toolbar settings
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const navigate = useNavigate();

  /*** EVENTS STATES & FUNCTIONS ***/
  const [events, setEvents] = useState<Event[]>(eventsprop);
  const [description, setDescription] = useState<string>("");
  const [newEvent, setNewEvent] = useState<NewEvent>({
    name: "",
    startDate: "",
    endDate: "",
    venue: "",
    description: "",
  });
  const [editEvent, setEditEvent] = useState<Event | null>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  function viewRegistrations(eventName: string) {
    navigate(`/viewregistrations/${eventName}`);
  }

  async function fetchData() {
    try {
      const fetchedEvents = await getUpcomingEvents();
      setEvents(fetchedEvents.payload);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (eventsprop && eventsprop.length > 0) {
      setEvents(eventsprop);
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
      fetchData();
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

  function addEventDesc(value: any) {
    setDescription(value);
    setNewEvent({ ...newEvent, description: value });
  }

  /*** HACKATHONS STATES & FUNCTIONS ***/
  const [hackathons, setHackathons] = useState<Hackathon[]>(
    hackathonsprop || []
  );
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
      const fetchedHackathons = await getUpcomingHackathons();
      setHackathons(fetchedHackathons.payload);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (hackathonsprop && hackathonsprop.length > 0) {
      setHackathons(hackathonsprop);
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
      setHackathons(
        hackathons.filter((h) => h.hackathonId !== hackathonId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  function addHackathonDesc(value: any) {
    setNewHackathon({ ...newHackathon, description: value });
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 ">Admin Portal</h2>

      {/*** EVENTS SECTION ***/}
      <div>
        <h3 className="text-xl font-semibold my-3">Events</h3>
        <button
          onClick={() => setIsCreatingEvent(true)}
          className="bg-[#0F71F2] text-white rounded px-3 py-1 my-3 hover:ring-2 ring-offset-2 ring-[#0F71F2]"
        >
          Add New Event
        </button>
        {isCreatingEvent && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
            <div className="bg-white mx-20 p-4 rounded shadow-md">
              <span
                className="absolute top-2 right-2 text-gray-600 cursor-pointer"
                onClick={() => setIsCreatingEvent(false)}
              >
                &times;
              </span>
              <h3 className="text-xl font-semibold mb-5">Add New Event</h3>
              <input
                type="text"
                placeholder="Event Name"
                value={newEvent.name}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, name: e.target.value })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <ReactQuill
                modules={modules}
                formats={formats}
                placeholder="Event Description"
                value={newEvent.description}
                onChange={addEventDesc}
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <label>
                <br />
                Start date &amp; time :
              </label>
              <input
                type="datetime-local"
                placeholder="Start Date"
                value={newEvent.startDate}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, startDate: e.target.value })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <label>
                <br />
                End date &amp; time :
              </label>
              <input
                type="datetime-local"
                placeholder="End Date"
                value={newEvent.endDate}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, endDate: e.target.value })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <input
                type="text"
                placeholder="Event Location"
                value={newEvent.venue}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, venue: e.target.value })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <div className="font-semibold">
                <button
                  onClick={handleCreateEvent}
                  className="bg-[#318C07] text-white rounded px-3 py-1 hover:ring-2 ring-offset-2 ring-[#318C07]"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsCreatingEvent(false)}
                  className="bg-[#D92929] text-white rounded px-3 py-1 ml-2 hover:ring-2 ring-offset-2 ring-[#D92929]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.eventId}
              className="shadow-lg max-w-sm hover:scale-105 duration-300 bg-white border border-slate-400 rounded-md p-4"
            >
              <h4 className="text-2xl font-semibold mb-3">{event.name}</h4>
              <p>
                <span className="font-semibold text-lg">
                  What's Happening:{" "}
                </span>
                {event.description}
              </p>
              <p>
                <strong>When: </strong>
                {isValid(new Date(event.startDate))
                  ? format(new Date(event.startDate), "yyyy-MM-dd")
                  : "Invalid Start Date"}{" "}
                to{" "}
                {isValid(new Date(event.endDate))
                  ? format(new Date(event.endDate), "yyyy-MM-dd")
                  : "Invalid End Date"}
              </p>
              <p>
                <span className="font-semibold text-lg">Where: </span>
                {event.venue}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => setEditEvent(event)}
                  className="bg-[#F2A20C] text-white rounded px-2 py-1 ml-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => viewRegistrations(event.name)}
                  className="bg-[#318C07] text-white rounded px-2 py-1 ml-2 hover:bg-green-700"
                >
                  View registrations
                </button>
                {/* Uncomment below if you wish to enable deletion */}
                {/* <button
                  onClick={() => handleDeleteEvent(event.eventId)}
                  className="bg-red-500 text-white rounded px-2 py-1 ml-2 hover:bg-red-600"
                >
                  Delete
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {editEvent && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
            <div className="bg-slate-100 mx-20 p-4 rounded shadow-md">
              <span
                className="absolute top-2 right-2 text-gray-600 cursor-pointer"
                onClick={() => setEditEvent(null)}
              >
                &times;
              </span>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">
                Edit Event
              </h3>
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
              <input
                type="datetime-local"
                placeholder="Start Date"
                value={editEvent.startDate}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, startDate: e.target.value })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <input
                type="datetime-local"
                placeholder="End Date"
                value={editEvent.endDate}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, endDate: e.target.value })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <input
                type="text"
                placeholder="Event Location"
                value={editEvent.venue}
                onChange={(e) =>
                  setEditEvent({ ...editEvent, venue: e.target.value })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <div>
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
          </div>
        )}
      </div>

      {/*** HACKATHONS SECTION ***/}
      <div className="mt-10">
        <h3 className="text-xl font-semibold my-3">Hackathons</h3>
        <button
          onClick={() => setIsCreatingHackathon(true)}
          className="bg-[#0F71F2] text-white rounded px-3 py-1 my-3 hover:ring-2 ring-offset-2 ring-[#0F71F2]"
        >
          Add New Hackathon
        </button>
        {isCreatingHackathon && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
            <div className="bg-white mx-20 p-4 rounded shadow-md">
              <span
                className="absolute top-2 right-2 text-gray-600 cursor-pointer"
                onClick={() => setIsCreatingHackathon(false)}
              >
                &times;
              </span>
              <h3 className="text-xl font-semibold mb-5">
                Add New Hackathon
              </h3>
              <input
                type="text"
                placeholder="Hackathon Name"
                value={newHackathon.name}
                onChange={(e) =>
                  setNewHackathon({ ...newHackathon, name: e.target.value })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <ReactQuill
                modules={modules}
                formats={formats}
                placeholder="Hackathon Description"
                value={newHackathon.description}
                onChange={addHackathonDesc}
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <label>
                <br />
                Start date &amp; time :
              </label>
              <input
                type="datetime-local"
                placeholder="Start Date"
                value={newHackathon.startDate}
                onChange={(e) =>
                  setNewHackathon({
                    ...newHackathon,
                    startDate: e.target.value,
                  })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <label>
                <br />
                End date &amp; time :
              </label>
              <input
                type="datetime-local"
                placeholder="End Date"
                value={newHackathon.endDate}
                onChange={(e) =>
                  setNewHackathon({
                    ...newHackathon,
                    endDate: e.target.value,
                  })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <input
                type="text"
                placeholder="Hackathon Location"
                value={newHackathon.venue}
                onChange={(e) =>
                  setNewHackathon({
                    ...newHackathon,
                    venue: e.target.value,
                  })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <div className="font-semibold">
                <button
                  onClick={handleCreateHackathon}
                  className="bg-[#318C07] text-white rounded px-3 py-1 hover:ring-2 ring-offset-2 ring-[#318C07]"
                >
                  Save
                </button>
                <button
                  onClick={() => setIsCreatingHackathon(false)}
                  className="bg-[#D92929] text-white rounded px-3 py-1 ml-2 hover:ring-2 ring-offset-2 ring-[#D92929]"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {hackathons.map((hackathon) => (
            <div
              key={hackathon.hackathonId}
              className="shadow-lg max-w-sm hover:scale-105 duration-300 bg-white border border-slate-400 rounded-md p-4"
            >
              <h4 className="text-2xl font-semibold mb-3">
                {hackathon.name}
              </h4>
              <p>
                <span className="font-semibold text-lg">
                  What's Happening:{" "}
                </span>
                {hackathon.description}
              </p>
              <p>
                <strong>When: </strong>
                {isValid(new Date(hackathon.startDate))
                  ? format(new Date(hackathon.startDate), "yyyy-MM-dd")
                  : "Invalid Start Date"}{" "}
                to{" "}
                {isValid(new Date(hackathon.endDate))
                  ? format(new Date(hackathon.endDate), "yyyy-MM-dd")
                  : "Invalid End Date"}
              </p>
              <p>
                <span className="font-semibold text-lg">Where: </span>
                {hackathon.venue}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => setEditHackathon(hackathon)}
                  className="bg-[#F2A20C] text-white rounded px-2 py-1 ml-2"
                >
                  Edit
                </button>
                {/* Uncomment below if you wish to enable deletion */}
                {/* <button
                  onClick={() => handleDeleteHackathon(hackathon.hackathonId)}
                  className="bg-red-500 text-white rounded px-2 py-1 ml-2 hover:bg-red-600"
                >
                  Delete
                </button> */}
              </div>
            </div>
          ))}
        </div>

        {editHackathon && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 ">
            <div className="bg-slate-100 mx-20 p-4 rounded shadow-md">
              <span
                className="absolute top-2 right-2 text-gray-600 cursor-pointer"
                onClick={() => setEditHackathon(null)}
              >
                &times;
              </span>
              <h3 className="text-xl font-semibold mb-2 text-slate-900">
                Edit Hackathon
              </h3>
              <input
                type="text"
                placeholder="Hackathon Name"
                value={editHackathon.name}
                onChange={(e) =>
                  setEditHackathon({
                    ...editHackathon,
                    name: e.target.value,
                  })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <input
                type="text"
                placeholder="Hackathon Description"
                value={editHackathon.description}
                onChange={(e) =>
                  setEditHackathon({
                    ...editHackathon,
                    description: e.target.value,
                  })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <input
                type="datetime-local"
                placeholder="Start Date"
                value={editHackathon.startDate}
                onChange={(e) =>
                  setEditHackathon({
                    ...editHackathon,
                    startDate: e.target.value,
                  })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <input
                type="datetime-local"
                placeholder="End Date"
                value={editHackathon.endDate}
                onChange={(e) =>
                  setEditHackathon({
                    ...editHackathon,
                    endDate: e.target.value,
                  })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <input
                type="text"
                placeholder="Hackathon Location"
                value={editHackathon.venue}
                onChange={(e) =>
                  setEditHackathon({
                    ...editHackathon,
                    venue: e.target.value,
                  })
                }
                className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
              />
              <div>
                <button
                  onClick={() =>
                    handleEditHackathon(editHackathon.hackathonId)
                  }
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPortalUpcoming;
