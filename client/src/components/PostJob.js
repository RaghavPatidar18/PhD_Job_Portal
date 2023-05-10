import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect, useRef} from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import "./css/PostJob.css";
import { useNavigate , useLocation } from 'react-router-dom';
import {useParams} from "react-router-dom";
import CustomizableForm from "./CustomForm/CustomizableForm.js";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faUser,faLocationArrow , faBuilding, faMapMarkerAlt, faDollarSign, faFileAlt, faGraduationCap, faTasks } from '@fortawesome/free-solid-svg-icons';



function PostJob({user,type}) {

  const {id}=useParams();

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
  const [lastDate,setLastDate]=useState("");
  const [jobDetails,setJobDetails]=useState({});

  const [gotJobDetails,setGotJobDetails]=useState(false);

  const isFirstRender = useRef(true);

const history=useNavigate();

  useEffect(()=> {
    if(type!=="institute"){
      history("*");
    }
    if(isFirstRender.current){
      console.log("did i come here");
      isFirstRender.current=false;

      if(id!==undefined){
        axios.get(`/updateJob/${id}`)
          .then((response)=>{
            if(response.data.status===200){
              const jobDetails=response.data.job;
              setTitle(jobDetails.title);
              setLocation(jobDetails.location);
              setSalary(jobDetails.salary);
              setContactEmail(jobDetails.contactEmail);
              setCollege(jobDetails.college);
              setQualifications(jobDetails.qualifications);
              setResponsibilities(jobDetails.responsibilities);
              setLastDate(jobDetails.lastDate);
              setDescription(jobDetails.description);
              setJobDetails(jobDetails);
            }
          })
          .catch((err)=> console.log(err));
      }
      return;
    }


    if(id===undefined){
      setGotJobDetails(true);
    }else{
      if(Object.keys(jobDetails).length!==0){
        setGotJobDetails(true);
      }
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
    const d=Date.now();
    let date_time=new Date(d);
    let date=date_time.getDate();
    let month=date_time.getMonth();
    let year=date_time.getYear();
    let today=year+"-"+month+"-"+date;

    const lastUpdateDate=today;
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
    if(id!==undefined){
      axios.post("/updateJob", {job,id})
      .then((response)=>{
        if(response.data.status===200){
          history("/");
        }
      })
      .catch((err)=>console.log(err));
    }else{
      const id=user._id
      axios
        .post("/job-post", {job,id})
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
            setLastDate("");
            window.location.reload();
          }else{
            console.log(response.data.err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
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
    <div className="postJob" >
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
      icon={faEnvelope}
      className="input-icon"
      style={{ marginRight: "14px", marginLeft: "10px", marginBottom: "0px" }}
      size="lg"
    />
    <FloatingLabel
      controlId="floatingContactEmail"
      label="Last Date of Application"
      className="mb-3"
      style={{ flex: 1 }}
    >
      <Form.Control
        type="date"
        value={lastDate}
        onChange={(e) => setLastDate(e.target.value)}
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
      style={{ marginRight: "17px", marginLeft: "10px", marginBottom: "0px" }}
      size="lg"
    />
    <FloatingLabel
      controlId="floatingDescription"
      label="Job Description"
      className="mb-3"
      style={{ flex: 1 }}
    >
      <Form.Control
        type="text"
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
      style={{ marginRight: "10px", marginLeft: "10px", marginBottom: "0px" }}
      size="lg"
    />
    <FloatingLabel controlId="floatingQualifications" label="Qualifications" className="mb-3" style={{ flex: 5 }}>
      <Form.Control
        type="text"
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
      style={{ marginRight: "5px", marginLeft: "10px", marginBottom: "0px" }}
      size="lg"
    />
    <FloatingLabel controlId="floatingResponsibilities" label="Responsibilities" className="mb" style={{ flex: 1 , marginLeft: "10px" , marginBottom:"20px" }}>
      <Form.Control
        type="text"
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


        </form>
      </div>
    </div>



      {gotJobDetails && <CustomizableForm handleSubmit={handleSubmit} updateForm={jobDetails}/>}

</>
  );
}

export default PostJob;
