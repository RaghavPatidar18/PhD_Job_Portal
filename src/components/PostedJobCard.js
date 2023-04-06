import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import './css/JobCard.css';

function PostedJobCard({title,id}) {
  return (
    <div style={{marginTop:'30px', boxShadow:'1px 1px 1px 1px', padding:'20px', backgroundColor:'white'}}>
      <Container>
          <h4 style={{color:'black', width:'50%', margin:'0', display:'inline-block', alignContent:'center', textAlign:'center'}}>{title}</h4>
          <Link to={`/job-details/${id}`}><Button variant="primary" style={{marginRight:'20px'}}>View Details</Button></Link>
          <Link to={`/job-applicants/${id}`}><Button variant="primary">View Applicants</Button></Link>
      </Container>
    </div>
  );
}

export default PostedJobCard;
