import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// import Box from '@mui/material/Box';
// import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from "react-router-dom";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';
import lgimage from './lgimage.jpg';

const ForgotPassword = () => {

    const { id, token , usertype } = useParams();

    const history = useNavigate();

    const [data2, setData] = useState(false);

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");
    const [passwordResetAlert,setPasswordResetAlert]=useState(false);
    const [expiredAlert,setExpiredAlert]=useState(false);

    const location = useLocation();
    // const userType = new URLSearchParams(location.search).get("userType");

    const userValid = async () => {

        console.log(usertype);

        axios
            .get(`/api/forgotpassword/${id}/${token}/${usertype}`, { usertype })
            .then((res) => {
                setMessage(res.data.message);
                if (res.data.status == 201) {
                    console.log("user valid")
                } else {
                    console.log("user Invalid")
                }
            })
            .catch((err) => console.error(err));
    }


    const setval = (e) => {
        setPassword(e.target.value)
    }

    const sendpassword = async (e) => {
        e.preventDefault();

        if (password === "") {
            toast.error("password is required!", {
                position: "top-center"
            });
        } else {

            axios
                .post(`/api/${id}/${token}/${usertype}`, { password, usertype })
                .then((res) => {
                    setMessage(res.data.message);
                    if (res.data.status == 201) {
                        setPassword("");
                        setPasswordResetAlert(true);
                        setExpiredAlert(false);
                        window.location.href="/";
                        setMessage(true);
                    } else {
                      setExpiredAlert(true);
                      setPasswordResetAlert(false);
                        console.log("user Invalid");
                        toast.error("! Token Expired generate new LInk", {
                            position: "top-center"
                        })
                    }
                })
                .catch((err) => console.error(err));
        }
    }

    useEffect(() => {
        userValid()
        // setTimeout(() => {
        //     setData(true)
        // }, 3000)
    }, [])

    return (
      <>
      {passwordResetAlert &&

          <div class="w-full text-white bg-green-500">
              <div class="container flex items-center justify-between px-6 py-4 mx-auto">
                  <div class="flex">
                      <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
                          <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z">
                          </path>
                      </svg>

                      <p class="mx-3">Password has been reset!</p>
                  </div>

                  <button onClick={() => { setPasswordResetAlert(false); }} class="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none" style={{ backgroundColor: 'transparent' }}>
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                  </button>
              </div>
          </div>

      }

      {expiredAlert &&

          <div class="w-full text-white bg-green-500">
              <div class="container flex items-center justify-between px-6 py-4 mx-auto">
                  <div class="flex">
                      <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
                          <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z">
                          </path>
                      </svg>

                      <p class="mx-3">Link has expired!</p>
                  </div>

                  <button onClick={() => { setExpiredAlert(false); }} class="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none" style={{ backgroundColor: 'transparent' }}>
                      <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                  </button>
              </div>
          </div>

      }
        <div style={{marginTop:'150px'}}>
        <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
          <div className="hidden bg-cover lg:block lg:w-1/2"style={{ backgroundImage: `url(${lgimage})`, backgroundSize: '100%' }}></div>
          <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div class="flex justify-center mx-auto">
              <img class="w-auto h-7 sm:h-8" src="https://upload.wikimedia.org/wikipedia/en/f/f9/Indian_Institute_of_Technology_Ropar_logo.png" alt=""/>
            </div>
            <p class="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                Reset Password
            </p>

            <div class="mt-4">
                <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="LoggingEmailAddress">New Password</label>
                <input
                id="LoggingEmailAddress"
                class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
                value={password}
                onChange={setval} />
            </div>

            <div class="mt-6">
                <button onClick={sendpassword} class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                    Set Password
                </button>
            </div>

            <div class="flex items-center justify-between mt-4">
                <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                <a href="/login" class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">Login</a>

                <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
          </div>
        </div>

            {/*<section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Enter Your NEW Password</h1>
                    </div>

                    <form>
                        {message ? <p style={{ color: "green", fontWeight: "bold" }}>Password Succesfulyy Update </p> : ""}
                        <div className="form_input">
                            <label htmlFor="password">New password</label>
                            <input type="password" value={password} onChange={setval} name="password" id="password" placeholder='Enter Your new password' />
                        </div>

                        <button className='btn' onClick={sendpassword}>Send</button>
                    </form>
                    <p><NavLink to="/login">Home</NavLink></p>
                    <ToastContainer />
                </div>
            </section>*/}

        </div>
        </>
    )
}

export default ForgotPassword
