import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import "./Navbar.css"
import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
import { useNavigate , NavLink } from "react-router-dom"

function App() {
  const [userType, setUserType] = useState("");
  const location = useLocation();
  const [loggedIn, setLoggedIn]=useState(false);

  const history = useNavigate();

  // let usert ;

  // Set isStudent to true if the current location is /homestudent
  useEffect(() => {
    axios.get("http://localhost:4000/")
    .then((response) => {
      console.log("here at navbar");
      console.log(response.data);
      if(response.data.email===""){
        setLoggedIn(false);
      }else if(response.data.userType==="student"){
        setUserType("student");
        setLoggedIn(true);
      }else{
        setUserType("institute");
        setLoggedIn(true);
      }
    })
    //console.log(usert);
  }, []);


  const logoutuser = async () => {
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
        setLoggedIn(false);

        history("/");
        window.location.href = "/";

    } else {
        console.log("error");
    }
}


  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Brand href="">Job Portal</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* <Nav.Link><Link to="/" style={{ color: 'black', textDecoration: 'none' }}>Home</Link></Nav.Link> */}
              <Nav.Link><Link to="/" style={{ color: 'black', textDecoration: 'none' }}>Job Profiles</Link></Nav.Link>
              {/* Only show Job Post option if user is not a student */}
              {userType==="institute" && <Nav.Link><Link to="/job-post" style={{ color: 'black', textDecoration: 'none' }}>Job Post</Link></Nav.Link>}
            </Nav>

            {loggedIn && <Nav>
              <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="collasible-nav-dropdown">
                <NavDropdown.Item><Link to="/profile" style={{ color: 'black', textDecoration: 'none' }}>Profile</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/account" style={{ color: 'black', textDecoration: 'none' }}>Account</Link></NavDropdown.Item>
                {userType==="student" && <NavDropdown.Item><Link to="/application" style={{ color: 'black', textDecoration: 'none' }}>My Applications</Link></NavDropdown.Item>}
              {userType==="institute" && <NavDropdown.Item><Link to="/job-postings" style={{ color: 'black', textDecoration: 'none' }}>My Job Posting</Link></NavDropdown.Item>}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => {logoutuser()}}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>}

            {!loggedIn && <Nav.Link><Link to="/choose-profile" style={{ color: 'black', textDecoration: 'none' }}>Login/Signup</Link></Nav.Link>}

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default App;
