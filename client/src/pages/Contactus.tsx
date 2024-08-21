import React, { useState } from "react";
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";
import { GoMail } from "react-icons/go";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "../images/contactUs.png";
import Lottie from "lottie-react";
import { Button } from "@mui/material";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  msg: string;
}

interface ModalProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  body: string;
}

const API_URL = process.env.REACT_APP_BACK_URL;

const Contactus: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCloseSuccess = () => setShowSuccess(false);
  const handleCloseFailure = () => setShowFailure(false);

  const sendQuery: SubmitHandler<FormData> = async (queryData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_URL}/sendmail/contactus`,
        queryData
      );
      if (response.data.status === "success") {
        setShowSuccess(true);
        setLoading(false);
        reset();
      } else {
        setShowFailure(true);
        setLoading(false);
      }
    } catch (error) {
      setShowFailure(true);
      setLoading(false);
    }
  };

  const TailwindModal: React.FC<ModalProps> = ({
    show,
    handleClose,
    title,
    body,
  }) => {
    return (
      <>
        {show && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <p>{body}</p>
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-green-500 hover:text-white font-bold py-2 px-4 rounded"
                    onClick={handleClose}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="p-10 bg-gray-100 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="p-5">
          <h2 className="text-xl font-semibold mb-4">Have a Question?</h2>
          <p className="text-gray-700 mb-6">
            We're here to help! Feel free to ask any questions, share your
            doubts, or give us feedback.
          </p>
          <div className="flex justify-center items-center">
            <img
              src={Image}
              alt="Contact Us"
              className="w-full max-w-xs sm:max-w-md md:max-w-[80%] object-contain rounded-xl"
            />
          </div>
        </div>

        <div className="p-10 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4">Contact Us</h3>
          <form onSubmit={handleSubmit(sendQuery)}>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-50"
                placeholder="First Name"
                {...register("firstName", { required: true })}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm">First Name is required</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-50"
                placeholder="Last Name"
                {...register("lastName", { required: true })}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm">Last Name is required</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="email"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-50"
                placeholder="Enter Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>
            <div className="mb-4">
              <textarea
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-50"
                rows={5}
                placeholder="Your Message"
                {...register("msg", { required: true, minLength: 5 })}
              ></textarea>
              {errors.msg?.type === "required" && (
                <p className="text-red-500 text-sm">Cannot be blank</p>
              )}
              {errors.msg?.type === "minLength" && (
                <p className="text-yellow-500 text-sm">At least 5 characters</p>
              )}
            </div>
            <button
              className={`relative px-6 py-2 text-white font-semibold bg-blue-500 rounded-lg overflow-hidden focus:outline-none transition-colors duration-300`}
              disabled={loading}
            >
              <div
                className={`absolute inset-0 bg-blue-600 transform transition-transform duration-300 ${
                  loading || showSuccess ? "translate-y-0" : "translate-y-full"
                }`}
              ></div>
              <span
                className={`relative z-10 ${
                  loading ? "opacity-50" : "opacity-100"
                }`}
              >
                {showSuccess ? "Thank you!" : "Submit"}
              </span>
              <style>{`
                button:hover div {
                  transform: translateY(0);
                }
              `}</style>
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <TailwindModal
        show={showSuccess}
        handleClose={handleCloseSuccess}
        title="Message Sent"
        body="Your message has been sent successfully!"
      />

      {/* Failure Modal */}
      <TailwindModal
        show={showFailure}
        handleClose={handleCloseFailure}
        title="Message Failed"
        body="There was an error sending your message. Please try again later."
      />
    </div>
  );
};

export default Contactus;
