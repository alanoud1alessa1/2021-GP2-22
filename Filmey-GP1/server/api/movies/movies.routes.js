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

router.get("/genresFilter/:genreType/:limit", async (req, res, next) => {
  const { genreType  , limit} = req.params;
  try {

        const movies = await queries.getBasedOnGenre(genreType , limit);

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

router.get("/allLanguages/:id", async (req , res, next) => {

  try {
        const allLanguages = await queries.getAllLanguages();

    if (allLanguages) {
     // console.log(allLanguages)
      return res.json(allLanguages);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/allAgeGuide/:id", async (req , res, next) => {

  try {
        const allAgeGuide = await queries.getAllAgeGuide();

    if (allAgeGuide) {
     // console.log(allAgeGuide)
      return res.json(allAgeGuide);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

// router.get("/allAgeGuide/:id", async (req , res, next) => {

//   try {
//         const allAgeGuide = await queries.getAllAgeGuide();

//     if (allAgeGuide) {
//      // console.log(allAgeGuide)
//       return res.json(allAgeGuide);
//     }
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });

router.get("/allDirectors/:id", async (req , res, next) => {

  try {
        const allDirectors = await queries.getAllDirectors();

    if (allDirectors) {
     // console.log(allDirectors)
      return res.json(allDirectors);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/allWriters/:id", async (req , res, next) => {

  try {
        const allWriters = await queries.getAllWriters();

    if (allWriters) {
     // console.log(allWriters)
      return res.json(allWriters);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/allActors/:id", async (req , res, next) => {

  try {
        const allActors = await queries.getAllActorss();

    if (allActors) {
      //console.log(allActors)
      return res.json(allActors);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

router.get("/allRoles/:id", async (req , res, next) => {

  try {
        const allRoles = await queries.getAllRoles();

    if (allRoles) {
     // console.log(allAgeGuide)
      return res.json(allRoles);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});


// router.post("/add", async (req, res, next) => {
//   //console.log(req.body);

//   // const { title, year, length , age_guide ,description, poster , trailer_url} = req.body;
//   // try {
//   //   const id = await queries.addMovie(title, year, length , age_guide ,description, poster , trailer_url);

//   //   if (id) {
//   //     return res.json(id);
//   //   }
//   //   return next();
//   // } catch (error) {
//   //   console.log(error);
//   //   return next(error);
//   // }
// });

router.post("/delete", async (req, res, next) => {
  const {movie_id} = req.body;
  console.log(movie_id);
  try {
    const result = await queries.deleteMovie(movie_id);

    if (result) {
      return res.json(result);
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


router.get("/allGenres", async (req , res, next) => {

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

// router.get("/allGenres", async (req , res, next) => {

//   try {
//         const allGenres = await queries.getAllGenres();

//     if (allGenres) {
//       return res.json(allGenres);
//     }
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });


router.get("/getActorImage/:actorName", async (req , res, next) => {
  //console.log("ggg");
  //console.log(req.params);
  const { actorName } = req.params
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

router.post("/addMovie", async (req , res, next) => {

  

  
  const {title,genres,languages,year,length,
    age_guide,trailer_url,poster,description,
    directors,writers,actorNames,actorRoles,actorImages } = req.body;
    console.log(length.length);

  try {
        const movie = await queries.addMovie(title,genres,year,length,age_guide
          ,trailer_url,poster,description);

          if(movie.MovieMessage)
          {
            console.log(movie.MovieMessage);
            return res.json(movie);
          }
        
       const genre = await queries.addGenre(movie,genres);
       const language = await queries.addLanguage(movie,languages);
       const director = await queries.addDirector(movie,directors);
       const writer = await queries.addWriter(movie,writers);
       const actor = await queries.addActor(movie,actorNames,actorRoles,actorImages);


    // if (movie_id) {
    //   const genre = await queries.addGenre(movie_id,genres);
    //   console.log(movie_id);
    //   return res.json(movie_id);
    // }
    // return next();
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
