import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import { useNavigate , useLocation } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";

function ModalTemplate({showFunction, onHideFunction, modalTitle, modalBody, buttonVariant1, buttonVariant2, buttonFunction1,buttonFunction2,buttonText1,buttonText2}){
  return(
    <Modal show={()=> showFunction()} onHide={()=> onHideFunction()}>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{modalBody}</Modal.Body>
      <Modal.Footer>
        <Button variant={buttonVariant1} onClick={()=>buttonFunction1()}>
          {buttonText1}
        </Button>
        <Button variant={buttonVariant2} onClick={()=> buttonFunction2()}>
          {buttonText2}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalTemplate; 
