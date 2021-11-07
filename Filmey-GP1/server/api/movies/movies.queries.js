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
  
  }};

