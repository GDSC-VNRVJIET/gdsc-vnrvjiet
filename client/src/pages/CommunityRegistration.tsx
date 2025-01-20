import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { SlUser, SlPuzzle } from "react-icons/sl";
import axios from "axios";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import teamSynergy from "../images/team-synergy-removebg.png";
import formSubmittedImage from "../images/formSubmitted.jpg";

type FormData = {
  name: string;
  email: string;
  rollNumber: string;
  discordUsername: string;
  year: string;
  phone:string;
  firstChoice: string;
  secondChoice: string;
  thirdChoice: string;
};

const CommunityRegistration: React.FC = () => {
  const [activeTab, setActiveTab] = useState("details");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const navigate = useNavigate();
  const [checkModal, setCheckModal] = useState<boolean>(false);
  const [loadingButton, setLoadingButton] = useState<boolean>(false);
  const [isDetailsSubmitted, setIsDetailsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>();

  const watchFields = watch(["firstChoice", "secondChoice", "thirdChoice"]);

  const onSubmitDetails: SubmitHandler<FormData> = async (data) => {
    setIsDetailsSubmitted(true);
    setActiveTab("interests");
  };

  const onSubmitInterests: SubmitHandler<FormData> = async (data) => {
    if (!isDetailsSubmitted) {
      alert("Please complete the Details form first.");
      setActiveTab("details");
      return;
    }

    setLoadingButton(true);
    try {
      const checkRollNo = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/discord/check-register`,
        {
          rollNumber: data.rollNumber.toUpperCase(),
        }
      );
      if (checkRollNo.data.status === false) {
        setCheckModal(true);
        return;
      }

      const res = await axios.post(
        `${process.env.REACT_APP_BACK_URL}/discord/register`,
        data
      );
      if (res.data.message === "Registration successful") {
        setFormSubmitted(true);
        if (window.innerWidth < 1024) {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }
        console.log("Form submitted");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full  lg:w-4/5 bg-gray-50 lg:mx-auto lg:mt-20">
      {checkModal && (
        <Dialog
          open={checkModal}
          onClose={setCheckModal}
          className="relative z-10"
        >
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
                      <ExclamationTriangleIcon
                        aria-hidden="true"
                        className="h-6 w-6 text-red-600"
                      />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        {isDetailsSubmitted
                          ? "Already Registered"
                          : "Pending Details"}
                      </DialogTitle>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          {isDetailsSubmitted
                            ? "You have already registered for this event ,Check the details again to further process."
                            : "Complete the details first to proceed."}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("details");
                      setLoadingButton(false);
                      setCheckModal(false);
                    }}
                    className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  >
                    Check details
                  </button>
                  {isDetailsSubmitted && (
                    <button
                      type="button"
                      data-autofocus
                      onClick={() => navigate("/")}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Explore site
                    </button>
                  )}
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      )}
      <div
        className={`bg-white flex m-auto shadow-lg ${
          formSubmitted ? "translate-x-48 -z-30" : ""
        } transition-all ease-in-out hidden lg:flex duration-300`}
      >
        <div
          className={`bg-blue-500 h-28 w-1.5 mt-28 ${
            activeTab === "details" ? "" : "translate-y-[7.75rem]"
          } transition ease-in-out delay-100 duration-300`}
        ></div>
        <div className="flex-col px-2 py-6 text-center text-sm">
          <svg
            className="w-9 h-9 mx-auto mb-10"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <g transform="rotate(180, 50, 50)" fill="#3b82f6">
              <path
                transform="translate(0,50)"
                d="M 0 50 A 50 50 0 0 1 100 50 L 0 50 Z"
              />
              <path d="M 0 50 A 50 50 0 0 1 100 50 L 0 50 Z" />
            </g>
          </svg>
          <div
            className={`${
              activeTab !== "details" ? "text-gray-300" : "text-blue-500"
            } transition-colors my-16`}
            onClick={() => setActiveTab("details")}
          >
            <SlUser className="h-10 w-6 mx-auto" />
            <p>Details</p>
          </div>
          <div
            className={`${
              activeTab === "details" ? "text-gray-300" : "text-blue-500"
            } transition-colors mt-16 mb-4`}
            onClick={() => {
              if (isDetailsSubmitted) {
                setActiveTab("interests");
              } else {
                setCheckModal(true);
              }
            }}
          >
            <SlPuzzle className="h-10 w-6 mx-auto" />
            <p>Interests</p>
          </div>
        </div>
      </div>

      <div
        className={`flex flex-col bg-blue-600 text-white sm:w-full lg:w-1/2 p-10 ${
          formSubmitted && window.innerWidth >= 1024 ? "translate-x-1/2" : ""
        } transition-all ease-in-out  duration-300 `}
      >
        <div className={`${formSubmitted ? "hidden" : ""}`}>
          <h1 className="text-4xl font-bold mb-3">Join Our Community!</h1>
          <p className="mb-8 font-thin">
            Join a thriving community of tech enthusiasts. Collaborate on
            projects, enhance your skills, and explore domains. Let's innovate
            together!
          </p>
          <img src={teamSynergy} alt="Team Synergy" />
        </div>
        <div
          className={`${
            formSubmitted ? "" : "hidden"
          } z-30 bg-blue-600 w-full h-full text-center`}
        >
          <h1 className="text-4xl font-bold text-center m-3">Success!</h1>
          <img src={formSubmittedImage} alt="Team Synergy" />
          <p className="mb-8 font-thin">
            We have sent you an email with further instructions. Please check
            your inbox and spam folder. We are excited to have you onboard!
          </p>
          <button
            className="lg:w-1/3 p-2 bg-blue-900 text-white font-bold rounded-md hover:bg-gray-500 transition"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      </div>

      <div
        className={`flex flex-col items-center justify-center bg-white sm:w-full md:w-5/6 lg:w-3/5 p-12 shadow-xl ${
          formSubmitted && window.innerWidth >= 1024
            ? "-translate-x-full -z-30"
            : ""
        } ${
          formSubmitted && window.innerWidth < 1024 ? "hidden" : ""
        } transition-all ease-in-out duration-300`}
      >
        <div className="w-full max-w-md">
          {activeTab === "details" ? (
            <div
              className={`${
                activeTab === "details" ? "translate-y-0" : "translate-y-full"
              } transition-transform duration-500 ease-in-out transform`}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Community Registration
              </h2>
              <form onSubmit={handleSubmit(onSubmitDetails)}>
                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">
                    Name
                  </label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">
                    Email
                  </label>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@vnrvjiet.in$/,
                        message: "Provide college email only",
                      },
                    })}
                    type="email"
                    placeholder="youremail@vnrvjiet.in"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">
                    Roll Number
                  </label>
                  <input
                    {...register("rollNumber", {
                      required: "Roll number is required",
                      minLength: {
                        value: 10,
                        message: "Roll number must be 10 digits",
                      },
                      maxLength: {
                        value: 10,
                        message: "Roll number must be 10 digits",
                      },
                    })}
                    type="text"
                    placeholder="Your roll number"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.rollNumber && (
                    <p className="text-red-500 text-sm">
                      {errors.rollNumber.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">
                    Year
                  </label>
                  <select
                    {...register("year", { required: "Year is required" })}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={""}
                  >
                    <option value="" disabled>
                      Select a Year
                    </option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                  </select>
                  {errors.year && (
                    <p className="text-red-500 text-sm">
                      {errors.year.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">
                    Discord Username
                  </label>
                  <input
                    {...register("discordUsername", {
                      required: "Discord username is required",
                    })}
                    type="text"
                    placeholder="username#1234"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.discordUsername && (
                    <p className="text-red-500 text-sm">
                      {errors.discordUsername.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    {...register("phone", {
                      required: "Phone number is required",
                      minLength: {
                        value: 10,
                        message: "Phone number must be 10 digits",
                      },
                      maxLength: {
                        value: 10,
                        message: "Phone number must be 10 digits",
                      },
                    })}
                    type="number"
                    placeholder="your whatsapp number"
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
                >
                  Next
                </button>
              </form>
            </div>
          ) : (
            <div
              className={`${
                activeTab === "interests" ? "translate-y-0" : "translate-y-full"
              } transition-transform duration-500 ease-in-out transform`}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Select Your Interested Domains
              </h2>
              <form onSubmit={handleSubmit(onSubmitInterests)}>
                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">
                    1st Priority
                  </label>
                  <select
                    {...register("firstChoice", {
                      required: "1st Priority is required",
                    })}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue={""}
                  >
                    <option value="" disabled>
                      Select a Domain
                    </option>
                    <option value="web-dev">Web Development</option>
                    <option value="app-dev">App Development</option>
                    <option value="cys">
                      Cyber Security and Testing
                    </option>
                    <option value="hardware">Hardware</option>
                    <option value="cp">
                      Competitive Programming
                    </option>
                    <option value="aiml">AI and ML</option>
                    <option value="wit">
                      WIT (Women in Tech)
                    </option>
                    <option value="ui-ux">UI/UX and Design</option>
                  </select>
                  {errors.firstChoice && (
                    <p className="text-red-500 text-sm">
                      {errors.firstChoice.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">
                    2nd Priority (optional)
                  </label>
                  <select
                    {...register("secondChoice", {
                      validate: (value) =>
                        value === "" ||
                        value !== watchFields[0] ||
                        "Please select a different domain for 2nd priority",
                    })}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a Domain</option>
                    <option value="web-dev">Web Development</option>
                    <option value="app-dev">App Development</option>
                    <option value="cys">
                      Cyber Security and Testing
                    </option>
                    <option value="hardware">Hardware</option>
                    <option value="cp">
                      Competitive Programming
                    </option>
                    <option value="aiml">AI and ML</option>
                    <option value="wit">
                      WIT (Women in Tech)
                    </option>
                    <option value="ui-ux">UI/UX and Design</option>
                  </select>
                  {errors.secondChoice && (
                    <p className="text-red-500 text-sm">
                      {errors.secondChoice.message}
                    </p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-gray-600 font-medium mb-2">
                    3rd Priority (optional)
                  </label>
                  <select
                    {...register("thirdChoice", {
                      validate: (value) =>
                        value === "" ||
                        (value !== watchFields[0] &&
                          value !== watchFields[1]) ||
                        "Please select a different domain for 3rd priority",
                    })}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a Domain</option>
                    <option value="web-dev">Web Development</option>
                    <option value="app-dev">App Development</option>
                    <option value="cys">
                      Cyber Security and Testing
                    </option>
                    <option value="hardware">Hardware</option>
                    <option value="cp">
                      Competitive Programming
                    </option>
                    <option value="aiml">AI and ML</option>
                    <option value="wit">
                      WIT (Women in Tech)
                    </option>
                    <option value="ui-ux">UI/UX and Design</option>
                  </select>
                  {errors.thirdChoice && (
                    <p className="text-red-500 text-sm">
                      {errors.thirdChoice.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition"
                >
                  {loadingButton ? (
                    <div className="w-6 h-6 border-4 border-t-4 border-white border-solid rounded-full animate-spin mx-auto"></div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityRegistration;
