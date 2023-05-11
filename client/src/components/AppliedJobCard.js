import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import './css/JobCard.css';
import {useState,useEffect} from "react";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';

function JobCard({job,srNo,selectAll,deletePressed,length}) {

  const [status,setStatus]=useState(job.application_status);
  console.log(srNo);
  console.log(status);
  const [show,setShow]=useState(false);
  const [select,setSelect]=useState(false);

  const handleClose =()=> setShow(false);
  const handleShow=()=> setShow(true);

  function handleWithdraw(){
    const id=job.application_id;
    axios.post("/withdraw-application",{id})
    .then((response)=> {
      if(response.data.status===200){
        console.log("withdrew");
        setStatus("Withdrew");
        window.location.reload(false);
      }else{
        console.log("error");
      }
    })
    .catch((err)=> console.log(err));
  }

  useEffect(()=>{
    if(deletePressed===true){
      if(select===true){
        handleWithdraw();
      }
      if(srNo===length){
        window.location.reload();
      }
    }else{
      setSelect(selectAll);
    }
  },[selectAll,deletePressed])

  return (

    <>

    <Modal show={show} onHide={handleClose}>
    <div class="relative block overflow-hidden text-left align-middle transform bg-white  sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6" style={{margin:'auto', marginTop:'10px', marginBottom:'10px'}}>
        <div class="text-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                Withdraw Application
            </h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400">
                Are you sure you wish to <span style={{fontWeight:'bold'}}>withdraw</span> your application ? You will <span style={{fontWeight:'bold'}}>not</span> be able to apply again.
            </p>
        </div>
        <div class="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
            <button onClick={handleClose} class="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                Cancel
            </button>

            <button onClick={()=> {handleClose();handleWithdraw();}} class="px-4 sm:mx-2 w-full py-2.5 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                Withdraw
            </button>
        </div>
    </div>
      {/*<Modal.Header closeButton>
        <Modal.Title>{job.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you wish to withdraw your application for this job? You will not be able to apply again</Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={()=> {handleClose();handleWithdraw();}}>
          Accept
        </Button>
      </Modal.Footer>*/}
    </Modal>
    <tr>

    <td className="px-4 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
      <div className="inline-flex items-center gap-x-3">
        <input type="checkbox" onClick={()=>setSelect(!select)} checked={select===true} className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"/>
        <span>#{srNo}</span>
      </div>
    </td>

    <td className="text-sm font-medium text-gray-700 whitespace-nowrap" style={{padding:'24px',paddingRight:'48px'}}>
      <div className="inline-flex items-center gap-x-3">
        <div className="flex items-center gap-x-2">
          <div>
            <h2 className="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>{job.title}</h2>
          </div>
        </div>
      </div>
    </td>

    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{job.college}</td>

    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{job.location}</td>

    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{job.salary}</td>

    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{job.application_date}</td>

    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap" style={{paddingLeft:'24px',paddingRight:'24px',paddingTop:'14px',paddingBottom:'14px'}}>
      <div className={`inline-flex items-center px-3 py-1  rounded-full gap-x-2 dark:bg-gray-800  ${status==='Pending'? 'bg-indigo-100/60': ''} ${status==='Withdrew'? 'bg-gray-100': ''} ${status==='Accepted'? 'bg-emerald-100/60': ''} ${status==='Rejected'? 'bg-red-100/60': ''}`} >
        <h2 className={`text-sm font-normal ${status==='Pending'? 'text-indigo-500': ''} ${status==='Withdrew'? 'text-gray-500': ''}  ${status==='Accepted'? 'text-emerald-500': ''} ${status==='Rejected'? 'text-red-500': ''}`} style={{marginBottom:'0',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>{status}</h2>
      </div>
    </td>

    {!job.deleted && <td class="px-4 py-4 text-sm whitespace-nowrap">
      <Link to={`/job-details/${job.job_id}`}><div class="flex items-center gap-x-6">
        <button class="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
          View Job Details
        </button>
      </div></Link>
    </td>}

    {job.deleted && <td class="px-4 py-4 text-sm whitespace-nowrap">
      <div class="flex items-center gap-x-6">
        <button class="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
        <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 dark:bg-gray-800">
          <h2 class="text-sm font-normal text-red-500" style={{marginBottom:'0',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>The job has been deleted!</h2>
        </div>
        </button>
      </div>
    </td>}

    <td class="px-4 py-4 text-sm whitespace-nowrap">
      <div className="flex items-center gap-x-6">
        {status!=="Withdrew" && <button onClick={handleShow} className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        </button>}
      </div>
    </td>

    </tr>
    {/*<div className="job-card-wrapper" style={{ display: 'inline-block', width: '50%' }}>
    <Link to={`/job-details/${job_id}`} style={{textDecoration:'none'}}>
      <Container className="job-card" >

          <h1 className="job-title">{title}</h1>

          <h4 className="job-college">College : {college}</h4>

          <h4 className="job-college" >Status : {application_status}</h4>

      </Container>
      </Link>
    </div>*/}

    </>
  );
}

export default JobCard;
