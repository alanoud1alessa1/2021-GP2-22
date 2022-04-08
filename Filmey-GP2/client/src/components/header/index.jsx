import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import "./header.css";

//import Images
import logo from "../../dist/img/Logo.png";
import profileImg from "../../dist/img/iconly-light-profile@2x.svg";
import regUserImg from "../../dist/img/regUser.png";

function header(props) {
  var registered = false;
  var username = "";
  var isAdmin = false;

  const cookies = new Cookies();
  try {
    const token = cookies.get("token");
    var decoded = jwt_decode(token);
    username = decoded.username;
    isAdmin = decoded.isAdmin;
    registered = true;
  } catch {
    registered = false;
  }

  const logOut = () => {
    cookies.remove("token", { path: "/" });
    window.location = "/home-page";
  };

  const refreashPage = () => {
    window.location = "/genresPage/1";
  };

  return (
    <div className="header">
      <Link to="/home-page">
        <img className="headerLogo" src={logo} />
      </Link>

      {/* Home */}
      <div>
        <Link to="/home-page">
          <div className="homeText darkergrotesque-medium-white-35px2">
            Home
          </div>
        </Link>
      </div>

      <div onClick={refreashPage}>
        <div>
          <div className="genresText darkergrotesque-medium-white-35px2">
            Genres
          </div>
        </div>
      </div>

      {/* Add movie */}
      {isAdmin && (
        <div>
          <Link to="/movieForm/0">
            <div className="addMovieText darkergrotesque-medium-white-35px2">
              Add movie
            </div>
          </Link>
        </div>
      )}

      {/*Saudi Cinemas*/}
      {!isAdmin && (
        <div>
          <Link to="/cinemasPage">
            <div className="SaudicinemasText darkergrotesque-medium-white-35px2">
              Saudi Cinemas
            </div>
          </Link>
        </div>
      )}

      {/* unregisterd user */}
      {!registered && (
        <div className="clickable">
          <Link to="/login-page">
            <img className="loginIcon" src={profileImg} />
            <div>
              <div className="loginText roboto-normal-white-18px2">Login</div>
            </div>
          </Link>
        </div>
      )}

      {!registered && (
        <div className="clickable">
          <Link to="/registerPage">
            <img className="registerIcon" src={profileImg} />
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
        <div>
          <div className="registeredUser">
            <ul>
              <img className="regUserIcon" src={regUserImg} />
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
        </div>
      )}

      {/* registerd user and not admin */}

      {registered && !isAdmin && (
        <div>
          <Link to="/watchlistPage">
            <div>
              <div className="watchlistText darkergrotesque-medium-white-35px2">
                Watchlist
              </div>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default header;
