const express = require("express");

const queries = require("./movies.queries");

const router = express.Router();
const isAuth = require("../../isAuth");

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    // TODO: should we validate the ID?
    const movies = await queries.get(id);
    if (movies) {
      return res.json(movies);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});



// router.put("/", async (req, res, next) => {
//   const { email, username, password , date_of_birth , location} = req.body;
//   try {
//     const token = await queries.signup(email, username, password , date_of_birth , location);
//     if (token) {
//       return res.json(token);
//     }
//     return next();
//   } catch (error) {
//     console.log(error);
//     res.statusCode = 409;
//     return next(error);
//   }
// });


// router.post("/register", async (req, res, next) => {
//   const { email, username, password , date_of_birth ,gender, location} = req.body;
//   try {
//     const token = await queries.signup(email, username, password , date_of_birth ,gender, location);
//     if (token) {
//       return res.json(token);
//     }
//     return next();
//   } catch (error) {
//     console.log(error);
//     res.statusCode = 409;
//     return next(error);
//   }
// });

// router.post("/login", async (req, res, next) => {

//   const { username, password } = req.body;

//   try {
//     const token = await queries.login(username, password);

//     if (token) {
//       return res.json(token);
//     }
//     return next();
//   } catch (error) {
//     res.statusCode = 401;
//     return next(error);
//   }
// });

module.exports = router;
