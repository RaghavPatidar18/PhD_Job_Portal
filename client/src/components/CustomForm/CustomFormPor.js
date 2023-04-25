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



function CustomFormPor ({getData,collectDataPor}){

  const [por,setPor]=useState(false);
  const [selectAll,setSelectAll]=useState(false);


  const[title,settitle]=useState(false);
  const[organization,setorganization]=useState(false);
  const[startdate,setstartdate]=useState(false);
  const[enddate,setenddate]=useState(false);
  const[description,setdescription]=useState(false);
  const[location,setlocation]=useState(false);

  const obj={
    title,
    organization,
    startdate,
    enddate,
    description,
    location,
  };


useEffect(()=> {
  if(getData===true){
    collectDataPor(obj);
  }
},[getData]);




  const selectAllClicked= ()=> {
    if(selectAll===false){
      setSelectAll(true);
      setPor(true);

      settitle(true);
      setorganization(true);
      setstartdate(true);
      setenddate(true);
      setdescription(true);
      setlocation(true);

    }else{
      setSelectAll(false);
      setPor(false);

      settitle(false);
      setorganization(false);
      setstartdate(false);
      setenddate(false);
      setdescription(false);
      setlocation(false);
    }
  }

  const porChange = () => {
    if(por===false){
      setPor(true);
    }else{
      setSelectAll(false);
      setPor(false);

      settitle(false);
      setorganization(false);
      setstartdate(false);
      setenddate(false);
      setdescription(false);
      setlocation(false);
    }
  }




  return(
    <>
      <div className="field">
        <div className="form-check item">
          <input className="form-check-input" type="checkbox" name="por" onChange={porChange} checked={por===true}  />
          <label className="form-check-label input-label" style={{fontSize:'1rem'}} >POSITION OF RESPONSIBILITY</label>
          <div style={{marginLeft:'auto', paddingRight:'10px'}}>
            <input className='form-check-input' type='checkbox' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onChange={selectAllClicked} checked={selectAll===true}/>
            <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
          </div>
        </div>
        {por &&
          <div className="data-fields">
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1" onChange={()=> settitle(!title)} checked={title===true} value="title"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Title</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1" onChange={()=> setorganization(!organization)} checked={organization===true} value="organization" />
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Organization</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1" onChange={()=> setlocation(!location)} checked={location===true} value="location"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Location</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=> setstartdate(!startdate)} checked={startdate===true} value="startdate"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Start Date</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setenddate(!enddate)} checked={enddate===true} value="enddate"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>End Date</label>
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

export default CustomFormPor;
