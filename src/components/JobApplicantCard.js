import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import './JobCard.css';
import axios from 'axios';
import {useState,useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate , useLocation } from 'react-router-dom';

function JobApplicantCard({student_name,student_email,status,application_id,id}) {

  //const [status,setStatus]=useState(status);

  const history = useNavigate();

  const [showAccept, setShowAccept] = useState(false);
  const [showReject, setShowReject] = useState(false);

  const handleCloseAccept = () => setShowAccept(false);
  const handleShowAccept = () => setShowAccept(true);
  const handleCloseReject = () => setShowReject(false);
  const handleShowReject = () => setShowReject(true);

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
    <>
      <Modal show={showAccept} onHide={handleCloseAccept}>
        <Modal.Header closeButton>
          <Modal.Title>{student_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you wish to accept the applicant for this job?</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleCloseAccept}>
            Close
          </Button>
          <Button variant="success" onClick={acceptClicked}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showReject} onHide={handleCloseReject}>
        <Modal.Header closeButton>
          <Modal.Title>{student_name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you wish to reject the applicant for this job?</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleCloseReject}>
            Close
          </Button>
          <Button variant="danger" onClick={rejectClicked}>
            Reject
          </Button>
        </Modal.Footer>
      </Modal>

      <div style={{marginTop:'30px', boxShadow:'1px 1px 1px 1px', padding:'20px', alignContent:'center'}}>
        <Container>
          <div style={{color:'black', width:'45%', margin:'0', display:'inline-block', alignContent:'center', textAlign:'center'}}>
            <h4 style={{color:'black', width:'50%', margin:'0', display:'inline-block', alignContent:'center', textAlign:'center'}}>{student_name}</h4>
            <h4 style={{color:'black'}}>Status : {status}</h4>
          </div>
          <div style={{display:'inline-block', alignItems:'center', width:'45%', marginTop:'auto', marginRight:'20px'}}>
            <Link to={`/applicant-detail/${application_id}`}><Button variant="primary" style={{ marginRight:'20px'}} >View details</Button></Link>
            <Button variant="success" style={{marginRight:'20px'}} onClick={handleShowAccept}>Accept</Button>
            <Button variant="danger" style={{marginRight:'20px'}} onClick={handleShowReject}>Reject</Button>

          </div>





        </Container>
      </div>
    </>
  );
}

export default JobApplicantCard;
