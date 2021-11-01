const express = require('express');
const MovieController = require('../controller/movie');



const router = express.Router();
router.post('/movie', MovieController.createMovie);


module.exports = router;

