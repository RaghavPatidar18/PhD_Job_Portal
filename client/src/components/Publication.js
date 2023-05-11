import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./css/Personal.css";
import { FaTrash, FaEdit, FaPen } from "react-icons/fa";
import noDataImage from "./NotFound.jpg";
const Publication = ({ user, type }) => {
  const bottomRef = useRef(null);
  const [publication, setPublication] = useState([]);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    authorlist: [],
    abstract: "",
    journal: "",
    volume: "",
    pages: "",
    publisher: "",
    doi: "",
    url: "",
  });
  const [formData2, setFormData2] = useState({
    title: "",
    authorlist: [],
    abstract: "",
    journal: "",
    volume: "",
    pages: "",
    publisher: "",
    doi: "",
    url: "",
  });

  // Fetch all experiences on component mount
  useEffect(() => {
    axios
      .get(`/publications/${user}`)
      .then((res) => {
        console.log(res);
        setPublication(res.data);
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
      .post(`/publications/${user}`, formData2)
      .then((res) => {
        setPublication([...publication, res.data]);
        setShowAddForm(false);
        setFormData2({
          title: "",
          authorlist: [],
          abstract: "",
          journal: "",
          volume: "",
          pages: "",
          publisher: "",
          doi: "",
          url: "",
        });
      })
      .catch((err) => console.error(err));
  };

  // Handler for submitting edit experience form
  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `/publications/${selectedPublication._id}`,
        formData
      )
      .then((res) => {
        const index = publication.findIndex((pub) => pub._id === res.data._id);
        setPublication([
          ...publication.slice(0, index),
          res.data,
          ...publication.slice(index + 1),
        ]);
        setShowEditForm(false);
        setSelectedPublication(null);
        setFormData({
          title: "",
          authorlist: "",
          abstract: "",
          journal: "",
          volume: "",
          pages: "",
          publisher: "",
          doi: "",
          url: "",
        });
      })
      .catch((err) => console.error(err));
  };

  // Handler for deleting an publication
  const handleAdd = () => {
    setShowAddForm(true);
  };
  const handleDelete = (id) => {
    axios
      .delete(`/publications/${id}`)
      .then((res) => {
        const updatedPublication = publication.filter((pub) => pub._id !== id);
        setPublication(updatedPublication);
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
              Publications
            </h3>
          </div>
          <div className="right">
            <button className="addNewButton" onClick={handleAdd}>
              Add Publication
            </button>
          </div>
        </div>

        <hr></hr>
        {publication.length === 0 && !showAddForm ? (
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
                  >No publications were found</h3>
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
                    Add new publication
                  </h3>
                </div>
                <form className="border-t border-gray-300" onSubmit={handleAddSubmit}>
                  <dl>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Title/Topic of publication<span style={{ color: "#ff0000" }}> *</span>
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
                      <dt className="text-sm font-medium text-gray-500">
                        Give a breif abstract<span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="abstract"
                          value={formData2.abstract}
                          onChange={handleChange2}
                          required
                        />
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Volumes published<span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="number"
                          name="volume"
                          value={formData2.volume}
                          onChange={handleChange2}
                          required
                        />
                      </dd>

                      <dt className="text-sm font-medium text-gray-500">
                        Number of pages<span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="number"
                          name="pages"
                          value={formData2.pages}
                          onChange={handleChange2}
                          required
                        />
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Name of journal<span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="journal"
                          value={formData2.journal}
                          onChange={handleChange2}
                          required
                        />
                      </dd>
                      <dt className="text-sm font-medium text-gray-500">
                        Details of Publisher<span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="publisher"
                          value={formData2.publisher}
                          onChange={handleChange2}
                          required
                        />
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Digital Object Identifier<span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="doi"
                          value={formData2.doi}
                          onChange={handleChange2}
                          required
                        />
                      </dd>
                      <dt className="text-sm font-medium text-gray-500">
                        Give a URL link<span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          name="url"
                          value={formData2.url}
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
        {publication.map((pub) =>
          selectedPublication === pub && showEditForm ? (
            <>
              <div className="userProfile">
                <div
                  style={{ width: "100%", marginLeft: "0" }}
                  className="flex my-10 mx-20"
                >
                  <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="flex space-x-3 px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        {pub.title}
                        <span style={{ marginLeft: "1.5rem" }}></span>
                        <button
                          style={{
                            fontSize: "medium",
                            color: "rgba(59, 50, 179)",
                          }}
                          onClick={() => {
                            setSelectedPublication(pub);
                            setFormData(pub);
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
                          onClick={() => handleDelete(pub._id)}
                        >
                          <FaTrash style={{ color: "#b54141" }} />
                        </button>
                      </h3>
                    </div>
                    <form className="border-t border-gray-300" onSubmit={handleEditSubmit}>
                      <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Topic of publication<span style={{ color: "#ff0000" }}> *</span>
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
                          <dt className="text-sm font-medium text-gray-500">
                            Abstract<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              name="abstract"
                              value={formData.abstract}
                              onChange={handleChange}
                              required
                            />
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Volumes published<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="number"
                              name="volume"
                              value={formData.volume}
                              onChange={handleChange}
                              required
                            />
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Page count<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="number"
                              name="pages"
                              value={formData.pages}
                              onChange={handleChange}
                              required
                            />
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Journal Name<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              name="journal"
                              value={formData.journal}
                              onChange={handleChange}
                              required
                            />
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">
                            Publisher<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              name="publisher"
                              value={formData.publisher}
                              onChange={handleChange}
                              required
                            />
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Digital Object Identifier<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              name="doi"
                              value={formData.doi}
                              onChange={handleChange}
                              required
                            />
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">
                            URL Link<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              name="url"
                              value={formData.url}
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
                                setSelectedPublication("");
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
                        {pub.title}
                        <span style={{ marginLeft: "1.5rem" }}></span>
                        <button
                          style={{
                            fontSize: "medium",
                            color: "rgba(59, 50, 179)",
                          }}
                          onClick={() => {
                            setSelectedPublication(pub);
                            setFormData(pub);
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
                          onClick={() => handleDelete(pub._id)}
                        >
                          <FaTrash style={{ color: "#b54141" }} />
                        </button>
                      </h3>
                    </div>
                    <div className="border-t border-gray-300">
                      <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Topic of publication
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {pub.title}
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">
                            Abstract
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {pub.abstract}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Volumes published
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {pub.volume}
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Page count
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {pub.pages}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Journal Name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {pub.journal}
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">
                            Publisher Details
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {pub.publisher}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Digital Object Identifier
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {pub.doi}
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">
                            URL Link
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {pub.url}
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

export default Publication;
