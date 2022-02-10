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



function genresPage(props) {
  const options = {
    items: 5,
    // Navigation
    navigation: false,
    navText: [
      "<div>  <img className='reviewsExpandLeft' src='/img/expand-left--review-@2x.svg' /> </div>",
      "<div>  <img className='reviewsExpandRight' src='/img/expand-right--review-@2x.svg' /> </div>",
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
    console.log("guest user");
  }

  const logOut = () => {
    cookies.remove("token", { path: "/" });
    window.location.reload();
  };

  // const api = Axios.create({
  //   baseURL: "http://localhost:3000/api/v1",
  // });


  let { numOfPage } = useParams();
  numOfPage = parseInt(numOfPage);

  const [allGenres, setAllGenres] = useState([]);
  const [numOfGenres, setNumOfGenres] = useState();

  const [moviesId, setMoviesId] = useState([]);
  const [movieTitles, setmovieTitles] = useState([]);
  const [Allposters, setAllposters] = useState([]);
  const [totalRatings, settotalRatings] = useState([]);
  const [ERatings, setERatings] = useState([]);
  // const [PageNum, setPageNum] = useState(1);

  // const [jj, setJj] = useState(true);

  // const [moviesInfo, setMoviesInfo] = useState([
  // {'movie_id':1,'title' : 'Toy1'} ,   {'movie_id':3,'title' : 'Toy3'}
  // ]);
  const allGens = [ "Action","Adventure","Animation", "Biography", "Comedy","Crime", "Documentary","Drama", "Family","Fantasy","Film-Noir", "History","Horror",
  "Music","Musical","Mystery", "Romance","Sci-Fi","Short","Sport", "Thriller", "War", "Western"];

  if (numOfPage ==1){
    // window.location.reload();

    var numOfItrations = 13;
    var numOfGenresToGet = 0

  }
  else{
    var numOfItrations = 10;
    var numOfGenresToGet = 13
// setPageNum(2);
  } 


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


    //Push all genre get requests to an array
    const getArray = []
    for ( var l = numOfGenresToGet; l  <  ( numOfGenresToGet + numOfItrations ) ; l++){
      getArray.push(Axios.get(`http://localhost:3000/api/v1/movies/genresFilter/${allGens[l]}/10`));
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
                                  {/* <img
                                    className="arrowIcon"
                                    src={props.arrowIcon}
                                  /> */}
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
                                                src="/img/star-2@2x.svg"
                                              />
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
                                  {/* <div className="arrowIcon"> 
                                  <IoIosArrowForward size={50}/>
                                </div> */}
                                  {/* <img
                                    className="arrowIcon"
                                    src={props.arrowIcon}
                                  /> */}
                                </button>
    
  )})
              </div>
             
            </main>

            {/* footer */}
            <div className="genresfooter"> </div>
            <img className="genresfooterLogo" src={props.logo} />
            <div className="genresfooterText1">{props.footerText1}</div>
            <div className="genresfooterText2 inter-light-bon-jour-35px2">
              <span>{props.footerText2}</span>
            </div>
          </body>
        </div>
      </div>
    </div>
  );
}

export default genresPage;