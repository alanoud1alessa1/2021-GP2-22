
import React from "react";
import { Link } from "react-router-dom";
import "./homePage.css";
import Axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Header from "../header";
import Footer from "../Footer"
import OwlCarousel from "react-owl-carousel";
import { IoIosArrowForward } from "react-icons/io";
import api from "../../api/axiosAPI"
import flaskAPI from "../../api/flaskAPI"


function homePage(props) {
  const options = {
    items: 4,
    margin: 10,
    navText: [
     " <div className='recommendedExpandLeft'> <h1><</h1></div>",
      "<div className='recommendedExpandRight'><h1>></h1> </div>",
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

  // const api = Axios.create({
  //   baseURL: "http://localhost:3000/api/v1",
  // });

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

  //Coming Soon Variables and constans
  const [comingSoonMovieIds, setComingSoonMovieIds] = useState([]);
  const [comingSoonMovieTitles, setComingSoonMovieTitles] = useState([]);
  const [comingSoonMoviePosters, setComingSoonMoviePosters] = useState([]);
  const [numOfComingSoonMovie, setNumOfComingSoonMovie] = useState(0);
  const [comingSoonMovieRatings, setComingSoonMovieRatings] = useState([]);

  //Whats on Variables and constans
  const [whatsOnMovieIds, setWhatsOnMovieIds] = useState([]);
  const [whatsOnMovieTitles, setWhatsOnMovieTitles] = useState([]);
  const [whatsOnMoviePosters, setWhatsOnMoviePosters] = useState([]);
  const [numOfWhatsOnMovie, setNumOfWhatsOnMovie] = useState(0);
  const [whatsOnMovieRatings, setWhatsOnMovieRatings] = useState([]);

 

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

    api.get(`/movies/whatsOnMovies/${numOfTopMovies}`).then((response) => {

      console.log('whatsOnMovies')
      console.log(response.data)
  
        var whatsOnIdsArray = [...whatsOnMovieIds];
        var whatsOnTitlesArray = [...whatsOnMovieTitles];
        var whatsOnPostersArray = [...whatsOnMoviePosters];
        var whatsOnRatingsArray = [...whatsOnMovieRatings];

        setNumOfWhatsOnMovie(response.data.length)

        for (var i = 0; i < response.data.length; i++) {
          whatsOnIdsArray[i] = response.data[i].movie_id;
          whatsOnTitlesArray[i] = response.data[i].title;
          whatsOnPostersArray[i] = response.data[i].poster;
          whatsOnRatingsArray[i]= response.data[i].total_rating;
         }

         setWhatsOnMovieIds(whatsOnIdsArray);
         setWhatsOnMovieTitles(whatsOnTitlesArray);
         setWhatsOnMoviePosters(whatsOnPostersArray);
         setWhatsOnMovieRatings(whatsOnRatingsArray);
       
      });



    //Get coming soon
    api.get(`/movies/comingSoonMovies/${numOfTopMovies}`).then((response) => {
      

      var comingSoonIdsArray = [...comingSoonMovieIds];
      var comingSoonTitlesArray = [...comingSoonMovieTitles];
      var comingSoonPostersArray = [...comingSoonMoviePosters];
      var comingSoonRatingsArray = [...comingSoonMovieRatings];
      setNumOfComingSoonMovie(response.data.movies.length)

      for (var i = 0; i < response.data.movies.length; i++) {
        comingSoonIdsArray[i] = response.data.movies[i].movie_id;
        comingSoonTitlesArray[i] = response.data.movies[i].title;
        comingSoonPostersArray[i] = response.data.movies[i].poster;
        console.log(response.data.movies[i].total_rating)
        comingSoonRatingsArray[i]= response.data.movies[i].total_rating;
       }

       setComingSoonMovieIds(comingSoonIdsArray);
       setComingSoonMovieTitles(comingSoonTitlesArray);
       setComingSoonMoviePosters(comingSoonPostersArray);
       setComingSoonMovieRatings(comingSoonRatingsArray);
     
    });


    //check thresold for registered users only
    if (registered && !isAdmin) {
      var checkThreshold;

      flaskAPI.post("/checkThreshold", {
        userID: userId,
      }).then((response) => {
        checkThreshold = response.data;
        var ifExceedsTwintyRating = response.data[0];
        var ifNeedsReTraining = response.data[1];

        // ifExceedsTwintyRating = true;
        // ifNeedsReTraining = false;

        if (ifExceedsTwintyRating) {
          if (ifNeedsReTraining) {
            // Knowladge Base
            flaskAPI.post("/modelBased", {
              userID: userId,
            }).then((response) => {
              console.log("modelBased");
              var movieTitlesArray = [...movieTitles];
              var ratingsArray = [...totalRatings];
              var additionalStateArray = [...additionalState];
              for (var i = 0; i < response.data.length; i++) {
                similarMoviesIds[i] = response.data[i][0];
                similarMoviesPosters[i] = response.data[i][1];
                movieTitlesArray[i] = response.data[i][2];
                ratingsArray[i] = response.data[i][3];
                additionalStateArray[i] = response.data[i][3];
              }

              setRecommendedMovieIds(similarMoviesIds);
              setRecommendedmoviePosters(similarMoviesPosters);
              setSimilarMoviesPostersState(similarMoviesPosters);
              setmovieTitles(movieTitlesArray);
              settotalRatings(ratingsArray);
              setAdditionalState(additionalStateArray);

              if (additionalStateArray) {
                // re train model UserCB
                flaskAPI.post("/reTrainUserCB", {}).then(
                  (response) => {
                    console.log("ReTrain model");
                  }
                );
              }
            });
          } else {
            // userBasedCF
            flaskAPI.post("/userBasedCF", {
              userID: userId,
            }).then((response) => {
              var movieTitlesArray = [...movieTitles];
              var ratingsArray = [...totalRatings];
              var additionalStateArray = [...additionalState];

              for (var i = 0; i < 20; i++) {
                similarMoviesIds[i] = response.data[i][0];
                similarMoviesPosters[i] = response.data[i][1];
                movieTitlesArray[i] = response.data[i][2];
                ratingsArray[i] = response.data[i][3];
                additionalStateArray[i] = response.data[i][3];
              }

              setRecommendedMovieIds(similarMoviesIds);
              setRecommendedmoviePosters(similarMoviesPosters);
              setSimilarMoviesPostersState(similarMoviesPosters);
              setmovieTitles(movieTitlesArray);
              settotalRatings(ratingsArray);
              setAdditionalState(additionalStateArray);
            });
          }
        } else {
          // Knowladge Base
          flaskAPI.post("/modelBased", {
            userID: userId,
          }).then((response) => {
            var movieTitlesArray = [...movieTitles];
            var ratingsArray = [...totalRatings];
            var additionalStateArray = [...additionalState];
            for (var i = 0; i < response.data.length; i++) {
              similarMoviesIds[i] = response.data[i][0];
              similarMoviesPosters[i] = response.data[i][1];
              movieTitlesArray[i] = response.data[i][2];
              ratingsArray[i] = response.data[i][3];
              additionalStateArray[i] = response.data[i][3];
            }

            setRecommendedMovieIds(similarMoviesIds);
            setRecommendedmoviePosters(similarMoviesPosters);
            setSimilarMoviesPostersState(similarMoviesPosters);
            setmovieTitles(movieTitlesArray);
            settotalRatings(ratingsArray);
            setAdditionalState(additionalStateArray);
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
              <img className="fireIcon" src={require("../../dist/img/icon@2x.svg").default} />
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
               <Link to= "/inCinemaPage">
                  <div className="inCinemasText">            
                  In Cinemas{""}
                  <div className="arrowIcon"> 
                      <IoIosArrowForward size={50}/>
                  </div>
                  </div>
                </Link> 

              <div className="InCinemasContainer">
                <OwlCarousel
                  className="homePage-owl-theme"
                  {...options}
                  nav
                >
                  {runCallback(() => {
                    const row = [];

                    for (var i = 0; i <numOfWhatsOnMovie; i++) {
                      const id = whatsOnMovieIds[i];
                      const url = `/movieInfoPage/${id}`;
                      const poster = whatsOnMoviePosters[i];
                      const title = whatsOnMovieTitles[i];
                      var rating;
                      if ( whatsOnMovieRatings[i] == 0 ||  whatsOnMovieRatings[i] == null ) {
                        rating = "No ratings yet.";
                      }
                      else
                      {
                        rating = whatsOnMovieRatings[i];
                      }
                      // const rating = whatsOnMovieRatings[i];
                      // if (rating == 0) {
                      //   rating = "No ratings yet.";
                      // }
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
                                  src={
                                    require("../../static/img/star-2@2x.svg")
                                      .default
                                  }                                 />
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
                <Link to="comingSoonPage">
                  <div className="ComingSoonText">
                  Coming Soon to Cinemas {" "}

                  <div className="arrowIcon"> 
                    <IoIosArrowForward size={50}/>
                  </div>
                  </div>
                </Link>
            
              <div className="ComingSoonContainer">
                <OwlCarousel
                  className="homePage-owl-theme"
                  {...options}
                  nav
                >
                  {runCallback(() => {
                    const row = [];

                    for (var i = 0; i <numOfComingSoonMovie; i++) {
                      const id = comingSoonMovieIds[i];
                      const url = `/movieInfoPage/${id}`;
                      const poster = comingSoonMoviePosters[i];
                      const title = comingSoonMovieTitles[i];
                      var rating;
                      if ( comingSoonMovieRatings[i] == 0 ||  comingSoonMovieRatings[i] == null ) {
                        rating = "No ratings yet.";
                      }
                      else
                      {
                        rating = comingSoonMovieRatings[i];
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
                                  src={
                                    require("../../static/img/star-2@2x.svg")
                                      .default
                                  }                                 />
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
                                  src={
                                    require("../../static/img/star-2@2x.svg")
                                      .default
                                  }                                 />
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
             <Footer/>
            </footer>
          </body>
        </div>
      </div>
    </div>
  );
}

export default homePage;

