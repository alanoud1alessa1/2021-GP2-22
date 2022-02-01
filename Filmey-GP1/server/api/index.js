const express = require("express");

const users = require("./users/users.routes");
const admins = require("./admins/admins.routes");
const movies = require("./movies/movies.routes");
const model = require("./model/model.routes");
const isAuth = require("../isAuth");
const nodemailer = require("./node-mail/index");


const router = express.Router();


router.use("/users", users);
router.use("/movies", movies);
router.use("/admins", admins);
router.use("/model", model);
router.use("/node-mail" , nodemailer);



router.get("/", isAuth,(req, res) => {
  return res.json("here!");
});

module.exports = router;
