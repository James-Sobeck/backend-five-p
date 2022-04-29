const passport = require("passport");

const router = require("express").Router();

const knex = require('../src/db/connection');
const genPassword = require("./passwordUtils").genPassword;

router.post('/login', passport.authenticate('local', { failureRedirect: '/login-failure', successRedirect: 'login-success' }));

router.post('/register', (req, res, next) => {
  const saltHash = genPassword(req.body.password);
  
  const salt = saltHash.salt;
  const hash = saltHash.hash;

  const newUser = {
      username: req.body.email,
      hash: hash,
      salt: salt,
  };

  const tempUser = (user) => knex("Users")
  .insert(user)
  .returning("*")
  .then((newUser)=>newUser[0]);
  
  tempUser(newUser);
  
  res.redirect('/login');
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