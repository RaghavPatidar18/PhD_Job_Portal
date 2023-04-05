import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import "./PostJob.css";
import { useNavigate , useLocation } from 'react-router-dom';
import CustomizableForm from "./CustomizableForm.js";

function PostJob({user,type}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [college, setCollege] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [jobs, setJobs] = useState([]);
  const [showCustomForm,setShowCustomForm]=useState(false);

const history=useNavigate();

  useEffect(()=> {
    if(type!="institute"){
      history("*");
    }
  })

  function handleSubmit(personalData,educationData,experienceData,publicationsData) {
    const fields={
      personal: personalData,
      education: educationData,
      experience: experienceData,
      publications: publicationsData
    };
    console.log(fields)
    const job = {
      title,
      description,
      location,
      salary,
      contactEmail,
      college,
      qualifications,
      responsibilities,
      fields
    };
    console.log(job);
    const id=user._id
    axios
      .post("http://localhost:4000/job-post", {job,id})
      .then((response) => {
        console.log("Job submitted");
        console.log("Job submitted");
        if(response.data.status===200){

          // Update the jobs state with the new job
          setJobs([...jobs, job]);
          // Clear the form inputs
          setTitle("");
          setDescription("");
          setLocation("");
          setSalary("");
          setContactEmail("");
          setCollege("");
          setQualifications("");
          setResponsibilities("");
          window.location.reload();
        }else{
          console.log(response.data.err);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }




  return (
    <>
    <div className="postJob">
      <div className="formDiv">
        <form className="postJobForm">
          <h3>Post a Job</h3>
          <div className="inputField">

            <input
              className="postJobInput"
              type="text"
              placeholder="Job title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              name="Job Title"
              required
            />

          </div>
          <div className="inputField">
            <input
              className="postJobInput"
              type="text"
              placeholder="College Name"
              value={college}
              onChange={(e) => setCollege(e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <input
              className="postJobInput"
              type="text"
              placeholder="Job Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <input
              className="postJobInput"
              type="number"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <input
              className="postJobInput"
              type="email"
              placeholder="Contact email"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputField">
            <textarea
              className="postJobInput"
              type="text"
              placeholder="Job Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <textarea
          className="postJobInput"
  type="text"
  placeholder="Qualifications"
  value={qualifications}
  onChange={(e) => setQualifications(e.target.value)}
  required
  rows={4}
  cols={50}
/>

<textarea
  className="postJobInput"
  type="text"
  placeholder="Responsibilities"
  value={responsibilities}
  onChange={(e) => setResponsibilities(e.target.value)}
  required
  rows={4}
  cols={50}
/>

        {!showCustomForm &&   <div className="buttonContainer">
            <Button type="submit" variant="primary" onClick={()=> setShowCustomForm(true)}>
              Next
            </Button>
          </div>}
        </form>
      </div>
    </div>


    {showCustomForm &&
      <CustomizableForm handleSubmit={handleSubmit}/>
    }
</>
  );
}

export default PostJob;
