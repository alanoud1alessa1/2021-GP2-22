// module.exports = router;
const express = require("express");

const queries = require("./cinema.queries");

const router = express.Router();
const isAuth = require("../../isAuth");
const { json } = require("express");
const axios = require("axios");

router.get("/cinemaLocations/:name", async (req, res, next) => {
    const { name } = req.params;
    try {
      const locations = await queries.getLocation(name);
      console.log(locations);

      if (locations) {
        return res.json(locations);
      }
      return next();
    } catch (error) {
      return next(error);
    }
  });
module.exports = router;