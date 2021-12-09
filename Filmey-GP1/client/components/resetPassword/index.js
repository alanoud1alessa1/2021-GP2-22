import React from "react";
import { Link , useParams} from "react-router-dom";
import "./resetPassword.css";
import jwt_decode from "jwt-decode";
import {useState } from "react";
import Axios from "axios";
import Cookies from 'universal-cookie';
// import ResetPassword from "../resetPassword";


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

  
  const [email,setEmail]=useState('');
  const [userPassword,setuserPassword]=useState('');
  const [password_error_message,setPassword_Error_message]=useState('');

  const isEnabled =userPassword.length >0;

  var passwordMessage="";


  const {userId} = useParams();

  const API_URL = "http://localhost:3000/api/v1/users";

    const resetPassword=()=>
  {
      const res =  Axios.post(API_URL + "/resetPassword",{
        user_id:userId ,
        newPassword: userPassword

      }
      )
      .then((res)=>{
       console.log(res)
      
    alert("Password changed successfully");
    window.location = '/login-page';

      
      })
 }

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
                  <div className="password-2 nunito-semi-bold-white-28px">{password}</div>
                    <input
                      className="enterPassword  roboto-normal-pink-swan-16px"
                      name="password"
                      placeholder={passwordPlaceholder}
                      type={passwordinputType}
                      required
                      onChange={
                        (e)=>{
                          setuserPassword(e.target.value); 
                        }  
                      }
                    />
                  <div  className="loginErrorMessage nunito-semi-bold-white-28px">{password_error_message}</div>
                </div>


                {/* login button */}
                <div className="buttonContainer">
                  <button type="button"  className="loginButton" onClick={resetPassword}  disabled={!isEnabled}>
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