const passport = require('passport');
const express = require('express');
const session = require('express-sessions');
const knex = require('../src/db/connection');
const localStrategy = require('passport-local').Strategy;
module.exports = function (passport){
  

// passport.use(new localStrategy(
//   function(username, password, done){
//     return knex("users")
//     .whereRaw(
//       `email = ?, [${username}]`
//     ).then((user)=>{
//       if(!user) {return cs(null, false)}
//       const isValid = validPassword(password, user.hash, user.salt);
//       if(isValid){
//         return done(null, user);
//       } else{
//         return done(null, false);
//       }
//     })
//     .catch((err)=>{
//       done(err);
//     })
//   }
// ));
passport.use(new localStrategy(
    function(username, password, done){
      return knex("users")
      .whereRaw(
        `email = ?, ${username}`
      ).then((user)=>{
        if(!user) {return cs(null, false)}
        const isValid = validPassword(password, user.hash, user.salt);
        if(isValid){
          return done(null, user);
        } else{
          return done(null, false);
        }
      })
      .catch((err)=>{
        done(err);
      })
    }
  ));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  User.findById(userId)
      .then((user) => {
          done(null, user);
      })
      .catch(err => done(err))
});
}
// const LocalStrategy = require('passport-local').Strategy;
// const JwtStrategy = require('passport-jwt').Strategy;

// passport.use(
//     'create',
//     // eslint-disable-next-line no-undef
//     new LocalStrategy(
//       {
//         usernameField: 'email',
//         passwordField: 'password',
//       },
//       // eslint-disable-next-line consistent-return
//       async (email, password, done) => {
//         try {
//           // Save the information provided by the user to the the database
//           const user = await UserModel.create({ email, password });     ////// DATABASE CREATE, REPLACE WITH OUR DATABASE
//           // Send the user information to the next middleware
//           return done(null, user);
//         } catch (error) {
//           done(error);
//         }
//       }
//     )
//   );
  
//   passport.use(
//     'login',
//     // eslint-disable-next-line no-undef
//     new LocalStrategy(
//       {
//         usernameField: 'email',
//         passwordField: 'password',
//       },
//       async (email, password, done) => {
//         try {
//           // Find the user associated with the email provided by the user
//           const user = await UserModel.findOne({
//             where: {
//               // eslint-disable-next-line object-shorthand
//               email: email,
//             },
//           });
//           if (!user) {
//             // If the user isn't found in the database, return a message
//             return done(null, false, { message: 'User not found' });
//           }
  
//           // If the passwords match, it returns a value of true.
//           const validate = await user.validatePassword(password);
//           if (!validate) {
//             return done(null, false, { message: 'Wrong Password' });
//           }
//           // Send the user information to the next middleware
//           return done(null, user, { message: 'Logged in Successfully' });
//         } catch (error) {
//           return done(error);
//         }
//       }
//     )
//   );
  
//   passport.serializeUser(function(user, done) {
//     done(null, user);
//   });
  
//   passport.deserializeUser(function(user, done) {
//     done(null, user);
//   });