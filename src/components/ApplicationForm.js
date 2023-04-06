import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import { useNavigate , useLocation } from 'react-router-dom';
import ModalTemplate from "./ModalTemplate.js";
import "./css/ApplicationForm.css"
import Modal from "react-bootstrap/Modal";

function ApplicationForm({type}){

  const {job_id,user_id}=useParams();

  //console.log(job_id);
  //console.log(user_id);
  const url=`http://localhost:4000/application-form/${job_id}/${user_id}`;
  const [jobFields,setJobFields]=useState({});
  const [dataRecieved,setDataRecieved]=useState(false);
  const history = useNavigate();
  const [show,setShow]=useState(false);

  const handleClose = ()=> setShow(false);

const getDetails = async()=> {
  console.log("brioe");
  if(type!=="student"){
    history("*");
  }else{
    console.log("i m here");
    const res=await fetch(url,{
      method: "GET",
      headers: {"Content-Type": "application/json",}
    });
    const data=await res.json();
    if(data.status===200){
      setJobFields(data.dataObject);
      console.log("sdnio");
      setDataRecieved(true);
      //onsole.log(jobFields);
    }
  }
}


function submitClicked(){
  console.log("submit clicked");
  axios.post(url, {jobFields})
  .then((response) => {
    if(response.data.status===200){
      console.log("submitted");
      history("/");
    }
  })
  .catch((err)=>console.log(err));

}
  useEffect(()=> {
    getDetails();
    //console.log("srni");

  }, []);

console.log(jobFields);
  return(
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Submit Application Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you wish to submit these details for the job?</Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={submitClicked}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>

    {dataRecieved && <div className="application_form">
      <h3>Application Form</h3>
      <form>


        <div className="application_field">
          <h6>Personal</h6>
          <div>
            <label>Name: </label>
            <input type="text" value={jobFields.personal.name} onChange={(e)=> {const obj=jobFields;obj.personal.name=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>
          {jobFields.jobFields.personal.email && <div>
            <label>Email: </label>
            <input type="email" value={jobFields.personal.email} onChange={(e)=> {const obj=jobFields;obj.personal.email=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.age && <div>
            <label>Age: </label>
            <input type="number" min="0" step="1" value={jobFields.personal.age} onChange={(e)=> {const obj=jobFields;obj.personal.age=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.gender && <div>
            <label>Gender: </label>
            <select onChange={(e)=> {const obj=jobFields;obj.personal.gender=e.target.value; setJobFields({...jobFields,obj});}}>
              <option value="Male" selected={jobFields.personal.gender==="Male"}>Male</option>
              <option value="Female" selected={jobFields.personal.gender==="Female"}>Female</option>
              <option value="Other" selected={jobFields.personal.gender==="Other"}>Other</option>
            </select>
          </div>}
          {jobFields.jobFields.personal.category && <div>

            <label>Category: </label>
            <select onChange={(e)=> {const obj=jobFields;obj.personal.category=e.target.value; setJobFields({...jobFields,obj});}}>
              <option value="General" selected={jobFields.personal.category==="General"}>General</option>
              <option value="SC" selected={jobFields.personal.category==="SC"}>SC</option>
              <option value="ST" selected={jobFields.personal.category==="ST"}>ST</option>
              <option value="OBC" selected={jobFields.personal.category==="OBC"}>OBC</option>
            </select>
          </div>}
          {jobFields.jobFields.personal.permanentAddress && <div>
            <label>Permanent Address: </label>
            <input type="text" value={jobFields.personal.permanentAddress} onChange={(e)=> {const obj=jobFields;obj.personal.permanentAddress=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.currentAddress && <div>
            <label>CurrentAddress: </label>
            <input type="text" value={jobFields.personal.currentAddress} onChange={(e)=> {const obj=jobFields;obj.personal.currentAddress=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
        </div>


        <div className="application_field">
          <h6>Education</h6>
          {jobFields.jobFields.education.degreeName && <div>
          <label>Degree Name: </label>
          <input type="text" value={jobFields.education.degreeName} onChange={(e)=> {const obj=jobFields;obj.education.degreeName=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.education.degreeStudy && <div>
          <label>Institute Name: </label>
          <input type="text" value={jobFields.education.degreeStudy} onChange={(e)=> {const obj=jobFields;obj.education.degreeStudy=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.education.gradingScale && <div>
          <label>Grading Scale: </label>
          <input type="number" min="0" value={jobFields.education.gradingScale} onChange={(e)=> {const obj=jobFields;obj.education.gradingScale=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.education.grade && <div>
          <label>Grade: </label>
          <input type="number"min="0" value={jobFields.education.grade} onChange={(e)=> {const obj=jobFields;obj.education.grade=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.education.startYear && <div>
          <label>Start Year: </label>
          <input type="date" value={jobFields.education.startYear} onChange={(e)=> {const obj=jobFields;obj.education.startYear=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.education.endYear && <div>
          <label>End Year: </label>
          <input type="date" value={jobFields.education.endYear} onChange={(e)=> {const obj=jobFields;obj.education.endYear=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
        </div>

        <div className="application_field">
          <h6>Experience</h6>
          {jobFields.jobFields.experience.companyName && <div>
          <label>Company Name: </label>
          <input type="text" value={jobFields.experience.companyName} onChange={(e)=> {const obj=jobFields;obj.experience.companyName=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.experience.jobProfile && <div>
          <label>Job Profile: </label>
          <input type="text" value={jobFields.experience.jobProfile} onChange={(e)=> {const obj=jobFields;obj.experience.jobProfile=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.experience.location && <div>
          <label>Location: </label>
          <input type="text" value={jobFields.experience.location} onChange={(e)=> {const obj=jobFields;obj.experience.location=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.experience.startYear && <div>
          <label>Start Year: </label>
          <input type="date" value={jobFields.experience.startYear} onChange={(e)=> {const obj=jobFields;obj.experience.startYear=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.experience.endYear && <div>
          <label>End Year: </label>
          <input type="date" value={jobFields.experience.endYear} onChange={(e)=> {const obj=jobFields;obj.experience.endYear=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
        </div>


        <div className="application_field">
          <h6>Publications</h6>
          {jobFields.jobFields.publications.title && <div>
          <label>Title: </label>
          <input type="text" value={jobFields.publication.title} onChange={(e)=> {const obj=jobFields;obj.publication.title=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.publications.authorList && <div>
          <label>Author List: </label>
          <input type="text" value={jobFields.publication.authorList} onChange={(e)=> {const obj=jobFields;obj.publication.authorList=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.publications.journal && <div>
          <label>Journal: </label>
          <input type="text" value={jobFields.publication.journal} onChange={(e)=> {const obj=jobFields;obj.publication.journal=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.publications.summary && <div>
          <label>Summary: </label>
          <textarea type="text" value={jobFields.publication.summary} onChange={(e)=> {const obj=jobFields;obj.publication.summary=e.target.value; setJobFields({...jobFields,obj});}}></textarea>
          </div>}
          {jobFields.jobFields.publications.startYear && <div>
          <label>Start Year: </label>
          <input type="date" value={jobFields.publication.startYear} onChange={(e)=> {const obj=jobFields;obj.publication.startYear=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.publications.endYear && <div>
          <label>End Year</label>
          <input type="date" value={jobFields.publication.endYear} onChange={(e)=> {const obj=jobFields;obj.publication.endYear=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
        </div>
        <div style={{display:'flex', justifyContent:"center"}}><Button variant="success" style={{marginTop:'30px'}} onClick={()=> setShow(true)}>
          Submit
        </Button></div>
      </form>
    </div>}
    </>

  );
}

export default ApplicationForm;
