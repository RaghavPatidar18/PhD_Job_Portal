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

function AppliedJob({user,type}){

  const { id } = useParams();
  const [job, setJob] = useState([]);
  const url = `http://localhost:4000/jobStatus/${id}`;

  const history = useNavigate();

  // const location = useLocation();
  // const userType = new URLSearchParams(location.search).get("userType");
  // // console.log(userType);




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


  //console.log(job);
  return(
    <div style={{marginTop:'50px'}}>

    <section className="container px-4 py-4 mx-auto" style={{boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)"}}>
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
                        <input type="checkbox" className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
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
                      <span className="sr-only">Withdraw</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {job.map((j,index) => (
                  <AppliedJobCard
                  job={j}
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

    {/*<div>
    {job.map((j,index) => (
      <AppliedJobCard
      job={j}
      srNo={index}
      />

    ))}
    </div>*/}
    </div>


  )
}

export default AppliedJob;
