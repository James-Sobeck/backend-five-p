const path = require("path");

require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const pg = require('pg');
// const express = require("express");
const cors = require("cors");
const express = require('express')
const passport = require('passport')
const expressSession = require('express-session');
const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");
const pgSession = require('connect-pg-simple')(expressSession);
const app = express();
var routes = require('./auth/auth.router');
const bodyParser = require("body-parser");

const knex = require('./src/db/connection');
// const passport = require('passport');

const pgPool = new pg.Pool({
   // Insert pool options here
});



app.use(cors());
// app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
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
// require('./auth/auth');
require("./auth/passportConfig")(passport);
app.use(routes);



// app.post('/login', function(req,res,next){
//    console.log("reached auth enpoint");
//    console.log(req.body);
//    let email = req.body.email
//    knex("users")
//    .select("*")
//    .whereRaw('email like ?',`${email}`).then((res)=> console.log(res))
//    var auth = passport.authenticate('local', function(err, user, info){
//       console.log("Test:" + user);
//       if(err){return next(err);}
//       console.log(req.user);
//       //   // make sure to respond to the request
//       res.send(req.user);
//          //  if(!user){res.send({success:false});}

//          //  req.logIn(user, function(err){

//          //      if(err){return next(err);}

//          //      res.send({success: true, user: user});
//          //  });
//    })
//    auth(req, res, next);
// })


app.use(notFound);
// //app.use(errorHandler);



module.exports = app;