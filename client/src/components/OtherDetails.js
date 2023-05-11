import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import { FaTrash } from "react-icons/fa";

function FileUpload({ user, type }) {
  const [resume, setResume] = useState(null);
  const [mainResume, setMainResume] = useState(null);
  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setResume(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error : " + error);
    };
  }
  const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const handleSubmit = async (event) => {
    // event.preventDefault();
    axios
      .post(`http://localhost:4000/upload-resume/${user}`, { resume })
      .then((res) => {
        if (res.data.status === 200) {
          console.log("Resume was updated");
        } else {
          alert("Not a valid resume type.");
        }
      });
  };

  //   const handleFileUpload = (event) => {
  //     setFile(event.target.files[0]);
  //   };

  //   const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     const formData = new FormData();
  //     formData.append("resume", file);
  //     try {
  //       const response = await axios.post(`http://localhost:4000/resume-upload/${user}`, formData);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  const url = `http://localhost:4000/fetch-resume/${user}`;
  useEffect(() => {
    axios.get(url).then((response) => {
      if (response.status === 200) {
        const myData = response.data.others;
        if (myData.resume_url === "#") {
          setMainResume(null);
        } else {
          setMainResume(myData.resume_url);
        }
      }
    });
  });
  return (
    <div className="userProfile">
      <div className="parent" style={{ marginLeft: "3rem" }}>
        <div className="left">
          <h3
            style={{ fontWeight: "400" }}
            className="text-xxlg leading-6 font-large text-gray-900"
          >
            Resume Manager
          </h3>
        </div>
      </div>
      <hr />
      <div style={{ display: "flex" }}>
        <div>
          <form onSubmit={handleSubmit} className="userProfile">
            <div
              style={{ padding: "0" }}
              className="col-span-full sm:col-span-full"
            >
              <label
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                htmlFor="resume"
              >
                Upload your recent resume
                <span style={{ color: "#ff0000" }}> *</span>
                {resume ? (
                  <>
                    <div
                      style={{
                        width: "fit-content",
                        position: "relative",
                        margin: "0",
                        // padding: "2rem",
                        border: "1px solid grey",
                      }}
                    >
                      <Document
                        style={{
                          margin: "0",
                          padding: "0",
                        }}
                        file={resume}
                        onLoadSuccess={onDocumentLoadSuccess}
                        noData
                        options={{ disableAutoFetch: true }}
                      >
                        <Page
                          style={{
                            margin: "0",
                            padding: "0",
                          }}
                          pageNumber={1}
                          width={200}
                          height={300}
                          scale={0.5}
                          renderTextLayer={false}
                          renderAnnotationLayer={false}
                        />
                      </Document>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </label>

              <input
                className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                aria-describedby="profile-picture-desc"
                id="resume"
                type="file"
                required
                accept=".docs, .doc, .pdf, .docx"
                onChange={convertToBase64}
              />
              <div
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                id="profile-picture-desc"
              >
                <br />
                <span className="font-semibold">Maximum file size:</span> 20 MB,{" "}
                <span className="font-semibold">Allowed file formats:</span>{" "}
                .pdf, .docs, .docx
                <br />
                <br />
                <div className="mt-1">
                  <span className="font-semibold">
                    Recommended File Name Format:
                  </span>
                  <span>
                    {" "}
                    Your_name_&lt;resume&gt; <br />
                    Example: Rohan_resume
                  </span>
                </div>
              </div>
            </div>
            <button
              style={{
                color: "#3b32b3",
                border: "1px solid #3b32b3",
                padding: "0.3rem",
                borderRadius: "5rem",
                width: "7rem",
                fontSize: "medium",
              }}
              type="submit"
            >
              Add resume
            </button>
            <br></br>
            {mainResume ? (
              <>
                <a style={{
                  color: "#3b32b3",
                  border: "1px solid #3b32b3",
                  padding: "0.3rem",
                  borderRadius: "5rem",
                  width: "7rem",
                  fontSize: "medium",
                  textDecoration : 'none'
                }} href={mainResume} download>
                  Download PDF
                </a>
              </>
            ) : (
              <></>
            )}
          </form>
        </div>
        {mainResume === "#" || mainResume === null ? (
          <></>
        ) : (
          <>
            <div
              style={{
                width: "fit-content",
                position: "relative",
                margin: "0",
                // padding: "2rem",

                border: mainResume ? "1px solid grey" : "none",
              }}
            >
              {console.log(mainResume)}
              <Document
                style={{
                  margin: "0",
                  padding: "0",
                }}
                file={mainResume}
                onLoadSuccess={onDocumentLoadSuccess}
                noData
                options={{ disableAutoFetch: true }}
              >
                <Page
                  style={{
                    margin: "0",
                    padding: "0",
                  }}
                  pageNumber={1}
                  width={500}
                  height={500}
                  scale={1}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              </Document>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
