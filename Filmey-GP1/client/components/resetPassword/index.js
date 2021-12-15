import React from "react";
import { Link, useParams } from "react-router-dom";
import "./resetPassword.css";
import { useState } from "react";
import Axios from "axios";

function loginPage(props) {
  const {
    backgroundImage,
    logo,
    text1,
    text2,
    text3,
    password,
    passwordinputType,
  } = props;

  const [email, setEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [password_error_message, setPassword_Error_message] = useState("");
  const [incorrectpassword_error_message,setIncorrectpassword_Error_message]=useState('');

  const isEnabled = userPassword.length > 0;

  var passwordMessage = "";

  
  //incorrect password
  const checkPassword = (value) => {
    if( value.length<8 ){
      setIncorrectpassword_Error_message('Password length should be at least 8 characters');
      }

     else {
      setIncorrectpassword_Error_message('');
  }

}

  const API_URL = "http://localhost:3000/api/v1/users";


  const { token } = useParams();

  const  resetPassword=()=>{
    // var decoded = jwt_decode(res.data);
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
              <Link to="/registerPage/reg-page">
                <div className="text3Container">
                  <span className="text3">{text3}</span>
                </div>
              </Link>
            </div>

            {/* login form */}
            <form>
              <div className="inputFildes">
                
                {/* New password */}
                <div className="loginPasswordContainer">
                  <div className="password-2 nunito-semi-bold-white-28px">
                    {password}
                  </div>
                  <input
                    className="enterPassword  roboto-normal-pink-swan-16px"
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
                  <div className="loginErrorMessage nunito-semi-bold-white-28px">
                    {password_error_message} 
                    {incorrectpassword_error_message}
                  </div>
                </div>

                {/* login button */}
                <div className="buttonContainer">
                  <button
                    type="button"
                    className="loginButton"
                    onClick={resetPassword}
                    disabled={!isEnabled}
                  >
                    <div className="text4 roboto-bold-white-28px">Confirm</div>
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
