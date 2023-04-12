import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./css/POR.css";
import AuthorInput from "./AuthorHandler";

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
      .get(`http://localhost:4000/publications/${user}`)
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
      .post(`http://localhost:4000/publications/${user}`, formData2)
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
      .put(`http://localhost:4000/publications/${selectedPublication._id}`, formData)
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

  const handleAuthorChange2 = (event, index) => {
    const newAuthors = [...formData2.authorlist];
    newAuthors[index] = event.target.value;
    const newFormData = { ...formData2, authorlist: newAuthors };
    setFormData2(newFormData);
  }
  const addNewAuthor2 = () => {
    const newAuthors = [...formData2.authorlist, ""];
    const newFormData = { ...formData2, authorlist: newAuthors };
    setFormData2(newFormData);
  }
  
  const handleAuthorChange = (event, index) => {
    const { name, value } = event.target;
    const newAuthors = [...formData.authorlist];
    newAuthors[index][name] = value;
    console.log("Yha par" + JSON.stringify(newAuthors));
    setFormData({ ...formData, authorlist: newAuthors });
  };

  const handleAddAuthor = () => {
    const newAuthors = [...formData.authorlist, { author: "", author_id: "" }];
    setFormData({ ...formData, authorlist: newAuthors });
  };

  const handleDeleteAuthor = (index) => {
    const newAuthors = [...formData.authorlist];
    newAuthors.splice(index, 1);
    setFormData({ ...formData, authorlist: newAuthors });
  };
  
  // Handler for deleting an publication
  const handleAdd = () => {
    setShowAddForm(true);
  };
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/publications/${id}`)
      .then((res) => {
        const updatedPublication = publication.filter((pub) => pub._id !== id);
        setPublication(updatedPublication);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="userProfile">
      <div className="parent">
        <div className="left">
          <h3 className="basic">Publications</h3>
        </div>
        <div className="right">
          <button className="addNewButton" onClick={handleAdd}>
            Add Publication
          </button>
        </div>
      </div>
      <br />
      {showAddForm && (
        <form className="userProfileData" onSubmit={handleAddSubmit}>
          <table>
            <h4>Add Publication</h4>
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
              <label htmlFor="authorlist">Authors:</label>
              {formData.authorlist.map((author, index) => (
                <input
                  type="text"
                  value={author}
                  onChange={(event) => handleAuthorChange2(event, index)}
                />
              ))}
              <button onClick={addNewAuthor2}>Add author</button>
            </tr>
            <tr>
              <td>
                <label htmlFor="abstract">Abstract:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="abstract"
                  value={formData2.abstract}
                  onChange={handleChange2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="volume">Volume:</label>
              </td>
              <td>
                <input
                  type="number"
                  name="volume"
                  value={formData2.volume}
                  onChange={handleChange2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="pages">Pages:</label>
              </td>
              <td>
              <input
                  type="number"
                  name="pages"
                  value={formData2.pages}
                  onChange={handleChange2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="journal">Journal Name:</label>
              </td>
              <td>
              <input
                  type="text"
                  name="journal"
                  value={formData2.journal}
                  onChange={handleChange2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="publisher">Publisher:</label>
              </td>
              <td>
              <input
                  type="text"
                  name="publisher"
                  value={formData2.publisher}
                  onChange={handleChange2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="doi">Digital Object Identifier:</label>
              </td>
              <td>
              <input
                  type="text"
                  name="doi"
                  value={formData2.doi}
                  onChange={handleChange2}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="url">URL Link:</label>
              </td>
              <td>
              <input
                  type="text"
                  name="url"
                  value={formData2.url}
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
      {publication.map((pub) =>
        selectedPublication === pub && showEditForm ? (
          <>
            <form className="userProfileData" onSubmit={handleEditSubmit}>
          <table>
            <h4>Edit Publication</h4>
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
            {formData.authorlist.map((author, index) => (
        <AuthorInput
        formData = {formData}
          key={index}
          author={author}
          index={index}
          onChange={(event) => handleAuthorChange(event, index)}
          onDelete={handleDeleteAuthor}
        />
      ))}

      <button type="button" onClick={handleAddAuthor}>
        Add Author
      </button>
            </tr>
            <tr>
              <td>
                <label htmlFor="abstract">Abstract:</label>
              </td>
              <td>
                <input
                  type="text"
                  name="abstract"
                  value={formData.abstract}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="volume">Volume:</label>
              </td>
              <td>
                <input
                  type="number"
                  name="volume"
                  value={formData.volume}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="pages">Pages:</label>
              </td>
              <td>
              <input
                  type="number"
                  name="pages"
                  value={formData.pages}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="journal">Journal Name:</label>
              </td>
              <td>
              <input
                  type="text"
                  name="journal"
                  value={formData.journal}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="publisher">Publisher:</label>
              </td>
              <td>
              <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="doi">Digital Object Identifier:</label>
              </td>
              <td>
              <input
                  type="text"
                  name="doi"
                  value={formData.doi}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="url">URL Link:</label>
              </td>
              <td>
              <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button
                  className="closeButton"
                  onClick={() => setShowEditForm(false)}
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
          </>
        ) : (
          <>
            <div className="parent">
              <div className="left">
                <h4>{pub.title}</h4>
              </div>
              <div className="right">
                <button
                  className="editButton"
                  onClick={() => {
                    setSelectedPublication(pub);
                    setFormData(pub);
                    setShowEditForm(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="closeButton"
                  onClick={() => handleDelete(pub._id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <hr />
            <div className="userProfileData">
              <table>
                <tr>
                  <td>Author List </td>
                  <td>:</td>
                  <td>{pub.authorlist[0]?.author}</td>
                </tr>
                <tr>
                  <td>Journal </td>
                  <td>:</td>
                  <td>{pub.journal}</td>
                </tr>
                <tr>
                  <td>Volume Number</td>
                  <td>:</td>
                  <td>{pub.volume}</td>
                </tr>
                <tr>
                  <td>Number of Pages</td>
                  <td>:</td>
                  <td>{pub.pages}</td>
                </tr>
                <tr>
                  <td>Publisher</td>
                  <td>:</td>
                  <td>{pub.publisher}</td>
                </tr>
                <tr>
                  <td>Digitl Object Identifier</td>
                  <td>:</td>
                  <td>{pub.doi}</td>
                </tr>
                <tr>
                  <td>URL Link</td>
                  <td>:</td>
                  <td>{pub.url}</td>
                </tr>
              </table>
            </div>
          </>
        )
      )}
    </div>
  );
};

export default Publication;
