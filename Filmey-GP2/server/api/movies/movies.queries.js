
const db = require("../../db/db");
const auth = require("../../auth");
const tableNames = require("../../constents/tableNames");

module.exports = {
  async get(movie_id) {
    return db("Movie").select("*").where({
      movie_id: movie_id,
    });
  },

  async getGenre(movie_id) {
    return db("Movie_Genre")
      .select("genre")
      .innerJoin("Genre", "Movie_Genre.genre_id", "Genre.genre_id")
      .where({
        movie_id: movie_id,
      });
  },

  async getDirectors(movie_id) {
    return db("Movie_Director")
      .select("director")
      .innerJoin(
        "Director",
        "Movie_Director.director_id",
        "Director.director_id"
      )
      .where({
        movie_id: movie_id,
      });
  },

  async getWriters(movie_id) {
    return db("Movie_Writer")
      .select("writer")
      .innerJoin("Writer", "Movie_Writer.writer_id", "Writer.writer_id")
      .where({
        movie_id: movie_id,
      });
  },

  async getLanguages(movie_id) {
    return db("Movie_Language")
      .select("language")
      .innerJoin(
        "Language",
        "Movie_Language.language_id",
        "Language.language_id"
      )
      .where({
        movie_id: movie_id,
      });
  },

  async getCasts(movie_id) {
    return db("Role")
      .select("actor", "actor_image_url", "role")
      .innerJoin("Actor", "Role.actor_id", "Actor.actor_id")
      .where({
        movie_id: movie_id,
      });
  },

  async getTopMovies(numberofmovies) {
    return db("Movie AS M")
      .select(
        "M.movie_id",
        "M.poster",
        db.raw("ROUND(AVG(rating),1)::int AS total_rating"),
        "M.year"
      )
      .leftJoin("Rating AS R", "M.movie_id", "R.movie_id")
      .where("M.is_deleted", "=", false)
      .groupBy("M.movie_id", "poster", "year")
      .orderByRaw("total_rating DESC NULLS LAST")
      .orderBy("year", "desc")
      .limit(numberofmovies);
  },

  async getBasedOnGenre(genreType, limit) {
    return await db
      .select(
        "MG.movie_id",
        "title",
        "poster",
        db.raw("ROUND(AVG(coalesce(rating , 0)),1) AS total_rating")
      )
      .from("Movie_Genre AS MG")
      .leftJoin("Genre AS G", "G.genre_id", "MG.genre_id")
      .where("G.genre", "=", genreType)
      .leftJoin("Movie AS M", "MG.movie_id", "M.movie_id")
      .leftJoin("Rating AS R", "MG.movie_id", "R.movie_id")
      .where("M.is_deleted", "=", false)
      .groupBy("MG.movie_id", "title", "poster")
      .orderBy("total_rating", "desc", { nulls: "last" })
      .orderBy("MG.movie_id", "asc")
      .limit(limit);
  },

  async getMovieReviews(movie_id, userID) {
    return db("Review AS R")
      .select(["review", "username", "review_id"])
      .where("U.user_id", "!=", userID)
      .where({
        movie_id: movie_id,
        is_deleted: false,
      })
      .leftJoin("User AS U", "R.user_id", "U.user_id")
      .orderBy("created_at", "desc");
  },

  async getAllGenres() {
    return db("Genre").select("genre");
  },

  async getAllLanguages() {
    return db("Language").distinct("language");
  },

  async getAllAgeGuide() {
    return db("Movie").distinct("age_guide");
  },

  async getAllDirectors() {
    return db("Director").distinct("director");
  },

  async getAllWriters() {
    return db("Writer").distinct("writer");
  },

  async getAllActorss() {
    return db("Actor").distinct("actor");
  },

  async getAllRoles() {
    return db("Role").distinct("role");
  },

  async getRating(movie_id) {
    return db
      .select(
        "movie_id",
        db.raw("ROUND(AVG(rating),1) AS total_rating"),
        db.raw("COUNT(rating) AS total_users")
      )
      .from("Rating")
      .where({ movie_id: movie_id })
      .groupByRaw("movie_id");
  },

  async CheckPoster(poster) {
    let checkPoster = await db(tableNames.movie)
      .where({
        poster: poster,
      })
      .first()
      .returning("*");

    if (checkPoster) {
      var message = "This poster is for another movie";

      return message;
    }
  },

  async CheckDescription(description) {
    let checkDescription = await db(tableNames.movie)
      .where({
        description: description,
      })
      .first()
      .returning("*");

    if (checkDescription) {
      var message = "This description is for another movie";

      return message;
    }
  },

  async CheckTrailer(trailer_url) {
    let checkTrailer = await db(tableNames.movie)
      .where({
        trailer_url: trailer_url,
      })
      .first()
      .returning("*");

    if (checkTrailer) {
      var message = "This trailer is for another movie";

      return message;
    }
  },

  async checkTitleForAdd(title) {
    console.log(title);
    let checkTitleForAdd = await db("Movie")
      .where({
        title: title,
      })
      .first()
      .returning("*");
    console.log(checkTitleForAdd);
    if (checkTitleForAdd) {
      var message = "This movie already exists";
      return message;
    }

    return;
  },

  async CheckActorImage(actorNames, actorImages) {
    var length = actorImages.length;
    var message = [];
    for (var i = 0; i < length; i++) {
      console.log(actorImages[i]);

      let checkActorImage = await db(tableNames.actor)
        .where({
          actor_image_url: actorImages[i],
        })
        .returning("*")
        .pluck("actor");
      console.log(checkActorImage[0]);
      if (checkActorImage[0]) {
        if (actorNames[i] != checkActorImage[0]) {
          message[i] = "Image belongs to another actor";
          return message;
        }
      }
    }

    return;
  },

  async addMovie(
    title,
    yearConverted,
    length,
    age_guide,
    trailer_url,
    poster,
    description
  ) {
    let movie_id = await db
      .select("movie_id")
      .from(tableNames.movie)
      .orderBy("movie_id", "desc")
      .returning("*")
      .pluck("movie_id");
    movie_id = movie_id[0] + 1;

    console.log("addMovie");
    console.log(yearConverted);
    console.log(movie_id);

    let movie = await db(tableNames.movie)
      .insert({
        movie_id: movie_id,
        title: title,
        year: yearConverted,
        length: length,
        age_guide: age_guide,
        description: description,
        poster: poster,
        trailer_url: trailer_url,
      })
      .returning("*");

    if (movie) {
      return movie[0].movie_id;
    }
    return;
  },

  async AdminAddMovie(movie_id, admin_id) {
    let AdminAddMovie = await db("Admin_Add_Movie")
      .insert({
        movie_id: movie_id,
        admin_id: admin_id,
      })
      .returning("*");
    return AdminAddMovie;
  },

  async AdminDeleteMovie(movie_id, admin_id) {
    console.log(movie_id, admin_id);
    let AdminDeleteMovie = await db("Admin_Delete_Movie")
      .insert({
        movie_id: movie_id,
        admin_id: admin_id,
      })
      .returning("*");
    return AdminDeleteMovie;
  },

  async AdminEditMovie(movie_id, admin_id) {
    let AdminEditMovie = await db("Admin_Edit_Movie")
      .insert({
        movie_id: movie_id,
        admin_id: admin_id,
      })
      .returning("*");
    return AdminEditMovie;
  },

  async addGenre(movie_id, genres) {
    var arrayofGenreID = new Array();
    for (const genre of genres) {
      let genre_id = await db("Genre")
        .where({
          genre: genre,
        })
        .returning("*")
        .pluck("genre_id");
      arrayofGenreID.push(genre_id[0]);
    }

    //insert movie id with  genre id
    for (const id of arrayofGenreID) {
      let Movie_Genre = await db("Movie_Genre")
        .insert({
          movie_id: movie_id,
          genre_id: id,
        })
        .returning("*");
      console.log(Movie_Genre);
    }
    return;
  },

  async addLanguage(movie_id, languages) {
    var arrayofLanguageID = new Array();
    for (const language of languages) {
      let language_id = await db("Language")
        .where({
          language: language,
        })
        .returning("*")
        .pluck("language_id");
      arrayofLanguageID.push(language_id[0]);
    }

    //insert movie id with  lanaguage id
    for (const id of arrayofLanguageID) {
      let Movie_Language = await db("Movie_Language")
        .insert({
          movie_id: movie_id,
          language_id: id,
        })
        .returning("*");
      console.log(Movie_Language);
    }

    return;
  },

  async addDirector(movie_id, directors) {
    let newID = await db
      .select("director_id")
      .from(tableNames.director)
      .orderBy("director_id", "desc")
      .returning("*")
      .pluck("director_id");
    newID = newID[0] + 1;

    var arrayofDirectorsID = new Array();
    for (const director of directors) {
      console.log(director);
      let director_id = await db("Director")
        .where({
          director: director,
        })
        .returning("*")
        .pluck("director_id");
      if (director_id[0]) {
        arrayofDirectorsID.push(director_id[0]);
        console.log(director_id[0]);
      } else {
        director_id = await db("Director")
          .insert({
            director_id: newID,
            director: director,
          })
          .returning("*");
        newID = newID + 1;
        console.log("director_id2");
        console.log(director_id);
        arrayofDirectorsID.push(director_id[0].director_id);
      }
    }

    //insert movie id with  lanaguage id
    for (const id of arrayofDirectorsID) {
      console.log(id);
      let Movie_Director = await db("Movie_Director")
        .insert({
          movie_id: movie_id,
          director_id: id,
        })
        .returning("*");
      console.log(Movie_Director);
    }
    return;
  },

  async addWriter(movie_id, writers) {
    let newID = await db
      .select("writer_id")
      .from(tableNames.writer)
      .orderBy("writer_id", "desc")
      .returning("*")
      .pluck("writer_id");
    newID = newID[0] + 1;

    var arrayofWritersID = new Array();
    for (const writer of writers) {
      let writer_id = await db("Writer")
        .where({
          writer: writer,
        })
        .returning("*")
        .pluck("writer_id");
      if (writer_id[0]) {
        arrayofWritersID.push(writer_id[0]);
      }
      if (!writer_id[0]) {
        writer_id = await db("Writer")
          .insert({
            writer_id: newID,
            writer: writer,
          })
          .returning("*");
        newID = newID + 1;
        console.log(writer_id);
        arrayofWritersID.push(writer_id[0].writer_id);
      }
    }

    //insert movie id with  lanaguage id
    for (const id of arrayofWritersID) {
      let Movie_Writer = await db("Movie_Writer")
        .insert({
          movie_id: movie_id,
          writer_id: id,
        })
        .returning("*");
      console.log(Movie_Writer);
    }
    return;
  },

  async getActorImage(actorName) {
    let CheckActor = await db(tableNames.actor)
      .where({
        actor: actorName,
      })
      .returning("*");
    //console.log(CheckActor);
    if (CheckActor[0]) {
      let actorImage = await db(tableNames.actor)
        .where({
          actor: actorName,
        })
        .returning("*")
        .pluck("actor_image_url");

      return actorImage[0];
    } else {
      var message = { NoActorImage: "new actor no image" };
      return message;
    }
  },

  async addActor(movie_id, actorNames, actorRoles, actorImages) {
    let newID = await db
      .select("actor_id")
      .from(tableNames.actor)
      .orderBy("actor_id", "desc")
      .returning("*")
      .pluck("actor_id");
    newID = newID[0] + 1;

    var numOfActors = actorNames.length;

    var arrayofActorID = new Array();

    for (var i = 0; i < numOfActors; i++) {
      let actor_id = await db(tableNames.actor)
        .where({
          actor: actorNames[i],
        })
        .returning("*")
        .pluck("actor_id");
      if (actor_id[0]) {
        let updateImage = await db(tableNames.actor)
          .update({
            actor_image_url: actorImages[i],
          })
          .where({
            actor_id: actor_id[0],
          })
          .returning("*");
        arrayofActorID.push(actor_id[0]);
      } else {
        actor_id = await db(tableNames.actor)
          .insert({
            actor_id: newID,
            actor: actorNames[i],
            actor_image_url: actorImages[i],
          })
          .returning("*");
        newID = newID + 1;
        arrayofActorID.push(actor_id[0].actor_id);
      }
    }

    console.log(arrayofActorID);

    var rolesIndex = 0;
    for (const id of arrayofActorID) {
      let Role = await db("Role")
        .insert({
          movie_id: movie_id,
          actor_id: id,
          role: actorRoles[rolesIndex],
        })
        .returning("*");
      rolesIndex = rolesIndex + 1;
      console.log(Role);
    }
    return;
  },

  async getMovieFormData(id) {
    let movieInfo = await db(tableNames.movie).select("*").where({
      movie_id: id,
    });

    let genre_ids = await db("Movie_Genre")
      .select("*")
      .where({
        movie_id: id,
      })
      .returning("*")
      .pluck("genre_id");

    var arrayofGenres = new Array();

    for (const id of genre_ids) {
      let genre = await db("Genre")
        .select("*")
        .where({
          genre_id: id,
        })
        .returning("*")
        .pluck("genre");
      arrayofGenres.push(genre[0]);
    }

    let language_ids = await db(tableNames.movie_Language)
      .select("*")
      .where({
        movie_id: id,
      })
      .returning("*")
      .pluck("language_id");

    var arrayofLanguages = new Array();

    for (const id of language_ids) {
      // console.log(id);
      let language = await db(tableNames.language)
        .select("*")
        .where({
          language_id: id,
        })
        .returning("*")
        .pluck("language");
      arrayofLanguages.push(language[0]);
    }

    var actorInfoArray = new Array();

    let movieRoles = await db(tableNames.role)
      .select("*")
      .where({
        movie_id: id,
      })
      .returning("*");
    for (const actorId of movieRoles) {
      console.log(actorId);
      let movieActors = await db(tableNames.actor).select("*").where({
        actor_id: actorId.actor_id,
      });
      movieRole = movieRoles[0].role;
      actorName = movieActors[0].actor;
      actorImage = movieActors[0].actor_image_url;

      actorInfoArray.push([{ movieRole, actorName, actorImage }]);
    }

    var arrayofDirectors = new Array();

    let director_ids = await db(tableNames.movie_Director)
      .select("*")
      .where({
        movie_id: id,
      })
      .returning("*")
      .pluck("director_id");
    console.log("director_ids");
    console.log(director_ids);

    for (const id of director_ids) {
      let movieDirectors = await db(tableNames.director)
        .select("*")
        .where({
          director_id: id,
        })
        .returning("*")
        .pluck("director");
      arrayofDirectors.push(movieDirectors[0]);
    }

    var arrayofWriters = new Array();

    let writer_ids = await db(tableNames.movie_Writer)
      .select("*")
      .where({
        movie_id: id,
      })
      .returning("*")
      .pluck("writer_id");
    console.log(writer_ids);

    for (const id of writer_ids) {
      let movieWriter = await db(tableNames.writer)
        .select("*")
        .where({
          writer_id: id,
        })
        .returning("*")
        .pluck("writer");
      arrayofWriters.push(movieWriter[0]);
    }

    console.log(actorInfoArray);
    console.log(arrayofWriters);
    console.log(arrayofDirectors);

    console.log(movieInfo);
    console.log(arrayofGenres);
    console.log(arrayofLanguages);
    return {
      movieInfo,
      arrayofGenres,
      arrayofLanguages,
      actorInfoArray,
      arrayofDirectors,
      arrayofWriters,
    };
  },

  async deleteMovie(movie_id) {
    let deleteMovie = await db(tableNames.movie)
      .where({
        movie_id: movie_id,
      })
      .update({
        is_deleted: true,
      })
      .returning("*");

    let deleteMovieRating = await db(tableNames.rating)
      .where({
        movie_id: movie_id,
      })
      .update({
        is_deleted: true,
      })
      .returning("*");

    let deleteMovieReview = await db(tableNames.review)
      .where({
        movie_id: movie_id,
      })
      .update({
        is_deleted: true,
      })
      .returning("*");
    if (deleteMovie) {
      return deleteMovie;
    }
    return;
  },

  async updateMovieInfo(
    movie_id,
    title,
    year,
    length,
    age_guide,
    trailer_url,
    poster,
    description
  ) {
    let movieUpdated = await db("Movie")
      .where("movie_id", "=", movie_id)
      .update({
        title: title,
        year: year,
        length: length,
        age_guide: age_guide,
        description: description,
        poster: poster,
        trailer_url: trailer_url,
      })
      .returning("*");

    console.log(movieUpdated);
    return movieUpdated;
  },

  async updateGenre(id, genres) {
    // length of updated genres
    var genresLength = genres.length;

    var arrayofNewGenreID = new Array();
    var arrayofExistGenreID = new Array();

    //get exist genres
    let existGenresIDs = await db(tableNames.Movie_Genre)
      .where({
        movie_id: movie_id,
      })
      .returning("*")
      .pluck("genre_id");

    for (const existGenreId of existGenresIDs) {
      arrayofExistGenreID.push(existGenreId);
    }

    //get updated genres
    for (const genre of genres) {
      let genre_id = await db("Genre")
        .where({
          genre: genre,
        })
        .returning("*")
        .pluck("genre_id");

      // Genre ID
      arrayofNewGenreID.push(genre_id[0]);
    }

    // length of exist genres
    var genresLength = genres.length;

    //Update
    for (var i = 0; i < genresLength; i++) {
      await db(tableNames.movie_Genre)
        .where({
          movie_id: movie_id,
          genre_id: arrayofExistGenreID[i],
        })
        .update({
          genre_id: arrayofNewGenreID[i],
        })
        .returning("*");
    }

    return True;
  },

  async checkTitleForEdit(movie_id, title) {
    let movieOfTitle = await db(tableNames.movie)
    .select('*')
      .where({
        title: title,
      })
      .returning("*");

      //get row of given movie_id
      let movie = await db(tableNames.movie)
    .select('*')
      .where({
        movie_id: movie_id,
      })
      .returning("*");
      
    try {
      if (movieOfTitle[0].movie_id) {
        if (movie_id != movieOfTitle[0].movie_id) {
          if (movie[0].is_in_cinema==false && movie[0].is_coming_soon==false)
          {
            console.log('This movie already exists')
            var message = "This movie already exists";
            return message;

          }
          else{
            if(movieOfTitle[0].is_in_cinema==false && movieOfTitle[0].is_coming_soon==false)
          {
            console.log('This movie already exists')
            var message = "This movie already exists";
          return message;
        }
      }
        }
      }
    } catch {
      console.log("catch")
      return;
    }
  },

  async CheckPosterForEdit(movie_id, poster) {
    console.log(poster);
    let movieOfPoster = await db(tableNames.movie)
    .select('*')
    .where({
      poster: poster,
      // is_coming_soon:true,
    })
    .returning("*");

    //get row of given movie_id
    let movie = await db(tableNames.movie)
    .select('*')
      .where({
        movie_id: movie_id,
      })
      .returning("*");

    if (movieOfPoster[0].movie_id) {
      if (movie_id != movieOfPoster[0].movie_id) {
        if (movie[0].is_in_cinema==false && movie[0].is_coming_soon==false)
          {
            console.log('This movie already exists')
            var message = "This movie already exists";
            return message;

          }
        else
        {
        if(movieOfPoster[0].is_in_cinema==false && movieOfPoster[0].is_coming_soon==false)
        {
        var message = "This poster belongs to another movie";
        return message;
        }
      }
      }
    }
  },

  async CheckTrailerForEdit(movie_id, trailer_url) {
    console.log('inside CheckTrailerForEdit')
    let movieOfTrailer = await db(tableNames.movie)
      .select('*')
      .where({
        trailer_url: trailer_url,
      })
      .returning("*");

      //get row of given movie_id
      let movie = await db(tableNames.movie)
    .select('*')
      .where({
        movie_id: movie_id,
      })
      .returning("*");

    if (movieOfTrailer[0].movie_id) {
      if (movie_id != movieOfTrailer[0].movie_id) {
        if (movie[0].is_in_cinema==false && movie[0].is_coming_soon==false)
          {
            console.log('This movie already exists')
            var message = "This movie already exists";
            return message;

          }
        else{
        if(movieOfTrailer[0].is_in_cinema==false && movieOfTrailer[0].is_coming_soon==false)
        {
        var message = "This trailer belongs to another movie";
        return message;
        }
      }
      }
    }
  },

  async CheckDescriptionForEdit(movie_id, description) {
    // print('in CheckDescriptionForEdit')
    let movieOfDescription = await db(tableNames.movie)
    .select('*')
    .where({
      description: description,
    })
    .returning("*");

    //get row of given movie_id
    let movie = await db(tableNames.movie)
    .select('*')
      .where({
        movie_id: movie_id,
      })
      .returning("*");

    if (movieOfDescription[0].movie_id) {
      if (movie_id != movieOfDescription[0].movie_id) {
        if (movie[0].is_in_cinema==false && movie[0].is_coming_soon==false)
          {
            console.log('This movie already exists')
            var message = "This movie already exists";
            return message;

          }
        else{
        if(movieOfDescription[0].is_in_cinema==false && movieOfDescription[0].is_coming_soon==false)
        {
        var message = "This description belongs to another movie";
        return message;
        }
      }
      }
    }
      


    // if (movie_idOfDescription.movie_id) {
    //   if (movie_id != movie_idOfDescription.movie_id) {
    //     var message = "This description belongs to another movie";
    //     return message;
    //   }
    // }
  },

  async editMovie(
    movie_id,
    title,
    yearConverted,
    length,
    age_guide,
    trailer_url,
    poster,
    description
  ) {
    let movie = await db(tableNames.movie)
      .where({
        movie_id: movie_id,
      })
      .update({
        title: title,
        year: yearConverted,
        length: length,
        age_guide: age_guide,
        description: description,
        poster: poster,
        trailer_url: trailer_url,
      })
      .returning("*");
    if (movie) {
      return movie[0].movie_id;
    }
    return;
  },

  async editGenre(movie_id, genres) {
    var arrayofGenreID = new Array();
    for (const genre of genres) {
      //console.log(g);
      try {
        let genre_id = await db("Genre")
          .where({
            genre: genre.label,
          })
          .returning("*")
          .pluck("genre_id");
        arrayofGenreID.push(genre_id[0]);
      } catch {
        let genre_id = await db("Genre")
          .where({
            genre: genre,
          })
          .returning("*")
          .pluck("genre_id");
        arrayofGenreID.push(genre_id[0]);
      }
    }

    let delete_Movie_Genre = await db("Movie_Genre")
      .del()
      .where({ movie_id: movie_id });

    //insert movie id with  genre id
    for (const id of arrayofGenreID) {
      let Movie_Genre = await db("Movie_Genre")
        .insert({
          movie_id: movie_id,
          genre_id: id,
        })
        .returning("*");
      console.log(Movie_Genre);
    }
    return;
  },

  async editLanguage(movie_id, languages) {
    var arrayofLanguageID = new Array();
    for (const language of languages) {
      try {
        let language_id = await db("Language")
          .where({
            language: language.label,
          })
          .returning("*")
          .pluck("language_id");
        arrayofLanguageID.push(language_id[0]);
      } catch {
        let language_id = await db("Language")
          .where({
            language: language,
          })
          .returning("*")
          .pluck("language_id");
        arrayofLanguageID.push(language_id[0]);
      }
    }

    let delete_Movie_Language = await db("Movie_Language")
      .del()
      .where({ movie_id: movie_id });

    //insert movie id with  lanaguage id
    for (const id of arrayofLanguageID) {
      let Movie_Language = await db("Movie_Language")
        .insert({
          movie_id: movie_id,
          language_id: id,
        })
        .returning("*");
      console.log(Movie_Language);
    }

    return;
  },

  async editDirector(movie_id, directors) {
    console.log("directors");
    console.log(directors);
    let newID = await db
      .select("director_id")
      .from(tableNames.director)
      .orderBy("director_id", "desc")
      .returning("*")
      .pluck("director_id");
    newID = newID[0] + 1;

    var arrayofDirectorsID = new Array();
    for (const director of directors) {
      console.log(director);
      try {
        let director_id = await db("Director")
          .where({
            director: director.label,
          })
          .returning("*")
          .pluck("director_id");
        if (director_id[0]) {
          arrayofDirectorsID.push(director_id[0]);
          console.log(director_id[0]);
        } else {
          director_id = await db("Director")
            .insert({
              director_id: newID,
              director: director.label,
            })
            .returning("*");
          newID = newID + 1;
          console.log("director_id2");
          console.log(director_id);
          arrayofDirectorsID.push(director_id[0].director_id);
        }
      } catch {
        console.log("in catch");
        let director_id = await db("Director")
          .where({
            director: director,
          })
          .returning("*")
          .pluck("director_id");
        if (director_id[0]) {
          arrayofDirectorsID.push(director_id[0]);
          console.log(director_id[0]);
        } else {
          director_id = await db("Director")
            .insert({
              director_id: newID,
              director: director,
            })
            .returning("*");
          newID = newID + 1;
          console.log("director_id2");
          console.log(director_id);
          arrayofDirectorsID.push(director_id[0].director_id);
        }
      }
    }
    let delete_Movie_Director = await db("Movie_Director")
      .del()
      .where({ movie_id: movie_id });

    //insert movie id with  director id
    console.log(arrayofDirectorsID);
    for (const id of arrayofDirectorsID) {
      console.log(id);
      let Movie_Director = await db("Movie_Director")
        .insert({
          movie_id: movie_id,
          director_id: id,
        })
        .returning("*");
      console.log(Movie_Director);
    }
    return;
  },

  async editWriter(movie_id, writers) {
    let newID = await db
      .select("writer_id")
      .from(tableNames.writer)
      .orderBy("writer_id", "desc")
      .returning("*")
      .pluck("writer_id");
    newID = newID[0] + 1;

    var arrayofWritersID = new Array();
    for (const writer of writers) {
      try {
        let writer_id = await db("Writer")
          .where({
            writer: writer.label,
          })
          .returning("*")
          .pluck("writer_id");
        if (writer_id[0]) {
          arrayofWritersID.push(writer_id[0]);
        }
        if (!writer_id[0]) {
          writer_id = await db("Writer")
            .insert({
              writer_id: newID,
              writer: writer.label,
            })
            .returning("*");
        }
      } catch {
        let writer_id = await db("Writer")
          .where({
            writer: writer,
          })
          .returning("*")
          .pluck("writer_id");
        if (writer_id[0]) {
          arrayofWritersID.push(writer_id[0]);
        }
        if (!writer_id[0]) {
          writer_id = await db("Writer")
            .insert({
              writer_id: newID,
              writer: writer,
            })
            .returning("*");
          newID = newID + 1;
          console.log(writer_id);
          arrayofWritersID.push(writer_id[0].writer_id);
        }
      }
    }

    let delete_Movie_Writer = await db("Movie_Writer")
      .del()
      .where({ movie_id: movie_id });

    //insert movie id with  writer id
    for (const id of arrayofWritersID) {
      let Movie_Writer = await db("Movie_Writer")
        .insert({
          movie_id: movie_id,
          writer_id: id,
        })
        .returning("*");
      console.log(Movie_Writer);
    }
    return;
  },

  async editActor(movie_id, actorNames, actorRoles, actorImages) {
    let newID = await db
      .select("actor_id")
      .from(tableNames.actor)
      .orderBy("actor_id", "desc")
      .returning("*")
      .pluck("actor_id");
    newID = newID[0] + 1;

    var numOfActors = actorNames.length;

    var arrayofActorID = new Array();

    for (var i = 0; i < numOfActors; i++) {
      let actor_id = await db(tableNames.actor)
        .where({
          actor: actorNames[i].label,
        })
        .returning("*")
        .pluck("actor_id");
      if (actor_id[0]) {
        let updateImage = await db(tableNames.actor)
          .update({
            actor_image_url: actorImages[i],
          })
          .where({
            actor_id: actor_id[0],
          })
          .returning("*");
        arrayofActorID.push(actor_id[0]);
      } else {
        actor_id = await db(tableNames.actor)
          .insert({
            actor_id: newID,
            actor: actorNames[i].label,
            actor_image_url: actorImages[i],
          })
          .returning("*");
        arrayofActorID.push(actor_id[0].actor_id);
      }
    }

    console.log(arrayofActorID);

    let delete_Movie_Actor_Role = await db("Role")
      .del()
      .where({ movie_id: movie_id });

    var rolesIndex = 0;
    for (const id of arrayofActorID) {
      let Role = await db("Role")
        .insert({
          movie_id: movie_id,
          actor_id: id,
          role: actorRoles[rolesIndex].label,
        })
        .returning("*");
      rolesIndex = rolesIndex + 1;
      console.log(Role);
    }
    return;
  },

  async getMovieFormData(id) {
    let movieInfo = await db(tableNames.movie).select("*").where({
      movie_id: id,
    });

    let genre_ids = await db("Movie_Genre")
      .select("*")
      .where({
        movie_id: id,
      })
      .returning("*")
      .pluck("genre_id");

    var arrayofGenres = new Array();

    for (const id of genre_ids) {
      //console.log(id);
      let genre = await db("Genre")
        .select("*")
        .where({
          genre_id: id,
        })
        .returning("*")
        .pluck("genre");
      arrayofGenres.push(genre[0]);
    }

    let language_ids = await db(tableNames.movie_Language)
      .select("*")
      .where({
        movie_id: id,
      })
      .returning("*")
      .pluck("language_id");

    var arrayofLanguages = new Array();

    for (const id of language_ids) {
      let language = await db(tableNames.language)
        .select("*")
        .where({
          language_id: id,
        })
        .returning("*")
        .pluck("language");
      arrayofLanguages.push(language[0]);
    }

    var actorInfoArray = new Array();

    let movieRoles = await db(tableNames.role)
      .select("*")
      .where({
        movie_id: id,
      })
      .returning("*");

    for (const role of movieRoles) {
      let movieActors = await db(tableNames.actor).select("*").where({
        actor_id: role.actor_id,
      });
      let actorRole = await db(tableNames.role)
        .select("*")
        .where({
          movie_id: id,
          actor_id: movieActors[0].actor_id,
        })
        .returning("*");
      movieRole = actorRole[0].role;
      actorName = movieActors[0].actor;
      actorImage = movieActors[0].actor_image_url;

      actorInfoArray.push([{ movieRole, actorName, actorImage }]);
    }
    var arrayofDirectors = new Array();

    let director_ids = await db(tableNames.movie_Director)
      .select("*")
      .where({
        movie_id: id,
      })
      .returning("*")
      .pluck("director_id");
    console.log("director_ids");
    console.log(director_ids);

    for (const id of director_ids) {
      let movieDirectors = await db(tableNames.director)
        .select("*")
        .where({
          director_id: id,
        })
        .returning("*")
        .pluck("director");
      arrayofDirectors.push(movieDirectors[0]);
    }

    var arrayofWriters = new Array();

    let writer_ids = await db(tableNames.movie_Writer)
      .select("*")
      .where({
        movie_id: id,
      })
      .returning("*")
      .pluck("writer_id");
    console.log(writer_ids);

    for (const id of writer_ids) {
      let movieWriter = await db(tableNames.writer)
        .select("*")
        .where({
          writer_id: id,
        })
        .returning("*")
        .pluck("writer");
      arrayofWriters.push(movieWriter[0]);
    }

    console.log(actorInfoArray);
    console.log(arrayofWriters);
    console.log(arrayofDirectors);

    console.log(movieInfo);
    console.log(arrayofGenres);
    console.log(arrayofLanguages);
    return {
      movieInfo,
      arrayofGenres,
      arrayofLanguages,
      actorInfoArray,
      arrayofDirectors,
      arrayofWriters,
    };
  },

  async getRecommendedPosters(recommendationIdsArray) {
    var arrayOfPosters = new Array();

    for (var i = 0; i < recommendationIdsArray.length; i++) {
      let poster = await db("Movie")
        .select("movie_id", "poster")
        .where({
          movie_id: recommendationIdsArray[i],
        })
        .returning("*");
      arrayOfPosters.push(poster[0]);
    }
    return arrayOfPosters;
  },

  async getMovieStatus(movieId) {
    return db("Movie AS M")
    .select(
      "M.movie_id",
      "M.is_in_cinema",
      "M.is_coming_soon",
      "M.is_deleted",
    )
    .where("M.movie_id", "=", movieId)

  },


  async getReleaseDate(movieId) {
    return db("Coming_soon AS cs")
    .select(
      "cs.movie_id",
      "cs.release_date",
      "cs.cinema_name",
    )
    // .leftJoin("Movie AS M", "M.movie_id", "R.movie_id")
    .where("cs.movie_id", "=", movieId)
   

  },



  async getWhatsOnMovies(numberofmovies) {
    return db("Movie AS M")
    .select(
      "M.movie_id",
      "M.title",
      "M.poster",
       db.raw("ROUND(AVG(rating),1)::int AS total_rating"),
      "M.year"
    )
    .leftJoin("Rating AS R", "M.movie_id", "R.movie_id")
    .where("M.is_in_cinema", "=", true)
    .groupBy("M.movie_id", "poster", "year")

  },

  async getInCinemas(movieId) {
    return db("Cinema AS C")
    .select(
      "C.cinema_id",
      "C.name",
      "C.city",
      "C.location",
      "IC.booking_link",

    )
    .leftJoin("In_Cinema AS IC", "IC.cinema_id", "C.cinema_id")
    .where("IC.movie_id", "=", movieId,"M.is_deleted", "=", false)
    .orderBy('C.name', 'desc')

  },


  async getComingSoonMovies(numberofmovies) {
    return db("Movie AS M")
    .select(
      "M.movie_id",
      "M.title",
      "M.poster",
      "M.year",
      db.raw("ROUND(AVG(rating),1)::int AS total_rating"),
    )
    .leftJoin("Rating AS R", "M.movie_id", "R.movie_id")
    .where("M.is_coming_soon", "=", true,"M.is_deleted", "=", false)
    .leftJoin("Coming_soon AS CS", "M.movie_id", "CS.movie_id")
    .groupBy("M.movie_id")
    .min('CS.release_date')
   

  },

 

  


  async getMovieTitle(movieID) {
    let title = await db("Movie")
      .select("movie_id")
      .where({
        movie_id: movieID,
      })
      .returning("*")
      .pluck("title");

    return title;
  },

  async getMovieIDs(numberofmovies) {
    return db("Movie").select("movie_id");
  },

  async ifReview(id, userID) {
    console.log(id, userID);

    let result = await db("Review AS R")
      .select(["review", "username", "review_id"])
      .where({
        movie_id: id,
        "R.user_id": userID,
        is_deleted: false,
      })
      .leftJoin("User AS U", "R.user_id", "U.user_id")
      .returning("*");
    if (result) {
      console.log(result);
      return result;
    }
    return;
  },

  async getReviews(movie_id) {
    return db("Review AS R")
      .select(["review", "username", "review_id"])
      .where({
        movie_id: movie_id,
        is_deleted: false,
      })
      .leftJoin("User AS U", "R.user_id", "U.user_id")
      .orderBy("created_at", "desc");
  },
};

