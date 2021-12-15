require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: "filmey",
      user: "postgres",
      password: "pgAdmin123",
    },
    migrations: {
      directory: "./db/migrations",
    },
    seeds: {
      directory: "./db/seeds",
    },
  },
};
