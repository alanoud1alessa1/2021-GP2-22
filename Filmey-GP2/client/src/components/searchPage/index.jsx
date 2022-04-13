import React from "react";
import "./searchPage.css";
import Header from "../header";
import { useState } from "react";
import { Link } from "react-router-dom";
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
              more_relevant: 'more_relevant',
            };
            const sortProperty = types[type];
            console.log("sortProperty")
  
            console.log(sortProperty)
            var sorted=[];

          if (sortProperty!="more_relevant"){
            if (sortProperty=="title"){
              sorted = [...listMoviesdArray].sort((a, b) => a[sortProperty].toString().localeCompare(b[sortProperty]));
          }
          else {
            sorted = [...listMoviesdArray].sort((a, b) => b[sortProperty] - a[sortProperty])
          }
            console.log(sorted)
            setListMovies(sorted);
        }
      };
        
  
        sortArray(sortType);
      });
    }, [sortType]); 



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

            {/* sorting */}
            <div className="SortbyText neuton-normal-white-30px">
              <strong> Sort by: </strong>
            </div> 
            <select className= "sortMoviesSelect neuton-normal-white-60px3" onChange={(e) => setSortType(e.target.value)} > 
              <option className= "sortMoviesSelectOption" 
                defaultChecke                  
                selected
                disabled 
                hidden>
                Select..
              </option>
              <option value="title">Alphabetical</option>
              <option value="more_relevant">More Relevant</option>
              <option value="total_rating">Movie Rating</option>
              <option value="year">Release Date</option>
            </select>
            
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
                          }  
                        />
                        {x.total_rating!= null ? (
                        <div className="watchlistRating neuton-bold-white-30px">
                          {x.total_rating}
                        </div>
                        ): (
                          <div className="watchlistRating neuton-bold-white-30px">
                          No ratings yet.
                        </div>
                        )}
                        <div className="watchlistMovieName neuton-bold-white-30px">
                        {x.title} {" "} ({x.year})
                        </div>
                      </Link>

                    </div>
                  ))
                ) : (
                  <div className="emptyWatchList neuton-bold-white-20px">
                   {resultMessage}
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



