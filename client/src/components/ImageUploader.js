import React, { useState } from "react";
import axios from "axios";

function FileUpload({ user, type }) {
  const [image, setImage] = useState(null);
  function convertToBase64(e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error : " + error);
    };
  }

  const handleSubmit = async (event) => {
    // event.preventDefault();
    axios.post(`/upload-image/${user}`, {image}).then((res)=>{
        if(res.data.status === 200){
            console.log("Profile picture updated");
        }else{
            alert("Not a valid profie picture.");
        }
    })
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

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ padding: "0" }} className="col-span-full sm:col-span-full">
        <label
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
          htmlFor="profile_picture"
        >
          Upload your recent photograph
          <span style={{ color: "#ff0000" }}> *</span>
        </label>

        <img style={{ width: "3rem", height: "3rem" }} src={image}></img>
        <input
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          aria-describedby="profile-picture-desc"
          id="profile_picture"
          type="file"
          required
          accept=".jpeg, .jpg, .png"
          onChange={convertToBase64}
        />
        <div
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="profile-picture-desc"
        >
          <br />
          <span className="font-semibold">Maximum file size:</span> 2 MB,{" "}
          <span className="font-semibold">Allowed file formats:</span> .jpg,
          .png, .jpeg
          <br />
          <br />
          <div className="mt-1">
            <span className="font-semibold">Recommended File Name Format:</span>
            <span>
              {" "}
              Photograph_&lt;your_email_id&gt; <br />
              Example: Photograph_abc@gmail.com
            </span>
          </div>
        </div>
      </div>
      <br />
      <button
        style={{
          color: "#3b32b3",
          border: "1px solid #3b32b3",
          padding: "0.3rem",
          borderRadius: "5rem",
          width: "7rem",
        }}
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}

export default FileUpload;
