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
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin2Line } from "react-icons/ri";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { GiTicket } from "react-icons/gi";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import Popover from '@mui/material/Popover';

function MovieInfoPage(props) {
//add to watchlist hover
  const [addOpen, setaddOpen] = React.useState(null);
  const addPopoverOpen = (event) => {
    setaddOpen(event.currentTarget);
  };
  const addPopoverClose = () => {
    setaddOpen(null);
  };
  const addIsOpen = Boolean(addOpen);

//remove from watchlist hover
const [Operemoven, setremoveOpen] = React.useState(null);
const removePopoverOpen = (event) => {
  setremoveOpen(event.currentTarget);
};
const removePopoverClose = () => {
  setremoveOpen(null);
};
const removeIsOpen = Boolean(Operemoven);

  const similarMoviesOptions = {
    items: 4,
    margin: 20,

    navText: [
      "<div className='similarExpandLeft'>  <img className='reviewsExpandLeft' src='/img/expand-left--review-@2x.svg' /> </div>",
      "<div>  <img className='similarExpandRight' src='/img/expand-right--review-@2x.svg' /> </div>",
    ],
    transitionStyle: "fade",
  };

  const options = {
    // Navigation
    navigation: false,
    navText: [
      "<div className='reviewsExpandLeft'>  <img className='reviewsExpandLeft' src='/img/expand-left--review-@2x.svg' /> </div>",
      "<div>  <img className='reviewsExpandRight' src='/img/expand-right--review-@2x.svg' /> </div>",
    ],
    transitionStyle: "fade",
    items: 3,
  };

  const runCallback = (cb) => {
    return cb();
  };

  const {
    movieRating,
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
    genreText,
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
  const [EReviews, setEReviews] = useState([]);

  const [totalRating, setTotalRating] = useState();
  const [totalUsersRating, setTotalUsersRating] = useState();
  var totalUsers;

  const [movieTitles, setmovieTitles] = useState([]);
  const [totalRatings, settotalRatings] = useState([]);
  const [additionalState, setAdditionalState] = useState([]);
  const [onWatchList, setOnWatchList] = useState(false);

  //InCinema Location Variables and constans
  const [cinemaIds, setCinemaIds] = useState([]);
  const [cinemaNames, setCinemaNames] = useState([]);
  const [cinemaCity, setCinemaCity] = useState([]);
  const [cinemaLocation, setcinemaLocation] = useState([]);
  const [cinemaBookingLink, setCinemaBookingLink] = useState([]);
  const [numOfCinemas, setNumfCinemas] = useState(0);

  //Movie Status
  const [isInCinema, setIsInCinema] = useState();
  const [isComingSoon, setIsComingSoon] = useState();

  //Release date
  const [releaseDate, setReleaseDate] = useState([]);
  const [numOfReleaseDate, setNumOfReleaseDate] = useState([]);
  const [releaseDateCinemaName, setReleaseDateCinemaName] = useState([]);



  const [selectedCity, setSelectedCity] = useState([]);


  let { id } = useParams();
  id = parseInt(id);


  function onChange(value, event) {
    //console.log(event.option.value)
    if (event.action === "select-option" && event.option.value ===
    "*") {
      setSelectedCity(this.options)

       //this.setState(this.options);
    } else if (event.action === "deselect-option" &&
    event.option.value === "*") {
      setSelectedCity([])
      //this.setState([]);
    } else if (event.action === "deselect-option") {
      setSelectedCity(value.filter(o => o.value !== "*"))
     // this.setState(value.filter(o => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      setSelectedCity(this.options)
      //this.setState(this.options);
    } else {
      setSelectedCity(value)
      //this.setState(value);
    }

    console.log(selectedCity)
  }




  const addToWatchlist = () => {
    setaddOpen(null);
    if (!registered || isAdmin){
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="customconfirmAlert">
              <h1>Sorry!</h1>
              <h5>You have to login</h5>
              <button
                className="yesButton"
                onClick={() => {
                  onClose();
                }}
              >
                OK
              </button>
            </div>
          );
        },
      });
      return;
    }

    api
    .post(`Users/addToWatchList`, {
      user_id: decoded.userID,
      movie_id :id
    })
    .then((response) => {
    
     if(response){
       setOnWatchList(true);
       console.log(onWatchList);
     }
    });

    

  }
  const removeFromWatchlist = () => {
    setremoveOpen(null);
    // console.log(onWatchList);
    setOnWatchList(false);
    // console.log(onWatchList);
 api
   .post(`Users/deleteWatchList`, {
     user_id: decoded.userID,
     movie_id :id
   })
   .then((response) => {
   
    if(response){
      setOnWatchList(false);
      // console.log(onWatchList);
    }
   });

  }

  var isEdit;
  const [hasReviewed, setHasReviewed] = useState();
  const [userReviewID, setUserReviewID] = useState();


  const addReview = () => {
    isEdit = 0;
    if (!registered) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="customconfirmAlert">
              <h1>Sorry!</h1>
              <h5>You have to login</h5>
              <button
                className="yesButton"
                onClick={() => {
                  onClose();
                }}
              >
                OK
              </button>
            </div>
          );
        },
      });
      return;
    }
    window.location.href = `/reviewPage/${id}/${isEdit}`;
  };

  const editReview = () => {
    isEdit = 1;
    window.location.href = `/reviewPage/${id}/${isEdit}`;
  };

  const confirmDeleteReview = (isUser, review_id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="customconfirmAlert">
            <h1>Are you sure</h1>
            <h5>You want to delete this review?</h5>
            <button className="noButton" onClick={onClose}>
              Cancel
            </button>
            <button
              className="yesButton"
              onClick={() => {
                deleteReview(isUser, review_id);
                {
                  /* newHere   */
                }
                if (isUser) {
                  setHasReviewed(false);
                }
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  const updateReviews = () => {
    const updateReviews = api.get(`/movies/review/${id}`).then((response) => {
      const numOfReviews = response.data.length;
      const reviewsArray = [...reviews];
      // console.log(response)

      for (var i = 0; i < numOfReviews; i++) {
        reviewsArray[i] = response.data[i];

      }
// console.log(reviewsArray)
      setReviews(reviewsArray);
      setEReviews(reviewsArray);
    });
  };

  //Rating function
  //var userRating;
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

  const deleteMovie = () => {
    const res = Axios.post("http://localhost:3000/api/v1/movies/delete", {
      movie_id: id,
      admin_id: decoded.userID,
    }).then((res) => {
      if (res.data) {
        window.location = "/home-page";
      } else {
        alert("Sorry, an error occured. Please try again");
      }
    });
  };

  const confirmDeleteMovie = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="customconfirmAlert">
            <h1>Are you sure</h1>
            <h5>You want to delete this movie?</h5>
            <button className="noButton" onClick={onClose}>
              Cancel
            </button>
            <button
              className="yesButton"
              onClick={() => {
                deleteMovie();
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  const addRating = (value) => {
    if (!registered) {
      confirmAlert({
        customUI: ({ onClose }) => {
          return (
            <div className="customconfirmAlert">
              <h1>Sorry!</h1>
              <h5>You have to login</h5>
              <button
                className="yesButton"
                onClick={() => {
                  onClose();
                }}
              >
                OK
              </button>
            </div>
          );
        },
      });
      return;
    }
    rating = value;

    setuserRating(value);
    sethaveRated(true);
    const res = Axios.post("http://localhost:3000/api/v1/users/rating", {
      userID: decoded.userID,
      movieID: id,
      rating: parseInt(value),
    }).then((res) => {});
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="customconfirmAlert">
            <h1>Thank u!</h1>
            <h5>Your rating has been saved successfully.</h5>
            <button
              className="yesButton"
              onClick={() => {
                updateMovieRating();
                onClose();
              }}
            >
              OK
            </button>
          </div>
        );
      },
    });
  };

  const deleteRating = () => {
    const res = Axios.post("http://localhost:3000/api/v1/users/deleteRating", {
      userID: decoded.userID,
      movieID: id,
    }).then((res) => {
      if (res.data) {
        sethaveRated(false);
      }
      updateMovieRating();
    });
  };

  const confirmDeleteRating = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="customconfirmAlert">
            <h1>Are you sure</h1>
            <h5>You want to delete your rating?</h5>
            <button className="noButton" onClick={onClose}>
              Cancel
            </button>
            <button
              className="yesButton"
              onClick={() => {
                deleteRating();
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  const deleteReview = (isUser, review_id) => {
    if (isUser) {
      const res = Axios.post(
        "http://localhost:3000/api/v1/users/deleteReview",
        {
          review_id: review_id,
        }
      ).then((res) => {
        window.location.reload(true);
      });
    } else {
      const res = Axios.post(
        "http://localhost:3000/api/v1/admins/deleteReview",
        {
          admin_id: decoded.userID,
          review_id: review_id,
        }
      ).then((res) => {
        window.location.reload(true);
      });
    }
  };
  const [similarMoviesPostersState, setSimilarMoviesPostersState] = useState(
    []
  );
  var similarMoviesPosters = [];
  const [movieIds, setMovieIds] = useState([]);
  const [Allposters, setAllposters] = useState([]);
  const [moviesRatingState, setMoviesRatingState] = useState([]);
  var ratings = [];
  React.useEffect(() => {


if(registered)
  {  api
    .post(`Users/isOnWatchList`, {
      user_id: decoded.userID,
      movie_id :id
    })
    .then((response) => {
     if(response.data){
      // console.log("response")
      // console.log(response.data)
      setOnWatchList(true);
      //  console.log(onWatchList);
     }
    });}

    
    Axios.post("http://localhost:5000/contentBased", {
      movieID: id,
    }).then((res) => {
      var IdsArray = [...movieIds];
      var postersArray = [...Allposters];
      var movieTitlesArray = [...movieTitles];
      var ratingsArray = [...totalRatings];
      var additionalState = [...additionalState];

      for (var i = 0; i < 20; i++) {
        IdsArray[i] = res.data[i][0];
        postersArray[i] = res.data[i][1];
        movieTitlesArray[i] = res.data[i][2];
        ratingsArray[i] = res.data[i][3];
        additionalState[i] = res.data[i][3];
      }

      setMovieIds(IdsArray);
      setAllposters(postersArray);
      setSimilarMoviesPostersState(similarMoviesPosters);
      setmovieTitles(movieTitlesArray);
      settotalRatings(ratingsArray);
      setAdditionalState(additionalState);
    });

    //Check if user has reviewed movie
    if (registered && !isAdmin) {
      var userID = decoded.userID;
      api.get(`users/ifReview/${id}/${userID}`).then((response) => {
        if (response.data[0]) {
          setHasReviewed(true);
          setUserReviewID(response.data[0].review_id);
        } else {
          setHasReviewed(false);
        }
      });
    }

    window.scrollTo(0, 0);
    if (registered && !isAdmin) {
      const res = Axios.post("http://localhost:3000/api/v1/users/getRating", {
        userID: decoded.userID,
        movieID: id,
      }).then((res) => {
        if (res.data[0]) {
          sethaveRated(true);
          setuserRating(res.data[0]);
        }
      });
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
    var i = 0;
    var reviewsArray = [...reviews];
    var userID = 0;
    if (registered && !isAdmin) {
      userID = decoded.userID;

      api.get(`movies/ifReview/${id}/${userID}`).then((response) => {
        if (response.data.result[0]) {
          reviewsArray[0] = response.data.result[0];
          const numOfReviews = response.data.reviews.length;
          var j = 1;
          for (var i = 0; i < numOfReviews; i++) {
            reviewsArray[j] = response.data.reviews[i];
            j = j + 1;
          }
        } else {
          const numOfReviews = response.data.reviews.length;
          for (var i = 0; i < numOfReviews; i++) {
            reviewsArray[i] = response.data.reviews[i];
          }
        }

        setReviews(reviewsArray);
        setEReviews(reviewsArray);
      });
    } else {
      const updateReviews = api.get(`/movies/review/${id}`).then((response) => {
        const numOfReviews = response.data.length;
        var reviewsArray = [...reviews];

        for (var i = 0; i < numOfReviews; i++) {
          reviewsArray[i] = response.data[i];
        }

        setReviews(reviewsArray);
        setEReviews(reviewsArray);
      });
    }

    //Get movie status
    api.get(`/movies/movieStatus/${id}`).then((response) => {

      setIsComingSoon(response.data[0].is_coming_soon)
      setIsInCinema(response.data[0].is_in_cinema)

    });

    //Get cinema info
    console.log("inCinmas")
    api.get(`/movies/inCinemas/${id}`).then((response) => {
      console.log(response.data)

        var cinemaIdsArray = [...cinemaIds];
        var cinemaCitysArrays = [...cinemaCity];
        var cinemaLocationsArray = [...cinemaLocation];
        var cinemaNamesArray = [...cinemaNames];
        var cinemaBookingLinksArray = [...cinemaBookingLink];

        setNumfCinemas(response.data.length)

        for (var i = 0; i < response.data.length; i++) {
          cinemaIdsArray[i] = response.data[i].cinema_id;
          cinemaCitysArrays[i] = response.data[i].city;
          cinemaLocationsArray[i] = response.data[i].location;
          cinemaNamesArray[i]= response.data[i].name;
          cinemaBookingLinksArray[i]= response.data[i].booking_link;
          // console.log(cinemaBookinfLinksArray)
         }
         setCinemaBookingLink(cinemaBookingLinksArray);
         setCinemaIds(cinemaIdsArray);
         setCinemaCity(cinemaCitysArrays);
         setcinemaLocation(cinemaLocationsArray);
         setCinemaNames(cinemaNamesArray);
        

    });

        //Get movie status
        api.get(`/movies/movieStatus/${id}`).then((response) => {

          setIsComingSoon(response.data[0].is_coming_soon)
          setIsInCinema(response.data[0].is_in_cinema)
    
        });
    
        //Get release date for coming soon movie
        api.get(`/movies/getReleaseDate/${id}`).then((response) => {

          var releaseDateArray=[...releaseDate]
          var releaseDateCinemaNameArray=[...releaseDateCinemaName]

          setNumOfReleaseDate(response.data.length)

          for (var i = 0; i < response.data.length; i++) {
            var date=response.data[i].release_date
            releaseDateArray[i]=date.substring(0,date.indexOf('T'))
            releaseDateCinemaNameArray[i]=response.data[i].cinema_name
          }
          
          setReleaseDate(releaseDateArray)
          setReleaseDateCinemaName(releaseDateCinemaNameArray)
      
            
    
        });
  }, []);

  const cinemasOptions=[
    { label: 'VOX', value: "VOX"},
    { label: 'AMC', value: "AMC"},
    { label: 'Muvi', value: "Muvi"},]

  const cityOptions = [
    { label: 'Riyadh', value: "Riyadh"},
    { label: 'Makkah', value: "Makkah"},
    { label: 'Medina', value: "Medina"},
    { label: 'Qassim', value: "Qassim"},
    { label: 'Sharqia', value: "Sharqia"},
    { label: 'Asir', value: "Asir"},
    { label: 'Tabuk', value: "Tabuk"},
    { label: 'Hail', value: "Hail"},
    { label: 'Northern Border', value: "Northern Border"},
    { label: 'Jazan', value: "Jazan"},
    { label: 'Najran', value: "Najran"},
    { label: 'AlBaha', value: "AlBaha"},
    { label: 'Al-Jawf', value: "Al-Jawf"},]

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
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={addIsOpen}
                anchorEl={addOpen}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                onClose={addPopoverClose}
                disableRestoreFocus
              >
                <div className="watchListHoverText" neuton-normal-white-30px> Add to watchlist </div>
              </Popover>

              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={removeIsOpen}
                anchorEl={Operemoven}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                onClose={removePopoverClose}
                disableRestoreFocus
              >
                <div className="watchListHoverText" neuton-normal-white-30px> Remove from watchlist </div>
              </Popover>

              <div>
              <img className="moviePoster" src={poster} />  
              {onWatchList && !isAdmin &&
                            <button  className="inWatchList" onClick={removeFromWatchlist}
                            aria-owns={removeIsOpen ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={removePopoverOpen}
                            onMouseLeave={removePopoverClose}>
                            <BsFillBookmarkCheckFill size={90} />{" "}
                            </button>
              }

              {!onWatchList && !isAdmin &&
                            <button  className="bookMark" onClick={addToWatchlist}
                            aria-owns={addIsOpen ? 'mouse-over-popover' : undefined}
                            aria-haspopup="true"
                            onMouseEnter={addPopoverOpen}
                            onMouseLeave={addPopoverClose}>
                            <BsFillBookmarkPlusFill size={90} />{" "}
                            </button>
              }
              </div> 

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
                  onClick={confirmDeleteRating}
                >
                  Remove Rating
                </button>
              )}
              {/* edit movie */}(
              {isAdmin && (
                <div>
                  <button className="editMovieButton">
                    {/* <Link to="/movieForm" > */}
                    <Link to={`/movieForm/${id}`}>
                      <div className="editMovieContainer">
                        <div className="editMovieIcon">
                          {" "}
                          <FiEdit size={30} />{" "}
                        </div>
                        <div className="editMovieText"> Edit </div>
                      </div>
                    </Link>
                  </button>

                  {/* delete movie */}
                  <button
                    className="deleteMovieButton"
                    onClick={confirmDeleteMovie}
                  >
                    {/* <Link to="/home-page"> */}
                    <div className="editMovieContainer">
                      <div>
                        <RiDeleteBin2Line size={35} />{" "}
                      </div>
                      <div className="deleteMovieText"> Delete </div>
                    </div>
                    {/* </Link> */}
                  </button>
                </div>
              )}
              ){/* movie information */}
              <div className="movieInfo">
                <div className="movieBasicInfo">
                  <div className="movieTitle">
                    <div className="movieName"> {title} </div>{" "}
                    <span className="movieYear"> ({year})</span>
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

                {isComingSoon &&(
                <div className="movieReleaseDateContainer">
                  <img className="line5" src="/img/line-5@1x.svg" />
                  <div className="releaseDateText neuton-bold-white-24px">
                   Release Date
                  </div>
                

                  <div className="movieCinemaReleaseDateContainer roboto-normal-baby-powder-25px">
                  {runCallback(() => {
                  const row = [];

                  for (var i = 0; i < numOfReleaseDate; i++) {
                    var date=releaseDate[i]
                    var cinemaName=releaseDateCinemaName[i]
                      
                  row.push(
                  <div key={i}>
                  {
                  <div>
                    {cinemaName=="vox" &&
                    <div className="movieCinemaReleaseDate">
                      <img
                        src="/img/voxWhite.png"
                        height="40"
                        width="30"
                      /> 
                      <div>{date}</div>
                    </div>
                  }

                  {cinemaName=="amc" &&
                    <div className="movieCinemaReleaseDate">
                      <img
                        src="/img/amcLogo.png"
                        height="40"
                        width="60"
                      /> 
                      <div>{date}</div>
                    </div>
                  }

                  {cinemaName=="muvi"&& 
                    <div className="movieCinemaReleaseDate">
                      <img
                        src="/img/muviLogo.png"
                        height="35"
                        width="60"
                      /> 
                      <div>{date}</div>
                    </div>
                  }
                 </div>
                }
                </div>
                    );
                  }
                  return row;
                })}
                </div>
              </div>
              ) }
            </div>
            

              {/* top cast section */}
              <div className="topCast">
                <div className="topCastText neuton-normal-white-60px5">
                  {topCastText}
                </div>

                {/* casts loop	 */}
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

             

              <div className="cinemaMultiSelect">
                {/* <div> <GrLocation    color="red" size="30px"/> </div> */}
                {isInCinema && (
              <ReactMultiSelectCheckboxes
                className="cinemaFilter"
                options= {cinemasOptions}
                placeholderButtonLabel ="Select cinema"
                styles={{
                  dropdownButton: (provided, state)=> ({
                    ...provided,

                    // width: "200px",
                    // borderRadius: "50",
                    // fontSize:"50px",
                    minHeight: "56",
                    minWidth: "200",
                    background:'#fcfcfc',
                    outline: 'none',            
                    border: "0px solid black",
                    fontSize:"16px",
                    boxShadow: state.isOpen ? '0px 4px 4px var(--cardinal)' :'0px 4px 4px #00000040',
                    // boxShadow: "4px 4px 4px #E63333",
                    borderRadius: "50",
                    padding: "10px 10px 10px 20px",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: state.isSelected ? 'var(--cardinal)' : 'black',
                    background: 'white',
                  }),
                 }}
              />)}
              </div>

              <div className="cityMultiSelect">
              {isInCinema && (
              <ReactMultiSelectCheckboxes
                className="cityFilter"
                options= {cityOptions}
                onChange={onChange}
                placeholderButtonLabel ="Select city"
                styles={{
                  dropdownButton: (provided, state)=> ({
                    ...provided,

                    // width: "200px",
                    // borderRadius: "50",
                    // fontSize:"50px",
                    minHeight: "56",
                    minWidth: "200",
                    background:'#fcfcfc',
                    outline: 'none',            
                    border: "0px solid black",
                    fontSize:"16px",
                    boxShadow: state.isOpen ? '0px 4px 4px var(--cardinal)' :'0px 4px 4px #00000040',
                    borderRadius: "50",
                    padding: "10px 30px",
                  }),
                  option: (provided, state) => ({
                    ...provided,
                    color: state.isSelected ? 'var(--cardinal)' : 'black',
                    background: 'white',
                  }),
                 }}
              />)}
              </div>
              

             {/* book ticket section  */}
             <div className="bookTicketText neuton-normal-white-60px5">
                Book Ticket
              </div>

              {!isInCinema && 
              <div className="notInCenimas neuton-bold-white-20px">
                 The movie not shown in cinemas now.
              </div> 
              }

              {isInCinema && (
              <div className="bookTicketContainer">
                <OwlCarousel
                  className="similarMovies-owl-theme"
                  {...similarMoviesOptions}
                  nav
                >
                  {runCallback(() => {
                    const row = [];

                    for (var i = 0; i < numOfCinemas; i++) {
                     
                      const city = cinemaCity[i];
                      const location = cinemaLocation[i];
                      const cinemaName = cinemaNames[i];
                      const bookingLink = cinemaBookingLink[i];
                      const id = cinemaIds[i];
                      // console.log(cinemaBookingLink[i])
                      console.log(cinemaName)

                      
                      row.push(
                        <div key={i}>
                          {
                            <div className="book">
                                <img
                                  src="/img/ticket2.png"
                                />

                                
                              {cinemaName=="vox"&&
                              <div className="voxLogo">
                                  <img
                                  src="/img/voxLogo.png"
                                  height="52"
                                  width="52"
                                  />
                                </div> }

                                {cinemaName=="amc" && <div className="amcLogo">
                                  <img
                                  src="/img/amcLogo.png"
                                  height="95"
                                  width="95"
                                  />
                                </div> }

                               {cinemaName=="muvi" && <div className="muviLogo">
                                  <img
                                  src="/img/muviLogo.png"
                                  height="90"
                                  width="90"
                                  />
                                </div> }

                                <div className="cinemaLocationName">
                                   {location}
                                </div>

                                <div className="cityName">
                                <strong> {city} </strong>
                                </div> 

                                <div className="cenimaShowTimesContainer">
                                  <a
                                    className="cenimaShowTimes"
                                    href={bookingLink}
                                    target="_blank"
                                  >
                                  <div>
                                    {" "}
                                    <GiTicket size={40} />{" "}
                                  </div>
                                  <div>  Show Times </div>
                                  </a>
                                </div>
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


              {/* reviews section  */}
             <div className="reviewsContainer">
                <div className="reviewsText neuton-normal-white-60px5">
                  {reviewsText}
                </div>
                <div className="addReview">
                  {!isAdmin && !hasReviewed && (
                    <button onClick={addReview}>
                      <div className="reviewIcon">
                        {" "}
                        <FiEdit size={30} />{" "}
                      </div>
                      <div>
                        <div className="reviewItText neuton-normal-white-30px">
                          {reviewItText}
                        </div>
                      </div>
                    </button>
                  )}
                </div>
                <div className="addReview">
                  {!isAdmin && hasReviewed && (
                    <button onClick={editReview}>
                      <div className="reviewIcon">
                        {" "}
                        <FiEdit size={30} />{" "}
                      </div>
                      <div>
                        <div className="reviewItText neuton-normal-white-30px">
                          Edit Review
                        </div>
                      </div>
                    </button>
                  )}
                </div>
                

                <div className="userReviews">
                  <OwlCarousel className="owl-theme" {...options} nav>
                    {reviews.length > 0 ? (
                      reviews.map((x) => (
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
                            <div>{x.username}</div>

                            {hasReviewed && x.review_id == userReviewID ? (
                              <button
                                className="deleteReviewIcon"
                                onClick={() => {
                                  confirmDeleteReview(true, x.review_id);
                                }}
                              >
                                {" "}
                                <RiDeleteBin2Line size={35} />{" "}
                              </button>
                            ) : (
                              <h1></h1>
                            )}

                            {isAdmin && (
                              <button
                                className="deleteReviewIcon"
                                onClick={() => {
                                  confirmDeleteReview(false, x.review_id);
                                }}
                              >
                                {" "}
                                <RiDeleteBin2Line size={35} />{" "}
                              </button>
                            )}
                          </div>
                          <div className="userReview roboto-normal-white-20px">
                            {x.review}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="noReviews neuton-bold-white-20px">
                        The movie has no reviews yet.
                      </div>
                    )}
                  </OwlCarousel>
                </div>
              </div> 

              {/* similar movies section */}
              <div className="similarMoviesText neuton-normal-white-60px5">
                Similar Movies
              </div>
              <div className="similarMoviesContainer">
                <OwlCarousel
                  className="similarMovies-owl-theme"
                  {...similarMoviesOptions}
                  nav
                >
                  {runCallback(() => {
                    const row = [];

                    for (var i = 0; i < 21; i++) {
                      const id = movieIds[i];
                      const url = `/movieInfoPage/${id}`;
                      const poster = Allposters[i];

                      const title = movieTitles[i];
                      const rating = totalRatings[i];
                      if (rating == 0) {
                        rating = "No ratings yet.";
                      }

                      row.push(
                        <div key={i}>
                          {
                            <div className="similarMovie">
                              <a href={url}>
                                <img
                                  className="similarMoviePoster"
                                  src={poster}
                                  height="652"
                                  width="512"
                                />
                                <img
                                  className="similarStar"
                                  src="/img/star-2@2x.svg"
                                />
                                <div className="similarMovieRating neuton-bold-white-30px">
                                  {rating} 
                                </div>
                                <div className="similarMovieName neuton-bold-white-30px">
                                  {title} 
                                </div>
                              </a>
                            </div>
                          }
                        </div>
                      );
                    }
                    return row;
                  })}
                </OwlCarousel>
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