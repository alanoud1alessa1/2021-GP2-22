import "./App.css";
import React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import RegPage from "./components/registerPage/regPage";
import LoginPage from "./components/loginPage";
import HomePage from "./components/homePage";
import GenresPage from "./components/genresPage";
import GenreTypePage from "./components/genreTypePage";
import ViewMovie from "./components/movieInfoPage/ViewMovie";
import ReviewPage from "./components/reviewPage";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/registerPage/reg-page"> 
          <RegPage {...regPageData} />
        </Route>
        <Route path="/login-page">
          <LoginPage {...loginPageData} />
        </Route>
        <Route path="/:path(|home-page)">
          <HomePage {...homePageData} />
        </Route>
        <Route path="/genresPage">
          <GenresPage {...genresPageData} />
        </Route>
        <Route path="/genreTypePage">
          <GenreTypePage {...genreTypePageData} />
        </Route>
        <Route path="/movieInfoPage/ViewMovie/:id">
          <ViewMovie {...viewMovieData} />
        </Route>
        <Route path="/reviewPage">
          <ReviewPage {...reviewPageData} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
const regPageData = {
    text1: <>Let’s End Boredom <br />Find The Best <br />Movies</>,
    text2: <>Filmey © 2021<br /></>,
    text3: "Get Started",
    text4: "Already have an account?",
    text5: "Login",
    backgroundImage: "/img/backgroundImage.png",
    logo: "/img/logo.png",
    text6: "Birth date",
    text7: "Which of these is your favorite movie genre?",
};

const loginPageData = {
    backgroundImage: "/img/backgroundImage.png",
    logo: "/img/logo.png",
    text1: "WELCOME BACK!",
    text2: "Don’t have a account,",
    text3: "Register",
    emailUsername: "Email / Username",
    emailUsernameinputType: "text",
    emailUsernamePlaceholder: "Enter your name or email",
    password: "Password",
    passwordinputType: "password",
    passwordPlaceholder: "Enter your password",
    text4: "Log In",
};

const homePageData = {
  // Header
  logo: "/img/logo.png",
  homeText: "Home",
  genresText: "Genres",
  languageText: "AR",
  loginText: "Login",
  registerText: "Register",
  userText: "User",
  logout: "logout",
  icon: "/img/iconly-light-profile@2x.svg",

  // main
  top10Text: "Top 10",
  fireIcon: "/img/icon@2x.svg",
  homeMoviePoster:"/img/moviePoster3.png",
  moviePoster1: "/img/moviePoster1.png",
  moviePoster2: "/img/moviePoster2.png",
  moviePoster3: "/img/moviePoster3.png",
  moviePoster4: "/img/moviePoster4.png",
  moviePoster5: "/img/moviePoster5.png",
  genreTypeText1: "Sci-Fi & Fantasy",
  genreTypeText2: "Sci-Fi & Fantasy",
  genreTypeText3: "Sci-Fi & Fantasy",
  genreTypeText4: "Sci-Fi & Fantasy",
  genreTypeText5: "Sci-Fi & Fantasy",
  moviename1: "MOONLIGHT",
  moviename2: "MOONLIGHT",
  moviename3: "MOONLIGHT",
  moviename4: "MOONLIGHT",
  moviename5: "MOONLIGHT",
  star:"/img/star-2@2x.svg",
  rating1: "7",
  rating2: "7",
  rating3: "7",
  rating4: "7",
  rating5: "7",
  expandRight: "/img/expand-right@2x.svg",
  expandLeft:"/img/expand-left@2x.svg",

  // Footer
  footerText2: <>Filmey © 2021<br /></>,
  footerText1: "WE MAKE YOUR DAY",
};

const genresPageData = {
  // Header
  logo: "/img/logo.png",
  homeText: "Home",
  genresText: "Genres",
  languageText: "AR",
  loginText: "Login",
  registerText: "Register",
  userText: "User",
  logout: "logout",
  icon: "/img/iconly-light-profile@2x.svg",

  // main
  arrowIcon:"/img/expand-right-1@2x.svg",
  leftArrowIcon:"/img/expand-left--review-@2x.svg",
  rightArrowIcon:"/img/expand-right--review-@2x.svg",
  star:"/img/star-9@2x.svg",
  genreTitle: "Comedy",
  moviePoster: "/img/moonlight-ver2-xlg-2@2x.png",
  movieName1 : "MOONLIGHT",
  movieName2 : "MOONLIGHT",
  movieName3 : "MOONLIGHT",
  movieName4 : "MOONLIGHT",
  rating1:"7",
  rating2:"7",
  rating3:"7",
  rating4:"7",
  genresGenreTypeText1: "Sci-Fi & Fantasy",
  genresGenreTypeText2: "Sci-Fi & Fantasy",
  genresGenreTypeText3: "Sci-Fi & Fantasy",
  genresGenreTypeText4: "Sci-Fi & Fantasy",

  // Footer
  footerText1: "WE MAKE YOUR DAY",
  footerText2: <>Filmey © 2021<br /></>,
};


