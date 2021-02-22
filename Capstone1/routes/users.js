const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const session = require('express-session');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');
var jwt = require('jsonwebtoken');
var verifyAuth = require('../middleware/Auth');



// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  console.log(req.body)
  console.log(password)
  const password2 = "qwerty"
  console.log(password2)
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.status(400).json({ error:errors });
        // res.render('register', {
        //   errors,
        //   name,
        //   email,
        //   password,
        //   password2
        // });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            
            newUser
              .save()
              .then((data) => {
              console.log('res', data);
                res
                  .status(200)
                  .json({ message: 'User Registered Successfully', result: data });
              })
              .catch((e) => {
                console.log({ error: e });
                console.log(userModel);
                res.status(400).json({ error: e });
            });
          });
        });
      }
    });
  }
});
// router.post('/', (req, res) => {
//   const { name, email, password } = req.body;
//   // console.log(req.body);
//   confpassword = "qwerty"
//   if (password != confpassword) {
//     res.send({
//       message: 'Password not matched',
//     });
//     return;
//   }

//   bcrypt.hash(password, saltRounds, function (error, hash) {
//     if (error) {
//       return res.json({
//         error: 'Something went wrong.Please try again later! .',
//       });
//     } else {
//       let user = {};
//       (user._id = mongoose.Types.ObjectId()), (user.username = name);
//       user.email = email;
//       user.password = hash;

//       let userModel = new User(user);
//       userModel
//         .save()
//         .then((data) => {
//           console.log('res', data);
//           res
//             .status(200)
//             .json({ message: 'User Registered Successfully', result: data });
//         })
//         .catch((e) => {
//           console.log({ error: e });
//           console.log(userModel);
//           res.status(400).json({ error: e });
//         });
//     }

//     // Store hash in your password DB.
//   });
// });


// Login
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/tracker',
//     failureRedirect: '/users/login',
//     failureFlash: true
//   })(req, res, next);
// });
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  User.findOne({ email: email })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(404).send({
          errorMsg: `username and password`,
        });
      } else {
        bcrypt.compare(password, user.password, function (err, result) {
          if (err || !result) {
            res.status(404).send({
              errorMsg: `Inocorrect username and password `,
            });
          } else {
            console.log('sigin successful');
            const { _id, username, userType } = user;
            const userInfo = {
              _id,
              username,
              email,
              userType,
            };
            var token = jwt.sign(userInfo, 'secret');
            res
              .status(200)
              .json({ message: 'Login Successfull', token, userInfo });
          }
        });
      }
    })
    .catch((e) => {
      res.status(400).send({ errorMsg: e });
    });
});


// Logout
router.get('/logout', (req, res) => {
 
  
    res.sendStatus(200).json({message:"logout succesful"});
 
});

module.exports = router;