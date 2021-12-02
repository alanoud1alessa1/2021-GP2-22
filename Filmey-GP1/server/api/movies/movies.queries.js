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

  async getBasedOnGenre(genreType, limit) {

    // coalesce() to return the real value of "zero" for null columns
    
    return await db.select("MG.movie_id" , 'title' , 'poster',  db.raw("ROUND(AVG(coalesce(rating , 0)),1) AS total_rating"))
    .from("Movie_Genre AS MG")
    .leftJoin("Genre AS G", "G.genre_id", "MG.genre_id")
    .where("G.genre", "=", genreType)
    .leftJoin("Movie AS M", "MG.movie_id", "M.movie_id")
    .leftJoin("Rating AS R", "MG.movie_id", "R.movie_id")
    .groupBy("MG.movie_id" , 'title' , 'poster') 
    .orderBy("total_rating", 'desc' , {nulls: 'last'})
    .orderBy('MG.movie_id' , 'asc')
    // .havingRaw('total_rating > ?', [0])
    .limit(limit);

    
  },

  async getMovieReviews(movie_id) {
    return db("Review AS R")
      .select("review", "username")
      .where({
        movie_id: movie_id,
      })
      .leftJoin("User AS U", "R.user_id", "U.user_id");
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
      .select(
        "movie_id",
        db.raw("ROUND(AVG(rating),1) AS total_rating"),
        db.raw("COUNT(rating) AS total_users")
      )
      .from("Rating")
      .where({ movie_id: movie_id })
      .groupByRaw("movie_id");
  },

  async deleteMovie(movie_id) {
    console.log(movie_id);
    let result= await db(tableNames.movie)
   .del().where({movie_id:movie_id});
  if(result){
    return result; 
  }
  return;
 },
    
};

