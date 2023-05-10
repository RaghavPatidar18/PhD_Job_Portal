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



function CustomFormReference ({getData,collectDataReference, updateForm}){

  const [reference,setReference]=useState(false);
  const [selectAll,setSelectAll]=useState(false);


  const[title,settitle]=useState(false);
  const[name,setname]=useState(false)
  const[affliliation,setaffliliation]=useState(false);
  const[referenceemail,setreferenceemail]=useState(false);
  const[referencephone,setreferencephone]=useState(false);
  const[relationship,setrelationship]=useState(false);
  const[description,setdescription]=useState(false);

  const isFirstRender = useRef(true);

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
  if(isFirstRender.current){
    console.log("did i come here");
    isFirstRender.current=false;

    if(Object.keys(updateForm).length!==0){
      setReference(true);

      settitle(updateForm.title);
      setname(updateForm.name);
      setaffliliation(updateForm.affliliation);
      setreferenceemail(updateForm.referenceemail);
      setreferencephone(updateForm.referencephone);
      setrelationship(updateForm.relationship);
      setdescription(updateForm.description);
    }
    return;
  }
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
    <div class="max-w-5xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800" style={{width:'80%',marginTop:'50px', position:'relative'}}>
      <div style={{display:'inline-block'}}>
        <div class="inline-flex items-center gap-x-3">
          <input type="checkbox" onChange={referenceChange} checked={reference===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
          <div class="flex items-center gap-x-2">
            <h6 style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial'}}>REFERENCE</h6>
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

      {reference &&
        <div>
          <hr />
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#cae5fc'}}>
            <div class="inline-flex items-center gap-x-3">
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Reference Details</h2>
              </div>
            </div>
          </div>
          <hr style={{margin:'0'}} />
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=> setname(!name)} checked={name===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Name</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=> settitle(!title)} checked={title===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Title</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=> setaffliliation(!affliliation)} checked={affliliation===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Affliliation</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=> setreferenceemail(!referenceemail)} checked={referenceemail===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Reference Email ID</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=> setreferencephone(!referencephone)} checked={referencephone===true}  class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Reference Phone no.</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=>setrelationship(!relationship)} checked={relationship===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Relationship</h2>
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
        </div>*/}
    </>

  );

}

export default CustomFormReference;
