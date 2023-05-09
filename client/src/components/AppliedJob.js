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
  }, []);

  const handleMultipleDelete=()=>{
    setDeletePressed(true);
    handleClose();
  }


  //console.log(job);
  return(
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
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
      </Modal.Footer>
    </Modal>

    <div style={{marginTop:'50px'}}>

    <section className="container px-4 py-4 mx-auto" style={{boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)", marginBottom:'50px'}}>
      <div className="flex items-center gap-x-3" style={{width:'100%'}}>
        <h2 className="text-lg font-medium text-gray-800 dark:text-white" style={{marginBottom:'0',textTransform:'none',letterSpacing:'normal',fontWeight:'bold'}}>Applied Jobs</h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400" style={{paddingRight:'12px',paddingLeft:'12px',fontWeight:'normal'}}>{job.length} jobs applied</span>
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
                {job.map((j,index) => (
                  <AppliedJobCard
                  job={j}
                  srNo={index+1}
                  selectAll={selectAll}
                  deletePressed={deletePressed}
                  length={job.length}
                  />

                ))}
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
