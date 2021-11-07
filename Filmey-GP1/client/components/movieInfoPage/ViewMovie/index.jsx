
    // import React from "react";
    // import Star from "../";
    // import { Link } from "react-router-dom";
    // import "./ViewMovie.css";
    // import Axios from 'axios';
    // import {useState  } from "react";
    // import { useParams } from "react-router-dom";
    
    
    
    
    //  function ViewMovie(props) {
    //   const {
    //     rateItText,
    //     movieRating,
    //     directorText,
    //     writersText,
    //     directorName,
    //     castName2,
    //     descriptionText,
    //     timeText,
    //     movieTime,
    //     movieLanguage,
    //     moviepg,
    //     languageText,
    //     pgText,
    //     movieName,
    //     topCastText,
    //     castImage3,
    //     castImage2,
    //     castImage5,
    //     castImage1,
    //     castImage4,
    //     castName3,
    //     castName4,
    //     castName5,
    //     castName1,
    //     castRole1,
    //     castRole2,
    //     castRole3,
    //     castRole4,
    //     castRole5,
    //     reviewsText,
    //     reviewItText,
    //     userReview1,
    //     username1,
    //     userReview2,
    //     username2,
    //     userReview3,
    //     username3,
    //     movieGenreType,
    //     starProps,
    //     logo,
    //     homeText,
    //     genresText,
    //     languageText2,
    //     loginText,
    //     registerText,
    //     icon,
    //     footerText1,
    //     footerText2,
    //     moviePoster,
    //     playTrailerText,
    //     trailerIcon,
    //     addIcon,
    //     movieDes,
    //     genreText,
    //     writersName,
    //     container,
    //     redLine,
    //     rightArrow,
    //     leftArrow,
    //     reviewIcon,
    //   } = props;
    
    //     const api = Axios.create({
    //       baseURL: "http://localhost:3000/api/v1",
    //       // headers :{
    //       //  // 'authorization' : token
    //   })


    //   const [mid,setMid]=useState('');
    //   const [imdb_id,setImdb_id]=useState('');
    //   const [title,setTitle]=useState('');
    //   const [year,setYear]=useState('');
    //   const [length,setLength]=useState('');
    //   const [age_guide,setAge_guide]=useState('');
    //   const [description,setDescription]=useState('');
    //   const [poster,setPoster]=useState('');
    //   const [trailer_url,setTrailer_url]=useState('');




    //     let {id} = useParams();
    //     id = parseInt(id);
    //     console.log(id);
    

    //     const getMovie = (id) =>{
    //     api.get(`/movies/${id}`).then((response)=>{

    //      console.log(response);
    //      setMid(response.data[0].movie_id);
    //      setImdb_id(response.data[0].imdb_id);
    //      setTitle(response.data[0].title);
    //      setYear(response.data[0].year);
    //      setLength(response.data[0].length);
    //      setAge_guide(response.data[0].age_guide);
    //      setDescription(response.data[0].description);
    //      setPoster(response.data[0].poster);
    //      setTrailer_url(response.data[0].trailer_url);

    //       })
    //     }

    //     getMovie(id);
    
      
    //   return (

    //     <div className="PageCenter">
    //       <div className="movieInfo screen">
    //         <div className="movieInfoContainer">
    //           <body>
    //             <header>
    //               {/* Header */}
    //                 <div className="header"> 
    //                   <img className="headerLogo" src={logo} />
    //                   <div className="clickable">
    //                     <div className="languageContainer"></div>
    //                     <div className="languageText">{languageText}</div>
    //                   </div>
    //                   <div>
    //                     <Link to="/home-page">
    //                       <div className="homeText darkergrotesque-medium-white-35px2">{homeText}</div>
    //                     </Link>
    //                   </div>
    //                   <div>
    //                     <Link to="/genresPage">
    //                       <div>
    //                         <div className="genresText darkergrotesque-medium-white-35px2">{genresText}</div>
    //                       </div>
    //                     </Link>
    //                   </div>
    //                   {/* unregisterd user */}
    //                   <div className="clickable">
    //                     <Link to="/login-page">
    //                       <img className="loginIcon" src={icon} />
    //                       <div>
    //                         <div className="loginText roboto-normal-white-18px2">{loginText}</div>
    //                       </div>
    //                     </Link>
    //                   </div>
    //                   <div className="clickable">
    //                     <Link to="/registerPage/reg-page">
    //                       <img className="registerIcon" src={icon} /> 
    //                       <div>
    //                         <div className="registerText roboto-normal-white-18px2">{registerText}</div>
    //                       </div>
    //                     </Link>  

    //                     {/* {movie_id}    */}
    //                   </div>
    
    //                   {/* registerd user */}
    
    
    //                 </div>
    //             </header>
    
    //             {/* main  */}
    //             <main>
    //               <div className="body"></div>
    //                 <img className="moviePoster" src={poster}/>
    //                 <div className="trailer">
    //                   <div className="playTrailerText">{playTrailerText}</div>
    //                   <img className="trailerIcon" src={trailerIcon} />
    //                 </div>
    //                 <div>
    //                   <div className="addRating">
    //                   <Star />
    //                   <img className="ratingIcon2" src={addIcon} />
    //                   <div className="rateItText neuton-normal-white-30px">{rateItText}</div>
    //                   </div>
    //                 </div>
    //                 <div>
    //                   <h1 className="movieName">{title}</h1>
    //                   <Star className={starProps.className} />
    //                   <div className="movieRating">{movieRating}</div>
    //                   <div className="movieInfoGenre neuton-bold-white-24px">{genreText}</div>
    //                   <div className="movieInfoGenreType roboto-normal-baby-powder-25px">{movieGenreType}</div>
    //                   <img className="line1" src="/img/line-5@1x.svg" />
    //                   <div className="descriptionText neuton-bold-white-24px">{descriptionText}</div>
    //                   <div className="movieDes roboto-normal-baby-powder-25px">{description}</div>
    //                   <img className="line2" src="/img/line-5@1x.svg" />
    //                   <div className="directorText neuton-bold-white-24px">{directorText}</div>
    //                   <div className="directorName roboto-normal-white-25px">{directorName}</div>
    //                   <img className="line3" src="/img/line-5@1x.svg" />
    //                   <div className="writersText neuton-bold-white-24px">{writersText}</div>
    //                   <div className="writersName roboto-normal-white-25px">{writersName}</div>
    //                   <img className="line4" src="/img/line-5@1x.svg" />
    //                   <img className="timeContainer" src={container} />
    //                   <img className="languageContainer2" src={container} />
    //                   <img className="pgContainer" src={container} />
    //                   <div className="timeText neuton-bold-white-20px">{timeText}</div>
    //                   <div className="movieTime neuton-normal-white-20px">{length}</div>
    //                   <div className="movieLanguage neuton-normal-white-20px">{movieLanguage}</div>
    //                   <div className="moviepg neuton-normal-white-20px">{pgText}</div>
    //                   <div className="languageText2 neuton-bold-white-20px">{languageText2}</div>
    //                   <div className="pgText neuton-bold-white-20px">{age_guide}</div>
    //                 </div>
    //                 {/* top cast */}
    //                 <div className="topCastText neuton-normal-white-60px5">{topCastText}</div>
    //                 <img className="topCastLine" src={redLine}/>
    
    //                 {/* cast1 */}
    //                 <div className="cast1">
    //                   <img className="castImage1" src={castImage1} />
    //                   <div className="castName1 neuton-bold-white-20px">{castName1}</div>
    //                   <div className="castRole1 roboto-normal-white-15px">{castRole1}</div>
    //                 </div>
    //                 {/* cast2 */}
    //                 <div className="cast2">
    //                   <img className="castImage2" src={castImage2} />
    //                   <div className="castName2 neuton-bold-white-20px">{castName2}</div>
    //                   <div className="castRole2 roboto-normal-white-15px">{castRole2}</div>
    //                 </div>
    //                 {/* cast3 */}
    //                 <div className="cast3">
    //                   <img className="castImage3" src={castImage3} />
    //                   <div className="castName3 neuton-bold-white-20px">{castName3}</div>
    //                   <div className="castRole3 roboto-normal-white-15px">{castRole3}</div>
    //                 </div>
    
    //                 {/* cast4 */}
    //                 <div className="cast4">
    //                   <img className="castImage4" src={castImage4} />
    //                   <div className="castName4 neuton-bold-white-20px">{castName4}</div>
    //                   <div className="castRole4 roboto-normal-white-15px">{castRole4}</div>
    //                 </div>
    //                 {/* cast5 */}
    //                 <div className="cast5">
    //                   <img className="castImage5" src={castImage5} />
    //                   <div className="castName5 neuton-bold-white-20px">{castName5}</div>
    //                   <div className="castRole5 roboto-normal-white-15px">{castRole5}</div>
    //                 </div>
    
    //                 {/* reviews */}
    //                 <img className="reviewsLine" src={redLine} />
    //                 <div className="reviewsText neuton-normal-white-60px5">{reviewsText}</div>
    //                 <img className="reviewsExpandRight" src={rightArrow} />
    //                 <img className="reviewsExpandLeft" src={leftArrow} />
    //                 <div className="addReview">
    //                   <Link to="/reviewPage">
    //                     <img className="reviewIcon" src={reviewIcon}/>
    //                     <img className="reviewIcon2" src={addIcon} />
    //                     <div>
    //                       <div className="reviewItText neuton-normal-white-30px">{reviewItText}</div>
    //                     </div>
    //                   </Link>     
    //                 </div>
    //                 {/* review1 */}
    //                 <div className="reviewContainer1">
    //                   <p className="userReview1 roboto-bold-celeste-16px">{userReview1}</p>
    //                   <div className="username1 roboto-bold-celeste-18px">{username1}</div>
    //                 </div>
                    
    //                 {/* review2 */}
    //                 <div className="reviewContainer2">
    //                   <p className="userReview2 roboto-bold-celeste-16px">{userReview2}</p>
    //                   <div className="username2 roboto-bold-celeste-18px">{username2}</div>
    //                 </div>
    
    //                 {/* review3 */}
    //                 <div className="reviewContainer3">
    //                   <p className="userReview3 roboto-bold-celeste-16px">{userReview3}</p>
    //                   <div className="username3 roboto-bold-celeste-18px">{username3}</div>
    //                 </div>
    
    //             </main>
    
    //               {/* footer */}
    //             <footer>
    //              <div className="movieInfofooter"> </div>
    //                <img className="movieInfofooterLogo" src={logo} />
    //                <div className="movieInfofooterText1">{footerText1}</div>
    //                <div className="movieInfocopyRightText inter-light-bon-jour-35px2">
    //                  <span>{footerText2}</span>
    //                </div>
    //             </footer>
    
    //           </body>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // }
    
    // export default ViewMovie;
    
