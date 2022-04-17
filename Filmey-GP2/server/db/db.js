const dotenv = require("dotenv").config();
const knexfile = require('../../server/knexfile');
var knex = require("knex");


const Config = knexfile["production"];
const db = knex(Config);

module.exports = db;