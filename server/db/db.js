const knex = require("knex");
const knexfile = require(".././knexfile");
const env = process.env.NODE_ENV || "development";
const congigOptions = knexfile[env];

module.exports = knex(congigOptions);
