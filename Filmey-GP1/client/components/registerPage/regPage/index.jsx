import React from "react";
import  { useState } from 'react';
import DatePicker from 'react-date-picker';
import { Link } from "react-router-dom";
// import MultiChoices from "../MultiChoices";
import "./regPage.css";
import Axios from "axios";
import jwt_decode from "jwt-decode";


function regPage(props) {
  
  const [value, onChange] = useState(new Date());
  const {
    backgroundImage,
    logo,
    text1,
    text2,
    text3,
    text4,
    text5,
    text6,
    text7,
  } = props;

  
  const [username,setUsername]=useState('');
  const [userEmail,setUserEmail]=useState('');
  const [userPassword,setUserPassword]=useState('');
  const [userRegion,setUserRegion]=useState('Riyadh');
  const [userGender,setUserGender]=useState('');
  const [userBirthDate,setUserBirthDate]=useState('');
  const [error_message,setError_message]=useState('');



  const API_URL = "http://localhost:3000/api/v1/";

  const  Register=()=>{
    console.log(userEmail);
    console.log(username);
    console.log(userPassword);
    console.log(userGender);
    console.log(userRegion);
    console.log(value);



    const res =  Axios.post(API_URL + "users/register",{
      email: userEmail,
      username: username,
      password:userPassword,
      date_of_birth : value,
      gender: userGender,
      location:userRegion
    }
    )
    .then((res)=>{

      // const token = JSON.stringify(res.data);
      // const decoded = jwt_decode(token);
 
      // console.log(decoded);
      // console.log(JSON.stringify(res.data));
      if(res.data)
          {
          const token = JSON.stringify(res.data);
          console.log(token);
          const decoded = jwt_decode(token);
           console.log(decoded);
           alert("You have successfully registerd");
           window.location = '/home-page';
          }
          else
          {
            //setError_message("user name or email already taken");
            console.log("user name or email already taken");
            setError_message("* Username or email already taken");
          }
      })
    }

  return (
    <div className="PageCenter">
      <div className="regPage screen">
        <div className="regPageContainer">
         <div className="leftSide"></div>
         <img className="regBackgroundImage" src={backgroundImage} />
         <img className="logo" src={logo} />
         <div className="regText1">{text1}</div>
         <div className="regText2 inter-light-bon-jour-35px1">
           <span className="inter-light-bon-jour-35px1">{text2}</span>
         </div>
         <div className="regComponents">
           <h1 className="regText3">{text3}</h1> 
           <div className="regText4">{text4}</div>
           <div>
             <Link to="/login-page">
               <div className="gologinPage">
                 <span className="regText5">{text5}</span>
               </div>
             </Link>
           </div>
          </div>

          {/* error message */}
          <div>
            <div className="regErrorMessage roboto-normal-pink-swan-16px"> {error_message} </div>
          </div>

          <form>
            {/* username */}
            <div className="usernameContainer">
              <div className="usernameBox"></div>
              <input
              className="username roboto-normal-pink-swan-16px"
              name="username"
              placeholder="Enter username"
              type="text"
              required
              onChange={
                (e)=>{
                  setUsername(e.target.value); 
                } 
              }
              />
              <div className="usernameText nunito-normal-river-bed-18px">Username</div>
            </div>

            {/* email */}
            <div className="emailContainer">
              <div className="emailText nunito-normal-river-bed-18px">Email</div>
              <div className="emailBox">
                <input
                  className="email roboto-normal-pink-swan-16px"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                  required
                  onChange={
                    (e)=>{
                      setUserEmail(e.target.value); 
                    }
                  }
                />
              </div>
            </div>

            {/* password */}
            <div className="passwordContainer">
              <div className="passwordText nunito-normal-river-bed-18px">Password</div>
              <div className="passwordBox">
                <input
                  className="password roboto-normal-pink-swan-16px"
                  name="password"
                  placeholder="at least 8 characters "
                  type="password"
                  required
                  minlength="8"
                  onChange={
                    (e)=>{
                      setUserPassword(e.target.value); 
                    }
                  }
                />
              </div>
            </div>

            {/*Gender*/}
            <div className="genderContainer">
              <div className="genderBoxes">
                  <div className="genderText nunito-normal-river-bed-18px">Gender</div>
                  <div className="femalBox border-2px-cardinal">
                      <div class="genreRadio">   
                        <input  className="femaleOption border-2px-cardinal"  
                        type="radio" 
                        value="Female"
                         name="gender" 
                         required 
                         onChange={
                          (e)=>{
                            setUserGender(e.target.value); 
                          }
                        }
                          /> 
                        <span className="femaleText nunito-normal-river-bed-18px"> Female</span> 
                      </div>
                  </div>
              </div>
              <div className="maleBox border-2px-cardinal">
                      <div class="genreRadio"> 
                          < input  className="maleOption"
                           type="radio" 
                           value="Male" 
                           name="gender" 
                           onChange={
                            (e)=>{
                              setUserGender(e.target.value); 
                            }
                          } /> 
                          <span className="maleText nunito-normal-river-bed-18px"> Male</span> 
                      </div>
              </div>
            </div>

            {/*Region*/}
            <div className="regionContainer">
              <div className="regionText nunito-normal-river-bed-18px">Region</div>
              <div>
                  <select className="regionBox" 
                  required 
                  onChange={(e)=>{setUserRegion(e.target.value);}}> 
                      <option className="regionOption roboto-normal-pink-swan-16px" value="Riyadh" >Riyadh</option>
                      <option className="regionOption roboto-normal-pink-swan-16px" value="Makkah">Makkah</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Medina">Medina</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Qassim">Qassim</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Sharqia">Sharqia</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Asir">Asir</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Tabuk">Tabuk</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Hail">Hail</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="NorthernBorder">Northern Border</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Jazan">Jazan</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Najran">Najran</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="AlBaha">AlBaha</option>
                      <option className="regionOption roboto-normal-pink-swan-16px"value="Al-Jawf">Al-Jawf</option>
                  </select> 
              </div>          
            </div>
            <div className="bdContainer">
              <div className="regText6 nunito-normal-river-bed-18px">{text6}</div>

              {/* BOD */}
              <div>
                <div>
                  <DatePicker
                    onChange={onChange}
                    value={value}
                    dateFormat="Pp"
                    format="MM/dd/yyyy"
                    className="datePicker"
                    placeholder="select your birth date"
                    required 
                    onDateChange={(date) => {
                        this.setState({date: date})
                      }}
                  />
                </div>
              </div>
            </div>
            {/* <div className="genreContainer">
              <div className="regText7 nunito-normal-river-bed-18px">{text7}</div>
           <MultiChoices />     
            </div> */}

            {/* creat button */}
            <div className="createButton">
              <button type="button" className="creatButtonBox" onClick={Register}> 
                <div className="createText roboto-bold-white-28px">Create</div>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    
  );
}

export default regPage;
