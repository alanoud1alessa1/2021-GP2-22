import React from "react";
import { Link } from "react-router-dom";
import "./inCinemaPage.css";
import Header from "../header";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";



function inCinemaPage(props) {

  const runCallback = (cb) => {
    return cb();
  };
  const {} = props;

  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
  });

//   const [moviesId, setMoviesId] = useState([]);
//   const [movieTitles, setmovieTitles] = useState([]);
//   const [Allposters, setAllposters] = useState([]);
//   const [totalRatings, settotalRatings] = useState([]);

//Whats on Variables and constans
const [whatsOnMovieIds, setWhatsOnMovieIds] = useState([]);
const [whatsOnMovieTitles, setWhatsOnMovieTitles] = useState([]);
const [whatsOnMoviePosters, setWhatsOnMoviePosters] = useState([]);
const [numOfWhatsOnMovie, setNumOfWhatsOnMovie] = useState(0);
const [whatsOnMovieRatings, setWhatsOnMovieRatings] = useState([]);



 // let {genre} = useParams();
  React.useEffect(() => {
    window.scrollTo(0, 0)
    var numOfTopMovies=10

    api.get(`/movies/whatsOnMovies/${numOfTopMovies}`).then((response) => {

        console.log('whatsOnMovies')
        console.log(response.data)
    
          var whatsOnIdsArray = [...whatsOnMovieIds];
          var whatsOnTitlesArray = [...whatsOnMovieTitles];
          var whatsOnPostersArray = [...whatsOnMoviePosters];
          var whatsOnRatingsArray = [...whatsOnMovieRatings];
  
          setNumOfWhatsOnMovie(response.data.length)
  
          for (var i = 0; i < response.data.length; i++) {
            whatsOnIdsArray[i] = response.data[i].movie_id;
            whatsOnTitlesArray[i] = response.data[i].title;
            whatsOnPostersArray[i] = response.data[i].poster;
            whatsOnRatingsArray[i]= response.data[i].total_rating;
           }
  
           setWhatsOnMovieIds(whatsOnIdsArray);
           setWhatsOnMovieTitles(whatsOnTitlesArray);
           setWhatsOnMoviePosters(whatsOnPostersArray);
           setWhatsOnMovieRatings(whatsOnRatingsArray);
         
        });
    

    // var moviesIdArray = [...moviesId];
    // var movieTitlesArray = [...movieTitles];
    // var postersArray = [...Allposters];
    // var ratingsArray = [...totalRatings];



    //   api.get(`/movies/genresFilter/${genre}/48`).then((response) => {
    //     for (var i = 0; i < response.data.length; i++) {
    //       moviesIdArray[i] = response.data[i].movie_id;
    //       movieTitlesArray[i] = response.data[i].title;
    //       postersArray[i] = response.data[i].poster;
    //       ratingsArray[i] = response.data[i].total_rating;

    //     }

    //     //if finish getting all movies --> then set valuse
    //     if (moviesIdArray.length == response.data.length) {
    //       console.log(movieTitlesArray);
    //       setMoviesId(moviesIdArray);
    //       setmovieTitles(movieTitlesArray);
    //       setAllposters(postersArray);
    //       settotalRatings(ratingsArray);

    //     }
    //  });

  }, []);




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
              {/* row1  */}
              <div className="movies">
                {runCallback(() => {
                  const row = [];
                  var count = 0;
                    for (var i = 0; i < numOfWhatsOnMovie; i++) {
                      const id = whatsOnMovieIds[i];
                      const url = `/movieInfoPage/${id}`;
                      const poster = whatsOnMoviePosters[i];
                      const title =whatsOnMovieTitles[i];
                      var rating = whatsOnMovieRatings[i];
                      if ( rating == 0 ||  rating == null ) {
                        rating = "No ratings yet.";
                      }
                      else
                      {
                        rating = whatsOnMovieRatings[i];
                      }

                      row.push(
                        <div key={i}>
                          {
                            <div className="genreTypeMovieContainer" >
                              <Link to={url}>
                                <img className="genreTypeMoviePoster" src={poster} />
                                <img className="genreTypeStar" src={props.star} />
                                <div className="genreTypeRating neuton-bold-white-30px">
                                 {rating}
                                </div>
                                <div className="genreTypeMovieName neuton-bold-white-30px">{title}</div>
                              </Link>
                            </div>
                          }
                        </div>
                      );
                  }
                  return row;
                })}
              </div>

          </main>
          {/* footer */}
          {/* <div className="footer"> </div>
          <img className="footerLogo" src={logo} />
          <div className="footerText1">{footerText1}</div>
          <div className="footerText2 inter-light-bon-jour-35px2">
            <span>{footerText2}</span>
          </div> */}
        </body>
        </div>
      </div>
    </div>
  );
}

export default inCinemaPage;
