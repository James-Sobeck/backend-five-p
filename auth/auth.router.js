const passport = require("passport");

const router = require("express").Router();

const knex = require('../src/db/connection');
const genPassword = require("./passwordUtils").genPassword;
//, { failureRedirect: '/login', successRedirect: '/module1' }
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
function(req, res) {
  res.redirect('/');
});


router.post('/register', (req, res, next) => {
  console.log("router hit");
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
      module_id_complete: req.body.data.module_id_complete,
      module_id_todo: req.body.data.module_id_todo,
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