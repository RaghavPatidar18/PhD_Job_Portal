import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect, useRef} from "react";
import {useParams} from "react-router-dom";
import { useNavigate , useLocation } from 'react-router-dom';
import ModalTemplate from "./ModalTemplate.js";
import "./css/ApplicationForm.css"
import Modal from "react-bootstrap/Modal";

function ApplicationForm({type}){

  const {job_id,user_id}=useParams();

  //console.log(job_id);
  //console.log(user_id);
  const url=`/application-form/${job_id}/${user_id}`;
  const [jobFields,setJobFields]=useState({});
  const [dataRecieved,setDataRecieved]=useState(false);
  const history = useNavigate();
  const [show,setShow]=useState(false);
  const [refChange,setRefChange]=useState(2);
  const [porChange,setPorChange]=useState(2);
  const [pubChange,setPubChange]=useState(2);
  const [expChange,setExpChange]=useState(2);

  const [personalError,setPersonalError]=useState(false);
  const [tenthMarksheetError,setTenthMarksheetError]=useState(false);
  const [twelfthMarksheetError,setTwelfthMarksheetError]=useState(false);
  const [btechMarksheetError,setBtechMarksheetError]=useState(false);
  const [mtechMarksheetError,setMtechMarksheetError]=useState(false);
  const [publicationError,setPublicationError]=useState([]);
  const [referenceError,setReferenceError]=useState([]);

  const [showError,setShowError]=useState(false);

  const isFirstRender = useRef(true);

  const handleClose = ()=> setShow(false);
    const handleCloseError = ()=> setShowError(false);


  const getDetails = async()=> {
  console.log("brioe");
  if(type!=="student"){
    history("*");
  }else{
    console.log("i m here");
    const res=await fetch(url,{
      method: "GET",
      headers: {"Content-Type": "application/json",}
    });
    const data=await res.json();
    if(data.status===200){
      setJobFields(data.dataObject);
      console.log("sdnio");
      setDataRecieved(true);
      //onsole.log(jobFields);
      console.log(data.dataObject);

      var publicationErrorArray=[];
      console.log("trying to read the values of publis")
      console.log(data.dataObject.publication);
      data.dataObject.publication.map((pub,index)=>{
        publicationErrorArray.push(false);
      });
      setPublicationError(publicationErrorArray);

      var referenceErrorArray=[];
      data.dataObject.reference.map((ref,index)=>{
        referenceErrorArray.push(false);
      });
      setReferenceError(referenceErrorArray);



    }

    // const res=await fetch(url,{
    //   method: "GET",
    //   headers: {"Content-Type": "application/json",}
    // });
    // const data=await res.json();
    // if(data.status===200){
    //   setJobFields(data.dataObject);
    //   console.log("sdnio");
    //   setDataRecieved(true);
    //   //onsole.log(jobFields);
    //   console.log(data.dataObject);
    // }
  }
}

function submitClicked(){
  console.log("submit clicked");
  const dataToSend={};

  //personal data;

  const personalFields=jobFields.jobFields.personal;
  const personal=[];
  const personalObj={};
  Object.keys(personalFields).map((k)=> {
    if(personalFields[k]===true){
      personalObj[k]=jobFields.personal[0][k];
    }
  });

  personal.push(personalObj);



  const academicFields=jobFields.jobFields.academic;
  const academic=[];
  const academicObj={};

  Object.keys(academicFields).map((k)=>{
    if(academicFields[k]===true){
      academicObj[k]=jobFields.academic[0][k];
    }
  });

  academic.push(academicObj);



  const experienceFields=jobFields.jobFields.experience;
  const experience=[];
  jobFields.experience.map((exp)=> {
    const experienceObj={};
    Object.keys(experienceFields).map((k)=>{
      if(experienceFields[k]===true){
        experienceObj[k]=exp[k];
      }
    });
    if(Object.keys(experienceObj).length!==0){
      experience.push(experienceObj);
    }
  });

  if(experience.length===0){
    experience.push({});
  }


  const publicationFields=jobFields.jobFields.publication;
  const publication=[];
  jobFields.publication.map((pub)=> {
    const publicationObj={};
    Object.keys(publicationFields).map((k)=>{
      if(publicationFields[k]===true){
        publicationObj[k]=pub[k];
      }
    });
    if(Object.keys(publicationObj).length!==0){
      publication.push(publicationObj);
    }
  });

  if(publication.length===0){
    publication.push({});
  }


  const porFields=jobFields.jobFields.por;
  const por=[];
  jobFields.por.map((p)=> {
    const porObj={};
    Object.keys(porFields).map((k)=>{
      if(porFields[k]===true){
        porObj[k]=p[k];
      }
    });
    if(Object.keys(porObj).length!==0){
      por.push(porObj);
    }
  });

  if(por.length===0){
    por.push({});
  }

  const referenceFields=jobFields.jobFields.reference;
  const reference=[];
  jobFields.reference.map((ref)=> {
    const referenceObj={};
    Object.keys(referenceFields).map((k)=>{
      if(referenceFields[k]===true){
        referenceObj[k]=ref[k];
      }
    });
    if(Object.keys(referenceObj).length!==0){
      reference.push(referenceObj);
    }
  });

  if(reference.length===0){
    reference.push({});
  }


  dataToSend.personal=personal;
  dataToSend.academic=academic;
  dataToSend.experience=experience;
  dataToSend.publication=publication;
  dataToSend.por=por;
  dataToSend.reference=reference;

  axios.post(`/application-form/${job_id}/${user_id}`, {dataToSend})
    .then((response) => {
      if(response.data.status===200){
        console.log("submitted");
        history("/");
      }
    })
    .catch((err)=>console.log(err));
}







  useEffect(()=> {
    if(isFirstRender.current){
      console.log("did i come here");
      isFirstRender.current=false;
      getDetails();
      return;
    }
    //console.log("srni");


  }, []);

  const addReference = ()=> {
    console.log("here");
    const obj={
      name: "",
      title: "",
      affliliation: "",
      referenceemail: "",
      referencephone: "",
      relationship: "",
      description: "",
    };

    jobFields.reference.push(obj);
    console.log(jobFields.reference);
    setRefChange(refChange+1);

    var refErrorArray=referenceError;
    refErrorArray.push(false);
    setReferenceError(refErrorArray);



  }

  const deleteReference = (index) => {

    if(index>-1){
      jobFields.reference.splice(index,1);
      setRefChange(refChange+1);

      var refErrorArray=referenceError;
      refErrorArray.splice(index,1);
      setReferenceError(refErrorArray);
    }

  }

  const addPor = ()=> {
    const obj={
      title:"",
      organization: "",
      location: "",
      startdate:"",
      enddate:"",
      description:"",
    };
    jobFields.por.push(obj);
    setPorChange(porChange+1);
  }

  const deletePor = (index)=> {
    if(index>-1){
      jobFields.por.splice(index,1);
      setPorChange(porChange+1);
    }
  }

  const addPublication = ()=> {
    const obj={
      title:"",
      abstract: "",
      journal: "",
      volume:"",
      pages:"",
      publisher:"",
      doi:"",
      url:"",
    };
    jobFields.publication.push(obj);
    setPubChange(pubChange+1);

    var pubErrorArray=publicationError;
    pubErrorArray.push(false);
    setPublicationError(pubErrorArray);
  }

  const deletePublication = (index)=> {
    if(index>-1){
      jobFields.publication.splice(index,1);
      setPubChange(pubChange+1);

      var pubErrorArray=publicationError;
      pubErrorArray.splice(index,1);
      setPublicationError(pubErrorArray);
    }
  }

  const addExperience = ()=> {
    const obj={
      profile:"",
      organization: "",
      startdate: "",
      enddate:"",
      description:"",
      location:"",
    };
    jobFields.experience.push(obj);
    setExpChange(expChange+1);
  }

  const deleteExperience = (index)=> {
    if(index>-1){
      jobFields.experience.splice(index,1);
      setExpChange(expChange+1);
    }
  }

  const checkComDetails = ()=> {
    console.log("dnioenoei");
    const obj=jobFields.jobFields.personal;
    if(obj.communication_city===true || obj.communication_state===true || obj.communication_address===true || obj.communication_country===true || obj.communication_pincode===true){
      console.log("sngioen");
      return true;
    }else{
      return false;
    }
  }

  const checkPermDetails = () =>{
    const obj=jobFields.jobFields.personal;
    if(obj.permanent_city===true || obj.permanent_state===true || obj.permanent_address===true || obj.permanent_country===true || obj.permanent_pincode===true){
      return true;
    }else{
      return false;
    }
  }

  const checkContactDetails = ()=> {
    const obj=jobFields.jobFields.personal;
    if(obj.mobile===true || obj.altmobile===true){
      return true;
    }else{
      return false;
    }
  }

  const checkTenthDetails = ()=> {
    const obj=jobFields.jobFields.academic;
    if(obj.board10 || obj.percentageformat10 || obj.percentage10 || obj.year10 || obj.remarks10 || obj.marksheet10){
      return true;
    }else{
      return false;
    }
  }

  const checkTwelfthDetails=()=>{
    const obj=jobFields.jobFields.academic;
    if(obj.board12 || obj.percentageformat12 || obj.percentage12 || obj.year12 || obj.remarks12 || obj.marksheet12){
      return true;
    }else{
      return false;
    }
  }

  const checkBtechDetails=()=>{
    const obj=jobFields.jobFields.academic;
    if(obj.collegebtech || obj.branchbtech || obj.percentageformatbtech || obj.percentagebtech || obj.yearbtech || obj.remarksbtech || obj.marksheetbtechurl){
      return true;
    }else{
      return false;
    }
  }

  const checkMtechDetails=()=>{
    const obj=jobFields.jobFields.academic;
    if(obj.collegemtech || obj.branchmtech || obj.percentageformatmtech || obj.percentagemtech || obj.yearmtech || obj.remarksmtech || obj.marksheetmtechurl){
      return true;
    }else{
      return false;
    }
  }

  const checkPhdDetails=()=>{
    const obj=jobFields.jobFields.academic;
    if(obj.isphdcompleted || obj.phdremarks){
      return true;
    }else{
      return false;
    }
  }

  const checkAcademicDetails=()=>{
    const obj=jobFields.jobFields.academic;
    const values=Object.values(obj);
    var flag=values.some(v =>{
      return v===true;
    })
    if(flag){
      return true;
    }else{
      return false;
    }

  }

  const checkExperienceDetails=()=>{
    const obj=jobFields.jobFields.experience;
    const values=Object.values(obj);
    var flag=values.some(v =>{
      return v===true;
    })
    if(flag){
      return true;
    }else{
      return false;
    }
  }

  const checkPublicationDetails=()=>{
    const obj=jobFields.jobFields.publication;
    const values=Object.values(obj);
    var flag=values.some(v =>{
      return v===true;
    })
    return flag;
  }

  const checkPorDetails=()=>{
    const obj=jobFields.jobFields.por;
    const values=Object.values(obj);
    var flag=values.some(v =>{
      return v===true;
    })
    return flag;
  }

  const checkReferenceDetails=()=>{
    const obj=jobFields.jobFields.reference;
    const values=Object.values(obj);
    var flag=values.some(v =>{
      return v===true;
    })
    return flag;
  }






var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;


const checkFields = () => {

  console.log(jobFields);

  var personalErr=false;
  var tenthErr=false;
  var twelfthErr=false;
  var btechErr=false;
  var mtechErr=false;

  var pubErr=publicationError;
  pubErr.map((p,index)=>{
    pubErr[index]=false;
  })  ;
  var refErr=referenceError;
  refErr.map((p,index)=>{
    refErr[index]=false;
  }) ;
  var flag=0;
  jobFields.personal.map((p,index)=>{
    if(flag===0){
      Object.keys(p).map((p_value)=>{
        if(flag===0 && jobFields.jobFields.personal[p_value]===true){
          console.log(p_value);
          if(p[p_value]===undefined || p[p_value].toString()===""){
            flag=1;
          }
        }
      });
    }
  });

  if(flag===1){
    console.log("personal is empty");
  }

  if(flag===0){
    jobFields.academic.map((p,index)=>{
      if(flag===0){
        Object.keys(p).map((p_value)=>{
          if(flag===0 && jobFields.jobFields.academic[p_value]===true){
            console.log(p_value);
            if(p[p_value]===undefined ||p[p_value].toString()===""){
              console.log("this field is empty");
              console.log(p_value);
              console.log(p[p_value]);
              flag=1;
            }
          }
        });
      }
    });

    if(flag===1){
      console.log("academic is empty");
    }
  }




  if(flag===0){
    jobFields.publication.map((p,index)=>{
      if(flag===0){
        Object.keys(p).map((p_value)=>{
          if(flag===0 && jobFields.jobFields.publication[p_value]===true){
            console.log(p_value);
            if(p[p_value]===undefined || p[p_value].toString()===""){
              flag=1;
            }
          }
        });
      }
    });

    if(flag===1){
      console.log("publication is empty");
    }
  }

  if(flag===0){
    jobFields.experience.map((p,index)=>{
      if(flag===0){
        Object.keys(p).map((p_value)=>{
          if(flag===0 && jobFields.jobFields.experience[p_value]===true){
            console.log(p_value);
            if(p[p_value]===undefined || p[p_value].toString()===""){
              flag=1;
            }
          }
        });
      }
    });

    if(flag===1){
      console.log("experience is empty");
    }
  }
  if(flag===0){
    jobFields.reference.map((p,index)=>{
      if(flag===0 ){
        Object.keys(p).map((p_value)=>{
          if(flag===0 && jobFields.jobFields.reference[p_value]===true){
            console.log(p_value);
            if(p[p_value]===undefined || p[p_value].toString()===""){
              flag=1;
            }
          }
        });
      }
    });

    if(flag===1){
      console.log("reference is empty");
    }
  }

  if(flag===0){
    jobFields.por.map((p,index)=>{
      if(flag===0 ){
        Object.keys(p).map((p_value)=>{
          if(flag===0 && jobFields.jobFields.por[p_value]===true){
            console.log(p_value);
            if(p[p_value]===undefined || p[p_value].toString()===""){
              flag=1;
            }
          }
        });
      }
    });

    if(flag===1){
      console.log("por is empty");
    }
  }

  if(flag===1){
    setShowError(true);
    console.log("empty field found");
    return;
  }


  const personalEmail=jobFields.personal[0].email;
  if(personalEmail.toLowerCase()===personalEmail){
    if(personalEmail.includes("@") && personalEmail.includes(".")){
      personalErr=false;
      setPersonalError(false);
      // if(personalEmail.indexOf("@")!==0 && personalEmail.indexOf("@")<personalEmail.indexOf(".") && personalEmail.indexOf(".")!==personalEmail.length-1){
      //   console.log("personal email is right");
      // }else{
      //   personalErr=true;
      //   setPersonalError(true);
      // }
    }else{
      personalErr=true;
      setPersonalError(true);
    }
  }else{
    personalErr=true;
    setPersonalError(true);
  }

  if(jobFields.jobFields.academic.marksheet10===true){
    var tenthUrl=jobFields.academic[0].marksheet10;
    console.log(tenthUrl);
      console.log(typeof(tenthUrl));
    if(tenthUrl.substr(0,7)==="http://" || tenthUrl.substr(0,8)==="https://"){
      console.log("tenth marksheet url is ok");
      tenthErr=false;
      setTenthMarksheetError(false);
    }else{
      console.log("not okay 10th marskeet");
      tenthErr=true;
      setTenthMarksheetError(true);
    }
  }


  if(jobFields.jobFields.academic.marksheet12===true){
    var twelfthUrl=jobFields.academic[0].marksheet12;
    if(twelfthUrl.substr(0,7)==="http://" || twelfthUrl.substr(0,8)==="https://"){
      console.log("twelfth marksheet url is ok");
      twelfthErr=false;
      setTwelfthMarksheetError(false);
    }else{
      twelfthErr=true;
      setTwelfthMarksheetError(true);
    }
  }


  if(jobFields.jobFields.academic.marksheetbtechurl===true){
    var btechUrl=jobFields.academic[0].marksheetbtechurl;
    if(btechUrl.substr(0,7)==="http://" || btechUrl.substr(0,8)==="https://"){
      console.log("btech marksheet url is ok");
      btechErr=false;
      setBtechMarksheetError(false);
    }else{
      btechErr=true;
      setBtechMarksheetError(true);
    }
  }


  if(jobFields.jobFields.academic.marksheetmtechurl===true){
    var mtechUrl=jobFields.academic[0].marksheetmtechurl;
    if(mtechUrl.substr(0,7)==="http://" || mtechUrl.substr(0,8)==="https://"){
      console.log("mtech marksheet url is ok");
      mtechErr=false;
      setMtechMarksheetError(false);
    }else{
      mtechErr=true;
      setMtechMarksheetError(true);
    }
  }


  jobFields.publication.map((pub,index)=>{
    if(jobFields.jobFields.publication.url===true){
      var url=pub.url;
      if(url.substr(0,7)==="http://" || url.substr(0,8)==="https://"){
        console.log(`publication url ${index} is ok`);
        var publicationErrorArray=publicationError;
        pubErr[index]=false;
        publicationErrorArray[index]=false;
        setPublicationError(publicationErrorArray);
      }else{
        var publicationErrorArray=publicationError;
        pubErr[index]=true;
        publicationErrorArray[index]=true;
        setPublicationError(publicationErrorArray);
      }
    }

  });

  jobFields.reference.map((ref,index)=>{
    if(jobFields.jobFields.reference.referenceemail===true){
      var email=ref.referenceemail;
      if(email.toLowerCase()===email){
        if(email.includes("@") && email.includes(".")){
          if(email.indexOf("@")!==0 && email.indexOf("@")<email.indexOf(".") && email.indexOf(".")!==email.length-1){
            console.log(`reference email ${index} is right`);
            var referenceErrorArray=referenceError;
            refErr[index]=false;
            referenceErrorArray[index]=false;
            setReferenceError(referenceErrorArray);
          }else{
            var referenceErrorArray=referenceError;
            refErr[index]=true;
            referenceErrorArray[index]=true;
            setReferenceError(referenceErrorArray);
          }
        }else{
          var referenceErrorArray=referenceError;
          refErr[index]=true;
          referenceErrorArray[index]=true;
          setReferenceError(referenceErrorArray);
        }
      }else{
        var referenceErrorArray=referenceError;
        refErr[index]=true;
        referenceErrorArray[index]=true;
        setReferenceError(referenceErrorArray);
      }
    }

  });

console.log("hereere");

console.log(personalErr);
console.log(tenthErr);
console.log(twelfthErr);
console.log(btechErr);
console.log(mtechErr);

  if(personalErr===true || tenthErr===true || twelfthErr===true || btechErr===true || mtechErr===true){
    console.log('error found');
    setShowError(true);
  }else{
    var pubError=pubErr.some((pub)=>{
      return pub===true;
    })
    var refError=refErr.some((ref)=>{
      return ref===true;
    })

    if(pubError===true || refError===true){
      console.log('error found');
      setShowError(true);
    }else{
      setShow(true);
    }

  }


}



//console.log(jobFields);
  return(
    <>
    <Modal show={show} onHide={handleClose}>
    <div class="relative block overflow-hidden text-left align-middle transform bg-white  sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6" style={{margin:'auto', marginTop:'10px', marginBottom:'10px'}}>
        <div class="text-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                Submit Application Form
            </h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400">
                Are you sure you wish to submit these details for the job ?
            </p>
        </div>
        <div class="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
            <button onClick={handleClose} class="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                Cancel
            </button>

            <button onClick={submitClicked} class="px-4 sm:mx-2 w-full py-2.5 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                Submit
            </button>
        </div>
    </div>
    </Modal>

    <Modal show={showError} onHide={handleCloseError}>
    <div class="relative block overflow-hidden text-left align-middle transform bg-white  sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6" style={{margin:'auto', marginTop:'10px', marginBottom:'10px'}}>
        <div class="text-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                Error Submitting Form
            </h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400">
                Some fields were either filled wrongly or left unanswered !
            </p>
        </div>
        <div class="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
            <button onClick={handleCloseError} class="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                Cancel
            </button>


        </div>
    </div>
    </Modal>

    <section class="max-w-7xl p-6 mx-auto rounded-md shadow-md dark:bg-gray-800" style={{marginTop:'40px',marginBottom:'40px',backgroundColor:'#CBC5C5'}}>
      <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white" style={{textAlign:'center'}}>APPLICATION FORM</h2>


      {dataRecieved && <form>

        <div class="max-w-5xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800" style={{marginTop:'20px'}}>
        <div>
          <h6 style={{display:'inline-block'}}>PERSONAL</h6>
          <p style={{display:'inline-block', fontSize:'0.8rem', marginTop:'0', marginBottom:'auto'}}>&nbsp;(<span style={{color:'red'}}>*</span> are compulsory fields)</p>
          </div>
          <hr />
          <div >
            <h6 style={{textDecoration:'underline'}}>Personal Details</h6>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
              <div>
                <label class="text-gray-700 dark:text-gray-200" for="name">Name<span style={{color:'red'}}> *</span></label>
                <input required type="text" value={jobFields.personal[0].name} onChange={(e)=> {const obj=jobFields;obj.personal[0].name=e.target.value; setJobFields({...jobFields,obj});}} id="username" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-red-400 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
              </div>
              {jobFields.jobFields.personal.email && <div>
                <label class="text-gray-700 dark:text-gray-200" for="email">Email<span style={{color:'red'}}> *</span> </label>
                <input required type="email" value={jobFields.personal[0].email} onChange={(e)=> {const obj=jobFields;obj.personal[0].email=e.target.value; setJobFields({...jobFields,obj}); }} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring" />
                {personalError && <p class=" text-xs text-red-400">Must be of the form: a@b.c</p>}
              </div>}
              {jobFields.jobFields.personal.fathername && <div >
                <label class="text-gray-700 dark:text-gray-200">Father name<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.personal[0].fathername} onChange={(e)=> {const obj=jobFields;obj.personal[0].fathername=e.target.value; setJobFields({...jobFields,obj});}} class={`block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring`}></input>
              </div>}
              {jobFields.jobFields.personal.dob && <div >

                <label class="text-gray-700 dark:text-gray-200">Date of Birth<span style={{color:'red'}}> *</span> </label>
                <input required type="date" value={jobFields.personal[0].dob} onChange={(e)=> {if(e.target.value>today){const obj=jobFields;obj.personal[0].dob=today; setJobFields({...jobFields,obj});}else{const obj=jobFields;obj.personal[0].dob=e.target.value; setJobFields({...jobFields,obj});}}} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.personal.age && <div >
                <label class="text-gray-700 dark:text-gray-200">Age<span style={{color:'red'}}> *</span> </label>
                <input required type="number" min="0" step="1" value={jobFields.personal[0].age} onChange={(e)=> {if(e.target.value<=0){const obj=jobFields;obj.personal[0].age=0; setJobFields({...jobFields,obj});}else{const obj=jobFields;obj.personal[0].age=e.target.value; setJobFields({...jobFields,obj});}}} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}

              {jobFields.jobFields.personal.gender && <div >
                <label class="text-gray-700 dark:text-gray-200">Gender<span style={{color:'red'}}> *</span> </label>
                <select required onChange={(e)=> {const obj=jobFields;obj.personal[0].gender=e.target.value; setJobFields({...jobFields,obj});}} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                  <option value="" selected={jobFields.personal[0].gender===""}>Select Option</option>
                  <option value="Male" selected={jobFields.personal[0].gender==="Male"}>Male</option>
                  <option value="Female" selected={jobFields.personal[0].gender==="Female"}>Female</option>
                  <option value="Other" selected={jobFields.personal[0].gender==="Other"}>Other</option>
                </select>
              </div>}
              {jobFields.jobFields.personal.category && <div >
                <label class="text-gray-700 dark:text-gray-200">Category<span style={{color:'red'}}> *</span> </label>
                <select required onChange={(e)=> {const obj=jobFields;obj.personal[0].category=e.target.value; setJobFields({...jobFields,obj});}} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                  <option value="" selected={jobFields.personal[0].category===""} >Select Option</option>
                  <option value="General" selected={jobFields.personal[0].category==="General"} >General</option>
                  <option value="SC" selected={jobFields.personal[0].category==="SC"}>SC</option>
                  <option value="ST" selected={jobFields.personal[0].category==="ST"}>ST</option>
                  <option value="OBC" selected={jobFields.personal[0].category==="OBC"}>OBC</option>
                </select>
              </div>}
              {jobFields.jobFields.personal.disability && <div >
                <label class="text-gray-700 dark:text-gray-200">Disability (NA if none)<span style={{color:'red'}}> *</span></label>
                <input required type="text" value={jobFields.personal[0].disability} onChange={(e)=> {const obj=jobFields;obj.personal[0].disability=e.target.value; setJobFields({...jobFields,obj});}} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.personal.married && <div >
                <label class="text-gray-700 dark:text-gray-200">Married Status<span style={{color:'red'}}> *</span> </label>
                <select required onChange={(e)=> {const obj=jobFields;obj.personal[0].married=e.target.value; setJobFields({...jobFields,obj});}} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                  <option value="" selected={jobFields.personal[0].married===""}>Select Option</option>
                  <option value="Married" selected={jobFields.personal[0].married==="Married"}>Married</option>
                  <option value="Unmarried" selected={jobFields.personal[0].married==="Unmarried"}>Unmarried</option>
                  <option value="Divorced" selected={jobFields.personal[0].married==="Divorced"}>Divorced</option>
                </select>
              </div>}
              {jobFields.jobFields.personal.nationality && <div >
                <label class="text-gray-700 dark:text-gray-200">Nationality<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.personal[0].nationality} onChange={(e)=> {const obj=jobFields;obj.personal[0].nationality=e.target.value; setJobFields({...jobFields,obj});}} class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
            </div>
          </div>


          {checkComDetails() &&
            <div>
            <hr></hr>
            <div>
            <h6 style={{textDecoration:'underline'}}>Communication Details</h6>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
              {jobFields.jobFields.personal.communication_address && <div >
                <label class="text-gray-700 dark:text-gray-200"> Address<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.personal[0].communication_address} onChange={(e)=> {const obj=jobFields;obj.personal[0].communication_address=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.personal.communication_city && <div >
                <label class="text-gray-700 dark:text-gray-200">City<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.personal[0].communication_city} onChange={(e)=> {const obj=jobFields;obj.personal[0].communication_city=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.personal.communication_state && <div >
                <label class="text-gray-700 dark:text-gray-200">State<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.personal[0].communication_state} onChange={(e)=> {const obj=jobFields;obj.personal[0].communication_state=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.personal.communication_pincode && <div >
                <label class="text-gray-700 dark:text-gray-200">Pincode<span style={{color:'red'}}> *</span> </label>
                <input required type="number"  value={jobFields.personal[0].communication_pincode} onChange={(e)=> {if(e.target.value<0){const obj=jobFields;obj.personal[0].communication_pincode=0; setJobFields({...jobFields,obj});}else{const obj=jobFields;obj.personal[0].communication_pincode=e.target.value; setJobFields({...jobFields,obj});}}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.personal.communication_country && <div >
                <label class="text-gray-700 dark:text-gray-200">Country<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.personal[0].communication_country} onChange={(e)=> {const obj=jobFields;obj.personal[0].communication_country=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
            </div>
          </div>


          </div>}

          {checkPermDetails() &&
            <div>
              <hr></hr>
             <div >
            <h6 style={{textDecoration:'underline'}}>Permanent Details</h6>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
              {jobFields.jobFields.personal.permanent_address && <div >
                <label class="text-gray-700 dark:text-gray-200"> Address<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.personal[0].permanent_address} onChange={(e)=> {const obj=jobFields;obj.personal[0].permanent_address=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.personal.permanent_city && <div >
                <label class="text-gray-700 dark:text-gray-200">City<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.personal[0].permanent_city} onChange={(e)=> {const obj=jobFields;obj.personal[0].permanent_city=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.personal.permanent_state && <div >
                <label class="text-gray-700 dark:text-gray-200">State<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.personal[0].permanent_state} onChange={(e)=> {const obj=jobFields;obj.personal[0].permanent_state=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.personal.permanent_pincode && <div >
                <label class="text-gray-700 dark:text-gray-200">Pincode<span style={{color:'red'}}> *</span> </label>
                <input required type="number" value={jobFields.personal[0].permanent_pincode} onChange={(e)=> {if(e.target.value<0){const obj=jobFields;obj.personal[0].permanent_pincode=0; setJobFields({...jobFields,obj});}else{const obj=jobFields;obj.personal[0].permanent_pincode=e.target.value; setJobFields({...jobFields,obj});}}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.personal.permanent_country && <div >
                <label class="text-gray-700 dark:text-gray-200">Country<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.personal[0].permanent_country} onChange={(e)=> {const obj=jobFields;obj.personal[0].permanent_country=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
            </div>
          </div>


          </div>}

          {checkContactDetails() &&
            <div>
              <hr></hr>
            <div >
            <h6 style={{textDecoration:'underline'}}>Contact Details</h6>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
              {jobFields.jobFields.personal.mobile && <div >
                <label class="text-gray-700 dark:text-gray-200">Mobile No.<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.personal[0].mobile} onChange={(e)=> {const obj=jobFields;obj.personal[0].mobile=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.personal.altmobile && <div >
                <label class="text-gray-700 dark:text-gray-200">Alternate Mobile No.<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.personal[0].altmobile} onChange={(e)=> {const obj=jobFields;obj.personal[0].altmobile=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
            </div>
          </div>
          </div>}

        </div>

        {checkAcademicDetails() && <div class="max-w-5xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800" style={{marginTop:'40px'}}>
          <h6 style={{display:'inline-block'}}>ACADEMIC</h6>
          <p style={{display:'inline-block', fontSize:'0.8rem', marginTop:'0', marginBottom:'auto'}}>&nbsp;(<span style={{color:'red'}}>*</span> are compulsory fields)</p>
          {checkTenthDetails() && <div>
          <hr></hr>
          <div>
            <h6 style={{textDecoration:'underline'}}>10th details</h6>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
              {jobFields.jobFields.academic.board10 && <div >
                <label class="text-gray-700 dark:text-gray-200">10th board<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.academic[0].board10} onChange={(e)=> {const obj=jobFields;obj.academic[0].board10=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.percentageformat10 && <div >
                <label class="text-gray-700 dark:text-gray-200">Maximum Grade Attainable<span style={{color:'red'}}> *</span> </label>
                <input required type="number" value={jobFields.academic[0].percentageformat10} onChange={(e)=> {const obj=jobFields;obj.academic[0].percentageformat10=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.percentage10 && <div >
                <label class="text-gray-700 dark:text-gray-200">Grade Obtained<span style={{color:'red'}}> *</span> </label>
                <input required type="number" value={jobFields.academic[0].percentage10} onChange={(e)=> {if(Number(e.target.value)>Number(jobFields.academic[0].percentageformat10)){const obj=jobFields;obj.academic[0].percentage10=obj.academic[0].percentageformat10; setJobFields({...jobFields,obj});}else{const obj=jobFields;obj.academic[0].percentage10=e.target.value; setJobFields({...jobFields,obj});}}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.year10 && <div >
                <label class="text-gray-700 dark:text-gray-200">Year of completion<span style={{color:'red'}}> *</span> </label>
                <input required type="number" value={jobFields.academic[0].year10} onChange={(e)=> {const obj=jobFields;if(Number(e.target.value)>Number(yyyy)){obj.academic[0].year10=yyyy;}else{obj.academic[0].year10=e.target.value;} setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.remarks10 && <div >
                <label class="text-gray-700 dark:text-gray-200">Remarks<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.academic[0].remarks10} onChange={(e)=> {const obj=jobFields;obj.academic[0].remarks10=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.marksheet10 && <div >
                <label class="text-gray-700 dark:text-gray-200">Marksheet url<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.academic[0].marksheet10} onChange={(e)=> {const obj=jobFields;obj.academic[0].marksheet10=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                {tenthMarksheetError && <p class=" text-xs text-red-400">Must be of the form: http:// or https://</p>}
              </div>}
            </div>
          </div>
          </div>}


          {checkTwelfthDetails() && <div>
          <hr />

          <div>
            <h6 style={{textDecoration:'underline'}}>12th Details</h6>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
              {jobFields.jobFields.academic.board12 && <div >
                <label class="text-gray-700 dark:text-gray-200">12th board<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.academic[0].board12} onChange={(e)=> {const obj=jobFields;obj.academic[0].board12=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.percentageformat12 && <div >
                <label class="text-gray-700 dark:text-gray-200">Maximum Grade Attainable<span style={{color:'red'}}> *</span> </label>
                <input required type="number" value={jobFields.academic[0].percentageformat12} onChange={(e)=> {const obj=jobFields;obj.academic[0].percentageformat12=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.percentage12 && <div >
                <label class="text-gray-700 dark:text-gray-200">Grade Obtained<span style={{color:'red'}}> *</span> </label>
                <input required type="number" value={jobFields.academic[0].percentage12} onChange={(e)=> {if(Number(e.target.value)>Number(jobFields.academic[0].percentageformat12)){const obj=jobFields;obj.academic[0].percentage12=jobFields.academic[0].percentageformat12; setJobFields({...jobFields,obj});}else{const obj=jobFields;obj.academic[0].percentage12=e.target.value; setJobFields({...jobFields,obj});}}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.year12 && <div >
                <label class="text-gray-700 dark:text-gray-200">Year of completion<span style={{color:'red'}}> *</span> </label>
                <input required type="number" value={jobFields.academic[0].year12} onChange={(e)=> {const obj=jobFields;if(Number(e.target.value)>Number(yyyy)){obj.academic[0].year12=yyyy;}else{obj.academic[0].year12=e.target.value;} setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.remarks12 && <div >
                <label class="text-gray-700 dark:text-gray-200">Remarks<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.academic[0].remarks12} onChange={(e)=> {const obj=jobFields;obj.academic[0].remarks12=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.marksheet12 && <div >
                <label class="text-gray-700 dark:text-gray-200">Marksheet url<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.academic[0].marksheet12} onChange={(e)=> {const obj=jobFields;obj.academic[0].marksheet12=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                {twelfthMarksheetError && <p class=" text-xs text-red-400">Must be of the form: http:// or https://</p>}
              </div>}
            </div>
          </div>
          </div>}


          {checkBtechDetails() && <div>
          <hr />

          <div>
            <h6 style={{textDecoration:'underline'}}>Btech details</h6>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
              {jobFields.jobFields.academic.collegebtech && <div >
                <label class="text-gray-700 dark:text-gray-200">College<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.academic[0].collegebtech} onChange={(e)=> {const obj=jobFields;obj.academic[0].collegebtech=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.branchbtech && <div >
                <label class="text-gray-700 dark:text-gray-200">Branch/Major<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.academic[0].branchbtech} onChange={(e)=> {const obj=jobFields;obj.academic[0].branchbtech=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.percentageformatbtech && <div >
                <label class="text-gray-700 dark:text-gray-200">Maximum Grade Attainable<span style={{color:'red'}}> *</span> </label>
                <input required type="number" value={jobFields.academic[0].percentageformatbtech} onChange={(e)=> {const obj=jobFields;obj.academic[0].percentageformatbtech=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.percentagebtech && <div >
                <label class="text-gray-700 dark:text-gray-200">Grade Obtained<span style={{color:'red'}}> *</span> </label>
                <input required type="number" value={jobFields.academic[0].percentagebtech} onChange={(e)=> {const obj=jobFields;if(Number(e.target.value)>Number(jobFields.academic[0].percentageformatbtech)){obj.academic[0].percentagebtech=jobFields.academic[0].percentageformatbtech;}else{obj.academic[0].percentagebtech=e.target.value;} setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.yearbtech && <div >
                <label class="text-gray-700 dark:text-gray-200">Year of completion<span style={{color:'red'}}> *</span> </label>
                <input required type="number" value={jobFields.academic[0].yearbtech} onChange={(e)=> {const obj=jobFields;if(Number(e.target.value)>Number(yyyy)){obj.academic[0].yearbtech=yyyy;}else{obj.academic[0].yearbtech=e.target.value;} setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.remarksbtech && <div >
                <label class="text-gray-700 dark:text-gray-200">Remarks<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.academic[0].remarksbtech} onChange={(e)=> {const obj=jobFields;obj.academic[0].remarksbtech=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.marksheetbtechurl && <div >
                <label class="text-gray-700 dark:text-gray-200">Marksheet URL<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.academic[0].marksheetbtechurl} onChange={(e)=> {const obj=jobFields;obj.academic[0].marksheetbtechurl=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                {btechMarksheetError && <p class=" text-xs text-red-400">Must be of the form: http:// or https://</p>}
              </div>}
            </div>
          </div>
          </div>}

          {checkMtechDetails() && <div>
          <hr />

          <div>
            <h6 style={{textDecoration:'underline'}}>Mtech details</h6>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
              {jobFields.jobFields.academic.collegemtech && <div >
                <label class="text-gray-700 dark:text-gray-200">College<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.academic[0].collegemtech} onChange={(e)=> {const obj=jobFields;obj.academic[0].collegemtech=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.branchmtech && <div >
                <label class="text-gray-700 dark:text-gray-200">Branch/Major<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.academic[0].branchmtech} onChange={(e)=> {const obj=jobFields;obj.academic[0].branchmtech=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.percentageformatmtech && <div >
                <label class="text-gray-700 dark:text-gray-200">Maximum Grade Attainable<span style={{color:'red'}}> *</span> </label>
                <input required type="number" value={jobFields.academic[0].percentageformatmtech} onChange={(e)=> {const obj=jobFields;obj.academic[0].percentageformatmtech=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.percentagemtech && <div >
                <label class="text-gray-700 dark:text-gray-200">Grade Obtained<span style={{color:'red'}}> *</span> </label>
                <input required type="number" value={jobFields.academic[0].percentagemtech} onChange={(e)=> {const obj=jobFields;if(Number(e.target.value)>Number(jobFields.academic[0].percentageformatmtech)){obj.academic[0].percentagemtech=jobFields.academic[0].percentageformatmtech;}else{obj.academic[0].percentagemtech=e.target.value;} setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.yearmtech && <div >
                <label class="text-gray-700 dark:text-gray-200">Year of completion<span style={{color:'red'}}> *</span> </label>
                <input required type="number" value={jobFields.academic[0].yearmtech} onChange={(e)=> {const obj=jobFields;if(Number(e.target.value)>Number(yyyy)){obj.academic[0].yearmtech=yyyy;}else{obj.academic[0].yearmtech=e.target.value;} setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.remarksmtech && <div >
                <label class="text-gray-700 dark:text-gray-200">Remarks<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.academic[0].remarksmtech} onChange={(e)=> {const obj=jobFields;obj.academic[0].remarksmtech=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
              {jobFields.jobFields.academic.marksheetmtechurl && <div >
                <label class="text-gray-700 dark:text-gray-200">Marksheet URL<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.academic[0].marksheetmtechurl} onChange={(e)=> {const obj=jobFields;obj.academic[0].marksheetmtechurl=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                {mtechMarksheetError && <p class=" text-xs text-red-400">Must be of the form: http:// or https://</p>}
              </div>}
            </div>
          </div>
          </div>}


          {checkPhdDetails() && <div>
          <hr />

          <div>
            <h6 style={{textDecoration:'underline'}}>Phd details</h6>
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
              {jobFields.jobFields.academic.isphdcompleted && <div >
                <label class="text-gray-700 dark:text-gray-200">Is Phd Completed?<span style={{color:'red'}}> *</span> </label>
                <select required onChange={(e)=> {const obj=jobFields.academic[0].isphdcompleted=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring">
                  <option value="-" selected={jobFields.academic[0].isphdcompleted==="-"}>Select Option</option>
                  <option value="Yes" selected={jobFields.academic[0].isphdcompleted==="Yes"}>Yes</option>
                  <option value="No" selected={jobFields.academic[0].isphdcompleted==="No"}>No</option>
                </select>
              </div>}
              {jobFields.jobFields.academic.phdremarks && <div >
                <label class="text-gray-700 dark:text-gray-200">Remarks<span style={{color:'red'}}> *</span> </label>
                <input required type="text" value={jobFields.academic[0].phdremarks} onChange={(e)=> {const obj=jobFields;obj.academic[0].phdremarks=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
              </div>}
            </div>
          </div>
          </div>}

        </div>}

        {checkExperienceDetails() && <div class="max-w-5xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800" style={{marginTop:'40px'}}>
          <h6 style={{display:'inline-block'}}>EXPERIENCE</h6>
          <p style={{display:'inline-block', fontSize:'0.8rem', marginTop:'0', marginBottom:'auto'}}>&nbsp;(<span style={{color:'red'}}>*</span> are compulsory fields)</p>
          <hr></hr>
            {jobFields.experience.map((exp,index) => (
              <div>
                <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
                  {jobFields.jobFields.experience.organization && <div>
                    <label class="text-gray-700 dark:text-gray-200">Company Name<span style={{color:'red'}}> *</span> </label>
                    <input required type="text" value={exp.organization} onChange={(e)=> {const obj=jobFields;obj.experience[index].organization=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                  </div>}
                  {jobFields.jobFields.experience.profile && <div>
                    <label class="text-gray-700 dark:text-gray-200">Job Profile<span style={{color:'red'}}> *</span> </label>
                    <input required type="text" value={exp.profile} onChange={(e)=> {const obj=jobFields;obj.experience[index].profile=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                  </div>}
                  {jobFields.jobFields.experience.location && <div>
                    <label class="text-gray-700 dark:text-gray-200">Location<span style={{color:'red'}}> *</span> </label>
                    <input required type="text" value={exp.location} onChange={(e)=> {const obj=jobFields;obj.experience[index].location=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                  </div>}
                  {jobFields.jobFields.experience.startdate && <div >
                    <label class="text-gray-700 dark:text-gray-200">Start Date<span style={{color:'red'}}> *</span> </label>
                    <input required type="date" value={exp.startdate} onChange={(e)=> {const obj=jobFields;obj.experience[index].startdate=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                  </div>}
                  {jobFields.jobFields.experience.enddate && <div >
                    <label class="text-gray-700 dark:text-gray-200">End date<span style={{color:'red'}}> *</span> </label>
                    <input required type="date" value={exp.enddate} onChange={(e)=> {const obj=jobFields;if(e.target.value<exp.startdate){obj.experience[index].enddate=exp.startdate;}else{obj.experience[index].enddate=e.target.value;} setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                  </div>}
                  {jobFields.jobFields.experience.description && <div>
                    <label class="text-gray-700 dark:text-gray-200">Description<span style={{color:'red'}}> *</span> </label>
                    <input required type="text" value={exp.description} onChange={(e)=> {const obj=jobFields;obj.experience[index].description=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                  </div>}
                </div>
                <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
                <hr></hr>
                {index+1===jobFields.experience.length? <Button variant="dark" size="sm" style={{marginRight:'50px',marginLeft:'50px'}} onClick={addExperience}>ADD</Button>:<Button variant="dark" size="sm" style={{marginRight:'50px',marginLeft:'50px'}} onClick={()=>deleteExperience(index+1)}>REMOVE</Button>}
                <hr></hr>
                </div>
              </div>
            ))}
        </div>}

        {checkPublicationDetails() && <div class="max-w-5xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800" style={{marginTop:'40px'}}>
          <h6 style={{display:'inline-block'}}>PUBLICATION</h6>
          <p style={{display:'inline-block', fontSize:'0.8rem', marginTop:'0', marginBottom:'auto'}}>&nbsp;(<span style={{color:'red'}}>*</span> are compulsory fields)</p>
          <hr></hr>
          {jobFields.publication.map((pub,index)=> (
            <div>
              <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
                {jobFields.jobFields.publication.title && <div>
                  <label class="text-gray-700 dark:text-gray-200">Title<span style={{color:'red'}}> *</span> </label>
                  <input required type="text" value={pub.title} onChange={(e)=> {const obj=jobFields;obj.publication[index].title=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.publication.abstract && <div >
                  <label class="text-gray-700 dark:text-gray-200">Abstract<span style={{color:'red'}}> *</span> </label>
                  <input required type="text" value={pub.abstract} onChange={(e)=> {const obj=jobFields;obj.publication[index].abstract=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.publication.journal && <div >
                  <label class="text-gray-700 dark:text-gray-200">Journal<span style={{color:'red'}}> *</span> </label>
                  <input required type="text" value={pub.journal} onChange={(e)=> {const obj=jobFields;obj.publication[index].journal=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.publication.volume && <div >
                  <label class="text-gray-700 dark:text-gray-200">Volume<span style={{color:'red'}}> *</span> </label>
                  <input required type="text" value={pub.volume} onChange={(e)=> {const obj=jobFields;obj.publication[index].volume=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.publication.pages && <div >
                  <label class="text-gray-700 dark:text-gray-200">Pages<span style={{color:'red'}}> *</span></label>
                  <input required type="number" min="0" value={pub.pages} onChange={(e)=> {const obj=jobFields;obj.publication[index].pages=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.publication.publisher && <div >
                  <label class="text-gray-700 dark:text-gray-200">Publisher<span style={{color:'red'}}> *</span></label>
                  <input required type="text"  value={pub.publisher} onChange={(e)=> {const obj=jobFields;obj.publication[index].publisher=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.publication.doi && <div >
                  <label class="text-gray-700 dark:text-gray-200">Digital Object Identifier<span style={{color:'red'}}> *</span> </label>
                  <input required type="text"  value={pub.doi} onChange={(e)=> {const obj=jobFields;obj.publication[index].doi=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.publication.url && <div >
                  <label class="text-gray-700 dark:text-gray-200">URL<span style={{color:'red'}}> *</span></label>
                  <input required type="text"  value={pub.url} onChange={(e)=> {const obj=jobFields;obj.publication[index].url=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                  {publicationError[index] && <p class=" text-xs text-red-400">Must be of the form: http:// or https://</p>}
                </div>}
              </div>
              <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
              <hr></hr>
              {index+1===jobFields.publication.length? <Button variant="dark" size="sm" style={{marginRight:'50px',marginLeft:'50px'}} onClick={addPublication}>ADD</Button>:<Button variant="dark" size="sm" style={{marginRight:'50px',marginLeft:'50px'}} onClick={()=>deletePublication(index+1)}>REMOVE</Button>}
              <hr></hr>
              </div>
            </div>
          ))}
        </div>}

        {checkPorDetails() && <div class="max-w-5xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800" style={{marginTop:'40px'}}>
          <h6 style={{display:'inline-block'}}>POSITION OF RESPONSIBILITY</h6>
          <p style={{display:'inline-block', fontSize:'0.8rem', marginTop:'0', marginBottom:'auto'}}>&nbsp;(<span style={{color:'red'}}>*</span> are compulsory fields)</p>
          <hr></hr>
          {jobFields.por.map((p,index)=> (
            <div>
              <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
                {jobFields.jobFields.por.organization && <div >
                  <label class="text-gray-700 dark:text-gray-200">Organization<span style={{color:'red'}}> *</span> </label>
                  <input required type="text" value={p.organization} onChange={(e)=> {const obj=jobFields;obj.por[index].organization=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.por.title && <div >
                  <label class="text-gray-700 dark:text-gray-200">Title<span style={{color:'red'}}> *</span> </label>
                  <input required type="text" value={p.title} onChange={(e)=> {const obj=jobFields;obj.por[index].title=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.por.location && <div >
                  <label class="text-gray-700 dark:text-gray-200">Location<span style={{color:'red'}}> *</span> </label>
                  <input required type="text" value={p.location} onChange={(e)=> {const obj=jobFields;obj.por[index].location=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.por.startdate && <div >
                  <label class="text-gray-700 dark:text-gray-200">Start Date<span style={{color:'red'}}> *</span> </label>
                  <input required type="date" value={p.startdate} onChange={(e)=> {const obj=jobFields;obj.por[index].startdate=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.por.enddate && <div >
                  <label class="text-gray-700 dark:text-gray-200">End date<span style={{color:'red'}}> *</span> </label>
                  <input required type="date" value={p.enddate} onChange={(e)=> {const obj=jobFields;if(e.target.value<p.startdate){obj.por[index].enddate=p.startdate;}else{obj.por[index].enddate=e.target.value;} setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.por.description && <div >
                  <label class="text-gray-700 dark:text-gray-200">Description<span style={{color:'red'}}> *</span> </label>
                  <input required type="text" value={p.description} onChange={(e)=> {const obj=jobFields;obj.por[index].description=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
              </div>
              <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3">
              <hr></hr>
              {index+1===jobFields.por.length? <Button variant="dark" size="sm" style={{marginRight:'50px',marginLeft:'50px'}} onClick={addPor}>ADD</Button>: <Button variant="dark" size="sm" style={{marginRight:'50px',marginLeft:'50px'}} onClick={()=> deletePor(index+1)}>REMOVE</Button>}
              <hr></hr>
              </div>
            </div>
          ))}
        </div>}

        {checkReferenceDetails() && <div class="max-w-5xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800" style={{marginTop:'40px'}}>
          <h6 style={{display:'inline-block'}}>REFERENCE</h6>
          <p style={{display:'inline-block', fontSize:'0.8rem', marginTop:'0', marginBottom:'auto'}}>&nbsp;(<span style={{color:'red'}}>*</span> are compulsory fields)</p>
          <hr></hr>
          {jobFields.reference.map((ref,index)=> (
            <div>
              <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
                {jobFields.jobFields.reference.name && <div >
                  <label class="text-gray-700 dark:text-gray-200">Name<span style={{color:'red'}}> *</span> </label>
                  <input required type="text" value={ref.name} onChange={(e)=> {const obj=jobFields;obj.reference[index].name=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.reference.title && <div >
                  <label class="text-gray-700 dark:text-gray-200">Title<span style={{color:'red'}}> *</span> </label>
                  <input required type="text" value={ref.title} onChange={(e)=> {const obj=jobFields;obj.reference[index].title=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.reference.affliliation && <div >
                  <label class="text-gray-700 dark:text-gray-200">Affliliation<span style={{color:'red'}}> *</span> </label>
                  <input required type="text" value={ref.affliliation} onChange={(e)=> {const obj=jobFields;obj.reference[index].affliliation=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.reference.referenceemail && <div >
                  <label class="text-gray-700 dark:text-gray-200">Reference Email<span style={{color:'red'}}> *</span> </label>
                  <input required type="email" value={ref.referenceemail} onChange={(e)=> {const obj=jobFields;obj.reference[index].referenceemail=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                  {referenceError[index] && <p class=" text-xs text-red-400">Must be of the form: a@b.c</p>}
                </div>}
                {jobFields.jobFields.reference.referencephone && <div>
                  <label class="text-gray-700 dark:text-gray-200">Reference phone<span style={{color:'red'}}> *</span> </label>
                  <input required type="text" value={ref.referencephone} onChange={(e)=> {const obj=jobFields;obj.reference[index].referencephone=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.reference.relationship && <div >
                  <label class="text-gray-700 dark:text-gray-200">Relationship<span style={{color:'red'}}> *</span> </label>
                  <input required type="text" value={ref.relationship} onChange={(e)=> {const obj=jobFields;obj.reference[index].relationship=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}
                {jobFields.jobFields.reference.description && <div >
                  <label class="text-gray-700 dark:text-gray-200">Description<span style={{color:'red'}}> *</span> </label>
                  <input required type="text" value={ref.description} onChange={(e)=> {const obj=jobFields;obj.reference[index].description=e.target.value; setJobFields({...jobFields,obj});}} className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></input>
                </div>}

              </div>
              <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 ">
              <hr></hr>
              {index+1===jobFields.reference.length? <Button variant="dark" size="sm" style={{marginRight:'50px',marginLeft:'50px'}} onClick={addReference}>ADD</Button>: <Button variant="dark" size="sm" style={{marginRight:'50px',marginLeft:'50px'}} onClick={()=> deleteReference(index+1)}>REMOVE</Button>}
              <hr></hr>
              </div>
            </div>
          ))}
        </div>}


        <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3" >
        <div></div>
        <Button variant="dark" size="lg" style={{marginTop:'30px'}} onClick={checkFields}>Submit</Button>
        <div></div>
        </div>




      </form>}
    </section>


    </>

  );
}

export default ApplicationForm;
