import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Personal.css"; // import the CSS file
import { FaEdit, FaPen } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import ImageUploader from "./ImageUploader";
export default function Profile({ user, type }) {
  const [isEdit2, setIsEdit2] = useState(false);
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

  const url = `/personal/${user}`;
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
          permanentAddress = myData.permanent_address;
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
  }, [isEdit2, isEditMode]);

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
    axios.post("/personal", { formValues, user }).then((response) => {
      if (response.data.status === 200) {
        console.log("Your data was saved");
      } else {
        alert("Please try again later!");
      }
    });
    setIsEditMode(false);
    setIsEdit2(false);
    // window.location.reload();
  };
  const handleEdit2 = () => {
    setIsEdit2(true);
  };
  const handleClose2 = () => {
    setIsEdit2(false);
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
      {isEditMode ? (
        <>
          {/* <ImageUploader user={user} type={type} /> */}
          <div
            style={{ width: "70%" }}
            className="mr-20  mt-4 flex-1 ml-20 bg-white shadow overflow-hidden sm:rounded-lg"
          >
            <div className="flex space-x-3 px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {" "}
                Personal Details
              </h3>
            </div>
            <form
              className="meraForm"
              style={{ padding: "0rem", margin: "0rem", width: "100%" }}
              onSubmit={handleSubmit}
            >
              <div className="border-t border-gray-300">
                <dl>
                  <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Full name<span style={{ color: "#ff0000" }}> *</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formValues.name}
                        onChange={handleInputChange}
                        required
                      />
                    </dd>

                    <dt className="text-sm font-medium text-gray-500">
                      Father's Name<span style={{ color: "#ff0000" }}> *</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        id="fathername"
                        name="fathername"
                        value={formValues.fathername}
                        onChange={handleInputChange}
                        required
                      />
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Date of Birth<span style={{ color: "#ff0000" }}> *</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="date"
                        id="dob"
                        name="dob"
                        value={formValues.dob}
                        onChange={handleInputChange}
                        required
                      />
                    </dd>

                    <dt className="text-sm font-medium text-gray-500">
                      Gender<span style={{ color: "#ff0000" }}> *</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="gender"
                        name="gender"
                        value={formValues.gender}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Please select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Nationality<span style={{ color: "#ff0000" }}> *</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        id="nationality"
                        name="nationality"
                        value={formValues.nationality}
                        onChange={handleInputChange}
                        required
                      />
                    </dd>

                    <dt className="text-sm font-medium text-gray-500">
                      Category<span style={{ color: "#ff0000" }}> *</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="category"
                        name="category"
                        value={formValues.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Please select</option>
                        <option value="General">General</option>
                        <option value="SC">SC</option>
                        <option value="ST">ST</option>
                        <option value="OBC">OBC</option>
                      </select>
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Married status<span style={{ color: "#ff0000" }}> *</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        id="married"
                        name="married"
                        value={formValues.married}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Please select</option>
                        <option value="Married">Married</option>
                        <option value="Unmarried">Unmarried</option>
                        <option value="Divorced">Divorced</option>
                      </select>
                    </dd>
                    <dt className="text-sm font-medium text-gray-500">
                      Disability<span style={{ color: "#ff0000" }}> *</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <select
                        defaultValue={formValues.disability}
                        id="disability"
                        name="disability"
                        value={formValues.disability}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Please select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Age<span style={{ color: "#ff0000" }}> *</span>
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      <input
                        type="text"
                        id="age"
                        name="age"
                        pattern="[0-9]{1,3}"
                        value={formValues.age}
                        onChange={handleInputChange}
                        required
                      />
                    </dd>
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
                      <span style={{ marginLeft: "2rem" }}></span>
                      <button
                        style={{
                          border: "1px solid grey",
                          padding: "0.4rem",
                          width: "4rem",
                          color: "white",
                          backgroundColor: "#b54141",
                        }}
                        onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </dd>
                  </div>
                </dl>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <div
            style={{ width: "70%" }}
            className="mr-20  mt-4 flex-1 ml-20 bg-white shadow overflow-hidden sm:rounded-lg"
          >
            <div className="flex space-x-3 px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {" "}
                Personal Details <span
                  style={{ marginLeft: "1.5rem" }}
                ></span>{" "}
                <button
                  style={{ fontSize: "medium", color: "rgba(59, 50, 179)" }}
                  onClick={handleEdit}
                >
                  <FaPen />
                </button>
              </h3>
            </div>
            <div className="border-t border-gray-300">
              <dl>
                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Full name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {name}
                  </dd>

                  <dt className="text-sm font-medium text-gray-500">
                    Father's Name
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {fatherName}
                  </dd>
                </div>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Date of Birth
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {dob}
                  </dd>

                  <dt className="text-sm font-medium text-gray-500">Gender</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {gender}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Nationality
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {nationality}
                  </dd>

                  <dt className="text-sm font-medium text-gray-500">
                    Category
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {category}
                  </dd>
                </div>
                <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">
                    Married status
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {married}
                  </dd>
                  <dt className="text-sm font-medium text-gray-500">
                    Disablity
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {disability}
                  </dd>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Age</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {age}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </>
      )}
      {/* <ImageUploader user={user} type={type} /> */}
      {isEdit2 ? (
        <>
          <div style={{ width: "70%" }} className="flex my-10 mx-20">
            <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="flex space-x-3 px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Communication Details
                  <span style={{ marginLeft: "1.5rem" }}></span>
                  {/* <button
                  style={{ fontSize: "medium", color: "rgba(59, 50, 179)" }}
                  onClick={handleEdit2}
                >
                  <FaPen />
                </button> */}
                </h3>
              </div>
              <form
                className="meraForm"
                style={{ padding: "0rem", margin: "0rem", width: "100%" }}
                onSubmit={handleSubmit}
              >
                <div className="border-t border-gray-300">
                  <dl>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Address for communication
                        <span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          id="communication_address"
                          name="communication_address"
                          value={formValues.communication_address}
                          onChange={handleInputChange}
                          required
                        />
                      </dd>

                      <dt className="text-sm font-medium text-gray-500">
                        City<span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          id="communication_city"
                          name="communication_city"
                          value={formValues.communication_city}
                          onChange={handleInputChange}
                          required
                        />
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        State<span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          id="communication_state"
                          name="communication_state"
                          value={formValues.communication_state}
                          onChange={handleInputChange}
                          required
                        />
                      </dd>

                      <dt className="text-sm font-medium text-gray-500">
                        PIN Code<span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          id="communication_pincode"
                          name="communication_pincode"
                          value={formValues.communication_pincode}
                          onChange={handleInputChange}
                          required
                        />
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Permanent Address
                        <span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          id="permanent_address"
                          name="permanent_address"
                          value={formValues.permanent_address}
                          onChange={handleInputChange}
                          required
                        />
                      </dd>

                      <dt className="text-sm font-medium text-gray-500">
                        City<span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          id="permanent_city"
                          name="permanent_city"
                          value={formValues.permanent_city}
                          onChange={handleInputChange}
                          required
                        />
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        State<span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          id="permanent_state"
                          name="permanent_state"
                          value={formValues.permanent_state}
                          onChange={handleInputChange}
                          required
                        />
                      </dd>

                      <dt className="text-sm font-medium text-gray-500">
                        PIN Code<span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          id="permanent_pincode"
                          name="permanent_pincode"
                          value={formValues.permanent_pincode}
                          onChange={handleInputChange}
                          required
                        />
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Mobile Number
                        <span style={{ color: "#ff0000" }}> *</span>
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          id="mobile"
                          name="mobile"
                          value={formValues.mobile}
                          onChange={handleInputChange}
                          required
                        />
                      </dd>
                      {/* {altMobile && ( */}
                      {/* <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"> */}
                      {/* <dt className="text-sm font-medium text-gray-500"> */}
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <button
                          style={{
                            border: "1px solid grey",
                            padding: "0.4rem",
                            width: "4rem",
                            color: "white",
                            backgroundColor: "black",
                          }}
                          onClick={handleSubmit}
                        >
                          Save
                        </button>
                        {/* </dt> */}
                        {/* <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2"> */}
                        <span style={{ marginLeft: "2rem" }}></span>

                        <button
                          style={{
                            border: "1px solid grey",
                            padding: "0.4rem",
                            width: "4rem",
                            color: "white",
                            backgroundColor: "#b54141",
                          }}
                          onClick={handleClose2}
                        >
                          Cancel
                        </button>
                      </dd>
                      {/* </div> */}
                      {/* )} */}
                    </div>
                  </dl>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div style={{ width: "70%" }} className="flex my-10 mx-20">
            <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="flex space-x-3 px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Communication Details
                  <span style={{ marginLeft: "1.5rem" }}></span>
                  <button
                    style={{ fontSize: "medium", color: "rgba(59, 50, 179)" }}
                    onClick={handleEdit2}
                  >
                    <FaPen />
                  </button>
                </h3>
              </div>
              <div className="border-t border-gray-300">
                <dl>
                  <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Address for communication
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {communicationAddress}
                    </dd>

                    <dt className="text-sm font-medium text-gray-500">City</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {communicationCity}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">State</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {communicationState}
                    </dd>

                    <dt className="text-sm font-medium text-gray-500">
                      PIN Code
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {communicationPincode}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Permanent Address
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {permanentAddress}
                    </dd>

                    <dt className="text-sm font-medium text-gray-500">City</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {permanentCity}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">State</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {permanentState}
                    </dd>

                    <dt className="text-sm font-medium text-gray-500">
                      PIN Code
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {permanentPincode}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      Mobile Number
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                      {mobile}
                    </dd>
                    {/* {altMobile && ( */}
                    {/* <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6"> */}
                    {/* <dt className="text-sm font-medium text-gray-500">
                  Alternate Mobile Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {altMobile}
                </dd> */}
                    {/* </div> */}
                    {/* )} */}
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
