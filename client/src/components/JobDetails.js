import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
// import './css/JobDetails.css'; // import custom styles
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import Footer from "./Footer";

function JobDetails({ user, type }) {

  const { id } = useParams();

  const [job, setJob] = useState({});
  const [applied, setApplied] = useState(false);
  const [buttonText, setButtonText] = useState();
  const [application_id,setApplication_id]=useState("");


  const [show, setShow] = useState(false);
  const [showWithdraw,setShowWithdraw]=useState(false);
  const [showDelete,setShowDelete]=useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseWithdraw = () => setShowWithdraw(false);
  const handleShowWithdraw = () => setShowWithdraw(true);
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);


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
      setApplied(data.applied); 

      if (data.applied === true && type === "student") {
        setApplication_id(data.application_id);
        //console.log("here");
        console.log(data.application_id);
        setButtonText("Withdraw Application");
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
    }else if(buttonText === "Withdraw Application"){
      handleShowWithdraw();
    }
  }

  async function commentSection() {
    history(`/comment/${id}`);
  }

  function handleWithdraw(){
    const id=application_id;
    handleCloseWithdraw();
    axios.post("http://localhost:4000/withdraw-application",{id})
    .then((response)=> {
      if(response.data.status===200){
        console.log("withdrew");
        setButtonText("Withdrew");

      }else{
        console.log("error");
      }
    })
    .catch((err)=> console.log(err));
  }

  function handleDelete(){
    axios.post("http://localhost:4000/delete-job",{id})
    .then((response)=> {
      if(response.data.status===200){
        console.log("deleted");
        //setJobDeleted(true);
        history("/")
      }else{
        console.log("issues");
      }
    })
    .catch((err)=> console.log(err));
  }

  function handleEdit(){
    history(`/update-job/${id}`)
  }

  return (

    <>

    <Modal show={showWithdraw} onHide={handleCloseWithdraw}>
      <Modal.Header closeButton>
      <Modal.Title style={{ textAlign: 'left' }}>{job.title}</Modal.Title>

      </Modal.Header>
      <Modal.Body>Are you sure you wish to withdraw your application for this job? You will not be able to apply again</Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleCloseWithdraw}>
          Close
        </Button>
        <Button variant="danger" onClick={handleWithdraw}>
          Withdraw
        </Button>
      </Modal.Footer>
    </Modal>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title style={{ textAlign: 'left' }}>{job.title}</Modal.Title>

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

      <Modal show={showDelete} onHide={handleCloseDelete}>
        <Modal.Header closeButton>
        <Modal.Title style={{ textAlign: 'left' }}>{job.title}</Modal.Title>

        </Modal.Header>
        <Modal.Body>Are you sure you wish to delete this job?</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleCloseDelete}>
            Close
          </Button>
          <Button variant="danger" onClick={()=> {handleCloseDelete(); handleDelete();}}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>



      <div className="job-details-container">
      <h2 style={{ fontFamily: "Inter, sans-serif", textAlign: "left", marginLeft:"120px" , marginTop:"20px" , fontWeight:"700"}}> {job.title} </h2>


        <br />
        <div className="job-info" style={{ borderRadius: "0px" }}>
        <div className="sec-1" style={{ display: "flex", flexDirection: "column", marginBottom: "20px" , justifyContent: "space-between"}}>
  <div style={{ display: "flex"}}>
    <div className="job-details-box" style={{ borderRadius: "0px", width: "50%" , marginLeft:"80px", background: "", padding: "20px 50px" }}>
    <h4 style={{ fontFamily: "Inter, sans-serif", textAlign: "left",fontWeight:"700"}}> Job Description </h4>
      <p style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", color: "#333" }}>{job.description}</p>
    </div>
    <div className="aboutjob" style={{ borderRadius: "0px", width: "30%" , marginLeft:"80px", background: "#F3F3F3", padding: "20px 50px" }}>
      <h4 style={{ fontFamily: "Inter, sans-serif", textAlign: "left",fontWeight:"700"}}> About Job </h4>
      <div className="job-info-box" style={{ borderRadius: "0px" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", color: "#333"  }}>College: {job.college}</p>
      </div>
      <div className="job-info-box" style={{ borderRadius: "0px" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", color: "#333" }}>Location: {job.location}</p>
      </div>
      <div className="job-info-box" style={{ borderRadius: "0px" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", color: "#333"  }}>Salary: {job.salary}</p>
      </div>
      <div className="job-info-box" style={{ borderRadius: "0px" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", color: "#333" }}>Last Date: {job.lastDate}</p>
      </div>
      <div className="job-info-box" style={{ borderRadius: "0px" }}>
        <p style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", color: "#333" }}>Contact: {job.contactEmail}</p>
      </div>
    </div>
  </div>
</div>
        </div>

        <div className="job-details-box" style={{ borderRadius: "0px", fontFamily: "Inter, sans-serif", marginBottom : "40px",marginRight:"80px", marginLeft:"80px", background: "", padding: "40px" }}>
        <h4 style={{ fontFamily: "Inter, sans-serif", textAlign: "left",fontWeight:"700"}}> Qualifications </h4>
  <p style={{ fontSize: "18px" }}>{job.qualifications}</p>
</div>

        <div className="job-details-box" style={{ borderRadius: "0px" ,marginRight:"80px" , marginLeft:"80px", marginBottom: "40px", background: "", padding: "40px" }}>
        <h4 style={{ fontFamily: "Inter, sans-serif", textAlign: "left",fontWeight:"700"}}> Responsibilities </h4>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "18px", color: "#333" }}>{job.responsibilities}</p>
        </div>

        <div className="button-container" style={{ textAlign: "center" }}>
  {type !== "institute" && (
    <button
      onClick={() => {
        buttonText === "Apply" ? handleShow() : applyClicked();
      }}
      className="button"
      style={{
        backgroundColor: "#7A5CFA",
        borderRadius: "8px",
        color: "#fff",
        padding: "8px 1px",
        marginBottom: "100px"
      }}
    >
      {buttonText}
    </button>
  )}
  {type === "institute" && job.institute_id === user._id && (
    <button
      onClick={handleShowDelete}
      className="button"
      style={{
        backgroundColor: "#40a829",
        color: "#fff",
        padding: "8px 1px"
      }}
    >
      Delete Job
    </button>
  )}
    {type === "institute" && job.institute_id===user._id && <button onClick={handleEdit} className="button" style={{ backgroundColor: "#40a829" , color: "#fff" }}>Edit Job</button>}
</div>

      </div>
      <Footer />
    </>
  );

}

export default JobDetails;