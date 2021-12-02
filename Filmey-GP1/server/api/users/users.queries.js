// const db = require("../../db/db");
// const fields = ["user_id", "email" ,"username", "password" , "date_of_birth" , "gender" , "location"];

// const bcrypt = require("bcrypt");
// const auth = require("../../auth");
// const tableNames = require("../../constents/tableNames");
// const emailValidator = require('deep-email-validator');

// module.exports = {
//   async get(id) {
//     return db(tableNames.user)
//       .select(fields)
//       .where({
//         id,
//       })
//       .first();
//   },

//   async login(username, password) {
//     // find username

//     let user = await db(tableNames.user)
//       .where({
//         username: username,
//       })
//       .first()
//       .returning("*");

//     if (!user) 
//     {
//       user = await db(tableNames.user)
//       .where({
//         email: username,
//       })
//       .first()
//       .returning("*");
//         // return console.log(user);
//     }
//     // if(!user)
//     // {
//     //   res.status(401).json({
//     //     message: 'username is not registered'
//     // })}

//     // // }
//     var message="";

//     if (!user)
//     {
//       message = { 'emailOrUsernameMessage' : "Sorry, email / username  is not exists."};

//       return message;
//     }

//     // // compare pass
//     isAuth = await bcrypt.compare(password, user.password);
//     // console.log(isAuth);
//     if (!isAuth)
//     {
    
//       message = { 'passwordMessage' : "Password is incorrect."};

//       return message;

//     } 
//     return;

//     // sign token
//    // return auth.createAccessToken(user);
//   },
//   async signup(email ,username, password , date_of_birth , gender , location,genres) {
   
//     // let dupliacte=db(tableNames.user).where('email', email);
//     // console.log(dupliacte);
//     password = await bcrypt.hash(password, 12);
//     const [created] = await db(tableNames.user)
//       .insert({email ,username, password , date_of_birth , gender , location})
//       .returning("*");

//     //get user id
//     let user = await db(tableNames.user)
//       .where({
//         username: username,
//       })
//       .returning("*").pluck('user_id');
//    const userID=user[0];
    

//    //get genresID
//     var arrayofGenreID = new Array();
//      for (const genre of genres)
//     {
//       console.log(genre);

//     let genreID= await db("Genre")
//     .where({
//       genre: genre,
//     })
//     .returning("*").pluck('genre_id');
//     arrayofGenreID.push(genreID[0]);
   
//     }

   
//    //insert user id with favorite genre id
//     for (const id of arrayofGenreID)
//     {
//       let genreID= await db('User_Genre')
//      .insert({
//       user_id: userID,
//        genre_id: id,
//      })}
    

    

//     return auth.createAccessToken(created);
//   },

//   async checkEmail(email) {
//     const {validators} = await emailValidator.validate(email);
//     //console.log(validators.mx.valid);
//     if(!validators.mx.valid)
//     {
//       const message = { 'emailMessage' : "Please enter a valid email."};

//       return message;
//     }
//     console.log("inside check email");
//     let result= await db("User").where({email: email}).first().returning("*");
//     if (result)
//     {
//       console.log("inside results");
//       const message = { 'emailMessage' : "Email is already registered."};

//       return message;
//     }
//     else
//     {
//       return "";
//   }},
//   async checkUsername(username) {
//     let result= await db("User").where({username: username}).first().returning("*");
//     if (result)
//     {
//       const message =  { 'usernameMessage' : "Username is already taken."};

//       return message;
//     }
//     else
//     {
//       return "";
//   }},
// };

const db = require("../../db/db");
const fields = ["user_id", "email" ,"username", "password" , "date_of_birth" , "gender" , "location"];

const bcrypt = require("bcrypt");
const auth = require("../../auth");
const tableNames = require("../../constents/tableNames");
const emailValidator = require('deep-email-validator');
const utf8 = require('utf8');


