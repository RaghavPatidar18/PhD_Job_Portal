import { useEffect, useContext, useState} from "react";
import {BrowserRouter,Routes,Route,useNavigate} from "react-router-dom";

import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Job from "./components/Job";
import JobDetails from "./components/JobDetails"
import PostJob from "./components/PostJob"
import Login from "./components/login";
import Signup from "./components/signup";
import Basic from "./components/basic";
import PasswordReset from "./components/PasswordReset";
import ForgotPassword from "./components/ForgotPassword";
import Error from "./components/Error";


function Root() {
  const [data, setData] = useState(false);
  const navigate = useNavigate();

  const ProfileValid = async () => {
    console.log("inside profilevalid");
      let token = localStorage.getItem("usersdatatoken");

      console.log(token);

      const res = await fetch("/validuser", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": token
          }
      });

      const data = await res.json();

      console.log(data);

      if (data.status == 401 || !data) {
        console.log("home page redirect")
          // navigate("/");
      } else {
          console.log("user verify");
          navigate("/profile");
      }
    }

  useEffect(() => {
      ProfileValid();
  }, [])

  return (
    <div>
      <Routes>
       <Route path="/homeinstitute" element={<><Navbar /> <Job /> </>} />
        <Route path="/homestudent" element={<><Navbar /> <Job /> </>} />
        <Route path="/profile" element={<><Navbar/> <Profile /></>}/>
        <Route path="/job-details/:id" element={<><Navbar/> <JobDetails/></> }/>
        <Route path="/job-post" element={<><Navbar/> <PostJob/></> }/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/choose-profile" element={<Basic />} /> */}
        <Route path="/job-profiles" element={<><Navbar /> <Job /> </>} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/forgotpassword/:id/:token/:usertype" element={<ForgotPassword />} />
        <Route path="/" element={<Basic />} />
        <Route path="*" element={<Error />} />
      </Routes>
      </div>
  );
}


export default function App() {

  return (
    <BrowserRouter>
      <Root />
    </BrowserRouter>
  );
  
}
