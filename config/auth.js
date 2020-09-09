const User = require('../models/User');

module.exports = {
  // لحمايه الراوت وتاكد من ان الزائر مسجل الدخول
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    req.flash('error_msg', 'Please log in to view that resource');
    res.redirect('/api/v1/auth/login');
  },

  //عكس الداله الاولى
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect('/dashboard');
  },

  // لتاكد من نوع الحساب وبنائا على ذلك يسمحل له بدخول على راوت معين ام لا
  roleAuthorization: function (roles) {
    return function (req, res, next) {
      var user = req.user;

      User.findById(user._id, function (err, foundUser) {
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
};
