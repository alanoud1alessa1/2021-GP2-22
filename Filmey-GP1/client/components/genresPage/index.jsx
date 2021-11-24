import React from "react";
import { Link } from "react-router-dom";
import "./genresPage.css";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import { useState } from "react";
import Header from "../header";

function genresPage(props) {
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



  const [allGenres,setAllGenres]=useState([]);
  const [numOfGenres,setNumOfGenres]=useState();

  // const [moviesId, setMoviesId] = useState([]);
  // const [movieTitles, setmovieTitles] = useState([]);
  // const [Allposters, setAllposters] = useState([]);

    const [moviesInfo, setMoviesInfo] = useState([
      {'movie_id':1,'title' : 'Toy1'} ,   {'movie_id':3,'title' : 'Toy3'}
    ]);



  React.useEffect(() => {
    let genresArray = [...allGenres];


    //Get All Genres
    api.get(`/movies/allGenres/1`).then((response) => {

      for (var i = 0; i < response.data.length; i++) {
        genresArray[i] = response.data[i].genre;
      }
      // console.log(genresArray[4])
      setAllGenres(genresArray);
    });




console.log(genresArray.length);


    let genreType = 'Comedy';

    
    api.get(`/movies/genresFilterTopFour/${genreType}`).then((response) => {


    //   setMoviesInfo( prevState => ({
    //     moviesInfo: [...prevState.moviesInfo,  {'movie_id':2,'title' : 'Toy2'}]
    // }));

    const info = [...moviesInfo, {'movie_id':2,'title' : 'Toy2'}]
    console.log(info);
    setMoviesInfo(info)
    
//       const moviesInfoArray = [...moviesInfo];
//       moviesInfoArray[0] ={'movie_id':1,'title' : 'Toy1'};
//       moviesInfoArray[1] ={'movie_id':2,'title' : 'Toy2'};
// console.log(moviesInfoArray[0].movie_id);

//       // const movieInfo = {'movie_id':2,'title' : 'Toy2',}  
//       setMoviesInfo(moviesInfoArray);

      // const moviesIdArray = [...moviesId];
      // const movieTitlesArray = [...movieTitles];
      // const postersArray = [...Allposters];

      // for (var i = 0; i < response.data.length; i++) {
      //   moviesIdArray[i] = response.data[i].movie_id;
      //   movieTitlesArray[i] = response.data[i].title;
      //   postersArray[i] = response.data[i].poster;
      // }
      // setMoviesId(moviesIdArray);
      // setmovieTitles(movieTitlesArray);
      // setAllposters(postersArray);
    });

    // api.get(`/movies/genresFilterTopFour/${genreType}`).then((response) => {

    //   const moviesIdArray = [...moviesId];
    //   const movieTitlesArray = [...movieTitles];
    //   const postersArray = [...Allposters];

    //   for (var i = 0; i < response.data.length; i++) {
    //     moviesIdArray[i] = response.data[i].movie_id;
    //     movieTitlesArray[i] = response.data[i].title;
    //     postersArray[i] = response.data[i].poster;
    //   }
    //   setMoviesId(moviesIdArray);
    //   setmovieTitles(movieTitlesArray);
    //   setAllposters(postersArray);
    // });
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
              <div className="body"></div>
              {/* Title */}
              <div className="goToGenreTypePage">
                <Link to="/genreTypePage">
                  <img className="arrowIcon" src={props.arrowIcon} />
                  <h1 className="genreTypeTitle neuton-normal-white-60px3">
                    {props.genreTitle}
                  </h1>
                </Link>
              </div>

              {/* row1  */}
              <div className="movies">
                {runCallback(() => {
                  const row = [];


            
                  for (var i = 0; i <= 1; i++) {
                    const id = moviesInfo[i].movie_id;
                    const url = `/movieInfoPage/${id}`;
                    // const poster = Allposters[i];
                    // const title = movieTitles[i];

                    // // const reminder = i % 4;

                    // // if (reminder == 0) {
                    // //   reminder = 4;
                    // // }
                    const className1 = `Movie${i}`;

                    row.push(
                      <div key={i}>
                        {
                          <div className={className1}>
                            <Link to={url}>
                              {/* <img
                                className="genresMoviePoster1"
                                src={poster}
                              /> */}
                              <div className="genresMovieName1 roboto-medium-white-15px">
                                {moviesInfo[i].title}
                              </div>
                              <div className="genresRating1 neuton-bold-white-30px3">
                                {props.rating1}
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
                  return row;
                })}

                {/* movie 1 */}
                {/* <div className="Movie1">
              <Link to={url}>
                <img className="genresMoviePoster1" src={Allposters[0]} />
                <div className="genresMovieName1 roboto-medium-white-15px">{Allposters[0]}</div>
                <div className="genresRating1 neuton-bold-white-30px3">{props.rating1}</div>
                <img className="genresStar1" src={props.star} />
                <div className="genresGenreType1">
                  <div className="genresGenreTypeText1 roboto-normal-cardinal-12px3">{props.genresGenreTypeText1}</div>
                </div>
              </Link> */}
              </div>
              {/* movie 2 */}
              <div className="Movie2">
                {/* <Link to="/movieInfoPage/2">
                <img className="genresMoviePoster1" src={Allposters[1]} />
                <div className="genresMovieName1 roboto-medium-white-15px">{props.movieName2}</div>
                <div className="genresRating1 neuton-bold-white-30px3">{props.rating2}</div>
                <img className="genresStar1" src={props.star} />
                <div className="genresGenreType1">
                  <div className="genresGenreTypeText1 roboto-normal-cardinal-12px3">{props.genresGenreTypeText2}</div>
                </div>
              </Link> */}
              </div>
              {/* movie 3 */}
              {/* <div className="Movie3">
            <Link to="/movieInfoPage/2">
              <img className="genresMoviePoster1" src={Allposters[2]} />
              <div className="genresMovieName1 roboto-medium-white-15px">{props.movieName3}</div>
              <div className="genresRating1 neuton-bold-white-30px3">{props.rating3}</div>
              <img className="genresStar1" src={props.star} />
              <div className="genresGenreType1">
                <div className="genresGenreTypeText1  roboto-normal-cardinal-12px3">{props.genresGenreTypeText3}</div>
              </div>
            </Link>
            </div> */}
              {/* movie 4 */}
              <div className="Movie4">
                {/* <Link to="/movieInfoPage/2">
              <img className="genresMoviePoster1" src={Allposters[3]} />
              <div className="genresMovieName1 roboto-medium-white-15px">{props.movieName4}</div>
              <div className="genresRating1 neuton-bold-white-30px3">{props.rating4}</div>
              <img className="genresStar1" src={props.star} />
              <div className="genresGenreType1">
                <div className="genresGenreTypeText1 roboto-normal-cardinal-12px3">{props.genresGenreTypeText4}</div>   
              </div>
            </Link>
            </div> */}
              </div>

              {/* row1 movies transition */}
              <img
                className="genresExpandMoviesLeft"
                src={props.leftArrowIcon}
              />
              <img
                className="genresExpandMoviesRight"
                src={props.rightArrowIcon}
              />
            </main>

            {/* footer */}
            <div className="footer"> </div>
            <img className="footerLogo" src={props.logo} />
            <div className="footerText1">{props.footerText1}</div>
            <div className="footerText2 inter-light-bon-jour-35px2">
              <span>{props.footerText2}</span>
            </div>
          </body>
        </div>
      </div>
    </div>
  );
}

export default genresPage;
