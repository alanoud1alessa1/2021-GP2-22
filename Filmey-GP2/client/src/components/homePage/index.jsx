import Axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Cookies from "universal-cookie";
import Footer from "../Footer";
import Header from "../header";
import "./homePage.css";
import api from "../../api/axiosAPI"
import flaskAPI from "../../api/flaskAPI"
import reTrainingAPI from "../../api/reTrainingAPI"

// slider next prev
const AutoPreviousBtn = (props) => {
  const { onClick } = props;
  return <div className={""} onClick={onClick}></div>;
};
const AutoNextBtn = (props) => {
  const { onClick } = props;
  return <div className={""} onClick={onClick}></div>;
};

// slider next prev
const PreviousBtn = (props) => {
  const { onClick } = props;
  return (
    <div className={"PreviousArrow"} onClick={onClick}>
      <IoIosArrowBack />
    </div>
  );
};
const NextBtn = (props) => {
  const { onClick } = props;
  return (
    <div className={"NextArrow"} onClick={onClick}>
      <IoIosArrowForward />
    </div>
  );
};

const Home = (props) => {
  // slider
  const autoPlaySlider = {
    dots: false,
    pauseOnHover: false,
    adaptiveHeight: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <AutoNextBtn />,
    prevArrow: <AutoPreviousBtn />,
    autoplay: true,
    infinite: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  // slider
  const settings = {
    dots: false,
    infinite: false,
    lazyLoad: true,
    adaptiveHeight: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <NextBtn />,
    prevArrow: <PreviousBtn />,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  const runCallback = (cb) => {
    return cb();
  };

  const {
    top10Text,
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
      console.log("whatsOnMovies");
      console.log(response.data);

      var whatsOnIdsArray = [...whatsOnMovieIds];
      var whatsOnTitlesArray = [...whatsOnMovieTitles];
      var whatsOnPostersArray = [...whatsOnMoviePosters];
      var whatsOnRatingsArray = [...whatsOnMovieRatings];

      setNumOfWhatsOnMovie(response.data.length);

      for (var i = 0; i < response.data.length; i++) {
        whatsOnIdsArray[i] = response.data[i].movie_id;
        whatsOnTitlesArray[i] = response.data[i].title;
        whatsOnPostersArray[i] = response.data[i].poster;
        whatsOnRatingsArray[i] = response.data[i].total_rating;
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
      setNumOfComingSoonMovie(response.data.movies.length);

      for (var i = 0; i < response.data.movies.length; i++) {
        comingSoonIdsArray[i] = response.data.movies[i].movie_id;
        comingSoonTitlesArray[i] = response.data.movies[i].title;
        comingSoonPostersArray[i] = response.data.movies[i].poster;
        console.log(response.data.movies[i].total_rating);
        comingSoonRatingsArray[i] = response.data.movies[i].total_rating;
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
        // ifNeedsReTraining = true;

        if (ifExceedsTwintyRating) {
          if (ifNeedsReTraining) {
            // Knowladge Base
            flaskAPI.post("/modelBased", {
              userID: userId,
            }).then((response) => {
              console.log("modelBased");
              var movieTitlesArray = [...movieTitles];
              var ratingsArray = [...totalRatings];
              // var additionalState = [...additionalState];
              var additionalStateArray = [...additionalState];
              for (var i = 0; i < response.data.length; i++) {
                similarMoviesIds[i] = response.data[i][0];
                similarMoviesPosters[i] = response.data[i][1];
                movieTitlesArray[i] = response.data[i][2];
                ratingsArray[i] = response.data[i][3];
                //additionalState[i] = response.data[i][3];
                additionalStateArray[i] = response.data[i][3];
              }

              setRecommendedMovieIds(similarMoviesIds);
              setRecommendedmoviePosters(similarMoviesPosters);
              setSimilarMoviesPostersState(similarMoviesPosters);
              setmovieTitles(movieTitlesArray);
              settotalRatings(ratingsArray);
              // setAdditionalState(additionalState);
              setAdditionalState(additionalStateArray);

              // if (additionalState) {
              if (additionalStateArray) {

                // re train model UserCB
                reTrainingAPI.get("/reTrainUserCB", {}).then(
                  () => {
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
              // var additionalState = [...additionalState];
              var additionalStateArray = [...additionalState];

              for (var i = 0; i < 20; i++) {
                similarMoviesIds[i] = response.data[i][0];
                similarMoviesPosters[i] = response.data[i][1];
                movieTitlesArray[i] = response.data[i][2];
                ratingsArray[i] = response.data[i][3];
                // additionalState[i] = response.data[i][3];
                additionalStateArray[i] = response.data[i][3];
              }

              setRecommendedMovieIds(similarMoviesIds);
              setRecommendedmoviePosters(similarMoviesPosters);
              setSimilarMoviesPostersState(similarMoviesPosters);
              setmovieTitles(movieTitlesArray);
              settotalRatings(ratingsArray);
              // setAdditionalState(additionalState);
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
            // var additionalState = [...additionalState];
            var additionalStateArray = [...additionalState];

            for (var i = 0; i < response.data.length; i++) {
              similarMoviesIds[i] = response.data[i][0];
              similarMoviesPosters[i] = response.data[i][1];
              movieTitlesArray[i] = response.data[i][2];
              ratingsArray[i] = response.data[i][3];
              // additionalState[i] = response.data[i][3];
              additionalStateArray[i] = response.data[i][3];
            }

            setRecommendedMovieIds(similarMoviesIds);
            setRecommendedmoviePosters(similarMoviesPosters);
            setSimilarMoviesPostersState(similarMoviesPosters);
            setmovieTitles(movieTitlesArray);
            settotalRatings(ratingsArray);
            // setAdditionalState(additionalState);
            setAdditionalState(additionalStateArray);
          });
        }
      });
    }
  }, []);
  return (
    <div>
      {/* header  */}
      <Header />
      {/* main content  */}

      {/* top 10 movies  */}
      <Container className="py-5">
        <div className="fireIconBox mb-5">
          <h1 className="mainTitle">{top10Text}</h1>
          <img className="fireIcon10" src={require("../../dist/img/icon@2x.svg").default} />
        </div>
        <Slider {...autoPlaySlider}>
          {runCallback(() => {
            const row = [];

            for (var i = 1; i <= 10; i++) {
              const id = movieIds[i - 1];

              const url = `/MovieInfoPage/${id}`;
              const poster = Allposters[i - 1];
              row.push(
                <div className="autoPlayMovieBox" key={i}>
                  {
                    <div>
                      <Link to={url}>
                        <img className="autoPlayMoviePoster" src={poster} />
                      </Link>
                    </div>
                  }
                </div>
              );
            }
            return row;
          })}
        </Slider>
      </Container>

      {/* Recommended For u */}
      {registered && !isAdmin && (
        <Container className="py-5">
          {/* title  */}
          <div>
            <h1 className="mainTitle">
              Recommended For<strong> {username} </strong>{" "}
            </h1>
          </div>

          <div className="mt-5">
            <Slider {...settings}>
              {runCallback(() => {
                const row = [];

                for (var i = 0; i < 10; i++) {
                  const id = recommendedmovieIds[i];
                  const url = `/movieInfoPage/${id}`;
                  const poster = recommendedmoviePosters[i];
                  const title = movieTitles[i];
                  var rating = totalRatings[i];
                  if (rating == 0) {
                    rating = "No ratings.";
                  }
                  row.push(
                    <div key={i}>
                      {
                        <div className="movie">
                          <Link to={url}>
                            <img className="moviePosterCarousel" src={poster} />
                            <div className="p-3">
                              <div className="movieRating">
                                <img
                                  className="movieStar"
                                  src={
                                    require("../../static/img/star-2@2x.svg")
                                      .default
                                  }     
                                />
                                <h4 className="movieRating neuton-bold-white-20px">
                                  {rating}
                                </h4>
                              </div>
                              <h3 className="movieName neuton-bold-white-24px">
                                {title}
                              </h3>
                            </div>
                          </Link>
                        </div>
                      }
                    </div>
                  );
                }
                return row;
              })}
            </Slider>
          </div>
        </Container>
      )}

      {/* in Cinemas  */}
      <Container className="py-5">
        {/* title  */}
        <div>
          <Link to="/inCinemaPage">
            <div className="section-linkTitle">
              In Cinemas
              <IoIosArrowForward size={50} />
            </div>
          </Link>
        </div>

        <div className="mt-5">
          <Slider {...settings}>
            {runCallback(() => {
              const row = [];

              for (var i = 0; i < numOfWhatsOnMovie; i++) {
                const id = whatsOnMovieIds[i];
                const url = `/movieInfoPage/${id}`;
                const poster = whatsOnMoviePosters[i];
                const title = whatsOnMovieTitles[i];
                var rating;
                if (
                  whatsOnMovieRatings[i] == 0 ||
                  whatsOnMovieRatings[i] == null
                ) {
                  rating = "No ratings.";
                } else {
                  rating = whatsOnMovieRatings[i];
                }
                row.push(
                  <div key={i}>
                    {
                      <div className="movie">
                        <Link to={url}>
                          <img className="moviePosterCarousel" src={poster} />
                          <div className="p-3">
                            <div className="movieRating">
                              <img
                                className="movieStar"
                                src={
                                  require("../../static/img/star-2@2x.svg")
                                    .default
                                }     
                              />
                              <h4 className="movieRating neuton-bold-white-30px">
                                {rating}
                              </h4>
                            </div>
                            <h3 className="movieName neuton-bold-white-30px">
                              {title}
                            </h3>
                          </div>
                        </Link>
                      </div>
                    }
                  </div>
                );
              }
              return row;
            })}
          </Slider>
        </div>
      </Container>

      {/* Coming Soon to Cinemas*/}
      <Container className="py-5">
        {/* title  */}
        <div>
          <Link to="/comingSoonPage">
            <div className="section-linkTitle">
              Coming Soon to Cinemas
              <IoIosArrowForward size={50} />
            </div>
          </Link>
        </div>

        <div className="mt-5">
          <Slider {...settings}>
            {runCallback(() => {
              const row = [];

              for (var i = 0; i < numOfComingSoonMovie; i++) {
                const id = comingSoonMovieIds[i];
                const url = `/movieInfoPage/${id}`;
                const poster = comingSoonMoviePosters[i];
                const title = comingSoonMovieTitles[i];
                var rating;
                if (
                  comingSoonMovieRatings[i] == 0 ||
                  comingSoonMovieRatings[i] == null
                ) {
                  rating = "No ratings.";
                } else {
                  rating = comingSoonMovieRatings[i];
                }
                row.push(
                  <div key={i}>
                    {
                      <div className="movie">
                        <Link to={url}>
                          <img className="moviePosterCarousel" src={poster} />
                          <div className="p-3">
                            <div className="movieRating">
                              <img
                                className="movieStar"
                                src={
                                  require("../../static/img/star-2@2x.svg")
                                    .default
                                }     
                              />
                              <h4 className="movieRating neuton-bold-white-30px">
                                {rating}
                              </h4>
                            </div>
                            <h3 className="movieName neuton-bold-white-30px">
                              {title}
                            </h3>
                          </div>
                        </Link>
                      </div>
                    }
                  </div>
                );
              }
              return row;
            })}
          </Slider>
        </div>
      </Container>

      {/* main content  */}

      {/* footer  */}
      <Footer />
    </div>
  );
};

export default Home;
