import React from "react";
import "./reviewPage.css";
import { Link } from "react-router-dom";


function reviewPage(props) {
  const {
    logo,
    homeText,
    genresText,
    languageText,
    footerText1,
    footerText2,
    submitText,
    inputPlaceholder,
  } = props;

  return (
    <div className="PageCenter">
      <div className="reviewPage screen">
        <div className="reviewPageContainer"></div>
        
            {/* Header */}
            <header>
                <div className="header"> 
                    <Link to="/home-page">
                        <img className="headerLogo" src={logo} />
                    </Link>
                    <div>
                    <Link to="/home-page">
                        <div className="homeText darkergrotesque-medium-white-35px2">{homeText}</div>
                    </Link>
                    </div>
                    <div>
                    <Link to="/genresPage">
                        <div>
                        <div className="genresText darkergrotesque-medium-white-35px2">{genresText}</div>
                        </div>
                    </Link>
                    </div>

                {/* registerd user */}
                <ul>
                    <img  className="regUserIcon" src="/img/regUser.png"/>
                    <li className="dropdown">
                        <a className="dropbtn">Username</a>
                        <div className="dropdownContent">
                        <a className="logout">Logout</a>
                        </div>
                    </li>
                </ul>

               </div>
        </header>

            {/* main */}
            <main>
            <div className="reviewBody"></div>
            <div>
                <div className="reviewBox"></div>
                <textarea className="writeReview" name="writeReview" placeholder={inputPlaceholder} rows="5" cols="73">                
                </textarea>
                <div className="submitButton">
                <Link to="/home-page">
                <div className="submitButtonContainer">
                        <div className="submitText">{submitText}</div>
                </div>
                </Link>
                </div>
            </div>
            </main>

            {/* footer */}
            <footer>
            <div className="reviewFooter"> </div>
                <img className="reviewFooterLogo" src={logo} />
                <div className="reviewfooterText1">{footerText1}</div>
                <div className="reviewcopyRightText inter-light-bon-jour-35px2">
                <span>{footerText2}</span>
                </div>
            </footer>
        
        </div>
      </div>
  );
}

export default reviewPage;
