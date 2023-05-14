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
import Modal from "react-bootstrap/Modal";
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

  const [showSuccess,setShowSuccess]=useState(false);
  const handleCloseSuccess=()=>{
    setShowSuccess(false);
    window.location.href="/";
  };



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

    if(title!=="" && description!=="" && location!=="" && salary!=="" && college!=="" && qualifications!=="" && responsibilities!=="" && lastDate!=="" ){
      if(contactEmail.toLowerCase()===contactEmail){
        if(contactEmail.includes("@") && contactEmail.includes(".")){
          if(contactEmail.indexOf("@")!==0 && contactEmail.indexOf("@")<contactEmail.indexOf(".") && contactEmail.indexOf(".")!==contactEmail.length-1){
            console.log("personal email is right");
          }else{
            return false;
          }
        }else{
          return false;
        }
      }else{
        return false;
      }
    }else{
      return false;
    }


    const fields={
      personal: personalData,
      academic: academicData,
      experience: experienceData,
      publication: publicationData,
      por: porData,
      reference: referenceData
    };
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

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

            setShowSuccess(true);
            //window.location.reload();
          }else{
            console.log(response.data.err);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      }
      return true;
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
    <Modal show={showSuccess} onHide={handleCloseSuccess}>
    <div class="relative block overflow-hidden text-left align-middle transform bg-white  sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6" style={{margin:'auto', marginTop:'10px', marginBottom:'10px'}}>
        <div class="text-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                Job Posted Successfully !
            </h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400">
                The job has been posted successfully. Close Modal to get back to homepage.
            </p>
        </div>
        <div class="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
            <button onClick={handleCloseSuccess} class="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                close
            </button>
        </div>
    </div>
    </Modal>
    <div className="postJob" >
      <div className="formDiv">
        <form className="postJobForm">
          <h3 classname="postJobh3">Post a Job</h3>
          <div className="inputField">
          <div style={{ display: "flex", alignItems: "center" }}>
<FontAwesomeIcon icon={faUser} className="input-icon" style={{ marginRight: "20px", marginLeft: "10px", marginBottom: "0px" }} size="lg" />
          <span style={{ color: 'red' }}>*</span>
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
        <span style={{ color: 'red' }}>*</span>
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
    <span style={{ color: 'red' }}>*</span>
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
    <span style={{ color: 'red' }}>*</span>
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
    <span style={{ color: 'red' }}>*</span>
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
    <span style={{ color: 'red' }}>*</span>
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
    {/* <span style={{ color: 'red' }}>*</span> */}
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
    {/* <span style={{ color: 'red' }}>*</span> */}
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
    {/* <span style={{ color: 'red' }}>*</span> */}
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
