import React, { useState , useEffect} from 'react';
import axios from 'axios';
import './Personal.css'; // import the CSS file

export default function UserProfile({user,type}) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState('');
  const [age, setAge] = useState();
  const [gender, setGender] = useState('');
  const [category, setCategory] = useState('');
  const [permanentAddress, setPermanentAddress] = useState('');
  const [currentAddress, setCurrentAddress] = useState('');
  const url = `http://localhost:4000/personal/${user.email}/${type}`;
  useEffect(()=>{
    axios.get(url)
    .then((response)=>{
      console.log("Yha pr h bhai " );
      console.log(response.data);
      if(response.status === 201){
        console.log(response.data.personals);
        setAge(response.data.personals.age);
        setGender(response.data.personals.gender);
        setPermanentAddress(response.data.personals.permanentAddress);
        setCurrentAddress(response.data.personals.currentAddress);
        setName(response.data.personals.name);
        setCategory(response.data.personals.category);
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
    console.log("sebgi");
    console.log(user.email);
    console.log(type);
    axios
      .post(`http://localhost:4000/personal/${user.email}/${type}`, personal)
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
