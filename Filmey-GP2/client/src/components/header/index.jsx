import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import "./header.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Select from "react-select";
import { useState } from "react";

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

  const [searchType, setSearchType] = useState('Movie');

  const handleChangeSelect = e => {
    setSearchType(e.value);
    console.log(searchType);
  }

  const customStyles = {
    control: (base, state) => ({
      ...base,
      color:'white',
      background: "black",
      borderColor: "black",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        background: "black"
      },
    }),
    singleValue:(provided) => ({
      ...provided,
      color:'white',
      borderColor: "black",

    }),  
    option: (provided, state) => ({
      ...provided,
      background:"black",
      color:'white',
      borderColor: "black",

      "&:hover": {
        background: "var(--river-bed)"
      },
      top:0,
      zIndex: 1,

    }),
    menu: base => ({
        ...base,
        background:"black",
        marginTop:0,   
        color:'white',  
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
      background:"black",
      color:'white',  
    })
  }

  const searchOptions = [
    {
      id: 0,
      name: "Cobol"
    },
    {
      id: 1,
      name: "JavaScript"
    },
    {
      id: 2,
      name: "Basic"
    },
    {
      id: 3,
      name: "PHP"
    },
    {
      id: 4,
      name: "Java"
    }
  ];

  
  const [searchInput, setSearchInput] = useState('');
  const searchTypeOptions = [
    {
      label: "Movie",
      value: "Movie",
    },
    {
      label: "Director",
      value: "Director",
    },
    {
      label: "Actor",
      value: "Actor",
    },
  ];

  const handleOnSearch = (string, results) => {
    setSearchInput(string)
  }

  const handleOnSelect = (searchText) => {
    if (searchText==undefined){
      if(searchInput!=""){
        window.location.href = `/searchPage/${searchType}/${searchInput}`;
      }
    }
    else{
    window.location.href = `/searchPage/${searchType}/${searchText.name}`;
  }
  }


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

      {/* search */}
      <div  className="searchBarContainer">
      <Select
          className="searchDropdown"
          styles={customStyles}
          defaultValue={searchTypeOptions[0]}
          options={searchTypeOptions}
          value={searchTypeOptions.find(obj => obj.value === searchType)}
          onChange={handleChangeSelect} 
          theme={(theme) => ({
            ...theme,
            borderRadius: 0,
            colors: {
            ...theme.colors,
              neutral80: 'white',
            },
          })}
        />
      </div>
      <div className="searchBar">
      <ReactSearchAutocomplete
            items={searchOptions}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            placeholder= {`Search for ${searchType}`}
            maxResults= "3"
            fuseOptions={
            {
              location: 0,
              threshold: 0.1,
              minMatchCharLength: 0,
              maxPatternLength: 1,
            }
            }
            styling={{
              backgroundColor: "black",
              color: "white",
              iconColor: "var(--cardinal)",
              placeholderColor: "white",
              hoverBackgroundColor: "var(--river-bed)",
              clearIconMargin: "3px 8px 5px 5px",
              zIndex: 4,
              outline: "none",
              border: '1px solid balck',

            }}
      />
      </div>


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
