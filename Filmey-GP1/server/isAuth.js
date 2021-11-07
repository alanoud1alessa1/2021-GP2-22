const { verify } = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    res.statusCode = 403;

    throw new Error("not authenticated");
  }
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECERT);
    req.payload = payload;
  } catch (err) {
    res.statusCode = 403;

    throw new Error("not authenticated");
  }

  return next();
};
