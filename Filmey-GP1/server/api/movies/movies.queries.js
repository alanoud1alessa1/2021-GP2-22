const db = require("../../db/db");

// const bcrypt = require("bcrypt");
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

  // async getTopMovies(numberofmovies) {
  //   return db("Movie")
  //     .select("movie_id", "poster")
  //     .orderBy("movie_id", "asc")
  //     .limit(numberofmovies);
  // },

  async getTopMovies(numberofmovies) {
    return db("Movie AS M")
      .select("M.movie_id", "M.poster" , "R.rating")
      .leftJoin("Rating AS R", "M.movie_id", "R.movie_id")
      .orderBy("R.rating", "desc")
      .limit(numberofmovies);
  },

  async getBasedOnGenre(genreType, limit) {
    // coalesce() to return the real value of "zero" for null columns

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
      .groupBy("MG.movie_id", "title", "poster")
      .orderBy("total_rating", "desc", { nulls: "last" })
      .orderBy("MG.movie_id", "asc")
      // .havingRaw('total_rating > ?', [0])
      .limit(limit);
  },

  async getMovieReviews(movie_id) {
    return db("Review AS R")
      .select("review", "username")
      .where({
        movie_id: movie_id,
      })
      .leftJoin("User AS U", "R.user_id", "U.user_id")
      .orderBy("created_at", "desc");
  },

  //   async addMovie(title, year, length , age_guide ,description, poster , trailer_url) {

  //  const [movie_id] = await db("Movie").select("movie_id").
  //     const [id] = await db("Movie")
  //     .insert({ title, year, length , age_guide ,description, poster , trailer_url })
  //     .returning("movie_id");

  //     return id ;
  //   },

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

  async CheckMovie(title, yearConverted) {
    let checkMovie = await db(tableNames.movie)
      .where({
        title: title,
        year: yearConverted,
      })
      .first()
      .returning("*");

    console.log(checkMovie);

    if (checkMovie) {
      //var message = { 'CheckMovieMessage' : "This movie already exists"};
      var message = "This movie already exists";

      return message;
    }
  },

  async CheckPoster(poster) {
    let checkPoster = await db(tableNames.movie)
      .where({
        poster: poster,
      })
      .first()
      .returning("*");

    if (checkPoster) {
      //var message = { 'PosterMessage' : "This poster is for another movie"};
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
      //var message = { 'DescriptionMessage' : "This description is for another movie"};
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
      //var message = { 'TrailerMessage' : "This trailer is for another movie"};
      var message = "This trailer is for another movie";

      return message;
    }
  },

  // async CheckActorImage(actorNames, actorImages) {
  //   var length = actorImages.length;
  //   var message=[];
  //   for (var i = 0; i < length; i++) {
  //     console.log(actorImages[i]);

  //     let checkActorImage = await db(tableNames.actor)
  //       .where({
  //         actor_image_url: actorImages[i],
  //       })
  //       .returning("*")
  //       .pluck("actor");
  //     console.log(checkActorImage[0]);
  //     if (checkActorImage[0]) {
  //       if (actorNames[i] != checkActorImage[0]) {
  //         message[i]="Image belongs to another actor";;
  //       }
  //     }
  //   }

  //   return message;
  // },

  
  async CheckActorImage(actorNames,actorImages) {
    var length=actorImages.length;
    var message;
    for( var i=0; i<length;i++ ){
     console.log(actorImages[i]);

      let checkActorImage = await db(tableNames.actor)
        .where({
          actor_image_url:actorImages[i],
        }).returning("*").pluck('actor');
        console.log(checkActorImage[0]);
        if(checkActorImage[0])
        {
          if(actorNames[i]!=checkActorImage[0])
          {
            var index= i.toString();
            message={actorNumber: index, meesage: "This image belongs to another actor"};
          }
        }
        //actorNamesArray.push(checkActorImage[0]);
      }

      return message;

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

  async addGenre(movie_id, genres) {
    //console.log(genres);
    var arrayofGenreID = new Array();
    for (const genre of genres) {
      //console.log(g);
      let genre_id = await db("Genre")
        .where({
          genre: genre,
        })
        .returning("*")
        .pluck("genre_id");
      // console.log(genre_id[0]);
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
        //arrayofDirectorsID.push(director_id2[0]);
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

    //console.log(arrayofGenres);
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
    // console.log(movieRoles);
    for (const actorId of movieRoles) {
      console.log(actorId);
      let movieActors = await db(tableNames.actor).select("*").where({
        actor_id: actorId.actor_id,
      });
      //console.log(movieRoles[0].role);
      movieRole = movieRoles[0].role;
      actorName = movieActors[0].actor;
      actorImage = movieActors[0].actor_image_url;

      actorInfoArray.push([{ movieRole, actorName, actorImage }]);
      //return ActorInfo;
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
      //console.log(actorId);
      let movieDirectors = await db(tableNames.director)
        .select("*")
        .where({
          director_id: id,
        })
        .returning("*")
        .pluck("director");
      //console.log("movieDirectors");
      //console.log(movieDirectors);
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
    //console.log("director_ids");
    console.log(writer_ids);

    for (const id of writer_ids) {
      //console.log(actorId);
      let movieWriter = await db(tableNames.writer)
        .select("*")
        .where({
          writer_id: id,
        })
        .returning("*")
        .pluck("writer");
      //console.log("movieDirectors");
      //console.log(movieDirectors);
      arrayofWriters.push(movieWriter[0]);
    }

    //   let movieWriters = await db(tableNames.writer).select("*").where({
    //     movie_id: id,
    //   }).returning("*").pluck("writer");
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
    //return movieGenres;
    //console.log(movieGenres);
    // console.log(movieLanguages);
    // console.log(movieRoles);
    // console.log(movieDirectors);
    // console.log(movieWriters);

    //    if(movieInfo){
    //      console.log(movieInfo);
    //      return movieInfo;
    // }
  },

  async deleteMovie(movie_id) {
    console.log(movie_id);
    let result = await db(tableNames.movie).del().where({ movie_id: movie_id });
    if (result) {
      return result;
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

    // for (const genre of genres) {
    //   let genre_id = await db("Genre")
    //     .where({
    //       genre: genre,
    //     })
    //     .returning("*")
    //     .pluck("genre_id");

    //   // Genre ID
    //   arrayofNewGenreID.push(genre_id[0]);
    // }
    // //Delete rest of genres
    // for (const genre of genres) {
    //   let genre_id = await db("Genre")
    //     .where({
    //       genre: genre,
    //     })
    //     .returning("*")
    //     .pluck("genre_id");

    //   // Genre ID
    //   arrayofNewGenreID.push(genre_id[0]);
    // }

    return True;
  },
};

//  1-1   1-3   1-5

// 1-2  1-3   

