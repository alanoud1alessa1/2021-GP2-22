const express = require("express");
const queries = require("./admins.queries");
const router = express.Router();
const isAuth = require("../../isAuth");
const jwt = require("jsonwebtoken");

router.get("/:id", isAuth, async (req, res, next) => {
    const { id } = req.params;
    try {
      // TODO: should we validate the ID?
      const admin = await queries.get(parseInt(id, 10) || 0);
      if (admin) {
        return res.json(admin);
      }
      return next();
    } catch (error) {
      return next(error);
    }
  });

  router.post("/login", async (req, res, next) => {

    const { username, password } = req.body;
    const message= await queries.login(username,password);

    if(message)
      {
        return res.json(message);
      }
  
    const user = { username: username, isAdmin:true};
  
    try {
       const token= jwt.sign(user, process.env.ACCESS_TOKEN_SECERT);
      if (token) {
        //res.render("/:path(|home-page)");
        return res.json(token);
      }
      return next();
    } catch (error) {
      token='';
      //res.status(401);
      return res.json(token);
     // res.sendStatus()
    }
  });

  module.exports = router;