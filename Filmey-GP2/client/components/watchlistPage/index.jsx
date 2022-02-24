import React from "react";
import { Link } from "react-router-dom";
import "./watchlistPage.css";
import Header from "../header";
import { useState } from "react";
import { BsFillBookmarkCheckFill } from "react-icons/bs";
import { BsFillBookmarkPlusFill } from "react-icons/bs";


function watchlistPage(props) {

  const runCallback = (cb) => {
    return cb();
  };
  const {} = props;

  const [moviesId, setMoviesId] = useState([]);
  const [movieTitles, setmovieTitles] = useState([]);
  const [Allposters, setAllposters] = useState([]);
  const [totalRatings, settotalRatings] = useState([]);


  React.useEffect(() => {
    window.scrollTo(0, 0)

    var moviesIdArray = [...moviesId];
    var movieTitlesArray = [...movieTitles];
    var postersArray = [...Allposters];
    var ratingsArray = [...totalRatings];



  }, []);


  const [onWatchList, setOnWatchList] = useState(false);

  const addToWatchlist = () => {
    console.log(onWatchList);
    setOnWatchList(true);
    console.log(onWatchList);
  }
  const removeFromWatchlist = () => {
    // window.location.reload();

    console.log(onWatchList);
    setOnWatchList(false);
    console.log(onWatchList);
  }


  return (
    <div className="PageCenter">
      <div className="watchlistPage screen">
        <div className="watchlistPageContainer">
        <body>

            {/* Header */}
             <header>
                <Header/> 
            </header>

          {/* main */}
          <main>
            <div className="watchlistbody"></div>

            {/* Title */}
            <div>
              <h1 className="watchlistTitle neuton-normal-white-60px3"> Watchlist</h1>
            </div>
              {/* row1  */}
              <div className="movies">
                {runCallback(() => {
                  const row = [];
                  var count = 0;
                    for (var i = 0; i < 20; i++) {
                      const id = 0;
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
                            <div className="watchlistMovieContainer" >
                              {/* <Link to={url}> */}
                                <img className="watchlistMoviePoster" src={poster} />


                            {onWatchList && !isAdmin &&
                            <button  className="movieBookMark" onClick={removeFromWatchlist}>
                            <BsFillBookmarkCheckFill size={90} />{" "}
                            </button>
                            }

                            {!onWatchList && !isAdmin &&
                            <button  className="movieInWtchlist" onClick={addToWatchlist}>
                            <BsFillBookmarkPlusFill size={90} />{" "}
                            </button>
                            }
                               <img className="watchlistStar" src="/img/star-2@2x.svg" />
                                <div className="watchlistRating neuton-bold-white-30px">
                                 {rating} movie rating
                                </div>
                                <div className="watchlistMovieName neuton-bold-white-30px">{title} movie title</div>
                              {/* </Link> */}
                            </div>
                          }
                        </div>
                      );
                  }
                  return row;
                })}
              </div>

          </main>

        </body>
        </div>
      </div>
    </div>
  );
}

export default watchlistPage;
