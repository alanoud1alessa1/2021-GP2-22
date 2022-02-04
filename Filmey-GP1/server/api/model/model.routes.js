const express = require("express");
const queries = require("./model.queries");
const router = express.Router();
const axios = require("axios");
const db = require("../../db/db");
// var async = require("async");

router.post("/userBasedCF/:userID", async (req, res, next) => {
  const { userID } = req.params;
  
  var threshold = await queries.checkThreshold(userID);
  if(threshold.length>=20)
  {
    threshold=true
  }
  else
  {
    threshold=false
  }

  const movies = await queries.getfilteredMovies(userID);
  var topMovieIds = [];
  for (var i = 0; i < movies.length; i++) {
    topMovieIds[i] = movies[i].movie_id;
  }

  return res.json(
    await axios
      .post("http://localhost:5000/userBasedCF", {
        userID: userID,
        threshold:threshold,
        filteredMovies: topMovieIds,
      })
      .then((response) => {
        // console.log("response.data")
        // console.log(response.data)
        return response.data;
      })
  );
});



router.post("/contentBased/:movieId", async (req, res, next) => {
  const { movieId } = req.params;

  const title = await queries.getMovieTitle(movieId);

  return res.json(
    await axios
      .post("http://localhost:5000/contentBased", {
        movieTitle: title[0],
      })
      .then((response) => {
        console.log("response.data")
        console.log(response.data)
        return response.data;
      })
  );
});

module.exports = router;
