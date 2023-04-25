import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import "./css/PostJob.css";
import { useNavigate , useLocation } from 'react-router-dom';
import CustomizableForm from "./CustomForm/CustomizableForm.js";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser,faLocationArrow , faBuilding, faMapMarkerAlt, faDollarSign, faFileAlt, faGraduationCap, faTasks } from '@fortawesome/free-solid-svg-icons';



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
  const [isActive, setIsActive] = useState(false);

const history=useNavigate();

  useEffect(()=> {
    if(type!="institute"){
      history("*");
    }
  })

  function handleSubmit(personalData,academicData,experienceData,publicationData,porData,referenceData) {
    const fields={
      personal: personalData,
      academic: academicData,
      experience: experienceData,
      publication: publicationData,
      por: porData,
      reference: referenceData
    };
    const lastDate="";
    const lastUpdateDate="";
    const deleted=false;
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
      lastDate,
      lastUpdateDate,
      deleted,
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

  const customFormDisplay = ()=> {
    if(title==="" || description==="" || location==="" || salary==="" || contactEmail==="" || college==="" || qualifications==="" || responsibilities===""){
      console.log("cannot display, all fields not filled");
    }else{
      setShowCustomForm(true);
    }
  }




   return (
    <>
    <div className="postJob">
      <div className="formDiv">
        <form className="postJobForm">
          <h3 classname="postJobh3">Post a Job</h3>
          <div className="inputField">
          <div style={{ display: "flex", alignItems: "center" }}>
        <FontAwesomeIcon icon={faUser} className="input-icon" style={{ marginRight: "20px", marginLeft: "10px" , marginBottom: "0px"  }} size="lg" />
        <FloatingLabel controlId="floatingTitle" label="Job title" className="mb-3" style={{ flex: 1 }}>
          <Form.Control
            type="text"
            placeholder="Job title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="Job Title"
            required
          />
        </FloatingLabel>
      </div>

          </div>

          <div className="inputField">
          <div style={{ display: "flex", alignItems: "center" }}>
        <FontAwesomeIcon
          icon={faGraduationCap}
          className="input-icon"
          style={{ marginRight: "10px", marginLeft: "10px", marginBottom: "0px" }}
          size="lg"
        />
        <FloatingLabel controlId="floatingCollege" label="College Name" className="mb-3" style={{ flex: 1 }}>
          <Form.Control
            type="text"
            placeholder="College Name"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
          />
        </FloatingLabel>
        </div>
      </div>
      <div className="inputField">
  <div style={{ display: "flex", alignItems: "center" }}>
    <FontAwesomeIcon
      icon={faLocationArrow}
      className="input-icon"
      style={{ marginRight: "20px", marginLeft: "7.5px", marginBottom: "0px" }}
      size="lg"
    />
    <FloatingLabel
      controlId="floatingLocation"
      label="Job Location"
      className="mb-3"
      style={{ flex: 1 }}
    >
      <Form.Control
        type="text"
        placeholder="Job Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
    </FloatingLabel>
  </div>
</div>
<div className="inputField">
  <div style={{ display: "flex", alignItems: "center" }}>
    <FontAwesomeIcon
      icon={faDollarSign}
      className="input-icon"
      style={{ marginRight: "22px", marginLeft: "10px", marginBottom: "0px" }}
      size="lg"
    />
    <FloatingLabel
      controlId="floatingSalary"
      label="Salary"
      className="mb-3"
      style={{ flex: 1 }}
    >
      <Form.Control
        type="number"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
        required
      />
    </FloatingLabel>
  </div>
</div>
<div className="inputField">
  <div style={{ display: "flex", alignItems: "center" }}>
    <FontAwesomeIcon
      icon={faEnvelope}
      className="input-icon"
      style={{ marginRight: "14px", marginLeft: "10px", marginBottom: "0px" }}
      size="lg"
    />
    <FloatingLabel
      controlId="floatingContactEmail"
      label="Contact email"
      className="mb-3"
      style={{ flex: 1 }}
    >
      <Form.Control
        type="email"
        placeholder="Contact email"
        value={contactEmail}
        onChange={(e) => setContactEmail(e.target.value)}
        required
      />
    </FloatingLabel>
  </div>
</div>
<div className="inputField">
  <div style={{ display: "flex", alignItems: "center" }}>
    <FontAwesomeIcon
      icon={faFileAlt}
      className="input-icon"
      style={{ marginRight: "5px", marginLeft: "10px", marginBottom: "0px" }}
      size="lg"
    />
    <FloatingLabel
      controlId="floatingDescription"
      label="Job Description"
      className="mb-3"
      style={{ flex: 1 }}
    >
      <Form.Control
        as="textarea"
        placeholder="Job Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </FloatingLabel>
  </div>
</div>
<div className="inputField">
  <div style={{ display: "flex", alignItems: "center" }}>
    <FontAwesomeIcon
      icon={faGraduationCap}
      className="input-icon"
      style={{ marginRight: "-7px", marginLeft: "10px", marginBottom: "0px" }}
      size="lg"
    />
    <FloatingLabel controlId="floatingQualifications" label="Qualifications" className="mb-3" style={{ flex: 1 }}>
      <Form.Control
        as="textarea"
        placeholder="Qualifications"
        value={qualifications}
        onChange={(e) => setQualifications(e.target.value)}
        required
        rows={4}
        cols={50}
      />
    </FloatingLabel>
  </div>
</div>

<div className="inputField">
  <div style={{ display: "flex", alignItems: "center" }}>
    <FontAwesomeIcon
      icon={faTasks}
      className="input-icon"
      style={{ marginRight: "0px", marginLeft: "10px", marginBottom: "0px" }}
      size="lg"
    />
    <FloatingLabel controlId="floatingResponsibilities" label="Responsibilities" className="mb-3" style={{ flex: 1 }}>
      <Form.Control
        as="textarea"
        placeholder="Responsibilities"
        value={responsibilities}
        onChange={(e) => setResponsibilities(e.target.value)}
        required
        rows={4}
        cols={50}
      />
    </FloatingLabel>
  </div>
</div>

        {!showCustomForm &&   <div className="buttonContainer">
            <Button type="submit" variant="primary" onClick={customFormDisplay}>
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
