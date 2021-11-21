import React from "react";
import { Link } from "react-router-dom";
import "./genresPage.css";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import { useState } from "react";

function genresPage(props) {
  const runCallback = (cb) => {
    return cb();
  };

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
  });



  const [allGenres,setAllGenres]=useState([]);
  const [numOfGenres,setNumOfGenres]=useState();

  const [moviesId, setMoviesId] = useState([]);
  const [movieTitles, setmovieTitles] = useState([]);
  const [Allposters, setAllposters] = useState([]);


  React.useEffect(() => {
    let genresArray = [...allGenres];


    //Get All Genres
    api.get(`/movies/allGenres/1`).then((response) => {

      for (var i = 0; i < response.data.length; i++) {
        genresArray[i] = response.data[i].genre;
      }
      // console.log(genresArray[4])
      setAllGenres(genresArray);
    });




console.log(genresArray.length);


    let genreType = 'Comedy';

    api.get(`/movies/genresFilter/${genreType}`).then((response) => {

      const moviesIdArray = [...moviesId];
      const movieTitlesArray = [...movieTitles];
      const postersArray = [...Allposters];

      for (var i = 0; i < response.data.length; i++) {
        moviesIdArray[i] = response.data[i].movie_id;
        movieTitlesArray[i] = response.data[i].title;
        postersArray[i] = response.data[i].poster;
      }
      setMoviesId(moviesIdArray);
      setmovieTitles(movieTitlesArray);
      setAllposters(postersArray);
    });
  }, []);

  return (
    <div className="PageCenter">
      <div className="genresPage screen">
        <div className="genresPageContainer">
          <body>
            {/* Header */}
            <header>
              <div className="header">
                <Link to="/home-page">
                  <img className="headerLogo" src={props.logo} />
                </Link>
                <div>
                  <Link to="/home-page">
                    <div className="homeText darkergrotesque-medium-white-35px2">
                      {props.homeText}
                    </div>
                  </Link>
                </div>
                <div>
                  <Link to="/genresPage">
                    <div>
                      <div className="genresText darkergrotesque-medium-white-35px2">
                        {props.genresText}
                      </div>
                    </div>
                  </Link>
                </div>

                {/* unregisterd user */}
                {!registered && (
                  <div className="clickable">
                    <Link to="/login-page">
                      <img className="loginIcon" src={props.icon} />
                      <div>
                        <div className="loginText roboto-normal-white-18px2">
                          {props.loginText}
                        </div>
                      </div>
                    </Link>
                  </div>
                )}

                {!registered && (
                  <div className="clickable">
                    <Link to="/registerPage/reg-page">
                      <img className="registerIcon" src={props.icon} />
                      <div>
                        <div className="registerText roboto-normal-white-18px2">
                          {props.registerText}
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
                      <a className="dropbtn ">{props.username}</a>
                      <div className="dropdownContent">
                        <button onClick={logOut}>Logout</button>
                        {/* <button className="logout" onClick={logOut}>Logout</button> */}
                      </div>
                    </li>
                  </ul>
                )}
              </div>
            </header>

            {/* main */}
            <main>
              <div className="body"></div>
              {/* Title */}
              <div className="goToGenreTypePage">
                <Link to="/genreTypePage">
                  <img className="arrowIcon" src={props.arrowIcon} />
                  <h1 className="genreTypeTitle neuton-normal-white-60px3">
                    {props.genreTitle}
                  </h1>
                </Link>
              </div>

              {/* row1  */}
              <div className="movies">
                {runCallback(() => {
                  const row = [];

                  for (var i = 5; i <= 8; i++) {
                    const id = moviesId[i - 1];
                    const url = `/movieInfoPage/ViewMovie/${id}`;
                    const poster = Allposters[i - 1];
                    const title = movieTitles[i - 1];
                    const reminder = i % 4;

                    if (reminder == 0) {
                      reminder = 4;
                    }
                    const className1 = `Movie${reminder}`;

                    row.push(
                      <div key={i}>
                        {
                          <div className={className1}>
                            <Link to={url}>
                              <img
                                className="genresMoviePoster1"
                                src={poster}
                              />
                              <div className="genresMovieName1 roboto-medium-white-15px">
                                {title}
                              </div>
                              <div className="genresRating1 neuton-bold-white-30px3">
                                {props.rating1}
                              </div>
                              <img className="genresStar1" src={props.star} />
                              <div className="genresGenreType1">
                                <div className="genresGenreTypeText1 roboto-normal-cardinal-12px3">
                                  {props.genresGenreTypeText1}
                                </div>
                              </div>
                            </Link>
                          </div>
                        }
                      </div>
                    );
                  }
                  return row;
                })}

                {/* movie 1 */}
                {/* <div className="Movie1">
              <Link to={url}>
                <img className="genresMoviePoster1" src={Allposters[0]} />
                <div className="genresMovieName1 roboto-medium-white-15px">{Allposters[0]}</div>
                <div className="genresRating1 neuton-bold-white-30px3">{props.rating1}</div>
                <img className="genresStar1" src={props.star} />
                <div className="genresGenreType1">
                  <div className="genresGenreTypeText1 roboto-normal-cardinal-12px3">{props.genresGenreTypeText1}</div>
                </div>
              </Link> */}
              </div>
              {/* movie 2 */}
              <div className="Movie2">
                {/* <Link to="/movieInfoPage/ViewMovie/2">
                <img className="genresMoviePoster1" src={Allposters[1]} />
                <div className="genresMovieName1 roboto-medium-white-15px">{props.movieName2}</div>
                <div className="genresRating1 neuton-bold-white-30px3">{props.rating2}</div>
                <img className="genresStar1" src={props.star} />
                <div className="genresGenreType1">
                  <div className="genresGenreTypeText1 roboto-normal-cardinal-12px3">{props.genresGenreTypeText2}</div>
                </div>
              </Link> */}
              </div>
              {/* movie 3 */}
              {/* <div className="Movie3">
            <Link to="/movieInfoPage/ViewMovie/2">
              <img className="genresMoviePoster1" src={Allposters[2]} />
              <div className="genresMovieName1 roboto-medium-white-15px">{props.movieName3}</div>
              <div className="genresRating1 neuton-bold-white-30px3">{props.rating3}</div>
              <img className="genresStar1" src={props.star} />
              <div className="genresGenreType1">
                <div className="genresGenreTypeText1  roboto-normal-cardinal-12px3">{props.genresGenreTypeText3}</div>
              </div>
            </Link>
            </div> */}
              {/* movie 4 */}
              <div className="Movie4">
                {/* <Link to="/movieInfoPage/ViewMovie/2">
              <img className="genresMoviePoster1" src={Allposters[3]} />
              <div className="genresMovieName1 roboto-medium-white-15px">{props.movieName4}</div>
              <div className="genresRating1 neuton-bold-white-30px3">{props.rating4}</div>
              <img className="genresStar1" src={props.star} />
              <div className="genresGenreType1">
                <div className="genresGenreTypeText1 roboto-normal-cardinal-12px3">{props.genresGenreTypeText4}</div>   
              </div>
            </Link>
            </div> */}
              </div>

              {/* row1 movies transition */}
              <img
                className="genresExpandMoviesLeft"
                src={props.leftArrowIcon}
              />
              <img
                className="genresExpandMoviesRight"
                src={props.rightArrowIcon}
              />
            </main>

            {/* footer */}
            <div className="footer"> </div>
            <img className="footerLogo" src={props.logo} />
            <div className="footerText1">{props.footerText1}</div>
            <div className="footerText2 inter-light-bon-jour-35px2">
              <span>{props.footerText2}</span>
            </div>
          </body>
        </div>
      </div>
    </div>
  );
}

export default genresPage;
