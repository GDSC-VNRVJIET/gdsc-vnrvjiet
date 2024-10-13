import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import dotenv from "dotenv";
import {
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";
import { FaShareAlt } from "react-icons/fa";
import axios from "axios";
import {
  createEvent,
  getAllEvents,
  getEventById,
  getUpcomingEvents,
} from "../../../Apis/events";
import Loader from "../../Loader";
interface Event {
  eventId: number;
  name: string;
  startDate: string;
  endDate: string;
  venue: string;
  description: string;
}

interface FormData {
  rollno: string;
  branch: string;
  email: string;
  whatsapp: string;
  section : string;
  name: string;
  event: string;
  year:Number;
}

const PaymentGatewayRazorpay: React.FC = () => {
  const params = useParams();
  const eventname = params.eventname;

  const [states, setStates] = useState<Event>();
  const [events, setEvents] = useState<Event[]>([]);
  const [modal, setModal] = useState<Boolean>(false);
  const [displayLoader, setDisplayLoader] = useState(true);
  const [color,changeColor] = useState<string>('bg-red-300');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedEvents = await getUpcomingEvents();
        setEvents(fetchedEvents.payload.reverse());
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!events || events.length === 0) return;

    const foundEvent = events.find((event) => event.name === eventname);
    if (foundEvent) {
      setStates(foundEvent);
      setDisplayLoader(false);
    } else {
      console.log(`Event with name ${eventname} not found.`);
    }
  }, [events, eventname]);

  const {
    register,
    handleSubmit,
    formState: { errors , isValid},
    watch
  } = useForm<FormData>({ mode: "all" });
  const formFields = watch();

  const handleFormSubmit = (formData: FormData) => {
    console.log(formData);
    if (states) formData.event = states.name;
    paymentHandler(formData);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (isValid) {
      changeColor("bg-green-300");
    } else {
      changeColor("bg-red-300");
    }
  }, [isValid, formFields]);
  const paymentHandler = async (formdata: FormData) => {
    const amount = 100.0;
    const currency = "INR";
    const receiptId = "1235823";

    const response = await fetch(
      `${process.env.REACT_APP_BACK_URL}/sendmail/order`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount,
          currency,
          receipt: receiptId,
          email: formdata.email,
          rollno: formdata.rollno,
          whatsapp: formdata.whatsapp,
          branch: formdata.branch,
          name: formdata.name,
          event: formdata.event,
          section: formdata.section,
          year:formdata.year
        }),
      }
    );

    const order = await response.json();

    var option = {
      key: "rzp_live_EBNQrXnLeYG8dK",
      amount,
      currency,
      name: "GDSC VNRVJIET",
      description: "Test Transaction",
      order_id: order.id,
      handler: async (response: any) => {
        const body = {
          ...response,
          email: formdata.email,
          rollno: formdata.rollno,
          whatsapp: formdata.whatsapp,
          branch: formdata.branch,
          name: formdata.name,
          event: formdata.event,
          section: formdata.section,
          year:formdata.year
        };
      },
      prefill: {
        name: formdata.name,
        email: formdata.email,
        contact: formdata.whatsapp,
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new (window as any).Razorpay(option); // Note: Accessing Razorpay from the window object
    rzp1.on("payment.failed", (res: any) => {
      alert("Payment failed");
    });
    rzp1.open();
  };
  return displayLoader ? (
    <Loader />
  ) : (
    <>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-md relative">
            <span
              className="absolute top-4 right-4 text-3xl cursor-pointer text-red-500 hover:bg-red-500 hover:text-white hover:rounded-full hover:p-1"
              onClick={() => setModal(false)}
            >
              &times;
            </span>
            <h2 className="text-center text-xl mb-4">Share through</h2>
            <div className="flex justify-center">
              <WhatsappShareButton className="mr-2" url={window.location.href}>
                <WhatsappIcon round></WhatsappIcon>
              </WhatsappShareButton>
              <TwitterShareButton className="mr-2" url={window.location.href}>
              <FaXTwitter className="rounded-full w-12 h-12 bg-black text-white p-2" />
              </TwitterShareButton>
              <LinkedinShareButton url={window.location.href}>
                <LinkedinIcon round></LinkedinIcon>
              </LinkedinShareButton>
            </div>
          </div>
        </div>
      )}
      <div className="product mt-6">
        <div className="flex justify-center">
          <h1 className="ml-3 mt-0 text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
            {states?.name}
          </h1>
          <div className="ml-3">
            <button className="text-3xl" onClick={() => setModal(true)}>
              <FaShareAlt />
            </button>
          </div>
        </div>
        <p className="text-center mb-6 text-md font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-blue-400">
          {states?.description}
        </p>
        <div
          style={{ borderRadius: "30px" }}
          className="pt-5 pb-5 border border-gray-200 shadow max-w-sm mx-auto"
        >
          <div className="flex mb-3 ms-4">
            <div
              style={{ backgroundColor: "#176BEF" }}
              className="w-4 h-4 rounded-full ms-3"
            ></div>
            <div
              style={{ backgroundColor: "#FF3e30" }}
              className="w-4 h-4 rounded-full ms-3"
            ></div>
            <div
              style={{ backgroundColor: "#F7B529" }}
              className="w-4 h-4 rounded-full ms-3"
            ></div>
            <div
              style={{ backgroundColor: "#179C52" }}
              className="w-4 h-4 rounded-full ms-3"
            ></div>
          </div>
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="max-w-sm mx-auto border bg-gray-50 p-6"
          >
            <div className="w-72 mt-3 ml-3">
              <div className="relative mt-6 mb-8 w-full min-w-[200px] h-10">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="peer bg-white w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Name
                </label>
                <div className="">
                  {errors.name?.type === "required" && (
                    <p className="text-red-500">Enter your name</p>
                  )}
                </div>
              </div>
              <div className="relative mt-6 mb-8 w-full min-w-[200px] h-10">
                <input
                  type="text"
                  {...register("rollno", {
                    required: true,
                    maxLength: 10,
                    minLength: 10,
                  })}
                  className="peer bg-white w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Roll Number
                </label>
                <div className="">
                  {errors.rollno?.type === "required" && (
                    <p className="text-red-500">RollNumber is Required</p>
                  )}
                  {errors.rollno?.type === "minLength" && (
                    <p className="text-red-500">Should be 10 digits</p>
                  )}
                  {errors.rollno?.type === "maxLength" && (
                    <p className="text-red-500">Should be 10 digits</p>
                  )}
                </div>
              </div>
              <div className="relative mt-6 mb-8 w-full min-w-[200px] h-10">
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  {...register("whatsapp", {
                    required: true,
                    maxLength: 10,
                    minLength: 10,
                  })}
                  className="peer bg-white w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Whatsapp No
                </label>
                <div className="">
                  {errors.whatsapp?.type === "required" && (
                    <p className="text-red-500">Whatsapp is Required</p>
                  )}
                  {errors.whatsapp?.type === "minLength" && (
                    <p className="text-red-500">Should be 10 digits</p>
                  )}
                  {errors.whatsapp?.type === "maxLength" && (
                    <p className="text-red-500">Should be 10 digits</p>
                  )}
                </div>
              </div>
              <div className="relative mt-6 w-full min-w-[200px] h-10">
                <input
                  autoComplete="off"
                  type="email"
                  {...register("email", { required: true })}
                  className="peer bg-white w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Email
                </label>
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Email is required</p>
                )}
              </div>
              <div className="relative mt-6 w-full min-w-[200px] h-10">
                <input
                  autoComplete="off"
                  type="number"
                  {...register("year", { required: true })}
                  className="peer bg-white w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Year
                </label>
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Enter year</p>
                )}
              </div>
              <div className="max-w-sm mx-auto mt-8 mb-8">
                <label htmlFor="branch" className="ms-1 text-gray-500">
                  Select Branch
                </label>
                <select
                  {...register("branch", { required: true })}
                  id="countries"
                  className="bg-white border border-gray-300 text-gray-900 mt-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="AE">AE</option>
                  <option value="CE">CE</option>
                  <option value="CSE">CSE</option>
                  <option value="CSBS">CSBS</option>
                  <option value="IT">IT</option>
                  <option value="AIML">AIML</option>
                  <option value="IOT">IOT</option>
                  <option value="CYS">CYS</option>
                  <option value="AIDS">AIDS</option>
                  <option value="EEE">EEE</option>
                  <option value="ECE">ECE</option>
                  <option value="EIE">EIE</option>
                  <option value="ME">ME</option>
                </select>
                {errors.branch?.type === "required" && (
                  <p className="text-red-500">Select Branch</p>
                )}
              </div>
              <div className="relative mt-6 mb-8 w-full min-w-[200px] h-10">
                <input
                  type="text"
                  {...register("section", { required: true })}
                  className="peer bg-white w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                 Section
                </label>
                <div className="">
                  {errors.section?.type === "required" && (
                    <p className="text-red-500">Enter your Section</p>
                  )}
                </div>
              </div>
            </div>
            
            {/* <div className=""></div> */}
            <div className="mt-3 ml-3">
              <div className="cursor-pointer">
                <button
                  type="submit"
                  className="relative bg-white inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-green-600 transition duration-300 ease-out border-2 border-green-500 rounded-full shadow-md group"
                >
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      ></path>
                    </svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-green-500 transition-all duration-300 transform group-hover:translate-x-full ease">
                    Pay Now
                  </span>
                  <span className="relative invisible">Pay Now</span>
                </button>
              </div>
            </div>
            <div className="p-4 flex flex-col items-center justify-center"></div>
          </form>
          <div
            className={`relative bottom-0 left-0 right-0 h-12 ${color} max-w-sm w-full mx-auto`}
            style={{ borderRadius: "0 0 30px 30px" }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default PaymentGatewayRazorpay;