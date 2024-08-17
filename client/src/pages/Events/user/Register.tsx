import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation , useParams } from "react-router-dom";
import {WhatsappShareButton,WhatsappIcon,LinkedinIcon,LinkedinShareButton,TwitterIcon,TwitterShareButton,FacebookIcon,FacebookShareButton} from 'react-share'
import { FaShare } from "react-icons/fa";
import axios from "axios";
import {
  createEvent,
  getAllEvents,
  getEventById,
  getUpcomingEvents,
} from "../../../Apis/events";
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
  email:string;
  whatsapp:string
  name:string
  event:string
}

const PaymentGatewayRazorpay: React.FC = () => {
  const params = useParams();
  const eventname = params.eventname;

  const [states, setStates] = useState<Event>();
  const [events, setEvents] = useState<Event[]>([]);
  const [modal,setModal] = useState<Boolean>(false);

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

    const foundEvent = events.find(event => event.name === eventname);
    if (foundEvent) {
      setStates(foundEvent);
      console.log(states)
    } else {
      console.log(`Event with name ${eventname} not found.`);
    }
  }, [events, eventname]);



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleFormSubmit = (formData: FormData) => {
    if(states)
    formData.event = states.name;
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

  const paymentHandler = async (
    formdata : FormData
  ) => {


    const amount = 500.0;
    const currency = "INR";
    const receiptId = "1235823";

    const response = await fetch(`${process.env.REACT_APP_BACK_URL}/sendmail/order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
      }),
    });

    const order = await response.json();
    console.log("order", order);

    var option = {
      key: "rzp_live_ZppdxrzAdnfFFT",
      amount,
      currency,
      name: "GDSC VNRVJIET",
      description: "Test Transaction",
      order_id: order.id,
      handler: async (response: any) => {
        const body = { ...response, email: formdata.email , rollno:formdata.rollno };

        const validateResponse = await fetch(
          `${process.env.REACT_APP_BACK_URL}/sendmail/validate`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
          }
        );
        const jsonResponse = await validateResponse.json();
        console.log("jsonResponse", jsonResponse);
        if(jsonResponse.msg===' Transaction is legit!')
          {
            const res = await axios.post(`${process.env.REACT_APP_BACK_URL}/registration/register`,formdata);
            console.log(res);
          }
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
  return (
    <>
    
    {
      modal && <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-md relative">
        <span className="absolute top-4 right-4 text-2xl cursor-pointer text-gray-500 hover:text-gray-900" onClick={() => setModal(false)}>&times;</span>
        <h2 className="text-center text-xl mb-4">Share through</h2>
        <div className="flex justify-center">
          <WhatsappShareButton className="mr-2" url={window.location.href}>
            <WhatsappIcon round></WhatsappIcon>
          </WhatsappShareButton>
          <TwitterShareButton className="mr-2" url={window.location.href}>
            <TwitterIcon round></TwitterIcon>
          </TwitterShareButton>
          <FacebookShareButton className="mr-2" url={window.location.href}>
            <FacebookIcon round></FacebookIcon>
          </FacebookShareButton>
          
          <LinkedinShareButton url={window.location.href}>
            <LinkedinIcon round></LinkedinIcon>
          </LinkedinShareButton>
        </div>
        </div>
      </div>
    }
      <div className="product ml-3 mt-3">
        <div className="flex justify-center">
        <h1 className="ml-3 mt-0 text-center mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-black">{states?.name}</h1>
        <div className="ml-3 mt-3 sm:mt-4 md:mt-8 lg:mt-16">
        <button className="flex text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center me-2 mb-2" onClick={()=>setModal(true)}>Share <FaShare className="mt-1 ml-2"/> </button>
        </div>
        </div>
        <p className="text-center mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-blue-400">{states?.description}</p>
        <form  onSubmit={handleSubmit(handleFormSubmit)} className="max-w-sm mx-auto">
        <div className="w-72 mt-3 ml-3">
        <div className="relative mt-6 mb-8 w-full min-w-[200px] h-10">
            <input
              type="text"
              {...register("name", { required: true })}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
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
              {...register("rollno", { required: true , maxLength:10 , minLength:10})}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
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
              {...register("whatsapp", { required: true , maxLength:10 , minLength:10})}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
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
          <div className="relative mt-6 mb-8 w-full min-w-[200px] h-10">
            <input
              autoComplete="off"
              type="email"
              {...register("email", { required: true})}
              className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
              placeholder=" "
            />
            <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
              Email
            </label>
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}
          </div>
        </div>
        {/* <div className=""></div> */}
        <div className="mt-3 ml-3">
          <button
            className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            type="submit"
          >
            Pay Now
          </button>
        </div>
        </form>
        
      </div>
    </>
  );
};

export default PaymentGatewayRazorpay;
