const db = require("../../db/db");
module.exports = {

// async getfilteredMovies(userID) {
//   return db("Movie AS M")
//       .select("M.movie_id", "M.poster" , "R.rating")
//       .leftJoin("Rating AS R", "M.movie_id", "R.movie_id")
//       .where("M.is_deleted", "=", false)
//       .orderBy("R.rating", "desc")
//   },

async checkThreshold(userID) {

    //To check if user exceeds threshold
      return db("Rating")
        .select("movie_id")
        .where("user_id", "=", userID)
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