module.exports = {
  async get(id) {
    return db(tableNames.user)
      .select(fields)
      .where({
        id,
      })
      .first();
  },

  async login(username, password) {
    // find username

    let user = await db(tableNames.user)
      .where({
        username: username,
      })
      .first()
      .returning("*");

    if (!user) 
    {
      user = await db(tableNames.user)
      .where({
        email: username,
      })
      .first()
      .returning("*");
        // return console.log(user);
    }
    // if(!user)
    // {
    //   res.status(401).json({
    //     message: 'username is not registered'
    // })}

    // // }
    var message="";

    if (!user)
    {
      message = { 'emailOrUsernameMessage' : "Sorry, email / username  does not exists."};

      return message;
    }

    // // compare pass
    isAuth = await bcrypt.compare(password, user.password);
    // console.log(isAuth);
    if (!isAuth)
    {
    
      message = { 'passwordMessage' : "Password is incorrect."};

      return message;

    } 
    return user;

    // sign token
   // return auth.createAccessToken(user);
  },


  async signup(email ,username, password , date_of_birth , gender , location,genres) {
   
    // let dupliacte=db(tableNames.user).where('email', email);
    // console.log(dupliacte);
    password = await bcrypt.hash(password, 12);
    const [created] = await db(tableNames.user)
      .insert({email ,username, password , date_of_birth , gender , location})
      .returning("*");
      // const user_id = await db(tableNames.user)
      // .insert({email ,username, password , date_of_birth , gender , location})
      // .returning("*").pluck('user_id');

    //get user id
    let user = await db(tableNames.user)
      .where({
        username: username,
      })
      .returning("*").pluck('user_id');
   const userID=user[0];
    

   //get genresID
    var arrayofGenreID = new Array();
     for (const genre of genres)
    {
      console.log(genre);

    let genreID= await db("Genre")
    .where({
      genre: genre,
    })
    .returning("*").pluck('genre_id');
    arrayofGenreID.push(genreID[0]);
   
    }

   
   //insert user id with favorite genre id
    for (const id of arrayofGenreID)
    {
      let genreID= await db('User_Genre')
     .insert({
      user_id: userID,
       genre_id: id,
     })}
    

    

    //return auth.createAccessToken(created);
    return userID;
  },

  async checkEmail(email) {
    const {validators} = await emailValidator.validate(email);
    //console.log(validators.mx.valid);
    if(!validators.mx.valid)
    {
      const message = { 'emailMessage' : "Please enter a valid email."};

      return message;
    }
    console.log("inside check email");
    let result= await db("User").where({email: email}).first().returning("*");
    if (result)
    {
      console.log("inside results");
      const message = { 'emailMessage' : "Email is already registered."};

      return message;
    }
    else
    {
      return "";
  }},
  async checkUsername(username) {
    if (username.substring(0,5)=="admin")
  {
    const message = { 'usernameMessage' : "Username is already taken."};
    return message;
  }
    let result= await db("User").where({username: username}).first().returning("*");
    if (result)
    {
      const message =  { 'usernameMessage' : "Username is already taken."};

      return message;
    }
    else
    {
      return "";
  }},

  async rating(userID,movieID,rating) {
    let user = await db(tableNames.rating)
      .where({
        movie_id:movieID,
        user_id: userID,
      })
      .first()
      .returning("*");
  if(user)
  {
    console.log("dupliacte");
    let result= await db(tableNames.rating) .where({ user_id: userID, movie_id: movieID  })
      .update({
      //  movie_id: movieID,
      //  user_id: userID,
       rating: rating,
      })
      .returning("*");
      console.log(result);
      return result;


  }
    console.log("in rating asyn");
    // let result= await db(tableNames.rating)
    // .insert({userID,movieID,rating})
    // .returning("*");
    let result=await db('Rating')
     .insert({
      movie_id: movieID,
       user_id: userID,
       rating: rating,
     })

    if (result)
    {
      return result;
    }
    else
    {
      return "";
  }
},

async getUserRating(userID, movieID) {
  let result= await db(tableNames.rating).where({movie_id:movieID ,user_id: userID}).returning("*").pluck('rating');
  console.log(result[0]);
  return result; 
 },

 async deleteUserRating(userID, movieID) {
  console.log("in deletetUserRating");
   let result= await db(tableNames.rating)
   .del().where({movie_id:movieID ,user_id: userID});
  if(result){
    return result; 
  }
  return;
 },

 async review(userID, movieID,review) {
  let user = await db(tableNames.review)
  .where({
    movie_id:movieID,
    user_id: userID,
    review: utf8.decode(review),
  })
  .first()
  .returning("*");
  if(user)
  {
    const message = { 'reviewErrorMessage' : "Sorry, this review has already been added. "};
    return message;

  }
  //console.log("in deletetUserRating");
  let result= await db(tableNames.review).insert({
    movie_id: movieID,
     user_id: userID,
     review: utf8.decode(review),
     //review:review,
   }).returning("*");
  if(result){
    return result; 
  }
  return;
 },
  // async getId(username) {
  //   let result= await db("User").where({username: username}).returning("*").pluck('user_id');
  //   const userID=result[0];
  //   return userID;
  //  },
};

