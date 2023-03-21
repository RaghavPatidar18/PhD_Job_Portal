import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import './JobCard.css';
import { useState, useEffect } from "react";
import axios from "axios";

function JobCard({ _id, title, college, location, salary }) {

  const [applied, setApplied]=useState("Apply");
  const [isStudent,setIsStudent]=useState(false);

  useEffect(()=> {
    axios.get(`http://localhost:4000/jobCardApply/${_id}`)
      .then((response)=> {
        if(response.data.userType==="student"){
          setIsStudent(true);
        }
        if(response.data.applied===true)
        {
          setApplied("Applied");
        }

      })
  })

  return (
    <div className="job-card-wrapper" style={{ display: 'inline-block', width: '50%' }}>
      <Container className="job-card">
        <Link to={`/job-details/${_id}`} className="job-link">

          <h1 className="job-title">{title}</h1>

          <h4 className="job-college">College : {college}</h4>
          <p className="job-location">Location :  {location}</p>
          <p className="job-salary"> Salary :  {salary}</p>
          {isStudent && <Button variant="primary" className="job-button">{applied}</Button>}
        </Link>
      </Container>
    </div>
  );
}

export default JobCard;