import React from "react";
import { Link } from "react-router-dom";
import "./ViewMovie.css";
// import Star from "../";
import Axios from 'axios';
import {useState  } from "react";
import { useParams } from "react-router-dom";


function ViewMovie(props) {
  const {
    rateItText,
    movieRating,
    directorText,
    writersText,
    directorName,
    castName2,
    descriptionText,
    timeText,
    movieTime,
    movieLanguage,
    moviepg,
    languageText,
    pgText,
    movieName,
    topCastText,
    castImage3,
    castImage2,
    castImage5,
    castImage1,
    castImage4,
    castName3,
    castName4,
    castName5,
    castName1,
    castRole1,
    castRole2,
    castRole3,
    castRole4,
    castRole5,
    reviewsText,
    reviewItText,
    userReview1,
    username1,
    userReview2,
    username2,
    userReview3,
    username3,
    movieGenreType,
    starProps,
    logo,
    homeText,
    genresText,
    languageText2,
    loginText,
    registerText,
    icon,
    footerText1,
    footerText2,
    moviePoster,
    playTrailerText,
    trailerIcon,
    addIcon,
    movieDes,
    genreText,
    writersName,
    container,
    redLine,
    rightArrow,
    leftArrow,
    reviewIcon,
  } = props;


  const api = Axios.create({
    baseURL: "http://localhost:3000/api/v1",
    // headers :{
    //  // 'authorization' : token
})


const [mid,setMid]=useState('');
const [imdb_id,setImdb_id]=useState('');
const [title,setTitle]=useState('');
const [year,setYear]=useState('');
const [length,setLength]=useState('');
const [age_guide,setAge_guide]=useState('');
const [description,setDescription]=useState('');
const [poster,setPoster]=useState('');
const [trailer_url,setTrailer_url]=useState('');




  let {id} = useParams();
  id = parseInt(id);
  console.log(id);


  const getMovie = (id) =>{
  api.get(`/movies/${id}`).then((response)=>{

   console.log(response);
   setMid(response.data[0].movie_id);
   setImdb_id(response.data[0].imdb_id);
   setTitle(response.data[0].title);
   setYear(response.data[0].year);
   setLength(response.data[0].length);
   setAge_guide(response.data[0].age_guide);
   setDescription(response.data[0].description);
   setPoster(response.data[0].poster);
   setTrailer_url(response.data[0].trailer_url);

    })
  }

  getMovie(id);

  return (
    <div className="PageCenter">
      <div className="movieInfo screen">
        <div className="movieInfoContainer">
          <body>
            <header>
              {/* Header */}
                <div className="header"> 
                  <img className="headerLogo" src={logo} />
                  <div>
                    <Link to="/home-page">
                      <div className="homeText darkergrotesque-medium-white-35px2">{homeText}</div>
                    </Link>
                  </div>
                  <div>
                    <Link to="/genresPage">
                      <div>
                        <div className="genresText darkergrotesque-medium-white-35px2">{genresText}</div>
                      </div>
                    </Link>
                  </div>


                  {/* registerd user */}
                  <ul>
                    <img  className="regUserIcon" src="/img/regUser.png"/>
                    <li className="dropdown">
                        <a className="dropbtn ">Username</a>
                        <div className="dropdownContent">
                        <a className="logout">Logout</a>
                        </div>
                    </li>
                </ul>    

                </div>
            </header>

            {/* main  */}
            <main>
              <div className="body"></div>
                <img className="moviePoster" src={poster}/>
                <div className="trailer">
                  <div className="playTrailerText">{playTrailerText}</div>
                  <img className="trailerIcon" src={trailerIcon} />
                </div>
                <div>
                  <div className="addRating">
                    <div className="rateItText neuton-normal-white-30px">{rateItText}</div>
                    <div class="rating-css">
                      <div class="star-icon">
                        <input type="radio" name="rating1" id="rating1"/>
                        <label for="rating1" class="fa fa-star" ></label>
                        <input type="radio" name="rating1" id="rating2"/>
                        <label for="rating2" class="fa fa-star"></label>
                        <input type="radio" name="rating1" id="rating3"/>
                        <label for="rating3" class="fa fa-star"></label>
                        <input type="radio" name="rating1" id="rating4"/>
                        <label for="rating4" class="fa fa-star"></label>
                        <input type="radio" name="rating1" id="rating5"/>
                        <label for="rating5" class="fa fa-star"></label>
                        <input type="radio" name="rating1" id="rating6"/>
                        <label for="rating6" class="fa fa-star"></label>
                        <input type="radio" name="rating1" id="rating7"/>
                        <label for="rating7" class="fa fa-star"></label>
                        <input type="radio" name="rating1" id="rating8"/>
                        <label for="rating8" class="fa fa-star"></label>
                        <input type="radio" name="rating1" id="rating9"/>
                        <label for="rating9" class="fa fa-star"></label>
                        <input type="radio" name="rating1" id="rating10"/>
                        <label for="rating10" class="fa fa-star"></label>
                      </div>
                     </div>
                  </div>

                </div>
                <div>
                  <div>
                    <h1 className="movieName">{title}</h1>
                    <div>
                      <img className="star" src="/img/star-2@2x.svg" />
                      <div className="movieRatingText">{movieRating}</div>
                    </div>
                  </div>
                  <div className="movieInfoGenre neuton-bold-white-24px">{genreText}</div>
                  <div className="movieInfoGenreType roboto-normal-baby-powder-25px">{movieGenreType}</div>
                  <img className="line1" src="/img/line-5@1x.svg" />
                  <div className="descriptionText neuton-bold-white-24px">{descriptionText}</div>
                  <div className="movieDes roboto-normal-baby-powder-25px">{description}</div>
                  <img className="line2" src="/img/line-5@1x.svg" />
                  <div className="directorText neuton-bold-white-24px">{directorText}</div>
                  <div className="directorName roboto-normal-white-25px">{directorName}</div>
                  <img className="line3" src="/img/line-5@1x.svg" />
                  <div className="writersText neuton-bold-white-24px">{writersText}</div>
                  <div className="writersName roboto-normal-white-25px">{writersName}</div>
                  <img className="line4" src="/img/line-5@1x.svg" />
                  <img className="timeContainer" src={container} />
                  <img className="languageContainer2" src={container} />
                  <img className="pgContainer" src={container} />
                  <div className="timeText neuton-bold-white-20px">{timeText}</div>
                  <div className="movieTime neuton-normal-white-20px">{length}</div>
                  <div className="movieLanguage neuton-normal-white-20px">{movieLanguage}</div>
                  <div className="moviepg neuton-normal-white-20px">{age_guide}</div>
                  <div className="languageText2 neuton-bold-white-20px">{languageText2}</div>
                  <div className="pgText neuton-bold-white-20px">{pgText}</div>
                </div>
                
                {/* top cast */}
                <div className="topCastText neuton-normal-white-60px5">{topCastText}</div>
                <img className="topCastLine" src={redLine}/>

                {/* cast1 */}
                <div className="cast1">
                  <img className="castImage1" src={castImage1} />
                  <div className="castName1 neuton-bold-white-20px">{castName1}</div>
                  <div className="castRole1 roboto-normal-white-15px">{castRole1}</div>
                </div>
                {/* cast2 */}
                <div className="cast2">
                  <img className="castImage2" src={castImage2} />
                  <div className="castName2 neuton-bold-white-20px">{castName2}</div>
                  <div className="castRole2 roboto-normal-white-15px">{castRole2}</div>
                </div>
                {/* cast3 */}
                <div className="cast3">
                  <img className="castImage3" src={castImage3} />
                  <div className="castName3 neuton-bold-white-20px">{castName3}</div>
                  <div className="castRole3 roboto-normal-white-15px">{castRole3}</div>
                </div>

                {/* cast4 */}
                <div className="cast4">
                  <img className="castImage4" src={castImage4} />
                  <div className="castName4 neuton-bold-white-20px">{castName4}</div>
                  <div className="castRole4 roboto-normal-white-15px">{castRole4}</div>
                </div>
                {/* cast5 */}
                <div className="cast5">
                  <img className="castImage5" src={castImage5} />
                  <div className="castName5 neuton-bold-white-20px">{castName5}</div>
                  <div className="castRole5 roboto-normal-white-15px">{castRole5}</div>
                </div>

                {/* reviews */}
                <img className="reviewsLine" src={redLine} />
                <div className="reviewsText neuton-normal-white-60px5">{reviewsText}</div>
                <img className="reviewsExpandRight" src={rightArrow} />
                <img className="reviewsExpandLeft" src={leftArrow} />
                <div className="addReview">
                  <Link to="/reviewPage">
                    <img className="reviewIcon" src={reviewIcon}/>
                    <img className="reviewIcon2" src={addIcon} />
                    <div>
                      <div className="reviewItText neuton-normal-white-30px">{reviewItText}</div>
                    </div>
                  </Link>     
                </div>
                {/* review1 */}
                <div className="reviewContainer1">
                  <p className="userReview1 roboto-bold-celeste-16px">{userReview1}</p>
                  <div className="username1 roboto-bold-celeste-18px">{username1}</div>
                </div>
                
                {/* review2 */}
                <div className="reviewContainer2">
                  <p className="userReview2 roboto-bold-celeste-16px">{userReview2}</p>
                  <div className="username2 roboto-bold-celeste-18px">{username2}</div>
                </div>

                {/* review3 */}
                <div className="reviewContainer3">
                  <p className="userReview3 roboto-bold-celeste-16px">{userReview3}</p>
                  <div className="username3 roboto-bold-celeste-18px">{username3}</div>
                </div>

            </main>

              {/* footer */}
            <footer>
             <div className="movieInfofooter"> </div>
               <img className="movieInfofooterLogo" src={logo} />
               <div className="movieInfofooterText1">{footerText1}</div>
               <div className="movieInfocopyRightText inter-light-bon-jour-35px2">
                 <span>{footerText2}</span>
               </div>
            </footer>

          </body>
        </div>
      </div>
    </div>
  );
}

export default ViewMovie;
