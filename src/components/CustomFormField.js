import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import { useNavigate , useLocation } from 'react-router-dom';
import "./css/customForm.css";

function CustomFormField({label,fieldChosen,fieldName,selectAll,mainField}){

  const [field,setField]=useState(false);
  useEffect(()=>{
    if((label==="Name" && mainField==="personal") || (fieldName==="email" && mainField==="personal")){
      setField(true);
    }
    if(selectAll===true){
      setField(true);
    }
  })
  return(
    <div className="form-check form-check-inline inline-item" >
      <input className="form-check-input" type="radio" id="personalCheckbox1" value="checkbox" onClick={()=>{fieldChosen(fieldName); setField(!field)}} checked={field===true}/>
      <label className="form-check-label radio-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>{label}</label>
    </div>
  )
}

export default CustomFormField;
