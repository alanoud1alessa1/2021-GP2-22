import React from "react";
import { Link } from "react-router-dom";
import "./genresPage.css";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import { useState } from "react";
import Header from "../header";
import OwlCarousel from "react-owl-carousel";
import { useParams } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import api from "../../api/axiosAPI"
import Footer from "../Footer";

import leftArrow from '../../static/img/expand-left--review-@2x.svg' ;





function genresPage(props) {
  const options = {
    items: 5,
    // Navigation
    navigation: false,
    navText: [
      "<div className='reviewsExpandLeft'> <h1><</h1></div>",
      "<div className='reviewsExpandRight' >  <h1>></h1></div>",  
      
    ],
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
  const allGens = [ "Action","Adventure","Animation", "Biography", "Comedy","Crime", "Documentary","Drama", "Family","Fantasy","Film-Noir", "History","Horror",
  "Music","Musical","Mystery", "Romance","Sci-Fi","Short","Sport", "Thriller", "War", "Western"];

  if (numOfPage ==1){
  
    var numOfItrations = 13;
    var numOfGenresToGet = 0

  }
  else{
    var numOfItrations = 10;
    var numOfGenresToGet = 13
  } 


  React.useEffect(() => {
    var moviesIdArray = [...moviesId];
    var movieTitlesArray = [...movieTitles];
    var postersArray = [...Allposters];
    var ratingsArray = [...totalRatings];


    //Push all genre get requests to an array
    const getArray = []
    for ( var l = numOfGenresToGet; l  <  ( numOfGenresToGet + numOfItrations ) ; l++){
      getArray.push(api.get(`/movies/genresFilter/${allGens[l]}/10`));
    }
    


    Axios.all(getArray).then(
      Axios.spread((...allData) => {


    var count = 0;
    for (var k = 0; k < numOfItrations; k++) {
        for (var i = 0; i < 10; i++) {
          try{
            moviesIdArray[count] = allData[k].data[i].movie_id;
            movieTitlesArray[count] = allData[k].data[i].title;
            postersArray[count] = allData[k].data[i].poster;
            ratingsArray[count++] = allData[k].data[i].total_rating;

          }catch{
            moviesIdArray[count] = 0;
            movieTitlesArray[count] = 0;
            postersArray[count] = 0;
            ratingsArray[count++] = 0;          }

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
  window.location = '/genresPage/2';

  };

  return (
    <div className="PageCenter">
      <div className="genresPage screen">
        <div className="genresPageContainer">
          <body>
            {/* Header */}
            <header>
              <Header />
            </header>

            {/* main */}
            <main>
              <div className="genreBody"></div>
              {/* movies loop */}
              <div className="genreMovies">
                {/* Title */}
                {runCallback(() => {
                  const basicRow = [];
                  var count = 0;
                  for (var k = 0; k < numOfItrations; k++) {
                    const genre = allGens[k+numOfGenresToGet];
                    const genrePage = `/genreTypePage/${genre}`;
                    basicRow.push(
                      <div key={k}>
                        {
                          <div>
                            <div className="goToGenreTypePage">
                              <Link to={genrePage}>
                                <div className="genreTitle">
                                  {genre}
  
                                <div className="arrowIcon"> 
                                  <IoIosArrowForward size={50}/>
                                </div>

                                </div>
                              </Link>
                            </div>
                            <div className="genreTypeMovies">
                              <OwlCarousel
                                className="owl-theme2"
                                {...options}
                                nav
                              >
                                {runCallback(() => {
                                  const row = [];

                                  for (var i = 0; i < 10; i++) {
                                    const id = moviesId[count];
                                    if(id != 0 ){
                                    const url = `/movieInfoPage/${id}`;
                                    const poster = Allposters[count];
                                    const title = movieTitles[count];
                                    var rating = totalRatings[count++];

                                    if (rating == "0.0") {
                                      rating = "No ratings yet.";
                                    }
                                    row.push(
                                      <div key={i}>
                                        {
                                          <div className="genreMovieContainer">
                                            <Link to={url}>
                                              <img
                                                className="genreMoviePoster"
                                                src={poster}
                                              />
                                              <img
                                                className="genreStar"
                                                src={
                                                  require("../../static/img/star-2@2x.svg")
                                                    .default
                                                }                                              />
                                              <div className="genreMovieRating neuton-bold-white-30px">
                                                {rating}
                                              </div>
                                              <div className="genreMovieName neuton-bold-white-30px">
                                                {title}
                                              </div>
                                            </Link>
                                          </div>
                                        }
                                      </div>
                                    );
                                    }
                                    else{
                                      count++;
                                    }

                                  }
                                  return row;
                                })}
                              </OwlCarousel>
                            </div>
                          </div>
                        }
                      </div>
                    );
                  }
                  return basicRow;
                })}
                {((numOfPage == 1 )&&
                   <button className="viewMoreButton neuton-bold-white-30px" onClick={refreashPage}>
                                  View more ..
                                </button>
    
  )})
              </div>
             
            </main>

            {/* footer */}
            <Footer />
          </body>
        </div>
      </div>
    </div>
  );
}

export default genresPage;
