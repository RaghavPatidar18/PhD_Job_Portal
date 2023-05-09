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



function CustomFormAcademic ({getData,collectDataAcademic,updateForm}){

  const [academic,setAcademic]=useState(false);
  const [selectAll,setSelectAll]=useState(false);
  const [tenthDetails,setTenthDetails]=useState(false);
  const [allTenthDetails,setAllTenthDetails]=useState(false);
  const [twelfthDetails,setTwelfthDetails]=useState(false);
  const [allTwelfthDetails,setAllTwelfthDetails]=useState(false);
  const [btechDetails,setBtechDetails]=useState(false);
  const [allBtechDetails,setAllBtechDetails]=useState(false);
  const [mtechDetails,setMtechDetails]=useState(false);
  const [allMtechDetails,setAllMtechDetails]=useState(false);
  const [phdDetails,setPhdDetails]=useState(false);
  const [allPhdDetails,setAllPhdDetails]=useState(false);


    //10
  const[board10,setboard10]=useState(false);
  const[percentageformat10,setpercentageformat10]=useState(false);
  const[percentage10,setpercentage10]=useState(false);
  const[year10,setyear10]=useState(false);
  const[remarks10,setremarks10]=useState(false);
  const[marksheet10,setmarksheet10]=useState(false);

      //12
  const[board12,setboard12]=useState(false);
  const[percentageformat12,setpercentageformat12]=useState(false);
  const[percentage12,setpercentage12]=useState(false);
  const[year12,setyear12]=useState(false);
  const[remarks12,setremarks12]=useState(false);
  const[marksheet12,setmarksheet12]=useState(false);
      // btech
  const[collegebtech,setcollegebtech]=useState(false);
  const[branchbtech,setbranchbtech]=useState(false);
  const[percentageformatbtech,setpercentageformatbtech]=useState(false);
  const[percentagebtech,setpercentagebtech]=useState(false);
  const[yearbtech,setyearbtech]=useState(false);
  const[remarksbtech,setremarksbtech]=useState(false);
  const[marksheetbtechurl,setmarksheetbtechurl]=useState(false);
    //mtech
  const[collegemtech,setcollegemtech]=useState(false);
  const[branchmtech,setbranchmtech]=useState(false);
  const[percentageformatmtech,setpercentageformatmtech]=useState(false);
  const[percentagemtech,setpercentagemtech]=useState(false);
  const[yearmtech,setyearmtech]=useState(false);
  const[remarksmtech,setremarksmtech]=useState(false);
  const[marksheetmtechurl,setmarksheetmtechurl]=useState(false);
    //phd
  const[isphdcompleted,setisphdcompleted]=useState(false);
  const[phdremarks,setphdremarks]=useState(false);

  const isFirstRender = useRef(true);

  const obj={
    board10,
    percentageformat10,
    percentage10,
    year10,
    remarks10,
    marksheet10,
    board12,
    percentageformat12,
    percentage12,
    year12,
    remarks12,
    marksheet12,
    collegebtech,
    branchbtech,
    percentageformatbtech,
    percentagebtech,
    yearbtech,
    remarksbtech,
    marksheetbtechurl,
    collegemtech,
    branchmtech,
    percentageformatmtech,
    percentagemtech,
    yearmtech,
    remarksmtech,
    marksheetmtechurl,
    isphdcompleted,
    phdremarks,
  }


useEffect(()=> {
  if(isFirstRender.current){
    console.log("did i come here");
    isFirstRender.current=false;


    if(Object.keys(updateForm).length!==0){
      setAcademic(true);
      setTenthDetails(true);
      setTwelfthDetails(true);
      setBtechDetails(true);
      setMtechDetails(true);
      setPhdDetails(true);

      //10th details
      setboard10(updateForm.board10);
      setpercentageformat10(updateForm.percentageformat10);
      setpercentage10(updateForm.percentage10);
      setyear10(updateForm.year10);
      setremarks10(updateForm.remarks10);
      setmarksheet10(updateForm.marksheet10);
      //12
      setboard12(updateForm.board12);
      setpercentageformat12(updateForm.percentageformat12);
      setpercentage12(updateForm.percentage12);
      setyear12(updateForm.year12);
      setremarks12(updateForm.remarks12);
      setmarksheet12(updateForm.marksheet12);
      // btech
      setcollegebtech(updateForm.collegebtech);
      setbranchbtech(updateForm.branchbtech);
      setpercentageformatbtech(updateForm.percentageformatbtech);
      setpercentagebtech(updateForm.percentagebtech);
      setyearbtech(updateForm.yearbtech);
      setremarksbtech(updateForm.remarksbtech);
      setmarksheetbtechurl(updateForm.marksheetbtechurl);
      //mtech
      setcollegemtech(updateForm.collegemtech);
      setbranchmtech(updateForm.branchmtech);
      setpercentageformatmtech(updateForm.percentageformatmtech);
      setpercentagemtech(updateForm.percentagemtech);
      setyearmtech(updateForm.yearmtech);
      setremarksmtech(updateForm.remarksmtech);
      setmarksheetmtechurl(updateForm.marksheetmtechurl);
      //phd
      setisphdcompleted(updateForm.isphdcompleted);
      setphdremarks(updateForm.phdremarks);
    }
    return;
  }
  if(getData===true){
    console.log("academic data");
    console.log(obj);
    collectDataAcademic(obj);
  }

},[getData])


  const selectAllClicked= ()=> {
    if(selectAll===false){
      setSelectAll(true);
      setAcademic(true);

      setTenthDetails(true);
      setTwelfthDetails(true);
      setBtechDetails(true);
      setMtechDetails(true);
      setPhdDetails(true);
      //10th details
      setboard10(true);
      setpercentageformat10(true);
      setpercentage10(true);
      setyear10(true);
      setremarks10(true);
      setmarksheet10(true);
      //12
      setboard12(true);
      setpercentageformat12(true);
      setpercentage12(true);
      setyear12(true);
      setremarks12(true);
      setmarksheet12(true);
      // btech
      setcollegebtech(true);
      setbranchbtech(true);
      setpercentageformatbtech(true);
      setpercentagebtech(true);
      setyearbtech(true);
      setremarksbtech(true);
      setmarksheetbtechurl(true);
      //mtech
      setcollegemtech(true);
      setbranchmtech(true);
      setpercentageformatmtech(true);
      setpercentagemtech(true);
      setyearmtech(true);
      setremarksmtech(true);
      setmarksheetmtechurl(true);
      //phd
      setisphdcompleted(true);
      setphdremarks(true);
    }else{
      setSelectAll(false);
      setTenthDetails(false);
      setTwelfthDetails(false);
      setBtechDetails(false);
      setMtechDetails(false);
      setPhdDetails(false);

      setAcademic(false);

      setAllTenthDetails(false);
      setAllBtechDetails(false);
      setAllMtechDetails(false);
      setAllPhdDetails(false);
      setAllTwelfthDetails(false);
      //10th
      setboard10(false);
      setpercentageformat10(false);
      setpercentage10(false);
      setyear10(false);
      setremarks10(false);
      setmarksheet10(false);
      //12
      setboard12(false);
      setpercentageformat12(false);
      setpercentage12(false);
      setyear12(false);
      setremarks12(false);
      setmarksheet12(false);
      // btech
      setcollegebtech(false);
      setbranchbtech(false);
      setpercentageformatbtech(false);
      setpercentagebtech(false);
      setyearbtech(false);
      setremarksbtech(false);
      setmarksheetbtechurl(false);
      //mtech
      setcollegemtech(false);
      setbranchmtech(false);
      setpercentageformatmtech(false);
      setpercentagemtech(false);
      setyearmtech(false);
      setremarksmtech(false);
      setmarksheetmtechurl(false);
      //phd
      setisphdcompleted(false);
      setphdremarks(false);
    }
  }

  const selectAllTenthClicked = () => {
    if(allTenthDetails===false){
      setboard10(true);
      setpercentageformat10(true);
      setpercentage10(true);
      setyear10(true);
      setremarks10(true);
      setmarksheet10(true);

      setAllTenthDetails(true);
      setTenthDetails(true);
    }else{
      setboard10(false);
      setpercentageformat10(false);
      setpercentage10(false);
      setyear10(false);
      setremarks10(false);
      setmarksheet10(false);

      setAllTenthDetails(false);
      setTenthDetails(false);
    }
  }

  const selectAllTwelfthClicked = () => {
    if(allTwelfthDetails===false){
      setboard12(true);
      setpercentageformat12(true);
      setpercentage12(true);
      setyear12(true);
      setremarks12(true);
      setmarksheet12(true);

      setTwelfthDetails(true);
      setAllTwelfthDetails(true);
    }else{
      setboard12(false);
      setpercentageformat12(false);
      setpercentage12(false);
      setyear12(false);
      setremarks12(false);
      setmarksheet12(false);

      setTwelfthDetails(false);
      setAllTwelfthDetails(false);
    }
  }

  const selectAllBtechClicked = () => {
    if(allBtechDetails===false){
      setcollegebtech(true);
      setbranchbtech(true);
      setpercentageformatbtech(true);
      setpercentagebtech(true);
      setyearbtech(true);
      setremarksbtech(true);
      setmarksheetbtechurl(true);

      setAllBtechDetails(true);
      setBtechDetails(true);
    }else{
      setcollegebtech(false);
      setbranchbtech(false);
      setpercentageformatbtech(false);
      setpercentagebtech(false);
      setyearbtech(false);
      setremarksbtech(false);
      setmarksheetbtechurl(false);

      setAllBtechDetails(false);
      setBtechDetails(false);
    }
  }

  const selectAllMtechClicked = () => {
    if(allMtechDetails===false){
      setcollegemtech(true);
      setbranchbtech(true);
      setpercentageformatmtech(true);
      setpercentagemtech(true);
      setyearmtech(true);
      setremarksmtech(true);
      setmarksheetmtechurl(true);

      setAllMtechDetails(true);
      setMtechDetails(true);
    }else{
      setcollegemtech(false);
      setbranchmtech(false);
      setpercentageformatmtech(false);
      setpercentagemtech(false);
      setyearmtech(false);
      setremarksmtech(false);
      setmarksheetmtechurl(false);

      setAllMtechDetails(false);
      setMtechDetails(false);
    }
  }

  const selectAllPhdClicked = () => {
    if(allPhdDetails===false){
      setisphdcompleted(true);
      setphdremarks(true);

      setAllPhdDetails(true);
      setPhdDetails(true);
    }else{
      setisphdcompleted(false);
      setphdremarks(false);

      setAllPhdDetails(false);
      setPhdDetails(false);
    }
  }

  const academicChange = () => {
    if(academic===false){
      setAcademic(true);
    }else{
      setSelectAll(false);
      setTenthDetails(false);
      setTwelfthDetails(false);
      setBtechDetails(false);
      setMtechDetails(false);
      setPhdDetails(false);

      setAcademic(false);

      setAllTenthDetails(false);
      setAllBtechDetails(false);
      setAllMtechDetails(false);
      setAllPhdDetails(false);
      setAllTwelfthDetails(false);
      //10th
      setboard10(false);
      setpercentageformat10(false);
      setpercentage10(false);
      setyear10(false);
      setremarks10(false);
      setmarksheet10(false);
      //12
      setboard12(false);
      setpercentageformat12(false);
      setpercentage12(false);
      setyear12(false);
      setremarks12(false);
      setmarksheet12(false);
      // btech
      setcollegebtech(false);
      setbranchbtech(false);
      setpercentageformatbtech(false);
      setpercentagebtech(false);
      setyearbtech(false);
      setremarksbtech(false);
      setmarksheetbtechurl(false);
      //mtech
      setcollegemtech(false);
      setbranchmtech(false);
      setpercentageformatmtech(false);
      setpercentagemtech(false);
      setyearmtech(false);
      setremarksmtech(false);
      setmarksheetmtechurl(false);
      //phd
      setisphdcompleted(false);
      setphdremarks(false);
    }
  }

  const tenthChange = () => {
    if(tenthDetails===false){
      setTenthDetails(true);
    }else{
      setboard10(false);
      setpercentageformat10(false);
      setpercentage10(false);
      setyear10(false);
      setremarks10(false);
      setmarksheet10(false);

      setTenthDetails(false);
      setAllTenthDetails(false);
    }
  }

  const twelfthChange = () => {
    if(twelfthDetails===false){
      setTwelfthDetails(true);
    }else{
      setboard12(false);
      setpercentageformat12(false);
      setpercentage12(false);
      setyear12(false);
      setremarks12(false);
      setmarksheet12(false);

      setAllTwelfthDetails(false);
      setTwelfthDetails(false);
    }
  }

  const btechChange = () => {
    if(btechDetails===false){
      setBtechDetails(true);
    }else{
      setcollegebtech(false);
      setbranchbtech(false);
      setpercentageformatbtech(false);
      setpercentagebtech(false);
      setyearbtech(false);
      setremarksbtech(false);
      setmarksheetbtechurl(false);

      setAllBtechDetails(false);
      setBtechDetails(false);
    }
  }

  const mtechChange = () => {
    if(mtechDetails===false){
      setMtechDetails(true);
    }else{
      setcollegemtech(false);
      setbranchmtech(false);
      setpercentageformatmtech(false);
      setpercentagemtech(false);
      setyearmtech(false);
      setremarksmtech(false);
      setmarksheetmtechurl(false);

      setAllMtechDetails(false);
      setMtechDetails(false);
    }
  }

  const phdChange = () => {
    if(phdDetails===false){
      setPhdDetails(true);
    }else{
      setisphdcompleted(false);
      setphdremarks(false);

      setAllPhdDetails(false);
      setPhdDetails(false);
    }
  }



  return(
    <>

    <div class="max-w-5xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800" style={{width:'80%',marginTop:'50px', position:'relative'}}>

      <div style={{display:'inline-block'}}>
        <div class="inline-flex items-center gap-x-3">
          <input type="checkbox" onChange={academicChange} checked={academic===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
          <div class="flex items-center gap-x-2">
            <h6 style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial'}}>ACADEMIC</h6>
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

      {academic &&
        <div>
          <hr />

          <div>

            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#cae5fc'}}>

              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" onChange={tenthChange} checked={tenthDetails===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>10th Details</h2>
                </div>
              </div>
              <div class="inline-flex items-center gap-x-3"></div>
              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" onChange={selectAllTenthClicked} checked={allTenthDetails===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Select All</h2>
                </div>
              </div>

            </div>

            {tenthDetails && <div>
              <hr style={{margin:'0'}}/>
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=> setboard10(!board10)} checked={board10===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Board name</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=> setpercentageformat10(!percentageformat10)} checked={percentageformat10===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Percentage format</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=> setpercentage10(!percentage10)} checked={percentage10===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Percentage</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=> setyear10(!year10)} checked={year10===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Year of Completion</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setremarks10(!remarks10)} checked={remarks10===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Remarks</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setmarksheet10(!marksheet10)} checked={marksheet10===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Marksheet</h2>
                  </div>
                </div>
              </div>
            </div>}

            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#cae5fc'}}>

              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" onChange={twelfthChange}  checked={twelfthDetails===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>12th Details</h2>
                </div>
              </div>
              <div class="inline-flex items-center gap-x-3"></div>
              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" onChange={selectAllTwelfthClicked} checked={allTwelfthDetails===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Select All</h2>
                </div>
              </div>

            </div>

            {twelfthDetails && <div>
              <hr style={{margin:'0'}}/>
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=> setboard12(!board12)} checked={board12===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Board name</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=> setpercentageformat12(!percentageformat12)} checked={percentageformat12===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Percentage format</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=> setpercentage12(!percentage12)} checked={percentage12===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Percentage</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=> setyear12(!year12)} checked={year12===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Year of Completion</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setremarks12(!remarks12)} checked={remarks12===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Remarks</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setmarksheet12(!marksheet12)} checked={marksheet12===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Marksheet</h2>
                  </div>
                </div>
              </div>
            </div>}

            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#cae5fc'}}>
              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" onChange={btechChange} checked={btechDetails===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Btech Details</h2>
                </div>
              </div>
              <div class="inline-flex items-center gap-x-3"></div>
              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" onChange={selectAllBtechClicked} checked={allBtechDetails===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Select All</h2>
                </div>
              </div>
            </div>

            {btechDetails && <div>
              <hr style={{margin:'0'}}/>
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setcollegebtech(!collegebtech)} checked={collegebtech===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>College name</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setbranchbtech(!branchbtech)} checked={branchbtech===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Branch / Major</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setpercentageformatbtech(!percentageformatbtech)} checked={percentageformatbtech===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Percentage format</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setpercentagebtech(!percentagebtech)} checked={percentagebtech===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Percentage</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setyearbtech(!yearbtech)} checked={yearbtech===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Year of Completion</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setremarksbtech(!remarksbtech)} checked={remarksbtech===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Remarks</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setmarksheetbtechurl(!marksheetbtechurl)} checked={marksheetbtechurl===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Marksheet</h2>
                  </div>
                </div>
              </div>
            </div>}

            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#cae5fc'}}>
              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" onChange={mtechChange} checked={mtechDetails===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Mtech Details</h2>
                </div>
              </div>
              <div class="inline-flex items-center gap-x-3"></div>
              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" onChange={selectAllMtechClicked} checked={allMtechDetails===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Select All</h2>
                </div>
              </div>
            </div>

            {mtechDetails && <div>
              <hr style={{margin:'0'}}/>
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setcollegemtech(!collegemtech)} checked={collegemtech===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>College name</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setbranchmtech(!branchmtech)} checked={branchmtech===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Branch / Major</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setpercentageformatmtech(!percentageformatmtech)} checked={percentageformatmtech===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Percentage format</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setpercentagemtech(!percentagemtech)} checked={percentagemtech===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Percentage</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setyearmtech(!yearmtech)} checked={yearmtech===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Year of Completion</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setremarksmtech(!remarksmtech)} checked={remarksmtech===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Remarks</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setmarksheetmtechurl(!marksheetmtechurl)} checked={marksheetmtechurl===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Marksheet</h2>
                  </div>
                </div>
              </div>
            </div>}

            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#cae5fc'}}>
              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" onChange={phdChange} checked={phdDetails===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Phd Details</h2>
                </div>
              </div>
              <div class="inline-flex items-center gap-x-3"></div>
              <div class="inline-flex items-center gap-x-3">
                <input type="checkbox" onChange={selectAllPhdClicked} checked={allPhdDetails===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                <div class="flex items-center gap-x-2">
                  <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Select All</h2>
                </div>
              </div>
            </div>

            {phdDetails && <div>
              <hr style={{margin:'0'}}/>
              <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setisphdcompleted(!isphdcompleted)} checked={isphdcompleted===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Phd Complete Status</h2>
                  </div>
                </div>
                <div class="inline-flex items-center gap-x-3">
                  <input type="checkbox" onChange={()=>setphdremarks(!phdremarks)} checked={phdremarks===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                  <div class="flex items-center gap-x-2">
                    <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Remarks</h2>
                  </div>
                </div>
              </div>
            </div>}

          </div>

        </div>
      }




    </div>
      {/*<div className="field">
        <div className="form-check item">
          <input className="form-check-input" type="checkbox" name="academic" onChange={academicChange} checked={academic===true}  />
          <label className="form-check-label input-label" style={{fontSize:'1rem'}} >ACADEMIC</label>
          <div style={{marginLeft:'auto', paddingRight:'10px'}}>
            <input className='form-check-input' type='checkbox' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onChange={selectAllClicked} checked={selectAll===true}/>
            <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
          </div>
        </div>
        {academic && <div className="data-fields">

          <div>
            <div style={{display:'flex'}}>
              <input className="form-check-input" type="checkbox" onChange={btechChange} checked={btechDetails===true} />
              <label className="form-check-label input-label" style={{fontSize:'1rem'}} >Btech Details</label>
              <div style={{marginLeft:'auto', paddingRight:'10px'}}>
                <input className='form-check-input' type='checkbox' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onChange={selectAllBtechClicked} checked={allBtechDetails===true} />
                <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
              </div>
            </div>

            {btechDetails &&
              <div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setcollegebtech(!collegebtech)} checked={collegebtech===true} value="collegebtech"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>College</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setbranchbtech(!branchbtech)} checked={branchbtech===true} value="branchbtech"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Branch</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setpercentageformatbtech(!percentageformatbtech)} checked={percentageformatbtech===true} value="percentageformatbtech"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Percentage format</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setpercentagebtech(!percentagebtech)} checked={percentagebtech===true} value="percentagebtech"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Percentage</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setyearbtech(!yearbtech)} checked={yearbtech===true} value="yearbtech"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Year of completion</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setremarksbtech(!remarksbtech)} checked={remarksbtech===true} value="remarksbtech"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Remarks</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setmarksheetbtechurl(!marksheetbtechurl)} checked={marksheetbtechurl===true} value="marksheetbtechurl"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Marksheet URL</label>
                </div>
              </div>}
          </div>


          <div>
            <div style={{display:'flex'}}>
              <input className="form-check-input" type="checkbox" onChange={mtechChange} checked={mtechDetails===true} />
              <label className="form-check-label input-label" style={{fontSize:'1rem'}} >Mtech Details</label>
              <div style={{marginLeft:'auto', paddingRight:'10px'}}>
                <input className='form-check-input' type='checkbox' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onChange={selectAllMtechClicked} checked={allMtechDetails===true} />
                <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
              </div>
            </div>

            {mtechDetails &&
              <div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setcollegemtech(!collegemtech)} checked={collegemtech===true} value="collegemtech"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>College</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setbranchmtech(!branchmtech)} checked={branchmtech===true} value="branchmtech"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Branch</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setpercentageformatmtech(!percentageformatmtech)} checked={percentageformatmtech===true} value="percentageformatmtech"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Percentage format</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setpercentagemtech(!percentagemtech)} checked={percentagemtech===true} value="percentagemtech"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Percentage</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setyearmtech(!yearmtech)} checked={yearmtech===true} value="yearmtech"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Year of completion</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setremarksmtech(!remarksmtech)} checked={remarksmtech===true} value="remarksmtech"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Remarks</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setmarksheetmtechurl(!marksheetmtechurl)} checked={marksheetmtechurl===true} value="marksheetmtechurl"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Marksheet URL</label>
                </div>
              </div>}
          </div>

          <div>
            <div style={{display:'flex'}}>
              <input className="form-check-input" type="checkbox" onChange={phdChange} checked={phdDetails===true} />
              <label className="form-check-label input-label" style={{fontSize:'1rem'}} >Phd Details</label>
              <div style={{marginLeft:'auto', paddingRight:'10px'}}>
                <input className='form-check-input' type='checkbox' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onChange={selectAllPhdClicked} checked={allPhdDetails===true} />
                <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
              </div>
            </div>

            {phdDetails &&
              <div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setisphdcompleted(!isphdcompleted)} checked={isphdcompleted===true} value="isphdcompleted"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Phd complete Status</label>
                </div>
                <div className="form-check form-check-inline inline-item" >
                  <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setphdremarks(!phdremarks)} checked={phdremarks===true} value="phdremarks"/>
                  <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Remarks</label>
                </div>
              </div>}
          </div>


        </div>}
      </div>*/}


    </>

  );

}

export default CustomFormAcademic;
