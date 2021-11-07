const express = require("express");

const users = require("./users/users.routes");
const admins = require("./admins/admins.routes");
const movies = require("./movies/movies.routes");
const isAuth = require("../isAuth");
const router = express.Router();


router.use("/users", users);
router.use("/movies", movies);
router.use("/admins", admins);

// router.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//       error: {
//           message: error.message
//       }
//   });
//   next(error);
// });



router.get("/", isAuth,(req, res) => {
  return res.json("here!");
});

module.exports = router;
