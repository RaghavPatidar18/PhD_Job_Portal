import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import './JobCard.css';
import axios from 'axios';
import {useState,useEffect} from "react";

function JobApplicantCard({student_name,student_email,status,application_id,id}) {

  //const [status,setStatus]=useState(status);

  function acceptClicked(){
    console.log("sboiw");
    const obj={
      application_id,
      newStatus:"Accepted"
    };
    axios.post("http://localhost:4000/jobApplicantStatusChange", obj)
    .then((res)=> {
      console.log(res.data);
      if(res.data){
        console.log("success");
        window.location.reload(false);
      }
    })
    .catch((err)=> console.log(err));
  }

  function rejectClicked(){
    const obj={
      application_id,
      newStatus:"Rejected"
    };
    axios.post("http://localhost:4000/jobApplicantStatusChange", obj)
    .then((res)=> {
      if(res.data){
        console.log("success");
        window.location.reload(false);
      }
    })
    .catch((err)=> console.log(err));
  }


  return (
    <div className="job-card-wrapper" style={{ display: 'inline-block', width: '50%' }}>
      <Container className="job-card">
          <h1 className="job-title">{student_name}</h1>
          <Link to="/"><Button>View details</Button></Link>
          <h4 className="job-college">Status : {status}</h4>
          <Button size="sm" variant="success" onClick={acceptClicked}>Accept</Button>
          <Button size="sm" variant="danger" onClick={rejectClicked}>Reject</Button>
      </Container>
    </div>
  );
}

export default JobApplicantCard;
