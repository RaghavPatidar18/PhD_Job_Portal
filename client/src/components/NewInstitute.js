
import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useHistory } from "react-router-dom";



export default function NewInstitute(props) {

    const [username, setUserName] = useState('');
    const [emailid, setEmailId] = useState('');
    const [password,setPassword] = useState('');
    const [companyName, setCompanyName] = useState('');
    const [location, setLocation] = useState('');
    const [year, setYear] = useState('');


    // const history = useHistory();

    const handleSubmit = async (event) => {
        // event.preventDefault(); // prevent default form submission behavior
      
        // create an object containing the form data
        const formData = {
            username,
            email: emailid,
            password,
            companyName,
            location,
            year,
          };
      
          try {
            const response = await axios.post(
              "/api/registerInstitute",
              formData
            );
            console.log(response.data);
            alert("Registration successful!");
            window.location.href = "/";
          } catch (error) {
            console.log(error);
            alert("Error registering institute. Please try again later.");
            window.location.href = "*";
          }
      
        
      };
      


    return (

        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800" >
                    <h2 style={{ fontSize: '30px' }} class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Registeration</h2>

                    <form onSubmit={handleSubmit}>
                        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label style={{ fontSize: '25px' }} class="text-gray-700 dark:text-gray-200" for="username">Username</label>
                                <input id="username" type="text" required value={username} onChange={(e) => setUserName(e.target.value)} style={{ height: '3rem',fontSize: '18px' }} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label style={{ fontSize: '25px' }} class="text-gray-700 dark:text-gray-200" for="emailAddress">Email Address</label>
                                <input id="emailAddress" type="email" required value={emailid} onChange={(e) => setEmailId(e.target.value)} style={{ height: '3rem' ,fontSize: '18px'}}  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label style={{ fontSize: '25px' }} class="text-gray-700 dark:text-gray-200" for="password">Password</label>
                                <input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} style={{ height: '3rem' ,fontSize: '18px'}}  class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label style={{ fontSize: '25px' }} class="text-gray-700 dark:text-gray-200" for="username">Company Name</label>
                                <input id="companyName" type="text" required value={companyName} onChange={(e) => setCompanyName(e.target.value)} style={{ height: '3rem'}} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label style={{ fontSize: '25px' }} class="text-gray-700 dark:text-gray-200" for="username">Location</label>
                                <input id="location" type="text" required value={location} onChange={(e) => setLocation(e.target.value)} style={{ height: '3rem',fontSize: '18px' }} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                            <div>
                                <label style={{ fontSize: '25px' }} class="text-gray-700 dark:text-gray-200" for="username">Year of Establishment</label>
                                <input id="year" type="text" required value={year} onChange={(e) => setYear(e.target.value)} style={{ height: '3rem',fontSize: '18px' }} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                            </div>

                        </div>
                        <br></br>
                       
                        <div class="flex justify-end mt-6">
                            <button style={{ height: '3rem',fontSize: '18px' }} class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Submit</button>
                        </div>
                    </form>
                </section>
            </div>
        </>
    );
}
