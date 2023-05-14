// import { Parser } from "json2csv";
import React from "react";
// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Form } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import ModalTemplate from "./ModalTemplate.js";
import "./css/ApplicantDetails.css";
import defaultImage from "./basicProfile.png";
import { saveAs } from "file-saver";
import { CSVLink } from "react-csv";

function ApplicantDetails({ user, type }) {
  // console.log(user);
  const { id } = useParams();
  // console.log(id);
  const [details, setDetails] = useState({});
  const [recieved, setRecieved] = useState(false); 
  const [personalData, setPersonalData] = useState([]);
  const [altProfile, setAltProfile] = useState(defaultImage);
  const [resume, setResume] = useState(null);

  const history = useNavigate();
  // const url = `http://localhost:4000/fetch-resume/${user}`;



  useEffect(() => {
    if (type !== "institute") {
      history("*");
    } else {
      axios
        .get(`/api/applicant-details/${id}`)
        .then((response) => {
          if (response.data.status === 200) {

            if (response.data.details.institute_id !== user._id) {
              history("*");
            } else {
              setDetails(response.data.details);
              // console.log(response.data.details.student_details.personal[0].profile_image_url);
              console.log("data has been recieved");
              console.log(response.data.details.student_details); // iss data ko download krwana hai

              const defaultVal = "N/A"; // set your default value here
              const updatedData = Object.values(
                response.data.details.student_details
              ).map((val) => val ?? defaultVal);
              axios.get(`http://localhost:4000/fetch-resume/${response.data.details.student_details.personal[0].email}`).then((response) => {
                if (response.status === 200) {
                  const myData = response.data.others;
                  if (myData.resume_url === "#") {
                    setResume(null);
                  } else {
                    setResume(myData.resume_url);
                  }
                }
              });
              if (
                response.data.details.student_details.personal[0]
                  .profile_image_url === "#" ||
                !response.data.details.student_details.personal[0]
                  .profile_image_url
              ) {
                setAltProfile(defaultImage);
              } else {
                setAltProfile(
                  response.data.details.student_details.personal[0]
                    .profile_image_url
                );
              } 

              setPersonalData(updatedData);

              setRecieved(true);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const checkComDetails = () => {
    console.log("dnioenoei");
    const obj = details.fields.personal;
    if (
      obj.communication_city === true ||
      obj.communication_state === true ||
      obj.communication_address === true ||
      obj.communication_country === true ||
      obj.communication_pincode === true
    ) {
      console.log("sngioen");
      return true;
    } else {
      return false;
    }
  };

  const checkPermDetails = () => {
    const obj = details.fields.personal;
    if (
      obj.permanent_city === true ||
      obj.permanent_state === true ||
      obj.permanent_address === true ||
      obj.permanent_country === true ||
      obj.permanent_pincode === true
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkContactDetails = () => {
    const obj = details.fields.personal;
    if (obj.mobile === true || obj.altmobile === true) {
      return true;
    } else {
      return false;
    }
  };

  const checkTenthDetails = () => {
    const obj = details.fields.academic;
    if (
      obj.board10 ||
      obj.percentageformat10 ||
      obj.percentage10 ||
      obj.year10 ||
      obj.remarks10 ||
      obj.marksheet10
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkTwelfthDetails = () => {
    const obj = details.fields.academic;
    if (
      obj.board12 ||
      obj.percentageformat12 ||
      obj.percentage12 ||
      obj.year12 ||
      obj.remarks12 ||
      obj.marksheet12
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkBtechDetails = () => {
    const obj = details.fields.academic;
    if (
      obj.collegebtech ||
      obj.branchbtech ||
      obj.percentageformatbtech ||
      obj.percentagebtech ||
      obj.yearbtech ||
      obj.remarksbtech ||
      obj.marksheetbtechurl
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkMtechDetails = () => {
    const obj = details.fields.academic;
    if (
      obj.collegemtech ||
      obj.branchmtech ||
      obj.percentageformatmtech ||
      obj.percentagemtech ||
      obj.yearmtech ||
      obj.remarksmtech ||
      obj.marksheetmtech
    ) {
      return true;
    } else {
      return false;
    }
  };

  const checkPhdDetails = () => {
    const obj = details.fields.academic;
    if (obj.isphdcompleted || obj.phdremarks) {
      return true;
    } else {
      return false;
    }
  };

  const checkAcademicDetails = () => {
    const obj = details.fields.academic;
    const values = Object.values(obj);
    var flag = values.some((v) => {
      return v === true;
    });
    if (flag) {
      return true;
    } else {
      return false;
    }
  };

  const checkExperienceDetails = () => {
    const obj = details.fields.experience;
    const values = Object.values(obj);
    var flag = values.some((v) => {
      return v === true;
    });
    if (flag) {
      return true;
    } else {
      return false;
    }
  };

  const checkPublicationDetails = () => {
    const obj = details.fields.publication;
    const values = Object.values(obj);
    var flag = values.some((v) => {
      return v === true;
    });
    return flag;
  };

  const checkPorDetails = () => {
    const obj = details.fields.por;
    const values = Object.values(obj);
    var flag = values.some((v) => {
      return v === true;
    });
    return flag;
  };

  const checkReferenceDetails = () => {
    const obj = details.fields.reference;
    const values = Object.values(obj);
    var flag = values.some((v) => {
      return v === true;
    });
    return flag;
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <img
          src={altProfile}
          className="rounded-none lg:rounded-lg shadow-2xl hidden lg:block"
          alt={defaultImage}
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            margin: "0 auto",
          }}
        />
      </div>

      <div
        style={{
          paddingTop: "50px",
          width: "75%",
          margin: "auto",
          paddingBottom: "50px",
        }}
      >
        <section
          class="container mx-auto"
          style={{
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
            paddingRight: "100px",
            paddingLeft: "100px",
            paddingTop: "50px",
            paddingBottom: "50px",
            marginBottom: "50px",
            backgroundColor: "rgb(178 195 212)",
          }}
        >
          <div class="flex items-center gap-x-3" style={{ width: "100%" }}>
            <h2
              class="text-lg font-medium text-gray-800 dark:text-white"
              style={{
                marginBottom: "0",
                textTransform: "none",
                letterSpacing: "normal",
                fontWeight: "bold",
              }}
            >
              Personal Details
            </h2>
          </div>

          <div
            class="flex flex-col mt-6 px-4 py-4 bg-white border md:rounded-lg"
            style={{ marginBottom: "50px" }}
          >
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div
                  class="text-gray-800 font-medium"
                  style={{ padding: "10px" }}
                >
                  Personal Information
                </div>
                <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                    <thead
                      class="dark:bg-gray-800 divide-y divide-gray-200"
                      style={{ backgroundColor: "#F0F8FF" }}
                    >
                      <tr>
                        <th
                          scope="col"
                          class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Field name
                        </th>
                        <th
                          scope="col"
                          class="divide-x divide-gray-200 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          style={{ display: "block", borderLeftWidth: "1px" }}
                        >
                          Value
                        </th>
                      </tr>
                    </thead>
                    {recieved && (
                      <tbody class="divide-y divide-gray-200 ">
                        <tr>
                          <td
                            class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                            style={{ width: "40%" }}
                          >
                            Student Resume
                          </td>
                          <td
                            class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                            style={{ display: "block", borderLeftWidth: "1px" }}
                          >
                            {resume ? (
                              <>
                                <a href={resume} download>
                                  Download PDF
                                </a>

                                {/* <button onClick={openPDF}>Open PDF</button> */}
                              </>
                            ) : (
                              <></>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td
                            class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                            style={{ width: "40%" }}
                          >
                            Name
                          </td>
                          <td
                            class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                            style={{ display: "block", borderLeftWidth: "1px" }}
                          >
                            {details.student_details.personal[0].name}
                          </td>
                        </tr>
                        {details.fields.personal.email && (
                          <tr>
                            <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                              Email
                            </td>
                            <td
                              class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                              style={{
                                display: "block",
                                borderLeftWidth: "1px",
                              }}
                            >
                              {details.student_details.personal[0].email}
                            </td>
                          </tr>
                        )}
                        {details.fields.personal.fathername && (
                          <tr>
                            <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                              Father's Name
                            </td>
                            <td
                              class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                              style={{
                                display: "block",
                                borderLeftWidth: "1px",
                              }}
                            >
                              {details.student_details.personal[0].fathername}
                            </td>
                          </tr>
                        )}
                        {details.fields.personal.age && (
                          <tr>
                            <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                              Age
                            </td>
                            <td
                              class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                              style={{
                                display: "block",
                                borderLeftWidth: "1px",
                              }}
                            >
                              {details.student_details.personal[0].age}
                            </td>
                          </tr>
                        )}
                        {details.fields.personal.dob && (
                          <tr>
                            <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                              Date of Birth
                            </td>
                            <td
                              class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                              style={{
                                display: "block",
                                borderLeftWidth: "1px",
                              }}
                            >
                              {details.student_details.personal[0].dob}
                            </td>
                          </tr>
                        )}
                        {details.fields.personal.category && (
                          <tr>
                            <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                              Category
                            </td>
                            <td
                              class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                              style={{
                                display: "block",
                                borderLeftWidth: "1px",
                              }}
                            >
                              {details.student_details.personal[0].category}
                            </td>
                          </tr>
                        )}
                        {details.fields.personal.disability && (
                          <tr>
                            <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                              Disability
                            </td>
                            <td
                              class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                              style={{
                                display: "block",
                                borderLeftWidth: "1px",
                              }}
                            >
                              {details.student_details.personal[0].disability}
                            </td>
                          </tr>
                        )}
                        {details.fields.personal.married && (
                          <tr>
                            <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                              Marriage Status
                            </td>
                            <td
                              class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                              style={{
                                display: "block",
                                borderLeftWidth: "1px",
                              }}
                            >
                              {details.student_details.personal[0].married}
                            </td>
                          </tr>
                        )}
                        {details.fields.personal.nationality && (
                          <tr>
                            <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                              Nationality
                            </td>
                            <td
                              class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                              style={{
                                display: "block",
                                borderLeftWidth: "1px",
                              }}
                            >
                              {details.student_details.personal[0].nationality}
                            </td>
                          </tr>
                        )}
                        {details.fields.personal.gender && (
                          <tr>
                            <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                              Gender
                            </td>
                            <td
                              class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                              style={{
                                display: "block",
                                borderLeftWidth: "1px",
                              }}
                            >
                              {details.student_details.personal[0].gender}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>

          {recieved && checkComDetails() && (
            <div
              class="flex flex-col mt-6 px-4 py-4 bg-white border md:rounded-lg"
              style={{ marginBottom: "50px" }}
            >
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div
                    class="text-gray-800 font-medium"
                    style={{ padding: "10px" }}
                  >
                    Communication Information
                  </div>
                  <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                      <thead
                        class="dark:bg-gray-800 divide-y divide-gray-200"
                        style={{ backgroundColor: "#F0F8FF" }}
                      >
                        <tr>
                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Field name
                          </th>
                          <th
                            scope="col"
                            class="divide-x divide-gray-200 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            style={{ display: "block", borderLeftWidth: "1px" }}
                          >
                            Value
                          </th>
                        </tr>
                      </thead>
                      {recieved && (
                        <tbody class="divide-y divide-gray-200 ">
                          {details.fields.personal.communication_address && (
                            <tr>
                              <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                style={{ width: "40%" }}
                              >
                                Address
                              </td>
                              <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                {
                                  details.student_details.personal[0]
                                    .communication_address
                                }
                              </td>
                            </tr>
                          )}
                          {details.fields.personal.communication_city && (
                            <tr>
                              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                City
                              </td>
                              <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                {
                                  details.student_details.personal[0]
                                    .communication_city
                                }
                              </td>
                            </tr>
                          )}
                          {details.fields.personal.communication_state && (
                            <tr>
                              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                State
                              </td>
                              <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                {
                                  details.student_details.personal[0]
                                    .communication_state
                                }
                              </td>
                            </tr>
                          )}
                          {details.fields.personal.communication_pincode && (
                            <tr>
                              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                Pincode
                              </td>
                              <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                {
                                  details.student_details.personal[0]
                                    .communication_pincode
                                }
                              </td>
                            </tr>
                          )}
                          {details.fields.personal.communication_country && (
                            <tr>
                              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                Country
                              </td>
                              <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                {
                                  details.student_details.personal[0]
                                    .communication_country
                                }
                              </td>
                            </tr>
                          )}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {recieved && checkPermDetails() && (
            <div
              class="flex flex-col mt-6 px-4 py-4 bg-white border md:rounded-lg"
              style={{ marginBottom: "50px" }}
            >
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div
                    class="text-gray-800 font-medium"
                    style={{ padding: "10px" }}
                  >
                    Permanent Information
                  </div>
                  <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                      <thead
                        class="dark:bg-gray-800 divide-y divide-gray-200"
                        style={{ backgroundColor: "#F0F8FF" }}
                      >
                        <tr>
                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Field name
                          </th>
                          <th
                            scope="col"
                            class="divide-x divide-gray-200 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            style={{ display: "block", borderLeftWidth: "1px" }}
                          >
                            Value
                          </th>
                        </tr>
                      </thead>
                      {recieved && (
                        <tbody class="divide-y divide-gray-200 ">
                          {details.fields.personal.permanent_address && (
                            <tr>
                              <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                style={{ width: "40%" }}
                              >
                                Address
                              </td>
                              <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                {
                                  details.student_details.personal[0]
                                    .permanent_address
                                }
                              </td>
                            </tr>
                          )}
                          {details.fields.personal.permanent_city && (
                            <tr>
                              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                City
                              </td>
                              <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                {
                                  details.student_details.personal[0]
                                    .permanent_city
                                }
                              </td>
                            </tr>
                          )}
                          {details.fields.personal.permanent_state && (
                            <tr>
                              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                State
                              </td>
                              <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                {
                                  details.student_details.personal[0]
                                    .permanent_state
                                }
                              </td>
                            </tr>
                          )}
                          {details.fields.personal.permanent_pincode && (
                            <tr>
                              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                Pincode
                              </td>
                              <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                {
                                  details.student_details.personal[0]
                                    .permanent_pincode
                                }
                              </td>
                            </tr>
                          )}
                          {details.fields.personal.permanent_country && (
                            <tr>
                              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                Country
                              </td>
                              <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                {
                                  details.student_details.personal[0]
                                    .permanent_country
                                }
                              </td>
                            </tr>
                          )}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {recieved && checkContactDetails() && (
            <div
              class="flex flex-col mt-6 px-4 py-4 bg-white border md:rounded-lg"
              style={{ marginBottom: "50px" }}
            >
              <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div
                    class="text-gray-800 font-medium"
                    style={{ padding: "10px" }}
                  >
                    Contact Information
                  </div>
                  <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                      <thead
                        class="dark:bg-gray-800 divide-y divide-gray-200"
                        style={{ backgroundColor: "#F0F8FF" }}
                      >
                        <tr>
                          <th
                            scope="col"
                            class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Field name
                          </th>
                          <th
                            scope="col"
                            class="divide-x divide-gray-200 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            style={{ display: "block", borderLeftWidth: "1px" }}
                          >
                            Value
                          </th>
                        </tr>
                      </thead>
                      {recieved && (
                        <tbody class="divide-y divide-gray-200 ">
                          {details.fields.personal.mobile && (
                            <tr>
                              <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                style={{ width: "40%" }}
                              >
                                Mobile No.
                              </td>
                              <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                {details.student_details.personal[0].mobile}
                              </td>
                            </tr>
                          )}
                          {details.fields.personal.altmobile && (
                            <tr>
                              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                Alternate Mobile No.
                              </td>
                              <td
                                class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                {details.student_details.personal[0].altmobile}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {recieved && checkAcademicDetails() && (
          <section
            class="container mx-auto"
            style={{
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              paddingRight: "100px",
              paddingLeft: "100px",
              paddingTop: "50px",
              paddingBottom: "50px",
              marginBottom: "50px",
              backgroundColor: "rgb(178 195 212)",
            }}
          >
            <div class="flex items-center gap-x-3" style={{ width: "100%" }}>
              <h2
                class="text-lg font-medium text-gray-800 dark:text-white"
                style={{
                  marginBottom: "0",
                  textTransform: "none",
                  letterSpacing: "normal",
                  fontWeight: "bold",
                }}
              >
                Academic Details
              </h2>
            </div>

            {recieved && checkTenthDetails() && (
              <div
                class="flex flex-col mt-6 px-4 py-4 bg-white border md:rounded-lg"
                style={{ marginBottom: "50px" }}
              >
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div
                      class="text-gray-800 font-medium"
                      style={{ padding: "10px" }}
                    >
                      10th Information
                    </div>
                    <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                        <thead
                          class="dark:bg-gray-800 divide-y divide-gray-200"
                          style={{ backgroundColor: "#F0F8FF" }}
                        >
                          <tr>
                            <th
                              scope="col"
                              class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Field name
                            </th>
                            <th
                              scope="col"
                              class="divide-x divide-gray-200 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              style={{
                                display: "block",
                                borderLeftWidth: "1px",
                              }}
                            >
                              Value
                            </th>
                          </tr>
                        </thead>
                        {recieved && (
                          <tbody class="divide-y divide-gray-200 ">
                            {details.fields.academic.board10 && (
                              <tr>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{ width: "40%" }}
                                >
                                  Board
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {details.student_details.academic[0].board10}
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.percentageformat10 && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Percentage Format
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .percentageformat10
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.percentage10 && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Percentage
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .percentage10
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.year10 && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Year of completion
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {details.student_details.academic[0].year10}
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.remarks10 && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Remarks
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .remarks10
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.marksheet10 && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Marksheet
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .marksheet10
                                  }
                                </td>
                              </tr>
                            )}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {recieved && checkTwelfthDetails() && (
              <div
                class="flex flex-col mt-6 px-4 py-4 bg-white border md:rounded-lg"
                style={{ marginBottom: "50px" }}
              >
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div
                      class="text-gray-800 font-medium"
                      style={{ padding: "10px" }}
                    >
                      12th Information
                    </div>
                    <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                        <thead
                          class="dark:bg-gray-800 divide-y divide-gray-200"
                          style={{ backgroundColor: "#F0F8FF" }}
                        >
                          <tr>
                            <th
                              scope="col"
                              class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Field name
                            </th>
                            <th
                              scope="col"
                              class="divide-x divide-gray-200 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              style={{
                                display: "block",
                                borderLeftWidth: "1px",
                              }}
                            >
                              Value
                            </th>
                          </tr>
                        </thead>
                        {recieved && (
                          <tbody class="divide-y divide-gray-200 ">
                            {details.fields.academic.board12 && (
                              <tr>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{ width: "40%" }}
                                >
                                  Board
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {details.student_details.academic[0].board12}
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.percentageformat12 && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Percentage Format
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .percentageformat12
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.percentage12 && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Percentage
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .percentage12
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.year12 && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Year of completion
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {details.student_details.academic[0].year12}
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.remarks12 && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Remarks
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .remarks12
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.marksheet12 && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Marksheet
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .marksheet12
                                  }
                                </td>
                              </tr>
                            )}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {recieved && checkBtechDetails() && (
              <div
                class="flex flex-col mt-6 px-4 py-4 bg-white border md:rounded-lg"
                style={{ marginBottom: "50px" }}
              >
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div
                      class="text-gray-800 font-medium"
                      style={{ padding: "10px" }}
                    >
                      Btech Information
                    </div>
                    <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                        <thead
                          class="dark:bg-gray-800 divide-y divide-gray-200"
                          style={{ backgroundColor: "#F0F8FF" }}
                        >
                          <tr>
                            <th
                              scope="col"
                              class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Field name
                            </th>
                            <th
                              scope="col"
                              class="divide-x divide-gray-200 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              style={{
                                display: "block",
                                borderLeftWidth: "1px",
                              }}
                            >
                              Value
                            </th>
                          </tr>
                        </thead>
                        {recieved && (
                          <tbody class="divide-y divide-gray-200 ">
                            {details.fields.academic.collegebtech && (
                              <tr>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{ width: "40%" }}
                                >
                                  College
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .collegebtech
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.branchbtech && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Branch / Major
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .branchbtech
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.percentageformatbtech && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Percentage Format
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .percentageformatbtech
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.percentagebtech && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Percentage
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .percentagebtech
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.yearbtech && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Year of completion
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .yearbtech
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.remarksbtech && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Remarks
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .remarksbtech
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.marksheetbtechurl && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Marksheet URL
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .marksheetbtechurl
                                  }
                                </td>
                              </tr>
                            )}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {recieved && checkMtechDetails() && (
              <div
                class="flex flex-col mt-6 px-4 py-4 bg-white border md:rounded-lg"
                style={{ marginBottom: "50px" }}
              >
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div
                      class="text-gray-800 font-medium"
                      style={{ padding: "10px" }}
                    >
                      Mtech Information
                    </div>
                    <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                        <thead
                          class="dark:bg-gray-800 divide-y divide-gray-200"
                          style={{ backgroundColor: "#F0F8FF" }}
                        >
                          <tr>
                            <th
                              scope="col"
                              class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Field name
                            </th>
                            <th
                              scope="col"
                              class="divide-x divide-gray-200 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              style={{
                                display: "block",
                                borderLeftWidth: "1px",
                              }}
                            >
                              Value
                            </th>
                          </tr>
                        </thead>
                        {recieved && (
                          <tbody class="divide-y divide-gray-200 ">
                            {details.fields.academic.collegemtech && (
                              <tr>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{ width: "40%" }}
                                >
                                  College
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .collegemtech
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.branchmtech && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Branch / Major
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .branchmtech
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.percentageformatmtech && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Percentage Format
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .percentageformatmtech
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.percentagemtech && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Percentage
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .percentagemtech
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.yearmtech && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Year of completion
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .yearmtech
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.remarksmtech && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Remarks
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .remarksmtech
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.marksheetmtechurl && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Marksheet URL
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .marksheetmtechurl
                                  }
                                </td>
                              </tr>
                            )}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {recieved && checkPhdDetails() && (
              <div
                class="flex flex-col mt-6 px-4 py-4 bg-white border md:rounded-lg"
                style={{ marginBottom: "50px" }}
              >
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div
                      class="text-gray-800 font-medium"
                      style={{ padding: "10px" }}
                    >
                      Phd Information
                    </div>
                    <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                      <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                        <thead
                          class="dark:bg-gray-800 divide-y divide-gray-200"
                          style={{ backgroundColor: "#F0F8FF" }}
                        >
                          <tr>
                            <th
                              scope="col"
                              class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                            >
                              Field name
                            </th>
                            <th
                              scope="col"
                              class="divide-x divide-gray-200 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              style={{
                                display: "block",
                                borderLeftWidth: "1px",
                              }}
                            >
                              Value
                            </th>
                          </tr>
                        </thead>
                        {recieved && (
                          <tbody class="divide-y divide-gray-200 ">
                            {details.fields.academic.isphdcompleted && (
                              <tr>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{ width: "40%" }}
                                >
                                  Is Phd Completed?
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .isphdcompleted
                                  }
                                </td>
                              </tr>
                            )}
                            {details.fields.academic.phdremarks && (
                              <tr>
                                <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                  Phd Remarks
                                </td>
                                <td
                                  class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                  style={{
                                    display: "block",
                                    borderLeftWidth: "1px",
                                  }}
                                >
                                  {
                                    details.student_details.academic[0]
                                      .phdremarks
                                  }
                                </td>
                              </tr>
                            )}
                          </tbody>
                        )}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {recieved && checkExperienceDetails() && (
          <section
            class="container mx-auto"
            style={{
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              paddingRight: "100px",
              paddingLeft: "100px",
              paddingTop: "50px",
              paddingBottom: "50px",
              marginBottom: "50px",
              backgroundColor: "rgb(178 195 212)",
            }}
          >
            <div class="flex items-center gap-x-3" style={{ width: "100%" }}>
              <h2
                class="text-lg font-medium text-gray-800 dark:text-white"
                style={{
                  marginBottom: "0",
                  textTransform: "none",
                  letterSpacing: "normal",
                  fontWeight: "bold",
                }}
              >
                Experience Details
              </h2>
            </div>

            {recieved &&
              details.student_details.experience.map((exp, index) => (
                <div
                  class="flex flex-col mt-6 px-4 py-4 bg-white border md:rounded-lg"
                  style={{ marginBottom: "50px" }}
                >
                  <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div
                        class="text-gray-800 font-medium"
                        style={{ padding: "10px" }}
                      >
                        Experience {index + 1}
                      </div>
                      <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                          <thead
                            class="dark:bg-gray-800 divide-y divide-gray-200"
                            style={{ backgroundColor: "#F0F8FF" }}
                          >
                            <tr>
                              <th
                                scope="col"
                                class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Field name
                              </th>
                              <th
                                scope="col"
                                class="divide-x divide-gray-200 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                Value
                              </th>
                            </tr>
                          </thead>
                          {recieved && (
                            <tbody class="divide-y divide-gray-200 ">
                              {details.fields.experience.profile && (
                                <tr>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{ width: "40%" }}
                                  >
                                    Profile
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {exp.profile}
                                  </td>
                                </tr>
                              )}
                              {details.fields.experience.organization && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Organization
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {exp.organization}
                                  </td>
                                </tr>
                              )}
                              {details.fields.experience.startdate && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Start Date
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {exp.startdate}
                                  </td>
                                </tr>
                              )}
                              {details.fields.experience.enddate && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    End Date
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {exp.enddate}
                                  </td>
                                </tr>
                              )}
                              {details.fields.experience.description && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Description
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {exp.description}
                                  </td>
                                </tr>
                              )}
                              {details.fields.experience.location && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Location
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {exp.location}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          )}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </section>
        )}

        {recieved && checkPublicationDetails() && (
          <section
            class="container mx-auto"
            style={{
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              paddingRight: "100px",
              paddingLeft: "100px",
              paddingTop: "50px",
              paddingBottom: "50px",
              marginBottom: "50px",
              backgroundColor: "rgb(178 195 212)",
            }}
          >
            <div class="flex items-center gap-x-3" style={{ width: "100%" }}>
              <h2
                class="text-lg font-medium text-gray-800 dark:text-white"
                style={{
                  marginBottom: "0",
                  textTransform: "none",
                  letterSpacing: "normal",
                  fontWeight: "bold",
                }}
              >
                Publication Details
              </h2>
            </div>

            {recieved &&
              details.student_details.publication.map((pub, index) => (
                <div
                  class="flex flex-col mt-6 px-4 py-4 bg-white border md:rounded-lg"
                  style={{ marginBottom: "50px" }}
                >
                  <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div
                        class="text-gray-800 font-medium"
                        style={{ padding: "10px" }}
                      >
                        Publication {index + 1}
                      </div>
                      <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                          <thead
                            class="dark:bg-gray-800 divide-y divide-gray-200"
                            style={{ backgroundColor: "#F0F8FF" }}
                          >
                            <tr>
                              <th
                                scope="col"
                                class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Field name
                              </th>
                              <th
                                scope="col"
                                class="divide-x divide-gray-200 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                Value
                              </th>
                            </tr>
                          </thead>
                          {recieved && (
                            <tbody class="divide-y divide-gray-200 ">
                              {details.fields.publication.title && (
                                <tr>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{ width: "40%" }}
                                  >
                                    Title
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {pub.title}
                                  </td>
                                </tr>
                              )}
                              {details.fields.publication.abstract && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Abstract
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {pub.abstract}
                                  </td>
                                </tr>
                              )}
                              {details.fields.publication.journal && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Journal
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {pub.journal}
                                  </td>
                                </tr>
                              )}
                              {details.fields.publication.volume && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Volume
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {pub.volume}
                                  </td>
                                </tr>
                              )}
                              {details.fields.publication.pages && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Pages
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {pub.pages}
                                  </td>
                                </tr>
                              )}
                              {details.fields.publication.publisher && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Publisher
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {pub.publisher}
                                  </td>
                                </tr>
                              )}
                              {details.fields.publication.doi && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Digital Object Identifier
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {pub.doi}
                                  </td>
                                </tr>
                              )}
                              {details.fields.publication.url && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    URL
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {pub.url}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          )}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </section>
        )}

        {recieved && checkPorDetails() && (
          <section
            class="container mx-auto"
            style={{
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              paddingRight: "100px",
              paddingLeft: "100px",
              paddingTop: "50px",
              paddingBottom: "50px",
              marginBottom: "50px",
              backgroundColor: "rgb(178 195 212)",
            }}
          >
            <div class="flex items-center gap-x-3" style={{ width: "100%" }}>
              <h2
                class="text-lg font-medium text-gray-800 dark:text-white"
                style={{
                  marginBottom: "0",
                  textTransform: "none",
                  letterSpacing: "normal",
                  fontWeight: "bold",
                }}
              >
                Position of Responsibility Details
              </h2>
            </div>

            {recieved &&
              details.student_details.por.map((p, index) => (
                <div
                  class="flex flex-col mt-6 px-4 py-4 bg-white border md:rounded-lg"
                  style={{ marginBottom: "50px" }}
                >
                  <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div
                        class="text-gray-800 font-medium"
                        style={{ padding: "10px" }}
                      >
                        Position of Responsibility {index + 1}{" "}
                      </div>
                      <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                          <thead
                            class="dark:bg-gray-800 divide-y divide-gray-200"
                            style={{ backgroundColor: "#F0F8FF" }}
                          >
                            <tr>
                              <th
                                scope="col"
                                class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Field name
                              </th>
                              <th
                                scope="col"
                                class="divide-x divide-gray-200 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                Value
                              </th>
                            </tr>
                          </thead>
                          {recieved && (
                            <tbody class="divide-y divide-gray-200 ">
                              {details.fields.por.title && (
                                <tr>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{ width: "40%" }}
                                  >
                                    Title
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                      width: "60%",
                                    }}
                                  >
                                    {p.title}
                                  </td>
                                </tr>
                              )}
                              {details.fields.por.organization && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Organization
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {p.organization}
                                  </td>
                                </tr>
                              )}
                              {details.fields.por.location && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Location
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {p.location}
                                  </td>
                                </tr>
                              )}
                              {details.fields.por.startdate && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Start Date
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {p.startdate}
                                  </td>
                                </tr>
                              )}
                              {details.fields.por.enddate && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    End Date
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {p.enddate}
                                  </td>
                                </tr>
                              )}
                              {details.fields.por.description && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Description
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {p.description}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          )}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </section>
        )}

        {recieved && checkReferenceDetails() && (
          <section
            class="container mx-auto"
            style={{
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
              paddingRight: "100px",
              paddingLeft: "100px",
              paddingTop: "50px",
              paddingBottom: "50px",
              marginBottom: "50px",
              backgroundColor: "rgb(178 195 212)",
            }}
          >
            <div class="flex items-center gap-x-3" style={{ width: "100%" }}>
              <h2
                class="text-lg font-medium text-gray-800 dark:text-white"
                style={{
                  marginBottom: "0",
                  textTransform: "none",
                  letterSpacing: "normal",
                  fontWeight: "bold",
                }}
              >
                Reference Details
              </h2>
            </div>

            {recieved &&
              details.student_details.reference.map((ref, index) => (
                <div
                  class="flex flex-col mt-6 px-4 py-4 bg-white border md:rounded-lg"
                  style={{ marginBottom: "50px" }}
                >
                  <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div
                        class="text-gray-800 font-medium"
                        style={{ padding: "10px" }}
                      >
                        Reference {index + 1}{" "}
                      </div>
                      <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700 ">
                          <thead
                            class="dark:bg-gray-800 divide-y divide-gray-200"
                            style={{ backgroundColor: "#F0F8FF" }}
                          >
                            <tr>
                              <th
                                scope="col"
                                class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                              >
                                Field name
                              </th>
                              <th
                                scope="col"
                                class="divide-x divide-gray-200 px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                style={{
                                  display: "block",
                                  borderLeftWidth: "1px",
                                }}
                              >
                                Value
                              </th>
                            </tr>
                          </thead>
                          {recieved && (
                            <tbody class="divide-y divide-gray-200 ">
                              {details.fields.reference.name && (
                                <tr>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{ width: "40%" }}
                                  >
                                    Name
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {ref.name}
                                  </td>
                                </tr>
                              )}
                              {details.fields.reference.title && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Title
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {ref.title}
                                  </td>
                                </tr>
                              )}
                              {details.fields.reference.affliliation && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Affliliation
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {ref.affliliation}
                                  </td>
                                </tr>
                              )}
                              {details.fields.reference.referenceemail && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Reference Email
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {ref.referenceemail}
                                  </td>
                                </tr>
                              )}
                              {details.fields.reference.referencephone && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Reference Phone
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {ref.referencephone}
                                  </td>
                                </tr>
                              )}
                              {details.fields.reference.relationship && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Relationship
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {ref.relationship}
                                  </td>
                                </tr>
                              )}
                              {details.fields.reference.description && (
                                <tr>
                                  <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal">
                                    Description
                                  </td>
                                  <td
                                    class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 whitespace-normal"
                                    style={{
                                      display: "block",
                                      borderLeftWidth: "1px",
                                    }}
                                  >
                                    {ref.description}
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          )}
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </section>
        )}
      </div>
    </>
  );
}

export default ApplicantDetails;
