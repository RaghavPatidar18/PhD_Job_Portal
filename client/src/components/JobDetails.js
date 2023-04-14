import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import './css/JobDetails.css'; // import custom styles
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Footer from "./Footer";


// async function getId() {
//   const token = localStorage.getItem('usersdatatoken');
//   // console.log(token);
//   const response = await fetch('/api/meid', {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   const data = await response.json();
//   // console.log(data);
//   return data;
// }

function JobDetails({ user, type }) {

  const { id } = useParams();

  const [job, setJob] = useState({});
  const [applied, setApplied] = useState(false);
  const [buttonText, setButtonText] = useState();


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const history = useNavigate();

  const LoginCheck = async () => {
    let url;
    // console.log(user);
    // console.log(user.email);
    if (user.email === undefined) {
      // console.log("here at email null");
      setButtonText("Login/Register to Apply");
      url = `http://localhost:4000/job-details/${id}/""`;
    } else {
      // console.log("sdfbioe");
      url = `http://localhost:4000/job-details/${id}/${user._id}`;
    }

    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json", }
    });
    const data = await res.json();
    if (data.status === 200) {
      setJob(data.job);
      // console.log("sdnio");
      // console.log(job);
      setApplied(data.applied);

      if (data.applied === true && type === "student") {
        //console.log("here");
        setButtonText("Applied");
      } else if (data.applied === false && type === "student") {
        setButtonText("Apply");
      }
    }


  }

  useEffect(() => {
    LoginCheck();

  }, []);

  function applyClicked() {
    // console.log("heheheheh");
    if (buttonText === "Login/Register to Apply") {
      history("/choose-profile");
    } else if (buttonText === "Apply") {
      // console.log("rgi");
      const student_id = user._id;
      history(`/application-form/${id}/${student_id}`);
      // axios.post("http://localhost:4000/apply", {id,student_id})
      //   .then((res) => {
      //     console.log(res.data);
      //     if (res.data.status===200) {
      //       console.log("abgoi");
      //
      //     }
      //   })
      //   .catch((err) => console.error(err));
    }
  }

  async function commentSection() {
    // console.log("heheheheh");
    // const id = await getId();
    // console.log(id);
    history(`/comment/${id}`);
  }

  return (

    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{job.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you wish to apply for this job?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={applyClicked}>
            Apply
          </Button>
        </Modal.Footer>
      </Modal>



      <div className="job-details-container">
        <h3 className="job-title" style={{
          fontFamily: "Times New Roman, serif",
          fontWeight: "bold",
          fontSize: "48px",
          color: "#595959",
          textAlign: "center",
          textShadow: "1px 1px 1px #fff",
          letterSpacing: "2px",
          lineHeight: "1.5"
        }}>
          {job.title}
        </h3>
        <br />
        <div className="job-info" style={{ borderRadius: "0px" }}>
          <div className="job-info-box" style={{ borderRadius: "0px", marginBottom :"0px" }}>
            <h5 style={{ fontFamily: "Arial, sans-serif", fontSize: "20px", color: "#0099FF", fontWeight: "bold" }}>College</h5>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: "18px", color: "#333" }}>{job.college}</p>
          </div>
          <div className="job-info-box" style={{ borderRadius: "0px", marginBottom :"0px" }}>
            <h5 style={{ fontFamily: "Arial, sans-serif", fontSize: "20px", color: "#0099FF", fontWeight: "bold" }}>Location</h5>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: "18px", color: "#333" }}>{job.location}</p>
          </div>
          <div className="job-info-box" style={{ borderRadius: "0px" , marginBottom :"0px" }}>
            <h5 style={{ fontFamily: "Arial, sans-serif", fontSize: "20px", color: "#0099FF", fontWeight: "bold" }}>Salary</h5>
            <p style={{ fontFamily: "Arial, sans-serif", fontSize: "18px", color: "#333" }}>{job.salary}</p>
          </div>
        </div>
        <div className="job-details-box" style={{ borderRadius: "0px" , marginBottom : "0px", marginTop : "0px"}}>
          <h5 style={{ fontFamily: "Arial, sans-serif", fontSize: "22px", color: "#0099FF", fontWeight: "bold" }}>Description</h5>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "18px", color: "#333" }}>{job.description}</p>
        </div>
        <div className="job-details-box" style={{ borderRadius: "0px" , marginBottom : "0px"}}>
          <h5 style={{ fontFamily: "Arial, sans-serif", fontSize: "22px", color: "#0099FF", fontWeight: "bold" }}>Qualifications</h5>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "18px", color: "#333" }}>{job.qualifications}</p>
        </div>
        <div className="job-details-box" style={{ borderRadius: "0px" , marginBottom : "0px"}}>
          <h5 style={{ fontFamily: "Arial, sans-serif", fontSize: "22px", color: "#0099FF", fontWeight: "bold" }}>Responsibilities</h5>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "18px", color: "#333" }}>{job.responsibilities}</p>
        </div>

        <div className="job-details-box" style={{ borderRadius: "0px" , marginBottom : "10px"}}>
          <h5 style={{ fontFamily: "Arial, sans-serif", fontSize: "22px", color: "#0099FF", fontWeight: "bold" }}>Contact us at</h5>
          <p style={{ fontFamily: "Arial, sans-serif", fontSize: "18px", color: "#333" }}>{job.contactEmail}</p>
        </div>


        {type !== "institute" && <button onClick={() => { buttonText === "Apply" ? handleShow() : applyClicked() }} className="button" style={{ backgroundColor: "#40a829" , color: "#fff" }}>{buttonText}</button>}
        {/* <button className="button" onClick={() => commentSection()}>
          QnA
        </button> */}
      </div> 
      <Footer />
    </>
  );

}

export default JobDetails;
