const db = require("../../db/db");
module.exports = {

async getfilteredMovies() {

  // #filter rated and reviewd moviews
    return db("Movie AS M")
      .select("M.movie_id")
      .leftJoin("Rating AS R", "M.movie_id", "R.movie_id")
      .where("M.is_deleted", "=", false)
      .orderBy("R.rating", "desc")
  },
  


};