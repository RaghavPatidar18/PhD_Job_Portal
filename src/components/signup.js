import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import './Signup.css';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const location = useLocation();
    
    const userType = new URLSearchParams(location.search).get("userType");

    const handleSendOtp = () => {
        axios.post("/api/sendOtp", { email , password , userType}).then((res) => {
            setMessage(res.data.message);
        });
    };

    const handleVerifyOtp = () => {
        axios.post("/api/verifyOtp", { name , email, otp , password ,userType}).then((res) => {
            setMessage(res.data.message);
            if (res.data.success) {
                window.location.href = `/login?userType=${userType}`;
            }
        });
    };

    const handlelog = () => {
        window.location.href = `/login?userType=${userType}`;
    };

    return (
        <div className="signup-container">
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

            <p className="message">{message}</p>
        </div>
    );
};

export default Signup;
