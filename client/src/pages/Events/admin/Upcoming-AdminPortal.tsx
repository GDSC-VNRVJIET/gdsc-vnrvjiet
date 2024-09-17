import React, { useState, useEffect } from "react";
import {
  createEvent,
  deleteEventById,
  getAllEvents,
  getUpcomingEvents,
  updateEvent,
} from "../../../Apis/events";
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

interface PastProps {
  eventsprop: any[];
}

const AdminPortalUpcoming: React.FC<PastProps> = ({ eventsprop }) => {
  const [events, setEvents] = useState<Event[]>(eventsprop);
  const [newEvent, setNewEvent] = useState<NewEvent>({
    name: "",
    startDate: "",
    endDate: "",
    venue: "",
    description: "",
    //image: "",
  });
  const [editEvent, setEditEvent] = useState<Event | null>();
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [displayLoader, setDisplayLoader] = useState(false);

  async function fetchData() {
    try {
      const fetchedEvents = await getUpcomingEvents();
      setEvents(fetchedEvents.payload);
      setDisplayLoader(false);
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
        //image: "",
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

  return(
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 ">Admin Portal</h2>
      <button
        onClick={() => setIsCreatingEvent(true)}
        className="bg-[#0F71F2] text-white rounded px-3 py-1 my-3 hover:ring-2 ring-offset-2 ring-[#0F71F2]"
      >
        Add New Event
      </button>
      {/* <Files /> */}
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
            <input
              type="text"
              placeholder="Event Description"
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
              className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-100 text-black"
            />
            <label>
              <br />
              Start date & time :{" "}
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
              End date & time :{" "}
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
            {/* <input
              type="file"
              placeholder="Event Images"
              value={newEvent.image}
              onChange={(e) =>
                setNewEvent({ ...newEvent, image: e.target.value })
              }
              className="border border-[#323434] rounded px-2 py-1 w-[80vw] mb-4 input-validation bg-slate-800 text-white"
            /> */}
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
      <div>
        <h3 className="text-xl font-semibold my-3">Events List</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event) => (
            <div
              key={event.eventId}
              className="shadow-lg max-w-sm hover:scale-105 duration-300 bg-white border border-slate-400 rounded-md p-4"
            >
              {/* <div className=" h-[222px] overflow-hidden">
                <img src={event.image} alt="image" className="rounded-lg" />
              </div> */}
              <h4 className="text-2xl font-semibold mb-3">{event.name}</h4>
              <p>
                <span className=" font-semibold text-lg">
                  What's Happening:{" "}
                </span>
                {event.description}
              </p>
              <p>
                <strong>When : </strong>
                {isValid(new Date(event.startDate)) ? format(new Date(event.startDate), "yyyy-MM-dd") : "Invalid Start Date"} to{" "}
                {isValid(new Date(event.endDate)) ? format(new Date(event.endDate), "yyyy-MM-dd") : "Invalid End Date"}

              </p>

              <p>
                <span className=" font-semibold text-lg">Where: </span>
                {event.venue}
              </p>
              <div className="mt-2">
                <button
                  onClick={() => setEditEvent(event)}
                  className="bg-[#F2A20C] text-white rounded px-2 py-1 ml-2 "
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
  );
}

export default AdminPortalUpcoming;
