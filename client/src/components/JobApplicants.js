import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect} from "react";
import JobApplicantCard from "./JobApplicantCard";
import {useParams} from "react-router-dom";
import { useNavigate , useLocation } from 'react-router-dom';

function JobApplicants({user,type}){

  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const url = `http://localhost:4000/jobApplicants/${id}`;
  let count=1;

  const history = useNavigate();

  useEffect(() => {
    if(type!=="institute"){
      history("*");
    }else{
      axios.get(url)
        .then((response) => {
          if(response.data.status===200){
            setApplicants(response.data.applicantArray);
          }

        })
        .catch((err) => console.log(err));
    }
  }, []);


  //console.log(applicants);
  return(
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
                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
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
                      <span className="sr-only">Accept/Reject</span>
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


  )
}

export default JobApplicants;
