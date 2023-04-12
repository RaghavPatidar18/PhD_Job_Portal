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
import "./css/ApplicantDetails.css";

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
              console.log(response.data.details);
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
        {details.fields.personal.fathername && <div>
          <p>Father's Name: </p>
          <p>{details.student_details.personal.fathername}</p>
        </div>}
        {details.fields.personal.profile_image_url && <div>
          <p>Profile image url: </p>
          <p>{details.student_details.personal.profile_image_url}</p>
        </div>}
        {details.fields.personal.dob && <div>
          <p>Date of Birth: </p>
          <p>{details.student_details.personal.dob}</p>
        </div>}
        {details.fields.personal.married && <div>
          <p>Married Status: </p>
          <p>{details.student_details.personal.married}</p>
        </div>}
        {details.fields.personal.disablity && <div>
          <p>Disablity: </p>
          <p>{details.student_details.personal.disablity}</p>
        </div>}
        {details.fields.personal.nationality && <div>
          <p>Nationality: </p>
          <p>{details.student_details.personal.nationality}</p>
        </div>}

        {details.fields.personal.communication_address && <div>
          <p>communication_address: </p>
          <p>{details.student_details.personal.communication_address}</p>
        </div>}
        {details.fields.personal.communication_city && <div>
          <p>communication_city: </p>
          <p>{details.student_details.personal.communication_city}</p>
        </div>}
        {details.fields.personal.communication_state && <div>
          <p>communication_state: </p>
          <p>{details.student_details.personal.communication_state}</p>
        </div>}
        {details.fields.personal.communication_pincode && <div>
          <p>communication_pincode: </p>
          <p>{details.student_details.personal.communication_pincode}</p>
        </div>}
        {details.fields.personal.communication_country && <div>
          <p>communication_country: </p>
          <p>{details.student_details.personal.communication_country}</p>
        </div>}

        {details.fields.personal.permanent_address && <div>
          <p>permanent_address: </p>
          <p>{details.student_details.personal.permanent_address}</p>
        </div>}
        {details.fields.personal.permanent_city && <div>
          <p>permanent_city: </p>
          <p>{details.student_details.personal.permanent_city}</p>
        </div>}
        {details.fields.personal.permanent_state && <div>
          <p>permanent_state: </p>
          <p>{details.student_details.personal.permanent_state}</p>
        </div>}
        {details.fields.personal.permanent_pincode && <div>
          <p>permanent_pincode: </p>
          <p>{details.student_details.personal.permanent_pincode}</p>
        </div>}
        {details.fields.personal.permanent_country && <div>
          <p>permanent_country: </p>
          <p>{details.student_details.personal.permanent_country}</p>
        </div>}

        {details.fields.personal.mobile && <div>
          <p>mobile: </p>
          <p>{details.student_details.personal.mobile}</p>
        </div>}
        {details.fields.personal.altmobile && <div>
          <p>altmobile: </p>
          <p>{details.student_details.personal.altmobile}</p>
        </div>}


      </div>


        <div className="applicant_field">
          <h6>Academic</h6>
          {details.fields.academic.board10 && <div>
          <p>board10: </p>
          <p>{details.student_details.academic.board10}</p>
          </div>}
          {details.fields.academic.percentageformat10 && <div>
          <p>percentageformat10: </p>
          <p >{details.student_details.academic.percentageformat10}</p>
          </div>}
          {details.fields.academic.percentage10 && <div>
          <p>percentage10: </p>
          <p >{details.student_details.academic.percentage10}</p>
          </div>}
          {details.fields.academic.year10 && <div>
          <p>year10: </p>
          <p >{details.student_details.academic.year10}</p>
          </div>}
          {details.fields.academic.remarks10 && <div>
          <p>remarks10: </p>
          <p >{details.student_details.academic.remarks10}</p>
          </div>}
          {details.fields.academic.marksheet10 && <div>
          <p>marksheet10: </p>
          <p >{details.student_details.academic.marksheet10}</p>
          </div>}

          {details.fields.academic.board12 && <div>
          <p>board12: </p>
          <p>{details.student_details.academic.board12}</p>
          </div>}
          {details.fields.academic.percentageformat12 && <div>
          <p>percentageformat12: </p>
          <p >{details.student_details.academic.percentageformat12}</p>
          </div>}
          {details.fields.academic.percentage12 && <div>
          <p>percentage12: </p>
          <p >{details.student_details.academic.percentage12}</p>
          </div>}
          {details.fields.academic.year12 && <div>
          <p>year12: </p>
          <p >{details.student_details.academic.year12}</p>
          </div>}
          {details.fields.academic.remarks12 && <div>
          <p>remarks12: </p>
          <p >{details.student_details.academic.remarks12}</p>
          </div>}
          {details.fields.academic.marksheet12 && <div>
          <p>marksheet12: </p>
          <p >{details.student_details.academic.marksheet12}</p>
          </div>}

          {details.fields.academic.collegebtech && <div>
          <p>collegebtech: </p>
          <p>{details.student_details.academic.collegebtech}</p>
          </div>}
          {details.fields.academic.branchbtech && <div>
          <p>branchbtech: </p>
          <p >{details.student_details.academic.branchbtech}</p>
          </div>}
          {details.fields.academic.percentageformatbtech && <div>
          <p>percentageformatbtech: </p>
          <p >{details.student_details.academic.percentageformatbtech}</p>
          </div>}
          {details.fields.academic.percentagebtech && <div>
          <p>percentagebtech: </p>
          <p >{details.student_details.academic.percentagebtech}</p>
          </div>}
          {details.fields.academic.yearbtech && <div>
          <p>yearbtech: </p>
          <p >{details.student_details.academic.yearbtech}</p>
          </div>}
          {details.fields.academic.remarksbtech && <div>
          <p>remarksbtech: </p>
          <p >{details.student_details.academic.remarksbtech}</p>
          </div>}
          {details.fields.academic.marksheetbtechurl && <div>
          <p>marksheetbtechurl: </p>
          <p >{details.student_details.academic.marksheetbtechurl}</p>
          </div>}

          {details.fields.academic.collegemtech && <div>
          <p>collegemtech: </p>
          <p>{details.student_details.academic.collegemtech}</p>
          </div>}
          {details.fields.academic.branchmtech && <div>
          <p>branchmtech: </p>
          <p >{details.student_details.academic.branchmtech}</p>
          </div>}
          {details.fields.academic.percentageformatmtech && <div>
          <p>percentageformatmtech: </p>
          <p >{details.student_details.academic.percentageformatmtech}</p>
          </div>}
          {details.fields.academic.percentagemtech && <div>
          <p>percentagemtech: </p>
          <p >{details.student_details.academic.percentagemtech}</p>
          </div>}
          {details.fields.academic.yearmtech && <div>
          <p>yearmtech: </p>
          <p >{details.student_details.academic.yearmtech}</p>
          </div>}
          {details.fields.academic.remarksmtech && <div>
          <p>remarksmtech: </p>
          <p >{details.student_details.academic.remarksmtech}</p>
          </div>}
          {details.fields.academic.marksheetmtechurl && <div>
          <p>marksheetmtechurl: </p>
          <p >{details.student_details.academic.marksheetmtechurl}</p>
          </div>}

          {details.fields.academic.isphdcompleted && <div>
          <p>isphdcompleted: </p>
          <p >{details.student_details.academic.isphdcompleted}</p>
          </div>}
          {details.fields.academic.phdremarks && <div>
          <p>phdremarks: </p>
          <p >{details.student_details.academic.phdremarks}</p>
          </div>}

        </div>

        <div className="applicant_field">
          <h6>Experience</h6>
          {details.fields.experience.profile && <div>
          <p>profile: </p>
          <p >{details.student_details.experience.profile}</p>
          </div>}
          {details.fields.experience.organization && <div>
          <p>organization: </p>
          <p >{details.student_details.experience.organization}</p>
          </div>}
          {details.fields.experience.location && <div>
          <p>Location: </p>
          <p >{details.student_details.experience.location}</p>
          </div>}
          {details.fields.experience.startdate && <div>
          <p>Start date: </p>
          <p >{details.student_details.experience.startdate}</p>
          </div>}
          {details.fields.experience.enddate && <div>
          <p>End date: </p>
          <p >{details.student_details.experience.enddate}</p>
          </div>}
          {details.fields.experience.description && <div>
          <p>description: </p>
          <p >{details.student_details.experience.description}</p>
          </div>}
        </div>


        <div className="applicant_field">
          <h6>publication</h6>
          {details.fields.publication.title && <div>
          <p>Title: </p>
          <p >{details.student_details.publication.title}</p>
          </div>}
          {details.fields.publication.journal && <div>
          <p>Journal: </p>
          <p>{details.student_details.publication.journal}</p>
          </div>}
          {details.fields.publication.abstract && <div>
          <p>abstract: </p>
          <p>{details.student_details.publication.abstract}</p>
          </div>}
          {details.fields.publication.volume && <div>
          <p>volume: </p>
          <p >{details.student_details.publication.volume}</p>
          </div>}
          {details.fields.publication.pages && <div>
          <p>pages</p>
          <p >{details.student_details.publication.pages}</p>
          </div>}
          {details.fields.publication.publisher && <div>
          <p>publisher</p>
          <p >{details.student_details.publication.publisher}</p>
          </div>}
          {details.fields.publication.doi && <div>
          <p>doi</p>
          <p >{details.student_details.publication.doi}</p>
          </div>}
          {details.fields.publication.url && <div>
          <p>url</p>
          <p >{details.student_details.publication.url}</p>
          </div>}
        </div>


        <div className="applicant_field">
          <h6>por</h6>
          {details.fields.por.title && <div>
          <p>Title: </p>
          <p >{details.student_details.por.title}</p>
          </div>}
          {details.fields.por.organization && <div>
          <p>organization: </p>
          <p>{details.student_details.por.organization}</p>
          </div>}
          {details.fields.por.location && <div>
          <p>location: </p>
          <p>{details.student_details.por.location}</p>
          </div>}
          {details.fields.por.startdate && <div>
          <p>startdate: </p>
          <p >{details.student_details.por.startdate}</p>
          </div>}
          {details.fields.por.enddate && <div>
          <p>enddate</p>
          <p >{details.student_details.por.enddate}</p>
          </div>}
          {details.fields.por.description && <div>
          <p>description</p>
          <p >{details.student_details.por.description}</p>
          </div>}
        </div>

        <div className="applicant_field">
          <h6>reference</h6>
          {details.fields.reference.name && <div>
          <p>name: </p>
          <p >{details.student_details.reference.name}</p>
          </div>}
          {details.fields.reference.title && <div>
          <p>title: </p>
          <p>{details.student_details.reference.title}</p>
          </div>}
          {details.fields.reference.affliliation && <div>
          <p>affliliation: </p>
          <p>{details.student_details.reference.affliliation}</p>
          </div>}
          {details.fields.reference.referenceemail && <div>
          <p>referenceemail: </p>
          <p >{details.student_details.reference.referenceemail}</p>
          </div>}
          {details.fields.reference.referencephone && <div>
          <p>referencephone</p>
          <p >{details.student_details.reference.referencephone}</p>
          </div>}
          {details.fields.reference.relationship && <div>
          <p>relationship</p>
          <p >{details.student_details.reference.relationship}</p>
          </div>}
          {details.fields.reference.description && <div>
          <p>description</p>
          <p >{details.student_details.reference.description}</p>
          </div>}
        </div>



    </div>}
    </>
  );
}

export default ApplicantDetails;
