const express = require("express");

const queries = require("./users.queries");

const router = express.Router();
const isAuth = require("../../isAuth");
const jwt = require("jsonwebtoken");
router.get("/:id", isAuth, async (req, res, next) => {
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
  const { email, username, password , date_of_birth ,gender, location,genres} = req.body;
  if (username.substring(0,5)=="admin")
  {
    const usernameMessage = { 'usernameMessage' : "Username already taken"};
    return res.json({usernameMessage});
  }
  const emailMessage= await queries.checkEmail(email);
  usernameMessage= await queries.checkUsername(username);
  if(emailMessage||usernameMessage)
  {
    console.log("emailMessage||usernameMessage");
    return res.json({emailMessage,usernameMessage});
  }
  // try
  // {
   
    const token = await queries.signup(email, username, password , date_of_birth ,gender, location, genres);
    if (token)
    {
      console.log("inside token");
      //res.render("/:path(|home-page)");
      return res.json(token);
    }
    return next();
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
  const message= await queries.login(username,password);


  if(message)
    {
      return res.json(message);
    }

  const user = { username: username, isAdmin:false};
  

  try {
     const token= jwt.sign(user, "mySecretKey");
    


    if (token) {
      
      return res.json(token);
      
    }
    return next();
  } catch (error) {
    token='';
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

module.exports = router;
