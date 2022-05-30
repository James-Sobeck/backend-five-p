const passport = require("passport");
const errorHandler = require("../errors/errorHandler");

const router = require("express").Router();

const knex = require('../src/db/connection');
const genPassword = require("./passwordUtils").genPassword;
const validPassword = require("./passwordUtils").validPassword;
const passportLocal = require("passport-local").Strategy;
require("./passportConfig")(passport);
//, { failureRedirect: '/login', successRedirect: '/module1' }
// router.post('/login', passport.authenticate('local', { successRedirect: '/suc', failureRedirect: '/loin' }),
// function(req, res) {
//   console.log("pass hit");
//   res.status(201).json({ data: "temp" });
// });

async function test(email){
  return await knex("users").select('*')
  .where('email', email).first();
  
}

async function validPass(email, password){
  let user = await test(email);
  //console.log(user.hash);
  return validPassword(password, user.hash, user.salt);
}

router.post('/login', function(req,res,next){
  console.log("reached auth enpoint");
  console.log(req.body);
  let email = req.body.data.email
  let password = req.body.data.password
  
  // test(email).then((res)=>res[0]);
   validPass(email, password).then((auth)=>{
     if(auth){
     //if correct password
     test(email).then((user)=>{
       delete user.hash;
       delete user.salt;
       res.json({data: user})
     })
     //res.json({data:"success"});
   } else if(!auth){
     //not correct password, prompt relogin
     res.json({data:"please log in with the correct password"})
   }
   })
   
   
})
// router.post('/login', (req, res, next)=>{
//   passport.authenticate("local", (err, user, info)=>{
//     console.log("GHEOPKFOF")
//     console.log(user)
//     if (err) throw err;
//     if(!user) res.json({data: "No User Exists"});
//     else {
//       req.logIn(user, (err)=>{
//         if(err) throw err;
//         res.json({data: "Successfully Authenticated"});
//         console.log(req.user);
//       })
//     }
//   })(req, res, next);
// })
// router.post("/login", passport.authenticate('local'), (req, res) => {
//   console.log(req.user);
//   // make sure to respond to the request
//   res.send(req.user);
// })
// router.post("/login",
//  function(req,res,next){
//    passport.authenticate("local", function(err, user, info){
//     console.log(user);
//     // handle succes or failure
//     res.json({data: user})
//   })(req,res,next); 
// })

router.post('/register', (req, res, next) => {
  //console.log("router hit");
  //console.log(req.body.data.password)
  const saltHash = genPassword(req.body.data.password);
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = {
      email: req.body.data.email,
      first_name: req.body.data.first_name,
      last_name: req.body.data.last_name,
      address_1: req.body.data.address_1,
      address_2: req.body.data.address_2,
      city: req.body.data.city,
      state: req.body.data.state,
      zip: req.body.data.zip,
      phone_number: req.body.data.phone_number,
      organization_id: req.body.data.organization_id,
      hash: hash,
      salt: salt,
  };
  
  function create(user) {
    return knex("users")
      .insert(user)
      .returning("*")
      .then((newUser) => newUser[0]);
  }

  // const tempUser = (user) => knex("Users")
  // .insert(user)
  // .returning("*")
  // .then((newUser)=>newUser[0]);
  
  //tempUser(newUser);
  async function conCreate() {
    //const tempUser = req.body.data;
    //console.log(req.body);
    //req.body is just email, password
    //console.log("YOLO");
    // tempProp = {
    //   hash: hash,
    //   salt: salt,
    // }
    //const newObj = Object.assign(tempUser, tempProp);
    const { user_id } = await create(newUser);
    newUser.user_id = user_id;
    console.log(newUser);
    res.status(201).json({ data: newUser });
  }
  
  conCreate();
  //create(newUser);
  
 // res.redirect('/login');
 router.get('/login-success', (req, res, next) => {
  res.send('<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>');
});

router.get('/login-failure', (req, res, next) => {
  res.send('You entered the wrong password.');
});
});
module.exports = router;

// router.post(
//     '/customers',
//     check('email').isEmail(),
  
//     CustomerController.create
//   );
  
//   router.post(
//     '/customers/login',
//     passport.authenticate('login'),
//     [
//       // Check validity
//       check('email', 'Invalid email').isEmail(),
//       check('password')
//         .not()
//         .isEmpty(),
//     ],
//     CustomerController.login
//   );
  
//   router.post(
//     '/customers/facebook',
//     passport.authenticate('facebook-token'),
//     CustomerController.loginfacebook
//   );
  
//   router.get('/customer', passport.authenticate('jwt'), CustomerController.getCustomerProfile);