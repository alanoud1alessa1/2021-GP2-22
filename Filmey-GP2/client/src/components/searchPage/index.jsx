import Popover from "@mui/material/Popover";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
import Footer from "../Footer";
import Header from "../header";
import { useParams } from "react-router-dom";
import api from "../../api/axiosAPI"


function searchPage(props) {
  const {} = props;

  let {searchType} = useParams();
  console.log("searchType")
  console.log(searchType)
  
  let {searchText} = useParams();
  console.log("searchText")
  console.log(searchText)


  const [sortType, setSortType] = useState('');
  const [listMovies, setListMovies] = useState([]);
  const [resultMessage, setResultMessage] = useState();

  React.useEffect(() => {
    window.scrollTo(0, 0)
      var listMoviesdArray = [...listMovies];
  
      api.get(`/movies/search/${searchType}/${searchText}`).then((response) => {
        console.log(response.data)
        if(response.data.length==0)
            {
              setResultMessage('No results found for "'+searchText+'"')
            }

        for (var i = 0; i < response.data.length; i++) {
              console.log( response.data.length)
              listMoviesdArray[i] = response.data[i];
            }
            if (listMoviesdArray.length == response.data.length) {
              console.log('results')
              console.log(response.data)
              setListMovies(listMoviesdArray);  
            }
            
          const sortArray = type => {
            const types = {
              total_rating: 'total_rating',
              title: 'title',
              year: 'year',
            };
            const sortProperty = types[type];
            console.log("sortProperty")
  
            console.log(sortProperty)
            var sorted=[];

            if (sortProperty=="title"){
              sorted = [...listMoviesdArray].sort((a, b) => a[sortProperty].toString().localeCompare(b[sortProperty]));
          }
          else {
            sorted = [...listMoviesdArray].sort((a, b) => b[sortProperty] - a[sortProperty])
          }
            console.log(sorted)
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
      <Container className="py-5">
        <div className="d-flex justify-content-between gap-2">
          <div>
            <div className="page-title">Search Results</div>
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

export default searchPage;
