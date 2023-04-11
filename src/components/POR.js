import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./css/POR.css";
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
      .get(`http://localhost:4000/por/${user}`)
      .then((res) => {
        console.log(res);
        setPor(res.data);
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
      .post(`http://localhost:4000/por/${user}`, formData2)
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
      .put(`http://localhost:4000/por/${selectedPor._id}`, formData)
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
      .delete(`http://localhost:4000/por/${id}`)
      .then((res) => {
        const updatedPor = por.filter((pp) => pp._id !== id);
        setPor(updatedPor);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="userProfile">
      <div className="parent">
        <div className="left">
          <h3 className="basic">Positions of Responsibility</h3>
        </div>
        <div className="right">
          <button className="addNewButton" onClick={handleAdd}>
            Add POR
          </button>
        </div>
      </div>
      <br />
      {showAddForm && (
        <form className="userProfileData" onSubmit={handleAddSubmit}>
          <table>
            <h4>Add POR</h4>
            <tr>
              <td>
                <label htmlFor="title">Title:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="title"
                  value={formData2.title}
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
                <button
                  className="closeButton"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </button>
              </td>
              <td>
                <button className="addNewButton" type="submit">
                  Save
                </button>
              </td>
            </tr>
          </table>
        </form>
      )}
      {por.map((pp) =>
        selectedPor === pp && showEditForm ? (
          <>
            <form className="userProfileData" onSubmit={handleEditSubmit}>
              <table>
                <h4>Edit Experience</h4>
                <tr>
                  <td>
                    <label htmlFor="title">Title:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
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
          </>
        ) : (
          <>
            <div className="parent">
              <div className="left">
                <h4>{pp.title}</h4>
              </div>
              <div className="right">
                <button
                  className="editButton"
                  onClick={() => {
                    setSelectedPor(pp);
                    setFormData(pp);
                    setShowEditForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="closeButton"
                  onClick={() => handleDelete(pp._id)}
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
                  <td>{pp.organization}</td>
                </tr>
                <tr>
                  <td>Start Date </td>
                  <td>:</td>
                  <td>{pp.startdate}</td>
                </tr>
                <tr>
                  <td>End date</td>
                  <td>:</td>
                  <td>{pp.enddate}</td>
                </tr>
                <tr>
                  <td>Location</td>
                  <td>:</td>
                  <td>{pp.location}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>:</td>
                  <td>{pp.description}</td>
                </tr>
              </table>
            </div>
          </>
        )
      )}

      
    </div>
  );
};

export default POR;
