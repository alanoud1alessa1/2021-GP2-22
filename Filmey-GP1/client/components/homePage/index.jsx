import React from "react";
import { Link } from "react-router-dom";
import "./homePage.css";
import Axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Header from "../header";
import OwlCarousel from "react-owl-carousel";


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


  const [movieIds, setMovieIds] = useState([]);
  const [Allposters, setAllposters] = useState([]);
  const [recommendedmovieIds, setRecommendedMovieIds] = useState([]);
  const [recommendedmoviePosters, setRecommendedmoviePosters] = useState([]);
  const [similarMoviesPostersState, setSimilarMoviesPostersState] = useState([]);
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


    //similar movies
    // const recommended = Axios.post(`http://localhost:3000/api/v1/model/contentBased/1`).then((res) => {
    //   console.log("similar movies");
    //   console.log(res.data);
    //   var IdsArray = [...movieIds];
    //   var postersArray = [...Allposters];

    //   for (var i = 0; i < 20; i++) {
    //     similarMoviesIds[i] = res.data[i][0];
    //     similarMoviesPosters[i] = res.data[i][1];
    //   }

    //   setRecommendedMovieIds(similarMoviesIds);
    //   setRecommendedmoviePosters(similarMoviesPosters);
    //   setSimilarMoviesPostersState(similarMoviesPosters);
    // });

    var checkThreshold = false;
    //check thresold for registered users only
     if(registered && !isAdmin)
       api.post(`/model/checkThreshold/${userId}`).then((response) => {
         checkThreshold=response.data;
       })

       // call userBasedCF if exceeds threshold
      if(checkThreshold)
      {
           api.post(`/model/userBasedCF/${userId}`).then((response) => {
           console.log(response.data)
           const IdsArray = [...movieIds];
           const postersArray = [...Allposters];

             for (var i = 0; i < 20; i++) {
            similarMoviesIds[i] = response.data[i][0];
            similarMoviesPosters[i] = response.data[i][1];
         }

            setRecommendedMovieIds(similarMoviesIds);
            setRecommendedmoviePosters(similarMoviesPosters);
            setSimilarMoviesPostersState(similarMoviesPosters);

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

            {/* Title */}
            {registered &&
              <div>
                <h1 className="recommendedForYouText">Recommended For <strong> {username} </strong> </h1>
              </div>}

            {registered &&
              <div className="recommendedForYouContainer">
                <OwlCarousel
                  className="recommendedMovies-owl-theme"
                  {...options}
                  nav
                >
                  {runCallback(() => {
                    const row = [];

                    for (var i = 0; i < 20; i++) {
                      const id = recommendedmovieIds[i];
                      const url = `/movieInfoPage/${id}`;
                      const poster = recommendedmoviePosters[i];
                      // const title = movieTitles[count];
                      // var rating = totalRatings[count++];

                      // if (rating == "0.0") {
                      //   rating = "No ratings yet.";
                      // }
                      row.push(
                        <div key={i}>
                          {
                            <div className="recommendedMovie">
                              <Link to={url}>
                                <img
                                  className="recommendedMoviePoster"
                                  src={poster}
                                  height="652"
                                  width="512"
                                />
                                <img
                                  className="recommendedStar"
                                  src="/img/star-2@2x.svg"
                                />
                                <div className="recommendedMovieRating neuton-bold-white-30px">
                                  {/* {rating} */} 5
                                </div>
                                <div className="recommendedMovieName neuton-bold-white-30px">
                                  {/* {title} */} movie name
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
            }

            {/* footer */}
            {/* footer */}
            <footer className="homePagefooter">
              <div className="homePagefooter"> </div>
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