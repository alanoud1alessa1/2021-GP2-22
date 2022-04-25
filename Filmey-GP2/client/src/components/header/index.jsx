import Axios from "axios";
import { isEmptyObject } from "jquery";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import "./header.css";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import Select from "react-select";
import api from "../../api/axiosAPI";

//import Images
import logo from "../../dist/img/Logo.png";
import profileImg from "../../dist/img/iconly-light-profile@2x.svg";
import regUserImg from "../../dist/img/regUser.png";


function Header(props) {
  var registered = false;
  var username = "";
  var isAdmin = false;

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

  const [Allposters, setAllposters] = useState([]);

  const refreashPage = () => {
    window.location = "/genresPage/1";
  };

  const [searchType, setSearchType] = useState("Movie");
  const [searchOptions, setSearchOptions] = useState([]);

  const handleChangeSelect = (e) => {
    setSearchType(e.value);
    var type = e.value;
    var optionArray = [...searchOptions];
    optionArray = [];

    api.get(`/movies/searchOptions/${type}`).then((response) => {
      console.log(response.data);
      if (type == "Actor") {
        for (var i = 0; i < response.data.length; i++) {
          optionArray[i] = { id: i, name: response.data[i].actor };
        }
      }
      if (type == "Director") {
        for (var i = 0; i < response.data.length; i++) {
          optionArray[i] = { id: i, name: response.data[i].director };
        }
      }

      if (type == "Writer") {
        for (var i = 0; i < response.data.length; i++) {
          optionArray[i] = { id: i, name: response.data[i].writer };
        }
      }
      setSearchOptions(optionArray);
      console.log(optionArray);
    });
    console.log(searchType);
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      color: "white",
      background: "black",
      borderColor: "black",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        background: "black",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "white",
      borderColor: "black",
    }),
    option: (provided, state) => ({
      ...provided,
      background: "black",
      color: "white",
      borderColor: "black",

      "&:hover": {
        background: "var(--river-bed)",
      },
      top: 0,
      zIndex: 1,
    }),
    menu: (base) => ({
      ...base,
      background: "black",
      marginTop: 0,
      color: "white",
    }),
    menuList: (base) => ({
      ...base,
      // kill the white space on first and last option
      padding: 0,
      background: "black",
      color: "white",
    }),
  };

  const [searchInput, setSearchInput] = useState("");
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
    {
      label: "Writer",
      value: "Writer",
    },
  ];

  const handleOnSearch = (string, results) => {
    setSearchInput(string);
  };

  const handleOnSelect = (searchText) => {
    if (searchText != undefined) {
      window.location.href = `/searchPage/${searchType}/${searchText.name}`;
    }
  };

  const handleOnKeypress = () => {
    if (searchInput != "") {
      window.location.href = `/searchPage/${searchType}/${searchInput}`;
    }
  };

  const handleOnClear = () => {
    setSearchInput("");
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    var optionArray = [...searchOptions];
    api.get(`/movies/searchOptions/${searchType}`).then((response) => {
      console.log(response.data);
      for (var i = 0; i < response.data.length; i++) {
        optionArray[i] = { id: i, name: response.data[i].title };
      }
      setSearchOptions(optionArray);
      console.log(optionArray);
    });
  }, []);

  return (
    <div>
      <div className="mb-5">
        <Navbar id="nav-bar" className="shadow-lg" variant="dark" expand="lg">
          <Container className="pe-md-5 d-flex align-items-center" fluid>
            <Navbar.Brand as={Link} to="/home-page">
              <img className="headerLogo" src={logo} />
            </Navbar.Brand>
            <div className="d-lg-none ms-auto">
              <div className=" d-flex align-items-center text-center">
                {/* unregisterd user */}
                {!registered && (
                  <Nav.Link
                    as={Link}
                    className="navbar-link p-1"
                    to="/login-page"
                  >
                    <div>
                      <img className="userIcon" src={profileImg} alt="" />
                      <div>
                        <span>Login</span>
                      </div>
                    </div>
                  </Nav.Link>
                )}

                {!registered && (
                  <Nav.Link
                    as={Link}
                    className="navbar-link p-1"
                    to="/registerPage"
                  >
                    <div>
                      <img className="userIcon" src={profileImg} alt="" />
                      <div>
                        <span>Register</span>
                      </div>
                    </div>
                  </Nav.Link>
                )}
              </div>
            </div>
            {registered && !isAdmin && (
              <div className="d-lg-none ms-auto me-2">
                <div className="d-flex gap-3 justify-content-center align-items-center flex-column flex-md-row text-center">
                  {registered && (
                    <div>
                      <div className="registeredUser d-flex align-items-center ms-3">
                        <img className="regUserIcon userIcon" src={regUserImg} />
                        <div className="dropdown">
                          <a className="dropbtn text-capitalize">{username}</a>
                          <div className="dropdownContent">
                            <a className="logout" onClick={logOut}>
                              Logout
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto d-flex align-items-center gap-lg-4">
                <Nav.Link as={Link} className="navbar-link" to="/home-page">
                  Home
                </Nav.Link>
                <Nav.Link>
                  <div onClick={refreashPage}>
                    <div>
                      <div className="navbar-link">Genres</div>
                    </div>
                  </div>
                </Nav.Link>
                {isAdmin && (
                  <div>
                    <Nav.Link
                      as={Link}
                      className="navbar-link"
                      to="/movieForm/0"
                    >
                      Add movie
                    </Nav.Link>
                  </div>
                )}
                {/*Saudi Cinemas*/}
                <div>
                  {!isAdmin && (
                    <Nav.Link
                      as={Link}
                      className="navbar-link"
                      to="/cinemasPage"
                    >
                      {" "}
                      Saudi Cinemas
                    </Nav.Link>
                  )}
                </div>
              </Nav>

              {/* search */}
              <div className="searchBarContainer">
                <Select
                  className="searchDropdown"
                  styles={customStyles}
                  defaultValue={searchTypeOptions[0]}
                  options={searchTypeOptions}
                  value={searchTypeOptions.find(
                    (obj) => obj.value === searchType
                  )}
                  onChange={handleChangeSelect}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      neutral80: "white",
                    },
                  })}
                />
                <div
                  className="searchBar"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleOnKeypress();
                    }
                  }}
                >
                  <ReactSearchAutocomplete
                    className="searchText"
                    items={searchOptions}
                    onSearch={handleOnSearch}
                    onSelect={handleOnSelect}
                    onClear={handleOnClear}
                    placeholder={`Search for ${searchType}`}
                    maxResults="3"
                    fuseOptions={{
                      location: 0,
                      threshold: 0.1,
                      minMatchCharLength: 0,
                      maxPatternLength: 1,
                    }}
                    styling={{
                      height: "40px",
                      backgroundColor: "black",
                      color: "white",
                      iconColor: "var(--cardinal)",
                      placeholderColor: "white",
                      hoverBackgroundColor: "var(--river-bed)",
                      clearIconMargin: "3px 8px 5px 5px",
                      zIndex: 4,
                      outline: "none",
                      border: "1px solid balck",
                      fontSize: "15px",
                    }}
                  />
                </div>
              </div>

              {/* right part  */}
              <Nav className="ms-auto d-flex align-items-center">
                <div className="ms-5 d-none d-lg-flex gap-4 justify-content-center align-items-center flex-column flex-md-row text-center ">
                  {/* unregisterd user */}
                  {!registered && (
                    <Nav.Link
                      as={Link}
                      className="navbar-link"
                      to="/login-page"
                    >
                      <div>
                        <img src={profileImg} alt="" />
                        <div>
                          <span>Login</span>
                        </div>
                      </div>
                    </Nav.Link>
                  )}

                  {!registered && (
                    <Nav.Link
                      as={Link}
                      className="navbar-link"
                      to="/registerPage"
                    >
                      <div>
                        <img src={profileImg} alt="" />
                        <div>
                          <span>Register</span>
                        </div>
                      </div>
                    </Nav.Link>
                  )}
                </div>

                {/* registerd user */}
                <div className="d-none d-lg-flex gap-3 justify-content-center align-items-center flex-column flex-md-row text-center">
                  {/* registerd user and not admin */}

                  <div>
                    {registered && !isAdmin && (
                      <div>
                        <Link to="/watchlistPage">
                          <div>
                            <div className="navbar-link">Watchlist</div>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>

                  {registered && (
                    <div>
                      <div className="registeredUser d-flex align-items-center ms-3">
                        <img className="regUserIcon me-1" src={regUserImg} />
                        <div className="dropdown">
                          <a className="dropbtn text-capitalize">{username}</a>
                          <div className="dropdownContent">
                            <a className="logout" onClick={logOut}>
                              Logout
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* mobile version */}
                <div className="d-flex d-lg-none gap-2 mt-2 justify-content-center align-items-center flex-column flex-lg-row text-center">
                  {/* registerd user and not admin */}

                  <div>
                    {registered && !isAdmin && (
                      <div>
                        <Link to="/watchlistPage">
                          <div>
                            <div className="navbar-link">Watchlist</div>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>

                  {registered && (
                    <div>
                      <div className="registeredUser d-flex align-items-center">
                        <div>
                          <a className="text-white" onClick={logOut}>
                            Logout
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Nav>
              {/* </Nav> */}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
