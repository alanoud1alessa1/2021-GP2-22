const db = require("../../db/db");
const fields = ["imdb_id", "title" ,"year", "length" , "age_guide" , "description" , "poster" , "trailer_url"];

// const bcrypt = require("bcrypt");
const auth = require("../../auth");
const tableNames = require("../../constents/tableNames");
module.exports = {
  async get(movie_id) {
    return db("Movie").select('*').where({
      movie_id: movie_id,
    });
  
  },
  async getGenre(movie_id) {
    return db('Movie_Genre').select("genre").innerJoin('Genre', 'Movie_Genre.genre_id', 'Genre.genre_id').where({
      movie_id:movie_id,
    });
  },

  async getDirectors(movie_id) {
    return db('Movie_Director').select("director").innerJoin('Director', 'Movie_Director.director_id', 'Director.director_id').where({
      movie_id:movie_id,
    });
  },


  async getWriters(movie_id) {
    return db('Movie_Writer').select("writer").innerJoin('Writer', 'Movie_Writer.writer_id', 'Writer.writer_id').where({
      movie_id:movie_id,
    });
  },

  async getLanguages(movie_id) {
    return db('Movie_Language').select("language").innerJoin('Language', 'Movie_Language.language_id', 'Language.language_id').where({
      movie_id:movie_id,
    });
  },

  async getCasts(movie_id) {
    return db('Role').select("actor" , "actor_image_url" , "role").innerJoin('Actor', 'Role.actor_id', 'Actor.actor_id').where({
      movie_id:movie_id,
    });
  },




};

