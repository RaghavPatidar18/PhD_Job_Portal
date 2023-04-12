import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from "react-router-dom";
import axios from "axios";
import './css/Signup.css';

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const location = useLocation();
  const userType = new URLSearchParams(location.search).get("userType");

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
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <div
  className="signup-container"
  style={{
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // height: "100vh"
  }}
>

        <h1>Reset Password</h1>

        {message ? <p className="success-message">{message}</p> : ""}
        <form>
          <div className="form-group">
            <label className="form-label"
            style={{ width: "200%",
            margin: "0px -10px"}}>Email:</label>
            <input
              className="form-input"
              type="email"
              value={email}
              onChange={setVal}
              name="email"
              id="email"
              placeholder="Enter your email address"
              style={{ width: "150%",
            margin: "0px -20px"}}
            />
          </div>

          <div className="form-group">
            <button className="btn-primary" onClick={sendLink}>
              Send Link
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </>
  );
};

export default PasswordReset;
