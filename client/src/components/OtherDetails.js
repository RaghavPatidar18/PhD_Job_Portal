import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Personal.css"; // import the CSS file

export default function Profile({ user, type }) {
  const [error, setError] = useState("");
  const [resume, setResume] = useState(null);
  const [resumes, setResumes] = useState([]);

  const handleResumeChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleResumeUpload = () => {
    if (resume != null) {
      const reader = new FileReader();
      reader.onload = () => {
        const data = btoa(reader.result);
        axios
          .post("/resumes", { email: user, resume: data })
          .then((res) => {
            setResumes((resumes) => [...resumes, res.data]);
          })
          .catch((err) => console.log(err));
      };
      reader.readAsBinaryString(resume);
      setResume(null);
      setError("");
    } else {
      setError("Please choose a file first");
    }
  };

  const handleResumeDelete = (index, id) => {
    axios
      .delete(`/resumes/${user}/${id}`)
      .then(() => {
        const newResumes = [...resumes];
        newResumes.splice(index, 1);
        setResumes(newResumes);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get(`/resumes/${user}`)
      .then((res) => {
        setResumes(res.data);
      })
      .catch((err) => console.log(err));
  }, [user]);

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
            <label
              style={{ fontSize: "xx-large", width: "10em" }}
              htmlFor="resume"
            >
              Upload Resume:
            </label>
            <input
              style={{
                fontSize: "small !important",
                width: "20rem",
                height: "4rem",
              }}
              type="file"
              id="resume"
              onChange={handleResumeChange}
            />
            <button className="addNewButton" onClick={handleResumeUpload}>
              Upload
            </button>
            {resume && (
              <p className="file-name">
                {resume.name}{" "}
                <button onClick={() => setResume(null)}>Remove</button>
              </p>
            )}
          </div>

          <hr />
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
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = URL.createObjectURL(resume);
                        link.download = resume;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
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
