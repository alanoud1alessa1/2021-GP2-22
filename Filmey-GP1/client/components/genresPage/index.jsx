import React from "react";
import { Link } from "react-router-dom";
import "./genresPage.css";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import { useState } from "react";
import Header from "../header";
import OwlCarousel from 'react-owl-carousel';  
import 'owl.carousel/dist/assets/owl.carousel.css';  
import 'owl.carousel/dist/assets/owl.theme.default.css';  

function genresPage(props) {

  const options={
    items: 5,
    // Navigation
    navigation : false,
    navText: [
      "<div className='reviewsExpandLeft'>  <img className='reviewsExpandLeft' src='/img/expand-left--review-@2x.svg' /> </div>",
      "<div>  <img className='reviewsExpandRight' src='/img/expand-right--review-@2x.svg' /> </div>"
    ],
    transitionStyle: "fade"
  }

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
    console.log("guest user");
  }

  const logOut = () => {
    cookies.remove("token", { path: "/" });
    window.location.reload();
  };

  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
  });

  const [allGenres, setAllGenres] = useState([]);
  const [numOfGenres, setNumOfGenres] = useState();

  const [moviesId, setMoviesId] = useState([]);
  const [movieTitles, setmovieTitles] = useState([]);
  const [Allposters, setAllposters] = useState([]);
  const [totalRatings, settotalRatings] = useState([]);

  // const [moviesInfo, setMoviesInfo] = useState([
  // {'movie_id':1,'title' : 'Toy1'} ,   {'movie_id':3,'title' : 'Toy3'}
  // ]);
  const allGens = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Short",
    "Sport",
    "Thriller",
    "War",
    "Western",
  ];
  // // const numOfGenres = 0;
  // let genresArray = [];
  // //Get All Genres
  // api.get(`/movies/allGenres/1`).then((response) => {
  //   for (var i = 0; i < response.data.length; i++) {
  //     genresArray[i] = response.data[i].genre;
  //     // numOfGenres = numOfGenres + 1;
  //   }
  //   setAllGenres(genresArray);
  // });

  React.useEffect(() => {
    var moviesIdArray = [...moviesId];
    var movieTitlesArray = [...movieTitles];
    var postersArray = [...Allposters];
    var ratingsArray = [...totalRatings];

    const numOfItrations = 2;
    for (var k = 0; k < numOfItrations; k++) {
      var genreType = allGens[k];

      var count = 0;

      console.log(genreType);

      api.get(`/movies/genresFilter/${genreType}/4`).then((response) => {
        for (var i = 0; i < 4; i++) {

          moviesIdArray[count] = response.data[i].movie_id;
          movieTitlesArray[count] = response.data[i].title;
          postersArray[count] = response.data[i].poster;
          ratingsArray[count++] = response.data[i].total_rating;
          console.log(response.data[i].total_rating)
        }

        //if finish getting all movies --> then set valuse
        if (moviesIdArray.length == numOfItrations * 4) {
          console.log(movieTitlesArray);
          setMoviesId(moviesIdArray);
          setmovieTitles(movieTitlesArray);
          setAllposters(postersArray);
          settotalRatings(ratingsArray);
        }
      });
    }
  }, []);

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
                          for (var k = 0; k < 2; k++) {
                          const genre = allGens[k];
                          const genrePage = `/genreTypePage/${genre}`
                            basicRow.push(
                            <div key={k}>
                            {
                              <div>
              <div className="goToGenreTypePage">
              <Link to={genrePage}>
                <div className="genreTitle">
                  {genre}
                  <img className="arrowIcon" src={props.arrowIcon} />
                </div>
              </Link>
              </div>
              <div className="genreTypeMovies"> 
              <OwlCarousel className="owl-theme2"  
                        {...options}   
                        nav
                        >
                {runCallback(() => {
                          const row = [];

                          for (var i = 0; i < 10; i++) {
                            const id = moviesId[count];
                            const url = `/movieInfoPage/${id}`;
                            const poster = Allposters[count];
                            const title = movieTitles[count];
                            const rating = totalRatings[count++];
                            // rating = "hello";
                            
                            row.push(
                            <div key={i}>
                            {
                              <div>
                                <div className="genreMovieContainer"> 
                                <Link to={url}>
                                <img  className="genreMoviePoster" src={poster} />
                                <img className="genreStar" src="/img/star-2@2x.svg" />
                                <div className="genreMovieRating neuton-bold-white-30px"> hi  {rating}</div> 
                                <div className="genreMovieName neuton-bold-white-30px"> {title} </div> 
                                </Link>
                            </div> 
                            </div>
                            }
                            </div>
                            );
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

                </div>          
              {/* Title */}
              {/* <div className='goToGenreTypePage'>
                <Link to="/genreTypePage/Action">
                  <img className="arrowIcon" src={props.arrowIcon} />
                  <h1 className="genreTypeTitle neuton-normal-white-60px3">
                    {allGens[0]}
                  </h1>
                </Link>
              </div> */}

              {/* row1  */}
              {/* <div className="movies">
                {runCallback(() => {
                  const row = [];
                  var count = 0;
                  for (var k = 0; k < 2; k++) {
                    // const gen = allGens[k];
                    // const genPage = `/genreTypePage/${gen}`
                    
                    for (var i = 0; i <= 3; i++) {
                      const id = moviesId[count];
                      const url = `/movieInfoPage/${id}`;

                      const poster = Allposters[count];
                      const title = movieTitles[count];
                      const rating = totalRatings[count++];

                      // // const reminder = i % 4;

                      // // if (reminder == 0) {
                      // //   reminder = 4;
                      // // }
                      const className1 = `Movie${count}`;

                      row.push(
                        <div key={i}>
                          {
                            <div className={className1}>
                              <Link to={url}>
                                <img
                                  className="genresMoviePoster1"
                                  src={poster}
                                />
                                <div className="genresMovieName1">{title}</div>
                                <div className="genresRating1 neuton-bold-white-30px3">
                                  {rating}
                                </div>
                                <img className="genresStar1" src={props.star} />
                                <div className="genresGenreType1">
                                  <div className="genresGenreTypeText1 roboto-normal-cardinal-12px3">
                                    {props.genresGenreTypeText1}
                                  </div>
                                </div>
                              </Link>
                            </div>
                          }
                        </div>
                      );
                    }
                  }
                  return row;
                })}
              </div> */}
            </main>

            {/* footer */}
            {/* <div className="footer"> </div>
            <img className="footerLogo" src={props.logo} />
            <div className="footerText1">{props.footerText1}</div>
            <div className="footerText2 inter-light-bon-jour-35px2">
              <span>{props.footerText2}</span>
            </div> */}
          </body>
        </div>
      </div>
    </div>
  );
}

export default genresPage;
