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

function CustomizableForm({handleSubmit,updateForm}){


  const [getData,setGetData]=useState(false);
  const [personalData,setPersonalData]=useState({});
  const [publicationData,setPublicationData]=useState({});
  const [porData,setPorData]=useState({});
  const [academicData,setAcademicData]=useState({});
  const [experienceData,setExperienceData]=useState({});
  const [referenceData,setReferenceData]=useState({});
  const [updateFormPersonal,setUpdateFormPersonal]=useState({});
  const [updateFormPublication,setUpdateFormPublication]=useState({});
  const [updateFormPor,setUpdateFormPor]=useState({});
  const [updateFormExperience,setUpdateFormExperience]=useState({});
  const [updateFormReference,setUpdateFormReference]=useState({});
  const [updateFormAcademic,setUpdateFormAcademic]=useState({});

  const [gotUpdateForm,setGotUpdateForm]=useState(false);




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

      const random_object={};

      console.log(updateForm);

      if(Object.keys(updateForm).length!==0){
        console.log("i have come into update form");
        setUpdateFormAcademic(updateForm.fields.academic);
        setUpdateFormExperience(updateForm.fields.experience);
        setUpdateFormPersonal(updateForm.fields.personal);
        setUpdateFormPor(updateForm.fields.por);
        setUpdateFormPublication(updateForm.fields.publication);
        setUpdateFormReference(updateForm.fields.reference);
      }
      return;
    }

    const updateFormPersonalLength=Object.keys(updateFormPersonal).length;
    const updateFormPublicationLength=Object.keys(updateFormPublication).length;
    const updateFormPorLength=Object.keys(updateFormPor).length;
    const updateFormExperienceLength=Object.keys(updateFormExperience).length;
    const updateFormReferenceLength=Object.keys(updateFormReference).length;
    const updateFormAcademicLength=Object.keys(updateFormAcademic).length;

    console.log(updateFormAcademic);

    console.log("personal" + updateFormPersonalLength);
    console.log("publication" + updateFormPublicationLength);
    console.log("por" + updateFormPorLength);
    console.log("academic" + updateFormAcademicLength);
    console.log("experience" + updateFormExperienceLength);
    console.log("reference" + updateFormReferenceLength);

    if(updateFormPersonalLength!==0 && updateFormPublicationLength!==0 && updateFormPorLength!==0 && updateFormAcademicLength!==0 && updateFormExperienceLength!==0 && updateFormReferenceLength!==0){
      setGotUpdateForm(true);
    }else{
      if(Object.keys(updateForm).length===0){
        setGotUpdateForm(true);
      }
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

  },[getData,personalData,academicData,experienceData,publicationData,porData,referenceData,updateFormAcademic,updateFormExperience,updateFormPersonal,updateFormPor,updateFormPublication,updateFormReference])
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
    {gotUpdateForm &&
      <div style={{width:'75%', margin:'auto'}}>
        <form>
        <div>
          <section class="max-w-7xl p-6 mx-auto rounded-md shadow-md dark:bg-gray-800" style={{marginTop:'40px',marginBottom:'40px',backgroundColor:'#87CEFA'}}>
            <h2 class="text-lg font-bold text-gray-700 capitalize dark:text-white" style={{textAlign:'center'}}>CHOOSE CUSTOM FORM FIELDS</h2>
            <CustomFormPersonal getData={getData} collectDataPersonal={collectDataPersonal} updateForm={updateFormPersonal}/>
            <CustomFormAcademic getData={getData} collectDataAcademic={collectDataAcademic} updateForm={updateFormAcademic}/>
            <CustomFormExperience getData={getData} collectDataExperience={collectDataExperience} updateForm={updateFormExperience}/>
            <CustomFormPublication getData={getData} collectDataPublication={collectDataPublication} updateForm={updateFormPublication}/>
            <CustomFormPor getData={getData} collectDataPor={collectDataPor} updateForm={updateFormPor}/>
            <CustomFormReference getData={getData} collectDataReference={collectDataReference} updateForm={updateFormReference}/>
          </section>
        </div>



          <div style={{margin:'auto', display:"flex",justifyContent:'center', marginBottom:'50px'}}>
            <Button size="lg" style={{paddingLeft:'60px', paddingRight:'60px', paddingTop:'15px', paddingBottom:'15px', fontSize:'large'}} onClick={handleShow}>SUBMIT</Button>
            {/*<Button variant="outline-danger" onClick={()=> setShowCancelModal(true)}>Cancel</Button>*/}
          </div>

        </form>
      </div>}
    </>

  );

}

export default CustomizableForm;
