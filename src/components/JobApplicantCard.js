import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import './css/JobCard.css';
import axios from 'axios';
import {useState,useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate , useLocation } from 'react-router-dom';

function JobApplicantCard({student_name,student_email,status,application_id,id,srNo}) {

  //const [status,setStatus]=useState(status);
  console.log(srNo);
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


      <tr>
        <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
          <div className="inline-flex items-center gap-x-3">
            <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"/>
            <span>#{srNo}</span>
          </div>
        </td>

        <td className="text-sm font-medium text-gray-700 whitespace-nowrap" style={{padding:'24px',paddingRight:'48px'}}>
          <div className="inline-flex items-center gap-x-3">
            <div className="flex items-center gap-x-2">
              <img className="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
              <div>
                <h2 className="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>{student_name}</h2>
              </div>
            </div>
          </div>
        </td>

        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{student_email}</td>

        <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">2023-01-01</td>

        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap" style={{paddingLeft:'24px',paddingRight:'24px',paddingTop:'14px',paddingBottom:'14px'}}>
          <div className={`inline-flex items-center px-3 py-1  rounded-full gap-x-2 dark:bg-gray-800  ${status==='Pending'? 'bg-gray-100': ''}  ${status==='Accepted'? 'bg-emerald-100/60': ''} ${status==='Rejected'? 'bg-red-100/60': ''}`} >
            <h2 className={`text-sm font-normal ${status==='Pending'? 'text-gray-500': ''}  ${status==='Accepted'? 'text-emerald-500': ''} ${status==='Rejected'? 'text-red-500': ''}`} style={{marginBottom:'0',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>{status}</h2>
          </div>
        </td>

        <td class="px-4 py-4 text-sm whitespace-nowrap">
          <Link to={`/applicant-detail/${application_id}`}><div class="flex items-center gap-x-6">
            <button class="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
              View Applicant Details
            </button>
          </div></Link>
        </td>

        {/*<td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap" style={{paddingLeft:'24px',paddingRight:'24px',paddingTop:'14px',paddingBottom:'14px'}}>
        <Link to={`/applicant-detail/${application_id}`}>  <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-blue-100 dark:bg-gray-800">
            <h2 className="text-sm font-normal text-indigo-500" style={{marginBottom:'0',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>View Applicant Details</h2>
          </div></Link>
        </td>*/}

        <td class="px-4 py-4 text-sm whitespace-nowrap">
          <div className="flex items-center gap-x-6">
            <button onClick={handleShowAccept} className="text-gray-500 transition-colors duration-200 dark:hover:text-emerald-500 dark:text-gray-300 hover:text-emerald-500 focus:outline-none">

              <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <h2 class="text-sm font-normal text-emerald-500" style={{marginBottom:'0',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>Accept</h2>
              </div>
            </button>

            <button onClick={handleShowReject} className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
              <div class="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <h2 class="text-sm font-normal text-red-500" style={{marginBottom:'0',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>Reject</h2>
              </div>
            </button>
          </div>
        </td>



      </tr>

      {/*<div style={{marginTop:'30px', boxShadow:'1px 1px 1px 1px', padding:'20px', alignContent:'center'}}>
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
      </div>*/}
    </>
  );
}

export default JobApplicantCard;
