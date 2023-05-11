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
  const url = `/api/jobStatus/${id}`;

  const history = useNavigate();

  // const location = useLocation();
  // const userType = new URLSearchParams(location.search).get("userType");
  // // console.log(userType);

  const [selectAll,setSelectAll]=useState(false);
  const [deletePressed,setDeletePressed]=useState(false);
  const [show,setShow]=useState(false);
  const [searchString,setSearchString]=useState("");
  const [statusFilter,setStatusFilter]=useState(false);
  const [searchPending,setSearchPending]=useState(false);
  const [searchAccepted,setSearchAccepted]=useState(false);
  const [searchRejected,setSearchRejected]=useState(false);
  const [searchWithdrew,setSearchWithdrew]=useState(false);
  const [deleteFilter,setDeleteFilter]=useState(false);
  const [jobActiveFilter,setJobActiveFilter]=useState(false);
  const [jobDeletedFilter,setJobDeletedFilter]=useState(false);

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

    //console.log(deleteFilter);
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

            <button onClick={handleMultipleDelete} class="px-4 sm:mx-2 w-full py-2.5 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                Withdraw
            </button>
        </div>
    </div>
    </Modal>


    {statusFilter && <div style={{display:'block',position:'fixed',zIndex:'1000', top:'0', bottom:'0', left:'0', right:'0', backgroundColor:"rgba(1,1,1,0.5)"}}>
    <div style={{display:'block',position:'fixed', left:'50%',top:'50%', transform:'translate(-50%,-50%)'}}>
      <div class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
        <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
          Status Filter
        </h3>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Search jobs based on your current application status.
        </p>

        <div class="mt-4" >
          <label for="emails-list" class="text-sm text-gray-700 dark:text-gray-200" style={{marginLeft:'5px'}}>
            Status
          </label>
          <div className="grid grid-cols-2 mt-3">
            <button onClick={()=> setSearchPending(!searchPending)}className={`text-sm font-normal text-indigo-500 inline-flex items-center px-3 rounded-full gap-x-2 dark:bg-gray-800 ${searchPending? "bg-indigo-300/60":"bg-indigo-100/60"} hover:bg-indigo-200/60`} style={{margin:'5px',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>Pending</button>
            <button onClick={()=> setSearchAccepted(!searchAccepted)}className={`text-sm font-normal text-emerald-500 inline-flex items-center px-3 rounded-full gap-x-2 dark:bg-gray-800 ${searchAccepted? "bg-emerald-300/60":"bg-emerald-100/60"} hover:bg-emerald-200/60`} style={{margin:'5px',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>Accepted</button>
            <button onClick={()=> setSearchRejected(!searchRejected)} className={`text-sm font-normal text-red-500 inline-flex items-center px-3 rounded-full gap-x-2 dark:bg-gray-800  ${searchRejected? "bg-red-300/60":"bg-red-100/60"} hover:bg-red-200/60`} style={{margin:'5px',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>Rejected</button>
            <button onClick={()=> setSearchWithdrew(!searchWithdrew)}className={`text-sm font-normal text-gray-500 inline-flex items-center px-3 rounded-full gap-x-2 dark:bg-gray-800  ${searchWithdrew? "bg-gray-300":"bg-gray-100"} hover:bg-gray-200`} style={{margin:'5px',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>Withdrew</button>
          </div>
          <div class="mt-4 sm:flex sm:items-center sm:-mx-2">
            <button onClick={()=> {setSearchPending(false); setSearchAccepted(false); setSearchRejected(false); setSearchWithdrew(false); }}type="button" class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
              Clear
            </button>

            <button onClick={()=> {setStatusFilter(false);}}type="button" class="w-full px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>}

    {deleteFilter && <div style={{display:'block',position:'fixed',zIndex:'1000', top:'0', bottom:'0', left:'0', right:'0', backgroundColor:"rgba(1,1,1,0.5)"}}>
    <div style={{display:'block',position:'fixed', left:'50%',top:'50%', transform:'translate(-50%,-50%)'}}>
      <div class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
        <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
          Job Status Filter
        </h3>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Search jobs based on their current activity status.
        </p>

        <div class="mt-4" >
          <label for="emails-list" class="text-sm text-gray-700 dark:text-gray-200" style={{marginLeft:'5px'}}>
            Status
          </label>
          <div className="grid grid-cols-1 mt-3">
            <button onClick={()=> setJobActiveFilter(!jobActiveFilter)}className={`text-sm font-normal text-emerald-500 inline-flex items-center px-3 rounded-full gap-x-2 dark:bg-gray-800 ${jobActiveFilter? "bg-emerald-300/60":"bg-emerald-100/60"} hover:bg-emerald-200/60`} style={{margin:'5px',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>Active</button>
            <button onClick={()=> setJobDeletedFilter(!jobDeletedFilter)}className={`text-sm font-normal text-red-500 inline-flex items-center px-3 rounded-full gap-x-2 dark:bg-gray-800 ${jobDeletedFilter? "bg-red-300/60":"bg-red-100/60"} hover:bg-red-200/60`} style={{margin:'5px',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>Deleted</button>
            </div>
          <div class="mt-4 sm:flex sm:items-center sm:-mx-2">
            <button onClick={()=> {setJobActiveFilter(false); setJobDeletedFilter(false);  }}type="button" class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
              Clear
            </button>

            <button onClick={()=> { setDeleteFilter(false);}}type="button" class="w-full px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>}


    <div style={{marginTop:'50px'}}>

    <section className="container px-4 py-4 mx-auto" style={{boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)", marginBottom:'50px'}}>
      <div className="flex items-center gap-x-3" style={{width:'100%'}}>
        <h2 className="text-lg font-medium text-gray-800 dark:text-white" style={{marginBottom:'0',textTransform:'none',letterSpacing:'normal',fontWeight:'bold'}}>Applied Jobs</h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400" style={{paddingRight:'12px',paddingLeft:'12px',fontWeight:'normal'}}>{job.length} jobs applied</span>
      </div>

      <div class="mt-6 md:flex md:items-center md:justify-between">
      <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
          <button onClick={()=> setStatusFilter(true)} class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Status Filter
          </button>

          <button onClick={()=> setDeleteFilter(true)}class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Job Status Filter
          </button>
      </div>

      {/*<div class="mt-6 md:flex md:items-center md:justify-between">
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
      </div>*/}

        <div class="relative flex items-center mt-4 md:mt-0" style={{margin:'auto', marginRight:'0'}}>
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
                  console.log("here in map");
                  if(j.title.toLowerCase().includes(searchString.toLowerCase()) ){
                    console.log("search filter passed");
                    if((searchPending===true && j.application_status==="Pending") || (searchAccepted===true && j.application_status==="Accepted") || (searchRejected===true && j.application_status==="Rejected") || (searchWithdrew===true && j.application_status==="Withdrew") ||  (searchWithdrew===false && searchPending===false && searchAccepted===false && searchRejected===false)){
                      console.log(j);
                      if((jobActiveFilter===true && j.deleted===false) || (jobDeletedFilter===true && j.deleted===true) || (jobActiveFilter===false && jobDeletedFilter===false)){
                        console.log("all filters");
                        console.log(j);
                        return <AppliedJobCard
                        job={j}
                        srNo={index+1}
                        selectAll={selectAll}
                        deletePressed={deletePressed}
                        length={job.length}
                        />
                      }

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
