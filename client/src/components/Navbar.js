import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import "./css/Navbar.css"
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate, NavLink } from "react-router-dom"
import Modal from "react-bootstrap/Modal";
import SubscribePopup from "./popup.js";
import logologo from './logologo.png'; // import the image file

function App({ user, type }) {

  const location = useLocation();

  const history = useNavigate();

  const [show, setShow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [userType, setUserType] = useState('');

  const handleBasic = (userType) => {
    window.location.href = `/login?userType=${userType}`;
  };

  // console.log(type);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubscribeClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleExperience = () => {
    window.location.href = "/experiences";
  };

  const handleInterview = () => {
    window.location.href = "/interviewtips";
  }


  const logoutuser = async () => {
    setShow(false);
    let token = localStorage.getItem("usersdatatoken");

    console.log("inside logout");
    console.log(token);
    const res = await fetch("/logout", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
        Accept: "application/json"
      },
      credentials: "include"
    });
    //console.log(res);
    console.log("after logout");

    const data = await res.json();

    console.log(data);

    if (data.status == 201) {
      console.log("user logout");
      localStorage.removeItem("usersdatatoken");
      //setLoggedIn(false);

      //history("/");
      window.location.href = "/";

    } else {
      console.log("error");
    }
  }

const handleJobPost = ()=>{
  window.location.href="/job-post";
}


  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you wish to Logout?</Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={() => { logoutuser() }}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>


      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        {/* <Container> */}
          {/* <Navbar.Brand href="">Job Portal</Navbar.Brand> */}
          <img src={logologo} alt="My Image" style={{  height: '35px', marginRight: '40px' }} />


          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link><Link to="/" style={{ color: 'black', textDecoration: 'none' }}>Home</Link></Nav.Link> */}
              {type!=="admin" && <Nav.Link><Link to="/" style={{  color: 'black', textDecoration: 'none', fontFamily: 'Open Sans' }}>Job Profiles</Link></Nav.Link>}
              {/* Only show Job Post option if user is not a student */}
              
              {/* {type==="admin" && <Nav.Link onClick={handleShow} style={{ color: 'black', textDecoration: 'none'}}>Logout</Nav.Link>}
              {type==="admin" && <Nav.Link onClick={handleShow} style={{ color: 'black', textDecoration: 'none'}}>Download List</Nav.Link>} */}
              {type==="institute" && <Nav.Link onClick={handleJobPost} style={{ color: 'black', textDecoration: 'none' }} >Job Post</Nav.Link>}
              {type==="student" && <Nav.Link onClick={handleSubscribeClick} style={{ color: 'black', textDecoration: 'none' }}>Subscribe</Nav.Link>}
              {type==="student" && <Nav.Link onClick={handleExperience} style={{ color: 'black', textDecoration: 'none' }}>Experiences</Nav.Link>}
              {type==="student" && <Nav.Link onClick={handleInterview} style={{ color: 'black', textDecoration: 'none' }}>Interview Tips</Nav.Link>}
            </Nav>
            <SubscribePopup show={showPopup} onClose={handlePopupClose} />

            {type === "" && <Nav>
              <NavDropdown title={"Sign In"} id="collasible-nav-dropdown">
              {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item onClick={() => handleBasic("student")}>Student</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleBasic("institute")}>Institute</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleBasic("admin")}>Admin</NavDropdown.Item>
              </NavDropdown>
            </Nav>}

            {type === "admin" && <Nav>
              <NavDropdown title={"Logout"} id="collasible-nav-dropdown">
              {/* <NavDropdown.Divider /> */}
                <NavDropdown.Item onClick={() => handleShow() }>Logout</NavDropdown.Item>
                {/* <NavDropdown.Item onClick={() => handleShow()}>Download List</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>}

            {/* {type === "" && <Nav.Link>Login/Signup</Nav.Link>} */}

            {type !== "" && type !=="admin" && <Nav>
              <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="collasible-nav-dropdown">
                {type !== "institute" && <NavDropdown.Item><Link to="/profile" style={{ color: 'black', textDecoration: 'none' }}>Profile</Link></NavDropdown.Item>}
                {type !== "institute" && <NavDropdown.Item><Link to="/account" style={{ color: 'black', textDecoration: 'none' }}>Account</Link></NavDropdown.Item>}
                {type === "student" && <NavDropdown.Item><Link to={`/application/${user._id}`} style={{ color: 'black', textDecoration: 'none' }}>My Applications</Link></NavDropdown.Item>}
                {type === "institute" && <NavDropdown.Item><Link to="/job-postings" style={{ color: 'black', textDecoration: 'none' }}>My Job Posting</Link></NavDropdown.Item>}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleShow}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>}

          </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </>
  );
}

export default App;
