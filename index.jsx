import React from "react";
import { Link } from "react-router-dom";
import "./loginPage.css";

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

  return (
    <div className="PageCenter">
      <div className="loginPage screen">
        <div className="pageContainer">
          <div className="pageBackground"></div>
          <img className="backgroundImage" src={backgroundImage} />
          <img className="logo" src={logo} />
          <div className="loginComponents">
            <div className="text1">{text1}</div>
            <div className="regContainer">
              <div className="text2">{text2}</div>
              <Link to="/registerPage/reg-page">
                <div className="text3Container">
                  <span className="text3">{text3}</span>
                </div>
              </Link>
            </div>
            <div className="inputFildes">
              <div className="emialUsernameContainer">
                <div className="emailUsername nunito-semi-bold-white-28px">{emailUsername}</div>
                <div className="frame1 border-2px-chicago">
                  <input
                    className="enterEmailUsername roboto-normal-pink-swan-16px"
                    name="emailUsername"
                    placeholder={emailUsernamePlaceholder}
                    type={emailUsernameinputType}
                    required
                  />
                </div>
              </div>
              <div className="passwordContainer">
                <div className="password-2 nunito-semi-bold-white-28px">{password}</div>
                <div className="frame1 border-2px-chicago">
                  <input
                    className="enterPassword roboto-normal-pink-swan-16px"
                    name="password"
                    placeholder={passwordPlaceholder}
                    type={passwordinputType}
                    required
                  />
                </div>
              </div>
              <div className="buttonContainer">
                <Link to="/registerPage/reg-page">
                  <div className="loginButton">
                    <div className="text4 roboto-bold-white-28px">{text4}</div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default loginPage;