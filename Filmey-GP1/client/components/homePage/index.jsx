import React from "react";
import { Link } from "react-router-dom";
import "./homePage.css";
import Axios from "axios";
import { useState } from "react";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import Header from "../header";


function homePage(props) {
  const runCallback = (cb) => {
    return cb();
  };

  const {
    fireIcon,
    logo,
    footerText1,
    footerText2,
    registerText,
    loginText,
    genresText,
    homeText,
    top10Text,
    icon,
  } = props;

  var registered = false;
  var username = "";
  var userId ;
  var isAdmin;

  const cookies = new Cookies();
  try {
    const token = cookies.get("token");
    var decoded = jwt_decode(token);
    username = decoded.username;
    userId = decoded.userID;
    isAdmin = decoded.isAdmin;
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
    // headers :{
    //  // 'authorization' : token
  });

  const [movieIds, setMovieIds] = useState([]);
  const [Allposters, setAllposters] = useState([]);

  React.useEffect(() => {

    var checkThreshold=false;

    let numOfTopMovies = 10;

    // api.get(`/movies/topMovies/${numOfTopMovies}`).then((response) => {
    //   const IdsArray = [...movieIds];
    //   const postersArray = [...Allposters];

    //   for (var i = 0; i < numOfTopMovies; i++) {
    //     IdsArray[i] = response.data[i].movie_id;
    //     postersArray[i] = response.data[i].poster;
    //   }
    //   setMovieIds(IdsArray);
    //   setAllposters(postersArray);
    // });

    //check thresold for registered users only
    if(registered && !isAdmin)
    api.post(`/model/checkThreshold/${userId}`).then((response) => {
      checkThreshold=response.data;
    })

    // call userBasedCF if exceeds threshold
    if(checkThreshold)
   {
    api.post(`/model/userBasedCF/${userId}`).then((response) => {
      console.log(response.data)
      const IdsArray = [...movieIds];
      const postersArray = [...Allposters];

      for (var i = 0; i < 20; i++) {
        IdsArray[i] = response.data[i][0];
        postersArray[i] = response.data[i][1];
      }

      setMovieIds(IdsArray);
      setAllposters(postersArray);

   });
  }


  }, []);


 

  return (
    <div className="PageCenter">
      <div className="homePage screen">
        <div className="homePageContainer">
          <body>
            {/* Header */}
            <header>
              <Header/> 
            </header>

            {/* main */}
            <div className="body"></div>

            {/* Title */}
            <div>
              <img className="fireIcon" src={fireIcon} />
              <h1 className="top10Text animate-enter">{top10Text}</h1>
            </div>

            <marquee
              behavior="alternate"
              direction="left"
              scrollamount="12"
              className="top10Movies"
            >
              {/* movies loop	 */}
              {runCallback(() => {
                const row = [];

                for (var i = 1; i <= 20; i++) {
                  const id = movieIds[i - 1];

                  const url = `/MovieInfoPage/${id}`;
                  const poster = Allposters[i - 1];
                  row.push(
                    <div key={i}>
                      {
                        <div className="moviesLoop">
                          <Link to={url}>
                            <img
                              className="homeMoviePoster"
                              src={poster}
                              height="652"
                              width="512"
                            />
                          </Link>
                        </div>
                      }
                    </div>
                  );
                }
                return row;
              })}
            </marquee>

            {/* footer */}
            <footer>
              <div className="footer"> </div>
              <img className="footerLogo" src={logo} />
              <div className="footerText1"> {footerText1}</div>
              <div className="copyRightText inter-light-bon-jour-35px2">
                <span>{footerText2}</span>
              </div>
            </footer>
          </body>
        </div>
      </div>
    </div>
  );
}

export default homePage;
