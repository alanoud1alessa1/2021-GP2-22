import React from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import "./header.css";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

function header(props) {
  var registered = false;
  var username = "";
  var isAdmin = false;
  const [searchInput, setSearchInput] = useState('');
  const searchOptions = [
    {
      id: 0,
      name: "Cobol",
    },
    {
      id: 1,
      name: "JavaScript",
    },
    {
      id: 2,
      name: "Basic",
    },
    {
      id: 3,
      name: "PHP",
    },
    {
      id: 4,
      name: "Java",
    },
  ];

  const handleOnSearch = (string, results) => {
    setSearchInput(string)
  }

  const handleOnSelect = (searchText) => {
    if (searchText==undefined){
    window.location.href = `/searchPage/${searchInput}`;
    }
    else{
    window.location.href = `/searchPage/${searchText.name}`;
  }
  }

  const cookies = new Cookies();
  try {
    const token = cookies.get("token");
    var decoded = jwt_decode(token);
    username = decoded.username;
    // userId = decoded.userID;
    // console.log(userId)
    isAdmin = decoded.isAdmin;
    registered = true;
  } catch {
    registered = false;
  }

  const logOut = () => {
    cookies.remove("token", { path: "/" });
    window.location = "/home-page";
  };

  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
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
    window.location = "/genresPage/1";
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
      
      <div  className="searchBar" >
      <ReactSearchAutocomplete
            items={searchOptions}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            placeholder="Search for a movie, directior, actor.."
            styling={{
              backgroundColor: "black",
              color: "white",
              iconColor: "var(--cardinal)",
              placeholderColor: "white",
              hoverBackgroundColor: "var(--river-bed)",
              clearIconMargin: "3px 8px 0 0",
              lineColor: "white",
              zIndex: 2,
            }}
      /></div> 

      {/* unregisterd user */}
      {!registered && (
        <div className="clickable">
          <Link to="/login-page">
            <img
              className="loginIcon"
              src={"/img/iconly-light-profile@2x.svg"}
            />
            <div>
              <div className="loginText roboto-normal-white-18px2">Login</div>
            </div>
          </Link>
        </div>
      )}

      {!registered && (
        <div className="clickable">
          <Link to="/registerPage">
            <img
              className="registerIcon"
              src={"/img/iconly-light-profile@2x.svg"}
            />
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
      </div>
      )}

      {/* registerd user and not admin */}

      {registered && !isAdmin && (

                <div>

                <Link to="/watchlistPage">
                  <div>
                    <div className="watchlistText darkergrotesque-medium-white-35px2">Watchlist</div>
                  </div>
                </Link>
              </div>
      )
      }
    </div>
  );
}

export default header;
