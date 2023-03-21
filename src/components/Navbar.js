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
  const [isStudent, setIsStudent] = useState(false);
  const [loggedIn, setLoggedIn]=useState(false);
  const [usert, setUsert] = useState(null);
  const location = useLocation();
  const userType = new URLSearchParams(location.search).get("userType");

  const history = useNavigate();

  // let usert ;

  // Set isStudent to true if the current location is /homestudent
  useEffect(() => {
    axios.get("http://localhost:4000/")
    .then((response) => {
      console.log(response.data);
      // usert = response.data.userType;
      // setUsert(response.data.userType);
      if(response.data.email===""){
        setIsStudent(false);
        setLoggedIn(false);
      }else if(response.data.userType==="student"){
        setIsStudent(true);
        setLoggedIn(true);
      }else{
        setIsStudent(false);
        setLoggedIn(true);
      }
    })
    console.log(usert);
  }, []);


  const logoutuser = async () => {
    let token = localStorage.getItem("usersdatatoken");

    console.log("inside logout");
    const res = await fetch("/logout", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token,
            Accept: "application/json"
        },
        credentials: "include"
    });

    console.log("after logout");

    const data = await res.json();

    console.log(data);

    if (data.status == 201) {
        console.log("user logout");
        localStorage.removeItem("usersdatatoken");
        // setLoginData(false)
        history("/");
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
              <Nav.Link><Link to="/job-profiles" style={{ color: 'black', textDecoration: 'none' }}>Job Profiles</Link></Nav.Link>
              {/* Only show Job Post option if user is not a student */}
              {!isStudent && <Nav.Link><Link to="/job-post" style={{ color: 'black', textDecoration: 'none' }}>Job Post</Link></Nav.Link>}
            </Nav>

            <Nav>
              <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="collasible-nav-dropdown">
                <NavDropdown.Item><Link to="/profile" style={{ color: 'black', textDecoration: 'none' }}>Profile</Link></NavDropdown.Item>
                <NavDropdown.Item><Link to="/account" style={{ color: 'black', textDecoration: 'none' }}>Account</Link></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => {logoutuser()}}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>

          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default App;
