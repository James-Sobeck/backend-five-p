const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const pg = require('pg');
const express = require("express");
const cors = require("cors");
const expressSession = require('express-session');
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const pgSession = require('connect-pg-simple')(expressSession);
const app = express();
var routes = require('./auth/auth.router');

const passport = require('passport');

const pgPool = new pg.Pool({
    // Insert pool options here
});

app.use(express.json());

app.use(cors());


app.use(expressSession({
    store: new pgSession({
        createTableIfMissing: true,
        conString: "postgres://xsixehuw:8dOn_fxI3ROh60zq5uIycpMsMMaJHy7f@heffalump.db.elephantsql.com/xsixehuw"                // Connection pool
           // Use another table-name than the default "session" one
        // Insert connect-pg-simple options here
      }),
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }
    
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(routes);


app.use(notFound);
app.use(errorHandler);

module.exports = app;