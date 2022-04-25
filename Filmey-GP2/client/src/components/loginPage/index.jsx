import React from "react";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import Cookies from "universal-cookie";
import { Container, Form } from "react-bootstrap";
import "./loginPage.css";
import Footer from "../Footer";
import api from "../../api/axiosAPI"

//import images
import logo from "../../dist/img/Logo.png";


const loginPage = (props) => {
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
    text5,
  } = props;

  const [username, setUsername] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [EmailUsername_Error_message, setEmailUsername_Error_message] =
    useState("");
  const [password_error_message, setPassword_Error_message] = useState("");

  const isEnabled = username.length > 0 && userPassword.length > 0;

  var emailOrUsernameMessage = "";
  var passwordMessage = "";

  const SpecifyUserType = () => {
    if (username.substring(0, 5) == "admin") {
      const res = api.post("admins/login", {
        username: username,
        password: userPassword,
      }).then((res) => {
        if (res.data) {
          if (res.data.emailOrUsernameMessage) {
            emailOrUsernameMessage = res.data.emailOrUsernameMessage;
            setEmailUsername_Error_message(emailOrUsernameMessage);
            setPassword_Error_message("");
            return;
          } else {
            setEmailUsername_Error_message("");
          }

          if (res.data.passwordMessage) {
            passwordMessage = res.data.passwordMessage;
            setPassword_Error_message(passwordMessage);
            return;
          } else {
            setPassword_Error_message("");
          }

          const cookies = new Cookies();
          cookies.set("token", res.data, { path: "/" });
          window.location = "/home-page";
        }
      });
    } else {
      const res = api.post("users/login", {
        username: username,
        password: userPassword,
      }).then((res) => {
        if (res.data) {
          if (res.data.emailOrUsernameMessage) {
            emailOrUsernameMessage = res.data.emailOrUsernameMessage;
            setEmailUsername_Error_message(emailOrUsernameMessage);
            setPassword_Error_message("");
            return;
          } else {
            setEmailUsername_Error_message("");
          }

          if (res.data.passwordMessage) {
            passwordMessage = res.data.passwordMessage;
            setPassword_Error_message(passwordMessage);
            return;
          } else {
            setPassword_Error_message("");
          }
          const cookies = new Cookies();
          cookies.set("token", res.data, { path: "/" });
          var decoded = jwt_decode(res.data);
          window.location = "/home-page";
        }
      });
    }
  };
  return (
    <div>
      <div className="login-section">
        <Container fluid className="pb-5">
          <div>
            <Link to="/home-page">
              <img className="register-logo" src={logo} />
            </Link>
          </div>
        </Container>
        <Container className="py-2">
          <div className="login-box">
            <div className="welcome-back mb-3">{text1}</div>
            <div className="mb-5 register-link">
              <h4 className="account-text">
                {text2}{" "}
                <Link className="login-text" to="/registerPage">
                  <strong> {text3}</strong>
                </Link>
              </h4>
            </div>
            <Form>
              {/* email  */}
              <Form.Group className="mb-5 login-field-box">
                <Form.Label className="nunito-semi-bold-white-28px input-label">
                  {emailUsername} <span className="required">*</span>
                </Form.Label>
                <Form.Control
                  size="lg"
                  className="input-field login-input"
                  name="emailUsername"
                  placeholder={emailUsernamePlaceholder}
                  type={emailUsernameinputType}
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
                <div className="login-error nunito-normal-river-bed-18px">
                  <strong>{EmailUsername_Error_message}</strong>{" "}
                </div>
              </Form.Group>
              {/* Password  */}
              <Form.Group className="mb-4 login-field-box">
                <Form.Label className="nunito-semi-bold-white-28px input-label">
                  {password} <span className="required">*</span>
                </Form.Label>
                <Form.Control
                  size="lg"
                  className="input-field login-input"
                  name="password"
                  placeholder={passwordPlaceholder}
                  type="password"
                  required
                  onChange={(e) => {
                    setuserPassword(e.target.value);
                  }}
                  minlength="8"
                />
                <div className="login-error nunito-normal-river-bed-18px">
                  <strong>{password_error_message}</strong>{" "}
                </div>
              </Form.Group>
              <div className="text-end">
                <Link to="/forgetPassword">
                  <p className="forget-password"> {text5} </p>
                </Link>
              </div>
              {/* login button */}
              <div className="text-center d-flex justify-content-center">
                <button
                  type="button"
                  className="registerBtn roboto-bold-white-28px"
                  onClick={SpecifyUserType}
                  disabled={!isEnabled}
                >
                  {text4}
                </button>
              </div>
            </Form>
          </div>
        </Container>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
};

export default loginPage;
