const passport = require('passport');
const User = require('../models/User');
const router = require('express').Router();
const { forgotPassword, resetPassword } = require('../controllers/auth');

const { forwardAuthenticated } = require('../config/auth');

router.get('/', function (req, res) {
  res.render('index', { user: req.user });
});

router.get('/register', forwardAuthenticated, function (req, res) {
  res.send('wellcome to Register page');
});

router.post('/register', function (req, res, next) {
  console.log('registering user');
  User.register(
    new User({ email: req.body.email }),
    req.body.password,
    function (err) {
      if (err) {
        console.log('error while user register!', err);
        return next(err);
      }

      console.log('user registered!');
      res.send(' u are registered');
    }
  );
});

router.get('/login', forwardAuthenticated, function (req, res) {
  res.send('welcome to login page');
});

router.post(
  '/login',
  passport.authenticate('local', {
    successFlash: `Welcome!`,
    successRedirect: '/api/v1/dashboard',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password.',
  }),
  function (req, res) {
    console.log('user Logdin!');
  }
);

router.get('/logout', function (req, res) {
  req.logout();
  req.session.destroy(function (err) {
    console.log(err);
  });
  res.send('successful loguot');
});

// I should create method for forgetPassowrd and sendEmil

router.route('/forgotpassword').post(forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
