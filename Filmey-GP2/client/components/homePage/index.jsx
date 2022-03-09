import React from "react";
import { Link } from "react-router-dom";
import "./homePage.css";
import Axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Header from "../header";
import OwlCarousel from "react-owl-carousel";
import { IoIosArrowForward } from "react-icons/io";


function homePage(props) {
  const options = {
    items: 4,
    margin: 10,
    navText: [
      "<div className='recommendedExpandLeft'>  <img className='reviewsExpandLeft' src='/img/expand-left--review-@2x.svg' /> </div>",
      "<div>  <img className='recommendedExpandRight' src='/img/expand-right--review-@2x.svg' /> </div>",
    ],
    transitionStyle: "fade",
  };
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
  var userId;
  var isAdmin;

  const cookies = new Cookies();
  try {
    const token = cookies.get("token");
    var decoded = jwt_decode(token);
    username = decoded.username;
    userId = decoded.userID;
    isAdmin = decoded.isAdmin;
    registered = true;
  } catch {
    registered = false;
  }

  const logOut = () => {
    cookies.remove("token", { path: "/" });
    window.location.reload();
  };

  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
  });

  const [movieIds, setMovieIds] = useState([]);
  const [Allposters, setAllposters] = useState([]);
  const [recommendedmovieIds, setRecommendedMovieIds] = useState([]);
  const [recommendedmoviePosters, setRecommendedmoviePosters] = useState([]);
  const [similarMoviesPostersState, setSimilarMoviesPostersState] = useState(
    []
  );
  const [movieTitles, setmovieTitles] = useState([]);
  const [totalRatings, settotalRatings] = useState([]);
  const [additionalState, setAdditionalState] = useState([]);
  var similarMoviesPosters = [];
  var similarMoviesIds = [];

  React.useEffect(() => {
    //top 10 movies
    let numOfTopMovies = 10;
    api.get(`/movies/topMovies/${numOfTopMovies}`).then((response) => {
      const IdsArray = [...movieIds];
      const postersArray = [...Allposters];

      for (var i = 0; i < numOfTopMovies; i++) {
        IdsArray[i] = response.data[i].movie_id;
        postersArray[i] = response.data[i].poster;
      }

      setMovieIds(IdsArray);
      setAllposters(postersArray);
    });

    //check thresold for registered users only
    if (registered && !isAdmin) {
      var checkThreshold;

      Axios.post("http://localhost:5000/checkThreshold", {
        userID: userId,
      }).then((response) => {
        checkThreshold = response.data;
        var ifExceedsTwintyRating = response.data[0];
        var ifNeedsReTraining = response.data[1];

        // ifExceedsTwintyRating = true;
        // ifNeedsReTraining = true;

        if (ifExceedsTwintyRating) {
          if (ifNeedsReTraining) {
            // Knowladge Base
            Axios.post("http://localhost:5000/modelBased", {
              userID: userId,
            }).then((response) => {
              console.log("modelBased");
              var movieTitlesArray = [...movieTitles];
              var ratingsArray = [...totalRatings];
              // var additionalState = [...additionalState];
              for (var i = 0; i < response.data.length; i++) {
                similarMoviesIds[i] = response.data[i][0];
                similarMoviesPosters[i] = response.data[i][1];
                movieTitlesArray[i] = response.data[i][2];
                ratingsArray[i] = response.data[i][3];
                additionalState[i] = response.data[i][3];
              }

              setRecommendedMovieIds(similarMoviesIds);
              setRecommendedmoviePosters(similarMoviesPosters);
              setSimilarMoviesPostersState(similarMoviesPosters);
              setmovieTitles(movieTitlesArray);
              settotalRatings(ratingsArray);
              setAdditionalState(additionalState);

              if (additionalState) {
                // re train model UserCB
                Axios.post("http://localhost:5000/reTrainUserCB", {}).then(
                  (response) => {
                    console.log("ReTrain model");
                  }
                );
              }
            });
          } else {
            // userBasedCF
            Axios.post("http://localhost:5000/userBasedCF", {
              userID: userId,
            }).then((response) => {
              var movieTitlesArray = [...movieTitles];
              var ratingsArray = [...totalRatings];
              var additionalState = [...additionalState];

              for (var i = 0; i < 20; i++) {
                similarMoviesIds[i] = response.data[i][0];
                similarMoviesPosters[i] = response.data[i][1];
                movieTitlesArray[i] = response.data[i][2];
                ratingsArray[i] = response.data[i][3];
                additionalState[i] = response.data[i][3];
              }

              setRecommendedMovieIds(similarMoviesIds);
              setRecommendedmoviePosters(similarMoviesPosters);
              setSimilarMoviesPostersState(similarMoviesPosters);
              setmovieTitles(movieTitlesArray);
              settotalRatings(ratingsArray);
              setAdditionalState(additionalState);
            });
          }
        } else {
          // Knowladge Base
          Axios.post("http://localhost:5000/modelBased", {
            userID: userId,
          }).then((response) => {
            var movieTitlesArray = [...movieTitles];
            var ratingsArray = [...totalRatings];
            var additionalState = [...additionalState];
            for (var i = 0; i < response.data.length; i++) {
              similarMoviesIds[i] = response.data[i][0];
              similarMoviesPosters[i] = response.data[i][1];
              movieTitlesArray[i] = response.data[i][2];
              ratingsArray[i] = response.data[i][3];
              additionalState[i] = response.data[i][3];
            }

            setRecommendedMovieIds(similarMoviesIds);
            setRecommendedmoviePosters(similarMoviesPosters);
            setSimilarMoviesPostersState(similarMoviesPosters);
            setmovieTitles(movieTitlesArray);
            settotalRatings(ratingsArray);
            setAdditionalState(additionalState);
          });
        }
      });
    }
  }, []);

  return (
    <div className="PageCenter">
      <div className="homePage screen">
        <div className="homePageContainer">
          <body>
            {/* Header */}
            <header>
              <Header />
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
                  const id = movieIds[i - 1];

                  const url = `/MovieInfoPage/${id}`;
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


            {/* In Cinemas */}
              <div>
                <div className="inCinemasText">
                In Cinemas{" "}

                <div className="arrowIcon"> 
                     <IoIosArrowForward size={50}/>
                </div>
                </div>
              </div>
            
              <div className="InCinemasContainer">
                <OwlCarousel
                  className="homePage-owl-theme"
                  {...options}
                  nav
                >
                  {runCallback(() => {
                    const row = [];

                    for (var i = 0; i <10; i++) {
                      const id = recommendedmovieIds[i];
                      const url = `/movieInfoPage/${id}`;
                      const poster = recommendedmoviePosters[i];
                      const title = movieTitles[i];
                      const rating = totalRatings[i];
                      if (rating == 0) {
                        rating = "No ratings yet.";
                      }
                      row.push(
                        <div key={i}>
                          {
                            <div className="homePageMovie">
                              <Link to={url}>
                                <img
                                  className="homePageMoviePoster"
                                  src={poster}
                                  height="652"
                                  width="512"
                                />
                                <img
                                  className="homepageStar"
                                  src="/img/star-2@2x.svg"
                                />
                                <div className="homePageMovieRating neuton-bold-white-30px">
                                  {rating} 
                                </div>
                                <div className="homePageMovieName neuton-bold-white-30px">
                                  {title} 
                                </div>
                              </Link>
                            </div>
                          }
                        </div>
                      );
                    }
                    return row;
                  })}
                </OwlCarousel>
              </div>
            
            {/* Coming Soon to Cinemas*/}
              <div>
                <div className="ComingSoonText">
                Coming Soon to Cinemas {" "}

                <div className="arrowIcon"> 
                   <IoIosArrowForward size={50}/>
                </div>
                </div>
              </div>
            
              <div className="ComingSoonContainer">
                <OwlCarousel
                  className="homePage-owl-theme"
                  {...options}
                  nav
                >
                  {runCallback(() => {
                    const row = [];

                    for (var i = 0; i <10; i++) {
                      const id = recommendedmovieIds[i];
                      const url = `/movieInfoPage/${id}`;
                      const poster = recommendedmoviePosters[i];
                      const title = movieTitles[i];
                      const rating = totalRatings[i];
                      if (rating == 0) {
                        rating = "No ratings yet.";
                      }
                      row.push(
                        <div key={i}>
                          {
                            <div className="homePageMovie">
                              <Link to={url}>
                                <img
                                  className="homePageMoviePoster"
                                  src={poster}
                                  height="652"
                                  width="512"
                                />
                                <img
                                  className="homepageStar"
                                  src="/img/star-2@2x.svg"
                                />
                                <div className="homePageMovieRating neuton-bold-white-30px">
                                  {rating}
                                </div>
                                <div className="homePageMovieName neuton-bold-white-30px">
                                  {title}
                                </div>
                              </Link>
                            </div>
                          }
                        </div>
                      );
                    }
                    return row;
                  })}
                </OwlCarousel>
              </div>
            
            
            {/* Recommended For u */}
            {registered && !isAdmin && (

               <div>
                <h1 className="recommendedForYouText">
                  Recommended For&ensp;<strong> {username} </strong>{" "}
                </h1> 
              </div>
            )}

            {registered && !isAdmin && (
              <div className="recommendedForYouContainer">
                <OwlCarousel
                  className="homePage-owl-theme"
                  {...options}
                  nav
                >
                  {runCallback(() => {
                    const row = [];

                    for (var i = 0; i <10; i++) {
                      const id = recommendedmovieIds[i];
                      const url = `/movieInfoPage/${id}`;
                      const poster = recommendedmoviePosters[i];
                      const title = movieTitles[i];
                      const rating = totalRatings[i];
                      if (rating == 0) {
                        rating = "No ratings yet.";
                      }
                      row.push(
                        <div key={i}>
                          {
                            <div className="homePageMovie">
                              <Link to={url}>
                                <img
                                  className="homePageMoviePoster"
                                  src={poster}
                                  height="652"
                                  width="512"
                                />
                                <img
                                  className="homepageStar"
                                  src="/img/star-2@2x.svg"
                                />
                                <div className="homePageMovieRating neuton-bold-white-30px">
                                  {rating} 
                                </div>
                                <div className="homePageMovieName neuton-bold-white-30px">
                                  {title} 
                                </div>
                              </Link>
                            </div>
                          }
                        </div>
                      );
                    }
                    return row;
                  })}
                </OwlCarousel>
              </div>
            )} 

            {/* footer */}
            <footer className="homePagefooter">
              <img className="homePagefooterLogo" src={logo} />
              <div className="homePagefooterText1">{footerText1}</div>
              <div className="homePagecopyRightText inter-light-bon-jour-35px2">
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
