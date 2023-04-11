import React, { useState } from "react"; 
import axios from "axios";
import { useLocation } from "react-router-dom";
import './css/Signup.css';
import Alert from 'react-bootstrap/Alert';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const location = useLocation();
    const [showRegisteredAlert,setShowRegisteredAlert]=useState(false);
  const [showOtpSentAlert,setShowOtpSentAlert]=useState(false);
  const [showInvalidOtpAlert,setShowInvalidOtpAlert]=useState(false);
  const [showOtpFailedAlert,setShowOtpFailedAlert]=useState(false);

    const userType = new URLSearchParams(location.search).get("userType");

    const handleSendOtp = () => {
        axios.post("/api/sendOtp", { email , password , userType})
        .then((res) => {
            setMessage(res.data.message);
            console.log(res.data);
            console.log(res.data.message);
            if(res.data.message==="User already exists")
            {
              console.log("rbgiow");
              setShowRegisteredAlert(true);
              setShowOtpSentAlert(false);
              setShowInvalidOtpAlert(false);
              setShowOtpFailedAlert(false);
            }else if(res.data.message==="OTP sent"){
              setShowOtpSentAlert(true);
              setShowRegisteredAlert(false);
              setShowInvalidOtpAlert(false);
              setShowOtpFailedAlert(false);
            }else if(res.data.message==="Failed to send OTP"){
              setShowOtpFailedAlert(true);
              setShowOtpSentAlert(false);
              setShowRegisteredAlert(false);
              setShowInvalidOtpAlert(false);
            }
        })
        .catch((err)=> console.log(err));
    };

    const handleVerifyOtp = () => {
        axios.post("/api/verifyOtp", { name , email, otp , password ,userType}).then((res) => {
            setMessage(res.data.message);
            if (res.data.success) {
                window.location.href = `/login?userType=${userType}`;
            }else{
              setShowInvalidOtpAlert(true);
              setShowRegisteredAlert(false);
              setShowOtpSentAlert(false);
              setShowOtpFailedAlert(false);
            }
        });
    };

    const handlelog = () => {
        window.location.href = `/login?userType=${userType}`;
    };

    return (
        <div className="signup-container">
        {showRegisteredAlert && <Alert variant="danger" onClose={()=> {setShowRegisteredAlert(false); setName(""); setEmail(""); setPassword(""); setOtp("");}} dismissible>User already exists</Alert>}
      {showOtpSentAlert && <Alert variant="success" onClose={()=> setShowOtpSentAlert(false)} dismissible>OTP sent</Alert>}
      {showInvalidOtpAlert && <Alert variant="danger" onClose={()=> {setShowInvalidOtpAlert(false); setOtp("");}} dismissible>Invalid OTP</Alert>}
      {showOtpFailedAlert && <Alert variant="danger" onClose={()=> setShowOtpFailedAlert(false)} dismissible>Error! OTP not sent, try again!</Alert>}
            <h1>Signup</h1>

            <div className="form-group">
                <label className="form-label">Name:</label>
                <input
                    className="form-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Email Id:</label>
                <input
                    className="form-input"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label className="form-label">Password:</label>
                <input
                    className="form-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <div className="form-group">
                <button className="btn-primary" onClick={handleSendOtp}>Send OTP</button>
            </div>

            <div className="form-group">
                <label className="form-label">OTP:</label>
                <input
                    className="form-input"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
            </div>

            <div className="form-group">
                <button className="btn-primary" onClick={handleVerifyOtp}>Signup</button>
            </div>

            <div className="form-group">
                <label className="form-label">Already a user?</label>
                <button className="btn-secondary" onClick={handlelog}>Login</button>
            </div>

            //<p className="message">{message}</p>
        </div>
    );
};

export default Signup;
