import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./css/Personal.css";
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
      .get(`http://localhost:4000/references/${user}`)
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
      .post(`http://localhost:4000/references/${user}`, formData2)
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
      .put(
        `http://localhost:4000/references/${selectedReferences._id}`,
        formData
      )
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
      .delete(`http://localhost:4000/references/${id}`)
      .then((res) => {
        const updatedReferences = references.filter((ref) => ref._id !== id);
        setReferences(updatedReferences);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="userProfile">
      <div className="parent">
        <div className="left">
          <h3 className="basic">References</h3>
        </div>
        <div className="right">
          <button className="addNewButton" onClick={handleAdd}>
            Add Reference
          </button>
        </div>
      </div>
      <br />
      {showAddForm && (
        <div className="userProfileData">
        <form className="addExperienceForm" onSubmit={handleAddSubmit}>
          <table>
            <h4>Add Reference</h4>
            <hr/>
            <tr>
              <td>
                <label htmlFor="profile">Name:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="name"
                  value={formData2.name}
                  onChange={handleChange2}
                  required
                />
              </td>
            </tr>
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
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="affliliation">Affliliation:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="affliliation"
                  value={formData2.affliliation}
                  onChange={handleChange2}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="referenceemail">Email:</label>
              </td>
              <td>
                <input
                  type="email"
                  name="referenceemail"
                  value={formData2.referenceemail}
                  onChange={handleChange2}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="referencephone">Phone:</label>
              </td>
              <td>
                <input
                type="number"
                  name="referencephone"
                  value={formData2.referencephone}
                  onChange={handleChange2}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="relationship">Relation:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="relationship"
                  value={formData2.relationship}
                  onChange={handleChange2}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="description">Description:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="description"
                  value={formData2.description}
                  onChange={handleChange2}
                  required
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
        <br/>
        <br/>
        </div>
      )}
      
      {references.map((ref) =>
        selectedReferences === ref && showEditForm ? (
          <>
          <div className="userProfileData">
            <form className="editExperienceForm" onSubmit={handleEditSubmit}>
              <table>
                <h4>Edit Reference</h4>
                <hr/>
                <tr>
                  <td>
                    <label htmlFor="profile">Name:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
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
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="affliliation">Affliliation:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="affliliation"
                      value={formData.affliliation}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="referenceemail">Email ID :</label>
                  </td>
                  <td>
                    <input
                      type="email"
                      name="referenceemail"
                      value={formData.referenceemail}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="referencephone">Contact Number:</label>
                  </td>
                  <td>
                  <input
                      type="number"
                      name="referencephone"
                      value={formData.referencephone}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="relationship">Relationship:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="relationship"
                      value={formData.relationship}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="description">Description:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td>

                <button className= "closeButton"type="button" onClick={() => setShowEditForm(false)}>
                  Cancel
                </button>
                  </td>
                  <td>

                <button className= "addNewButton"type="submit">Save</button>
                  </td>
                </tr>
              </table>
            </form>
            <br/>
            <br/>
          </div>
          </>
        ) : (
          <>
            <div className="parent">
              <div className="left">
                <h4>{ref.name}</h4>
              </div>
              <div className="right">
                <button
                  className="editButton"
                  onClick={() => {
                    setSelectedReferences(ref);
                    setFormData(ref);
                    setShowEditForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="closeButton"
                  onClick={() => handleDelete(ref._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <hr />
            <div className="userProfileData">
              <table>
                <tr>
                  <td>Title </td>
                  <td>:</td>
                  <td>{ref.title}</td>
                </tr>
                <tr>
                  <td>Affliliation </td>
                  <td>:</td>
                  <td>{ref.affliliation}</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>:</td>
                  <td>{ref.referenceemail}</td>
                </tr>
                <tr>
                  <td>Phone Number</td>
                  <td>:</td>
                  <td>{ref.referencephone}</td>
                </tr>
                <tr>
                  <td>Relation</td>
                  <td>:</td>
                  <td>{ref.relationship}</td>
                </tr>
                <tr>
                  <td>Description</td>
                  <td>:</td>
                  <td>{ref.description}</td>
                </tr>
              </table>
            </div>
            <br/>
            <br/>
          </>
        )
      )}

      
    </div>
  );
};

export default ExperienceTable;
