// const MovieDAO = require('../dao/movie');



// class MovieService{

//     createMovie(MovieDto){
//         const {title, imdbId} = MovieDto
//         return MovieDAO.createMovie(title, imdbId);
//     }
// }

// module.exports = new MovieService();

const movieDAO = require('../dao/movie');

class MovieService {
createMovie(movieDto) {
    const { title, imdbId } = movieDto;
    return movieDAO.createMovie(title , imdbId);
  }
}

module.exports = new MovieService();