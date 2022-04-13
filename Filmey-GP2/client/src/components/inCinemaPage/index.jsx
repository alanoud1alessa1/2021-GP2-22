import React from "react";
import { Link } from "react-router-dom";
import "./inCinemaPage.css";
import Header from "../header";
import { useParams } from "react-router-dom";
import { useState } from "react";
// import Axios from "axios";
import api from "../../api/axiosAPI"
import Footer from "../Footer";





function inCinemaPage(props) {

  const {} = props;

  // const api = Axios.create({
  //   baseURL: "http://localhost:3000/api/v1",
  // });

//Whats on Variables and constans
const [listMovies, setListMovies] = useState([]);
const [sortType, setSortType] = useState('');

  React.useEffect(() => {
    window.scrollTo(0, 0)
    var numOfTopMovies=10
    var listMoviesdArray = [...listMovies];

    api.get(`/movies/whatsOnMovies/${numOfTopMovies}`).then((response) => {

        console.log('whatsOnMovies')
        console.log(response.data)

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
    <div className="PageCenter">
      <div className="genresPage screen">
        <div className="genresPageContainer">
        <body>

            {/* Header */}
             <header>
                <Header/> 
            </header>

          {/* main */}
          <main>
            <div className="genreTypebody"></div>

            {/* Title */}
            <div>
              <h1 className="genreTypeTitle neuton-normal-white-60px3"> In Cinema </h1>
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
              <option value="total_rating">Movie Rating</option>
              <option value="year">Release Date</option>
            </select>

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
              ) : (""
              )}
            </div>

          </main>
          {/* footer */}
          {/* <Footer /> */}
        </body>
        </div>
      </div>
    </div>
  );
}

export default inCinemaPage;
