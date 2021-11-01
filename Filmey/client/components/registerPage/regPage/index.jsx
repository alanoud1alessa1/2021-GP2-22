import React from "react";
import { Link } from "react-router-dom";
import Email from "../email";
import Password from "../password";
import Create from "../loginButton";
import MultiChoices from "../MultiChoices";
import BOD from "../birthDate";
import Username from "../username";
import Gender from "../gender";
import Region from "../Region";


import "./regPage.css";


function regPage(props) {
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

  return (
    <div className="PageCenter">
      <div className="regPage screen">
        <div className="regPageContainer">
         <div className="leftSide"></div>
         <img className="regBackgroundImage" src={backgroundImage} />
         <img className="logo" src={logo} />
         <div className="regText1">{text1}</div>
         <div className="regText2 inter-light-bon-jour-35px">
           <span className="inter-light-bon-jour-35px">{text2}</span>
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
          <Username />
          <Email />
          <Password />
          <Gender/>
          <Create />
          <Region />              
          <div className="bdContainer">
            <div className="regText6 nunito-normal-river-bed-18px">{text6}</div>
            <BOD />              
          </div>
          <div className="genreContainer">
            <div className="regText7 nunito-normal-river-bed-18px">{text7}</div>
            <MultiChoices />    
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default regPage;
