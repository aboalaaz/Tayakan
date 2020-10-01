const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.send('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, async (req, res) => {
  const user = await User.findById(req.user.id);
  const userName = user.name;
  res.send(`wolcome to dashboard ${userName}`),
    console.log(req.sessionID),
    console.log(req.user.name);
  console.log(req.user.id);
});

module.exports = router;
