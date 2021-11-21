import React from "react";
import { Link } from "react-router-dom";
import "./ViewMovie.css";
import Axios from 'axios';
import {useState  } from "react";
import { useParams } from "react-router-dom";
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

function ViewMovie(props) {

  const runCallback = (cb) => {
    return cb();
  };

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
    yourRatingText,
  } = props;

  var registered =false;
  var username="";

  const cookies = new Cookies();
  try{
    const token=cookies.get('token');
    var decoded = jwt_decode(token);
    username=decoded.username;
    registered=true;

  }
  catch{
    registered=false;
    console.log("guest user");}

  const logOut=()=>
  {
   cookies.remove('token', { path: '/' });
    window.location.reload();
   }


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

const [genre,setGenre]=useState([""]);
const [directors,setDirectors]=useState([""]);
const [writers,setWriters]=useState([""]);
const [languages,setLanguages]=useState([""]);
const [castNames,setCastNames]=useState([""]);
const [castImgs,setCastImgs]=useState([""]);
const [castRoles,setCastRoles]=useState([""]);


const [numOfCasts,setNumOfCasts]=useState(0);




  let {id} = useParams();
  id = parseInt(id);
  console.log(id);
  React.useEffect(() => {

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
    });
  


      api.get(`/movies/genre/${id}`).then((response)=>{
        const numOfGenres = response.data.length;
        const newArr = [...genre];

        for (var i = 0; i < numOfGenres; i++) {
          if(i < numOfGenres -1 ){
          newArr[i] = response.data[i].genre +", ";
          }
          else{
            newArr[i] = response.data[i].genre ;}
        } 

        setGenre(newArr);   
    });


    api.get(`/movies/directors/${id}`).then((response)=>{

      const numOfDirectors = response.data.length;
      const newArr = [...directors];

      for (var i = 0; i < numOfDirectors; i++) {
        if(i < numOfDirectors -1 ){
        newArr[i] = response.data[i].director +", ";
        }
        else{
          newArr[i] = response.data[i].director ;}
      } 

      setDirectors(newArr);   
  });

  api.get(`/movies/writers/${id}`).then((response)=>{

    const numOfWriters = response.data.length;
    const newArr = [...writers];

    for (var i = 0; i < numOfWriters; i++) {
      if(i < numOfWriters -1 ){
      newArr[i] = response.data[i].writer +", ";
      }
      else{
        newArr[i] = response.data[i].writer ;}
    } 

    setWriters(newArr);   
});


api.get(`/movies/languages/${id}`).then((response)=>{

  const numOfLanguages = response.data.length;
  const newArr = [...languages];

  for (var i = 0; i < numOfLanguages; i++) {
    if(i < numOfLanguages -1 ){
    newArr[i] = response.data[i].language +", ";
    }
    else{
      newArr[i] = response.data[i].language ;}
  } 

  setLanguages(newArr);   
});

      




      
api.get(`/movies/casts/${id}`).then((response)=>{


  setNumOfCasts(response.data.length);

  const numCasts = response.data.length;
  const newArr1 = [...castNames];
  const newArr2 = [...castImgs];
  const newArr3 = [...castRoles];



  for (var i = 0; i < numCasts; i++) {

    newArr1[i] = response.data[i].actor;
    newArr2[i] = response.data[i].actor_image_url;
    newArr3[i] = response.data[i].role;

   

  } 
setCastNames(newArr1);
setCastImgs(newArr2);
setCastRoles(newArr3);
});
  
    



}, []);

