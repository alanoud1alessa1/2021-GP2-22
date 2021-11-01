const MovieService = require('../service/movie');

class MovieController {
  async createMovie(req, res) {
    try {
      const id = await MovieService.createMovie(req.body);
      res.status(201).json(id);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = new MovieController();

