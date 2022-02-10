const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const middleware = require("./middleware");
const api = require("./api");
require("dotenv").config();





const app = express();

app.use(morgan("tiny"));
app.use(helmet());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.use("/api/v1", api);




app.use(middleware.notFound);
app.use(middleware.errorHandler);

module.exports = app;





