import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "./css/Basic.css";

const Basic = () => {
  const [message, setMessage] = useState("");

  const handleSignup = (userType) => {
    window.location.href = `/signup?userType=${userType}`;
  };

  return (
    <div className="wrapper">
      <div className="card">
        <div className="choose-role">Choose Your Role</div>
        <button className="button" onClick={() => handleSignup("institute")}>
          INSTITUTE
        </button>
        <button className="button" onClick={() => handleSignup("student")}>
          STUDENT
        </button>
      </div>
      <p>{message}</p>
    </div>
  );
};

export default Basic;
