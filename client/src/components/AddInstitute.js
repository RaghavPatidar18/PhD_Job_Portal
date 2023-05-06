import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import JobApplicantCard from "./JobApplicantCard";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';
import AdminCard from "./AdminCard";
// import { useLocation } from "react-router-dom";

function AddInstitute({}) {

  const [newusers, setNewUsers] = useState([]);

  // const history = useNavigate();

  // const userType = new URLSearchParams(location.search).get("userType");

  // useEffect(() => {
  //   if (userType !== "admin") {
  //     history("*");
  //   } else {
  //       useEffect(() => {
  //           axios.get('/api/getrequests').then((res) => {
  //               console.log(res.data);
  //             setNewUsers(res.data);
  //           });
  //         }, []);
  //   }
  // }, []);

  useEffect(() => {
    axios.get('/api/getrequests').then((res) => {
        console.log(res.data);
      setNewUsers(res.data);
    });
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
        //setLoggedIn(false);

        //history("/");
        window.location.href = "/";

    } else {
        console.log("error");
    }
}


  //console.log(applicants);
  return (

    <>
    <Button variant="danger" onClick={() => {logoutuser()}}>
          Logout
        </Button>
    {newusers.map((newuser) => (
        <div style={{ flexBasis: 'calc(33% - 12px)', maxWidth: 'calc(33% - 12px)' }}>
          <AdminCard
            key={newuser._id}
            companyName={newuser.companyName}
            year={newuser.year}
            name={newuser.usersname}
            email={newuser.email}
            location={newuser.location}
            password={newuser.password}
          />
        </div>
      ))}
      </>
    
  )
}

export default AddInstitute;
