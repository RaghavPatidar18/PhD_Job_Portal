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

function AddInstitute({ }) {

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

      {/* <Button variant="danger" onClick={() => { logoutuser() }}>
        Logout
      </Button> */}

      <section class="bg-white dark:bg-gray-900">
        <div class="container flex flex-col items-center px-4 py-12 mx-auto text-center">
          <h2 class="max-w-2xl mx-auto text-2xl font-semibold tracking-tight text-gray-800 xl:text-3xl dark:text-white">
            Add Institute to our <span class="text-blue-500">Website.</span>
          </h2>

          <p class="max-w-4xl mt-6 text-center text-gray-500 dark:text-gray-300">
            Below are some companies want to register on our Platform
          </p>
        </div>
      </section>

      <div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "100px",
  padding: "0 100px",
  marginTop: "60px",
  
  '@media (max-width: 767px)': {
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    padding: "0 10px",
    gap: "20px",
  }
}}>
  {newusers.map((newuser) => (
    <AdminCard
      key={newuser._id}
      companyName={newuser.companyName}
      year={newuser.year}
      name={newuser.usersname}
      email={newuser.email}
      location={newuser.location}
      password={newuser.password}
    />
  ))}
</div>





    </>

  )
}

export default AddInstitute;
