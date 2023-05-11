import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect} from "react";
import AppliedJobCard from "./AppliedJobCard";
import { useNavigate , useLocation } from 'react-router-dom';
import {useParams} from "react-router-dom";
import Modal from "react-bootstrap/Modal";

function AppliedJob({user,type}){

  const { id } = useParams();
  const [job, setJob] = useState([]);
  const url = `http://localhost:4000/jobStatus/${id}`;

  const history = useNavigate();

  // const location = useLocation();
  // const userType = new URLSearchParams(location.search).get("userType");
  // // console.log(userType);

  const [selectAll,setSelectAll]=useState(false);
  const [deletePressed,setDeletePressed]=useState(false);
  const [show,setShow]=useState(false);
  const [searchString,setSearchString]=useState("");
  const [statusFilter,setStatusFilter]=useState("Select Status");
  const [deleteFilter,setDeleteFilter]=useState("All Jobs");

  const handleShow=()=>setShow(true);
  const handleClose=()=>setShow(false);



  useEffect(() => {
    if(user.email===undefined || type!="student"){
      history("*");
    }else{
    axios.get(url)
      .then((response) => {
        setJob(response.data.applicationArray);
      })
      .catch((err) => console.log(err));
    }

    console.log(deleteFilter);
  }, []);

  const handleMultipleDelete=()=>{
    setDeletePressed(true);
    handleClose();
  }


  //console.log(job);
  return(
    <>
    <Modal show={show} onHide={handleClose}>
    <div class="relative block overflow-hidden text-left align-middle transform bg-white  sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6" style={{margin:'auto', marginTop:'10px', marginBottom:'10px'}}>
        <div class="text-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                Withdraw Applications
            </h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400">
                Are you sure you wish to <span style={{fontWeight:'bold'}}>withdraw</span> all the selected applications? You will <span style={{fontWeight:'bold'}}>not</span> be able to apply for the corresponding jobs again.
            </p>
        </div>
        <div class="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
            <button onClick={handleClose} class="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                Cancel
            </button>

            <button onClick={handleMultipleDelete} class="px-4 sm:mx-2 w-full py-2.5 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                Withdraw
            </button>
        </div>
    </div>
      {/*<Modal.Header closeButton>
        <Modal.Title>Withdraw Applications</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you wish to withdraw all the selected applications? You will not be able to apply for the corresponding jobs again.</Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleMultipleDelete}>
          Delete
        </Button>
      </Modal.Footer>*/}
    </Modal>

    <div style={{marginTop:'50px'}}>

    <section className="container px-4 py-4 mx-auto" style={{boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)", marginBottom:'50px'}}>
      <div className="flex items-center gap-x-3" style={{width:'100%'}}>
        <h2 className="text-lg font-medium text-gray-800 dark:text-white" style={{marginBottom:'0',textTransform:'none',letterSpacing:'normal',fontWeight:'bold'}}>Applied Jobs</h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400" style={{paddingRight:'12px',paddingLeft:'12px',fontWeight:'normal'}}>{job.length} jobs applied</span>
      </div>

      <div class="mt-6 md:flex md:items-center md:justify-between">
      <div class="inline-flex overflow-hidden bg-white  divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
        <div class="gap-6 mt-4 ">
        <select  onChange={(e)=> setStatusFilter(e.target.value)} class="inline-block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
          <option value="Select Status" selected={statusFilter==="Select Status"}>Select Status</option>
          <option value="Pending" selected={statusFilter==="Pending"}>Pending</option>
          <option value="Accepted" selected={statusFilter==="Accepted"} >Accepted</option>
          <option value="Rejected" selected={statusFilter==="Rejected"}>Rejected</option>
          <option value="Withdrew" selected={statusFilter==="Withdrew"}>Withdrew</option>
        </select>
        <select  onChange={(e)=> setDeleteFilter(e.target.value)} class="inline-block w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
          <option value="All Jobs" selected={deleteFilter==="All Jobs"}>All Jobs</option>
          <option value="Active Jobs" selected={deleteFilter==="Active Jobs"}>Active Jobs</option>
          <option value="Deleted Jobs" selected={deleteFilter==="Deleted Jobs"} >Deleted Jobs</option>
        </select>
        </div>
      </div>

        <div class="relative flex items-center mt-4 md:mt-0">
          <span class="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>

          <input type="text" value={searchString} onChange={(e)=> setSearchString(e.target.value)} style={{paddingTop:'6px',paddingBottom:'6px', paddingLeft:'44px',paddingRight:'20px'}} placeholder="Search" class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
        </div>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>

                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-x-3">
                        <input type="checkbox" onClick={()=> setSelectAll(!selectAll)} checked={selectAll===true} className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                        <span>Sr. no.</span>
                      </div>
                    </th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Job title</th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">College</th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Location</th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Salary</th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Date of Application</th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>

                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">View Job details</span>
                    </th>
                    <th scope="col" className="relative py-3.5 px-4">
                      <span >
                        <button  onClick={handleShow} class="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {job.map((j,index) => {
                  if(j.title.toLowerCase().includes(searchString.toLowerCase()) && ((deleteFilter==="All Jobs") || (deleteFilter==="Active Jobs" && j.deleted===false) || (deleteFilter==="Deleted Jobs" && j.deleted===true))){
                    if((statusFilter==="Pending" && j.application_status==="Pending") || (statusFilter==="Accepted" && j.application_status==="Accepted") || (statusFilter==="Rejected" && j.application_status==="Rejected") || (statusFilter==="Withdrew" && j.application_status==="Withdrew") || (statusFilter==="Select Status")){
                      return <AppliedJobCard
                      job={j}
                      srNo={index+1}
                      selectAll={selectAll}
                      deletePressed={deletePressed}
                      length={job.length}
                      />
                    }

                  }


                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </section>

    {/*<div>
    {job.map((j,index) => (
      <AppliedJobCard
      job={j}
      srNo={index}
      />

    ))}
    </div>*/}
    </div>
    </>


  )
}

export default AppliedJob;
