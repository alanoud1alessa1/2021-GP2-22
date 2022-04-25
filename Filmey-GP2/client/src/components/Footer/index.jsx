import React from "react";
import { Container } from "react-bootstrap";
import "./Footer.css";

//import Images
import logo from "../../dist/img/Logo.png";

const Footer = () => {
  return (
    <div className="footer-section">
      <Container fluid className="pt-5 text-white">
        <div className="d-flex justify-content-center text-center">
          <div>
            <img className="footer-logo" src={logo} alt="" />
            <h3 className="filmey-text">WE MAKE YOUR DAY</h3>
          </div>
        </div>
        <div className="">
          <p className="filmey-text mt-2 mb-0">
            Filmey &copy; 2021{" "}
          </p>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
