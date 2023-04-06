import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Personal.css"; // import the CSS file
import { FaEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
export default function Profile({ user, type }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState();
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [mobile, setMobile] = useState("");
  const [altMobile, setAltMobile] = useState("");
  const [nationality, setNationality] = useState("");
  const [married, setMarried] = useState("");
  const [disability, setDisability] = useState("");
  const [communicationAddress, setCommunicationAddress] = useState("");
  const [communicationCity, setCommunicationCity] = useState("");
  const [communicationState, setCommunicationState] = useState("");
  const [communicationPincode, setCommunicationPincode] = useState("");
  const [permanentAddresssmall, setPermanentAddresssmall] = useState("");
  const [permanentCity, setPermanentCity] = useState("");
  const [permanentState, setPermanentState] = useState("");
  const [permanentPincode, setPermanentPincode] = useState("");
  const [permanentCountry, setPermanentCountry] = useState("");
  const [communicationCountry, setcommunicationCountry] = useState("");

  const url = `http://localhost:4000/personal/${user}`;
  useEffect(() => {
    axios.get(url).then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        const myData = response.data.personals[0];
        var permanentAddress;
        var currentAddress;
        if (myData.permanent_address === "-") {
          permanentAddress = "-";
        } else {
          permanentAddress =
            myData.permanent_address +
            ", " +
            myData.permanent_city +
            ", " +
            myData.permanent_state +
            " (" +
            myData.permanent_pincode +
            ", " +
            myData.permanent_country +
            ")";
        }
        if (myData.communication_address === "-") {
          currentAddress = "-";
        } else {
          currentAddress =
            myData.communication_address +
            ", " +
            myData.communication_city +
            ", " +
            myData.communication_state +
            ", " +
            myData.communication_country +
            " (" +
            myData.communication_pincode +
            ")";
        }
        setcommunicationCountry(myData.communication_country);
        setPermanentCountry(myData.permanent_country);
        setCommunicationAddress(myData.communication_address);
        setCommunicationCity(myData.communication_city);
        setCommunicationState(myData.communication_state);
        setCommunicationPincode(myData.communication_pincode);
        setPermanentAddresssmall(myData.permanent_address);
        setPermanentCity(myData.permanent_city);
        setPermanentPincode(myData.permanent_pincode);
        setPermanentState(myData.permanent_state);
        setAge(myData.age);
        setGender(myData.gender);
        setPermanentAddress(permanentAddress);
        setCurrentAddress(currentAddress);
        setName(myData.name);
        setCategory(myData.category);
        setDob(myData.dob);
        setAltMobile(myData.altmobile);
        setMobile(myData.mobile);
        setFatherName(myData.fathername);
        setNationality(myData.nationality);
        setMarried(myData.married);
        setDisability(myData.disablity);

        setFormValues({
          name: myData.name,
          age: myData.age === "-" ? "" : myData.age,
          dob: myData.dob === "-" ? "" : myData.dob,
          gender: myData.gender === "-" ? "" : myData.gender,
          category: myData.category === "-" ? "" : myData.category,
          fathername: myData.fathername === "-" ? "" : myData.fatherName,
          nationality: myData.nationality === "-" ? "" : myData.nationality,
          communication_address:
            myData.communication_address === "-"
              ? ""
              : myData.communication_address,
          communication_city:
            myData.communication_city === "-" ? "" : myData.communication_city,
          communication_state:
            myData.communication_state === "-"
              ? ""
              : myData.communication_state,
          communication_pincode:
            myData.communication_pincode == "-"
              ? ""
              : myData.communication_pincode,
          permanent_address:
            myData.permanent_address === "-" ? "" : myData.permanent_address,
          permanent_city:
            myData.permanent_city === "-" ? "" : myData.permanent_city,
          permanent_state:
            myData.permanent_state === "-" ? "" : myData.permanent_state,
          permanent_pincode:
            myData.permanent_pincode == "-" ? "" : myData.permanent_pincode,
          permanent_country:
            myData.permanent_country == "-" ? "" : myData.permanent_country,
          communication_country:
            myData.communication_country == "-"
              ? ""
              : myData.communication_country,

          mobile: myData.mobile === "-" ? "" : myData.mobile,
          altmobile: myData.altmobile === "-" ? "" : myData.altMobile,
          disability: myData.disability === "-" ? "" : myData.disablity,
        });
      }
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // save into database
    
    setIsEditMode(false);
  };
  const handleEdit = () => {
    setIsEditMode(true);
  };
  const handleClose = () => {
    setIsEditMode(false);
  };
  const [formValues, setFormValues] = useState({
    name: name,
    fathername: fatherName,
    age: age,
    dob: dob,
    category: category,
    disability: disability,
    married: married,
    nationality: nationality,
    gender: gender,
    communication_address: communicationAddress,
    communication_city: communicationCity,
    communication_state: communicationState,
    communication_pincode: communicationPincode,
    permanent_address: permanentAddresssmall,
    permanent_city: permanentCity,
    permanent_state: permanentState,
    permanent_pincode: permanentPincode,
    permanent_country: permanentCountry,
    communication_country: communicationCountry,
    mobile: mobile,
    altmobile: altMobile,
  });
  return (
    <>
      {console.log("acha" + user)}
      <div className="userProfile">
        <div className="parent">
          <div className="left">
            <h4 className="basic">Basic Details</h4>
          </div>
          <div className="right">
            {isEditMode ? (
              <>
                <button className="editButtonDisabled" onClick={handleClose}>
                  {" "}
                  <IoClose />
                  <span style={{ paddingLeft: "0.5rem" }}></span>Close
                </button>
              </>
            ) : (
              <>
                <button className="editButton" onClick={handleEdit}>
                  {" "}
                  <FaEdit />
                  <span style={{ paddingLeft: "0.5rem" }}></span>Edit
                </button>
              </>
            )}
          </div>
        </div>
        <hr style={{ borderWidth: "2px" }} />
        {!isEditMode ? (
          <>
            <div className="userProfileData">
              <table>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>Full Name : </td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>Age : </td>
                  <td>{age}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>
                    Date of Birth :{" "}
                  </td>
                  <td>{dob}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>Gender : </td>
                  <td>{gender}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>Category : </td>
                  <td>{category}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>
                    Permanent Address :{" "}
                  </td>
                  <td>{permanentAddress}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>
                    Current Address :{" "}
                  </td>
                  <td>{currentAddress}</td>
                </tr>

                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>
                    Father's Name :{" "}
                  </td>
                  <td>{fatherName}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>
                    Mobile Number :{" "}
                  </td>
                  <td>{mobile}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>
                    Alternate Mobile Number :{" "}
                  </td>
                  <td>{altMobile}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>Nationality : </td>
                  <td>{nationality}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>
                    Martial Status :{" "}
                  </td>
                  <td>{married}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>
                    Disablity (if any) :{" "}
                  </td>
                  <td>{disability}</td>
                </tr>
              </table>
            </div>
          </>
        ) : (
          <div id="popup-form">
            <form className="userProfileData" onSubmit={handleSubmit}>
              <table>
                <hr />
                <h4>About</h4>
                <hr />
                <tr>
                  <td>
                    <label htmlFor="name">My name:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formValues.name}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="age">Age:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="age"
                      name="age"
                      required
                      pattern="[0-9]{1,3}"
                      value={formValues.age}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="dob">Date of Birth:</label>
                  </td>
                  <td>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      required
                      value={formValues.dob}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="gender">Gender:</label>
                  </td>
                  <td>
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={formValues.gender}
                      onChange={handleInputChange}
                    >
                      <option value="">Please select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="category">Category:</label>
                  </td>
                  <td>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formValues.category}
                      onChange={handleInputChange}
                    >
                      <option value="">Please select</option>
                      <option value="General">General</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="OBC">OBC</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="fathername">Father's Name:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="fathername"
                      name="fathername"
                      required
                      value={formValues.fathername}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="nationality">Nationality:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="nationality"
                      name="nationality"
                      required
                      value={formValues.nationality}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>

                <hr />
                <h4>Communication Details</h4>
                <hr />
                <tr>
                  <td>
                    <label htmlFor="communication_address">Address:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="communication_address"
                      name="communication_address"
                      required
                      value={formValues.communication_address}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="communication_country">Country:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="communication_country"
                      name="communication_country"
                      required
                      value={formValues.communication_country}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="communication_state">State:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="communication_state"
                      name="communication_state"
                      required
                      value={formValues.communication_state}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="communication_city">City:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="communication_city"
                      name="communication_city"
                      required
                      value={formValues.communication_city}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="communication_pincode">Pincode:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="communication_pincode"
                      name="communication_pincode"
                      required
                      value={formValues.communication_pincode}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <hr />
                <h4>Permanent Address</h4>
                <hr />
                <tr>
                  <td>
                    <label htmlFor="permanent_address">Address:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="permanent_address"
                      name="permanent_address"
                      required
                      value={formValues.permanent_address}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="permanent_country">Country:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="permanent_country"
                      name="permanent_country"
                      required
                      value={formValues.permanent_country}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="permanent_state">State:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="permanent_state"
                      name="permanent_state"
                      required
                      value={formValues.permanent_state}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="permanent_city">City:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="permanent_city"
                      name="permanent_city"
                      required
                      value={formValues.permanent_city}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="permanent_pincode">Pincode:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="permanent_pincode"
                      name="permanent_pincode"
                      required
                      value={formValues.permanent_pincode}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <hr />
                <h4>Contact</h4>
                <hr />
                <tr>
                  <td>
                    <label htmlFor="mobile">Mobile Number:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="mobile"
                      name="mobile"
                      required
                      value={formValues.mobile}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="altmobile">Alternate Mobile Number:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="altmobile"
                      name="altmobile"
                      value={formValues.altmobile}
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <hr />
                <h4>Other details</h4>
                <hr />
                <tr>
                  <td>
                    <label htmlFor="disability">Disability:</label>
                  </td>
                  <td>
                    <select
                      defaultValue={formValues.disability}
                      id="disability"
                      name="disability"
                      required
                      value={formValues.disability}
                      onChange={handleInputChange}
                    >
                      <option value="">Please select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td>
                    <label htmlFor="married">Marital Status:</label>
                  </td>
                  <td>
                    <select
                      id="married"
                      name="married"
                      required
                      value={formValues.married}
                      onChange={handleInputChange}
                    >
                      <option value="">Please select</option>
                      <option value="Married">Married</option>
                      <option value="Unmarried">Unmarried</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  </td>
                </tr>
                <hr />
                <button type="submit">Submit</button>
              </table>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
