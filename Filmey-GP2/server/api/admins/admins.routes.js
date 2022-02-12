const express = require("express");
const queries = require("./admins.queries");
const router = express.Router();
const isAuth = require("../../isAuth");
const jwt = require("jsonwebtoken");

router.get("/:id", isAuth, async (req, res, next) => {
  const { id } = req.params;
  try {
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
  const response = await queries.login(username, password);

  if (response.passwordMessage || response.emailOrUsernameMessage) {
    return res.json(response);
  }

  const user = { userID: response.adminID, username: username, isAdmin: true };

  try {
    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECERT);
    if (token) {
      return res.json(token);
    }
    return next();
  } catch (error) {
    token = "";
    return res.json(token);
  }
});

router.post("/deleteReview", async (req, res, next) => {
  const { admin_id, review_id } = req.body;
  try {
    const deleteReview = await queries.deleteReview(review_id);
    const AdminDeleteMovie = await queries.AdminDeleteReview(
      review_id,
      admin_id
    );

    if (deleteReview) {
      return res.json(deleteReview);
    }
    return next();
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;
