// export default movieForm;

import React from "react";
import "./movieForm.css";
import Select from "react-select";
import Header from "../header";
import CreatableSelect from "react-select/creatable";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { ActionMeta, OnChangeValue } from "react-select";
import validator from "validator";
import Cookies from "universal-cookie";
import jwt_decode from "jwt-decode";
import AsyncSelect from "react-select/async";
import AsyncCreatableSelect from "react-select/async-creatable";

function movieForm(props) {
  const [titleState, setTitle] = useState("");
  const [genreState, setGenre] = useState("");
  const [languageState, setLanaguage] = useState("");
  const [yearState, setYear] = useState("");
  const [hoursState, setHours] = useState("");
  const [minutesState, setMinutes] = useState("");
  const [ageGuideSate, setAgeGuide] = useState("");
  const [trailerState, setTrailer] = useState("");
  const [posterSate, setPoster] = useState("");
  const [descriptionState, setDescription] = useState("");
  const [directorState, setDirector] = useState("");
  const [writerState, setWriter] = useState("");
  const [actorImageArrayState, setActorImageArrayState] = useState([]);
  const [actorNameArrayState, setActorNameArrayState] = useState([]);
  const [actorRoleArrayState, setActorRoleArrayState] = useState([]);
  const [allGenres, setAllGenres] = useState([]);
  const [allLanguages, setAllLanguages] = useState([]);
  const [allAgeGuide, setallAgeGuide] = useState([]);
  const [allDirectors, setAllDirectors] = useState([]);
  const [allWriters, setAllWriters] = useState([]);
  const [allActors, setAllActors] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [movieName_error_message, setMovieName_error_message] = useState("");
  const [moviePoster_error_message, setMoviePoster_error_message] =
    useState("");
  const [movieTrailer_error_message, setMovieTrailer_error_message] =
    useState("");
  const [movieDes_error_message, setMovieDes_error_message] = useState("");
  const [movieActorImage_error_message, setMovieActorImage_error_message] =
    useState("");
  const [actor_error_message, setActorName_error_message] = useState([]);
  const [trailerURLErrorMessage, setTrailerURLErrorMessage] = useState("");
  const [posterURLErrorMessage, setPosterURLErrorMessage] = useState("");
  const [actor1ImageURLErrorMessage, setActor1ImageURLErrorMessage] =
    useState("");
  const [actor2ImageURLErrorMessage, setActor2ImageURLErrorMessage] =
    useState("");
  const [actor3ImageURLErrorMessage, setActor3ImageURLErrorMessage] =
    useState("");
  const [actor4ImageURLErrorMessage, setActor4ImageURLErrorMessage] =
    useState("");
  const [actor5ImageURLErrorMessage, setActor5ImageURLErrorMessage] =
    useState("");
  const [charactersErrorMessage, setcharactersErrorMessage] = useState("");

  //Edit States
  const [getTitle, setGetTitle] = useState("");
  const [getTrailer, setGetTrailer] = useState("");
  const [getPoster, setGetPoster] = useState("");
  const [getDescription, setGetDescription] = useState("");
  const [getYear, setGetYear] = useState();
  const [getAgeGuide, setGetAgeGuide] = useState();
  const [getGenres, setGetGenres] = useState([]);
  const [getLanguages, setGetLanguages] = useState([]);
  const [getMinutes, setGetMinutes] = useState();
  const [getHours, setGetHours] = useState();
  const [getDirectors, setGetDirectors] = useState([]);
  const [getWriters, setGetWriters] = useState([]);
  const [getActorNames, setGetActorNames] = useState([]);
  const [getActorRoles, setGetActorRoles] = useState([]);
  const [getActorImages, setGetActorImages] = useState([]);
  const [getActorImagesArrayInHTMLState, setGetActorImagesArrayInHTMLState] =
    useState([]);

  var actorsArray;
  var rolesArray;

  // movie length
  var length = hoursState + "h " + minutesState + "min";

  //movie id
  let { id } = useParams();
  id = parseInt(id);

  //Check repeated titles
  const CheckTitle = (value) => {
    //Add
    if (id == 0) {
      const CheckTitleResult = Axios.post(
        "http://localhost:3000/api/v1/movies/checkTitleForAdd",
        {
          title: value,
        }
      ).then((res) => {
        if (res.data) {
          setMovieName_error_message(res.data);
        } else {
          setMovieName_error_message("");
        }
      });
    }

    //Edit
    else {
      const CheckTitleResult = Axios.post(
        "http://localhost:3000/api/v1/movies/checkTitleForEdit",
        {
          movie_id: id,
          title: value,
        }
      ).then((res) => {
        if (res.data) {
          setMovieName_error_message(res.data);
        } else {
          setMovieName_error_message("");
        }
      });
    }
  };

  // invalid URLS

  const validatePosterURL = (value) => {
    //.jpg

    if (value == "") {
      setPosterURLErrorMessage("");
      return;
    }
    if (validator.isURL(value)) {
      if (
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".jpg" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 5) ==
          ".jpeg" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".png" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".gif"
      ) {
        setPosterURLErrorMessage("");
      } else {
        setPosterURLErrorMessage("Poster URL is not valid");
      }
    } else {
      setPosterURLErrorMessage("Poster URL is not valid");
    }
  };

  const validateTrailerURL = (value) => {
    if (value == "") {
      setTrailerURLErrorMessage("");
      return;
    }

    //https://www.youtube.com
    if (validator.isURL(value)) {
      if (
        value.substring(0, value.lastIndexOf(".com")) == "https://www.youtube"
      ) {
        setTrailerURLErrorMessage("");
      } else {
        setTrailerURLErrorMessage("Trailer URL is not valid");
      }
    } else {
      setTrailerURLErrorMessage("Trailer URL is not valid");
    }
  };

  //new alanoud
  const validateActor1ImageURL = (value) => {
    console.log("in validateActor1ImageURL");
    console.log(value);

    if (value == "") {
      setActor1ImageURLErrorMessage("");
      return;
    }
    //.jpg
    if (validator.isURL(value)) {
      if (
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".jpg" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 5) ==
          ".jpeg" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".png" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".gif"
      ) {
        setActor1ImageURLErrorMessage("");
      } else {
        setActor1ImageURLErrorMessage("Image URL is not valid");
      }
    } else {
      setActor1ImageURLErrorMessage("Image URL is not valid");
    }
  };

  const validateActor2ImageURL = (value) => {
    if (value == "") {
      setActor2ImageURLErrorMessage("");
      return;
    }
    //.jpg
    if (validator.isURL(value)) {
      if (
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".jpg" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 5) ==
          ".jpeg" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".png" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".gif"
      ) {
        setActor2ImageURLErrorMessage("");
      } else {
        setActor2ImageURLErrorMessage("Image URL is not valid");
      }
    } else {
      setActor2ImageURLErrorMessage("Image URL is not valid");
    }
  };

  const validateActor3ImageURL = (value) => {
    if (value == "") {
      setActor3ImageURLErrorMessage("");
      return;
    }
    //.jpg
    if (validator.isURL(value)) {
      if (
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".jpg" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 5) ==
          ".jpeg" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".png" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".gif"
      ) {
        setActor3ImageURLErrorMessage("");
      } else {
        setActor3ImageURLErrorMessage("Image URL is not valid");
      }
    } else {
      setActor3ImageURLErrorMessage("Image URL is not valid");
    }
  };

  const validateActor4ImageURL = (value) => {
    if (value == "") {
      setActor4ImageURLErrorMessage("");
      return;
    }
    //.jpg
    if (validator.isURL(value)) {
      if (
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".jpg" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 5) ==
          ".jpeg" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".png" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".gif"
      ) {
        setActor4ImageURLErrorMessage("");
      } else {
        setActor4ImageURLErrorMessage("Image URL is not valid");
      }
    } else {
      setActor4ImageURLErrorMessage("Image URL is not valid");
    }
  };

  const validateActor5ImageURL = (value) => {
    if (value == "") {
      setActor5ImageURLErrorMessage("");
      return;
    }
    //.jpg
    if (validator.isURL(value)) {
      if (
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".jpg" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 5) ==
          ".jpeg" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".png" ||
        value.substring(value.lastIndexOf("."), value.lastIndexOf(".") + 4) ==
          ".gif"
      ) {
        setActor5ImageURLErrorMessage("");
      } else {
        setActor5ImageURLErrorMessage("Image URL is not valid");
      }
    } else {
      setActor5ImageURLErrorMessage("Image URL is not valid");
    }
  };

  //charecters are not allowed
  const char = "";
  const preventChar = (value) => {
    if (
      value
        .charAt(0)
        .match(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, "")
    ) {
      setcharactersErrorMessage("Movie title is not valid");
    } else {
      setcharactersErrorMessage("");
    }
  };

  var setGenreFunction = (e) => {
    console.log(Array.isArray(e) ? e.map((x) => x.label) : []);
    setGenre(Array.isArray(e) ? e.map((x) => x.label) : []);

    var newArrayOfGenres = Array.isArray(e) ? e.map((x) => x.label) : [];
    getGenresArray = [];
    for (var i = 0; i < newArrayOfGenres.length; i++) {
      getGenresArray[i] = { value: i, label: newArrayOfGenres[i] };
    }
    setGetGenres(getGenresArray);
  };

  var setLanguageFunction = (e) => {
    console.log(Array.isArray(e) ? e.map((x) => x.label) : []);
    setLanaguage(Array.isArray(e) ? e.map((x) => x.label) : []);

    var newArrayOfLanguages = Array.isArray(e) ? e.map((x) => x.label) : [];
    getLanguagesArray = [];
    for (var i = 0; i < newArrayOfLanguages.length; i++) {
      getLanguagesArray[i] = { value: i, label: newArrayOfLanguages[i] };
    }
    setGetLanguages(getLanguagesArray);
  };

  var setDirectorFunction = (e) => {
    console.log(Array.isArray(e) ? e.map((x) => x.label) : []);
    setDirector(Array.isArray(e) ? e.map((x) => x.label) : []);

    var newArrayOfDirectors = Array.isArray(e) ? e.map((x) => x.label) : [];
    getDirectorsArray = [];
    for (var i = 0; i < newArrayOfDirectors.length; i++) {
      getDirectorsArray[i] = { value: i, label: newArrayOfDirectors[i] };
    }
    setGetDirectors(getDirectorsArray);
  };

  var setWriterFunction = (e) => {
    console.log(Array.isArray(e) ? e.map((x) => x.label) : []);
    setWriter(Array.isArray(e) ? e.map((x) => x.label) : []);

    var newArrayOfWriters = Array.isArray(e) ? e.map((x) => x.label) : [];
    getWritersArray = [];
    for (var i = 0; i < newArrayOfWriters.length; i++) {
      getWritersArray[i] = { value: i, label: newArrayOfWriters[i] };
    }
    setGetWriters(getWritersArray);
  };

  var actorNameArray = [...actorNameArrayState];
  var actorImageArray = [...actorImageArrayState];
  var actorRoleArray = [...actorRoleArrayState];
  var getActorNamesArray = [...getActorNames];

  const setActorName = (index) => (newValue, actionMeta) => {
    if (newValue == null) {
      if (id == 0) {
        actorNameArray[index] = newValue;
        setActorNameArrayState(actorNameArray);
      } else {
        getActorNamesArray[index] = newValue;
        setGetActorNames(getActorNamesArray);
      }
      actorImageArray[index] = "";
      getActorImagesArrayInHTML[index] = "";
      setActorImageArrayState(actorImageArray);
      setGetActorImagesArrayInHTMLState(getActorImagesArrayInHTML);
      return;
    }

    if (id == 0) {
      actorNameArray[index] = newValue.label;
      setActorNameArrayState(actorNameArray);
      const getActorImage = Axios.get(
        `http://localhost:3000/api/v1/movies/getActorImage/${actorNameArray[index]}`
      ).then((res) => {
        console.log(res.data);

        if (res.data.NoActorImage) {
          actorImageArray[index] = "";
          setActorImageArrayState(actorImageArray);

          getActorImagesArrayInHTML[index] = "";
          setActorImageArrayState(getActorImagesArrayInHTML);
        } else {
          actorImageArray[index] = res.data;
          setActorImageArrayState(actorImageArray);

          getActorImagesArrayInHTML[index] = res.data;
          setActorImageArrayState(getActorImagesArrayInHTML);
        }
      });
    } else {
      getActorNamesArray[index] = newValue;
      setGetActorNames(getActorNamesArray);

      const getActorImage = Axios.get(
        `http://localhost:3000/api/v1/movies/getActorImage/${newValue.label}`
      ).then((res) => {
        if (res.data.NoActorImage) {
          getActorImagesArrayInHTML[index] = "";
          setActorImageArrayState(getActorImagesArrayInHTML);
        } else {
          getActorImagesArrayInHTML[index] = res.data;
          setActorImageArrayState(getActorImagesArrayInHTML);
        }
      });
    }
    setGetActorImagesArrayInHTMLState(getActorImagesArrayInHTML);
    console.log(getActorImagesArrayInHTML);
  };

  const setActorRole = (index) => (newValue, actionMeta) => {
    if (id == 0 && newValue == null) {
      console.log(newValue);
      actorRoleArray[index] = newValue;
      setActorRoleArrayState(actorRoleArray);
      return;
    }

    if (id == 0) {
      actorRoleArray[index] = newValue.label;
      console.log(actorRoleArray);
      setActorRoleArrayState(actorRoleArray);
      console.log(actorRoleArrayState);
    } else {
      getActorRolesArray[index] = newValue;
      setGetActorRoles(getActorRolesArray);
    }
  };

  const setActorImage = (index, value) => {
    if (id == 0) {
      actorImageArray[index] = value;
      console.log(actorImageArray);
      setActorImageArrayState(actorImageArray);
      console.log(actorImageArrayState);
    }
    getActorImagesArrayInHTML[index] = value;
    setGetActorImagesArrayInHTMLState(getActorImagesArrayInHTML);
    getActorImagesArray[index] = { value: index, label: value };
    setGetActorImages(getActorImagesArray);
  };

  const cookies = new Cookies();
  const token = cookies.get("token");
  var decoded = jwt_decode(token);
  var adminID = decoded.userID;

  const addMovie = () => {
    console.log(
      titleState,
      genreState,
      languageState,
      yearState,
      length,
      ageGuideSate,
      trailerState,
      posterSate,
      descriptionState,
      directorState,
      writerState,
      actorNameArray,
      actorRoleArray,
      actorImageArray
    );

    const addMovieRes = Axios.post(
      "http://localhost:3000/api/v1/movies/addMovie",
      {
        adminID: adminID,
        title: titleState,
        genres: genreState,
        languages: languageState,
        year: yearState,
        length: length,
        age_guide: ageGuideSate,
        trailer_url: trailerState,
        poster: posterSate,
        description: descriptionState,
        directors: directorState,
        writers: writerState,
        actorNames: actorNameArray,
        actorRoles: actorRoleArray,
        actorImages: actorImageArray,
      }
    ).then((res) => {
      if (res.data.PosterMessage) {
        console.log(res.data.PosterMessage);
        setMoviePoster_error_message(res.data.PosterMessage);
      } else {
        setMoviePoster_error_message("");
      }
      if (res.data.DescriptionMessage) {
        console.log(res.data.DescriptionMessage);
        setMovieDes_error_message(res.data.DescriptionMessage);
      } else {
        setMovieDes_error_message("");
      }

      if (res.data.TrailerMessage) {
        console.log(res.data.TrailerMessage);
        setMovieTrailer_error_message(res.data.TrailerMessage);
      } else {
        setMovieTrailer_error_message("");
      }

      if (res.data.checkActorImage) {
        console.log(res.data.checkActorImage);
        setMovieActorImage_error_message(res.data.checkActorImage);
      } else {
        setMovieActorImage_error_message("");
      }

      if (res.data.movieID) {
        // alert("Movie added successfully");
        var newMovieID = res.data.movieID;
        window.location = `/movieInfoPage/${newMovieID}`;
      }
    });
  };

  const yearsArray = [];
  const hoursArray = [];
  const minutesArray = [];

  var year = 1950;

  for (var i = 0; i < 72; i++) {
    yearsArray[i] = { value: year, label: year };
    year++;
  }
  console.log(yearsArray);

  //hoursArray
  var hour = 1;
  for (var i = 0; i < 10; i++) {
    hoursArray[i] = { value: i, label: hour++ };
  }

  //minutesArray
  var minute = 0;
  for (var i = 0; i < 60; i++) {
    minutesArray[i] = { value: i, label: minute++ };
  }

  //Edit variables to send for backend
  var titleEdited;
  var genreEdited;
  var languageEdited;
  var yearEdited;
  var lengthEdited;
  var ageGuideEdited;
  var trailerEdited;
  var posterEdited;
  var descriptionEdited;
  var directorsEdited = [];
  var writersEdited = [];
  var actorNamesEdited;
  var actorRolesEdited;
  var actorImagesEdited;

  const editMovie = () => {
    if (titleState) {
      titleEdited = titleState;
    } else {
      titleEdited = getTitle;
    }

    if (genreState) {
      genreEdited = genreState;
    } else {
      genreEdited = getGenresArray;
    }

    if (languageState) {
      languageEdited = languageState;
    } else {
      languageEdited = getLanguages;
    }

    if (yearState) {
      yearEdited = yearState;
    } else {
      yearEdited = getYear;
    }

    if (hoursState) {
      console.log("minutesState");
      console.log(minutesState);
      if (minutesState) {
        lengthEdited = hoursState + "h " + minutesState + "min";
      } else {
        lengthEdited = hoursState + "h " + getMinutes + "min";
      }
      console.log(length);
    } else {
      if (minutesState) {
        console.log("minutesState");
        console.log(minutesState);
        if (hoursState) {
          lengthEdited = hoursState + "h " + minutesState + "min";
        } else {
          lengthEdited = getHours + "h " + minutesState + "min";
        }
        console.log(length);
      } else {
        {
          console.log(getHours, getMinutes);
          lengthEdited = getHours + "h " + getMinutes + "min";
        }
      }
    }
    if (ageGuideSate) {
      ageGuideEdited = ageGuideSate;
    } else {
      ageGuideEdited = getAgeGuide;
    }

    if (trailerState) {
      trailerEdited = trailerState;
    } else {
      trailerEdited = getTrailer;
    }

    if (posterSate) {
      posterEdited = posterSate;
    } else {
      posterEdited = getPoster;
    }

    if (descriptionState) {
      descriptionEdited = descriptionState;
    } else {
      descriptionEdited = getDescription;
    }

    if (directorState) {
      directorsEdited = directorState;
    } else {
      directorsEdited = getDirectors;
    }

    if (writerState) {
      writersEdited = writerState;
    } else {
      writersEdited = getWriters;
    }

    if (actorNameArray.length) {
      actorNamesEdited = actorNameArray;
    } else {
      for (let i = 0; i < getActorNames.length; i++) {
        if (getActorNames[i] == null) {
          getActorNames.splice(i, 1);
          console.log("getActorNames");
          console.log(getActorNames);
        }
      }
      actorNamesEdited = getActorNames;
    }

    if (actorRoleArray.length) {
      for (let i = 0; i < actorRoleArray.length; i++) {
        if (!actorRoleArray[i]) {
          actorRoleArray.splice(i, 1);
        }
      }
      actorRolesEdited = actorRoleArray;
    } else {
      for (let i = 0; i < getActorRoles.length; i++) {
        if (getActorRoles[i] == null) {
          getActorRoles.splice(i, 1);
          console.log("getActorRoles");
          console.log(getActorRoles);
        }
      }
      actorRolesEdited = getActorRoles;
    }

    if (getActorImagesArrayInHTML.length) {
      console.log("getActorImagesArrayInHTML");
      for (let i = 0; i < getActorImagesArrayInHTML.length; i++) {
        if (!getActorImagesArrayInHTML[i]) {
          getActorImagesArrayInHTML.splice(i, 1);
        }
      }
      actorImagesEdited = getActorImagesArrayInHTML;
    } else {
      for (let i = 0; i < getActorImages.length; i++) {
        if (getActorImages[i] == null) {
          getActorImages.splice(i, 1);
          console.log("getActorImages");
          console.log(getActorImages);
        }
      }
      actorImagesEdited = getActorImages;
    }

    console.log(
      titleEdited,
      genreEdited,
      languageEdited,
      yearEdited,
      lengthEdited,
      ageGuideEdited,
      trailerEdited,
      posterEdited,
      descriptionEdited,
      directorsEdited,
      writersEdited,
      actorNamesEdited,
      actorRolesEdited,
      actorImagesEdited
    );

    if (
      actorNamesEdited.length != actorImagesEdited.length ||
      actorNamesEdited.length != actorRolesEdited.length ||
      actorImagesEdited.length != actorRolesEdited.length
    ) {
      console.log(actorNamesEdited.length);
      console.log(actorRolesEdited.length);
      console.log(actorImagesEdited.length);
      console.log("Please fill Top Cast correctly");
      return;
    }

    const editMovieRes = Axios.post(
      "http://localhost:3000/api/v1/movies/editMovie",
      {
        adminID: adminID,
        movie_id: id,
        title: titleEdited,
        genres: genreEdited,
        languages: languageEdited,
        year: yearEdited,
        length: lengthEdited,
        age_guide: ageGuideEdited,
        trailer_url: trailerEdited,
        poster: posterEdited,
        description: descriptionEdited,
        directors: directorsEdited,
        writers: writersEdited,
        actorNames: actorNamesEdited,
        actorRoles: actorRolesEdited,
        actorImages: actorImagesEdited,
      }
    ).then((res) => {
      if (res.data.movieID) {
        window.location = `/movieInfoPage/${id}`;
      }

      setMoviePoster_error_message(res.data.CheckPosterForEditMessage);
      setMovieTrailer_error_message(res.data.CheckTrailerForEditMessage);
      setMovieDes_error_message(res.data.CheckDescriptionForEditMessage);
    });
  };

  var getGenresArray = [...getGenres];
  var getLanguagesArray = [...getLanguages];
  var getDirectorsArray = [...getDirectors];
  var getWritersArray = [...getWriters];
  var getActorRolesArray = [...getActorRoles];
  var getActorImagesArray = [...getActorImages];
  var getActorImagesArrayInHTML = [...getActorImagesArrayInHTMLState];

  React.useEffect(() => {
    const res = Axios.get(
      "http://localhost:3000/api/v1/movies/allGenres/1"
    ).then((response) => {
      const genresArray = [...allGenres];
      console.log(response.data);

      for (var i = 0; i < response.data.length; i++) {
        genresArray[i] = { value: i, label: response.data[i].genre };
      }
      console.log(genresArray);
      setAllGenres(genresArray);
    });

    const res1 = Axios.get(
      "http://localhost:3000/api/v1/movies/allLanguages/1"
    ).then((response) => {
      const languageArray = [...allLanguages];

      for (var i = 0; i < response.data.length; i++) {
        languageArray[i] = { value: i, label: response.data[i].language };
      }
      console.log(languageArray);
      setAllLanguages(languageArray);
    });

    const res2 = Axios.get(
      "http://localhost:3000/api/v1/movies/allAgeGuide/1"
    ).then((response) => {
      const ageGuideArray = [...allLanguages];

      for (var i = 0; i < response.data.length; i++) {
        ageGuideArray[i] = { value: i, label: response.data[i].age_guide };
      }
      setallAgeGuide(ageGuideArray);
    });

    const res3 = Axios.get(
      "http://localhost:3000/api/v1/movies/allDirectors/1"
    ).then((response) => {
      const directorsArray = [...allDirectors];

      for (var i = 0; i < response.data.length; i++) {
        directorsArray[i] = { value: i, label: response.data[i].director };
      }
      setAllDirectors(directorsArray);
    });

    const res4 = Axios.get(
      "http://localhost:3000/api/v1/movies/allWriters/1"
    ).then((response) => {
      const writersArray = [...allWriters];

      for (var i = 0; i < response.data.length; i++) {
        writersArray[i] = { value: i, label: response.data[i].writer };
      }
      setAllWriters(writersArray);
    });

    const res5 = Axios.get(
      "http://localhost:3000/api/v1/movies/allActors/1"
    ).then((response) => {
      actorsArray = [...allActors];

      for (var i = 0; i < response.data.length; i++) {
        actorsArray[i] = { value: i, label: response.data[i].actor };
      }
      setAllActors(actorsArray);
    });

    const res6 = Axios.get(
      "http://localhost:3000/api/v1/movies/allRoles/1"
    ).then((response) => {
      rolesArray = [...allRoles];

      for (var i = 0; i < response.data.length; i++) {
        rolesArray[i] = { value: i, label: response.data[i].role };
      }
      setAllRoles(rolesArray);
    });

    if (id > 0) {
      const b = Axios.get(
        `http://localhost:3000/api/v1/movies/getMovieFormData/${id}`
      ).then((response) => {
        console.log(response.data);
        setGetTitle(response.data.movieInfo[0].title);
        setGetTrailer(response.data.movieInfo[0].trailer_url);
        setGetPoster(response.data.movieInfo[0].poster);
        setGetDescription(response.data.movieInfo[0].description);
        var movieLength = response.data.movieInfo[0].length;
        setGetHours(movieLength.substring(0, movieLength.indexOf("h")));
        setGetMinutes(
          movieLength.substring(
            movieLength.indexOf(" ") + 1,
            movieLength.indexOf("min")
          )
        );
        setGetYear(response.data.movieInfo[0].year);
        setGetAgeGuide(response.data.movieInfo[0].age_guide);

        for (var i = 0; i < response.data.arrayofGenres.length; i++) {
          getGenresArray[i] = {
            value: i,
            label: response.data.arrayofGenres[i],
          };
        }
        setGetGenres(getGenresArray);

        for (var i = 0; i < response.data.arrayofLanguages.length; i++) {
          getLanguagesArray[i] = {
            value: i,
            label: response.data.arrayofLanguages[i],
          };
        }
        setGetLanguages(getLanguagesArray);

        for (var i = 0; i < response.data.arrayofDirectors.length; i++) {
          getDirectorsArray[i] = {
            value: i,
            label: response.data.arrayofDirectors[i],
          };
        }
        setGetDirectors(getDirectorsArray);

        for (var i = 0; i < response.data.arrayofWriters.length; i++) {
          getWritersArray[i] = {
            value: i,
            label: response.data.arrayofWriters[i],
          };
        }
        setGetWriters(getWritersArray);

        for (var i = 0; i < response.data.actorInfoArray.length; i++) {
          getActorNamesArray[i] = {
            value: i,
            label: response.data.actorInfoArray[i][0].actorName,
          };
          getActorRolesArray[i] = {
            value: i,
            label: response.data.actorInfoArray[i][0].movieRole,
          };
          getActorImagesArrayInHTML[i] =
            response.data.actorInfoArray[i][0].actorImage;
        }
        setGetActorImagesArrayInHTMLState(getActorImagesArrayInHTML);
        setGetActorNames(getActorNamesArray);
        setGetActorRoles(getActorRolesArray);
      });
    }
  }, []);

  const runCallback = (cb) => {
    return cb();
  };

  // const loadOptions = (inputValue) => {
  //   return new Promise((resolve, reject) => {
  //     // using setTimeout to emulate a call to server
  //     setTimeout(() => {
  //       resolve(filter(inputValue));
  //     }, 2000);
  //   });
  // };

  // const filter = (inputValue) =>
  //   options.filter((option) =>
  //     option.label.toLowerCase().includes(inputValue.toLowerCase())
  //   );

  const loadOptions = () => {
    return allGenres[0].label;
  };

  const {
    movieInformation,
    title,
    genre,
    lanaguage,
    movielenadd,
    ageguide,
    trailer,
    poster,
    description,
    inputPlaceholder2,
    directorWriter,
    directoradd,
    writer,
    topCast,
    actorname,
    actorcharacteradd,
    actorimage,
    addbutton,
  } = props;

  {
    /* new alanoud */
  }

  if (id == 0) {
    console.log(actorNameArrayState);
    for (let i = 0; i < actorNameArrayState.length; i++) {
      if (actorNameArrayState[i] == null) {
        actorNameArrayState.splice(i, 1);
        console.log("actorNameArrayState");
        console.log(actorNameArrayState);
      }
    }

    for (let i = 0; i < actorRoleArrayState.length; i++) {
      if (actorRoleArrayState[i] == null) {
        actorRoleArrayState.splice(i, 1);
        console.log("actorRoleArrayState");
        console.log(actorRoleArrayState);
      }
    }
    console.log(actorImageArrayState);

    for (let i = 0; i < actorImageArrayState.length; i++) {
      if (actorImageArrayState[i] == "") {
        actorImageArrayState.splice(i, 1);
        console.log("actorImageArrayState");
        console.log(actorImageArrayState);
      }
    }
  }
  console.log(actorImageArrayState);

  //movie title
  //have write another title
  if (titleState) {
    titleEdited = titleState;
  }
  //same default title
  else {
    titleEdited = getTitle;
  }

  if (genreState) {
    console.log(getGenresArray);
    genreEdited = genreState;
  } else {
    console.log(getGenresArray);
    genreEdited = getGenresArray;
  }

  if (languageState) {
    languageEdited = languageState;
  } else {
    languageEdited = getLanguages;
  }

  if (yearState) {
    yearEdited = yearState;
  } else {
    yearEdited = getYear;
  }

  if (hoursState) {
    console.log("minutesState");
    console.log(minutesState);
    if (minutesState) {
      lengthEdited = hoursState + "h " + minutesState + "min";
    } else {
      lengthEdited = hoursState + "h " + getMinutes + "min";
    }
    console.log(length);
  } else {
    if (minutesState) {
      console.log("minutesState");
      console.log(minutesState);
      if (hoursState) {
        lengthEdited = hoursState + "h " + minutesState + "min";
      } else {
        lengthEdited = getHours + "h " + minutesState + "min";
      }
      console.log(length);
    } else {
      {
        console.log(getHours, getMinutes);
        lengthEdited = getHours + "h " + getMinutes + "min";
      }
    }
  }

  if (ageGuideSate) {
    ageGuideEdited = ageGuideSate;
  } else {
    ageGuideEdited = getAgeGuide;
  }

  if (trailerState) {
    trailerEdited = trailerState;
  } else {
    trailerEdited = getTrailer;
  }

  if (posterSate) {
    posterEdited = posterSate;
  } else {
    posterEdited = getPoster;
  }

  if (descriptionState) {
    descriptionEdited = descriptionState;
  } else {
    descriptionEdited = getDescription;
  }

  if (directorState) {
    directorsEdited = directorState;
  } else {
    directorsEdited = getDirectors;
  }

  if (writerState) {
    writersEdited = writerState;
  } else {
    writersEdited = getWriters;
  }

  if (actorNameArray.length) {
    actorNamesEdited = actorNameArray;
  } else {
    for (let i = 0; i < getActorNames.length; i++) {
      if (getActorNames[i] == null) {
        getActorNames.splice(i, 1);
        console.log("getActorNames");
        console.log(getActorNames);
      }
    }
    actorNamesEdited = getActorNames;
  }

  if (actorRoleArray.length) {
    for (let i = 0; i < actorRoleArray.length; i++) {
      if (!actorRoleArray[i]) {
        actorRoleArray.splice(i, 1);
      }
    }
    actorRolesEdited = actorRoleArray;
  } else {
    for (let i = 0; i < getActorRoles.length; i++) {
      if (getActorRoles[i] == null) {
        getActorRoles.splice(i, 1);
        console.log("getActorRoles");
        console.log(getActorRoles);
      }
    }
    actorRolesEdited = getActorRoles;
  }

  if (getActorImagesArrayInHTML.length) {
    console.log("in getActorImagesArrayInHTML");
    console.log(getActorImagesArrayInHTML);

    for (let i = 0; i < getActorImagesArrayInHTML.length; i++) {
      console.log("getActorImagesArrayInHTML[i]");

      console.log(getActorImagesArrayInHTML[i]);
      console.log(!getActorImagesArrayInHTML[i]);

      if (!getActorImagesArrayInHTML[i]) {
        getActorImagesArrayInHTML.splice(i, 1);
      }
    }
    actorImagesEdited = getActorImagesArrayInHTML;
    console.log("after loop getActorImagesArrayInHTML");

    console.log(getActorImagesArrayInHTML);
  } else {
    for (let i = 0; i < getActorImages.length; i++) {
      if (getActorImages[i] == null) {
        getActorImages.splice(i, 1);
        console.log("getActorImages");
        console.log(getActorImages);
      }
    }
    actorImagesEdited = getActorImages;
  }

  console.log(
    titleEdited,
    genreEdited,
    languageEdited,
    yearEdited,
    lengthEdited,
    ageGuideEdited,
    trailerEdited,
    posterEdited,
    descriptionEdited,
    directorsEdited,
    writersEdited,
    actorNamesEdited,
    actorRolesEdited,
    actorImagesEdited
  );

  console.log(actorNameArrayState);
  for (let i = 0; i < actorNamesEdited.length; i++) {
    if (actorNamesEdited[i] == null) {
      actorNamesEdited.splice(i, 1);
      console.log("actorNamesEdited");
      console.log(actorNamesEdited);
    }
  }

  for (let i = 0; i < actorRolesEdited.length; i++) {
    if (actorRolesEdited[i] == null) {
      actorRolesEdited.splice(i, 1);
      console.log("actorRolesEdited");
      console.log("**********in actorNamesEdited");

      console.log(actorRolesEdited);
    }
  }
  console.log("before");

  console.log(actorImagesEdited);

  for (let i = 0; i < actorImagesEdited.length; i++) {
    console.log("**********before in if");
    console.log(actorImagesEdited);
    if (actorImagesEdited[i] == "") {
      actorImagesEdited.splice(i, 1);
      console.log("**********in actorNamesEdited");
      console.log(actorImagesEdited);
    }
  }
  console.log("after");
  console.log(actorImagesEdited);

  //edit empty values
  const emptyTitle = () => {
    setGetTitle("");
  };
  const emptyDes = () => {
    setGetDescription("");
  };
  const emptyTrailer = () => {
    setGetTrailer("");
  };
  const emptyPoster = () => {
    setGetPoster("");
  };

  console.log("alanoud");
  console.log(getActorNames);

  // repeated actor name
  const repeatedActorName = [];
  if (id > 0) {
    const actorsLength = getActorNames.length;
    for (var i = actorsLength - 1; i > -1; i--) {
      const actorName = getActorNames[i];

      for (var j = i - 1; j > -1; j--) {
        if (actorName != null) {
          if (actorName == getActorNames[j])
            repeatedActorName[i] = "Name has already been chosen";
        }
      }
    }
  } else {
    const actorsLength = actorNameArrayState.length;
    for (var i = actorsLength - 1; i > -1; i--) {
      const actorName = actorNameArrayState[i];

      for (var j = i - 1; j > -1; j--) {
        if (actorName != null) {
          if (actorName == actorNameArrayState[j])
            repeatedActorName[i] = "Name has already been chosen";
        }
      }
    }
  }

  // repeated actor role
  const repeatedActorRole = [];
  if (id > 0) {
    const RolesLength = getActorRoles.length;
    for (var i = RolesLength - 1; i > -1; i--) {
      const actorRole = getActorRoles[i];

      for (var j = i - 1; j > -1; j--) {
        if (actorRole != null) {
          if (actorRole == getActorRoles[j])
            repeatedActorRole[i] = "Role has already been chosen";
        }
      }
    }
  } else {
    const RolesLength = actorRoleArrayState.length;
    for (var i = RolesLength - 1; i > -1; i--) {
      const actorRole = actorRoleArrayState[i];

      for (var j = i - 1; j > -1; j--) {
        if (actorRole != null) {
          if (actorRole == actorRoleArrayState[j])
            repeatedActorRole[i] = "Role has already been chosen";
        }
      }
    }
  }

  // repeated actor image
  const repeatedActorImage = [];
  if (id > 0) {
    const imageLength = getActorImagesArrayInHTML.length;
    for (var i = imageLength - 1; i > -1; i--) {
      const actorImage = getActorImagesArrayInHTML[i];

      for (var j = i - 1; j > -1; j--) {
        if (actorImage != "") {
          if (actorImage == getActorImagesArrayInHTML[j])
            repeatedActorImage[i] = "Image has already been chosen";
        }
      }
    }
  } else {
    const imageLength = actorImageArrayState.length;
    for (var i = imageLength - 1; i > -1; i--) {
      const actorImage = actorImageArrayState[i];

      for (var j = i - 1; j > -1; j--) {
        if (actorImage != "") {
          if (actorImage == actorImageArrayState[j])
            repeatedActorImage[i] = "Image has already been chosen";
        }
      }
    }
  }

  // actors disabled
  const isFilled = [];
  if (id > 0) {
    for (var i = 0; i < 4; i++) {
      isFilled[i] = true;
    }
  } else {
    for (var i = 0; i < 4; i++) {
      isFilled[i] =
        actorNameArrayState.length > i &&
        actorRoleArrayState.length > i &&
        actorImageArrayState.length > i;
    }
  }

  const addIsEnabled =
    titleState.length > 0 &&
    genreState != "" &&
    languageState != "" &&
    yearState != "" &&
    hoursState != "" &&
    minutesState != "" &&
    ageGuideSate != "" &&
    trailerState.length > 0 &&
    posterSate.length > 0 &&
    descriptionState.length > 0 &&
    directorState != "" &&
    writerState != "" &&
    actorImageArrayState.length > 0 &&
    actorNameArrayState.length > 0 &&
    actorRoleArrayState.length > 0 &&
    repeatedActorName.length == 0 &&
    repeatedActorRole.length == 0 &&
    repeatedActorImage.length == 0 &&
    trailerURLErrorMessage == "" &&
    posterURLErrorMessage == "" &&
    actor1ImageURLErrorMessage == "" &&
    actor2ImageURLErrorMessage == "" &&
    actor3ImageURLErrorMessage == "" &&
    actor4ImageURLErrorMessage == "" &&
    actor5ImageURLErrorMessage == "" &&
    charactersErrorMessage == "" &&
    actorNameArrayState.length == actorRoleArrayState.length &&
    actorNameArrayState.length == actorImageArrayState.length;

  const editIsEnabled =
    titleEdited.length > 0 &&
    genreEdited.length > 0 &&
    languageEdited.length > 0 &&
    yearEdited != "" &&
    lengthEdited.length > 0 &&
    ageGuideEdited != "" &&
    trailerEdited.length > 0 &&
    posterEdited.length > 0 &&
    descriptionEdited.length > 0 &&
    directorsEdited.length > 0 &&
    writersEdited.length > 0 &&
    actorNamesEdited.length > 0 &&
    actorRolesEdited.length > 0 &&
    actorImagesEdited.length > 0 &&
    actorNamesEdited.length == actorRolesEdited.length &&
    actorNamesEdited.length == actorImagesEdited.length;

  if (
    actorNamesEdited.length != actorImagesEdited.length ||
    actorNamesEdited.length != actorRolesEdited.length ||
    actorImagesEdited.length != actorRolesEdited.length
  ) {
    console.log(actorNamesEdited.length);
    console.log(actorRolesEdited.length);
    console.log(actorImagesEdited.length);
    console.log("Please fill Top Cast correctly");
  }

  return (
    <div className="PageCenter">
      {/* <img className="addMoviebackgroundImage" src="/img/backgroundImage.png" /> */}
      <div className="addmovie screen">
        <header>
          <Header />
        </header>
        <div className="addMovieflex-col">
          {/* Movie Information */}
          <div className="addMovieoverlap-group1">
            <div className="addMoviemovie-information neuton-normal-white-60px5">
              {movieInformation}
            </div>
            <img className="addMovieline1" src="/img/oneline@1x.svg" />
          </div>

          {/* Title */}
          <div className="addMovietitle neuton-bold-white-30px7">{title}</div>
          <input
            // defaultValue={getYear}
            defaultValue={getTitle}
            className="addMovietitle-placholder"
            name="titleplacholder"
            placeholder="Enter movie name"
            type="text"
            required
            onChange={(e) => {
              CheckTitle(e.target.value);
              setTitle(e.target.value);
              preventChar(e.target.value);
            }}
            onFocus={(e) => {
              {
                emptyTitle();
              }
            }}
          />
          <div className="movieNameError nunito-normal-river-bed-50px">
            {" "}
            <strong>
              {" "}
              {movieName_error_message} {charactersErrorMessage}{" "}
            </strong>
          </div>

          {/* Genre */}
          <div className="addMovieflex-col-item neuton-bold-white-30px7">
            {genre}
          </div>
          <AsyncSelect
            value={getGenresArray}
            isClearable
            defaultOptions={allGenres}
            isMulti
            onChange={setGenreFunction}
            isSearchable
            className="addMoviegenre-container"
            placeholder="Select movie genres"
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                text: "var(--cardinal)",
                primary: "var(--cardinal)",
              },
            })}
            styles={{
              control: (provided, state) => ({
                ...provided,
                minHeight: 66,
                background: "#fcfcfc",
                outline: "none",
                border: "0px solid black",
                fontSize: "16px",
                boxShadow: state.isFocused
                  ? "0px 4px 4px red"
                  : "0px 4px 4px #00000040",
                borderRadius: 5,
                paddingLeft: 20,
              }),

              multiValueLabel: (base) => ({
                ...base,
                backgroundColor: "var(--white-3)",
                color: "black",
              }),

              multiValueRemove: (base) => ({
                ...base,
                backgroundColor: "var(--cardinal)",
                color: "white",
              }),
            }}
          />
          {/* lanaguage */}
          <div className="addMovielanaguage neuton-bold-white-30px7">
            {lanaguage}
          </div>
          <AsyncSelect
            value={getLanguagesArray}
            isMulti
            isClearable
            defaultOptions={allLanguages}
            onChange={setLanguageFunction}
            closeMenuOnSelect={false}
            isSearchable
            className="addMovielanaguage-container"
            placeholder="Select movie lanaguages"
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                text: "var(--cardinal)",
                primary: "var(--cardinal)",
              },
            })}
            styles={{
              control: (provided, state) => ({
                ...provided,
                minHeight: 66,
                background: "#fcfcfc",
                outline: "none",
                border: "0px solid black",
                fontSize: "16px",
                boxShadow: state.isFocused
                  ? "0px 4px 4px red"
                  : "0px 4px 4px #00000040",
                borderRadius: 5,
                paddingLeft: 20,
              }),

              multiValueLabel: (base) => ({
                ...base,
                backgroundColor: "var(--white-3)",
                color: "black",
              }),

              multiValueRemove: (base) => ({
                ...base,
                backgroundColor: "var(--cardinal)",
                color: "white",
              }),
            }}
          />

          <div className="GenreYear">
            {/* year */}
            <div className="addMovieyear neuton-bold-white-30px7">Year</div>
            <select
              className="movieYearBox"
              onChange={(e) => {
                console.log(getYear);
                setYear(e.target.value);
              }}
            >
              {id == 0 && (
                <option
                  selected
                  disabled
                  hidden
                  className="selectText roboto-normal-pink-swan-16px"
                  value=""
                >
                  {" "}
                  Select movie year
                </option>
              )}
              {id !== 0 && (
                <option
                  selected
                  disabled
                  hidden
                  className="selectText roboto-normal-pink-swan-16px"
                  value=""
                >
                  {" "}
                  {getYear}
                </option>
              )}

              {yearsArray.map((option) => (
                <option value={option.label}>{option.label}</option>
              ))}
            </select>

            {/* Age guide */}
            <div className="addMovieage-guide neuton-bold-white-30px7">
              {ageguide}
            </div>
            <select
              className="movieAgeGuideBox"
              onChange={(e) => {
                setAgeGuide(e.target.value);
              }}
            >
              {id == 0 && (
                <option
                  selected
                  disabled
                  hidden
                  className="selectText roboto-normal-pink-swan-16px"
                  value=""
                >
                  {" "}
                  Select movie age guide
                </option>
              )}
              {id != 0 && (
                <option
                  selected
                  disabled
                  hidden
                  className="selectText roboto-normal-pink-swan-16px"
                  value=""
                >
                  {" "}
                  {getAgeGuide}
                </option>
              )}
              {allAgeGuide.map((option) => (
                <option value={option.label}>{option.label}</option>
              ))}
            </select>
          </div>
          {/* Trailer  */}
          <div className="addMovietrailer neuton-bold-white-30px7">
            {trailer}
          </div>
          <div className="addMovietrailer-container border-1px-black">
            <input
              defaultValue={getTrailer}
              className="trailerInput"
              name="titleplacholder"
              placeholder="Enter URL of movie trailer"
              type="text"
              required
              onChange={(e) => {
                setTrailer(e.target.value);
                validateTrailerURL(e.target.value);
              }}
              onFocus={(e) => {
                {
                  emptyTrailer();
                }
              }}
            />
          </div>
          <div className="movieTrailerError nunito-normal-river-bed-50px">
            {" "}
            <strong>
              {" "}
              {movieTrailer_error_message} {trailerURLErrorMessage}{" "}
            </strong>
          </div>

          {/* Poster */}
          <div className="addMovieposter neuton-bold-white-30px7">{poster}</div>
          <div className="addMovieposter-container border-1px-black">
            <input
              defaultValue={getPoster}
              // value="ho"

              className="trailerInput"
              name="titleplacholder"
              placeholder="Enter URL of movie poster"
              type="text"
              required
              onChange={(e) => {
                setPoster(e.target.value);
                validatePosterURL(e.target.value);
              }}
              onFocus={(e) => {
                {
                  emptyPoster();
                }
              }}
            />
          </div>
          <div className="moviePosterError nunito-normal-river-bed-50px">
            {" "}
            <strong>
              {" "}
              {moviePoster_error_message} {posterURLErrorMessage}{" "}
            </strong>
          </div>

          {/* Description */}
          <div className="addMoviedescription neuton-bold-white-30px7">
            {description}
          </div>
          <div className="addMovieoverlap-group3">
            <textarea
              defaultValue={getDescription}
              className="addMoviedescription-placholder"
              name="descriptionplacholder"
              placeholder={inputPlaceholder2}
              rows="15"
              cols="154"
              maxLength={3000}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              onFocus={(e) => {
                {
                  emptyDes();
                }
              }}
            ></textarea>
          </div>
          <div className="movieDesError nunito-normal-river-bed-50px">
            {" "}
            <strong> {movieDes_error_message} </strong>
          </div>

          {/* Movie Length  */}
          <div className="addMoviemovie-len-add neuton-bold-white-30px7">
            {movielenadd}
          </div>
          <div className="addMovieflex-row">
            {/* Hours */}
            <div className="hoursMovieLength neuton-bold-white-30px">
              {" "}
              Hours :{" "}
            </div>
            <select
              className="movieHours"
              onChange={(e) => {
                setHours(e.target.value);
              }}
            >
              {id == 0 && (
                <option
                  selected
                  disabled
                  hidden
                  className="selectText roboto-normal-pink-swan-16px"
                  value=""
                >
                  {" "}
                  Select hours
                </option>
              )}

              {id != 0 && (
                <option
                  selected
                  disabled
                  hidden
                  className="selectText roboto-normal-pink-swan-16px"
                  value=""
                >
                  {getHours}
                </option>
              )}
              {hoursArray.map((option) => (
                <option value={option.label}>{option.label}</option>
              ))}
            </select>

            {/* Minutes */}
            <div className="minMovieLength neuton-bold-white-30px">
              {" "}
              Minutes :{" "}
            </div>
            <select
              className="movieMin"
              onChange={(e) => {
                setMinutes(e.target.value);
              }}
            >
              {id == 0 && (
                <option
                  selected
                  disabled
                  hidden
                  className="selectText roboto-normal-pink-swan-16px"
                  value=""
                >
                  {" "}
                  Select minutes
                </option>
              )}

              {id != 0 && (
                <option
                  selected
                  disabled
                  hidden
                  className="selectText roboto-normal-pink-swan-16px"
                  value=""
                >
                  {getMinutes}
                </option>
              )}
              {minutesArray.map((option) => (
                <option value={option.label}>{option.label}</option>
              ))}
            </select>
          </div>

          {/* Directior-Writer */}
          <div className="addMoviedirector-writer neuton-normal-white-60px5">
            {directorWriter}
          </div>
          <img className="addMovieline2" src="/img/twoline@1x.svg" />

          {/* Director */}
          <div className="addMovieflex-col-item neuton-bold-white-30px7">
            {directoradd}
          </div>
          <AsyncCreatableSelect
            value={getDirectorsArray}
            isSearchable
            isMulti
            formatCreateLabel={(inputText) => `${inputText}`}
            onKeyDown={(e) =>
              !/[a-z]/.test(e.key) &&
              !/[A-Z]/.test(e.key) &&
              !/ /.test(e.key) &&
              e.preventDefault()
            }
            className="addMoviedirector-container"
            placeholder="Select or write movie directors"
            defaultOptions={allDirectors}
            onChange={setDirectorFunction}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                text: "var(--cardinal)",
                primary: "var(--cardinal)",
              },
            })}
            styles={{
              control: (provided, state) => ({
                ...provided,
                minHeight: 66,
                background: "#fcfcfc",
                outline: "none",
                border: "0px solid black",
                fontSize: "16px",
                boxShadow: state.isFocused
                  ? "0px 4px 4px red"
                  : "0px 4px 4px #00000040",
                borderRadius: 5,
                paddingLeft: 20,
              }),

              multiValueLabel: (base) => ({
                ...base,
                backgroundColor: "var(--white-3)",
                color: "black",
              }),

              multiValueRemove: (base) => ({
                ...base,
                backgroundColor: "var(--cardinal)",
                color: "white",
              }),
            }}
          />

          {/* Writer */}
          <div className="addMoviewriter neuton-bold-white-30px7">{writer}</div>
          <AsyncCreatableSelect
            value={getWritersArray}
            isSearchable
            formatCreateLabel={(inputText) => `${inputText}`}
            onKeyDown={(e) =>
              !/[a-z]/.test(e.key) &&
              !/[A-Z]/.test(e.key) &&
              !/ /.test(e.key) &&
              e.preventDefault()
            }
            isMulti
            className="addMoviewriter-container"
            placeholder="Select or write movie writers"
            defaultOptions={allWriters}
            onChange={setWriterFunction}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                text: "var(--cardinal)",
                primary: "var(--cardinal)",
              },
            })}
            styles={{
              control: (provided, state) => ({
                ...provided,
                minHeight: 66,
                background: "#fcfcfc",
                outline: "none",
                border: "0px solid black",
                fontSize: "16px",
                boxShadow: state.isFocused
                  ? "0px 4px 4px red"
                  : "0px 4px 4px #00000040",
                borderRadius: 5,
                paddingLeft: 20,
              }),

              multiValueLabel: (base) => ({
                ...base,
                backgroundColor: "var(--white-3)",
                color: "black",
              }),

              multiValueRemove: (base) => ({
                ...base,
                backgroundColor: "var(--cardinal)",
                color: "white",
              }),
            }}
          />

          {/* Top Cast */}
          <div className="addMovieoverlap-group2">
            <img className="addMovieline3" src="/img/threeline@2x.svg" />
            <div className="addMovietop-cast neuton-normal-white-60px5">
              {topCast}
            </div>
          </div>

          {/* Actors */}
          <div className="addMovieflex-row-1 nunito-normal-white-35px">
            <div className="addMovieactor-name neuton-bold-white-30px7">
              {actorname}
            </div>
            <div className="addMovieactor-character-add neuton-bold-white-30px7">
              {actorcharacteradd}
            </div>
            <div className="addMovieactor-image-1 neuton-bold-white-30px7">
              {actorimage}
            </div>
          </div>

          {/*1st Actor */}

          <div>
            <div className="addMovieflex-row-2">
              {/* actor name */}
              <CreatableSelect
                value={getActorNamesArray[0]}
                isSearchable
                isClearable
                className="addMovieactor"
                formatCreateLabel={(inputText) => `${inputText}`}
                onKeyDown={(e) =>
                  !/[a-z]/.test(e.key) &&
                  !/[A-Z]/.test(e.key) &&
                  !/ /.test(e.key) &&
                  e.preventDefault()
                }
                placeholder="Select or write actor name"
                options={allActors}
                isClearable={true}
                onChange={setActorName(0)}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    text: "var(--cardinal)",
                    primary: "var(--cardinal)",
                  },
                })}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    minHeight: 66,
                    width: 320,
                    outline: "none",
                    border: "0px solid black",
                    fontSize: "16px",
                    boxShadow: state.isFocused
                      ? "0px 4px 4px red"
                      : "0px 4px 4px #00000040",
                    borderRadius: 5,
                    paddingLeft: 10,
                  }),
                }}
              />

              {/* actor role */}
              <CreatableSelect
                value={getActorRolesArray[0]}
                isSearchable
                isClearable
                className="addMovieactor-role"
                placeholder="Select or write actor role"
                formatCreateLabel={(inputText) => `${inputText}`}
                onKeyDown={(e) =>
                  !/[a-z]/.test(e.key) &&
                  !/[A-Z]/.test(e.key) &&
                  !/ /.test(e.key) &&
                  e.preventDefault()
                }
                options={allRoles}
                onChange={setActorRole(0)}
                isClearable={true}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    text: "var(--cardinal)",
                    primary: "var(--cardinal)",
                  },
                })}
                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    minHeight: 66,
                    width: 320,
                    background: "#fcfcfc",
                    outline: "none",
                    border: "0px solid black",
                    fontSize: "16px",
                    boxShadow: state.isFocused
                      ? "0px 4px 4px red"
                      : "0px 4px 4px #00000040",
                    borderRadius: 5,
                    paddingLeft: 10,
                  }),
                }}
              />

              {/* actor image */}
              <div>
                <input
                  className="addMovieactor-image"
                  placeholder="Enter URL of actor image"
                  name="actorImage"
                  type="text"
                  required
                  value={getActorImagesArrayInHTMLState[0]}
                  onChange={(e) => {
                    setActorImage(0, e.target.value);
                    validateActor1ImageURL(e.target.value);
                  }}
                />
                <div className="movieActorImageError nunito-normal-river-bed-50px">
                  {" "}
                  <strong>
                    {" "}
                    {actor1ImageURLErrorMessage}{" "}
                    {movieActorImage_error_message[0]}{" "}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* actor 1 errors */}
          {/* <div className="actorErrors">
              <div className="movieActorNameError nunito-normal-river-bed-50px"> <strong> {repeatedActorName[0]}  </strong></div>
              <div className="movieActorRoleError nunito-normal-river-bed-50px"> <strong> { repeatedActorRole[0] } </strong></div>
           </div>  */}

          {/*2nd Actor */}

          <div>
            <div className="addMovieflex-row-2">
              {/* actor name */}
              <div className="addMovieactor">
                <CreatableSelect
                  value={getActorNames[1]}
                  isSearchable
                  isClearable
                  isDisabled={!isFilled[0]}
                  formatCreateLabel={(inputText) => `${inputText}`}
                  onKeyDown={(e) =>
                    !/[a-z]/.test(e.key) &&
                    !/[A-Z]/.test(e.key) &&
                    !/ /.test(e.key) &&
                    e.preventDefault()
                  }
                  placeholder="Select or write actor name"
                  options={allActors}
                  onChange={setActorName(1)}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      text: "var(--cardinal)",
                      primary: "var(--cardinal)",
                    },
                  })}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: 66,
                      width: 320,
                      outline: "none",
                      border: "0px solid black",
                      fontSize: "16px",
                      boxShadow: state.isFocused
                        ? "0px 4px 4px red"
                        : "0px 4px 4px #00000040",
                      background: state.isDisabled
                        ? "var(--pink-swan)"
                        : "var(--baby-powder)",
                      borderRadius: 5,
                      paddingLeft: 10,
                    }),
                  }}
                />
                <div className="movieActorNameError nunito-normal-river-bed-50px">
                  {" "}
                  <strong> {repeatedActorName[1]} </strong>
                </div>
              </div>

              {/* actor role */}
              <div className="addMovieactor-role">
                <CreatableSelect
                  isSearchable
                  isClearable
                  value={getActorRolesArray[1]}
                  // className="addMovieactor-role"
                  placeholder="Select or write actor role"
                  isDisabled={!isFilled[0]}
                  formatCreateLabel={(inputText) => `${inputText}`}
                  onKeyDown={(e) =>
                    !/[a-z]/.test(e.key) &&
                    !/[A-Z]/.test(e.key) &&
                    !/ /.test(e.key) &&
                    e.preventDefault()
                  }
                  options={allRoles}
                  onChange={setActorRole(1)}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      text: "var(--cardinal)",
                      primary: "var(--cardinal)",
                    },
                  })}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: 66,
                      width: 320,
                      background: "#fcfcfc",
                      outline: "none",
                      border: "0px solid black",
                      fontSize: "16px",
                      boxShadow: state.isFocused
                        ? "0px 4px 4px red"
                        : "0px 4px 4px #00000040",
                      background: state.isDisabled
                        ? "var(--pink-swan)"
                        : "var(--baby-powder)",
                      borderRadius: 5,
                      paddingLeft: 10,
                    }),
                  }}
                />
                <div className="movieActorRoleError nunito-normal-river-bed-50px">
                  {" "}
                  <strong> {repeatedActorRole[1]} </strong>
                </div>
              </div>

              {/* actor image */}
              <div>
                <input
                  className="addMovieactor-image"
                  placeholder="Enter URL of actor image"
                  name="actorImage"
                  type="text"
                  required
                  disabled={!isFilled[0]}
                  value={getActorImagesArrayInHTMLState[1]}
                  onChange={(e) => {
                    setActorImage(1, e.target.value);
                    validateActor2ImageURL(e.target.value);
                  }}
                />
                <div className="movieActorImageError nunito-normal-river-bed-50px">
                  {" "}
                  <strong>
                    {" "}
                    {repeatedActorImage[1]} {movieActorImage_error_message[1]}{" "}
                    {actor2ImageURLErrorMessage}{" "}
                  </strong>
                </div>
              </div>
              {/* <div className="movieImageError nunito-normal-river-bed-50px"> <strong> {movieActorImage_error_message}  </strong></div> */}
            </div>
          </div>

          {/* actor 2 errors */}
          {/* <div className="actorErrors"> 
              <div className="movieActorNameError nunito-normal-river-bed-50px"> <strong> {repeatedActorName[1]}  </strong></div>
              <div className="movieActorRoleError nunito-normal-river-bed-50px"> <strong> { repeatedActorRole[1] } </strong></div>
              </div>  */}

          {/*3rd Actor */}

          <div>
            <div className="addMovieflex-row-2">
              {/* actor name */}
              <div className="addMovieactor">
                <CreatableSelect
                  value={getActorNames[2]}
                  isSearchable
                  isClearable
                  // className="addMovieactor"
                  formatCreateLabel={(inputText) => `${inputText}`}
                  isDisabled={!isFilled[1]}
                  onKeyDown={(e) =>
                    !/[a-z]/.test(e.key) &&
                    !/[A-Z]/.test(e.key) &&
                    !/ /.test(e.key) &&
                    e.preventDefault()
                  }
                  placeholder="Select or write actor name"
                  options={allActors}
                  onChange={setActorName(2)}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      text: "var(--cardinal)",
                      primary: "var(--cardinal)",
                    },
                  })}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: 66,
                      width: 320,
                      outline: "none",
                      border: "0px solid black",
                      fontSize: "16px",
                      background: state.isDisabled
                        ? "var(--pink-swan)"
                        : "var(--baby-powder)",
                      boxShadow: state.isFocused
                        ? "0px 4px 4px red"
                        : "0px 4px 4px #00000040",
                      borderRadius: 5,
                      paddingLeft: 10,
                    }),
                  }}
                />
                <div className="movieActorNameError nunito-normal-river-bed-50px">
                  {" "}
                  <strong> {repeatedActorName[2]} </strong>
                </div>
              </div>

              {/* actor role */}
              <div className="addMovieactor-role">
                <CreatableSelect
                  isSearchable
                  isClearable
                  value={getActorRolesArray[2]}
                  // className="addMovieactor-role"
                  placeholder="Select or write actor role"
                  formatCreateLabel={(inputText) => `${inputText}`}
                  onKeyDown={(e) =>
                    !/[a-z]/.test(e.key) &&
                    !/[A-Z]/.test(e.key) &&
                    !/ /.test(e.key) &&
                    e.preventDefault()
                  }
                  options={allRoles}
                  isDisabled={!isFilled[1]}
                  onChange={setActorRole(2)}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      text: "var(--cardinal)",
                      primary: "var(--cardinal)",
                    },
                  })}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: 66,
                      width: 320,
                      background: "#fcfcfc",
                      outline: "none",
                      border: "0px solid black",
                      fontSize: "16px",
                      boxShadow: state.isFocused
                        ? "0px 4px 4px red"
                        : "0px 4px 4px #00000040",
                      background: state.isDisabled
                        ? "var(--pink-swan)"
                        : "var(--baby-powder)",
                      borderRadius: 5,
                      paddingLeft: 10,
                    }),
                  }}
                />
                <div className="movieActorRoleError nunito-normal-river-bed-50px">
                  {" "}
                  <strong> {repeatedActorRole[2]} </strong>
                </div>
              </div>

              {/* actor image */}
              <div>
                <input
                  className="addMovieactor-image"
                  placeholder="Enter URL of actor image"
                  name="actorImage"
                  type="text"
                  required
                  disabled={!isFilled[1]}
                  value={getActorImagesArrayInHTML[2]}
                  onChange={(e) => {
                    setActorImage(2, e.target.value);
                    validateActor3ImageURL(e.target.value);
                  }}
                />
                <div className="movieActorImageError nunito-normal-river-bed-50px">
                  {" "}
                  <strong>
                    {" "}
                    {repeatedActorImage[2]} {movieActorImage_error_message[2]}{" "}
                    {actor3ImageURLErrorMessage}{" "}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* actor 3 errors */}
          {/* <div className="actorErrors">
              <div className="movieActorNameError nunito-normal-river-bed-50px"> <strong> {repeatedActorName[2]}  </strong></div>
              <div className="movieActorRoleError nunito-normal-river-bed-50px"> <strong> { repeatedActorRole[2] } </strong></div>
            </div> */}

          {/*4th Actor */}

          <div>
            <div className="addMovieflex-row-2">
              {/* actor name */}
              <div className="addMovieactor">
                <CreatableSelect
                  value={getActorNames[3]}
                  isSearchable
                  isClearable
                  // className="addMovieactor"
                  formatCreateLabel={(inputText) => `${inputText}`}
                  onKeyDown={(e) =>
                    !/[a-z]/.test(e.key) &&
                    !/[A-Z]/.test(e.key) &&
                    !/ /.test(e.key) &&
                    e.preventDefault()
                  }
                  placeholder="Select or write actor name"
                  isDisabled={!isFilled[2]}
                  options={allActors}
                  onChange={setActorName(3)}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      text: "var(--cardinal)",
                      primary: "var(--cardinal)",
                    },
                  })}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: 66,
                      width: 320,
                      outline: "none",
                      fontSize: "16px",
                      background: state.isDisabled
                        ? "var(--pink-swan)"
                        : "var(--baby-powder)",
                      boxShadow: state.isFocused
                        ? "0px 4px 4px red"
                        : "0px 4px 4px #00000040",
                      borderRadius: 5,
                      paddingLeft: 10,
                    }),
                  }}
                />
                <div className="movieActorNameError nunito-normal-river-bed-50px">
                  {" "}
                  <strong> {repeatedActorName[3]} </strong>
                </div>
              </div>

              {/* actor role */}
              <div className="addMovieactor-role">
                <CreatableSelect
                  isSearchable
                  isClearable
                  value={getActorRolesArray[3]}
                  // className="addMovieactor-role"
                  placeholder="Select or write actor role"
                  formatCreateLabel={(inputText) => `${inputText}`}
                  onKeyDown={(e) =>
                    !/[a-z]/.test(e.key) &&
                    !/[A-Z]/.test(e.key) &&
                    !/ /.test(e.key) &&
                    e.preventDefault()
                  }
                  options={allRoles}
                  isDisabled={!isFilled[2]}
                  onChange={setActorRole(3)}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      text: "var(--cardinal)",
                      primary: "var(--cardinal)",
                    },
                  })}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: 66,
                      width: 320,
                      background: "#fcfcfc",
                      outline: "none",
                      border: "0px solid black",
                      fontSize: "16px",
                      boxShadow: state.isFocused
                        ? "0px 4px 4px red"
                        : "0px 4px 4px #00000040",
                      background: state.isDisabled
                        ? "var(--pink-swan)"
                        : "var(--baby-powder)",
                      borderRadius: 5,
                      paddingLeft: 10,
                    }),
                  }}
                />
                <div className="movieActorRoleError nunito-normal-river-bed-50px">
                  {" "}
                  <strong> {repeatedActorRole[3]} </strong>
                </div>
              </div>

              {/* actor image */}
              <div>
                <input
                  className="addMovieactor-image"
                  placeholder="Enter URL of actor image"
                  name="actorImage"
                  type="text"
                  required
                  disabled={!isFilled[2]}
                  value={getActorImagesArrayInHTML[3]}
                  onChange={(e) => {
                    setActorImage(3, e.target.value);
                    validateActor4ImageURL(e.target.value);
                  }}
                />
                <div className="movieActorImageError nunito-normal-river-bed-50px">
                  {" "}
                  <strong>
                    {" "}
                    {repeatedActorImage[3]} {movieActorImage_error_message[3]}{" "}
                    {actor4ImageURLErrorMessage}{" "}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* actor 4 errors */}
          {/* <div className="actorErrors">
              <div className="movieActorNameError nunito-normal-river-bed-50px"> <strong> {repeatedActorName[3]}  </strong></div>
              <div className="movieActorRoleError nunito-normal-river-bed-50px"> <strong> { repeatedActorRole[3] } </strong></div>
            </div> */}

          {/*5th Actor */}

          <div>
            <div className="addMovieflex-row-2">
              {/* actor name */}
              <div className="addMovieactor">
                <CreatableSelect
                  value={getActorNames[4]}
                  isSearchable
                  isClearable
                  // className="addMovieactor"
                  formatCreateLabel={(inputText) => `${inputText}`}
                  onKeyDown={(e) =>
                    !/[a-z]/.test(e.key) &&
                    !/[A-Z]/.test(e.key) &&
                    !/ /.test(e.key) &&
                    e.preventDefault()
                  }
                  placeholder="Select or write actor name"
                  options={allActors}
                  isDisabled={!isFilled[3]}
                  onChange={setActorName(4)}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      text: "var(--cardinal)",
                      primary: "var(--cardinal)",
                    },
                  })}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: 66,
                      width: 320,
                      outline: "none",
                      border: "0px solid black",
                      fontSize: "16px",
                      background: state.isDisabled
                        ? "var(--pink-swan)"
                        : "var(--baby-powder)",
                      boxShadow: state.isFocused
                        ? "0px 4px 4px red"
                        : "0px 4px 4px #00000040",
                      borderRadius: 5,
                      paddingLeft: 10,
                    }),
                  }}
                />
                <div className="movieActorNameError nunito-normal-river-bed-50px">
                  {" "}
                  <strong> {repeatedActorName[4]} </strong>
                </div>
              </div>

              {/* actor role */}
              <div className="addMovieactor-role">
                <CreatableSelect
                  isSearchable
                  isClearable
                  value={getActorRolesArray[4]}
                  // className="addMovieactor-role"
                  placeholder="Select or write actor role"
                  formatCreateLabel={(inputText) => `${inputText}`}
                  options={allRoles}
                  onChange={setActorRole(4)}
                  isDisabled={!isFilled[3]}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      text: "var(--cardinal)",
                      primary: "var(--cardinal)",
                    },
                  })}
                  onKeyDown={(e) =>
                    !/[a-z]/.test(e.key) &&
                    !/[A-Z]/.test(e.key) &&
                    !/ /.test(e.key) &&
                    e.preventDefault()
                  }
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: 66,
                      width: 320,
                      background: "#fcfcfc",
                      outline: "none",
                      border: "0px solid black",
                      fontSize: "16px",
                      boxShadow: state.isFocused
                        ? "0px 4px 4px red"
                        : "0px 4px 4px #00000040",
                      background: state.isDisabled
                        ? "var(--pink-swan)"
                        : "var(--baby-powder)",
                      borderRadius: 5,
                      paddingLeft: 10,
                    }),
                  }}
                />
                <div className="movieActorRoleError nunito-normal-river-bed-50px">
                  {" "}
                  <strong> {repeatedActorRole[4]} </strong>
                </div>
              </div>
              {/* actor image */}

              <div>
                <input
                  className="addMovieactor-image"
                  placeholder="Enter URL of actor image"
                  name="actorImage"
                  type="text"
                  required
                  disabled={!isFilled[3]}
                  value={getActorImagesArrayInHTML[4]}
                  onChange={(e) => {
                    setActorImage(4, e.target.value);
                    validateActor5ImageURL(e.target.value);
                  }}
                />
                <div className="movieActorImageError nunito-normal-river-bed-50px">
                  {" "}
                  <strong>
                    {" "}
                    {repeatedActorImage[4]} {movieActorImage_error_message[4]}{" "}
                    {actor5ImageURLErrorMessage}{" "}
                  </strong>
                </div>
              </div>

              <div> </div>
            </div>
          </div>
        </div>

        {id == 0 && (
          <button
            className="addMovieadd-button neuton-bold-white-30px7"
            disabled={!addIsEnabled}
            onClick={addMovie}
          >
            Add
          </button>
        )}
        {id > 0 && (
          <button
            className="addMovieadd-button neuton-bold-white-30px7"
            disabled={!editIsEnabled}
            onClick={editMovie}
          >
            Edit
          </button>
        )}

        {/* footer */}
        {/* <footer>
              <div className="addMoviefooter"> </div>
              <img className="addMoviefooterLogo" src={props.logo} />
              <div className="addMoviefooterText1"> {props.footerText1}</div>
              <div className="addMoviecopyRightText inter-light-bon-jour-35px2">
                <span>{props.footerText2}</span>
              </div>
            </footer> */}
      </div>
    </div>
  );
}

export default movieForm;
