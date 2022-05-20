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
    connection: {
      connectionString: "postgres://tdxqfzwksdzqef:0e19f39f0fdb78b0f336629d545ed65c3ffe85c0697e3142132f44c90cdd5be5@ec2-54-86-224-85.compute-1.amazonaws.com:5432/dcaeba7tbj92ro?ssl=true",
      database: "dcaeba7tbj92ro",
      port: "5432",
      user: "tdxqfzwksdzqef",
      password: "0e19f39f0fdb78b0f336629d545ed65c3ffe85c0697e3142132f44c90cdd5be5",
    },
    ssl: {
      rejectUnauthorized: false
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    }
}
};
