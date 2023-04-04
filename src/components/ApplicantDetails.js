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
import "./ApplicantDetails.css";

function ApplicantDetails({user,type}){
  console.log(user);
  const {id}=useParams();
  console.log(id);
  const [details,setDetails]=useState({});
  const [recieved,setRecieved]=useState(false);
const history = useNavigate();
  useEffect(()=>{
    if(type!=="institute"){
      history("*");
    }else{
      axios.get(`http://localhost:4000/applicant-details/${id}`)
        .then((response)=> {
          if(response.data.status===200){
            if(response.data.details.institute_id!==user._id){
              history("*");
            }else{
              setDetails(response.data.details);
              console.log("data has been recieved");
              setRecieved(true);
            }
          }
        })
        .catch((err)=> console.log(err));
    }

  },[]);

  return(
    <>
    {recieved &&
    <div className="applicant_form">
      <h3>Applicant Details</h3>
      <div className="applicant_field">
        <h6>Personal</h6>
        <div>
          <p>Name: </p>
          <p>{details.student_details.personal.name}</p>
        </div>
        {details.fields.personal.email && <div>
          <p>Email: </p>
          <p>{details.student_details.personal.email} </p>
        </div>}
        {details.fields.personal.age && <div>
          <p>Age: </p>
          <p>{details.student_details.personal.age}</p>
        </div>}
        {details.fields.personal.gender && <div>
          <p>Gender: </p>
          <p>{details.student_details.personal.gender}</p>
        </div>}
        {details.fields.personal.category && <div>
          <p>Category: </p>
          <p>{details.student_details.personal.category}</p>
        </div>}
        {details.fields.personal.permanentAddress && <div>
          <p>Permanent Address: </p>
          <p>{details.student_details.personal.permanentAddress}</p>
        </div>}
        {details.fields.personal.currentAddress && <div>
          <p>CurrentAddress: </p>
          <p>{details.student_details.personal.currentAddress}</p>
        </div>}
      </div>


        <div className="applicant_field">
          <h6>Education</h6>
          {details.fields.education.degreeName && <div>
          <p>Degree Name: </p>
          <p>{details.student_details.education.degreeName}</p>
          </div>}
          {details.fields.education.degreeStudy && <div>
          <p>Institute Name: </p>
          <p >{details.student_details.education.degreeStudy}</p>
          </div>}
          {details.fields.education.gradingScale && <div>
          <p>Grading Scale: </p>
          <p >{details.student_details.education.gradingScale}</p>
          </div>}
          {details.fields.education.grade && <div>
          <p>Grade: </p>
          <p >{details.student_details.education.grade}</p>
          </div>}
          {details.fields.education.startYear && <div>
          <p>Start Year: </p>
          <p >{details.student_details.education.startYear}</p>
          </div>}
          {details.fields.education.endYear && <div>
          <p>End Year: </p>
          <p >{details.student_details.education.endYear}</p>
          </div>}
        </div>

        <div className="applicant_field">
          <h6>Experience</h6>
          {details.fields.experience.companyName && <div>
          <p>Company Name: </p>
          <p >{details.student_details.experience.companyName}</p>
          </div>}
          {details.fields.experience.jobProfile && <div>
          <p>Job Profile: </p>
          <p >{details.student_details.experience.jobProfile}</p>
          </div>}
          {details.fields.experience.location && <div>
          <p>Location: </p>
          <p >{details.student_details.experience.location}</p>
          </div>}
          {details.fields.experience.startYear && <div>
          <p>Start Year: </p>
          <p >{details.student_details.experience.startYear}</p>
          </div>}
          {details.fields.experience.endYear && <div>
          <p>End Year: </p>
          <p >{details.student_details.experience.endYear}</p>
          </div>}
        </div>


        <div className="applicant_field">
          <h6>Publications</h6>
          {details.fields.publications.title && <div>
          <p>Title: </p>
          <p >{details.student_details.publication.title}</p>
          </div>}
          {details.fields.publications.authorList && <div>
          <p>Author List: </p>
          <p >{details.student_details.publication.authorList}</p>
          </div>}
          {details.fields.publications.journal && <div>
          <p>Journal: </p>
          <p>{details.student_details.publication.journal}</p>
          </div>}
          {details.fields.publications.summary && <div>
          <p>Summary: </p>
          <p>{details.student_details.publication.summary}</p>
          </div>}
          {details.fields.publications.startYear && <div>
          <p>Start Year: </p>
          <p >{details.student_details.publication.startYear}</p>
          </div>}
          {details.fields.publications.endYear && <div>
          <p>End Year</p>
          <p >{details.student_details.publication.endYear}</p>
          </div>}
        </div>
    </div>}
    </>
  );
}

export default ApplicantDetails;
