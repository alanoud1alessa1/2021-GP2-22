const express = require("express");

const queries = require("./users.queries");

const router = express.Router();
const isAuth = require("../../isAuth");
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
  const { email, username, password , date_of_birth ,gender, location} = req.body;
  if (username.substring(0,5)=="admin")
  {
    token='';
    //res.status(401);
    return res.json(token);
  }
  try {
    const token = await queries.signup(email, username, password , date_of_birth ,gender, location);
    if (token) {
      //res.render("/:path(|home-page)");
      return res.json(token);
    }
    return next();
  } catch (error) {
    token='';
    //res.status(401);
    return res.json(token);}
});

router.post("/login", async (req, res, next) => {

  const { username, password } = req.body;

  try {
    const token = await queries.login(username, password);

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
   // res.send({message: 'username is not registered CATCH' });
   //console.log(JSON.stringify({ message: 'username is not registered CATCH'}))
    //res.send(JSON.stringify({ message: 'username is not registered CATCH'}));
    

    // res.statusCode = 401;
    //return next(error);
 }
});

module.exports = router;
