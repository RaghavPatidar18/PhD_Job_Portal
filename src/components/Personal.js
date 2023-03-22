import React, { useState , useEffect} from 'react';
import axios from 'axios';
import './Personal.css'; // import the CSS file

export default function UserProfile() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const [gender, setGender] = useState(''); 
  const [category, setCategory] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const url = 'http://localhost:4000/personal'
  useEffect(()=>{
    axios.get(url)
    .then((response)=>{
      console.log("Yha pr h bhai " + response.data);
      if(response.status === 201){
        setAge(response.data.age);
        setGender(response.data.gender);
        setPermanentAddress(response.data.permanentAddress);
        setCurrentAddress(response.data.currentAddress);
        setName(response.data.name);
        setCategory(response.data.category);
      }
    })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    // save user profile data
    const personal = {
      age, 
      gender,
      permanentAddress, 
      currentAddress,
      category,
    }
    axios
      .post("http://localhost:4000/personal", personal)
      .then(()=>{
        console.log('Updated');
      }).catch((err)=>{
        console.log(err);
      })
    setIsEditMode(false);
  };

  const handleCancel = () => {
    // reset user profile data to previous values
    setIsEditMode(false);
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  return (
    <div className="userProfile">
      {!isEditMode ? (
        <>
          <div className="userProfileData">
            <table>
              <tr>
                <td><strong>Name: </strong></td> 
                <td>{name}</td>
              </tr>
              <tr>
                <td><strong>Age: </strong></td> 
                <td>{age}</td>
              </tr>
              <tr>
                <td><strong>Gender: </strong></td> 
                <td>{gender}</td>
              </tr>
              <tr>
                <td><strong>Category: </strong></td> 
                <td>{category}</td>
              </tr>
              <tr>
                <td><strong>Permanent Address: </strong></td> 
                <td>{permanentAddress}</td>
              </tr>
              <tr>
                <td><strong>Current Address: </strong></td> 
                <td>{currentAddress}</td>
              </tr>
            </table>
            <button className="editButton" onClick={handleEdit}>
              Edit
            </button>

          </div>
          <img
            src="https://via.placeholder.com/150"
            alt="User Profile"
            className="userProfileImage"
          />
        </>
      ) : (
        <form onSubmit={handleSubmit} className="userProfileForm">
          <table>
          <tr>
            <td>
            Name:
            </td>
            <td>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            </td>
          </tr>
          <tr>
            <td>
            Age:
            </td>
            <td>
            <input
              type="number"
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
            </td>
          </tr>
          <tr>
            <td>
            Gender:
            </td>
            <td>
            <select value={gender} onChange={(event) => setGender(event.target.value)}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            </td>
          </tr>
          <tr>
            <td>
            Category:
            </td>
            <td>
            <select value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="General">General</option>
              <option value="SC">SC</option>
              <option value="ST">ST</option>
              <option value="OBC">OBC</option>
            </select>
            </td>
          </tr>
          <tr>
            <td>
            Permanent Address:
            </td>
            <td>
            <textarea
              value={permanentAddress}
              onChange={(event) => setPermanentAddress(event.target.value)}
            />
            </td>
          </tr>
          <tr>
            <td>
            Current Address:
            </td>
            <td>
            <textarea
              value={currentAddress}
              onChange={(event) => setCurrentAddress(event.target.value)}
            />
            </td>
          </tr>
          <div className="userProfileFormButtons">
            <button type="submit" className="saveButton">Save</button>
            <button type="button" className="cancelButton"onClick={handleCancel}>
              Cancel
            </button>
          </div>
          </table>
        </form>
      )}
    </div>
  );
}
