import React from "react";
import { Link } from "react-router-dom";
import "./forgetPassword.css";
import { useState } from "react";

function loginPage(props) {
  const {
    backgroundImage,
    logo,
    text1,
    emailUsername,
    emailUsernameinputType,
  } = props;

  var token = "";
  const [email, setEmail] = useState("");
  const [EmailNotExist_Error_message, setEmailNotExist_Error_message] =
    useState("");
  const [showResendEmail, setShowResendEmail] = React.useState(false);

  const isEnabled = email.length > 0;

  const UserExist = () => {
  };

  const sendEmail = () => {
    console.log(token);

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
