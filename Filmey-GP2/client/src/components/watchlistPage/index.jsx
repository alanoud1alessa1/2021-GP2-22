import Popover from "@mui/material/Popover";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  BsFillBookmarkFill,
  BsCheckLg,
} from "react-icons/bs";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Footer from "../Footer";
import Header from "../header";
import "./watchlistPage.css";
import api from "../../api/axiosAPI"


const watchlistPage = (props) => {
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

  const [listMovies, setListMovies] = useState([]);
  const [onWatchList, setOnWatchList] = useState([]);
  const [resultMessage, setResultMessage] = useState();
  const [sortType, setSortType] = useState("");

  React.useEffect(() => {
    window.scrollTo(0, 0);

    var listMoviesdArray = [...listMovies];
    var onWatchListArray = [...onWatchList];

    api
      .post(`Users/viewWatchList`, {
        user_id: user_id,
      })
      .then((response) => {
        if (response.data.length == 0) {
          setResultMessage("No movies in your watch list");
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

        const sortArray = (type) => {
          const types = {
            total_rating: "total_rating",
            title: "title",
            year: "year",
          };
          const sortProperty = types[type];
          console.log("sortProperty");

          console.log(sortProperty);
          var sorted = [];
          if (sortProperty == "title") {
            sorted = [...listMoviesdArray].sort((a, b) =>
              a[sortProperty].toString().localeCompare(b[sortProperty])
            );
          } else {
            sorted = [...listMoviesdArray].sort(
              (a, b) => b[sortProperty] - a[sortProperty]
            );
          }
          console.log(sorted);
          setListMovies(sorted);
        };

        sortArray(sortType);
      });
  }, [sortType]);

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
    <div>
      {/* header  */}
      <Header />
      {/* main content  */}
      <Container className="py-5">
        <div className="d-flex justify-content-between gap-2">
          <div>
            <div className="page-title">{username}'s Watchlist</div>
          </div>
        </div>
        {/* sorting */}
        <div className="d-flex gap-2 mt-5 ">
          <div className="SortbyText neuton-normal-white-30px">
            <strong> Sort by: </strong>
          </div>
          <select
            className="sortMoviesSelect neuton-normal-white-60px3"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option
              className="sortMoviesSelectOption"
              defaultChecke
              selected
              disabled
              hidden
            >
              Select..
            </option>
            <option value="title">Alphabetical</option>
            <option value="total_rating">Movie Rating</option>
            <option value="year">Release Date</option>
          </select>
        </div>
      </Container>

      <Container className="py-2">
        <Row className="g-4 cinema-movies">
          {listMovies.length > 0 ? (
            listMovies.map((x) => (
              <Col className="watch-list-box"  xs={6} sm={2} md={4} lg={2}>
                <div className="movie">
                  <Link to={`/movieInfoPage/${x.movie_id}`}>
                    <img className="moviePosterCarousel" src={x.poster} />
                    <div className="p-3">
                      <div className="movieRating">
                        <img className="movieStar"
                          src={
                            require("../../static/img/star-2@2x.svg")
                              .default
                          }   
                         />
                        {x.total_rating != null ? (
                          <div className="movieRating neuton-bold-white-30px">
                            {x.total_rating}
                          </div>
                        ) : (
                          <div className="movieRating neuton-bold-white-30px">
                            No ratings.
                          </div>
                        )}
                      </div>
                      <h3 className="movieName neuton-bold-white-30px">
                        {x.title} ({x.year})
                      </h3>
                    </div>
                  </Link>
                </div>

                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: "none",
                  }}
                  open={removeIsOpen}
                  anchorEl={Operemoven}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  onClose={removePopoverClose}
                  disableRestoreFocus
                >
                  <div className="watchListHoverText">
                    {" "}
                    Remove from watchlist{" "}
                  </div>
                </Popover>

                {/* <button
                  className="watch-list"
                  onClick={() => {
                    removeFromWatchlist(x.movie_id);
                  }}
                  aria-owns={removeIsOpen ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={removePopoverOpen}
                  onMouseLeave={removePopoverClose}
                >
                  <BsFillBookmarkCheckFill size={60} />{" "}
                </button> */}
                <div>
                  <button
                  className="watchlistBookMarkCheck"
                  onClick={removeFromWatchlist}
                  aria-owns={removeIsOpen ? "mouse-over-popover" : undefined}
                  aria-haspopup="true"
                  onMouseEnter={removePopoverOpen}
                  onMouseLeave={removePopoverClose}
                >
                  <BsCheckLg size={20}/>{" "}
                 </button>

                  <button
                    className="watch-list"
                    onClick={removeFromWatchlist}
                    aria-owns={removeIsOpen ? "mouse-over-popover" : undefined}
                    aria-haspopup="true"
                    onMouseEnter={removePopoverOpen}
                    onMouseLeave={removePopoverClose}
                  >
                    <BsFillBookmarkFill size={60} color="var(--cardinal)" />{" "}
                  </button>
                </div>
              </Col>
            ))
          ) : (
            <div className="emptyWatchList pt-5 text-center neuton-bold-white-20px">
              {resultMessage}
            </div>
          )}
        </Row>
      </Container>
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default watchlistPage;
