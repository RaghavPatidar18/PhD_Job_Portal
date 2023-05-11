import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./css/Personal.css";
import { FaTrash, FaEdit, FaPen } from "react-icons/fa";
import noDataImage from './NotFound.jpg';
const POR = ({ user, type }) => {
  const bottomRef = useRef(null);
  const [por, setPor] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPor, setSelectedPor] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    title: "",
    organization: "",
    location: "",
    startdate: "",
    enddate: "",
    description: "",
  });
  const [formData2, setFormData2] = useState({
    email: "",
    title: "",
    organization: "",
    location: "",
    startdate: "",
    enddate: "",
    description: "",
  });

  // Fetch all experiences on component mount
  useEffect(() => {
    axios
      .get(`/por/${user}`)
      .then((res) => {
        console.log(res);
        setPor(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  // Handler for form input changes
  const handleChange = (e) => {
    console.log(e.target.name);
    console.log(e.target.value);
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
      .post(`/por/${user}`, formData2)
      .then((res) => {
        setPor([...por, res.data]);
        setShowAddForm(false);
        setFormData2({
          email: "",
          title: "",
          organization: "",
          location: "",
          startdate: "",
          enddate: "",
          description: "",
        });
      })
      .catch((err) => console.error(err));
  };

  // Handler for submitting edit experience form
  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`/por/${selectedPor._id}`, formData)
      .then((res) => {
        const index = por.findIndex((pp) => pp._id === res.data._id);
        setPor([...por.slice(0, index), res.data, ...por.slice(index + 1)]);
        setShowEditForm(false);
        setSelectedPor(null);
        setFormData({
          email: "",
          title: "",
          organization: "",
          location: "",
          startdate: "",
          enddate: "",
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
      .delete(`/por/${id}`)
      .then((res) => {
        const updatedPor = por.filter((pp) => pp._id !== id);
        setPor(updatedPor);
      })
      .catch((err) => console.error(err));
  };

  return (
      <div
        style={{ width: "90%" }}
        className="userProfile"
      >
        <div className="parent" >
          <div className="left">
            <h3
              style={{ fontWeight: "400" }}
              className="text-xxlg leading-6 font-large text-gray-900"
            >
              Positions of Responsibility
            </h3>
          </div>
          <div className="right">
            <button className="addNewButton" onClick={handleAdd}>
              Add POR
            </button>
          </div>
        </div>
        <hr></hr>
        {por.length === 0 && !showAddForm ? (
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
                      fontWeight : 'normal',
                      textDecoration : 'underline',
                    }}
                  >No PORs were found</h3>
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
            <div style={{ width: "100%",  marginLeft : '0' }} className="flex my-10 mx-20">
              <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="flex space-x-3 px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Add new POR
                  </h3>
                </div>
                <form className="border-t border-gray-300" onSubmit={handleAddSubmit}>
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
                        Title<span style={{ color: "#ff0000" }}> *</span>
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
        {por.map((pp) =>
          selectedPor === pp && showEditForm ? (
            <>
              <div className="userProfile">
                <div style={{ width: "90%" , marginLeft : '0'}} className="flex my-10 mx-20">
                  <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="flex space-x-3 px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {pp.title}
                        <span style={{ marginLeft: "1.5rem" }}></span>
                        <button
                          style={{
                            fontSize: "medium",
                            color: "rgba(59, 50, 179)",
                          }}
                          onClick={() => {
                            setSelectedPor(pp);
                            setFormData(pp);
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
                          onClick={() => handleDelete(pp._id)}
                        >
                          <FaTrash style={{ color: "#b54141" }} />
                        </button>
                      </h3>
                    </div>
                    <form className="border-t border-gray-300" onSubmit={handleEditSubmit}>
                      <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
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
                            Title of responsibility<span style={{ color: "#ff0000" }}> *</span>
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
                                setSelectedPor("");
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
                <div style={{ width: "90%" , marginLeft : '0'}} className="flex my-10 mx-20">
                  <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="flex space-x-3 px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {pp.title}
                        <span style={{ marginLeft: "1.5rem" }}></span>
                        <button
                          style={{
                            fontSize: "medium",
                            color: "rgba(59, 50, 179)",
                          }}
                          onClick={() => {
                            setSelectedPor(pp);
                            setFormData(pp);
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
                          onClick={() => handleDelete(pp._id)}
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
                            {pp.organization}
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">
                            Title of responsibility
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {pp.title}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Start Date
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {pp.startdate}
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            End date
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {pp.enddate}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Location
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {pp.location}
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">
                            Description
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {pp.description}
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
    
  );
};

export default POR;
