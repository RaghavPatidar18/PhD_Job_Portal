import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect,useRef} from "react";
import {useParams} from "react-router-dom";
import { useNavigate , useLocation } from 'react-router-dom';
//import CustomFormField from "./CustomFormField";
//import "./css/customForm.css";
//import ModalTemplate from "./ModalTemplate.js";



function CustomFormPersonal ({getData,collectDataPersonal,updateForm}){

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

      const isFirstRender = useRef(true);

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
        if(isFirstRender.current){
          console.log("did i come here");
          isFirstRender.current=false;

          if(Object.keys(updateForm).length!==0){
            setemail(updateForm.email);
            setname(updateForm.name);
            setfathername(updateForm.fathername);
            setage(updateForm.age);
            setprofile_image_url(updateForm.profile_image_url);
            setdob(updateForm.dob);
            setcategory(updateForm.category);
            setdisability(updateForm.disability);
            setmarried(updateForm.married);
            setnationality(updateForm.nationality);
            setgender(updateForm.gender);
            setcommunication_address(updateForm.communication_address);
            setcommunication_city(updateForm.communication_city);
            setcommunication_state(updateForm.communication_state);
            setcommunication_pincode(updateForm.communication_pincode);
            setcommunication_country(updateForm.communication_country);
            setpermanent_address(updateForm.permanent_address);
            setpermanent_city(updateForm.permanent_city);
            setpermanent_state(updateForm.permanent_state);
            setpermanent_pincode(updateForm.permanent_pincode);
            setpermanent_country(updateForm.permanent_country);
            setmobile(updateForm.mobile);
            setaltmobile(updateForm.altmobile);
            setComDetails(true)
            setPermDetails(true)
          }
          return;
        }
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
      setAllComDetails(false);
      setAllPermDetails(false);

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




        <div class="max-w-5xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800" style={{width:'80%',marginTop:'50px', position:'relative'}}>

          <div style={{display:'inline-block'}}>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" checked class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h6 style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial'}}>PERSONAL</h6>
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

          <hr />
          <div>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#cae5fc'}}>
              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" checked class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Personal Details</h2>
                </div>
              </div>
              <div class="inline-flex items-center gap-x-3"></div>
              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" onChange={selectAllPersonalClicked} checked={allPersonalDetails===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Select All</h2>
                </div>
              </div>
            </div>
            <div>
              <hr style={{margin:'0'}}></hr>
              <div class="grid grid-cols-1 gap-6  sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" checked class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Name</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" checked class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Email</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=> setfathername(!fathername)} checked={fathername===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Father's name</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=> setage(!age)} checked={age===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Age</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setprofile_image_url(!profile_image_url)} checked={profile_image_url===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Profile Image</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setdob(!dob)} checked={dob===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Date of Birth</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setcategory(!category)} checked={category===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Category</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setdisability(!disability)} checked={disability===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Disability</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setmarried(!married)} checked={married===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Married</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setnationality(!nationality)} checked={nationality===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Nationality</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setgender(!gender)} checked={gender===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Gender</h2>
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#cae5fc'}}>
              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" onChange={comChange}  checked={comDetails===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Communication Details</h2>
                </div>
              </div>
              <div class="inline-flex items-center gap-x-3"></div>
              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" onChange={selectAllComClicked} checked={allComDetails===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Select All</h2>
                </div>
              </div>
            </div>
            {comDetails && <div>
              <hr style={{margin:'0'}} />
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=> setcommunication_address(!communication_address)} checked={communication_address===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Communication Address</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=> setcommunication_city(!communication_city)} checked={communication_city===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Communication City</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=> setcommunication_state(!communication_state)} checked={communication_state===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Communication State</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=> setcommunication_pincode(!communication_pincode)} checked={communication_pincode===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Communication Pincode</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=> setcommunication_country(!communication_country)} checked={communication_country===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Communication Country</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setmobile(!mobile)} checked={mobile===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Mobile no.</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox"  onChange={()=>setaltmobile(!altmobile)} checked={altmobile===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Alternate Mobile no.</h2>
                  </div>
                </div>
              </div>
            </div>}
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#cae5fc'}}>
              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" onChange={permChange} checked={permDetails===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Permanent Details</h2>
                </div>
              </div>
              <div class="inline-flex items-center gap-x-3"></div>
              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" onChange={selectAllPermClicked} checked={allPermDetails===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Select All</h2>
                </div>
              </div>
            </div>
            {permDetails && <div>
              <hr style={{margin:'0'}} />
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setpermanent_address(!permanent_address)} checked={permanent_address===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Permanent Address</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setpermanent_city(!permanent_city)} checked={permanent_city===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Permanent City</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setpermanent_state(!permanent_state)} checked={permanent_state===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Permanent State</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setpermanent_pincode(!permanent_pincode)} checked={permanent_pincode===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Permanent Pincode</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setpermanent_country(!permanent_country)} checked={permanent_country===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Permanent Country</h2>
                  </div>
                </div>
              </div>
            </div>}
          </div>
        </div>





    </>

  );

}

export default CustomFormPersonal;
