// import { Parser } from "json2csv";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
// import { useNavigate , useLocation } from 'react-router-dom';

function Download(){

const handleDownload = () => {

    window.location.href = "/download";
  };

  return(
    <div>
    <Button onClick={handleDownload} variant="primary"> Download Data </Button>
    </div>


  )
}

export default Download;
