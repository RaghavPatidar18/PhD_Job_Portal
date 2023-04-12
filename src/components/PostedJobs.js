import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect} from "react";
import PostedJobCard from "./PostedJobCard";
import { useNavigate , useLocation } from 'react-router-dom';

function PostedJobs({user,type}){

  //const { id } = useParams();
  console.log("here at job postings");
  const [job, setJob] = useState([]);
  const url = `http://localhost:4000/jobPostings/${user}`;

  const history = useNavigate();


  useEffect(() => {
    if(type!=="institute"){
      history("*");
    }else{
    axios.get(url)
      .then((response) => {
        if(response.data.status===200){
          setJob(response.data.jobArray);
        }

      })
      .catch((err) => console.log(err));
    }
  }, []);


  console.log(job);
  return(
    <div style={{width:'80%', margin:'auto', alignItems:'center'}}>
    {job.map(j => (
      <PostedJobCard
      title={j.title}
      id={j._id}
      />

    ))}
    </div>


  )
}

export default PostedJobs;
