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

  async getBasedOnGenre(genreType) {
    return db
      .select("M.movie_id", "M.title", "M.poster", "G.genre")
      .from("Movie_Genre AS MG")
      .leftJoin("Genre AS G", "G.genre_id", "MG.genre_id")
      .leftJoin("Movie AS M", "MG.movie_id", "M.movie_id")
      .where("G.genre", "=", genreType)
      .orderBy("movie_id", "asc");
  },

  async getMovieReviews(movie_id) {

    return db("Review")
      .select("username" , 'review')
      .innerJoin("User", "Review.user_id", "User.user_id")
      .where({
        movie_id: movie_id,
      });
  },


//   async addMovie(title, year, length , age_guide ,description, poster , trailer_url) {

//  const [movie_id] = await db("Movie").select("movie_id").
//     const [id] = await db("Movie")
//     .insert({ title, year, length , age_guide ,description, poster , trailer_url })
//     .returning("movie_id");

//     return id ;
//   },

async getAllGenres() {
return db('Genre').select("genre");
},


};
