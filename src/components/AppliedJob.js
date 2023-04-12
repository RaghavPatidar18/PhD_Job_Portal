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
    <div>
    {job.map(j => (
      <AppliedJobCard
      title={j.title}
      college={j.college}
      application_status={j.application_status}
      job_id={j.job_id}
      />

    ))}
    </div>


  )
}

export default AppliedJob;
