import React from "react";
import { Link } from "react-router-dom";
import "./homePage.css";
import Axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
// import Loop from "../loop";

function homePage(props) {
  const runCallback = (cb) => {
    return cb();
  };

  const {
    fireIcon,
    logo,
    footerText1,
    footerText2,
    registerText,
    loginText,
    genresText,
    homeText,
    top10Text,
    icon,
  } = props;

  var registered = false;
  var username = "";

  const cookies = new Cookies();
  try {
    const token = cookies.get("token");
    var decoded = jwt_decode(token);
    username = decoded.username;
    registered = true;
  } catch {
    registered = false;
    console.log("guest user");
  }

  const logOut = () => {
    cookies.remove("token", { path: "/" });
    window.location.reload();
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

  return (
    <div className="PageCenter">
      <div className="homePage screen">
        <div className="homePageContainer">
          <body>
            {/* Header */}
            <header>
              <div className="header">
                <Link to="/home-page">
                  <img className="headerLogo" src={logo} />
                </Link>
                <div>
                  <Link to="/home-page">
                    <div className="homeText darkergrotesque-medium-white-35px2">
                      {homeText}
                    </div>
                  </Link>
                </div>
                <div>
                  <Link to="/genresPage">
                    <div>
                      <div className="genresText darkergrotesque-medium-white-35px2">
                        {genresText}
                      </div>
                    </div>
                  </Link>
                </div>

                {/* unregisterd user */}
                {!registered && (
                  <div className="clickable">
                    <Link to="/login-page">
                      <img className="loginIcon" src={icon} />
                      <div>
                        <div className="loginText roboto-normal-white-18px2">
                          {loginText}
                        </div>
                      </div>
                    </Link>
                  </div>
                )}

                {!registered && (
                  <div className="clickable">
                    <Link to="/registerPage/reg-page">
                      <img className="registerIcon" src={icon} />
                      <div>
                        <div className="registerText roboto-normal-white-18px2">
                          {registerText}
                        </div>
                      </div>
                    </Link>
                  </div>
                )}
                {/* registerd user */}
                {registered && (
                  <ul>
                    <img className="regUserIcon" src="/img/regUser.png" />
                    <li className="dropdown">
                      <a className="dropbtn ">{username}</a>
                      <div className="dropdownContent">
                        <button className="logout" onClick={logOut}>
                          Logout
                        </button>
                        {/* <button className="logout" onClick={logOut}>Logout</button> */}
                      </div>
                    </li>
                  </ul>
                )}
              </div>
            </header>

            {/* main */}
            <div className="body"></div>

            {/* Title */}
            <div>
              <img className="fireIcon" src={fireIcon} />
              <h1 className="top10Text animate-enter">{top10Text}</h1>
            </div>

            <marquee
              behavior="alternate"
              direction="left"
              scrollamount="12"
              className="top10Movies"
            >
              {/* movies loop	 */}
              {runCallback(() => {
                const row = [];

                for (var i = 1; i <= 10; i++) {
                  const url = `/movieInfoPage/ViewMovie/${i}`;
                  const poster = Allposters[i - 1];
                  row.push(
                    <div key={i}>
                      {
                        <div className="moviesLoop">
                          <Link to={url}>
                            <img
                              className="homeMoviePoster"
                              src={poster}
                              height="652"
                              width="512"
                            />
                          </Link>
                        </div>
                      }
                    </div>
                  );
                }
                return row;
              })}
            </marquee>

            {/* footer */}
            <footer>
              <div className="footer"> </div>
              <img className="footerLogo" src={logo} />
              <div className="footerText1"> {footerText1}</div>
              <div className="copyRightText inter-light-bon-jour-35px2">
                <span>{footerText2}</span>
              </div>
            </footer>
          </body>
        </div>
      </div>
    </div>
  );
}

export default homePage;
