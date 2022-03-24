
// module.exports = router;
const express = require("express");

const queries = require("./movies.queries");

const router = express.Router();
const isAuth = require("../../isAuth");
const { json } = require("express");
const axios = require("axios");

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


//Get Whats On movies
router.get("/whatsOnMovies/:numberofmovies", async (req, res, next) => {
  const { numberofmovies } = req.params;
  try {
    const movies = await queries.getWhatsOnMovies(numberofmovies);
    console.log(movies)

    if (movies) {
      return res.json(movies);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

//Get movie status
router.get("/movieStatus/:movieId", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const movieStatus = await queries.getMovieStatus(movieId);
    console.log(movieStatus)

    if (movieStatus) {
      return res.json(movieStatus);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

//Get release date
router.get("/getReleaseDate/:movieId", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const releaseDate = await queries.getReleaseDate(movieId);
    console.log(releaseDate)

    if (releaseDate) {
      return res.json(releaseDate);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});


//Get Whats On movies
router.get("/inCinemas/:movieId", async (req, res, next) => {
  const { movieId } = req.params;
  try {
    const cinemas = await queries.getInCinemas(movieId);
    console.log(cinemas)

    if (cinemas) {
      return res.json(cinemas);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

//Get Coming Soon movies
router.get("/comingSoonMovies/:numberofmovies", async (req, res, next) => {
  const { numberofmovies } = req.params;
  try {
    const movies = await queries.getComingSoonMovies(numberofmovies);

    if (movies) {
      return res.json({movies});
    }
    return next();
  } catch (error) {
    return next(error);
  }
});


router.get("/genresFilter/:genreType/:limit", async (req, res, next) => {
  const { genreType, limit } = req.params;
  try {
    const movies = await queries.getBasedOnGenre(genreType, limit);

    if (movies) {
      return res.json(movies);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/review/:id/:userId", async (req, res, next) => {
  const { id, userId } = req.params;
  try {
    const reviews = await queries.getMovieReviews(id, userId);
    console.log(reviews);

    if (reviews) {
      return res.json(reviews);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/allGenres/:id", async (req, res, next) => {
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

router.get("/allLanguages/:id", async (req, res, next) => {
  try {
    const allLanguages = await queries.getAllLanguages();

    if (allLanguages) {
      return res.json(allLanguages);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/allAgeGuide/:id", async (req, res, next) => {
  try {
    const allAgeGuide = await queries.getAllAgeGuide();

    if (allAgeGuide) {
      return res.json(allAgeGuide);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/allDirectors/:id", async (req, res, next) => {
  try {
    const allDirectors = await queries.getAllDirectors();

    if (allDirectors) {
      return res.json(allDirectors);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/allWriters/:id", async (req, res, next) => {
  try {
    const allWriters = await queries.getAllWriters();

    if (allWriters) {
      return res.json(allWriters);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/allActors/:id", async (req, res, next) => {
  try {
    const allActors = await queries.getAllActorss();

    if (allActors) {
      return res.json(allActors);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/allRoles/:id", async (req, res, next) => {
  try {
    const allRoles = await queries.getAllRoles();

    if (allRoles) {
      return res.json(allRoles);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.post("/delete", async (req, res, next) => {
  const { movie_id, admin_id } = req.body;
  try {
    const deleteMovie = await queries.deleteMovie(movie_id);
    const AdminDeleteMovie = await queries.AdminDeleteMovie(movie_id, admin_id);

    //delete movie from contentBased csv file
    const contentBasedPreprocessing = await axios
      .post("http://localhost:5000/contentBasedPreprocessing", {
        movieID: movie_id,
        status: "Delete",
      })
      .then((response) => {});

    if (deleteMovie) {
      console.log("inside");
      return res.json(deleteMovie);
    }
    return next();
  } catch (error) {
    console.log("error");
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

router.get("/allGenres", async (req, res, next) => {
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

router.get("/getActorImage/:actorName", async (req, res, next) => {
  const { actorName } = req.params;
  console.log("/getActorImage/:actorName");
  console.log(actorName);

  try {
    const actorImage = await queries.getActorImage(actorName);

    if (actorImage) {
      return res.json(actorImage);
    }
    return next();
  } catch (error) {
    console.log("error");
    return next(error);
  }
});

router.post("/addMovie", async (req, res, next) => {
  const {
    adminID,
    title,
    genres,
    languages,
    year,
    length,
    age_guide,
    trailer_url,
    poster,
    description,
    directors,
    writers,
    actorNames,
    actorRoles,
    actorImages,
  } = req.body;

  console.log(adminID);

  var yearConverted = Number(year);

  try {
    const PosterMessage = await queries.CheckPoster(poster);
    const DescriptionMessage = await queries.CheckDescription(description);
    const checkActorImage = await queries.CheckActorImage(
      actorNames,
      actorImages
    );
    console.log(checkActorImage);
    const TrailerMessage = await queries.CheckTrailer(trailer_url);

    if (
      PosterMessage ||
      DescriptionMessage ||
      TrailerMessage ||
      checkActorImage
    ) {
      return res.json({
        PosterMessage,
        DescriptionMessage,
        TrailerMessage,
        checkActorImage,
      });
    }
  } catch {}
  try {
    const movieID = await queries.addMovie(
      title,
      yearConverted,
      length,
      age_guide,
      trailer_url,
      poster,
      description
    );
    const genre = await queries.addGenre(movieID, genres);
    const language = await queries.addLanguage(movieID, languages);
    const director = await queries.addDirector(movieID, directors);
    const writer = await queries.addWriter(movieID, writers);
    const actor = await queries.addActor(
      movieID,
      actorNames,
      actorRoles,
      actorImages
    );
    const AdminAddMovie = await queries.AdminAddMovie(movieID, adminID);

    //add movie to contentBased csv file
    const contentBasedPreprocessing = await axios
      .post("http://localhost:5000/contentBasedPreprocessing", {
        movieID: movieID,
        status: "Add",
      })
      .then((response) => {});

    return res.json({ movieID: movieID });
  } catch (error) {
    return next(error);
  }
});

router.get("/getMovieFormData/:id", async (req, res, next) => {
  console.log("inside");
  const { id } = req.params;
  try {
    const data = await queries.getMovieFormData(id);

    if (data) {
      return res.json(data);
    }
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/updateMovieInfo/:id", async (req, res, next) => {
  const { id } = req.params;
  const {
    title,
    genres,
    languages,
    year,
    length,
    age_guide,
    trailer_url,
    poster,
    description,
    directors,
    writers,
    actorNames,
    actorRoles,
    actorImages,
  } = req.body;

  var yearConverted = Number(year);

  try {
    const genre = await queries.updateGenre(id, genres);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/checkTitleForAdd", async (req, res, next) => {
  const { title } = req.body;

  try {
    const checkTitleForAdd = await queries.checkTitleForAdd(title);
    return res.json(checkTitleForAdd);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/checkTitleForEdit", async (req, res, next) => {
  const { movie_id, title } = req.body;
  console.log(movie_id, title);

  try {
    const checkTitleForEdit = await queries.checkTitleForEdit(movie_id, title);
    console.log(checkTitleForEdit)
    return res.json(checkTitleForEdit);
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.post("/editMovie", async (req, res, next) => {
  const {
    adminID,
    movie_id,
    title,
    genres,
    languages,
    year,
    length,
    age_guide,
    trailer_url,
    poster,
    description,
    directors,
    writers,
    actorNames,
    actorRoles,
    actorImages,
  } = req.body;

  var yearConverted = Number(year);

  try {
    console.log("edit11 movie");

    const CheckTrailerForEditMessage = await queries.CheckTrailerForEdit(
      movie_id,
      trailer_url
    );
    const CheckPosterForEditMessage = await queries.CheckPosterForEdit(
      movie_id,
      poster
    );
    console.log('CheckDescriptionForEditMessage')
    const CheckDescriptionForEditMessage =
      await queries.CheckDescriptionForEdit(movie_id, description);
    console.log('CheckDescriptionForEditMessage')
    console.log(CheckDescriptionForEditMessage)

    if (
      CheckTrailerForEditMessage ||
      CheckPosterForEditMessage ||
      CheckDescriptionForEditMessage
    ) {
      return res.json({
        CheckTrailerForEditMessage,
        CheckPosterForEditMessage,
        CheckDescriptionForEditMessage,
      });
    }
  } catch {
    console.log('in catch')
  }

  try {
    console.log("no error messages")
    const movieID = await queries.editMovie(
      movie_id,
      title,
      yearConverted,
      length,
      age_guide,
      trailer_url,
      poster,
      description
    );
    const genre = await queries.editGenre(movie_id, genres);
    const language = await queries.editLanguage(movie_id, languages);
    const director = await queries.editDirector(movie_id, directors);
    const writer = await queries.editWriter(movie_id, writers);
    const actor = await queries.editActor(
      movie_id,
      actorNames,
      actorRoles,
      actorImages
    );
    const AdminEditMovie = await queries.AdminEditMovie(movie_id, adminID);

    //edit movie in contentBased csv file
    const contentBasedPreprocessing = await axios
      .post("http://localhost:5000/contentBasedPreprocessing", {
        movieID: movieID,
        status: "SaudiCinema",
      })
      .then((response) => {});

    return res.json({ movieID: movie_id });
  } catch (error) {
    return next(error);
  }
});

router.get(
  "/getMovieFormData/:id",
  async (req, res, next) => {
    console.log("inside");
    const { id } = req.params;
    try {
      const data = await queries.getMovieFormData(id);

      if (data) {
        return res.json(data);
      }
      return next();
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },

  router.get("/ifReview/:id/:userID", async (req, res, next) => {
    console.log("in ifReview");
    const { id, userID } = req.params;
    console.log(req.params);
    const result = await queries.ifReview(id, userID);
    if (result) {
      const reviews = await queries.getMovieReviews(id, userID);
      console.log({ result, reviews });

      if (reviews) {
        return res.json({ result, reviews });
      }
    }
    return res.json(result);
  }),

  router.get("/review/:id", async (req, res, next) => {
    const { id } = req.params;
    try {
      const reviews = await queries.getReviews(id);
      console.log(reviews);

      if (reviews) {
        return res.json(reviews);
      }
      return next();
    } catch (error) {
      return next(error);
    }
  }),

  

  
);




module.exports = router;

