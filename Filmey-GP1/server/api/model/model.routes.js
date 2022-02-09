const express = require("express");
const queries = require("./model.queries");
const router = express.Router();
const axios = require("axios");
const db = require("../../db/db");
const { json } = require("express");
// var async = require("async");

// router.post("/userBasedCF/:userID", async (req, res, next) => {
//   const { userID } = req.params;
//   return res.json(
//     await axios
//       .post("http://localhost:5000/userBasedCF", {
//         userID: userID,
//       })
//       .then((response) => {
//         return response.data;
//       })
//   );
// });


router.post("/checkThreshold/:userID", async (req, res, next) => {
  const { userID } = req.params;
  
  var threshold = await queries.checkThreshold(userID);
  if(threshold.length>=20)
  {
    return res.json(true)
  }
  else
  {
    return res.json(false)
  }

});



// router.post("/contentBased/:movieId", async (req, res, next) => {
//   const { movieId } = req.params;

//   const title = await queries.getMovieTitle(movieId);

//   return res.json(
//     await axios
//       .post("http://localhost:5000/contentBased", {
//         movieTitle: title[0],
//       })
//       .then((response) => {
//         console.log("response.data")
//         console.log(response.data)
//         return response.data;
//       })
//   );
// });

module.exports = router;
