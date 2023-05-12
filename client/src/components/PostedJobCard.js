import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import {useState,useEffect} from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useLocation } from 'react-router-dom';
//import './css/JobCard.css';

function PostedJobCard({title,id,createDate,deleted,selectAll,deletePressed,index,length,updateDate}) {

  //const [reload,setReload]=useState(false);
  //const [firstLoad,setFirstLoad]=useState(true);

  const [jobDeleted,setJobDeleted]=useState(deleted);
  const[show,setShow]=useState(false);
  const [select,setSelect]=useState(false);

  const history = useNavigate();

  useEffect(()=>{
    if(deletePressed===true){
      //handleDelete();
      console.log("delete pressed");
      if(select===true){
        console.log(title);
        console.log("select was true");
        console.log("deleted");
        handleDelete();
      }
      if(index+1===length){
        console.log("index reached");
        window.location.reload();
      }

    }else{
      setSelect(selectAll);
    }

  },[selectAll,deletePressed])

  const selectClicked = ()=>{
    setSelect(!select);
  }

  const handleClose = () => setShow(false);
  const handleShow = ()=> setShow(true);

  function handleDelete(){
    axios.post("/delete-job",{id})
    .then((response)=> {
      if(response.data.status===200){
        console.log("deleted");
        setJobDeleted(true);
        window.location.reload(false);
      }else{
        console.log("issues");
      }
    })
    .catch((err)=> console.log(err));
  }

  function handleEdit(){
    history(`/update-job/${id}`);
  }

  return (

    <>

    <Modal show={show} onHide={handleClose}>
    <div class="relative block overflow-hidden text-left align-middle transform bg-white  sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6" style={{margin:'auto', marginTop:'10px', marginBottom:'10px'}}>
        <div class="text-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                Delete Job
            </h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400">
                Are you sure you wish to <span style={{fontWeight:'bold'}}>delete</span> this job ?
            </p>
        </div>
        <div class="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
            <button onClick={handleClose} class="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                Cancel
            </button>

            <button onClick={()=> {handleClose(); handleDelete();}} class="px-4 sm:mx-2 w-full py-2.5 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                Accept
            </button>
        </div>
    </div>
      {/*<Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you wish to delete this job?</Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={()=> {handleClose(); handleDelete();}}>
          Delete
        </Button>
      </Modal.Footer>*/}
    </Modal>

    {!jobDeleted && <tr>
      <td class="text-sm font-medium text-gray-700 whitespace-nowrap" style={{padding:'24px',paddingRight:'48px'}}>
        <div class="inline-flex items-center gap-x-3">
          <input type="checkbox" onClick={selectClicked} checked={select===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
          <div class="flex items-center gap-x-2">
            <img class="object-cover w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" />
            <div>
              <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>{title}</h2>
            </div>
          </div>
        </div>
      </td>

      <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{createDate.slice(0,10)}</td>


      <td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{updateDate}</td>

      <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap" style={{paddingLeft:'24px',paddingRight:'24px',paddingTop:'14px',paddingBottom:'14px'}}>
      <Link to={`/job-details/${id}`}>  <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
          <h2 class="text-sm font-normal text-emerald-500" style={{marginBottom:'0',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>View Job Details</h2>
        </div></Link>
      </td>

      <td class="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap" style={{paddingLeft:'24px',paddingRight:'24px',paddingTop:'14px',paddingBottom:'14px'}}>
<Link to={`/job-applicants/${id}`}><div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
          <h2 class="text-sm font-normal text-emerald-500" style={{marginBottom:'0',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>View Applicants</h2>
        </div></Link>
      </td>




      <td class="px-4 py-4 text-sm whitespace-nowrap">
        <div class="flex items-center gap-x-6">
          <button onClick={handleShow}class="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>

          <button onClick={handleEdit} class="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
          </button>
        </div>
      </td>
    </tr>}


    {/*<div>
      <Container>
          <h4 style={{color:'black', width:'50%', margin:'0', display:'inline-block', alignContent:'center', textAlign:'center'}}>{title}</h4>
          <Link to={`/job-details/${id}`}><Button variant="primary" style={{marginRight:'20px'}}>View Details</Button></Link>
          <Link to={`/job-applicants/${id}`}><Button variant="primary">View Applicants</Button></Link>
      </Container>
    </div>*/}
    </>
  );
}

export default PostedJobCard;
