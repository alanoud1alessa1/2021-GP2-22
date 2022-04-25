import Axios from "axios";
import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Link } from "react-router-dom";
import Footer from "../Footer";
import "./forgetPassword.css";
import api from "../../api/axiosAPI"

//import images
import logo from "../../dist/img/Logo.png";

const ForgetPassword = (props) => {
  const {
    text1,
    text2,
    text3,
    emailUsername,
    emailUsernameinputType,
    emailUsernamePlaceholder,
    password,
    passwordinputType,
    passwordPlaceholder,
    text4,
  } = props;

  var token = "";
  const [email, setEmail] = useState("");
  const [EmailNotExist_Error_message, setEmailNotExist_Error_message] =
    useState("");
  const [showResendEmail, setShowResendEmail] = React.useState(false);

  const isEnabled = email.length > 0;

  var userNotExistMessage = "";


  const UserExist = () => {
    const res = api.post("Users/userExist", {
      email: email,
    }).then((res) => {
      if (res.data) {
        if (res.data.userNotExistMessage) {
          userNotExistMessage = res.data.userNotExistMessage;
          setEmailNotExist_Error_message(userNotExistMessage);
          return;
        } else {
          setEmailNotExist_Error_message("");
          token = res.data;
          sendEmail();
          setShowResendEmail(true);
        }
      }
    });
  };

  const sendEmail = () => {
    const res = api.post("node-mail", {
      token: token,
    }).then((res) => {});

    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="customconfirmAlert">
            <h1>Check your email!</h1>
            <h5>We've sent you instructions for resetting your password.</h5>
            <button
              className="yesButton"
              onClick={() => {
                onClose();
              }}
            >
              OK
            </button>
          </div>
        );
      },
    });
  };
  return (
    <div>
      <div className="forget-section">
        <Container fluid className="pb-0">
          <div>
            <Link to="/home-page">
              <img className="register-logo" src={logo} />
            </Link>
          </div>
        </Container>
        <Container className="py-5 mb-5">
          <div className="login-box">
            <div className="welcome-back mb-3">{text1}</div>
            <div className="d-flex align-items-center gap-md-2 mb-2 register-link">
              <h4>{text2}</h4>
              <Link className="login-text" to="/registerPage">
                {text3}
              </Link>
            </div>
            <Form>
              {/* email  */}
              <Form.Group className="mb-0">
                <Form.Label className="nunito-semi-bold-white-28px input-label">
                  {emailUsername}
                  <span className="required">*</span>
                </Form.Label>
                <Form.Control
                  size="lg"
                  className="input-field login-input"
                  name="emailUsername"
                  placeholder="Enter your email"
                  type={emailUsernameinputType}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <div className="forget-error nunito-normal-river-bed-18px">
                  <strong> {EmailNotExist_Error_message}</strong>{" "}
                </div>
              </Form.Group>

              {showResendEmail && (
                <div className="resend-email">
                  Didn't receive an email?&nbsp;
                  <Link type="button" onClick={sendEmail}>
                    <span className="resend-text"> Resend Email</span>
                  </Link>{" "}
                </div>
              )}
              {/* login button */}
              <div className="text-center d-flex justify-content-center">
                <button
                  type="button"
                  className="registerBtn roboto-bold-white-28px"
                  onClick={UserExist}
                  disabled={!isEnabled}
                >
                  Send Email
                </button>
              </div>
            </Form>
          </div>
        </Container>
      </div>
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default ForgetPassword;
