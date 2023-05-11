import React from "react";
import JobCard from "./JobCard";
import { useState, useEffect } from "react";
import axios from 'axios';
import './css/Job.css';
// import React from 'react';
import Slider from "react-slick";
import './css/DetailsContainer.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import 'animate.css';
import DetailsContainer from "./DetailsContainer";

import DetailsContainer2 from "./DetailsContainer2";
import Footer from "./Footer";
import locate from './Location.png'; // import the image file



function Job() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000 // set the time between each slide transition to 3 seconds (3000 milliseconds)
  };
  const [jobs, setJobs] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const [instituteFilter, setInstituteFilter] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  // const url = '/';

  useEffect(() => {
    axios.get("/getjobs")
      .then((response) => {
        console.log(response);
        setJobs(response.data.jobDetails);
        setFilteredJobs(response.data.jobDetails);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLocationFilterChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleSalaryFilterChange = (event) => {
    setSalaryFilter(event.target.value);
  };

  const handleInstituteFilterChange = (event) => {
    setInstituteFilter(event.target.value);
  };

  const handleFilterApply = () => {
    // Create a copy of the original jobs array
    let filteredJobs = [...jobs];

    // Apply location filter if it is not empty
    if (locationFilter.trim() !== "") {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.location.toLowerCase().indexOf(locationFilter.toLowerCase()) !== -1
      );
    }

    // Apply salary filter if it is not empty
    if (salaryFilter !== "") {
      const salaryRange = salaryFilter.split("-");
      const minSalary = parseInt(salaryRange[0]);
      const maxSalary = parseInt(salaryRange[1]);
      filteredJobs = filteredJobs.filter(
        (job) => job.salary >= minSalary && job.salary <= maxSalary
      );
    }

    // Apply institute filter if it is not empty
    if (instituteFilter.trim() !== "") {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.college.toLowerCase().indexOf(instituteFilter.toLowerCase()) !== -1
      );
    }

    // Update the state with the filtered jobs
    setFilteredJobs(filteredJobs);
  };

  const handleClearFilters = () => {
    setLocationFilter("");
    setSalaryFilter("");
    setInstituteFilter("");
    setFilteredJobs(jobs);
  }


  const locations = [
    "All Locations",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"
  ];


  const institutes = [
    "All Institutes",
    "IIT Bombay",
    "IIT Delhi",
    "IIT Madras",
    "IIT Kharagpur",
    "IIT Kanpur",
    "IIT Roorkee",
    "IIT Guwahati",
    "IIT BHU Varanasi",
    "IIT Hyderabad",
    "IIT Gandhinagar",
    "IIT Patna",
    "IIT Bhubaneswar",
    "IIT Jodhpur",
    "IIT Ropar",
    "IIT Indore",
    "IIT Mandi",
    "IIT Palakkad",
    "IIT Tirupati",
    "IIT Dharwad",
    "IIT Goa",
    "IISc Bangalore",
    "NIT Tiruchirappalli",
    "NIT Surathkal",
    "NIT Warangal",
    "NIT Calicut",
    "NIT Allahabad",
    "NIT Delhi",
    "BITS Pilani",
    "BITS Mesra",
    "BITS Hyderabad",
    "BITS Goa",
    "BITS Dubai"
  ];



  return (
    <>

      <DetailsContainer />




      <section class="dd">
        <div class="cc">
          {/* <h2 class="text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
              1000+ jobs for you to explore
            </h2> */}



          <div className="filter-container job-filters" >

            <select
              value={locationFilter}
              onChange={handleLocationFilterChange}
            >

              {locations?.map((location) => (
                <option key={location} value={location}>

                  {location}
                </option>
              ))}
            </select>



            <select
              value={salaryFilter}
              onChange={handleSalaryFilterChange}
            >
              <img src={locate} alt="My Image" style={{ height: '35px', marginRight: '40px' }} />
              <option value="">All Salary Ranges</option>
              <option value="0-9999">Less than 10,000</option>
              <option value="10000-29999">10,000 - 29,999</option>
              <option value="30000-49999">30,000 - 49,999</option>
              <option value="50000-99999">50,000 - 99,999</option>
              <option value="100000-999999">More than 100,000</option>
            </select>

            <select value={instituteFilter} onChange={handleInstituteFilterChange}>
              {institutes.map((institute) => (
                <option key={institute} value={institute}>
                  {institute}
                </option>
              ))}
            </select>

            <div class="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:-mx-2">
              <button onClick={handleFilterApply}
                class="px-6 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg focus:ring focus:ring-blue-300 focus:ring-opacity-80 fo sm:mx-2 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                style={{ background: "#007FFF", borderRadius: "20px" }}>
                Search
              </button>

              <button onClick={handleClearFilters} class="px-6 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg focus:ring focus:ring-blue-300 focus:ring-opacity-80 fo sm:mx-2 hover:bg-blue-500 focus:outline-none focus:bg-blue-500" style={{ backgroundColor: "rgba(255, 0, 0, 0.6)", borderRadius: "20px" }}>
                Clear Filters
              </button>


            </div>

          </div>


        </div>
      </section>

      <div className="job-container">


        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gridAutoRows: "350px", // Replace 350px with the height of your job card
          gridAutoFlow: "dense",
          gap: "100px",
          padding: "0 100px",
          marginTop: "60px",

          '@media (max-width: 767px)': {
            padding: "0px"
          }

        }}>
          {filteredJobs?.map(job => (
            <div key={job._id} style={{ display: job.deleted ? 'none' : 'block' }}>
              <JobCard
                _id={job._id}
                title={job.title}
                college={job.college}
                location={job.location}
                salary={job.salary}
                lastDate={job.lastDate}
                deleted={job.deleted}
                description={job.description}
              />
            </div>
          ))}
        </div>







      </div>
      <br></br>
      <br></br>
      <br></br>


      <DetailsContainer2 />


      <br></br>

      <br></br>
      <br></br>


      <Footer />

    </>
  );
}

export default Job;
