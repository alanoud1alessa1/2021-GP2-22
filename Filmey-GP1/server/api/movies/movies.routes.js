

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
  const {movie_id,admin_id} = req.body;
  try {
    const deleteMovie = await queries.deleteMovie(movie_id);
    const AdminDeleteMovie = await queries.AdminDeleteMovie(movie_id,admin_id);

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

  

  
  const {adminID,title,genres,languages,year,length,
    age_guide,trailer_url,poster,description,
    directors,writers,actorNames,actorRoles,actorImages } = req.body;
    //console.log(length.length);

    var yearConverted=Number(year);

  try {
      
       const CheckMovieMessage = await queries.CheckMovie(title,yearConverted);
       const PosterMessage = await queries.CheckPoster(poster);
       const DescriptionMessage = await queries.CheckDescription(description);
       const checkActorImage = await queries.CheckActorImage(actorNames,actorImages);
       console.log(checkActorImage);
      const TrailerMessage = await queries.CheckTrailer(trailer_url);
      
      if(CheckMovieMessage||PosterMessage||DescriptionMessage||TrailerMessage||checkActorImage[0])
      {
        return res.json({CheckMovieMessage,PosterMessage,DescriptionMessage,TrailerMessage,checkActorImage});
      }
    }
    catch{}
      try{


       const movieID = await queries.addMovie(title,yearConverted,length,age_guide,trailer_url,poster,description);
       const genre = await queries.addGenre(movieID,genres);
       const language = await queries.addLanguage(movieID,languages);
       const director = await queries.addDirector(movieID,directors);
       const writer = await queries.addWriter(movieID,writers);
       const actor = await queries.addActor(movieID,actorNames,actorRoles,actorImages);
       const AdminAddMovie = await queries.AdminAddMovie(movieID,adminID);

       return res.json({"movieID":movieID});


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

router.get("/getMovieFormData/:id", async (req, res, next) => {
  console.log("inside");
  const {id} = req.params;
  try {
    const data = await queries.getMovieFormData(id);

    if (data) {
      return res.json(data);
    }
    return next();
  } catch (error) {
    console.log(error);
   // res.statusCode = 409;
    return next(error);
  }
}
);

router.post("/updateMovieInfo/:id", async (req, res, next) => {

  const {id} = req.params
  const { title,genres,languages,year,length,
    age_guide,trailer_url,poster,description,
    directors,writers,actorNames,actorRoles,actorImages } = req.body;

    var yearConverted=Number(year);

  try {

    // const movie = await queries.updateMovieInfo(id , title,yearConverted,length,age_guide,trailer_url,poster,description);
    const genre = await queries.updateGenre(id,genres);
    // const language = await queries.updateLanguage(id,languages);
    // const director = await queries.updateDirector(id,directors);
    // const writer = await queries.updateWriter(id,writers);
    // const actor = await queries.updateActor(id,actorNames,actorRoles,actorImages);

    // if (movie && ) {
    //   return res.json(movie);
    // }
    // return next();
  } catch (error) {
    console.log(error);
   // res.statusCode = 409;
    return next(error);
  }
}
);




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
router.get("/getMovieFormData/:id", async (req, res, next) => {
  console.log("inside");
  const {id} = req.params;
  try {
    const data = await queries.getMovieFormData(id);

    if (data) {
      return res.json(data);
    }
    return next();
  } catch (error) {
    console.log(error);
   // res.statusCode = 409;
    return next(error);
  }
}
);

router.post("/editMovie", async (req , res, next) => {
  
  const {adminID,movie_id,title,genres,languages,year,length,
    age_guide,trailer_url,poster,description,
    directors,writers,actorNames,actorRoles,actorImages } = req.body;

    var yearConverted=Number(year);
    //if(CheckMovieMessage||PosterMessage||DescriptionMessage||TrailerMessage||checkActorImage)

    try {

      console.log("in try")
      
      const CheckTitleForEditMessage = await queries.CheckTitleForEdit(movie_id,title,yearConverted);
      const CheckTrailerForEditMessage = await queries.CheckTrailerForEdit(movie_id,trailer_url);
      const CheckPosterForEditMessage = await queries.CheckPosterForEdit(movie_id,poster);
      const CheckDescriptionForEditMessage = await queries.CheckDescriptionForEdit(movie_id,description);
    //   const checkActorImage = await queries.CheckActorImage(actorNames,actorImages);
    //   console.log(checkActorImage);
    //  const TrailerMessage = await queries.CheckTrailer(trailer_url);
      if(CheckTitleForEditMessage||CheckTrailerForEditMessage||CheckPosterForEditMessage||CheckDescriptionForEditMessage)
     {
       return res.json({CheckTitleForEditMessage,CheckTrailerForEditMessage,CheckPosterForEditMessage,CheckDescriptionForEditMessage});
     }
     
     if(CheckMovieMessage||PosterMessage||DescriptionMessage||TrailerMessage||checkActorImage[0])
     {
       return res.json({CheckMovieMessage,PosterMessage,DescriptionMessage,TrailerMessage,checkActorImage});
     }
   }
   catch{}


    try{
      const movieID = await queries.editMovie(movie_id,title,yearConverted,length,age_guide,trailer_url,poster,description);
      const genre = await queries.editGenre(movie_id,genres);
      const language = await queries.editLanguage(movie_id,languages);
      const director = await queries.editDirector(movie_id,directors);
      const writer = await queries.editWriter(movie_id,writers);
      const actor = await queries.editActor(movie_id,actorNames,actorRoles,actorImages);
      const AdminEditMovie = await queries.AdminEditMovie(movie_id,adminID);

      return res.json({"movieID":movie_id});
 } catch (error) {

   return next(error);
 }


  })



module.exports = router;
