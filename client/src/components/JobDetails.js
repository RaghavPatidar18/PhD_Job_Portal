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
      setButtonText("Login/Register");
      url = `/api/job-details/${id}/""`;
    } else {
      // console.log("sdfbioe");
      url = `/api/job-details/${id}/${user._id}`;
    }

    try {
      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      if (data.status === 200) {
        setJob(data.job);
        setApplied(data.applied);

        if (data.applied === true && type === "student") {
          setApplication_id(data.application_id);
          console.log(data.application_id);
          setButtonText("Withdraw");
        } else if (data.applied === false && type === "student") {
          setButtonText("Apply");
        }
      }
    } catch (error) {
      console.error(error);
      // handle error
    }


    // const res = await fetch(url, {
    //   method: "GET",
    //   headers: { "Content-Type": "application/json", }
    // });
    // const data = await res.json();
    // if (data.status === 200) {
    //   setJob(data.job);
    //   setApplied(data.applied);

    //   if (data.applied === true && type === "student") {
    //     setApplication_id(data.application_id);
    //     //console.log("here");
    //     console.log(data.application_id);
    //     setButtonText("Withdraw Application");
    //   } else if (data.applied === false && type === "student") {
    //     setButtonText("Apply");
    //   }
    // }


  }

  useEffect(() => {
    LoginCheck();

  }, []);

  function applyClicked() {
    // console.log("heheheheh");
    if (buttonText === "Login/Register") {
      history("/");
    } else if (buttonText === "Apply") {
      // console.log("rgi");
      const student_id = user._id;
      history(`/application-form/${id}/${student_id}`);
    }else if(buttonText === "Withdraw"){
      handleShowWithdraw();
    }
  }

  async function commentSection() {
    history(`/comment/${id}`);
  }

  function handleWithdraw(){
    const id=application_id;
    handleCloseWithdraw();
    axios.post("/withdraw-application",{id})
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
    axios.post("/delete-job",{id})
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
    <div class="relative block overflow-hidden text-left align-middle transform bg-white  sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6" style={{margin:'auto', marginTop:'10px', marginBottom:'10px'}}>
        <div class="text-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                Withdraw Application
            </h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400">
                Are you sure you wish to <span style={{fontWeight:'bold'}}>withdraw</span> your application ? You will <span style={{fontWeight:'bold'}}>not</span> be able to apply again
            </p>
        </div>
        <div class="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
            <button onClick={handleCloseWithdraw} class="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                Cancel
            </button>

            <button onClick={handleWithdraw} class="px-4 sm:mx-2 w-full py-2.5 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                Withdraw
            </button>
        </div>
    </div>
      {/*<Modal.Header closeButton>
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
      </Modal.Footer>*/}
    </Modal>


      <Modal show={show} onHide={handleClose}>
      <div class="relative block overflow-hidden text-left align-middle transform bg-white  sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6" style={{margin:'auto', marginTop:'10px', marginBottom:'10px'}}>
          <div class="text-center">
              <h3 class="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                  Apply
              </h3>
              <p class="mt-2 text-gray-500 dark:text-gray-400">
                  Are you sure you wish to <span style={{fontWeight:'bold'}}>apply</span> for this job ?
              </p>
          </div>
          <div class="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
              <button onClick={handleClose} class="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                  Cancel
              </button>

              <button onClick={applyClicked} class="px-4 sm:mx-2 w-full py-2.5 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                  Apply
              </button>
          </div>
      </div>
        {/*<Modal.Header closeButton>
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
        </Modal.Footer>*/}
      </Modal>

      <Modal show={showDelete} onHide={handleCloseDelete}>
      <div class="relative block overflow-hidden text-left align-middle transform bg-white  sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6" style={{margin:'auto', marginTop:'10px', marginBottom:'10px'}}>
          <div class="text-center">
              <h3 class="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                  Delete Job
              </h3>
              <p class="mt-2 text-gray-500 dark:text-gray-400">
                  Are you sure you wish to <span style={{fontWeight:'bold'}}>delete</span> this job ?
              </p>
          </div>
          <div class="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
              <button onClick={handleCloseDelete} class="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                  Cancel
              </button>

              <button onClick={()=> {handleCloseDelete(); handleDelete();}} class="px-4 sm:mx-2 w-full py-2.5 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                  Delete
              </button>
          </div>
      </div>
        {/*<Modal.Header closeButton>
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
        </Modal.Footer>*/}
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
        backgroundColor: "#007FFF",
        borderRadius: "10px",
        color: "#fff",
        padding: "12px 24px",
        marginBottom: "100px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
        border: "none",
        cursor: "pointer"
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
        backgroundColor: "#FF4136",
        color: "#fff",
        padding: "12px 24px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
        border: "none",
        cursor: "pointer"
      }}
    >
      Delete Job
    </button>
  )}
  {type === "institute" && job.institute_id === user._id && (
    <button
      onClick={handleEdit}
      className="button"
      style={{
        backgroundColor: "#007FFF",
        color: "#fff",
        padding: "12px 24px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "background-color 0.3s ease",
        border: "none",
        cursor: "pointer"
      }}
    >
      Edit Job
    </button>
  )}
</div>
      </div>
      <Footer />
    </>
  );

}

export default JobDetails;
