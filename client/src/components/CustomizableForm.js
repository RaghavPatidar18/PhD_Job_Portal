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

  function capitalize(s){
    s=s.replace('1',' 1');
    s=s.replace('0','0th');
    s=s.replace('2','2th');
    s=s.replace('percentageformat','percentage format');
    s=s.replace('btech',' Btech ');
    s=s.replace('mtech',' Mtech');
    s=s.replace('phd',' Phd ');
    s=s.replace('date',' date');
    s=s.replace('reference','reference ');
    s=s.replace('mobile','mobile no.');
    s=s.replace('altmobile','alternate mobile');
    s=s.replace('dob','date of birth');
    s=s.replace('doi','date of issue');
    return s[0].toUpperCase()+s.slice(1);
  }

  const [formFields,setFormFields]=useState({});
  const [gotFields,setGotFields]=useState(false);
  const [fieldsSet,setFieldsSet]=useState(false);

  const [academic,setAcademic]=useState(false);
  const [experience,setExperience]=useState(false);
  const [publication,setPublication]=useState(false);
  const [por,setPor]=useState(false);
  const [reference,setReference]=useState(false);
  const [personalData,setPersonalData]=useState({});
  const [academicData,setAcademicData]=useState({});
  const [experienceData,setExperienceData]=useState({});
  const [publicationData,setPublicationData]=useState({});
  const [porData,setPorData]=useState({});
  const [referenceData,setReferenceData]=useState({});
  const [showSubmitModal,setShowSubmitModal]=useState(false);
  const [showCancelModal,setShowCancelModal]=useState(false);


  const [personalSelectAll,setPersonalSelectAll]=useState(false);
  const [academicSelectAll,setAcademicSelectAll]=useState(false);
  const [experienceSelectAll,setExperienceSelectAll]=useState(false);
  const [porSelectAll,setPorSelectAll]=useState(false);
  const [publicationSelectAll,setPublicationSelectAll]=useState(false);
  const [referenceSelectAll,setReferenceSelectAll]=useState(false);



  useEffect(()=> {
    axios.get("/custom-form-fields")
    .then((res)=> {
      if(res.data.status===200){
        setFormFields(res.data.obj);
        setPersonalData(res.data.personalData);
        setAcademicData(res.data.academicData);
        setPublicationData(res.data.publicationData);
        setPorData(res.data.porData);
        setExperienceData(res.data.experienceData);
        setReferenceData(res.data.referenceData);
        //console.log(res.data.obj);
        setGotFields(true);
        //fieldsSetting();
        setFieldsSet(true);
      }
    })
  },[])





