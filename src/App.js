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
import AppliedJob from "./components/AppliedJob";
import PostedJobs from "./components/PostedJobs";
import JobApplicants from "./components/JobApplicants";
import CustomizableForm from "./components/CustomizableForm";
import ApplicationForm from "./components/ApplicationForm";
import ApplicantDetails from "./components/ApplicantDetails";


function Root() {
  const [data, setData] = useState(false);
  const navigate = useNavigate();
  const [user,setUser]=useState({});
  const[userType,setUserType]=useState();
  const [hasRecievedData,setHasRecievedData]=useState(false);

  const ProfileValid = async () => {
    //console.log("inside profilevalid");
      let token = localStorage.getItem("usersdatatoken");

      //console.log(token);

      const res = await fetch("/validuser", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": token
          }
      });

      const data = await res.json();

      //console.log(data);

      if (data.status == 401 || !data) {
        console.log("home page redirect");
        setUser({});
        setUserType("");
        setHasRecievedData(true);
        //  navigate("/");
      } else {
          console.log("user verify");
          setUser(data.ValidUserOne);
          setUserType(data.userType);
          setHasRecievedData(true);
          //console.log(data.userType);

          //navigate("/profile");
      }
    }

  useEffect(() => {
      ProfileValid();
  }, [])

  return (
    <div>
      {hasRecievedData && <Routes>


       <Route path="/" element={<><Navbar user={user} type={userType}/> <Job /> </>} />
      <Route path="/profile" element={<><Navbar user={user} type={userType}/> <Profile user={user} type={userType}/></>}/>
      <Route path="/job-details/:id" element={<><Navbar user={user} type={userType}/> <JobDetails user={user} type={userType}/></> }/>
        <Route path="/job-post" element={<><Navbar user={user} type={userType}/> <PostJob user={user} type={userType}/></> }/>
    <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/choose-profile" element={<Basic />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/forgotpassword/:id/:token/:usertype" element={<ForgotPassword />} />


        <Route path="/application/:id" element={<><Navbar user={user} type={userType}/> <AppliedJob user={user} type={userType}/></>} />
        <Route path="/job-postings" element={<><Navbar user={user} type={userType}/> <PostedJobs user={user._id} type={userType}/></>} />
        <Route path="/job-applicants/:id" element={<><Navbar user={user} type={userType}/> <JobApplicants user={user._id} type={userType}/></>} />
        <Route path="*" element={<Error />} />
        <Route path="/application-form/:job_id/:user_id" element={<><Navbar user={user} type={userType}/> <ApplicationForm type={userType}/></>} />
        <Route path="/applicant-detail/:id" element={<><Navbar user={user} type={userType}/><ApplicantDetails user={user} type={userType}/></>} />

      </Routes>}
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
