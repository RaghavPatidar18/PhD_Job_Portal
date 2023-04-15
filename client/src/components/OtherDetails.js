import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Personal.css"; // import the CSS file
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
export default function Profile({ user, type }) {
  const [error, setError] = useState("");
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState(null);
  const [resumes, setResumes] = useState([]);
  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleCoverLetterChange = (e) => {
    setCoverLetter(e.target.files[0]);
  };

  const handleResumeUpload = () => {
    if (resume != null) {
      setError("");
      setResumes((resumes) => [...resumes, resume]);
      setResume(null);
    } else {
      setError("Please choose a file first");
    }
  };

  const handleResumeDelete = (index) => {
    const newResumes = [...resumes];
    newResumes.splice(index, 1);
    setResumes(newResumes);
  };

  const handleCoverLetterUpload = () => {
    if (coverLetter != null) {
      setError("");
      setResumes((coverLetter) => [...resumes, coverLetter]);
      setCoverLetter(null);
    } else {
      setError("Choose a cover letter first")
      setCoverLetter(null);
    }
  };

  const handleCoverLetterDelete = () => {
    setCoverLetter(null);
  };

  return (
    <>
      <div className="userProfile">
        <p style={{ color: "red" }}>{error}</p>
        <div className="parent">
          <div className="left">
            <h3 className="basic">Resume Uploader</h3>
          </div>
          <div className="right"></div>
        </div>
        <hr style={{ borderWidth: "2px" }} />
        <div className="userProfileData">
          <div className="resume-container">
            <label style={{fontSize : 'xx-large', width:'10em'}}htmlFor="resume">Upload Resume:</label>
            <input style={{fontSize:'small !important', width:'20rem', height:'4rem'}}type="file" id="resume" onChange={handleResumeChange} />
            <button className="addNewButton"onClick={handleResumeUpload}>Upload</button>
            {resume && (
              <p className="file-name">
                {resume.name}{" "}
                <button onClick={() => setResume(null)}>Remove</button>
              </p>
            )}
          </div>
          {/* <div className="cover-letter-container">
          <label style={{fontSize : 'large', width:'10em'}}htmlFor="resume">Upload Cover Letter:</label>
            <input style={{fontSize:'small !important', width:'20rem', height:'4rem'}}type="file" id="resume" onChange={handleResumeChange} />
            <button className="addNewButton"onClick={handleCoverLetterUpload}>Upload</button>
            {coverLetter && (
              <p className="file-name">
                {coverLetter.name}{" "}
                <button onClick={() => setCoverLetter(null)}>Remove</button>
              </p>
            )}
          </div> */}
          {/* <br/> */}
          <hr/>
        </div>
        <div className="resumes-container">
          {resumes.map((resume, index) => (
            <div key={index} className="resume-item">
              <table>
                <tr>
                  <td>
                    <p style={{}} className="file-name">
                      {resume.name}{" "}
                    </p>
                  </td>
                  <td>
                    <button
                      className="closeButton"
                      onClick={() => handleResumeDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button
                      className="editButton"
                      onClick={() => window.open(URL.createObjectURL(resume))}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className="editButton"
                      onClick={() =>
                        (window.location.href = URL.createObjectURL(resume))
                      }
                      download
                    >
                      Download
                    </button>
                  </td>
                </tr>
              </table>
              <div className="resume-buttons"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
