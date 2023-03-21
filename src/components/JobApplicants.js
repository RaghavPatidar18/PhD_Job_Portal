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

function JobApplicants(){

  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const url = `http://localhost:4000/jobApplicants/${id}`;

  const history = useNavigate();

  // const location = useLocation();
  // const userType = new URLSearchParams(location.search).get("userType");
  // // console.log(userType);

  const ProfileValid = async () => {
    console.log("inside profilevalid");
      let token = localStorage.getItem("usersdatatoken");

      console.log(token);

      const res = await fetch("/validuser", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": token
          },
      //     body:JSON.stringify({
      //       userType
      //  })
      });

      const data = await res.json();

      console.log(data);

      if (data.status == 401 || !data) {
        console.log("error page redirect")
          history("*");
      } else {
          console.log("user verify");
          // setLoginData(data)
          history(`/job-applicants/${id}`);
      }
    }

  useEffect(() => {
      ProfileValid();
  }, [])

  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setApplicants(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(applicants);
  return(
    <div>
    {applicants.map(applicant => (
      <JobApplicantCard
      student_name={applicant.student_name}
      student_email={applicant.student_email}
      status={applicant.status}
      application_id={applicant.application_id}
      job_id={id}
      />

    ))}
    </div>


  )
}

export default JobApplicants;
