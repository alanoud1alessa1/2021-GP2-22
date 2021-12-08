import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import "./header.css";

function header(props) {
  
  var registered =false;
  var username="";
  var isAdmin=false;

  const cookies = new Cookies();
  try{
    const token=cookies.get('token');
    var decoded = jwt_decode(token);
    username=decoded.username;
    isAdmin=decoded.isAdmin;
    registered=true;

  }
  catch{
    registered=false;
    console.log("guest user");}


  const logOut = () => {
    cookies.remove("token", { path: "/" });
    // window.location.reload();
    window.location = '/home-page';
  };

  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
    // headers :{
    //  // 'authorization' : token
  });

  const [Allposters, setAllposters] = useState([]);

  React.useEffect(() => {
    let numOfTopMovies = 10;

    api.get(`/movies/topMovies/${numOfTopMovies}`).then((response) => {
      const postersArray = [...Allposters];

      for (var i = 0; i < numOfTopMovies; i++) {
        postersArray[i] = response.data[i].poster;
      }
      setAllposters(postersArray);
    });
  }, []);


  const refreashPage = () => {
    window.location = '/genresPage/1';
    };

  return (
              <div className="header">
                <Link to="/home-page">
                  <img className="headerLogo" src={"/img/logo.png"} />
                </Link>

                {/* Home */}
                <div>
                  <Link to="/home-page">
                    <div className="homeText darkergrotesque-medium-white-35px2">
                     Home
                    </div>
                  </Link>
                </div>

                {/* Genres */}
                <div>
                <button onClick={refreashPage}>
                    <div>
                      <div className="genresText darkergrotesque-medium-white-35px2">
                        Genres
                      </div>
                    </div>
                    </button>
                </div>

                {/* Add movie */}
                {isAdmin && (
                <div>
                  <Link to="/addMoviePage">
                    <div>
                      <div className="addMovieText darkergrotesque-medium-white-35px2">
                       Add movie
                      </div>
                    </div>
                  </Link>
                </div>
                )}

                {/* unregisterd user */}
                {!registered && (
                  <div className="clickable">
                    <Link to="/login-page">
                      <img className="loginIcon" src={"/img/iconly-light-profile@2x.svg"} />
                      <div>
                        <div className="loginText roboto-normal-white-18px2">
                           Login
                        </div>
                      </div>
                    </Link>
                  </div>
                )}

                {!registered && (
                  <div className="clickable">
                    <Link to="/registerPage/reg-page">
                      <img className="registerIcon" src={"/img/iconly-light-profile@2x.svg"} />
                      <div>
                        <div className="registerText roboto-normal-white-18px2">
                           Register
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
                {/* registerd user */}
                {registered && (
                  <div className="registeredUser"> 
                    <ul>
                      <img className="regUserIcon" src="/img/regUser.png" />
                      <li className="dropdown">
                        <a className="dropbtn ">{username}</a>
                        <div className="dropdownContent">
                          <a className="logout" onClick={logOut}>
                            Logout
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
  )};

export default header;
