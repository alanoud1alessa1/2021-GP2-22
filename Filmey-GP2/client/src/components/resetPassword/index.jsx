import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { Link, useParams } from "react-router-dom";
import Footer from "../Footer";
import { Container, Form } from "react-bootstrap";
import api from "../../api/axiosAPI"

//import images
import logo from "../../dist/img/Logo.png";

const ResetPassword = (props) => {
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

  const [email, setEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [password_error_message, setPassword_Error_message] = useState("");
  const [incorrectpassword_error_message, setIncorrectpassword_Error_message] =
    useState("");

  const isEnabled = userPassword.length >= 8;
  
  var passwordMessage = "";

  //incorrect password
  const checkPassword = (value) => {
    if (value.length < 8) {
      setIncorrectpassword_Error_message(
        "Password length should be at least 8 characters"
      );
    } else {
      setIncorrectpassword_Error_message("");
    }
  };


  const { token } = useParams();

  const resetPassword = () => {
    const res = api.post("/resetPassword", {
      token: token,
      newPassword: userPassword,
    }).then((res) => {
      try {
        if (res.data.passwordMessage.passwordMessage) {
          passwordMessage = res.data.passwordMessage.passwordMessage;
          setPassword_Error_message(passwordMessage);
        } else {
          setPassword_Error_message("");
        }
      } catch {
        if (passwordMessage) {
          return;
        }

        confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className="customconfirmAlert">
                <h1>Success!</h1>
                <h5>Password changed successfully.</h5>
                <button
                  className="yesButton"
                  onClick={() => {
                    window.location = "/login-page";
                  }}
                >
                  OK
                </button>
              </div>
            );
          },
        });
      }
    });
  };
  return (
    <div>
      <div className="forget-section">
        <Container fluid className="pb-5">
          <div>
            <Link to="/home-page">
              <img className="register-logo" src={logo} />
            </Link>
          </div>
        </Container>
        <Container className="py-5">
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
              <Form.Group className="mb-4">
                <Form.Label className="nunito-semi-bold-white-28px input-label">
                  {password}
                  <span className="required">*</span>
                </Form.Label>
                <Form.Control
                  size="lg"
                  className="input-field login-input"
                  name="password"
                  placeholder="At least 8 characters"
                  type={passwordinputType}
                  required
                  onChange={(e) => {
                    setuserPassword(e.target.value);
                    checkPassword(e.target.value);
                  }}
                  minlength="8"
                />
                <div className="forget-error nunito-normal-river-bed-18px">
                  <strong>
                    {" "}
                    {password_error_message}
                    {incorrectpassword_error_message}
                  </strong>{" "}
                </div>
              </Form.Group>

              {/* login button */}
              <div className="text-center d-flex justify-content-center">
                <button
                  type="button"
                  className="registerBtn roboto-bold-white-28px"
                  onClick={resetPassword}
                  disabled={!isEnabled}
                >
                  Confirm
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

export default ResetPassword;
