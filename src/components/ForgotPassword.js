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
        <>

            <section>
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
            </section>

        </>
    )
}

export default ForgotPassword