// function fieldsSetting(){
//   console.log("field is being set");
//   if(gotFields===true){
//     const personalObj={};
//     formFields.personalKeys.map( k => {
//       personalObj[k]=false;
//     });
//     personalObj["name"]=true;
//     console.log(personalObj);
//     setPersonalData(personalObj);
//     console.log(personalData);
//     const academicObj={};
//     formFields.academicKeys.map( k => {
//       academicObj[k]=false;
//     });
//     setAcademicData({...academicData,academicObj});
//     const experienceObj={};
//     formFields.experienceKeys.map( k => {
//       experienceObj[k]=false;
//     });
//     setExperienceData({...experienceData,experienceObj});
//     const porObj={};
//     formFields.porKeys.map( k => {
//       porObj[k]=false;
//     });
//     setPorData({...porData,porObj});
//     const publicationObj={};
//     formFields.publicationKeys.map( k => {
//       publicationObj[k]=false;
//     });
//     setPublicationData({...publicationData,publicationObj});
//     const referenceObj={};
//     formFields.referenceKeys.map( k => {
//       referenceObj[k]=false;
//     });
//     setReferenceData({...referenceData,referenceObj});
//   }
//
//   //setFieldsSet(true);
//
// }


    //console.log(personalObj);







  function personalFieldChosen(field){
    console.log(field);
    console.log(personalData[field]);
    if(personalSelectAll===false && field!=="name" && field!=='email'){
      console.log("sbgkewkrngiuoe");
      let copyObj=personalData;
      if(personalData[field]===true){
        console.log("wkrbgwgoneogeoig");
        copyObj[field]=false;
        console.log(copyObj[field]);
      }else if(personalData[field]===false){
        console.log("niiiiiii");
        copyObj[field]=true;
        console.log(copyObj[field]);
      }
      console.log(copyObj);
      setPersonalData(copyObj);
    }
    console.log(personalData);

  }

  function resetAcademic(){
    if(academicSelectAll===true){
      setAcademicSelectAll(false);
    }
    setAcademic(!academic);
    const copyObj=academicData;
    Object.keys(copyObj).forEach(k=> copyObj[k]=false)
    //console.log(copyObj);
    setAcademicData(copyObj);
    //console.log(copyObj);
  }

  function academicFieldChosen(field){
    console.log(field);
    if(academicSelectAll===false){
      const copyObj=academicData;
      copyObj[field]=!academicData[field];
      setAcademicData(copyObj);
    }

    console.log(academicData);

  }

  function resetExperience(){
    if(experienceSelectAll===true){
      setExperienceSelectAll(false);
    }
    setExperience(!experience);
    const copyObj=experienceData;
    Object.keys(copyObj).forEach(k=> copyObj[k]=false);
    setExperienceData(copyObj);
  }

  function experienceFieldChosen(field){
    console.log(field);
    if(experienceSelectAll===false){
      const copyObj=experienceData;
      copyObj[field]=!experienceData[field];
      setExperienceData(copyObj);
    }

  }

  function resetPublication(){
    if(publicationSelectAll===true){
      setPublicationSelectAll(false);
    }
    setPublication(!publication);
    const copyObj=publicationData;
    Object.keys(copyObj).forEach(k=> copyObj[k]=false);
    setPublicationData(copyObj);
  }

  function publicationFieldChosen(field){
    console.log(field);
    if(publicationSelectAll===false){
      const copyObj=publicationData;
      copyObj[field]=!publicationData[field];
      setPublicationData(copyObj);
    }

  }

  function resetPor(){
    if(porSelectAll===true){
      setPorSelectAll(false);
    }
    setPor(!por);
    const copyObj=porData;
    Object.keys(copyObj).forEach(k=> copyObj[k]=false);
    setPorData(copyObj);
  }

  function porFieldChosen(field){
    console.log(field);
    if(porSelectAll===false){
      const copyObj=porData;
      copyObj[field]=!porData[field];
      setPorData(copyObj);
    }

  }

  function resetReference(){
    if(referenceSelectAll===true){
      setReferenceSelectAll(false);
    }
    setReference(!reference);
    const copyObj=referenceData;
    Object.keys(copyObj).forEach(k=> copyObj[k]=false);
    setReferenceData(copyObj);
  }

  function referenceFieldChosen(field){
    console.log(field);
    if(referenceSelectAll===false){
      const copyObj=referenceData;
      copyObj[field]=!referenceData[field];
      setReferenceData(copyObj);
    }

  }

  function selectAllClicked(field){
    //console.log("why wont it work");
    if(field==="personal"){
      if(personalSelectAll===false){
        const copyObj=personalData;
        Object.keys(copyObj).forEach(k => copyObj[k]=true);
        setPersonalData(copyObj);
      }
      setPersonalSelectAll(!personalSelectAll);
    }else if(field==="academic"){
      if(academicSelectAll===false){
        setAcademic(true);
        const copyObj=academicData;
        Object.keys(copyObj).forEach(k => copyObj[k]=true);
        setAcademicData(copyObj);
      }
      setAcademicSelectAll(!academicSelectAll);
      console.log(academicData);
    }else if(field==="experience"){

      if(experienceSelectAll===false){
        setExperience(true);
        const copyObj=experienceData;
        Object.keys(copyObj).forEach(k => copyObj[k]=true);
        setExperienceData(copyObj);
      }
      setExperienceSelectAll(!experienceSelectAll);

    }else if(field==="publication"){

      if(publicationSelectAll===false){
        setPublication(true);
        const copyObj=publicationData;
        Object.keys(copyObj).forEach(k => copyObj[k]=true);
        setPublicationData(copyObj);
      }
      setPublicationSelectAll(!publicationSelectAll);
    }else if(field==="por" ){

      if(porSelectAll===false){
        setPor(true);
        const copyObj=porData;
        Object.keys(copyObj).forEach(k => copyObj[k]=true);
        setPorData(copyObj);
      }
      setPorSelectAll(!porSelectAll);
    }else if(field==="reference" ){

      if(referenceSelectAll===false){
        setReference(true);
        const copyObj=referenceData;
        Object.keys(copyObj).forEach(k => copyObj[k]=true);
        setReferenceData(copyObj);
      }
      setReferenceSelectAll(!referenceSelectAll);
    }




    console.log(academic);
    console.log(experience);
    console.log(por);
    console.log(publication);
    console.log(reference);

    console.log(personalData);
    console.log(academicData);
    console.log(experienceData);
    console.log(porData);
    console.log(publicationData);
    console.log(referenceData);
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
      buttonFunction2={()=> handleSubmit(personalData,academicData,experienceData,publicationData,porData,referenceData)}
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



    {gotFields && fieldsSet && <div className="main_list">

    <h3>Choose the fields you want</h3>
    <form >
      
    <div className="field">
      <div className="form-check item">
        <input className="form-check-input" type="checkbox" name="personal" checked  />
        <label className="form-check-label input-label" style={{fontSize:'1rem'}} >
        PERSONAL
        </label>
        <div style={{marginLeft:'auto', paddingRight:'10px'}}>
        <input className='form-check-input' type='radio' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onClick={()=> selectAllClicked('personal')} checked={personalSelectAll===true}/>
        <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
        </div>
      </div>
      <div className="data-fields">
        {formFields.personalKeys.map( (k) =>
          <CustomFormField label={capitalize(k.replaceAll('_',' '))} fieldChosen={personalFieldChosen} fieldName={k} selectAll={personalSelectAll} mainField="personal"/>
        )}
      </div>
    </div>


      <div className="field">
        <div className="form-check item">
          <input className="form-check-input " type="checkbox" name="academic" onClick={resetAcademic} checked={academic===true}/>
          <label className="form-check-label input-label" style={{fontSize:'1rem'}}>
          ACADEMIC
          </label>
          <div style={{marginLeft:'auto', paddingRight:'10px'}}>
          <input className='form-check-input' type='radio' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onClick={()=> selectAllClicked('academic')} checked={academicSelectAll===true}/>
          <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
          </div>
        </div>
        {academic &&
          <div className="data-fields">
            {formFields.academicKeys.map( (k) =>
              <CustomFormField label={capitalize(k)} fieldChosen={academicFieldChosen} fieldName={k} selectAll={academicSelectAll} mainField="academic"/>
            )}
          </div>
        }
      </div>


      <div className="field">
        <div className="form-check item">
          <input className="form-check-input" type="checkbox" name="experience" onClick={resetExperience} checked={experience===true}/>
          <label className="form-check-label input-label" style={{fontSize:'1rem'}}>
          EXPERIENCE
          </label>
          <div style={{marginLeft:'auto', paddingRight:'10px'}}>
          <input className='form-check-input' type='radio' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onClick={()=> selectAllClicked('experience')} checked={experienceSelectAll===true}/>
          <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
          </div>
        </div>
        {experience &&
          <div className="data-fields">
            {formFields.experienceKeys.map( (k) =>
              <CustomFormField label={capitalize(k)} fieldChosen={experienceFieldChosen} fieldName={k} selectAll={experienceSelectAll} mainField="experience"/>
            )}
          </div>
        }
      </div>


      <div className="field">
        <div className="form-check item">
          <input className="form-check-input" type="checkbox" name="publication" onClick={resetPublication} checked={publication===true}/>
          <label className="form-check-label input-label" style={{fontSize:'1rem'}}>
          PUBLICATION
          </label>
          <div style={{marginLeft:'auto', paddingRight:'10px'}}>
          <input className='form-check-input' type='radio' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onClick={()=> selectAllClicked('publication')} checked={publicationSelectAll===true}/>
          <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
          </div>
        </div>
        {publication &&
          <div className="data-fields">
            {formFields.publicationKeys.map( (k) =>
              <CustomFormField label={capitalize(k)} fieldChosen={publicationFieldChosen} fieldName={k} selectAll={publicationSelectAll} mainField="publication"/>
            )}
          </div>
        }
      </div>


      <div className="field">
        <div className="form-check item">
          <input className="form-check-input" type="checkbox" name="por" onClick={resetPor} checked={por===true}/>
          <label className="form-check-label input-label" style={{fontSize:'1rem'}}>
          POSITION OF RESPONSIBILITY
          </label>
          <div style={{marginLeft:'auto', paddingRight:'10px'}}>
          <input className='form-check-input' type='radio' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onClick={()=> selectAllClicked('por')} checked={porSelectAll===true} />
          <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
          </div>
        </div>
        {por &&
          <div className="data-fields">
            {formFields.porKeys.map( (k) =>
              <CustomFormField label={capitalize(k)} fieldChosen={porFieldChosen} fieldName={k} selectAll={porSelectAll} mainField="por"/>
            )}
          </div>
        }
      </div>


      <div className="field">
        <div className="form-check item">
          <input className="form-check-input" type="checkbox" name="reference" onClick={resetReference} checked={reference===true} />
          <label className="form-check-label input-label" style={{fontSize:'1rem'}}>
          REFERENCE
          </label>
          <div style={{marginLeft:'auto', paddingRight:'10px'}}>
          <input className='form-check-input' type='radio' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onClick={()=> selectAllClicked('reference')} checked={referenceSelectAll===true}/>
          <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
          </div>
        </div>
        {reference &&
          <div className="data-fields">
            {formFields.referenceKeys.map( (k) =>
              <CustomFormField label={capitalize(k)} fieldChosen={referenceFieldChosen} fieldName={k} selectAll={referenceSelectAll} mainField="reference"/>
            )}
          </div>
        }
      </div>


      <div style={{margin:'auto', display:"flex",justifyContent:'center'}}>
      <Button variant="outline-dark" style={{marginRight:"20px"}} onClick={()=> setShowSubmitModal(true)}>Submit</Button>
      <Button variant="outline-danger" onClick={()=> setShowCancelModal(true)}>Cancel</Button>
      </div>
    </form>
    </div>}
    </>

  );
}

export default CustomizableForm;