console.log(castNames);


  // const getMovie = (id) =>{
  // api.get(`/movies/${id}`).then((response)=>{

  //  console.log(response);
  //  setMid(response.data[0].movie_id);
  //  setImdb_id(response.data[0].imdb_id);
  //  setTitle(response.data[0].title);
  //  setYear(response.data[0].year);
  //  setLength(response.data[0].length);
  //  setAge_guide(response.data[0].age_guide);
  //  setDescription(response.data[0].description);
  //  setPoster(response.data[0].poster);
  //  setTrailer_url(response.data[0].trailer_url);

  //   })
  // }

  // getMovie(id);

  return (
    <div className="PageCenter">
      <div className="movieInfo screen">
        <div className="movieInfoContainer">
          <body>
            <header>
              {/* Header */}
                <div className="header"> 
                  <Link to="/home-page">
                    <img className="headerLogo" src={logo} />
                  </Link>    
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

              {/* unregisterd user */}
             {(!registered) && (
                <div className="clickable">
                  <Link to="/login-page">
                    <img className="loginIcon" src={icon} />
                    <div>
                      <div className="loginText roboto-normal-white-18px2">{loginText}</div>
                    </div>
                  </Link>
                </div>)}

                 {(!registered) && (
                <div className="clickable">
                  <Link to="/registerPage/reg-page">
                    <img className="registerIcon" src={icon} /> 
                    <div>
                      <div className="registerText roboto-normal-white-18px2">{registerText}</div>
                    </div>
                  </Link>     
                </div>)}
                 {/* registerd user */}
                 {(registered) && (
                <ul>
                    <img  className="regUserIcon" src="/img/regUser.png"/>
                    <li className="dropdown">
                        <a className="dropbtn ">{username}</a>
                        <div className="dropdownContent">
                        <button className="logout" onClick={logOut}>Logout</button> 
                        {/* <button className="logout" onClick={logOut}>Logout</button> */}
                        </div>
                    </li>
                </ul>)}    
                    
              </div>
            </header>


            {/* main  */}
            <main>
              <div className="body"></div>
                <img className="moviePoster" src={poster}/>
                 <div className="trailer">
                  <a className="playTrailerText" href={trailer_url} target="_blank">{playTrailerText}  </a>
                  <i  className="fa fa-play-circle"> </i>                  
                </div>
                

                  {/*  add rating */}
                  {/* <div className="addRating">
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
                    
                    {/* after add rating */}
                    <div  className="afterRating">
                      <div className="yourRatingText neuton-normal-white-30px">{yourRatingText}</div>
                      <div className="movieRatingContainer2">
                        <img className="afterRatingStar" src="/img/star-2@2x.svg" />
                        <div className="userRating">{movieRating}</div> 
                        <div className="tenText">/ 10</div> 
                      </div> 
                    </div> 
                
                <div className="movieInfo">
                  <div className="movieTitle">
                    <div className="movieName">{title} <span className="movieYear"> ({year})</span></div>
                    <div className="movieRatingContainer">
                      <img className="star" src="/img/star-2@2x.svg" />
                      <div className="movieRating">{movieRating}</div> 
                      <div className="tenText">/ 10</div> 
                    </div>
                    <div className="pgAndTime">
                      <div className="pgContainer"> 
                          <div className="moviepg neuton-bold-white-20px">{age_guide}</div>
                      </div>
                      <div className="timeContainer">
                      <div className="movieTime neuton-bold-white-20px">{length}</div>
                      </div>
                    </div>
                  </div>

                  <div className="movieGenreContainer">
                    <div className="movieInfoGenre neuton-bold-white-24px">{genreText}</div>
                    <div className="movieInfoGenreType roboto-normal-baby-powder-25px">{genre}</div>
                  </div>
                  
                  <div className="movieDesContainer"> 
                    <div className="line1Container"><img className="line1" src="/img/line-5@1x.svg" /></div>
                    <div className="descriptionText neuton-bold-white-24px">{descriptionText}</div>
                    <div className="movieDes roboto-normal-baby-powder-25px">{description}</div>
                  </div>

                  <div className="movieDirectorContainer">
                    <div className="line2Container"><img className="line2" src="/img/line-5@1x.svg" /></div>
                    <div className="directorText neuton-bold-white-24px">{directorText}</div>
                    <div className="directorName roboto-normal-baby-powder-25px">{directors}</div>
                  </div>

                  <div className="movieWritersContainer">
                    <div className="line3Container"> <img className="line3" src="/img/line-5@1x.svg" /> </div>
                    <div className="writersText neuton-bold-white-24px">{writersText}</div>
                    <div className="writersName roboto-normal-baby-powder-25px">{writers}</div>
                  </div>
                  
                  <div className="movielanguageContainer"> 
                    <img className="line4" src="/img/line-5@1x.svg" />
                    <div className="languageText2 neuton-bold-white-24px">{languageText2}</div>
                    <div className="movieLanguage roboto-normal-baby-powder-25px">{languages}</div>
                  </div> 
                </div>
                
                {/* top cast */}
                <div className="topCast">
                  <div className="topCastText neuton-normal-white-60px5">{topCastText}</div>
                  <img className="topCastLine" src={redLine}/>

                {/* movies loop	 */}
                {runCallback(() => {
                const row = [];
                for (var i = 0; i < numOfCasts; i++) {
                  const castImg = castImgs[i];
                  const castName = castNames[i];
                  const castRole = castRoles[i];

                  row.push(
                  <div key={i}>
                  {
                  <div className="castLoop">  
                  <div className="cast1">
                    <img className="castImage1" src={castImg} />
                    <div className="castName1 neuton-bold-white-20px">{castName}</div>
                    <div className="castRole1 roboto-normal-white-15px">{castRole}</div>
                  </div>
                  </div>
                  }
                  </div>
                  );
                }
                return row;
                 })}

{/* {runCallback(() => {
                const row = [];
                for (var i = 0; i < 5; i++) {
                  // const castImg = castImgs[i];
                  // const castName = castNames[i];
                  // const castRole = castRoles[i];

                  row.push(
                  <div key={i}>
                  {
                  <div className="castLoop">  
                  <div className="cast1">
                    <img className="castImage1" src={castImage3} />
                    <div className="castName1 neuton-bold-white-20px">{castName1}</div>
                    <div className="castRole1 roboto-normal-white-15px">{castRole1}</div>
                  </div>
                  </div>
                  }
                  </div>
                  );
                }
                return row;
                 })} */}
              
                </div>

                {/* reviews */}
                <div className="reviewsContainer">
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
                </div>
            </main>

              {/* footer */}
            <footer className="footer">
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
