import React from "react";
import { Link } from "react-router-dom";
import "./genreTypePage.css";
import Header from "../header";
import { useParams } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";



function genreTypePage(props) {

  const runCallback = (cb) => {
    return cb();
  };
  const {} = props;

  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
  });

  const [moviesId, setMoviesId] = useState([]);
  const [movieTitles, setmovieTitles] = useState([]);
  const [Allposters, setAllposters] = useState([]);
  const [totalRatings, settotalRatings] = useState([]);



  let {genre} = useParams();
  React.useEffect(() => {
    window.scrollTo(0, 0)

    var moviesIdArray = [...moviesId];
    var movieTitlesArray = [...movieTitles];
    var postersArray = [...Allposters];
    var ratingsArray = [...totalRatings];



      api.get(`/movies/genresFilter/${genre}/48`).then((response) => {
        for (var i = 0; i < response.data.length; i++) {
          moviesIdArray[i] = response.data[i].movie_id;
          movieTitlesArray[i] = response.data[i].title;
          postersArray[i] = response.data[i].poster;
          ratingsArray[i] = response.data[i].total_rating;

        }

        //if finish getting all movies --> then set valuse
        if (moviesIdArray.length == response.data.length) {
          console.log(movieTitlesArray);
          setMoviesId(moviesIdArray);
          setmovieTitles(movieTitlesArray);
          setAllposters(postersArray);
          settotalRatings(ratingsArray);

        }
      });

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
              <h1 className="genreTypeTitle neuton-normal-white-60px3">{genre}</h1>
            </div>
              {/* row1  */}
              <div className="movies">
                {runCallback(() => {
                  const row = [];
                  var count = 0;
                    for (var i = 0; i < moviesId.length; i++) {
                      const id = moviesId[count];
                      const url = `/movieInfoPage/${id}`;
                      const poster = Allposters[count];
                      const title = movieTitles[count];
                      const rating = totalRatings[count++];
                      if (rating == "0.0"){
                        rating = "No ratings yet."
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

export default genreTypePage;
