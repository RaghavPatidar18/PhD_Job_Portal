import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import './css/JobCard.css';
import { useState, useEffect } from "react";
import axios from "axios";
import ellipse from './Ellipse 89.png';

function JobCard({ _id, title, college, location, salary, lastDate, deleted, description }) {



  return (
    <div className="complete-card">

      {!deleted &&
        <div className="every-card">
          <div class="flex items-center justify-between" >
            <div class="flex items-center" style={{ marginTop: '10px' }}>
              <img src={ellipse} alt="My Image" style={{ height: '35px', marginRight: '10px', marginLeft: '20px', marginTop: '5px' }} />
              <h5 class="mt-2 font-bold text-gray-600 dark:text-gray-300" style={{ marginTop: '100px' }}>{college}</h5>


            </div>
            {/* <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500" tabindex="0" role="button">View Job</a> */}
          </div>


          <p class="text-sm font-light text-gray-600 dark:text-gray-400" style={{ marginLeft: '65px', marginTop: '-6px', fontSize: '0.675rem' }}>last date to apply : {lastDate}</p>


          <div style={{ marginLeft: "20px" }} class="mt-2">
            {/* <a href="#" class="text-xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline" tabindex="0" role="link">{title}</a>
             */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'black', marginRight: "25px" }} className="titli">{title}</h4>
            </div>

            <h6 class="loca" style={{ marginLeft: '4px', marginTop: '-3px', fontSize: '0.875rem' }}> Location :{location} </h6>








            <div style={{
              fontFamily: 'Roboto',
              fontStyle: 'normal',
              fontWeight: 400,
              fontSize: '15px',
              lineHeight: '14px',
              color: '#585858',
              width: '225px',
              height: '85px',
              marginLeft: '-5px',
              marginTop: '15px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              '-webkit-line-clamp': 6,
              '-webkit-box-orient': 'vertical',
              opacity: 1,
            }}>
              Description : {description}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: "20px" }}>
              <div className="sali" style={{ fontFamily: 'Roboto' }}>
                <span style={{ fontSize: '1.15rem', fontWeight: 'bold' }}>${salary}</span>
                <span style={{ fontSize: '0.75rem', marginLeft: '4px' }}>/month</span>
              </div>
              <Link
                to={`/job-details/${_id}`}
                // className="inline-block px-4 py-2 text-md font-bold text-blue transition-colors duration-300 transform bg-blue-50 rounded cursor-pointer hover:bg-blue-500 hover:text-white"
                style={{ textDecoration: 'none', marginRight: '20px' }}
                tabIndex="0"
                role="button"
              >
                View More
              </Link>


            </div>

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
    </div>
  );
}

export default JobCard;
