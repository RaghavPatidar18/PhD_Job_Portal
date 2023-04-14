import { faUser } from "@fortawesome/free-solid-svg-icons";
import Personal from "./Personal";
import Academic from "./Academic";

import Experience from "./Experience";
import Publication from "./Publication";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import POR from "./POR";
import OtherDetails from "./OtherDetails";
import { LoginContext } from "./ContextProvider/Context";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import AutoFillData from "./AutoFillData";
import "./css/Profile.css";
import Reference from "./Refrees";
import axios from "axios";
async function getName() {
  const token = localStorage.getItem("usersdatatoken");
  //   console.log(token);
  const response = await fetch("/api/mename", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("inside function of gate name");
  const data = await response.json();
  return data.name;
}
export default function Profile({ user, type }) {
  const [screenWidth] = React.useState(window.innerWidth);
  const [activeComponent, setActiveComponent] = useState("personal");
  const [name, setName] = useState("");
  const history = useNavigate();
  const handleButtonClick = (componentName) => {
    setActiveComponent(componentName);
    console.log(activeComponent);
  };

  useEffect(() => {
    if (type === "") {
      history("*");
    }
  }, []);
  const url = `http://localhost:4000/personal/${user}`;
  useEffect(() => {
    axios.get(url).then((response) => {
      if (response.status === 200) {
        const myData = response.data.personals[0];
        setName(myData.name);
      }
    });
  });

  return (
    <>
      {/* {screenWidth >= 1024 ? ( */}
        <>
          {type === "student" ? (
            <div style={{display : 'flex'}}>
            <div className="outer-container">
              <aside class="flex flex-col w-150 h-screen px-1 py-2 overflow-y-auto bg-white border-r rtl:border-r-2 rtl:border-2 dark:bg-gray-900 dark:border-gray-700">
                <div class="relative mt-9">
                <FontAwesomeIcon
                        style={{
                          backgroundColor: "grey",
                          height: "4rem",
                          color: "white",
                          padding: "3rem",
                          width: "4rem",
                          borderRadius: "50%",
                          borderColor:'rgba(59, 50, 179)',
                          borderWidth:'0.1rem'
                        }}
                        icon={faUser}
                      />
                </div>
                <p style={{fontWeight : '500', fontSize : '1.5rem'}}class = "px-8">{name}</p>

                <div class="flex flex-col justify-between flex-1  mt-6">
                  <nav>
                  <Popup
                        trigger={
                          <button
                            className="flex items-center px-7 py-2 navButton"
                          >
                            Parse Resume
                          </button>
                        }
                        modal
                        closeOnDocumentClick
                        overlayStyle={{
                          background: "rgba(0, 0, 0, 0.7)",
                          zIndex: 1000,
                        }}
                        contentStyle={{
                          width: "30%",
                          height: "30%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: "5px",
                          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                          backgroundColor: "#fff",
                        }}
                      >
                        {(close) => (
                          <>
                            <AutoFillData onClose={close} />
                          </>
                        )}
                      </Popup>
                    <button
                    className= {activeComponent === 'personal' ? 'flex items-center px-1 py-2 active' : 'flex items-center px-1 py-2 navButton'}
                      onClick={()=>{handleButtonClick("personal")}}
                    >
                      <span class="mx-4 font-medium">Personal Details</span>
                    </button>
                    <button
                    className= {activeComponent === 'academic' ? 'flex items-center px-1 py-2 active' : 'flex items-center px-1 py-2 navButton'}
                      onClick={()=>{handleButtonClick("academic")}}
                    >
                      <span class="mx-4 font-medium">Education Details</span>
                    </button>
                    <button
                    className= {activeComponent === 'experience' ? 'flex items-center px-1 py-2 active' : 'flex items-center px-1 py-2 navButton'}
                      onClick={()=>{handleButtonClick("experience")}}
                    >
                      <span class="mx-4 font-medium">Work Experience</span>
                    </button>
                    <button
                    className= {activeComponent === 'publication' ? 'flex items-center px-1 py-2 active' : 'flex items-center px-1 py-2 navButton'}
                      onClick={()=>{handleButtonClick("publication")}}
                    >
                      <span class="mx-4 font-medium">Publications</span>
                    </button>
                    <button
                    className= {activeComponent === 'references' ? 'flex items-center px-1 py-2 active' : 'flex items-center px-1 py-2 navButton'}
                      onClick={()=>{handleButtonClick("references")}}
                    >
                      <span class="mx-4 font-medium">References</span>
                    </button>
                    <button
                    className= {activeComponent === 'por' ? 'flex items-center px-1 py-2 active' : 'flex items-center px-1 py-2 navButton'}
                      onClick={()=>{handleButtonClick("por")}}
                    >
                      <span class="mx-4 font-medium">Positions of Responsibility</span>
                    </button>
                    <button
                    className= {activeComponent === 'doc' ? 'flex items-center px-1 py-2 active' : 'flex items-center px-1 py-2 navButton'}
                      onClick={()=>{handleButtonClick("doc")}}
                    >
                      <span class="mx-4 font-medium">Uploaded Documents</span>
                    </button>

                  </nav>
                </div>
              </aside>
            </div>
            <div className="Profile" style={{marginLeft: '15rem'}}>
          <section className="renderComponent">
            {activeComponent === "personal" ? (
              <>
                <Personal user={user} type={type} />
              </>
            ) : (
              <></>
            )}
            {activeComponent === "academic" ? (
              <Academic user={user} type={type} />
            ) : (
              <></>
            )}
            {activeComponent === "experience" ? (
              <Experience user={user} type={type} />
            ) : (
              <></>
            )}
            {activeComponent === "publication" ? (
              <Publication user={user} type={type} />
            ) : (
              <></>
            )}
            {activeComponent === "references" ? (
              <Reference user={user} type={type} />
            ) : (
              <></>
            )}
            {activeComponent === "por" ? (
              <POR user={user} type={type} />
            ) : (
              <></>
            )}
            {activeComponent === "doc" ? <OtherDetails /> : <></>}
          </section>
        </div>
            </div>
          ) : (
            <>{/* INSTITUE PROFILE NAVBAR */}</>
          )}
        </>
      ) : (
        <>{/* INSTITUTE PROFILE SECTION */}</>
      {/* )} */}

    </>
  );
}
