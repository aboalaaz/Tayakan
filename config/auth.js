const User = require('../models/User');
const passport = require('passport');

module.exports = {
  // لحمايه الراوت وتاكد من ان الزائر مسجل الدخول
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    // res.redirect('/api/v1/auth/login');
  },

  //عكس الداله الاولى
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');
  },

  //عكس الداله الاولى

  // لتاكد من نوع الحساب وبنائا على ذلك يسمحل له بدخول على راوت معين ام لا
  roleAuthorization: function (roles) {
    return function (req, res, next) {
      const userID = req.session.passport.user;

      User.findById(userID, function (err, foundUser) {
        if (err) {
          res.status(422).json({ error: 'No user found.' });
          return next(err);
        }

        if (roles.indexOf(foundUser.role) > -1) {
          return next();
        }

        res
          .status(401)
          .json({ error: 'You are not authorized to view this content' });
        return next('Unauthorized');
      });
    };
  },

  auth: async function (req, res, next) {
    if (!req.isAuthenticated()) {
      return res.json({
        isAuth: false,
        error: true,
      });
    }
    if (req.isAuthenticated()) {
      // let userID = req.session.passport.user;
      // await User.findById({ _id: userID }, (err, userID) => {
      //   if (err) throw err;

      //   req.userID = userID;
      next();
      // });
    }
  },
};
