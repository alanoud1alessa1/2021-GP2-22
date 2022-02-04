const db = require("../../db/db");
module.exports = {

async getfilteredMovies(userID) {


  // #filter rated and reviewd moviews
    return db("Movie AS M")
      .select("M.movie_id")
      .leftJoin("Rating AS R", "M.movie_id", "R.movie_id")
      .where("M.is_deleted", "=", false)
      .orderBy("R.rating", "desc")
      // return db("Movie AS M")
      // .select("M.movie_id")
      // .rightJoin("Rating AS R", "R.movie_id", "M.movie_id")
      // .where("R.user_id", "!=", userID)
      // .andWhere("M.is_deleted", "=", false)
  },

async checkThreshold(userID) {

    // #filter rated and reviewd moviews
      return db("Rating")
        .select("movie_id")
        .where("user_id", "=", userID)
        // return db("Movie AS M")
        // .select("M.movie_id")
        // .rightJoin("Rating AS R", "R.movie_id", "M.movie_id")
        // .where("R.user_id", "!=", userID)
        // .andWhere("M.is_deleted", "=", false)
    },
  

  async getMovieTitle(movieID) {
    let title = await db("Movie")
      .select("movie_id")
      .where({
        movie_id: movieID,
      })
      .returning("*").pluck("title");
  
  return title;
},

  


};