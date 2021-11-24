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

  async getTopMovies(numberofmovies) {
    return db("Movie")
      .select("*")
      .orderBy("movie_id", "asc")
      .limit(numberofmovies);
  },

  async getBasedOnGenre(genreType , limit) {

    return db.select("M.movie_id", "M.title", "M.poster" , "R.rating")
    .from("Movie_Genre AS MG")
    .leftJoin("Genre AS G", "G.genre_id", "MG.genre_id")
    .where("G.genre", "=", genreType)
    .leftJoin("Movie AS M", "MG.movie_id", "M.movie_id")
    .leftJoin("Rating AS R", "MG.movie_id", "R.movie_id")
    // .groupByRaw("M.movie_id")
    .orderBy("rating")
    .limit(limit);

  
//group by only accepts aggregation functions in select


    // var movie = JSON.parse( db.select("M.movie_id", "M.title", "M.poster" )
    // .from("Movie_Genre AS MG")
    // .leftJoin("Genre AS G", "G.genre_id", "MG.genre_id")
    // .where("G.genre", "=", genreType)
    // .leftJoin("Movie AS M", "MG.movie_id", "M.movie_id"))
    // return movie;





    // return db
    // .select("M.movie_id", "M.title", "M.poster", "G.genre" , "R.rating")
    // .from("Movie_Genre AS MG")
    // .leftJoin("Genre AS G", "G.genre_id", "MG.genre_id")
    // .where("G.genre", "=", genreType)
    // .leftJoin("Movie AS M", "MG.movie_id", "M.movie_id")
    // .leftJoin( db("Rating AS ")
    // .select("*"), "M.movie_id", "R.movie_id")
    // .orderBy("R.rating", 'desc' , {nulls: 'last'});

    // return db
    //   .select("movie_id", db.raw("ROUND(AVG(rating),2) AS total_rating") ,db.raw("COUNT(rating) AS total_users") )
    //   .from("Rating")
    //   .where({movie_id : movie_id})
    //   .groupByRaw("movie_id");





  },

  


  async getMovieReviews(movie_id) {

    return db.select("M.movie_id", "M.title", "M.poster" )
    .from("Movie_Genre AS MG")
    .leftJoin("Genre AS G", "G.genre_id", "MG.genre_id")
    .where("G.genre", "=", genreType)
    .leftJoin("Movie AS M", "MG.movie_id", "M.movie_id")
    .limit(50);
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

  async getRating(movie_id) {

    return db
      .select("movie_id", db.raw("ROUND(AVG(rating),1) AS total_rating") ,db.raw("COUNT(rating) AS total_users") )
      .from("Rating")
      .where({movie_id : movie_id})
      .groupByRaw("movie_id");
  },
};
