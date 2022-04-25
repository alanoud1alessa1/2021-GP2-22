import Axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Cookies from "universal-cookie";
import Footer from "../Footer";
import Header from "../header";
import "./genresPage.css";
import api from "../../api/axiosAPI"

// slider next prev
const PreviousBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={"PreviousArrow"} onClick={onClick}>
      <IoIosArrowBack />
    </div>
  );
};
const NextBtn = (props) => {
  const { className, onClick } = props;
  return (
    <div className={"NextArrow"} onClick={onClick}>
      <IoIosArrowForward />
    </div>
  );
};

const Genres = () => {
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
        },
      },
    ],
  };

  const options = {
    items: 5,
    // Navigation
    navigation: false,
    transitionStyle: "fade",
  };

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
  }

  const logOut = () => {
    cookies.remove("token", { path: "/" });
    window.location.reload();
  };

  let { numOfPage } = useParams();
  numOfPage = parseInt(numOfPage);

  const [allGenres, setAllGenres] = useState([]);
  const [numOfGenres, setNumOfGenres] = useState();
  const [moviesId, setMoviesId] = useState([]);
  const [movieTitles, setmovieTitles] = useState([]);
  const [Allposters, setAllposters] = useState([]);
  const [totalRatings, settotalRatings] = useState([]);
  const [ERatings, setERatings] = useState([]);
  const allGens = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ];

  if (numOfPage == 1) {
    var numOfItrations = 13;
    var numOfGenresToGet = 0;
  } else {
    var numOfItrations = 10;
    var numOfGenresToGet = 13;
  }

  React.useEffect(() => {
    var moviesIdArray = [...moviesId];
    var movieTitlesArray = [...movieTitles];
    var postersArray = [...Allposters];
    var ratingsArray = [...totalRatings];

    //Push all genre get requests to an array
    const getArray = [];
    for (var l = numOfGenresToGet; l < numOfGenresToGet + numOfItrations; l++) {
      getArray.push(
        api.get(
          `/movies/genresFilter/${allGens[l]}/10`
        )
      );
    }

    Axios.all(getArray).then(
      Axios.spread((...allData) => {
        var count = 0;
        for (var k = 0; k < numOfItrations; k++) {
          for (var i = 0; i < 10; i++) {
            try {
              moviesIdArray[count] = allData[k].data[i].movie_id;
              movieTitlesArray[count] = allData[k].data[i].title;
              postersArray[count] = allData[k].data[i].poster;
              ratingsArray[count++] = allData[k].data[i].total_rating;
            } catch {
              moviesIdArray[count] = 0;
              movieTitlesArray[count] = 0;
              postersArray[count] = 0;
              ratingsArray[count++] = 0;
            }
          }

          // //if finish getting all movies --> then set valuse
          if (moviesIdArray.length == numOfItrations * 10) {
            setMoviesId(moviesIdArray);
            setmovieTitles(movieTitlesArray);
            setAllposters(postersArray);
            settotalRatings(ratingsArray);
            setERatings(ratingsArray);
          }
        }
      })
    );
  }, []);

  const refreashPage = () => {
    window.location = "/genresPage/2";
  };
  return (
    <div>
      {/* header  */}
      <Header />

      {/* main content  */}

      <Container className="pb-5">
        {runCallback(() => {
          const basicRow = [];
          var count = 0;
          for (var k = 0; k < numOfItrations; k++) {
            const genre = allGens[k + numOfGenresToGet];
            const genrePage = `/genreTypePage/${genre}`;
            basicRow.push(
              <div className="my-5 py-3" key={k}>
                {
                  <div>
                    {/* title  */}
                    <div>
                      <Link to={genrePage}>
                        <div className="section-linkTitle">
                          {genre}
                          <IoIosArrowForward size={50} />
                        </div>
                      </Link>
                    </div>
                    {/* movies  */}
                    <div className="mt-5">
                      <Slider {...settings}>
                        {runCallback(() => {
                          const row = [];

                          for (var i = 0; i < 10; i++) {
                            const id = moviesId[count];
                            if (id != 0) {
                              const url = `/movieInfoPage/${id}`;
                              const poster = Allposters[count];
                              const title = movieTitles[count];
                              var rating = totalRatings[count++];

                              if (rating == "0.0") {
                                rating = "No ratings.";
                              }
                              row.push(
                                <div key={i}>
                                  {
                                    <div className="movie">
                                      <Link to={url}>
                                        <img
                                          className="moviePosterCarousel"
                                          src={poster}
                                        />
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
                            } else {
                              count++;
                            }
                          }
                          return row;
                        })}
                      </Slider>
                    </div>
                  </div>
                }
              </div>
            );
          }
          return basicRow;
        })}
      </Container>
      {/* view more  */}
      <Container className="pb-5">
        {numOfPage == 1 && (
          <button
            className="viewMoreBtn neuton-bold-white-30px"
            onClick={refreashPage}
          >
            View more ..
          </button>
        )}
      </Container>
      {/* main content  */}

      {/* footer  */}
      <Footer />
    </div>
  );
};

export default Genres;
