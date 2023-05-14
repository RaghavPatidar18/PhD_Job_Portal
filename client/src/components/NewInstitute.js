
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";



export default function NewInstitute(props) {

    const [username, setUserName] = useState('');
    const [emailid, setEmailId] = useState('');
    // const [password, setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState(''); 
    const [year, setYear] = useState('');
    const [phone, setPhone] = useState('');


    // const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        // create an object containing the form data
        const formData = {
            username,
            email: emailid,
            companyName,
            location,
            year,
            phone
        }; 

        axios.post("/api/registerInstitute", { formData })
        .then((res) => {
          if (res.data.message === "Request Succesfull") {
            alert("Registration successful!");
            window.location.href = "/";
          } else if (res.data.message === "Request Failed" || res.data.message === "User already exists") {
            alert("Already registered institute. Please with different email.");
            window.location.href = "/";
          }
        })
        .catch((err) => console.log(err));
      

    };



    return (

        <> 
            <div>
                <section style={{marginTop : '10rem', height :'70vh'}} class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800" >
                    <h2>Registeration</h2>
                    <form  onSubmit={handleSubmit}>
                        <div style={{ height :'100%'}} className="shadow overflow-hidden lg:rounded-md">
                            <div className="px-10 py-10 bg-white sm:p-10">
                                <div className="grid grid-cols-6 gap-6">
                                    {/* Student's Name */}
                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Email ID
                                        </label>
                                        <input
                                            type="text" 
                                            name="email"
                                            placeholder="Email"
                                            id="email"
                                            onChange={(e) => setEmailId(e.target.value)}
                                            required
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            style={{height: "40px"}}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="username"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Username
                                            <span style={{ color: "#ff0000" }}> *</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Username"
                                            id="username"
                                            onChange={(e) => setUserName(e.target.value)}
                                            required
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            style={{height: "40px"}}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="companyname"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Company Name
                                            <span style={{ color: "#ff0000" }}> *</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="companyname"
                                            placeholder="Company Name"
                                            onChange={(e) => setCompanyName(e.target.value)}
                                            id="companyname"
                                            required
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            style={{height: "40px"}}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="location"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Location
                                            <span style={{ color: "#ff0000" }}> *</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="location"
                                            placeholder="Location"
                                            onChange={(e) => setLocation(e.target.value)}
                                            id="location"
                                            required
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            style={{height: "40px"}}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Phone Number
                                            <span style={{ color: "#ff0000" }}> *</span>
                                        </label>
                                        <input
                                            type="text"
                                            onChange={(e) => setPhone(e.target.value)}
                                            name="phone"
                                            id="phone"
                                            placeholder="10 digit number"
                                            required
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            style={{height: "40px"}}
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label
                                            htmlFor="yearoe"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Year Of Establishment
                                        </label>
                                        <input
                                            type="text"
                                            onChange={(e) => setYear(e.target.value)}
                                            name="yearoe"
                                            id="yearoe"
                                            placeholder="Year of Establishment"
                                            required
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                            style={{height: "40px"}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center mt-4 space-x-2 rounded-b border-gray-200 dark:border-gray-600">
                        </div>

                        <div className="text-center">
  <button
    style={{
      backgroundColor: "#1f2937",
    }}
    type="submit"
    className="text-white focus:outline-none bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{marginTop:"20px"}}
  >
    Submit
  </button>
</div>

                    </form>
                    


                    {/* <form onSubmit={handleSubmit}>
                        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label style={{ fontSize: '25px' }} class="text-gray-700 dark:text-gray-200" for="username">Username</label>
                                <input id="username" type="text" required value={username} onChange={(e) => setUserName(e.target.value)} style={{ height: '3rem', fontSize: '18px' }} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label style={{ fontSize: '25px' }} class="text-gray-700 dark:text-gray-200" for="emailAddress">Email Address</label>
                                <input id="emailAddress" type="email" required value={emailid} onChange={(e) => setEmailId(e.target.value)} style={{ height: '3rem', fontSize: '18px' }} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label style={{ fontSize: '25px' }} class="text-gray-700 dark:text-gray-200" for="password">Password</label>
                                <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ height: '3rem', fontSize: '18px' }} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label style={{ fontSize: '25px' }} class="text-gray-700 dark:text-gray-200" for="username">Company Name</label>
                                <input id="companyName" type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{ height: '3rem' }} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label style={{ fontSize: '25px' }} class="text-gray-700 dark:text-gray-200" for="username">Location</label>
                                <input id="location" type="text" required value={location} onChange={(e) => setLocation(e.target.value)} style={{ height: '3rem', fontSize: '18px' }} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label style={{ fontSize: '25px' }} class="text-gray-700 dark:text-gray-200" for="username">Year of Establishment</label>
                                <input id="year" type="text" required value={year} onChange={(e) => setYear(e.target.value)} style={{ height: '3rem', fontSize: '18px' }} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                        </div>
                        <br></br>

                        <div class="flex justify-end mt-6">
                            <button style={{ height: '3rem', fontSize: '18px' }} class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Submit</button>
                        </div>
                    </form> */}
                </section>
            </div>
        </>
    );
}
