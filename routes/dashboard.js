const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.send('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => {
  res.send('wolcome to dashboard'),
    console.log(req.sessionID),
    console.log(req.user.name);
  console.log(req.user.id);
});

module.exports = router;
