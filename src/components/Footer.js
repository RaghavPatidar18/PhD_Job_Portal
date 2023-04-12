import React from "react";
import "./css/Footer.css";

function Footer() {
  const owners = ["Vijay", "Isha" , "Raghav" , "Rohan"];
  const email = "contact@jobportal.com";
  const phone = "+1 (555) 555-5555";
  const address = "IIT Ropar";

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <p className="text-muted">© 2023 {owners.join(" and ")} - All rights reserved.</p>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href={`mailto:${email}`}>Contact Us</a>
              </li>
              <li className="list-inline-item">
                <a href="#">Terms of Use</a>
              </li>
              <li className="list-inline-item">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <ul className="list-unstyled">
              <li>
                <i className="fas fa-envelope"></i> {email}
              </li>
              <li>
                <i className="fas fa-phone"></i> {phone}
              </li>
              <li>
                <i className="fas fa-map-marker-alt"></i> {address}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;