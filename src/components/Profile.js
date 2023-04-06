import { Link } from "react-scroll";
// import React from "react";
import { FaTimes } from "react-icons/fa";

import Personal from "./Personal";
import Academic from "./Academic";
import Experience from "./Experience";
import Publication from "./Publication";
import Refrees from "./Refrees";
import POR from "./POR";
import OtherDetails from "./OtherDetails";
import { LoginContext } from "./ContextProvider/Context";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Popup from "reactjs-popup";
import AutoFillData from "./AutoFillData";
import "./css/Profile.css";

export default function Profile({ user, type }) {
  const [screenWidth] = React.useState(window.innerWidth);
  const [activeComponent, setActiveComponent] = useState("personal");

  const [data, setData] = useState(false);
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

  return (
    <>
      {screenWidth >= 1024 ? (
        <>
          <header className="nav">
            <nav className="nav__container__actions">
              <ul>
                <li>
                  <button style = {{ color: activeComponent === 'personal' ? 'rgba(59, 50, 179)' : 'black' , backgroundColor: '#e7e7e7',  width : '10rem', border: activeComponent === 'personal' ? '1px solid rgba(59, 50, 179' : 'none'}}onClick={ () =>  handleButtonClick("personal")}>
                    Personal
                  </button>
                </li>
                <li>
                  <button style = {{color: activeComponent === 'academic' ? 'rgba(59, 50, 179)' : 'black' ,backgroundColor: '#e7e7e7', width : '10rem', border: activeComponent === 'academic' ? '1px solid rgba(59, 50, 179' : 'none'}}onClick={() =>  handleButtonClick("academic")}>
                    Academics
                  </button>
                </li>
                <li>
                <button style = {{color: activeComponent === 'experience' ? 'rgba(59, 50, 179)' : 'black' ,backgroundColor: '#e7e7e7', width : '10rem', border: activeComponent === 'experience' ? '1px solid rgba(59, 50, 179' : 'none'}} onClick={() => handleButtonClick("experience")}>
                    Experience
                  </button>
                </li>
                <li>
                <button style = {{color: activeComponent === 'publication' ? 'rgba(59, 50, 179)' : 'black' ,backgroundColor: '#e7e7e7',  width : '10rem', border: activeComponent === 'publication' ? '1px solid rgba(59, 50, 179' : 'none'}} onClick={() => handleButtonClick("publication")}>
                    Publications
                  </button>
                </li>
                <li>
                <button style = {{color: activeComponent === 'reference' ? 'rgba(59, 50, 179)' : 'black' ,backgroundColor: '#e7e7e7', width : '10rem', border: activeComponent === 'reference' ? '1px solid rgba(59, 50, 179' : 'none'}} onClick={() => handleButtonClick("reference")}>
                    References
                  </button>
                </li>
                <li>
                <button style = {{color: activeComponent === 'por' ? 'rgba(59, 50, 179)' : 'black' ,backgroundColor: '#e7e7e7', width : '10rem', border: activeComponent === 'por' ? '1px solid rgba(59, 50, 179' : 'none'}} onClick={() => handleButtonClick("por")}>
                    POR
                  </button>
                </li>
                <li>
                <button style = {{color: activeComponent === 'doc' ? 'rgba(59, 50, 179)' : 'black' ,backgroundColor: '#e7e7e7',  width : '10rem', border: activeComponent === 'doc' ? '1px solid rgba(59, 50, 179' : 'none'}} onClick={() => handleButtonClick("doc")}>
                    Documents
                  </button>
                </li>
              </ul>
            </nav>
          </header>
        </>
      ) : (
        <> </>
      )}
      <div className="Profile">
        <section id="resume-uploader">
          <Popup
            trigger={
              <button
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "x-large",
                }}
              >
                Click Here for magic
              </button>
            }
            modal
            closeOnDocumentClick
            overlayStyle={{ background: "rgba(0, 0, 0, 0.7)", zIndex: 1000 }}
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
        </section>
        <section className="renderComponent">
        {activeComponent === "personal" ? <><Personal user= {user} type = {type}/></> : <></>}
        {/* {activeComponent === "academic" ? <Academic/> : <></>}
        {activeComponent === "experience" ? <Experience/> : <></>}
        {activeComponent === "por" ? <POR/> : <></>}
        {activeComponent === "publication" ? <Publication/> : <></>}
        {activeComponent === "doc" ? <OtherDetails/> : <></>} */}
      
        </section>
      </div>
    </>
  );
}