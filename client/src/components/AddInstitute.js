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

  useEffect(() => {
    axios.get('/api/getrequests').then((res) => {
      console.log(res.data);
      setNewUsers(res.data);
    });
  }, []);

  return (

    <>
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
