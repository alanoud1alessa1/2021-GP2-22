const db = require("../../db/db");
const fields = ["user_id", "email" ,"username", "password" , "date_of_birth" , "gender" , "location"];

const bcrypt = require("bcrypt");
const auth = require("../../auth");
const tableNames = require("../../constents/tableNames");
const emailValidator = require('deep-email-validator');

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
      message = { 'emailOrUsernameMessage' : "Email / Username incorrect"};

      return message;
    }

    // // compare pass
    isAuth = await bcrypt.compare(password, user.password);
    // console.log(isAuth);
    if (!isAuth)
    {
    
      message = { 'passwordMessage' : "Password incorrect"};

      return message;

    } 
    return;

    // sign token
   // return auth.createAccessToken(user);
  },
  async signup(email ,username, password , date_of_birth , gender , location) {
   
    // let dupliacte=db(tableNames.user).where('email', email);
    // console.log(dupliacte);
    password = await bcrypt.hash(password, 12);
    const [created] = await db(tableNames.user)
      .insert({email ,username, password , date_of_birth , gender , location})
      .returning("*");

    return auth.createAccessToken(created);
  },

  async checkEmail(email) {
    const {validators} = await emailValidator.validate(email);
    //console.log(validators.mx.valid);
    if(!validators.mx.valid)
    {
      const message = { 'emailMessage' : "Email incorrect"};

      return message;
    }
    console.log("inside check email");
    let result= await db("User").where({email: email}).first().returning("*");
    if (result)
    {
      console.log("inside results");
      const message = { 'emailMessage' : "Email already taken"};

      return message;
    }
    else
    {
      return "";
  }},
  async checkUsername(username) {
    let result= await db("User").where({username: username}).first().returning("*");
    if (result)
    {
      const message =  { 'usernameMessage' : "Username already taken"};

      return message;
    }
    else
    {
      return "";
  }},
};
