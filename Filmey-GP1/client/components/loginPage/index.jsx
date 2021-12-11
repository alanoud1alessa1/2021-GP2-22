import React from "react";
import { Link } from "react-router-dom";
import "./loginPage.css";
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
    text5
  } = props;

  
  
  const [username,setUsername]=useState('');
  const [userPassword,setuserPassword]=useState('');
  const [EmailUsername_Error_message,setEmailUsername_Error_message]=useState('');
  const [password_error_message,setPassword_Error_message]=useState('');

  const isEnabled = username.length > 0 && userPassword.length >0;

  var emailOrUsernameMessage="";
  var passwordMessage="";


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
        if(res.data){
          if(res.data.emailOrUsernameMessage)
            {
              emailOrUsernameMessage=res.data.emailOrUsernameMessage;
              console.log(emailOrUsernameMessage);
              setEmailUsername_Error_message(emailOrUsernameMessage);
              setPassword_Error_message("");
              return;
            }
          else{
              setEmailUsername_Error_message("");
            }

          if(res.data.passwordMessage)
          {
            passwordMessage=res.data.passwordMessage;
            console.log(passwordMessage);
            setPassword_Error_message(passwordMessage);
            return;
          }
          else{
            setPassword_Error_message("");
          }
          
              const cookies = new Cookies();
              cookies.set('token', res.data, { path: '/' });;
              alert("Welcome "+username+"!");
              window.location = '/home-page';

          }})}
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
            console.log("res");
            console.log(res);
            if(res.data)
            {
            if(res.data.emailOrUsernameMessage)
            {
              emailOrUsernameMessage=res.data.emailOrUsernameMessage;
              console.log(res.data.emailOrUsernameMessage);
              setEmailUsername_Error_message(emailOrUsernameMessage);
              setPassword_Error_message("");
              return;
            }
            else{
              setEmailUsername_Error_message("");
            }

            if(res.data.passwordMessage)
          {
            passwordMessage=res.data.passwordMessage;
            console.log(res.data.passwordMessage);
            setPassword_Error_message(passwordMessage);
            return;
          }
          else{
            setPassword_Error_message("");
          }
              console.log("cookies");
              const cookies = new Cookies();
              cookies.set('token', res.data, { path: '/' });
              console.log(res.data);
              var decoded = jwt_decode(res.data);
              alert("Welcome "+decoded.username+"!");
               window.location = '/home-page';
            
          }})
          
  }}

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
                {/* username or password */}
                <div className="emialUsernameContainer">
                  <div className="emailUsername nunito-semi-bold-white-28px">{emailUsername}</div>
                    <input
                      className="enterEmailUsername border-2px-chicago roboto-normal-pink-swan-16px"
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
                 <div  className="loginErrorMessage nunito-semi-bold-white-28px">{EmailUsername_Error_message}</div>

                </div>

                {/* password */}
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



                <div><Link to="/forgetPassword" className="text5">{text5}</Link></div>

                {/* login button */}
                <div className="buttonContainer">
                  <button type="button"  className="loginButton" onClick={SpecifyUserType}  disabled={!isEnabled}>
                    <div className="text4 roboto-bold-white-28px">{text4}</div>
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