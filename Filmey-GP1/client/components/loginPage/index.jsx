import React from "react";
import { Link } from "react-router-dom";
import "./loginPage.css";
import jwt_decode from "jwt-decode";
import {useState } from "react";
import Axios from "axios";

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

  
  const [username,setUsername]=useState('');
  const [userPassword,setuserPassword]=useState('');
  const [error_message,setError_message]=useState('');


  const API_URL = "http://localhost:3000/api/v1/";

    const SpecifyUserType=()=>
  {
    console.log(username.substring(0,5))
    if(username.substring(0,5)=="admin")
    {
      console.log("this is admin");
      console.log("indise Admin function");
      const res =  Axios.post(API_URL + "admins/login",{
        username :username,
        password:userPassword
      }
      )
      .then((res)=>{
        if(res.data)
          {
          const token = JSON.stringify(res.data);
          console.log(token);
          const decoded = jwt_decode(token);
          console.log(decoded);
          window.location = '/home-page';
          }
          else
          {
            setError_message("* Incorrect username or password");
          }
        })
    }
    else
    {
      console.log("this is user");
        console.log(username);
        const res =  Axios.post(API_URL + "users/login",{
          username :username,
          password:userPassword
        }
        )
        .then((res)=>{
          if(res.data)
          {
          const token = JSON.stringify(res.data);
          console.log(token);
          const decoded = jwt_decode(token);
          console.log(decoded);
          window.location = '/home-page';
          }
          else
          {
            setError_message("incorrect email/username or password");
          }
          })
        }
  }

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

            {/* login form */}
            <form>
            {/* error message */}
            <div className="loginErrorMessage nunito-semi-bold-white-28px"> {error_message} </div>
              <div className="inputFildes">
                {/* username or password */}
                <div className="emialUsernameContainer">
                  <div className="emailUsername nunito-semi-bold-white-28px">{emailUsername}</div>
                  <div className="frame1 border-2px-chicago">
                    <input
                      className="enterEmailUsername roboto-normal-pink-swan-16px"
                      name="emailUsername"
                      placeholder={emailUsernamePlaceholder}
                      type={emailUsernameinputType}
                      required
                      onChange={
                        (e)=>{
                          setUsername(e.target.value); 
                        } 
                      }
                    />
                  </div>
                </div>

                {/* password */}
                <div className="loginPasswordContainer">
                  <div className="password-2 nunito-semi-bold-white-28px">{password}</div>
                  <div className="frame1 border-2px-chicago">
                    <input
                      className="enterPassword roboto-normal-pink-swan-16px"
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
                  </div>
                </div>

                {/* login button */}
                <div className="buttonContainer">
                  <div type="button"  className="loginButton" onClick={SpecifyUserType}>
                    <div className="text4 roboto-bold-white-28px">{text4}</div>
                  </div>
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