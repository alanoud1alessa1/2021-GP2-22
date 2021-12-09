const express = require("express");

const queries = require("./users.queries");

const router = express.Router();
const isAuth = require("../../isAuth");
const jwt = require("jsonwebtoken");

// router.get("/:id", isAuth, async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     // TODO: should we validate the ID?
//     const user = await queries.get(parseInt(id, 10) || 0);
//     if (user) {
//       return res.json(user);
//     }
//     return next();
//   } catch (error) {
//     return next(error);
//   }
// });
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    // TODO: should we validate the ID?
    const user = await queries.get(parseInt(id, 10) || 0);
    if (user) {
      return res.json(user);
    }
    return next();
  } catch (error) {
    return next(error);
  }
});

// router.put("/", async (req, res, next) => {
//   const { email, username, password , date_of_birth , location} = req.body;
//   try {
//     const token = await queries.signup(email, username, password , date_of_birth , location);
//     if (token) {
//       return res.json(token);
//     }
//     return next();
//   } catch (error) {
//     console.log(error);
//     res.statusCode = 409;
//     return next(error);
//   }
// });

router.post("/register", async (req, res, next) => {
  const { email, username, password, date_of_birth, gender, location, genres } =
    req.body;
  var passwordMessage = "";

  if (password.length < 8) {
    passwordMessage = {
      passwordMessage: "Password length must be at least 8 characters.",
    };
  }
  // else
  // {
  //   passwordMessage="";
  // }

  // if (username.substring(0,5)=="admin")
  // {
  //   const usernameMessage = { 'usernameMessage' : "Username is already taken."};
  //   return res.json({usernameMessage});
  // }
  const emailMessage = await queries.checkEmail(email);
  const usernameMessage = await queries.checkUsername(username);
  if (emailMessage || usernameMessage || passwordMessage) {
    console.log("emailMessage||usernameMessage");
    return res.json({ emailMessage, usernameMessage, passwordMessage });
  }
  // try
  // {

  const userID = await queries.signup(
    email,
    username,
    password,
    date_of_birth,
    gender,
    location,
    genres
  );
  const user = { userID: userID, username: username, isAdmin: false };

  try {
    const token = jwt.sign(user, "mySecretKey");

    if (token) {
      return res.json(token);
    }
    return next();
  } catch (error) {
    token = "";
    //res.status(401);
    return res.json(token);
    // res.sendStatus()
    // res.status(401).json({
    //   message: 'username is not registered CATCH',
    // })

    // res.statusCode = 401;
    //return next(error);
  }
  // if (token)
  // {
  //   console.log("inside token");
  //   //res.render("/:path(|home-page)");
  //   return res.json(token);
  // }
  // return next();
  // }
  // catch (error)
  // {
  //   token='';
  //   //res.status(401);
  //   return res.json(token);
  // }
});

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  const response = await queries.login(username, password);
  //const userID= await queries.getId(username);

  if (response.passwordMessage || response.emailOrUsernameMessage) {
    return res.json(response);
  }

  const user = {
    userID: response.user_id,
    username: response.username,
    isAdmin: false,
  };

  try {
    const token = jwt.sign(user, "mySecretKey");

    if (token) {
      return res.json(token);
    }
    return next();
  } catch (error) {
    token = "";
    //res.status(401);
    return res.json(token);
    // res.sendStatus()
    // res.status(401).json({
    //   message: 'username is not registered CATCH',
    // })

    // res.statusCode = 401;
    //return next(error);
  }
});

router.post("/rating", async (req, res, next) => {
  // const cookies = new Cookies();
  // const token=cookies.get('token');
  // var decoded = jwt_decode(token);
  // console.log(decoded.userID);
  console.log("in post register");
  const { userID, movieID, rating } = req.body;
  console.log(req.body);
  //console.log(req.cookies.token);
  const result = await queries.rating(userID, movieID, rating);
  return res.json(result);
});

router.post("/getRating", async (req, res, next) => {
  // const cookies = new Cookies();
  // const token=cookies.get('token');
  // var decoded = jwt_decode(token);
  // console.log(decoded.userID);
  console.log("in get rating");
  const { userID, movieID } = req.body;
  console.log(req.body);
  //console.log(req.cookies.token);
  const result = await queries.getUserRating(userID, movieID);
  return res.json(result);
});

router.post("/deleteRating", async (req, res, next) => {
  console.log("in delete rating");
  const { userID, movieID } = req.body;
  console.log(req.body);
  const result = await queries.deleteUserRating(userID, movieID);
  //return result;
  return res.json(result);
});

router.post("/Review", async (req, res, next) => {
  // const cookies = new Cookies();
  // const token=cookies.get('token');
  // var decoded = jwt_decode(token);
  // console.log(decoded.userID);
  console.log("in review");
  const { userID, movieID, review } = req.body;
  console.log(req.body);
  //console.log(req.cookies.token);
  const result = await queries.review(userID, movieID, review);
  return res.json(result);
});

router.post("/userExist", async (req, res, next) => {
  const { email } = req.body;
  const response = await queries.userExist(email);

  if (response.userNotExistMessage) {
    return res.json(response);
  }

  const user = {
    userID: response.user_id,
    email: response.email,
    isAdmin: false,
  };

  try {
    if (user) {
      return res.json(user);
    }

    return next();
  } catch (error) {}
});

router.post("/resetPassword", async (req, res, next) => {

const { user_id  , newPassword} = req.body;
  const response = await queries.resetPassword(user_id , newPassword);

  const user = {
    userID: response.user_id,
    email: response.email,
    isAdmin: false,
  };

  try {
    if (user) {
      return res.json(user);
    }

    return next();
  } catch (error) {}
});

module.exports = router;
