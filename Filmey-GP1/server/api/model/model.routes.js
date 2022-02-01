const express = require("express");
const queries = require("./model.queries");
const router = express.Router();
const axios = require("axios");
const db = require("../../db/db");
// var async = require("async");

router.post("/userBasedCF/:userID", async (req, res, next) => {
  const { userID } = req.params;

  const movies = await queries.getfilteredMovies();
  var topMovieIds = [];
  for (var i = 0; i < movies.length; i++) {
    topMovieIds[i] = movies[i].movie_id;
  }

  return res.json(
    await axios
      .post("http://localhost:5000/userBasedCF", {
        userID: userID,
        filteredMovies: topMovieIds,
      })
      .then((response) => {
        return response.data;
      })
  );
});

module.exports = router;
