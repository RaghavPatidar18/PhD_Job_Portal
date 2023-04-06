import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import './css/JobCard.css';
import {useState,useEffect} from "react";

function JobCard({title, college, application_status,job_id }) {

  return (

    <div className="job-card-wrapper" style={{ display: 'inline-block', width: '50%' }}>
    <Link to={`/job-details/${job_id}`} style={{textDecoration:'none'}}>
      <Container className="job-card" >

          <h1 className="job-title">{title}</h1>

          <h4 className="job-college">College : {college}</h4>

          <h4 className="job-college" >Status : {application_status}</h4>

      </Container>
      </Link>
    </div>
  );
}

export default JobCard;
