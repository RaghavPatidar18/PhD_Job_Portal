import React from "react";
import JobCard from "./JobCard";
import { useState, useEffect } from "react";
import axios from 'axios';
import './css/Job.css';

import 'animate.css';
import DetailsContainer from "./DetailsContainer";

import DetailsContainer2 from "./DetailsContainer2";
import Footer from "./Footer";

function Job() {

  const [jobs, setJobs] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const [instituteFilter, setInstituteFilter] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const url = 'http://localhost:4000/';

  useEffect(() => {
    axios.get(url)
      .then((response) => {
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


    <div className="job-container">
      <h1> Find your dream job now </h1>
      <h2> 1000+ jobs for you to explore </h2>

      <div className="job-filters">
        <div className="filter-container" style={{ display: "inline-block" }}>
          

          <select
  value={locationFilter}
  onChange={handleLocationFilterChange}
>
  {locations.map((location) => (
    <option key={location} value={location}>
      {location}
    </option>
  ))}
</select>

          <select
            value={salaryFilter}
            onChange={handleSalaryFilterChange}
          >
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

          <button onClick={handleFilterApply}>Search</button>
          <button onClick={handleClearFilters}>Clear Filters</button>
        </div>
      </div>

      <div className="job-cards">
{filteredJobs.map(job => (
<JobCard
         key={job._id}
         _id={job._id}
         title={job.title}
         college={job.college}
         location={job.location}
         salary={job.salary}
       />
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

