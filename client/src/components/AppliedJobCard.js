import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import './css/JobCard.css';
import {useState,useEffect} from "react";

function JobCard({job,srNo}) {

  return (

    <>
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
          <div>
            <h2 className="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>{job.title}</h2>
          </div>
        </div>
      </div>
    </td>

    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{job.college}</td>

    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{job.location}</td>

    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">{job.salary}</td>

    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">2023-01-01</td>

    <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap" style={{paddingLeft:'24px',paddingRight:'24px',paddingTop:'14px',paddingBottom:'14px'}}>
      <div className={`inline-flex items-center px-3 py-1  rounded-full gap-x-2 dark:bg-gray-800  ${job.application_status==='Pending'? 'bg-gray-100': ''}  ${job.application_status==='Accepted'? 'bg-emerald-100/60': ''} ${job.application_status==='Rejected'? 'bg-red-100/60': ''}`} >
        <h2 className={`text-sm font-normal ${job.application_status==='Pending'? 'text-gray-500': ''}  ${job.application_status==='Accepted'? 'text-emerald-500': ''} ${job.application_status==='Rejected'? 'text-red-500': ''}`} style={{marginBottom:'0',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>{job.application_status}</h2>
      </div>
    </td>

    <td class="px-4 py-4 text-sm whitespace-nowrap">
      <Link to={`/job-details/${job.job_id}`}><div class="flex items-center gap-x-6">
        <button class="text-gray-500 transition-colors duration-200 dark:hover:text-indigo-500 dark:text-gray-300 hover:text-indigo-500 focus:outline-none">
          View Job Details
        </button>
      </div></Link>
    </td>

    <td class="px-4 py-4 text-sm whitespace-nowrap">
      <div className="flex items-center gap-x-6">
        <button className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
          <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-red-500 bg-red-100/60 dark:bg-gray-800">
            <h2 class="text-sm font-normal text-red-500" style={{marginBottom:'0',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>Withdraw Application</h2>
          </div>
        </button>
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
