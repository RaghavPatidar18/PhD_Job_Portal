import { useEffect, useContext, useState} from "react";
import {BrowserRouter,Routes,Route,useNavigate,Navigate} from "react-router-dom";
// import { Parser } from "json2csv";
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
//import CustomizableForm from "./components/CustomizableForm";
import ApplicationForm from "./components/ApplicationForm";
import ApplicantDetails from "./components/ApplicantDetails";
import CommentSection from "./components/comments";
import AllExperiences from "./components/AllExperiences";
import InterviewTips from "./components/InterviewTips";
import ExpComments from "./components/ExpComment";
import NewInstitute from "./components/NewInstitute";
import AddInstitute from "./components/AddInstitute";
// import Download from "./components/download";
import CustomizableForm from "./components/CustomForm/CustomizableForm";

function Root() {
  const [data, setData] = useState(false);
  const navigate = useNavigate();
  const [user,setUser]=useState({});
  const[userType,setUserType]=useState();
  const [hasRecievedData,setHasRecievedData]=useState(false);

  const getToken = () => {
    return localStorage.getItem("usersdatatoken") || null;
  };

  const PrivateRoute = ({ children }) => {
    const isAuthenticated = getToken();

    if (isAuthenticated) {
      return children;
    }

    return <Navigate to="*" />;
  };
  // const navigate = useNavigate();
  // const location = useLocation();

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

      console.log(data);

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
          // console.log(data.userType);

          if(data.userType==="admin") navigate("/admin");

          //navigate("/profile");
      }
    }

  useEffect(() => {
      ProfileValid();
  }, [])

  return (
    <div>
      {hasRecievedData && <Routes>


       <Route path="/" element={<><Navbar user={user} type={userType}/> <Job /></>} />
      <Route path="/profile" element={<><PrivateRoute><Navbar user={user} type={userType}/> <Profile user={user.email} type={userType}/></PrivateRoute></>}/>
      <Route path="/job-details/:id" element={<><Navbar user={user} type={userType}/> <JobDetails user={user} type={userType}/></> }/>
        <Route path="/job-post" element={<><PrivateRoute><Navbar user={user} type={userType}/> <PostJob user={user} type={userType}/></PrivateRoute></> }/>
    <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/choose-profile" element={<Basic />} />
      {/* <Route path="/download" element={<Download />} /> */}
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/forgotpassword/:id/:token/:usertype" element={<ForgotPassword />}/>

      <Route path="/experiences" element={<><PrivateRoute><Navbar user={user} type={userType} /> <AllExperiences /></PrivateRoute></>} />
      <Route path="/interviewtips" element={<><PrivateRoute><Navbar user={user} type={userType}/> <InterviewTips /></PrivateRoute></>} />

        <Route path="/application/:id" element={<><PrivateRoute><Navbar user={user} type={userType}/> <AppliedJob user={user} type={userType}/></PrivateRoute></>} />
        <Route path="/job-postings" element={<><PrivateRoute><Navbar user={user} type={userType}/> <PostedJobs user={user._id} type={userType}/></PrivateRoute></>} />
        <Route path="/job-applicants/:id" element={<><PrivateRoute><Navbar user={user} type={userType}/> <JobApplicants user={user._id} type={userType}/></PrivateRoute></>} />
        <Route path="*" element={<Error />} />
        <Route path="/application-form/:job_id/:user_id" element={<><PrivateRoute><Navbar user={user} type={userType}/> <ApplicationForm type={userType}/></PrivateRoute></>} />
        <Route path="/applicant-detail/:id" element={<><PrivateRoute><Navbar user={user} type={userType}/><ApplicantDetails user={user} type={userType}/></PrivateRoute></>} />

        <Route path="/comment/:jobPostingId" element={<PrivateRoute><CommentSection /></PrivateRoute>} />
        <Route path="/allcomment/:exp_id" element={<PrivateRoute><ExpComments /></PrivateRoute>} />
        <Route path="/registerManully" element={<NewInstitute />} />
        <Route path="/admin" element={<PrivateRoute><Navbar user={user} type={userType}/><AddInstitute /></PrivateRoute>} />

        <Route path="checking" element={<><CustomizableForm /></>} />
        <Route path="/update-job/:id" element={<><Navbar user={user} type={userType}/> <PostJob user={user} type={userType}/></> }/>

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
