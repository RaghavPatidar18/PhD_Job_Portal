import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./css/Personal.css";
import { FaTrash, FaEdit, FaPen } from "react-icons/fa";
import noDataImage from "./NotFound.jpg";
const ExperienceTable = ({ user, type }) => {
  const bottomRef = useRef(null);
  const [references, setReferences] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedReferences, setSelectedReferences] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    affliliation: "",
    referenceemail: "",
    referencephone: "",
    relationship: "",
    description: "",
  });
  const [formData2, setFormData2] = useState({
    name: "",
    title: "",
    affliliation: "",
    referenceemail: "",
    referencephone: "",
    relationship: "",
    description: "",
  });

  // Fetch all experiences on component mount
  useEffect(() => {
    axios
      .get(`/references/${user}`)
      .then((res) => {
        console.log(res);
        setReferences(res.data);
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
      .post(`/references/${user}`, formData2)
      .then((res) => {
        setReferences([...references, res.data]);
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
      .put(`/references/${selectedReferences._id}`, formData)
      .then((res) => {
        const index = references.findIndex((ref) => ref._id === res.data._id);
        setReferences([
          ...references.slice(0, index),
          res.data,
          ...references.slice(index + 1),
        ]);
        setShowEditForm(false);
        setSelectedReferences(null);
        setFormData({
          name: "",
          title: "",
          affliliation: "",
          referenceemail: "",
          referencephone: "",
          relationship: "",
          description: "",
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
      .delete(`/references/${id}`)
      .then((res) => {
        const updatedReferences = references.filter((ref) => ref._id !== id);
        setReferences(updatedReferences);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div
        style={{ width: "100%", marginLeft: "1rem" }}
        className="userProfile"
      >
        <div className="parent" style={{ marginLeft: "3rem" }}>
          <div className="left">
            <h3
              style={{ fontWeight: "400" }}
              className="text-xxlg leading-6 font-large text-gray-900"
            >
              References
            </h3>
          </div>
          <div className="right">
            <button className="addNewButton" onClick={handleAdd}>
              Add Reference
            </button>
          </div>
        </div>

        <hr></hr>
        {references.length === 0 && !showAddForm ? (
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
                No references are added yet
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
                    Add new reference
                  </h3>
                </div>
                <form
                  className="border-t border-gray-300"
                  onSubmit={handleAddSubmit}
                >
                  <dl>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Referal person name
                        <span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="name"
                          value={formData2.name}
                          onChange={handleChange2}
                          required
                        />
                      </dd>
                      <dt className="text-sm font-medium text-gray-500">
                        Work Title<span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="title"
                          value={formData2.title}
                          onChange={handleChange2}
                          required
                        />
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Affliliation<span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="affliliation"
                          value={formData2.affliliation}
                          onChange={handleChange2}
                          required
                        />
                      </dd>

                      <dt className="text-sm font-medium text-gray-500">
                        Email Id of Referral
                        <span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="email"
                          name="referenceemail"
                          value={formData2.referenceemail}
                          onChange={handleChange2}
                          required
                        />
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Contact Number
                        <span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="number"
                          name="referencephone"
                          value={formData2.referencephone}
                          onChange={handleChange2}
                          required
                        />
                      </dd>
                      <dt className="text-sm font-medium text-gray-500">
                        Relation with person
                        <span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="relationship"
                          value={formData2.relationship}
                          onChange={handleChange2}
                          required
                        />
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Description of work
                        <span style={{ color: "#ff0000" }}> *</span>
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
        {references.map((ref) =>
          selectedReferences === ref && showEditForm ? (
            <>
              <div className="userProfile">
                <div
                  style={{ width: "100%", marginLeft: "0" }}
                  className="flex my-10 mx-20"
                >
                  <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="flex space-x-3 px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Editting {ref.name}'s reference
                        <span style={{ marginLeft: "1.5rem" }}></span>
                        <button
                          style={{
                            fontSize: "medium",
                            color: "rgba(59, 50, 179)",
                          }}
                          onClick={() => {
                            setSelectedReferences(ref);
                            setFormData(ref);
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
                          onClick={() => handleDelete(ref._id)}
                        >
                          <FaTrash style={{ color: "#b54141" }} />
                        </button>
                      </h3>
                    </div>
                    <form className="border-t border-gray-300" onSubmit={handleEditSubmit}>
                      <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Referal person name<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">
                            Work Title<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                              required
                            />
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Affliliation<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              name="affliliation"
                              value={formData.affliliation}
                              onChange={handleChange}
                              required
                            />
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Email Id of Referral<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="email"
                              name="referenceemail"
                              value={formData.referenceemail}
                              onChange={handleChange}
                              required
                            />
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Contact Number<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="number"
                              name="referencephone"
                              value={formData.referencephone}
                              onChange={handleChange}
                              required
                            />
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">
                            Relation with person<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              name="relationship"
                              value={formData.relationship}
                              onChange={handleChange}
                              required
                            />
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Description of work<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
             q               <input
                              type="text"
                              name="description"
                              value={formData.description}
                              onChange={handleChange}
                              required
                            />
                          </dd>
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
                                setShowEditForm(false);
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
                        {ref.title}
                        <span style={{ marginLeft: "1.5rem" }}></span>
                        <button
                          style={{
                            fontSize: "medium",
                            color: "rgba(59, 50, 179)",
                          }}
                          onClick={() => {
                            setSelectedReferences(ref);
                            setFormData(ref);
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
                          onClick={() => handleDelete(ref._id)}
                        >
                          <FaTrash style={{ color: "#b54141" }} />
                        </button>
                      </h3>
                    </div>
                    <div className="border-t border-gray-300">
                      <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Referal person name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {ref.name}
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">
                            Work Title
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {ref.title}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Affliliation
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {ref.affliliation}
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Email Id of Referral
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {ref.referenceemail}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Contact Number
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {ref.referencephone}
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">
                            Relation with person
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {ref.relationship}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Description of work
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {ref.description}
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
