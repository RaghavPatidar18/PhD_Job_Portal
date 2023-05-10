import React, { useState } from "react";
import axios from "axios";

function FileUpload({user, type}) {
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const response = await axios.post(`/resume-upload/${user}`, formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="resume">
        Upload Resume:
      </label>
      <span style={{ paddingLeft: "0.3rem" }}></span>
      <input id="resume" name="resume" type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />
      <hr/>
      <button type="submit">Submit</button>
    </form>
  );
}

export default FileUpload;
