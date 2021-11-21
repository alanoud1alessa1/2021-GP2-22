const express = require("express");

const queries = require("./movies.queries");

const router = express.Router();
const isAuth = require("../../isAuth");

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {

        const movies = await queries.get(id);

    if (movies) {
      return res.json(movies);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/genre/:id", async (req, res, next) => {
  const { id } = req.params;
  try {

        const movies = await queries.getGenre(id);

    if (movies) {
      return res.json(movies);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/directors/:id", async (req, res, next) => {
  const { id } = req.params;
  try {

        const movies = await queries.getDirectors(id);

    if (movies) {
      return res.json(movies);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/writers/:id", async (req, res, next) => {
  const { id } = req.params;
  try {

        const movies = await queries.getWriters(id);

    if (movies) {
      return res.json(movies);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/languages/:id", async (req, res, next) => {
  const { id } = req.params;
  try {

        const movies = await queries.getLanguages(id);

    if (movies) {
      return res.json(movies);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/casts/:id", async (req, res, next) => {
  const { id } = req.params;
  try {

        const movies = await queries.getCasts(id);

    if (movies) {
      return res.json(movies);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/topMovies/:numberofmovies", async (req, res, next) => {
  const { numberofmovies } = req.params;
  try {

        const movies = await queries.getTopMovies(numberofmovies);

    if (movies) {
      return res.json(movies);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/genresFilter/:genreType", async (req, res, next) => {
  const { genreType } = req.params;
  try {

        const movies = await queries.getBasedOnGenre(genreType);

    if (movies) {
      return res.json(movies);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/review/:id", async (req, res, next) => {
  const { id } = req.params;
  try {

        const reviews = await queries.getMovieReviews(id);

    if (reviews) {
      return res.json(reviews);
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
