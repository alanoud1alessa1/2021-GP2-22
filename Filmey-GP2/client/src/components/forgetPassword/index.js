import React from "react";
import { Link } from "react-router-dom";
import "./forgetPassword.css";
import jwt_decode from "jwt-decode";
import { useState } from "react";
// import Axios from "axios";
import Cookies from "universal-cookie";
import ResetPassword from "../resetPassword";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import Footer from "../Footer";
import api from "../../api/axiosAPI"




function loginPage(props) {
  const {
    backgroundImage,
    logo,
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
  const [EmailNotExist_Error_message, setEmailNotExist_Error_message] = useState("");
  const [showResendEmail, setShowResendEmail] = React.useState(false);

  const isEnabled = email.length > 0;

  var userNotExistMessage = "";

  // const api = "http://localhost:3000/api/v1/";

  const UserExist = () => {
    const res = api.post(api + "Users/userExist", {
      email: email,
    }).then((res) => {
      if (res.data) {
        if (res.data.userNotExistMessage) {
          userNotExistMessage = res.data.userNotExistMessage;
          setEmailNotExist_Error_message(userNotExistMessage);
          return;
        } else {
          setEmailNotExist_Error_message("");
          token=res.data;
          sendEmail();
          setShowResendEmail(true);
        }
      }
    });
  };

  const sendEmail = () => {
    const res = api.post(api + "node-mail", {
      token: token,
    }).then((res) => {});


    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className='customconfirmAlert'>
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
      }
    });
    
  };



  return (
    <div className="PageCenter">
      <div className="loginPage screen">
        <div className="pageContainer">
          <div className="pageBackground"></div>
          <img className="backgroundImage" src={backgroundImage} />
          <Link to="/home-page">
            <img className="logo" src={logo} />
          </Link>
          <div className="loginComponents">
            <div className="passRecoveryText">{text1}</div>

            {/* Send Email */}
            <form>
              <div className="passRecoveryEmail">
                {/* Email*/}
                <div className="passRecoveryEmailContainer">
                  <div className="emailUsername nunito-semi-bold-white-28px">
                    {emailUsername}
                  </div>
                  <input
                    className="enterEmailUsername border-2px-chicago roboto-normal-pink-swan-16px"
                    name="emailUsername"
                    placeholder="Enter your email"
                    type={emailUsernameinputType}
                    required
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <div className="loginErrorMessage nunito-semi-bold-white-28px">
                    {EmailNotExist_Error_message}
                  </div>
                </div>

               {((showResendEmail)  && 

                    <div className="resendEmailText">Didn't receive an email?&nbsp;       
                    <Link
                    type="button"
                    onClick={sendEmail}
                    >
                    <span className="resendText"> Resend Email</span>
                    </Link> </div> )}



                {/* login button */}
                <div className="buttonContainer">
                  <button
                    type="button"
                    className="loginButton"
                    onClick={UserExist}
                    disabled={!isEnabled}
                  >
                    <div className="text4 roboto-bold-white-28px">
                      Send Email
                    </div>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default loginPage;
