const db  =require('../db/db');


class MovieDAO{

   async  craeteMovie(title , imdbId){
       const [movie_id] = await db('Movie')
       .insert({
            title,
            imdbId
        })
        .returning('movie_id');

        return movie_id;

    }
}

module.exports = new MovieDAO();
