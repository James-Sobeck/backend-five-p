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

// passport.use("local", new localStrategy(
//     function(username, password, done){
//       let email = username;
//      console.log("fuj")
//       return knex("users")
//       .select("*").where({email}).then((user)=>{
//         if(!user) {return cs(null, false)}
//         const isValid = validPassword(password, user.hash, user.salt);
//         if(isValid){
//           return done(null, user);
//         } else{
//           return done(null, false);
//         }
//       })
//       .catch((err)=>{
//         done(err);
//       })
//     }
//   ));
  
passport.use(new localStrategy({
  username: 'email',
  password: 'password'
},
  async function(username, password, done){
    console.log("local called");
    let email = username;
         console.log("fuj")
          return awaitknex("users").select('*')
          .where('email', email).then((user)=>{
            if(!user) {return cs(null, false)}
            const isValid = validPassword(password, user.hash, user.salt);
            console.log(isValid)
            if(isValid){
              return done(null, user);
            } else{
              return done(null, false);
            }
          })
          .catch((err)=>{
            done(err);
          })
        
  }))
  const passportLocal = passport.use(new localStrategy({
    username: 'username',
    password: 'password'
  },
    async function(username, password, done){
      
      let email = username;
            return await knex("users")
           .where("email", email).then((user)=>{
              if(!user) {return cs(null, false)}
              const isValid = validPassword(password, user.hash, user.salt);
              console.log(isValid)
              if(isValid){
                return done(null, user);
              } else{
                return done(null, false);
              }
            })
            .catch((err)=>{
              done(err);
            })
          
    }))
    passport.use('local', passportLocal);
passport.serializeUser((user, done) => {
  log.debug("serialize ", user);
    done(null, user.email);
});

passport.deserializeUser((email, done)=>{
  log.debug("deserualize ", email);
  return knex("users")
  .where("email", email)
  .then((user)=>{
    //log.debug("deserializeUser ", user);
    done(null, user);
  })
  .catch((err)=>{
    done(new Error(`User with the id ${email} does not exist`));
  })
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