const genreTypePageData = {
  // Header
  logo: "/img/logo.png",
  homeText: "Home",
  genresText: "Genres",
  languageText: "AR",
  loginText: "Login",
  registerText: "Register",
  userText: "User",
  logout: "logout",
  icon: "/img/iconly-light-profile@2x.svg",

  // main
  arrowIcon:"/img/expand-right-1@2x.svg",
  leftArrowIcon:"/img/expand-left@2x.svg" ,
  rightArrowIcon:"/img/expand-right@2x.svg",
  star:"/img/star-9@2x.svg",
  genreTitle: "Comedy",
  moviePoster: "/img/moonlight-ver2-xlg-2@2x.png",
  movieName1 : "MOONLIGHT",
  movieName2 : "MOONLIGHT",
  movieName3 : "MOONLIGHT",
  movieName4 : "MOONLIGHT",
  rating1:"7",
  rating2:"7",
  rating3:"7",
  rating4:"7",
  genresGenreTypeText1: "Sci-Fi & Fantasy",
  genresGenreTypeText2: "Sci-Fi & Fantasy",
  genresGenreTypeText3: "Sci-Fi & Fantasy",
  genresGenreTypeText4: "Sci-Fi & Fantasy",

  // Footer
  footerText1: "WE MAKE YOUR DAY",
  footerText2: <>Filmey © 2021<br /></>,
};

const viewMovieData = {
  // Header
  logo: "/img/logo.png",
  homeText: "Home",
  genresText: "Genres",
  languageText: "AR",
  loginText: "Login",
  registerText: "Register",
  userText: "User",
  logout: "logout",
  icon: "/img/iconly-light-profile@2x.svg",

  //main
  moviePoster: "/img/rectangle-4@1x.png",
  trailerIcon: "/img/subtract@2x.svg",
  addIcon: "/img/add-round@2x.svg",
  redLine: "/img/line-12@2x.svg",
  playTrailerText: "Play Trailer",
  rateItText: "Rate It!",
  movieRating: "0",
  movieGenreType: "Comedy , Crime",
  movieDes: "In 1970s London amidst the punk rock revolution, a young grifter named Estella is determined to make a name for herself with her designs <br /> She befriends a pair of young thieves who appreciate her appetite for mischief",
  genreText: "Genre",
  directorText: "Director",
  writersText: "Writers",
  directorName: "Zendaya",
  writersName: "Zendaya",
  descriptionText: "Description",
  timeText: "Time",
  movieTime: "1h 27Min",
  movieLanguage: "English",
  moviepg: "13+",
  languageText2: "Language",
  pgText: "P-G",
  movieName: "Cruella",
  topCastText: "Top Cast",
  castImage3: "/img/cast5@2x.png",
  castImage2: "/img/cast4@2x.png",
  castImage5: "/img/cast4@2x.png",
  castImage1: "/img/cast2@2x.png",
  castImage4: "/img/cast2@2x.png",
  castName3: "Zendaya",
  castName4: "Zendaya",
  castName5: "Zendaya",
  castName2: "Zendaya",
  castName1: "Zendaya",
  castRole1: "MJ",
  castRole2: "MJ",
  castRole3: "MJ",
  castRole4: "MJ",
  castRole5: "MJ",
  reviewsText: "Reviews",
  reviewItText: "Review it!",
  userReview1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio tempor orci aenean leo sed eget adipiscing pharetra quis. Ut elementum ac gravida varius ac ut massa et",
  username1: "@Username",
  userReview2: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio tempor orci aenean leo sed eget adipiscing pharetra quis. Ut elementum ac gravida varius ac ut massa et",
  username2: "@Username",
  userReview3: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Odio tempor orci aenean leo sed eget adipiscing pharetra quis. Ut elementum ac gravida varius ac ut massa et",
  username3: "@Username",
  container: "/img/rectangle-245@2x.svg",
  rightArrow:"/img/expand-right--review-@2x.svg",
  leftArrow:"/img/expand-left--review-@2x.svg",
  reviewIcon:"/img/icon-review@2x.svg",
  yourRatingText:"Your Rating",

  // Footer
  footerText1: "WE MAKE YOUR DAY",
  footerText2: <>Filmey © 2021<br /></>,
};

const reviewPageData= {
  // Header
  logo: "/img/logo.png",
  homeText: "Home",
  genresText: "Genres",
  languageText: "AR",
  loginText: "Login",
  registerText: "Register",
  icon: "/img/iconly-light-profile@2x.svg",

  //main 
  submitText: "Submit",
  inputPlaceholder: "Write your review...",
  inputType:"text",
  
  // Footer
  footerText1: "WE MAKE YOUR DAY",
  footerText2: <>Filmey © 2021<br /></>,
};