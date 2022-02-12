const db = require("../../db/db");
const fields = ["admin_id", "username", "password"];
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

    let admin = await db(tableNames.admin)
      .where({
        username: username,
      })
      .first()
      .returning("*");
    var message = "";

    if (!admin) {
      message = {
        emailOrUsernameMessage: "Sorry, email / username does not exists.",
      };

      return message;
    }

    isAuth = await bcrypt.compare(password, admin.password);
    if (!isAuth) {
      message = { passwordMessage: "Password is incorrect." };

      return message;
    }
    return { adminID: admin.admin_id };
  },

  async deleteReview(review_id) {
    let deleteMovie = await db(tableNames.review)
      .where({
        review_id: review_id,
      })
      .update({
        is_deleted: true,
      })
      .returning("*");
    return deleteMovie;
  },

  async AdminDeleteReview(review_id, admin_id) {
    let AdminDeleteReview = await db("Admin_Delete_Review")
      .insert({
        review_id: review_id,
        admin_id: admin_id,
      })
      .returning("*");
    return AdminDeleteReview;
  },
};
