const db = require("../../db/db");
const fields = ["user_id", "email" ,"username", "password" , "date_of_birth" , "gender" , "location"];

const bcrypt = require("bcrypt");
const auth = require("../../auth");
const tableNames = require("../../constents/tableNames");
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
        // return console.log(user);

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
    //     message: 'username is not registeredffff'
    // })}

    // // }

    if (!user) throw new Error("username is not registered");

    // compare pass
    isAuth = await bcrypt.compare(password, user.password);
    // console.log(isAuth);
    if (!isAuth) throw new Error("Pass is incorrect");
    // if(!isAuth)
    // {
    //   res.status(401).json({
    //     message: 'Pass is incorrect ffff'
    // })}


    // sign token
    return auth.createAccessToken(user);
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
};
