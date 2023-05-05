import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import {useState,useEffect} from "react";
import PostedJobCard from "./PostedJobCard";
import { useNavigate , useLocation } from 'react-router-dom';

function PostedJobs({user,type}){

  //const { id } = useParams();
  //console.log("here at job postings");
  const [job, setJob] = useState([]);
  const url = `http://localhost:4000/jobPostings/${user}`;

  const history = useNavigate();


  useEffect(() => {
    if(type!=="institute"){
      history("*");
    }else{
    axios.get(url)
      .then((response) => {
        if(response.data.status===200){
          setJob(response.data.jobArray);
          console.log(response.data.jobArray);
        }

      })
      .catch((err) => console.log(err));
    }
  }, []);


  console.log(job);
  return(
    < div style={{marginTop:'50px'}}>

    <section class="container px-4 py-4 mx-auto" style={{boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)"}}>

      <div class="flex items-center gap-x-3" style={{width:'100%'}}>
        <h2 class="text-lg font-medium text-gray-800 dark:text-white" style={{marginBottom:'0',textTransform:'none',letterSpacing:'normal',fontWeight:'bold'}}>Posted Jobs</h2>
        <span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400" style={{paddingRight:'12px',paddingLeft:'12px',fontWeight:'normal'}}>{job.length} jobs</span>
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
                        <input type="checkbox" class="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700" />
                        <span>Job title</span>
                      </div>
                    </th>

                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Posted Date</th>

                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Last Updated</th>

                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"><span class="sr-only">View Job details</span></th>







                    <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"><span class="sr-only">View Applicants</span></th>

                    <th scope="col" class="relative py-3.5 px-4">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {job.map(j => (
                  <PostedJobCard
                  title={j.title}
                  id={j._id}
                  createDate={j.createdAt}
                  deleted={j.deleted}
                  />

                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

    </section>

    </div>


  )
}

export default PostedJobs;
