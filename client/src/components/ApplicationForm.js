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

          <div className="application-field-div1">
          <h5>Personal details</h5>
          <div className="application-field-div2">
            <label>Name: </label>
            <input type="text" value={jobFields.personal.name} onChange={(e)=> {const obj=jobFields;obj.personal.name=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>
          {jobFields.jobFields.personal.email && <div className="application-field-div2">
            <label>Email: </label>
            <input type="email" value={jobFields.personal.email} onChange={(e)=> {const obj=jobFields;obj.personal.email=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.fathername && <div className="application-field-div2">
            <label>Father name: </label>
            <input type="text" value={jobFields.personal.fathername} onChange={(e)=> {const obj=jobFields;obj.personal.fathername=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.dob && <div className="application-field-div2">
            <label>Date of Birth: </label>
            <input type="date" value={jobFields.personal.dob} onChange={(e)=> {const obj=jobFields;obj.personal.dob=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.age && <div className="application-field-div2">
            <label>Age: </label>
            <input type="number" min="0" step="1" value={jobFields.personal.age} onChange={(e)=> {const obj=jobFields;obj.personal.age=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.profile_image_url && <div className="application-field-div2">
            <label>URL for profile image: </label>
            <input type="text" value={jobFields.personal.profile_image_url} onChange={(e)=> {const obj=jobFields;obj.personal.profile_image_url=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.gender && <div className="application-field-div2">
            <label>Gender: </label>
            <select onChange={(e)=> {const obj=jobFields;obj.personal.gender=e.target.value; setJobFields({...jobFields,obj});}}>
              <option value="Male" selected={jobFields.personal.gender==="Male"}>Male</option>
              <option value="Female" selected={jobFields.personal.gender==="Female"}>Female</option>
              <option value="Other" selected={jobFields.personal.gender==="Other"}>Other</option>
            </select>
          </div>}
          {jobFields.jobFields.personal.category && <div className="application-field-div2">
            <label>Category: </label>
            <select onChange={(e)=> {const obj=jobFields;obj.personal.category=e.target.value; setJobFields({...jobFields,obj});}}>
              <option value="General" selected={jobFields.personal.category==="General"}>General</option>
              <option value="SC" selected={jobFields.personal.category==="SC"}>SC</option>
              <option value="ST" selected={jobFields.personal.category==="ST"}>ST</option>
              <option value="OBC" selected={jobFields.personal.category==="OBC"}>OBC</option>
            </select>
          </div>}
          {jobFields.jobFields.personal.disablity && <div className="application-field-div2">
            <label>Disability: (NA if none)</label>
            <input type="text" value={jobFields.personal.disablity} onChange={(e)=> {const obj=jobFields;obj.personal.disablity=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.married && <div className="application-field-div2">
            <label>Married Status: </label>
            <select onChange={(e)=> {const obj=jobFields;obj.personal.married=e.target.value; setJobFields({...jobFields,obj});}}>
              <option value="Yes" selected={jobFields.personal.married==="Yes"}>Yes</option>
              <option value="No" selected={jobFields.personal.married==="No"}>No</option>
            </select>
          </div>}
          {jobFields.jobFields.personal.nationality && <div className="application-field-div2">
            <label>Nationality: </label>
            <input type="text" value={jobFields.personal.nationality} onChange={(e)=> {const obj=jobFields;obj.personal.nationality=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          </div>


          <div className="application-field-div1">
          <h5>Current address details</h5>
          {jobFields.jobFields.personal.communication_address && <div className="application-field-div2">
            <label> Address: </label>
            <input type="text" value={jobFields.personal.communication_address} onChange={(e)=> {const obj=jobFields;obj.personal.communication_address=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.communication_city && <div className="application-field-div2">
            <label>City: </label>
            <input type="text" value={jobFields.personal.communication_city} onChange={(e)=> {const obj=jobFields;obj.personal.communication_city=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.communication_state && <div className="application-field-div2">
            <label>State: </label>
            <input type="text" value={jobFields.personal.communication_state} onChange={(e)=> {const obj=jobFields;obj.personal.communication_state=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.communication_pincode && <div className="application-field-div2">
            <label>Pincode: </label>
            <input type="text" value={jobFields.personal.communication_pincode} onChange={(e)=> {const obj=jobFields;obj.personal.communication_pincode=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.communication_country && <div className="application-field-div2">
            <label>Country: </label>
            <input type="text" value={jobFields.personal.communication_country} onChange={(e)=> {const obj=jobFields;obj.personal.communication_country=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          </div>

          <div className="application-field-div1">
          <h5>Permanent address details</h5>
          {jobFields.jobFields.personal.permanent_address && <div className="application-field-div2">
            <label> Address: </label>
            <input type="text" value={jobFields.personal.permanent_address} onChange={(e)=> {const obj=jobFields;obj.personal.permanent_address=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.permanent_city && <div className="application-field-div2">
            <label>City: </label>
            <input type="text" value={jobFields.personal.permanent_city} onChange={(e)=> {const obj=jobFields;obj.personal.permanent_city=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.permanent_state && <div className="application-field-div2">
            <label>State: </label>
            <input type="text" value={jobFields.personal.permanent_state} onChange={(e)=> {const obj=jobFields;obj.personal.permanent_state=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.permanent_pincode && <div className="application-field-div2">
            <label>Pincode: </label>
            <input type="text" value={jobFields.personal.permanent_pincode} onChange={(e)=> {const obj=jobFields;obj.personal.permanent_pincode=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.permanent_country && <div className="application-field-div2">
            <label>Country: </label>
            <input type="text" value={jobFields.personal.permanent_country} onChange={(e)=> {const obj=jobFields;obj.personal.permanent_country=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          </div>

          <div className="application-field-div1">
          <h5>Mobile details</h5>
          {jobFields.jobFields.personal.mobile && <div className="application-field-div2">
            <label>Mobile No.: </label>
            <input type="text" value={jobFields.personal.mobile} onChange={(e)=> {const obj=jobFields;obj.personal.mobile=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.personal.altmobile && <div className="application-field-div2">
            <label>Alternate Mobile No.: </label>
            <input type="text" value={jobFields.personal.altmobile} onChange={(e)=> {const obj=jobFields;obj.personal.altmobile=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          </div>

        </div>



        <div className="application_field">
          <h6>Academic</h6>
          <div className="application-field-div1">
          <h5>10th details</h5>
          {jobFields.jobFields.academic.board10 && <div className="application-field-div2">
          <label>10th board: </label>
          <input type="text" value={jobFields.academic.board10} onChange={(e)=> {const obj=jobFields;obj.academic.board10=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.percentageformat10 && <div className="application-field-div2">
          <label>Percentage format: </label>
          <input type="text" value={jobFields.academic.percentageformat10} onChange={(e)=> {const obj=jobFields;obj.academic.percentageformat10=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.percentage10 && <div className="application-field-div2">
          <label>Percentage: </label>
          <input type="text" value={jobFields.academic.percentage10} onChange={(e)=> {const obj=jobFields;obj.academic.percentage10=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.year10 && <div className="application-field-div2">
          <label>Year of completion: </label>
          <input type="date" value={jobFields.academic.year10} onChange={(e)=> {const obj=jobFields;obj.academic.year10=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.remarks10 && <div className="application-field-div2">
          <label>Remarks: </label>
          <input type="text" value={jobFields.academic.remarks10} onChange={(e)=> {const obj=jobFields;obj.academic.remarks10=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.marksheet10 && <div className="application-field-div2">
          <label>Marksheet url: </label>
          <input type="text" value={jobFields.academic.marksheet10} onChange={(e)=> {const obj=jobFields;obj.academic.marksheet10=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          </div>

          <div className="application-field-div1">
          <h5>12th details</h5>
          {jobFields.jobFields.academic.board12 && <div className="application-field-div2">
          <label>12th board: </label>
          <input type="text" value={jobFields.academic.board12} onChange={(e)=> {const obj=jobFields;obj.academic.board12=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.percentageformat12 && <div className="application-field-div2">
          <label>Percentage format: </label>
          <input type="text" value={jobFields.academic.percentageformat12} onChange={(e)=> {const obj=jobFields;obj.academic.percentageformat12=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.percentage12 && <div className="application-field-div2">
          <label>Percentage: </label>
          <input type="text" value={jobFields.academic.percentage12} onChange={(e)=> {const obj=jobFields;obj.academic.percentage12=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.year12 && <div className="application-field-div2">
          <label>Year of completion: </label>
          <input type="date" value={jobFields.academic.year12} onChange={(e)=> {const obj=jobFields;obj.academic.year12=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.remarks12 && <div className="application-field-div2">
          <label>Remarks: </label>
          <input type="text" value={jobFields.academic.remarks12} onChange={(e)=> {const obj=jobFields;obj.academic.remarks12=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.marksheet12 && <div className="application-field-div2">
          <label>Marksheet url: </label>
          <input type="text" value={jobFields.academic.marksheet12} onChange={(e)=> {const obj=jobFields;obj.academic.marksheet12=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          </div>

          <div className="application-field-div1">
          <h5>Btech details</h5>
          {jobFields.jobFields.academic.collegebtech && <div className="application-field-div2">
          <label>College: </label>
          <input type="text" value={jobFields.academic.collegebtech} onChange={(e)=> {const obj=jobFields;obj.academic.collegebtech=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.branchbtech && <div className="application-field-div2">
          <label>Branch/Major: </label>
          <input type="text" value={jobFields.academic.branchbtech} onChange={(e)=> {const obj=jobFields;obj.academic.branchbtech=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.percentageformatbtech && <div className="application-field-div2">
          <label>Percentage format: </label>
          <input type="text" value={jobFields.academic.percentageformatbtech} onChange={(e)=> {const obj=jobFields;obj.academic.percentageformatbtech=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.percentagebtech && <div className="application-field-div2">
          <label>Percentage: </label>
          <input type="text" value={jobFields.academic.percentagebtech} onChange={(e)=> {const obj=jobFields;obj.academic.percentagebtech=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.yearbtech && <div className="application-field-div2">
          <label>Year of completion: </label>
          <input type="date" value={jobFields.academic.yearbtech} onChange={(e)=> {const obj=jobFields;obj.academic.yearbtech=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.remarksbtech && <div className="application-field-div2">
          <label>Remarks: </label>
          <input type="text" value={jobFields.academic.remarksbtech} onChange={(e)=> {const obj=jobFields;obj.academic.remarksbtech=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.marksheetbtechurl && <div className="application-field-div2">
          <label>Marksheet URL: </label>
          <input type="text" value={jobFields.academic.marksheetbtechurl} onChange={(e)=> {const obj=jobFields;obj.academic.marksheetbtechurl=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          </div>

          <div className="application-field-div1">
          <h5>Mtech details</h5>
          {jobFields.jobFields.academic.collegemtech && <div className="application-field-div2">
          <label>College: </label>
          <input type="text" value={jobFields.academic.collegemtech} onChange={(e)=> {const obj=jobFields;obj.academic.collegemtech=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.branchmtech && <div className="application-field-div2">
          <label>Branch/Major: </label>
          <input type="text" value={jobFields.academic.branchmtech} onChange={(e)=> {const obj=jobFields;obj.academic.branchmtech=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.percentageformatmtech && <div className="application-field-div2">
          <label>Percentage format: </label>
          <input type="text" value={jobFields.academic.percentageformatmtech} onChange={(e)=> {const obj=jobFields;obj.academic.percentageformatmtech=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.percentagemtech && <div className="application-field-div2">
          <label>Percentage: </label>
          <input type="text" value={jobFields.academic.percentagemtech} onChange={(e)=> {const obj=jobFields;obj.academic.percentagemtech=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.yearmtech && <div className="application-field-div2">
          <label>Year of completion: </label>
          <input type="date" value={jobFields.academic.yearmtech} onChange={(e)=> {const obj=jobFields;obj.academic.yearmtech=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.remarksmtech && <div className="application-field-div2">
          <label>Remarks: </label>
          <input type="text" value={jobFields.academic.remarksmtech} onChange={(e)=> {const obj=jobFields;obj.academic.remarksmtech=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.academic.marksheetmtech && <div className="application-field-div2">
          <label>Marksheet URL: </label>
          <input type="text" value={jobFields.academic.marksheetmtech} onChange={(e)=> {const obj=jobFields;obj.academic.marksheetmtech=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          </div>

          <div className="application-field-div1">
          <h5>PHD details</h5>
          {jobFields.jobFields.academic.isphdcompleted && <div className="application-field-div2">
            <label>Is Phd Completed? : </label>
            <select onChange={(e)=> {const obj=jobFields.academic.isphdcompleted=e.target.value; setJobFields({...jobFields,obj});}}>
              <option value="Yes" selected={jobFields.academic.isphdcompleted==="Yes"}>Yes</option>
              <option value="No" selected={jobFields.academic.isphdcompleted==="No"}>No</option>
            </select>
          </div>}
          {jobFields.jobFields.academic.phdremarks && <div className="application-field-div2">
          <label>Remarks: </label>
          <input type="text" value={jobFields.academic.phdremarks} onChange={(e)=> {const obj=jobFields;obj.academic.phdremarks=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}

          </div>



        </div>

        <div className="application_field">
          <h6>Experience</h6>
          {jobFields.jobFields.experience.organization && <div className="application-field-div2">
          <label>Company Name: </label>
          <input type="text" value={jobFields.experience.organization} onChange={(e)=> {const obj=jobFields;obj.experience.organization=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.experience.profile && <div className="application-field-div2">
          <label>Job Profile: </label>
          <input type="text" value={jobFields.experience.profile} onChange={(e)=> {const obj=jobFields;obj.experience.profile=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.experience.location && <div className="application-field-div2">
          <label>Location: </label>
          <input type="text" value={jobFields.experience.location} onChange={(e)=> {const obj=jobFields;obj.experience.location=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.experience.startdate && <div className="application-field-div2">
          <label>Start Date: </label>
          <input type="date" value={jobFields.experience.startdate} onChange={(e)=> {const obj=jobFields;obj.experience.startdate=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.experience.enddate && <div className="application-field-div2">
          <label>End date: </label>
          <input type="date" value={jobFields.experience.enddate} onChange={(e)=> {const obj=jobFields;obj.experience.enddate=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.experience.description && <div className="application-field-div2">
          <label>Description: </label>
          <input type="text" value={jobFields.experience.description} onChange={(e)=> {const obj=jobFields;obj.experience.description=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
        </div>


        <div className="application_field">
          <h6>publication</h6>
          {jobFields.jobFields.publication.title && <div className="application-field-div2">
          <label>Title: </label>
          <input type="text" value={jobFields.publication.title} onChange={(e)=> {const obj=jobFields;obj.publication.title=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.publication.abstract && <div className="application-field-div2">
          <label>Abstract: </label>
          <input type="text" value={jobFields.publication.abstract} onChange={(e)=> {const obj=jobFields;obj.publication.abstract=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.publication.journal && <div className="application-field-div2">
          <label>Journal: </label>
          <textarea type="text" value={jobFields.publication.journal} onChange={(e)=> {const obj=jobFields;obj.publication.journal=e.target.value; setJobFields({...jobFields,obj});}}></textarea>
          </div>}
          {jobFields.jobFields.publication.volume && <div className="application-field-div2">
          <label>Volume: </label>
          <input type="text" value={jobFields.publication.volume} onChange={(e)=> {const obj=jobFields;obj.publication.volume=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.publication.pages && <div className="application-field-div2">
          <label>Pages:</label>
          <input type="number" min="0" value={jobFields.publication.pages} onChange={(e)=> {const obj=jobFields;obj.publication.pages=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.publication.publisher && <div className="application-field-div2">
          <label>Publisher:</label>
          <input type="text"  value={jobFields.publication.publisher} onChange={(e)=> {const obj=jobFields;obj.publication.publisher=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.publication.doi && <div className="application-field-div2">
          <label>Date of issue: </label>
          <input type="date"  value={jobFields.publication.doi} onChange={(e)=> {const obj=jobFields;obj.publication.doi=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.publication.url && <div className="application-field-div2">
          <label>URL:</label>
          <input type="text"  value={jobFields.publication.url} onChange={(e)=> {const obj=jobFields;obj.publication.url=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
        </div>

        <div className="application_field">
          <h6>Position of Responsibility</h6>
          {jobFields.jobFields.por.organization && <div className="application-field-div2">
          <label>Organization: </label>
          <input type="text" value={jobFields.por.organization} onChange={(e)=> {const obj=jobFields;obj.por.organization=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.por.title && <div className="application-field-div2">
          <label>Title: </label>
          <input type="text" value={jobFields.por.title} onChange={(e)=> {const obj=jobFields;obj.por.title=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.por.location && <div className="application-field-div2">
          <label>Location: </label>
          <input type="text" value={jobFields.por.location} onChange={(e)=> {const obj=jobFields;obj.por.location=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.por.startdate && <div className="application-field-div2">
          <label>Start Date: </label>
          <input type="date" value={jobFields.por.startdate} onChange={(e)=> {const obj=jobFields;obj.por.startdate=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.por.enddate && <div className="application-field-div2">
          <label>End date: </label>
          <input type="date" value={jobFields.por.enddate} onChange={(e)=> {const obj=jobFields;obj.por.enddate=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.por.description && <div className="application-field-div2">
          <label>Description: </label>
          <input type="text" value={jobFields.por.description} onChange={(e)=> {const obj=jobFields;obj.por.description=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
        </div>


        <div className="application_field">
          <h6>Reference</h6>
          {jobFields.jobFields.reference.name && <div className="application-field-div2">
          <label>Name: </label>
          <input type="text" value={jobFields.reference.name} onChange={(e)=> {const obj=jobFields;obj.reference.name=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.reference.title && <div className="application-field-div2">
          <label>Title: </label>
          <input type="text" value={jobFields.reference.title} onChange={(e)=> {const obj=jobFields;obj.reference.title=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.reference.affliliation && <div className="application-field-div2">
          <label>Affliliation: </label>
          <input type="text" value={jobFields.reference.affliliation} onChange={(e)=> {const obj=jobFields;obj.reference.affliliation=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.reference.referenceemail && <div className="application-field-div2">
          <label>Reference Email: </label>
          <input type="email" value={jobFields.reference.referenceemail} onChange={(e)=> {const obj=jobFields;obj.reference.referenceemail=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.reference.referencephone && <div className="application-field-div2">
          <label>Reference phone: </label>
          <input type="text" value={jobFields.reference.referencephone} onChange={(e)=> {const obj=jobFields;obj.reference.referencephone=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.reference.relationship && <div className="application-field-div2">
          <label>Relationship: </label>
          <input type="text" value={jobFields.reference.relationship} onChange={(e)=> {const obj=jobFields;obj.reference.relationship=e.target.value; setJobFields({...jobFields,obj});}}></input>
          </div>}
          {jobFields.jobFields.reference.description && <div className="application-field-div2">
          <label>Description: </label>
          <input type="text" value={jobFields.reference.description} onChange={(e)=> {const obj=jobFields;obj.reference.description=e.target.value; setJobFields({...jobFields,obj});}}></input>
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
