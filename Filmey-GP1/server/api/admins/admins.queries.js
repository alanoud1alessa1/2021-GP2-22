const db = require("../../db/db");
const fields = ["admin_id" ,"username", "password"];
const bcrypt = require("bcrypt");
const auth = require("../../auth");
const tableNames = require("../../constents/tableNames");

module.exports = {
    async get(id) {
      return db(tableNames.admin)
        .select(fields)
        .where({
          id,
        })
        .first();
    },
    async login(username, password) {
      // find username
  
      let user = await db(tableNames.admin)
        .where({
          username: username,
        })
        .first()
        .returning("*");
          // return console.log(user);
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
          return "";
      
    },
};