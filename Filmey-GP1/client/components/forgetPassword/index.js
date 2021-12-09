import React from "react";
import { Link } from "react-router-dom";
import "./forgetPassword.css";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import ResetPassword from "../resetPassword";

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

  // const [userId, setUserId] = useState();
  var userId =0;
  const [email, setEmail] = useState("");
  const [EmailNotExist_Error_message, setEmailNotExist_Error_message] =
    useState("");

  const isEnabled = email.length > 0;

  var userNotExistMessage = "";

  const API_URL = "http://localhost:3000/api/v1/";

  const UserExist = () => {
    const res = Axios.post(API_URL + "Users/userExist", {
      email: email,
    }).then((res) => {
      // console.log(res);
      if (res.data) {
        if (res.data.userNotExistMessage) {
          userNotExistMessage = res.data.userNotExistMessage;
          setEmailNotExist_Error_message(userNotExistMessage);
          return;
        } else {
          setEmailNotExist_Error_message("");
          userId = res.data.userID;
          // setUserId(4);
          sendEmail();
          // window.location = `http://localhost:1234/emailSend/${res.data.userID}/${email}`;
        }
      }
    });
  };

  const sendEmail = () => {
    console.log(userId)
  const res = Axios.post(API_URL + "node-mail", {
    email: email,
    userId: userId,
    // emaiText:  "<p>Reset your new password Using the link</p> <a href=`http://localhost:1234/resetpassword/${userId}`>Reset Password Link</a>"
  }).then((res) => {
   
  });

  alert(
    "Check your email! We've sent you instructions for resetting your password."
  );
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
            <div className="text1">{text1}</div>
            <div className="regContainer">
              <div className="text2">{text2}</div>
            </div>

            {/* Send Email */}
            <form>
              <div className="inputFildes">
                {/* Email*/}
                <div className="emialUsernameContainer">
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

                {/* login button */}
                <div className="buttonContainer">
                  <button
                    type="button"
                    className="loginButton"
                    onClick={UserExist}
                    disabled={!isEnabled}
                  >
                    <div className="text4 roboto-bold-white-28px">Send Email</div>
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
