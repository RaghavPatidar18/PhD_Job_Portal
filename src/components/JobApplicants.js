import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect} from "react";
import JobApplicantCard from "./JobApplicantCard";
import {useParams} from "react-router-dom";
import { useNavigate , useLocation } from 'react-router-dom';

function JobApplicants({user,type}){

  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const url = `http://localhost:4000/jobApplicants/${id}`;

  const history = useNavigate();

  useEffect(() => {
    if(type!=="institute"){
      history("*");
    }else{
      axios.get(url)
        .then((response) => {
          if(response.data.status===200){
            setApplicants(response.data.applicantArray);
          }

        })
        .catch((err) => console.log(err));
    }
  }, []);


  //console.log(applicants);
  return(
    <div style={{width:'75%', margin:'auto', alignItems:'center', padding:'30px'}}>
    {applicants.map(applicant => (
      <JobApplicantCard
      student_name={applicant.student_name}
      student_email={applicant.student_email}
      status={applicant.status}
      application_id={applicant.application_id}
      job_id={id}
      />

    ))}
    </div>


  )
}

export default JobApplicants;
