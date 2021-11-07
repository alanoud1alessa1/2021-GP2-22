const { sign } = require("jsonwebtoken");

module.exports = {
  createAccessToken(user) {
    return sign(
      { user_id: user.user_id, username: user.username },
      process.env.ACCESS_TOKEN_SECERT,
      {
        expiresIn: "1d",
      }
    );
  },
};
