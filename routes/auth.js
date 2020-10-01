const passport = require('passport');
const User = require('../models/User');
const router = require('express').Router();
const { forgotPassword, resetPassword } = require('../controllers/auth');

const {
  forwardAuthenticated,
  ensureAuthenticated,
  auth,
} = require('../config/auth');
const e = require('express');

router.get('/', auth, async (req, res) => {
  const userID = req.session.passport.user;
  const user = await User.findById({ _id: userID });
  if (!user) return console.log('no user', err);
  return res.status(200).json({
    _id: user.id,
    isAdmin: user.role == 'admin' ? true : false,
    isAuth: true,
    email: user.email,
    name: user.name,
    role: user.role,
    username: user.username,
    specialization: user.specialization,
    courses: user.courses,
    photo: user.photo,
    points: user.points,
    date: user.date,
    comments: user.comments,
  });
});

// router.get('/', ensureAuthenticated, function (req, res) {
//   if (req.user === undefined) {
//     // The user is not logged in
//     console.log(req.sessionID);
//     console.log(req.isAuthenticated());
//     res.json({ userData: 'no user' });
//   } else {
//     console.log(req.isAuthenticated() + ' ' + 'it work');
//     res.json({
//       username: req.user,
//     });
//   }
// });

router.get('/register', forwardAuthenticated, function (req, res) {
  res.send('wellcome to Register page');
});

router.post('/register', function (req, res, next) {
  console.log('registering user');
  User.register(
    new User({ email: req.body.email, name: req.body.name }),
    req.body.password,
    function (err) {
      if (err) {
        console.log('error while user register!', err);
        return next(err);
      }

      console.log('user registered!');
    }
  );
  res.status(201).json({
    success: true,
  });
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return res.json({
        loginSuccess: false,
        message: err,
      });
    }
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: 'Auth failed, email not found',
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err), console.log(err);
      }
    });
    res.status(200).json({
      loginSuccess: true,
    });
  })(req, res, next);
});

router.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    console.log(err);
  });
  req.logout();
  res.send('successful loguot');
  res.status(200);
});

// I should create method for forgetPassowrd and sendEmil

router.route('/forgotpassword').post(forgotPassword);
router.put('/resetpassword/:resettoken', resetPassword);

module.exports = router;
