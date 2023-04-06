import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import { useNavigate , useLocation } from 'react-router-dom';
import CustomFormField from "./CustomFormField";
import "./css/customForm.css";
import ModalTemplate from "./ModalTemplate.js";


function CustomizableForm({handleSubmit}){


  const [education,setEducation]=useState(false);
  const [experience,setExperience]=useState(false);
  const [publications,setPublications]=useState(false);
  const [personalData,setPersonalData]=useState({name:true,email:false,age:false,gender:false,category:false,permanentAddress:false,currentAddress:false});
  const [educationData,setEducationData]=useState({degreeName:false,degreeStudy:false,gradingScale:false,grade:false,startYear:false,endYear:false});
  const [experienceData,setExperienceData]=useState({companyName:false,jobProfile:false,location:false,startYear:false,endYear:false});
  const [publicationsData,setPublicationsData]=useState({title:false,authorList:false,journal:false,summary:false,startYear:false,endYear:false});
  const [showSubmitModal,setShowSubmitModal]=useState(false);
  const [showCancelModal,setShowCancelModal]=useState(false);

  function personalFieldChosen(field){
    console.log(field);
    const copyObj=personalData;
    if(field==="Name"){
      copyObj.name=!personalData.name;
    }else if(field==="Email"){
      copyObj.email=!personalData.email;
    }else if(field==="Age"){
      copyObj.age=!personalData.age;
    }else if(field==="Gender"){
      copyObj.gender=!personalData.gender;
    }else if(field==="Category"){
      copyObj.category=!personalData.category;
    }else if(field==="Permanent Address"){
      copyObj.permanentAddress=!personalData.permanentAddress;
    }else if(field==="Current Address"){
      copyObj.currentAddress=!personalData.currentAddress;
    }
    console.log(personalData);
  }

  function educationFieldChosen(field){
    console.log(field);
    const copyObj=educationData;
    if(field==="Degree Name"){
      copyObj.degreeName=!educationData.degreeName;
    }else if(field==="Institute Name"){
      copyObj.degreeStudy=!educationData.degreeStudy;
    }else if(field==="Grading Scale"){
      copyObj.gradingScale=!educationData.gradingScale;
    }else if(field==="Grade"){
      copyObj.grade=!educationData.grade;
    }else if(field==="Start Year"){
      copyObj.startYear=!educationData.startYear;
    }else if(field==="End Year"){
      copyObj.endYear=!educationData.endYear;
    }
    console.log(educationData);
  }

  function experienceFieldChosen(field){
    console.log(field);
    const copyObj=experienceData;
    if(field==="Company Name"){
      copyObj.companyName=!experienceData.companyName;
    }else if(field==="Job Profile"){
      copyObj.jobProfile=!experienceData.jobProfile;
    }else if(field==="Location"){
      copyObj.location=!experienceData.location;
    }else if(field==="Start Year"){
      copyObj.startYear=!experienceData.startYear;
    }else if(field==="End Year"){
      copyObj.endYear=!experienceData.endYear;
    }
    console.log(experienceData);
  }

  function publicationsFieldChosen(field){
    console.log(field);
    const copyObj=publicationsData;
    if(field==="Title"){
      copyObj.title=!publicationsData.title;
    }else if(field==="Author List"){
      copyObj.authorList=!publicationsData.authorList;
    }else if(field==="Journal"){
      copyObj.journal=!publicationsData.journal;
    }else if(field==="Summary"){
      copyObj.summary=!publicationsData.summary;
    }else if(field==="Start Year"){
      copyObj.startYear=!publicationsData.startYear;
    }else if(field==="End Year"){
      copyObj.endYear=!publicationsData.endYear;
    }
    console.log(publicationsData);
  }

  const handleCloseSubmit= ()=> setShowSubmitModal(false);
  const handleCloseCancel=()=> setShowCancelModal(false);


  return(
    <>
    {showSubmitModal && <ModalTemplate
      showFunction={showSubmitModal}
      onHideFunction={handleCloseSubmit}
      modalTitle="Post Job"
      modalBody="Are you sure you wish to post this job?"
      buttonVariant1="danger"
      buttonVariant2="success"
      buttonFunction1={handleCloseSubmit}
      buttonFunction2={()=> handleSubmit(personalData,educationData,experienceData,publicationsData)}
      buttonText1="Close"
      buttonText2="Post"
    />}
    {showCancelModal && <ModalTemplate
      showFunction={showCancelModal}
      onHideFunction={handleCloseCancel}
      modalTitle="Cancel Job"
      modalBody="Warning! Are you sure you wish to discard all details for this job?"
      buttonVariant1="dark"
      buttonVariant2="danger"
      buttonFunction1={handleCloseCancel}
      buttonFunction2={()=>window.location.reload()}
      buttonText1="Close"
      buttonText2="Discard"
    />}



    <div className="main_list">
    <h3>Choose the fields you want</h3>
    <form >
    <div className="field">
      <div className="form-check item">
        <input className="form-check-input" type="checkbox" name="personal" checked  />
        <label class="form-check-label input-label" for="personal">
        PERSONAL
        </label>
      </div>
        <div className="data-fields">
        <CustomFormField label="Name" fieldChosen={personalFieldChosen} />
        <CustomFormField label="Email" fieldChosen={personalFieldChosen}/>
        <CustomFormField label="Age" fieldChosen={personalFieldChosen} />
        <CustomFormField label="Gender" fieldChosen={personalFieldChosen} />
        <CustomFormField label="Category" fieldChosen={personalFieldChosen}/>
        <CustomFormField label="Permanent Address" fieldChosen={personalFieldChosen}/>
        <CustomFormField label="Current Address" fieldChosen={personalFieldChosen}/>
        </div>
      </div>
      <div className="field">
        <div className="form-check item">
          <input className="form-check-input " type="checkbox" name="education" onClick={()=> {setEducation(!education); setEducationData({degreeName:false,degreeStudy:false,gradingScale:false,grade:false,startYear:false,endYear:false})} }/>
          <label class="form-check-label input-label" for="education">
          EDUCATION
          </label>
          </div>
      {education &&
        <div className="data-fields">
        <CustomFormField label="Degree Name" fieldChosen={educationFieldChosen} />
        <CustomFormField label="Institute Name" fieldChosen={educationFieldChosen}/>
        <CustomFormField label="Grading Scale" fieldChosen={educationFieldChosen} />
        <CustomFormField label="Grade" fieldChosen={educationFieldChosen} />
        <CustomFormField label="Start Year" fieldChosen={educationFieldChosen}/>
        <CustomFormField label="End Year" fieldChosen={educationFieldChosen}/>
        </div>
      }
      </div>
<div className="field">
      <div className="form-check item">
        <input className="form-check-input" type="checkbox" name="experience" onClick={()=> {setExperience(!experience); setExperienceData({companyName:false,jobProfile:false,location:false,startYear:false,endYear:false})}} />
        <label class="form-check-label input-label" for="experience">
        EXPERIENCE
        </label>
      </div>
      {experience &&
        <div className="data-fields">
        <CustomFormField label="Company Name" fieldChosen={experienceFieldChosen} />
        <CustomFormField label="Job Profile" fieldChosen={experienceFieldChosen}/>
        <CustomFormField label="Location" fieldChosen={experienceFieldChosen} />
        <CustomFormField label="Start Year" fieldChosen={experienceFieldChosen}/>
        <CustomFormField label="End Year" fieldChosen={experienceFieldChosen}/>
        </div>
      }
      </div>
      <div className="field">
      <div className="form-check item">
        <input className="form-check-input" type="checkbox" name="publications" onClick={()=> {setPublications(!publications); setPublicationsData({title:false,authorList:false,journal:false,summary:false,startYear:false,endYear:false});}} />
        <label class="form-check-label input-label" for="publications">
        PUBLICATIONS
        </label>
      </div>
      {publications &&
        <div className="data-fields">
        <CustomFormField label="Title" fieldChosen={publicationsFieldChosen} />
        <CustomFormField label="Author List" fieldChosen={publicationsFieldChosen}/>
        <CustomFormField label="Journal" fieldChosen={publicationsFieldChosen} />
        <CustomFormField label="Summary" fieldChosen={publicationsFieldChosen} />
        <CustomFormField label="Start Year" fieldChosen={publicationsFieldChosen}/>
        <CustomFormField label="End Year" fieldChosen={publicationsFieldChosen}/>
        </div>
      }
      </div>
      <div style={{margin:'auto', display:"flex",justifyContent:'center'}}>
      <Button variant="outline-dark" style={{marginRight:"20px"}} onClick={()=> setShowSubmitModal(true)}>Submit</Button>
      <Button variant="outline-danger" onClick={()=> setShowCancelModal(true)}>Cancel</Button>
      </div>
    </form>
    </div>
    </>

  );
}

export default CustomizableForm;
