import React from "react";
import "./watchlistPage.css";
import Header from "../header";
import { useState } from "react";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { Link } from "react-router-dom";
// import Axios from "axios";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Popover from '@mui/material/Popover';
import api from "../../api/axiosAPI"
import Footer from "../Footer";



function watchlistPage(props) {

//remove from watchlist hover
const [Operemoven, setremoveOpen] = React.useState(null);
const removePopoverOpen = (event) => {
  setremoveOpen(event.currentTarget);
};
const removePopoverClose = () => {
  setremoveOpen(null);
};
const removeIsOpen = Boolean(Operemoven);

  const {} = props;

  var registered = false;
  var username = "";
  var user_id;
  var isAdmin;

  const cookies = new Cookies();
  try {
    const token = cookies.get("token");
    var decoded = jwt_decode(token);
    username = decoded.username;
    user_id = decoded.userID;
    isAdmin = decoded.isAdmin;
    registered = true;
  } catch {
    registered = false;
  }

  // const api = Axios.create({
  //   baseURL: "http://localhost:3000/api/v1",
  // });

  const [listMovies, setListMovies] = useState([]);
  const [onWatchList, setOnWatchList] = useState([]);
  const [resultMessage, setResultMessage] = useState();

  React.useEffect(() => {
    window.scrollTo(0, 0);

    var listMoviesdArray = [...listMovies];
    var onWatchListArray = [...onWatchList];

    api
      .post(`Users/viewWatchList`, {
        user_id: user_id,
      })
      .then((response) => {
        if (response.data.length==0)
        {
          setResultMessage('No movies in your watch list')
        }
        
        for (var i = 0; i < response.data.length; i++) {
          listMoviesdArray[i] = response.data[i];
          onWatchListArray[i] = true;
        }

        //if finish getting all movies --> then set valuse
        if (listMoviesdArray.length == response.data.length) {
          console.log(listMoviesdArray);
          console.log("listMoviesdArray.indecies");
          console.log(listMoviesdArray.findIndex);
          setOnWatchList(onWatchListArray);
          setListMovies(listMoviesdArray);
        }

      });
  }, []);

  // const addToWatchlist = () => {
  //   console.log(onWatchList);
  //   setOnWatchList(true);
  //   console.log(onWatchList);
  // };

  const removeFromWatchlist = (movie_id) => {
    console.log("remove");
    api
      .post(`Users/deleteWatchList`, {
        user_id: user_id,
        movie_id: movie_id,
      })
      .then((response) => {
        if (response) {
          setOnWatchList(false);
          console.log(onWatchList);
          window.location.reload();


        }
      });
  };

  return (
    <div className="PageCenter">
      <div className="watchlistPage screen">
        <div className="watchlistPageContainer">
          <body>
            {/* Header */}
            <header>
              <Header />
            </header>

            {/* main */}
            <main>
              <div className="watchlistbody"></div>

              {/* Title */}
              <div>
                <h1 className="watchlistTitle neuton-normal-white-60px3">
                  {" "}
                 {username}'s Watchlist
                </h1>
              </div>
              {/* row1  */}
              <div className="movies">
                
                {listMovies.length > 0 ? (
                  listMovies.map((x) => (


                    <div className="watchlistMovieContainer">

                      <Link to={`/movieInfoPage/${x.movie_id}`} >
                        <img className="genreTypeMoviePoster" src={x.poster} />
                        <img
                          className="watchlistStar"
                          src={
                            require("../../static/img/star-2@2x.svg")
                              .default
                          }                        />
                        <div className="watchlistRating neuton-bold-white-30px">
                          {x.total_rating}
                        </div>
                        <div className="watchlistMovieName neuton-bold-white-30px">
                          {x.title}
                        </div>
                      </Link>

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

                      <button
                        className="movieInWtchlist"
                        onClick={() => {
                          removeFromWatchlist(x.movie_id);
                        }}
                        aria-owns={removeIsOpen ? 'mouse-over-popover' : undefined}
                        aria-haspopup="true"
                        onMouseEnter={removePopoverOpen}
                        onMouseLeave={removePopoverClose}
                      >
                        <BsFillBookmarkCheckFill size={90} />{" "}
                      </button>

                    </div>
                  ))
                ) : (
                  <div className="emptyWatchList neuton-bold-white-20px">
                    {resultMessage}
                  </div>
                )}


{/* 
{runCallback(() => {
                  const row = [];
                  for (var i = 0; i < listMovies.length; i++) {
                    const url = `/movieInfoPage/${listMovies.movie_id}`;
                  

                    row.push(
                      <div key={i}>
                        {

                          <div className="watchlistMovieContainer">
                             <Link to={url}>
                               
                              </Link>
                  
                    
                          </div>
                        }
                      </div>
                    );
                  }
                  return row;
                })}  */}


                {/* {runCallback(() => {
                  const row = [];
                  for (var i = 0; i < moviesId.length; i++) {
                    const id = moviesId[i];
                    const url = `/movieInfoPage/${id}`;
                    const poster = Allposters[i];
                    const title = movieTitles[i];
                    const rating = totalRatings[i];
                    if (rating == "0.0") {
                      rating = "No ratings yet.";
                    }

                    row.push(
                      <div key={i}>
                        {
                          <div className="watchlistMovieContainer">
                             <Link to={url}>
                                <img className="genreTypeMoviePoster" src={poster} />
                                <img className="genreTypeStar" src={props.star} />
                                <div className="genreTypeRating neuton-bold-white-30px">
                                 {rating}
                                </div>
                                <div className="genreTypeMovieName neuton-bold-white-30px">{title}</div>
                              </Link>


                    

                            {onWatchList && (

                              
                              <button
                                className="movieBookMark"
                                onClick={removeFromWatchlist}
                              >
                                <BsFillBookmarkCheckFill size={90} />{" "}
                              </button>
                            )}

                            {!onWatchList && (
                              <button
                                className="movieInWtchlist"
                                onClick={addToWatchlist}
                              >
                                <BsFillBookmarkPlusFill size={90} />{" "}
                              </button>
                            )}
                            <img
                              className="watchlistStar"
                              src="/img/star-2@2x.svg"
                            />
                            <div className="watchlistRating neuton-bold-white-30px">
                              {rating} 
                            </div>
                            <div className="watchlistMovieName neuton-bold-white-30px">
                              {title}
                            </div>
                          </div>
                        }
                      </div>
                    );
                  }
                  return row;
                })} */}
              </div>
            </main>
          </body>
        </div>
      </div>
    </div>
  );
}

export default watchlistPage;



