import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import { useNavigate , useLocation } from 'react-router-dom';
//import CustomFormField from "./CustomFormField";
//import "./css/customForm.css";
//import ModalTemplate from "./ModalTemplate.js";



function CustomFormPor ({getData,collectDataPor, updateForm}){

  const [por,setPor]=useState(false);
  const [selectAll,setSelectAll]=useState(false);


  const[title,settitle]=useState(false);
  const[organization,setorganization]=useState(false);
  const[startdate,setstartdate]=useState(false);
  const[enddate,setenddate]=useState(false);
  const[description,setdescription]=useState(false);
  const[location,setlocation]=useState(false);

  const isFirstRender = useRef(true);

  const obj={
    title,
    organization,
    startdate,
    enddate,
    description,
    location,
  };


useEffect(()=> {
  if(isFirstRender.current){
    console.log("did i come here");
    isFirstRender.current=false;

    if(Object.keys(updateForm).length!==0){
      setPor(true);

      settitle(updateForm.title);
      setorganization(updateForm.organization);
      setstartdate(updateForm.startdate);
      setenddate(updateForm.enddate);
      setdescription(updateForm.description);
      setlocation(updateForm.location);
    }
    return;
  }

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
    <div class="max-w-5xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800" style={{width:'80%',marginTop:'50px', position:'relative'}}>
      <div style={{display:'inline-block'}}>
        <div class="inline-flex items-center gap-x-3">
          <input type="checkbox" onChange={porChange} checked={por===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
          <div class="flex items-center gap-x-2">
            <h6 style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial'}}>POSITION OF RESPONSIBILITY</h6>
          </div>
        </div>
      </div>
      <div style={{display:'inline-block', position:'absolute', right:'0', marginRight:'24px'}}>
        <div class="inline-flex items-center gap-x-3">
          <input type="checkbox" onChange={selectAllClicked} checked={selectAll===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
          <div class="flex items-center gap-x-2">
            <h6 style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial'}}>SELECT ALL</h6>
          </div>
        </div>
      </div>

      {por &&
        <div>
          <hr />
          <div class="gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#cae5fc'}}>
            <div class="inline-flex items-center gap-x-3">
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Position of Responsibility Details</h2>
              </div>
            </div>
          </div>
          <hr style={{margin:'0'}} />
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=> settitle(!title)} checked={title===true}  class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Title</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=> setorganization(!organization)} checked={organization===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Organization</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=> setlocation(!location)} checked={location===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Location</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=> setstartdate(!startdate)} checked={startdate===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Start Date</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox"  onChange={()=>setenddate(!enddate)} checked={enddate===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>End Date</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=>setdescription(!description)} checked={description===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Description</h2>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
      {/*<div className="field">
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
        </div>*/}
    </>

  );

}

export default CustomFormPor;
