import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from "react-router-dom";
import axios from "axios";
import './css/Signup.css';
import Alert from 'react-bootstrap/Alert';
import lgimage from './lgimage.jpg';

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const userType = new URLSearchParams(location.search).get("userType");
  const [emailSentAlert,setEmailSentAlert]=useState(false);
  const [emailNotSentAlert,setEmailNotSentAlert]=useState(false);
  const [invalidUserAlert,setInvalidUserAlert]=useState(false);

  const setVal = (e) => {
    setEmail(e.target.value);
  };

  const sendLink = async (e) => {
    e.preventDefault();

    if (email === "") {
      toast.error("Email is required!", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("Include @ in your email!", {
        position: "top-center",
      });
    } else {
      axios
        .post("/api/sendpasswordlink", { email, userType })
        .then((res) => {
          setMessage(res.data.message);
          if(res.status===201){
            setEmailSentAlert(true);
            setEmailNotSentAlert(false);
            setInvalidUserAlert(false);
            setTimeout(()=>{
              setEmailSentAlert(false);
            },3000);
          }else if(res.data.message==="email not send"){
            setEmailNotSentAlert(true);
            setEmailSentAlert(false);
            setInvalidUserAlert(false);
            setTimeout(()=>{
              setEmailNotSentAlert(false);
            },3000);
          }else if(res.data.message==="invalid user"){
            setInvalidUserAlert(true);
            setEmailSentAlert(false);
            setEmailNotSentAlert(false);
            setTimeout(()=>{
              setInvalidUserAlert(false);
            },3000);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
    {emailSentAlert &&

        <div class="w-full text-white bg-green-500">
            <div class="container flex items-center justify-between px-6 py-4 mx-auto">
                <div class="flex">
                    <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
                        <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z">
                        </path>
                    </svg>

                    <p class="mx-3">Email has been sent!</p>
                </div>

                <button onClick={() => { setEmailSentAlert(false); }} class="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none" style={{ backgroundColor: 'transparent' }}>
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>

    }

    {emailNotSentAlert &&

        <div class="w-full text-white bg-red-500">
            <div class="container flex items-center justify-between px-6 py-4 mx-auto">
                <div class="flex">
                    <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
                        <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z">
                        </path>
                    </svg>

                    <p class="mx-3">Error in sending email, try again later!</p>
                </div>

                <button onClick={() => { setEmailNotSentAlert(false); }} class="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none" style={{ backgroundColor: 'transparent' }}>
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>

    }

    {invalidUserAlert &&

        <div class="w-full text-white bg-red-500">
            <div class="container flex items-center justify-between px-6 py-4 mx-auto">
                <div class="flex">
                    <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
                        <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z">
                        </path>
                    </svg>

                    <p class="mx-3">Error! User does not Exist.</p>
                </div>

                <button onClick={() => { setInvalidUserAlert(false); }} class="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none" style={{ backgroundColor: 'transparent' }}>
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </div>

    }
    <div style={{marginTop:'170px'}}>
    <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
      <div className="hidden bg-cover lg:block lg:w-1/2" style={{ backgroundImage: `url(${lgimage})`, backgroundSize: '100%' }}></div>
      <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <div class="flex justify-center mx-auto">
          <img class="w-auto h-7 sm:h-8" src="https://upload.wikimedia.org/wikipedia/en/f/f9/Indian_Institute_of_Technology_Ropar_logo.png" alt=""/>
        </div>
        <p class="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Reset Password
        </p>

        <div class="mt-4">
            <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="LoggingEmailAddress">Email Address</label>
            <input
            id="LoggingEmailAddress"
            class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
            type="email"
            value={email}
            onChange={setVal} />
        </div>

        <div class="mt-6">
            <button onClick={sendLink} class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Send Link
            </button>
        </div>
      </div>
    </div>

    </div>
    </>
  );
};

export default PasswordReset;
