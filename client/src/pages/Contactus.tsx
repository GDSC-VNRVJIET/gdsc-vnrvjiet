import React, { useState } from 'react';
import axios from 'axios';
import { CiLocationOn } from "react-icons/ci";
import { GoMail } from "react-icons/go";
import { useForm, SubmitHandler } from 'react-hook-form';

// Define the shape of the form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  msg: string;
}

// Define props for the TailwindModal component
interface ModalProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  body: string;
}

const API_URL = process.env.REACT_APP_BACK_URL;

const Contactus: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const handleCloseSuccess = () => setShowSuccess(false);
  const handleCloseFailure = () => setShowFailure(false);

  const sendQuery: SubmitHandler<FormData> = async (queryData) => {
    try {
      const response = await axios.post(`${API_URL}/sendmail/contactus`, queryData);
      if (response.data.status === 'success') {
        setShowSuccess(true);
        reset();
      } else {
        setShowFailure(true);
      }
    } catch (error) {
      setShowFailure(true);
    }
  };

  const TailwindModal: React.FC<ModalProps> = ({ show, handleClose, title, body }) => {
    return (
      <>
        {show && (
          <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <div className="relative bg-white rounded-lg p-8 max-w-md w-full">
                <h3 className="text-xl font-bold mb-4">{title}</h3>
                <p>{body}</p>
                <div className="mt-4 flex justify-end">
                  <button
                    className="bg-green-500 hover text-white font-bold py-2 px-4 rounded"
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
    <div style={{marginTop:"100px",marginLeft:"8px",marginRight:"8px"}} className='container mx-auto my-auto bg-light'>
      <div className='p-1'></div>
      <div className='rounded-lg'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10 mt-5'>
          <div className='p-5 rounded bg-white mt-5'>
            
            <h3 className='text-3xl'>Contact us</h3>
            <p className='text-xl'>Our Details</p>
            <ul className='list-none'>
              <li className='flex mb-4'>
                <CiLocationOn className='mr-1 mt-1' />
                <p> VNR Vignana Jyothi Institute of Engineering & Technology <br /> Pragathi Nagar, Nizampet (S.O), Hyderabad<br /> Telangana, India - 500 090</p>
              </li>
              <li className='flex mb-4'>
                <GoMail className='mr-1 mt-2' />
                <p> gdsc.vnrvjiet@gmail.com</p>
              </li>
            </ul>
            <h5 className='text-2xl'> Connect with us</h5>
            <hr className='my-3' />
            <div className='flex space-x-3'>
              <a href="https://www.instagram.com/gdsc.vnrvjiet/" target="_blank" rel="noopener noreferrer">
                <i className="ci ci-instagram ci-xl mt-1"></i>
              </a>
              <a href="https://www.linkedin.com/company/gdsc-vnrvjiet/" target="_blank" rel="noopener noreferrer">
                <i className="ci ci-linkedin ci-xl mt-1"></i>
              </a>
            </div>
          </div>
          <div className='p-5 mt-5 rounded bg-blue-600'>
            <form onSubmit={handleSubmit(sendQuery)}>
              <div className='flex space-x-3'>
                <div className="form-group mt-4 mb-1">
                  <input 
                    type="text" 
                    className="form-control w-full outline-none border-2 border-gray-200 p-2 text-black font-medium text-sm placeholder-light-black rounded-full focus:bg-gray-200 focus:text-black" 
                    id="firstName" 
                    placeholder="First Name" 
                    {...register('firstName', { required: true })} 
                  />
                  {errors.firstName && <p className='text-red-600'>First Name is required</p>}
                </div>
                <div className="form-group mt-4 mb-1">
                  <input 
                    type="text" 
                    className="form-control w-full outline-none border-2 border-gray-200 p-2 text-black font-medium text-sm placeholder-light-black rounded-full focus:bg-gray-200 focus:text-black" 
                    id="lastName" 
                    placeholder="Last Name" 
                    {...register('lastName', { required: true })} 
                  />
                  {errors.lastName && <p className='text-red-600'>Last Name is required</p>}
                </div>
              </div>
              <div className="form-group mt-4 mb-1">
                <input 
                  type="email" 
                  className="form-control w-full outline-none border-2 border-gray-200 p-2 text-black font-medium text-sm placeholder-light-black rounded-full focus:bg-gray-200 focus:text-black" 
                  id="email" 
                  placeholder="Enter email" 
                  {...register('email', { required: true })} 
                />
                {errors.email && <p className='text-red-600'>Email is required</p>}
              </div>
              <div className="form-group mt-4 mb-1">
                <textarea 
                  className="form-control w-full outline-none border-2 border-gray-200 p-2 text-black font-medium text-sm placeholder-light-black focus:bg-gray-200 focus:text-black" 
                  id="exampleFormControlTextarea1" 
                  rows={5}
                  placeholder='Your Message' 
                  {...register('msg', { required: true, minLength: 5 })}
                ></textarea>
                {errors.msg?.type === 'required' && <p className='text-red-600'>Cannot be blank</p>}
                {errors.msg?.type === 'minLength' && <p className='text-yellow-500'>At least 5 characters</p>}
              </div>
              <button type="submit" className="btn w-full bg-white text-green-600 border-2 border-gray-200 p-2 rounded-full mt-4 hover:bg-none hover:text-black">
                Submit
              </button>
            </form>
          </div>
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
