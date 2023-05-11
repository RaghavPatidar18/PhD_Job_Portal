import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Personal.css"; // import the CSS file
// import { FaEdit } from "react-icons/fa";
import { FaEdit, FaPen } from "react-icons/fa";

import { IoClose } from "react-icons/io5";
export default function Profile({ user, type }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [board10, setBoard10] = useState("");
  const [percentageFormat10, setPercentageFormat10] = useState("");
  const [percentage10, setPercentage10] = useState("");
  const [year10, setYear10] = useState();
  const [remarks10, setRemarks10] = useState("");
  const [isedit1, setIsEdit1] = useState(false);
  const [isedit2, setIsEdit2] = useState(false);
  const [isedit3, setIsEdit3] = useState(false);
  const [isedit4, setIsEdit4] = useState(false);
  const [board12, setBoard12] = useState("");
  const [percentageFormat12, setPercentageFormat12] = useState("");
  const [percentage12, setPercentage12] = useState("");
  const [year12, setYear12] = useState();
  const [remarks12, setRemarks12] = useState("");

  const [collegeBtech, setCollegeBtech] = useState("");
  const [branchBtech, setBranchBtech] = useState("");
  const [percentageFormatBtech, setPercentageFormatBtech] = useState("");
  const [percentageBtech, setPercentageBtech] = useState("");
  const [yearBtech, setYearBtech] = useState("");
  const [remarksBtech, setRemarksBtech] = useState("");

  const [collegeMtech, setCollegeMtech] = useState("");
  const [branchMtech, setBranchMtech] = useState("");
  const [percentageFormatMtech, setPercentageFormatMtech] = useState("");
  const [percentageMtech, setPercentageMtech] = useState("");
  const [yearMtech, setYearMtech] = useState("");
  const [remarksMtech, setRemarksMtech] = useState("");

  const [isPhdCompleted, setIsPhdCompleted] = useState("");
  const [phdRemarks, setPhdRemarks] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  const url = `http://localhost:4000/academic/${user}`;
  useEffect(() => {
    axios.get(url).then((response) => {
      console.log(response.data);
      if (response.status === 200) {
        const mydata = response.data.academics[0];
        setBoard10(mydata.board10);
        setPercentageFormat10(
          mydata.percentageformat10 === "-"
            ? "-"
            : "Scale of " + mydata.percentageformat10
        );
        setPercentage10(mydata.percentage10);
        setYear10(mydata.year10);
        setRemarks10(mydata.remarks10);

        setBoard12(mydata.board12);
        setPercentageFormat12(
          mydata.percentageformat12 === "-"
            ? "-"
            : "Scale of " + mydata.percentageformat12
        );
        setPercentage12(mydata.percentage12);
        setYear12(mydata.year12);
        setRemarks12(mydata.remarks12);

        setCollegeBtech(mydata.collegebtech);
        setBranchBtech(mydata.branchbtech);
        setPercentageFormatBtech(
          mydata.percentageformatbtech === "-"
            ? "-"
            : "Scale of " + mydata.percentageformatbtech
        );
        setPercentageBtech(mydata.percentagebtech);
        setYearBtech(mydata.yearbtech);
        setRemarksBtech(mydata.remarksbtech);

        setCollegeMtech(mydata.collegemtech);
        setBranchMtech(mydata.branchmtech);
        setPercentageFormatMtech(
          mydata.percentageformatmtech === "-"
            ? "-"
            : "Scale of " + mydata.percentageformatmtech
        );
        setPercentageMtech(mydata.percentagemtech);
        setYearMtech(mydata.yearmtech);
        setRemarksMtech(mydata.remarksmtech);

        setIsPhdCompleted(mydata.isphdcompleted);
        setPhdRemarks(mydata.phdremarks);

        setFormValues({
          board10: mydata.board10 === "-" ? "" : mydata.board10,
          percentageformat10:
            mydata.percentageformat10 === "-" ? "" : mydata.percentageformat10,
          percentage10: mydata.percentage10 === "-" ? "" : mydata.percentage10,
          year10: mydata.year10 === "-" ? "" : mydata.year10,
          remarks10: mydata.remarks10 === "-" ? "" : mydata.remarks10,

          board12: mydata.board12 === "-" ? "" : mydata.board12,
          percentageformat12:
            mydata.percentageformat12 === "-" ? "" : mydata.percentageformat12,
          percentage12: mydata.percentage12 === "-" ? "" : mydata.percentage12,
          year12: mydata.year12 === "-" ? "" : mydata.year12,
          remarks12: mydata.remarks12 === "-" ? "" : mydata.remarks12,

          collegebtech: mydata.collegebtech === "-" ? "" : mydata.collegebtech,
          branchbtech: mydata.branchbtech === "-" ? "" : mydata.branchbtech,
          percentageformatbtech:
            mydata.percentageformatbtech === "-"
              ? ""
              : mydata.percentageformatbtech,
          percentagebtech:
            mydata.percentagebtech === "-" ? "" : mydata.percentagebtech,
          yearbtech: mydata.yearbtech === "-" ? "" : mydata.yearbtech,
          remarksbtech: mydata.remarksbtech === "-" ? "" : mydata.remarksbtech,

          collegemtech: mydata.collegemtech === "-" ? "" : mydata.collegemtech,
          branchmtech: mydata.branchmtech === "-" ? "" : mydata.branchmtech,
          percentageformatmtech:
            mydata.percentageformatmtech === "-"
              ? ""
              : mydata.percentageformatmtech,
          percentagemtech:
            mydata.percentagemtech === "-" ? "" : mydata.percentagemtech,
          yearmtech: mydata.yearmtech === "-" ? "" : mydata.yearmtech,
          remarksmtech: mydata.remarksmtech === "-" ? "" : mydata.remarksmtech,

          isphdcompleted:
            mydata.isphdcompleted === "-" ? "" : mydata.isphdcompleted,
          phdremarks: mydata.phdremarks === "-" ? "" : mydata.phdremarks,
        });
      }
    });
  }, [refreshKey, isEditMode, isedit1, isedit2, isedit3, isedit4]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // save into database
    axios
      .post("http://localhost:4000/academic", {
        formValues,
        user,
        isedit1,
        isedit2,
        isedit3,
        isedit4,
      })
      .then((response) => {
        if (response.data.status === 200) {
          // alert("Your data was saved");
        } else {
          // alert("Please try again later!");
        }
      });
    setIsEdit1(false);
    setIsEdit2(false);
    setIsEdit3(false);
    setIsEdit4(false);
    // window.location.reload();
    // window.scrollTo(0, 0);
    // window.location.reload();
  };
  const handleEdit = () => {
    setIsEditMode(true);
  };
  const handleClose = () => {
    setIsEditMode(false);
  };
  const [formValues, setFormValues] = useState({
    board10: board10,
    percentageformat10: percentageFormat10,
    percentage10: percentage10,
    year10: year10,
    remarks10: remarks10,

    board12: board12,
    percentageformat12: percentageFormat12,
    percentage12: percentage12,
    year12: year12,
    remarks12: remarks12,

    collegebtech: collegeBtech,
    branchbtech: branchBtech,
    percentageformatbtech: percentageFormatBtech,
    percentagebtech: percentageBtech,
    yearbtech: yearBtech,
    remarksbtech: remarksBtech,

    collegemtech: collegeMtech,
    branchmtech: branchMtech,
    percentageformatmtech: percentageFormatMtech,
    percentagemtech: percentageMtech,
    yearmtech: yearMtech,
    remarksmtech: remarksMtech,

    isphdcompleted: isPhdCompleted,
    phdremarks: phdRemarks,
  });
  return (
    <>
      <div className="userProfile">
        <div className="parent" style={{ marginLeft: "2rem" }}>
          <div className="left">
            <h3
              style={{ fontWeight: "400" }}
              className="text-xxlg leading-6 font-large text-gray-900"
            >
              Academic Details
            </h3>
          </div>
        </div>
        <hr
          style={{ marginLeft: "2rem", borderWidth: "1px", width: "17rem" }}
        />
        {/* <div className="parent">
        </div> */}
        {/* <hr style={{ borderWidth: "2px" }} /> */}
        {!isEditMode ? (
          <>
            {isedit1 ? (
              <>
                <div style={{ width: "80%" }} className="flex my-10 mx-20">
                  <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="flex space-x-3 px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Masters of Technology
                        <span style={{ marginLeft: "1.5rem" }}></span>
                      </h3>
                    </div>
                    <div className="border-t border-gray-300">
                      <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            College Name<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="collegemtech"
                              name="collegemtech"
                              value={formValues.collegemtech}
                              onChange={handleInputChange}
                              required
                            />
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Branch of specialization<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="branchmtech"
                              name="branchmtech"
                              required
                              value={formValues.branchmtech}
                              onChange={handleInputChange}
                            />
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Format<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <select
                              id="percentageformatmtech"
                              name="percentageformatmtech"
                              required
                              value={formValues.percentageformatmtech}
                              onChange={handleInputChange}
                            >
                              <option value="">Please select</option>
                              <option value="4">Scale of 4.0</option>
                              <option value="10">Scale of 10.0</option>
                              <option value="100">Scale of 100 (%)</option>
                            </select>
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Obtained<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="percentagemtech"
                              name="percentagemtech"
                              required
                              value={formValues.percentagemtech}
                              onChange={handleInputChange}
                            />
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Year of completion<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="yearmtech"
                              name="yearmtech"
                              required
                              value={formValues.yearmtech}
                              onChange={handleInputChange}
                            />
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Remarks (if any)
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="remarksmtech"
                              name="remarksmtech"
                              value={formValues.remarksmtech}
                              onChange={handleInputChange}
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
                                setIsEdit1(false);
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
                              onClick={handleSubmit}
                            >
                              Save
                            </button>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ width: "80%" }} className="flex my-10 mx-20">
                  <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="flex space-x-3 px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Masters of Technology
                        <span style={{ marginLeft: "1.5rem" }}></span>
                        <button
                          style={{
                            fontSize: "medium",
                            color: "rgba(59, 50, 179)",
                          }}
                          onClick={() => {
                            setIsEdit1(true);
                          }}
                        >
                          <FaPen />
                        </button>
                      </h3>
                    </div>
                    <div className="border-t border-gray-300">
                      <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            College Name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {collegeMtech}
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Branch of specialization
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {branchMtech}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Format
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {percentageFormatMtech}
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Obtained
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {percentageMtech}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Year of completion
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {yearMtech}
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Remarks
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {remarksMtech}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </>
            )}

            {isedit2 ? (
              <>
                <div style={{ width: "80%" }} className="flex my-10 mx-20">
                  <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="flex space-x-3 px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Bachelors of Technology
                        <span style={{ marginLeft: "1.5rem" }}></span>
                      </h3>
                    </div>
                    <div className="border-t border-gray-300">
                      <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            College Name<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="collegebtech"
                              name="collegebtech"
                              required
                              value={formValues.collegebtech}
                              onChange={handleInputChange}
                            />
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Branch of specialization<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="branchbtech"
                              name="branchbtech"
                              required
                              value={formValues.branchbtech}
                              onChange={handleInputChange}
                            />
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Format<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <select
                              id="percentageformatbtech"
                              name="percentageformatbtech"
                              required
                              value={formValues.percentageformatbtech}
                              onChange={handleInputChange}
                            >
                              <option value="">Please select</option>
                              <option value="4">Scale of 4.0</option>
                              <option value="10">Scale of 10.0</option>
                              <option value="100">Scale of 100 (%)</option>
                            </select>
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Obtained<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="percentagebtech"
                              name="percentagebtech"
                              required
                              value={formValues.percentagebtech}
                              onChange={handleInputChange}
                            />
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Year of completion<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="yearbtech"
                              name="yearbtech"
                              required
                              value={formValues.yearbtech}
                              onChange={handleInputChange}
                            />
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Remarks (if any)
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="remarksbtech"
                              name="remarksbtech"
                              required
                              value={formValues.remarksbtech}
                              onChange={handleInputChange}
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
                                setIsEdit2(false);
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
                              onClick={handleSubmit}
                            >
                              Save
                            </button>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ width: "80%" }} className="flex my-10 mx-20">
                  <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="flex space-x-3 px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Bachelors of Technology
                        <span style={{ marginLeft: "1.5rem" }}></span>
                        <button
                          style={{
                            fontSize: "medium",
                            color: "rgba(59, 50, 179)",
                          }}
                          onClick={() => {
                            setIsEdit2(true);
                          }}
                        >
                          <FaPen />
                        </button>
                      </h3>
                    </div>
                    <div className="border-t border-gray-300">
                      <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            College Name
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {collegeBtech}
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Branch of specialization
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {branchBtech}
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Format
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {percentageFormatBtech}
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Obtained
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {percentageBtech}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Year of completion
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {yearBtech}
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Remarks
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {remarksBtech}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </>
            )}

            {isedit3 ? (
              <>
                <div style={{ width: "80%" }} className="flex my-10 mx-20">
                  <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="flex space-x-3 px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Senior Secondary Education
                        <span style={{ marginLeft: "1.5rem" }}></span>
                      </h3>
                    </div>
                    <div className="border-t border-gray-300">
                      <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Education board<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="board12"
                              name="board12"
                              required
                              value={formValues.board12}
                              onChange={handleInputChange}
                            />
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">
                            Standard
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            Class 12
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Format<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <select
                              id="percentageformat12"
                              name="percentageformat12"
                              required
                              value={formValues.percentageformat12}
                              onChange={handleInputChange}
                            >
                              <option value="">Please select</option>
                              <option value="4">Scale of 4.0</option>
                              <option value="10">Scale of 10.0</option>
                              <option value="100">Scale of 100 (%)</option>
                            </select>
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Obtained<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="percentage12"
                              name="percentage12"
                              required
                              value={formValues.percentage12}
                              onChange={handleInputChange}
                            />
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Year of completion<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="year12"
                              name="year12"
                              required
                              value={formValues.year12}
                              onChange={handleInputChange}
                            />
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Remarks(if any  )
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="remarks12"
                              name="remarks12"
                              required
                              value={formValues.remarks12}
                              onChange={handleInputChange}
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
                                setIsEdit3(false);
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
                              onClick={handleSubmit}
                            >
                              Save
                            </button>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ width: "80%" }} className="flex my-10 mx-20">
                  <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="flex space-x-3 px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Senior Secondary Education
                        <span style={{ marginLeft: "1.5rem" }}></span>
                        <button
                          style={{
                            fontSize: "medium",
                            color: "rgba(59, 50, 179)",
                          }}
                          onClick={() => {
                            setIsEdit3(true);
                          }}
                        >
                          <FaPen />
                        </button>
                      </h3>
                    </div>
                    <div className="border-t border-gray-300">
                      <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Education board
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {board12}
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">
                            Standard
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            Class 12
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Format
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {percentageFormat12}
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Obtained
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {percentage12}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Year of completion
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {year12}
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Remarks
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {remarks12}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </>
            )}
            {isedit4 ? (
              <>
                <div style={{ width: "80%" }} className="flex my-10 mx-20">
                  <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="flex space-x-3 px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Secondary Education
                        <span style={{ marginLeft: "1.5rem" }}></span>
                      </h3>
                    </div>
                    <div className="border-t border-gray-300">
                      <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Education board<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="board10"
                              name="board10"
                              required
                              value={formValues.board10}
                              onChange={handleInputChange}
                            />
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">
                            Standard
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            Class 10
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Format<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <select
                              id="percentageformat10"
                              name="percentageformat10"
                              required
                              value={formValues.percentageformat10}
                              onChange={handleInputChange}
                            >
                              <option value="">Please select</option>
                              <option value="4">Scale of 4.0</option>
                              <option value="10">Scale of 10.0</option>
                              <option value="100">Scale of 100 (%)</option>
                            </select>
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Obtained<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="percentage10"
                              name="percentage10"
                              required
                              value={formValues.percentage10}
                              onChange={handleInputChange}
                            />
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Year of completion<span style={{ color: "#ff0000" }}> *</span>
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="year10"
                              name="year10"
                              required
                              value={formValues.year10}
                              onChange={handleInputChange}
                            />
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Remarks(if any)
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              type="text"
                              id="remarks10"
                              name="remarks10"
                              required
                              value={formValues.remarks10}
                              onChange={handleInputChange}
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
                                setIsEdit4(false);
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
                              onClick={handleSubmit}
                            >
                              Save
                            </button>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div style={{ width: "80%" }} className="flex my-10 mx-20">
                  <div className="my-2 flex-1 bg-white shadow overflow-hidden sm:rounded-lg">
                    <div className="flex space-x-3 px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Secondary Education
                        <span style={{ marginLeft: "1.5rem" }}></span>
                        <button
                          style={{
                            fontSize: "medium",
                            color: "rgba(59, 50, 179)",
                          }}
                          onClick={() => {
                            setIsEdit4(true);
                          }}
                        >
                          <FaPen />
                        </button>
                      </h3>
                    </div>
                    <div className="border-t border-gray-300">
                      <dl>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Education board
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {board10}
                          </dd>
                          <dt className="text-sm font-medium text-gray-500">
                            Standard
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            Class 10
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Format
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {percentageFormat10}
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Percentage Obtained
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {percentage10}
                          </dd>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">
                            Year of completion
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {year10}
                          </dd>

                          <dt className="text-sm font-medium text-gray-500">
                            Remarks
                          </dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {remarks10}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
