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

// module.exports = {

//   development: {
//     client: process.env.CLIENT,
//     connection: {
//       database: process.env.PG_DATABASE,
//       user :process.env.PG_USER,
//       password: process.env.PG_PASSWORD,
//     },
//     migrations: {
//       directory: "./server/db/migrations",
//     },
//     seeds: {
//       directory: "./server/db/seeds",
//     }
//   }
// };
