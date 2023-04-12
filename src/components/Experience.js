import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./css/Experience.css";
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
      .get(`http://localhost:4000/experiences/${user}`)
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
      .post(`http://localhost:4000/experiences/${user}`, formData2)
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
        `http://localhost:4000/experiences/${selectedExperience._id}`,
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
      .delete(`http://localhost:4000/experiences/${id}`)
      .then((res) => {
        const updatedExperiences = experiences.filter((exp) => exp._id !== id);
        setExperiences(updatedExperiences);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="userProfile">
      <div className="parent">
        <div className="left">
          <h3 className="basic">Work Experience</h3>
        </div>
        <div className="right">
          <button className="addNewButton" onClick={handleAdd}>
            Add Experience
          </button>
        </div>
      </div>
    <br/>
    {showAddForm && (
        <form className="userProfileData" onSubmit={handleAddSubmit}>
          <table>
            <h4>Add Experience</h4>
            <tr>
              <td>
                <label htmlFor="profile">Title:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="profile"
                  value={formData2.profile}
                  onChange={handleChange2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="organization">Organization:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="organization"
                  value={formData2.organization}
                  onChange={handleChange2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="startdate">Start Date:</label>
              </td>
              <td>
                <input
                  type="date"
                  name="startdate"
                  value={formData2.startdate}
                  onChange={handleChange2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="enddate">End Date:</label>
              </td>
              <td>
                <input
                  type="date"
                  name="enddate"
                  value={formData2.enddate}
                  onChange={handleChange2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="description">Description:</label>
              </td>
              <td>
                <textarea
                  name="description"
                  value={formData2.description}
                  onChange={handleChange2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="location">Location:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="location"
                  value={formData2.location}
                  onChange={handleChange2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button className="closeButton" onClick={() => setShowAddForm(false)}>
                  Cancel
                </button>
              </td>
              <td>
                <button className = "addNewButton" type="submit">Save</button>
              </td>
            </tr>
          </table>
        </form>
      
      )}
      {experiences.map((exp) => (
        (selectedExperience === exp && showEditForm) ? (
          <>
            <form className="userProfileData" onSubmit={handleEditSubmit}>
            <table>
            <h4>Edit Experience</h4>
            <tr>
              <td>
                <label htmlFor="profile">Title:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="profile"
                  value={formData.profile}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="organization">Organization:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="startdate">Start Date:</label>
              </td>
              <td>
                <input
                  type="date"
                  name="startdate"
                  value={formData.startdate}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="enddate">End Date:</label>
              </td>
              <td>
                <input
                  type="date"
                  name="enddate"
                  value={formData.enddate}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="description">Description:</label>
              </td>
              <td>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="location">Location:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setShowEditForm(false)}>
              Cancel
            </button>
          </table>
        </form>
            </>) : (
              <>
              <div className="parent">
            <div className="left">
              <h4>{exp.profile}</h4>
            </div>
            <div className="right">
              <button
                className="editButton"
                onClick={() => {
                  setSelectedExperience(exp);
                  setFormData(exp);
                  setShowEditForm(true);
                }}
              >
                Edit
              </button>
              <button
                className="closeButton"
                onClick={() => handleDelete(exp._id)}
              >
                Delete
              </button>
            </div>
          </div>
          <hr />
          <div className="userProfileData">
            <table>
              <tr>
                <td>Organization </td>
                <td>:</td>
                <td>{exp.organization}</td>
              </tr>
              <tr>
                <td>Start Date </td>
                <td>:</td>
                <td>{exp.startdate}</td>
              </tr>
              <tr>
                <td>End date</td>
                <td>:</td>
                <td>{exp.enddate}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>:</td>
                <td>{exp.location}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>:</td>
                <td>{exp.description}</td>
              </tr>
            </table>
          </div>
          </>
          )
        
      ))}


      
    </div>
  );
};

export default ExperienceTable;
