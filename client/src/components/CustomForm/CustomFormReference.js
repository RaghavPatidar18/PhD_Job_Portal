import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import { useNavigate , useLocation } from 'react-router-dom';
//import CustomFormField from "./CustomFormField";
//import "./css/customForm.css";
//import ModalTemplate from "./ModalTemplate.js";



function CustomFormReference ({getData,collectDataReference}){

  const [reference,setReference]=useState(false);
  const [selectAll,setSelectAll]=useState(false);


  const[title,settitle]=useState(false);
  const[name,setname]=useState(false)
  const[affliliation,setaffliliation]=useState(false);
  const[referenceemail,setreferenceemail]=useState(false);
  const[referencephone,setreferencephone]=useState(false);
  const[relationship,setrelationship]=useState(false);
  const[description,setdescription]=useState(false);

  const obj={
    title,
    name,
    affliliation,
    referenceemail,
    referencephone,
    relationship,
    description,
  };

useEffect(()=> {
  if(getData===true){
    collectDataReference(obj);
  }
},[getData])





  const selectAllClicked= ()=> {
    if(selectAll===false){
      setSelectAll(true);
      setReference(true);

      settitle(true);
      setname(true);
      setaffliliation(true);
      setreferenceemail(true);
      setreferencephone(true);
      setrelationship(true);
      setdescription(true);

    }else{
      setSelectAll(false);
      setReference(false);

      settitle(false);
      setname(false);
      setaffliliation(false);
      setreferenceemail(false);
      setreferencephone(false);
      setrelationship(false);
      setdescription(false);
    }
  }

  const referenceChange = () => {
    if(reference===false){
      setReference(true);
    }else{
      setSelectAll(false);
      setReference(false);

      settitle(false);
      setname(false);
      setaffliliation(false);
      setreferenceemail(false);
      setreferencephone(false);
      setrelationship(false);
      setdescription(false);
    }
  }




  return(
    <>
      <div className="field">
        <div className="form-check item">
          <input className="form-check-input" type="checkbox" name="reference" onChange={referenceChange} checked={reference===true}  />
          <label className="form-check-label input-label" style={{fontSize:'1rem'}} >REFERENCE</label>
          <div style={{marginLeft:'auto', paddingRight:'10px'}}>
            <input className='form-check-input' type='checkbox' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onChange={selectAllClicked} checked={selectAll===true}/>
            <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
          </div>
        </div>
        {reference &&
          <div className="data-fields">
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1" onChange={()=> setname(!name)} checked={name===true} value="name"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Name</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1" onChange={()=> settitle(!title)} checked={title===true} value="title" />
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Title</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1" onChange={()=> setaffliliation(!affliliation)} checked={affliliation===true} value="affliliation"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Affliliation</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=> setreferenceemail(!referenceemail)} checked={referenceemail===true} value="referenceemail"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Reference Email</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setreferencephone(!referencephone)} checked={referencephone===true} value="referencephone"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}> Reference Phone</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setrelationship(!relationship)} checked={relationship===true} value="relationship"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Relationship </label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setdescription(!description)} checked={description===true} value="description"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Description </label>
            </div>
          </div>}
        </div>
    </>

  );

}

export default CustomFormReference;
