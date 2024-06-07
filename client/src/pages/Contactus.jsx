import React, { useState } from 'react';
import axios from 'axios';
import { CiLocationOn } from "react-icons/ci";
import { GoMail } from "react-icons/go";
import { useForm } from 'react-hook-form';
import './Contactus.css'

const API_URL = process.env.REACT_APP_BACK_URL;

const Contactus = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const handleCloseSuccess = () => setShowSuccess(false);
  const handleCloseFailure = () => setShowFailure(false);

  const sendQuery = async (queryData) => {
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

  const TailwindModal = ({ show, handleClose, title, body }) => {
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
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
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
    <div className='container w-75 h-75 my-auto bg-light'>
      <div className='p-1'></div>
      <div className='rounded-lg'>
        <div className='row mt-5 my-auto'>
          <div className='col-lg-6 p-5 rounded bg-white mt-5'>
            <h3 className='display-3'>Contact us</h3>
            <p className='lead'>Our Details</p>
            <ul className='list-unstyled'>
              <li className='d-flex'>
                <CiLocationOn className='me-1 mt-1' />
                <p> VNR Vignana Jyothi Institute of Engineering & Technology <br /> Pragathi Nagar, Nizampet (S.O), Hyderabad<br /> Telangana, India - 500 090</p>
              </li>
              <br />
              <li className='d-flex'>
                <GoMail className='me-1 mt-2' />
                <p> gdsc.vnrvjiet@gmail.com</p>
              </li>
            </ul>
            <br />
            <h5 className='fs-3 lead'> Connect with us</h5>
            <hr className='mt-1 mb-3' />
            <div className='d-flex'>
              <a href="https://www.instagram.com/gdsc.vnrvjiet/" target="_blank" rel="noopener noreferrer">
                <i className="ci ci-instagram ci-xl mt-1"></i>
              </a>
              <a href="https://www.linkedin.com/company/gdsc-vnrvjiet/" target="_blank" rel="noopener noreferrer">
                <i className="ci ci-linkedin ci-xl mt-1 ms-3"></i>
              </a>
            </div>
          </div>
          <div className='col-lg-6 p-5 mt-5 bg-success'>
            <form onSubmit={handleSubmit(sendQuery)}>
              <div className='d-flex'>
                <div className="form-group mt-4 mb-1 me-3">
                  <input type="text" className="contact-input form-control" id="firstName" placeholder="First Name" {...register('firstName', { required: true })} />
                  {errors.firstName?.type === 'required' && <p className='text-danger lead'>First Name is required</p>}
                </div>
                <div className="form-group mt-4 mb-1">
                  <input type="text" className="contact-input form-control" id="lastName" placeholder="Last Name" {...register('lastName', { required: true })} />
                  {errors.lastName?.type === 'required' && <p className='text-danger lead'>Last Name is required</p>}
                </div>
              </div>
              <div className="form-group mt-4 mb-1">
                <input type="email" className="contact-input form-control" id="email" placeholder="Enter email" {...register('email', { required: true })} />
                {errors.email?.type === 'required' && <p className='text-danger lead'>Email is required</p>}
              </div>
              <div className="form-group mt-4 mb-1">
                <textarea className="form-control contact-input" id="exampleFormControlTextarea1" rows="5" placeholder='Your Message' {...register('msg', { required: true, minLength: 5 })}></textarea>
                {errors.msg?.type === 'required' && <p className='text-danger lead'>Cannot be blank</p>}
                {errors.msg?.type === 'minLength' && <p className='text-warning lead'>At least 5 characters</p>}
              </div>
              <button type="submit" className="btn w-50 contact-btn mt-4 d-block">Submit</button>
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
