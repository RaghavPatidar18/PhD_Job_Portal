import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import JobApplicantCard from "./JobApplicantCard";
import {useParams} from "react-router-dom";
import { useNavigate , useLocation } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";
import {CSVLink} from 'react-csv';

function JobApplicants({ user, type }) {

  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [personalData, setPersonalData] = useState([]);
  const [searchString,setSearchString]=useState("");
  const [statusFilter,setStatusFilter]=useState(false);
  const [searchPending,setSearchPending]=useState(false);
  const [searchAccepted,setSearchAccepted]=useState(false);
  const [searchRejected,setSearchRejected]=useState(false);
  const [searchWithdrew,setSearchWithdrew]=useState(false);
  const [jobTitle,setJobTitle]=useState("");

  const [qualificationFilter,setQualificationFilter]=useState(false);
  const [tenthMax,setTenthMax]=useState("select");
  const [tenthMin,setTenthMin]=useState(0);
  const [twelfthMax,setTwelfthMax]=useState("select");
  const [twelfthMin,setTwelfthMin]=useState(0);
  const [btechMax,setBtechMax]=useState("select");
  const [btechMin,setBtechMin]=useState(0);
  const [mtechMax,setMtechMax]=useState("select");
  const [mtechMin,setMtechMin]=useState(0);
  const [phdQualificationFilter,setPhdQualificationFilter]=useState("select");

  const url = `/jobApplicants/${id}`;
  let count = 1;

  const history = useNavigate();

  useEffect(() => {
    if (type !== "institute") {
      history("*");
    } else {
      axios.get(url)
        .then((response) => {
          if (response.data.status === 200) {

            const defaultVal = "N/A"; // set your default value here
            console.log(response.data.applicantArray);
            var allApplicantDetails=[];
            var updatedData=[["PERSONAL"],["ACADEMIC"],["EXPERIENCE"],["PUBLICATION"],["POR"],["REFERENCE"]];
            response.data.applicantArray.map((applicant)=>{
              var applicant_details=[];
              const personalDataArray=applicant.student.personal;
              var personal=[];
              personalDataArray.map((perData)=>{
                var perArray=Object.values(perData);
                perArray.unshift("");
                personal=[...personal,...perArray];
              })

              applicant_details.push(personal);

              const academicDataArray=applicant.student.academic;
              var academic=[];
              academicDataArray.map((acadData)=>{
                var acadArray=Object.values(acadData);
                acadArray.unshift("");
                academic=[...academic,...acadArray];
              })

              applicant_details.push(academic);

              const experienceDataArray=applicant.student.experience;
              var experience=[];
              experienceDataArray.map((expData)=>{
                var expArray=Object.values(expData);
                expArray.unshift("");
                experience=[...experience,...expArray];
              })

              applicant_details.push(experience);

              const publicationDataArray=applicant.student.publication;
              var publication=[];
              publicationDataArray.map((pubData)=>{
                var pubArray=Object.values(pubData);
                pubArray.unshift("");
                publication=[...publication,...pubArray];
              })

              applicant_details.push(publication);

              const porDataArray=applicant.student.por;
              var por=[];
              porDataArray.map((pData)=>{
                var pArray=Object.values(pData);
                pArray.unshift("");
                por=[...por,...pArray];
              })

              applicant_details.push(por);

              const referenceDataArray=applicant.student.reference;
              var reference=[];
              referenceDataArray.map((refData)=>{
                var refArray=Object.values(refData);
                refArray.unshift("");
                reference=[...reference,...refArray];
              })

              applicant_details.push(reference);
              allApplicantDetails.push(applicant_details);
            });

            allApplicantDetails.map((k,index)=>{
              updatedData.splice(index+1,0,k[0]);
              updatedData.splice(index+1+index+2,0,k[1]);
              updatedData.splice(index+1+index+2+index+2,0,k[2]);
              updatedData.splice(index+1+index+2+index+2+index+2,0,k[3]);
              updatedData.splice(index+1+index+2+index+2+index+2+index+2,0,k[4]);
              updatedData.push(k[5]);
            })

            console.log(updatedData);


            // const updatedData = response.data.applicantArray.map((applicant) => {
            //
            //   const personalDataArray=applicant.student.personal;
            //   var maxPersonalDataLength=0;
            //   var personalDataFields;
            //
            //   personalDataArray.map((personalData)=>{
            //     maxPersonalDataLength = Object.keys(personalData).length>maxPersonalDataLength? Object.keys(personalData).length:maxPersonalDataLength;
            //   });
            //   var flag=0;
            //
            //   personalDataArray.map((personalData)=>{
            //     if(flag===0){
            //       if(Object.keys(personalData).length===maxPersonalLength){
            //         flag=1;
            //         personalDataFields=Object.keys(personalData);
            //       }
            //     }
            //   });
            //   personalDataFields.unshift("PERSONAL");
            //
            //


              //const studentDataPersonal=applicant.student.personal.map((per)=>{Object.values(per).map(val => val ?? defaultVal)});
              //const studentDataPersonal = Object.values(applicant.student.personal).map(val => val ?? defaultVal);
              //const studentDataExperience = Object.values(applicant.student.experience).map(val => val ?? defaultVal);
              //const newData = [...Object.values(applicant), ...studentDataPersonal, ...studentDataExperience];
              //return newData;
            //});
            setPersonalData(updatedData);
            setApplicants(response.data.applicantArray);
            setJobTitle(response.data.jobTitle);
            console.log(response.data.applicantArray);
          }

        })
        .catch((err) => console.log(err));
    }
  }, []);

  const [showAccept,setShowAccept]=useState(false);
  const [showReject,setShowReject]=useState(false);
  const [selectAll,setSelectAll]=useState(false);
  const [acceptPressed,setAcceptPressed]=useState(false);
  const [rejectPressed,setRejectPressed]=useState(false);

  const handleShowAccept=()=>setShowAccept(true);
  const handleShowReject=()=>setShowReject(true);
  const handleCloseAccept=()=>setShowAccept(false);
  const handleCloseReject=()=>setShowReject(false);

  const handleMultipleAccept = () =>{
    setAcceptPressed(true);
    handleCloseAccept();
  }

  const handleMultipleReject = () =>{
    setRejectPressed(true);
    handleCloseReject();
  }


  const csvLink = {
    filename: "file.csv",
    data: personalData
  }

  //console.log(applicants);
  return(
    <>
    <Modal show={showAccept} onHide={handleCloseAccept}>
    <div class="relative block overflow-hidden text-left align-middle transform bg-white  sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6" style={{margin:'auto', marginTop:'10px', marginBottom:'10px'}}>
        <div class="text-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                Accept Applicants
            </h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400">
                Are you sure you wish to <span style={{fontWeight:'bold'}}>accept</span> all the selected applicants ?
            </p>
        </div>
        <div class="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
            <button onClick={handleCloseAccept} class="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                Cancel
            </button>

            <button onClick={handleMultipleAccept} class="px-4 sm:mx-2 w-full py-2.5 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-600 rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                Accept
            </button>
        </div>
    </div>
    </Modal>



    <Modal show={showReject} onHide={handleCloseReject} >
    <div class="relative block overflow-hidden text-left align-middle transform bg-white  sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6" style={{margin:'auto', marginTop:'10px', marginBottom:'10px'}}>
        <div class="text-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                Reject Applicants
            </h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400">
                Are you sure you wish to <span style={{fontWeight:'bold'}}>reject</span> all the selected applicants ?
            </p>
        </div>
        <div class="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
            <button onClick={handleCloseReject} class="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                Cancel
            </button>

            <button onClick={handleMultipleReject} class="px-4 sm:mx-2 w-full py-2.5 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                Reject
            </button>
        </div>
    </div>
    </Modal>

    {statusFilter && <div style={{display:'block',position:'fixed',zIndex:'1000', top:'0', bottom:'0', left:'0', right:'0', backgroundColor:"rgba(1,1,1,0.5)"}}>
    <div style={{display:'block',position:'fixed', left:'50%',top:'50%', transform:'translate(-50%,-50%)'}}>
      <div class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle">
        <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
          Status Filter
        </h3>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Search applicants for the job based on their current application status.
        </p>

        <div class="mt-4" >
          <label for="emails-list" class="text-sm text-gray-700 dark:text-gray-200" style={{marginLeft:'5px'}}>
            Status
          </label>
          <div className="grid grid-cols-2 mt-3">
            <button onClick={()=> setSearchPending(!searchPending)}className={`text-sm font-normal text-indigo-500 inline-flex items-center px-3 rounded-full gap-x-2 dark:bg-gray-800 ${searchPending? "bg-indigo-300/60":"bg-indigo-100/60"} hover:bg-indigo-200/60`} style={{margin:'5px',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>Pending</button>
            <button onClick={()=> setSearchAccepted(!searchAccepted)}className={`text-sm font-normal text-emerald-500 inline-flex items-center px-3 rounded-full gap-x-2 dark:bg-gray-800 ${searchAccepted? "bg-emerald-300/60":"bg-emerald-100/60"} hover:bg-emerald-200/60`} style={{margin:'5px',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>Accepted</button>
            <button onClick={()=> setSearchRejected(!searchRejected)} className={`text-sm font-normal text-red-500 inline-flex items-center px-3 rounded-full gap-x-2 dark:bg-gray-800  ${searchRejected? "bg-red-300/60":"bg-red-100/60"} hover:bg-red-200/60`} style={{margin:'5px',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>Rejected</button>
            <button onClick={()=> setSearchWithdrew(!searchWithdrew)}className={`text-sm font-normal text-gray-500 inline-flex items-center px-3 rounded-full gap-x-2 dark:bg-gray-800  ${searchWithdrew? "bg-gray-300":"bg-gray-100"} hover:bg-gray-200`} style={{margin:'5px',paddingTop:'12px',paddingBottom:'12px',textTransform:'none',letterSpacing:'initial'}}>Withdrew</button>
          </div>
          <div class="mt-4 sm:flex sm:items-center sm:-mx-2">
            <button onClick={()=> {setSearchPending(false); setSearchAccepted(false); setSearchRejected(false); setSearchWithdrew(false); }}type="button" class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
              Clear
            </button>

            <button onClick={()=> {setStatusFilter(false);}}type="button" class="w-full px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>}


    {qualificationFilter && <div style={{display:'block',position:'fixed',zIndex:'1000', top:'0', bottom:'0', left:'0', right:'0', backgroundColor:"rgba(1,1,1,0.5)", overfloe:'scroll'}} class="block">
    <div style={{display:'block',position:'fixed', left:'50%',top:'50%', transform:'translate(-50%,-50%)'}}>
      <div class="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6 sm:align-middle">
        <h3 class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white" id="modal-title">
          Qualification Filter
        </h3>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Search applicants for the job based on their academic qualifications.
        </p>

        <div class="mt-4" >
          <label for="emails-list" class="text-sm text-gray-700 dark:text-gray-200" style={{marginLeft:'5px'}}>
            Qualification
          </label>
          <label class="block mt-3 text-sm text-gray-700 dark:text-gray-200" for="email" style={{alignItems:'center'}}>
            10th qualifications:
          </label>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <label class="block mt-2 text-sm text-gray-700 dark:text-gray-200" for="email">
              Max Grade
              <select style={{marginLeft:'0'}} onChange={(e)=> {setTenthMax(e.target.value);}}class="block w-full px-2 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" >
                <option value="select" selected={tenthMax==="select"}>Select</option>
                <option value="5 GPA" selected={tenthMax==="5 GPA"}>5 GPA</option>
                <option value="10 GPA" selected={tenthMax==="10 GPA"}>10 GPA</option>
                <option value="100%" selected={tenthMax==="100%"}>100%</option>
              </select>
            </label>
            <label class="block mt-2 text-sm text-gray-700 dark:text-gray-200" for="email">
              Min Grade
              <input value={tenthMin} onChange={(e)=> {console.log(tenthMin);if(tenthMax==="select"){console.log("am i here");setTenthMin(0);}else if(tenthMax==="5 GPA"){Number(e.target.value)>5? setTenthMin(5):setTenthMin(Number(e.target.value));}else if(tenthMax==="10 GPA"){Number(e.target.value)>10? setTenthMin(10):setTenthMin(Number(e.target.value));}else if(tenthMax==="100%"){Number(e.target.value)>100? setTenthMin(100):setTenthMin(Number(e.target.value));}}}type="number" name="email" id="email" class="block w-full px-2 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
            </label>
          </div>
          <label class="block mt-3 text-sm text-gray-700 dark:text-gray-200" for="email" style={{alignItems:'center'}}>
            12th qualifications:
          </label>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <label class="block mt-2 text-sm text-gray-700 dark:text-gray-200" for="email">
              Max Grade
              <select style={{marginLeft:'0'}} onChange={(e)=> {setTwelfthMax(e.target.value)}}class="block w-full px-2 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" >
                <option value="select" selected={twelfthMax==="select"}>Select</option>
                <option value="5 GPA" selected={twelfthMax==="5 GPA"}>5 GPA</option>
                <option value="10 GPA" selected={twelfthMax==="10 GPA"}>10 GPA</option>
                <option value="100%" selected={twelfthMax==="100%"}>100%</option>
              </select>
            </label>
            <label class="block mt-2 text-sm text-gray-700 dark:text-gray-200" for="email">
              Min Grade
              <input type="number" value={twelfthMin} onChange={(e)=> {console.log(twelfthMin);if(twelfthMax==="select"){console.log("am i here");setTwelfthMin(0);}else if(twelfthMax==="5 GPA"){Number(e.target.value)>5? setTwelfthMin(5):setTwelfthMin(Number(e.target.value));}else if(twelfthMax==="10 GPA"){Number(e.target.value)>10? setTwelfthMin(10):setTwelfthMin(Number(e.target.value));}else if(twelfthMax==="100%"){Number(e.target.value)>100? setTwelfthMin(100):setTwelfthMin(Number(e.target.value));}}} name="email" id="email" placeholder="Min Grade" class="block w-full px-2 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
            </label>
          </div>
          <label class="block mt-3 text-sm text-gray-700 dark:text-gray-200" for="email" style={{alignItems:'center'}}>
            Btech qualifications:
          </label>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            <label class="block mt-2 text-sm text-gray-700 dark:text-gray-200" for="email">
              Max Grade
              <select style={{marginLeft:'0'}} onChange={(e)=> {setBtechMax(e.target.value);}}class="block w-full px-2 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" >
                <option value="select" selected={btechMax==="select"}>Select</option>
                <option value="5 GPA" selected={btechMax==="5 GPA"}>5 GPA</option>
                <option value="10 GPA" selected={btechMax==="10 GPA"}>10 GPA</option>
                <option value="100%" selected={btechMax==="100%"}>100%</option>
              </select>
            </label>
            <label class="block mt-2 text-sm text-gray-700 dark:text-gray-200" for="email">
              Min Grade
              <input type="number" value={btechMin} onChange={(e)=> {console.log(btechMin);if(btechMax==="select"){console.log("am i here");setBtechMin(0);}else if(btechMax==="5 GPA"){Number(e.target.value)>5? setBtechMin(5):setBtechMin(Number(e.target.value));}else if(btechMax==="10 GPA"){Number(e.target.value)>10? setBtechMin(10):setBtechMin(Number(e.target.value));}else if(btechMax==="100%"){Number(e.target.value)>100? setBtechMin(100):setBtechMin(Number(e.target.value));}}}name="email" id="email" placeholder="Min Grade" class="block w-full px-2 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
            </label>
          </div>
          <label class="block mt-3 text-sm text-gray-700 dark:text-gray-200" for="email" style={{alignItems:'center'}}>
            Mtech qualifications:
          </label>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            <label class="block mt-2 text-sm text-gray-700 dark:text-gray-200" for="email">
              Max Grade
              <select style={{marginLeft:'0'}} onChange={(e)=> {setMtechMax(e.target.value);}}class="block w-full px-2 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" >
                <option value="select" selected={mtechMax==="select"}>Select</option>
                <option value="5 GPA" selected={mtechMax==="5 GPA"}>5 GPA</option>
                <option value="10 GPA" selected={mtechMax==="10 GPA"}>10 GPA</option>
                <option value="100%" selected={mtechMax==="100%"}>100%</option>
              </select>
            </label>
            <label class="block mt-2 text-sm text-gray-700 dark:text-gray-200" for="email">
              Min Grade
              <input type="number" value={mtechMin} onChange={(e)=> {console.log(mtechMin);if(mtechMax==="select"){console.log("am i here");setMtechMin(0);}else if(mtechMax==="5 GPA"){Number(e.target.value)>5? setMtechMin(5):setMtechMin(Number(e.target.value));}else if(mtechMax==="10 GPA"){Number(e.target.value)>10? setMtechMin(10):setMtechMin(Number(e.target.value));}else if(mtechMax==="100%"){Number(e.target.value)>100? setMtechMin(100):setMtechMin(Number(e.target.value));}}}name="email" id="email" placeholder="Min Grade" class="block w-full px-2 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" />
            </label>
          </div>
          <label class="block mt-3 text-sm text-gray-700 dark:text-gray-200" for="email" style={{alignItems:'center'}}>
            Phd qualifications:
          </label>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

            <label class="block mt-2 text-sm text-gray-700 dark:text-gray-200" for="email">
              Phd Status
              <select style={{marginLeft:'0'}} onChange={(e)=> {setPhdQualificationFilter(e.target.value);}}type="email" name="email" id="email" placeholder="user@email.xyz" class="block w-full px-2 py-2 text-sm text-gray-700 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300" >
                <option value="select" selected={phdQualificationFilter==="select"}>Select</option>
                <option value="yes" selected={phdQualificationFilter==="yes"}>Yes</option>
                <option value="no" selected={phdQualificationFilter==="no"}>No</option>
              </select>
            </label>
          </div>


          <div class="mt-4 sm:flex sm:items-center sm:-mx-2">
            <button onClick={()=> {setTenthMax("select"); setTenthMin(0); setTwelfthMax("select"); setTwelfthMin(0); setBtechMax("select"); setBtechMin(0); setMtechMax("select"); setMtechMin(0); setPhdQualificationFilter("select");}}type="button" class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
              Clear
            </button>

            <button onClick={()=> {setQualificationFilter(false);}}type="button" class="w-full px-4 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>}


    <div style={{marginTop:'50px'}}>


    <section className="container px-4 py-4 mx-auto" style={{boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)"}}>
      <h2 className="text-lg font-medium text-gray-800 dark:text-white" style={{marginBottom:'0',textTransform:'none',letterSpacing:'normal',fontWeight:'bold', textAlign:'center'}}>{jobTitle.toUpperCase()}</h2>
      <div className="flex items-center gap-x-3" style={{width:'100%'}}>
        <h2 className="text-lg font-medium text-gray-800 dark:text-white" style={{marginBottom:'0',textTransform:'none',letterSpacing:'normal',fontWeight:'bold'}}>Job Applicants</h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400" style={{paddingRight:'12px',paddingLeft:'12px',fontWeight:'normal'}}>{applicants.length} applicants</span>
      </div>

      <div class="mt-6 md:flex md:items-center md:justify-between">
      <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
          <button onClick={()=> setStatusFilter(true)} class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Status Filter
          </button>

          <button onClick={()=> setQualificationFilter(true)}class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 sm:text-sm dark:hover:bg-gray-800 dark:text-gray-300 hover:bg-gray-100">
              Qualification Filter
          </button>
      </div>


        <div class="relative flex items-center md:mt-0" style={{margin:'auto', marginRight:'0'}}>
          <span class="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>

          <input  type="text" value={searchString} onChange={(e)=> setSearchString(e.target.value)} style={{paddingTop:'6px',paddingBottom:'6px', paddingLeft:'44px',paddingRight:'20px'}} placeholder="Search by name or email" class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
        </div>
      </div>



      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-x-3">
                        <input type="checkbox" onClick={()=>setSelectAll(!selectAll)} checked={selectAll===true} className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                        <span>Sr. no.</span>
                      </div>
                    </th>

                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Name</th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Email</th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Application Date</th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"><CSVLink {...csvLink}>Download All</CSVLink></th>


                    <th scope="col" className="relative py-3.5 px-4">
                    <div className="flex items-center gap-x-12">
                        <button onClick={handleShowAccept} className="text-gray-500 transition-colors duration-200 dark:hover:text-emerald-500 dark:text-gray-300 hover:text-emerald-500 focus:outline-none">
                          <div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 dark:bg-gray-800">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 3L4.5 8.5L2 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </div>
                        </button>
                        <button onClick={handleShowReject} className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none" style={{marginLeft:'25px'}}>
                          <div class="inline-flex items-center px-3 py-1 text-red-500 rounded-full gap-x-2 bg-red-100/60 dark:bg-gray-800">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9 3L3 9M3 3L9 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                          </div>
                        </button>
                      </div>
                    </th>


                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {applicants.map((applicant,index) => {
                  if(applicant.student_name.toLowerCase().includes(searchString.toLowerCase()) || applicant.student_email.includes(searchString.toLowerCase())){
                    if((searchPending===true && applicant.status==="Pending") || (searchAccepted===true && applicant.status==="Accepted") || (searchRejected===true && applicant.status==="Rejected") || (searchWithdrew===true && applicant.status==="Withdrew") ||  (searchWithdrew===false && searchPending===false && searchAccepted===false && searchRejected===false)){
                      const academic=applicant.student.academic[0];
                      console.log(academic);
                      console.log(tenthMax);
                      console.log(tenthMin);
                      console.log(twelfthMax);
                      console.log(twelfthMin);
                      console.log(btechMax);
                      console.log(btechMin);
                      console.log(mtechMax);
                      console.log(mtechMin);
                      console.log(phdQualificationFilter);
                      if((tenthMax==="select") || (tenthMax==="5 GPA" && (Number(academic.percentage10)/Number(academic.percentageformat10))*5>=tenthMin) || (tenthMax==="10 GPA" && (Number(academic.percentage10)/Number(academic.percentageformat10))*10>=tenthMin) || (tenthMax==="100%" && (Number(academic.percentage10)/Number(academic.percentageformat10))*100>=tenthMin)){
                        if((twelfthMax==="select") || (twelfthMax==="5 GPA" && (Number(academic.percentage12)/Number(academic.percentageformat12))*5>=twelfthMin) || (twelfthMax==="10 GPA" && (Number(academic.percentage12)/Number(academic.percentageformat12))*10>=twelfthMin) || (twelfthMax==="100%" && (Number(academic.percentage12)/Number(academic.percentageformat12))*100>=twelfthMin)){
                          if((btechMax==="select") || (btechMax==="5 GPA" && (Number(academic.percentagebtech)/Number(academic.percentageformatbtech))*5>=btechMin) || (btechMax==="10 GPA" && (Number(academic.percentagebtech)/Number(academic.percentageformatbtech))*10>=btechMin) || (btechMax==="100%" && (Number(academic.percentagebtech)/Number(academic.percentageformatbtech))*100>=btechMin)){
                            if((mtechMax==="select") || (mtechMax==="5 GPA" && (Number(academic.percentagemtech)/Number(academic.percentageformatmtech))*5>=mtechMin) || (mtechMax==="10 GPA" && (Number(academic.percentagemtech)/Number(academic.percentageformatmtech))*10>=mtechMin) || (mtechMax==="100%" && (Number(academic.percentagemtech)/Number(academic.percentageformatmtech))*100>=mtechMin)){
                              if((phdQualificationFilter==="select") || (phdQualificationFilter==="yes" && academic.isphdcompleted==="yes") || (phdQualificationFilter==="no" && academic.isphdcompleted==="no")){
                                return <JobApplicantCard
                                student_name={applicant.student_name}
                                student_email={applicant.student_email}
                                status={applicant.status}
                                application_id={applicant.application_id}
                                job_id={id}
                                srNo={index+1}
                                selectAll={selectAll}
                                acceptPressed={acceptPressed}
                                rejectPressed={rejectPressed}
                                length={applicants.length}
                                application_date={applicant.application_date}
                                />
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/*<div style={{width:'75%', margin:'auto', alignItems:'center', padding:'30px'}}>
    {applicants.map(applicant => (
      <JobApplicantCard
      student_name={applicant.student_name}
      student_email={applicant.student_email}
      status={applicant.status}
      application_id={applicant.application_id}
      job_id={id}
      />

    ))}
    </div>*/}

    </div>
    </>


  )
}

export default JobApplicants;
