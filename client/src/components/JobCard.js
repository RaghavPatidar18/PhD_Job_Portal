import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import './css/JobCard.css';
import { useState, useEffect } from "react";
import axios from "axios";

function JobCard({ _id, title, college, location, salary, lastDate, deleted }) {



  return (
    <>

      {!deleted &&
        <div class="max-w-lg px-8 py-4 bg-white rounded-lg shadow-lg dark:bg-gray-800">
          <div class="flex items-center justify-between">
            <span class="text-sm font-light text-gray-600 dark:text-gray-400">Mar 10, 2019</span>
            <Link to={`/job-details/${_id}`} className="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabIndex="0" role="button">
              View Job
            </Link>
            {/* <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabindex="0" role="button">View Job</a> */}
          </div>

          <div style={{ marginLeft: "20px" }} class="mt-2">
            {/* <a href="#" class="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabindex="0" role="link">{title}</a>
             */}
             <p class="text-xl font-bold text-blue-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{title}</p>
            <p class="mt-2 text-gray-600 dark:text-gray-300">College : {college}</p>
            <p class="mt-2 text-gray-600 dark:text-gray-300">Location :  {location}</p>
            <p class="mt-2 text-gray-600 dark:text-gray-300"> Salary :  {salary}</p>
            <p class="mt-2 text-gray-600 dark:text-gray-300"> Last Date: {lastDate}</p>
          </div>
        </div>
      }

      {/* {!deleted &&
        <div className="job-card-wrapper" style={{ display: 'inline-block', width: '50%' }}>
          <Container style={{ borderRadius: '0px' }} className="job-card">
            <Link to={`/job-details/${_id}`} className="job-link">

              <h1 className="job-title">{title}</h1>

              <h4 className="job-college">College : {college}</h4>
              <p className="job-location">Location :  {location}</p>
              <p className="job-salary"> Salary :  {salary}</p>
              <p className="job-lastDate"> Last Date: {lastDate}</p>

            </Link>
          </Container>
        </div>} */}
    </>
  );
}

export default JobCard;
