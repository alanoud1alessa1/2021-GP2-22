require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";



const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'filmey',
    password: 'pgAdmin123',
    port: 5432,
  })


module.exports = { pool };
