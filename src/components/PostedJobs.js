import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect} from "react";
import PostedJobCard from "./PostedJobCard";
import { useNavigate , useLocation } from 'react-router-dom';

function PostedJobs(){

  //const { id } = useParams();
  console.log("here at job postings");
  const [job, setJob] = useState([]);
  const url = "http://localhost:4000/jobPostings";

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
          history("/job-postings");
      }
    }

  useEffect(() => {
      ProfileValid();
  }, [])




  useEffect(() => {
    axios.get(url)
      .then((response) => {
        setJob(response.data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(job);
  return(
    <div>
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
