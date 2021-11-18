import React from "react";
import { Link } from "react-router-dom";
import "./genresPage.css";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";


function genresPage(props) {
  const {
    genreTitle,
    movieName1,
    movieName2,
    movieName3,
    movieName4,
    logo,
    homeText,
    genresText,
    languageText,
    loginText,
    registerText,
    icon,
    footerText2,
    footerText1,
    moviePoster,
    rating1,
    rating2,
    rating3,
    rating4,
    arrowIcon,
    genresGenreTypeText1,
    genresGenreTypeText2,
    genresGenreTypeText3,
    genresGenreTypeText4,
    star,
    leftArrowIcon,
    rightArrowIcon,
 
  } = props;

  var registered =false;
  var username="";

  const cookies = new Cookies();
  try{
    const token=cookies.get('token');
    var decoded = jwt_decode(token);
    username=decoded.username;
    registered=true;

  }
  catch{
    registered=false;
    console.log("guest user");}

  const logOut=()=>
  {
   cookies.remove('token', { path: '/' });
    window.location.reload();
   }
   

 


  return (
    <div className="PageCenter">
      <div className="genresPage screen">
        <div className="genresPageContainer">
          <body>

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

             {/* unregisterd user */}
             {(!registered) && (
                <div className="clickable">
                  <Link to="/login-page">
                    <img className="loginIcon" src={icon} />
                    <div>
                      <div className="loginText roboto-normal-white-18px2">{loginText}</div>
                    </div>
                  </Link>
                </div>)}

                 {(!registered) && (
                <div className="clickable">
                  <Link to="/registerPage/reg-page">
                    <img className="registerIcon" src={icon} /> 
                    <div>
                      <div className="registerText roboto-normal-white-18px2">{registerText}</div>
                    </div>
                  </Link>     
                </div>)}
                 {/* registerd user */}
                 {(registered) && (
                <ul>
                    <img  className="regUserIcon" src="/img/regUser.png"/>
                    <li className="dropdown">
                        <a className="dropbtn ">{username}</a>
                        <div className="dropdownContent">
                        <button onClick={logOut}>Logout</button>
                        {/* <button className="logout" onClick={logOut}>Logout</button> */}
                        </div>
                    </li>
                </ul>)}    
                
              </div>
                  
            </header>

          {/* main */}
          <main>
          <div className="body"></div>
          {/* Title */}
          <div className="goToGenreTypePage">
            <Link to="/genreTypePage">
              <img className="arrowIcon" src={arrowIcon} />
              <h1 className="genreTypeTitle neuton-normal-white-60px3">{genreTitle}</h1>
            </Link>
          </div>
          
          {/* row1  */}
          <div className="movies">
            {/* movie 1 */}
            <div className="Movie1">
              <Link to="/movieInfoPage/ViewMovie/2">
                <img className="genresMoviePoster1" src={moviePoster} />
                <div className="genresMovieName1 roboto-medium-white-15px">{movieName1}</div>
                <div className="genresRating1 neuton-bold-white-30px3">{rating1}</div>
                <img className="genresStar1" src={star} />
                <div className="genresGenreType1">
                  <div className="genresGenreTypeText1 roboto-normal-cardinal-12px3">{genresGenreTypeText1}</div>
                </div>
              </Link>
            </div>
            {/* movie 2 */}
            <div className="Movie2">
              <Link to="/movieInfoPage/ViewMovie/2">
                <img className="genresMoviePoster1" src={moviePoster} />
                <div className="genresMovieName1 roboto-medium-white-15px">{movieName2}</div>
                <div className="genresRating1 neuton-bold-white-30px3">{rating2}</div>
                <img className="genresStar1" src={star} />
                <div className="genresGenreType1">
                  <div className="genresGenreTypeText1 roboto-normal-cardinal-12px3">{genresGenreTypeText2}</div>
                </div>
              </Link>
            </div>
            {/* movie 3 */}
            <div className="Movie3">
            <Link to="/movieInfoPage/ViewMovie/2">
              <img className="genresMoviePoster1" src={moviePoster} />
              <div className="genresMovieName1 roboto-medium-white-15px">{movieName3}</div>
              <div className="genresRating1 neuton-bold-white-30px3">{rating3}</div>
              <img className="genresStar1" src={star} />
              <div className="genresGenreType1">
                <div className="genresGenreTypeText1  roboto-normal-cardinal-12px3">{genresGenreTypeText3}</div>
              </div>
            </Link>
            </div>
            {/* movie 4 */}
            <div className="Movie4">
            <Link to="/movieInfoPage/ViewMovie/2">
              <img className="genresMoviePoster1" src={moviePoster} />
              <div className="genresMovieName1 roboto-medium-white-15px">{movieName4}</div>
              <div className="genresRating1 neuton-bold-white-30px3">{rating4}</div>
              <img className="genresStar1" src={star} />
              <div className="genresGenreType1">
                <div className="genresGenreTypeText1 roboto-normal-cardinal-12px3">{genresGenreTypeText4}</div>   
              </div>
            </Link>
            </div>
          </div>

          {/* row1 movies transition */}
          <img className="genresExpandMoviesLeft" src={leftArrowIcon}/>
          <img className="genresExpandMoviesRight" src={rightArrowIcon} />

          </main>

          {/* footer */}
          <div className="footer"> </div>
          <img className="footerLogo" src={logo} />
          <div className="footerText1">{footerText1}</div>
          <div className="footerText2 inter-light-bon-jour-35px2">
            <span>{footerText2}</span>
          </div>
        </body>
        </div>
      </div>
    </div>
  );
}

export default genresPage;
