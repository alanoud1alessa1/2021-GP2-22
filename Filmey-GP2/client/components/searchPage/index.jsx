import React from "react";
import "./searchPage.css";
import Header from "../header";
import { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useParams } from "react-router-dom";

function searchPage(props) {
  const {} = props;

  let {searchText} = useParams();
  console.log("searchText")
  console.log(searchText)

  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
  });

  const [listMovies, setListMovies] = useState([]);

  React.useEffect(() => {
    window.scrollTo(0, 0)
    var numOfTopMovies=10
    var listMoviesdArray = [...listMovies];

    api.get(`/movies/whatsOnMovies/${numOfTopMovies}`)
      .then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          listMoviesdArray[i] = response.data[i];
        }
        if (listMoviesdArray.length == response.data.length) {
          console.log('whatsOnMovies')
          console.log(response.data)
          setListMovies(listMoviesdArray);  
        }
        });
  })


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
                  {" "}Search  Results
                 
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
                          src="/img/star-2@2x.svg"
                        />
                        <div className="watchlistRating neuton-bold-white-30px">
                          {x.total_rating}
                        </div>
                        <div className="watchlistMovieName neuton-bold-white-30px">
                          {x.title}
                        </div>
                      </Link>

                    </div>
                  ))
                ) : (
                  <div className="emptyWatchList neuton-bold-white-20px">
                   No results found for "{searchText}"
                  </div>
                )}
              </div>
            </main>
          </body>
        </div>
      </div>
    </div>
  );
}

export default searchPage;



