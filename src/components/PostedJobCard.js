import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import './JobCard.css';

function PostedJobCard({title,id}) {
  return (
    <div className="job-card-wrapper" style={{ display: 'inline-block', width: '50%' }}>
      <Container className="job-card">
          <h1 className="job-title">{title}</h1>
          <Link to={`/job-details/${id}`}><Button>View Details</Button></Link>
          <Link to={`/job-applicants/${id}`}><Button>View Applicants</Button></Link>
      </Container>
    </div>
  );
}

export default PostedJobCard;
