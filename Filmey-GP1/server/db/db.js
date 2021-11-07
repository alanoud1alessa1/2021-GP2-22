const knex = require("knex");
//const knexfile = require('../../knexfile');
const knexfile = require('../../server/knexfile');



//TODO
// const environment = process.env.NODE_ENV || "development";
const connectionConfig = knexfile['development'];

const db = knex(connectionConfig);

module.exports = db;
