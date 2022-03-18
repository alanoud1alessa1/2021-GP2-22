
const db = require("../../db/db");
const auth = require("../../auth");
const tableNames = require("../../constents/tableNames");

module.exports = {
    async getLocation(name) {
        return db("Cinema")
        .select(
          "city",
        ).distinct('location')
        .where("name", "=", name)
       
    
      },
    }