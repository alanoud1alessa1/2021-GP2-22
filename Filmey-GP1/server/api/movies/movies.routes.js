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

router.get("/genresFilterTopFour/:genreType", async (req, res, next) => {
  const { genreType } = req.params;
  try {

        const movies = await queries.getTopFourBasedOnGenre(genreType);

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

router.get("/allGenres/:id", async (req , res, next) => {

  try {
        const allGenres = await queries.getAllGenres();

    if (allGenres) {
      return res.json(allGenres);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.post("/add", async (req, res, next) => {
  const { title, year, length , age_guide ,description, poster , trailer_url} = req.body;
  try {
    const id = await queries.addMovie(title, year, length , age_guide ,description, poster , trailer_url);

    if (id) {
      return res.json(id);
    }
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.get("/rating/:id", async (req, res, next) => {
  const { id } = req.params;
  try {

        const rating = await queries.getRating(id);

    if (rating) {
      return res.json(rating);
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




module.exports = router;
