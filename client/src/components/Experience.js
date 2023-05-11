import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./css/Personal.css";
import { FaTrash, FaEdit, FaPen } from "react-icons/fa";
import noDataImage from "./NotFound.jpg";
const ExperienceTable = ({ user, type }) => {
  const bottomRef = useRef(null);
  const [experiences, setExperiences] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    profile: "",
    organization: "",
    startdate: "",
    enddate: "",
    description: "",
    location: "",
  });
  const [formData2, setFormData2] = useState({
    email: "",
    profile: "",
    organization: "",
    startdate: "",
    enddate: "",
    description: "",
    location: "",
  });

  // Fetch all experiences on component mount
  useEffect(() => {
    axios
      .get(`/experiences/${user}`)
      .then((res) => {
        console.log(res);
        setExperiences(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handler for form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleChange2 = (e) => {
    setFormData2({
      ...formData2,
      [e.target.name]: e.target.value,
    });
  };

  // Handler for submitting add experience form
  const handleAddSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/experiences/${user}`, formData2)
      .then((res) => {
        setExperiences([...experiences, res.data]);
        setShowAddForm(false);
        setFormData2({
          email: "",
          profile: "",
          organization: "",
          startdate: "",
          enddate: "",
          description: "",
          location: "",
        });
      })
      .catch((err) => console.error(err));
  };

  // Handler for submitting edit experience form
  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `/experiences/${selectedExperience._id}`,
        formData
      )
      .then((res) => {
        const index = experiences.findIndex((exp) => exp._id === res.data._id);
        setExperiences([
          ...experiences.slice(0, index),
          res.data,
          ...experiences.slice(index + 1),
        ]);
        setShowEditForm(false);
        setSelectedExperience(null);
        setFormData({
          email: "",
          profile: "",
          organization: "",
          startdate: "",
          enddate: "",
          description: "",
          location: "",
        });
      })
      .catch((err) => console.error(err));
  };

  // Handler for deleting an experience
  const handleAdd = () => {
    setShowAddForm(true);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const handleDelete = (id) => {
    axios
      .delete(`/experiences/${id}`)
      .then((res) => {
        const updatedExperiences = experiences.filter((exp) => exp._id !== id);
        setExperiences(updatedExperiences);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
    <div style={{ width: "100%", marginLeft: "1rem" }} className="userProfile">
      <div className="parent" style={{ marginLeft: "2rem" }}>
        <div className="left">
          <h3
            style={{ fontWeight: "400" }}
            className="text-xxlg leading-6 font-large text-gray-900"
          >
            Work Experience
          </h3>
        </div>
        <div className="right">
          <button className="addNewButton" onClick={handleAdd}>
            Add Experience
          </button>
        </div>
      </div>
      <hr></hr>
      {experiences.length === 0 && !showAddForm ? (
        <>
          <div style={{ display: "block", textAlign: "center" }}>
            <h3
              style={{
                margin: "auto",
                padding: "auto",
                width: "30%",
                height: "20%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "1rem",
                fontWeight: "normal",
                textDecoration: "underline",
              }}
            >
              No experiences were found
            </h3>
          </div>
          <div style={{ display: "block", textAlign: "center" }}>
            <img
              src={noDataImage}
              style={{
                margin: "auto",
                padding: "auto",
                width: "40%",
                height: "30%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "1rem",
              }}
            />
          </div>
        </>
      ) : (
        <></>
      )}
      {showAddForm && (
        <div className="userProfile">
          <div
            style={{ width: "100%", marginLeft: "0" }}
            className="flex my-10 mx-20"
          >
            <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="flex space-x-3 px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Add new experience
                </h3>
              </div>
              <form className="border-t border-gray-300" onSubmit = {handleAddSubmit}>
                <dl>
                  <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Organization<span style={{ color: "#ff0000" }}> *</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="organization"
                        value={formData2.organization}
                        onChange={handleChange2}
                        required
                      />
                    </dd>
                    <dt className="text-sm font-medium text-gray-500">
                      Work role<span style={{ color: "#ff0000" }}> *</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="profile"
                        value={formData2.profile}
                        onChange={handleChange2}
                        required
                      />
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Start Date<span style={{ color: "#ff0000" }}> *</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="date"
                        name="startdate"
                        value={formData2.startdate}
                        onChange={handleChange2}
                        required
                      />
                    </dd>

                    <dt className="text-sm font-medium text-gray-500">
                      End date<span style={{ color: "#ff0000" }}> *</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="date"
                        name="enddate"
                        value={formData2.enddate}
                        onChange={handleChange2}
                        required
                      />
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Location<span style={{ color: "#ff0000" }}> *</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="location"
                        value={formData2.location}
                        onChange={handleChange2}
                        required
                      />
                    </dd>
                    <dt className="text-sm font-medium text-gray-500">
                      Description<span style={{ color: "#ff0000" }}> *</span> 
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        name="description"
                        value={formData2.description}
                        onChange={handleChange2}
                        required
                      />
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      <button
                        style={{
                          border: "1px solid grey",
                          padding: "0.4rem",
                          width: "4rem",
                          color: "white",
                          backgroundColor: "#b54141",
                        }}
                        onClick={() => {
                          setShowAddForm(false);
                        }}
                      >
                        Cancel
                      </button>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <button
                        style={{
                          border: "1px solid grey",
                          padding: "0.4rem",
                          width: "4rem",
                          color: "white",
                          backgroundColor: "black",
                        }}
                        type="submit"
                      >
                        Save
                      </button>
                    </dd>
                  </div>
                </dl>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {experiences.map((exp) =>
        selectedExperience === exp && showEditForm ? (
          <>
            <div className="userProfile">
              <div
                style={{ width: "100%", marginLeft: "0" }}
                className="flex my-10 mx-20"
              >
                <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="flex space-x-3 px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {exp.profile}
                      <span style={{ marginLeft: "1.5rem" }}></span>
                      <button
                        style={{
                          fontSize: "medium",
                          color: "rgba(59, 50, 179)",
                        }}
                        onClick={() => {
                          setSelectedExperience(exp);
                          setFormData(exp);
                          setShowEditForm(true);
                        }}
                      >
                        <FaPen />
                      </button>
                      <span style={{ marginLeft: "2rem" }}></span>
                      <button
                        style={{
                          fontSize: "medium",
                          color: "rgba(59, 50, 179)",
                        }}
                        onClick={() => handleDelete(exp._id)}
                      >
                        <FaTrash style={{ color: "#b54141" }} />
                      </button>
                    </h3>
                  </div>
                  <form className="border-t border-gray-300" onSubmit={handleEditSubmit}>
                    <dl>
                      <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6" >
                        <dt className="text-sm font-medium text-gray-500">
                          Organization<span style={{ color: "#ff0000" }}> *</span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="organization"
                            value={formData.organization}
                            onChange={handleChange}
                            required
                          />
                        </dd>
                        <dt className="text-sm font-medium text-gray-500">
                          Work role<span style={{ color: "#ff0000" }}> *</span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="profile"
                            value={formData.profile}
                            onChange={handleChange}
                            required
                          />
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Start Date<span style={{ color: "#ff0000" }}> *</span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <input
                            type="date"
                            name="startdate"
                            value={formData.startdate}
                            onChange={handleChange}
                            required
                          />
                        </dd>

                        <dt className="text-sm font-medium text-gray-500">
                          End date<span style={{ color: "#ff0000" }}> *</span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <input
                            type="date"
                            name="enddate"
                            value={formData.enddate}
                            onChange={handleChange}
                            required
                          />
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Location<span style={{ color: "#ff0000" }}> *</span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                          />
                        </dd>
                        <dt className="text-sm font-medium text-gray-500">
                          Description<span style={{ color: "#ff0000" }}> *</span>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                          />
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          <button
                            style={{
                              border: "1px solid grey",
                              padding: "0.4rem",
                              width: "4rem",
                              color: "white",
                              backgroundColor: "#b54141",
                            }}
                            onClick={() => {
                              setSelectedExperience("");
                            }}
                          >
                            Cancel
                          </button>
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          <button
                            style={{
                              border: "1px solid grey",
                              padding: "0.4rem",
                              width: "4rem",
                              color: "white",
                              backgroundColor: "black",
                            }}
                            type="submit"
                          >
                            Save
                          </button>
                        </dd>
                      </div>
                    </dl>
                  </form>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="userProfile">
              <div
                style={{ width: "100%", marginLeft: "0" }}
                className="flex my-10 mx-20"
              >
                <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="flex space-x-3 px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {exp.profile}
                      <span style={{ marginLeft: "1.5rem" }}></span>
                      <button
                        style={{
                          fontSize: "medium",
                          color: "rgba(59, 50, 179)",
                        }}
                        onClick={() => {
                          setSelectedExperience(exp);
                          setFormData(exp);
                          setShowEditForm(true);
                        }}
                      >
                        <FaPen />
                      </button>
                      <span style={{ marginLeft: "2rem" }}></span>
                      <button
                        style={{
                          fontSize: "medium",
                          color: "rgba(59, 50, 179)",
                        }}
                        onClick={() => handleDelete(exp._id)}
                      >
                        <FaTrash style={{ color: "#b54141" }} />
                      </button>
                    </h3>
                  </div>
                  <div className="border-t border-gray-300">
                    <dl>
                      <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Organization
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {exp.organization}
                        </dd>
                        <dt className="text-sm font-medium text-gray-500">
                          Work role
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {exp.profile}
                        </dd>
                      </div>
                      <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Start Date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {exp.startdate}
                        </dd>

                        <dt className="text-sm font-medium text-gray-500">
                          End date
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {exp.enddate}
                        </dd>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                          Location
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {exp.location}
                        </dd>
                        <dt className="text-sm font-medium text-gray-500">
                          Description
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                          {exp.description}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      )}
    </div>
    </>
  );
};

export default ExperienceTable;
