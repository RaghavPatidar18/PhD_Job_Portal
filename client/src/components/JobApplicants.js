import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import JobApplicantCard from "./JobApplicantCard";
import {useParams} from "react-router-dom";
import { useNavigate , useLocation } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";

function JobApplicants({ user, type }) {

  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [personalData, setPersonalData] = useState([]);

  const url = `/jobApplicants/${id}`;
  let count = 1;

  const history = useNavigate();

  useEffect(() => {
    if (type !== "institute") {
      history("*");
    } else {
      axios.get(url)
        .then((response) => {
          if (response.data.status === 200) {

            const defaultVal = "N/A"; // set your default value here
            const updatedData = response.data.applicantArray.map((applicant) => {
              const studentDataPersonal = Object.values(applicant.student.personal).map(val => val ?? defaultVal);
              const studentDataExperience = Object.values(applicant.student.experience).map(val => val ?? defaultVal);
              const newData = [...Object.values(applicant), ...studentDataPersonal, ...studentDataExperience];
              return newData;
            });
            setPersonalData(updatedData);
            setApplicants(response.data.applicantArray);
            console.log(response.data.applicantArray);
          }

        })
        .catch((err) => console.log(err));
    }
  }, []);

  const [showAccept,setShowAccept]=useState(false);
  const [showReject,setShowReject]=useState(false);
  const [selectAll,setSelectAll]=useState(false);
  const [acceptPressed,setAcceptPressed]=useState(false);
  const [rejectPressed,setRejectPressed]=useState(false);

  const handleShowAccept=()=>setShowAccept(true);
  const handleShowReject=()=>setShowReject(true);
  const handleCloseAccept=()=>setShowAccept(false);
  const handleCloseReject=()=>setShowReject(false);

  const handleMultipleAccept = () =>{
    setAcceptPressed(true);
    handleCloseAccept();
  }

  const handleMultipleReject = () =>{
    setRejectPressed(true);
    handleCloseReject();
  }


  const csvLink = {
    filename: "file.csv",
    data: personalData
  }

  //console.log(applicants);
  return(
    <>
    <Modal show={showAccept} onHide={handleCloseAccept}>
      <Modal.Header closeButton>
        <Modal.Title>Accept Applicants</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you wish to accept all the selected applicants? </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleCloseAccept}>
          Close
        </Button>
        <Button variant="success" onClick={handleMultipleAccept}>
          Accept
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={showReject} onHide={handleCloseReject}>
      <Modal.Header closeButton>
        <Modal.Title>Reject Applicants</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you wish to reject all the selected applicants? </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleCloseReject}>
          Close
        </Button>
        <Button variant="danger" onClick={handleMultipleReject}>
          Reject
        </Button>
      </Modal.Footer>
    </Modal>

    <div style={{marginTop:'50px'}}>


    <section className="container px-4 py-4 mx-auto" style={{boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)"}}>
      <div className="flex items-center gap-x-3" style={{width:'100%'}}>
        <h2 className="text-lg font-medium text-gray-800 dark:text-white" style={{marginBottom:'0',textTransform:'none',letterSpacing:'normal',fontWeight:'bold'}}>Job Applicants</h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400" style={{paddingRight:'12px',paddingLeft:'12px',fontWeight:'normal'}}>{applicants.length} applicants</span>
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
                        <input type="checkbox" onClick={()=>setSelectAll(!selectAll)} checked={selectAll===true} className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                        <span>Sr. no.</span>
                      </div>
                    </th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Name</th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email</th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Application Date</th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">View Applicant Detail</span>
                    </th>
                    <th scope="col" className="relative py-3.5 px-4">
                    <div className="flex items-center gap-x-12">
                        <button onClick={handleShowAccept} className="text-gray-500 transition-colors duration-200 dark:hover:text-emerald-500 dark:text-gray-300 hover:text-emerald-500 focus:outline-none">
                          <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </div>
                        </button>
                        <button onClick={handleShowReject} className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none" style={{marginLeft:'25px'}}>
                          <div class="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </div>
                        </button>
                      </div>
                    </th>


                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {applicants.map((applicant,index) => (
                  <JobApplicantCard
                  student_name={applicant.student_name}
                  student_email={applicant.student_email}
                  status={applicant.status}
                  application_id={applicant.application_id}
                  job_id={id}
                  srNo={index+1}
                  selectAll={selectAll}
                  acceptPressed={acceptPressed}
                  rejectPressed={rejectPressed}
                  length={applicants.length}
                  />

                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/*<div style={{width:'75%', margin:'auto', alignItems:'center', padding:'30px'}}>
    {applicants.map(applicant => (
      <JobApplicantCard
      student_name={applicant.student_name}
      student_email={applicant.student_email}
      status={applicant.status}
      application_id={applicant.application_id}
      job_id={id}
      />

    ))}
    </div>*/}

    </div>
    </>


  )
}

export default JobApplicants;
