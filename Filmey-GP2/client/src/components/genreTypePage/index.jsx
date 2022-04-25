import React from "react";
import { Link } from "react-router-dom";
import Header from "../header";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Footer from "../Footer";
import { Col, Container, Row } from "react-bootstrap";
import api from "../../api/axiosAPI"

const genreTypePage = (props) => {
  const {} = props;

  const [listMovies, setListMovies] = useState([]);
  const [sortType, setSortType] = useState("");

  let { genre } = useParams();
  React.useEffect(() => {
    window.scrollTo(0, 0);
    var listMoviesdArray = [...listMovies];

    api.get(`/movies/genresFilter/${genre}/48`).then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        console.log(response.data.length);
        listMoviesdArray[i] = response.data[i];
      }
      if (listMoviesdArray.length == response.data.length) {
        console.log("results");
        console.log(response.data);
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

  return (
    <div>
      {/* header  */}
      <Header />
      {/* main content  */}
      <Container className="pb-5">
        <div className="d-flex justify-content-between gap-2">
          <div>
            <div className="page-title">{genre}</div>
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

      <Container className="py-2 genre-type-section">
        <Row className="g-4 cinema-movies">
          {listMovies.length > 0
            ? listMovies.map((x) => (
                <Col className="watch-list-box" xs={6} sm={2} md={4} lg={2}>
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
                          {x.total_rating != "0.0" ? (
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
                </Col>
              ))
            : ""}
        </Row>
      </Container>
      {/* footer  */}
      <Footer />
    </div>
  );
};

export default genreTypePage;
