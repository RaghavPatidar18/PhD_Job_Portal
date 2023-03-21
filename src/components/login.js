import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import './Signup.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isStudent, setIsStudent] = useState(true); // default value
  const location = useLocation();
  const userType = new URLSearchParams(location.search).get("userType");

  useEffect(() => {
    setIsStudent(userType !== "institute");
  }, [location.search]);

  const handleLogin = async () => {
    const data = await fetch("/api/login",{
      method:"POST",
      headers:{
          "Content-Type":"application/json"
      },
      body:JSON.stringify({
           email, password , userType
      })
  });

  const res = await data.json();
  //  console.log(res);

  if(res.status === 201){
    console.log("userdatatoken ki value hai : ");
    console.log(res.result.token);
      localStorage.setItem("usersdatatoken",res.result.token);
      window.location.href = isStudent ? "/homestudent" : "/homeinstitute";
      // setInpval({...inpval,email:"",password:""});
  }
  };

  

  const handlePassword = () => {
    window.location.href = `/password-reset?userType=${userType}`;
  };

  return (
    <div className="signup-container">
      <h1>Login</h1>
      <div className="form-group">
        <label className="form-label">Email:</label>
        <input
          className="form-input"
          type="email"
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
        <button className="btn-primary" onClick={handleLogin}>Login</button>
      </div>
      <div className="form-group">
        <button className="btn-primary" onClick={handlePassword}>Forgot Password</button>
      </div>
      <p className="message">{message}</p>
    </div>
  );
};

export default Login;
