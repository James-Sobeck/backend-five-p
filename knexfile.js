// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 require('dotenv').config();
 const path = require("path");
 
const DATABASE_URL = "postgresql://postgres@localhost/postgres";

module.exports = {

  development: {
    client: "postgresql",
    connection: {
      connectionString: DATABASE_URL,
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    }
}
};
