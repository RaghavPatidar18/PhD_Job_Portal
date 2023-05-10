import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
//import './css/Signup.css';
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
  const [randomotp, setRandomOtp] = useState("");

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
              setRandomOtp(res.data.otp);
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
        axios.post("/api/verifyOtp", { name , email, otp , password ,userType , randomotp}).then((res) => {
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
      <>
      {showRegisteredAlert &&

        <div class="w-full text-white bg-red-500">
      <div class="container flex items-center justify-between px-6 py-4 mx-auto">
          <div class="flex">
              <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
                  <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z">
                  </path>
              </svg>

              <p class="mx-3">Error! User already exists!</p>
          </div>

          <button onClick={()=> {setShowRegisteredAlert(false); setName(""); setEmail(""); setPassword(""); setOtp("");}} class="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none" style={{backgroundColor:'transparent'}}>
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
          </button>
      </div>
  </div>}

    {showOtpSentAlert &&
      <div class="w-full text-white bg-emerald-500">
      <div class="container flex items-center justify-between px-6 py-4 mx-auto">
          <div class="flex">
              <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
                  <path d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z">
                  </path>
              </svg>

              <p class="mx-3">OTP sent successfully!</p>
          </div>

          <button onClick={()=> setShowOtpSentAlert(false)} class="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none" style={{backgroundColor:'transparent'}}>
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
          </button>
      </div>
  </div>}
    {showInvalidOtpAlert &&
      <div class="w-full text-white bg-red-500">
    <div class="container flex items-center justify-between px-6 py-4 mx-auto">
        <div class="flex">
            <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
                <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z">
                </path>
            </svg>

            <p class="mx-3">Error! Invalid OTP!</p>
        </div>

        <button onClick={()=> {setShowInvalidOtpAlert(false); setOtp("");}} class="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none" style={{backgroundColor:'transparent'}}>
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </div>
</div>}
    {showOtpFailedAlert &&
      <div class="w-full text-white bg-red-500">
    <div class="container flex items-center justify-between px-6 py-4 mx-auto">
        <div class="flex">
            <svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
                <path d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z">
                </path>
            </svg>

            <p class="mx-3">Error! OTP not sent, try again!</p>
        </div>

        <button onClick={()=> setShowOtpFailedAlert(false)} class="p-1 transition-colors duration-300 transform rounded-md hover:bg-opacity-25 hover:bg-gray-600 focus:outline-none" style={{backgroundColor:'transparent'}}>
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    </div>
</div>}
  <div style={{marginTop:'70px', marginBottom:'70px'}}>
      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div className="hidden bg-cover lg:block lg:w-1/2" style={{backgroundImage: 'url("https://skilloutlook.com/wp-content/uploads/2020/10/IIT-Ropar-06-Oct-2020.jpg")'}}></div>
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div class="flex justify-center mx-auto">
            <img class="w-auto h-7 sm:h-8" src="https://upload.wikimedia.org/wikipedia/en/f/f9/Indian_Institute_of_Technology_Ropar_logo.png" alt="" />
          </div>
          <p class="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
              Welcome!
          </p>
          <a href="#" class="flex items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
              <div class="px-4 py-2">
                  <svg class="w-6 h-6" viewBox="0 0 40 40">
                      <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#FFC107" />
                      <path d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z" fill="#FF3D00" />
                      <path d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z" fill="#4CAF50" />
                      <path d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z" fill="#1976D2" />
                  </svg>
              </div>

              <span class="w-5/6 px-4 py-3 font-bold text-center">Sign up with Google</span>
<<<<<<< HEAD
              
=======
              {/*<a href="/auth/google">Login/Signup with Google</a>*/}
>>>>>>> 8b9aa458e952b44e1792273df06fd5f9f002caf0

          </a>
          <div class="flex items-center justify-between mt-4">
              <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

              <a href="#" class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">or signup
                  with email</a>

              <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

<br></br>
          <div style={{float : 'right'}}>
      {userType === "institute" && (
        <a href="/registerManully">Not .ac.in or .edu ?</a>
      )}
      {/* rest of the component */}
    </div>

          <div class="mt-4">
              <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="username">Username</label>
              <input
              id="username"
              name = "username"
              class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}/>
          </div>

          <div class="mt-4">
              <div class="flex justify-between">
                  <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="email">Email Address</label>
              </div>

              <input
              id="email"
              name = "email"
              class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}/>
          </div>



          <div class="mt-4">
              <div class="flex justify-between">
                  <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="loggingPassword">Password</label>
              </div>

              <input
              id="loggingPassword"
              class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div class="mt-6">
              <button onClick={handleSendOtp} class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Send Otp
              </button>
          </div>

          <div class="mt-4">
              <div class="flex justify-between">
                  <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" for="loggingOtp">OTP</label>
              </div>

              <input
              id="loggingOtp"
              class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="number"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}/>
          </div>

          <div class="mt-6">
              <button onClick={handleVerifyOtp} class="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                  Signup
              </button>
          </div>


          <div class="flex items-center justify-between mt-4">
              <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

              <a onClick={handlelog} class="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline">Already a user? Sign in</a>

              <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>


        </div>
      </div>

        </div>
        </>
    );
};

export default Signup;
