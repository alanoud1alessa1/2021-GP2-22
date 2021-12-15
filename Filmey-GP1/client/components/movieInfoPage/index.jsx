import React from "react";
import { Link } from "react-router-dom";
import "./movieInfoPage.css";
import Axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Header from "../header";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { FiEdit  } from 'react-icons/fi' ;
import { RiDeleteBin2Line } from 'react-icons/ri';


function MovieInfoPage(props) {
  const options={
    // Navigation
    navigation : false,
    navText: [
      "<div className='reviewsExpandLeft'>  <img className='reviewsExpandLeft' src='/img/expand-left--review-@2x.svg' /> </div>",
      "<div>  <img className='reviewsExpandRight' src='/img/expand-right--review-@2x.svg' /> </div>"
    ],
    transitionStyle: "fade",
    items:3,
    
  }
  const runCallback = (cb) => {
    return cb();
  };

  const {
    directorText,
    writersText,
    descriptionText,
    topCastText,
    reviewsText,
    reviewItText,
    logo,
    languageText2,
    footerText1,
    footerText2,
    playTrailerText,
    addIcon,
    genreText,
    redLine,
    reviewIcon,
    yourRatingText,
  } = props;

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
    console.log("guest user");
  }


  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
  });

  const [mid, setMid] = useState("");
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [length, setLength] = useState("");
  const [age_guide, setAge_guide] = useState("");
  const [description, setDescription] = useState("");
  const [poster, setPoster] = useState("");
  const [trailer_url, setTrailer_url] = useState("");

  const [genre, setGenre] = useState([""]);
  const [directors, setDirectors] = useState([""]);
  const [writers, setWriters] = useState([""]);
  const [languages, setLanguages] = useState([""]);
  const [castNames, setCastNames] = useState([""]);
  const [castImgs, setCastImgs] = useState([""]);
  const [castRoles, setCastRoles] = useState([""]);

  const [numOfCasts, setNumOfCasts] = useState(0);

  const [reviews, setReviews] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [EReviews, setEReviews] = useState([]);

  const [totalRating, setTotalRating] = useState();
  const [totalUsersRating, setTotalUsersRating] = useState();
  var totalUsers;


  

  let { id } = useParams();
  id = parseInt(id);




  const addReview = () => {
    if (!registered) {
      alert("Sorry! you have to login.");
      return;
    }
    window.location.href = `/reviewPage/${id}`;
  };

  //Rating function
  const [haveRated, sethaveRated] = useState(false);
  const [userRating, setuserRating] = useState();
  const [ratedMovie, setratedMovie] = useState(false);
  var rating;

  const updateMovieRating = () => {
    api.get(`/movies/rating/${id}`).then((response) => {
      if (response.data.length == 0) {
        setTotalUsersRating(0);
        totalUsers = 0;
      } else {
        setTotalRating(response.data[0].total_rating);
        setTotalUsersRating(response.data[0].total_users);
        totalUsers = response.data[0].total_users;
      }
      if (Number(totalUsers) > 0) {
        setratedMovie(true);
      } else {
        setratedMovie(false);
      }
    });
  };

  const deleteMovie=()=>{

    if (window.confirm("Are you sure you want to delete the movie ?")) {

    }

  }

  const addRating = (value) => {
    if (!registered) {
      alert("Sorry! you have to login.");
      return;
    }
    rating = value;
    setuserRating(value);
    sethaveRated(true);
    alert("Thank u! your rating has been saved successfully.");
    updateMovieRating();
  };

  const deleteRating = () => {
    alert("Your rating has been deleted successfully.");
    updateMovieRating();
  };

  React.useEffect(() => {
    if (registered && !isAdmin) {
    }

    // }

    //Get movie info
    api.get(`/movies/${id}`).then((response) => {
      setMid(response.data[0].movie_id);
      setTitle(response.data[0].title);
      setYear(response.data[0].year);
      setLength(response.data[0].length);
      setAge_guide(response.data[0].age_guide);
      setDescription(response.data[0].description);
      setPoster(response.data[0].poster);
      setTrailer_url(response.data[0].trailer_url);
    });

    //Get Genres
    api.get(`/movies/genre/${id}`).then((response) => {
      const numOfGenres = response.data.length;
      const newArr = [...genre];

      for (var i = 0; i < numOfGenres; i++) {
        if (i < numOfGenres - 1) {
          newArr[i] = response.data[i].genre + ", ";
        } else {
          newArr[i] = response.data[i].genre;
        }
      }

      setGenre(newArr);
    });

    //Get Directors
    api.get(`/movies/directors/${id}`).then((response) => {
      const numOfDirectors = response.data.length;
      const newArr = [...directors];

      for (var i = 0; i < numOfDirectors; i++) {
        if (i < numOfDirectors - 1) {
          newArr[i] = response.data[i].director + ", ";
        } else {
          newArr[i] = response.data[i].director;
        }
      }

      setDirectors(newArr);
    });

    //Get Writers
    api.get(`/movies/writers/${id}`).then((response) => {
      const numOfWriters = response.data.length;
      const newArr = [...writers];

      for (var i = 0; i < numOfWriters; i++) {
        if (i < numOfWriters - 1) {
          newArr[i] = response.data[i].writer + ", ";
        } else {
          newArr[i] = response.data[i].writer;
        }
      }

      setWriters(newArr);
    });

    //Get Languages
    api.get(`/movies/languages/${id}`).then((response) => {
      const numOfLanguages = response.data.length;
      const newArr = [...languages];

      for (var i = 0; i < numOfLanguages; i++) {
        if (i < numOfLanguages - 1) {
          newArr[i] = response.data[i].language + ", ";
        } else {
          newArr[i] = response.data[i].language;
        }
      }

      setLanguages(newArr);
    });

    //Get Casts
    api.get(`/movies/casts/${id}`).then((response) => {
      setNumOfCasts(response.data.length);

      const numCasts = response.data.length;
      const newArr1 = [...castNames];
      const newArr2 = [...castImgs];
      const newArr3 = [...castRoles];

      for (var i = 0; i < numCasts; i++) {
        newArr1[i] = response.data[i].actor;
        newArr2[i] = response.data[i].actor_image_url;
        newArr3[i] = response.data[i].role;
      }
      setCastNames(newArr1);
      setCastImgs(newArr2);
      setCastRoles(newArr3);
    });

    //Get Rating
    api.get(`/movies/rating/${id}`).then((response) => {
      if (response.data.length == 0) {
        setTotalUsersRating(0);
        totalUsers = 0;
      } else {
        setTotalRating(response.data[0].total_rating);
        setTotalUsersRating(response.data[0].total_users);
        totalUsers = response.data[0].total_users;
      }
      if (Number(totalUsers) > 0) {
        setratedMovie(true);
      }
    });

    //Get Reviews
    api.get(`/movies/review/${id}`).then((response) => {
      const numOfReviews = response.data.length;
      const reviewsArray = [...reviews];
      const usersArray = [...userReviews];

      console.log(response);

      for (var i = 0; i < numOfReviews; i++) {
        reviewsArray[i] = response.data[i].review;
        usersArray[i] = response.data[i].username;
      }

      setReviews(reviewsArray);
      setUserReviews(usersArray);
      setEReviews(usersArray);
    });
  }, []);

  return (
    <div className="PageCenter">
      <div className="movieInfo screen">
        <div className="movieInfoContainer">
          <body>
            {/* Header */}
            <header>
              <Header />
            </header>

            {/* main  */}
            <main>
              <div className="body"></div>
              <img className="moviePoster" src={poster} />
              <div className="trailer">
                <a
                  className="playTrailerText"
                  href={trailer_url}
                  target="_blank"
                >
                  {playTrailerText}{" "}
                </a>
                <i className="fa fa-play-circle"> </i>
              </div>
              {/*  add rating */}
              {!haveRated && !isAdmin && (
                <div className="addRating">
                  <div className="rateItText neuton-normal-white-30px">
                    Rate it !
                  </div>
                  <div class="rating-css">
                    <div
                      class="star-icon"
                      onChange={(e) => {
                        addRating(e.target.value);
                      }}
                    >
                      <input
                        type="radio"
                        name="rating1"
                        id="rating1"
                        value="5"
                      />
                      <label for="rating1" className="fas fa-star"></label>
                      <input
                        type="radio"
                        name="rating1"
                        id="rating2"
                        value="4"
                      />
                      <label for="rating2" className="fas fa-star"></label>
                      <input
                        type="radio"
                        name="rating1"
                        id="rating3"
                        value="3"
                      />
                      <label for="rating3" className="fas fa-star"></label>
                      <input
                        type="radio"
                        name="rating1"
                        id="rating4"
                        value="2"
                      />
                      <label for="rating4" className="fas fa-star"></label>
                      <input
                        type="radio"
                        name="rating1"
                        id="rating5"
                        value="1"
                      />
                      <label for="rating5" className="fas fa-star"></label>
                    </div>
                  </div>
                </div>
              )}

              {/* after add rating */}
              {haveRated && (
                <div className="afterRating">
                  <div className="yourRatingText neuton-normal-white-30px">
                    {yourRatingText}
                  </div>
                  <div className="movieRatingContainer2">
                    <img className="afterRatingStar" src="/img/star-2@2x.svg" />
                    <div className="userRating">{userRating}</div>
                    <div className="fiveText1">/ 5</div>
                  </div>
                </div>
              )}

              {/* remove rating */}
              {haveRated && (
                <button
                  className="removeRatingText neuton-normal-white-20px"
                  onClick={deleteRating}
                >
                  Remove Rating
                </button>
              )}

              {/* edit movie */}
              ({isAdmin &&
                  <div>
                  <button className="editMovieButton">
                  <Link to={`/addMoviePage/${id}`} >

                    <div className="editMovieContainer">
                      <div className="editMovieIcon"> <FiEdit size={30}/> </div>
                      <div className="editMovieText">  Edit  </div>
                    </div>
                    </Link>

                  </button>
                
                  {/* delete movie */}
                  <button className="deleteMovieButton" onClick={deleteMovie}>
                  {/* <Link to="/home-page"> */}
                    <div className="editMovieContainer">
                      <div className="deleteMovieIcon"> <RiDeleteBin2Line size={35}/> </div>
                      <div className="deleteMovieText">  Delete  </div>
                    </div>
                    {/* </Link> */}
                  </button>
                  </div>
                  })

              {/* movie information */}
              <div className="movieInfo">
                <div className="movieTitle">
                  <div className="movieName">
                    {title} <span className="movieYear"> ({year})</span>
                  </div>
                  <div className="movieRatingContainer">
                    <img className="star" src="/img/star-2@2x.svg" />
                    {ratedMovie && (
                      <div>
                        <div className="movieRating">{totalRating}</div>
                        <div className="fiveText2">/ 5 </div>
                        <div className="totalUsersRating">
                          ({totalUsersRating} ratings)
                        </div>
                      </div>
                    )}
                    {!ratedMovie && (
                      <div className="emptyMovieRating">
                        The movie has no ratings yet.{" "}
                      </div>
                    )}
                  </div>
                  <div className="pgAndTime">
                    <div className="pgContainer">
                      <div className="moviepg neuton-bold-white-20px">
                        {age_guide}
                      </div>
                    </div>
                    <div className="timeContainer">
                      <div className="movieTime neuton-bold-white-20px">
                        {length}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="movieGenreContainer">
                  <div className="movieInfoGenre neuton-bold-white-24px">
                    {genreText}
                  </div>
                  <div className="movieInfoGenreType roboto-normal-baby-powder-25px">
                    {genre}
                  </div>
                </div>

                <div className="movieDesContainer">
                  <div className="line1Container">
                    <img className="line1" src="/img/line-5@1x.svg" />
                  </div>
                  <div className="descriptionText neuton-bold-white-24px">
                    {descriptionText}
                  </div>
                  <div className="movieDes roboto-normal-baby-powder-25px">
                    {description}
                  </div>
                </div>

                <div className="movieDirectorContainer">
                  <div className="line2Container">
                    <img className="line2" src="/img/line-5@1x.svg" />
                  </div>
                  <div className="directorText neuton-bold-white-24px">
                    {directorText}
                  </div>
                  <div className="directorName roboto-normal-baby-powder-25px">
                    {directors}
                  </div>
                </div>

                <div className="movieWritersContainer">
                  <div className="line3Container">
                    {" "}
                    <img className="line3" src="/img/line-5@1x.svg" />{" "}
                  </div>
                  <div className="writersText neuton-bold-white-24px">
                    {writersText}
                  </div>
                  <div className="writersName roboto-normal-baby-powder-25px">
                    {writers}
                  </div>
                </div>

                <div className="movielanguageContainer">
                  <img className="line4" src="/img/line-5@1x.svg" />
                  <div className="languageText2 neuton-bold-white-24px">
                    {languageText2}
                  </div>
                  <div className="movieLanguage roboto-normal-baby-powder-25px">
                    {languages}
                  </div>
                </div>
              </div>
              
              {/* top cast */}
              <div className="topCast">
                <div className="topCastText neuton-normal-white-60px5">
                  {topCastText}
                </div>
                <img className="topCastLine" src={redLine} />

                {/* casts loop */}
                {runCallback(() => {
                  const row = [];
                  for (var i = 0; i < numOfCasts; i++) {
                    const castImg = castImgs[i];
                    const castName = castNames[i];
                    const castRole = castRoles[i];

                    row.push(
                      <div key={i}>
                        {
                          <div className="castLoop">
                            <div className="cast1">
                              <img className="castImage1" src={castImg} />
                              <div className="castName1 neuton-bold-white-20px">
                                {castName}
                              </div>
                              <div className="castRole1 roboto-normal-white-15px">
                                as {castRole}
                              </div>
                            </div>
                          </div>
                        }
                      </div>
                    );
                  }
                  return row;
                })}
              </div>

              {/* reviews */}
              <div className="reviewsContainer">
                <img className="reviewsLine" src={redLine} />
                <div className="reviewsText neuton-normal-white-60px5">
                  {reviewsText}
                </div>
                <div className="addReview">
                  {!isAdmin && (
                    <button onClick={addReview}>
                      <img className="reviewIcon" src={reviewIcon} />
                      <img className="reviewIcon2" src={addIcon} />
                      <div>
                        <div className="reviewItText neuton-normal-white-30px">
                          {reviewItText}
                        </div>
                      </div>
                    </button>
                  )}
                </div>

                {/* reviews loop */}
                <div className="userReviews">
                  <OwlCarousel className="owl-theme" {...options} nav>
                    {runCallback(() => {
                      const row = [];
                      if (reviews.length > 0) {
                        for (var i = 0; i < reviews.length; i++) {
                          row.push(
                            <div key={i}>
                              {
                                <div className="userReviewContainer">
                                  <div className="reviewerUsername neuton-bold-white-20px">
                                    <div className="reviewerUsernameIcon">
                                      {" "}
                                      <img
                                        src={"/img/regUser.png"}
                                        width="40"
                                        height="30"
                                      />{" "}
                                    </div>
                                    <div> {userReviews[i]} </div>
                                  </div>
                                  <div className="userReview roboto-normal-white-20px">
                                    {reviews[i]}
                                  </div>
                                </div>
                              }
                            </div>
                          );
                        }
                        return row;
                      } else {
                        row.push(
                          <div key={i}>
                            {
                              <div className="noReviews neuton-bold-white-20px">
                                The movie has no reviews yet.
                              </div>
                            }
                          </div>
                        );
                      }
                      return row;
                    })}
                  </OwlCarousel>
                </div>
              </div>
            </main>

            {/* footer */}
            <footer className="movieInfofooter">
              <div className="movieInfofooter"> </div>
              <img className="movieInfofooterLogo" src={logo} />
              <div className="movieInfofooterText1">{footerText1}</div>
              <div className="movieInfocopyRightText inter-light-bon-jour-35px2">
                <span>{footerText2}</span>
              </div>
            </footer>
          </body>
        </div>
      </div>
    </div>
  );
}

export default MovieInfoPage;
