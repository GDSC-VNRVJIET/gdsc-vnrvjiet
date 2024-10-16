import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLocation, useParams } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon , CheckBadgeIcon } from '@heroicons/react/24/outline'
import { RxLapTimer } from "react-icons/rx";
import dotenv from "dotenv";
import tobeannounced from "../../../images/tobeannounced.jpg"
import registrationClosed from "../../../images/registration_closed.jpg";
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
import { set } from "date-fns";
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
  year:number;
}

const PaymentGatewayRazorpay: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const eventname = params.eventname;

  const [states, setStates] = useState<Event>();
  const [events, setEvents] = useState<Event[]>([]);
  const [modal, setModal] = useState<Boolean>(false);
  const [displayLoader, setDisplayLoader] = useState(true);
  const [color,changeColor] = useState<string>('bg-red-300');
  const [successModal,setSuccessModal] = useState<boolean>(false);
  const [checkModal, setCheckModal] = useState<boolean>(false);
  const [maxSeatModal, setMaxSeatModal] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

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
    const amount = 9900.0;
    const currency = "INR";
    const receiptId = "1235823";
    const check = await axios.post(
      `${process.env.REACT_APP_BACK_URL}/registration/check-register`,
      {
        rollno:formdata.rollno.toUpperCase()
      }
    )

    if(check.data.status === false){
      setCheckModal(true);
      return;
    }
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
          rollno: formdata.rollno.toUpperCase(),
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
    if(order.message === "Registrations closed. Maximum seats filled."){
      setMaxSeatModal(true);
      return;

    }

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
        setSuccessModal(true);
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
    const rzp1 = new (window as any).Razorpay(option);
    rzp1.on("payment.failed", (res: any) => {
      alert("Payment failed");
    });
    rzp1.open();
  };

  const emailCheck= (email:string) => {
    const trimmedEmail = email.trim();
    const emailRegex= /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return (emailRegex.test(trimmedEmail) && !trimmedEmail.endsWith(".con"));
  }
  useEffect(() => {
    const fetchSuccessfulCount = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACK_URL}/registration/count-successful-registrations/${eventname}`
        );
        if (response.data.message === "Successful") {
          setCount(response.data.cnt);
        } else {
          console.error("Error fetching count");
        }
      } catch (error) {
        console.error("Error fetching count:", error);
      }
    };

    fetchSuccessfulCount();
  }, [eventname]);

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
              <WhatsappShareButton title={`${states?.name} Register for this amazing event conducted by GDGC VNRVJIET!!`}   className="mr-2" url={window.location.href}>
                <WhatsappIcon round></WhatsappIcon>
              </WhatsappShareButton>
              <TwitterShareButton title={`${states?.name} Register for this amazing event conducted by GDGC VNRVJIET!!`}  className="mr-2" url={window.location.href}>
              <FaXTwitter className="rounded-full w-12 h-12 bg-black text-white p-2" />
              </TwitterShareButton>
              <LinkedinShareButton summary="Register for this Amazing event conducted by GDGC VNRVJIET !!" title={states?.name} url={window.location.href}>
                <LinkedinIcon round></LinkedinIcon>
              </LinkedinShareButton>
            </div>
          </div>
        </div>
      )}{
        checkModal && (
          <Dialog open={checkModal} onClose={setCheckModal} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Already Registered
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You have already registered for this event ,
                      Check the details again to further process.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                onClick={() => setCheckModal(false)}
                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Check details
              </button>
              <button
                type="button"
                data-autofocus
                onClick={()=>navigate('/')}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Explore site
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
        )
      }
      {
        successModal && (
          <Dialog open={successModal} onClose={setSuccessModal} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                  <CheckBadgeIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Payment Successfull
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Check the registered email to know about the payment and event details
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                onClick={()=>navigate('/')}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black sm:mt-0 sm:w-auto"
              >
                Explore site
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
      
        )
      }
      {
        maxSeatModal && (
          <Dialog open={maxSeatModal} onClose={setMaxSeatModal} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationTriangleIcon aria-hidden="true" className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    Max Registrations reached
                  </DialogTitle>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      We have reached the maximum registrations for this event.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                data-autofocus
                onClick={()=>navigate('/events')}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 hover:text-black sm:mt-0 sm:w-auto"
              >
                Explore other events
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
      
        )
      }
      <div className="product mt-6 flex flex-col items-center">
        <div className=" lg:w-4/6 px-4 lg:px-1 p-4 bg-white shadow-lg rounded-xl mt-5 mb-10">
        <div className="flex justify-center items-center ">
          {states?.name === "Tensor Flow" && (
            <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6JGGZMfhZhqwUSTg79d0vEvu_V8a6pk8njQ&s"  
            alt="TensorFlow Logo"
            className="w-20 h-20 rounded-full object-cover"  
          />)}
          
          <div className="lg:ml-3">
            <h1 className="text-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
            {states?.name}
            </h1>
            
          </div>
          <div className="ml-3">
            <button className="text-3xl" onClick={() => setModal(true)}>
              <FaShareAlt />
            </button>
          </div>
        </div>
      <p className="text-justify  text-md font-normal text-gray-500 lg:text-xl sm:px-16 mb-2 ">
        {states?.description}  
      </p>
      </div>  
        {states?.name === "Webathon3.O"? (
          <div className="text-center">
            <p className="text-gray-600 text-xl">To be announced Soon!</p>
            <img src={tobeannounced} className="mx-auto" alt="" />
          </div>
        ):(
          <div
          style={{ borderRadius: "30px" }}
          className="pt-5 bg-white border border-gray-200 shadow max-w-sm lg:max-w-2xl mx-auto"
        >{count > 0 ? (
          <>
                  <div className="flex mb-3 ms-4 justify-between items-center">
              <div className="flex">
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
              <div className="flex">
              <h2 className="text-white rounded-full text-base bg-yellow-400 lg:text-lg mr-3 ps-2 pr-2 pt-1 pb-1">{`Seats left: ${count}`}</h2>
              <RxLapTimer className="mt-1 mr-1 text-xl sm:text-2xl lg:text-3xl text-red-300" />

              </div>
            </div>
            <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="w-full mx-auto border bg-gray-50 p-4"
          >
            <div className="w-full mt-3 lg:ml-3 flex flex-wrap space-x-1.5">
              <div className="relative mt-6 mb-8 w-full lg:w-[45%] lg:ml-1.5 min-w-[200px] h-10">
                <input
                  type="text"
                  {...register("name", { required: true })}
                  className="peer bg-white w-full h-full bg-transparent text-blue-gray-700 font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
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
              <div className="relative mt-6 mb-8 w-full lg:w-[45%] min-w-[200px] h-10">
                <input
                  type="text"
                  {...register("rollno", {
                    required: true,
                    maxLength: 10,
                    minLength: 10,
                  })}
                  className="peer bg-white w-full h-full bg-transparent text-blue-gray-700 font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Roll Number
                </label>
                <div className="">
                  {errors.rollno?.type === "required" && (
                    <p className="text-red-500">Enter Roll Number</p>
                  )}
                  {errors.rollno?.type === "minLength" && (
                    <p className="text-red-500">Should be 10 digits</p>
                  )}
                  {errors.rollno?.type === "maxLength" && (
                    <p className="text-red-500">Should be 10 digits, no extra space</p>
                  )}
                </div>
              </div>
              <div className="relative mt-6 mb-8 w-full lg:w-[45%] min-w-[200px] h-10">
                <input
                  type="tel"
                  pattern="[0-9]{10}"
                  {...register("whatsapp", {
                    required: true,
                    maxLength: 10,
                    minLength: 10,
                  })}
                  className="peer bg-white w-full h-full bg-transparent text-blue-gray-700 font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Whatsapp No
                </label>
                <div className="">
                  {errors.whatsapp?.type === "required" && (
                    <p className="text-red-500">Enter Number</p>
                  )}
                  {errors.whatsapp?.type === "minLength" && (
                    <p className="text-red-500">Should be 10 digits</p>
                  )}
                  {errors.whatsapp?.type === "maxLength" && (
                    <p className="text-red-500">Should be 10 digits, no extra space</p>
                  )}
                </div>
              </div>
              <div className="relative mt-6 mb-8 w-full lg:w-[45%] min-w-[200px] h-10">
                <input
                  autoComplete="off"
                  type="email"
                  {...register("email", { required: true ,validate:emailCheck})}
                  className="peer bg-white w-full h-full bg-transparent text-blue-gray-700 font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                  Email
                </label>
                {errors.email?.type === "required" && (
                  <p className="text-red-500">Email is required</p>
                )}
                {errors.email?.type === "validate" && (
                  <p className="text-red-500">Invalid email format</p>
                )}
              </div>
              <div className="w-full lg:w-11/12 mx-auto mt-6">
                <label htmlFor="branch" className="ms-1 text-gray-500">
                  Select Branch
                </label>
                <select
                  {...register("branch", { required: true })}
                  id="countries"
                  className="bg-white border border-gray-300 text-gray-900 mt-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="CSE">CSE</option>
                  <option value="CSBS">CSBS</option>
                  <option value="IT">IT</option>
                  <option value="CSDS">CSDS</option>
                  <option value="AIML">AIML</option>
                  <option value="IOT">IOT</option>
                  <option value="CYS">CYS</option>
                  <option value="AIDS">AIDS</option>
                  <option value="EEE">EEE</option>
                  <option value="ECE">ECE</option>
                  <option value="EIE">EIE</option>
                  <option value="AE">AE</option>
                  <option value="CE">CE</option>
                  <option value="ME">ME</option>
                </select>
                {errors.branch?.type === "required" && (
                  <p className="text-red-500">Select Branch</p>
                )}
              </div>
              <div className="relative mt-6 mb-8 w-full lg:w-[45%] min-w-[200px] h-10">
                <label className="ms-1 text-gray-500">
                  Year
                </label>
                <select
                  {...register("year", { required: true })}
                  className="bg-white border border-gray-300 text-gray-900 mt-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="2">2nd Year</option>
                  <option value="3">3rd Year</option>
                  <option value="4">4th Year</option>
                </select>
                {errors.year?.type === "required" && (
                  <p className="text-red-500">Enter year</p>
                )}
                
              </div>
              <div className="relative mt-6 mb-8 w-full lg:w-[45%] min-w-[200px] h-10">
                <label className="ms-1 text-gray-500">
                 Section
                </label>
                <select
                  {...register("section", { required: true })}
                  className="bg-white border border-gray-300 text-gray-900 mt-3 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                >
                  <option value="-">Section unavailable</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                  <option value="D">D</option>
                </select>
                <div className="">
                  {errors.section?.type === "required" && (
                    <p className="text-red-500">Enter Section (Keep '-' for no section)</p>
                  )}
                </div>
              </div>
              
            </div>
            
            {/* <div className=""></div> */}
            <div className="mt-6 ml-3">
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
            className={`relative bottom-0 left-0 right-0 h-12 ${color} max-w-sm lg:max-w-2xl w-full mx-auto`}
            style={{ borderRadius: "0 0 30px 30px" }}
          ></div>
          </>
        ):(
          <div className="flex flex-col justify-center items-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-10 max-w-md w-full text-center">
              <h1 className="text-3xl font-bold text-red-600 mb-4">Registrations Closed</h1>
              <p className="text-gray-600 mb-6">
                We're sorry, but the registration limit has been reached for this event.
              </p>
              <img 
                src={registrationClosed} 
                alt="Registrations Closed" 
                className="w-32 mx-auto mb-4"
              />
              <button 
                className="mt-4 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition duration-200"
                onClick={() => {navigate('/')}}
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
        
          
        </div>
        )}

      </div>
    </>
  );
};

export default PaymentGatewayRazorpay;