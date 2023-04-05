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
import "./Profile.css";

export default function Profile({ user, type }) {
  const [screenWidth] = React.useState(window.innerWidth);

  const [data, setData] = useState(false);
  const history = useNavigate();

  // const location = useLocation();
  // const userType = new URLSearchParams(location.search).get("userType");
  // // console.log(userType);

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
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    to="personal"
                    duration={200}
                  >
                    Personal
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    to="academic"
                    duration={200}
                  >
                    Academic
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    to="experience"
                    duration={200}
                  >
                    Experience
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    to="publication"
                    duration={200}
                  >
                    Publications
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    to="reference"
                    duration={200}
                  >
                    References
                  </Link>
                </li>
                <li>
                  <Link activeClass="active" smooth spy to="POR" duration={200}>
                    POR
                  </Link>
                </li>
                <li>
                  <Link
                    activeClass="active"
                    smooth
                    spy
                    to="other"
                    duration={200}
                  >
                    Other Details
                  </Link>
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
            trigger={<button style = {{  backgroundColor: 'var(--primary-color)', color : 'white', border : 'none', borderRadius : '4px', fontSize : 'x-large'}}>Click Here for magic</button>}
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
        <section id="personal">
          <Personal user={user} type={type} />
        </section>
        <section id="academic">
          <Academic user={user} type={type} />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="publication">
          <Publication />
        </section>
        <section id="reference">
          <Refrees />
        </section>
        <section id="POR">
          <POR />
        </section>
        <section id="other">
          <OtherDetails />
        </section>
      </div>
    </>
  );
}

const backdropStyles = {
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent black background
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9998,
};

// Define styles for the popup container
const modalStyles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  zIndex: 9999,
  width: "60%",
  height: "60%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Modal = ({ onClose }) => (
  <>
    {/* Add the background styles as a separate element */}
    <div style={backdropStyles}></div>

    {/* Add the popup container */}
    <div style={modalStyles}>
      <button onClick={onClose}>Close</button>
      <AutoFillData onClose={onClose} />
    </div>
  </>
);
