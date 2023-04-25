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



function CustomFormPersonal ({getData,collectDataPersonal}){

  const [selectAll,setSelectAll]=useState(false);
  const [allPersonalDetails,setAllPersonalDetails]=useState(false);
  const [comDetails,setComDetails]=useState(false);
  const [allComDetails,setAllComDetails]=useState(false);
  const [permDetails,setPermDetails]=useState(false);
  const [allPermDetails,setAllPermDetails]=useState(false);



      const[email,setemail]=useState(true);
      // Personal Details
      const[name,setname]=useState(true);
      const[fathername,setfathername]=useState(false);
      const[age,setage]=useState(false);
      const[profile_image_url,setprofile_image_url]=useState(false);
      const[dob,setdob]=useState(false);
      const[category,setcategory]=useState(false);
      const[disability,setdisability]=useState(false);
      const[married,setmarried]=useState(false);
      const[nationality,setnationality]=useState(false);
      const[gender,setgender]=useState(false);
      // Communication Details
      const[communication_address,setcommunication_address]=useState(false);
      const[communication_city,setcommunication_city]=useState(false);
      const[communication_state,setcommunication_state]=useState(false);
      const[communication_pincode,setcommunication_pincode]=useState(false);
      const[communication_country,setcommunication_country]=useState(false);

      const[permanent_address,setpermanent_address]=useState(false);
      const[permanent_city,setpermanent_city]=useState(false);
      const[permanent_state,setpermanent_state]=useState(false);
      const[permanent_pincode,setpermanent_pincode]=useState(false);
      const[permanent_country,setpermanent_country]=useState(false);

      const[mobile,setmobile]=useState(false);
      const[altmobile,setaltmobile]=useState(false);


      const obj={
        email,
        name,
        fathername,
        age,
        profile_image_url,
        dob,
        category,
        disability,
        married,
        nationality,
        gender,
        communication_address,
        communication_city,
        communication_state,
        communication_pincode,
        communication_country,
        permanent_address,
        permanent_city,
        permanent_state,
        permanent_pincode,
        permanent_country,
        mobile,
        altmobile,
      };

      useEffect(()=> {
        if(getData===true){
          collectDataPersonal(obj);
        }
      },[getData]);




  const selectAllClicked= ()=> {
    if(selectAll===false){
      setSelectAll(true);

      setComDetails(true);
      setPermDetails(true);

      setemail(true);
      setname(true);
      setfathername(true);
      setage(true);
      setprofile_image_url(true);
      setdob(true);
      setcategory(true);
      setdisability(true);
      setmarried(true);
      setnationality(true);
      setgender(true);
      setcommunication_address(true);
      setcommunication_city(true);
      setcommunication_state(true);
      setcommunication_pincode(true);
      setcommunication_country(true);
      setpermanent_address(true);
      setpermanent_city(true);
      setpermanent_state(true);
      setpermanent_pincode(true);
      setpermanent_country(true);
      setmobile(true);
      setaltmobile(true);

    }else{
      setSelectAll(false);

      setComDetails(false);
      setPermDetails(false);

      setemail(true);
      setname(true);
      setfathername(false);
      setage(false);
      setprofile_image_url(false);
      setdob(false);
      setcategory(false);
      setdisability(false);
      setmarried(false);
      setnationality(false);
      setgender(false);
      setcommunication_address(false);
      setcommunication_city(false);
      setcommunication_state(false);
      setcommunication_pincode(false);
      setcommunication_country(false);
      setpermanent_address(false);
      setpermanent_city(false);
      setpermanent_state(false);
      setpermanent_pincode(false);
      setpermanent_country(false);
      setmobile(false);
      setaltmobile(false);
    }
  }

  const selectAllPersonalClicked = () => {
    if(allPersonalDetails===false){

      setemail(true);
      setname(true);
      setfathername(true);
      setage(true);
      setprofile_image_url(true);
      setdob(true);
      setcategory(true);
      setdisability(true);
      setmarried(true);
      setnationality(true);
      setgender(true);

      setAllPersonalDetails(true);

    }else{

      setemail(true);
      setname(true);
      setfathername(false);
      setage(false);
      setprofile_image_url(false);
      setdob(false);
      setcategory(false);
      setdisability(false);
      setmarried(false);
      setnationality(false);
      setgender(false);

      setAllPersonalDetails(false);
    }

  }

  const selectAllComClicked = () => {
    if(allComDetails===false){
      setcommunication_address(true);
      setcommunication_city(true);
      setcommunication_state(true);
      setcommunication_pincode(true);
      setcommunication_country(true);
      setmobile(true);
      setaltmobile(true);
      setComDetails(true);
      setAllComDetails(true);
    }else{
      setcommunication_address(false);
      setcommunication_city(false);
      setcommunication_state(false);
      setcommunication_pincode(false);
      setcommunication_country(false);
      setmobile(false);
      setaltmobile(false);
      setComDetails(false);
      setAllComDetails(false);
    }

  }

  const selectAllPermClicked = () => {
    if(allPermDetails===false){
      setAllPermDetails(true);
      setPermDetails(true);
      setpermanent_address(true);
      setpermanent_city(true);
      setpermanent_state(true);
      setpermanent_pincode(true);
      setpermanent_country(true);
    }else{
      setAllPermDetails(false);
      setPermDetails(false);
      setpermanent_address(false);
      setpermanent_city(false);
      setpermanent_state(false);
      setpermanent_pincode(false);
      setpermanent_country(false);
    }
  }



  const comChange = () => {
    if(comDetails===false){
      setComDetails(true);
    }else{
      setComDetails(false);
      setAllComDetails(false);
      setcommunication_address(false);
      setcommunication_city(false);
      setcommunication_state(false);
      setcommunication_pincode(false);
      setcommunication_country(false);
      setmobile(false);
      setaltmobile(false);
    }
  }

  const permChange = () => {
    if(permDetails===false){
      setPermDetails(true);
    }else{
      setAllPermDetails(false);
      setPermDetails(false);
      setpermanent_address(false);
      setpermanent_city(false);
      setpermanent_state(false);
      setpermanent_pincode(false);
      setpermanent_country(false);
    }
  }


  return(
    <>




      <div className="field">
        <div className="form-check item">
          <input className="form-check-input" type="checkbox" name="personal" checked  />
          <label className="form-check-label input-label" style={{fontSize:'1rem'}} >PERSONAL</label>
          <div style={{marginLeft:'auto', paddingRight:'10px'}}>
            <input className='form-check-input' type='checkbox' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onChange={selectAllClicked} checked={selectAll===true}/>
            <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
          </div>
        </div>
        <div className="data-fields">

          <div>
            <div style={{display:'flex'}}>
            <input className="form-check-input" type="checkbox" checked  />
            <label className="form-check-label input-label" style={{fontSize:'1rem'}} >Personal Details</label>
            <div style={{marginLeft:'auto', paddingRight:'10px'}}>
              <input className='form-check-input' type='checkbox' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onChange={selectAllPersonalClicked} checked={allPersonalDetails===true}/>
              <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
            </div>
            </div>

            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1" checked value="name"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Name</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1" value="email" checked/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Email</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1" onChange={()=> setfathername(!fathername)} checked={fathername===true} value="fathername"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Father's Name</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=> setage(!age)} checked={age===true} value="age"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Age</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setprofile_image_url(!profile_image_url)} checked={profile_image_url===true} value="profile_image_url"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Profile Image URL</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setdob(!dob)} checked={dob===true} value="dob"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Date of Birth</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setcategory(!category)} checked={category===true} value="category"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Category</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setdisability(!disability)} checked={disability===true} value="disablity"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Disablity</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setmarried(!married)} checked={married===true} value="married"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Marriage Status</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setnationality(!nationality)} checked={nationality===true} value="nationality"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Nationality</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setgender(!gender)} checked={gender===true} value="gender"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Gender</label>
            </div>

          </div>

          <div>
          <div style={{display:'flex'}}>
            <input className="form-check-input" type="checkbox" onChange={comChange}  checked={comDetails===true}/>
            <label className="form-check-label input-label" style={{fontSize:'1rem'}} >Communication Details</label>
            <div style={{marginLeft:'auto', paddingRight:'10px'}}>
              <input className='form-check-input' type='checkbox' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onChange={selectAllComClicked} checked={allComDetails===true}/>
              <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
            </div>
            </div>

            {comDetails &&
              <div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=> setcommunication_address(!communication_address)} checked={communication_address===true} value="communication_address"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Address</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setcommunication_city(!communication_city)} checked={communication_city===true} value="communication_city"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>City</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setcommunication_state(!communication_state)} checked={communication_state===true} value="communication_state"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>State</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setcommunication_pincode(!communication_pincode)} checked={communication_pincode===true} value="communication_pincode"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Pincode</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setcommunication_country(!communication_country)} checked={communication_country===true} value="communication_country"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Country</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setmobile(!mobile)} checked={mobile===true} value="mobile"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Mobile No.</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setaltmobile(!altmobile)} checked={altmobile===true} value="altmobile"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Alternate Mobile No.</label>
                </div>
              </div>}
          </div>

          <div>
          <div style={{display:'flex'}}>
            <input className="form-check-input" type="checkbox" onChange={permChange} checked={permDetails===true} />
            <label className="form-check-label input-label" style={{fontSize:'1rem'}} >Permanent Details</label>
            <div style={{marginLeft:'auto', paddingRight:'10px'}}>
              <input className='form-check-input' type='checkbox' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onChange={selectAllPermClicked} checked={allPermDetails===true} />
              <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
            </div>
            </div>

            {permDetails &&
              <div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setpermanent_address(!permanent_address)} checked={permanent_address===true} value="permanent_address"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Address</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setpermanent_city(!permanent_city)} checked={permanent_city===true} value="permanent_city"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>City</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setpermanent_state(!permanent_state)} checked={permanent_state===true} value="permanent_state"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>State</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setpermanent_pincode(!permanent_pincode)} checked={permanent_pincode===true} value="permanent_pincode"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Pincode</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setpermanent_country(!permanent_country)} checked={permanent_country===true} value="permanent_country"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Country</label>
                </div>
              </div>

            }

          </div>






        </div>
      </div>


    </>

  );

}

export default CustomFormPersonal;
