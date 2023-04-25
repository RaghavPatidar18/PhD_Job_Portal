import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form, Modal } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect,useRef} from "react";
import {useParams} from "react-router-dom";
import { useNavigate , useLocation } from 'react-router-dom';
//import CustomFormField from "./CustomFormField";
import "../css/customForm.css";
//import ModalTemplate from "./ModalTemplate.js";
import CustomFormPersonal from "./CustomFormPersonal";
import CustomFormAcademic from "./CustomFormAcademic";
import CustomFormExperience from "./CustomFormExperience";
import CustomFormPor from "./CustomFormPor";
import CustomFormPublication from "./CustomFormPublication";
import CustomFormReference from "./CustomFormReference";

function CustomizableForm({handleSubmit}){

  const [getData,setGetData]=useState(false);
  const [personalData,setPersonalData]=useState({});
  const [publicationData,setPublicationData]=useState({});
  const [porData,setPorData]=useState({});
  const [academicData,setAcademicData]=useState({});
  const [experienceData,setExperienceData]=useState({});
  const [referenceData,setReferenceData]=useState({});

  const [show,setShow]=useState(false);

  const handleShow = ()=> setShow(true);
  const handleClose = ()=>setShow(false);

  const isFirstRender = useRef(true);

  const collectDataPersonal = (data)=> {
    setPersonalData(data);
    //console.log(data);
  }
  const collectDataPublication = (data)=> {
    setPublicationData(data);
    //console.log(data);
  }
  const collectDataPor = (data)=> {
    setPorData(data);
    //console.log(data);
  }
  const collectDataExperience = (data)=> {
    setExperienceData(data);
    //console.log(data);
  }
  const collectDataAcademic = (data)=> {
    setAcademicData(data);
    console.log("academic data is");
    console.log(data);
  }
  const collectDataReference = (data)=> {
    setReferenceData(data);
    //console.log(data);
  }

  const handleDataCollection = ()=> {
    console.log("here");
    setGetData(true);
  }



  useEffect(()=> {
    if(isFirstRender.current){
      console.log("did i come here");
      isFirstRender.current=false;
      return;
    }

    if(("board10" in academicData) && ("profile" in experienceData) && ("email" in personalData) && ("title" in porData) && ("title" in publicationData) && ("title" in referenceData)){
      console.log("got all data");
      console.log(personalData);
      console.log(academicData);
      console.log(experienceData);
      console.log(porData);
      console.log(publicationData);
      console.log(referenceData);
      handleSubmit(personalData,academicData,experienceData,publicationData,porData,referenceData);

    }else{
      console.log("whyyyyy");
    }

  },[getData,personalData,academicData,experienceData,publicationData,porData,referenceData])
  return(
    <>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Post job</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you wish to post the job?</Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleDataCollection}>
          Post
        </Button>
      </Modal.Footer>
    </Modal>
      <div>
        <form>

          <CustomFormPersonal getData={getData} collectDataPersonal={collectDataPersonal}/>
          <CustomFormAcademic getData={getData} collectDataAcademic={collectDataAcademic}/>
          <CustomFormExperience getData={getData} collectDataExperience={collectDataExperience}/>
          <CustomFormPublication getData={getData} collectDataPublication={collectDataPublication}/>
          <CustomFormPor getData={getData} collectDataPor={collectDataPor}/>
          <CustomFormReference getData={getData} collectDataReference={collectDataReference}/>


          <div style={{margin:'auto', display:"flex",justifyContent:'center'}}>
            <Button variant="outline-dark" style={{marginRight:"20px"}} onClick={handleShow}>Submit</Button>
            {/*<Button variant="outline-danger" onClick={()=> setShowCancelModal(true)}>Cancel</Button>*/}
          </div>

        </form>
      </div>
    </>

  );

}

export default CustomizableForm;
