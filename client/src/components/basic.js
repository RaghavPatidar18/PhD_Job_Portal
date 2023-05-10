import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import "./css/Basic.css";

const Basic = () => {
  const [message, setMessage] = useState("");

  const handleLogin = (userType) => {
    window.location.href = `/login?userType=${userType}`;
  };

  return (
    <div className="wrapper">
      <div className="card">
        <div className="choose-role">Choose Your Role</div>
        <button className="button" onClick={() => handleLogin("institute")}>
          INSTITUTE
        </button>
        <button className="button" onClick={() => handleLogin("student")}>
          STUDENT
        </button>
        <button className="button" onClick={() => handleLogin("admin")}>
          ADMIN
        </button>
        {/* <button className="button" onClick={() => handleLogin("alumni")}>
          ALUMNI
        </button> */}
      </div>
      <p className="basic-p">{message}</p>
    </div>
  );
};

export default Basic;
