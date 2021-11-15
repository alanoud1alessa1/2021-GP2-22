const knex = require("knex");
const knexfile = require('../../server/knexfile');


const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexfile[environment];

const db = knex(connectionConfig);

module.exports = db;
