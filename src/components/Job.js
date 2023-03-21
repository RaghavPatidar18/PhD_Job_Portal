import React from "react";
import JobCard from "./JobCard";
import { useState, useEffect } from "react";
import axios from 'axios';
import './Job.css';

import 'animate.css';

function Job() {

  const [jobs, setJobs] = useState([]);
  const [locationFilter, setLocationFilter] = useState("");
  const [salaryFilter, setSalaryFilter] = useState("");
  const url = 'http://localhost:4000/';

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setJobs(response.data.jobDetails);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleLocationFilterChange = (event) => {
    setLocationFilter(event.target.value);
  };

  const handleSalaryFilterChange = (event) => {
    setSalaryFilter(event.target.value);
  };

  const filteredJobs = jobs.filter((job) => {
    if (locationFilter && job.location.toLowerCase().indexOf(locationFilter.toLowerCase()) === -1) {
      return false;
    }
    if (salaryFilter) {
      const salaryRange = salaryFilter.split("-");
      const minSalary = parseInt(salaryRange[0]);
      const maxSalary = parseInt(salaryRange[1]);
      if (job.salary < minSalary || job.salary > maxSalary) {
        return false;
      }
    }
    return true;
  });

  return (
    <div className="job-container">
      <h2 style={{
    fontFamily: "Times New Roman, serif",
    fontWeight: "bold",
    fontSize: "48px",
    color: "#0077B6",
    textAlign: "center",
    textShadow: "1px 1px 1px #fff",
    letterSpacing: "2px",
    lineHeight: "1.5"
}}>Latest Job Openings</h2>
      <div className="job-filters">
      <div className="filter-container" style={{ display: "inline-block" }}>
  <h3 style={{
    display: "inline-block",
    marginRight: "20px",
    color: "#2c3e50",
    fontFamily: "Helvetica, Arial, sans-serif",
    fontWeight: "bold",
    fontSize: "1.5rem"
  }}>Filter</h3>

  <input
    type="text"
    placeholder="Location"
    value={locationFilter}
    onChange={handleLocationFilterChange}
    style={{
      width: "150px",
      marginLeft: "20px",
      fontFamily: "Helvetica, Arial, sans-serif",
      fontSize: "1rem",
      padding: "5px",
      border: "2px solid #ddd",
      borderRadius: "5px"
    }}
  />

  <select
    value={salaryFilter}
    onChange={handleSalaryFilterChange}
    style={{
      marginLeft: "20px",
      fontFamily: "Helvetica, Arial, sans-serif",
      fontSize: "1rem",
      padding: "5px",
      border: "2px solid #ddd",
      borderRadius: "5px",
      color: "#2c3e50",
      fontWeight: "bold"
    }}
  >
    <option value="">All Salary Ranges</option>
    <option value="0-9999">Less than 10,000</option>
    <option value="10000-29999">10,000 - 29,999</option>
    <option value="30000-49999">30,000 - 49,999</option>
    <option value="50000-99999">50,000 - 99,999</option>
    <option value="100000-999999">More than 100,000</option>
  </select>
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

    </div>);
}

export default Job;
