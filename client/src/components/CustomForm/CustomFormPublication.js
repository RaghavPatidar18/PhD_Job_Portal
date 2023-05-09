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



function CustomFormPublication ({getData,collectDataPublication, updateForm}){

  const [publication,setPublication]=useState(false);
  const [selectAll,setSelectAll]=useState(false);


  const[title,settitle]=useState(false);
  const[authorlist,setauthorlist]=useState(false)
  const[abstract,setabstract]=useState(false);
  const[journal,setjournal]=useState(false);
  const[volume,setvolume]=useState(false);
  const[pages,setpages]=useState(false);
  const[publisher,setpublisher]=useState(false);
  const[doi,setdoi]=useState(false);
  const[url,seturl]=useState(false);

  const isFirstRender = useRef(true);

  const obj={
    title,
    authorlist,
    abstract,
    journal,
    volume,
    pages,
    publisher,
    doi,
    url,
  };

useEffect(()=> {
  if(isFirstRender.current){
    console.log("did i come here");
    isFirstRender.current=false;

    if(Object.keys(updateForm).length!==0){
      setPublication(true);

      settitle(updateForm.title);
      setauthorlist(updateForm.authorlist);
      setabstract(updateForm.abstract);
      setjournal(updateForm.journal);
      setvolume(updateForm.volume);
      setpages(updateForm.pages);
      setpublisher(updateForm.publisher);
      setdoi(updateForm.doi);
      seturl(updateForm.url);
    }
    return;
  }
  if(getData===true){
    collectDataPublication(obj);
  }
},[getData])



  const selectAllClicked= ()=> {
    if(selectAll===false){
      setSelectAll(true);
      setPublication(true);

      settitle(true);
      setauthorlist(true);
      setabstract(true);
      setjournal(true);
      setvolume(true);
      setpages(true);
      setpublisher(true);
      setdoi(true);
      seturl(true);

    }else{
      setSelectAll(false);
      setPublication(false);

      settitle(false);
      setauthorlist(false);
      setabstract(false);
      setjournal(false);
      setvolume(false);
      setpages(false);
      setpublisher(false);
      setdoi(false);
      seturl(false);
    }
  }

  const publicationChange = () => {
    if(publication===false){
      setPublication(true);
    }else{
      setSelectAll(false);
      setPublication(false);

      settitle(false);
      setauthorlist(false);
      setabstract(false);
      setjournal(false);
      setvolume(false);
      setpages(false);
      setpublisher(false);
      setdoi(false);
      seturl(false);
    }
  }




  return(
    <>
    <div class="max-w-5xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800" style={{width:'80%',marginTop:'50px', position:'relative'}}>
      <div style={{display:'inline-block'}}>
        <div class="inline-flex items-center gap-x-3">
          <input type="checkbox" onChange={publicationChange} checked={publication===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
          <div class="flex items-center gap-x-2">
            <h6 style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial'}}>PUBLICATION</h6>
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

      {publication &&
        <div>
          <hr />
          <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#cae5fc'}}>
            <div class="inline-flex items-center gap-x-3">
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Publication Details</h2>
              </div>
            </div>
          </div>
          <hr style={{margin:'0'}} />
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-3 px-4 py-4" style={{backgroundColor:'#F0F8FF'}}>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=> settitle(!title)} checked={title===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Title</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=> setauthorlist(!authorlist)} checked={authorlist===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Author List</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=> setabstract(!abstract)} checked={abstract===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Abstract</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=> setjournal(!journal)} checked={journal===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Journal</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox"  onChange={()=>setvolume(!volume)} checked={volume===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Volume</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=>setpages(!pages)} checked={pages===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Pages</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=>setpublisher(!publisher)} checked={publisher===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Publisher</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=>setdoi(!doi)} checked={doi===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>Digital Object Identifier</h2>
              </div>
            </div>
            <div class="inline-flex items-center gap-x-3">
              <input type="checkbox" onChange={()=>seturl(!url)} checked={url===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
              <div class="flex items-center gap-x-2">
                <h2 class="font-medium text-gray-800 dark:text-white " style={{fontSize:'inherit',marginBottom:'0',textTransform:'none',letterSpacing:'initial',fontWeight:'bold'}}>URL</h2>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
      {/*<div className="field">
        <div className="form-check item">
          <input className="form-check-input" type="checkbox" name="publication" onChange={publicationChange} checked={publication===true}  />
          <label className="form-check-label input-label" style={{fontSize:'1rem'}} >PUBLICATION</label>
          <div style={{marginLeft:'auto', paddingRight:'10px'}}>
            <input className='form-check-input' type='checkbox' style={{margin:'0', marginRight:'5px', display:'inline-block',verticalAlign:'middle'}} onChange={selectAllClicked} checked={selectAll===true}/>
            <label className="form-check-label" style={{fontSize:'1rem', fontWeight:'normal',display:'inline-block',margin:'0',verticalAlign:'middle'}} >Select All </label>
          </div>
        </div>
        {publication &&
          <div className="data-fields">
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1" onChange={()=> settitle(!title)} checked={title===true} value="title"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Title</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1" onChange={()=> setauthorlist(!authorlist)} checked={authorlist===true} value="authorlist" />
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Author List</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1" onChange={()=> setabstract(!abstract)} checked={abstract===true} value="abstract"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Abstract</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=> setjournal(!journal)} checked={journal===true} value="journal"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Journal </label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setvolume(!volume)} checked={volume===true} value="volume"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}> Volume</label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setpages(!pages)} checked={pages===true} value="pages"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Pages </label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setpublisher(!publisher)} checked={publisher===true} value="publisher"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Publisher </label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>setdoi(!doi)} checked={doi===true} value="doi"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>Date of Issue </label>
            </div>
            <div className="form-check form-check-inline inline-item" >
              <input className="form-check-input" type="checkbox" id="personalCheckbox1"  onChange={()=>seturl(!url)} checked={url===true} value="url"/>
              <label className="form-check-label checkbox-label" for="personalCheckbox1" style={{fontWeight:'normal', fontSize:'1rem'}}>URL </label>
            </div>
          </div>}
        </div>*/}
    </>

  );

}

export default CustomFormPublication;
