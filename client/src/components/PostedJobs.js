import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect} from "react";
import PostedJobCard from "./PostedJobCard";
import { useNavigate , useLocation } from 'react-router-dom';
import Modal from "react-bootstrap/Modal";

function PostedJobs({user,type}){

  //const { id } = useParams();
  //console.log("here at job postings");
  const [job, setJob] = useState([]);
  const url = `/jobPostings/${user}`;
  const [selectAll,setSelectAll]=useState(false);
  const history = useNavigate();
  const [show,setShow]=useState(false);
  const [deletePressed,setDeletePressed]=useState(false);
  const [searchString,setSearchString]=useState("");
  const [numberOfJobs,setNumberOfJobs]=useState(0);

  const handleClose = () => setShow(false);
  const handleShow = ()=> setShow(true);


  useEffect(() => {
    if(type!=="institute"){
      history("*");
    }else{
    axios.get(url)
      .then((response) => {
        if(response.data.status===200){
          setJob(response.data.jobArray);
          console.log(response.data.jobArray);
          var count=0;
          response.data.jobArray.map((j)=>{
            if(j.deleted===false){
              count++;
            }
          });
          setNumberOfJobs(count);
        }

      })
      .catch((err) => console.log(err));
    }
  }, []);


  const selectAllClicked = ()=>{
    setSelectAll(!selectAll);

  }

  const handleMultipleDelete = () =>{
    setDeletePressed(true);
    //window.location.reload();
    handleClose();
  }


  console.log(job);
  return(
    <>

    <Modal show={show} onHide={handleClose}>
    <div class="relative block overflow-hidden text-left align-middle transform bg-white  sm:max-w-sm rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6" style={{margin:'auto', marginTop:'10px', marginBottom:'10px'}}>
        <div class="text-center">
            <h3 class="text-lg font-medium text-gray-800 dark:text-white" id="modal-title">
                Delete Jobs
            </h3>
            <p class="mt-2 text-gray-500 dark:text-gray-400">
                Are you sure you wish to <span style={{fontWeight:'bold'}}>delete</span> all the selected jobs ?
            </p>
        </div>
        <div class="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
            <button onClick={handleClose} class="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40">
                Cancel
            </button>

            <button onClick={handleMultipleDelete} class="px-4 sm:mx-2 w-full py-2.5 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40">
                Delete
            </button>
        </div>
    </div>
      {/*<Modal.Header closeButton>
        <Modal.Title>Delete Jobs</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you wish to delete all the selected jobs?</Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleMultipleDelete}>
          Delete
        </Button>
      </Modal.Footer>*/}
    </Modal>

    < div style={{marginTop:'50px'}}>

    <section class="container px-4 py-4 mx-auto" style={{boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)"}}>

      <div class="flex items-center gap-x-3" style={{width:'100%'}}>
        <h2 class="text-lg font-medium text-gray-800 dark:text-white" style={{marginBottom:'0',textTransform:'none',letterSpacing:'normal',fontWeight:'bold'}}>Posted Jobs</h2>
        <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400" style={{paddingRight:'12px',paddingLeft:'12px',fontWeight:'normal'}}>{numberOfJobs} jobs</span>
      </div>

      <div class="mt-6 md:flex md:items-center md:justify-between">
        <div></div>

        <div class="relative flex items-center mt-4 md:mt-0">
          <span class="absolute">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </span>

          <input type="text" value={searchString} onChange={(e)=> setSearchString(e.target.value)} style={{paddingTop:'6px',paddingBottom:'6px', paddingLeft:'44px',paddingRight:'20px'}} placeholder="Search" class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
        </div>
      </div>

      <div class="flex flex-col mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>

                    <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                      <div class="flex items-center gap-x-3">
                        <input type="checkbox" onClick={selectAllClicked} checked={selectAll===true} class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                        <span>Job title</span>
                      </div>
                    </th>

                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Posted Date</th>

                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Last Updated</th>

                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"><span class="sr-only">View Job details</span></th>







                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"><span class="sr-only">View Applicants</span></th>

                    <th scope="col" class="relative py-3.5 px-4">
                      <span  >
                        <button onClick={handleShow} class="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                        </button>
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {job.map((j,index) => {
                  if(j.title.toLowerCase().includes(searchString.toLowerCase())){
                    return <PostedJobCard
                    title={j.title}
                    id={j._id}
                    createDate={j.createdAt}
                    deleted={j.deleted}
                    selectAll={selectAll}
                    deletePressed={deletePressed}
                    index={index}
                    length={job.length}
                    updateDate={j.updatedAt}
                    />
                  }
                })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </section>

    </div>
    </>


  )
}

export default PostedJobs;
