import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
// import Box from '@mui/material/Box';
// import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {

    const { id, token , usertype } = useParams();

    const history = useNavigate();

    const [data2, setData] = useState(false);

    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

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
                        setMessage(true);
                    } else {
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
        <div style={{marginTop:'150px'}}>
        <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
          <div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1606660265514-358ebbadc80d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1575&q=80")'}}></div>
          <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <div class="flex justify-center mx-auto">
              <img class="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
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
    )
}

export default ForgotPassword
