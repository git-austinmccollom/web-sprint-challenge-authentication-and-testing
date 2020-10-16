const knex = require("knex");
const knexfile = require("../knexfile.js");

// on heroku NOD_ENV will be 'production'
const environment = process.env.DB_ENV || "development";

const config = knexfile[environment];
module.exports = knex(config);