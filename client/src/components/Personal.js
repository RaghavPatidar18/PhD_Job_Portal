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
            ", " +
            myData.permanent_country +
            " (" +
            myData.permanent_pincode +
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
        setDisability(myData.disability);

        setFormValues({
          name: myData.name,
          age: myData.age === "-" ? "" : myData.age,
          dob: myData.dob === "-" ? "" : myData.dob,
          gender: myData.gender === "-" ? "" : myData.gender,
          category: myData.category === "-" ? "" : myData.category,
          fathername: myData.fathername === "-" ? "" : myData.fathername,
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
          altmobile: myData.altmobile === "-" ? "" : myData.altmobile,
          disability: myData.disability === "-" ? "" : myData.disability,
          married: myData.married === "-" ? "" : myData.married,
        });
      }
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // save into database
    axios
      .post("http://localhost:4000/personal", { formValues, user })
      .then((response) => {
        if (response.data.status === 200) {
          alert("Your data was saved");
        } else {
          alert("Please try again later!");
        }
      });
    setIsEditMode(false);
    window.location.reload();
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
      <div className="userProfile">
        <div className="parent">
          <div className="left">
            <h3 className="basic">Basic Details</h3>
          </div>
          <div className="right">
            {isEditMode ? (
              <>
                <button className="closeButton" onClick={handleClose}>
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
        <hr style={{ maxWidth: "70rem" }} />
        {!isEditMode ? (
          <>
            <div className="userProfileData">
              <table>
                <tr>
                  <td style={{ maxWidth: "5rem" }}>
                    <h5>About</h5>
                    <hr style={{ width: "24rem" }} />
                  </td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>Full Name</td>
                  <td>:</td>
                  <td>{name}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>Age</td>
                  <td>:</td>
                  <td>{age}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>Date of Birth </td>
                  <td>:</td>
                  <td>{dob}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>Gender</td>
                  <td>:</td>
                  <td>{gender}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>Category</td>
                  <td>:</td>
                  <td>{category}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>Father's Name </td>
                  <td>:</td>
                  <td>{fatherName}</td>
                </tr>
                <br />
                <br />
                <tr>
                  <td style={{ maxWidth: "5rem" }}>
                    <h5>Communication Details</h5>
                    <hr style={{ width: "47rem" }} />
                  </td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>
                    Permanent Address{" "}
                  </td>
                  <td>:</td>
                  <td>{permanentAddress}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>
                    Current Address{" "}
                  </td>
                  <td>:</td>
                  <td>{currentAddress}</td>
                </tr>

                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>Mobile Number </td>
                  <td>:</td>
                  <td>{mobile}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>
                    Alternate Mobile Number{" "}
                  </td>
                  <td>:</td>
                  <td>{altMobile}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>Nationality</td>
                  <td>:</td>
                  <td>{nationality}</td>
                </tr>
                <br />
                <br />
                <tr>
                  <td style={{maxWidth:'10rem'}}>
                    <h5>Additional Details</h5>
                    <hr style={{width:'18rem'}}/>
                  </td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>Martial Status </td>
                  <td>:</td>
                  <td>{married}</td>
                </tr>
                <tr>
                  <td style={{ color: "rgb(83, 86, 101)" }}>
                    Disability (if any){" "}
                  </td>
                  <td>:</td>
                  <td>{disability}</td>
                </tr>
              </table>
            </div>
          </>
        ) : (
          <>
            <div className="userProfileData">
              <form
                style={{ padding: "0px", margin: "0px", fontSize: "medium" }}
                onSubmit={handleSubmit}
              >
                <table>
                  <tr>
                    <td style={{maxWidth : '5rem'}}>
                  <h4>About</h4>
                  <hr style={{width: '33rem'}}/>

                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="name">My name:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="age">Age:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="age"
                        name="age"
                        pattern="[0-9]{1,3}"
                        value={formValues.age}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="dob">Date of Birth:</label>
                    </td>
                    <td>
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formValues.dob}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="gender">Gender:</label>
                    </td>
                    <td>
                      <select
                        id="gender"
                        name="gender"
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
                      <label className="profile-label" htmlFor="category">Category:</label>
                    </td>
                    <td>
                      <select
                        id="category"
                        name="category"
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
                      <label className="profile-label" htmlFor="fathername">Father's Name:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="fathername"
                        name="fathername"
                        value={formValues.fathername}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="nationality">Nationality:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={formValues.nationality}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <br/>
                  <br />
                  <tr>
                    <td style={{maxWidth:'10rem'}}>
                      <h4>Communication Details</h4>
                      <hr style={{width:'30rem'}}/>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="communication_address">Address:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="communication_address"
                        name="communication_address"
                        value={formValues.communication_address}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="communication_country">Country:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="communication_country"
                        name="communication_country"
                        value={formValues.communication_country}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="communication_state">State:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="communication_state"
                        name="communication_state"
                        value={formValues.communication_state}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="communication_city">City:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="communication_city"
                        name="communication_city"
                        value={formValues.communication_city}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="communication_pincode">Pincode:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="communication_pincode"
                        name="communication_pincode"
                        value={formValues.communication_pincode}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <br />
                  <br />
                  <tr>
                    <td style={{maxWidth:'5rem'}}>
                  <h4>Permanent Address</h4>
                  <hr style={{width : '33rem'}}/>

                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="permanent_address">Address:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="permanent_address"
                        name="permanent_address"
                        value={formValues.permanent_address}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="permanent_country">Country:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="permanent_country"
                        name="permanent_country"
                        value={formValues.permanent_country}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="permanent_state">State:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="permanent_state"
                        name="permanent_state"
                        value={formValues.permanent_state}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="permanent_city">City:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="permanent_city"
                        name="permanent_city"
                        value={formValues.permanent_city}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="permanent_pincode">Pincode:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="permanent_pincode"
                        name="permanent_pincode"
                        value={formValues.permanent_pincode}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <br />
                  <br />
                  <tr>
                    <td style={{maxWidth:'5rem'}}>
                  <h5>Contact Details</h5>
                  <hr style={{width : '33rem'}}/>

                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="mobile">Mobile Number:</label>
                    </td>
                    <td>
                      <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={formValues.mobile}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="altmobile">
                        Alternate Mobile Number:
                      </label>
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
                  <br />
                  <br />
                  <tr>
                    <td style={{maxWidth:'5rem'}}>
                  <h4>Other details</h4>
                  <hr style={{width : '33rem'}}/>

                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label className="profile-label" htmlFor="disability">Disability:</label>
                    </td>
                    <td>
                      <select
                        defaultValue={formValues.disability}
                        id="disability"
                        name="disability"
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
                      <label className="profile-label" htmlFor="married">Marital Status:</label>
                    </td>
                    <td>
                      <select
                        id="married"
                        name="married"
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
                  <br />
                  <button type="submit">Submit</button>
                </table>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
